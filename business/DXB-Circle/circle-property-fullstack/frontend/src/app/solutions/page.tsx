import { Metadata } from 'next'
import ThreeDoorSolutions from '@/components/ThreeDoorSolutions'

export const metadata: Metadata = {
  title: 'Solutions - Beechford Estate Office',
  description: 'Our business model and specialized approaches for HNWI investors, property owners, and developers in Dubai.',
}

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Our Business Model & <span className="gradient-text">Your Fit</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            We specialize in three distinct client types, each with tailored approaches, 
            tools, and service models. Find your pathway to Dubai property success.
          </p>
        </div>
      </section>

      {/* Three-Door Architecture */}
      <ThreeDoorSolutions />

      {/* How We're Different */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why Three Specialized Approaches?
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Different client types have fundamentally different needs, risk profiles, and success metrics. 
              One-size-fits-all doesn't work in Dubai property.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Targeted Expertise</h3>
              <p className="text-slate-600">
                Each pathway has specialized tools, data, and processes designed for specific client objectives and constraints.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Faster Decisions</h3>
              <p className="text-slate-600">
                Pre-filtered information and purpose-built workflows eliminate noise and accelerate your decision-making process.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">Appropriate Discretion</h3>
              <p className="text-slate-600">
                Different client types require different levels of privacy, reporting, and communication protocols.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-Platform Benefits */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="bg-white rounded-xl p-12 shadow-sm border border-slate-200">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">
                Shared Infrastructure, Specialized Delivery
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                All pathways benefit from our institutional-grade infrastructure while receiving 
                service delivery tailored to your specific needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">📊</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Market Intelligence</h4>
                <p className="text-sm text-slate-600">Real-time data, quarterly reports, trend analysis</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🛡️</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Compliance Framework</h4>
                <p className="text-sm text-slate-600">RERA licensing, DET compliance, escrow management</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🤖</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">AI Analytics</h4>
                <p className="text-sm text-slate-600">Automated insights, risk assessment, opportunity scoring</p>
              </div>

              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl">🤝</span>
                </div>
                <h4 className="font-semibold text-slate-900 mb-2">Partner Network</h4>
                <p className="text-sm text-slate-600">Vetted professionals, exclusive access, priority support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
