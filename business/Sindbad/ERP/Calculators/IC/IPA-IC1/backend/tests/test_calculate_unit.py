import pytest

def test_calculate_basic_shape(client, token):
    body = {
        "principal": 1_000_000,
        "rate": 0.05,
        "term_months": 12,
        "balloon": 0,
    }
    resp = client.post(
        "/calculate",
        headers={"Authorization": f"Bearer {token}"},
        json=body,
    )
    assert resp.status_code == 200




