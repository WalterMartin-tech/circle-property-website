'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChartBarIcon, 
  ArrowTrendingUpIcon, 
  ArrowTrendingDownIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'
import { formatCurrency, formatNumber } from '@/utils/formatters'
import ConsultationModal from './ConsultationModal'

interface Property {
  name: string
  type: 'Short-let' | 'Long-let' | 'Hybrid'
  netYield: number
  monthlyNet: number
  occupancy: number
  adr: number
  status: 'Optimized' | 'Stable' | 'Optimizing' | 'Needs Attention'
}

export default function PortfolioCockpit() {
  const [timeRange, setTimeRange] = useState('12M')
  const [selectedProperty, setSelectedProperty] = useState<string | null>(null)
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [consultationType, setConsultationType] = useState('')

  // Dynamic portfolio data based on time range
  const getPortfolioData = (range: string) => {
    const baseData = {
      '3M': {
        totalValue: 42700000,
        totalUnits: 18,
        avgNetYield: 6.8,
        totalNetIncome: 2890000,
        occupancyRate: 84.2,
        avgADR: 465
      },
      '6M': {
        totalValue: 42700000,
        totalUnits: 18,
        avgNetYield: 7.0,
        totalNetIncome: 2980000,
        occupancyRate: 85.7,
        avgADR: 475
      },
      '12M': {
        totalValue: 42700000,
        totalUnits: 18,
        avgNetYield: 7.2,
        totalNetIncome: 3070000,
        occupancyRate: 87.3,
        avgADR: 485
      },
      '24M': {
        totalValue: 42700000,
        totalUnits: 18,
        avgNetYield: 7.5,
        totalNetIncome: 3200000,
        occupancyRate: 89.1,
        avgADR: 495
      }
    }
    return baseData[range as keyof typeof baseData] || baseData['12M']
  }

  const portfolioData = getPortfolioData(timeRange)

  const properties: Property[] = [
    {
      name: 'Marina Gate - 2701',
      type: 'Short-let',
      netYield: 8.4,
      monthlyNet: 24500,
      occupancy: 92,
      adr: 520,
      status: 'Optimized'
    },
    {
      name: 'Downtown Vista - 1205',
      type: 'Long-let',
      netYield: 6.8,
      monthlyNet: 18200,
      occupancy: 100,
      adr: 0,
      status: 'Stable'
    },
    {
      name: 'JBR Residence - 3402',
      type: 'Hybrid',
      netYield: 7.9,
      monthlyNet: 21800,
      occupancy: 85,
      adr: 445,
      status: 'Optimizing'
    },
    {
      name: 'Business Bay Tower - 1801',
      type: 'Short-let',
      netYield: 6.2,
      monthlyNet: 16900,
      occupancy: 78,
      adr: 380,
      status: 'Needs Attention'
    },
    {
      name: 'DIFC Gate - 1504',
      type: 'Long-let',
      netYield: 5.9,
      monthlyNet: 22100,
      occupancy: 100,
      adr: 0,
      status: 'Stable'
    },
    {
      name: 'Palm Jumeirah Villa - A12',
      type: 'Short-let',
      netYield: 9.1,
      monthlyNet: 38500,
      occupancy: 89,
      adr: 850,
      status: 'Optimized'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Optimized': return 'text-green-700 bg-green-100 border-green-200'
      case 'Stable': return 'text-blue-700 bg-blue-100 border-blue-200'
      case 'Optimizing': return 'text-yellow-700 bg-yellow-100 border-yellow-200'
      case 'Needs Attention': return 'text-red-700 bg-red-100 border-red-200'
      default: return 'text-gray-700 bg-gray-100 border-gray-200'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Optimized': return <CheckCircleIcon className="w-4 h-4" />
      case 'Stable': return <CheckCircleIcon className="w-4 h-4" />
      case 'Optimizing': return <ClockIcon className="w-4 h-4" />
      case 'Needs Attention': return <ExclamationTriangleIcon className="w-4 h-4" />
      default: return <CheckCircleIcon className="w-4 h-4" />
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Short-let': return 'bg-purple-100 text-purple-700'
      case 'Long-let': return 'bg-blue-100 text-blue-700'
      case 'Hybrid': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="p-3 bg-blue-100 rounded-lg mr-4">
            <ChartBarIcon className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">Portfolio Cockpit</h3>
            <p className="text-slate-600 text-base">Real-time performance tracking across your property portfolio</p>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {['3M', '6M', '12M', '24M'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                timeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-base text-slate-600 mb-1">Total Value</div>
          <div className="text-xl font-bold text-slate-900">{formatCurrency(portfolioData.totalValue)}</div>
        </div>
        
        <div className="bg-slate-50 p-4 rounded-lg">
          <div className="text-base text-slate-600 mb-1">Total Units</div>
          <div className="text-xl font-bold text-slate-900">{portfolioData.totalUnits}</div>
        </div>
        
        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-base text-green-700 mb-1">Avg Net Yield</div>
          <div className="text-xl font-bold text-green-600 flex items-center">
            {portfolioData.avgNetYield}%
            <ArrowTrendingUpIcon className="w-5 h-5 ml-1" />
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-base text-blue-700 mb-1">Annual Net Income</div>
          <div className="text-xl font-bold text-blue-600">{formatCurrency(portfolioData.totalNetIncome)}</div>
        </div>
        
        <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
          <div className="text-base text-purple-700 mb-1">Occupancy Rate</div>
          <div className="text-xl font-bold text-purple-600">{portfolioData.occupancyRate}%</div>
        </div>
        
        <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
          <div className="text-base text-orange-700 mb-1">Avg ADR</div>
          <div className="text-xl font-bold text-orange-600">{formatCurrency(portfolioData.avgADR)}</div>
        </div>
      </div>

      {/* Property List */}
      <div>
        <h4 className="text-xl font-semibold text-slate-900 mb-4">Property Performance</h4>
        <div className="space-y-3">
          {properties.map((property, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-sm ${
                selectedProperty === property.name 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => setSelectedProperty(
                selectedProperty === property.name ? null : property.name
              )}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div>
                    <div className="font-semibold text-slate-900">{property.name}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(property.type)}`}>
                        {property.type}
                      </span>
                      <span className={`px-2 py-1 rounded text-xs font-medium border flex items-center space-x-1 ${getStatusColor(property.status)}`}>
                        {getStatusIcon(property.status)}
                        <span>{property.status}</span>
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-4 gap-6 text-right">
                  <div>
                    <div className="text-base text-slate-600">Net Yield</div>
                    <div className="text-lg font-semibold text-slate-900 flex items-center justify-end">
                      {property.netYield}%
                      {property.netYield >= 7 ? (
                        <ArrowTrendingUpIcon className="w-5 h-5 ml-1 text-green-500" />
                      ) : (
                        <ArrowTrendingDownIcon className="w-5 h-5 ml-1 text-red-500" />
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-base text-slate-600">Monthly Net</div>
                    <div className="text-lg font-semibold text-slate-900">{formatCurrency(property.monthlyNet)}</div>
                  </div>
                  
                  <div>
                    <div className="text-base text-slate-600">Occupancy</div>
                    <div className="text-lg font-semibold text-slate-900">{property.occupancy}%</div>
                  </div>
                  
                  <div>
                    <div className="text-base text-slate-600">ADR</div>
                    <div className="text-lg font-semibold text-slate-900">
                      {property.adr > 0 ? formatCurrency(property.adr) : 'N/A'}
                    </div>
                  </div>
                </div>
              </div>

              {selectedProperty === property.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-slate-200"
                >
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border border-slate-200">
                      <div className="text-sm text-slate-600 mb-1">Performance Trend</div>
                      <div className="text-green-600 font-medium">+12% vs last quarter</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-slate-200">
                      <div className="text-sm text-slate-600 mb-1">Next Review</div>
                      <div className="text-slate-900 font-medium">Dec 15, 2025</div>
                    </div>
                    
                    <div className="bg-white p-3 rounded border border-slate-200">
                      <div className="text-sm text-slate-600 mb-1">Optimization Score</div>
                      <div className="text-blue-600 font-medium">8.4/10</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 flex space-x-2">
                    <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-all">
                      View Details
                    </button>
                    <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded transition-all">
                      Optimize
                    </button>
                    <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm rounded transition-all">
                      Export Data
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={() => {
              // Simulate report generation
              alert('Generating comprehensive portfolio report... This will be emailed to you within 5 minutes.')
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all hover-lift"
          >
            Generate Portfolio Report
          </button>
          <button 
            onClick={() => {
              setConsultationType('Portfolio Review Scheduling')
              setIsConsultationModalOpen(true)
            }}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Schedule Portfolio Review
          </button>
          <button 
            onClick={() => {
              // Simulate Excel export
              const link = document.createElement('a')
              link.href = '#'
              link.download = `portfolio-analysis-${timeRange.toLowerCase()}.xlsx`
              document.body.appendChild(link)
              link.click()
              document.body.removeChild(link)
              alert(`Exporting portfolio data for ${timeRange} period...`)
            }}
            className="flex-1 border border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50 px-6 py-3 rounded-lg font-medium transition-all"
          >
            Export to Excel
          </button>
        </div>
      </div>

      {/* Performance Insights */}
      <div className="mt-6 bg-slate-50 rounded-lg p-4">
        <h5 className="font-semibold text-slate-900 mb-2">AI Insights</h5>
        <div className="space-y-2 text-sm text-slate-700">
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Your portfolio is outperforming the Dubai market average by 1.8%</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Business Bay Tower shows potential for 15% yield improvement with STR conversion</span>
          </div>
          <div className="flex items-start space-x-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
            <span>Consider rebalancing: 67% short-let vs 33% long-let for optimal risk-return</span>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        consultationType={consultationType}
      />
    </div>
  )
}