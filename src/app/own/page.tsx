'use client'

import ServiceOverview from '@/components/ServiceOverview'
import ComprehensiveServices from '@/components/ComprehensiveServices'
import SLACommitments from '@/components/SLACommitments'
import { motion } from 'framer-motion'

export default function OwnPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Property Ownership</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Complete property management solutions for Dubai property owners. 
            From handover to exit, we optimize your investment performance.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Property Management & Services
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Three delivery models to match your preferences: High-touch concierge, 
            Online self-service, or Bespoke consultancy. Clear SLAs and transparent pricing.
          </p>
        </div>

        {/* Service Overview */}
        <ServiceOverview />

        {/* Comprehensive Service Categories */}
        <section className="my-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Detailed Service Catalog</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Build your customized service package from our comprehensive offerings. 
              Add services below to create your tailored solution with transparent pricing.
            </p>
          </div>
          <ComprehensiveServices />
        </section>

        {/* SLA Commitments */}
        <SLACommitments />

        {/* Property Owner Benefits */}
        <section className="mt-16 bg-white rounded-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Why Property Owners Choose Circle
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-semibold text-slate-900 mb-3">Performance Focus</h3>
              <p className="text-slate-600 text-sm">
                Every decision optimized for ROI. Regular performance reviews and yield improvement recommendations.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-semibold text-slate-900 mb-3">Risk Mitigation</h3>
              <p className="text-slate-600 text-sm">
                Proactive maintenance, tenant screening, and compliance management. Insurance coordination included.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-semibold text-slate-900 mb-3">Full Transparency</h3>
              <p className="text-slate-600 text-sm">
                Monthly reports, expense tracking, and market benchmarking. You always know where you stand.
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
