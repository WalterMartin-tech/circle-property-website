'use client'

import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, CreditCardIcon, BanknotesIcon, BuildingLibraryIcon } from '@heroicons/react/24/outline'

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  serviceTier: {
    name: string
    price: string
    period: string
    description: string
  }
}

export default function PaymentModal({ isOpen, onClose, serviceTier }: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'crypto'>('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  })

  const [bankData, setBankData] = useState({
    accountHolder: '',
    iban: '',
    swiftCode: '',
    bankName: ''
  })

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, Amex accepted',
      icon: CreditCardIcon,
      processing: 'Instant',
      fee: '2.9% + AED 5'
    },
    {
      id: 'transfer',
      name: 'Bank Transfer',
      description: 'Direct transfer to our UAE account',
      icon: BuildingLibraryIcon,
      processing: '1-2 business days',
      fee: 'No fees'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      description: 'Bitcoin, Ethereum, USDC accepted',
      icon: BanknotesIcon,
      processing: '1-6 confirmations',
      fee: '1.5%'
    }
  ]

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    setIsProcessing(false)
    setIsSuccess(true)
    
    // Reset after 4 seconds
    setTimeout(() => {
      setIsSuccess(false)
      onClose()
    }, 4000)
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <Dialog.Title className="text-2xl font-bold text-slate-900">
                      Complete Payment
                    </Dialog.Title>
                    <p className="text-slate-800">Secure payment for {serviceTier.name} tier</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                  >
                    <XMarkIcon className="w-6 h-6 text-slate-700" />
                  </button>
                </div>

                {isSuccess ? (
                  // Success State
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Payment Successful!</h3>
                    <p className="text-slate-800 mb-6">
                      Your payment has been processed successfully. You'll receive a confirmation email shortly.
                    </p>
                    <div className="bg-green-50 rounded-lg p-4 text-left">
                      <h4 className="font-semibold text-green-900 mb-2">What's next?</h4>
                      <ul className="text-sm text-green-800 space-y-1">
                        <li>• You'll receive an invoice within 24 hours</li>
                        <li>• Our team will contact you to begin onboarding</li>
                        <li>• Access to your client portal will be set up</li>
                        <li>• Your dedicated manager will be assigned</li>
                      </ul>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Order Summary */}
                    <div className="bg-slate-50 rounded-lg p-6 mb-8">
                      <h3 className="font-semibold text-slate-900 mb-4">Order Summary</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-slate-800">{serviceTier.name} - {serviceTier.period}</span>
                          <span className="font-semibold">{serviceTier.price}</span>
                        </div>
                        {paymentMethod === 'card' && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-700">Processing fee (2.9% + AED 5)</span>
                            <span className="text-slate-700">AED 1,020</span>
                          </div>
                        )}
                        {paymentMethod === 'crypto' && (
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-700">Network fee (1.5%)</span>
                            <span className="text-slate-700">AED 525</span>
                          </div>
                        )}
                        <div className="border-t pt-2 flex justify-between font-bold">
                          <span>Total</span>
                          <span>
                            {paymentMethod === 'card' && serviceTier.price === 'AED 35,000' ? 'AED 36,020' :
                             paymentMethod === 'crypto' && serviceTier.price === 'AED 35,000' ? 'AED 35,525' :
                             serviceTier.price}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Method Selection */}
                    <div className="mb-8">
                      <h3 className="text-lg font-semibold text-slate-900 mb-4">Choose Payment Method</h3>
                      <div className="space-y-3">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-all ${
                              paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-slate-200 hover:border-slate-300'
                            }`}
                          >
                            <input
                              type="radio"
                              name="paymentMethod"
                              value={method.id}
                              checked={paymentMethod === method.id}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="sr-only"
                            />
                            <method.icon className="w-6 h-6 text-slate-700 mr-4" />
                            <div className="flex-1">
                              <div className="font-medium text-slate-900">{method.name}</div>
                              <div className="text-sm text-slate-800">{method.description}</div>
                              <div className="text-xs text-slate-700 mt-1">
                                {method.processing} • {method.fee}
                              </div>
                            </div>
                            <div className={`w-4 h-4 rounded-full border-2 ${
                              paymentMethod === method.id ? 'border-blue-500 bg-blue-500' : 'border-slate-300'
                            }`}>
                              {paymentMethod === method.id && (
                                <div className="w-full h-full rounded-full bg-white scale-50"></div>
                              )}
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handlePayment}>
                      {paymentMethod === 'card' && (
                        <div className="space-y-4 mb-8">
                          <h3 className="text-lg font-semibold text-slate-900">Card Details</h3>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Cardholder Name
                            </label>
                            <input
                              type="text"
                              required
                              value={cardData.cardholderName}
                              onChange={(e) => setCardData({...cardData, cardholderName: e.target.value})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="John Smith"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              required
                              maxLength={19}
                              value={cardData.cardNumber}
                              onChange={(e) => setCardData({...cardData, cardNumber: formatCardNumber(e.target.value)})}
                              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="1234 5678 9012 3456"
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                Expiry Date
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={5}
                                value={cardData.expiryDate}
                                onChange={(e) => setCardData({...cardData, expiryDate: formatExpiryDate(e.target.value)})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="MM/YY"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">
                                CVV
                              </label>
                              <input
                                type="text"
                                required
                                maxLength={4}
                                value={cardData.cvv}
                                onChange={(e) => setCardData({...cardData, cvv: e.target.value.replace(/\D/g, '')})}
                                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                placeholder="123"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'transfer' && (
                        <div className="bg-blue-50 rounded-lg p-6 mb-8">
                          <h3 className="text-lg font-semibold text-blue-900 mb-4">Bank Transfer Details</h3>
                          <div className="space-y-2 text-sm">
                            <div><strong>Bank:</strong> Emirates NBD</div>
                            <div><strong>Account Name:</strong> Circle Property Management LLC</div>
                            <div><strong>IBAN:</strong> AE07 0260 0010 0000 1234567</div>
                            <div><strong>SWIFT:</strong> EBILAEAD</div>
                            <div><strong>Reference:</strong> {serviceTier.name}-{Date.now().toString().slice(-6)}</div>
                          </div>
                          <p className="text-xs text-blue-700 mt-4">
                            Please include the reference number in your transfer. Payment confirmation will be processed within 1-2 business days.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'crypto' && (
                        <div className="bg-purple-50 rounded-lg p-6 mb-8">
                          <h3 className="text-lg font-semibold text-purple-900 mb-4">Cryptocurrency Payment</h3>
                          <div className="space-y-3 text-sm">
                            <div className="p-3 bg-white rounded border">
                              <strong>Bitcoin (BTC)</strong><br />
                              bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <strong>Ethereum (ETH)</strong><br />
                              0x742d35Cc4bF426A4E76dB22CF0Bb9e8F4c8EF789
                            </div>
                            <div className="p-3 bg-white rounded border">
                              <strong>USDC</strong><br />
                              0x742d35Cc4bF426A4E76dB22CF0Bb9e8F4c8EF789
                            </div>
                          </div>
                          <p className="text-xs text-purple-700 mt-4">
                            Send the exact amount in your preferred cryptocurrency. Payment will be confirmed after network confirmations.
                          </p>
                        </div>
                      )}

                      {/* Submit Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3 pt-4">
                        <button
                          type="button"
                          onClick={onClose}
                          className="flex-1 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={isProcessing}
                          className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-all hover-lift disabled:cursor-not-allowed"
                        >
                          {isProcessing ? 'Processing...' : 
                           paymentMethod === 'transfer' ? 'Confirm Transfer' :
                           paymentMethod === 'crypto' ? 'Confirm Crypto Payment' :
                           `Pay ${paymentMethod === 'card' && serviceTier.price === 'AED 35,000' ? 'AED 36,020' : serviceTier.price}`}
                        </button>
                      </div>
                    </form>

                    {/* Security Notice */}
                    <div className="mt-6 p-3 bg-slate-50 rounded-lg">
                      <p className="text-xs text-slate-700 text-center">
                        🔒 Your payment information is encrypted and secure. We use industry-standard SSL encryption and never store your card details.
                      </p>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
