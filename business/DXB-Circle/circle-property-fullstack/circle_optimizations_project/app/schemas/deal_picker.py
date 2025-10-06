from typing import Dict, List, Optional
from pydantic import BaseModel, Field, conint, confloat
from .common import ConstraintsReport, Downloads, WhatIf
class Deal(BaseModel): deal_id: str; ask_price: confloat(gt=0); expected_noi: confloat(ge=0); sector: str; city: str; risk_score: confloat(ge=0, le=5) = 3; must_buy: bool = False
class DealPickerRequest(BaseModel):
    budget: confloat(gt=0); objective: str = Field(pattern="^(cash_yield|risk_adjusted)$"); risk_penalty_per_point: confloat(ge=0) = 0.0
    max_assets: Optional[conint(ge=1)] = None; max_alloc_per_sector: Dict[str, confloat(ge=0, le=1)] = {}; max_alloc_per_city: Dict[str, confloat(ge=0, le=1)] = {}
    allow_fractional_allocations: bool = True; assumptions: Dict[str, confloat(ge=0)] = {}; deals: List[Deal]
class AssetAllocation(BaseModel): deal_id: str; weight: confloat(ge=0, le=1); capital: confloat(ge=0); expected_noi: confloat(ge=0)
class PortfolioSummary(BaseModel): capital_used: confloat(ge=0); cash_yield: confloat(ge=0); risk_adjusted_yield: confloat(ge=0); num_assets_selected: int
class DealPickerResponse(BaseModel):
    portfolio_summary: PortfolioSummary; asset_allocations: List[AssetAllocation]; constraints_report: ConstraintsReport; what_if: List[WhatIf] = []; downloads: Downloads
