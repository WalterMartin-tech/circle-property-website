from __future__ import annotations

from datetime import date
from typing import Any, Dict, List

from backend.core.calculations.ipa_engine.engine import Inputs, run_calc

# ---------------- helpers


def _num(x, default=0.0) -> float:
    try:
        if x is None or x == "":
            return float(default)
        return float(x)
    except Exception:
        return float(default)


def _int(x, default=0) -> int:
    try:
        if x is None or x == "":
            return int(default)
        return int(float(x))
    except Exception:
        return int(default)


def _parse_date(s: str | None, fallback: str = "2025-09-01") -> date:
    from datetime import datetime

    s = (s or fallback).strip()
    for fmt in ("%Y-%m-%d", "%m/%d/%Y"):
        try:
            return datetime.strptime(s, fmt).date()
        except Exception:
            pass
    return datetime.fromisoformat(fallback).date()


def _add_months(d: date, n: int) -> date:
    y = d.year + (d.month - 1 + n) // 12
    m = (d.month - 1 + n) % 12 + 1
    day = min(d.day, 28)
    return date(y, m, day)


def _as_dict(res: Any) -> Dict[str, Any]:
    if isinstance(res, dict):
        return res
    try:
        from app.equilibrium import _to_dict as _td  # type: ignore

        return _td(res)
    except Exception:
        pass
    out = {}
    for k in ("annuity", "ipa_net", "ipa_vat", "schedule"):
        out[k] = getattr(res, k, None)
    return out


# ---------------- core


def compute_preview(payload: Dict[str, Any]) -> Dict[str, Any]:
    # 1) normalize inputs
    term = _int(payload.get("term_months") or payload.get("tenure_months") or 0)
    rate = _num(payload.get("rate") or payload.get("nominal_rate_annual") or 0.0)
    vat_rate = _num(payload.get("vat_rate") or 0.0)
    principal = _num(payload.get("principal") or payload.get("credit_base") or 0.0)

    asset_gross = _num(
        payload.get("asset_gross")
        or payload.get("asset_value_gross")
        or payload.get("asset")
        or 0.0
    )
    asset_net = _num(payload.get("asset_net") or payload.get("asset_value_net") or 0.0)
    asset_vat = (
        asset_gross - asset_net
        if asset_gross and asset_net
        else round(asset_net * vat_rate, 2) if asset_net and vat_rate else 0.0
    )

    start = _parse_date(payload.get("start_date") or payload.get("contract_start_date"))

    # 2) engine
    eng_inputs = {
        "principal": principal,
        "term_months": term,
        "rate": rate,
        "vat_rate": vat_rate,
    }
    res = _as_dict(run_calc(Inputs(**eng_inputs)))

    annuity = _num(res.get("annuity"))
    ipa_net = _num(res.get("ipa_net"))
    ipa_vat = _num(res.get("ipa_vat"))
    schedule = res.get("schedule") or []

    # 3) v11.4-friendly fields
    d = principal
    e = ipa_net + ipa_vat
    f = ipa_vat - asset_vat
    c = ipa_net - principal

    rows: List[Dict[str, Any]] = []
    for i in range(term):
        row_date = _add_months(start, i)
        eng_row = schedule[i] if i < len(schedule) else {}
        a = _num(eng_row.get("annuity") if isinstance(eng_row, dict) else None, annuity)
        v = round(a * vat_rate, 2)
        t = round(a + v, 2)
        rows.append(
            {
                "idx": i + 1,
                "date": row_date.isoformat(),
                "annuity": a,
                "annuity_net": a,
                "vat": v,
                "vat_amount": v,
                "total": t,
                "total_incl_vat": t,
            }
        )

    # 4) equilibrium object for the UI "✅"
    # try the real f-solver; fall back to direct diff
    eq_obj: Dict[str, Any]
    try:
        from app.equilibrium import solve_equilibrium_f_bisect  # type: ignore

        eq_res = solve_equilibrium_f_bisect(
            {"principal": d, "term_months": term, "rate": rate, "vat_rate": vat_rate}
        )
        eq = (eq_res or {}).get("equilibrium", {}) if isinstance(eq_res, dict) else {}
        f_solved = _num(eq.get("f_solved"), ipa_vat - asset_vat)
        err = _num(eq.get("error_abs"), abs(ipa_vat - (asset_vat + f_solved)))
        method = eq.get("method") or "f_direct_fallback"
        ok = bool(eq.get("ok", err <= 0.01))
    except Exception:
        f_solved = round(ipa_vat - asset_vat, 2)
        err = round(abs(ipa_vat - (asset_vat + f_solved)), 2)
        method = "f_direct_fallback"
        ok = err <= 0.01

    eq_obj = {
        "ok": ok,
        "method": method,
        "f_solved": round(f_solved, 2),
        "vat_ipa": round(ipa_vat, 2),
        "vat_asset": round(asset_vat, 2),
        "error_abs": round(err, 6),
    }

    out: Dict[str, Any] = {
        "ok": True,
        "d": round(d, 2),
        "e": round(e, 2),
        "c": round(c, 2),
        "f": round(f, 2),
        "vat_asset": round(asset_vat, 2),
        "vat_input_asset": round(asset_vat, 2),
        "vat_ipa": round(ipa_vat, 2),
        "vat_output_ipa": round(ipa_vat, 2),
        "vat_delta": round(f, 2),
        "payments": rows,
        "schedule": rows,
        "equilibrium": eq_obj,
        "engine": {"annuity": annuity, "ipa_net": ipa_net, "ipa_vat": ipa_vat},
    }
    return out


# ---------------- FastAPI router

import os

from fastapi import APIRouter, Body, HTTPException

router = APIRouter()


@router.post("/compute")
async def compute_preview_endpoint(body: dict = Body(...)):
    if os.getenv("DEV_ALLOW_PUBLIC_COMPUTE") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    return compute_preview(body)
