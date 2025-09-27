'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChartBarIcon, DocumentTextIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline'

// Import existing components
import CaseStudyGrid from '@/components/CaseStudyGrid'
import CaseStudyDetail from '@/components/CaseStudyDetail'

export default function TrendsPage() {
  const [selectedCase, setSelectedCase] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const marketInsights = [
    {
      title: 'Q4 2024 Dubai Property Outlook',
      date: 'December 2024',
      summary: 'Market correction expectations and opportunity zones for 2025 investments.',
      tags: ['Market Analysis', 'Forecasting'],
      readTime: '8 min read'
    },
    {
      title: 'Short-Term Rental Regulation Impact',
      date: 'November 2024',
      summary: 'How new STR regulations affect investment yields across different areas.',
      tags: ['STR', 'Regulation'],
      readTime: '12 min read'
    },
    {
      title: 'Off-Plan vs Ready: ROI Analysis',
      date: 'October 2024',
      summary: 'Comprehensive comparison of investment returns across property types.',
      tags: ['Investment Strategy', 'ROI'],
      readTime: '15 min read'
    }
  ]

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Market Trends & Insights</span>
          </h1>
          <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Stay ahead with market analysis, proven case studies, and strategic insights 
            from Dubai's most active property investment advisory.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        {/* Market Insights Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <ArrowTrendingUpIcon className="w-8 h-8 mr-3 text-blue-600" />
              Market Insights & Analysis
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Regular market analysis, trend reports, and strategic insights to keep you informed.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {marketInsights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <ChartBarIcon className="w-6 h-6 text-blue-600 mr-3" />
                  <span className="text-sm text-slate-500">{insight.date}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {insight.title}
                </h3>
                
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {insight.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {insight.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs text-slate-500">{insight.readTime}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-all">
              View All Market Reports
            </button>
          </div>
        </section>

        {/* Case Studies Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4 flex items-center justify-center">
              <DocumentTextIcon className="w-8 h-8 mr-3 text-green-600" />
              Proven Case Studies
            </h2>
            <p className="text-lg text-slate-600 max-w-3xl mx-auto">
              Real investment outcomes from our client portfolio. Verified results with full transparency.
            </p>
          </div>

          {/* Case Studies Grid */}
          <CaseStudyGrid 
            onCaseSelect={(caseStudy) => {
              setSelectedCase(caseStudy)
              setIsModalOpen(true)
            }}
          />

          {/* Case Study Detail Modal */}
          {isModalOpen && selectedCase && (
            <CaseStudyDetail
              caseStudy={selectedCase}
              isOpen={isModalOpen}
              onClose={() => {
                setIsModalOpen(false)
                setSelectedCase(null)
              }}
            />
          )}
        </section>

        {/* Newsletter Signup */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Informed</h2>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Get monthly market insights, new case studies, and investment opportunities 
            delivered to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-slate-900 border-0 focus:ring-2 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all whitespace-nowrap">
              Subscribe
            </button>
          </div>
        </section>
      </div>
    </main>
  )
}
