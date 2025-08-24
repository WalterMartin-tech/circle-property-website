from fastapi import APIRouter

router = APIRouter()

@router.get("/")
def list_insurance():
    return {"status": "insurance ok"}
