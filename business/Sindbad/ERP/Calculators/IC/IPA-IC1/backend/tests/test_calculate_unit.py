from fastapi import FastAPI
from fastapi.testclient import TestClient

from backend.apps.core.routes import router as core_router

# Create a minimal app with only the core router
app = FastAPI()
app.include_router(core_router)
client = TestClient(app)


def test_calculate_basic_shape():
    body = {
        "principal": 1000000,
        "rate": 0.05,
        "term_months": 12,
        "balloon": 0,
    }
    resp = client.post("/calculate", json=body)
    assert resp.status_code == 200
    data = resp.json()
    assert "totals" in data
    assert isinstance(data["totals"], dict)
