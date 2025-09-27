'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { MagnifyingGlassIcon, CursorArrowRaysIcon, ChartBarIcon } from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface Step {
  number: string
  title: string
  description: string
  icon: React.ComponentType<{ className?: string }>
}

export default function HowItWorks() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const steps: Step[] = [
    {
      number: '01',
      title: 'Diagnose',
      description: 'We analyze your goals, risk tolerance, and market conditions to identify the optimal investment strategy.',
      icon: MagnifyingGlassIcon
    },
    {
      number: '02',
      title: 'Select',
      description: 'Access curated opportunities with transparent economics, realistic yields, and verified comparables.',
      icon: CursorArrowRaysIcon
    },
    {
      number: '03',
      title: 'Execute & Monitor',
      description: 'One-window execution from offer to handover, with ongoing performance tracking and optimization.',
      icon: ChartBarIcon
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
            How it works
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Three steps from insight to execution, with clear numbers at every stage.
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Connection Line (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-transparent transform translate-x-6 z-0" />
                )}
                
                <div className="relative z-10 text-center">
                  {/* Step Number */}
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full text-xl font-bold mb-6">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="p-4 bg-blue-50 rounded-xl">
                      <step.icon className="w-8 h-8 text-blue-600" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <button 
            onClick={() => setIsConsultationModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift whitespace-nowrap"
          >
            Start your diagnosis
          </button>
        </motion.div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="Property Diagnosis"
      />
    </section>
  )
}
