def test_insurance_endpoint(client, token):
    r = client.get(
        "/insurance/",
        headers={"Authorization": f"Bearer {token}"},
    )
    assert r.status_code == 200
    assert r.json()["status"] == "insurance ok"
