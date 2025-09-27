'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'

interface StrategyRule {
  category: string
  rules: string[]
}

interface StrategyDetail {
  id: string
  name: string
  objective: string
  rules: StrategyRule[]
  exitCriteria: string[]
  suitableFor: string[]
  notSuitableFor: string[]
  exampleScenario: {
    investment: string
    expectedOutcome: string
    timeline: string
    keyActions: string[]
  }
}

export default function StrategyDetails() {
  const [expandedStrategy, setExpandedStrategy] = useState<string | null>('max-profit')

  const strategyDetails: StrategyDetail[] = [
    {
      id: 'max-profit',
      name: 'Max Profit Strategy',
      objective: 'Maximize returns through STR conversion and strategic renovations with defined risk controls.',
      rules: [
        {
          category: 'Entry Criteria',
          rules: [
            'Properties in STR-permitted buildings only',
            'Maximum 70% LTV on purchase',
            'Renovation budget capped at 25% of purchase price',
            'Minimum 6-month cash reserves required'
          ]
        },
        {
          category: 'Operation Rules',
          rules: [
            'Professional STR management mandatory',
            'Monthly performance reviews',
            'Occupancy below 60% for 3 months triggers review',
            'Quarterly yield assessment vs targets'
          ]
        },
        {
          category: 'Risk Controls',
          rules: [
            'Stop-loss at 20% below purchase price',
            'Maximum 2-year renovation timeline',
            'Insurance coverage minimum AED 1M',
            'Emergency fund 6 months operating costs'
          ]
        }
      ],
      exitCriteria: [
        'Target yield achieved for 12+ months',
        'Market fundamentals deteriorate significantly',
        'Regulatory changes impact STR viability',
        'Capital needed for better opportunities',
        'Personal circumstances change'
      ],
      suitableFor: [
        'Experienced property investors',
        'High risk tolerance',
        'Active management appetite',
        'Minimum AED 1.5M liquid capital',
        '3-5 year investment horizon'
      ],
      notSuitableFor: [
        'First-time property investors',
        'Passive income seekers only',
        'Risk-averse investors',
        'Limited capital reserves',
        'Short-term liquidity needs'
      ],
      exampleScenario: {
        investment: 'AED 1.8M Marina apartment',
        expectedOutcome: '9.5% net yield after 18 months',
        timeline: '6 months renovation + 12 months optimization',
        keyActions: [
          'Purchase furnished 1BR in STR-friendly building',
          'AED 300K renovation (kitchen, bathroom, smart home)',
          'Professional STR management setup',
          'Yield optimization over 12 months',
          'Exit when target achieved or market signals change'
        ]
      }
    },
    {
      id: 'secure-income',
      name: 'Secure Income Strategy',
      objective: 'Generate stable rental income with capital preservation and minimal management overhead.',
      rules: [
        {
          category: 'Entry Criteria',
          rules: [
            'Established areas with proven rental demand',
            'Properties with existing long-term tenants preferred',
            'Maximum 60% LTV financing',
            'Minimum 4% gross yield requirement'
          ]
        },
        {
          category: 'Tenant Management',
          rules: [
            'Long-term lease agreements (2+ years preferred)',
            'Tenant credit checks mandatory',
            'Annual rent increases capped at market rates',
            'Professional property management recommended'
          ]
        },
        {
          category: 'Maintenance Standards',
          rules: [
            'Preventive maintenance schedule',
            'Quality improvements only (no major renovations)',
            'Tenant satisfaction surveys annually',
            'Building management relationship maintained'
          ]
        }
      ],
      exitCriteria: [
        'Significant area deterioration',
        'Consistent vacancy issues (>3 months)',
        'Major capital expenditure required',
        'Better opportunities identified',
        'Portfolio rebalancing needed'
      ],
      suitableFor: [
        'Conservative investors',
        'Retirement income planning',
        'Busy professionals (passive management)',
        'First-time property investors',
        'Long-term wealth building'
      ],
      notSuitableFor: [
        'High return expectations (>7%)',
        'Short-term investment goals',
        'Active management preference',
        'High growth seekers',
        'Speculative investors'
      ],
      exampleScenario: {
        investment: 'AED 1.2M JLT apartment',
        expectedOutcome: '5.2% net yield with stable tenants',
        timeline: 'Immediate income generation',
        keyActions: [
          'Purchase 2BR with existing 2-year lease',
          'Professional property management setup',
          'Regular maintenance and tenant retention',
          'Annual rent reviews within market parameters',
          'Hold for long-term stable income'
        ]
      }
    }
  ]

  const toggleStrategy = (id: string) => {
    setExpandedStrategy(expandedStrategy === id ? null : id)
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
          Detailed Strategy Playbooks
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Comprehensive rules, criteria, and examples for each investment strategy. 
          Click to expand full details.
        </p>
      </motion.div>

      <div className="space-y-6">
        {strategyDetails.map((strategy, index) => (
          <motion.div
            key={strategy.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl border border-slate-200 overflow-hidden"
          >
            {/* Strategy Header */}
            <button
              onClick={() => toggleStrategy(strategy.id)}
              className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {strategy.name}
                </h3>
                <p className="text-slate-600">
                  {strategy.objective}
                </p>
              </div>
              {expandedStrategy === strategy.id ? (
                <ChevronUpIcon className="w-6 h-6 text-slate-500" />
              ) : (
                <ChevronDownIcon className="w-6 h-6 text-slate-500" />
              )}
            </button>

            {/* Expanded Content */}
            {expandedStrategy === strategy.id && (
              <div className="px-8 pb-8 border-t border-slate-100">
                <div className="grid lg:grid-cols-2 gap-8 mt-6">
                  {/* Investment Rules */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Investment Rules</h4>
                    <div className="space-y-4">
                      {strategy.rules.map((section, i) => (
                        <div key={i}>
                          <h5 className="font-medium text-slate-800 mb-2">{section.category}</h5>
                          <ul className="space-y-1">
                            {section.rules.map((rule, j) => (
                              <li key={j} className="text-sm text-slate-600 flex items-start">
                                <CheckIcon className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {rule}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Exit Criteria & Suitability */}
                  <div>
                    <h4 className="font-semibold text-slate-900 mb-4">Exit Criteria</h4>
                    <ul className="space-y-1 mb-6">
                      {strategy.exitCriteria.map((criteria, i) => (
                        <li key={i} className="text-sm text-slate-600 flex items-start">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2 mt-2 flex-shrink-0"></div>
                          {criteria}
                        </li>
                      ))}
                    </ul>

                    {/* Suitability */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-green-800 mb-2">Suitable For</h5>
                        <ul className="space-y-1">
                          {strategy.suitableFor.map((item, i) => (
                            <li key={i} className="text-xs text-green-700 flex items-start">
                              <CheckIcon className="w-3 h-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-red-800 mb-2">Not Suitable For</h5>
                        <ul className="space-y-1">
                          {strategy.notSuitableFor.map((item, i) => (
                            <li key={i} className="text-xs text-red-700 flex items-start">
                              <XMarkIcon className="w-3 h-3 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Example Scenario */}
                <div className="mt-8 p-6 bg-blue-50 rounded-lg border border-blue-200">
                  <h4 className="font-semibold text-blue-900 mb-4">Example Scenario</h4>
                  <div className="grid md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <span className="text-sm text-blue-700">Investment</span>
                      <div className="font-medium text-blue-900">{strategy.exampleScenario.investment}</div>
                    </div>
                    <div>
                      <span className="text-sm text-blue-700">Expected Outcome</span>
                      <div className="font-medium text-blue-900">{strategy.exampleScenario.expectedOutcome}</div>
                    </div>
                    <div>
                      <span className="text-sm text-blue-700">Timeline</span>
                      <div className="font-medium text-blue-900">{strategy.exampleScenario.timeline}</div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-blue-700 block mb-2">Key Actions</span>
                    <ol className="list-decimal list-inside space-y-1">
                      {strategy.exampleScenario.keyActions.map((action, i) => (
                        <li key={i} className="text-sm text-blue-800">{action}</li>
                      ))}
                    </ol>
                  </div>
                </div>

                {/* CTA */}
                <div className="text-center mt-6">
                  <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift">
                    Download full {strategy.name.toLowerCase()} playbook
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}
