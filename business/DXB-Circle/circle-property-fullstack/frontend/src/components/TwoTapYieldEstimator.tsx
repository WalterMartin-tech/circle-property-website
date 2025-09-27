'use client'

import { useState } from 'react'
import { ChevronDownIcon, InformationCircleIcon, DocumentArrowDownIcon } from '@heroicons/react/24/outline'
import { motion, AnimatePresence } from 'framer-motion'
import ConsultationModal from './ConsultationModal'

export default function TwoTapYieldEstimator() {
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [isDetailedAnalysisModalOpen, setIsDetailedAnalysisModalOpen] = useState(false)
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

    // Simulate realistic yield calculation based on project and model
    let baseYield = 0
    let confidence = 0
    let levers: string[] = []

    // Project-based yields (realistic Dubai ranges)
    const projectYields: { [key: string]: number } = {
      'Burj Khalifa': 4.2,
      'Downtown Dubai': 5.8,
      'Dubai Marina': 6.4,
      'JBR Beach Residences': 5.9,
      'Business Bay': 7.1,
      'DIFC': 4.8,
      'Palm Jumeirah': 4.5,
      'Emirates Hills': 3.2,
      'Arabian Ranches': 5.5,
      'Dubai Creek Harbour': 6.8
    }

    baseYield = projectYields[selectedProject] || 5.5

    // Model adjustments
    if (selectedModel === 'short-let') {
      baseYield *= 1.4 // STR premium
      confidence = 72
      levers = ['Occupancy optimization', 'Seasonal pricing', 'Guest experience']
    } else if (selectedModel === 'long-let') {
      baseYield *= 1.0 // Base rate
      confidence = 89
      levers = ['Tenant quality', 'Lease terms', 'Property condition']
    } else if (selectedModel === 'hybrid') {
      baseYield *= 1.2 // Hybrid premium
      confidence = 78
      levers = ['Seasonal switching', 'Market timing', 'Dual setup costs']
    }

    setResults({
      netYield: {
        min: Math.round((baseYield * 0.85) * 10) / 10,
        max: Math.round((baseYield * 1.15) * 10) / 10
      },
      confidence,
      levers
    })
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-blue-100 rounded-lg mr-4">
          <span className="text-2xl">⚡</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Two-Tap Yield Estimator</h3>
          <p className="text-slate-600 text-sm">Quick yield ranges with confidence bands</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Project Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            1. Select Project/Area
          </label>
          <select 
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-900 bg-white"
            value={selectedProject}
            onChange={(e) => setSelectedProject(e.target.value)}
          >
            <option value="">Choose a Dubai location...</option>
            {dubaiProjects.map((project) => (
              <option key={project} value={project}>{project}</option>
            ))}
          </select>
        </div>

        {/* Model Selection */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            2. Select Investment Model
          </label>
          <div className="space-y-3">
            {lettingModels.map((model) => (
              <div
                key={model.value}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  selectedModel === model.value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onClick={() => setSelectedModel(model.value)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-slate-900">{model.label}</div>
                    <div className="text-sm text-slate-600">{model.desc}</div>
                  </div>
                  <div className={`w-4 h-4 rounded-full border-2 ${
                    selectedModel === model.value
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-slate-300'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={handleCalculate}
          disabled={!selectedProject || !selectedModel}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white px-6 py-4 rounded-lg font-medium transition-all hover-lift disabled:cursor-not-allowed"
        >
          Calculate Yield Range
        </button>

        {/* Results */}
        <AnimatePresence>
          {results && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-50 rounded-lg p-6 border border-blue-200"
            >
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {results.netYield.min}% - {results.netYield.max}%
                </div>
                <div className="text-sm text-blue-700 mb-4">Net Yield Range</div>
                <div className="flex items-center justify-center space-x-2">
                  <div className="text-sm text-slate-600">Confidence:</div>
                  <div className="bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                    {results.confidence}%
                  </div>
                </div>
              </div>

              <div className="border-t border-blue-200 pt-4">
                <div className="text-sm font-medium text-slate-900 mb-2">Key Performance Levers:</div>
                <div className="space-y-1">
                  {results.levers.map((lever, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      <span className="text-sm text-slate-700">{lever}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Assumptions Toggle */}
        <div>
          <button
            onClick={() => setShowAssumptions(!showAssumptions)}
            className="flex items-center space-x-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <InformationCircleIcon className="w-4 h-4" />
            <span>View Assumptions</span>
            <ChevronDownIcon className={`w-4 h-4 transition-transform ${showAssumptions ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showAssumptions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-3 p-4 bg-slate-50 rounded-lg border border-slate-200"
              >
                <div className="text-sm font-medium text-slate-900 mb-2">Key Assumptions:</div>
                <ul className="space-y-1">
                  {assumptions.map((assumption, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-start space-x-2">
                      <span className="text-slate-600">•</span>
                      <span>{assumption}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Save Results */}
        {results && (
          <div className="border-t border-slate-200 pt-6">
            <div className="flex flex-col sm:flex-row gap-3">
              <button 
                onClick={() => {
                  // Create results summary for email
                  const resultsSummary = `
Yield Calculation Results:
- Project: ${selectedProject}
- Unit Type: ${selectedModel}
- Net Yield Range: ${results.netYield.min}% - ${results.netYield.max}%
- Confidence Level: ${results.confidence}%
- Key Performance Levers:
${results.levers.map(lever => `  • ${lever}`).join('\n')}

Generated by Circle Property Tools
                  `.trim()
                  
                  // Simulate emailing results
                  const mailtoLink = `mailto:?subject=Dubai Property Yield Analysis Results&body=${encodeURIComponent(resultsSummary)}`
                  window.open(mailtoLink, '_blank')
                  
                  // Also show a confirmation
                  alert('Results prepared for email! Your default email client should open with the results.')
                }}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all"
              >
                <DocumentArrowDownIcon className="w-4 h-4 inline mr-2" />
                Save & Email Results
              </button>
              <button 
                onClick={() => setIsDetailedAnalysisModalOpen(true)}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all"
              >
                Get Detailed Analysis
              </button>
            </div>
          </div>
        )}

        {/* Detailed Analysis Modal */}
        <ConsultationModal
          isOpen={isDetailedAnalysisModalOpen}
          onClose={() => setIsDetailedAnalysisModalOpen(false)}
          consultationType="Detailed Yield Analysis Request"
        />
      </div>
    </div>
  )
}
