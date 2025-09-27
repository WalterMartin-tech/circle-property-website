'use client'

import { useState } from 'react'
import { BuildingOfficeIcon, ChartBarIcon, ShieldCheckIcon, ClockIcon, UserGroupIcon, MapIcon } from '@heroicons/react/24/outline'
import ConsultationModal from '@/components/ConsultationModal'

export default function AboutPage() {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const handleDownloadCredentials = () => {
    // Simulate downloading credentials PDF
    const link = document.createElement('a')
    link.href = '#' // In real app, this would be the credentials PDF URL
    link.download = 'circle-property-credentials-2024.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Show download notification
    alert('Downloading Circle Property Credentials (1.2 MB)...')
  }
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About <span className="gradient-text">Circle Property</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Discreet credibility. Evidence-based decisions. One-window execution.
            Your trusted partner in Dubai's dynamic property market.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-slate-800/50 border border-slate-600 rounded-full text-slate-300 text-sm">
            Est. 2019 • RERA Licensed • DET Compliant
          </div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Our Approach */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto bg-white rounded-xl p-12 border border-slate-200 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Our Approach</h2>
            <div className="space-y-6 text-slate-700 leading-relaxed">
              <p className="text-lg">
                Circle Property was founded on the principle that property investment should be 
                <strong className="text-slate-900"> evidence-driven, not emotion-driven</strong>. We provide 
                institutional-grade analysis with boutique service levels, serving discerning investors 
                who demand transparency and measurable results.
              </p>
              <p className="text-lg">
                Our <strong className="text-slate-900">"one-window" approach</strong> means you work with a single, 
                dedicated team from initial strategy through ongoing portfolio management. No handoffs, 
                no gaps, no surprises. We believe in building long-term relationships based on trust, 
                performance, and absolute discretion.
              </p>
              <p className="text-lg">
                Unlike traditional property consultancies that focus on transaction volume, we optimize for 
                <strong className="text-slate-900"> net returns and capital preservation</strong>. Every recommendation 
                is backed by real-time market data, transparent assumptions, and clear risk assessments.
              </p>
            </div>
          </div>
        </section>

        {/* Core Principles */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Core Principles</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The foundational values that guide every decision and recommendation we make.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Evidence-Based Decisions</h3>
              <p className="text-slate-700 leading-relaxed">
                Every recommendation is supported by real-time market data, transparent methodology, 
                and rigorous analysis. No gut feelings, only facts.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheckIcon className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Absolute Discretion</h3>
              <p className="text-slate-700 leading-relaxed">
                Your privacy is paramount. We operate with the same confidentiality standards 
                as private banking, ensuring complete discretion in all dealings.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <BuildingOfficeIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Long-Term Partnership</h3>
              <p className="text-slate-700 leading-relaxed">
                We're not transaction-focused. Our success is measured by your portfolio's 
                long-term performance and the strength of our ongoing partnership.
              </p>
            </div>
          </div>
        </section>

        {/* Why Dubai Focus */}
        <section className="mb-20">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <MapIcon className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Why We Focus on Dubai</h2>
              <div className="space-y-4 text-slate-700 text-left">
                <p className="text-lg leading-relaxed">
                  <strong className="text-slate-900">Dubai's property market</strong> offers unique opportunities: 
                  zero capital gains tax, freehold ownership for internationals, and some of the world's 
                  highest rental yields. However, it's also complex, fast-moving, and full of pitfalls for the unwary.
                </p>
                <p className="text-lg leading-relaxed">
                  Our <strong className="text-slate-900">Dubai-exclusive focus</strong> means we understand every 
                  nuance: from RERA regulations to developer track records, from visa implications to 
                  neighborhood dynamics. This depth of local expertise is what separates institutional-grade 
                  advice from generic property consultation.
                </p>
                <p className="text-lg leading-relaxed">
                  We've built the most comprehensive real-time database of Dubai property performance, 
                  giving our clients an <strong className="text-slate-900">information advantage</strong> that 
                  translates directly into superior investment outcomes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Team */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals with deep Dubai market knowledge and institutional investment backgrounds.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Managing Director</h3>
              <p className="text-blue-600 font-medium mb-4">Real Estate & Investment Strategy</p>
              <p className="text-slate-700 leading-relaxed">
                15+ years in Dubai property markets, former institutional fund manager. 
                Specialized in high-net-worth portfolio optimization and risk management.
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm text-center">
              <div className="w-20 h-20 bg-slate-200 rounded-full mx-auto mb-6"></div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Head of Research</h3>
              <p className="text-blue-600 font-medium mb-4">Market Intelligence & Analytics</p>
              <p className="text-slate-700 leading-relaxed">
                PhD in Real Estate Economics, former research director at major consultancy. 
                Leads our market intelligence and predictive analytics capabilities.
              </p>
            </div>
          </div>
        </section>

        {/* Credentials & Compliance */}
        <section className="mb-20">
          <div className="bg-white rounded-xl p-12 border border-slate-200 shadow-sm">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Credentials & Compliance</h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Fully licensed and regulated, operating to the highest professional standards.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">RERA Licensed</h3>
                <p className="text-slate-700 text-sm">
                  Real Estate Regulatory Agency licensed broker with full property management authorization.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BuildingOfficeIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">DET Compliant</h3>
                <p className="text-slate-700 text-sm">
                  Dubai Economy & Tourism compliant, with all required business licenses and certifications.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserGroupIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Professional Memberships</h3>
                <p className="text-slate-700 text-sm">
                  Members of key industry associations and professional bodies for ongoing education and standards.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="text-center">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-12 text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Experience the difference of evidence-based property investment with institutional-grade analysis 
              and boutique service levels.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => setIsConsultationModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
              >
                Schedule a Consultation
              </button>
              <button 
                onClick={handleDownloadCredentials}
                className="border-2 border-slate-400 hover:border-slate-200 text-slate-200 hover:text-white bg-slate-800/30 hover:bg-slate-700/50 px-8 py-4 rounded-xl font-semibold text-lg transition-all hover-lift"
              >
                Download Our Credentials
              </button>
            </div>
          </div>
        </section>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType="About - Strategy Consultation"
      />
    </main>
  )
}
