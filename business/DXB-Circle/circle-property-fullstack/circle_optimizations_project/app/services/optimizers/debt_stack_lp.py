import numpy as np
from scipy.optimize import linprog
from .common import now_stamp, binding_constraints, shadow_prices
def solve_debt_stack_lp(req) -> dict:
    tr = req.tranches; K = len(tr)
    def eff_rate(t): 
        if t.rate_type == "fixed": return float(getattr(t, "rate", 0.0))
        base = 0.0
        for sc in (req.rate_scenarios or []): base += sc.weight * sc.sofr
        return float(base + (t.spread or 0.0))
    r = np.array([eff_rate(t) for t in tr], dtype=float)
    P = float(req.purchase_price); Ecap = float(req.equity_cap); max_ltv = float(req.targets.max_ltv); min_dscr = float(req.targets.min_dscr); min_fixed_share = float(req.targets.min_fixed_share or 0.0)
    NOI_min = min(list(map(float, req.noi_schedule.get("noi", [])))) if req.noi_schedule.get("noi", []) else 0.0
    c = r.copy(); A, b, names = [], [], []
    debt_cap = min(max_ltv * P, max(P - Ecap, 0.0)); A.append(np.ones(K)); b.append(debt_cap); names.append("Debt cap (min of LTV & Equity)")
    if min_dscr > 0 and NOI_min > 0: A.append(r); b.append(NOI_min / min_dscr); names.append(f"Min DSCR {min_dscr}")
    for k, t in enumerate(tr): row = np.zeros(K); row[k]=1.0; A.append(row); b.append(t.max_share * P); names.append(f"{t.name} share cap {int(t.max_share*100)}%")
    fixed_mask = np.array([1.0 if t.rate_type == "fixed" else 0.0 for t in tr])
    if min_fixed_share > 0: A.append(-(fixed_mask - min_fixed_share * np.ones(K))); b.append(0.0); names.append(f"Min fixed share {int(min_fixed_share*100)}%")
    res = linprog(c, A_ub=np.vstack(A), b_ub=np.array(b), bounds=[(0.0,None)]*K, method="highs")
    if res.status != 0: return {"error":"Model infeasible","fix_suggestions":[{"change":"Lower min DSCR","impact":"+ feasibility"},{"change":"Increase equity","impact":"+ feasibility"},{"change":"Relax tranche caps","impact":"+ feasibility"}]}
    d = res.x; total_debt = float(d.sum()); weighted_cost = float((d * r).sum() / total_debt) if total_debt > 0 else 0.0; min_dscr_real = float((NOI_min / max(1e-9, (d * r).sum()))) if NOI_min > 0 else 0.0
    slacks, duals = {}, {}
    if res.ineqlin is not None:
        for i, nm in enumerate(names): slacks[nm] = float(res.ineqlin.slack[i]); duals[nm] = float(res.ineqlin.marginals[i])
    tranche_allocs = [{"name": t.name,"amount": float(d[k]),"rate": float(r[k]) if t.rate_type == "fixed" else None,"index": getattr(t, "index", None),"spread": getattr(t, "spread", None),"io_months": int(getattr(t, "io_months", 0))} for k,t in enumerate(tr)]
    return {"stack_summary":{"ltv": float(total_debt / P) if P > 0 else 0.0,"total_debt": total_debt,"weighted_cost": weighted_cost,"min_dscr": min_dscr_real},
            "tranche_allocations": tranche_allocs,"hedges": [],
            "constraints_report":{"binding": binding_constraints(slacks),"shadow_prices": shadow_prices(duals, unit="AED")},
            "downloads":{"pdf_term_sheet": now_stamp("debt_stack_term_sheet", "pdf"),"xlsx_amort": now_stamp("debt_amort", "xlsx")}}
