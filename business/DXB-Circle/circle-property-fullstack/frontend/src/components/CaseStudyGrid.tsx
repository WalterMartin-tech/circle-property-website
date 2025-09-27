'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'

interface CaseStudy {
  id: string
  title: string
  location: string
  strategy: string
  before: { yield: string; occupancy: string }
  after: { yield: string; occupancy: string }
  timeline: string
  investment: string
  improvement: string
  fullDetails: {
    overview: string
    challenge: string
    solution: string[]
    results: string[]
    timeline: Array<{ phase: string; duration: string; description: string }>
    financials: {
      purchasePrice: string
      renovationCost: string
      totalInvestment: string
      currentValuation: string
      monthlyIncome: string
      totalReturn: string
    }
    lessons: string[]
  }
  pdfSize: string
}

export default function CaseStudyGrid() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)

  const caseStudies: CaseStudy[] = [
    {
      id: 'marina-str-conversion',
      title: 'Marina STR Conversion',
      location: 'Dubai Marina',
      strategy: 'Max Profit',
      before: { yield: '3.2%', occupancy: '65%' },
      after: { yield: '8.4%', occupancy: '78%' },
      timeline: '8 months',
      investment: 'AED 1.8M',
      improvement: '+163% yield increase',
      pdfSize: '2.8 MB',
      fullDetails: {
        overview: 'Conversion of underperforming traditional rental apartment in Dubai Marina to high-yield short-term rental operation, utilizing strategic location near metro and business districts.',
        challenge: 'Property was experiencing low occupancy (65%) with long void periods and below-market rental rates. Traditional letting agents were unable to optimize performance despite prime Marina location.',
        solution: [
          'Complete interior renovation with modern, hospitality-grade finishes',
          'Professional photography and staging for premium market positioning',
          'Implementation of dynamic pricing strategy using market data analytics',
          'Partnership with multiple booking platforms for maximum exposure',
          'Professional property management with 24/7 guest support',
          'Legal compliance review for STR licensing and approvals'
        ],
        results: [
          'Rental yield increased from 3.2% to 8.4% (163% improvement)',
          'Occupancy rate improved from 65% to 78%',
          'Average daily rate increased by 94% compared to monthly rental equivalent',
          'Property valuation increased by AED 420,000 due to income optimization',
          'Payback period on renovation: 18 months',
          'Client now expanding portfolio using same strategy'
        ],
        timeline: [
          { phase: 'Analysis & Planning', duration: '3 weeks', description: 'Market research, financial modeling, and regulatory compliance review' },
          { phase: 'Design & Permits', duration: '4 weeks', description: 'Interior design, procurement planning, and STR license applications' },
          { phase: 'Renovation', duration: '12 weeks', description: 'Complete renovation including furniture, technology, and hospitality setup' },
          { phase: 'Marketing Launch', duration: '2 weeks', description: 'Photography, listing optimization, and platform onboarding' },
          { phase: 'Performance Optimization', duration: 'Ongoing', description: 'Revenue management, guest experience improvements, and yield optimization' }
        ],
        financials: {
          purchasePrice: 'AED 1,250,000',
          renovationCost: 'AED 180,000',
          totalInvestment: 'AED 1,430,000',
          currentValuation: 'AED 1,850,000',
          monthlyIncome: 'AED 12,600',
          totalReturn: 'AED 420,000 capital gain + 8.4% annual yield'
        },
        lessons: [
          'Location analysis is critical - proximity to business districts drives weekday demand',
          'Professional design investment pays back quickly in premium pricing ability',
          'Dynamic pricing and revenue management can increase income by 40-60%',
          'Legal compliance must be secured before launch to avoid penalties',
          'Quality property management is essential for maintaining guest ratings and repeat bookings'
        ]
      }
    },
    {
      id: 'jlt-portfolio-acquisition',
      title: 'JLT Portfolio Acquisition',
      location: 'Jumeirah Lake Towers',
      strategy: 'Secure Income',
      before: { yield: 'N/A', occupancy: 'N/A' },
      after: { yield: '5.6%', occupancy: '94%' },
      timeline: '3 months',
      investment: 'AED 4.2M',
      improvement: 'Stable income stream',
      pdfSize: '3.4 MB',
      fullDetails: {
        overview: 'Strategic acquisition of 3-unit portfolio in established JLT towers, focusing on secure long-term rental income with professional tenant placement and management.',
        challenge: 'Client required stable, hands-off investment with predictable cash flow. Market conditions favored buyers but required quick decision-making and efficient tenant placement.',
        solution: [
          'Portfolio analysis across 5 JLT towers to identify optimal unit mix',
          'Negotiation strategy securing 8% below asking price through bulk purchase',
          'Pre-arranged financing structure with competitive rates',
          'Immediate tenant sourcing during purchase process to minimize void periods',
          'Professional property management setup with automated rent collection',
          'Comprehensive insurance and maintenance contracts for risk mitigation'
        ],
        results: [
          'Achieved 5.6% net rental yield within 3 months of completion',
          'All 3 units leased with 94% occupancy rate (accounting for maintenance periods)',
          'Secured 12-month initial lease terms with renewal options',
          'Property values increased 12% since acquisition due to market appreciation',
          'Zero management burden for client with full-service property management',
          'Created diversified income stream across different unit types and tenant profiles'
        ],
        timeline: [
          { phase: 'Market Analysis', duration: '2 weeks', description: 'JLT market research, yield analysis, and tower comparison study' },
          { phase: 'Property Selection', duration: '3 weeks', description: 'Unit viewings, technical inspections, and financial due diligence' },
          { phase: 'Negotiation & Purchase', duration: '4 weeks', description: 'Offer negotiations, financing approval, and legal completion' },
          { phase: 'Tenant Placement', duration: '3 weeks', description: 'Marketing, tenant screening, and lease agreements' },
          { phase: 'Management Setup', duration: '1 week', description: 'Property management onboarding and system implementation' }
        ],
        financials: {
          purchasePrice: 'AED 4,050,000',
          renovationCost: 'AED 45,000',
          totalInvestment: 'AED 4,095,000',
          currentValuation: 'AED 4,540,000',
          monthlyIncome: 'AED 19,100',
          totalReturn: 'AED 445,000 capital gain + 5.6% annual yield'
        },
        lessons: [
          'Portfolio purchases provide negotiation leverage and cost efficiencies',
          'JLT offers excellent rental demand from corporate tenants seeking Metro access',
          'Pre-arranged tenant sourcing eliminates void periods and accelerates ROI',
          'Professional management is essential for maintaining high occupancy rates',
          'Market timing and quick decision-making secured below-market purchase prices'
        ]
      }
    },
    {
      id: 'business-bay-development',
      title: 'Business Bay Off-Plan',
      location: 'Business Bay',
      strategy: 'Immediate Occupancy',
      before: { yield: 'Pre-construction', occupancy: 'N/A' },
      after: { yield: '6.8%', occupancy: '100%' },
      timeline: '24 months',
      investment: 'AED 2.1M',
      improvement: 'Pre-let before handover',
      pdfSize: '4.1 MB',
      fullDetails: {
        overview: 'Strategic off-plan investment in Business Bay tower with pre-leasing strategy ensuring immediate occupancy and cash flow upon handover completion.',
        challenge: 'Client wanted off-plan investment benefits (payment plan, capital appreciation) but concerned about post-handover void periods and rental market uncertainty.',
        solution: [
          'Comprehensive developer due diligence and track record analysis',
          'Unit selection optimization for rental appeal (floor, view, layout)',
          'Pre-marketing strategy 6 months before handover completion',
          'Tenant pre-screening and lease agreement preparation',
          'Handover coordination to ensure immediate move-in capability',
          'Market analysis confirming strong Business Bay rental demand'
        ],
        results: [
          'Achieved 100% occupancy from day 1 of handover',
          'Secured 6.8% rental yield with 12-month initial lease',
          'Property appreciated 15% from purchase price to handover',
          'Zero void period costs or lost rental income',
          'Tenant committed to 2-year extension with annual increases',
          'Strategy now being replicated across 4 additional off-plan investments'
        ],
        timeline: [
          { phase: 'Market Research', duration: '4 weeks', description: 'Business Bay rental market analysis and developer evaluation' },
          { phase: 'Purchase Process', duration: '6 weeks', description: 'Unit selection, purchase agreement, and payment plan setup' },
          { phase: 'Construction Period', duration: '18 months', description: 'Progress monitoring and pre-leasing preparation' },
          { phase: 'Pre-Leasing', duration: '3 months', description: 'Tenant sourcing, screening, and lease agreement finalization' },
          { phase: 'Handover & Occupancy', duration: '1 month', description: 'Unit completion, handover, and immediate tenant move-in' }
        ],
        financials: {
          purchasePrice: 'AED 1,950,000',
          renovationCost: 'AED 25,000',
          totalInvestment: 'AED 1,975,000',
          currentValuation: 'AED 2,250,000',
          monthlyIncome: 'AED 11,200',
          totalReturn: 'AED 275,000 capital gain + 6.8% annual yield'
        },
        lessons: [
          'Off-plan investments require careful developer selection and track record analysis',
          'Pre-leasing eliminates handover risks and ensures immediate cash flow',
          'Business Bay offers strong rental demand from finance and business professionals',
          'Early tenant commitment provides security and negotiation leverage',
          'Strategic timing of pre-marketing captures optimal tenant pool'
        ]
      }
    }
  ]

  const handleViewDetails = (study: CaseStudy) => {
    setSelectedStudy(study)
    setIsDetailModalOpen(true)
  }

  const handleDownload = (study: CaseStudy) => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = '#' // In real app, this would be the PDF URL
    link.download = `${study.title.replace(/\s+/g, '-').toLowerCase()}-case-study.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Show download notification
    alert(`Downloading ${study.title} case study (${study.pdfSize})...`)
  }

  return (
    <>
      <section className="mb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  {study.strategy}
                </span>
                <span className="text-sm text-slate-500">{study.timeline}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">{study.title}</h3>
              <p className="text-slate-600 mb-4">{study.location}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-red-50 rounded-lg p-3">
                  <div className="text-red-800 font-medium text-sm mb-1">Before</div>
                  <div className="text-red-900 font-bold">{study.before.yield}</div>
                  <div className="text-red-700 text-xs">{study.before.occupancy !== 'N/A' ? `${study.before.occupancy} occupied` : 'New acquisition'}</div>
                </div>
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-green-800 font-medium text-sm mb-1">After</div>
                  <div className="text-green-900 font-bold">{study.after.yield}</div>
                  <div className="text-green-700 text-xs">{study.after.occupancy} occupied</div>
                </div>
              </div>

              <div className="text-center mb-4">
                <div className="text-sm text-slate-600">Investment: {study.investment}</div>
                <div className="font-semibold text-blue-600">{study.improvement}</div>
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleViewDetails(study)}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium transition-all hover-lift flex items-center justify-center"
                >
                  View details
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </button>
                <button 
                  onClick={() => handleDownload(study)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-4 rounded-lg text-sm transition-all"
                  title={`Download PDF (${study.pdfSize})`}
                >
                  <ArrowDownTrayIcon className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Case Study Detail Modal */}
      <Transition appear show={isDetailModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setIsDetailModalOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/75 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
                  {selectedStudy && (
                    <div className="relative">
                      {/* Close Button */}
                      <button
                        type="button"
                        className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                        onClick={() => setIsDetailModalOpen(false)}
                      >
                        <XMarkIcon className="w-5 h-5 text-slate-600" />
                      </button>

                      {/* Modal Content */}
                      <div className="p-8 max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="mb-8">
                          <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                              {selectedStudy.strategy}
                            </span>
                            <span className="text-sm text-slate-500">{selectedStudy.timeline}</span>
                          </div>
                          <h2 className="text-3xl font-bold text-slate-900 mb-2">{selectedStudy.title}</h2>
                          <p className="text-lg text-slate-600">{selectedStudy.location}</p>
                        </div>

                        {/* Overview */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Overview</h3>
                          <p className="text-slate-700 leading-relaxed">{selectedStudy.fullDetails.overview}</p>
                        </div>

                        {/* Challenge */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Challenge</h3>
                          <p className="text-slate-700 leading-relaxed">{selectedStudy.fullDetails.challenge}</p>
                        </div>

                        {/* Solution */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Solution</h3>
                          <ul className="space-y-2">
                            {selectedStudy.fullDetails.solution.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-slate-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Results */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Results</h3>
                          <ul className="space-y-2">
                            {selectedStudy.fullDetails.results.map((item, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-slate-700">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Timeline */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Timeline</h3>
                          <div className="space-y-4">
                            {selectedStudy.fullDetails.timeline.map((phase, index) => (
                              <div key={index} className="flex">
                                <div className="flex flex-col items-center mr-4">
                                  <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                                  {index < selectedStudy.fullDetails.timeline.length - 1 && (
                                    <div className="w-0.5 h-12 bg-slate-300 mt-2"></div>
                                  )}
                                </div>
                                <div className="pb-8">
                                  <div className="flex items-center gap-3 mb-1">
                                    <h4 className="font-semibold text-slate-900">{phase.phase}</h4>
                                    <span className="text-sm text-slate-500">({phase.duration})</span>
                                  </div>
                                  <p className="text-slate-700 text-sm">{phase.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Financials */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Financial Summary</h3>
                          <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Purchase Price:</span>
                                <span className="font-medium text-slate-900">{selectedStudy.fullDetails.financials.purchasePrice}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Renovation Cost:</span>
                                <span className="font-medium text-slate-900">{selectedStudy.fullDetails.financials.renovationCost}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="text-slate-600 font-medium">Total Investment:</span>
                                <span className="font-bold text-slate-900">{selectedStudy.fullDetails.financials.totalInvestment}</span>
                              </div>
                            </div>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Current Valuation:</span>
                                <span className="font-medium text-green-700">{selectedStudy.fullDetails.financials.currentValuation}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Monthly Income:</span>
                                <span className="font-medium text-blue-700">{selectedStudy.fullDetails.financials.monthlyIncome}</span>
                              </div>
                              <div className="flex justify-between border-t pt-2">
                                <span className="text-slate-600 font-medium">Total Return:</span>
                                <span className="font-bold text-green-700">{selectedStudy.fullDetails.financials.totalReturn}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Lessons Learned */}
                        <div className="mb-8">
                          <h3 className="text-xl font-semibold text-slate-900 mb-3">Key Lessons</h3>
                          <ul className="space-y-2">
                            {selectedStudy.fullDetails.lessons.map((lesson, index) => (
                              <li key={index} className="flex items-start">
                                <span className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                <span className="text-slate-700">{lesson}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-6 border-t border-slate-200">
                          <button
                            onClick={() => handleDownload(selectedStudy)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-medium transition-all hover-lift flex items-center justify-center"
                          >
                            Download Full PDF ({selectedStudy.pdfSize})
                            <ArrowDownTrayIcon className="w-5 h-5 ml-2" />
                          </button>
                          <button
                            onClick={() => setIsDetailModalOpen(false)}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-6 rounded-lg font-medium transition-all"
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
