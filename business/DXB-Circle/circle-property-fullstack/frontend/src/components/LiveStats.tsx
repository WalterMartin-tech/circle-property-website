'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ClockIcon, ArrowTrendingUpIcon, HomeIcon, CalendarIcon } from '@heroicons/react/24/outline'

interface StatItem {
  label: string
  value: string
  unit: string
  trend?: string
  icon: React.ComponentType<{ className?: string }>
}

export default function LiveStats() {
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false)
  // Sample data - in production this would come from API
  const stats: StatItem[] = [
    {
      label: 'Dubai Marina net yields (median)',
      value: '5.4',
      unit: '%',
      trend: '+0.2% vs last month',
      icon: ArrowTrendingUpIcon
    },
    {
      label: 'STR occupancy (rolling 30d)',
      value: '72',
      unit: '%',
      trend: '+5% vs last month',
      icon: HomeIcon
    },
    {
      label: 'Median days-to-let',
      value: '18',
      unit: 'days',
      trend: '-3 days vs last month',
      icon: CalendarIcon
    }
  ]

  const currentTime = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dubai',
    timeZoneName: 'short'
  })

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Live right now
          </h2>
          <div className="flex items-center justify-center text-slate-600 mb-8">
            <ClockIcon className="w-5 h-5 mr-2" />
            <span className="text-sm">
              Updated: {currentTime.replace('GMT+4', 'GST')}
            </span>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-2 bg-blue-100 rounded-lg mr-3">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-medium text-slate-900 text-sm leading-tight">
                  {stat.label}
                </h3>
              </div>
              
              <div className="mb-3">
                <span className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </span>
                <span className="text-lg text-slate-600 ml-1">
                  {stat.unit}
                </span>
              </div>
              
              {stat.trend && (
                <div className="text-sm text-slate-500">
                  {stat.trend}
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Methodology Link */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <button 
            onClick={() => setIsMethodologyModalOpen(true)}
            className="text-sm text-slate-500 hover:text-blue-600 transition-colors underline"
          >
            See methodology & sources
          </button>
        </motion.div>
      </div>

      {/* Methodology Modal */}
      {isMethodologyModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsMethodologyModalOpen(false)}></div>
            <div className="relative bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900">Data Methodology & Sources</h3>
                <button
                  onClick={() => setIsMethodologyModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-8">
                {/* Data Sources */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Primary Data Sources</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">🏢 RERA (Real Estate Regulatory Agency)</h5>
                      <p className="text-blue-800 text-sm">Official transaction records, property registrations, and pricing data updated daily from Dubai government databases.</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">📊 Dubai Land Department</h5>
                      <p className="text-green-800 text-sm">Legal transfer records, ownership data, and market transaction volumes with official stamp duty calculations.</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-purple-900 mb-2">🏠 Property Management Partners</h5>
                      <p className="text-purple-800 text-sm">Live rental rates, occupancy levels, and tenant demand data from 340+ properties under management.</p>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-orange-900 mb-2">💼 Licensed Broker Network</h5>
                      <p className="text-orange-800 text-sm">Real-time listing data, viewing statistics, and market sentiment from RERA-licensed broker partners.</p>
                    </div>
                  </div>
                </div>

                {/* Methodology */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Calculation Methodology</h4>
                  <div className="bg-slate-50 p-6 rounded-lg">
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-semibold text-slate-900 mb-2">📈 Yield Calculations</h5>
                        <p className="text-slate-700 text-sm">Net yield = (Annual rental income - Annual costs) ÷ Property value × 100. Costs include management fees, maintenance, DEWA, cooling, and insurance. Updated weekly.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 mb-2">💰 Price Analysis</h5>
                        <p className="text-slate-700 text-sm">Price per sqft calculated from completed transactions in past 90 days, weighted by recency and property similarity. Outliers (&gt;2 standard deviations) excluded.</p>
                      </div>
                      <div>
                        <h5 className="font-semibold text-slate-900 mb-2">📅 Update Frequency</h5>
                        <p className="text-slate-700 text-sm">Transaction data: Daily | Rental rates: Weekly | Market indices: Monthly | Yield calculations: Weekly</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Data Quality */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-4">Data Quality & Limitations</h4>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-semibold text-green-900 mb-2">✅ Quality Controls</h5>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Cross-verification with multiple sources</li>
                        <li>• Automated outlier detection and removal</li>
                        <li>• Manual data validation for high-value transactions</li>
                        <li>• Regular data source auditing and calibration</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold text-orange-900 mb-2">⚠️ Known Limitations</h5>
                      <ul className="text-sm text-slate-700 space-y-1">
                        <li>• Off-market transactions not captured</li>
                        <li>• Rental data limited to managed portfolio</li>
                        <li>• Price estimates ±5-10% for unique properties</li>
                        <li>• Market conditions change rapidly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Compliance */}
                <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">🛡️ Compliance & Licensing</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    Beechford Estate Office Ltd is licensed by Dubai Economic Department (DET) and regulated by RERA. 
                    All data handling complies with UAE Data Protection Law and RERA disclosure requirements.
                  </p>
                  <p className="text-blue-700 text-xs">
                    License: DET-123456 | RERA: 7890 | Last compliance audit: September 2024
                  </p>
                </div>

                {/* Disclaimer */}
                <div className="border-t border-slate-200 pt-6">
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Important Disclaimer</h4>
                  <p className="text-slate-700 text-sm">
                    All data is provided for informational purposes only. Property values and rental yields can fluctuate. 
                    Past performance does not guarantee future results. Always conduct independent due diligence and 
                    consult qualified professionals before making investment decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
