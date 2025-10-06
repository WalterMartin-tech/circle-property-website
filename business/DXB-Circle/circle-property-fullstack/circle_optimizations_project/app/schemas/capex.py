from typing import List
from pydantic import BaseModel, conint, confloat
from .common import ConstraintsReport, Downloads
class CapexProject(BaseModel): project_id: str; earliest_month: conint(ge=1); latest_month: conint(ge=1); min_spend: confloat(ge=0); max_spend: confloat(ge=0); uplift_rate: confloat(ge=0)
class ContractorCapacity(BaseModel): max_parallel_projects: conint(ge=1)
class CapexRequest(BaseModel): horizon_months: conint(ge=1); monthly_cash_cap: List[confloat(ge=0)]; contractor_capacity: ContractorCapacity; projects: List[CapexProject]
class MonthProjectSpend(BaseModel): project_id: str; spend: confloat(ge=0)
class MonthSchedule(BaseModel): month: conint(ge=1); spend: confloat(ge=0); projects: List[MonthProjectSpend]
class CapexResponse(BaseModel): schedule: List[MonthSchedule]; expected_annual_noi_uplift: confloat(ge=0); constraints_report: ConstraintsReport; downloads: Downloads
