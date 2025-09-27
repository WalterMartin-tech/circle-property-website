import MarketOverview from '@/components/MarketOverview'
import QuarterlyYieldMap from '@/components/QuarterlyYieldMap'
import PriceHeatmap from '@/components/PriceHeatmap'
import RentIndex from '@/components/RentIndex'
import YieldBands from '@/components/YieldBands'
import DaysToLet from '@/components/DaysToLet'
import VoidAnalysis from '@/components/VoidAnalysis'
import DataSources from '@/components/DataSources'
import Methodology from '@/components/Methodology'

export default function MarketIntelligencePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="container mx-auto px-6 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            Market Intelligence
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time Dubai property market data with transparent methodology and actionable insights.
          </p>
        </div>

        {/* Market Overview */}
        <MarketOverview />

        {/* Quarterly Yield Map - Featured */}
        <div className="mb-12">
          <QuarterlyYieldMap />
        </div>

        {/* Data Dashboards Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <PriceHeatmap />
          <RentIndex />
          <YieldBands />
          <DaysToLet />
        </div>

        {/* Void Analysis - Full Width */}
        <VoidAnalysis />

        {/* Data Sources */}
        <DataSources />

        {/* Methodology */}
        <Methodology />
      </div>
    </main>
  )
}
