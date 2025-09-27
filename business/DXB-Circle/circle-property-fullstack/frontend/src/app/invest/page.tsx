'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChartBarIcon, CalculatorIcon, DocumentTextIcon, LightBulbIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

// Import existing components
import MarketOverview from '@/components/MarketOverview'
import PriceHeatmap from '@/components/PriceHeatmap'
import RentIndex from '@/components/RentIndex'
import YieldBands from '@/components/YieldBands'
import VoidAnalysis from '@/components/VoidAnalysis'
import QuarterlyYieldMap from '@/components/QuarterlyYieldMap'
// Import tool components
import TwoTapYieldEstimator from '@/components/TwoTapYieldEstimator'
import SwitchCostCalculator from '@/components/SwitchCostCalculator'
import AISnagging from '@/components/AISnagging'
import PortfolioCockpit from '@/components/PortfolioCockpit'
// Import other components
import QuietListingsVault from '@/components/QuietListingsVault'
import RiskFramework from '@/components/RiskFramework'
import StrategyOverview from '@/components/StrategyOverview'
import InvestmentMemos from '@/components/InvestmentMemos'
import AIFeatures from '@/components/AIFeatures'

export default function InvestPage() {
  const [activeTab, setActiveTab] = useState<'market' | 'tools' | 'strategies' | 'opportunities'>('market')
  const [selectedStrategy, setSelectedStrategy] = useState<any>(null)
  const [isStrategyModalOpen, setIsStrategyModalOpen] = useState(false)

  const tabs = [
    {
      id: 'market' as const,
      name: 'Market Intelligence',
      description: 'Live data, trends & analysis',
      icon: ChartBarIcon,
      count: 'Live Data'
    },
    {
      id: 'tools' as const,
      name: 'Investment Tools',
      description: 'Calculators & utilities',
      icon: CalculatorIcon,
      count: '4 Tools'
    },
    {
      id: 'strategies' as const,
      name: 'Strategy Playbooks',
      description: 'Proven investment approaches',
      icon: DocumentTextIcon,
      count: '6 Strategies'
    },
    {
      id: 'opportunities' as const,
      name: 'Investment Opportunities',
      description: 'Quiet listings & risk management',
      icon: LightBulbIcon,
      count: 'Exclusive'
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="gradient-text">Investment Hub</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Everything you need to make informed Dubai property investments. 
              Live market data, professional tools, and proven strategies in one place.
            </p>
            
            {/* Value Props */}
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: '📊', title: 'Live Market Data', desc: 'Real-time insights' },
                { icon: '🔧', title: 'Professional Tools', desc: 'Yield & TCO calculators' },
                { icon: '📋', title: 'Proven Strategies', desc: 'Investment playbooks' }
              ].map((item, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <h3 className="font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-slate-300 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-white border-b border-slate-200 sticky top-16 z-40">
        <div className="container mx-auto px-6">
          <div className="flex justify-center">
            <div className="flex space-x-1 p-1 bg-slate-100 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <tab.icon className="w-5 h-5 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{tab.name}</div>
                    <div className="text-xs opacity-75">{tab.description}</div>
                  </div>
                  <span className={`ml-3 px-2 py-1 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Market Intelligence Tab */}
        {activeTab === 'market' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Live Market Intelligence</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Real-time Dubai property market data with professional analysis tools. 
                Updated daily with transparent methodology.
              </p>
            </div>

            {/* Market Overview */}
            <MarketOverview />
            
            {/* Quarterly Yield Map */}
            <div className="my-12">
              <QuarterlyYieldMap />
            </div>

            {/* Market Data Grid */}
            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <PriceHeatmap />
              <RentIndex />
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <YieldBands />
              <VoidAnalysis />
            </div>
          </motion.div>
        )}

        {/* Investment Tools Tab */}
        {activeTab === 'tools' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Professional Investment Tools</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Industry-grade calculators with transparent assumptions and confidence bands. 
                Get realistic projections for informed decisions.
              </p>
            </div>

            {/* Tools Navigation */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {[
                { name: '📊 Yield Estimator', anchor: '#yield-estimator' },
                { name: '🔄 Switch Calculator', anchor: '#switch-calculator' },
                { name: '🤖 AI Snagging', anchor: '#ai-snagging' },
                { name: '📈 Portfolio Cockpit', anchor: '#portfolio-cockpit' }
              ].map((tool) => (
                <a
                  key={tool.anchor}
                  href={tool.anchor}
                  className="px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-800 rounded-lg font-medium transition-all text-sm"
                >
                  {tool.name}
                </a>
              ))}
            </div>

            {/* Actual Working Tools */}
            <div className="space-y-16">
              {/* Two-Tap Yield Estimator */}
              <div id="yield-estimator">
                <TwoTapYieldEstimator />
              </div>
              
              {/* Switch Cost Calculator */}
              <div id="switch-calculator">
                <SwitchCostCalculator />
              </div>
              
              {/* AI Snagging Tool */}
              <div id="ai-snagging">
                <AISnagging />
              </div>
              
              {/* Portfolio Cockpit */}
              <div id="portfolio-cockpit">
                <PortfolioCockpit />
              </div>
            </div>

            {/* AI Features Section */}
            <div className="mt-16">
              <AIFeatures />
            </div>
          </motion.div>
        )}

        {/* Strategy Playbooks Tab */}
        {activeTab === 'strategies' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
                📋 Detailed Investment Playbooks
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Comprehensive Strategy Analysis</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Deep-dive into six proven investment strategies with detailed implementation guides, risk assessments, 
                exit criteria, and realistic expectations. Each playbook includes step-by-step execution plans 
                and real-world case studies.
              </p>
              <div className="mt-4 text-sm text-slate-500">
                💡 <em>Click on any strategy below for detailed analysis, timeline, and implementation guide</em>
              </div>
            </div>

            {/* Strategy Overview */}
            <div className="mb-12">
              <StrategyOverview />
            </div>

            {/* Strategy Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {[
                { 
                  name: '💰 Max Profit Strategy', 
                  desc: 'High-growth potential with capital appreciation focus', 
                  risk: 'High', 
                  yield: '8-12%',
                  details: {
                    objective: 'Maximize capital appreciation through high-growth areas and value enhancement',
                    timeline: '2-5 years',
                    requirements: 'AED 5-50M+ investment capacity, risk tolerance for market volatility',
                    approach: 'Target off-plan projects in emerging areas, luxury developments, or renovation opportunities',
                    exitStrategy: 'Sale at peak market conditions or refinancing for portfolio expansion',
                    keyMetrics: ['Capital appreciation: 15-25%/year', 'Target IRR: 18-22%', 'Exit multiple: 1.8-2.5x']
                  }
                },
                { 
                  name: '🛡️ Secure Income Strategy', 
                  desc: 'Stable rental income with proven tenant demand', 
                  risk: 'Low', 
                  yield: '5-7%',
                  details: {
                    objective: 'Generate consistent rental income with minimal vacancy risk',
                    timeline: '5-10+ years',
                    requirements: 'AED 2-20M investment, preference for steady income over capital gains',
                    approach: 'Focus on established areas with strong tenant demand (Business Bay, JLT, etc.)',
                    exitStrategy: 'Long-term hold with periodic refinancing or eventual sale',
                    keyMetrics: ['Net yield: 5-7%', 'Vacancy rate: <5%', 'Tenant retention: 80%+']
                  }
                },
                { 
                  name: '⚡ Quick Flip Strategy', 
                  desc: 'Short-term gains through rapid value enhancement', 
                  risk: 'High', 
                  yield: '15-25%',
                  details: {
                    objective: 'Generate quick profits through renovation and rapid resale',
                    timeline: '6-18 months',
                    requirements: 'AED 3-15M capital, renovation expertise, strong market timing',
                    approach: 'Buy distressed properties, add value through upgrades, sell quickly',
                    exitStrategy: 'Immediate sale upon completion of value-add improvements',
                    keyMetrics: ['Project IRR: 25-40%', 'Renovation ROI: 150-200%', 'Time to exit: 6-12 months']
                  }
                },
                { 
                  name: '🏠 Owner-Occupier Strategy', 
                  desc: 'Live in while building equity and rental income', 
                  risk: 'Medium', 
                  yield: '3-5%',
                  details: {
                    objective: 'Combine personal residence with investment returns',
                    timeline: '3-7 years',
                    requirements: 'AED 3-25M, UAE residency, long-term Dubai commitment',
                    approach: 'Buy larger property, live in part while renting remaining space',
                    exitStrategy: 'Upgrade to larger property or convert to full rental investment',
                    keyMetrics: ['Rental coverage: 40-60% of mortgage', 'Capital appreciation: 5-8%/year', 'Tax benefits maximized']
                  }
                },
                { 
                  name: '⏱️ Value-Add Strategy', 
                  desc: 'Improve property value through targeted upgrades', 
                  risk: 'Medium', 
                  yield: '10-15%',
                  details: {
                    objective: 'Enhance property value through strategic improvements and repositioning',
                    timeline: '2-4 years',
                    requirements: 'AED 4-30M investment, project management capability, market knowledge',
                    approach: 'Acquire properties with improvement potential, execute value-add program',
                    exitStrategy: 'Refinance at higher valuation or sell to value-focused buyers',
                    keyMetrics: ['Value increase: 20-40%', 'Improvement ROI: 200-300%', 'Stabilized yield: 7-9%']
                  }
                },
                { 
                  name: '📈 Portfolio Diversification', 
                  desc: 'Spread risk across multiple property types', 
                  risk: 'Low', 
                  yield: '6-9%',
                  details: {
                    objective: 'Build balanced portfolio across property types and locations',
                    timeline: '5-15 years',
                    requirements: 'AED 10M+ total investment, professional management preference',
                    approach: 'Mix of residential, commercial, off-plan across Dubai submarkets',
                    exitStrategy: 'Portfolio optimization through selective disposal and acquisition',
                    keyMetrics: ['Portfolio yield: 6-9%', 'Risk-adjusted return maximized', 'Geographic/type diversification']
                  }
                }
              ].map((strategy, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="text-lg font-bold text-slate-900 mb-3">{strategy.name}</h3>
                  <p className="text-slate-600 text-sm mb-4">{strategy.desc}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      strategy.risk === 'High' ? 'bg-red-100 text-red-800' :
                      strategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {strategy.risk} Risk
                    </span>
                    <span className="text-sm font-bold text-blue-600">{strategy.yield}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedStrategy(strategy)
                      setIsStrategyModalOpen(true)
                    }}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium hover:underline"
                  >
                    View Detailed Playbook →
                  </button>
                </div>
              ))}
            </div>

            {/* Subtitle Section for Additional Strategy Resources */}
            <div className="text-center mb-16 mt-16">
              <div className="inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-6">
                📚 Sample Investment Memos & Documentation
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Professional Investment Documentation</h3>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Review sample investment memos, due diligence checklists, and documentation templates 
                used in our strategy implementations. These materials demonstrate our systematic approach 
                to investment analysis and decision-making.
              </p>
              <div className="mt-4 text-sm text-slate-500">
                💡 <em>Download templates and see how professional investment decisions are documented and tracked</em>
              </div>
            </div>

            {/* Investment Memos */}
            <div className="mb-12">
              <InvestmentMemos />
            </div>
          </motion.div>
        )}

        {/* Investment Opportunities Tab */}
        {activeTab === 'opportunities' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Investment Opportunities</h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                Access exclusive investment opportunities and comprehensive risk management frameworks.
              </p>
            </div>

            {/* Quiet Listings Vault */}
            <div className="mb-16">
              <QuietListingsVault />
            </div>

            {/* Risk Management Framework */}
            <div className="mb-16">
              <RiskFramework />
            </div>
          </motion.div>
        )}
      </div>

      {/* Strategy Details Modal */}
      {isStrategyModalOpen && selectedStrategy && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setIsStrategyModalOpen(false)}></div>
            <div className="relative bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-2xl font-bold text-slate-900">{selectedStrategy.name}</h3>
                <button
                  onClick={() => setIsStrategyModalOpen(false)}
                  className="text-slate-400 hover:text-slate-600 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-6">
                {/* Objective */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Objective</h4>
                  <p className="text-slate-700">{selectedStrategy.details.objective}</p>
                </div>

                {/* Key Details */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Timeline</h4>
                    <p className="text-slate-700">{selectedStrategy.details.timeline}</p>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900 mb-2">Risk Level</h4>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      selectedStrategy.risk === 'High' ? 'bg-red-100 text-red-800' :
                      selectedStrategy.risk === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {selectedStrategy.risk} Risk
                    </span>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Requirements</h4>
                  <p className="text-slate-700">{selectedStrategy.details.requirements}</p>
                </div>

                {/* Approach */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Investment Approach</h4>
                  <p className="text-slate-700">{selectedStrategy.details.approach}</p>
                </div>

                {/* Exit Strategy */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Exit Strategy</h4>
                  <p className="text-slate-700">{selectedStrategy.details.exitStrategy}</p>
                </div>

                {/* Key Metrics */}
                <div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Key Performance Metrics</h4>
                  <ul className="space-y-2">
                    {selectedStrategy.details.keyMetrics.map((metric: string, index: number) => (
                      <li key={index} className="text-slate-700 flex items-center">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                        {metric}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-6 border-t border-slate-200">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold flex-1">
                    Schedule Strategy Consultation
                  </button>
                  <button className="border border-slate-300 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-semibold flex-1">
                    Download Full Playbook
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
