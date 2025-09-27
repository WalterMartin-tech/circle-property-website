'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationModal from './ConsultationModal'

export default function CaseStudyDetail() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl p-8 border border-slate-200"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Get Full Case Study Details
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">What's Included</h3>
            <ul className="space-y-2 text-slate-600">
              <li>• Complete financial analysis and assumptions</li>
              <li>• Step-by-step acquisition process</li>
              <li>• Renovation timeline and cost breakdown</li>
              <li>• Tenant sourcing and management strategy</li>
              <li>• Performance monitoring and optimization</li>
              <li>• Key lessons learned and pitfalls avoided</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 mb-4">Verification</h3>
            <ul className="space-y-2 text-slate-600">
              <li>• All numbers verified by independent audit</li>
              <li>• Client permission obtained for publication</li>
              <li>• Market data cross-referenced with DLD</li>
              <li>• Financial statements available for review</li>
              <li>• Reference contacts provided (with consent)</li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-8">
          <button 
            onClick={() => setIsConsultationModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
          >
            Download complete case studies
          </button>
          <p className="text-sm text-slate-500 mt-3">
            Email required. Used for case study delivery only.
          </p>
        </div>
      </motion.div>

      {/* Consultation Modal for Case Study Downloads */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Case Study Download Request"
      />
    </section>
  )
}
