import { useState } from 'react'
import { ChevronDownIcon, InformationCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'

interface YieldEstimatorProps {
  detailed?: boolean
}

export default function YieldEstimator({ detailed = false }: YieldEstimatorProps) {
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [results, setResults] = useState<{
    netYield: { min: number; max: number }
    confidence: number
    levers: string[]
  } | null>(null)

  const dubaiProjects = [
    'Burj Khalifa',
    'Downtown Dubai',
    'Dubai Marina',
    'JBR Beach Residences',
    'Business Bay',
    'DIFC',
    'Palm Jumeirah',
    'Emirates Hills',
    'Arabian Ranches',
    'Dubai Creek Harbour'
  ]

  const lettingModels = [
    { value: 'short-let', label: 'Short-let (1-30 days)', desc: 'Tourism & business travel' },
    { value: 'long-let', label: 'Long-let (12+ months)', desc: 'Residential tenancy' },
    { value: 'hybrid', label: 'Hybrid Model', desc: 'Seasonal optimization' }
  ]

  const assumptions = [
    'Dubai Municipality rates: 5-7% of rental',
    'Occupancy: 75-85% (short-let), 95% (long-let)',
    'Management fees: 10-15% of gross',
    'Service charges included in estimates',
    'Excludes mortgage/financing costs',
    'Based on Q3 2025 market data'
  ]

  const handleCalculate = () => {
    if (!selectedProject || !selectedModel) return

    // Simulate realistic yield calculation
    const baseYields = {
      'short-let': { min: 6.5, max: 9.2 },
      'long-let': { min: 4.2, max: 6.8 },
      'hybrid': { min: 5.8, max: 8.1 }
    }

    const locationMultiplier = selectedProject.includes('Downtown') || selectedProject.includes('Marina') ? 1.1 : 0.95
    const yields = baseYields[selectedModel as keyof typeof baseYields]

    setResults({
      netYield: {
        min: Math.round((yields.min * locationMultiplier) * 10) / 10,
        max: Math.round((yields.max * locationMultiplier) * 10) / 10
      },
      confidence: Math.round(Math.random() * 20 + 75), // 75-95%
      levers: [
        'Optimize pricing strategy (+0.8% yield)',
        'Reduce vacancy gaps (+1.2% yield)',
        'Strategic refurbishments (+1.5% yield)'
      ]
    })
  }

  return (
    <section className={`py-16 ${detailed ? 'bg-white' : 'bg-slate-50'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Two-Tap Yield Estimator
            </h2>
            <p className="text-lg text-slate-600">
              Get realistic net yield ranges with transparent assumptions. No login required.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Input 1: Project Selection */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  1. Select Project/Area
                </label>
                <div className="relative">
                  <select
                    value={selectedProject}
                    onChange={(e) => setSelectedProject(e.target.value)}
                    className="w-full p-4 border border-slate-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Choose a Dubai location...</option>
                    {dubaiProjects.map((project) => (
                      <option key={project} value={project}>
                        {project}
                      </option>
                    ))}
                  </select>
                  <ChevronDownIcon className="absolute right-3 top-4 w-5 h-5 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* Input 2: Letting Model */}
              <div className="space-y-3">
                <label className="block text-sm font-medium text-slate-700">
                  2. Select Letting Model
                </label>
                <div className="space-y-2">
                  {lettingModels.map((model) => (
                    <button
                      key={model.value}
                      onClick={() => setSelectedModel(model.value)}
                      className={`w-full p-4 text-left border rounded-lg transition-all ${
                        selectedModel === model.value
                          ? 'border-primary-500 bg-primary-50 text-primary-900'
                          : 'border-slate-300 hover:border-slate-400'
                      }`}
                    >
                      <div className="font-medium">{model.label}</div>
                      <div className="text-sm text-slate-500">{model.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <div className="mt-8 flex justify-center">
              <button
                onClick={handleCalculate}
                disabled={!selectedProject || !selectedModel}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  selectedProject && selectedModel
                    ? 'bg-primary-600 hover:bg-primary-700 text-white hover-lift'
                    : 'bg-slate-300 text-slate-500 cursor-not-allowed'
                }`}
              >
                Calculate Net Yield
              </button>
            </div>

            {/* Results */}
            <AnimatePresence>
              {results && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-8 p-6 bg-gradient-to-r from-primary-50 to-gold-50 rounded-xl border border-primary-200"
                >
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">
                      Net Yield Estimate
                    </h3>
                    <div className="text-4xl font-bold gradient-text">
                      {results.netYield.min}% - {results.netYield.max}%
                    </div>
                    <p className="text-sm text-slate-600 mt-2">
                      Confidence: {results.confidence}% | Based on {selectedProject}, {selectedModel}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">Optimization Levers</h4>
                      <ul className="space-y-2">
                        {results.levers.map((lever, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="w-2 h-2 bg-gold-400 rounded-full mt-2 flex-shrink-0" />
                            <span className="text-sm text-slate-700">{lever}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <button
                        onClick={() => setShowAssumptions(!showAssumptions)}
                        className="flex items-center space-x-2 text-sm text-primary-600 hover:text-primary-700"
                      >
                        <InformationCircleIcon className="w-4 h-4" />
                        <span>View Assumptions</span>
                      </button>

                      <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors">
                        <DocumentArrowDownIcon className="w-4 h-4" />
                        <span className="text-sm">Email me the working (PDF)</span>
                      </button>
                    </div>
                  </div>

                  <AnimatePresence>
                    {showAssumptions && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 pt-6 border-t border-slate-200"
                      >
                        <h4 className="font-semibold text-slate-900 mb-3">Key Assumptions</h4>
                        <div className="grid md:grid-cols-2 gap-2">
                          {assumptions.map((assumption, index) => (
                            <div key={index} className="text-sm text-slate-600">
                              • {assumption}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
