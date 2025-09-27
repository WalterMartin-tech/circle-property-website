'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CheckIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import PaymentModal from './PaymentModal'

export default function ComprehensiveServices() {
  const [servicePortfolio, setServicePortfolio] = useState<Array<{
    id: string
    name: string
    price: number
    category: string
  }>>([])
  
  const [selectedServiceForPayment, setSelectedServiceForPayment] = useState<any>(null)
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false)

  // Service conflict groups - services that conflict with each other
  const conflictGroups = [
    {
      name: 'Property Care Level',
      services: ['property-essential', 'property-professional', 'property-concierge'],
      description: 'Choose one property care level - higher tiers replace lower ones'
    },
    {
      name: 'Education Services',
      services: ['education-consultation', 'education-application', 'education-comprehensive', 'education-allyear'],
      description: 'Choose your education support level - comprehensive services include all lower tiers'
    }
  ]

  const addToPortfolio = (service: { id: string; name: string; price: number; category: string }) => {
    // Check if service is already in portfolio
    if (isInPortfolio(service.id)) {
      return
    }

    // Check for conflicts and remove conflicting services
    const updatedPortfolio = servicePortfolio.filter(existingService => {
      // Find if the new service conflicts with existing ones
      const conflictGroup = conflictGroups.find(group => 
        group.services.includes(service.id) && group.services.includes(existingService.id)
      )
      
      // If there's a conflict, remove the existing service
      if (conflictGroup) {
        // For education services, apply smart logic
        if (conflictGroup.name === 'Education Services') {
          // If adding comprehensive, remove consultation and application
          if (service.id === 'education-comprehensive' && 
              (existingService.id === 'education-consultation' || existingService.id === 'education-application')) {
            return false
          }
          // If adding all-year, remove all lower tiers
          if (service.id === 'education-allyear' && 
              ['education-consultation', 'education-application', 'education-comprehensive'].includes(existingService.id)) {
            return false
          }
          // If trying to add lower tier when higher tier exists, prevent the lower tier
          if ((service.id === 'education-consultation' || service.id === 'education-application') && 
              (existingService.id === 'education-comprehensive' || existingService.id === 'education-allyear')) {
            return true // Keep the higher tier, don't add the lower one
          }
          if (service.id === 'education-comprehensive' && existingService.id === 'education-allyear') {
            return true // Keep all-year, don't add comprehensive
          }
        }
        
        // For property care, always replace with the new selection
        return false
      }
      
      return true
    })

    // For education services, don't add lower tiers if higher tiers already exist
    const conflictGroup = conflictGroups.find(group => group.services.includes(service.id))
    if (conflictGroup && conflictGroup.name === 'Education Services') {
      const hasHigherTier = updatedPortfolio.some(existingService => {
        if (service.id === 'education-consultation') {
          return ['education-application', 'education-comprehensive', 'education-allyear'].includes(existingService.id)
        }
        if (service.id === 'education-application') {
          return ['education-comprehensive', 'education-allyear'].includes(existingService.id)
        }
        if (service.id === 'education-comprehensive') {
          return existingService.id === 'education-allyear'
        }
        return false
      })
      
      if (hasHigherTier) {
        return // Don't add lower tier when higher tier exists
      }
    }

    // Add the new service
    setServicePortfolio([...updatedPortfolio, service])
  }

  const removeFromPortfolio = (serviceId: string) => {
    setServicePortfolio(servicePortfolio.filter(item => item.id !== serviceId))
  }

  const isInPortfolio = (serviceId: string) => {
    return servicePortfolio.some(item => item.id === serviceId)
  }

  const getPortfolioTotal = () => {
    return servicePortfolio.reduce((total, service) => total + service.price, 0)
  }

  const getConflictingServices = (serviceId: string) => {
    const conflictGroup = conflictGroups.find(group => group.services.includes(serviceId))
    if (!conflictGroup) return []
    
    return servicePortfolio.filter(portfolioService => 
      conflictGroup.services.includes(portfolioService.id) && portfolioService.id !== serviceId
    )
  }

  const handlePayment = (service: any) => {
    setSelectedServiceForPayment(service)
    setIsPaymentModalOpen(true)
  }

  return (
    <div className="py-16">
      {/* Service Portfolio Summary */}
      {servicePortfolio.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-l-4 border-blue-600 p-6 mb-12 rounded-r-lg"
        >
          <h3 className="text-xl font-bold text-blue-900 mb-4">Your Service Portfolio</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 mb-4">
            {servicePortfolio.map((service) => (
              <div key={service.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                <div>
                  <div className="font-medium text-slate-900">{service.name}</div>
                  <div className="text-sm text-slate-700">{service.category}</div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-blue-600">
                    {service.price > 0 ? `AED ${service.price.toLocaleString()}` : 'Bespoke'}
                  </span>
                  <button
                    onClick={() => removeFromPortfolio(service.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                  >
                    <MinusIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between">
            <div className="text-lg font-bold text-blue-900">
              Total: AED {getPortfolioTotal().toLocaleString()}
              {servicePortfolio.some(s => s.price === 0) && (
                <span className="text-sm font-normal text-blue-700 ml-2">+ Bespoke items</span>
              )}
            </div>
            <div className="space-x-3">
              <button
                onClick={() => handlePayment({ 
                  name: 'Service Portfolio', 
                  price: `AED ${getPortfolioTotal().toLocaleString()}`,
                  period: 'total package',
                  description: 'Custom service package'
                })}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all"
              >
                Proceed to Payment
              </button>
              <button
                onClick={() => setServicePortfolio([])}
                className="border border-slate-300 hover:border-slate-400 text-slate-700 px-6 py-2 rounded-lg font-medium transition-all"
              >
                Clear Portfolio
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Property Care & Management */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">🏠 Property Care & Management</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Annual non-rental property management for owners who travel. Professional care for your Dubai property.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Essential Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col h-full"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Essential</h3>
              <div className="text-3xl font-bold text-slate-900 mb-1">AED 5,100</div>
              <div className="text-slate-500 text-sm">/year</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Key storage & secure access',
                '6 comprehensive inspections',
                'Basic maintenance coordination',
                'Emergency response service',
                'Utility monitoring & alerts'
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Spacer to push button to bottom */}
            <div className="flex-1"></div>

            <button 
              onClick={() => addToPortfolio({
                id: 'property-essential',
                name: 'Property Care - Essential',
                price: 5100,
                category: 'Property Care'
              })}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                isInPortfolio('property-essential') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('property-essential') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
            </button>
          </motion.div>

          {/* Professional Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border-2 border-blue-200 shadow-sm relative flex flex-col h-full"
          >
            <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </span>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Professional</h3>
              <div className="text-3xl font-bold text-slate-900 mb-1">AED 18,200</div>
              <div className="text-slate-500 text-sm">/year</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Essential',
                '12 detailed inspections',
                'Technical systems service',
                'Arrival & departure preparation',
                'Guest coordination services'
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Spacer to push button to bottom */}
            <div className="flex-1"></div>

            <button 
              onClick={() => addToPortfolio({
                id: 'property-professional',
                name: 'Property Care - Professional',
                price: 18200,
                category: 'Property Care'
              })}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                isInPortfolio('property-professional') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('property-professional') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
            </button>
          </motion.div>

          {/* Concierge Tier */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm flex flex-col h-full"
          >
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Concierge</h3>
              <div className="text-3xl font-bold text-slate-900 mb-1">AED 31,300</div>
              <div className="text-slate-500 text-sm">/year</div>
            </div>

            <ul className="space-y-3 mb-8">
              {[
                'Everything in Professional',
                '24 premium inspections',
                'Preventive maintenance program',
                'White-glove preparation',
                'Full lifestyle management'
              ].map((feature, i) => (
                <li key={i} className="flex items-start">
                  <CheckIcon className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-slate-700">{feature}</span>
                </li>
              ))}
            </ul>

            {/* Spacer to push button to bottom */}
            <div className="flex-1"></div>

            <button 
              onClick={() => addToPortfolio({
                id: 'property-concierge',
                name: 'Property Care - Concierge',
                price: 31300,
                category: 'Property Care'
              })}
              className={`w-full py-3 rounded-lg font-medium transition-all ${
                isInPortfolio('property-concierge') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('property-concierge') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
            </button>
          </motion.div>
        </div>

        {/* Additional Property Services */}
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border border-slate-200 flex flex-col h-full"
          >
            <h4 className="text-lg font-bold text-slate-900 mb-2">Welcome Service</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 1,250</div>
            <p className="text-slate-700 mb-4">Property activation, cleaning, systems check, guest preparation</p>
            <button 
              onClick={() => addToPortfolio({
                id: 'welcome-service',
                name: 'Welcome Service',
                price: 1250,
                category: 'Property Care'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('welcome-service') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('welcome-service') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border border-slate-200 flex flex-col h-full"
          >
            <h4 className="text-lg font-bold text-slate-900 mb-2">Departure Service</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 1,000</div>
            <p className="text-slate-700 mb-4">Property securing, final inspection, utility management</p>
            <button 
              onClick={() => addToPortfolio({
                id: 'departure-service',
                name: 'Departure Service',
                price: 1000,
                category: 'Property Care'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('departure-service') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('departure-service') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Education & Family Services */}
      <section className="mb-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">🎓 Education & Family Services</h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            School selection, application, and ongoing family support for international families in Dubai.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {/* Education Consultation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border border-slate-200 flex flex-col h-full"
          >
            <h4 className="text-lg font-bold text-slate-900 mb-2">Consultation</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 3,500</div>
            <ul className="text-sm text-slate-700 space-y-1 mb-4">
              <li>• Child assessment & profiling</li>
              <li>• School shortlisting (5-8 options)</li>
              <li>• Initial guidance & planning</li>
              <li>• Timeline coordination</li>
            </ul>
            <div className="flex-1"></div>
            <button 
              onClick={() => addToPortfolio({
                id: 'education-consultation',
                name: 'Education - Consultation',
                price: 3500,
                category: 'Education'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('education-consultation') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('education-consultation') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>

          {/* Education Application */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border border-slate-200 flex flex-col h-full"
          >
            <h4 className="text-lg font-bold text-slate-900 mb-2">Application</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 8,500</div>
            <ul className="text-sm text-slate-700 space-y-1 mb-4">
              <li>• Complete application management</li>
              <li>• Document preparation</li>
              <li>• School liaison & coordination</li>
              <li>• Interview preparation</li>
            </ul>
            <div className="flex-1"></div>
            <button 
              onClick={() => addToPortfolio({
                id: 'education-application',
                name: 'Education - Application',
                price: 8500,
                category: 'Education'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('education-application') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('education-application') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>

          {/* Education Comprehensive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border-2 border-green-200 flex flex-col h-full"
          >
            <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full inline-block mb-2">
              Best Value
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">Comprehensive</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 15,000</div>
            <ul className="text-sm text-slate-700 space-y-1 mb-4">
              <li>• Consultation + Application</li>
              <li>• Ongoing family support</li>
              <li>• First-year transition assistance</li>
              <li>• Performance monitoring</li>
            </ul>
            <div className="flex-1"></div>
            <button 
              onClick={() => addToPortfolio({
                id: 'education-comprehensive',
                name: 'Education - Comprehensive',
                price: 15000,
                category: 'Education'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('education-comprehensive') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('education-comprehensive') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>

          {/* Education All-Year */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white rounded-lg p-6 border border-slate-200 flex flex-col h-full"
          >
            <h4 className="text-lg font-bold text-slate-900 mb-2">All-Year Support</h4>
            <div className="text-2xl font-bold text-blue-600 mb-3">AED 25,000</div>
            <ul className="text-sm text-slate-700 space-y-1 mb-4">
              <li>• Everything in Comprehensive</li>
              <li>• Year-round educational support</li>
              <li>• Academic progress monitoring</li>
              <li>• University preparation</li>
            </ul>
            <div className="flex-1"></div>
            <button 
              onClick={() => addToPortfolio({
                id: 'education-allyear',
                name: 'Education - All-Year Support',
                price: 25000,
                category: 'Education'
              })}
              className={`w-full py-2 rounded-lg font-medium transition-all ${
                isInPortfolio('education-allyear') 
                  ? 'bg-green-100 text-green-800 border border-green-300' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isInPortfolio('education-allyear') ? '✔ Added' : 'Add to Portfolio'}
            </button>
          </motion.div>
        </div>
      </section>

      {/* Payment Modal */}
      {selectedServiceForPayment && (
        <PaymentModal
          isOpen={isPaymentModalOpen}
          onClose={() => {
            setIsPaymentModalOpen(false)
            setSelectedServiceForPayment(null)
          }}
          serviceTier={selectedServiceForPayment}
        />
      )}
    </div>
  )
}
