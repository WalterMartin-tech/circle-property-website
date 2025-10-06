from fastapi import APIRouter, HTTPException
from ..schemas.leasing import LeasingRequest
from ..services.optimizers.leasing_lp import solve_leasing_lp
router = APIRouter(prefix="/leasing-mix", tags=["Leasing Mix"])
@router.post("/optimize")
def optimize(req: LeasingRequest):
    out = solve_leasing_lp(req)
    if "error" in out: raise HTTPException(status_code=422, detail=out)
    return out
