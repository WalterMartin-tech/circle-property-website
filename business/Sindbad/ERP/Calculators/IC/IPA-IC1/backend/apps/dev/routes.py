import os
import traceback

from backend.core.calculations.equilibrium import (
    equilibrium_error_for_principal,
    solve_equilibrium_f_bisect,
    solve_equilibrium_principal,
)
from backend.core.calculations.ipa_engine.engine import Inputs, run_calc
from fastapi import APIRouter, Body, HTTPException
from fastapi.responses import JSONResponse

router = APIRouter()

# --- Public (dev-only) endpoints ---


@router.post("/calculate_public")
async def calculate_public(body: Inputs):
    if os.getenv("DEV_ALLOW_PUBLIC_COMPUTE") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    return run_calc(body)


@router.post("/calculate_public_equilibrium", include_in_schema=False)
async def calculate_public_equilibrium(body: dict = Body(...)):
    if os.getenv("DEV_ALLOW_PUBLIC_COMPUTE") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    try:
        return solve_equilibrium_principal(body)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "error": "equilibrium failed",
                "message": str(e),
                "trace": traceback.format_exc(),
            },
        )


@router.post("/_debug/equilibrium_scan", include_in_schema=False)
async def _debug_equilibrium_scan(body: dict = Body(...)):
    if os.getenv("DEV_ALLOW_PUBLIC_COMPUTE") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    err = equilibrium_error_for_principal(body)
    C = float(body.get("principal", 0) or 0)
    grid = [max(0.01, k * C) for k in (0.1, 0.3, 0.7, 1.0, 1.3, 1.7, 2.5)]
    return {"grid": [{"principal": round(x, 2), "err": round(err(x), 4)} for x in grid]}


@router.post("/calculate_public_equilibrium_fsolve", include_in_schema=False)
async def calculate_public_equilibrium_fsolve(body: dict = Body(...)):
    if os.getenv("DEV_ALLOW_PUBLIC_COMPUTE") != "1":
        raise HTTPException(status_code=404, detail="Not found")
    try:
        return solve_equilibrium_f_bisect(body)
    except Exception as e:
        return JSONResponse(
            status_code=500,
            content={
                "error": "fsolve failed",
                "message": str(e),
                "trace": traceback.format_exc(),
            },
        )
