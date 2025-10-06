'use client'

import { AcademicCapIcon } from '@heroicons/react/24/outline'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import LaTeX component to avoid SSR issues
const LaTeXDisplay = dynamic(() => import('./LaTeXDisplay'), { ssr: false })

interface MathOverviewProps {
  moduleType: 'deal-picker' | 'debt-stack' | 'capex-phasing' | 'leasing-mix'
}

export default function MathOverview({ moduleType }: MathOverviewProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getMathContent = () => {
    switch (moduleType) {
      case 'deal-picker':
        return {
          title: 'Deal Picker - Linear Programming Formulation',
          objective: 'Maximize portfolio yield',
          sections: [
            {
              heading: 'Decision Variables',
              latex: 'x_i \\in [0,1] \\text{ for } i = 1, \\ldots, n',
              explanation: 'xᵢ represents the allocation weight for deal i (0 = not selected, 1 = fully allocated)'
            },
            {
              heading: 'Objective Function',
              latex: '\\max \\sum_{i=1}^{n} \\text{NOI}_i \\cdot x_i - \\lambda \\cdot \\text{Risk}_i \\cdot \\text{Price}_i \\cdot x_i',
              explanation: 'Maximize net operating income minus risk-adjusted costs across all deals'
            },
            {
              heading: 'Budget Constraint',
              latex: '\\sum_{i=1}^{n} \\text{Price}_i \\cdot x_i \\leq \\text{Budget}',
              explanation: 'Total capital deployed cannot exceed available budget'
            },
            {
              heading: 'Sector Allocation Caps',
              latex: '\\sum_{i \\in S} \\text{Price}_i \\cdot x_i \\leq \\alpha_S \\cdot \\text{Budget} \\quad \\forall S \\in \\text{Sectors}',
              explanation: 'Each sector allocation limited to αₛ fraction of total budget'
            },
            {
              heading: 'Geographic Allocation Caps',
              latex: '\\sum_{i \\in G} \\text{Price}_i \\cdot x_i \\leq \\beta_G \\cdot \\text{Budget} \\quad \\forall G \\in \\text{Cities}',
              explanation: 'Each city allocation limited to βG fraction of total budget'
            },
            {
              heading: 'Solution Method',
              latex: '\\text{Solver: SciPy HiGHS (Interior Point + Simplex)}',
              explanation: 'Industrial-grade LP solver with proven convergence properties'
            }
          ]
        }

      case 'debt-stack':
        return {
          title: 'Debt Stack - Cost Minimization LP',
          objective: 'Minimize weighted average cost of debt',
          sections: [
            {
              heading: 'Decision Variables',
              latex: 'd_k \\geq 0 \\text{ for } k = 1, \\ldots, K',
              explanation: 'dₖ represents the amount borrowed from tranche k'
            },
            {
              heading: 'Objective Function',
              latex: '\\min \\sum_{k=1}^{K} r_k \\cdot d_k',
              explanation: 'Minimize total annual interest cost across all tranches'
            },
            {
              heading: 'Debt Cap (LTV)',
              latex: '\\sum_{k=1}^{K} d_k \\leq \\min(\\text{LTV}_{\\max} \\cdot P, \\, P - E)',
              explanation: 'Total debt limited by maximum LTV ratio and equity contribution'
            },
            {
              heading: 'DSCR Constraint',
              latex: '\\sum_{k=1}^{K} r_k \\cdot d_k \\leq \\frac{\\text{NOI}_{\\min}}{\\text{DSCR}_{\\min}}',
              explanation: 'Debt service must not exceed NOI divided by minimum DSCR'
            },
            {
              heading: 'Tranche Size Limits',
              latex: 'd_k \\leq \\gamma_k \\cdot P \\quad \\forall k',
              explanation: 'Each tranche limited to γₖ fraction of purchase price'
            },
            {
              heading: 'Fixed-Rate Minimum',
              latex: '\\sum_{k \\in \\text{Fixed}} d_k \\geq \\delta \\cdot \\sum_{k=1}^{K} d_k',
              explanation: 'Fixed-rate debt must comprise at least δ fraction of total'
            }
          ]
        }

      case 'capex-phasing':
        return {
          title: 'CapEx Phasing - Mixed-Integer Linear Program',
          objective: 'Maximize NOI uplift from renovations',
          sections: [
            {
              heading: 'Decision Variables',
              latex: 's_{jt} \\geq 0, \\, y_{jt} \\in \\{0,1\\} \\quad \\forall j,t',
              explanation: 'sⱼₜ = spend on project j in month t; yⱼₜ = 1 if project j active in month t'
            },
            {
              heading: 'Objective Function',
              latex: '\\max \\sum_{j=1}^{J} \\rho_j \\cdot \\sum_{t=1}^{H} s_{jt}',
              explanation: 'Maximize total NOI uplift (ρⱼ = uplift rate per AED spent on project j)'
            },
            {
              heading: 'Project Activation',
              latex: 's_{jt} \\leq M \\cdot y_{jt} \\quad \\forall j,t',
              explanation: 'Can only spend on project j in month t if project is active (M = large constant)'
            },
            {
              heading: 'Project Budget',
              latex: 'B_j^{\\min} \\leq \\sum_{t=1}^{H} s_{jt} \\leq B_j^{\\max} \\quad \\forall j',
              explanation: 'Total spend on each project must fall within [min, max] range'
            },
            {
              heading: 'Monthly Cash Cap',
              latex: '\\sum_{j=1}^{J} s_{jt} \\leq C_t \\quad \\forall t',
              explanation: 'Total spending across all projects in month t cannot exceed cash availability'
            },
            {
              heading: 'Contractor Capacity',
              latex: '\\sum_{j=1}^{J} y_{jt} \\leq P_{\\max} \\quad \\forall t',
              explanation: 'Maximum number of simultaneous projects limited by contractor availability'
            },
            {
              heading: 'Solution Method',
              latex: '\\text{Solver: OR-Tools CBC (Branch \\& Cut)}',
              explanation: 'MILP solver with advanced presolve and cutting plane strategies'
            }
          ]
        }

      case 'leasing-mix':
        return {
          title: 'Leasing Mix - LP with WAULT Constraint',
          objective: 'Maximize net cash flow from leasing',
          sections: [
            {
              heading: 'Decision Variables',
              latex: 'u_p \\geq 0 \\text{ for } p = 1, \\ldots, P',
              explanation: 'uₚ = number of units leased under package p'
            },
            {
              heading: 'Objective Function',
              latex: '\\max \\sum_{p=1}^{P} (R_p - I_p) \\cdot u_p',
              explanation: 'Maximize total NCF (Rₚ = annual rent, Iₚ = incentive cost per package)'
            },
            {
              heading: 'Occupancy Target',
              latex: '\\sum_{p=1}^{P} u_p = U_{\\text{target}}',
              explanation: 'Total leased units must equal occupancy target'
            },
            {
              heading: 'Incentive Budget',
              latex: '\\sum_{p=1}^{P} I_p \\cdot u_p \\leq B_{\\text{incentive}}',
              explanation: 'Total incentive spend cannot exceed available budget'
            },
            {
              heading: 'Package Share Limits',
              latex: 'u_p \\leq \\theta_p \\cdot U_{\\text{total}} \\quad \\forall p',
              explanation: 'Each package limited to θₚ fraction of total inventory'
            },
            {
              heading: 'WAULT Constraint',
              latex: '\\sum_{p=1}^{P} T_p \\cdot u_p \\geq W_{\\min} \\cdot \\sum_{p=1}^{P} u_p',
              explanation: 'Weighted average lease term (Tₚ) must meet minimum WAULT requirement'
            }
          ]
        }

      default:
        return {
          title: 'Mathematical Formulation',
          objective: '',
          sections: []
        }
    }
  }

  const math = getMathContent()

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors border-b border-slate-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center">
            <AcademicCapIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">Mathematical Overview</h3>
            <p className="text-sm text-slate-600">Complete formulation with notation</p>
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
        <div className="p-6 space-y-6">
          {/* Title & Objective */}
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <h4 className="text-xl font-bold text-slate-900 mb-2">{math.title}</h4>
            {math.objective && (
              <p className="text-sm text-blue-800">
                <strong>Objective:</strong> {math.objective}
              </p>
            )}
          </div>

          {/* Mathematical Sections */}
          <div className="space-y-6">
            {math.sections.map((section, idx) => (
              <div key={idx} className="border-l-4 border-indigo-500 pl-4">
                <h5 className="font-bold text-slate-900 mb-2">{section.heading}</h5>
                
                {/* LaTeX Display with KaTeX */}
                <div className="bg-slate-50 rounded-lg p-4 mb-2 overflow-x-auto">
                  <LaTeXDisplay formula={section.latex} display={true} />
                </div>
                
                <p className="text-sm text-slate-600 italic">{section.explanation}</p>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="border-t border-slate-200 pt-4">
            <p className="text-xs text-slate-500">
              <strong>Note:</strong> This is a deterministic optimization model. Results are guaranteed optimal 
              given the inputs and constraints. All solvers used are industry-standard (SciPy, OR-Tools) with 
              proven convergence properties.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

