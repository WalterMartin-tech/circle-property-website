import { Metadata } from 'next'
import ToolsTeaser from '@/components/ToolsTeaser'
import TwoTapYieldEstimator from '@/components/TwoTapYieldEstimator'
import SwitchCostCalculator from '@/components/SwitchCostCalculator'
import AISnaggingTool from '@/components/AISnaggingTool'
import PortfolioCockpit from '@/components/PortfolioCockpit'

export const metadata: Metadata = {
  title: 'Tools & Calculators - Circle Property',
  description: 'Interactive Dubai property calculators including yield estimators, TCO calculators, and portfolio management tools.',
}

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Interactive <span className="gradient-text">Tools & Calculators</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Professional-grade calculators and utilities for Dubai property analysis. 
            Get realistic projections with transparent assumptions and confidence bands.
          </p>
        </div>
      </section>

      {/* Tool Navigation */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Jump to Tool</h2>
            <p className="text-slate-600">Quick navigation to our professional calculators</p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#yield-estimator" className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-all text-sm">
              📊 Yield Estimator
            </a>
            <a href="#switch-calculator" className="px-4 py-2 bg-green-100 hover:bg-green-200 text-green-800 rounded-lg font-medium transition-all text-sm">
              🔄 Switch Calculator
            </a>
            <a href="#ai-snagging" className="px-4 py-2 bg-purple-100 hover:bg-purple-200 text-purple-800 rounded-lg font-medium transition-all text-sm">
              🤖 AI Snagging
            </a>
            <a href="#portfolio-cockpit" className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-all text-sm">
              📈 Portfolio Cockpit
            </a>
          </div>
        </div>
      </section>

      {/* Quick Tools Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Quick Analysis Tools</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get instant insights with our simplified calculators. Perfect for initial screening and quick comparisons.
            </p>
          </div>
          <ToolsTeaser />
        </div>
      </section>

      {/* Professional Tools Section */}
      <section id="professional" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Analysis Tools</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Comprehensive calculators with detailed assumptions, confidence bands, and actionable insights. 
              Each tool is designed for different aspects of Dubai property analysis.
            </p>
          </div>

          {/* Two-Tap Yield Estimator */}
          <div id="yield-estimator" className="mb-24">
            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Two-Tap Yield Estimator</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                Get realistic net yield ranges for any Dubai location with just two selections. 
                Perfect for initial property screening and investment feasibility analysis.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 max-w-4xl mx-auto">
                <h4 className="font-semibold text-blue-900 mb-2">How to Use:</h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Step 1:</strong> Select your target area or specific project from our curated Dubai locations
                  </div>
                  <div>
                    <strong>Step 2:</strong> Choose your investment model (Short-let, Long-let, or Hybrid approach)
                  </div>
                </div>
                <p className="text-sm text-blue-700 mt-3">
                  <strong>Results include:</strong> Net yield range with confidence bands, key performance levers, and transparent assumptions you can review and adjust.
                </p>
              </div>
            </div>
            <TwoTapYieldEstimator />
          </div>

          {/* Switch Cost Calculator */}
          <div id="switch-calculator" className="mb-24">
            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Switch Cost Calculator</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                Calculate the true cost of changing property management companies, including hidden fees, 
                transition costs, and break-even analysis. Essential for optimization decisions.
              </p>
              <div className="bg-green-50 rounded-lg p-4 max-w-4xl mx-auto">
                <h4 className="font-semibold text-green-900 mb-2">How to Use:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-green-800">
                  <div>
                    <strong>Current Provider:</strong> Enter your existing management fees, cleaning costs, and vacancy rates
                  </div>
                  <div>
                    <strong>Comparison:</strong> See Circle Property's optimized model with included services and improved performance
                  </div>
                  <div>
                    <strong>Analysis:</strong> Get break-even timeline, annual savings, and 3-year net benefit projections
                  </div>
                </div>
                <p className="text-sm text-green-700 mt-3">
                  <strong>Perfect for:</strong> Property owners considering management company changes, portfolio optimization, and cost-benefit analysis.
                </p>
              </div>
            </div>
            <SwitchCostCalculator />
          </div>

          {/* AI Snagging Tool */}
          <div id="ai-snagging" className="mb-24">
            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">AI-Powered Snagging Tool</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                Upload property photos for automated defect detection and professional snagging reports. 
                Save time and ensure nothing is missed during handover inspections.
              </p>
              <div className="bg-purple-50 rounded-lg p-4 max-w-4xl mx-auto">
                <h4 className="font-semibold text-purple-900 mb-2">How to Use:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-purple-800">
                  <div>
                    <strong>Upload Photos:</strong> Take 8-12 well-lit photos covering all rooms and common areas
                  </div>
                  <div>
                    <strong>AI Analysis:</strong> Our system automatically detects defects, categorizes by priority, and estimates costs
                  </div>
                  <div>
                    <strong>Professional Report:</strong> Download detailed snagging report with repair timelines and contractor recommendations
                  </div>
                </div>
                <p className="text-sm text-purple-700 mt-3">
                  <strong>Ideal for:</strong> New property handovers, rental turnovers, pre-purchase inspections, and maintenance planning.
                </p>
              </div>
            </div>
            <AISnaggingTool />
          </div>

          {/* Portfolio Cockpit */}
          <div id="portfolio-cockpit" className="mb-12">
            <div className="text-center mb-8">
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Portfolio Cockpit</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-4">
                Comprehensive dashboard for multi-property portfolio management with real-time performance tracking, 
                optimization recommendations, and AI-powered insights for maximum returns.
              </p>
              <div className="bg-blue-50 rounded-lg p-4 max-w-4xl mx-auto">
                <h4 className="font-semibold text-blue-900 mb-2">How to Use:</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm text-blue-800">
                  <div>
                    <strong>Overview Dashboard:</strong> Monitor total portfolio value, average yields, occupancy rates, and income flows
                  </div>
                  <div>
                    <strong>Property Analysis:</strong> Click any property for detailed performance metrics, trends, and optimization scores
                  </div>
                  <div>
                    <strong>AI Insights:</strong> Receive automated recommendations for yield improvement and portfolio rebalancing
                  </div>
                </div>
                <p className="text-sm text-blue-700 mt-3">
                  <strong>Perfect for:</strong> Multi-property owners, family offices, property investment funds, and serious real estate investors.
                </p>
              </div>
            </div>
            <PortfolioCockpit />
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              More Tools Coming Soon
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We're building a comprehensive suite of professional tools for Dubai property analysis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Portfolio Cockpit */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Portfolio Cockpit</h3>
              <p className="text-slate-600 mb-4">
                Comprehensive portfolio management dashboard with performance tracking and optimization recommendations.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>

            {/* Switch Cost Calculator */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🔄</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Switch Cost Calculator</h3>
              <p className="text-slate-600 mb-4">
                Calculate the true cost of switching property management companies, including hidden fees and transition costs.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>

            {/* Absorption Dashboard */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Absorption Dashboard</h3>
              <p className="text-slate-600 mb-4">
                Real-time leasing velocity and market absorption analytics for developers and investors.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>

            {/* AI Snagging Reports */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">AI Snagging Reports</h3>
              <p className="text-slate-600 mb-4">
                Automated property inspection reports using AI-powered analysis for quality assurance.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>

            {/* Market Comparator */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">⚖️</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Market Comparator</h3>
              <p className="text-slate-600 mb-4">
                Side-by-side comparison tool for different Dubai areas, property types, and investment strategies.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>

            {/* Scenario Modeler */}
            <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Scenario Modeler</h3>
              <p className="text-slate-600 mb-4">
                Advanced modeling tool for different market scenarios, stress testing, and sensitivity analysis.
              </p>
              <div className="text-sm text-blue-600 font-medium">Coming Soon</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
