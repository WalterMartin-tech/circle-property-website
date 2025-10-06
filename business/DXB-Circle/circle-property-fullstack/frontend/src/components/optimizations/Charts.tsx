'use client'

import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// Color palette
const COLORS = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981', '#06b6d4', '#6366f1']

interface CapExScheduleChartProps {
  schedule: Array<{
    month: number
    spend: number
    projects: Array<{ project_id: string; spend: number }>
  }>
}

export function CapExScheduleChart({ schedule }: CapExScheduleChartProps) {
  const data = schedule.slice(0, 12).map(month => ({
    name: `M${month.month}`,
    spend: month.spend / 1000000, // Convert to millions
    projects: month.projects.length
  }))

  // Calculate max spend for proper Y-axis scaling
  const maxSpend = Math.max(...data.map(d => d.spend))
  const yAxisMax = Math.ceil(maxSpend * 1.2) // Add 20% headroom

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Monthly Spend Profile</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[0, yAxisMax]}
            label={{ value: 'Spend (M AED)', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            formatter={(value: any) => `${value.toFixed(2)}M AED`}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend />
          <Bar dataKey="spend" fill="#f97316" name="Monthly Spend" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface PortfolioAllocationChartProps {
  allocations: Array<{
    deal_id: string
    weight: number
    capital: number
    expected_noi: number
  }>
}

export function PortfolioAllocationChart({ allocations }: PortfolioAllocationChartProps) {
  const data = allocations.map(alloc => ({
    name: alloc.deal_id,
    value: alloc.weight * 100, // Convert to percentage
    capital: alloc.capital / 1000000 // Convert to millions
  }))

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Portfolio Allocation</h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: any) => `${value.toFixed(1)}%`} />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
            <span className="text-slate-700">{item.name}: {item.capital.toFixed(2)}M AED</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface DebtStackChartProps {
  tranches: Array<{
    name: string
    amount: number
    rate: number
  }>
}

export function DebtStackChart({ tranches }: DebtStackChartProps) {
  const data = tranches.map(tranche => ({
    name: tranche.name,
    amount: tranche.amount / 1000000, // Convert to millions
    rate: (tranche.rate * 100).toFixed(2) // Convert to percentage
  }))

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Debt Stack Breakdown</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" label={{ value: 'Amount (M AED)', position: 'insideBottom', offset: -5 }} />
          <YAxis dataKey="name" type="category" width={120} />
          <Tooltip 
            formatter={(value: any) => `${value.toFixed(2)}M AED`}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend />
          <Bar dataKey="amount" fill="#3b82f6" name="Debt Amount" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center justify-between text-sm bg-slate-50 rounded-lg p-2">
            <span className="font-medium text-slate-900">{item.name}</span>
            <span className="text-blue-600">{item.rate}% rate</span>
          </div>
        ))}
      </div>
    </div>
  )
}

interface LeasingMixChartProps {
  mix: Array<{
    package: string
    units: number
    share: number
    wault_contrib: number
  }>
}

export function LeasingMixChart({ mix }: LeasingMixChartProps) {
  const data = mix.map(pkg => ({
    name: pkg.package,
    units: pkg.units,
    share: (pkg.share * 100).toFixed(1), // Convert to percentage
    wault: pkg.wault_contrib.toFixed(1)
  }))

  // Calculate max units for proper Y-axis scaling
  const maxUnits = Math.max(...data.map(d => d.units))
  const yAxisMax = Math.ceil(maxUnits * 1.2) // Add 20% headroom

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Leasing Mix Distribution</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            domain={[0, yAxisMax]}
            label={{ value: 'Units', angle: -90, position: 'insideLeft' }} 
          />
          <Tooltip 
            formatter={(value: any, name: string) => {
              if (name === 'units') return `${value} units`
              return value
            }}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend />
          <Bar dataKey="units" name="Units">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm bg-slate-50 rounded-lg p-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx % COLORS.length] }}></div>
            <div>
              <div className="font-medium text-slate-900">{item.name}</div>
              <div className="text-slate-600">{item.share}% share • {item.wault}m WAULT</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface YieldComparisonChartProps {
  allocations: Array<{
    deal_id: string
    expected_noi: number
    capital: number
  }>
}

export function YieldComparisonChart({ allocations }: YieldComparisonChartProps) {
  const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444', '#06b6d4', '#ec4899', '#84cc16']
  
  const data = allocations.map(alloc => ({
    name: alloc.deal_id,
    yield: ((alloc.expected_noi / alloc.capital) * 100).toFixed(2),
    noi: alloc.expected_noi / 1000 // Convert to thousands
  }))

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200">
      <h3 className="text-lg font-bold text-slate-900 mb-4">📊 Yield by Asset</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis label={{ value: 'Yield (%)', angle: -90, position: 'insideLeft' }} />
          <Tooltip 
            formatter={(value: any) => `${value}%`}
            labelStyle={{ color: '#1f2937' }}
          />
          <Legend />
          <Bar dataKey="yield" name="Cash Yield %">
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

