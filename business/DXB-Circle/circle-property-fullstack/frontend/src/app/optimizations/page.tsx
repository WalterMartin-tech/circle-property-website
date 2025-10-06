'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { SparklesIcon, ChartBarIcon, CurrencyDollarIcon, CalendarIcon, HomeIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import HeaderProfessional from '@/components/HeaderProfessional'
import Footer from '@/components/Footer'
import BookCallModal from '@/components/optimizations/BookCallModal'

export default function OptimizationsPage() {
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const modules = [
    {
      id: 'deal-picker',
      name: 'Deal Picker',
      icon: ChartBarIcon,
      tagline: 'Maximize yield across acquisition opportunities',
      description: 'Select the optimal mix of properties from your pipeline to maximize cash yield while respecting budget, sector, and geographic constraints.',
      features: [
        'Budget allocation optimization',
        'Sector & geographic diversification',
        'Risk-adjusted yield calculations',
        'Fractional vs whole-asset choices'
      ],
      inputs: 'Budget, deals, risk tolerance',
      outputs: 'Portfolio allocation, expected yield, binding constraints',
      complexity: 'Linear Programming (LP)',
      href: '/optimizations/deal-picker'
    },
    {
      id: 'debt-stack',
      name: 'Debt Stack Optimizer',
      icon: CurrencyDollarIcon,
      tagline: 'Minimize financing cost while meeting covenants',
      description: 'Find the least-cost debt structure by blending senior, mezzanine, and hedging instruments while satisfying LTV, DSCR, and fixed-rate requirements.',
      features: [
        'Multi-tranche debt optimization',
        'LTV and DSCR compliance',
        'Fixed vs floating rate mix',
        'Interest rate hedging strategies'
      ],
      inputs: 'Purchase price, NOI, rate scenarios',
      outputs: 'Debt mix, weighted cost, hedge recommendations',
      complexity: 'Linear Programming (LP)',
      href: '/optimizations/debt-stack'
    },
    {
      id: 'capex-phasing',
      name: 'CapEx Phasing',
      icon: CalendarIcon,
      tagline: 'Schedule renovations to maximize NOI uplift',
      description: 'Optimally phase capital improvement projects across time to maximize value creation while respecting monthly cash flow and contractor capacity constraints.',
      features: [
        'Time-phased project scheduling',
        'Cash flow constraints',
        'Contractor capacity limits',
        'ROI-driven prioritization'
      ],
      inputs: 'Projects, monthly budgets, timelines',
      outputs: 'Project schedule, expected uplift, Gantt chart',
      complexity: 'Mixed-Integer LP (MILP)',
      href: '/optimizations/capex-phasing'
    },
    {
      id: 'leasing-mix',
      name: 'Leasing Mix Optimizer',
      icon: HomeIcon,
      tagline: 'Balance tenant offers to hit occupancy & WAULT',
      description: 'Determine the optimal mix of lease packages to achieve occupancy targets while maximizing NCF and meeting minimum WAULT requirements within your incentive budget.',
      features: [
        'Occupancy target achievement',
        'WAULT (weighted avg lease term) optimization',
        'Incentive budget management',
        'Tenant mix balancing'
      ],
      inputs: 'Vacant units, lease packages, targets',
      outputs: 'Leasing plan, expected NCF, WAULT, binding constraints',
      complexity: 'Linear Programming (LP)',
      href: '/optimizations/leasing-mix'
    }
  ]

  return (
    <>
      <HeaderProfessional />
      
      <main className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              {/* Badge */}
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full mb-6">
                <SparklesIcon className="w-5 h-5 text-purple-600 mr-2" />
                <span className="text-sm font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Smart Plans — Consulting-grade modeling
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6">
                Compute the <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">optimal plan</span>
                <br />from your inputs
              </h1>

              {/* Subheadline */}
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Industrial-grade optimization behind investor-friendly forms. Full transparency on constraints, 
                explainable math, and downloadable, board-ready files.
              </p>

              {/* Value Props */}
              <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Transparent constraints</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>AI-assisted explanations</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>LaTeX math overview</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span>Board-ready downloads</span>
                </div>
              </div>
            </motion.div>

            {/* LP Introduction Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-16"
            >
              <details className="bg-white rounded-2xl border-2 border-slate-200 shadow-lg hover:shadow-xl transition-all overflow-hidden group">
                <summary className="cursor-pointer px-10 py-8 hover:bg-gradient-to-br hover:from-slate-50 hover:to-blue-50/30 transition-all">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-600 via-purple-500 to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-md">
                        <SparklesIcon className="w-7 h-7 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-1.5 tracking-tight">What is Linear Programming & Who Are These Tools For?</h3>
                        <p className="text-base text-slate-600 font-light">Discover the institutional-grade methodology behind these optimization modules</p>
                      </div>
                    </div>
                    <div className="text-slate-300 group-open:rotate-180 transition-transform duration-300">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </summary>

                <div className="px-10 py-10 bg-gradient-to-b from-white to-slate-50/50 border-t border-slate-100">
                  <div className="prose prose-slate max-w-none">
                    
                    {/* What is LP */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-lg">1</span>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">What is Linear Programming (LP)?</h4>
                      </div>
                      <div className="pl-[52px] space-y-4">
                        <p className="text-lg text-slate-700 leading-relaxed">
                          <strong className="text-slate-900 font-semibold">Linear Programming</strong> is a mathematical optimization technique used to find the <em className="text-slate-800">best possible outcome</em>{' '}
                          (such as maximum profit or minimum cost) from a set of constraints. It's the same methodology used by:
                        </p>
                        <ul className="text-base text-slate-700 space-y-2.5 ml-6">
                          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold">
                            <strong className="font-semibold text-slate-800">Airlines</strong> to optimize flight schedules and crew assignments
                          </li>
                          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold">
                            <strong className="font-semibold text-slate-800">Manufacturing</strong> to maximize production efficiency
                          </li>
                          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold">
                            <strong className="font-semibold text-slate-800">Logistics companies</strong> to minimize delivery costs
                          </li>
                          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold">
                            <strong className="font-semibold text-slate-800">Investment banks</strong> to construct optimal portfolios
                          </li>
                          <li className="relative pl-4 before:content-['•'] before:absolute before:left-0 before:text-purple-600 before:font-bold">
                            <strong className="font-semibold text-slate-800">Private equity firms</strong> to structure acquisition financing
                          </li>
                        </ul>
                        <p className="text-base text-slate-700 leading-relaxed pt-2">
                          In real estate, LP helps you answer questions like: <em className="text-slate-800 font-medium">"Given 10 investment opportunities and AED 50M, which combination 
                          maximizes my yield while staying within risk limits?"</em> — questions that would take days to analyze manually.
                        </p>
                      </div>
                    </div>

                    {/* Who Are These Tools For */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-emerald-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">Who Are These Tools For?</h4>
                      </div>
                      <div className="pl-[52px]">
                        <div className="grid md:grid-cols-2 gap-5 mb-6">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border-2 border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-blue-900 mb-3 text-lg flex items-center gap-2">
                              <span className="text-2xl">🏢</span>
                              <span>Institutional Investors</span>
                            </h5>
                            <p className="text-base text-slate-700 leading-relaxed">
                              Family offices, funds, and REITs evaluating multiple opportunities simultaneously and need data-driven allocation decisions.
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border-2 border-purple-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-purple-900 mb-3 text-lg flex items-center gap-2">
                              <span className="text-2xl">🏗️</span>
                              <span>Developers & Asset Managers</span>
                            </h5>
                            <p className="text-base text-slate-700 leading-relaxed">
                              Teams managing CapEx programs, lease-up strategies, or refinancing decisions across multi-asset portfolios.
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-green-50 to-emerald-100/50 border-2 border-green-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-green-900 mb-3 text-lg flex items-center gap-2">
                              <span className="text-2xl">💼</span>
                              <span>Advisory & Consulting Firms</span>
                            </h5>
                            <p className="text-base text-slate-700 leading-relaxed">
                              Advisors who need to deliver quantitative, defensible recommendations to clients in board-ready formats.
                            </p>
                          </div>
                          <div className="bg-gradient-to-br from-orange-50 to-orange-100/50 border-2 border-orange-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                            <h5 className="font-bold text-orange-900 mb-3 text-lg flex items-center gap-2">
                              <span className="text-2xl">📊</span>
                              <span>Sophisticated Private Investors</span>
                            </h5>
                            <p className="text-base text-slate-700 leading-relaxed">
                              High-net-worth individuals building multi-property portfolios who want institutional-grade decision tools.
                            </p>
                          </div>
                        </div>
                        <div className="bg-slate-50 border-l-4 border-slate-400 rounded-r-lg p-4">
                          <p className="text-sm text-slate-700 leading-relaxed">
                            <strong className="text-slate-900 font-semibold">Not suitable for:</strong> Single-property retail buyers or those seeking simple "buy/don't buy" advice. 
                            These tools are for <em className="text-slate-800 font-medium">multi-variable optimization</em> across portfolios or complex structures.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Why Try Them */}
                    <div className="mb-12">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">Why Try These Optimizers on Our Website?</h4>
                      </div>
                      <div className="pl-[52px]">
                        <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 rounded-2xl p-8 mb-6 shadow-sm">
                          <div className="grid md:grid-cols-3 gap-8">
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🚀</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">Instant Results</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                Get answers in seconds, not days. No need to hire consultants for exploratory analysis.
                              </p>
                            </div>
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🔍</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">Full Transparency</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                See exactly which constraints are binding, shadow prices, and the mathematical formulation.
                              </p>
                            </div>
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🎯</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">Risk-Free Testing</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                Experiment with scenarios at zero cost before committing capital or engaging advisors.
                              </p>
                            </div>
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🤖</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">AI-Assisted Explanation</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                Every result includes plain-English interpretation and "what-if" scenarios to build intuition.
                              </p>
                            </div>
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">📈</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">Board-Ready Outputs</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                Download XLSX, PDF reports, and charts ready to present to investment committees.
                              </p>
                            </div>
                            <div className="group">
                              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform">🔒</div>
                              <h5 className="font-bold text-slate-900 mb-2 text-lg">Your Data Stays Private</h5>
                              <p className="text-base text-slate-700 leading-relaxed">
                                Computations run server-side but data is never stored. Complete confidentiality.
                              </p>
                            </div>
                          </div>
                        </div>
                        <p className="text-base text-slate-700 leading-relaxed mb-6">
                          <strong className="text-slate-900 font-semibold">Think of it as a "test drive" for consulting-grade analytics.</strong> Use the free tools to explore 
                          your options, validate hypotheses, and understand trade-offs. If you need custom constraints, multi-stage optimization, or 
                          ongoing advisory, our team is ready to help.
                        </p>
                        
                        {/* Book Consultation Button */}
                        <button
                          onClick={() => setIsBookingModalOpen(true)}
                          className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>Book a Consultation with Senior Partner</span>
                        </button>
                        <p className="text-sm text-slate-600 mt-3">
                          Discuss custom optimization models, multi-stage analysis, or ongoing advisory services
                        </p>
                      </div>
                    </div>

                    {/* What You'll Get */}
                    <div>
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-600 to-orange-500 rounded-xl flex items-center justify-center shadow-sm">
                          <span className="text-white font-bold text-lg">4</span>
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 tracking-tight">What You'll Get from Each Module</h4>
                      </div>
                      <div className="pl-[52px] space-y-4">
                        <div className="flex items-start gap-4 bg-blue-50 border-l-4 border-blue-600 rounded-r-xl p-5 hover:bg-blue-100/50 transition-colors">
                          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <ChartBarIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <strong className="text-slate-900 font-bold text-lg block mb-1">Deal Picker</strong>
                            <span className="text-base text-slate-700 leading-relaxed">
                              Optimal portfolio allocation, expected yield, capital efficiency, binding constraints
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 bg-green-50 border-l-4 border-green-600 rounded-r-xl p-5 hover:bg-green-100/50 transition-colors">
                          <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <CurrencyDollarIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <strong className="text-slate-900 font-bold text-lg block mb-1">Debt Stack</strong>
                            <span className="text-base text-slate-700 leading-relaxed">
                              Least-cost financing structure, tranche allocations, LTV/DSCR compliance, hedge recommendations
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 bg-orange-50 border-l-4 border-orange-600 rounded-r-xl p-5 hover:bg-orange-100/50 transition-colors">
                          <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <CalendarIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <strong className="text-slate-900 font-bold text-lg block mb-1">CapEx Phasing</strong>
                            <span className="text-base text-slate-700 leading-relaxed">
                              Project schedule, NOI uplift projections, cash flow management, ROI-driven prioritization
                            </span>
                          </div>
                        </div>
                        <div className="flex items-start gap-4 bg-purple-50 border-l-4 border-purple-600 rounded-r-xl p-5 hover:bg-purple-100/50 transition-colors">
                          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
                            <HomeIcon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <strong className="text-slate-900 font-bold text-lg block mb-1">Leasing Mix</strong>
                            <span className="text-base text-slate-700 leading-relaxed">
                              Optimal tenant mix, occupancy achievement, WAULT maximization, incentive budget optimization
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </details>
            </motion.div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 gap-8">
              {modules.map((module, index) => (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={module.href}>
                    <div className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-purple-300 hover:shadow-xl transition-all cursor-pointer h-full group">
                      {/* Icon */}
                      <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <module.icon className="w-8 h-8 text-purple-600" />
                      </div>

                      {/* Title & Tagline */}
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">{module.name}</h3>
                      <p className="text-sm text-purple-600 font-medium mb-4">{module.tagline}</p>

                      {/* Description */}
                      <p className="text-slate-600 mb-6">{module.description}</p>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {module.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-slate-700">
                            <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Meta Info */}
                      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Inputs</p>
                          <p className="text-sm font-medium text-slate-900">{module.inputs}</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Method</p>
                          <p className="text-sm font-medium text-slate-900">{module.complexity}</p>
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-6 flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                        <span>Start optimization</span>
                        <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Trust Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-16 bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-10 text-center"
            >
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                Trusted by professional investors
              </h3>
              <p className="text-slate-600 max-w-2xl mx-auto mb-6">
                Our optimization models use industry-standard solvers (SciPy HiGHS for LP, OR-Tools CBC for MILP) 
                and provide full transparency into binding constraints and shadow prices.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-700">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">✓</span>
                  <span>Deterministic results</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">✓</span>
                  <span>Verifiable math</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">✓</span>
                  <span>Board-ready outputs</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-900">✓</span>
                  <span>Senior specialist support</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Book Consultation Modal */}
      <BookCallModal 
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        moduleType="consultation"
        context="Exploring custom optimization solutions, multi-stage analysis, or ongoing advisory services for real estate portfolio management."
      />
    </>
  )
}
