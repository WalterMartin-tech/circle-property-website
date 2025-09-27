import { useState } from 'react'

interface SwitchCostCalculatorProps {
  onScheduleConsultation?: () => void
}

export default function SwitchCostCalculator({ onScheduleConsultation }: SwitchCostCalculatorProps) {
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
    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--neutral-200)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1.5rem' }}>Switch Cost Calculator</h2>
      <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Compare your current property management costs with DXB Circle's transparent pricing model.
      </p>

      {/* Current Provider Inputs */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Current Provider Details</h3>
        <div className="grid grid-cols-2" style={{ gap: '1.5rem' }}>
          <div className="form-group">
            <label className="form-label">Management Fee (%)</label>
            <input
              type="number"
              className="form-input"
              value={currentProvider.managementFee}
              onChange={(e) => setCurrentProvider({...currentProvider, managementFee: e.target.value})}
              placeholder="15"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Average Monthly Revenue (AED)</label>
            <input
              type="number"
              className="form-input"
              value={currentProvider.avgRevenue}
              onChange={(e) => setCurrentProvider({...currentProvider, avgRevenue: e.target.value})}
              placeholder="28500"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cleaning Cost per Visit (AED)</label>
            <input
              type="number"
              className="form-input"
              value={currentProvider.cleaningFee}
              onChange={(e) => setCurrentProvider({...currentProvider, cleaningFee: e.target.value})}
              placeholder="150"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Vacancy Rate (%)</label>
            <input
              type="number"
              className="form-input"
              value={currentProvider.vacancyRate}
              onChange={(e) => setCurrentProvider({...currentProvider, vacancyRate: e.target.value})}
              placeholder="22"
            />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <button
            onClick={calculateSwitchCost}
            className="btn btn-primary"
            style={{ padding: '0.875rem 2rem' }}
          >
            Calculate Switch Impact
          </button>
        </div>
      </div>

      {calculated && (
        <div className="fade-in">
          {/* Comparison Results */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Annual Cost Comparison</h3>
            
            <div className="grid grid-cols-2" style={{ gap: '2rem' }}>
              {/* Current Provider */}
              <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--neutral-200)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--neutral-700)' }}>Current Provider</h4>
                <div style={{ space: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Management Fee ({currentProvider.managementFee}%)</span>
                    <span>AED {currentAnnualCosts.management.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Cleaning (24x per year)</span>
                    <span>AED {currentAnnualCosts.cleaning.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Maintenance Fee ({currentProvider.maintenanceFee}%)</span>
                    <span>AED {currentAnnualCosts.maintenance.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem' }}>
                    <span>Vacancy Loss ({currentProvider.vacancyRate}%)</span>
                    <span style={{ color: 'var(--red-600)' }}>AED {currentAnnualCosts.vacancyLoss.toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--neutral-300)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span>Total Annual Cost</span>
                    <span>AED {currentTotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* DXB Circle */}
              <div style={{ background: 'var(--primary-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary-700)' }}>DXB Circle</h4>
                <div style={{ space: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Management Fee (12%)</span>
                    <span>AED {dxbAnnualCosts.management.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Cleaning (24x per year)</span>
                    <span>AED {dxbAnnualCosts.cleaning.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Maintenance Fee</span>
                    <span style={{ color: 'var(--success-600)' }}>Included</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.875rem' }}>
                    <span>Vacancy Loss (12%)</span>
                    <span>AED {dxbAnnualCosts.vacancyLoss.toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--gold-600)' }}>
                    <span>Setup Cost (one-time)</span>
                    <span>AED {dxbAnnualCosts.setup.toLocaleString()}</span>
                  </div>
                  <div style={{ borderTop: '1px solid var(--primary-300)', paddingTop: '0.75rem', display: 'flex', justifyContent: 'space-between', fontWeight: '600' }}>
                    <span>Total Annual Cost</span>
                    <span>AED {(dxbTotal - dxbAnnualCosts.setup).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Results */}
          <div style={{ background: 'var(--success-50)', padding: '2rem', borderRadius: '0.75rem', border: '1px solid var(--success-200)', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--success-800)' }}>Switch Impact Analysis</h3>
            
            <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--success-600)', marginBottom: '0.5rem' }}>
                  AED {annualSavings.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--success-700)' }}>Annual Savings</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--primary-600)', marginBottom: '0.5rem' }}>
                  {breakEvenMonths} months
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--neutral-700)' }}>Break-even Period</div>
              </div>
              
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--gold-600)', marginBottom: '0.5rem' }}>
                  +13%
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--neutral-700)' }}>Revenue Improvement</div>
              </div>
            </div>
          </div>

          {/* Transition Timeline */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Transition Timeline</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative' }}>
              {/* Timeline line */}
              <div style={{ 
                position: 'absolute', 
                top: '1rem', 
                left: '2rem', 
                right: '2rem', 
                height: '2px', 
                background: 'var(--neutral-200)' 
              }}></div>
              
              {[
                { week: 'Week 1', task: 'Contract & Setup', color: 'var(--primary-600)' },
                { week: 'Week 2', task: 'Property Audit', color: 'var(--gold-600)' },
                { week: 'Week 3-4', task: 'Listing Transfer', color: 'var(--success-600)' },
                { week: 'Week 5+', task: 'Full Operation', color: 'var(--success-600)' }
              ].map((step, index) => (
                <div key={index} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                  <div style={{ 
                    width: '2rem', 
                    height: '2rem', 
                    borderRadius: '50%', 
                    background: step.color, 
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    marginBottom: '0.75rem',
                    zIndex: 1,
                    position: 'relative'
                  }}>
                    {index + 1}
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>
                      {step.week}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>
                      {step.task}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div style={{ textAlign: 'center', paddingTop: '1.5rem', borderTop: '1px solid var(--neutral-200)' }}>
            <button 
              className="btn btn-primary" 
              style={{ padding: '1rem 2.5rem', fontSize: '1rem' }}
              onClick={onScheduleConsultation}
            >
              Schedule Switch Consultation
            </button>
            <p style={{ fontSize: '0.75rem', color: 'var(--neutral-500)', marginTop: '0.75rem' }}>
              Free 30-minute consultation to plan your transition strategy
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
