'use client'

import { useState } from 'react'
import { XMarkIcon, CalendarIcon, ClockIcon, UserIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline'

interface BookCallModalProps {
  isOpen: boolean
  onClose: () => void
  moduleType: 'deal-picker' | 'debt-stack' | 'capex-phasing' | 'leasing-mix'
  resultsSummary?: string
}

export default function BookCallModal({ isOpen, onClose, moduleType, resultsSummary }: BookCallModalProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    preferredDate: '',
    preferredTime: '',
    timezone: 'Asia/Dubai',
    topic: getDefaultTopic(moduleType),
    notes: resultsSummary || '',
    urgency: 'normal' as 'urgent' | 'normal' | 'flexible'
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function getDefaultTopic(module: string) {
    const topics = {
      'deal-picker': 'Portfolio Optimization Strategy',
      'debt-stack': 'Debt Structuring & Financing',
      'capex-phasing': 'CapEx Planning & Cash Flow',
      'leasing-mix': 'Leasing Strategy & Tenant Mix',
      'consultation': 'Custom Optimization & Advisory Services'
    }
    return topics[module as keyof typeof topics] || 'General Consultation'
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In production, send to your CRM/scheduling system
    console.log('Booking request:', formData)

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Auto-close after 3 seconds
    setTimeout(() => {
      onClose()
      setIsSubmitted(false)
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        company: '',
        preferredDate: '',
        preferredTime: '',
        timezone: 'Asia/Dubai',
        topic: getDefaultTopic(moduleType),
        notes: resultsSummary || '',
        urgency: 'normal'
      })
    }, 3000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-6 rounded-t-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Book a Call with Senior Partner</h2>
                    <p className="text-purple-100 text-sm">
                      Discuss your {getDefaultTopic(moduleType).toLowerCase()} with our investment specialists
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    className="text-white hover:text-purple-200 transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <UserIcon className="w-5 h-5 text-purple-600" />
                    Contact Information
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        placeholder="James Thompson"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        placeholder="james.thompson@company.co.uk"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        placeholder="+44 20 7123 4567"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Company (Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                        placeholder="Thompson Capital Partners"
                      />
                    </div>
                  </div>
                </div>

                {/* Scheduling Preferences */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-purple-600" />
                    Scheduling Preferences
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Preferred Time *
                      </label>
                      <select
                        required
                        value={formData.preferredTime}
                        onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      >
                        <option value="">Select time</option>
                        <option value="09:00">09:00 AM</option>
                        <option value="10:00">10:00 AM</option>
                        <option value="11:00">11:00 AM</option>
                        <option value="12:00">12:00 PM</option>
                        <option value="13:00">01:00 PM</option>
                        <option value="14:00">02:00 PM</option>
                        <option value="15:00">03:00 PM</option>
                        <option value="16:00">04:00 PM</option>
                        <option value="17:00">05:00 PM</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Timezone
                      </label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      >
                        <option value="Asia/Dubai">Dubai (GST, UTC+4)</option>
                        <option value="Europe/London">London (GMT/BST)</option>
                        <option value="America/New_York">New York (EST/EDT)</option>
                        <option value="Asia/Singapore">Singapore (SGT)</option>
                        <option value="Asia/Hong_Kong">Hong Kong (HKT)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Urgency
                      </label>
                      <select
                        value={formData.urgency}
                        onChange={(e) => setFormData({...formData, urgency: e.target.value as any})}
                        className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      >
                        <option value="flexible">Flexible (within 2 weeks)</option>
                        <option value="normal">Normal (within 1 week)</option>
                        <option value="urgent">Urgent (within 2 days)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Discussion Topic */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <BuildingOfficeIcon className="w-5 h-5 text-purple-600" />
                    Discussion Topic
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Main Topic *
                    </label>
                    <select
                      required
                      value={formData.topic}
                      onChange={(e) => setFormData({...formData, topic: e.target.value})}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                    >
                      <option value="Portfolio Optimization Strategy">Portfolio Optimization Strategy</option>
                      <option value="Debt Structuring & Financing">Debt Structuring & Financing</option>
                      <option value="CapEx Planning & Cash Flow">CapEx Planning & Cash Flow</option>
                      <option value="Leasing Strategy & Tenant Mix">Leasing Strategy & Tenant Mix</option>
                      <option value="General Investment Consultation">General Investment Consultation</option>
                      <option value="Property Acquisition">Property Acquisition</option>
                      <option value="Asset Management">Asset Management</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900"
                      placeholder="Share any specific questions or optimization results you'd like to discuss..."
                    ></textarea>
                    {resultsSummary && (
                      <p className="text-xs text-slate-500 mt-1">
                        ℹ️ Your optimization results have been pre-filled for discussion
                      </p>
                    )}
                  </div>
                </div>

                {/* What to Expect */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">📞 What to Expect</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>✓ <strong>30-45 minute consultation</strong> with a senior investment specialist</li>
                    <li>✓ <strong>Review your optimization results</strong> and discuss implementation</li>
                    <li>✓ <strong>Get expert recommendations</strong> tailored to your portfolio</li>
                    <li>✓ <strong>Q&A session</strong> on financing, structuring, and execution</li>
                    <li>✓ <strong>Follow-up materials</strong> and action plan sent after the call</li>
                  </ul>
                </div>

                {/* Submit Button */}
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:bg-slate-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </span>
                    ) : (
                      'Book Call Now'
                    )}
                  </button>
                </div>

                <p className="text-xs text-center text-slate-500">
                  By submitting, you agree to our <a href="/privacy" className="text-purple-600 hover:underline">Privacy Policy</a>. 
                  We'll contact you within 24 hours to confirm your appointment.
                </p>
              </form>
            </>
          ) : (
            /* Success State */
            <div className="p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Booking Request Submitted!</h3>
              <p className="text-slate-600 mb-6">
                Thank you{formData.fullName ? `, ${formData.fullName}` : ''}. We've received your request to discuss <strong>{formData.topic}</strong>.
              </p>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-left mb-6">
                <h4 className="font-semibold text-blue-900 mb-2">📅 Next Steps</h4>
                <ol className="text-sm text-blue-800 space-y-1 list-decimal ml-4">
                  <li>Check your email <strong>({formData.email})</strong> for confirmation</li>
                  <li>Our team will contact you within <strong>24 hours</strong></li>
                  <li>We'll confirm your preferred time: <strong>{formData.preferredDate} at {formData.preferredTime}</strong></li>
                  <li>You'll receive a calendar invite with video call link</li>
                </ol>
              </div>
              <p className="text-sm text-slate-500">
                This window will close automatically...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

