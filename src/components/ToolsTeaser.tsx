'use client'

import { motion } from 'framer-motion'
import { CalculatorIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { formatNumber, formatCurrency } from '@/utils/formatters'
import ConsultationModal from './ConsultationModal'

export default function ToolsTeaser() {
  const [activeCalculator, setActiveCalculator] = useState<'yield' | 'tco' | null>(null)
  const [isMethodologyModalOpen, setIsMethodologyModalOpen] = useState(false)

  // Simple yield calculator
  const [yieldInputs, setYieldInputs] = useState({
    price: '2800000',
    rent: '18000',
    fees: '7'
  })

  // Simple TCO calculator  
  const [tcoInputs, setTcoInputs] = useState({
    price: '2800000',
    closing: '4',
    furnishing: '85000',
    annual: '22000'
  })

  const calculateYield = () => {
    const price = parseFloat(yieldInputs.price)
    const rent = parseFloat(yieldInputs.rent)
    const fees = parseFloat(yieldInputs.fees)
    
    if (!price || !rent) return null
    
    const annualRent = rent * 12
    const totalCosts = price * (fees / 100)
    const netYield = ((annualRent - totalCosts) / price) * 100
    
    return netYield.toFixed(1)
  }

  const calculateTCO = () => {
    const price = parseFloat(tcoInputs.price)
    const closing = parseFloat(tcoInputs.closing)
    const furnishing = parseFloat(tcoInputs.furnishing)
    const annual = parseFloat(tcoInputs.annual)
    
    if (!price) return null
    
    const closingCosts = price * (closing / 100)
    const totalFirstYear = price + closingCosts + furnishing + annual
    
    return formatNumber(Math.round(totalFirstYear))
  }

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Tools & Calculators
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get immediate insights with our no-gate calculators. Real numbers, transparent assumptions.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Yield Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm border border-slate-200"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-blue-100 rounded-lg mr-4">
                <CalculatorIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Yield Calculator</h3>
                <p className="text-slate-600 text-sm">Calculate realistic net yields with fees</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Price (AED)
                </label>
                  <input
                  type="text"
                  value={yieldInputs.price ? formatNumber(parseFloat(yieldInputs.price)) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(value)) || value === '') {
                      setYieldInputs({...yieldInputs, price: value})
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="1,500,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Monthly Rent (AED)
                </label>
                <input
                  type="text"
                  value={yieldInputs.rent ? formatNumber(parseFloat(yieldInputs.rent)) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(value)) || value === '') {
                      setYieldInputs({...yieldInputs, rent: value})
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="18,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Costs (% of price)
                </label>
                <input
                  type="number"
                  value={yieldInputs.fees}
                  onChange={(e) => setYieldInputs({...yieldInputs, fees: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="7"
                />
              </div>

              {calculateYield() && (
                <div className="bg-blue-50 rounded-lg p-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {calculateYield()}%
                    </div>
                    <div className="text-sm text-blue-700">Net Yield</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>

          {/* TCO Calculator */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 shadow-sm border border-slate-200"
          >
            <div className="flex items-center mb-6">
              <div className="p-3 bg-green-100 rounded-lg mr-4">
                <CurrencyDollarIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">TCO Calculator</h3>
                <p className="text-slate-600 text-sm">Total cost of ownership (first year)</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Property Price (AED)
                </label>
                <input
                  type="text"
                  value={tcoInputs.price ? formatNumber(parseFloat(tcoInputs.price)) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(value)) || value === '') {
                      setTcoInputs({...tcoInputs, price: value})
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="2,800,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Closing Costs (% of price)
                </label>
                <input
                  type="number"
                  value={tcoInputs.closing}
                  onChange={(e) => setTcoInputs({...tcoInputs, closing: e.target.value})}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="4"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Furnishing (AED)
                </label>
                <input
                  type="text"
                  value={tcoInputs.furnishing ? formatNumber(parseFloat(tcoInputs.furnishing)) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(value)) || value === '') {
                      setTcoInputs({...tcoInputs, furnishing: value})
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="85,000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Annual Costs (AED)
                </label>
                <input
                  type="text"
                  value={tcoInputs.annual ? formatNumber(parseFloat(tcoInputs.annual)) : ''}
                  onChange={(e) => {
                    const value = e.target.value.replace(/,/g, '')
                    if (!isNaN(Number(value)) || value === '') {
                      setTcoInputs({...tcoInputs, annual: value})
                    }
                  }}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="22,000"
                />
              </div>

              {calculateTCO() && (
                <div className="bg-green-50 rounded-lg p-4 mt-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {calculateTCO()}
                    </div>
                    <div className="text-sm text-green-700">AED (First Year)</div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Save Results CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-slate-600 mb-4">
            Want to save these results and get a detailed analysis?
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift whitespace-nowrap">
            Save & email me the results
          </button>
        </motion.div>

        {/* Methodology Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-xs text-slate-500">
            All figures shown are estimates based on disclosed assumptions and third-party sources. 
            No returns are guaranteed. <button 
              onClick={() => setIsMethodologyModalOpen(true)}
              className="underline hover:text-blue-600"
            >
              See methodology
            </button>.
          </p>
        </motion.div>
      </div>

      {/* Methodology Modal */}
      <ConsultationModal
        isOpen={isMethodologyModalOpen}
        onClose={() => setIsMethodologyModalOpen(false)}
        consultationType="Methodology & Data Sources"
      />
    </section>
  )
}
