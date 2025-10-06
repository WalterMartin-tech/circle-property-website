from typing import Dict, List, Optional
from pydantic import BaseModel, Field, conlist, confloat, conint
class ShadowPrice(BaseModel): constraint: str; unit: str; marginal_value: float
class BindingConstraint(BaseModel): name: str; slack: float
class ConstraintsReport(BaseModel): binding: List[BindingConstraint] = []; shadow_prices: List[ShadowPrice] = []
class Downloads(BaseModel):
    xlsx_plan: Optional[str] = None; csv_allocations: Optional[str] = None; pdf_term_sheet: Optional[str] = None
    xlsx_amort: Optional[str] = None; xlsx_gantt: Optional[str] = None; csv_schedule: Optional[str] = None; xlsx_offer_plan: Optional[str] = None
class WhatIf(BaseModel): change: str; delta_cash_yield: Optional[str] = None; delta_expected_12m_ncf: Optional[str] = None; new_wault: Optional[confloat(ge=0)] = None
class ErrorFixSuggestion(BaseModel): change: str; impact: str
class Error422(BaseModel): error: str = "Model infeasible"; fix_suggestions: List[ErrorFixSuggestion] = []
