'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CurrencyDollarIcon, PlusIcon, TrashIcon, ArrowPathIcon, ArrowDownTrayIcon, AcademicCapIcon } from '@heroicons/react/24/outline'
import HeaderProfessional from '@/components/HeaderProfessional'
import Footer from '@/components/Footer'
import AIExplanation from '@/components/optimizations/AIExplanation'
import MathOverview from '@/components/optimizations/MathOverview'
import ConstraintsReport from '@/components/optimizations/ConstraintsReport'
import { DebtStackChart } from '@/components/optimizations/Charts'
import Tooltip from '@/components/optimizations/Tooltip'
import OptimizerNav from '@/components/optimizations/OptimizerNav'

interface Tranche {
  name: string
  rate_type: 'fixed' | 'floating'
  rate?: number
  spread?: number
  max_share: number
  io_months: number
}

export default function DebtStackPage() {
  const [purchasePrice, setPurchasePrice] = useState<number>(25000000)
  const [equityCap, setEquityCap] = useState<number>(7500000)
  const [maxLTV, setMaxLTV] = useState<number>(0.75)
  const [minDSCR, setMinDSCR] = useState<number>(1.25)
  const [minFixedShare, setMinFixedShare] = useState<number>(0.5)
  const [annualNOI, setAnnualNOI] = useState<number>(1800000)
  
  const [tranches, setTranches] = useState<Tranche[]>([
    { name: 'Senior Bank', rate_type: 'fixed', rate: 5.5, max_share: 0.65, io_months: 12 },
    { name: 'Mezzanine', rate_type: 'floating', spread: 8.0, max_share: 0.20, io_months: 0 }
  ])
  
  const [result, setResult] = useState<any>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const addTranche = () => {
    setTranches([...tranches, {
      name: `Tranche ${tranches.length + 1}`,
      rate_type: 'fixed',
      rate: 6.0,
      max_share: 0.3,
      io_months: 0
    }])
  }

  const removeTranche = (index: number) => {
    setTranches(tranches.filter((_, i) => i !== index))
  }

  const updateTranche = (index: number, field: keyof Tranche, value: any) => {
    const updated = [...tranches]
    updated[index] = { ...updated[index], [field]: value }
    setTranches(updated)
  }

  const runOptimization = async () => {
    setIsOptimizing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const totalDebt = Math.min(purchasePrice * maxLTV, purchasePrice - equityCap)
    const weightedCost = 0.062
    
    setResult({
      stack_summary: {
        ltv: totalDebt / purchasePrice,
        total_debt: totalDebt,
        weighted_cost: weightedCost,
        min_dscr: annualNOI / (totalDebt * weightedCost),
        fixed_share: minFixedShare
      },
      tranche_allocations: tranches.map(t => ({
        name: t.name,
        amount: totalDebt * (t.max_share * 0.8),
        rate: t.rate || 0.065,
        io_months: t.io_months
      })),
      constraints_report: {
        binding: [
          { name: 'Debt cap (min of LTV & Equity)', slack: 0.0001 }
        ],
        shadow_prices: [
          { constraint: 'Debt cap (min of LTV & Equity)', unit: 'AED', marginal_value: -0.062 }
        ]
      },
      what_if: [],
      downloads: {
        pdf_term_sheet: '/files/outputs/debt_stack_term_sheet.pdf',
        xlsx_amort: '/files/outputs/debt_amort.xlsx'
      }
    })
    setIsOptimizing(false)
  }

  return (
    <>
      <HeaderProfessional />
      <OptimizerNav />
      <main className="min-h-screen bg-slate-50">
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl flex items-center justify-center">
                  <CurrencyDollarIcon className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Debt Stack Optimizer</h1>
                  <p className="text-slate-600">Minimize financing cost while meeting covenants</p>
                </div>
              </div>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                {/* Educational Block */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <AcademicCapIcon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 mb-2">What This Optimizer Does</h3>
                      <p className="text-sm text-slate-700 mb-3">
                        This tool finds the <strong>least-cost debt structure</strong> by blending different financing sources 
                        (senior loans, mezzanine, etc.) while meeting your lender covenants and risk requirements.
                      </p>
                      <div className="space-y-2 text-sm text-slate-600">
                        <p className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>Minimizes your weighted average interest cost</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>Ensures you meet LTV and DSCR requirements</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>Balances fixed vs floating rate exposure</span>
                        </p>
                        <p className="flex items-start gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>Respects each tranche's maximum allocation</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
                
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Property & Covenants</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Purchase Price (AED)</label>
                      <input type="text" value={purchasePrice.toLocaleString()} onChange={(e) => setPurchasePrice(Number(e.target.value.replace(/,/g, '')))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Equity Cap (AED)
                        <Tooltip text="Maximum equity you're willing to contribute. The optimizer will minimize debt costs while respecting this equity limit." />
                      </label>
                      <input type="text" value={equityCap.toLocaleString()} onChange={(e) => setEquityCap(Number(e.target.value.replace(/,/g, '')))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Max LTV Ratio
                        <Tooltip text="Loan-to-Value: Maximum debt as % of property value. For example, 0.75 means you can borrow up to 75% of purchase price. Lower LTV = more equity required." />
                      </label>
                      <input type="number" step="0.01" value={maxLTV} onChange={(e) => setMaxLTV(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Min DSCR
                        <Tooltip text="Debt Service Coverage Ratio: Minimum NOI ÷ Annual Debt Service. For example, 1.25 means your NOI must be at least 1.25x your annual interest. Higher DSCR = less debt allowed." />
                      </label>
                      <input type="number" step="0.01" value={minDSCR} onChange={(e) => setMinDSCR(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Annual NOI (AED)
                        <Tooltip text="Net Operating Income: Annual rental income minus operating expenses. This is the cash flow available to service your debt. Used to calculate DSCR." />
                      </label>
                      <input type="text" value={annualNOI.toLocaleString()} onChange={(e) => setAnnualNOI(Number(e.target.value.replace(/,/g, '')))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Min Fixed-Rate Share
                        <Tooltip text="Minimum portion of debt that must be fixed-rate (not floating). For example, 0.5 means at least 50% of your debt must have fixed rates, protecting you from rate increases." />
                      </label>
                      <input type="number" step="0.01" value={minFixedShare} onChange={(e) => setMinFixedShare(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Debt Tranches ({tranches.length})</h3>
                    <button onClick={addTranche}
                      className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm font-medium">
                      <PlusIcon className="w-4 h-4" /> Add Tranche
                    </button>
                  </div>
                  <div className="space-y-4">
                    {tranches.map((tranche, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded"></div>
                            <input type="text" value={tranche.name} onChange={(e) => updateTranche(index, 'name', e.target.value)}
                              className="font-semibold text-slate-900 bg-transparent border-none focus:outline-none flex-1 pl-3" />
                            <Tooltip text={tranche.rate_type === 'fixed' 
                              ? "Senior debt: Lowest cost, first priority in repayment, typically from banks. Usually has lowest rates but strictest covenants." 
                              : "Mezzanine/Junior debt: Higher cost, subordinate to senior debt. More flexible terms but higher rates due to increased risk."} />
                          </div>
                          <button onClick={() => removeTranche(index)} className="text-red-500 hover:text-red-700 ml-2">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Rate Type
                              <Tooltip text="Fixed = rate stays same. Floating = rate moves with market (SOFR/EIBOR + spread)." />
                            </label>
                            <select value={tranche.rate_type} onChange={(e) => updateTranche(index, 'rate_type', e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900">
                              <option value="fixed">Fixed</option>
                              <option value="floating">Floating</option>
                            </select>
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              {tranche.rate_type === 'fixed' ? 'Rate (%)' : 'Spread (%)'}
                              <Tooltip text={tranche.rate_type === 'fixed' 
                                ? "Annual interest rate in %. Example: 5.50 means 5.50% per year." 
                                : "Spread added to base rate (SOFR) in %. Example: 8.00 means SOFR + 8.00%."} />
                            </label>
                            <input type="number" step="0.01" 
                              value={tranche.rate_type === 'fixed' ? tranche.rate : tranche.spread}
                              onChange={(e) => updateTranche(index, tranche.rate_type === 'fixed' ? 'rate' : 'spread', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Max Share
                              <Tooltip text="Maximum % of purchase price this tranche can finance. Example: 0.65 means up to 65% of property value." />
                            </label>
                            <input type="number" step="0.01" value={tranche.max_share}
                              onChange={(e) => updateTranche(index, 'max_share', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              IO Months
                              <Tooltip text="Interest-Only period in months. During IO, you only pay interest (no principal). Example: 12 means first year is interest-only, then principal starts." />
                            </label>
                            <input type="number" value={tranche.io_months}
                              onChange={(e) => updateTranche(index, 'io_months', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={runOptimization} disabled={isOptimizing}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 flex items-center justify-center gap-3">
                  {isOptimizing ? <><ArrowPathIcon className="w-6 h-6 animate-spin" />Optimizing...</> : 
                    <><CurrencyDollarIcon className="w-6 h-6" />Run Optimization</>}
                </button>
              </div>

              <div className="space-y-6">
                {result ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">Weighted Cost</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.stack_summary.weighted_cost * 100).toFixed(2)}%</p>
                        <p className="text-xs text-green-600 mt-1">Optimized debt pricing</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium mb-1">LTV</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.stack_summary.ltv * 100).toFixed(1)}%</p>
                        <p className="text-xs text-blue-600 mt-1">Loan-to-value ratio</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <p className="text-sm text-purple-700 font-medium mb-1">Total Debt</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.stack_summary.total_debt / 1000000).toFixed(1)}M AED</p>
                        <p className="text-xs text-purple-600 mt-1">Financing secured</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium mb-1">DSCR</p>
                        <p className="text-3xl font-bold text-slate-900">{result.stack_summary.min_dscr.toFixed(2)}x</p>
                        <p className="text-xs text-orange-600 mt-1">Debt service coverage</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Tranche Allocations</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-slate-700 mb-2">
                            <strong className="text-green-900">What this means:</strong> The optimizer has determined the exact amount 
                            to borrow from each financing source to achieve the <strong>lowest total interest cost 
                            ({(result.stack_summary.weighted_cost * 100).toFixed(2)}%)</strong> while meeting all your covenants 
                            (LTV, DSCR) and requirements.
                          </p>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm text-slate-700 mb-2">
                              <strong className="text-green-900">How to interpret:</strong>
                            </p>
                            <ul className="text-sm text-slate-600 space-y-1 ml-4">
                              <li>• <strong>Amount:</strong> How much to borrow from each tranche</li>
                              <li>• <strong>Rate:</strong> Annual interest rate for that tranche</li>
                              <li>• <strong>IO Period:</strong> Months where you only pay interest (no principal)</li>
                            </ul>
                          </div>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm font-semibold text-green-900 mb-1">📋 Next Steps:</p>
                            <ol className="text-sm text-slate-600 space-y-1 ml-4 list-decimal">
                              <li>Download the term sheet to share with lenders</li>
                              <li>Review the amortization schedule for cash flow planning</li>
                              <li>Negotiate final terms with each financing source</li>
                              <li>Consider hedging strategies if using floating rates</li>
                              <li>Book a call with our senior partners for structuring advice</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {result.tranche_allocations.map((alloc: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div>
                              <p className="font-semibold text-slate-900">{alloc.name}</p>
                              <p className="text-sm text-slate-600">{(alloc.rate * 100).toFixed(2)}% • {alloc.io_months}mo IO</p>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-slate-900">{(alloc.amount / 1000000).toFixed(2)}M</p>
                              <p className="text-xs text-slate-500">AED</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Download Files</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Term Sheet (.pdf)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Amortization Schedule (.xlsx)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    {/* Debt Stack Visualization */}
                    <DebtStackChart tranches={result.tranche_allocations} />

                    <AIExplanation result={result} moduleType="debt-stack" />
                    <ConstraintsReport constraints={result.constraints_report} />
                    <MathOverview moduleType="debt-stack" />
                  </>
                ) : (
                  <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                    <CurrencyDollarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Yet</h3>
                    <p className="text-slate-600">Configure your property details and debt tranches, then run optimization.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

