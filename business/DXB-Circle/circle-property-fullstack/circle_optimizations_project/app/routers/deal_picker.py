from fastapi import APIRouter, HTTPException
from ..schemas.deal_picker import DealPickerRequest
from ..services.optimizers.deal_picker_lp import solve_deal_picker_lp
router = APIRouter(prefix="/deal-picker", tags=["Deal Picker"])
@router.post("/optimize")
def optimize(req: DealPickerRequest):
    out = solve_deal_picker_lp(req)
    if "error" in out: raise HTTPException(status_code=422, detail=out)
    return out
