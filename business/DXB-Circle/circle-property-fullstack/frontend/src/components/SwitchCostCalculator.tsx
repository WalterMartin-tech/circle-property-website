'use client'

import { useState } from 'react'
import { formatNumber, formatCurrency } from '@/utils/formatters'

export default function SwitchCostCalculator() {
  const [currentProvider, setCurrentProvider] = useState({
    managementFee: '15',
    cleaningFee: '150',
    maintenanceFee: '8',
    vacancyRate: '22',
    avgRevenue: '28500'
  })

  const [calculated, setCalculated] = useState(false)

  const calculateSwitchCost = () => {
    setCalculated(true)
  }

  const dxbCircleProvider = {
    managementFee: '12',
    cleaningFee: '120',
    maintenanceFee: '0', // Included
    vacancyRate: '12',
    avgRevenue: '32200' // Higher due to optimization
  }

  const currentAnnualCosts = {
    management: parseFloat(currentProvider.avgRevenue) * 12 * (parseFloat(currentProvider.managementFee) / 100),
    cleaning: parseFloat(currentProvider.cleaningFee) * 24, // Bi-weekly
    maintenance: parseFloat(currentProvider.avgRevenue) * 12 * (parseFloat(currentProvider.maintenanceFee) / 100),
    vacancyLoss: parseFloat(currentProvider.avgRevenue) * 12 * (parseFloat(currentProvider.vacancyRate) / 100)
  }

  const dxbAnnualCosts = {
    management: parseFloat(dxbCircleProvider.avgRevenue) * 12 * (parseFloat(dxbCircleProvider.managementFee) / 100),
    cleaning: parseFloat(dxbCircleProvider.cleaningFee) * 24,
    maintenance: 0, // Included in management fee
    vacancyLoss: parseFloat(dxbCircleProvider.avgRevenue) * 12 * (parseFloat(dxbCircleProvider.vacancyRate) / 100),
    setup: 5000 // One-time setup cost
  }

  const currentTotal = Object.values(currentAnnualCosts).reduce((a, b) => a + b, 0)
  const dxbTotal = Object.values(dxbAnnualCosts).reduce((a, b) => a + b, 0)
  const annualSavings = currentTotal - (dxbTotal - dxbAnnualCosts.setup) // Exclude setup from annual comparison
  const breakEvenMonths = Math.ceil(dxbAnnualCosts.setup / (annualSavings / 12))

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
      <div className="flex items-center mb-6">
        <div className="p-3 bg-green-100 rounded-lg mr-4">
          <span className="text-2xl">🔄</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Switch Cost Calculator</h3>
          <p className="text-slate-800 text-sm">Calculate the true cost of switching property managers</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Current Provider Inputs */}
        <div>
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Current Provider Details</h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Management Fee (%)
              </label>
              <input
                type="text"
                value={currentProvider.managementFee}
                onChange={(e) => setCurrentProvider({...currentProvider, managementFee: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="15"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Cleaning Fee per Visit (AED)
              </label>
              <input
                type="text"
                value={formatNumber(parseFloat(currentProvider.cleaningFee) || 0)}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '')
                  if (!isNaN(Number(value)) || value === '') {
                    setCurrentProvider({...currentProvider, cleaningFee: value})
                  }
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Maintenance Fee (%)
              </label>
              <input
                type="text"
                value={currentProvider.maintenanceFee}
                onChange={(e) => setCurrentProvider({...currentProvider, maintenanceFee: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="8"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Vacancy Rate (%)
              </label>
              <input
                type="text"
                value={currentProvider.vacancyRate}
                onChange={(e) => setCurrentProvider({...currentProvider, vacancyRate: e.target.value})}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="22"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Average Monthly Revenue (AED)
              </label>
              <input
                type="text"
                value={formatNumber(parseFloat(currentProvider.avgRevenue) || 0)}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '')
                  if (!isNaN(Number(value)) || value === '') {
                    setCurrentProvider({...currentProvider, avgRevenue: value})
                  }
                }}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder="28,500"
              />
            </div>
          </div>
        </div>

        {/* DXB Circle Comparison */}
        <div>
          <h4 className="text-lg font-semibold text-slate-900 mb-4">Beechford Estate Office Model</h4>
          <div className="space-y-4">
            <div className="bg-green-50 p-4 rounded-lg border border-green-200">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <div className="text-slate-800">Management Fee</div>
                  <div className="font-semibold text-green-700">{dxbCircleProvider.managementFee}%</div>
                </div>
                <div>
                  <div className="text-slate-800">Cleaning Fee</div>
                  <div className="font-semibold text-green-700">{formatCurrency(dxbCircleProvider.cleaningFee)}</div>
                </div>
                <div>
                  <div className="text-slate-800">Maintenance Fee</div>
                  <div className="font-semibold text-green-700">Included</div>
                </div>
                <div>
                  <div className="text-slate-800">Vacancy Rate</div>
                  <div className="font-semibold text-green-700">{dxbCircleProvider.vacancyRate}%</div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-green-200">
                <div className="text-slate-800 text-sm">Optimized Monthly Revenue</div>
                <div className="font-bold text-green-700 text-lg">{formatCurrency(parseFloat(dxbCircleProvider.avgRevenue))}</div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-900 mb-2">Included Services</h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• 24/7 maintenance coordination</li>
                <li>• Professional photography</li>
                <li>• Dynamic pricing optimization</li>
                <li>• Guest screening & verification</li>
                <li>• Quarterly performance reports</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={calculateSwitchCost}
          className="w-full bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-lg font-medium transition-all hover-lift"
        >
          Calculate Switch Analysis
        </button>
      </div>

      {calculated && (
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {/* Current Costs */}
          <div className="bg-red-50 p-6 rounded-lg border border-red-200">
            <h5 className="font-semibold text-red-900 mb-4">Current Annual Costs</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-700">Management</span>
                <span className="font-medium text-red-900">{formatCurrency(currentAnnualCosts.management)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">Cleaning</span>
                <span className="font-medium text-red-900">{formatCurrency(currentAnnualCosts.cleaning)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">Maintenance</span>
                <span className="font-medium text-red-900">{formatCurrency(currentAnnualCosts.maintenance)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-700">Vacancy Loss</span>
                <span className="font-medium text-red-900">{formatCurrency(currentAnnualCosts.vacancyLoss)}</span>
              </div>
              <div className="border-t border-red-300 pt-2 flex justify-between font-bold">
                <span className="text-red-900">Total</span>
                <span className="text-red-900">{formatCurrency(currentTotal)}</span>
              </div>
            </div>
          </div>

          {/* DXB Circle Costs */}
          <div className="bg-green-50 p-6 rounded-lg border border-green-200">
            <h5 className="font-semibold text-green-900 mb-4">Beechford Estate Office Costs</h5>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-green-700">Management</span>
                <span className="font-medium text-green-900">{formatCurrency(dxbAnnualCosts.management)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Cleaning</span>
                <span className="font-medium text-green-900">{formatCurrency(dxbAnnualCosts.cleaning)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Maintenance</span>
                <span className="font-medium text-green-900">Included</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-700">Vacancy Loss</span>
                <span className="font-medium text-green-900">{formatCurrency(dxbAnnualCosts.vacancyLoss)}</span>
              </div>
              <div className="flex justify-between text-orange-600">
                <span>Setup Cost</span>
                <span className="font-medium text-orange-800">{formatCurrency(dxbAnnualCosts.setup)}</span>
              </div>
              <div className="border-t border-green-300 pt-2 flex justify-between font-bold">
                <span className="text-green-900">Annual Total</span>
                <span className="text-green-900">{formatCurrency(dxbTotal - dxbAnnualCosts.setup)}</span>
              </div>
            </div>
          </div>

          {/* Savings Summary */}
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-4">Switch Analysis</h5>
            <div className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{formatCurrency(annualSavings)}</div>
                <div className="text-sm text-blue-700">Annual Savings</div>
              </div>
              
              <div className="text-center">
                <div className="text-xl font-bold text-blue-600">{breakEvenMonths} months</div>
                <div className="text-sm text-blue-700">Break-even Period</div>
              </div>

              <div className="bg-blue-100 p-3 rounded text-center">
                <div className="text-sm text-blue-800 font-medium">
                  3-Year Net Benefit
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {formatCurrency((annualSavings * 3) - dxbAnnualCosts.setup)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {calculated && (
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all">
            Schedule Consultation
          </button>
          <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-medium transition-all">
            Download Analysis
          </button>
        </div>
      )}
    </div>
  )
}