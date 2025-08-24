import os
import sys

import pytest
from fastapi.testclient import TestClient

from backend.main import app

# Ensure repo root on path
ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "../.."))
if ROOT not in sys.path:
    sys.path.insert(0, ROOT)


# --- Core fixtures ---
@pytest.fixture(scope="session")
def api_client():
    """Shared TestClient for all API tests."""
    return TestClient(app)


@pytest.fixture(scope="session")
def token(api_client):
    """Try to obtain a valid token. If auth is disabled, return None."""
    try:
        r = api_client.post(
            "/auth/login/json",
            json={"username": "admin@example.com", "password": "admin"},
        )
        if r.status_code == 200:
            return r.json().get("access_token")
    except Exception:
        pass
    return None


@pytest.fixture
def auth_headers(token):
    """Build Authorization header if token exists, else empty headers."""
    if token:
        return {"Authorization": f"Bearer {token}"}
    return {}


# --- Compatibility alias ---
@pytest.fixture(scope="session")
def client(api_client):
    """Alias so tests using 'client' still work."""
    return api_client
