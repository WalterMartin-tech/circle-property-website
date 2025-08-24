import json

def test_golden_example(api_client, auth_headers):
    case = json.load(open("backend/tests/cases/example_case.json"))
    resp = api_client.post("/calculate", headers=auth_headers, json=case["input"])
    assert resp.status_code == 200
    assert resp.json()["totals"] == case["expected_totals"]
