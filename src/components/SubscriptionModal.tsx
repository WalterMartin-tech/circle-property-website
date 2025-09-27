'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

interface SubscriptionModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SubscriptionModal({ isOpen, onClose }: SubscriptionModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investorType: '',
    termsAgreed: false,
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.investorType || !formData.termsAgreed) {
      setError('Please fill in all required fields and accept the terms.')
      setIsLoading(false)
      return
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      console.log('Subscription submitted:', formData)
      setIsSubmitted(true)
      
      // Store user registration locally (simulate)
      localStorage.setItem('circle_property_subscriber', JSON.stringify({
        name: formData.name,
        email: formData.email,
        investorType: formData.investorType,
        subscribedAt: new Date().toISOString()
      }))
      
      // In a real app, you'd send this to your backend:
      // const response = await fetch('/api/subscriptions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });
      // if (!response.ok) throw new Error('Failed to subscribe');
      // setIsSubmitted(true);
    } catch (err) {
      setError('Failed to subscribe. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCloseModal = () => {
    setIsSubmitted(false)
    setFormData({
      name: '',
      email: '',
      phone: '',
      investorType: '',
      termsAgreed: false,
    })
    onClose()
  }

  const investorTypes = [
    { value: '', label: 'Select investor type' },
    { value: 'HNWI', label: 'High Net Worth Individual' },
    { value: 'Family Office', label: 'Family Office' },
    { value: 'Property Owner', label: 'Property Owner' },
    { value: 'Developer', label: 'Developer' },
    { value: 'Investment Manager', label: 'Investment Manager' },
    { value: 'Fund Manager', label: 'Fund Manager' },
  ]

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleCloseModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto pt-8">
          <div className="flex min-h-full items-start justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95 translate-y-4"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-4"
            >
              <Dialog.Panel className="relative w-full max-w-lg transform overflow-hidden rounded-xl bg-white shadow-2xl transition-all">
                {/* Close Button */}
                <button
                  type="button"
                  className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 hover:bg-slate-200 transition-colors"
                  onClick={handleCloseModal}
                >
                  <XMarkIcon className="w-5 h-5 text-slate-600" />
                </button>

                {/* Modal Content */}
                <div className="p-8">
                  {isSubmitted ? (
                    <div className="text-center">
                      <CheckCircleIcon className="mx-auto h-16 w-16 text-green-500 mb-6" />
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">Welcome to Circle Property!</h2>
                      <p className="text-slate-600 mb-6">
                        Thank you for subscribing. You'll receive market insights and exclusive opportunities directly in your inbox.
                      </p>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                        <h4 className="font-semibold text-green-900 mb-2">What's next?</h4>
                        <ul className="text-sm text-green-800 space-y-1 text-left">
                          <li>• Weekly market intelligence reports</li>
                          <li>• Access to quiet listings and off-market opportunities</li>
                          <li>• Exclusive invitations to Circle Property events</li>
                          <li>• Priority access to new tools and services</li>
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
                        onClick={handleCloseModal}
                      >
                        Start Exploring
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="mb-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Stay Informed</h2>
                        <p className="text-slate-600">
                          Subscribe for market insights and access all Circle Property services seamlessly.
                        </p>
                      </div>

                      {error && (
                        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6" role="alert">
                          <strong className="font-medium">Error!</strong>
                          <span className="block sm:inline"> {error}</span>
                        </div>
                      )}

                      <div className="space-y-5">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-900 placeholder-slate-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@company.com"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-900 placeholder-slate-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-2">
                            Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                            placeholder="+971 50 123 4567"
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-900 placeholder-slate-500"
                          />
                        </div>

                        <div>
                          <label htmlFor="investorType" className="block text-sm font-medium text-slate-700 mb-2">
                            Investor Type <span className="text-red-500">*</span>
                          </label>
                          <select
                            id="investorType"
                            name="investorType"
                            value={formData.investorType}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-slate-900"
                          >
                            {investorTypes.map(option => (
                              <option key={option.value} value={option.value}>{option.label}</option>
                            ))}
                          </select>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            id="termsAgreed"
                            name="termsAgreed"
                            type="checkbox"
                            checked={formData.termsAgreed}
                            onChange={handleChange}
                            required
                            className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 flex-shrink-0"
                          />
                          <label htmlFor="termsAgreed" className="text-sm text-slate-700 leading-relaxed">
                            I agree to receive market updates and communications from Circle Property. <span className="text-red-500">*</span>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full mt-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:from-slate-400 disabled:to-slate-500 text-white font-medium py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:transform-none disabled:shadow-md disabled:cursor-not-allowed"
                      >
                        {isLoading ? 'Subscribing...' : 'Subscribe'}
                      </button>
                    </form>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}