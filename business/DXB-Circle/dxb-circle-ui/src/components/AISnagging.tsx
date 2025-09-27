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
      case 'Fix immediately': return 'var(--red-600)'
      case 'Fix before handover': return 'var(--gold-600)' 
      case 'Schedule within 3 days': return 'var(--gold-600)'
      case 'Schedule within 7 days': return 'var(--primary-600)'
      default: return 'var(--neutral-600)'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Critical': return 'var(--red-600)'
      case 'Major': return 'var(--gold-600)'
      case 'Minor': return 'var(--primary-600)'
      default: return 'var(--neutral-600)'
    }
  }

  return (
    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--neutral-200)' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>AI-Powered Snagging Report</h2>
      <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem', fontSize: '0.875rem' }}>
        Upload handover photos and receive detailed defect analysis organized by room and priority level.
      </p>

      {!uploadedFiles.length ? (
        /* Upload Interface */
        <div style={{ textAlign: 'center', padding: '3rem', border: '2px dashed var(--neutral-300)', borderRadius: '0.75rem', background: 'var(--neutral-50)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📁</div>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Upload Handover Photos</h3>
          <p style={{ color: 'var(--neutral-600)', marginBottom: '2rem', fontSize: '0.875rem' }}>
            Drag and drop photos or click to browse. Supports JPG, PNG files up to 10MB each.
          </p>
          <button 
            onClick={handleFileUpload}
            className="btn btn-primary"
            style={{ padding: '0.875rem 2rem' }}
          >
            Browse Files
          </button>
          <p style={{ color: 'var(--neutral-500)', marginTop: '1rem', fontSize: '0.75rem' }}>
            Recommended: 8-12 photos covering all rooms and common areas
          </p>
        </div>
      ) : (
        <div>
          {/* File List */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Uploaded Files ({uploadedFiles.length})</h3>
            <div className="grid grid-cols-2" style={{ gap: '0.75rem' }}>
              {uploadedFiles.map((file, index) => (
                <div key={index} style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  padding: '0.75rem', 
                  background: 'var(--neutral-50)', 
                  borderRadius: '0.5rem',
                  border: '1px solid var(--neutral-200)' 
                }}>
                  <div style={{ fontSize: '1.5rem', marginRight: '0.75rem' }}>📷</div>
                  <div>
                    <div style={{ fontSize: '0.875rem', fontWeight: '500' }}>{file}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--neutral-500)' }}>2.1 MB</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isAnalyzing ? (
            /* Analysis in Progress */
            <div style={{ textAlign: 'center', padding: '3rem', background: 'var(--primary-50)', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem', animation: 'pulse 2s infinite' }}>🤖</div>
              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem', color: 'var(--primary-800)' }}>AI Analysis in Progress</h3>
              <p style={{ color: 'var(--primary-700)', fontSize: '0.875rem' }}>
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
                  <div style={{ fontSize: '0.875rem', color: 'var(--red-700)', marginBottom: '0.5rem' }}>Critical Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--red-600)' }}>{analysisResults.criticalIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--red-600)' }}>Immediate attention</div>
                </div>
                
                <div style={{ background: 'var(--gold-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--gold-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--gold-700)', marginBottom: '0.5rem' }}>Major Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--gold-600)' }}>{analysisResults.majorIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--gold-600)' }}>Before handover</div>
                </div>

                <div style={{ background: 'var(--primary-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--primary-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--primary-700)', marginBottom: '0.5rem' }}>Minor Issues</div>
                  <div style={{ fontSize: '2.25rem', fontWeight: '700', color: 'var(--primary-600)' }}>{analysisResults.minorIssues}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--primary-600)' }}>Within 7 days</div>
                </div>

                <div style={{ background: 'var(--success-50)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid var(--success-200)' }}>
                  <div style={{ fontSize: '0.875rem', color: 'var(--success-700)', marginBottom: '0.5rem' }}>Est. Cost</div>
                  <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--success-600)' }}>AED {analysisResults.costEstimate.total.toLocaleString()}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--success-600)' }}>{analysisResults.timeEstimate}</div>
                </div>
              </div>

              {/* Room-by-Room Analysis */}
              <div style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Room-by-Room Analysis</h3>
                
                {analysisResults.roomAnalysis.map((room: any, roomIndex: number) => (
                  <div key={roomIndex} style={{ 
                    marginBottom: '1.5rem',
                    background: 'white',
                    border: '1px solid var(--neutral-200)',
                    borderRadius: '0.75rem',
                    overflow: 'hidden'
                  }}>
                    <div style={{ 
                      padding: '1rem 1.5rem',
                      background: 'var(--neutral-50)',
                      borderBottom: '1px solid var(--neutral-200)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center'
                    }}>
                      <h4 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>{room.room}</h4>
                      <span style={{ 
                        fontSize: '0.875rem',
                        color: 'var(--neutral-600)',
                        background: 'var(--neutral-200)',
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
                          borderBottom: issueIndex < room.issues.length - 1 ? '1px solid var(--neutral-100)' : 'none'
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
                                <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{issue.description}</span>
                              </div>
                              <div style={{ fontSize: '0.75rem', color: 'var(--neutral-600)', marginBottom: '0.25rem' }}>
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
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Cost Breakdown</h3>
                <div style={{ background: 'white', border: '1px solid var(--neutral-200)', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: 'var(--neutral-50)' }}>
                        <th style={{ padding: '1rem', textAlign: 'left', fontSize: '0.875rem', fontWeight: '600' }}>Priority Level</th>
                        <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600' }}>Issues</th>
                        <th style={{ padding: '1rem', textAlign: 'right', fontSize: '0.875rem', fontWeight: '600' }}>Est. Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: 'var(--red-600)', fontWeight: '500' }}>Critical Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>{analysisResults.criticalIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                          AED {analysisResults.costEstimate.critical.toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid var(--neutral-100)' }}>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: 'var(--gold-600)', fontWeight: '500' }}>Major Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>{analysisResults.majorIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                          AED {analysisResults.costEstimate.major.toLocaleString()}
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: '1rem' }}>
                          <span style={{ color: 'var(--primary-600)', fontWeight: '500' }}>Minor Issues</span>
                        </td>
                        <td style={{ padding: '1rem', textAlign: 'right' }}>{analysisResults.minorIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>
                          AED {analysisResults.costEstimate.minor.toLocaleString()}
                        </td>
                      </tr>
                      <tr style={{ background: 'var(--neutral-50)', borderTop: '2px solid var(--neutral-200)' }}>
                        <td style={{ padding: '1rem', fontWeight: '600' }}>Total</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '600' }}>{analysisResults.totalIssues}</td>
                        <td style={{ padding: '1rem', textAlign: 'right', fontWeight: '700', fontSize: '1.125rem' }}>
                          AED {analysisResults.costEstimate.total.toLocaleString()}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <button className="btn btn-primary" style={{ padding: '0.875rem 2rem' }}>
                  Download PDF Report
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.875rem 2rem' }}>
                  Schedule Site Visit
                </button>
                <button className="btn btn-secondary" style={{ padding: '0.875rem 2rem' }}>
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
