'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface CaseStudy {
  id: string
  title: string
  location: string
  before: {
    yield: string
    occupancy: string
    issues: string
  }
  after: {
    yield: string
    occupancy: string
    improvement: string
  }
  timeline: string
  keyAction: string
}

export default function ProofModule() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<CaseStudy | null>(null)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false)
  const caseStudies: CaseStudy[] = [
    {
      id: '1',
      title: 'Marina Apartment Optimization',
      location: 'Dubai Marina',
      before: {
        yield: '3.2%',
        occupancy: '65%',
        issues: 'Poor tenant quality, frequent voids'
      },
      after: {
        yield: '5.8%',
        occupancy: '92%',
        improvement: '+81% net yield increase'
      },
      timeline: '6 months',
      keyAction: 'STR conversion + targeted refurbishment'
    },
    {
      id: '2',
      title: 'Off-Plan Investment Strategy',
      location: 'Business Bay',
      before: {
        yield: 'N/A',
        occupancy: 'N/A',
        issues: 'Market timing uncertainty'
      },
      after: {
        yield: '6.4%',
        occupancy: '88%',
        improvement: 'Pre-let before handover'
      },
      timeline: '18 months',
      keyAction: 'Early tenant sourcing + market analysis'
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Proof with numbers
          </h2>
          <p className="text-xl text-slate-800 max-w-3xl mx-auto">
            Real results from recent client engagements. Names anonymized, numbers verified.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-8 hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  {study.title}
                </h3>
                <p className="text-slate-800">{study.location}</p>
              </div>

              {/* Before/After Comparison */}
              <div className="grid grid-cols-2 gap-6 mb-6">
                {/* Before */}
                <div className="bg-red-50 rounded-lg p-4">
                  <h4 className="font-semibold text-red-800 mb-3">Before</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-red-600">Yield:</span>
                      <span className="font-medium text-red-800">{study.before.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-red-600">Occupancy:</span>
                      <span className="font-medium text-red-800">{study.before.occupancy}</span>
                    </div>
                    <p className="text-red-600 text-xs mt-2">{study.before.issues}</p>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3">After</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-600">Yield:</span>
                      <span className="font-medium text-green-800">{study.after.yield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-600">Occupancy:</span>
                      <span className="font-medium text-green-800">{study.after.occupancy}</span>
                    </div>
                    <p className="text-green-600 text-xs mt-2 font-medium">{study.after.improvement}</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center text-sm text-slate-800 mb-3">
                  <span>Timeline: <strong>{study.timeline}</strong></span>
                </div>
                <p className="text-sm text-slate-700 mb-4">
                  <strong>Key action:</strong> {study.keyAction}
                </p>
                
                <button
                  onClick={() => {
                    setSelectedCaseStudy(study)
                    setIsCaseStudyModalOpen(true)
                  }}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center transition-colors"
                >
                  Download full case study
                  <ArrowRightIcon className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-slate-800 mb-6">
            Want to see how we could optimize your portfolio?
          </p>
          <button 
            onClick={() => setIsConsultationModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift whitespace-nowrap"
          >
            Request portfolio analysis
          </button>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Portfolio Analysis"
      />

      {/* Case Study Detail Modal */}
      {isCaseStudyModalOpen && selectedCaseStudy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsCaseStudyModalOpen(false)}></div>
            <div className="relative bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{selectedCaseStudy.title}</h3>
                <button
                  onClick={() => setIsCaseStudyModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                {/* Before */}
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Before Our Intervention</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-red-700">Net Yield:</span>
                      <div className="text-2xl font-bold text-red-800">{selectedCaseStudy.before.yield}</div>
                    </div>
                    <div>
                      <span className="text-sm text-red-700">Occupancy Rate:</span>
                      <div className="text-lg font-semibold text-red-800">{selectedCaseStudy.before.occupancy}</div>
                    </div>
                    <div>
                      <span className="text-sm text-red-700">Main Issues:</span>
                      <div className="text-sm text-red-700">{selectedCaseStudy.before.issues}</div>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 mb-4">After Optimization</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-green-700">Net Yield:</span>
                      <div className="text-2xl font-bold text-green-800">{selectedCaseStudy.after.yield}</div>
                    </div>
                    <div>
                      <span className="text-sm text-green-700">Occupancy Rate:</span>
                      <div className="text-lg font-semibold text-green-800">{selectedCaseStudy.after.occupancy}</div>
                    </div>
                    <div>
                      <span className="text-sm text-green-700">Improvement:</span>
                      <div className="text-lg font-bold text-green-800">{selectedCaseStudy.after.improvement}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="mt-8 space-y-6">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Timeline</h4>
                  <p className="text-slate-700">{selectedCaseStudy.timeline}</p>
                </div>
                
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Key Strategy</h4>
                  <p className="text-slate-700">{selectedCaseStudy.keyAction}</p>
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Detailed Analysis</h4>
                  <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-700">
                    <p className="mb-3">
                      This case study demonstrates our systematic approach to yield optimization through:
                    </p>
                    <ul className="space-y-1 ml-4">
                      <li>• Market analysis and positioning strategy</li>
                      <li>• Targeted property improvements and renovations</li>
                      <li>• Optimized pricing and tenant acquisition</li>
                      <li>• Ongoing performance monitoring and adjustments</li>
                    </ul>
                    <p className="mt-3 text-xs text-slate-600">
                      Results shown are specific to this property and market conditions. Individual results may vary.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8 pt-6 border-t border-slate-200">
                <button 
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex-1"
                >
                  Get Similar Analysis for My Property
                </button>
                <button 
                  onClick={() => {
                    // Simulate PDF download
                    alert('Full case study PDF will be sent to your email.')
                  }}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold flex-1"
                >
                  Download PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
