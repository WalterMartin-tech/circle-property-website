def test_health_endpoint(api_client, auth_headers):
    resp = api_client.get("/health", headers=auth_headers)
    assert resp.status_code == 200
    assert resp.json() == {"status": "ok"}
