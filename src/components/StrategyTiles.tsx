'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  HomeIcon, 
  BanknotesIcon,
  ScaleIcon
} from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface Strategy {
  name: string
  description: string
  riskBand: 'Low' | 'Medium' | 'High'
  targetYield: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}

export default function StrategyTiles() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const strategies: Strategy[] = [
    {
      name: 'Max Profit',
      description: 'High-growth potential through value enhancement and strategic improvements. Best for experienced investors.',
      riskBand: 'High',
      targetYield: '8-12%',
      icon: ArrowTrendingUpIcon,
      color: 'red'
    },
    {
      name: 'Secure Income',
      description: 'Stable rental yields with established tenants and conservative approach. Ideal for steady cash flow.',
      riskBand: 'Low',
      targetYield: '5-7%',
      icon: ShieldCheckIcon,
      color: 'green'
    },
    {
      name: 'Balanced Portfolio',
      description: 'Mixed approach balancing growth and income across multiple asset types for risk diversification.',
      riskBand: 'Medium',
      targetYield: '6-9%',
      icon: ScaleIcon,
      color: 'indigo'
    }
  ]

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800'
      case 'Medium': return 'bg-yellow-100 text-yellow-800'
      case 'High': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getCardColor = (color: string) => {
    const colors = {
      red: 'border-red-200 hover:border-red-300 hover:bg-red-50',
      green: 'border-green-200 hover:border-green-300 hover:bg-green-50',
      blue: 'border-blue-200 hover:border-blue-300 hover:bg-blue-50',
      purple: 'border-purple-200 hover:border-purple-300 hover:bg-purple-50',
      gray: 'border-gray-200 hover:border-gray-300 hover:bg-gray-50',
      indigo: 'border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50'
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  const getIconColor = (color: string) => {
    const colors = {
      red: 'text-red-600',
      green: 'text-green-600',
      blue: 'text-blue-600',
      purple: 'text-purple-600',
      gray: 'text-gray-600',
      indigo: 'text-indigo-600'
    }
    return colors[color as keyof typeof colors] || colors.gray
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Choose Your Investment Strategy
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Three proven approaches tailored to different risk profiles and objectives. 
            Get comprehensive playbooks with detailed rules, timelines, and exit criteria.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`bg-white rounded-xl p-6 border-2 transition-all cursor-pointer hover-lift ${getCardColor(strategy.color)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-${strategy.color}-50`}>
                  <strategy.icon className={`w-6 h-6 ${getIconColor(strategy.color)}`} />
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(strategy.riskBand)}`}>
                  {strategy.riskBand} Risk
                </span>
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {strategy.name}
              </h3>
              
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                {strategy.description}
              </p>

              {/* Yield */}
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">Target Yield</span>
                <span className="font-bold text-slate-900">{strategy.targetYield}</span>
              </div>

              {/* CTA */}
              <button 
                onClick={() => window.location.href = '/invest?tab=strategies'}
                className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                View detailed playbook →
              </button>
            </motion.div>
          ))}
        </div>

        {/* View All Strategies CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button 
              onClick={() => window.location.href = '/invest'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
            >
              View All 6 Investment Strategies
            </button>
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
            >
              Get Strategy Consultation
            </button>
          </div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Strategy Consultation"
      />
    </section>
  )
}
