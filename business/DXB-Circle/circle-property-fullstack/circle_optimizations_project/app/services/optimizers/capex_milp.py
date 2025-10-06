from ortools.linear_solver import pywraplp
from .common import now_stamp
def solve_capex_milp(req) -> dict:
    H = int(req.horizon_months); projs = req.projects; cash = list(map(float, req.monthly_cash_cap)); Pmax = int(req.contractor_capacity.max_parallel_projects)
    solver = pywraplp.Solver.CreateSolver("CBC")
    if solver is None: return {"error": "MILP solver unavailable", "fix_suggestions": [{"change": "Install OR-Tools CBC", "impact": "Required"}]}
    s, y, BIGM = {}, {}, (max([p.max_spend for p in projs]) if projs else 1e6)
    for j,p in enumerate(projs):
        for t in range(1,H+1):
            s[j,t] = solver.NumVar(0.0, BIGM, f"s_{j}_{t}")
            y[j,t] = solver.IntVar(0, 1, f"y_{j}_{t}")
    for j,p in enumerate(projs):
        for t in range(1,H+1):
            if t < p.earliest_month or t > p.latest_month: solver.Add(s[j,t]==0); solver.Add(y[j,t]==0)
            else: solver.Add(s[j,t] <= BIGM * y[j,t])
        total = solver.Sum([s[j,t] for t in range(1,H+1)]); solver.Add(total >= p.min_spend); solver.Add(total <= p.max_spend)
    for t in range(1,H+1):
        solver.Add(solver.Sum([s[j,t] for j,_ in enumerate(projs)]) <= cash[t-1])
        solver.Add(solver.Sum([y[j,t] for j,_ in enumerate(projs)]) <= Pmax)
    obj = solver.Sum([p.uplift_rate * solver.Sum([s[j,t] for t in range(1,H+1)]) for j,p in enumerate(projs)]); solver.Maximize(obj)
    status = solver.Solve()
    if status not in (pywraplp.Solver.OPTIMAL, pywraplp.Solver.FEASIBLE):
        return {"error": "Model infeasible","fix_suggestions":[{"change":"Increase monthly cash caps","impact":"+ feasibility"},{"change":"Lower project min spend","impact":"+ feasibility"},{"change":"Increase max parallel projects","impact":"+ feasibility"}]}
    schedule, uplift = [], 0.0
    for t in range(1,H+1):
        month_spend = 0.0; breakdown = []
        for j,p in enumerate(projs):
            v = s[j,t].solution_value()
            if v > 1e-6: breakdown.append({"project_id": p.project_id, "spend": float(v)}); month_spend += v
        schedule.append({"month": t, "spend": float(month_spend), "projects": breakdown})
    for j,p in enumerate(projs): uplift += p.uplift_rate * sum(s[j,t].solution_value() for t in range(1,H+1))
    return {"schedule": schedule,"expected_annual_noi_uplift": float(uplift),"constraints_report": {"binding": [], "shadow_prices": []},
            "downloads": {"xlsx_gantt": now_stamp("capex_gantt", "xlsx"), "csv_schedule": now_stamp("capex_schedule", "csv")}}
