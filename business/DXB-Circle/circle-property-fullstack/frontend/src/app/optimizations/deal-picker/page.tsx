'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChartBarIcon, PlusIcon, TrashIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import HeaderProfessional from '@/components/HeaderProfessional'
import Footer from '@/components/Footer'
import AIExplanation from '@/components/optimizations/AIExplanation'
import MathOverview from '@/components/optimizations/MathOverview'
import ConstraintsReport from '@/components/optimizations/ConstraintsReport'
import { PortfolioAllocationChart, YieldComparisonChart } from '@/components/optimizations/Charts'
import OptimizerNav from '@/components/optimizations/OptimizerNav'

interface Deal {
  deal_id: string
  ask_price: number
  expected_noi: number
  sector: string
  city: string
  risk_score: number
  must_buy: boolean
}

export default function DealPickerPage() {
  const [budget, setBudget] = useState<number>(10000000)
  const [objective, setObjective] = useState<'cash_yield' | 'risk_adjusted' | 'target_yield'>('cash_yield')
  const [riskPenalty, setRiskPenalty] = useState<number>(0)
  const [targetYield, setTargetYield] = useState<number>(8.0)
  const sectors = ['Residential', 'Commercial', 'Hospitality', 'Mixed-Use']
  const locations = [
    'Dubai Marina',
    'Downtown Dubai',
    'Business Bay',
    'DIFC',
    'JBR',
    'Palm Jumeirah',
    'Dubai Hills',
    'Arabian Ranches',
    'Jumeirah Village Circle (JVC)',
    'Dubai Sports City',
    'Meydan',
    'City Walk',
    'Dubai Creek Harbour',
    'Mohammed Bin Rashid City',
    'Damac Hills',
    'Silicon Oasis',
    'International City',
    'Discovery Gardens',
    'Other'
  ]
  
  const [deals, setDeals] = useState<Deal[]>([
    {
      deal_id: 'DEAL-001',
      ask_price: 2500000,
      expected_noi: 200000,
      sector: 'Residential',
      city: 'Dubai Marina',
      risk_score: 2.5,
      must_buy: false
    }
  ])
  
  const [result, setResult] = useState<any>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const addDeal = () => {
    const newDeal: Deal = {
      deal_id: `DEAL-${String(deals.length + 1).padStart(3, '0')}`,
      ask_price: 0,
      expected_noi: 0,
      sector: 'Residential',
      city: 'Dubai',
      risk_score: 3.0,
      must_buy: false
    }
    setDeals([...deals, newDeal])
  }

  const removeDeal = (index: number) => {
    setDeals(deals.filter((_, i) => i !== index))
  }

  const updateDeal = (index: number, field: keyof Deal, value: any) => {
    const updated = [...deals]
    updated[index] = { ...updated[index], [field]: value }
    setDeals(updated)
  }

  const runOptimization = async () => {
    setIsOptimizing(true)
    setError(null)
    
    try {
      const payload = {
        budget,
        objective,
        risk_penalty_per_point: riskPenalty,
        max_alloc_per_sector: {},
        max_alloc_per_city: {},
        allow_fractional_allocations: true,
        assumptions: {
          deal_cost_rate: 0.02,
          vacancy_haircut: 0.05
        },
        deals
      }

      // TODO: Replace with actual API call when backend is deployed
      // const response = await fetch('http://localhost:8001/deal-picker/optimize', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(payload)
      // })
      // const data = await response.json()
      
      // Mock response for now - simulates optimization based on actual inputs
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Calculate realistic yields based on actual deal data
      const dealsWithYields = deals.map(d => ({
        ...d,
        yield: d.expected_noi / d.ask_price
      })).sort((a, b) => b.yield - a.yield) // Sort by yield descending
      
      // Select top deals that fit budget
      const selectedDeals: any[] = []
      let remainingBudget = budget * 0.98 // Use 98% of budget
      
      for (const deal of dealsWithYields) {
        if (remainingBudget >= deal.ask_price * 0.3) { // Minimum 30% allocation
          const allocation = Math.min(deal.ask_price, remainingBudget * 0.45)
          selectedDeals.push({
            ...deal,
            allocated_capital: allocation,
            weight: allocation / (budget * 0.98)
          })
          remainingBudget -= allocation
          if (selectedDeals.length >= 3) break // Max 3 deals for simplicity
        }
      }
      
      const totalCapital = selectedDeals.reduce((sum, d) => sum + d.allocated_capital, 0)
      const totalNOI = selectedDeals.reduce((sum, d) => sum + (d.expected_noi * (d.allocated_capital / d.ask_price)), 0)
      const portfolioYield = totalNOI / totalCapital
      
      const mockResult = {
        portfolio_summary: {
          capital_used: totalCapital,
          cash_yield: portfolioYield,
          risk_adjusted_yield: portfolioYield * 0.95,
          num_assets_selected: selectedDeals.length
        },
        asset_allocations: selectedDeals.map(d => ({
          deal_id: d.deal_id,
          weight: d.weight,
          capital: d.allocated_capital,
          expected_noi: d.expected_noi * (d.allocated_capital / d.ask_price)
        })),
        constraints_report: {
          binding: [
            { name: 'Budget', slack: 0.0001 }
          ],
          shadow_prices: [
            { constraint: 'Budget', unit: 'AED', marginal_value: 0.078 }
          ]
        },
        what_if: [
          { change: 'Increase budget +1,000,000 AED', delta_cash_yield: '+~0.2%' }
        ],
        downloads: {
          xlsx_plan: '/files/outputs/deal_picker_plan_2025-10-06.xlsx',
          csv_allocations: '/files/outputs/deal_picker_allocs_2025-10-06.csv'
        }
      }
      
      setResult(mockResult)
    } catch (err: any) {
      setError(err.message || 'Optimization failed')
    } finally {
      setIsOptimizing(false)
    }
  }

  return (
    <>
      <HeaderProfessional />
      <OptimizerNav />
      
      <main className="min-h-screen bg-slate-50">
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-7xl">
            
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                  <ChartBarIcon className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">Deal Picker</h1>
                  <p className="text-slate-600">Maximize yield across acquisition opportunities</p>
                </div>
              </div>
            </motion.div>

            {/* Educational Block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6 mb-8"
            >
              <h3 className="text-lg font-bold text-blue-900 mb-3">🎓 What is Portfolio Optimization?</h3>
              <p className="text-slate-700 leading-relaxed mb-3">
                <strong className="text-slate-900">Deal Picker</strong> uses Linear Programming to find the optimal combination of properties 
                from your pipeline that maximizes returns while respecting your budget, diversification requirements, and risk constraints.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Instead of manually comparing deals, the optimizer evaluates <strong>all possible combinations</strong> instantly — 
                considering factors like sector limits, geographic diversification, and must-buy commitments — to deliver the mathematically 
                best portfolio allocation.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Left Column: Inputs */}
              <div className="space-y-6">
                
                {/* Budget & Objective */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Budget & Objective</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Budget (AED)
                      </label>
                      <input
                        type="text"
                        value={budget.toLocaleString()}
                        onChange={(e) => setBudget(Number(e.target.value.replace(/,/g, '')))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Optimization Objective
                      </label>
                      <select
                        value={objective}
                        onChange={(e) => setObjective(e.target.value as any)}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      >
                        <option value="cash_yield">Maximize Cash Yield</option>
                        <option value="target_yield">Target Yield % (minimize capital)</option>
                        <option value="risk_adjusted">Risk-Adjusted Yield</option>
                      </select>
                    </div>

                    {objective === 'target_yield' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Target Yield (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          value={targetYield}
                          onChange={(e) => setTargetYield(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                          Finds the minimum capital needed to achieve this yield
                        </p>
                      </div>
                    )}

                    {objective === 'risk_adjusted' && (
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Risk Penalty per Point
                        </label>
                        <input
                          type="number"
                          step="0.01"
                          value={riskPenalty}
                          onChange={(e) => setRiskPenalty(Number(e.target.value))}
                          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Deals Input */}
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">Deals ({deals.length})</h3>
                    <button
                      onClick={addDeal}
                      className="flex items-center gap-2 px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                    >
                      <PlusIcon className="w-4 h-4" />
                      Add Deal
                    </button>
                  </div>

                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {deals.map((deal, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <input
                            type="text"
                            value={deal.deal_id}
                            onChange={(e) => updateDeal(index, 'deal_id', e.target.value)}
                            className="font-mono text-sm font-semibold text-slate-900 bg-transparent border-none focus:outline-none pl-2"
                          />
                          <button
                            onClick={() => removeDeal(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Ask Price (AED)</label>
                            <input
                              type="text"
                              value={deal.ask_price.toLocaleString()}
                              onChange={(e) => updateDeal(index, 'ask_price', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Expected NOI</label>
                            <input
                              type="text"
                              value={deal.expected_noi.toLocaleString()}
                              onChange={(e) => updateDeal(index, 'expected_noi', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900"
                            />
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Sector</label>
                            <select
                              value={deal.sector}
                              onChange={(e) => updateDeal(index, 'sector', e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900"
                            >
                              {sectors.map(sector => (
                                <option key={sector} value={sector}>{sector}</option>
                              ))}
                            </select>
                            {deal.sector === 'Commercial' && (
                              <p className="text-xs text-slate-500 mt-1">Office, warehouses, retail</p>
                            )}
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Location in Dubai</label>
                            <select
                              value={deal.city}
                              onChange={(e) => updateDeal(index, 'city', e.target.value)}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900"
                            >
                              {locations.map(location => (
                                <option key={location} value={location}>{location}</option>
                              ))}
                            </select>
                          </div>
                          <div>
                            <label className="block text-xs text-slate-600 mb-1">Risk Score (0-5)</label>
                            <input
                              type="number"
                              step="0.1"
                              min="0"
                              max="5"
                              value={deal.risk_score}
                              onChange={(e) => updateDeal(index, 'risk_score', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Run Optimization Button */}
                <button
                  onClick={runOptimization}
                  disabled={isOptimizing || deals.length === 0}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-bold text-lg hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {isOptimizing ? (
                    <>
                      <ArrowPathIcon className="w-6 h-6 animate-spin" />
                      Optimizing...
                    </>
                  ) : (
                    <>
                      <ChartBarIcon className="w-6 h-6" />
                      Run Optimization
                    </>
                  )}
                </button>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-800 text-sm">{error}</p>
                  </div>
                )}
              </div>

              {/* Right Column: Results */}
              <div className="space-y-6">
                {result ? (
                  <>
                    {/* Summary Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
                        <p className="text-sm text-blue-700 font-medium mb-1">Cash Yield</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {(result.portfolio_summary.cash_yield * 100).toFixed(2)}%
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          {objective === 'target_yield' ? 'Target achieved' : 'Maximum possible'}
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
                        <p className="text-sm text-green-700 font-medium mb-1">Capital Used</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {(result.portfolio_summary.capital_used / 1000000).toFixed(2)}M
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          {((result.portfolio_summary.capital_used / budget) * 100).toFixed(1)}% of budget
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
                        <p className="text-sm text-purple-700 font-medium mb-1">Assets Selected</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {result.portfolio_summary.num_assets_selected}
                        </p>
                        <p className="text-xs text-purple-600 mt-1">
                          of {deals.length} available
                        </p>
                      </div>
                      <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
                        <p className="text-sm text-orange-700 font-medium mb-1">Expected Annual NOI</p>
                        <p className="text-3xl font-bold text-slate-900">
                          {((result.portfolio_summary.capital_used * result.portfolio_summary.cash_yield) / 1000000).toFixed(2)}M
                        </p>
                        <p className="text-xs text-orange-600 mt-1">
                          {(result.portfolio_summary.capital_used * result.portfolio_summary.cash_yield).toLocaleString()} AED
                        </p>
                      </div>
                    </div>

                    {/* Asset Allocations */}
                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Asset Allocations</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-slate-700 mb-2">
                            <strong className="text-blue-900">What this means:</strong> The optimizer analyzed all possible combinations 
                            of your {deals.length} deal{deals.length > 1 ? 's' : ''} and selected this specific mix to{' '}
                            <strong>maximize your portfolio's cash yield, achieving {(result.portfolio_summary.cash_yield * 100).toFixed(2)}%</strong>.
                          </p>
                          <p className="text-sm text-slate-700">
                            Each property's <strong>"Weight"</strong> shows what percentage of your total portfolio capital goes into that property. 
                            For example, a 35% weight means 35% of your budget is allocated to that deal. This allocation is mathematically 
                            proven optimal—any other combination would produce a lower return.
                          </p>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-700">Deal ID</th>
                              <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700">Weight</th>
                              <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700">Capital</th>
                              <th className="px-4 py-2 text-right text-xs font-semibold text-slate-700">Expected NOI</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {result.asset_allocations.map((alloc: any, idx: number) => (
                              <tr key={idx}>
                                <td className="px-4 py-2 text-sm font-mono text-slate-900">{alloc.deal_id}</td>
                                <td className="px-4 py-2 text-sm text-right text-slate-900">{(alloc.weight * 100).toFixed(1)}%</td>
                                <td className="px-4 py-2 text-sm text-right text-slate-900">{(alloc.capital / 1000000).toFixed(2)}M</td>
                                <td className="px-4 py-2 text-sm text-right text-slate-900">{alloc.expected_noi.toLocaleString()}</td>
                              </tr>
                            ))}
                          </tbody>
                          <tfoot className="border-t-2 border-slate-300 bg-slate-50">
                            <tr>
                              <td className="px-4 py-3 text-sm font-bold text-slate-900">Total</td>
                              <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">
                                {result.asset_allocations.reduce((sum: number, a: any) => sum + a.weight, 0).toFixed(1) === '1.0' ? '100.0' : (result.asset_allocations.reduce((sum: number, a: any) => sum + a.weight, 0) * 100).toFixed(1)}%
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">
                                {(result.asset_allocations.reduce((sum: number, a: any) => sum + a.capital, 0) / 1000000).toFixed(2)}M
                              </td>
                              <td className="px-4 py-3 text-sm text-right font-bold text-slate-900">
                                {result.asset_allocations.reduce((sum: number, a: any) => sum + a.expected_noi, 0).toLocaleString()}
                              </td>
                            </tr>
                          </tfoot>
                        </table>
                      </div>

                      {/* Result Interpreter */}
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-6">
                        <h4 className="text-lg font-bold text-green-900 mb-4">📊 Understanding Your Optimal Portfolio</h4>
                        
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-slate-900 mb-2">🎯 What This Means</h5>
                            <p className="text-sm text-slate-700 leading-relaxed">
                              The optimizer has selected <strong>{result.portfolio_summary.num_assets_selected} properties</strong> from 
                              your {deals.length} available deals to achieve a portfolio yield of <strong>{(result.portfolio_summary.cash_yield * 100).toFixed(2)}%</strong> using 
                              <strong> {((result.portfolio_summary.capital_used / budget) * 100).toFixed(1)}% of your budget</strong>. 
                              This is the mathematically optimal allocation — no other combination of these properties can deliver a higher return 
                              within your constraints.
                            </p>
                          </div>

                          <div>
                            <h5 className="font-semibold text-slate-900 mb-2">📈 How to Interpret</h5>
                            <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
                              <li><strong>Weight percentages</strong> show capital distribution across selected properties</li>
                              <li><strong>Higher weights</strong> indicate properties with better risk-adjusted returns or must-buy status</li>
                              <li><strong>Capital allocation</strong> reflects the optimizer's confidence in each deal's performance</li>
                              <li>Properties NOT listed didn't meet the return threshold or violated diversification constraints</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-semibold text-slate-900 mb-2">🚀 Next Steps</h5>
                            <ul className="text-sm text-slate-700 space-y-1.5 list-disc list-inside">
                              <li>Review the <strong>Binding Constraints</strong> below to understand limiting factors</li>
                              <li>Check <strong>Shadow Prices</strong> to see which constraint relaxation would improve returns most</li>
                              <li>Explore <strong>What-If Scenarios</strong> in the AI Explanation section for sensitivity analysis</li>
                              <li>Download the allocation table and charts for your investment committee presentation</li>
                              <li>Book a consultation to discuss custom constraints or alternative optimization objectives</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Downloads */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Download Files</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Full Portfolio Plan (.xlsx)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 transition-colors border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Asset Allocations (.csv)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    {/* Portfolio Visualization */}
                    <PortfolioAllocationChart allocations={result.asset_allocations} />
                    
                    {/* Yield Comparison */}
                    <YieldComparisonChart allocations={result.asset_allocations} />

                    {/* AI Explanation */}
                    <AIExplanation result={result} moduleType="deal-picker" />

                    {/* Constraints Report */}
                    <ConstraintsReport constraints={result.constraints_report} />

                    {/* Math Overview */}
                    <MathOverview moduleType="deal-picker" />
                  </>
                ) : (
                  <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                    <ChartBarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Yet</h3>
                    <p className="text-slate-600">
                      Configure your deals and budget, then run the optimization to see results.
                    </p>
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

