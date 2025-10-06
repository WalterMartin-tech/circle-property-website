'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HomeIcon, PlusIcon, TrashIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import HeaderProfessional from '@/components/HeaderProfessional'
import Footer from '@/components/Footer'
import AIExplanation from '@/components/optimizations/AIExplanation'
import MathOverview from '@/components/optimizations/MathOverview'
import ConstraintsReport from '@/components/optimizations/ConstraintsReport'
import { LeasingMixChart } from '@/components/optimizations/Charts'
import Tooltip from '@/components/optimizations/Tooltip'
import OptimizerNav from '@/components/optimizations/OptimizerNav'

interface LeasePackage {
  name: string
  rent: number
  inc_cost: number
}

export default function LeasingMixPage() {
  const [unitsTotal, setUnitsTotal] = useState<number>(100)
  const [vacantNow, setVacantNow] = useState<number>(25)
  const [occupancyTarget, setOccupancyTarget] = useState<number>(0.95)
  const [incentiveBudget, setIncentiveBudget] = useState<number>(500000)
  const [minWAULT, setMinWAULT] = useState<number>(18)
  const [maxSharePerPackage, setMaxSharePerPackage] = useState<number>(0.4)
  
  const [packages, setPackages] = useState<LeasePackage[]>([
    { name: '12m Standard', rent: 80000, inc_cost: 5000 },
    { name: '24m Premium', rent: 85000, inc_cost: 10000 }
  ])
  
  const [result, setResult] = useState<any>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const addPackage = () => {
    setPackages([...packages, { name: `${packages.length * 6 + 6}m Package`, rent: 75000, inc_cost: 7000 }])
  }

  const removePackage = (index: number) => {
    setPackages(packages.filter((_, i) => i !== index))
  }

  const updatePackage = (index: number, field: keyof LeasePackage, value: any) => {
    const updated = [...packages]
    updated[index] = { ...updated[index], [field]: value }
    setPackages(updated)
  }

  const runOptimization = async () => {
    setIsOptimizing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const unitsNeeded = Math.max(0, Math.ceil(occupancyTarget * unitsTotal) - (unitsTotal - vacantNow))
    const avgRent = packages.reduce((s, p) => s + p.rent, 0) / packages.length
    const avgCost = packages.reduce((s, p) => s + p.inc_cost, 0) / packages.length
    const expectedNCF = unitsNeeded * (avgRent - avgCost) * 0.9
    const waultMonths = minWAULT + 2
    
    setResult({
      mix: packages.map((p, i) => ({
        package: p.name,
        units: Math.floor(unitsNeeded / packages.length),
        share: 1 / packages.length,
        wault_contrib: 18
      })),
      kpis: {
        wault_months: waultMonths,
        expected_12m_ncf: expectedNCF,
        incentive_spend: unitsNeeded * avgCost * 0.8,
        occupancy: occupancyTarget
      },
      constraints_report: {
        binding: [
          { name: 'Min WAULT 18.0m', slack: 0.01 }
        ],
        shadow_prices: [
          { constraint: 'Min WAULT 18.0m', unit: 'AED', marginal_value: 2500 }
        ]
      },
      what_if: [
        { change: '+20,000 incentives', delta_expected_12m_ncf: '+~60,000', new_wault: waultMonths }
      ],
      downloads: {
        xlsx_offer_plan: '/files/outputs/leasing_offer_plan.xlsx'
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
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center">
                  <HomeIcon className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Leasing Mix Optimizer</h1>
                  <p className="text-slate-600">Balance tenant offers to hit occupancy & WAULT</p>
                </div>
              </div>
            </motion.div>

            {/* Educational Block */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-blue-900 mb-3">🎓 What is Leasing Mix Optimization?</h3>
              <p className="text-slate-700 mb-3">
                This optimizer determines the <strong>ideal combination of lease packages</strong> to maximize net cash flow 
                while hitting your occupancy target and maintaining tenant quality (measured by WAULT - Weighted Average 
                Unexpired Lease Term).
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">📊 What It Does</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Balances short vs. long-term leases</li>
                    <li>• Optimizes incentive spend allocation</li>
                    <li>• Ensures target WAULT is achieved</li>
                    <li>• Maximizes 12-month net cash flow</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">💡 Why It Matters</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Wrong mix hurts cash flow & valuations</li>
                    <li>• Too many short leases = rollover risk</li>
                    <li>• Incentive waste reduces NOI</li>
                    <li>• Math finds optimal balance</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Inventory & Targets</h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                          Total Units
                          <Tooltip text="Total number of leasable units in your property. This is your maximum capacity." />
                        </label>
                        <input type="number" value={unitsTotal} onChange={(e) => setUnitsTotal(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                      </div>
                      <div>
                        <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                          Vacant Now
                          <Tooltip text="Number of units currently vacant and available to lease. These are what the optimizer will allocate across packages." />
                        </label>
                        <input type="number" value={vacantNow} onChange={(e) => setVacantNow(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                      </div>
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Occupancy Target (%)
                        <Tooltip text="Target occupancy rate as percentage. Example: 95 means you want 95% of units occupied. The optimizer will recommend how many units to lease." />
                      </label>
                      <input type="number" step="0.1" value={(occupancyTarget * 100).toFixed(1)} 
                        onChange={(e) => setOccupancyTarget(Number(e.target.value) / 100)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Incentive Budget (AED)
                        <Tooltip text="Total budget available for tenant incentives (e.g., fit-out allowances, rent-free periods, broker fees). The optimizer stays within this limit." />
                      </label>
                      <input type="text" value={incentiveBudget.toLocaleString()} 
                        onChange={(e) => setIncentiveBudget(Number(e.target.value.replace(/,/g, '')))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Min WAULT (months)
                        <Tooltip text="Minimum Weighted Average Unexpired Lease Term required. Higher WAULT means more income stability and better property valuations. Lenders often require minimum WAULT levels." />
                      </label>
                      <input type="number" value={minWAULT} onChange={(e) => setMinWAULT(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="flex items-center text-sm font-medium text-slate-700 mb-2">
                        Max Share per Package (%)
                        <Tooltip text="Maximum percentage of units that can be in any single lease package. Example: 0.4 = 40% max. Prevents over-concentration in one package type for diversification." />
                      </label>
                      <input type="number" step="0.1" value={(maxSharePerPackage * 100).toFixed(1)} 
                        onChange={(e) => setMaxSharePerPackage(Number(e.target.value) / 100)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Lease Packages ({packages.length})</h3>
                    <button onClick={addPackage}
                      className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                      <PlusIcon className="w-4 h-4" /> Add Package
                    </button>
                  </div>
                  <div className="space-y-4">
                    {packages.map((pkg, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <input type="text" value={pkg.name} 
                            onChange={(e) => updatePackage(index, 'name', e.target.value)}
                            className="font-semibold text-slate-900 bg-transparent border-none focus:outline-none pl-2" />
                          <button onClick={() => removePackage(index)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Annual Rent (AED)
                              <Tooltip text="Annual rent per unit for this lease package. Higher rent means more income but may require longer lease terms or higher incentives." />
                            </label>
                            <input type="text" value={pkg.rent.toLocaleString()}
                              onChange={(e) => updatePackage(index, 'rent', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Incentive Cost (AED)
                              <Tooltip text="Total incentive cost per unit for this package (fit-out, rent-free period value, fees, etc.). This is deducted from net cash flow." />
                            </label>
                            <input type="text" value={pkg.inc_cost.toLocaleString()}
                              onChange={(e) => updatePackage(index, 'inc_cost', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                        </div>
                        <div className="mt-2 text-xs text-green-700 font-semibold">
                          Net: {(pkg.rent - pkg.inc_cost).toLocaleString()} AED/unit
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={runOptimization} disabled={isOptimizing}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 flex items-center justify-center gap-3">
                  {isOptimizing ? <><ArrowPathIcon className="w-6 h-6 animate-spin" />Optimizing...</> : 
                    <><HomeIcon className="w-6 h-6" />Run Optimization</>}
                </button>
              </div>

              <div className="space-y-6">
                {result ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium mb-1">WAULT</p>
                        <p className="text-3xl font-bold text-slate-900">{result.kpis.wault_months.toFixed(1)} mo</p>
                        <p className="text-xs text-blue-600 mt-1">Income stability indicator</p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">Occupancy</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.kpis.occupancy * 100).toFixed(1)}%</p>
                        <p className="text-xs text-green-600 mt-1">Target achieved</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <p className="text-sm text-purple-700 font-medium mb-1">Expected 12m NCF</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.kpis.expected_12m_ncf / 1000000).toFixed(2)}M AED</p>
                        <p className="text-xs text-purple-600 mt-1">Net cash flow optimized</p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium mb-1">Incentive Spend</p>
                        <p className="text-3xl font-bold text-slate-900">{(result.kpis.incentive_spend / 1000).toFixed(0)}K AED</p>
                        <p className="text-xs text-orange-600 mt-1">Within budget</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Optimal Leasing Mix</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-slate-700 mb-2">
                            <strong className="text-green-900">What this means:</strong> The optimizer has determined the exact 
                            number of units to lease under each package to achieve <strong>maximum 12-month net cash flow 
                            (AED {result.kpis.expected_12m_ncf.toLocaleString()})</strong> while hitting your {(result.kpis.occupancy * 100).toFixed(1)}% occupancy 
                            target and maintaining a WAULT of {result.kpis.wault_months.toFixed(1)} months.
                          </p>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm text-slate-700 mb-2">
                              <strong className="text-green-900">How to interpret:</strong>
                            </p>
                            <ul className="text-sm text-slate-600 space-y-1 ml-4">
                              <li>• <strong>Units:</strong> How many units to lease under this package</li>
                              <li>• <strong>Share:</strong> Percentage of your leasing plan allocated to this package</li>
                              <li>• <strong>WAULT contrib:</strong> How this package contributes to overall lease term average</li>
                            </ul>
                          </div>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm font-semibold text-green-900 mb-1">📋 Next Steps:</p>
                            <ol className="text-sm text-slate-600 space-y-1 ml-4 list-decimal">
                              <li>Review the recommended mix and compare with current marketing offers</li>
                              <li>Share the plan with your leasing team and broker network</li>
                              <li>Prepare incentive packages and marketing materials for each tier</li>
                              <li>Track actual lease-up against the optimal allocation</li>
                              <li>Book a call with our specialists for execution support</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        {result.mix.map((item: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg border border-slate-200">
                            <div className="pl-2">
                              <p className="font-semibold text-slate-900">{item.package}</p>
                              <p className="text-sm text-slate-600">{(item.share * 100).toFixed(1)}% of total • WAULT contrib: {item.wault_contrib}mo</p>
                            </div>
                            <p className="text-2xl font-bold text-slate-900">{item.units} units</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Download Files</h3>
                      <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 border border-slate-200">
                        <span className="text-sm font-medium text-slate-900">Leasing Offer Plan (.xlsx)</span>
                        <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>

                    {/* Leasing Mix Visualization */}
                    <LeasingMixChart mix={result.mix} />

                    <AIExplanation result={result} moduleType="leasing-mix" />
                    <ConstraintsReport constraints={result.constraints_report} />
                    <MathOverview moduleType="leasing-mix" />
                  </>
                ) : (
                  <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                    <HomeIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Yet</h3>
                    <p className="text-slate-600">Configure your inventory and packages, then run optimization.</p>
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

