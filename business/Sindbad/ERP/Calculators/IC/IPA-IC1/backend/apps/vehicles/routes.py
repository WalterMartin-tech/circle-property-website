# backend/apps/vehicles/routes.py
from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_vehicles():
    return {"status": "vehicles ok"}
