import os
import sys

from fastapi import FastAPI
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.status import HTTP_400_BAD_REQUEST

from backend.apps.auth.routes import router as auth_router
from backend.apps.insurance.routes import router as insurance_router
from backend.apps.vehicles.routes import router as vehicles_router
from backend.core.routes import router as core_router

# Ensure repo root on path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)

app = FastAPI(title="IPA Calculator API")


# --- Validation error handler (422 → 400) ---
@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request, exc: RequestValidationError):
    detail = "Missing required field"
    if exc.errors():
        error = exc.errors()[0]
        etype = error.get("type", "")
        msg = error.get("msg", "")
        if etype.startswith("type_error") or "valid" in msg.lower():
            detail = "Invalid type for field"
    return JSONResponse(
        status_code=HTTP_400_BAD_REQUEST,
        content={"detail": detail},
    )


# --- CORS setup ---
origins = [
    o.strip()
    for o in os.getenv(
        "FRONTEND_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000"
    ).split(",")
    if o.strip()
]
koyeb = os.getenv("KOYEB_APP_DOMAIN")
if koyeb:
    origins.append(f"https://{koyeb}")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Routers ---
app.include_router(vehicles_router, prefix="/vehicles", tags=["vehicles"])
app.include_router(insurance_router, prefix="/insurance", tags=["Insurance"])
app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(core_router, tags=["Core"])


# --- Health endpoint ---
@app.get("/health")
def health():
    return {"status": "ok"}


# --- Optional: dev mode router ---
if os.getenv("APP_MODE", "dev") == "dev":
    from fastapi import APIRouter

    dev_router = APIRouter()

    @dev_router.get("/dev/ping")
    def ping():
        return {"ping": "pong"}

    app.include_router(dev_router, tags=["Dev"])
