import { useState } from 'react'

export default function PortfolioCockpit() {
  const [timeRange, setTimeRange] = useState('12M')

  const portfolioData = {
    totalValue: 'AED 42.7M',
    totalUnits: 18,
    avgNetYield: 7.2,
    totalNetIncome: 'AED 3.07M',
    occupancyRate: 87.3,
    avgADR: 485
  }

  const properties = [
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
    }
  ]

  const monthlyTrends = [
    { month: 'Jun', gross: 385000, net: 278500, occupancy: 85 },
    { month: 'Jul', gross: 412000, net: 301200, occupancy: 89 },
    { month: 'Aug', gross: 438000, net: 319700, occupancy: 91 },
    { month: 'Sep', gross: 421000, net: 306300, occupancy: 88 },
    { month: 'Oct', gross: 456000, net: 332800, occupancy: 92 },
    { month: 'Nov', gross: 479000, net: 349700, occupancy: 87 }
  ]

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--neutral-200)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '600', margin: 0 }}>Portfolio Cockpit</h2>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {['6M', '12M', '24M'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.375rem',
                border: '1px solid var(--neutral-200)',
                background: timeRange === range ? 'var(--primary-600)' : 'white',
                color: timeRange === range ? 'white' : 'var(--neutral-600)',
                fontSize: '0.875rem',
                cursor: 'pointer'
              }}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-3" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--neutral-100)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '0.5rem' }}>Portfolio Value</div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--neutral-900)' }}>{portfolioData.totalValue}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>↗ +12.3% YoY</div>
        </div>
        
        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--neutral-100)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '0.5rem' }}>Net Yield (Avg)</div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--primary-600)' }}>{portfolioData.avgNetYield}%</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>↗ +0.8% vs target</div>
        </div>

        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--neutral-100)' }}>
          <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)', marginBottom: '0.5rem' }}>Monthly Net Income</div>
          <div style={{ fontSize: '1.875rem', fontWeight: '700', color: 'var(--success-600)' }}>AED 256K</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-600)', marginTop: '0.25rem' }}>↗ +15.2% vs last month</div>
        </div>
      </div>

      {/* Performance Chart */}
      <div style={{ marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Net vs Gross Revenue Trends</h3>
        <div style={{ background: 'var(--neutral-50)', padding: '1.5rem', borderRadius: '0.75rem', height: '240px', position: 'relative' }}>
          <svg width="100%" height="200" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            {[0, 50, 100, 150, 200].map((y) => (
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
            
            {/* Gross Revenue Line */}
            <polyline
              fill="none"
              stroke="var(--neutral-400)"
              strokeWidth="2"
              strokeDasharray="5,5"
              points="50,80 120,65 190,55 260,60 330,45 400,35"
            />
            
            {/* Net Revenue Line */}
            <polyline
              fill="none"
              stroke="var(--primary-600)"
              strokeWidth="3"
              points="50,120 120,105 190,95 260,100 330,85 400,75"
            />
            
            {/* Data Points */}
            {monthlyTrends.map((_, index) => (
              <g key={index}>
                <circle cx={50 + index * 70} cy={120 - index * 8} r="4" fill="var(--primary-600)" />
                <circle cx={50 + index * 70} cy={80 - index * 8} r="3" fill="var(--neutral-400)" />
              </g>
            ))}
          </svg>
          
          {/* Legend */}
          <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '2px', background: 'var(--primary-600)' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>Net Revenue</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: '12px', height: '2px', background: 'var(--neutral-400)', borderStyle: 'dashed' }}></div>
              <span style={{ fontSize: '0.75rem', color: 'var(--neutral-600)' }}>Gross Revenue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Table */}
      <div>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Property Performance</h3>
        <div style={{ background: 'white', border: '1px solid var(--neutral-200)', borderRadius: '0.75rem', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--neutral-50)', borderBottom: '1px solid var(--neutral-200)' }}>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Property</th>
                <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Type</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Net Yield</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Monthly Net</th>
                <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Occupancy</th>
                <th style={{ padding: '1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', color: 'var(--neutral-700)' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((property, index) => (
                <tr key={index} style={{ borderBottom: index < properties.length - 1 ? '1px solid var(--neutral-100)' : 'none' }}>
                  <td style={{ padding: '1rem' }}>
                    <div style={{ fontWeight: '500', marginBottom: '0.25rem' }}>{property.name}</div>
                  </td>
                  <td style={{ padding: '1rem', fontSize: '0.875rem', color: 'var(--neutral-600)' }}>
                    {property.type}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: property.netYield >= 7 ? 'var(--success-600)' : 'var(--neutral-600)' }}>
                    {property.netYield}%
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                    AED {property.monthlyNet.toLocaleString()}
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'right' }}>
                    <span style={{ 
                      color: property.occupancy >= 90 ? 'var(--success-600)' : property.occupancy >= 80 ? 'var(--gold-600)' : 'var(--red-600)',
                      fontWeight: '500'
                    }}>
                      {property.occupancy}%
                    </span>
                  </td>
                  <td style={{ padding: '1rem', textAlign: 'center' }}>
                    <span style={{
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '500',
                      background: property.status === 'Optimized' ? 'var(--success-100)' : 
                                 property.status === 'Stable' ? 'var(--primary-100)' :
                                 property.status === 'Optimizing' ? 'var(--gold-100)' : 'var(--red-100)',
                      color: property.status === 'Optimized' ? 'var(--success-700)' : 
                             property.status === 'Stable' ? 'var(--primary-700)' :
                             property.status === 'Optimizing' ? 'var(--gold-700)' : 'var(--red-700)'
                    }}>
                      {property.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Action Items */}
      <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--primary-50)', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: 'var(--primary-900)' }}>Recommended Actions</h4>
        <ul style={{ margin: 0, paddingLeft: '1rem', fontSize: '0.875rem', color: 'var(--primary-800)' }}>
          <li style={{ marginBottom: '0.5rem' }}>Business Bay Tower: Adjust pricing strategy to improve occupancy (+15% potential revenue)</li>
          <li style={{ marginBottom: '0.5rem' }}>JBR Residence: Complete staging optimization to achieve 90%+ occupancy target</li>
          <li>Marina Gate: Consider rate increase during peak season (Dec-Mar) for +8% yield improvement</li>
        </ul>
      </div>
    </div>
  )
}
