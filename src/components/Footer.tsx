'use client'

import { useState } from 'react'
import { BuildingOfficeIcon, ShieldCheckIcon, BanknotesIcon, MapPinIcon, PhoneIcon, EnvelopeIcon } from '@heroicons/react/24/outline'
import SubscriptionModal from './SubscriptionModal'

export default function Footer() {
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState(false)

  return (
    <>
      <footer className="bg-slate-900 text-white">
        {/* Main Footer Content */}
        <div className="container mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mb-12">
            
            {/* Company Info */}
            <div>
              <h3 className="text-xl font-bold mb-6">Circle Property</h3>
              <p className="text-slate-300 mb-6 leading-relaxed">
                Evidence-driven Dubai property decisions with transparent economics, 
                one-window execution, and ongoing performance management.
              </p>
              <button
                onClick={() => setIsSubscriptionModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover:shadow-lg"
              >
                Subscribe to Updates
              </button>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li><a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a></li>
                <li><a href="/market-intelligence" className="text-slate-300 hover:text-white transition-colors">Market Intelligence</a></li>
                <li><a href="/strategy-playbooks" className="text-slate-300 hover:text-white transition-colors">Strategy Playbooks</a></li>
                <li><a href="/tools" className="text-slate-300 hover:text-white transition-colors">Tools & Calculators</a></li>
                <li><a href="/services" className="text-slate-300 hover:text-white transition-colors">Services</a></li>
                <li><a href="/case-studies" className="text-slate-300 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="/about" className="text-slate-300 hover:text-white transition-colors">About</a></li>
                <li><a href="/contact" className="text-slate-300 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Services</h4>
              <ul className="space-y-3">
                <li><a href="/services#property-care" className="text-slate-300 hover:text-white transition-colors">Property Management</a></li>
                <li><a href="/services#investment-advisory" className="text-slate-300 hover:text-white transition-colors">Investment Advisory</a></li>
                <li><a href="/services#portfolio-optimization" className="text-slate-300 hover:text-white transition-colors">Portfolio Optimization</a></li>
                <li><a href="/services#market-research" className="text-slate-300 hover:text-white transition-colors">Market Research</a></li>
                <li><a href="/services#due-diligence" className="text-slate-300 hover:text-white transition-colors">Due Diligence</a></li>
                <li><a href="/services#family-office" className="text-slate-300 hover:text-white transition-colors">Family Office Services</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPinIcon className="w-5 h-5 text-slate-600 mr-3 mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-slate-300">Dubai International Financial Centre</p>
                    <p className="text-slate-300 text-sm">DIFC, Dubai, UAE</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <PhoneIcon className="w-5 h-5 text-slate-600 mr-3 flex-shrink-0" />
                  <a href="tel:+971501234567" className="text-slate-300 hover:text-white transition-colors">
                    +971 50 123 4567
                  </a>
                </div>
                <div className="flex items-center">
                  <EnvelopeIcon className="w-5 h-5 text-slate-600 mr-3 flex-shrink-0" />
                  <a href="mailto:partners@circleproperty.com" className="text-slate-300 hover:text-white transition-colors">
                    partners@circleproperty.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 10-Step Transaction Process */}
          <div className="border-t border-slate-700 pt-12 mb-12">
            <h4 className="text-lg font-semibold mb-8 text-center">10-Step Transaction Process</h4>
            <div className="flex flex-wrap justify-center items-center gap-3 mb-12">
              {['Inquiry', 'NDA', 'Due Diligence', 'Offer', 'Legal Review', 'Escrow', 'Registration', 'Handover', 'Management', 'Reporting'].map((step, index, array) => (
                <div key={index} className="flex items-center">
                  <div className="bg-slate-800 text-slate-300 px-3 py-2 rounded-lg text-sm font-medium">
                    {step}
                  </div>
                  {index < array.length - 1 && (
                    <div className="text-slate-500 mx-2">→</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Regulatory Compliance Section */}
          <div className="border-t border-slate-700 pt-12 mb-12">
            <h4 className="text-lg font-semibold mb-8 text-center">Regulatory Compliance & Financial Security</h4>
            <div className="grid md:grid-cols-3 gap-8">
              
              {/* RERA Licensed */}
              <div className="bg-slate-800 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BuildingOfficeIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-bold text-white mb-2">RERA Licensed</h5>
                <div className="text-blue-400 font-semibold mb-2">RERA/DLD/1578/2023</div>
                <p className="text-slate-300 text-sm">Dubai Real Estate Regulatory Authority licensed broker</p>
              </div>

              {/* DET Compliant */}
              <div className="bg-slate-800 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-bold text-white mb-2">DET Compliant</h5>
                <div className="text-green-400 font-semibold mb-2">DET/STL/2023/089</div>
                <p className="text-slate-300 text-sm">Dubai Economy & Tourism registered business</p>
              </div>

              {/* Escrow Protected */}
              <div className="bg-slate-800 rounded-lg p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BanknotesIcon className="w-6 h-6 text-white" />
                </div>
                <h5 className="font-bold text-white mb-2">Escrow Protected</h5>
                <div className="text-purple-400 font-semibold mb-2">ADCB Trust Account</div>
                <p className="text-slate-300 text-sm">Client funds held separately from company accounts</p>
              </div>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="border-t border-slate-700 pt-8">
            <div className="text-center mb-6">
                <p className="text-slate-600 text-sm leading-relaxed max-w-4xl mx-auto">
                <strong className="text-slate-300">Risk Disclosure:</strong> Property investments carry risk of capital loss. 
                Past performance does not predict future results. All yield projections are estimates based on current market 
                conditions and assumptions. Rental income is not guaranteed. Currency fluctuations may affect returns for 
                international investors. Tax implications vary by jurisdiction - seek independent advice.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 text-xs text-slate-600 leading-relaxed">
              <div>
                <h6 className="text-slate-300 font-semibold mb-3">Investment Disclaimers</h6>
                <ul className="space-y-2">
                  <li>• Property values can go down as well as up</li>
                  <li>• Rental yields are estimates and not guaranteed</li>
                  <li>• Market conditions may change without notice</li>
                  <li>• Currency exchange rates may affect returns</li>
                  <li>• Tax treatment depends on individual circumstances</li>
                </ul>
              </div>
              <div>
                <h6 className="text-slate-300 font-semibold mb-3">Service Disclaimers</h6>
                <ul className="space-y-2">
                  <li>• All advice is general and not personal financial advice</li>
                  <li>• Seek independent legal and tax advice before investing</li>
                  <li>• Service fees apply to all advisory services</li>
                  <li>• Performance is subject to market conditions</li>
                  <li>• Third-party services may have additional terms</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800 pt-6 mt-8 text-center">
              <p className="text-slate-300 text-sm">
                © 2025 Circle Property Management LLC. All rights reserved. | 
                <a href="/privacy" className="hover:text-slate-300 transition-colors ml-1">Privacy Policy</a> | 
                <a href="/terms" className="hover:text-slate-300 transition-colors ml-1">Terms of Service</a> | 
                <a href="/cookies" className="hover:text-slate-300 transition-colors ml-1">Cookie Policy</a>
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Website design and development by Circle Property Digital Team. 
                Data provided by multiple sources - see individual pages for attribution.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Subscription Modal */}
      <SubscriptionModal
        isOpen={isSubscriptionModalOpen}
        onClose={() => setIsSubscriptionModalOpen(false)}
      />
    </>
  )
}
