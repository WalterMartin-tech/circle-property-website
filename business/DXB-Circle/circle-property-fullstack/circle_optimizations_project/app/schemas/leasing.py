from typing import List
from pydantic import BaseModel, confloat, conint
from .common import ConstraintsReport, Downloads, WhatIf
class Inventory(BaseModel): units_total: conint(ge=0); vacant_now: conint(ge=0)
class LeasePackage(BaseModel): name: str; rent: confloat(ge=0); inc_cost: confloat(ge=0); expected_takeup: confloat(ge=0, le=1)
class LeasingConstraints(BaseModel): max_share_per_package: confloat(ge=0, le=1); min_wault_months: confloat(ge=0)
class LeasingRequest(BaseModel): inventory: Inventory; occupancy_target: confloat(ge=0, le=1); incentive_budget: confloat(ge=0); packages: List[LeasePackage]; constraints: LeasingConstraints
class MixItem(BaseModel): package: str; units: conint(ge=0); share: confloat(ge=0, le=1); wault_contrib: confloat(ge=0)
class LeasingKPIs(BaseModel): wault_months: confloat(ge=0); expected_12m_ncf: confloat(ge=0); incentive_spend: confloat(ge=0); occupancy: confloat(ge=0, le=1)
class LeasingResponse(BaseModel): mix: List[MixItem]; kpis: LeasingKPIs; constraints_report: ConstraintsReport; what_if: List[WhatIf] = []; downloads: Downloads
