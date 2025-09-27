import ServiceOverview from '@/components/ServiceOverview'
import ServiceTiers from '@/components/ServiceTiers'
import SLACommitments from '@/components/SLACommitments'
import ServicePricing from '@/components/ServicePricing'
import ComprehensiveServices from '@/components/ComprehensiveServices'

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Services & Delivery Models
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Three delivery models to match your preferences: High-touch concierge, 
            Online self-service, or Bespoke consultancy. Clear SLAs and transparent pricing.
          </p>
        </div>

        {/* Service Overview */}
        <ServiceOverview />

        {/* Service Tiers */}
        <ServiceTiers />

        {/* Comprehensive Service Categories from Original Website */}
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

        {/* Pricing */}
        <ServicePricing />
      </div>
    </main>
  )
}
