from pathlib import Path
from datetime import datetime
import pytz
TZ = pytz.timezone("Asia/Dubai")
BASE = Path("files/outputs").resolve()
def ensure_base() -> Path: BASE.mkdir(parents=True, exist_ok=True); return BASE
def stamped(name: str, ext: str) -> str:
    ensure_base(); ts = datetime.now(TZ).strftime("%Y-%m-%d_%H%M%S"); path = BASE / f"{name}_{ts}.{ext}"; return str(path)
