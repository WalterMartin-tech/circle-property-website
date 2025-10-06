from fastapi import APIRouter, HTTPException
from ..schemas.debt_stack import DebtStackRequest
from ..services.optimizers.debt_stack_lp import solve_debt_stack_lp
router = APIRouter(prefix="/debt-stack", tags=["Debt Stack"])
@router.post("/optimize")
def optimize(req: DebtStackRequest):
    out = solve_debt_stack_lp(req)
    if "error" in out: raise HTTPException(status_code=422, detail=out)
    return out
