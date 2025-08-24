import pytest

from backend.core.calculations.equilibrium import (
    solve_equilibrium_f,
    solve_equilibrium_f_bisect,
    solve_equilibrium_principal,
)


@pytest.fixture
def sample_payload():
    # Minimal viable payload – adjust to your real numbers
    return {
        "principal": 100_000,
        "rate": 0.12,
        "term_months": 24,
        "vat_rate": 0.18,
        "asset_price": 100_000,
    }


def test_principal_equilibrium(sample_payload):
    result = solve_equilibrium_principal(sample_payload, tol=1.0)
    eq = result["equilibrium"]

    # Assertions
    assert "lhs" in eq and "rhs" in eq
    assert isinstance(eq["lhs"], float)
    assert isinstance(eq["rhs"], float)
    # Check that difference is within tolerance
    assert abs(eq["lhs"] - eq["rhs"]) <= eq["tolerance"]


def test_f_equilibrium_direct(sample_payload):
    result = solve_equilibrium_f(sample_payload)
    eq = result["equilibrium"]

    assert eq["method"] == "f_direct"
    assert "lhs" in eq and "rhs" in eq and "f_solved" in eq
    assert abs(eq["lhs"] - eq["rhs"]) <= eq["error_abs"] + 1e-6


def test_f_equilibrium_bisect_fallback(sample_payload, monkeypatch):
    # Force fallback: temporarily remove equilibrium_error_for_f
    import backend.core.calculations.equilibrium as eqmod

    if hasattr(eqmod, "equilibrium_error_for_f"):
        monkeypatch.delattr(eqmod, "equilibrium_error_for_f")

    result = solve_equilibrium_f_bisect(sample_payload, tol=1.0)
    eq = result["equilibrium"]
    assert eq["method"] == "f_direct_fallback"
    assert "tolerance" in eq and "iterations" in eq
    assert abs(eq["lhs"] - eq["rhs"]) <= eq["tolerance"]


def test_f_equilibrium_bisect_real(sample_payload):
    # Only runs if helper is present
    import backend.core.calculations.equilibrium as eqmod

    if not hasattr(eqmod, "equilibrium_error_for_f"):
        pytest.skip("equilibrium_error_for_f not implemented")

    result = solve_equilibrium_f_bisect(sample_payload, tol=1.0)
    eq = result["equilibrium"]
    assert eq["method"] == "f_bisection"
    assert "tolerance" in eq and "iterations" in eq
    assert abs(eq["lhs"] - eq["rhs"]) <= eq["tolerance"]
