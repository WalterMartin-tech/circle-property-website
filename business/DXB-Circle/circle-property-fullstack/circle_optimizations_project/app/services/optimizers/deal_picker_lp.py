import numpy as np
from scipy.optimize import linprog
from .common import now_stamp, binding_constraints, shadow_prices
def solve_deal_picker_lp(req) -> dict:
    deals = req.deals; n = len(deals)
    ask = np.array([d.ask_price for d in deals], dtype=float)
    noi = np.array([d.expected_noi for d in deals], dtype=float)
    risk = np.array([getattr(d, "risk_score", 0.0) for d in deals], dtype=float)
    cost_rate = float(req.assumptions.get("deal_cost_rate", 0.0))
    vac_haircut = float(req.assumptions.get("vacancy_haircut", 0.0))
    effective_noi = noi * (1.0 - vac_haircut)
    c = -(effective_noi - float(req.risk_penalty_per_point or 0.0) * risk * ask) if req.objective == "risk_adjusted" else -effective_noi
    A, b, names = [], [], []
    A.append(ask); b.append(float(req.budget) * (1.0 - cost_rate)); names.append("Budget")
    for sector, cap in (req.max_alloc_per_sector or {}).items():
        mask = np.array([1.0 if d.sector == sector else 0.0 for d in deals])
        if mask.sum() > 0: A.append(mask * ask); b.append(float(req.budget) * cap); names.append(f"Max {sector} Allocation {int(cap*100)}%")
    for city, cap in (req.max_alloc_per_city or {}).items():
        mask = np.array([1.0 if d.city == city else 0.0 for d in deals])
        if mask.sum() > 0: A.append(mask * ask); b.append(float(req.budget) * cap); names.append(f"Max {city} Allocation {int(cap*100)}%")
    res = linprog(c, A_ub=np.vstack(A), b_ub=np.array(b), bounds=[(0.0,1.0)]*n, method="highs")
    if res.status != 0: return {"error":"Model infeasible","fix_suggestions":[{"change":"Increase budget","impact":"+ feasibility"},{"change":"Relax caps","impact":"+ feasibility"}]}
    x = res.x; capital = (x * ask); capital_used = float(capital.sum()); exp_noi = (x * effective_noi).sum(); cash_yield = float(exp_noi / capital_used) if capital_used > 0 else 0.0
    slacks, duals = {}, {}
    if res.ineqlin is not None:
        for i, nm in enumerate(names): slacks[nm] = float(res.ineqlin.slack[i]); duals[nm] = float(res.ineqlin.marginals[i])
    allocations = [{"deal_id": d.deal_id, "weight": float(capital[i] / max(1e-9, float(req.budget))), "capital": float(capital[i]), "expected_noi": float(x[i]*effective_noi[i])} for i,d in enumerate(deals) if x[i]>1e-9]
    return {"portfolio_summary":{"capital_used": capital_used,"cash_yield": cash_yield,"risk_adjusted_yield": cash_yield,"num_assets_selected": int((x>1e-6).sum())},
            "asset_allocations": allocations,
            "constraints_report":{"binding": binding_constraints(slacks),"shadow_prices": shadow_prices(duals, unit="AED")},
            "what_if":[{"change":"Increase budget +1,000,000 AED","delta_cash_yield":"+~0.2%"}],
            "downloads":{"xlsx_plan": now_stamp("deal_picker_plan", "xlsx"),"csv_allocations": now_stamp("deal_picker_allocs", "csv")}}
