import { useState } from 'react'

export default function AbsorptionDashboard() {
  const [selectedProject, setSelectedProject] = useState('marina-heights')

  const projects = {
    'marina-heights': {
      name: 'Marina Heights',
      location: 'Dubai Marina',
      totalUnits: 284,
      leasedUnits: 207,
      avgRent: 847,
      targetCompletion: '95% by Dec 2025'
    },
    'business-central': {
      name: 'Business Central',
      location: 'Business Bay',
      totalUnits: 156,
      leasedUnits: 142,
      avgRent: 623,
      targetCompletion: '98% by Jan 2026'
    }
  }

  const currentProject = projects[selectedProject as keyof typeof projects]
  const absorptionRate = Math.round((currentProject.leasedUnits / currentProject.totalUnits) * 100)
  const remainingUnits = currentProject.totalUnits - currentProject.leasedUnits

  const weeklyData = [
    { week: 'W40', leased: 12, inquiries: 45, viewings: 28, conversion: 42.9 },
    { week: 'W41', leased: 8, inquiries: 38, viewings: 22, conversion: 36.4 },
    { week: 'W42', leased: 15, inquiries: 52, viewings: 34, conversion: 44.1 },
    { week: 'W43', leased: 11, inquiries: 41, viewings: 26, conversion: 42.3 },
    { week: 'W44', leased: 18, inquiries: 58, viewings: 38, conversion: 47.4 },
    { week: 'W45', leased: 14, inquiries: 46, viewings: 31, conversion: 45.2 }
  ]

  const unitTypes = [
    { type: 'Studio', total: 48, leased: 41, avgRent: 3200, demand: 'High' },
    { type: '1BR', total: 125, leased: 98, avgRent: 4800, demand: 'High' },
    { type: '2BR', total: 85, leased: 58, avgRent: 7200, demand: 'Medium' },
    { type: '3BR', total: 26, leased: 10, avgRent: 9500, demand: 'Low' }
  ]

  const leadSources = [
    { source: 'Bayut', leads: 1247, conversions: 89, rate: 7.1, cost: 340 },
    { source: 'Property Finder', leads: 892, conversions: 67, rate: 7.5, cost: 285 },
    { source: 'Dubizzle', leads: 634, conversions: 34, rate: 5.4, cost: 190 },
    { source: 'Direct/Referral', leads: 289, conversions: 48, rate: 16.6, cost: 0 },
    { source: 'Social Media', leads: 156, conversions: 12, rate: 7.7, cost: 145 }
  ]

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--neutral-200)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Absorption Dashboard</h2>
        <select 
          value={selectedProject}
          onChange={(e) => setSelectedProject(e.target.value)}
          className="form-select"
          style={{ width: 'auto', minWidth: '200px' }}
        >
          <option value="marina-heights">Marina Heights</option>
          <option value="business-central">Business Central</option>
        </select>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-4" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--primary-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--primary-700)', marginBottom: '0.5rem' }}>Absorption Rate</div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--primary-600)' }}>{absorptionRate}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)', marginTop: '0.25rem' }}>
            {currentProject.leasedUnits} of {currentProject.totalUnits} units
          </div>
        </div>
        
        <div style={{ background: 'var(--success-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--success-200)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--success-700)', marginBottom: '0.5rem' }}>Avg. Rent/sqft</div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--success-600)' }}>AED {currentProject.avgRent}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>↗ +5.2% vs market</div>
        </div>

        <div style={{ background: 'var(--gold-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--gold-200)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--gold-700)', marginBottom: '0.5rem' }}>Units Remaining</div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--gold-600)' }}>{remainingUnits}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--gold-600)', marginTop: '0.25rem' }}>Est. 3.2 months to 95%</div>
        </div>

        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--neutral-200)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neutral-700)', marginBottom: '0.5rem' }}>Weekly Velocity</div>
          <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--neutral-600)' }}>14</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginTop: '0.25rem' }}>units/week (avg)</div>
        </div>
      </div>

      {/* Absorption Trend Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Weekly Leasing Activity</h3>
        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', height: '280px', position: 'relative' }}>
          <svg width="100%" height="240" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 60, 120, 180, 240].map((y) => (
              <line
                key={y}
                x1="50"
                y1={y}
                x2="100%"
                y2={y}
                stroke="var(--neutral-200)"
                strokeWidth="1"
              />
            ))}
            
            {/* Bars for leased units */}
            {weeklyData.map((data, index) => (
              <g key={index}>
                <rect
                  x={70 + index * 70}
                  y={240 - (data.leased * 12)}
                  width="30"
                  height={data.leased * 12}
                  fill="var(--primary-600)"
                  rx="4"
                />
                <text
                  x={85 + index * 70}
                  y={255}
                  textAnchor="middle"
                  fontSize="12"
                  fill="var(--neutral-600)"
                >
                  {data.week}
                </text>
                <text
                  x={85 + index * 70}
                  y={235 - (data.leased * 12)}
                  textAnchor="middle"
                  fontSize="11"
                  fill="var(--neutral-700)"
                  fontWeight="600"
                >
                  {data.leased}
                </text>
              </g>
            ))}
            
            {/* Conversion rate line */}
            <polyline
              fill="none"
              stroke="var(--success-600)"
              strokeWidth="3"
              points="85,120 155,140 225,100 295,125 365,80 435,95"
            />
            
            {/* Conversion rate points */}
            {weeklyData.map((data, index) => (
              <circle
                key={`conv-${index}`}
                cx={85 + index * 70}
                cy={240 - (data.conversion * 4)}
                r="4"
                fill="var(--success-600)"
              />
            ))}
          </svg>
          
          {/* Legend */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '12px', background: 'var(--primary-600)', borderRadius: '2px' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>Units Leased</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '2px', background: 'var(--success-600)' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>Conversion Rate</span>
            </div>
          </div>
        </div>
      </div>

      {/* Unit Type Performance */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Unit Type Performance</h3>
        <div style={{ background: 'white', border: '1px solid var(--neutral-200)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Unit Type</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Absorption</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Avg. Rent</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Demand</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Progress</th>
              </tr>
            </thead>
            <tbody>
              {unitTypes.map((unit, index) => {
                const absorptionPct = Math.round((unit.leased / unit.total) * 100)
                return (
                  <tr key={index} style={{ borderBottom: index < unitTypes.length - 1 ? '1px solid var(--neutral-100)' : 'none' }}>
                    <td style={{ padding: '1rem', fontWeight: '500' }}>{unit.type}</td>
                    <td style={{ padding: '1rem', textAlign: 'right' }}>
                      <span style={{ fontWeight: '600' }}>{unit.leased}</span>
                      <span style={{ color: 'var(--neutral-500)', fontSize: '0.875rem' }}> / {unit.total}</span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                      AED {unit.avgRent.toLocaleString()}
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <span style={{
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        background: unit.demand === 'High' ? 'var(--success-100)' : 
                                   unit.demand === 'Medium' ? 'var(--gold-100)' : 'var(--neutral-100)',
                        color: unit.demand === 'High' ? 'var(--success-700)' : 
                               unit.demand === 'Medium' ? 'var(--gold-700)' : 'var(--neutral-700)'
                      }}>
                        {unit.demand}
                      </span>
                    </td>
                    <td style={{ padding: '1rem', textAlign: 'center' }}>
                      <div style={{ width: '60px', height: '8px', background: 'var(--neutral-200)', borderRadius: '4px', margin: '0 auto', position: 'relative' }}>
                        <div style={{
                          width: `${absorptionPct}%`,
                          height: '100%',
                          background: absorptionPct >= 90 ? 'var(--success-600)' : absorptionPct >= 70 ? 'var(--gold-600)' : 'var(--primary-600)',
                          borderRadius: '4px'
                        }}></div>
                      </div>
                      <div style={{ fontSize: '0.75rem', marginTop: '0.25rem', color: 'var(--neutral-600)' }}>{absorptionPct}%</div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Sources Analysis */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Lead Source Performance</h3>
        <div style={{ background: 'white', border: '1px solid var(--neutral-200)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Source</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Leads</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Conversions</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Rate</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Cost/Lead</th>
              </tr>
            </thead>
            <tbody>
              {leadSources.map((source, index) => (
                <tr key={index} style={{ borderBottom: index < leadSources.length - 1 ? '1px solid var(--neutral-100)' : 'none' }}>
                  <td style={{ padding: '1rem', fontWeight: '500' }}>{source.source}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>{source.leads.toLocaleString()}</td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>{source.conversions}</td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span style={{ 
                      color: source.rate >= 15 ? 'var(--success-600)' : source.rate >= 7 ? 'var(--gold-600)' : 'var(--neutral-600)',
                      fontWeight: '600'
                    }}>
                      {source.rate}%
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    {source.cost === 0 ? (
                      <span style={{ color: 'var(--success-600)', fontWeight: '600' }}>Free</span>
                    ) : (
                      <span>AED {source.cost}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recommendations */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--primary-50)', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary-900)' }}>Optimization Recommendations</h4>
        <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem', color: 'var(--primary-800)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Increase 3BR marketing budget - low absorption despite high margins</li>
          <li style={{ marginBottom: '0.5rem' }}>Focus referral incentives - highest conversion rate at zero cost</li>
          <li>Consider studio rent adjustment - high demand allows for 8-12% premium pricing</li>
        </ul>
      </div>
    </div>
  )
}
