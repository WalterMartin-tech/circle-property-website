'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChartBarIcon, CurrencyDollarIcon, CalendarIcon, HomeIcon } from '@heroicons/react/24/outline'

const optimizers = [
  {
    name: 'Deal Picker',
    href: '/optimizations/deal-picker',
    icon: ChartBarIcon,
    color: 'blue',
    description: 'Portfolio optimization'
  },
  {
    name: 'Debt Stack',
    href: '/optimizations/debt-stack',
    icon: CurrencyDollarIcon,
    color: 'green',
    description: 'Financing structure'
  },
  {
    name: 'CapEx Phasing',
    href: '/optimizations/capex-phasing',
    icon: CalendarIcon,
    color: 'orange',
    description: 'Renovation scheduling'
  },
  {
    name: 'Leasing Mix',
    href: '/optimizations/leasing-mix',
    icon: HomeIcon,
    color: 'indigo',
    description: 'Tenant allocation'
  }
]

const colorClasses = {
  blue: {
    bg: 'bg-blue-50 hover:bg-blue-100',
    border: 'border-blue-200',
    text: 'text-blue-700',
    activeBg: 'bg-blue-600',
    activeText: 'text-white'
  },
  green: {
    bg: 'bg-green-50 hover:bg-green-100',
    border: 'border-green-200',
    text: 'text-green-700',
    activeBg: 'bg-green-600',
    activeText: 'text-white'
  },
  orange: {
    bg: 'bg-orange-50 hover:bg-orange-100',
    border: 'border-orange-200',
    text: 'text-orange-700',
    activeBg: 'bg-orange-600',
    activeText: 'text-white'
  },
  indigo: {
    bg: 'bg-indigo-50 hover:bg-indigo-100',
    border: 'border-indigo-200',
    text: 'text-indigo-700',
    activeBg: 'bg-indigo-600',
    activeText: 'text-white'
  }
}

export default function OptimizerNav() {
  const pathname = usePathname()

  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">Smart Plans</h2>
            <p className="text-xs text-slate-600">Consulting-grade optimization modules</p>
          </div>
          <Link 
            href="/optimizations"
            className="text-xs text-purple-600 hover:text-purple-700 font-medium"
          >
            ← Back to all modules
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {optimizers.map((optimizer) => {
            const isActive = pathname === optimizer.href
            const colors = colorClasses[optimizer.color as keyof typeof colorClasses]
            const Icon = optimizer.icon

            return (
              <Link
                key={optimizer.href}
                href={optimizer.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg border-2 transition-all ${
                  isActive
                    ? `${colors.activeBg} ${colors.activeText} border-transparent shadow-md`
                    : `${colors.bg} ${colors.text} ${colors.border}`
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold ${isActive ? 'text-white' : ''}`}>
                    {optimizer.name}
                  </div>
                  <div className={`text-xs ${isActive ? 'text-white/80' : 'opacity-75'}`}>
                    {optimizer.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

