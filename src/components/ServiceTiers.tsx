'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon } from '@heroicons/react/24/outline'
import PaymentModal from './PaymentModal'
import ConsultationModal from './ConsultationModal'

export default function ServiceTiers() {
  const [selectedTier, setSelectedTier] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const tiers = [
    {
      name: 'Essential',
      price: 'AED 15,000',
      period: 'per transaction',
      description: 'Core acquisition support with digital tools and basic protection',
      features: [
        'Property search & market analysis',
        'Due diligence & documentation',
        'Legal coordination & RERA compliance',
        'Basic handover inspection',
        'Digital property file management',
        '3-month post-completion warranty',
        'Email support (48h response)',
        'Standard purchase agreement review'
      ],
      popular: false
    },
    {
      name: 'Plus',
      price: 'AED 35,000',
      period: 'per transaction',
      description: 'Enhanced service with dedicated support and ongoing management',
      features: [
        'Everything in Essential tier',
        'Dedicated relationship manager',
        'Priority property access & viewings',
        'Comprehensive renovation oversight',
        'Professional tenant placement',
        'Rental yield optimization advice',
        'Quarterly performance reports',
        '12-month comprehensive warranty',
        'Phone support (24h response)',
        'Dispute resolution assistance',
        'Property insurance coordination',
        'Maintenance vendor management'
      ],
      popular: true
    },
    {
      name: 'Private Office',
      price: 'From AED 150,000',
      period: 'annual retainer',
      description: 'White-glove wealth management with institutional-grade service',
      features: [
        'Everything in Plus tier',
        'Dedicated portfolio strategist',
        'Annual portfolio strategy review',
        'Tax optimization consulting',
        'Estate planning coordination',
        'Family office integration',
        'Exclusive off-market opportunities',
        'Advanced conflict resolution',
        'Legal representation coordination',
        'Multi-jurisdictional compliance',
        'Unlimited warranty protection',
        '24/7 concierge services',
        'Direct senior partner access',
        'Custom reporting & analytics',
        'Investment committee access',
        'Wealth preservation planning'
      ],
      popular: false
    }
  ]

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Service Tiers</h2>
        <p className="text-slate-700 max-w-2xl mx-auto">
          Choose the level of service that matches your needs and investment approach.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {tiers.map((tier, index) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className={`bg-white rounded-xl p-6 border-2 transition-all flex flex-col h-full ${
              tier.popular ? 'border-blue-200 relative' : 'border-slate-200'
            }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{tier.name}</h3>
              <div className="text-3xl font-bold text-slate-900 mb-1">{tier.price}</div>
              <div className="text-slate-500 text-sm">{tier.period}</div>
              <p className="text-slate-700 mt-3">{tier.description}</p>
            </div>

            <ul className="space-y-3 mb-8">
              {tier.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex-1"></div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedTier(tier)
                  if (tier.name === 'Private Office') {
                    setIsConsultationModalOpen(true)
                  } else {
                    setIsPaymentModalOpen(true)
                  }
                }}
                className={`w-full py-3 rounded-lg font-medium transition-all hover-lift ${
                  tier.popular
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {tier.name === 'Private Office' ? 'Contact Sales' : `Purchase ${tier.name}`}
              </button>
              {tier.name !== 'Private Office' && (
                <p className="text-xs text-slate-500 text-center">
                  Secure payment • Multiple options available
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Payment Modal */}
      {selectedTier && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false)
            setSelectedTier(null)
          }}
          serviceTier={selectedTier}
        />
      )}

      {/* Consultation Modal for Private Office tier */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => {
          setIsConsultationModalOpen(false)
          setSelectedTier(null)
        }}
        consultationType={selectedTier ? `${selectedTier.name} Service Consultation` : 'Private Office Service Consultation'}
      />
    </section>
  )
}
