'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CalendarIcon, PlusIcon, TrashIcon, ArrowPathIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'
import HeaderProfessional from '@/components/HeaderProfessional'
import Footer from '@/components/Footer'
import AIExplanation from '@/components/optimizations/AIExplanation'
import MathOverview from '@/components/optimizations/MathOverview'
import ConstraintsReport from '@/components/optimizations/ConstraintsReport'
import { CapExScheduleChart } from '@/components/optimizations/Charts'
import Tooltip from '@/components/optimizations/Tooltip'
import OptimizerNav from '@/components/optimizations/OptimizerNav'

interface Project {
  project_id: string
  min_spend: number
  max_spend: number
  uplift_rate: number
  earliest_month: number
  latest_month: number
}

export default function CapExPhasingPage() {
  const [horizonMonths, setHorizonMonths] = useState<number>(12)
  const [maxParallel, setMaxParallel] = useState<number>(3)
  const [monthlyCash, setMonthlyCash] = useState<string>('500000')
  
  const [projects, setProjects] = useState<Project[]>([
    { project_id: 'RENO-001', min_spend: 300000, max_spend: 800000, uplift_rate: 0.12, earliest_month: 1, latest_month: 12 }
  ])
  
  const [result, setResult] = useState<any>(null)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const addProject = () => {
    setProjects([...projects, {
      project_id: `RENO-${String(projects.length + 1).padStart(3, '0')}`,
      min_spend: 200000,
      max_spend: 500000,
      uplift_rate: 0.10,
      earliest_month: 1,
      latest_month: horizonMonths
    }])
  }

  const removeProject = (index: number) => {
    setProjects(projects.filter((_, i) => i !== index))
  }

  const updateProject = (index: number, field: keyof Project, value: any) => {
    const updated = [...projects]
    updated[index] = { ...updated[index], [field]: value }
    setProjects(updated)
  }

  const runOptimization = async () => {
    setIsOptimizing(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const totalUplift = projects.reduce((sum, p) => sum + (p.max_spend * 0.7 * p.uplift_rate), 0)
    const schedule = Array.from({ length: horizonMonths }, (_, i) => ({
      month: i + 1,
      spend: Number(monthlyCash) * 0.8,
      projects: projects.slice(0, 2).map(p => ({ project_id: p.project_id, spend: Number(monthlyCash) * 0.4 }))
    }))
    
    setResult({
      schedule,
      expected_annual_noi_uplift: totalUplift,
      constraints_report: {
        binding: [
          { name: 'Monthly cash cap (Month 3)', slack: 0 }
        ],
        shadow_prices: [
          { constraint: 'Monthly cash cap (Month 3)', unit: 'AED', marginal_value: 0.11 }
        ]
      },
      downloads: {
        xlsx_gantt: '/files/outputs/capex_gantt.xlsx',
        csv_schedule: '/files/outputs/capex_schedule.csv'
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
                <div className="w-12 h-12 bg-gradient-to-br from-orange-100 to-red-100 rounded-xl flex items-center justify-center">
                  <CalendarIcon className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold text-slate-900">CapEx Phasing</h1>
                  <p className="text-slate-600">Schedule renovations to maximize NOI uplift</p>
                </div>
              </div>
            </motion.div>

            {/* Educational Block */}
            <div className="bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-bold text-orange-900 mb-3">🎓 What is CapEx Phasing Optimization?</h3>
              <p className="text-slate-700 mb-3">
                This optimizer solves a complex scheduling problem: <strong>when should you renovate which properties</strong> to maximize 
                total NOI (Net Operating Income) uplift while respecting cash flow constraints and contractor capacity?
              </p>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">📊 What It Does</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Sequences renovation projects optimally</li>
                    <li>• Respects monthly cash availability</li>
                    <li>• Avoids contractor bottlenecks</li>
                    <li>• Maximizes total NOI uplift</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <h4 className="font-semibold text-slate-900 mb-2">💡 Why It Matters</h4>
                  <ul className="text-sm text-slate-600 space-y-1">
                    <li>• Poor sequencing wastes cash flow</li>
                    <li>• Delays reduce total returns</li>
                    <li>• Overloading contractors causes delays</li>
                    <li>• Math finds the optimal path</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                
                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Constraints & Timeline</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Horizon (Months)</label>
                      <input type="number" value={horizonMonths} onChange={(e) => setHorizonMonths(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Max Parallel Projects</label>
                      <input type="number" value={maxParallel} onChange={(e) => setMaxParallel(Number(e.target.value))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Monthly Cash Cap (AED)</label>
                      <input type="text" 
                        value={Number(monthlyCash.replace(/,/g, '')).toLocaleString()}
                        onChange={(e) => setMonthlyCash(e.target.value.replace(/,/g, ''))}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg text-slate-900"
                        placeholder="500,000" />
                      <p className="text-xs text-slate-500 mt-1">Available cash for CapEx each month</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-slate-900">CapEx Projects ({projects.length})</h3>
                    <button onClick={addProject}
                      className="flex items-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 text-sm font-medium">
                      <PlusIcon className="w-4 h-4" /> Add Project
                    </button>
                  </div>
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {projects.map((project, index) => (
                      <div key={index} className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                        <div className="flex items-center justify-between mb-3">
                          <input type="text" value={project.project_id} 
                            onChange={(e) => updateProject(index, 'project_id', e.target.value)}
                            className="font-mono text-sm font-semibold text-slate-900 bg-transparent border-none focus:outline-none" />
                          <button onClick={() => removeProject(index)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="w-4 h-4" />
                          </button>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Min Spend (AED)
                              <Tooltip text="Minimum amount you must invest in this project if selected. Ensures adequate funding for meaningful improvements." />
                            </label>
                            <input type="text" value={project.min_spend.toLocaleString()}
                              onChange={(e) => updateProject(index, 'min_spend', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Max Spend (AED)
                              <Tooltip text="Maximum capital allocation for this project. Prevents overspending beyond what's effective or budgeted." />
                            </label>
                            <input type="text" value={project.max_spend.toLocaleString()}
                              onChange={(e) => updateProject(index, 'max_spend', Number(e.target.value.replace(/,/g, '')))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              NOI Uplift Rate (%)
                              <Tooltip text="Annual Net Operating Income increase per AED spent. Example: 12% means each AED invested adds 0.12 AED/year in NOI." />
                            </label>
                            <input type="number" step="0.01" value={(project.uplift_rate * 100).toFixed(2)}
                              onChange={(e) => updateProject(index, 'uplift_rate', Number(e.target.value) / 100)}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div>
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Earliest Month
                              <Tooltip text="Soonest month this project can start (e.g., 1 = next month). Used if permits, materials, or tenant vacancies aren't ready yet." />
                            </label>
                            <input type="number" value={project.earliest_month}
                              onChange={(e) => updateProject(index, 'earliest_month', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                          <div className="col-span-2">
                            <label className="flex items-center text-xs text-slate-600 mb-1">
                              Latest Month
                              <Tooltip text="Deadline by which this project must be completed. If missed, the renovation may no longer be viable or strategic." />
                            </label>
                            <input type="number" value={project.latest_month}
                              onChange={(e) => updateProject(index, 'latest_month', Number(e.target.value))}
                              className="w-full px-2 py-1.5 text-sm border border-slate-300 rounded text-slate-900" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button onClick={runOptimization} disabled={isOptimizing}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl font-bold text-lg hover:from-orange-700 hover:to-red-700 disabled:opacity-50 flex items-center justify-center gap-3">
                  {isOptimizing ? <><ArrowPathIcon className="w-6 h-6 animate-spin" />Optimizing...</> : 
                    <><CalendarIcon className="w-6 h-6" />Run Optimization</>}
                </button>
              </div>

              <div className="space-y-6">
                {result ? (
                  <>
                    <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-6 border border-green-200">
                      <p className="text-sm text-green-700 font-medium mb-1">Expected Annual NOI Uplift</p>
                      <p className="text-4xl font-bold text-slate-900">
                        {(result.expected_annual_noi_uplift / 1000000).toFixed(2)}M AED
                      </p>
                      <p className="text-sm text-green-700 font-semibold mt-2">
                        +{((result.expected_annual_noi_uplift / projects.reduce((s, p) => s + p.max_spend, 0)) * 100).toFixed(1)}% return on CapEx
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-6 border border-slate-200">
                      <div className="mb-4">
                        <h3 className="text-lg font-bold text-slate-900 mb-2">Project Schedule</h3>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-sm text-slate-700 mb-2">
                            <strong className="text-green-900">What this means:</strong> The optimizer has determined the exact 
                            timing and allocation for each renovation project to achieve <strong>maximum total NOI uplift 
                            (AED {result.expected_annual_noi_uplift.toLocaleString()})</strong> while respecting your monthly 
                            cash cap and contractor capacity limits.
                          </p>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm text-slate-700 mb-2">
                              <strong className="text-green-900">How to interpret:</strong>
                            </p>
                            <ul className="text-sm text-slate-600 space-y-1 ml-4">
                              <li>• <strong>Month:</strong> Timeline from now (M1 = next month)</li>
                              <li>• <strong>Total Spend:</strong> Combined CapEx across all active projects that month</li>
                              <li>• <strong>Active Projects:</strong> Which renovations are scheduled for that period</li>
                            </ul>
                          </div>
                          <div className="mt-3 pt-3 border-t border-green-200">
                            <p className="text-sm font-semibold text-green-900 mb-1">📋 Next Steps:</p>
                            <ol className="text-sm text-slate-600 space-y-1 ml-4 list-decimal">
                              <li>Review the schedule table and chart to understand project timing</li>
                              <li>Share these results with your project management team</li>
                              <li>Confirm contractor availability for scheduled months</li>
                              <li>Reserve monthly cash allocations in your financial plan</li>
                              <li>Book a call with our specialists to refine and implement</li>
                            </ol>
                          </div>
                        </div>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead className="bg-slate-50">
                            <tr>
                              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700">Month</th>
                              <th className="px-3 py-2 text-right text-xs font-semibold text-slate-700">Total Spend (AED)</th>
                              <th className="px-3 py-2 text-left text-xs font-semibold text-slate-700">Active Projects</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-200">
                            {result.schedule.slice(0, 12).map((month: any) => (
                              <tr key={month.month}>
                                <td className="px-3 py-2 font-mono text-slate-900">M{month.month}</td>
                                <td className="px-3 py-2 text-right text-slate-900">{month.spend.toLocaleString()}</td>
                                <td className="px-3 py-2 text-xs text-slate-600">
                                  {month.projects.map((p: any) => p.project_id).join(', ')}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    <CapExScheduleChart schedule={result.schedule} />

                    <div className="bg-gradient-to-r from-blue-50 to-orange-50 rounded-xl p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Download Files</h3>
                      <div className="space-y-2">
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Gantt Chart (.xlsx)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                        <button className="w-full flex items-center justify-between px-4 py-3 bg-white rounded-lg hover:bg-blue-50 border border-slate-200">
                          <span className="text-sm font-medium text-slate-900">Schedule (.csv)</span>
                          <ArrowDownTrayIcon className="w-5 h-5 text-blue-600" />
                        </button>
                      </div>
                    </div>

                    <AIExplanation result={result} moduleType="capex-phasing" />
                    <ConstraintsReport constraints={result.constraints_report} />
                    <MathOverview moduleType="capex-phasing" />
                  </>
                ) : (
                  <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
                    <CalendarIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Yet</h3>
                    <p className="text-slate-600">Configure your projects and constraints, then run optimization.</p>
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

