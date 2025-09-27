'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  UserGroupIcon, 
  ComputerDesktopIcon, 
  AcademicCapIcon,
  ClockIcon,
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface ServiceModel {
  id: string
  name: string
  description: string
  ideal: string
  icon: React.ComponentType<{ className?: string }>
  features: string[]
  commitment: string
}

export default function ServiceOverview() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [selectedServiceType, setSelectedServiceType] = useState('')
  const serviceModels: ServiceModel[] = [
    {
      id: 'high-touch',
      name: 'High-Touch Concierge',
      description: 'Full-service property acquisition and management with dedicated relationship manager.',
      ideal: 'Busy professionals, family offices, international investors',
      icon: UserGroupIcon,
      features: [
        'Dedicated relationship manager',
        'Concierge acquisition service',
        'End-to-end project management',
        'White-glove handover process',
        'Ongoing portfolio optimization',
        'Priority access to opportunities'
      ],
      commitment: 'Response within 2 hours, viewings within 48 hours'
    },
    {
      id: 'online',
      name: 'Online Platform',
      description: 'Self-service portal with digital tools, e-signatures, and automated workflows.',
      ideal: 'Tech-savvy investors, cost-conscious buyers, repeat clients',
      icon: ComputerDesktopIcon,
      features: [
        'Online property discovery',
        'Digital due diligence tools',
        'E-signature workflows',
        'Real-time project tracking',
        'Automated reporting',
        'Community marketplace'
      ],
      commitment: 'Platform availability 99.5%, ticket response within 24 hours'
    },
    {
      id: 'consultancy',
      name: 'Bespoke Consultancy',
      description: 'Custom analysis, strategy development, and advisory services for complex situations.',
      ideal: 'Institutional investors, complex structures, strategic advisory needs',
      icon: AcademicCapIcon,
      features: [
        'Custom market analysis',
        'Investment strategy development',
        'Structure optimization',
        'Risk assessment reports',
        'Regulatory guidance',
        'Expert witness services'
      ],
      commitment: 'Proposal within 5 business days, defined project timelines'
    }
  ]

  const overallCommitments = [
    {
      icon: ClockIcon,
      title: 'Response Times',
      description: 'High-touch: 2 hours | Online: 24 hours | Consultancy: 5 business days'
    },
    {
      icon: CheckCircleIcon,
      title: 'Quality Standards',
      description: 'All recommendations backed by data, transparent assumptions, documented methodology'
    },
    {
      icon: DocumentTextIcon,
      title: 'Documentation',
      description: 'Complete audit trail, digital records, regular reporting, compliance documentation'
    }
  ]

  return (
    <section className="mb-16">
      {/* Service Models */}
      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        {serviceModels.map((model, index) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full"
          >
            {/* Icon & Title */}
            <div className="flex items-center mb-4">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <model.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">{model.name}</h3>
            </div>

            {/* Description */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 mb-6">
              <p className="text-slate-700 leading-relaxed font-medium">
                {model.description}
              </p>
            </div>

            {/* Ideal For */}
            <div className="mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3">
                🎯 Perfect for
              </div>
              <p className="text-slate-700 leading-relaxed">{model.ideal}</p>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h4 className="text-base font-semibold text-slate-900 mb-3 flex items-center">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                What's Included
              </h4>
              <ul className="space-y-2">
                {model.features.map((feature, i) => (
                  <li key={i} className="text-slate-700 flex items-start">
                    <CheckCircleIcon className="w-5 h-5 text-green-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Commitment */}
            <div className="bg-slate-50 border-l-4 border-blue-600 rounded-r-lg p-4">
              <div className="flex items-center mb-2">
                <ClockIcon className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-base font-semibold text-slate-900">Service Commitment</span>
              </div>
              <p className="text-slate-700 leading-relaxed">{model.commitment}</p>
            </div>

            {/* Spacer to push button to bottom */}
            <div className="flex-1"></div>

            {/* CTA */}
            <button 
              onClick={() => {
                setSelectedServiceType(model.name)
                setIsConsultationModalOpen(true)
              }}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all hover-lift"
            >
              Learn more about {model.name.toLowerCase()}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Overall Commitments */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl p-8 border border-slate-200"
      >
        <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">
          Our Service Commitments
        </h3>
        
        <div className="grid md:grid-cols-3 gap-6">
          {overallCommitments.map((commitment, index) => (
            <div key={commitment.title} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                <commitment.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-slate-900 mb-2">{commitment.title}</h4>
              <p className="text-slate-700 text-sm leading-relaxed">
                {commitment.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType={selectedServiceType ? `${selectedServiceType} Information Request` : 'Service Information Request'}
      />
    </section>
  )
}
