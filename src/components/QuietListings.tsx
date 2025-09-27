import { useState } from 'react'
import { EyeSlashIcon, DocumentTextIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuietListings() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    investorType: '',
    ticketSize: '',
    preferences: '',
    name: '',
    email: '',
    ndaAccepted: false
  })

  const handleNext = () => {
    if (step < 3) setStep(step + 1)
  }

  const handleSubmit = () => {
    // Simulate submission
    setStep(4)
  }

  return (
    <section className="py-16 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <EyeSlashIcon className="w-16 h-16 text-gold-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Quiet Listings Vault</h2>
            <p className="text-xl text-slate-300">
              Invite-only opportunities. NDA first, teasers second.
            </p>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((number) => (
                <div key={number} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= number ? 'bg-gold-500 text-white' : 'bg-slate-700 text-slate-600'
                  }`}>
                    {step > number ? <CheckCircleIcon className="w-5 h-5" /> : number}
                  </div>
                  {number < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > number ? 'bg-gold-500' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center mb-8">Investment Profile</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Investor Type
                      </label>
                      <select
                        value={formData.investorType}
                        onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      >
                        <option value="">Select type...</option>
                        <option value="hnwi">High Net Worth Individual</option>
                        <option value="family-office">Family Office</option>
                        <option value="fund">Investment Fund</option>
                        <option value="corporate">Corporate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Investment Ticket Size (AED)
                      </label>
                      <select
                        value={formData.ticketSize}
                        onChange={(e) => setFormData({...formData, ticketSize: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                      >
                        <option value="">Select range...</option>
                        <option value="1-5m">AED 1M - 5M</option>
                        <option value="5-15m">AED 5M - 15M</option>
                        <option value="15-50m">AED 15M - 50M</option>
                        <option value="50m+">AED 50M+</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Asset Preferences
                      </label>
                      <textarea
                        value={formData.preferences}
                        onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                        placeholder="e.g., Waterfront residential, commercial core, branded residences..."
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent h-24 resize-none"
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.investorType || !formData.ticketSize}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      formData.investorType && formData.ticketSize
                        ? 'bg-gold-600 hover:bg-gold-700 text-white'
                        : 'bg-slate-700 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Continue to NDA
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="text-center mb-8">
                    <DocumentTextIcon className="w-12 h-12 text-gold-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold">Non-Disclosure Agreement</h3>
                    <p className="text-slate-300 mt-2">Protect confidential information before viewing opportunities</p>
                  </div>

                  <div className="bg-slate-700 p-6 rounded-lg border border-slate-600">
                    <h4 className="font-semibold mb-4">Key Terms</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li>• Confidential information includes property details, pricing, and financial projections</li>
                      <li>• Non-disclosure period: 2 years from agreement date</li>
                      <li>• Information may only be used for investment evaluation purposes</li>
                      <li>• No sharing with third parties without written consent</li>
                      <li>• Breach of NDA may result in legal action and damages</li>
                    </ul>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="Enter your full legal name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full p-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>

                    <label className="flex items-start space-x-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.ndaAccepted}
                        onChange={(e) => setFormData({...formData, ndaAccepted: e.target.checked})}
                        className="mt-1 w-4 h-4 text-gold-600 focus:ring-gold-500 border-slate-600 rounded"
                      />
                      <span className="text-sm text-slate-300">
                        I acknowledge and agree to the terms of the Non-Disclosure Agreement
                      </span>
                    </label>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.name || !formData.email || !formData.ndaAccepted}
                    className={`w-full py-3 px-6 rounded-lg font-medium transition-all ${
                      formData.name && formData.email && formData.ndaAccepted
                        ? 'bg-gold-600 hover:bg-gold-700 text-white'
                        : 'bg-slate-700 text-slate-600 cursor-not-allowed'
                    }`}
                  >
                    Access Quiet Listings
                  </button>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <h3 className="text-2xl font-bold text-center mb-8">Curated Opportunity</h3>
                  
                  <div className="bg-gradient-to-r from-slate-700 to-slate-600 p-6 rounded-xl border border-slate-500">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-bold text-gold-400">Dubai Creek Harbour</h4>
                        <p className="text-slate-300">Branded Residences - Off Plan</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">AED 12.5M</div>
                        <div className="text-sm text-slate-600">2BR Penthouse</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">7.2%</div>
                        <div className="text-xs text-slate-600">Est. Net Yield</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">Q2 2026</div>
                        <div className="text-xs text-slate-600">Handover</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-white">5% Down</div>
                        <div className="text-xs text-slate-600">Payment Plan</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm text-slate-300 mb-6">
                      <p>• Waterfront location with Creek & Burj Khalifa views</p>
                      <p>• Managed by international hotel operator</p>
                      <p>• Guaranteed rental program for first 2 years</p>
                      <p>• Limited release - 12 units remaining</p>
                    </div>

                    <button
                      onClick={handleSubmit}
                      className="w-full bg-gold-600 hover:bg-gold-700 text-white py-3 px-6 rounded-lg font-medium transition-all"
                    >
                      Contact Partner for Details
                    </button>
                  </div>

                  <p className="text-center text-sm text-slate-600">
                    This is a sample opportunity. Actual listings vary based on market availability and your investment profile.
                  </p>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center space-y-6"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto" />
                  <h3 className="text-2xl font-bold">Access Granted</h3>
                  <p className="text-slate-300">
                    Our partner will contact you within 24 hours to discuss the opportunity and answer your questions.
                  </p>
                  <div className="bg-slate-700 p-4 rounded-lg">
                    <p className="text-sm text-slate-300">
                      <strong>Next Steps:</strong> Detailed financial projections, site visit coordination, and due diligence package preparation.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
