'use client'

import { motion } from 'framer-motion'
import { ShieldExclamationIcon, ChartBarIcon, ClockIcon, ScaleIcon } from '@heroicons/react/24/outline'

export default function RiskFramework() {
  const riskPrinciples = [
    {
      icon: ShieldExclamationIcon,
      title: 'Risk-First Thinking',
      description: 'Every strategy begins with downside protection. We define maximum acceptable losses before targeting returns.',
      examples: ['Stop-loss thresholds', 'Cash reserve requirements', 'Insurance minimums', 'Exit trigger points']
    },
    {
      icon: ChartBarIcon,
      title: 'Transparent Modeling',
      description: 'All projections include stress scenarios and sensitivity analysis. No best-case-only thinking.',
      examples: ['Base/bear/bull scenarios', 'Sensitivity to key variables', 'Monte Carlo simulations', 'Historical backtesting']
    },
    {
      icon: ClockIcon,
      title: 'Time Diversification',
      description: 'Investment timelines matched to strategy requirements and personal circumstances.',
      examples: ['Phased entry strategies', 'Renovation timelines', 'Market cycle awareness', 'Liquidity planning']
    },
    {
      icon: ScaleIcon,
      title: 'Portfolio Integration',
      description: 'Individual investments considered within overall portfolio context and risk tolerance.',
      examples: ['Correlation analysis', 'Concentration limits', 'Rebalancing triggers', 'Total portfolio stress testing']
    }
  ]

  const riskCategories = [
    {
      category: 'Market Risk',
      description: 'Property price and rental market fluctuations',
      mitigation: ['Diversification across areas', 'Conservative valuations', 'Market cycle timing', 'Exit planning']
    },
    {
      category: 'Operational Risk',
      description: 'Tenant, management, and property condition issues',
      mitigation: ['Tenant screening', 'Professional management', 'Maintenance reserves', 'Insurance coverage']
    },
    {
      category: 'Financial Risk',
      description: 'Leverage, interest rates, and liquidity concerns',
      mitigation: ['Conservative LTV', 'Interest rate hedging', 'Cash reserves', 'Stress testing']
    },
    {
      category: 'Regulatory Risk',
      description: 'Changes in laws, regulations, or taxation',
      mitigation: ['Legal compliance', 'Regulatory monitoring', 'Structure flexibility', 'Professional advice']
    }
  ]

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
          Risk Management Framework
        </h2>
        <p className="text-slate-600 max-w-3xl mx-auto">
          Our systematic approach to identifying, measuring, and managing investment risks. 
          Every strategy includes comprehensive risk controls and monitoring.
        </p>
      </motion.div>

      {/* Risk Principles */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {riskPrinciples.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-slate-200"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-lg mb-4">
              <principle.icon className="w-6 h-6 text-red-600" />
            </div>
            <h3 className="font-bold text-slate-900 mb-3">{principle.title}</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {principle.description}
            </p>
            <ul className="space-y-1">
              {principle.examples.map((example, i) => (
                <li key={i} className="text-xs text-slate-500 flex items-center">
                  <div className="w-1 h-1 bg-red-400 rounded-full mr-2"></div>
                  {example}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Risk Categories */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl p-8 border border-slate-200"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Risk Categories & Mitigation
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {riskCategories.map((risk, index) => (
            <div key={risk.category} className="border border-slate-200 rounded-lg p-4">
              <h4 className="font-semibold text-slate-900 mb-2">{risk.category}</h4>
              <p className="text-slate-600 text-sm mb-3">{risk.description}</p>
              <div>
                <span className="text-xs text-slate-500 font-medium">Mitigation Strategies:</span>
                <ul className="mt-1 space-y-1">
                  {risk.mitigation.map((strategy, i) => (
                    <li key={i} className="text-xs text-slate-600 flex items-start">
                      <div className="w-1 h-1 bg-blue-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                      {strategy}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Risk Assessment CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <div className="bg-slate-50 rounded-xl p-8 border border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-4">
            Personal Risk Assessment
          </h3>
          <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
            Get a personalized risk profile and strategy recommendations based on your 
            financial situation, investment goals, and risk tolerance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift">
              Start risk assessment
            </button>
            <button className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all hover-lift">
              Download risk framework
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
