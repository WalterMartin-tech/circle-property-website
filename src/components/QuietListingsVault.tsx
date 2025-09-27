'use client'

import { useState } from 'react'
import { EyeSlashIcon, DocumentTextIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuietListingsVault() {
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
    <section className="py-20 bg-slate-900 text-white">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <EyeSlashIcon className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-4">Quiet Listings Vault</h2>
            <p className="text-xl text-slate-300 mb-6">
              Invite-only opportunities. NDA first, teasers second.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-slate-800 border border-slate-600 rounded-full text-slate-300 text-sm">
              <ShieldCheckIcon className="w-4 h-4 mr-2" />
              <span>Verified accredited investors only</span>
            </div>
          </div>

          <div className="bg-slate-800 rounded-2xl p-8 border border-slate-700">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-8">
              {[1, 2, 3].map((number) => (
                <div key={number} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step >= number ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-600'
                  }`}>
                    {step > number ? <CheckCircleIcon className="w-5 h-5" /> : number}
                  </div>
                  {number < 3 && (
                    <div className={`w-16 h-1 mx-2 ${
                      step > number ? 'bg-blue-500' : 'bg-slate-700'
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
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Investor Classification
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      {[
                        { value: 'hnwi', label: 'HNWI Individual', desc: 'Net worth $1M+ USD' },
                        { value: 'family-office', label: 'Family Office', desc: 'Multi-generational wealth' },
                        { value: 'institutional', label: 'Institutional', desc: 'Fund, pension, endowment' },
                        { value: 'corporate', label: 'Corporate', desc: 'Company treasury allocation' }
                      ].map((type) => (
                        <div
                          key={type.value}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            formData.investorType === type.value
                              ? 'border-blue-500 bg-blue-50/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setFormData({...formData, investorType: type.value})}
                        >
                          <div className="font-medium text-white">{type.label}</div>
                          <div className="text-sm text-slate-600">{type.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Investment Ticket Size (USD)
                    </label>
                    <div className="grid md:grid-cols-3 gap-4">
                      {[
                        { value: '500k-1m', label: '$500K - $1M' },
                        { value: '1m-5m', label: '$1M - $5M' },
                        { value: '5m-10m', label: '$5M - $10M' },
                        { value: '10m-25m', label: '$10M - $25M' },
                        { value: '25m+', label: '$25M+' },
                        { value: 'flexible', label: 'Flexible' }
                      ].map((size) => (
                        <div
                          key={size.value}
                          className={`p-3 border rounded-lg cursor-pointer transition-all text-center ${
                            formData.ticketSize === size.value
                              ? 'border-blue-500 bg-blue-50/10'
                              : 'border-slate-600 hover:border-slate-500'
                          }`}
                          onClick={() => setFormData({...formData, ticketSize: size.value})}
                        >
                          <div className="font-medium text-white">{size.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleNext}
                    disabled={!formData.investorType || !formData.ticketSize}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                  >
                    Continue to Preferences
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
                  <h3 className="text-2xl font-bold text-center mb-8">Investment Preferences</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-3">
                      Preferred Asset Types & Strategies
                    </label>
                    <textarea
                      className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={4}
                      placeholder="e.g., Off-plan developments, luxury residential, commercial real estate, STR opportunities, specific areas of interest..."
                      value={formData.preferences}
                      onChange={(e) => setFormData({...formData, preferences: e.target.value})}
                    />
                  </div>

                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <h4 className="font-semibold text-white mb-2">What You'll Receive:</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      <li>• Pre-market opportunities (48-72h early access)</li>
                      <li>• Off-market deals from our network</li>
                      <li>• Distressed asset opportunities</li>
                      <li>• Joint venture partnerships</li>
                      <li>• Quarterly market intelligence briefings</li>
                    </ul>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(1)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={!formData.preferences.trim()}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                    >
                      Continue to NDA
                    </button>
                  </div>
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
                  <h3 className="text-2xl font-bold text-center mb-8">Contact & NDA</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="bg-slate-700/50 p-6 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <DocumentTextIcon className="w-6 h-6 text-blue-400 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-white mb-2">Non-Disclosure Agreement</h4>
                        <p className="text-sm text-slate-300 mb-4">
                          By proceeding, you agree to maintain strict confidentiality regarding all 
                          investment opportunities, financial information, and strategic details shared 
                          through the Quiet Listings Vault.
                        </p>
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            id="nda"
                            className="mt-1"
                            checked={formData.ndaAccepted}
                            onChange={(e) => setFormData({...formData, ndaAccepted: e.target.checked})}
                          />
                          <label htmlFor="nda" className="text-sm text-slate-300 cursor-pointer">
                            I agree to the NDA terms and confirm I am an accredited investor
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <button
                      onClick={() => setStep(2)}
                      className="flex-1 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleSubmit}
                      disabled={!formData.name || !formData.email || !formData.ndaAccepted}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-600 text-white px-6 py-3 rounded-lg font-medium transition-all disabled:cursor-not-allowed"
                    >
                      Submit Application
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 4 && (
                <motion.div
                  key="step4"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <CheckCircleIcon className="w-16 h-16 text-green-400 mx-auto mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Application Submitted</h3>
                  <p className="text-slate-300 mb-6">
                    Thank you for your interest. We'll review your application and contact you 
                    within 48 hours with next steps.
                  </p>
                  <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm text-slate-600">
                      <strong>What happens next:</strong><br />
                      1. Application review (24-48h)<br />
                      2. Verification call (if approved)<br />
                      3. Vault access granted<br />
                      4. First opportunity batch sent
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-400">$2.8B+</div>
              <div className="text-sm text-slate-600">Assets Under Management</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">156</div>
              <div className="text-sm text-slate-600">Vault Members</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-400">48h</div>
              <div className="text-sm text-slate-600">Average Response Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
