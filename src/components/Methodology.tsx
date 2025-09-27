'use client'

import { motion } from 'framer-motion'
import { ChevronDownIcon, ChevronUpIcon, DocumentTextIcon, ShieldCheckIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

interface MethodologySection {
  title: string
  content: string
  sources: string[]
  updateFrequency: string
}

export default function Methodology() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const sections: MethodologySection[] = [
    {
      title: 'Price Data Collection',
      content: 'Property prices sourced from Dubai Land Department (DLD) transaction records, RERA listings, and verified broker networks. Data is cross-referenced against multiple sources and adjusted for property condition, location micro-factors, and market timing. Outliers are filtered using statistical analysis.',
      sources: ['Dubai Land Department', 'RERA Database', 'Verified Broker Network', 'Property Finder API'],
      updateFrequency: 'Daily'
    },
    {
      title: 'Yield Calculations',
      content: 'Net yields calculated using actual rental income minus all associated costs including service charges, maintenance, management fees, and estimated void periods. Gross yields provided for comparison but net yields recommended for investment decisions.',
      sources: ['Ejari Database', 'Property Management Companies', 'Service Charge Records', 'Historical Void Data'],
      updateFrequency: 'Weekly'
    },
    {
      title: 'Market Velocity Analysis',
      content: 'Days-to-let calculated from listing date to signed tenancy agreement. Data includes both direct landlord and agent-managed properties. Seasonal adjustments applied for Ramadan, summer months, and Expo periods.',
      sources: ['Dubizzle Analytics', 'Property Management Systems', 'Agent Networks', 'Landlord Surveys'],
      updateFrequency: 'Bi-weekly'
    },
    {
      title: 'Risk Assessment Framework',
      content: 'Void rates based on actual vacancy data, arrears calculated from payment default statistics. Risk factors weighted using economic indicators, supply pipeline data, and regulatory changes. Stress testing applied for various economic scenarios.',
      sources: ['DEWA Connection Data', 'Payment Processing Systems', 'Economic Indicators', 'Government Publications'],
      updateFrequency: 'Monthly'
    }
  ]

  const principles = [
    {
      icon: ShieldCheckIcon,
      title: 'No Guarantees',
      description: 'All performance figures are estimates. No returns are guaranteed. Past performance does not predict future results.'
    },
    {
      icon: DocumentTextIcon,
      title: 'Transparent Assumptions',
      description: 'All calculations show underlying assumptions. Methodology available for review. Sources disclosed and verifiable.'
    },
    {
      icon: ClockIcon,
      title: 'Regular Updates',
      description: 'Data refreshed according to stated frequencies. Market commentary updated monthly. Methodology reviewed quarterly.'
    }
  ]

  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl p-8 border border-slate-200"
    >
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-4">
          Methodology & Sources
        </h3>
        <p className="text-slate-600">
          Transparent, auditable data collection and analysis framework
        </p>
      </div>

      {/* Core Principles */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {principles.map((principle, index) => (
          <motion.div
            key={principle.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
              <principle.icon className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-slate-900 mb-2">{principle.title}</h4>
            <p className="text-sm text-slate-600 leading-relaxed">{principle.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Detailed Methodology Sections */}
      <div className="space-y-4">
        <h4 className="font-semibold text-slate-900 mb-4">Detailed Methodology</h4>
        {sections.map((section, index) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="border border-slate-200 rounded-lg"
          >
            <button
              onClick={() => toggleSection(section.title)}
              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center">
                <h5 className="font-medium text-slate-900">{section.title}</h5>
                <span className="ml-3 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  {section.updateFrequency}
                </span>
              </div>
              {expandedSection === section.title ? (
                <ChevronUpIcon className="w-5 h-5 text-slate-500" />
              ) : (
                <ChevronDownIcon className="w-5 h-5 text-slate-500" />
              )}
            </button>
            
            {expandedSection === section.title && (
              <div className="px-6 pb-4">
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {section.content}
                </p>
                <div>
                  <h6 className="font-medium text-slate-900 mb-2">Data Sources:</h6>
                  <ul className="list-disc list-inside space-y-1">
                    {section.sources.map((source, i) => (
                      <li key={i} className="text-sm text-slate-600">{source}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Contact for Detailed Methodology */}
      <div className="mt-8 p-6 bg-slate-50 rounded-lg border border-slate-200">
        <div className="text-center">
          <h4 className="font-semibold text-slate-900 mb-2">
            Need More Detail?
          </h4>
          <p className="text-slate-600 mb-4">
            Request our complete methodology document with statistical models, 
            data validation procedures, and quality control frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift">
              Download methodology PDF
            </button>
            <button className="border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all hover-lift">
              Schedule methodology review
            </button>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <p className="text-xs text-slate-500 text-center leading-relaxed">
          <strong>Disclaimer:</strong> All data is provided for informational purposes only. 
          Property investment carries risks including capital loss and void periods. 
          Past performance does not guarantee future results. 
          Independent financial advice recommended for investment decisions.
        </p>
      </div>
    </motion.div>
  )
}
