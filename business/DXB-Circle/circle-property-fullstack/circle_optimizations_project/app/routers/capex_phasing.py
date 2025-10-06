from fastapi import APIRouter, HTTPException
from ..schemas.capex import CapexRequest
from ..services.optimizers.capex_milp import solve_capex_milp
router = APIRouter(prefix="/capex-phasing", tags=["Capex Phasing"])
@router.post("/optimize")
def optimize(req: CapexRequest):
    out = solve_capex_milp(req)
    if "error" in out: raise HTTPException(status_code=422, detail=out)
    return out
