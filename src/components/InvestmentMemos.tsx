'use client'

import { motion } from 'framer-motion'
import { DocumentTextIcon, ArrowDownTrayIcon } from '@heroicons/react/24/outline'

interface SampleMemo {
  strategy: string
  title: string
  summary: string
  keyMetrics: {
    targetYield: string
    timeline: string
    riskLevel: string
    allocation: string
  }
  highlights: string[]
  downloadSize: string
}

export default function InvestmentMemos() {
  const sampleMemos: SampleMemo[] = [
    {
      strategy: 'Max Profit',
      title: 'Marina STR Conversion Opportunity',
      summary: 'Detailed analysis of converting a 1BR Marina apartment to short-term rental with renovation upside.',
      keyMetrics: {
        targetYield: '9.5%',
        timeline: '18 months',
        riskLevel: 'High',
        allocation: '10-15%'
      },
      highlights: [
        'STR permit verification and building compliance',
        'Renovation cost breakdown and ROI analysis',
        'Competitive STR analysis and pricing strategy',
        'Exit scenarios and trigger points'
      ],
      downloadSize: '2.4 MB'
    },
    {
      strategy: 'Secure Income',
      title: 'JLT Long-term Rental Portfolio',
      summary: 'Conservative income strategy focusing on stable tenants and predictable cash flows.',
      keyMetrics: {
        targetYield: '5.2%',
        timeline: '5+ years',
        riskLevel: 'Low',
        allocation: '40-60%'
      },
      highlights: [
        'Tenant quality assessment framework',
        'Property management optimization',
        'Market cycle positioning',
        'Income stability stress testing'
      ],
      downloadSize: '1.8 MB'
    },
    {
      strategy: 'Blended Portfolio',
      title: 'Diversified Dubai Property Allocation',
      summary: 'Multi-strategy approach balancing growth and income across different property types and areas.',
      keyMetrics: {
        targetYield: '6.8%',
        timeline: '3-7 years',
        riskLevel: 'Medium',
        allocation: '100%'
      },
      highlights: [
        'Portfolio allocation framework',
        'Risk diversification methodology',
        'Rebalancing triggers and criteria',
        'Performance measurement system'
      ],
      downloadSize: '3.2 MB'
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-green-600 bg-green-50'
      case 'Medium': return 'text-yellow-600 bg-yellow-50'
      case 'High': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Sample Investment Memos
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Detailed investment analysis following our strategy frameworks. 
          See how we evaluate opportunities and structure investments.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-8">
        {sampleMemos.map((memo, index) => (
          <motion.div
            key={memo.strategy}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col h-full"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <DocumentTextIcon className="w-6 h-6 text-blue-600 mr-2" />
                <span className="text-sm font-medium text-blue-600">{memo.strategy} Strategy</span>
              </div>
              <span className={`px-2 py-1 rounded text-xs font-medium ${getRiskColor(memo.keyMetrics.riskLevel)}`}>
                {memo.keyMetrics.riskLevel} Risk
              </span>
            </div>

            {/* Title & Summary */}
            <h3 className="text-lg font-bold text-slate-900 mb-3">
              {memo.title}
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              {memo.summary}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-700">Target Yield</div>
                <div className="font-semibold text-slate-900">{memo.keyMetrics.targetYield}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-700">Timeline</div>
                <div className="font-semibold text-slate-900">{memo.keyMetrics.timeline}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-700">Portfolio Allocation</div>
                <div className="font-semibold text-slate-900">{memo.keyMetrics.allocation}</div>
              </div>
              <div className="bg-slate-50 rounded-lg p-3">
                <div className="text-xs text-slate-700">File Size</div>
                <div className="font-semibold text-slate-900">{memo.downloadSize}</div>
              </div>
            </div>

            {/* Highlights */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-slate-900 mb-2">Key Analysis Points</h4>
              <ul className="space-y-1">
                {memo.highlights.map((highlight, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start">
                    <div className="w-1.5 h-1.5 bg-primary-400 rounded-full mr-2 mt-1.5 flex-shrink-0"></div>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1"></div>

            {/* Download CTA */}
            <button 
              onClick={() => {
                // Simulate PDF download
                const link = document.createElement('a')
                link.href = '#'
                link.download = `${memo.title.replace(/\s+/g, '-').toLowerCase()}-memo.pdf`
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
                alert(`Downloading ${memo.title} memo (${memo.downloadSize})...`)
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-all hover-lift flex items-center justify-center"
            >
              <ArrowDownTrayIcon className="w-4 h-4 mr-2" />
              Download sample memo
            </button>
          </motion.div>
        ))}
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        viewport={{ once: true }}
        className="mt-8 p-4 bg-slate-50 rounded-lg border border-slate-200"
      >
        <p className="text-xs text-slate-600 text-center">
          <strong>Note:</strong> Sample memos are for illustrative purposes only and do not constitute investment advice. 
          All figures are hypothetical. Actual investment memos require client onboarding and risk assessment.
        </p>
      </motion.div>
    </section>
  )
}
