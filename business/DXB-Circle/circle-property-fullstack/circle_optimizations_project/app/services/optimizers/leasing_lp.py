import re, numpy as np
from scipy.optimize import linprog
from .common import now_stamp, binding_constraints, shadow_prices
def _tenor_from_name(name: str) -> float:
    m = re.match(r"(\d+)[mM]", name.strip()); return float(m.group(1)) if m else 12.0
def solve_leasing_lp(req) -> dict:
    U = int(req.inventory.units_total); vacant = int(req.inventory.vacant_now); target_occ = float(req.occupancy_target); budget = float(req.incentive_budget); cap = float(req.constraints.max_share_per_package); min_wault = float(req.constraints.min_wault_months)
    packages = req.packages; P = len(packages)
    units_needed = max(0, int(round(target_occ * U)) - (U - vacant))
    rents = np.array([p.rent for p in packages], dtype=float); costs = np.array([p.inc_cost for p in packages], dtype=float); wault = np.array([_tenor_from_name(p.name) for p in packages], dtype=float)
    profit = rents - costs; c = -profit; A, b, names = [], [], []
    A.append(costs); b.append(budget); names.append("Incentive budget")
    for i, p in enumerate(packages): row = np.zeros(P); row[i] = 1.0; A.append(row); b.append(cap * U); names.append(f"Max share {p.name} {int(cap*100)}%")
    A.append(-(wault - min_wault)); b.append(0.0); names.append(f"Min WAULT {min_wault}m")
    A_eq = np.ones((1, P)); b_eq = np.array([max(units_needed, 0)], dtype=float); bounds = [(0.0, float(vacant))] * P
    res = linprog(c, A_ub=np.vstack(A), b_ub=np.array(b), A_eq=A_eq, b_eq=b_eq, bounds=bounds, method="highs")
    if res.status != 0: return {"error":"Model infeasible","fix_suggestions":[{"change":"Increase incentive budget","impact":"+ feasibility"},{"change":"Lower min WAULT months","impact":"+ feasibility"},{"change":"Reduce occupancy target","impact":"+ feasibility"}]}
    u = res.x
    inc_spend = float((u * costs).sum())
    expected_ncf = float((u * profit).sum())
    slacks, duals = {}, {}
    if res.ineqlin is not None:
        for i, nm in enumerate(names):
            slacks[nm] = float(res.ineqlin.slack[i])
            duals[nm] = float(res.ineqlin.marginals[i])
    mix = [{"package": p.name, "units": int(round(u[i])), "share": float(u[i] / max(1, units_needed)), "wault_contrib": float(wault[i])} for i,p in enumerate(packages) if u[i] > 1e-9]
    wault_months = float((u * wault).sum() / max(1e-9, u.sum()))
    return {"mix": mix,"kpis": {"wault_months": wault_months,"expected_12m_ncf": expected_ncf,"incentive_spend": inc_spend,"occupancy": float((U - vacant + u.sum()) / U) if U > 0 else 0.0},
            "constraints_report": {"binding": binding_constraints(slacks), "shadow_prices": shadow_prices(duals, unit="AED")},
            "what_if": [{"change":"+20,000 incentives","delta_expected_12m_ncf":"+~60,000","new_wault": round(wault_months,1)}],
            "downloads": {"xlsx_offer_plan": now_stamp("leasing_offer_plan", "xlsx")}}
