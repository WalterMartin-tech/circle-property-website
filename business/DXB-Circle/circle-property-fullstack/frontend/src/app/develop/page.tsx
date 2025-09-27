'use client'

import { useState } from 'react'
import AbsorptionDashboard from '@/components/AbsorptionDashboard'
import ConsultationModal from '@/components/ConsultationModal'

export default function DevelopPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Developer Solutions</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Advanced analytics and real-time insights for property developers. 
            Track absorption rates, optimize leasing strategies, and maximize ROI with data-driven decisions.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-blue-600 mb-2">📊</div>
            <h3 className="font-semibold text-slate-900 mb-3">Real-Time Analytics</h3>
            <p className="text-slate-600 text-sm">
              Live absorption rates, conversion tracking, and performance metrics updated in real-time.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-green-600 mb-2">🎯</div>
            <h3 className="font-semibold text-slate-900 mb-3">Lead Source Optimization</h3>
            <p className="text-slate-600 text-sm">
              Track ROI across all marketing channels and optimize your lead generation strategy.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-xl border border-slate-200">
            <div className="text-2xl font-bold text-purple-600 mb-2">⚡</div>
            <h3 className="font-semibold text-slate-900 mb-3">Velocity Insights</h3>
            <p className="text-slate-600 text-sm">
              Weekly leasing velocity, demand analysis by unit type, and forecasting models.
            </p>
          </div>
        </div>

        {/* Absorption Dashboard */}
        <AbsorptionDashboard />

        {/* Additional Developer Tools */}
        <div className="mt-12 bg-white rounded-xl p-8 border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">
            Additional Developer Services
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Marketing & Sales Support</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Sales team training and onboarding</li>
                <li>• Marketing collateral development</li>
                <li>• Digital marketing campaign management</li>
                <li>• Lead qualification and CRM setup</li>
                <li>• Competitive analysis and positioning</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Operational Excellence</h3>
              <ul className="space-y-2 text-slate-600">
                <li>• Handover process optimization</li>
                <li>• Tenant move-in coordination</li>
                <li>• Post-completion support services</li>
                <li>• Revenue optimization strategies</li>
                <li>• Portfolio performance reporting</li>
              </ul>
            </div>
          </div>
          
          <div className="text-center mt-8">
            <button 
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
            >
              Schedule Developer Consultation
            </button>
          </div>
        </div>

        {/* Consultation Modal */}
        <ConsultationModal
          isOpen={isConsultationModalOpen}
          onClose={() => setIsConsultationModalOpen(false)}
          consultationType="Developer Consultation"
        />
      </div>
    </main>
  )
}
