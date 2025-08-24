def assert_vat_consistency(totals: dict):
    """
    Validate that totals dict has ipa_vat / asset_vat / vat_delta
    and that vat_delta = ipa_vat - asset_vat within tolerance.
    """
    required = {"ipa_vat", "asset_vat", "vat_delta"}
    assert required.issubset(totals.keys()), f"Missing VAT keys in totals: {totals.keys()}"
    assert all(isinstance(totals[k], (int, float)) for k in required), "VAT fields must be numeric"

    lhs = totals["ipa_vat"]
    rhs = totals["asset_vat"]
    delta = totals["vat_delta"]
    assert abs(delta - (lhs - rhs)) < 1e-6, f"Inconsistent VAT delta: {delta} vs {lhs-rhs}"
