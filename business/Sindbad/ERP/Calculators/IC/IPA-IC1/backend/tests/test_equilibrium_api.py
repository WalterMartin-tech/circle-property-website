import pytest

# Reuse shared fixtures from conftest.py:
#   api_client  -> TestClient(app)
#   auth_headers -> {"Authorization": f"Bearer {token}"}
#   sample_payload -> minimal valid payload


@pytest.fixture
def sample_payload():
    return {
        "principal": 100_000,
        "rate": 0.12,
        "term_months": 24,
        "vat_rate": 0.18,
        "asset_price": 100_000,
    }


def test_equilibrium_principal_ok(api_client, auth_headers, sample_payload):
    resp = api_client.post(
        "/equilibrium/principal", headers=auth_headers, json=sample_payload
    )
    assert resp.status_code == 200
    eq = resp.json()["equilibrium"]
    assert "lhs" in eq and "rhs" in eq


def test_equilibrium_f_ok(api_client, auth_headers, sample_payload):
    resp = api_client.post("/equilibrium/f", headers=auth_headers, json=sample_payload)
    assert resp.status_code == 200
    eq = resp.json()["equilibrium"]
    assert eq["method"].startswith("f_")


def test_equilibrium_f_bisect_ok(api_client, auth_headers, sample_payload):
    resp = api_client.post(
        "/equilibrium/f_bisect", headers=auth_headers, json=sample_payload
    )
    assert resp.status_code == 200
    eq = resp.json()["equilibrium"]
    assert "f_solved" in eq


# --- Error cases --- #


def test_equilibrium_principal_missing_principal(
    api_client, auth_headers, sample_payload
):
    bad_payload = dict(sample_payload)
    bad_payload.pop("principal", None)
    resp = api_client.post(
        "/equilibrium/principal", headers=auth_headers, json=bad_payload
    )
    assert resp.status_code == 400
    assert "Missing required field" in resp.json()["detail"]


def test_equilibrium_f_invalid_payload(api_client, auth_headers):
    # deliberately send junk
    resp = api_client.post("/equilibrium/f", headers=auth_headers, json={"foo": "bar"})
    assert resp.status_code == 400
    assert "Missing required field" in resp.json()["detail"]
