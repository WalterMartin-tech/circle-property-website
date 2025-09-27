'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'
import ConsultationModal from './ConsultationModal'

interface YieldData {
  name: string
  value: number
  percentage: number
  color: string
}

export default function YieldBands() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const data: YieldData[] = [
    { name: '7%+ (High Yield)', value: 145, percentage: 18, color: '#16a34a' },
    { name: '5-7% (Good Yield)', value: 312, percentage: 39, color: '#3b82f6' },
    { name: '3-5% (Moderate)', value: 248, percentage: 31, color: '#f59e0b' },
    { name: '<3% (Low Yield)', value: 95, percentage: 12, color: '#dc2626' }
  ]

  const totalProperties = data.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 mb-2">{data.name}</p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Properties:</span> {data.value}
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Percentage:</span> {data.percentage}%
          </p>
        </div>
      )
    }
    return null
  }

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Yield Distribution
        </h3>
        <p className="text-slate-600 text-sm">
          Current market yield bands across {totalProperties.toLocaleString()} properties
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Yield Band Details */}
      <div className="space-y-3">
        {data.map((band, index) => (
          <div key={band.name} className="flex items-center justify-between">
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded mr-3"
                style={{ backgroundColor: band.color }}
              ></div>
              <span className="text-sm font-medium text-slate-900">
                {band.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-bold text-slate-900">
                {band.value} properties
              </div>
              <div className="text-xs text-slate-600">
                {band.percentage}% of market
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Market Insight */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h4 className="font-medium text-green-900 mb-2">Market Opportunity</h4>
        <p className="text-sm text-green-800">
          57% of properties offer yields above 5%, indicating strong rental income potential. 
          High-yield opportunities (7%+) represent 18% of the market, concentrated in emerging areas.
        </p>
      </div>

      {/* CTA */}
      <div className="mt-4 text-center">
        <button 
          onClick={() => setIsConsultationModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Find high-yield opportunities →
        </button>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="High-Yield Opportunities Request"
      />
    </motion.div>
  )
}
