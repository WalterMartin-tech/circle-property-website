import React, { useState } from "react";

interface InsuranceResult {
  perCar: number[];
  fleet: number[];
}

const InsuranceCard: React.FC = () => {
  const [company, setCompany] = useState("NSIA");
  const [carModel, setCarModel] = useState("Toyota Corolla");
  const [sumInsured, setSumInsured] = useState(0);
  const [numVehicles, setNumVehicles] = useState(0);
  const [rate, setRate] = useState(3.09);
  const [liability, setLiability] = useState(177801);
  const [discountY2, setDiscountY2] = useState(10);
  const [discountY3, setDiscountY3] = useState(10);
  const [results, setResults] = useState<InsuranceResult | null>(null);
  const [showAdmin, setShowAdmin] = useState(false);

  const formatNumber = (num: number) =>
    new Intl.NumberFormat("en-US").format(Math.round(num));

  const handleCalculate = () => {
    const base = (sumInsured * rate) / 100 + liability;
    const y1 = base;
    const y2 = base * (1 - discountY2 / 100);
    const y3 = base * (1 - discountY3 / 100);

    const perCar = [y1, y2, y3];
    const fleet = perCar.map((val) => val * numVehicles);

    setResults({ perCar, fleet });
  };

// Auto-recalculate whenever number of vehicles changes
React.useEffect(() => {
  if (numVehicles > 0) {
    handleCalculate();
  }
}, [numVehicles]);


  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white shadow-md rounded-2xl space-y-6">
      <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-semibold">
        IPA Calculator _ Module Insurance – Ivory Coast (v1.4)
      </div>

      {/* Insurance Company & Car Model in 2-col grid */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-600 font-medium">
            Insurance Company
          </label>
          <select
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono px-3 py-2"
          >
            <option>NSIA</option>
            <option>Saar (decommissioning end of 2025)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 font-medium">
            Car Model
          </label>
          <input
            type="text"
            value={carModel}
            onChange={(e) => setCarModel(e.target.value)}
            className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono px-3 py-2"
          />
        </div>
      </div>

      {/* Sum Insured */}
      <div>
        <label className="block text-sm text-gray-600 font-medium">
          Sum Insured Y1 (Catalogue Price, CFA)
        </label>
        <input
          type="text"
          value={formatNumber(sumInsured)}
          onChange={(e) =>
            setSumInsured(Number(e.target.value.replace(/,/g, "")))
          }
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono px-3 py-2"
        />
      </div>

      {/* Number of Vehicles */}
      <div>
        <label className="block text-sm text-gray-600 font-medium">
          Number of Vehicles
        </label>
        <input
          type="number"
          min={1}
          value={numVehicles}
          onChange={(e) => setNumVehicles(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm font-mono px-3 py-2"
        />
      </div>

      {/* Admin Toggle */}
      <button
        onClick={() => setShowAdmin(!showAdmin)}
        className="text-sm text-blue-600 underline"
      >
        {showAdmin ? "Hide Admin Settings" : "Show Admin Settings"}
      </button>

      {showAdmin && (
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Insurance Rate (%)
            </label>
            <input
              type="number"
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm font-mono px-3 py-2 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Auto Liability Insurance (CFA)
            </label>
            <input
              type="text"
              value={formatNumber(liability)}
              onChange={(e) =>
                setLiability(Number(e.target.value.replace(/,/g, "")))
              }
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm font-mono px-3 py-2 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Discount Y2 (%)
            </label>
            <input
              type="number"
              value={discountY2}
              onChange={(e) => setDiscountY2(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm font-mono px-3 py-2 text-gray-500"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 font-medium">
              Discount Y3 (%)
            </label>
            <input
              type="number"
              value={discountY3}
              onChange={(e) => setDiscountY3(Number(e.target.value))}
              className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm sm:text-sm font-mono px-3 py-2 text-gray-500"
            />
          </div>
        </div>
      )}

      {/* Calculate */}
      <button
        onClick={handleCalculate}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-xl shadow hover:bg-blue-700"
      >
        Calculate
      </button>

      {/* Results */}
      {results && (
        <div className="p-4 bg-gray-50 rounded-xl shadow-inner">
          <h3 className="text-lg font-semibold mb-3">Insurance Premiums (CFA)</h3>
          <div className="grid grid-cols-3 gap-4 font-mono">
            <div></div>
            <div className="font-semibold">Per Car</div>
            <div className="font-semibold">Fleet ({numVehicles} cars)</div>

            {["Y1", "Y2", "Y3"].map((year, i) => (
  <React.Fragment key={year}>
    <div>{year}</div>
    <div>{formatNumber(results.perCar[i])}</div>
    <div className="flex items-center justify-between">
      <span>{formatNumber(results.fleet[i])}</span>   {/* ✅ fixed */}
      <button
        onClick={() =>
          copyToClipboard(`${formatNumber(results.fleet[i])} CFA`)
        }
        className="ml-2 text-blue-600 text-xs underline"
      >
        Copy
      </button>
    </div>
  </React.Fragment>
))}

          </div>
        </div>
      )}

      <button className="mt-4 bg-gray-600 text-white px-4 py-2 rounded-xl shadow hover:bg-gray-700">
        ← Back to Main Calculator
      </button>
    </div>
  );
};

export default InsuranceCard;
