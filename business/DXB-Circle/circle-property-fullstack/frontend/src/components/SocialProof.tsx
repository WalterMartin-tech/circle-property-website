'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckBadgeIcon, StarIcon } from '@heroicons/react/24/solid'
import ConsultationModal from './ConsultationModal'

interface Reference {
  initials: string
  role: string
  company: string
  quote: string
  verified: boolean
  rating: number
}

export default function SocialProof() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const references: Reference[] = [
    {
      initials: 'M.A.',
      role: 'Family Office Principal',
      company: 'UAE-based HNWI',
      quote: 'Finally, someone who shows the real numbers upfront. No surprises, no hidden fees. Our Dubai portfolio is performing exactly as projected.',
      verified: true,
      rating: 5
    },
    {
      initials: 'R.K.',
      role: 'Investment Manager',
      company: 'European Fund',
      quote: 'The level of due diligence and ongoing reporting is institutional-grade. We\'ve expanded our Dubai allocation based on their recommendations.',
      verified: true,
      rating: 5
    },
    {
      initials: 'S.P.',
      role: 'Property Developer',
      company: 'London-based',
      quote: 'Their market intelligence helped us time our entry perfectly. The STR optimization delivered 40% above our initial yield projections.',
      verified: true,
      rating: 5
    }
  ]

  const stats = [
    { label: 'Client Retention Rate', value: '94%' },
    { label: 'Average Yield Improvement', value: '+2.3%' },
    { label: 'Properties Under Management', value: '180+' },
    { label: 'Total AUM', value: 'AED 420M' }
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
            Trusted by serious investors
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Verifiable references from clients who value discretion and results.
          </p>
        </motion.div>

        {/* Client Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-700 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Client References */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {references.map((reference, index) => (
            <motion.div
              key={reference.initials}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6 relative"
            >
              {/* Quote */}
              <div className="mb-6">
                <div className="flex mb-3">
                  {[...Array(reference.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-slate-700 italic leading-relaxed">
                  "{reference.quote}"
                </blockquote>
              </div>

              {/* Attribution */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                    {reference.initials}
                  </div>
                  <div>
                    <div className="font-medium text-slate-900">
                      {reference.role}
                    </div>
                    <div className="text-sm text-slate-600">
                      {reference.company}
                    </div>
                  </div>
                </div>
                
                {reference.verified && (
                  <div className="flex items-center text-green-600">
                    <CheckBadgeIcon className="w-5 h-5 mr-1" />
                    <span className="text-xs font-medium">Verified</span>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Verification Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-slate-700 mb-6">
            All references are from actual clients and have been verified. 
            Full contact details available upon request for qualified prospects.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift whitespace-nowrap"
            >
              Request reference contacts
            </button>
            <button 
              onClick={() => window.location.href = '/case-studies'}
              className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all hover-lift whitespace-nowrap"
            >
              View case studies
            </button>
          </div>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Reference Verification"
      />
    </section>
  )
}
