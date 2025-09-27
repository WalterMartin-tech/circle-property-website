'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowTrendingUpIcon, 
  ShieldCheckIcon, 
  ClockIcon, 
  HomeIcon, 
  BanknotesIcon,
  ScaleIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface StrategyCard {
  id: string
  name: string
  description: string
  riskLevel: 'Low' | 'Medium' | 'High'
  targetYield: string
  timeHorizon: string
  minInvestment: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  features: string[]
}

export default function StrategyOverview() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const strategies: StrategyCard[] = [
    {
      id: 'max-profit',
      name: 'Max Profit',
      description: 'STR optimization with renovation upside. Higher volatility, higher returns.',
      riskLevel: 'High',
      targetYield: '8-12%',
      timeHorizon: '3-5 years',
      minInvestment: 'AED 1.5M',
      icon: ArrowTrendingUpIcon,
      color: 'red',
      features: ['STR conversion', 'Renovation budget', 'Active management', 'Exit strategies']
    },
    {
      id: 'secure-income',
      name: 'Secure Income',
      description: 'Stable rental yields with established tenants and conservative leverage.',
      riskLevel: 'Low',
      targetYield: '4-6%',
      timeHorizon: '5+ years',
      minInvestment: 'AED 800K',
      icon: ShieldCheckIcon,
      color: 'green',
      features: ['Long-term leases', 'Quality tenants', 'Conservative LTV', 'Steady cashflow']
    },
    {
      id: 'immediate-occupancy',
      name: 'Immediate Occupancy',
      description: 'Quick tenant placement with furnished units in high-demand areas.',
      riskLevel: 'Medium',
      targetYield: '5-7%',
      timeHorizon: '2-4 years',
      minInvestment: 'AED 1M',
      icon: ClockIcon,
      color: 'blue',
      features: ['Furnished ready', 'Prime locations', 'Fast letting', 'Tenant pipeline']
    },
    {
      id: 'quality-of-life',
      name: 'Quality of Life',
      description: 'Personal use combined with investment returns. Premium lifestyle focus.',
      riskLevel: 'Medium',
      targetYield: '3-5%',
      timeHorizon: '5+ years',
      minInvestment: 'AED 2M',
      icon: HomeIcon,
      color: 'purple',
      features: ['Personal use', 'Premium locations', 'Lifestyle benefits', 'Capital growth']
    },
    {
      id: 'safe-haven',
      name: 'Safe Haven',
      description: 'Capital preservation with UAE residency benefits. Defensive positioning.',
      riskLevel: 'Low',
      targetYield: '2-4%',
      timeHorizon: '10+ years',
      minInvestment: 'AED 2M',
      icon: BanknotesIcon,
      color: 'gray',
      features: ['Residency visa', 'Capital safety', 'Stable markets', 'Currency hedge']
    },
    {
      id: 'blended',
      name: 'Blended Portfolio',
      description: 'Diversified approach across multiple strategies and asset types.',
      riskLevel: 'Medium',
      targetYield: '5-8%',
      timeHorizon: '3-7 years',
      minInvestment: 'AED 3M',
      icon: ScaleIcon,
      color: 'indigo',
      features: ['Diversification', 'Risk spread', 'Multiple income', 'Balanced growth']
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-100 text-green-800 border-green-200'
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'High': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getCardColor = (color: string) => {
    const colors = {
      red: 'border-red-200 hover:border-red-300',
      green: 'border-green-200 hover:border-green-300',
      blue: 'border-blue-200 hover:border-blue-300',
      purple: 'border-purple-200 hover:border-purple-300',
      gray: 'border-gray-200 hover:border-gray-300',
      indigo: 'border-indigo-200 hover:border-indigo-300'
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
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Choose Your Strategy
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Each strategy comes with clear investment rules, risk parameters, and exit criteria. 
          Mix strategies to build a balanced portfolio.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy.id}
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
              <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRiskColor(strategy.riskLevel)}`}>
                {strategy.riskLevel} Risk
              </span>
            </div>

            {/* Strategy Name & Description */}
            <h3 className="text-xl font-bold text-slate-900 mb-3">
              {strategy.name}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {strategy.description}
            </p>

            {/* Key Metrics */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Target Yield</span>
                <span className="font-semibold text-slate-900">{strategy.targetYield}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Time Horizon</span>
                <span className="font-semibold text-slate-900">{strategy.timeHorizon}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-500">Min Investment</span>
                <span className="font-semibold text-slate-900">{strategy.minInvestment}</span>
              </div>
            </div>

            {/* Features */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Key Features</h4>
              <ul className="space-y-1">
                {strategy.features.map((feature, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="w-full flex items-center justify-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
            >
              View detailed playbook
              <ArrowRightIcon className="w-4 h-4 ml-1" />
            </button>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <p className="text-slate-600 mb-6">
          Not sure which strategy fits your goals and risk tolerance?
        </p>
        <button 
          onClick={() => setIsConsultationModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
        >
          Book a strategy consultation
        </button>
      </motion.div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Strategy Playbook Consultation"
      />
    </section>
  )
}
