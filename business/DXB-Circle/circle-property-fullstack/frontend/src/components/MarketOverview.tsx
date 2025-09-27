'use client'

import { motion } from 'framer-motion'
import { ClockIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline'

interface MetricCard {
  title: string
  value: string
  unit: string
  change: string
  trend: 'up' | 'down' | 'neutral'
  timestamp: string
}

export default function MarketOverview() {
  const currentTime = new Date().toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short', 
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Dubai',
    timeZoneName: 'short'
  })

  const metrics: MetricCard[] = [
    {
      title: 'Market Cap Index',
      value: '142.8',
      unit: 'points',
      change: '+2.4% vs last month',
      trend: 'up',
      timestamp: currentTime
    },
    {
      title: 'Average Price/sqft',
      value: '1,654',
      unit: 'AED',
      change: '+0.8% vs last month',
      trend: 'up',
      timestamp: currentTime
    },
    {
      title: 'Median Yield (All Areas)',
      value: '6.4',
      unit: '%',
      change: '+0.5% vs last month',
      trend: 'up',
      timestamp: currentTime
    },
    {
      title: 'Market Velocity',
      value: '23',
      unit: 'days',
      change: '-2 days vs last month',
      trend: 'up',
      timestamp: currentTime
    },
    {
      title: 'Vacancy Rate',
      value: '8.2',
      unit: '%',
      change: '-0.8% vs last month',
      trend: 'up',
      timestamp: currentTime
    },
    {
      title: 'New Supply (Q4)',
      value: '4,200',
      unit: 'units',
      change: '+15% vs Q3',
      trend: 'neutral',
      timestamp: currentTime
    }
  ]

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <ArrowTrendingUpIcon className="w-5 h-5 text-green-600" />
      case 'down':
        return <ArrowTrendingDownIcon className="w-5 h-5 text-red-600" />
      default:
        return <div className="w-5 h-5 bg-slate-400 rounded-full" />
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600'
      case 'down':
        return 'text-red-600'
      default:
        return 'text-slate-600'
    }
  }

  return (
    <section className="mb-12">
      {/* Update Timestamp */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center justify-center mb-8"
      >
        <div className="bg-white rounded-lg px-4 py-2 border border-slate-200 flex items-center">
          <ClockIcon className="w-5 h-5 text-slate-500 mr-2" />
          <span className="text-sm text-slate-600">
            Last updated: {currentTime.replace('GMT+4', 'GST')}
          </span>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-slate-900 text-sm">
                {metric.title}
              </h3>
              {getTrendIcon(metric.trend)}
            </div>

            <div className="mb-3">
              <span className="text-3xl font-bold text-slate-900">
                {metric.value}
              </span>
              <span className="text-lg text-slate-600 ml-2">
                {metric.unit}
              </span>
            </div>

            <div className={`text-sm ${getTrendColor(metric.trend)}`}>
              {metric.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Market Commentary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-200"
      >
        <h3 className="font-semibold text-blue-900 mb-3">What this means</h3>
        <p className="text-blue-800 leading-relaxed">
          The Dubai property market continues to show strong fundamentals with median yields above 5.8% 
          and decreasing vacancy rates. New supply in Q4 is being absorbed well, with market velocity 
          improving to 23 days average. Marina and Downtown areas are leading price appreciation, 
          while emerging areas like Business Bay offer higher yield opportunities.
        </p>
      </motion.div>
    </section>
  )
}
