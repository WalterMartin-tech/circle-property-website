import { useState } from 'react'
import { CpuChipIcon, ChartBarIcon, DocumentMagnifyingGlassIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface AIFeaturesProps {
  focusArea?: 'investment' | 'development' | null
}

export default function AIFeatures({ focusArea = null }: AIFeaturesProps) {
  const [activeFeature, setActiveFeature] = useState<string | null>(null)

  const allFeatures = [
    {
      id: 'yield-realist',
      title: 'AI Yield Realist',
      description: 'Returns net yield range with assumptions and actionable levers',
      icon: ChartBarIcon,
      category: 'analysis',
      focusAreas: ['investment', 'own'],
      demo: {
        input: 'Marina Gate, 2BR, Short-let model',
        output: {
          range: '6.8% - 8.4%',
          confidence: '87%',
          levers: ['Optimize pricing (+0.9%)', 'Reduce vacancy (+1.1%)', 'Premium amenities (+0.7%)'],
          assumptions: ['75% occupancy', '12% management fee', 'AED 8,500 service charge']
        }
      }
    },
    {
      id: 'portfolio-strategist',
      title: 'AI Portfolio Strategist',
      description: 'Proposes model mix, drawdown profile, and exit routes for HNWIs',
      icon: CpuChipIcon,
      category: 'strategy',
      focusAreas: ['investment'],
      demo: {
        input: 'AED 25M ticket, Moderate risk, 5-year horizon',
        output: {
          allocation: '40% Long-let, 35% Short-let, 25% Off-plan',
          drawdown: '24 months staged deployment',
          exits: ['Year 3: Refinance options', 'Year 5: Sale or hold'],
          caution: 'Market cycles may extend timeline by 12-18 months'
        }
      }
    },
    {
      id: 'snagging-checker',
      title: 'AI Snagging Checker',
      description: 'Ingests handover photos and generates room-by-room defect lists',
      icon: DocumentMagnifyingGlassIcon,
      category: 'operations',
      focusAreas: ['development', 'own'],
      demo: {
        input: 'Upload: 24 handover photos, Floor plans',
        output: {
          findings: '17 issues identified across 6 rooms',
          priority: ['Critical: Bathroom waterproofing', 'Medium: Paint touch-ups', 'Low: Minor scratches'],
          timeline: 'Estimated 5-7 days for resolution'
        }
      }
    },
    {
      id: 'dealroom-summarizer',
      title: 'AI Dealroom Summarizer',
      description: 'Converts complex property documents into digestible investment briefs',
      icon: ChatBubbleBottomCenterTextIcon,
      category: 'analysis',
      focusAreas: ['investment', 'development'],
      demo: {
        input: 'Brochure, Masterplan, Service charge tables',
        output: {
          summary: '1-page executive brief generated',
          highlights: ['7.2% projected yield', 'Q2 2026 completion', 'Hotel operator confirmed'],
          gotchas: ['Service charges escalate 5% annually', 'Parking sold separately'],
          nextStep: 'Schedule site visit and legal review'
        }
      }
    }
  ]

  const filteredFeatures = focusArea 
    ? allFeatures.filter(feature => feature.focusAreas.includes(focusArea))
    : allFeatures

  return (
    <section className="py-16 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            AI Intelligence That Matters
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto">
            Not gimmicks. Real decision support powered by institutional-grade data analysis and Dubai market intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredFeatures.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className={`p-6 rounded-xl cursor-pointer transition-all hover-lift ${
                activeFeature === feature.id
                  ? 'bg-primary-600 text-white shadow-xl'
                  : 'bg-white hover:bg-slate-50 border border-slate-200'
              }`}
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <feature.icon className={`w-8 h-8 mb-4 ${
                activeFeature === feature.id ? 'text-white' : 'text-primary-600'
              }`} />
              
              <h3 className={`font-semibold mb-2 ${
                activeFeature === feature.id ? 'text-white' : 'text-slate-900'
              }`}>
                {feature.title}
              </h3>
              
              <p className={`text-sm ${
                activeFeature === feature.id ? 'text-primary-100' : 'text-slate-600'
              }`}>
                {feature.description}
              </p>

              {activeFeature === feature.id && (
                <div className="mt-4 text-xs text-primary-100">
                  Click to see demo →
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Demo Panel */}
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              {(() => {
                const feature = allFeatures.find(f => f.id === activeFeature)
                if (!feature) return null

                return (
                  <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-slate-900 mb-2">
                        {feature.title} Demo
                      </h3>
                      <p className="text-slate-600">
                        See how AI enhances decision-making with real Dubai market data
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {/* Input */}
                      <div className="bg-slate-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-3">Input</h4>
                        <div className="bg-white p-4 rounded border text-slate-700">
                          {feature.demo.input}
                        </div>
                      </div>

                      {/* Output */}
                      <div className="bg-primary-50 p-6 rounded-lg">
                        <h4 className="font-semibold text-slate-900 mb-3">AI Analysis</h4>
                        <div className="space-y-3">
                          {Object.entries(feature.demo.output).map(([key, value]) => (
                            <div key={key} className="bg-white p-3 rounded border">
                              <div className="text-sm font-medium text-slate-700 capitalize mb-1">
                                {key.replace(/([A-Z])/g, ' $1').trim()}
                              </div>
                              <div className="text-slate-600">
                                {Array.isArray(value) ? (
                                  <ul className="text-sm space-y-1">
                                    {value.map((item, index) => (
                                      <li key={index}>• {item}</li>
                                    ))}
                                  </ul>
                                ) : (
                                  <span className="text-sm">{value}</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 text-center">
                      <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                        Try {feature.title}
                      </button>
                    </div>
                  </div>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trust & Transparency */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="bg-slate-800 text-white p-8 rounded-xl max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold mb-4">AI Transparency Promise</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="font-medium mb-2">Data Sources</div>
                <div className="text-slate-300">Dubai Land Department, RERA, Market operators, Our transactions</div>
              </div>
              <div>
                <div className="font-medium mb-2">Model Updates</div>
                <div className="text-slate-300">Monthly recalibration, Quarterly model review, Real-time market feeds</div>
              </div>
              <div>
                <div className="font-medium mb-2">Limitations</div>
                <div className="text-slate-300">Projections not guarantees, Market conditions change, Human oversight required</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
