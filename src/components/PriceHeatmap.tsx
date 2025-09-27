'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import ConsultationModal from './ConsultationModal'

interface AreaData {
  area: string
  pricePerSqft: number
  change: number
  volume: number
}

export default function PriceHeatmap() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const data: AreaData[] = [
    { area: 'Palm Jumeirah', pricePerSqft: 2850, change: 8.2, volume: 145 },
    { area: 'Downtown', pricePerSqft: 2420, change: 5.7, volume: 289 },
    { area: 'Marina', pricePerSqft: 1950, change: 4.3, volume: 456 },
    { area: 'DIFC', pricePerSqft: 2650, change: 3.8, volume: 178 },
    { area: 'JBR', pricePerSqft: 2100, change: 3.2, volume: 234 },
    { area: 'Business Bay', pricePerSqft: 1680, change: 6.5, volume: 378 },
    { area: 'JLT', pricePerSqft: 1420, change: 2.1, volume: 267 },
    { area: 'Silicon Oasis', pricePerSqft: 950, change: 7.8, volume: 189 }
  ]

  const getBarColor = (change: number) => {
    if (change >= 6) return '#16a34a' // green-600
    if (change >= 3) return '#3b82f6' // blue-600
    if (change >= 0) return '#f59e0b' // yellow-600
    return '#dc2626' // red-600
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 mb-2">{label}</p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Price/sqft:</span> AED {data.pricePerSqft.toLocaleString()}
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Change:</span> {data.change > 0 ? '+' : ''}{data.change}%
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Volume:</span> {data.volume} transactions
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Price per Sqft by Area
        </h3>
        <p className="text-slate-600 text-sm">
          Average selling prices with monthly change indicators
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="area" 
              tick={{ fontSize: 12, fill: '#64748b' }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(1)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="pricePerSqft" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getBarColor(entry.change)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-6 mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
          <span className="text-slate-600">High Growth (6%+)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
          <span className="text-slate-600">Moderate Growth (3-6%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-600 rounded mr-2"></div>
          <span className="text-slate-600">Stable (0-3%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-red-600 rounded mr-2"></div>
          <span className="text-slate-600">Decline (&lt;0%)</span>
        </div>
      </div>

      {/* Gate for deeper data */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600 mb-3">
          Get detailed neighborhood breakdowns, historical trends, and forecasts
        </p>
        <button 
          onClick={() => setIsConsultationModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Request detailed market report →
        </button>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Detailed Market Report Request"
      />
    </motion.div>
  )
}
