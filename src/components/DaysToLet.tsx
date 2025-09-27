'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface AreaData {
  area: string
  daysToLet: number
  previousMonth: number
  change: number
}

export default function DaysToLet() {
  const data: AreaData[] = [
    { area: 'Marina', daysToLet: 18, previousMonth: 21, change: -3 },
    { area: 'Downtown', daysToLet: 15, previousMonth: 16, change: -1 },
    { area: 'JBR', daysToLet: 22, previousMonth: 25, change: -3 },
    { area: 'Business Bay', daysToLet: 12, previousMonth: 14, change: -2 },
    { area: 'DIFC', daysToLet: 14, previousMonth: 15, change: -1 },
    { area: 'JLT', daysToLet: 28, previousMonth: 32, change: -4 },
    { area: 'Silicon Oasis', daysToLet: 35, previousMonth: 38, change: -3 },
    { area: 'Sports City', daysToLet: 42, previousMonth: 45, change: -3 }
  ]

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-4 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900 mb-2">{label}</p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Current:</span> {data.daysToLet} days
          </p>
          <p className="text-sm text-slate-600">
            <span className="font-medium">Previous month:</span> {data.previousMonth} days
          </p>
          <p className={`text-sm ${data.change < 0 ? 'text-green-600' : 'text-red-600'}`}>
            <span className="font-medium">Change:</span> {data.change > 0 ? '+' : ''}{data.change} days
          </p>
        </div>
      )
    }
    return null
  }

  const getBarColor = (change: number) => {
    if (change <= -3) return '#16a34a' // green-600 (significant improvement)
    if (change < 0) return '#3b82f6' // blue-600 (improvement)
    if (change === 0) return '#f59e0b' // yellow-600 (stable)
    return '#dc2626' // red-600 (deterioration)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-6 border border-slate-200"
    >
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          Days to Let Analysis
        </h3>
        <p className="text-slate-600 text-sm">
          Average time from listing to tenant placement by area
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
              label={{ value: 'Days', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="daysToLet" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Bar key={`bar-${index}`} fill={getBarColor(entry.change)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Indicators */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-600">18</div>
          <div className="text-xs text-slate-600">Market Average</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-600">-2.8</div>
          <div className="text-xs text-slate-600">Avg Improvement</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-slate-900">12</div>
          <div className="text-xs text-slate-600">Best Performing</div>
        </div>
      </div>

      {/* Market Commentary */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <h4 className="font-medium text-blue-900 mb-2">Market Velocity</h4>
        <p className="text-sm text-blue-800">
          All areas show improvement in letting speed. Business Bay leads with 12-day average, 
          while premium areas like Marina and Downtown maintain strong momentum. 
          Emerging areas still offer higher yields but require longer marketing periods.
        </p>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center">
          <div className="w-3 h-3 bg-green-600 rounded mr-2"></div>
          <span className="text-slate-600">Major Improvement (-3+ days)</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-blue-600 rounded mr-2"></div>
          <span className="text-slate-600">Improvement</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 bg-yellow-600 rounded mr-2"></div>
          <span className="text-slate-600">Stable</span>
        </div>
      </div>
    </motion.div>
  )
}
