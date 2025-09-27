'use client'

import { useState } from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function CredibilityStrip() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<any>(null)
  const [isCaseStudyModalOpen, setIsCaseStudyModalOpen] = useState(false)
  const caseStudies = [
    {
      project: 'Burj Vista Tower',
      metric: '+18% net yield',
      timeframe: '9 months',
      change: 'OTA mix optimization + strategic refurbs',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop&crop=center',
      details: {
        location: 'Downtown Dubai',
        propertyType: '2BR Premium Apartment',
        beforeYield: '4.2%',
        afterYield: '5.8%',
        beforeOccupancy: '72%',
        afterOccupancy: '95%',
        keyActions: [
          'Implemented dynamic pricing algorithm',
          'Enhanced apartment furnishing and amenities',
          'Optimized short-term rental mix (60% STR, 40% LTR)',
          'Upgraded property management systems'
        ],
        investment: 'AED 150,000 renovation + management fee',
        results: 'AED 48,000 additional annual income'
      }
    },
    {
      project: 'Marina Gate',
      metric: '23% vacancy reduction',
      timeframe: '6 months',
      change: 'Pricing algorithm + tenant screening',
      image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=300&fit=crop&crop=center',
      details: {
        location: 'Dubai Marina',
        propertyType: '1BR Modern Apartment',
        beforeYield: '5.1%',
        afterYield: '6.4%',
        beforeOccupancy: '68%',
        afterOccupancy: '91%',
        keyActions: [
          'Implemented advanced tenant screening process',
          'Market-based dynamic pricing strategy',
          'Enhanced marketing and listing optimization',
          'Reduced average vacancy period from 45 to 12 days'
        ],
        investment: 'AED 25,000 marketing + screening setup',
        results: 'AED 28,000 additional annual income'
      }
    },
    {
      project: 'DIFC Gateway',
      metric: 'AED 2.1M additional NOI',
      timeframe: '12 months',
      change: 'Hybrid model implementation',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center',
      details: {
        location: 'Dubai International Financial Centre',
        propertyType: 'Commercial Office Space',
        beforeYield: '6.8%',
        afterYield: '9.2%',
        beforeOccupancy: '85%',
        afterOccupancy: '98%',
        keyActions: [
          'Implemented flexible workspace solutions',
          'Negotiated premium corporate tenancy agreements',
          'Enhanced building amenities and services',
          'Optimized space utilization and rental rates'
        ],
        investment: 'AED 800,000 renovation + setup costs',
        results: 'AED 2.1M additional annual NOI'
      }
    }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Real Results, Named Projects
          </h2>
          <p className="text-lg text-slate-800">
            Case studies with actual metrics and transparent methodologies
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.project}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover-lift overflow-hidden border border-slate-200"
            >
              {/* Project Image */}
              <div className="h-48 relative overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                <img 
                  src={study.image} 
                  alt={study.project}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-sm font-medium">{study.project}</div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-2xl font-bold text-blue-600 mb-1">
                    {study.metric}
                  </div>
                  <div className="text-sm text-slate-900">
                    in {study.timeframe}
                  </div>
                </div>

                <p className="text-slate-700 mb-6">
                  <span className="font-medium">What changed:</span> {study.change}
                </p>

                <button 
                  onClick={() => {
                    setSelectedCaseStudy(study)
                    setIsCaseStudyModalOpen(true)
                  }}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium group-hover:translate-x-1 transition-transform"
                >
                  <span className="text-slate-900">View full case study</span>
                  <ArrowTopRightOnSquareIcon className="w-4 h-4 text-blue-600" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Trust Signals */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">AED 127M+</div>
              <div className="text-sm text-slate-800">Assets under management</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">340+</div>
              <div className="text-sm text-slate-800">Properties optimized</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">94%</div>
              <div className="text-sm text-slate-800">Client retention rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900">4.8/5</div>
              <div className="text-sm text-slate-800">Average satisfaction</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Case Study Detail Modal */}
      {isCaseStudyModalOpen && selectedCaseStudy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsCaseStudyModalOpen(false)}></div>
            <div className="relative bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCaseStudy.project}</h3>
                  <p className="text-lg text-slate-800">{selectedCaseStudy.details.location} • {selectedCaseStudy.details.propertyType}</p>
                </div>
                <button
                  onClick={() => setIsCaseStudyModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              {/* Key Results */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-red-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-red-900 mb-4">Before Optimization</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-red-700">Net Yield:</span>
                      <div className="text-2xl font-bold text-red-800">{selectedCaseStudy.details.beforeYield}</div>
                    </div>
                    <div>
                      <span className="text-sm text-red-700">Occupancy Rate:</span>
                      <div className="text-lg font-semibold text-red-800">{selectedCaseStudy.details.beforeOccupancy}</div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold text-green-900 mb-4">After Optimization</h4>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm text-green-700">Net Yield:</span>
                      <div className="text-2xl font-bold text-green-800">{selectedCaseStudy.details.afterYield}</div>
                    </div>
                    <div>
                      <span className="text-sm text-green-700">Occupancy Rate:</span>
                      <div className="text-lg font-semibold text-green-800">{selectedCaseStudy.details.afterOccupancy}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Investment & Results */}
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Investment Required</h4>
                  <p className="text-slate-700 bg-slate-50 p-4 rounded-lg">{selectedCaseStudy.details.investment}</p>
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-3">Financial Impact</h4>
                  <p className="text-green-700 bg-green-50 p-4 rounded-lg font-semibold">{selectedCaseStudy.details.results}</p>
                </div>
              </div>

              {/* Key Actions */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Implementation Strategy</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {selectedCaseStudy.details.keyActions.map((action: string, index: number) => (
                    <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                      <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </span>
                      <span className="text-slate-700">{action}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-slate-900 mb-3">Project Timeline</h4>
                <div className="bg-slate-50 p-4 rounded-lg">
                  <span className="text-slate-700">
                    <strong>Duration:</strong> {selectedCaseStudy.timeframe} from initial assessment to full implementation
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-slate-200">
                <button 
                  onClick={() => alert('Consultation booking functionality to be implemented')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex-1"
                >
                  Get Similar Analysis for My Property
                </button>
                <button 
                  onClick={() => alert('PDF download functionality to be implemented')}
                  className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold flex-1"
                >
                  Download Full Case Study PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
