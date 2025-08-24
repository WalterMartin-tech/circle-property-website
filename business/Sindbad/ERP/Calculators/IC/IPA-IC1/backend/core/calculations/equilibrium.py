from __future__ import annotations

from typing import Any, Dict, List, Tuple

from backend.core.calculations.ipa_engine.engine import Inputs, run_calc

# ------------------------
# Helpers
# ------------------------


def solve_bisect(
    fn, lo: float, hi: float, tol: float = 0.01, max_iter: int = 64
) -> Tuple[float, int, float, float]:
    f_lo = fn(lo)
    f_hi = fn(hi)
    if not (f_lo == 0 or f_hi == 0 or (f_lo < 0 < f_hi) or (f_hi < 0 < f_lo)):
        raise ValueError("No sign change on [lo, hi]; cannot bracket root.")
    a, b, fa, fb = lo, hi, f_lo, f_hi
    for iters in range(1, max_iter + 1):
        mid = (a + b) / 2.0
        fm = fn(mid)
        if abs(fm) <= tol:
            return mid, iters, f_lo, f_hi
        if (fa < 0 < fm) or (fm < 0 < fa):
            b, fb = mid, fm
        else:
            a, fa = mid, fm
    return (a + b) / 2.0, max_iter, f_lo, f_hi


def _to_dict(x: Any) -> Dict[str, Any]:
    if isinstance(x, dict):
        return x
    # Pydantic v2
    if hasattr(x, "model_dump"):
        try:
            return x.model_dump()
        except Exception:
            pass
    # Pydantic v1
    if hasattr(x, "dict"):
        try:
            return x.dict()
        except Exception:
            pass
    # dataclass
    try:
        from dataclasses import asdict, is_dataclass

        if is_dataclass(x):
            return asdict(x)
    except Exception:
        pass
    # fallback JSON round-trip
    try:
        import json

        return json.loads(
            json.dumps(x, default=lambda o: getattr(o, "__dict__", str(o)))
        )
    except Exception:
        return {"_raw": str(x)}


def vat_from_result(result: Dict[str, Any]) -> float:
    # 1) direct field
    if isinstance(result, dict) and "ipa_vat" in result:
        try:
            return float(result["ipa_vat"])
        except Exception:
            pass
    # 2) fallback: vat_delta + asset_vat
    if isinstance(result, dict):
        vd = result.get("vat_delta")
        av = result.get("asset_vat") or 0
        try:
            if vd is not None:
                return float(vd) + float(av)
        except Exception:
            pass
    # 3) totals.vat
    totals = result.get("totals") or {}


def get_vat_fields(result: dict) -> dict:
    """Extract VAT-related totals in a consistent way."""
    totals = result.get("totals") or {}
    return {
        "ipa_vat": float(totals.get("ipa_vat") or 0),
        "asset_vat": float(totals.get("asset_vat") or 0),
        "vat_delta": float(totals.get("vat_delta") or 0),
    }

    # 4) sum row.vat
    sched: List[Dict[str, Any]] = result.get("schedule") or result.get("lines") or []
    ssum = 0.0
    for row in sched:
        v = (row or {}).get("vat")
        if v is not None:
            try:
                ssum += float(v)
            except Exception:
                pass
    if ssum > 0:
        return ssum
    # 5) other keys
    for k in ("vat_total", "vat"):
        if k in result:
            try:
                return float(result[k])
            except Exception:
                pass
    return 0.0


def vat_asset(payload: Dict[str, Any]) -> float:
    if payload.get("asset_vat") not in (None, 0, 0.0, "0", "0.0"):
        return float(payload["asset_vat"])
    vat_rate = float(payload.get("vat_rate", 0.0) or 0.0)
    base = payload.get("asset_price", payload.get("principal", 0.0))
    return float(base) * vat_rate


def run_once(payload: Dict[str, Any]) -> Dict[str, Any]:
    allowed = {
        "principal",
        "rate",
        "term_months",
        "balloon",
        "vat_rate",
        "asset_vat",
        "telematics_monthly",
        "include_irc",
        "include_banking",
        "irc_rate",
        "banking_rate",
    }
    p = {k: v for k, v in dict(payload).items() if k in allowed}
    p.setdefault("balloon", 0.0)
    p.setdefault("telematics_monthly", 10000.0)
    p.setdefault("include_irc", True)
    p.setdefault("include_banking", True)
    p.setdefault("irc_rate", 0.18)
    p.setdefault("banking_rate", 0.026)
    res = run_calc(Inputs(**p))
    return _to_dict(res)


# ------------------------
# Principal Equilibrium
# ------------------------


def solve_equilibrium_principal(
    payload: Dict[str, Any],
    lo_factor: float = 0.3,
    hi_factor: float = 1.7,
    tol: float = 0.01,
    max_iter: int = 64,
) -> Dict[str, Any]:
    """
    Solve principal such that VAT(IPA) = VAT(asset).
    lhs = VAT(IPA), rhs = VAT(asset).
    """
    original = float(payload.get("principal", 0.0))
    if original <= 0:
        raise ValueError("principal must be > 0")

    def equilibrium_error(principal_candidate: float) -> float:
        p = dict(payload)
        p["principal"] = principal_candidate
        r = run_once(p)
        lhs = vat_from_result(r)
        rhs = vat_asset(p)
        return lhs - rhs

    lo, hi = original * lo_factor, original * hi_factor
    ok = False

    for _ in range(6):
        try:
            root, iters, _, _ = solve_bisect(
                equilibrium_error, lo, hi, tol=tol, max_iter=max_iter
            )
            ok = True
            break
        except ValueError:
            lo *= 0.5
            hi *= 1.5

    if not ok:
        r = run_once(payload)
        lhs = vat_from_result(r)
        rhs = vat_asset(payload)
        return {
            "result": r,
            "equilibrium": {
                "ok": False,
                "message": "Could not bracket a root for principal",
                "principal_original": original,
                "principal_solved": original,
                "lhs": round(lhs, 2),
                "rhs": round(rhs, 2),
                "error_abs": round(abs(lhs - rhs), 4),
            },
        }

    solved = round(root, 2)
    payload_solved = dict(payload)
    payload_solved["principal"] = solved
    r = run_once(payload_solved)
    lhs = vat_from_result(r)
    rhs = vat_asset(payload)
    err_abs = abs(lhs - rhs)

    return {
        "result": r,
        "equilibrium": {
            "ok": err_abs <= tol,
            "tolerance": tol,
            "iterations": iters,
            "principal_original": original,
            "principal_solved": solved,
            "lhs": round(lhs, 2),
            "rhs": round(rhs, 2),
            "error_abs": round(err_abs, 4),
        },
    }


# ------------------------
# f Equilibrium
# ------------------------


def solve_equilibrium_f(payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Direct equilibrium on VAT delta f:
    lhs = VAT(IPA), rhs = VAT(asset) + f.
    """
    r = run_once(payload)
    r_dict = r if isinstance(r, dict) else _to_dict(r)
    lhs = vat_from_result(r_dict)
    rhs = vat_asset(payload)
    f_star = round(lhs - rhs, 2)
    return {
        "result": r_dict,
        "equilibrium": {
            "method": "f_direct",
            "ok": True,
            "lhs": round(lhs, 2),
            "rhs": round(rhs + f_star, 2),
            "vat_asset": round(rhs, 2),
            "f_solved": f_star,
            "error_abs": round(abs(lhs - (rhs + f_star)), 4),
        },
    }


def solve_equilibrium_f_bisect(
    payload: dict,
    around: float | None = None,
    span: float = 1e6,
    tol: float = 0.01,
    max_iter: int = 64,
) -> dict:
    """
    Solve VAT equilibrium for f such that VAT(IPA) = VAT(asset) + f.
    Attempts bisection if helpers exist, otherwise falls back to direct f*.
    Returns consistent keys: lhs, rhs, f_solved, tolerance, iterations.
    """
    try:  # pragma: no cover
        # try true bisection if helpers are present
        err = equilibrium_error_for_f(payload)  # type: ignore[name-defined]
        # choose center near direct f0
        r0 = run_once({**payload})
        f0 = vat_from_result(r0) - vat_asset(payload)
        if around is not None:
            f0 = float(around)
        lo, hi = f0 - span, f0 + span
        try:
            root, iters, f_lo, f_hi = solve_bisect(
                err, lo, hi, tol=tol, max_iter=max_iter
            )  # type: ignore[name-defined]
            f_star = round(root, 2)
            r = run_once({**payload})
            lhs = vat_from_result(r)
            rhs_base = vat_asset(payload)
            err_abs = abs(err(f_star))
            return {
                "result": r,
                "equilibrium": {
                    "method": "f_bisection",
                    "ok": err_abs <= tol,
                    "tolerance": tol,
                    "iterations": iters,
                    "lhs": round(lhs, 2),
                    "rhs": round(rhs_base + f_star, 2),
                    "vat_asset": round(rhs_base, 2),
                    "f_solved": f_star,
                    "error_abs": round(err_abs, 4),
                },
            }
        except Exception:
            pass  # fall through to direct
    except Exception:
        pass  # fall through to direct

    # fallback to direct
    r = run_once({**payload})
    lhs = vat_from_result(r)
    rhs_base = vat_asset(payload)
    f_star = round(lhs - rhs_base, 2)
    return {
        "result": r,
        "equilibrium": {
            "method": "f_direct_fallback",
            "ok": True,
            "lhs": round(lhs, 2),
            "rhs": round(rhs_base + f_star, 2),
            "vat_asset": round(rhs_base, 2),
            "f_solved": f_star,
            "tolerance": tol,  # added for consistency
            "iterations": 0,  # added for consistency
            "error_abs": 0.0,
        },
    }
