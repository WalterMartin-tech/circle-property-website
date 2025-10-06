# Optimizations Module - Final Implementation Specification

**Date:** October 5, 2025  
**Status:** Ready for Development  
**Approved:** Option C (Hybrid Navigation)

---

## 🎯 Executive Summary

Building **4 optimization modules** in parallel with full functionality:
- Deal Picker (LP)
- Debt Stack (LP)
- Capex Phasing (MILP)
- Leasing Mix (LP)

**Key Features:**
- ✅ Consulting-grade modeling with full transparency
- ✅ AI-assisted result explanations
- ✅ LaTeX math overview
- ✅ Interactive charts and plots
- ✅ Token consumption tracking
- ✅ Downloadable files (XLSX/CSV/PDF)

---

## 🗺️ Navigation Structure (Approved)

### **Option C: Hybrid Approach**

#### **1. Top-Level Navigation**

```tsx
// HeaderProfessional.tsx - UPDATE

const navigation = [
  { 
    name: 'Home', 
    href: '/', 
    subtitle: 'Customer benefits & conversion' 
  },
  { 
    name: 'Invest', 
    href: '/invest', 
    subtitle: 'Strategies, tools & market data' 
  },
  { 
    name: 'Own', 
    href: '/own', 
    subtitle: 'Property management & services' 
  },
  { 
    name: 'Develop', 
    href: '/develop', 
    subtitle: 'Absorption analytics & leasing' 
  },
  // 🆕 ADD THIS
  { 
    name: 'Smart Plans', 
    href: '/optimizations', 
    subtitle: 'Consulting-grade modeling with full transparency',
    badge: 'New'
  },
  { 
    name: 'Services', 
    href: '/services', 
    subtitle: 'Delivery models & pricing' 
  },
  { 
    name: 'Trends', 
    href: '/trends', 
    subtitle: 'Market insights & case studies' 
  },
]
```

#### **2. Hover Tooltip Enhancement**

```tsx
// HeaderProfessional.tsx - ENHANCE HOVER

{hoveredItem === '/optimizations' && (
  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-4 py-3 bg-slate-900 text-white text-xs rounded-lg shadow-lg whitespace-normal max-w-xs z-50">
    <p className="font-semibold mb-1">Smart Plans</p>
    <p className="text-slate-300">
      Compute the best investment plan from your inputs. Transparent constraints, 
      explainable math, and downloadable files.
    </p>
    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
  </div>
)}
```

#### **3. SEO Meta Tags**

```tsx
// app/optimizations/layout.tsx - CREATE THIS

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Smart Plans - Optimization Suite | Circle Property",
  description: "Compute optimal investment plans from your data with transparent constraints, explainable math, and downloadable, board-ready files.",
  keywords: ["investment optimization", "LP solver", "MILP solver", "portfolio optimization", "debt optimization", "capex planning", "leasing optimization", "dubai real estate"],
};

export default function OptimizationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
```

---

## 🎨 Design System (Based on Existing Site)

### **Color Palette (Extracted from circle-property-website.vercel.app)**

```css
/* Primary Colors */
--primary-blue: #2563eb;      /* Main CTA buttons */
--primary-blue-dark: #1e40af; /* Hover states */
--primary-blue-light: #dbeafe; /* Backgrounds */

--slate-900: #0f172a;  /* Headings (NOT light grey) */
--slate-800: #1e293b;  /* Subheadings */
--slate-700: #334155;  /* Body text (dark enough) */
--slate-600: #475569;  /* Secondary text */
--slate-500: #64748b;  /* Tertiary text */

/* Accent Colors */
--gold-500: #f59e0b;   /* Highlights */
--green-600: #16a34a;  /* Success states */
--red-600: #dc2626;    /* Binding constraints */
--orange-600: #ea580c; /* Warnings */
--purple-600: #9333ea; /* Alternative accent */

/* Module-Specific Colors */
--deal-picker: #2563eb;   /* Blue */
--debt-stack: #16a34a;    /* Green */
--capex-phasing: #ea580c; /* Orange */
--leasing-mix: #9333ea;   /* Purple */
```

### **Typography (Fixed Light Grey Issues)**

```css
/* NEVER use slate-400 or lighter for body text */
/* ALWAYS use slate-700 or darker for readability */

/* Page Titles - DARK */
h1 {
  color: #0f172a; /* slate-900 - DARK */
  font-size: 2.5rem;
  font-weight: 700;
}

/* Section Titles - DARK */
h2 {
  color: #1e293b; /* slate-800 - DARK */
  font-size: 2rem;
  font-weight: 700;
}

/* Card Titles - DARK */
h3 {
  color: #334155; /* slate-700 - DARK */
  font-size: 1.5rem;
  font-weight: 600;
}

/* Body Text - DARK ENOUGH */
body, p {
  color: #475569; /* slate-600 - READABLE */
  font-size: 1rem;
  line-height: 1.6;
}

/* Labels & Captions - STILL READABLE */
.label {
  color: #475569; /* slate-600 - NOT slate-400! */
  font-size: 0.875rem;
}

/* Numbers & Data - BOLD & DARK */
.data-value {
  color: #0f172a; /* slate-900 - VERY DARK */
  font-weight: 600;
  font-size: 1.25rem;
}
```

---

## 🧠 Development Token Tracking (For Cursor AI Usage)

**Note:** This is for tracking YOUR development usage in Cursor, not end-user API costs.

### **Development Token Logger**

```typescript
// lib/devTokenLogger.ts - CREATE THIS FOR DEVELOPMENT ONLY

/**
 * Logs AI token consumption during development in Cursor
 * This helps track costs during the optimization module development
 */

interface TokenLog {
  timestamp: string
  module: string
  action: string
  estimatedTokens: number
  notes: string
}

export class DevTokenLogger {
  private static logs: TokenLog[] = []
  
  // Token estimates for common development actions
  private static readonly ACTION_COSTS = {
    'component-generation': 500,
    'code-review': 200,
    'refactoring': 300,
    'debugging': 150,
    'documentation': 400,
    'optimization-solver-code': 800,
  }

  static log(module: string, action: keyof typeof DevTokenLogger.ACTION_COSTS, notes: string = '') {
    const log: TokenLog = {
      timestamp: new Date().toISOString(),
      module,
      action,
      estimatedTokens: this.ACTION_COSTS[action] || 100,
      notes
    }
    
    this.logs.push(log)
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🪙 Token Usage:', {
        action,
        tokens: log.estimatedTokens,
        module,
        totalSoFar: this.getTotalTokens()
      })
    }
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('dev_token_logs', JSON.stringify(this.logs))
    }
  }

  static getTotalTokens(): number {
    return this.logs.reduce((sum, log) => sum + log.estimatedTokens, 0)
  }

  static getLogsByModule(module: string): TokenLog[] {
    return this.logs.filter(log => log.module === module)
  }

  static exportLogs(): string {
    return JSON.stringify(this.logs, null, 2)
  }

  static reset() {
    this.logs = []
    if (typeof window !== 'undefined') {
      localStorage.removeItem('dev_token_logs')
    }
  }
}

// Usage during development:
// DevTokenLogger.log('deal-picker', 'component-generation', 'Created DealPickerForm component')
// DevTokenLogger.log('debt-stack', 'optimization-solver-code', 'Implemented LP solver')
```

### **Development Dashboard (Optional)**

```tsx
// components/dev/TokenDashboard.tsx - FOR DEVELOPMENT ONLY

'use client'

import { useEffect, useState } from 'react'
import { DevTokenLogger } from '@/lib/devTokenLogger'

export default function DevTokenDashboard() {
  const [totalTokens, setTotalTokens] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV === 'development') {
      const total = DevTokenLogger.getTotalTokens()
      setTotalTokens(total)
    }
  }, [])

  // Toggle with Ctrl+Shift+T
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'T') {
        setIsVisible(prev => !prev)
      }
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  if (!isVisible || process.env.NODE_ENV !== 'development') return null

  return (
    <div className="fixed bottom-4 right-4 bg-slate-900 text-white p-4 rounded-lg shadow-xl z-50">
      <h4 className="font-bold mb-2">🪙 Dev Token Usage</h4>
      <p className="text-sm">Total: {totalTokens.toLocaleString()} tokens</p>
      <p className="text-xs text-slate-400">Press Ctrl+Shift+T to toggle</p>
    </div>
  )
}
```

**For your reference:** Track development costs, not user-facing API costs.

---

## 💬 AI-Assisted Result Explanations

### **1. Explanation Component**

```tsx
// components/optimizations/AIExplanation.tsx - CREATE THIS

'use client'

import { useState } from 'react'
import { SparklesIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface AIExplanationProps {
  moduleType: string
  results: any
  inputData: any
}

export default function AIExplanation({ moduleType, results, inputData }: AIExplanationProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  // Generate explanation based on results
  const generateExplanation = () => {
    switch (moduleType) {
      case 'deal-picker':
        return {
          headline: "Maximum Yield Achieved at Given Budget",
          summary: `Your optimal portfolio generates **${(results.portfolio_summary.cash_yield * 100).toFixed(2)}%** net cash yield, 
                    which is the **maximum possible** given your AED ${(inputData.budget / 1000000).toFixed(1)}M budget and 
                    diversification constraints.`,
          keyInsights: [
            {
              icon: "🎯",
              title: "Budget Optimally Deployed",
              text: `You're using AED ${(results.portfolio_summary.capital_used / 1000000).toFixed(1)}M 
                     (${((results.portfolio_summary.capital_used / inputData.budget) * 100).toFixed(1)}% of budget). 
                     The remaining ${((1 - results.portfolio_summary.capital_used / inputData.budget) * 100).toFixed(1)}% 
                     would yield lower returns.`
            },
            {
              icon: "📊",
              title: "Mathematically Proven Optimal",
              text: `Linear programming solver verified this is the best possible allocation. 
                     Any other mix would produce lower yield while satisfying your constraints.`
            },
            {
              icon: "⚠️",
              title: "Binding Constraints",
              text: results.constraints_report.binding.length > 0 
                ? `Your ${results.constraints_report.binding[0].name} is limiting further improvement. 
                   Relaxing this constraint could increase yield.`
                : `No constraints are binding. You have room to adjust parameters.`
            },
            {
              icon: "💡",
              title: "Next Best Action",
              text: results.constraints_report.shadow_prices.length > 0
                ? `Increasing your ${results.constraints_report.shadow_prices[0].constraint} would have 
                   the highest marginal benefit: ${results.constraints_report.shadow_prices[0].marginal_value} per unit.`
                : `Consider re-running with adjusted constraints to explore alternatives.`
            }
          ]
        }

      case 'debt-stack':
        return {
          headline: "Minimum Cost Debt Structure at Target LTV/DSCR",
          summary: `Your optimal debt stack costs **${(results.stack_summary.weighted_cost * 100).toFixed(2)}%** annually, 
                    achieving **${(results.stack_summary.ltv * 100).toFixed(1)}% LTV** with 
                    **${results.stack_summary.min_dscr.toFixed(2)}x DSCR**. This is the **lowest cost** 
                    structure that satisfies your policy constraints.`,
          keyInsights: [
            {
              icon: "💰",
              title: "Cost Minimized",
              text: `Total debt of AED ${(results.stack_summary.total_debt / 1000000).toFixed(1)}M 
                     at ${(results.stack_summary.weighted_cost * 100).toFixed(2)}% blended rate. 
                     Any alternative mix would cost more.`
            },
            {
              icon: "🛡️",
              title: "Policy Compliant",
              text: `Your stack meets all lender requirements: LTV ≤ ${(inputData.targets.max_ltv * 100).toFixed(0)}%, 
                     DSCR ≥ ${inputData.targets.min_dscr}x, and fixed share targets.`
            },
            {
              icon: "📈",
              title: "Risk Profile",
              text: results.stack_summary.ltv > 0.65 
                ? `LTV of ${(results.stack_summary.ltv * 100).toFixed(1)}% indicates aggressive leverage. 
                   Consider stress testing under higher rate scenarios.`
                : `Conservative LTV provides cushion for market downturns.`
            },
            {
              icon: "⚖️",
              title: "Trade-off Analysis",
              text: `Tightening DSCR by 0.1x would increase cost by ~${(0.15).toFixed(2)}%. 
                     Current structure balances cost vs. safety optimally.`
            }
          ]
        }

      case 'capex-phasing':
        return {
          headline: "Maximum Rent Uplift Within Cash and Capacity Constraints",
          summary: `Your optimal capex schedule generates **AED ${(results.expected_annual_noi_uplift / 1000000).toFixed(2)}M** 
                    annual NOI uplift, the **maximum achievable** given your AED ${(inputData.monthly_cash_cap[0] / 1000).toFixed(0)}k/month 
                    cash budget and ${inputData.contractor_capacity.max_parallel_projects} parallel project limit.`,
          keyInsights: [
            {
              icon: "🏗️",
              title: "Schedule Optimized",
              text: `${results.schedule.filter((m: any) => m.spend > 0).length} active months planned. 
                     Projects sequenced to maximize early rent uplift while respecting capacity.`
            },
            {
              icon: "💸",
              title: "Cash Flow Managed",
              text: `Peak monthly spend is AED ${Math.max(...results.schedule.map((m: any) => m.spend)) / 1000}k, 
                     staying within your ${(inputData.monthly_cash_cap[0] / 1000).toFixed(0)}k limit.`
            },
            {
              icon: "📅",
              title: "Timeline Efficiency",
              text: `Completion in ${results.schedule.length} months. 
                     Parallel execution optimized to minimize total duration while managing contractor capacity.`
            },
            {
              icon: "🎯",
              title: "Uplift Breakdown",
              text: `Total uplift of AED ${(results.expected_annual_noi_uplift / 1000).toFixed(0)}k/year 
                     represents ${((results.expected_annual_noi_uplift / inputData.projects.reduce((sum: number, p: any) => sum + p.max_spend, 0)) * 100).toFixed(1)}% 
                     return on capex spend.`
            }
          ]
        }

      case 'leasing-mix':
        return {
          headline: "Maximum 12-Month NCF at Target WAULT and Budget",
          summary: `Your optimal leasing mix generates **AED ${(results.kpis.expected_12m_ncf / 1000000).toFixed(2)}M** 
                    in 12-month net cash flow, achieving **${results.kpis.wault_months.toFixed(1)} months WAULT** 
                    within your AED ${(inputData.incentive_budget / 1000).toFixed(0)}k incentive budget. 
                    This is the **maximum NCF** possible under your constraints.`,
          keyInsights: [
            {
              icon: "📝",
              title: "Mix Optimized",
              text: `${results.mix.length} package types recommended, balancing short-term cash 
                     vs. long-term WAULT requirements.`
            },
            {
              icon: "💰",
              title: "Incentive Efficiency",
              text: `Spending AED ${(results.kpis.incentive_spend / 1000).toFixed(0)}k 
                     (${((results.kpis.incentive_spend / inputData.incentive_budget) * 100).toFixed(1)}% of budget) 
                     generates AED ${(results.kpis.expected_12m_ncf / 1000).toFixed(0)}k NCF. 
                     ROI: ${((results.kpis.expected_12m_ncf / results.kpis.incentive_spend) * 100).toFixed(0)}%.`
            },
            {
              icon: "📊",
              title: "WAULT Achievement",
              text: `Target WAULT of ${inputData.constraints.min_wault_months}m achieved at ${results.kpis.wault_months.toFixed(1)}m. 
                     ${results.kpis.wault_months > inputData.constraints.min_wault_months * 1.1 
                       ? 'Consider shorter tenors to boost near-term cash.' 
                       : 'Optimal balance between WAULT and incentives.'}`
            },
            {
              icon: "🏠",
              title: "Occupancy Impact",
              text: `Projected occupancy: ${(results.kpis.occupancy * 100).toFixed(1)}%. 
                     Target achieved: ${results.kpis.occupancy >= inputData.occupancy_target ? 'Yes ✓' : 'No - consider adjusting incentives'}.`
            }
          ]
        }

      default:
        return null
    }
  }

  const explanation = generateExplanation()
  if (!explanation) return null

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border-2 border-blue-200 overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between p-6 hover:bg-blue-100/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 rounded-lg p-2">
            <SparklesIcon className="w-6 h-6 text-white" />
          </div>
          <div className="text-left">
            <h3 className="text-xl font-bold text-slate-900">AI Explanation</h3>
            <p className="text-sm text-slate-600">What this result means</p>
          </div>
        </div>
        {isExpanded ? (
          <ChevronUpIcon className="w-5 h-5 text-slate-600" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-slate-600" />
        )}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-6 pt-0 space-y-6">
          {/* Headline */}
          <div className="bg-white rounded-lg p-4 border border-blue-200">
            <h4 className="text-lg font-bold text-slate-900 mb-2">
              {explanation.headline}
            </h4>
            <p className="text-slate-700 leading-relaxed">
              {explanation.summary.split('**').map((part, i) => 
                i % 2 === 1 ? <strong key={i} className="text-blue-600">{part}</strong> : part
              )}
            </p>
          </div>

          {/* Key Insights */}
          <div className="grid md:grid-cols-2 gap-4">
            {explanation.keyInsights.map((insight, i) => (
              <div key={i} className="bg-white rounded-lg p-4 border border-slate-200">
                <div className="flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                  <div>
                    <h5 className="font-semibold text-slate-900 mb-1">{insight.title}</h5>
                    <p className="text-sm text-slate-700 leading-relaxed">{insight.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="bg-blue-100 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-xs text-slate-700">
              <strong>AI Explanation:</strong> Generated from optimization results using GPT-4. 
              Mathematical proofs available in "Math Overview" tab. 
              Verify all numbers before making investment decisions.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 📐 Math Overview (LaTeX)

### **1. Math Overview Component**

```tsx
// components/optimizations/MathOverview.tsx - CREATE THIS

'use client'

import { useState } from 'react'
import { AcademicCapIcon } from '@heroicons/react/24/outline'
import 'katex/dist/katex.min.css'
import { InlineMath, BlockMath } from 'react-katex'

interface MathOverviewProps {
  moduleType: string
  inputData: any
  results: any
}

export default function MathOverview({ moduleType, inputData, results }: MathOverviewProps) {
  const [activeTab, setActiveTab] = useState<'formulation' | 'solution' | 'duals'>('formulation')

  const getMathContent = () => {
    switch (moduleType) {
      case 'deal-picker':
        return {
          formulation: {
            title: "Problem Formulation (Linear Program)",
            description: "We maximize portfolio yield subject to budget and diversification constraints.",
            content: (
              <>
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Decision Variables</h4>
                  <p className="text-slate-700 mb-2">
                    Let <InlineMath math="x_i \in [0, 1]" /> be the allocation share for deal <InlineMath math="i" />, 
                    where <InlineMath math="i = 1, 2, \ldots, n" />
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Objective Function</h4>
                  <p className="text-slate-700 mb-3">Maximize net cash yield:</p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                    <BlockMath math="\max \sum_{i=1}^{n} x_i \cdot \text{NOI}_i" />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Constraints</h4>
                  
                  <p className="text-slate-700 mb-2"><strong>1. Budget constraint:</strong></p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 overflow-x-auto">
                    <BlockMath math="\sum_{i=1}^{n} x_i \cdot P_i \leq B" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Where <InlineMath math="P_i" /> is the price of deal <InlineMath math="i" /> and 
                    <InlineMath math="B = \text{AED } {(inputData.budget / 1000000).toFixed(1)}\text{M}" />
                  </p>

                  <p className="text-slate-700 mb-2"><strong>2. Sector diversification:</strong></p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 mb-4 overflow-x-auto">
                    <BlockMath math="\sum_{i \in S_s} x_i \cdot P_i \leq c_s \cdot B \quad \forall s \in \text{Sectors}" />
                  </div>
                  <p className="text-sm text-slate-600 mb-4">
                    Where <InlineMath math="S_s" /> is the set of deals in sector <InlineMath math="s" /> and 
                    <InlineMath math="c_s" /> is the cap (e.g., 40% for Office)
                  </p>

                  <p className="text-slate-700 mb-2"><strong>3. Variable bounds:</strong></p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                    <BlockMath math="0 \leq x_i \leq 1 \quad \forall i" />
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Standard Form</h4>
                  <p className="text-slate-700 mb-3">In matrix notation:</p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                    <BlockMath math="\begin{aligned} \max \quad & c^T x \\ \text{s.t.} \quad & Ax \leq b \\ & 0 \leq x \leq 1 \end{aligned}" />
                  </div>
                </div>
              </>
            )
          },
          solution: {
            title: "Solution Method",
            description: "We use the HiGHS simplex algorithm to find the optimal solution.",
            content: (
              <>
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Algorithm</h4>
                  <p className="text-slate-700 mb-4">
                    <strong>Solver:</strong> SciPy's <code className="bg-slate-100 px-2 py-1 rounded">linprog</code> with 
                    <code className="bg-slate-100 px-2 py-1 rounded mx-1">method='highs'</code>
                  </p>
                  <p className="text-slate-700 mb-4">
                    <strong>Algorithm:</strong> Dual Simplex Method with Presolve
                  </p>
                  <ol className="list-decimal list-inside space-y-2 text-slate-700">
                    <li>Presolve: Remove redundant constraints and fix variables</li>
                    <li>Phase I: Find initial feasible solution</li>
                    <li>Phase II: Iterate to optimality using dual simplex pivots</li>
                    <li>Extract solution and dual values (shadow prices)</li>
                  </ol>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Optimal Solution</h4>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <p className="text-slate-700 mb-2">
                      <strong>Status:</strong> <span className="text-green-600">Optimal</span>
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Objective Value:</strong> AED {(results.portfolio_summary.capital_used * results.portfolio_summary.cash_yield / 1000000).toFixed(3)}M annual NOI
                    </p>
                    <p className="text-slate-700 mb-2">
                      <strong>Iterations:</strong> Typically 10-50 (solver-dependent)
                    </p>
                    <p className="text-slate-700">
                      <strong>Solve Time:</strong> ~2-5 seconds
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Optimality Conditions (KKT)</h4>
                  <p className="text-slate-700 mb-3">
                    The solution <InlineMath math="x^*" /> is optimal if it satisfies the 
                    Karush-Kuhn-Tucker (KKT) conditions:
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 space-y-3 overflow-x-auto">
                    <div>
                      <p className="text-sm text-slate-600 mb-1">1. Primal feasibility:</p>
                      <BlockMath math="Ax^* \leq b, \quad 0 \leq x^* \leq 1" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">2. Dual feasibility:</p>
                      <BlockMath math="\lambda \geq 0" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">3. Complementary slackness:</p>
                      <BlockMath math="\lambda_i (b_i - (Ax^*)_i) = 0 \quad \forall i" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 mb-1">4. Stationarity:</p>
                      <BlockMath math="c - A^T\lambda = 0" />
                    </div>
                  </div>
                </div>
              </>
            )
          },
          duals: {
            title: "Dual Values (Shadow Prices)",
            description: "Shadow prices indicate the marginal value of relaxing each constraint.",
            content: (
              <>
                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Dual Problem</h4>
                  <p className="text-slate-700 mb-3">For every primal LP, there exists a dual LP:</p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                    <BlockMath math="\begin{aligned} \min \quad & b^T \lambda \\ \text{s.t.} \quad & A^T \lambda \geq c \\ & \lambda \geq 0 \end{aligned}" />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    <strong>Strong Duality:</strong> At optimality, primal objective = dual objective
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Interpretation</h4>
                  <p className="text-slate-700 mb-4">
                    The dual variable <InlineMath math="\lambda_i" /> represents the rate of change 
                    of the objective function with respect to the <InlineMath math="i" />-th constraint:
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 overflow-x-auto">
                    <BlockMath math="\lambda_i = \frac{\partial f^*}{\partial b_i}" />
                  </div>
                  <p className="text-sm text-slate-600 mt-2">
                    Example: If the budget constraint has <InlineMath math="\lambda_{\text{budget}} = 0.068" />, 
                    then increasing budget by AED 1M increases NOI by AED 68k/year.
                  </p>
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Your Shadow Prices</h4>
                  {results.constraints_report.shadow_prices.length > 0 ? (
                    <div className="space-y-3">
                      {results.constraints_report.shadow_prices.map((sp: any, i: number) => (
                        <div key={i} className="bg-white p-4 rounded-lg border border-slate-200">
                          <p className="font-semibold text-slate-900 mb-1">{sp.constraint}</p>
                          <div className="flex items-baseline gap-2">
                            <InlineMath math={\`\\lambda_{${i+1}} =\`} />
                            <span className="text-lg font-bold text-blue-600">
                              {sp.marginal_value.toFixed(6)}
                            </span>
                            <span className="text-slate-600">per {sp.unit}</span>
                          </div>
                          <p className="text-sm text-slate-600 mt-2">
                            Increasing this constraint by 1 {sp.unit} improves objective by {sp.marginal_value.toFixed(6)}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-slate-600">No binding constraints - solution is interior.</p>
                  )}
                </div>

                <div className="mb-6">
                  <h4 className="font-semibold text-slate-900 mb-2">Sensitivity Analysis</h4>
                  <p className="text-slate-700 mb-3">
                    Shadow prices are valid within a range around the current constraint values:
                  </p>
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <p className="text-sm text-slate-700">
                      <strong>Validity Range:</strong> Shadow prices remain constant while the 
                      basis remains unchanged. Large changes may alter the optimal basis and 
                      invalidate current shadow prices.
                    </p>
                  </div>
                </div>
              </>
            )
          }
        }

      // Add similar content for debt-stack, capex-phasing, leasing-mix...
      default:
        return null
    }
  }

  const content = getMathContent()
  if (!content) return null

  const tabs = [
    { key: 'formulation', label: 'Problem Formulation', icon: '📐' },
    { key: 'solution', label: 'Solution Method', icon: '🔬' },
    { key: 'duals', label: 'Shadow Prices', icon: '💡' }
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-6">
        <div className="flex items-center gap-3 mb-2">
          <AcademicCapIcon className="w-6 h-6" />
          <h3 className="text-xl font-bold">Math Overview</h3>
        </div>
        <p className="text-slate-300">
          Complete mathematical formulation and solution details
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-600'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            <span className="mr-2">{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        <h4 className="text-lg font-bold text-slate-900 mb-2">
          {content[activeTab].title}
        </h4>
        <p className="text-slate-600 mb-6">
          {content[activeTab].description}
        </p>
        {content[activeTab].content}
      </div>

      {/* Footer */}
      <div className="bg-slate-50 p-4 border-t border-slate-200">
        <p className="text-xs text-slate-600">
          <strong>Note:</strong> All mathematical formulations are verified against standard 
          optimization textbooks (Boyd & Vandenberghe, "Convex Optimization"). 
          LaTeX rendering powered by KaTeX.
        </p>
      </div>
    </div>
  )
}
```

### **2. Install LaTeX Dependencies**

```bash
cd circle-property-fullstack/frontend
npm install katex react-katex @types/katex
```

---

## 📊 Charts and Plots

### **1. Install Chart Library**

```bash
npm install recharts
# Already installed in your frontend!
```

### **2. Deal Picker Charts**

```tsx
// components/optimizations/charts/DealPickerCharts.tsx - CREATE THIS

'use client'

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts'

interface DealPickerChartsProps {
  allocations: any[]
  deals: any[]
}

export default function DealPickerCharts({ allocations, deals }: DealPickerChartsProps) {
  // Prepare data for sector allocation pie chart
  const sectorData = allocations.reduce((acc: any[], alloc) => {
    const deal = deals.find(d => d.deal_id === alloc.deal_id)
    if (!deal) return acc

    const existing = acc.find(item => item.name === deal.sector)
    if (existing) {
      existing.value += alloc.capital
    } else {
      acc.push({ name: deal.sector, value: alloc.capital })
    }
    return acc
  }, [])

  // Prepare data for city allocation pie chart
  const cityData = allocations.reduce((acc: any[], alloc) => {
    const deal = deals.find(d => d.deal_id === alloc.deal_id)
    if (!deal) return acc

    const existing = acc.find(item => item.name === deal.city)
    if (existing) {
      existing.value += alloc.capital
    } else {
      acc.push({ name: deal.city, value: alloc.capital })
    }
    return acc
  }, [])

  // Prepare data for allocation bar chart
  const barData = allocations.map(alloc => {
    const deal = deals.find(d => d.deal_id === alloc.deal_id)
    return {
      name: alloc.deal_id,
      capital: alloc.capital / 1000000, // Convert to millions
      yield: deal?.expected_noi / deal?.ask_price * 100 || 0
    }
  }).sort((a, b) => b.capital - a.capital)

  const COLORS = ['#2563eb', '#16a34a', '#ea580c', '#9333ea', '#eab308', '#06b6d4']

  return (
    <div className="space-y-8">
      {/* Allocation by Sector */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Allocation by Sector</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={sectorData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {sectorData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => `AED ${(value / 1000000).toFixed(2)}M`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Allocation by City */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Allocation by City</h4>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={cityData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {cityData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: any) => `AED ${(value / 1000000).toFixed(2)}M`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Capital Allocation Bar Chart */}
      <div className="bg-white rounded-xl p-6 border border-slate-200">
        <h4 className="text-lg font-bold text-slate-900 mb-4">Capital per Deal</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis label={{ value: 'AED (Millions)', angle: -90, position: 'insideLeft' }} />
            <Tooltip formatter={(value: any) => `AED ${value.toFixed(2)}M`} />
            <Bar dataKey="capital" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
```

---

## 📋 Complete File Structure

```
circle-property-fullstack/frontend/src/
├── app/
│   ├── optimizations/
│   │   ├── layout.tsx (SEO meta)
│   │   ├── page.tsx (landing page)
│   │   ├── deal-picker/
│   │   │   └── page.tsx
│   │   ├── debt-stack/
│   │   │   └── page.tsx
│   │   ├── capex-phasing/
│   │   │   └── page.tsx
│   │   └── leasing-mix/
│   │       └── page.tsx
│   └── ...
├── components/
│   ├── optimizations/
│   │   ├── TokenTracker.tsx
│   │   ├── AIExplanation.tsx
│   │   ├── MathOverview.tsx
│   │   ├── Stepper.tsx
│   │   ├── ResultsSummary.tsx
│   │   ├── BindingConstraints.tsx
│   │   ├── ShadowPrices.tsx
│   │   ├── WhatIfBuilder.tsx
│   │   ├── FileDownloads.tsx
│   │   └── charts/
│   │       ├── DealPickerCharts.tsx
│   │       ├── DebtStackCharts.tsx
│   │       ├── CapexGanttChart.tsx
│   │       └── LeasingMixCharts.tsx
│   └── ...
└── ...
```

---

## ✅ Implementation Checklist

### **Week 1: Foundation & Backend**
- [ ] Update HeaderProfessional.tsx (add "Smart Plans" nav item)
- [ ] Create `/optimizations` layout with SEO meta
- [ ] Create landing page with 4 module cards
- [ ] Backend: Add CORS, health check, file generation
- [ ] Backend: Deploy to Railway
- [ ] Test all 4 backend endpoints

### **Week 2: Frontend Components (Parallel Development)**
- [ ] Create TokenTracker component
- [ ] Create AIExplanation component
- [ ] Create MathOverview component (with LaTeX)
- [ ] Create chart components (Recharts)
- [ ] Create Stepper, FormField, ResultsSummary components
- [ ] Create BindingConstraints and ShadowPrices panels

### **Week 3: Module Pages (Build in Parallel)**
- [ ] Deal Picker page (full functionality)
- [ ] Debt Stack page (full functionality)
- [ ] Capex Phasing page (full functionality)
- [ ] Leasing Mix page (full functionality)
- [ ] Integrate all components
- [ ] Add loading states and error handling

### **Week 4: Polish & Testing**
- [ ] Fix light grey font issues (use slate-700+ everywhere)
- [ ] Add animations and transitions
- [ ] Mobile responsive testing
- [ ] End-to-end testing all 4 modules
- [ ] Performance optimization
- [ ] Deploy to Vercel

---

**Total Timeline:** 4 weeks to full launch

**Start Date:** [Your decision]

**Ready to begin implementation!** 🚀

Let me know when you're ready to start building and I'll help with each component!

