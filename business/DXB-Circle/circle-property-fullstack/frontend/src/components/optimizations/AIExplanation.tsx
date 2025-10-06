'use client'

import { SparklesIcon, LightBulbIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import BookCallModal from './BookCallModal'

interface AIExplanationProps {
  result: any
  moduleType: 'deal-picker' | 'debt-stack' | 'capex-phasing' | 'leasing-mix'
}

// Helper function to generate scenario explanations
function getScenarioExplanation(scenario: any, moduleType: string): string {
  const change = scenario.change.toLowerCase()
  
  if (moduleType === 'deal-picker') {
    if (change.includes('budget')) {
      return 'Increasing your investment budget allows the optimizer to select more high-yield properties or allocate more capital to existing deals, directly boosting portfolio returns.'
    }
    if (change.includes('sector') || change.includes('allocation')) {
      return 'Relaxing sector allocation caps gives the optimizer more flexibility to concentrate capital in the best-performing sectors, potentially increasing overall yield.'
    }
  }
  
  if (moduleType === 'debt-stack') {
    if (change.includes('ltv')) {
      return 'Higher LTV allows more debt financing, reducing equity required while maintaining cash flow. Be mindful of increased financial risk.'
    }
    if (change.includes('dscr')) {
      return 'Lower DSCR requirements enable more aggressive leverage, reducing financing costs but increasing default risk. Ensure comfortable cash flow coverage.'
    }
  }
  
  if (moduleType === 'capex-phasing') {
    if (change.includes('cash')) {
      return 'Higher monthly cash availability allows more projects to run simultaneously or accelerates completion timelines, capturing NOI uplift sooner.'
    }
    if (change.includes('contractor') || change.includes('parallel')) {
      return 'Increasing contractor capacity removes bottlenecks, enabling faster project execution and earlier NOI improvements.'
    }
  }
  
  if (moduleType === 'leasing-mix') {
    if (change.includes('incentive')) {
      return 'Additional incentive budget allows you to offer more attractive packages, potentially filling units faster or achieving higher rents with longer lease terms.'
    }
    if (change.includes('wault')) {
      return 'Lowering WAULT requirements gives the optimizer flexibility to prioritize short-term cash flow over lease stability. Evaluate based on your investment horizon.'
    }
  }
  
  return 'Adjusting this parameter provides the optimizer more flexibility to find better solutions within your constraints.'
}

export default function AIExplanation({ result, moduleType }: AIExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(true)
  const [isBookCallModalOpen, setIsBookCallModalOpen] = useState(false)

  // Generate AI-powered explanation based on module type and results
  const generateExplanation = () => {
    switch (moduleType) {
      case 'deal-picker':
        return {
          headline: 'Optimal Portfolio Achieved',
          summary: `Based on your ${result.portfolio_summary?.num_assets_selected || 0} selected assets, this portfolio maximizes cash yield at ${(result.portfolio_summary?.cash_yield * 100).toFixed(2)}% while respecting all budget and allocation constraints.`,
          insights: [
            {
              icon: '📊',
              title: 'Yield Optimization',
              text: `This is the maximum achievable cash yield given your budget of AED ${result.budget?.toLocaleString() || 'N/A'}. Any different allocation would reduce returns.`
            },
            {
              icon: '⚖️',
              title: 'Constraint Balance',
              text: result.constraints_report?.binding?.length > 0
                ? `${result.constraints_report.binding.length} constraint(s) are binding, meaning you're fully utilizing available capacity in these areas.`
                : 'All constraints have slack, suggesting room for additional investment if budget increases.'
            },
            {
              icon: '🎯',
              title: 'Risk-Adjusted Returns',
              text: result.portfolio_summary?.risk_adjusted_yield
                ? `Risk-adjusted yield of ${(result.portfolio_summary.risk_adjusted_yield * 100).toFixed(2)}% accounts for property risk scores.`
                : 'Portfolio is optimized for maximum cash generation.'
            }
          ],
          whatIf: result.what_if || []
        }

      case 'debt-stack':
        return {
          headline: 'Optimal Debt Structure Found',
          summary: `Your debt stack achieves a weighted average cost of ${(result.stack_summary?.weighted_cost * 100).toFixed(2)}% while maintaining LTV at ${(result.stack_summary?.ltv * 100).toFixed(1)}% and DSCR at ${result.stack_summary?.min_dscr?.toFixed(2) || 'N/A'}.`,
          insights: [
            {
              icon: '💰',
              title: 'Cost Minimization',
              text: 'This is the lowest-cost debt structure that satisfies all covenant requirements. No other combination of tranches would reduce your financing cost.'
            },
            {
              icon: '🛡️',
              title: 'Covenant Compliance',
              text: `All lender covenants are met: LTV ≤ target, DSCR ≥ minimum requirement. ${result.constraints_report?.binding?.length || 0} constraint(s) are binding.`
            },
            {
              icon: '📈',
              title: 'Rate Mix',
              text: result.stack_summary?.fixed_share
                ? `Fixed-rate debt comprises ${(result.stack_summary.fixed_share * 100).toFixed(0)}% of the stack, providing interest rate protection.`
                : 'Debt mix optimized for current rate environment.'
            }
          ],
          whatIf: result.what_if || []
        }

      case 'capex-phasing':
        return {
          headline: 'Optimal CapEx Schedule Computed',
          summary: `Your renovation schedule maximizes NOI uplift at AED ${result.expected_annual_noi_uplift?.toLocaleString() || 'N/A'} while respecting monthly cash caps and contractor capacity.`,
          insights: [
            {
              icon: '📅',
              title: 'Time Optimization',
              text: 'Projects are sequenced to maximize value creation speed while avoiding cash flow crunches and contractor bottlenecks.'
            },
            {
              icon: '💵',
              title: 'Cash Flow Management',
              text: 'Monthly spending stays within your available cash caps. No month exceeds budget constraints.'
            },
            {
              icon: '👷',
              title: 'Contractor Capacity',
              text: `Maximum parallel projects respected throughout schedule. No conflicts or resource overallocation.`
            }
          ],
          whatIf: []
        }

      case 'leasing-mix':
        return {
          headline: 'Optimal Leasing Mix Determined',
          summary: `Your leasing plan achieves ${(result.kpis?.occupancy * 100).toFixed(1)}% occupancy with WAULT of ${result.kpis?.wault_months?.toFixed(1) || 'N/A'} months, generating AED ${result.kpis?.expected_12m_ncf?.toLocaleString() || 'N/A'} in 12-month NCF.`,
          insights: [
            {
              icon: '🏠',
              title: 'Occupancy Target',
              text: 'This mix achieves your target occupancy while maximizing net cash flow. Any different package allocation would reduce NCF.'
            },
            {
              icon: '📆',
              title: 'WAULT Optimization',
              text: `Weighted average lease term of ${result.kpis?.wault_months?.toFixed(1) || 'N/A'} months provides income stability while staying within budget.`
            },
            {
              icon: '💸',
              title: 'Incentive Budget',
              text: `Total incentive spend of AED ${result.kpis?.incentive_spend?.toLocaleString() || 'N/A'} is optimally allocated across packages.`
            }
          ],
          whatIf: result.what_if || []
        }

      default:
        return {
          headline: 'Optimization Complete',
          summary: 'Your optimization has completed successfully.',
          insights: [],
          whatIf: []
        }
    }
  }

  const explanation = generateExplanation()

  // Generate summary for modal
  const getResultsSummary = () => {
    const lines = [
      `Module: ${moduleType}`,
      `Results Summary:`,
      explanation.summary,
      '',
      'Key Metrics:'
    ]
    
    if (moduleType === 'deal-picker' && result.portfolio_summary) {
      lines.push(
        `- Cash Yield: ${(result.portfolio_summary.cash_yield * 100).toFixed(2)}%`,
        `- Capital Used: AED ${result.portfolio_summary.capital_used?.toLocaleString()}`,
        `- Assets Selected: ${result.portfolio_summary.num_assets_selected}`
      )
    } else if (moduleType === 'debt-stack' && result.stack_summary) {
      lines.push(
        `- LTV: ${(result.stack_summary.ltv * 100).toFixed(1)}%`,
        `- Weighted Cost: ${(result.stack_summary.weighted_cost * 100).toFixed(2)}%`,
        `- DSCR: ${result.stack_summary.min_dscr?.toFixed(2)}`
      )
    } else if (moduleType === 'capex-phasing' && result.expected_annual_noi_uplift) {
      lines.push(`- NOI Uplift: AED ${result.expected_annual_noi_uplift.toLocaleString()}`)
    } else if (moduleType === 'leasing-mix' && result.kpis) {
      lines.push(
        `- WAULT: ${result.kpis.wault_months?.toFixed(1)} months`,
        `- 12M NCF: AED ${result.kpis.expected_12m_ncf?.toLocaleString()}`,
        `- Occupancy: ${(result.kpis.occupancy * 100).toFixed(1)}%`
      )
    }
    
    return lines.join('\n')
  }

  return (
    <>
      <BookCallModal 
        isOpen={isBookCallModalOpen}
        onClose={() => setIsBookCallModalOpen(false)}
        moduleType={moduleType}
        resultsSummary={getResultsSummary()}
      />
      
      <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl border border-purple-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-purple-100/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">AI-Assisted Explanation</h3>
            <p className="text-sm text-slate-600">What this result means for your investment</p>
          </div>
        </div>
        <button className="text-slate-400 hover:text-slate-600">
          {isExpanded ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </button>
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="px-6 pb-6 space-y-6">
          {/* Summary */}
          <div className="bg-white rounded-lg p-4 border border-purple-100">
            <h4 className="text-xl font-bold text-slate-900 mb-2">{explanation.headline}</h4>
            <p className="text-slate-700">{explanation.summary}</p>
          </div>

          {/* Key Insights */}
          <div className="space-y-3">
            <h5 className="font-semibold text-slate-900 flex items-center gap-2">
              <LightBulbIcon className="w-5 h-5 text-yellow-500" />
              Key Insights
            </h5>
            {explanation.insights.map((insight, idx) => (
              <div key={idx} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{insight.icon}</span>
                  <div className="flex-1">
                    <h6 className="font-semibold text-slate-900 mb-1">{insight.title}</h6>
                    <p className="text-sm text-slate-600">{insight.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* What-If Scenarios */}
          {explanation.whatIf.length > 0 && (
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-5 border border-indigo-200">
              <div className="mb-3">
                <h5 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <span>🔮</span>
                  What-If Scenarios
                </h5>
                <p className="text-xs text-slate-600 mb-3">
                  These scenarios show how your results would improve if you adjusted specific constraints or inputs. 
                  Use these to prioritize where to invest additional resources.
                </p>
              </div>
              <div className="space-y-3">
                {explanation.whatIf.map((scenario: any, idx: number) => (
                  <div key={idx} className="bg-white rounded-lg p-4 border border-indigo-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-indigo-700 font-bold text-sm">{idx + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="font-semibold text-slate-900 mb-1">
                              {scenario.change}
                            </p>
                            <p className="text-xs text-slate-600 mb-2">
                              {scenario.explanation || getScenarioExplanation(scenario, moduleType)}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-3 py-1.5 rounded-lg border border-green-200">
                              <p className="text-xs text-green-700 font-medium">Expected Impact</p>
                              <p className="text-lg font-bold text-green-900">
                                {scenario.delta_cash_yield || scenario.delta_expected_12m_ncf || scenario.new_wault || 'TBD'}
                              </p>
                            </div>
                          </div>
                        </div>
                        {scenario.action && (
                          <div className="mt-2 pt-2 border-t border-slate-200">
                            <p className="text-xs text-indigo-700 font-medium">
                              💡 Recommended Action: {scenario.action}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Disclaimer */}
          <div className="space-y-3">
            <p className="text-xs text-slate-500 italic">
              This explanation is AI-generated based on optimization results. All figures are projections 
              based on your inputs and current assumptions. Consult with senior specialists for investment decisions.
            </p>
            
            {/* Book a Call CTA */}
            <button 
              onClick={() => setIsBookCallModalOpen(true)}
              className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book a Call with Senior Partner
            </button>
            <p className="text-xs text-center text-slate-500">
              Discuss these results with our investment specialists
            </p>
          </div>
        </div>
      )}
      </div>
    </>
  )
}

