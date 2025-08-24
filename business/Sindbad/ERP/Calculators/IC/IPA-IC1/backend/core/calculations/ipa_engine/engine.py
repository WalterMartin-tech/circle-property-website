from typing import Dict, List

from pydantic import BaseModel, Field


# --- Pydantic model replaces dataclass ---
class Inputs(BaseModel):
    # Core inputs
    principal: float = Field(..., gt=0, description="Final Financing Amount")
    rate: float = Field(
        ..., gt=0, description="Annual interest rate (decimal, e.g. 0.12)"
    )
    term_months: int = Field(..., gt=0, description="Number of months in term")
    balloon: float = Field(0.0, ge=0, description="Balloon due at end")

    # VAT / reporting
    vat_rate: float = 0.18
    asset_vat: float = 0.0

    # TSF knobs (monthly, non-capitalized flows)
    telematics_monthly: float = 10_000.0
    include_irc: bool = True
    include_banking: bool = True

    # Approximations for monthly TSF
    irc_rate: float = 0.18  # 18% on monthly interest
    banking_rate: float = 0.026  # 2.6% on (C/n + monthly interest)


def pmt_with_balloon(pv: float, rate_annual: float, n: int, fv: float = 0.0) -> float:
    """Standard annuity (includes balloon in PV logic)."""
    i = rate_annual / 12.0
    if n <= 0:
        return 0.0
    denom = 1.0 - (1.0 + i) ** (-n)
    adj_pv = pv - fv / ((1.0 + i) ** n)
    return (i * adj_pv) / denom


def run_calc(inp: Inputs) -> Dict:
    i = inp.rate / 12.0
    annuity = pmt_with_balloon(inp.principal, inp.rate, inp.term_months, fv=inp.balloon)

    rows: List[Dict] = []
    outstanding = float(inp.principal)
    annuity_identity_ok = True

    for m in range(1, inp.term_months + 1):
        interest = outstanding * i
        irc_m = (inp.irc_rate * interest) if inp.include_irc else 0.0
        bank_m = (
            (inp.banking_rate * ((inp.principal / inp.term_months) + interest))
            if inp.include_banking
            else 0.0
        )
        tsf = inp.telematics_monthly + irc_m + bank_m
        capital = annuity - interest - tsf
        outstanding = outstanding - capital

        if abs((interest + tsf + capital) - annuity) > 1e-6:
            annuity_identity_ok = False

        rows.append(
            {
                "month": m,
                "interest": round(interest, 2),
                "tsf": round(tsf, 2),
                "capital": round(capital, 2),
                "annuity": round(annuity, 2),
                "outstanding": round(outstanding, 2),
            }
        )

    ipa_net = annuity * inp.term_months + inp.balloon
    vat_ipa = inp.vat_rate * ipa_net
    vat_delta = vat_ipa - inp.asset_vat

    return {
        "inputs": inp.model_dump(),  # Pydantic replacement for asdict
        "annuity": round(annuity, 2),
        "ipa_net": round(ipa_net, 2),
        "ipa_vat": round(vat_ipa, 2),
        "asset_vat": round(inp.asset_vat, 2),
        "vat_delta": round(vat_delta, 2),
        "annuity_identity_ok": annuity_identity_ok,
        "schedule": rows[:12],
        "outstanding_final": round(outstanding, 2),
    }
