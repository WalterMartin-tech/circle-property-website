from typing import List, Optional
from pydantic import BaseModel, confloat, conint
from .common import ConstraintsReport, Downloads
class Tranche(BaseModel): name: str; rate_type: str; rate: Optional[confloat(ge=0)] = None; index: Optional[str] = None; spread: Optional[confloat(ge=0)] = None; cap_rate: Optional[confloat(ge=0)] = None; max_share: confloat(ge=0, le=1); io_months: Optional[conint(ge=0)] = 0
class HedgeInstrument(BaseModel): type: str; tenor_months: conint(gt=0); premium_rate: Optional[confloat(ge=0)] = None; strike: Optional[confloat(ge=0)] = None; fixed_rate: Optional[confloat(ge=0)] = None
class RateScenario(BaseModel): name: str; sofr: confloat(ge=0); weight: confloat(ge=0, le=1)
class DebtTargets(BaseModel): max_ltv: confloat(gt=0, le=1); min_dscr: confloat(gt=0); min_fixed_share: confloat(ge=0, le=1) = 0
class DebtStackRequest(BaseModel):
    purchase_price: confloat(gt=0); equity_cap: confloat(ge=0); noi_schedule: dict; targets: DebtTargets; tranches: List[Tranche]; hedge_menu: List[HedgeInstrument] = []; rate_scenarios: List[RateScenario] = []
class TrancheAllocation(BaseModel):
    name: str; amount: confloat(ge=0); rate: Optional[confloat(ge=0)] = None; io_months: int = 0; index: Optional[str] = None; spread: Optional[confloat(ge=0)] = None; effective_rate_base: Optional[confloat(ge=0)] = None
class StackSummary(BaseModel): ltv: confloat(ge=0, le=1); total_debt: confloat(ge=0); weighted_cost: confloat(ge=0); min_dscr: confloat(ge=0)
class HedgePick(BaseModel): type: str; notional: confloat(ge=0); strike: Optional[confloat(ge=0)] = None; premium: Optional[confloat(ge=0)] = None
class DebtStackResponse(BaseModel): stack_summary: StackSummary; tranche_allocations: List[TrancheAllocation]; hedges: List[HedgePick]; constraints_report: ConstraintsReport; downloads: Downloads
