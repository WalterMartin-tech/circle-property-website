'use client'

import { motion } from 'framer-motion'
import { DocumentTextIcon, GlobeAltIcon, BuildingOfficeIcon, ChartBarIcon } from '@heroicons/react/24/outline'

interface DataSource {
  name: string
  type: 'Government' | 'Commercial' | 'Proprietary' | 'Industry'
  description: string
  updateFrequency: string
  reliability: 'High' | 'Medium' | 'Low'
  icon: React.ComponentType<{ className?: string }>
  coverage: string
}

export default function DataSources() {
  const dataSources: DataSource[] = [
    {
      name: 'Dubai Land Department (DLD)',
      type: 'Government',
      description: 'Official property transaction records, prices, and ownership data',
      updateFrequency: 'Daily',
      reliability: 'High',
      icon: BuildingOfficeIcon,
      coverage: 'All Dubai property transactions'
    },
    {
      name: 'RERA Database',
      type: 'Government', 
      description: 'Real Estate Regulatory Agency listings, rental data, and market reports',
      updateFrequency: 'Daily',
      reliability: 'High',
      icon: DocumentTextIcon,
      coverage: 'Licensed properties and agents'
    },
    {
      name: 'Property Finder API',
      type: 'Commercial',
      description: 'Real-time property listings, rental prices, and market analytics',
      updateFrequency: 'Hourly',
      reliability: 'High',
      icon: GlobeAltIcon,
      coverage: '80%+ of active listings'
    },
    {
      name: 'Dubizzle Analytics',
      type: 'Commercial',
      description: 'Property search trends, inquiry data, and market velocity metrics',
      updateFrequency: 'Daily',
      reliability: 'Medium',
      icon: ChartBarIcon,
      coverage: 'Major listing platform data'
    },
    {
      name: 'Ejari Database',
      type: 'Government',
      description: 'Official tenancy contracts, rental rates, and lease duration data',
      updateFrequency: 'Weekly',
      reliability: 'High',
      icon: DocumentTextIcon,
      coverage: 'All registered tenancy contracts'
    },
    {
      name: 'DEWA Connection Data',
      type: 'Government',
      description: 'Utility connections indicating actual occupancy and vacancy rates',
      updateFrequency: 'Monthly',
      reliability: 'High',
      icon: BuildingOfficeIcon,
      coverage: 'All properties with DEWA accounts'
    },
    {
      name: 'Circle Property Network',
      type: 'Proprietary',
      description: 'Direct broker relationships, off-market deals, and exclusive insights',
      updateFrequency: 'Real-time',
      reliability: 'High',
      icon: BuildingOfficeIcon,
      coverage: 'Premium and off-market segment'
    },
    {
      name: 'Property Management Systems',
      type: 'Industry',
      description: 'Rent collection data, maintenance costs, and operational metrics',
      updateFrequency: 'Monthly',
      reliability: 'Medium',
      icon: ChartBarIcon,
      coverage: 'Properties under professional management'
    }
  ]

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Government': return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Commercial': return 'bg-green-100 text-green-800 border-green-200'
      case 'Proprietary': return 'bg-purple-100 text-purple-800 border-purple-200'
      case 'Industry': return 'bg-orange-100 text-orange-800 border-orange-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getReliabilityColor = (reliability: string) => {
    switch (reliability) {
      case 'High': return 'text-green-600'
      case 'Medium': return 'text-yellow-600'
      case 'Low': return 'text-red-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Data Sources & Methodology
          </h2>
          <p className="text-slate-600 max-w-3xl mx-auto">
            Our market intelligence combines multiple verified data sources with proprietary analytics 
            to provide accurate, up-to-date market insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {dataSources.map((source, index) => (
            <motion.div
              key={source.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-xl p-6 border border-slate-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-white rounded-lg">
                  <source.icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex flex-col gap-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getTypeColor(source.type)}`}>
                    {source.type}
                  </span>
                  <span className={`text-xs font-medium ${getReliabilityColor(source.reliability)}`}>
                    {source.reliability} Reliability
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-slate-900 mb-2">{source.name}</h3>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                {source.description}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-500">Update Frequency:</span>
                  <span className="font-medium text-slate-700">{source.updateFrequency}</span>
                </div>
                <div className="text-xs text-slate-500">
                  <span className="font-medium">Coverage:</span> {source.coverage}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Data Quality Standards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="bg-blue-50 rounded-xl p-8 border border-blue-200"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4">Data Quality Standards</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">Validation Process</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Cross-reference minimum 3 independent sources</li>
                <li>• Statistical outlier detection and filtering</li>
                <li>• Historical consistency checks</li>
                <li>• Manual verification for high-value transactions</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-blue-800 mb-3">Update Schedule</h4>
              <ul className="space-y-2 text-sm text-blue-700">
                <li>• Price data: Updated daily at 9:00 AM GST</li>
                <li>• Rental yields: Refreshed weekly</li>
                <li>• Market trends: Monthly comprehensive review</li>
                <li>• Emergency updates: Within 24 hours of major events</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-xs text-slate-500">
            <strong>Disclaimer:</strong> All data is provided for informational purposes only. 
            While we strive for accuracy, market conditions change rapidly. 
            Independent verification recommended for investment decisions.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
