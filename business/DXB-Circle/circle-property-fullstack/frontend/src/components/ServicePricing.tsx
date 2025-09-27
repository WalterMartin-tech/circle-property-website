'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ConsultationModal from './ConsultationModal'

export default function ServicePricing() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-slate-50 rounded-xl p-8 border border-slate-200"
      >
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
          Transparent Pricing
        </h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">What's Included</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• No hidden fees or surprise charges</li>
                <li>• All costs disclosed upfront</li>
                <li>• Fixed pricing regardless of property value</li>
                <li>• Money-back guarantee if unsatisfied</li>
                <li>• Transparent third-party cost breakdown</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 mb-4">Payment Terms</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• 50% on engagement, 50% on completion</li>
                <li>• No payment until property identified</li>
                <li>• Milestone-based billing for renovations</li>
                <li>• Net 30 payment terms</li>
                <li>• Multiple payment methods accepted</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
            >
              Get detailed pricing quote
            </button>
          </div>
        </div>
      </motion.div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Detailed Pricing Quote Request"
      />
    </section>
  )
}
