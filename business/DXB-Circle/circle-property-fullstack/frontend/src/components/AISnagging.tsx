import { useState } from 'react'

export default function AISnagging() {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])
  const [analysisResults, setAnalysisResults] = useState<any>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)

  const mockFiles = [
    'Living Room - Overview.jpg',
    'Living Room - Corner Detail.jpg', 
    'Kitchen - Countertop.jpg',
    'Kitchen - Appliances.jpg',
    'Master Bedroom - View.jpg',
    'Master Bathroom - Fixtures.jpg',
    'Balcony - Floor Tiles.jpg',
    'Entrance - Door Frame.jpg'
  ]

  const handleFileUpload = () => {
    setUploadedFiles(mockFiles)
    setTimeout(() => {
      setIsAnalyzing(true)
      setTimeout(() => {
        setIsAnalyzing(false)
        setAnalysisResults({
          totalIssues: 17,
          criticalIssues: 3,
          majorIssues: 8,
          minorIssues: 6,
          roomAnalysis: [
            {
              room: 'Living Room',
              issues: [
                { type: 'Critical', description: 'Paint scratch on main wall (12cm)', location: 'North wall, 1.5m from corner', priority: 'Fix before handover' },
                { type: 'Minor', description: 'Slight gap in baseboards', location: 'East wall near window', priority: 'Schedule within 7 days' }
              ]
            },
            {
              room: 'Kitchen', 
              issues: [
                { type: 'Major', description: 'Cabinet door misalignment', location: 'Upper cabinet #3', priority: 'Fix before handover' },
                { type: 'Major', description: 'Grout discoloration around sink', location: 'Backsplash area', priority: 'Schedule within 3 days' },
                { type: 'Minor', description: 'Drawer handle loose', location: 'Bottom left drawer', priority: 'Schedule within 7 days' }
              ]
            },
            {
              room: 'Master Bedroom',
              issues: [
                { type: 'Minor', description: 'Light switch plate gap', location: 'Entry wall', priority: 'Schedule within 7 days' },
                { type: 'Minor', description: 'Closet door adjustment needed', location: 'Built-in wardrobe', priority: 'Schedule within 7 days' }
              ]
            },
            {
              room: 'Master Bathroom',
              issues: [
                { type: 'Critical', description: 'Tile crack near shower drain', location: 'Shower floor', priority: 'Fix immediately' },
                { type: 'Major', description: 'Faucet water pressure inconsistent', location: 'Main sink', priority: 'Fix before handover' },
                { type: 'Major', description: 'Grout missing in corner', location: 'Shower wall corner', priority: 'Fix before handover' }
              ]
            },
            {
              room: 'Balcony',
              issues: [
                { type: 'Critical', description: 'Loose floor tile (safety hazard)', location: 'Center area near railing', priority: 'Fix immediately' },
                { type: 'Major', description: 'Railing paint chip', location: 'South section of railing', priority: 'Schedule within 3 days' }
              ]
            }
          ],
          costEstimate: {
            critical: 1200,
            major: 2800,
            minor: 450,
            total: 4450
          },
          timeEstimate: '3-5 working days'
        })
      }, 3000)
    }, 1000)
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Fix immediately': return '#dc2626'
      case 'Fix before handover': return '#ca8a04' 
      case 'Schedule within 3 days': return '#ca8a04'
      case 'Schedule within 7 days': return '#2563eb'
      default: return '#1f2937'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return '#dc2626'
      case 'Major': return '#ca8a04'
      case 'Minor': return '#2563eb'
      default: return '#1f2937'
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid #e5e7eb' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>AI-Powered Snagging Report</h2>
      <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Upload handover photos and receive detailed defect analysis organized by room and priority level.
      </p>

      {!uploadedFiles.length ? (
        /* Upload Interface */
        <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed #d1d5db', borderRadius: '0.75rem', background: '#f9fafb' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>Upload Handover Photos</h3>
          <p style={{ color: '#475569', marginBottom: '2rem', fontSize: '0.875rem' }}>
            Drag and drop photos or click to browse. Supports JPG, PNG files up to 10MB each.
          </p>
          <button 
            onClick={handleFileUpload}
            style={{ 
              padding: '0.875rem 2rem', 
              backgroundColor: '#2563eb', 
              color: 'white', 
              border: 'none', 
              borderRadius: '0.5rem', 
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
          >
            Browse Files
          </button>
          <p style={{ color: '#374151', marginTop: '1rem', fontSize: '0.75rem' }}>
            Recommended: 8-12 photos covering all rooms and common areas
          </p>
        </div>
      ) : (
        <div>
          {/* File List */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Uploaded Files ({uploadedFiles.length})</h3>
            <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
              {uploadedFiles.map((file, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0.75rem', 
                  background: '#f9fafb', 
                  borderRadius: '0.5rem',
                  border: '1px solid #e5e7eb' 
                }}>
                  <div style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📷</div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{file}</div>
                    <div style={{ fontSize: '0.75rem', color: '#374151' }}>2.1 MB</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAnalyzing ? (
            /* Analysis in Progress */
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--primary-50)', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>🤖</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937' }}>AI Analysis in Progress</h3>
              <p style={{ color: '#374151', fontSize: '0.875rem' }}>
                Analyzing {uploadedFiles.length} photos for defects and quality issues...
              </p>
              <div style={{ marginTop: '2rem', width: '200px', height: '4px', background: 'var(--primary-200)', borderRadius: '2px', margin: '2rem auto', overflow: 'hidden' }}>
                <div style={{ 
                  width: '40%', 
                  height: '100%', 
                  background: 'var(--primary-600)', 
                  borderRadius: '2px',
                  animation: 'slide 2s infinite'
                }}></div>
              </div>
            </div>
          ) : analysisResults ? (
            /* Analysis Results */
            <div className="fade-in">
              {/* Summary Cards */}
              <div className="grid grid-cols-4" style={{ gap: '1.5rem', marginBottom: '2rem' }}>
                <div style={{ background: 'var(--red-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--red-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: '#991b1b', marginBottom: '0.5rem' }}>Critical Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#dc2626' }}>{analysisResults.criticalIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: '#dc2626' }}>Immediate attention</div>
                </div>
                
                <div style={{ background: 'var(--gold-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--gold-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: '#a16207', marginBottom: '0.5rem' }}>Major Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#ca8a04' }}>{analysisResults.majorIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: '#ca8a04' }}>Before handover</div>
                </div>

                <div style={{ background: 'var(--primary-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: '#1d4ed8', marginBottom: '0.5rem' }}>Minor Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: '#2563eb' }}>{analysisResults.minorIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: '#2563eb' }}>Within 7 days</div>
                </div>

                <div style={{ background: 'var(--success-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--success-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: '#047857', marginBottom: '0.5rem' }}>Est. Cost</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: '#059669' }}>AED {analysisResults.costEstimate.total.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: '#059669' }}>{analysisResults.timeEstimate}</div>
                </div>
              </div>

              {/* Room-by-Room Analysis */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Room-by-Room Analysis</h3>
                
                {analysisResults.roomAnalysis.map((room: any, roomIndex: number) => (
                  <div key={roomIndex} style={{ 
                    marginBottom: '1.5rem',
                    background: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '0.75rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      padding: '1rem 1.5rem',
                      background: '#f9fafb',
                      borderBottom: '1px solid #e5e7eb',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0, color: '#1f2937' }}>{room.room}</h4>
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: '#475569',
                        background: '#e5e7eb',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem'
                      }}>
                        {room.issues.length} issues
                      </span>
                    </div>
                    
                    <div style={{ padding: '1.5rem' }}>
                      {room.issues.map((issue: any, issueIndex: number) => (
                        <div key={issueIndex} style={{ 
                          marginBottom: issueIndex < room.issues.length - 1 ? '1rem' : 0,
                          paddingBottom: issueIndex < room.issues.length - 1 ? '1rem' : 0,
                          borderBottom: issueIndex < room.issues.length - 1 ? '1px solid #f3f4f6' : 'none'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                            <div style={{ flex: 1 }}>
                              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                                <span style={{
                                  fontSize: '0.75rem',
                                  fontWeight: '600',
                                  padding: '0.25rem 0.5rem',
                                  borderRadius: '0.375rem',
                                  color: 'white',
                                  background: getTypeColor(issue.type)
                                }}>
                                  {issue.type}
                                </span>
                                <span style={{ fontSize: '0.875rem', fontWeight: '500', color: '#1f2937' }}>{issue.description}</span>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: '#475569', marginBottom: '0.25rem' }}>
                                📍 {issue.location}
                              </div>
                              <div style={{ 
                                fontSize: '0.75rem',
                                color: getPriorityColor(issue.priority),
                                fontWeight: '500'
                              }}>
                                ⚡ {issue.priority}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Cost Breakdown */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>Cost Breakdown</h3>
                <div style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f9fafb' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>Priority Level</th>
                        <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>Issues</th>
                        <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600', color: '#1f2937' }}>Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: '#dc2626', fontWeight: '500' }}>Critical Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#1f2937', fontWeight: '500' }}>{analysisResults.criticalIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>
                          AED {analysisResults.costEstimate.critical.toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: '#ca8a04', fontWeight: '500' }}>Major Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#1f2937', fontWeight: '500' }}>{analysisResults.majorIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>
                          AED {analysisResults.costEstimate.major.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: '#2563eb', fontWeight: '500' }}>Minor Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right', color: '#1f2937', fontWeight: '500' }}>{analysisResults.minorIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>
                          AED {analysisResults.costEstimate.minor.toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ background: '#f9fafb', borderTop: '2px solid #e5e7eb' }}>
                        <td style={{ padding: '1rem', fontWeight: '600', color: '#1f2937' }}>Total</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600', color: '#1f2937' }}>{analysisResults.totalIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700', fontSize: '1.125rem', color: '#1f2937' }}>
                          AED {analysisResults.costEstimate.total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button 
                  style={{ 
                    padding: '0.875rem 2rem', 
                    backgroundColor: '#2563eb', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '0.5rem', 
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#1d4ed8'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
                >
                  Download PDF Report
                </button>
                <button 
                  style={{ 
                    padding: '0.875rem 2rem', 
                    backgroundColor: 'white', 
                    color: '#374151', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem', 
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.borderColor = '#9ca3af'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.borderColor = '#d1d5db'
                  }}
                >
                  Schedule Site Visit
                </button>
                <button 
                  style={{ 
                    padding: '0.875rem 2rem', 
                    backgroundColor: 'white', 
                    color: '#374151', 
                    border: '1px solid #d1d5db', 
                    borderRadius: '0.5rem', 
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = '#f3f4f6'
                    e.currentTarget.style.borderColor = '#9ca3af'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = 'white'
                    e.currentTarget.style.borderColor = '#d1d5db'
                  }}
                >
                  Share with Contractors
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  )
}
