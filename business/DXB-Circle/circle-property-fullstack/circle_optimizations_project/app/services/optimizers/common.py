from typing import Dict
from datetime import datetime
import pytz
TZ = pytz.timezone("Asia/Dubai")
def now_stamp(prefix: str, ext: str) -> str:
    dt = datetime.now(TZ).strftime("%Y-%m-%d_%H%M%S")
    return f"/files/outputs/{prefix}_{dt}.{ext}"
def binding_constraints(slacks: Dict[str, float], tol: float = 1e-6):
    return [{"name": k, "slack": float(v)} for k, v in slacks.items() if v <= tol]
def shadow_prices(duals: Dict[str, float], unit: str):
    return [{"constraint": k, "unit": unit, "marginal_value": float(v)} for k, v in duals.items()]
