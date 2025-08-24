import pytest

def test_login_json(api_client):
    r = api_client.post(
        "/auth/login/json",
        json={"username": "admin@example.com", "password": "admin"},
    )
    assert r.status_code == 200
    data = r.json()
    assert "access_token" in data
