'use client'

import { ShieldCheckIcon, BoltIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface ConstraintsReportProps {
  constraints: {
    binding: Array<{ name: string; slack: number }>
    shadow_prices: Array<{ constraint: string; unit: string; marginal_value: number }>
  }
}

export default function ConstraintsReport({ constraints }: ConstraintsReportProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
            <ShieldCheckIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Constraints & Shadow Prices</h3>
            <p className="text-sm text-slate-600">What limited your optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-sm text-slate-600">
              {constraints.binding.length} binding
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
      </div>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 space-y-6">
          {/* Explanation */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="font-semibold text-slate-900 mb-2">Understanding Constraints</h4>
            <p className="text-sm text-slate-700 mb-2">
              <strong>Binding constraints</strong> are limits that are fully utilized (slack ≈ 0). 
              These are the bottlenecks preventing better results.
            </p>
            <p className="text-sm text-slate-700">
              <strong>Shadow prices</strong> show how much your objective would improve if you 
              relaxed each binding constraint by one unit.
            </p>
          </div>

          {/* Binding Constraints */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <ShieldCheckIcon className="w-5 h-5 text-green-600" />
              Binding Constraints ({constraints.binding.length})
            </h4>
            
            {constraints.binding.length > 0 ? (
              <div className="space-y-2">
                {constraints.binding.map((constraint, idx) => (
                  <div 
                    key={idx}
                    className="bg-slate-50 rounded-lg p-4 border border-slate-200"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{constraint.name}</p>
                        <p className="text-xs text-slate-600 mt-1">
                          Slack: {constraint.slack.toFixed(6)} (constraint is active)
                        </p>
                      </div>
                      <div className="ml-4">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                          BINDING
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-green-50 rounded-lg p-4 border border-green-200 text-center">
                <p className="text-sm text-green-800">
                  ✅ No binding constraints! You have slack capacity in all areas. 
                  Consider increasing your targets for better results.
                </p>
              </div>
            )}
          </div>

          {/* Shadow Prices */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
              <BoltIcon className="w-5 h-5 text-yellow-600" />
              Shadow Prices (Marginal Values)
            </h4>
            
            {constraints.shadow_prices.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-700 uppercase">
                        Constraint
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase">
                        Shadow Price
                      </th>
                      <th className="px-4 py-3 text-right text-xs font-semibold text-slate-700 uppercase">
                        Impact
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {constraints.shadow_prices.map((sp, idx) => {
                      const isSignificant = Math.abs(sp.marginal_value) > 0.01
                      return (
                        <tr key={idx} className={isSignificant ? 'bg-yellow-50' : ''}>
                          <td className="px-4 py-3 text-sm text-slate-900">
                            {sp.constraint}
                          </td>
                          <td className="px-4 py-3 text-sm text-right font-mono text-slate-900">
                            {sp.marginal_value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {sp.unit}
                          </td>
                          <td className="px-4 py-3 text-right">
                            {isSignificant ? (
                              <span className="px-2 py-1 bg-yellow-200 text-yellow-900 text-xs font-semibold rounded">
                                High Impact
                              </span>
                            ) : (
                              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs rounded">
                                Low Impact
                              </span>
                            )}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 text-center">
                <p className="text-sm text-slate-600">
                  No significant shadow prices to display.
                </p>
              </div>
            )}
          </div>

          {/* Actionable Insights */}
          {constraints.binding.length > 0 && (
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
              <h4 className="font-semibold text-slate-900 mb-2 flex items-center gap-2">
                💡 Actionable Insights
              </h4>
              <ul className="space-y-2 text-sm text-slate-700">
                {constraints.binding.map((constraint, idx) => {
                  const shadowPrice = constraints.shadow_prices.find(
                    sp => sp.constraint === constraint.name
                  )
                  
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-purple-600 mt-0.5">→</span>
                      <span>
                        <strong>{constraint.name}</strong> is binding. 
                        {shadowPrice && Math.abs(shadowPrice.marginal_value) > 0.01 ? (
                          <>
                            {' '}Relaxing it by 1 {shadowPrice.unit} would improve your objective by{' '}
                            <strong className="text-purple-700">
                              {Math.abs(shadowPrice.marginal_value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {shadowPrice.unit}
                            </strong>.
                          </>
                        ) : (
                          ' Consider if you can relax this constraint.'
                        )}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )}

          {/* Educational Note */}
          <div className="border-t border-slate-200 pt-4">
            <details className="text-xs text-slate-600">
              <summary className="cursor-pointer font-medium text-slate-700 hover:text-slate-900">
                📚 Technical Details
              </summary>
              <div className="mt-2 space-y-2 pl-4">
                <p>
                  <strong>Slack:</strong> The difference between the constraint's right-hand side 
                  and the actual value. Zero slack means the constraint is "binding" (fully used).
                </p>
                <p>
                  <strong>Shadow Price (Dual Value):</strong> The marginal value of relaxing a 
                  constraint by one unit. Derived from the LP dual problem. Only meaningful for 
                  binding constraints within the valid range.
                </p>
                <p>
                  <strong>Interpretation:</strong> A shadow price of 0.05 AED on "Budget" means 
                  increasing your budget by 1 AED would increase your objective by 0.05 AED 
                  (e.g., 5% yield improvement).
                </p>
              </div>
            </details>
          </div>
        </div>
      )}
    </div>
  )
}

