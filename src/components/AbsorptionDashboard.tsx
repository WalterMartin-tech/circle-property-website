'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  HomeIcon, 
  ClockIcon,
  UserGroupIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatNumber } from '@/utils/formatters'

interface Project {
  name: string
  location: string
  totalUnits: number
  leasedUnits: number
  avgRent: number
  targetCompletion: string
}

interface WeeklyData {
  week: string
  leased: number
  inquiries: number
  viewings: number
  conversion: number
}

interface UnitType {
  type: string
  total: number
  leased: number
  avgRent: number
  demand: 'High' | 'Medium' | 'Low'
}

interface LeadSource {
  source: string
  leads: number
  conversions: number
  rate: number
  cost: number
}

export default function AbsorptionDashboard() {
  const [selectedProject, setSelectedProject] = useState('marina-heights')

  const projects: Record<string, Project> = {
    'marina-heights': {
      name: 'Marina Heights',
      location: 'Dubai Marina',
      totalUnits: 284,
      leasedUnits: 207,
      avgRent: 847,
      targetCompletion: '95% by Dec 2025'
    },
    'business-central': {
      name: 'Business Central',
      location: 'Business Bay',
      totalUnits: 156,
      leasedUnits: 142,
      avgRent: 623,
      targetCompletion: '98% by Jan 2026'
    }
  }

  const currentProject = projects[selectedProject]
  const absorptionRate = Math.round((currentProject.leasedUnits / currentProject.totalUnits) * 100)
  const remainingUnits = currentProject.totalUnits - currentProject.leasedUnits

  const weeklyData: WeeklyData[] = [
    { week: 'W40', leased: 12, inquiries: 45, viewings: 28, conversion: 42.9 },
    { week: 'W41', leased: 8, inquiries: 38, viewings: 22, conversion: 36.4 },
    { week: 'W42', leased: 15, inquiries: 52, viewings: 34, conversion: 44.1 },
    { week: 'W43', leased: 11, inquiries: 41, viewings: 26, conversion: 42.3 },
    { week: 'W44', leased: 18, inquiries: 58, viewings: 38, conversion: 47.4 },
    { week: 'W45', leased: 14, inquiries: 46, viewings: 31, conversion: 45.2 }
  ]

  const unitTypes: UnitType[] = [
    { type: 'Studio', total: 48, leased: 41, avgRent: 3200, demand: 'High' },
    { type: '1BR', total: 125, leased: 98, avgRent: 4800, demand: 'High' },
    { type: '2BR', total: 85, leased: 58, avgRent: 7200, demand: 'Medium' },
    { type: '3BR', total: 26, leased: 10, avgRent: 9500, demand: 'Low' }
  ]

  const leadSources: LeadSource[] = [
    { source: 'Bayut', leads: 1247, conversions: 89, rate: 7.1, cost: 340 },
    { source: 'Property Finder', leads: 892, conversions: 67, rate: 7.5, cost: 285 },
    { source: 'Dubizzle', leads: 634, conversions: 34, rate: 5.4, cost: 190 },
    { source: 'Direct/Referral', leads: 289, conversions: 48, rate: 16.6, cost: 0 },
    { source: 'Social Media', leads: 156, conversions: 12, rate: 7.7, cost: 145 }
  ]

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'Low': return 'bg-slate-100 text-slate-800'
      default: return 'bg-slate-100 text-slate-800'
    }
  }

  const getProgressBarColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-green-600'
    if (percentage >= 70) return 'bg-yellow-600'
    return 'bg-blue-600'
  }

  const getRateColor = (rate: number) => {
    if (rate >= 15) return 'text-green-600'
    if (rate >= 7) return 'text-yellow-600'
    return 'text-slate-600'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-8 border border-slate-200"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Absorption Dashboard</h2>
          <p className="text-slate-800">Real-time leasing performance and analytics</p>
        </div>
        <select
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="px-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="marina-heights">Marina Heights</option>
          <option value="business-central">Business Central</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-blue-100 rounded-lg mr-3">
              <ChartBarIcon className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-sm text-blue-700">Absorption Rate</div>
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-1">{absorptionRate}%</div>
          <div className="text-xs text-blue-600">
            {formatNumber(currentProject.leasedUnits)} of {formatNumber(currentProject.totalUnits)} units
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-green-100 rounded-lg mr-3">
              <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-sm text-green-700">Avg. Rent/sqft</div>
          </div>
          <div className="text-3xl font-bold text-green-600 mb-1">AED {currentProject.avgRent}</div>
          <div className="text-xs text-green-600">↗ +5.2% vs market</div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-yellow-100 rounded-lg mr-3">
              <HomeIcon className="w-6 h-6 text-yellow-600" />
            </div>
            <div className="text-sm text-yellow-700">Units Remaining</div>
          </div>
          <div className="text-3xl font-bold text-yellow-600 mb-1">{remainingUnits}</div>
          <div className="text-xs text-yellow-600">Est. 3.2 months to 95%</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-slate-100 rounded-lg mr-3">
              <ArrowTrendingUpIcon className="w-6 h-6 text-slate-700" />
            </div>
            <div className="text-sm text-slate-700">Weekly Velocity</div>
          </div>
          <div className="text-3xl font-bold text-slate-800 mb-1">14</div>
          <div className="text-xs text-slate-700">units/week (avg)</div>
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Weekly Leasing Activity</h3>
        <div className="bg-slate-50 p-6 rounded-xl">
          <div className="flex justify-between items-end mb-4" style={{ height: '200px' }}>
            {weeklyData.map((data, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="text-xs text-slate-700 mb-2">{data.leased}</div>
                <div
                  className="bg-blue-600 rounded-t"
                  style={{
                    width: '24px',
                    height: `${data.leased * 8}px`,
                    minHeight: '4px'
                  }}
                ></div>
                <div className="text-xs text-slate-700 mt-2">{data.week}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="flex items-center space-x-4 text-sm text-slate-700">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
                <span>Units Leased</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Type Performance */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Unit Type Performance</h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Unit Type</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Absorption</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Avg. Rent</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Demand</th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-slate-700">Progress</th>
              </tr>
            </thead>
            <tbody>
              {unitTypes.map((unit, index) => {
                const absorptionPct = Math.round((unit.leased / unit.total) * 100)
                return (
                  <tr key={index} className={index < unitTypes.length - 1 ? 'border-b border-slate-100' : ''}>
                    <td className="px-6 py-4 font-medium text-slate-900">{unit.type}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-semibold text-slate-900">{unit.leased}</span>
                      <span className="text-slate-900 text-sm"> / {unit.total}</span>
                    </td>
                    <td className="px-6 py-4 text-right text-slate-900 font-semibold">{formatCurrency(unit.avgRent)}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDemandColor(unit.demand)}`}>
                        {unit.demand}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="w-16 mx-auto">
                        <div className="w-full h-2 bg-slate-200 rounded-full">
                          <div
                            className={`h-full rounded-full ${getProgressBarColor(absorptionPct)}`}
                            style={{ width: `${absorptionPct}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-900 mt-1">{absorptionPct}%</div>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Sources */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Lead Source Performance</h3>
        <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">Source</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Leads</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Conversions</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Rate</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">Cost/Lead</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((source, index) => (
                <tr key={index} className={index < leadSources.length - 1 ? 'border-b border-slate-100' : ''}>
                  <td className="px-6 py-4 font-medium text-slate-900">{source.source}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-semibold">{formatNumber(source.leads)}</td>
                  <td className="px-6 py-4 text-right text-slate-900 font-semibold">{source.conversions}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`font-semibold ${getRateColor(source.rate)}`}>
                      {source.rate}%
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {source.cost === 0 ? (
                      <span className="text-green-600 font-semibold">Free</span>
                    ) : (
                      <span className="text-slate-900 font-semibold">AED {source.cost}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-blue-50 border border-blue-200 p-6 rounded-xl">
        <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
          <UserGroupIcon className="w-5 h-5 mr-2" />
          Optimization Recommendations
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Increase 3BR marketing budget - low absorption despite high margins</li>
          <li>• Focus referral incentives - highest conversion rate at zero cost</li>
          <li>• Consider studio rent adjustment - high demand allows for 8-12% premium pricing</li>
        </ul>
      </div>
    </motion.div>
  )
}