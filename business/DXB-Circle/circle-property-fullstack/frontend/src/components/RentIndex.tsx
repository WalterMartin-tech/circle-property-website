'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import ConsultationModal from './ConsultationModal'

interface RentData {
  month: string
  studio: number
  oneBed: number
  twoBed: number
  threeBed: number
}

export default function RentIndex() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const data: RentData[] = [
    { month: 'Jan', studio: 45000, oneBed: 65000, twoBed: 95000, threeBed: 140000 },
    { month: 'Feb', studio: 46200, oneBed: 66500, twoBed: 97000, threeBed: 142000 },
    { month: 'Mar', studio: 47800, oneBed: 68000, twoBed: 99500, threeBed: 145000 },
    { month: 'Apr', studio: 48500, oneBed: 69200, twoBed: 101000, threeBed: 147000 },
    { month: 'May', studio: 49200, oneBed: 70500, twoBed: 103000, threeBed: 149000 },
    { month: 'Jun', studio: 50100, oneBed: 72000, twoBed: 105000, threeBed: 152000 },
    { month: 'Jul', studio: 51000, oneBed: 73500, twoBed: 107000, threeBed: 155000 },
    { month: 'Aug', studio: 51800, oneBed: 74800, twoBed: 108500, threeBed: 157000 },
    { month: 'Sep', studio: 52500, oneBed: 76000, twoBed: 110000, threeBed: 160000 }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 mb-2">{label} 2024</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              <span className="font-medium">{entry.name}:</span> AED {entry.value.toLocaleString()}/year
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Rent Index Trends
        </h3>
        <p className="text-slate-600 text-sm">
          Average annual rent by property type (Dubai Marina area)
        </p>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#64748b' }}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#64748b' }}
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="studio" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              name="Studio"
              dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="oneBed" 
              stroke="#3b82f6" 
              strokeWidth={2}
              name="1 Bedroom"
              dot={{ fill: '#3b82f6', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="twoBed" 
              stroke="#10b981" 
              strokeWidth={2}
              name="2 Bedroom"
              dot={{ fill: '#10b981', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="threeBed" 
              stroke="#f59e0b" 
              strokeWidth={2}
              name="3 Bedroom"
              dot={{ fill: '#f59e0b', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Key Insights */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="bg-green-50 rounded-lg p-3 border border-green-200">
          <div className="text-green-800 font-medium text-sm">Strongest Growth</div>
          <div className="text-green-900 font-bold">Studios: +16.7%</div>
          <div className="text-green-700 text-xs">Year-to-date</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
          <div className="text-blue-800 font-medium text-sm">Best Value</div>
          <div className="text-blue-900 font-bold">2BR: AED 5,500/sqft</div>
          <div className="text-blue-700 text-xs">Price-to-yield ratio</div>
        </div>
      </div>

      {/* Gate for detailed analysis */}
      <div className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200">
        <p className="text-sm text-slate-600 mb-3">
          Access building-level rent comps and yield analysis by email
        </p>
        <button 
          onClick={() => setIsConsultationModalOpen(true)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          Get detailed rent analysis →
        </button>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Detailed Rent Analysis Request"
      />
    </motion.div>
  )
}
