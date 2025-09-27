'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { InformationCircleIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'
import ConsultationModal from './ConsultationModal'

interface YieldData {
  area: string
  currentYield: number
  previousYield: number
  confidence: number
  trend: 'up' | 'down' | 'stable'
  properties: number
  avgPrice: number
  coordinates: { x: number; y: number }
}

export default function QuarterlyYieldMap() {
  const [selectedArea, setSelectedArea] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'yield' | 'confidence' | 'trend'>('yield')
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  const yieldData: YieldData[] = [
    {
      area: 'Downtown Dubai',
      currentYield: 5.8,
      previousYield: 5.6,
      confidence: 92,
      trend: 'up',
      properties: 1247,
      avgPrice: 1850,
      coordinates: { x: 45, y: 55 }
    },
    {
      area: 'Dubai Marina',
      currentYield: 6.4,
      previousYield: 6.2,
      confidence: 89,
      trend: 'up',
      properties: 2156,
      avgPrice: 1420,
      coordinates: { x: 25, y: 45 }
    },
    {
      area: 'Business Bay',
      currentYield: 7.1,
      previousYield: 7.3,
      confidence: 85,
      trend: 'down',
      properties: 1834,
      avgPrice: 1280,
      coordinates: { x: 50, y: 60 }
    },
    {
      area: 'JBR',
      currentYield: 5.9,
      previousYield: 5.8,
      confidence: 88,
      trend: 'up',
      properties: 892,
      avgPrice: 1650,
      coordinates: { x: 20, y: 40 }
    },
    {
      area: 'DIFC',
      currentYield: 4.8,
      previousYield: 4.9,
      confidence: 94,
      trend: 'stable',
      properties: 567,
      avgPrice: 2100,
      coordinates: { x: 42, y: 52 }
    },
    {
      area: 'Palm Jumeirah',
      currentYield: 4.5,
      previousYield: 4.3,
      confidence: 91,
      trend: 'up',
      properties: 423,
      avgPrice: 2850,
      coordinates: { x: 15, y: 50 }
    },
    {
      area: 'Dubai Creek Harbour',
      currentYield: 6.8,
      previousYield: 6.5,
      confidence: 78,
      trend: 'up',
      properties: 1156,
      avgPrice: 1380,
      coordinates: { x: 65, y: 45 }
    },
    {
      area: 'Arabian Ranches',
      currentYield: 5.5,
      previousYield: 5.4,
      confidence: 86,
      trend: 'up',
      properties: 734,
      avgPrice: 1950,
      coordinates: { x: 70, y: 75 }
    }
  ]

  const getYieldColor = (yieldValue: number) => {
    if (yieldValue >= 7) return 'bg-red-500'
    if (yieldValue >= 6) return 'bg-orange-500'
    if (yieldValue >= 5) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'bg-green-500'
    if (confidence >= 80) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  const getTrendColor = (trend: string) => {
    if (trend === 'up') return 'bg-green-500'
    if (trend === 'down') return 'bg-red-500'
    return 'bg-gray-500'
  }

  const getMarkerColor = (area: YieldData) => {
    switch (viewMode) {
      case 'yield':
        return getYieldColor(area.currentYield)
      case 'confidence':
        return getConfidenceColor(area.confidence)
      case 'trend':
        return getTrendColor(area.trend)
      default:
        return 'bg-blue-500'
    }
  }

  const selectedAreaData = yieldData.find(area => area.area === selectedArea)

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Q3 2025 Dubai Yield Map</h3>
          <p className="text-slate-600">Interactive yield analysis by area with confidence indicators</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-slate-500">
          <InformationCircleIcon className="w-4 h-4" />
          <span>Updated: Sep 15, 2025</span>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div className="flex space-x-2 mb-6">
        {[
          { key: 'yield', label: 'Yield %', desc: 'Current net yields' },
          { key: 'confidence', label: 'Confidence', desc: 'Data reliability' },
          { key: 'trend', label: 'Trend', desc: 'Quarter-over-quarter' }
        ].map((mode) => (
          <button
            key={mode.key}
            onClick={() => setViewMode(mode.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              viewMode === mode.key
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Map Visualization */}
        <div className="lg:col-span-2">
          <div className="relative bg-slate-50 rounded-lg p-6 h-96 overflow-hidden">
            {/* Simplified Dubai Map Background */}
            <div className="absolute inset-0 opacity-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {/* Coastline */}
                <path
                  d="M0,40 Q20,35 40,40 Q60,45 80,40 Q90,35 100,40 L100,100 L0,100 Z"
                  fill="#3b82f6"
                  opacity="0.3"
                />
                {/* Major roads */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="#64748b" strokeWidth="0.5" />
                <line x1="0" y1="60" x2="100" y2="60" stroke="#64748b" strokeWidth="0.3" />
                <line x1="45" y1="0" x2="45" y2="100" stroke="#64748b" strokeWidth="0.3" />
              </svg>
            </div>

            {/* Area Markers */}
            {yieldData.map((area) => (
              <motion.div
                key={area.area}
                className={`absolute w-4 h-4 rounded-full cursor-pointer transform -translate-x-2 -translate-y-2 ${getMarkerColor(area)} ${
                  selectedArea === area.area ? 'ring-4 ring-blue-300 scale-125' : 'hover:scale-110'
                }`}
                style={{
                  left: `${area.coordinates.x}%`,
                  top: `${area.coordinates.y}%`
                }}
                onClick={() => setSelectedArea(area.area)}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 text-white text-xs rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                  {area.area}: {viewMode === 'yield' ? `${area.currentYield}%` : viewMode === 'confidence' ? `${area.confidence}%` : area.trend}
                </div>
              </motion.div>
            ))}

            {/* Legend */}
            <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-sm border border-slate-200">
              <div className="text-xs font-medium text-slate-900 mb-2">
                {viewMode === 'yield' ? 'Yield Range' : viewMode === 'confidence' ? 'Confidence Level' : 'Trend Direction'}
              </div>
              <div className="space-y-1">
                {viewMode === 'yield' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">4-5%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">5-6%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">6-7%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">7%+</span>
                    </div>
                  </>
                )}
                {viewMode === 'confidence' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">90%+</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">80-90%</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">&lt;80%</span>
                    </div>
                  </>
                )}
                {viewMode === 'trend' && (
                  <>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Increasing</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Stable</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs text-slate-600">Decreasing</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Area Details */}
        <div>
          {selectedAreaData ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-50 rounded-lg p-6"
            >
              <h4 className="text-lg font-bold text-slate-900 mb-4">{selectedAreaData.area}</h4>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Current Yield</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-slate-900">{selectedAreaData.currentYield}%</span>
                    {selectedAreaData.trend === 'up' ? (
                      <ArrowTrendingUpIcon className="w-4 h-4 text-green-500" />
                    ) : selectedAreaData.trend === 'down' ? (
                      <ArrowTrendingDownIcon className="w-4 h-4 text-red-500" />
                    ) : (
                      <div className="w-4 h-4 bg-gray-400 rounded-full"></div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Previous Quarter</span>
                  <span className="font-medium text-slate-700">{selectedAreaData.previousYield}%</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Confidence Level</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-16 bg-slate-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getConfidenceColor(selectedAreaData.confidence)}`}
                        style={{ width: `${selectedAreaData.confidence}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{selectedAreaData.confidence}%</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Sample Size</span>
                  <span className="font-medium text-slate-700">{selectedAreaData.properties.toLocaleString()} properties</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-slate-600">Avg Price/sqft</span>
                  <span className="font-medium text-slate-700">AED {selectedAreaData.avgPrice.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200">
                <button 
                  onClick={() => setIsConsultationModalOpen(true)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-all text-sm hover:shadow-lg active:scale-95"
                >
                  Get Detailed Area Report
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="bg-slate-50 rounded-lg p-6 text-center">
              <div className="text-slate-600 mb-2">
                <svg className="w-12 h-12 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm8 0a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V8zm0 4a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1v-2z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-slate-600 text-sm">Click on any area marker to view detailed yield analysis</p>
            </div>
          )}
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">6.2%</div>
            <div className="text-sm text-slate-600">Market Average</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">+0.3%</div>
            <div className="text-sm text-slate-600">QoQ Change</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">87%</div>
            <div className="text-sm text-slate-600">Avg Confidence</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-slate-900">9,009</div>
            <div className="text-sm text-slate-600">Total Properties</div>
          </div>
        </div>
      </div>

      {/* Consultation Modal for Detailed Area Report */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType={`Detailed Area Report - ${selectedArea ? yieldData.find(d => d.area === selectedArea)?.area : 'Dubai Area'}`}
      />
    </div>
  )
}
