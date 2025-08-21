from typing import Optional

from fastapi import APIRouter, Depends, Header, HTTPException

from .schemas import LoginIn

router = APIRouter()


@router.post("/login/json")
def login_json(body: LoginIn):
    if body.username == "admin@example.com" and body.password == "admin":
        return {"access_token": "demo-token", "token_type": "bearer"}
    raise HTTPException(status_code=401, detail="Invalid credentials")


# very light auth dependency that accepts the demo token
def require_auth(authorization: Optional[str] = Header(None, alias="Authorization")):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Missing bearer token")
    token = authorization.split(" ", 1)[1].strip()
    if token != "demo-token":
        raise HTTPException(status_code=401, detail="Invalid token")
    return True
