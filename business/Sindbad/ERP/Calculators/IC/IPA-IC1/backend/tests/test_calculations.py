from backend.tests.utils_assertions import assert_vat_consistency


def test_annuity_calculation(api_client, auth_headers):
    body = {"principal": 500_000, "rate": 0.10, "term_months": 24}
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    assert resp.status_code == 200
    data = resp.json()
    assert "totals" in data
    assert data["totals"]["annuity"] > 0


def test_balloon_payment_case(api_client, auth_headers):
    """Compare with non-balloon case to ensure balloon lowers monthly annuity."""
    base = {"principal": 300_000, "rate": 0.08, "term_months": 36}
    with_balloon = dict(base, balloon=50_000)

    r1 = api_client.post("/calculate", headers=auth_headers, json=base)
    r2 = api_client.post("/calculate", headers=auth_headers, json=with_balloon)
    assert r1.status_code == r2.status_code == 200

    annuity_base = r1.json()["totals"]["annuity"]
    annuity_balloon = r2.json()["totals"]["annuity"]
    assert annuity_balloon < annuity_base


def test_zero_term_months(api_client, auth_headers):
    body = {"principal": 100_000, "rate": 0.05, "term_months": 0}
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    # Depending on backend: safe default or error
    assert resp.status_code in (200, 400)


def test_high_principal_stress(api_client, auth_headers):
    body = {"principal": 10_000_000_000, "rate": 0.07, "term_months": 120}
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    assert resp.status_code == 200
    data = resp.json()
    assert data["totals"]["annuity"] > 1_000_000


def test_vat_case(api_client, auth_headers):
    body = {
        "principal": 200_000,
        "rate": 0.1,
        "term_months": 12,
        "vat_rate": 0.18,
        "asset_price": 200_000,
    }
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    assert resp.status_code == 200
    assert_vat_consistency(resp.json()["totals"])


def test_calculate_missing_principal(api_client, auth_headers):
    body = {
        "rate": 0.1,
        "term_months": 12,
    }
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    assert resp.status_code == 400
    assert "Missing required field" in resp.json()["detail"]


def test_calculate_invalid_rate(api_client, auth_headers):
    body = {
        "principal": 100_000,
        "rate": "not-a-number",
        "term_months": 12,
    }
    resp = api_client.post("/calculate", headers=auth_headers, json=body)
    assert resp.status_code == 400
    assert "Invalid type for field" in resp.json()["detail"]
