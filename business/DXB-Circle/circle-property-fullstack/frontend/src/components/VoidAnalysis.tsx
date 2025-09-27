'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts'
import ConsultationModal from './ConsultationModal'

interface VoidData {
  month: string
  voidRate: number
  arrearRate: number
  marketAverage: number
}

export default function VoidAnalysis() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const data: VoidData[] = [
    { month: 'Jan', voidRate: 12.5, arrearRate: 3.2, marketAverage: 14.8 },
    { month: 'Feb', voidRate: 11.8, arrearRate: 3.0, marketAverage: 14.2 },
    { month: 'Mar', voidRate: 10.2, arrearRate: 2.8, marketAverage: 13.5 },
    { month: 'Apr', voidRate: 9.8, arrearRate: 2.5, marketAverage: 12.9 },
    { month: 'May', voidRate: 8.9, arrearRate: 2.3, marketAverage: 12.1 },
    { month: 'Jun', voidRate: 8.1, arrearRate: 2.1, marketAverage: 11.6 },
    { month: 'Jul', voidRate: 7.8, arrearRate: 1.9, marketAverage: 11.2 },
    { month: 'Aug', voidRate: 7.5, arrearRate: 1.8, marketAverage: 10.8 },
    { month: 'Sep', voidRate: 7.2, arrearRate: 1.6, marketAverage: 10.5 }
  ]

  const riskFactors = [
    { factor: 'Economic Uncertainty', impact: 'Medium', trend: 'Stable', description: 'Regional economic conditions remain supportive' },
    { factor: 'New Supply', impact: 'High', trend: 'Increasing', description: 'Q4 2024 will see significant new completions' },
    { factor: 'Tourism Recovery', impact: 'Low', trend: 'Positive', description: 'Strong tourism supporting STR demand' },
    { factor: 'Regulation Changes', impact: 'Medium', trend: 'Stable', description: 'New rental laws provide tenant/landlord clarity' }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 mb-2">{label} 2024</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> {entry.value}%
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200'
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'Low': return 'text-green-600 bg-green-50 border-green-200'
      default: return 'text-slate-600 bg-slate-50 border-slate-200'
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 border border-slate-200 mb-12"
    >
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          Void & Arrears Analysis
        </h3>
        <p className="text-slate-600">
          Comprehensive risk assessment with market benchmarking and trend analysis
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Trend Chart */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Vacancy & Arrears Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#64748b' }}
                  label={{ value: 'Percentage (%)', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="marketAverage"
                  stackId="1"
                  stroke="#94a3b8"
                  fill="#f1f5f9"
                  name="Market Average"
                />
                <Line 
                  type="monotone" 
                  dataKey="voidRate" 
                  stroke="#dc2626" 
                  strokeWidth={3}
                  name="Void Rate"
                  dot={{ fill: '#dc2626', strokeWidth: 2 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="arrearRate" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  name="Arrear Rate"
                  dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className="font-semibold text-slate-900 mb-4">Risk Factors Assessment</h4>
          <div className="space-y-4">
            {riskFactors.map((risk, index) => (
              <div key={risk.factor} className="border border-slate-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h5 className="font-medium text-slate-900">{risk.factor}</h5>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getImpactColor(risk.impact)}`}>
                    {risk.impact} Impact
                  </span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-slate-600">Trend: <strong>{risk.trend}</strong></span>
                </div>
                <p className="text-sm text-slate-600">{risk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key Metrics Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-slate-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600">7.2%</div>
          <div className="text-sm text-slate-600">Current Void Rate</div>
          <div className="text-xs text-green-600">-5.3% vs Jan</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-600">1.6%</div>
          <div className="text-sm text-slate-600">Arrear Rate</div>
          <div className="text-xs text-green-600">-1.6% vs Jan</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900">10.5%</div>
          <div className="text-sm text-slate-600">Market Average</div>
          <div className="text-xs text-slate-600">Current benchmark</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">3.3%</div>
          <div className="text-sm text-slate-600">Outperformance</div>
          <div className="text-xs text-slate-600">vs market average</div>
        </div>
      </div>

      {/* Methodology Note */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <h4 className="font-medium text-slate-900 mb-2">Methodology & Sources</h4>
        <p className="text-sm text-slate-600 mb-3">
          Void rates calculated from active listings vs occupied units. Arrears based on 30+ day overdue accounts. 
          Market average weighted by property value and location. Data sources: DLD, RERA, proprietary tracking.
        </p>
        <button 
          onClick={() => setIsConsultationModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Download detailed methodology →
        </button>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Detailed Methodology Request"
      />
    </motion.div>
  )
}
