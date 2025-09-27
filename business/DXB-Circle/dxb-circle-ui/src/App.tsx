import { useState } from 'react'
import PortfolioCockpit from './components/PortfolioCockpit'
import SwitchCostCalculator from './components/SwitchCostCalculator'
import AbsorptionDashboard from './components/AbsorptionDashboard'
import AISnagging from './components/AISnagging'

type ModalType = 'consultation' | 'quietAccess' | 'emailAnalysis' | 'detailedInfo' | 'switchConsultation' | 'registration' | 'payment' | null

interface UserProfile {
  name: string
  email: string
  phone: string
  investorType: string
  isRegistered: boolean
}

function App() {
  const [activeSection, setActiveSection] = useState<'home' | 'invest' | 'own' | 'develop' | 'services' | 'trends'>('home')
  const [selectedProject, setSelectedProject] = useState('')
  const [selectedModel, setSelectedModel] = useState('')
  const [results, setResults] = useState<{
    netYield: { min: number; max: number }
    confidence: number
  } | null>(null)
  
  // Modal and user registration state
  const [activeModal, setActiveModal] = useState<ModalType>(null)
  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    investorType: '',
    isRegistered: false
  })
  const [expandedIntel, setExpandedIntel] = useState<string | null>(null)
  const [showAssumptions, setShowAssumptions] = useState(false)
  const [servicePortfolio, setServicePortfolio] = useState<Array<{
    id: string
    name: string
    price: number
    category: string
  }>>([])
  const [showPortfolio, setShowPortfolio] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    investorType: '',
    ticketSize: '',
    assetPreferences: '',
    preferredDate: '',
    preferredTime: '',
    contactMethod: '',
    message: ''
  })

  const dubaiProjects = [
    'Burj Khalifa', 'Downtown Dubai', 'Dubai Marina', 'JBR Beach Residences',
    'Business Bay', 'DIFC', 'Palm Jumeirah', 'Emirates Hills', 'Arabian Ranches'
  ]

  const lettingModels = [
    { 
      value: 'short-let', 
      label: 'Short-term Rental', 
      desc: 'Tourism & business travel (1-30 days)',
      icon: '🏨'
    },
    { 
      value: 'long-let', 
      label: 'Long-term Rental', 
      desc: 'Residential tenancy (12+ months)',
      icon: '🏠'
    },
    { 
      value: 'hybrid', 
      label: 'Hybrid Strategy', 
      desc: 'Seasonal optimization model',
      icon: '📊'
    }
  ]

  const handleCalculate = () => {
    if (!selectedProject || !selectedModel) return

    const baseYields = {
      'short-let': { min: 6.5, max: 9.2 },
      'long-let': { min: 4.2, max: 6.8 },
      'hybrid': { min: 5.8, max: 8.1 }
    }

    const locationMultiplier = selectedProject.includes('Downtown') || selectedProject.includes('Marina') ? 1.1 : 0.95
    const yields = baseYields[selectedModel as keyof typeof baseYields]

    setResults({
      netYield: {
        min: Math.round((yields.min * locationMultiplier) * 10) / 10,
        max: Math.round((yields.max * locationMultiplier) * 10) / 10
      },
      confidence: Math.round(Math.random() * 20 + 75)
    })
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Register user if not already registered
    if (!userProfile.isRegistered) {
      setUserProfile({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        investorType: formData.investorType,
        isRegistered: true
      })
    }

    // Show success message and close modal
    alert(`Thank you ${formData.name}! Your request has been submitted. We'll contact you within 24 hours.`)
    setActiveModal(null)
    
    // Reset form data
    setFormData({
      name: '',
      email: '',
      phone: '',
      investorType: '',
      ticketSize: '',
      assetPreferences: '',
      preferredDate: '',
      preferredTime: '',
      message: ''
    })
  }

  const openModal = (modalType: ModalType) => {
    // For registration modal, don't pre-fill (it's the registration itself)
    if (modalType === 'registration') {
      setActiveModal(modalType)
      return
    }
    
    // Payment modal should work without registration (guest checkout)
    if (modalType === 'payment') {
      setActiveModal(modalType)
      return
    }
    
    // If user is not registered and it's not registration/payment modal, open registration first
    if (!userProfile.isRegistered) {
      setActiveModal('registration')
      return
    }
    
    // Pre-fill form if user is registered
    if (userProfile.isRegistered) {
      setFormData(prev => ({
        ...prev,
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        investorType: userProfile.investorType
      }))
    }
    setActiveModal(modalType)
  }

  const scrollToCalculator = () => {
    const calculatorElement = document.querySelector('.yield-calculator')
    if (calculatorElement) {
      calculatorElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const addToPortfolio = (service: { id: string; name: string; price: number; category: string }) => {
    const exists = servicePortfolio.find(item => item.id === service.id)
    if (!exists) {
      setServicePortfolio([...servicePortfolio, service])
    }
  }

  const getAdjustedPortfolio = () => {
    // Check for bundle conflicts and hierarchical service conflicts
    const bundles = servicePortfolio.filter(item => item.category === 'Bundle')
    const services = servicePortfolio.filter(item => item.category !== 'Bundle')
    
    let adjustedServices = [...services]
    let conflictInfo = []

    // Check Property Owner Elite bundle conflicts
    const ownerEliteBundle = bundles.find(b => b.id === 'owner-elite')
    if (ownerEliteBundle) {
      const conflictingServices = services.filter(s => 
        ['property-professional', 'keys-ultra', 'snagging-professional', 'welcome-service'].includes(s.id)
      )
      if (conflictingServices.length > 0) {
        adjustedServices = adjustedServices.filter(s => 
          !['property-professional', 'keys-ultra', 'snagging-professional', 'welcome-service'].includes(s.id)
        )
        conflictInfo.push({
          bundle: 'Property Owner Elite',
          includedServices: conflictingServices.map(s => s.name)
        })
      }
    }

    // Check hierarchical education service conflicts (All-Year includes Comprehensive)
    const allYearEducation = services.find(s => s.id === 'education-allyear')
    if (allYearEducation) {
      const hierarchicalConflicts = services.filter(s => 
        ['education-consultation', 'education-application', 'education-comprehensive'].includes(s.id)
      )
      if (hierarchicalConflicts.length > 0) {
        adjustedServices = adjustedServices.filter(s => 
          !['education-consultation', 'education-application', 'education-comprehensive'].includes(s.id)
        )
        conflictInfo.push({
          bundle: 'Education - All-Year Support',
          includedServices: hierarchicalConflicts.map(s => s.name)
        })
      }
    }

    // Check Comprehensive education conflicts (includes Consultation + Application)
    const comprehensiveEducation = services.find(s => s.id === 'education-comprehensive')
    if (comprehensiveEducation && !allYearEducation) {
      const lowerTierConflicts = services.filter(s => 
        ['education-consultation', 'education-application'].includes(s.id)
      )
      if (lowerTierConflicts.length > 0) {
        adjustedServices = adjustedServices.filter(s => 
          !['education-consultation', 'education-application'].includes(s.id)
        )
        conflictInfo.push({
          bundle: 'Education - Comprehensive',
          includedServices: lowerTierConflicts.map(s => s.name)
        })
      }
    }

    return {
      services: adjustedServices,
      bundles,
      conflicts: conflictInfo,
      adjustedTotal: [...adjustedServices, ...bundles].reduce((total, item) => total + item.price, 0)
    }
  }

  const isInPortfolio = (serviceId: string) => {
    return servicePortfolio.some(item => item.id === serviceId)
  }

  const removeFromPortfolio = (serviceId: string) => {
    setServicePortfolio(servicePortfolio.filter(item => item.id !== serviceId))
  }

  const getPortfolioTotal = () => {
    return servicePortfolio.reduce((total, service) => total + service.price, 0)
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* Premium Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">Circle Property</div>
            <nav className="nav">
              <a href="#" className={`nav-item ${activeSection === 'home' ? 'active' : ''}`} onClick={() => setActiveSection('home')}>
                Home
              </a>
              <a href="#" className={`nav-item ${activeSection === 'invest' ? 'active' : ''}`} onClick={() => setActiveSection('invest')}>
                Invest
              </a>
              <a href="#" className={`nav-item ${activeSection === 'own' ? 'active' : ''}`} onClick={() => setActiveSection('own')}>
                Own
              </a>
              <a href="#" className={`nav-item ${activeSection === 'develop' ? 'active' : ''}`} onClick={() => setActiveSection('develop')}>
                Develop
              </a>
              <a href="#" className={`nav-item ${activeSection === 'services' ? 'active' : ''}`} onClick={() => setActiveSection('services')}>
                Services
              </a>
              <a href="#" className={`nav-item ${activeSection === 'trends' ? 'active' : ''}`} onClick={() => setActiveSection('trends')}>
                Trends
              </a>
            </nav>
            <div className="header-cta">
              {!userProfile.isRegistered && (
                <button className="subscribe-btn" onClick={() => openModal('registration')}>
                  Subscribe to Updates
                </button>
              )}
              {userProfile.isRegistered && (
                <span className="user-greeting">Welcome, {userProfile.name.split(' ')[0]}</span>
              )}
              <a href="mailto:partners@dxbcircle.com" className="contact-link">
                Contact Partner
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Service Portfolio Dropdown */}
      {showPortfolio && activeSection === 'services' && (
        <div className="portfolio-dropdown">
          <div className="container">
            <div className="portfolio-content">
              <div className="portfolio-header">
                <h3>Service Portfolio</h3>
                <button className="portfolio-close" onClick={() => setShowPortfolio(false)}>×</button>
              </div>
              
              {servicePortfolio.length === 0 ? (
                <div className="portfolio-empty">
                  <p>Your service portfolio is empty</p>
                  <p>Add services from the categories below to create a customized package</p>
                </div>
              ) : (
                <>
                  <div className="portfolio-items">
                    {servicePortfolio.map((service) => (
                      <div key={service.id} className="portfolio-item">
                        <div className="item-info">
                          <span className="item-name">{service.name}</span>
                          <span className="item-category">{service.category}</span>
                        </div>
                        <div className="item-price">
                          {service.price > 0 ? `AED ${service.price.toLocaleString()}` : 'Bespoke Quote'}
                        </div>
                        <button 
                          className="item-remove"
                          onClick={() => removeFromPortfolio(service.id)}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="portfolio-summary">
                    <div className="portfolio-total">
                      <span>Total: AED {getPortfolioTotal().toLocaleString()}</span>
                      {servicePortfolio.some(s => s.price === 0) && (
                        <span className="bespoke-note">+ Bespoke items</span>
                      )}
                    </div>
                    <div className="portfolio-actions">
                      <button className="btn btn-primary" onClick={() => openModal('consultation')}>
                        Request Consultation
                      </button>
                      <button className="btn btn-ghost" onClick={() => setServicePortfolio([])}>
                        Clear Portfolio
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {activeSection === 'home' && (
        <main>
          {/* Premium Hero Section */}
          <section className="hero">
            <div className="container">
              <div className="hero-content">
                <h1 className="fade-in">
                  Private-market property.<br />
                  <span className="gradient-text">Boutique access. Institutional discipline.</span>
                </h1>
                <p className="hero-subtitle slide-up">
                  We optimise <em style={{ color: 'var(--gold-500)', fontStyle: 'normal', fontWeight: '600' }}>net</em> yield, not clicks. 
                  Dubai, end-to-end, discreet.
                </p>
                <div className="hero-ctas">
                  <div className="hero-cta">
                    <div className="hero-cta-icon">📊</div>
                    <h3>Realistic Yield Analysis</h3>
                    <p>Two-tap calculator with confidence bands and transparent assumptions</p>
                    <a href="#" className="hero-cta-link" onClick={(e) => { e.preventDefault(); scrollToCalculator(); }}>Start Analysis →</a>
                  </div>
                  <div className="hero-cta">
                    <div className="hero-cta-icon">🔒</div>
                    <h3>Quiet Listings</h3>
                    <p>Invite-only opportunities with NDA-protected access</p>
                    <a href="#" className="hero-cta-link" onClick={(e) => { e.preventDefault(); openModal('quietAccess'); }}>Request Access →</a>
                  </div>
                  <div className="hero-cta">
                    <div className="hero-cta-icon">🤝</div>
                    <h3>Partner Consultation</h3>
                    <p>30-minute strategy session with senior partners</p>
                    <a href="#" className="hero-cta-link" onClick={(e) => { e.preventDefault(); openModal('consultation'); }}>Schedule Now →</a>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Premium Yield Estimator */}
          <section className="section">
            <div className="container">
              <div className="section-header">
                <h2>Two-Tap Yield Estimator</h2>
                <p>Get realistic net yield ranges with transparent assumptions. No login required.</p>
              </div>
              
              <div className="yield-calculator">
                <div className="grid grid-cols-2" style={{ gap: '3rem', marginBottom: '3rem' }}>
                  <div className="form-group">
                    <label className="form-label">1. Select Project/Area</label>
                    <select className="form-select" value={selectedProject} onChange={(e) => setSelectedProject(e.target.value)}>
                      <option value="">Choose a Dubai location...</option>
                      {dubaiProjects.map((project) => (
                        <option key={project} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">2. Select Investment Model</label>
                    <div className="model-selector">
                      {lettingModels.map((model) => (
                        <div
                          key={model.value}
                          onClick={() => setSelectedModel(model.value)}
                          className={`model-option ${selectedModel === model.value ? 'selected' : ''}`}
                        >
                          <h4>{model.icon} {model.label}</h4>
                          <p>{model.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="text-center mb-8">
                  <button
                    onClick={handleCalculate}
                    disabled={!selectedProject || !selectedModel}
                    className={`btn ${selectedProject && selectedModel ? 'btn-primary' : 'btn-secondary'}`}
                    style={{
                      padding: '1.25rem 3rem',
                      fontSize: '1rem',
                      opacity: selectedProject && selectedModel ? 1 : 0.6,
                      cursor: selectedProject && selectedModel ? 'pointer' : 'not-allowed'
                    }}
                  >
                    Calculate Net Yield
        </button>
                </div>

                {results && (
                  <div className="result-box fade-in">
                    <h3 className="text-xl font-semibold mb-4">Net Yield Estimate</h3>
                    <div className="result-yield">
                      {results.netYield.min}% - {results.netYield.max}%
                    </div>
                    <p className="text-sm opacity-80 mb-6">
                      Confidence: {results.confidence}% | Based on {selectedProject}, {selectedModel}
                    </p>
                    
                    <div className="assumptions-section">
                      <button 
                        className="assumptions-toggle"
                        onClick={() => setShowAssumptions(!showAssumptions)}
                      >
                        <span>View Assumptions</span>
                        <span className={`arrow ${showAssumptions ? 'expanded' : ''}`}>▼</span>
                      </button>
                      
                      {showAssumptions && (
                        <div className="assumptions-dropdown">
                          <h4>Key Assumptions</h4>
                          <div className="assumptions-grid">
                            <div className="assumption-item">
                              <span className="assumption-label">Occupancy Rate:</span>
                              <span className="assumption-value">85%+ (Premium management)</span>
      </div>
                            <div className="assumption-item">
                              <span className="assumption-label">Pricing Strategy:</span>
                              <span className="assumption-value">Premium positioning vs market</span>
                            </div>
                            <div className="assumption-item">
                              <span className="assumption-label">Management Quality:</span>
                              <span className="assumption-value">Professional 24/7 service</span>
                            </div>
                            <div className="assumption-item">
                              <span className="assumption-label">Service Charges:</span>
                              <span className="assumption-value">AED 12-15/sqft annually</span>
                            </div>
                            <div className="assumption-item">
                              <span className="assumption-label">Maintenance Reserve:</span>
                              <span className="assumption-value">8% of gross rental income</span>
                            </div>
                            <div className="assumption-item">
                              <span className="assumption-label">Vacancy Buffer:</span>
                              <span className="assumption-value">15-20 days between tenants</span>
                            </div>
                          </div>
                          <div className="methodology-note">
                            <p><strong>Methodology:</strong> Based on 24-month rolling average of comparable properties in target areas, adjusted for current market conditions and property-specific factors.</p>
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center">
                      <button className="btn btn-primary" onClick={() => openModal('emailAnalysis')}>
                        Email Detailed Analysis (PDF)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* Premium Three Door Architecture */}
          <section className="section dark-section">
            <div className="container">
              <div className="section-header">
                <h2>
                  Choose Your <span className="gradient-text">Entry Point</span>
                </h2>
                <p>Three specialized pathways, each designed for different objectives and risk profiles.</p>
              </div>

              <div className="grid grid-cols-3">
                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setActiveSection('invest')}>
                  <div className="feature-icon">💼</div>
                  <h3>INVEST</h3>
                  <p className="text-sm opacity-80 mb-4">HNWI / Family Offices</p>
                  <p className="mb-6">Private market allocation with institutional rigor</p>
                </div>

                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setActiveSection('own')}>
                  <div className="feature-icon">🏢</div>
                  <h3>OWN</h3>
                  <p className="text-sm opacity-80 mb-4">Property Owners</p>
                  <p className="mb-6">Net yield optimization, not gross revenue theater</p>
                </div>

                <div className="card" style={{ cursor: 'pointer' }} onClick={() => setActiveSection('develop')}>
                  <div className="feature-icon">🏗️</div>
                  <h3>DEVELOP</h3>
                  <p className="text-sm opacity-80 mb-4">Developers</p>
                  <p className="mb-6">Lease-up acceleration and post-handover QA</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {activeSection === 'invest' && (
        <main>
          <div className="page-hero">
            <div className="container">
              <h1>Investment Opportunities</h1>
              <p>Curated private market opportunities for sophisticated investors seeking institutional-grade due diligence with boutique execution.</p>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
                <h2>Quiet Listings Vault</h2>
                <p style={{ marginBottom: '2rem' }}>Invite-only opportunities. NDA first, teasers second.</p>
                <div style={{ background: 'var(--neutral-50)', padding: '2rem', borderRadius: '0.5rem', marginBottom: '2rem' }}>
                  <h3>Dubai Creek Harbour - Branded Residences</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '700' }}>AED 12.5M</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>2BR Penthouse</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.25rem', fontWeight: '600', color: 'var(--success-600)' }}>7.2% Est. Net Yield</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--neutral-600)' }}>Q2 2026 Handover</div>
                    </div>
                  </div>
                  <button className="btn btn-primary" onClick={() => openModal('detailedInfo')}>Request Detailed Information</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {activeSection === 'own' && (
        <main>
          <div className="page-hero">
            <div className="container">
              <h1>Property Ownership</h1>
              <p>Maximize net yield through data-driven optimization, transparent reporting, and institutional-grade property management services.</p>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div className="feature-grid">
                <PortfolioCockpit />
              </div>
              
              <div style={{ marginTop: '3rem' }}>
                <SwitchCostCalculator onScheduleConsultation={() => openModal('switchConsultation')} />
              </div>
            </div>
          </div>
        </main>
      )}

      {activeSection === 'develop' && (
        <main>
          <div className="page-hero">
            <div className="container">
              <h1>Development Solutions</h1>
              <p>Accelerate lease-up, ensure quality handovers, and optimize post-completion performance with AI-powered analytics.</p>
            </div>
          </div>

          <div className="section">
            <div className="container">
              <div style={{ marginBottom: '3rem' }}>
                <AbsorptionDashboard />
              </div>
              
              <div>
                <AISnagging />
              </div>
            </div>
          </div>
        </main>
      )}

      {activeSection === 'services' && (
        <main>
          <div className="page-hero">
            <div className="container">
              <h1>Premium Services & Transparent Pricing</h1>
              <p>Comprehensive property and lifestyle management for discerning clients. Clear pricing, exceptional service standards, guaranteed outcomes.</p>
              
              {/* Trust Signals Bar */}
              <div className="trust-signals">
                <div className="trust-metric">
                  <span className="metric-value">92%</span>
                  <span className="metric-label">Occupancy Maintained</span>
                </div>
                <div className="trust-metric">
                  <span className="metric-value">AED 2.3M+</span>
                  <span className="metric-label">Client Savings</span>
                </div>
                <div className="trust-metric">
                  <span className="metric-value">&lt;48hr</span>
                  <span className="metric-label">Avg Response</span>
                </div>
              </div>

              {/* Service Portfolio Section */}
              <div className="service-portfolio-section">
                <div className="portfolio-header-section">
                  <h2>My Service Portfolio</h2>
                  <p>Build your customized service package. Add services below to create your tailored solution.</p>
                </div>

                {servicePortfolio.length > 0 && (() => {
                  const adjusted = getAdjustedPortfolio()
                  return (
                    <div className="portfolio-summary-card">
                      <div className="portfolio-items-grid">
                        {adjusted.services.map((service) => (
                          <div key={service.id} className="portfolio-item-card">
                            <span className="item-name">{service.name}</span>
                            <span className="item-price">
                              {service.price > 0 ? `AED ${service.price.toLocaleString()}` : 'Bespoke Quote'}
                            </span>
                            <button onClick={() => removeFromPortfolio(service.id)} className="item-remove">×</button>
                          </div>
                        ))}
                        {adjusted.bundles.map((bundle) => (
                          <div key={bundle.id} className="portfolio-item-card bundle-item">
                            <span className="item-name">{bundle.name}</span>
                            <span className="item-price">
                              {bundle.price > 0 ? `AED ${bundle.price.toLocaleString()}` : 'Bespoke Quote'}
                            </span>
                            <button onClick={() => removeFromPortfolio(bundle.id)} className="item-remove">×</button>
                          </div>
                        ))}
                      </div>

                      {adjusted.conflicts.length > 0 && (
                        <div className="conflict-notice">
                          <h4>Package Optimizations:</h4>
                          {adjusted.conflicts.map((conflict, index) => (
                            <p key={index}>
                              <strong>{conflict.bundle}</strong> includes: {conflict.includedServices.join(', ')}
                              <span className="savings-note"> (Duplicate charges removed)</span>
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="portfolio-total-section">
                        <div className="total-display">
                          <span className="total-label">Total Investment:</span>
                          <span className="total-amount">AED {adjusted.adjustedTotal.toLocaleString()}</span>
                          {servicePortfolio.some(s => s.price === 0) && (
                            <span className="bespoke-note">+ Bespoke items for quotation</span>
                          )}
                        </div>
                        
                        <div className="portfolio-checkout-actions">
                          {adjusted.adjustedTotal > 0 && !servicePortfolio.some(s => s.price === 0) ? (
                            <>
                              <button className="btn btn-primary" onClick={() => openModal('payment')}>
                                Proceed to Payment
                              </button>
                              <button className="btn btn-secondary" onClick={() => openModal('consultation')}>
                                Request Consultation
                              </button>
                            </>
                          ) : (
                            <button className="btn btn-primary" onClick={() => openModal('consultation')}>
                              Request Bespoke Quotation
                            </button>
                          )}
                          <button className="btn btn-ghost" onClick={() => setServicePortfolio([])}>
                            Clear Portfolio
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })()}

                {servicePortfolio.length === 0 && (
                  <div className="portfolio-empty-state">
                    <p>Your service portfolio is empty</p>
                    <p>Browse our services below and click "Add to Portfolio" to build your customized package</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <section className="section">
            <div className="container">
              
              {/* Property Care Services */}
              <div className="service-category">
                <div className="category-header">
                  <h2>🏠 Property Care & Management</h2>
                  <p>Annual non-rental property management for owners who travel</p>
                </div>
                
                <div className="pricing-table">
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Essential</h3>
                      <div className="tier-price">AED 5,100<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Key storage & secure access</li>
                      <li>6 comprehensive inspections</li>
                      <li>Basic maintenance coordination</li>
                      <li>Emergency response service</li>
                      <li>Utility monitoring & alerts</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('property-essential') ? 'btn-success' : 'btn-primary'}`} 
                      onClick={() => addToPortfolio({
                        id: 'property-essential',
                        name: 'Property Care - Essential',
                        price: 5100,
                        category: 'Property Care'
                      })}
                    >
                      {isInPortfolio('property-essential') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier featured">
                    <div className="tier-badge">Most Popular</div>
                    <div className="tier-header">
                      <h3>Professional</h3>
                      <div className="tier-price">AED 18,200<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Essential</li>
                      <li>12 detailed inspections</li>
                      <li>Technical systems service</li>
                      <li>Arrival & departure preparation</li>
                      <li>Guest coordination services</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('property-professional') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'property-professional',
                        name: 'Property Care - Professional',
                        price: 18200,
                        category: 'Property Care'
                      })}
                    >
                      {isInPortfolio('property-professional') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Concierge</h3>
                      <div className="tier-price">AED 31,300<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Professional</li>
                      <li>24 premium inspections</li>
                      <li>Preventive maintenance program</li>
                      <li>White-glove preparation</li>
                      <li>Full lifestyle management</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('property-concierge') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'property-concierge',
                        name: 'Property Care - Concierge',
                        price: 31300,
                        category: 'Property Care'
                      })}
                    >
                      {isInPortfolio('property-concierge') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                </div>
                
                <div className="additional-services">
                  <div className="service-card">
                    <h4>Welcome Service</h4>
                    <div className="service-price">AED 1,250</div>
                    <p>Property activation, cleaning, systems check, guest preparation</p>
                    <button 
                      className={`btn ${isInPortfolio('welcome-service') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'welcome-service',
                        name: 'Welcome Service',
                        price: 1250,
                        category: 'Property Care'
                      })}
                    >
                      {isInPortfolio('welcome-service') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  <div className="service-card">
                    <h4>Departure Service</h4>
                    <div className="service-price">AED 1,000</div>
                    <p>Property securing, final inspection, utility management</p>
                    <button 
                      className={`btn ${isInPortfolio('departure-service') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'departure-service',
                        name: 'Departure Service',
                        price: 1000,
                        category: 'Property Care'
                      })}
                    >
                      {isInPortfolio('departure-service') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Education Services */}
              <div className="service-category">
                <div className="category-header">
                  <h2>🎓 Education & Family Services</h2>
                  <p>School selection, application, and ongoing family support</p>
                </div>
                
                <div className="pricing-table">
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Consultation</h3>
                      <div className="tier-price">AED 3,500</div>
                    </div>
                    <ul className="tier-features">
                      <li>Child assessment & profiling</li>
                      <li>School shortlisting (5-8 options)</li>
                      <li>Initial guidance & planning</li>
                      <li>Timeline coordination</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('education-consultation') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'education-consultation',
                        name: 'Education - Consultation',
                        price: 3500,
                        category: 'Education'
                      })}
                    >
                      {isInPortfolio('education-consultation') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Application</h3>
                      <div className="tier-price">AED 8,000</div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Consultation</li>
                      <li>Document preparation</li>
                      <li>Application submission</li>
                      <li>Follow-up coordination</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('education-application') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'education-application',
                        name: 'Education - Application',
                        price: 8000,
                        category: 'Education'
                      })}
                    >
                      {isInPortfolio('education-application') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Comprehensive</h3>
                      <div className="tier-price">AED 12,000</div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Application</li>
                      <li>Exam preparation support</li>
                      <li>Interview coaching</li>
                      <li>Enrollment completion</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('education-comprehensive') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'education-comprehensive',
                        name: 'Education - Comprehensive',
                        price: 12000,
                        category: 'Education'
                      })}
                    >
                      {isInPortfolio('education-comprehensive') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier featured">
                    <div className="tier-header">
                      <h3>All-Year Support</h3>
                      <div className="tier-price">AED 18,000</div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Comprehensive</li>
                      <li>Year-round advocacy</li>
                      <li>Parent-school liaison</li>
                      <li>Academic monitoring</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('education-allyear') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'education-allyear',
                        name: 'Education - All-Year Support',
                        price: 18000,
                        category: 'Education'
                      })}
                    >
                      {isInPortfolio('education-allyear') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Keys & Access */}
              <div className="service-category">
                <div className="category-header">
                  <h2>🔑 Keys & Access Management</h2>
                  <p>Secure storage and flexible delivery for property access</p>
                </div>
                
                <div className="pricing-table">
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Storage</h3>
                      <div className="tier-price">AED 500<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Secure key storage</li>
                      <li>Office collection available</li>
                      <li>Basic insurance coverage</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('keys-storage') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'keys-storage',
                        name: 'Keys - Storage',
                        price: 500,
                        category: 'Keys & Access'
                      })}
                    >
                      {isInPortfolio('keys-storage') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Delivery</h3>
                      <div className="tier-price">AED 1,500<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Storage</li>
                      <li>Dubai delivery service</li>
                      <li>Standard business hours</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('keys-delivery') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'keys-delivery',
                        name: 'Keys - Delivery',
                        price: 1500,
                        category: 'Keys & Access'
                      })}
                    >
                      {isInPortfolio('keys-delivery') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier">
                    <div className="tier-header">
                      <h3>Concierge</h3>
                      <div className="tier-price">AED 5,000<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Delivery</li>
                      <li>15 annual visits included</li>
                      <li>Handover coordination</li>
                      <li>Worker supervision</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('keys-concierge') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'keys-concierge',
                        name: 'Keys - Concierge',
                        price: 5000,
                        category: 'Keys & Access'
                      })}
                    >
                      {isInPortfolio('keys-concierge') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                  
                  <div className="pricing-tier featured">
                    <div className="tier-header">
                      <h3>Ultra</h3>
                      <div className="tier-price">AED 10,000<span>/year</span></div>
                    </div>
                    <ul className="tier-features">
                      <li>Everything in Concierge</li>
                      <li>40 annual visits included</li>
                      <li>Premium transport included</li>
                      <li>24/7 availability</li>
                    </ul>
                    <button 
                      className={`btn ${isInPortfolio('keys-ultra') ? 'btn-success' : 'btn-primary'}`}
                      onClick={() => addToPortfolio({
                        id: 'keys-ultra',
                        name: 'Keys - Ultra',
                        price: 10000,
                        category: 'Keys & Access'
                      })}
                    >
                      {isInPortfolio('keys-ultra') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Premium Bundles */}
              <div className="bundles-section">
                <div className="section-header">
                  <h2>Premium Service Bundles</h2>
                  <p>Comprehensive packages designed for complete peace of mind</p>
                </div>
                
                <div className="bundle-grid">
                  <div className="bundle-card premium">
                    <div className="bundle-savings">Save 15%</div>
                    <div className="bundle-header">
                      <h3>Executive Relocation</h3>
                      <div className="bundle-pricing">
                        <div className="bundle-price">Bespoke Quote</div>
                      </div>
                    </div>
                    <div className="bundle-components">
                      <span>Education (Comprehensive)</span>
                      <span>Residence (Concierge)</span>
                      <span>Insurance (Full Care)</span>
                    </div>
                    <div className="bundle-value">Complete family transition solution</div>
                    <div className="bundle-actions">
                      <button 
                        className={`btn ${isInPortfolio('exec-relocation') ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => addToPortfolio({
                          id: 'exec-relocation',
                          name: 'Executive Relocation',
                          price: 0,
                          category: 'Bundle'
                        })}
                      >
                        {isInPortfolio('exec-relocation') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bundle-card">
                    <div className="bundle-header">
                      <h3>Property Owner Elite</h3>
                      <div className="bundle-pricing">
                        <div className="bundle-price">AED 36,000</div>
                        <div className="original-price">AED 42,000</div>
                      </div>
                    </div>
                    <div className="bundle-components">
                      <span>Property Care (Professional)</span>
                      <span>Keys (Ultra)</span>
                      <span>Snagging (Professional)</span>
                      <span>Welcome Service</span>
                    </div>
                    <div className="bundle-value">Turnkey property management with premium access</div>
                    <div className="bundle-actions">
                      <button 
                        className={`btn ${isInPortfolio('owner-elite') ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => addToPortfolio({
                          id: 'owner-elite',
                          name: 'Property Owner Elite',
                          price: 36000,
                          category: 'Bundle'
                        })}
                      >
                        {isInPortfolio('owner-elite') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                      </button>
                    </div>
                  </div>
                  
                  <div className="bundle-card">
                    <div className="bundle-header">
                      <h3>Investor Essentials</h3>
                      <div className="bundle-pricing">
                        <div className="bundle-price">AED 9,500</div>
                        <div className="original-price">AED 11,600</div>
                      </div>
                    </div>
                    <div className="bundle-components">
                      <span>Keys (Concierge)</span>
                      <span>Snagging (Basic)</span>
                      <span>Insurance (Full Service)</span>
                    </div>
                    <div className="bundle-value">Core property investment support</div>
                    <div className="bundle-actions">
                      <button 
                        className={`btn ${isInPortfolio('investor-essentials') ? 'btn-success' : 'btn-primary'}`}
                        onClick={() => addToPortfolio({
                          id: 'investor-essentials',
                          name: 'Investor Essentials',
                          price: 9500,
                          category: 'Bundle'
                        })}
                      >
                        {isInPortfolio('investor-essentials') ? '✔ Added to Portfolio' : 'Add to Portfolio'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Standards */}
              <div className="standards-section">
                <div className="section-header">
                  <h2>Service Standards & Guarantees</h2>
                  <p>Our commitment to exceptional service delivery</p>
                </div>
                
                <div className="standards-grid">
                  <div className="standard-card">
                    <div className="standard-icon">⚡</div>
                    <h4>Response Times</h4>
                    <ul>
                      <li>Emergency: &lt;4 hours</li>
                      <li>Standard: &lt;24 hours</li>
                      <li>Scheduled: 48hr confirmation</li>
                    </ul>
                  </div>
                  
                  <div className="standard-card">
                    <div className="standard-icon">🛡️</div>
                    <h4>Quality Assurance</h4>
                    <ul>
                      <li>Digital documentation</li>
                      <li>Client sign-off required</li>
                      <li>Direct partner escalation</li>
                    </ul>
                  </div>
                  
                  <div className="standard-card">
                    <div className="standard-icon">🔒</div>
                    <h4>Discretion Standards</h4>
                    <ul>
                      <li>Biometric key security</li>
                      <li>Encrypted document storage</li>
                      <li>Standard NDAs</li>
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </section>
        </main>
      )}

      {activeSection === 'trends' && (
        <main>
          <div className="page-hero">
            <div className="container">
              <h1>Market Intelligence</h1>
              <p>Real-time insights from industry leaders, regulatory bodies, and transaction data. Updated daily for informed decision-making.</p>
              <div className="last-updated">Last updated: 16 Sep 2025, 14:30 GST</div>
            </div>
          </div>

          {/* Market Pulse - Key Metrics */}
          <section className="section">
            <div className="container">
              <h2>Market Pulse</h2>
              <div className="pulse-grid">
                <div className="pulse-card trending-up">
                  <div className="pulse-header">
                    <h3>Net Yield Trend</h3>
                    <span className="source-tag">Knight Frank Q3</span>
                  </div>
                  <div className="pulse-metric">+40 bps</div>
                  <div className="pulse-detail">Marina short-let yields climbing on occupancy surge</div>
                  <div className="pulse-timestamp">Updated 2h ago</div>
                </div>

                <div className="pulse-card trending-down">
                  <div className="pulse-header">
                    <h3>Transaction Velocity</h3>
                    <span className="source-tag">DLD Live</span>
                  </div>
                  <div className="pulse-metric">-12%</div>
                  <div className="pulse-detail">Q3 vs Q2 sales volume in luxury segment (50M+)</div>
                  <div className="pulse-timestamp">Updated 1h ago</div>
                </div>

                <div className="pulse-card trending-up">
                  <div className="pulse-header">
                    <h3>Rental Arbitrage</h3>
                    <span className="source-tag">PropertyFinder</span>
                  </div>
                  <div className="pulse-metric">18%</div>
                  <div className="pulse-detail">Ready vs off-plan price gap widening</div>
                  <div className="pulse-timestamp">Updated 3h ago</div>
                </div>

                <div className="pulse-card neutral">
                  <div className="pulse-header">
                    <h3>Service Charges</h3>
                    <span className="source-tag">RERA Analysis</span>
                  </div>
                  <div className="pulse-metric">+8.2%</div>
                  <div className="pulse-detail">YoY inflation across managed properties</div>
                  <div className="pulse-timestamp">Updated 6h ago</div>
                </div>
              </div>
            </div>
          </section>

          {/* Strategic Intelligence */}
          <section className="section dark-section">
            <div className="container">
              <h2>Strategic Intelligence</h2>
              <div className="intelligence-grid">
                <div className="intelligence-card priority-high">
                  <div className="intel-header">
                    <span className="priority-badge">High Priority</span>
                    <span className="intel-source">Savills + DLD Cross-Analysis</span>
                  </div>
                  <h3>Business Bay Yield Compression Signal</h3>
                  <p>Management consolidation among 3 major operators driving down fees. Net yields may improve 60-80bps over next 2 quarters.</p>
                  <div className="intel-metrics">
                    <span className="metric-item">Target: 6.8% → 7.5%</span>
                    <span className="metric-item">Confidence: 78%</span>
                  </div>
                  <button 
                    className="intel-action" 
                    onClick={() => setExpandedIntel(expandedIntel === 'business-bay' ? null : 'business-bay')}
                  >
                    {expandedIntel === 'business-bay' ? 'Hide Analysis' : 'View Analysis'}
                  </button>
                  
                  {expandedIntel === 'business-bay' && (
                    <div className="intel-details">
                      <h4>Detailed Analysis</h4>
                      <div className="analysis-section">
                        <h5>Market Drivers</h5>
                        <ul>
                          <li><strong>Operator Consolidation:</strong> Damac Properties, Select Group, and EMAAR have absorbed 12 smaller management companies in Q3 2025</li>
                          <li><strong>Economies of Scale:</strong> Bulk purchasing power reducing maintenance costs by 15-20%</li>
                          <li><strong>Technology Integration:</strong> Unified platforms cutting operational overhead by AED 180/unit/month</li>
                        </ul>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Key Data Points</h5>
                        <div className="data-grid">
                          <div className="data-item">
                            <span className="data-label">Avg Management Fee (Q2):</span>
                            <span className="data-value">14.2%</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Projected Fee (Q1 2026):</span>
                            <span className="data-value">11.8%</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Service Charge Reduction:</span>
                            <span className="data-value">-22 AED/sqft</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Vacancy Improvement:</span>
                            <span className="data-value">-4.5 days/year</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Investment Implications</h5>
                        <p><strong>Timing:</strong> Properties purchased in Q4 2025 will benefit from full fee reduction impact</p>
                        <p><strong>Property Types:</strong> 1-2BR units showing highest benefit ratio (management intensity vs rent)</p>
                        <p><strong>Risk Factors:</strong> Potential quality reduction during transition period (monitor first 3 months)</p>
                      </div>
                      
                      <div className="action-items">
                        <h5>Recommended Actions</h5>
                        <div className="action-item">📊 Monitor DLD transaction volumes in Business Bay for Q4</div>
                        <div className="action-item">📞 Contact consolidated operators for pre-launch pricing</div>
                        <div className="action-item">⏰ Consider acquiring before announcement (estimated late Q4)</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="intelligence-card priority-medium">
                  <div className="intel-header">
                    <span className="priority-badge">Medium Priority</span>
                    <span className="intel-source">CBRE Market Flash</span>
                  </div>
                  <h3>Golden Visa Impact on Luxury Segment</h3>
                  <p>10-year visa applications up 240% YoY. Targeting properties above AED 20M. Watch for premium compression in Q4.</p>
                  <div className="intel-metrics">
                    <span className="metric-item">Price Impact: +12-18%</span>
                    <span className="metric-item">Timeline: Q4 2025</span>
                  </div>
                  <button 
                    className="intel-action" 
                    onClick={() => setExpandedIntel(expandedIntel === 'golden-visa' ? null : 'golden-visa')}
                  >
                    {expandedIntel === 'golden-visa' ? 'Hide Analysis' : 'View Analysis'}
                  </button>
                  
                  {expandedIntel === 'golden-visa' && (
                    <div className="intel-details">
                      <h4>Detailed Analysis</h4>
                      <div className="analysis-section">
                        <h5>Visa Application Data</h5>
                        <div className="data-grid">
                          <div className="data-item">
                            <span className="data-label">Q3 2025 Applications:</span>
                            <span className="data-value">14,200 (+240%)</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Avg Property Value:</span>
                            <span className="data-value">AED 28.5M</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Top Nationalities:</span>
                            <span className="data-value">UK (23%), India (19%), Russia (15%)</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Cash Buyers:</span>
                            <span className="data-value">87%</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Geographic Concentration</h5>
                        <ul>
                          <li><strong>Palm Jumeirah:</strong> 32% of luxury transactions (villas AED 25-50M)</li>
                          <li><strong>Downtown Dubai:</strong> 28% (penthouses/branded residences)</li>
                          <li><strong>Emirates Hills:</strong> 18% (villa segment AED 30M+)</li>
                          <li><strong>Al Barari:</strong> 12% (eco-luxury premium emerging)</li>
                        </ul>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Market Implications</h5>
                        <p><strong>Supply Constraint:</strong> Only 180 properties above AED 20M available in prime areas</p>
                        <p><strong>Competition:</strong> 8-12 bidders per ultra-prime listing (vs 3-4 in 2024)</p>
                        <p><strong>Price Velocity:</strong> Average days on market decreased from 45 to 18 days</p>
                        <p><strong>Yield Impact:</strong> Purchase prices rising faster than rental rates, compressing yields by 40-60bps</p>
                      </div>
                      
                      <div className="action-items">
                        <h5>Strategic Recommendations</h5>
                        <div className="action-item">🎯 Target AED 15-20M properties (pre-premium threshold)</div>
                        <div className="action-item">📍 Focus on Al Barari/Hillside emerging luxury areas</div>
                        <div className="action-item">⚡ Act quickly on off-market opportunities</div>
                        <div className="action-item">💰 Consider rent-to-own structures for visa compliance</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="intelligence-card priority-low">
                  <div className="intel-header">
                    <span className="priority-badge">Monitor</span>
                    <span className="intel-source">Bayut Listing Analytics</span>
                  </div>
                  <h3>JLT Rental Market Softening</h3>
                  <p>Average days on market increased from 18 to 26 days. Corporate relocations slowing post-summer.</p>
                  <div className="intel-metrics">
                    <span className="metric-item">Yield Risk: -20bps</span>
                    <span className="metric-item">Timeframe: Near-term</span>
                  </div>
                  <button 
                    className="intel-action" 
                    onClick={() => setExpandedIntel(expandedIntel === 'jlt-softening' ? null : 'jlt-softening')}
                  >
                    {expandedIntel === 'jlt-softening' ? 'Hide Analysis' : 'View Analysis'}
                  </button>
                  
                  {expandedIntel === 'jlt-softening' && (
                    <div className="intel-details">
                      <h4>Detailed Analysis</h4>
                      <div className="analysis-section">
                        <h5>Market Metrics</h5>
                        <div className="data-grid">
                          <div className="data-item">
                            <span className="data-label">Avg Days on Market (Q2):</span>
                            <span className="data-value">18 days</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Avg Days on Market (Q3):</span>
                            <span className="data-value">26 days (+44%)</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Rental Rate Change:</span>
                            <span className="data-value">-3.2% QoQ</span>
                          </div>
                          <div className="data-item">
                            <span className="data-label">Occupancy Rate:</span>
                            <span className="data-value">91% (vs 95% Q2)</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Corporate Demand Shifts</h5>
                        <ul>
                          <li><strong>Banking Sector:</strong> HSBC, Standard Chartered consolidating to fewer buildings</li>
                          <li><strong>Tech Companies:</strong> Moving to newer developments in DIFC/Downtown</li>
                          <li><strong>Hybrid Work:</strong> 40% reduction in corporate housing allowances</li>
                          <li><strong>Cost Optimization:</strong> Companies negotiating direct leases vs corporate housing</li>
                        </ul>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Competitive Pressure</h5>
                        <p><strong>New Supply:</strong> 1,200 units delivered in Q3 across 3 new towers</p>
                        <p><strong>DIFC Proximity:</strong> Tenants preferring walking distance to financial district</p>
                        <p><strong>Amenity Gap:</strong> Older JLT buildings lacking modern co-working/wellness facilities</p>
                      </div>
                      
                      <div className="analysis-section">
                        <h5>Opportunities</h5>
                        <p><strong>Value Play:</strong> 15-20% below 2024 peak, good entry point for patient capital</p>
                        <p><strong>Renovation Upside:</strong> AED 150K upgrades can command 20-25% rent premiums</p>
                        <p><strong>Family Market:</strong> Increasing demand from families (vs corporate) seeking affordable luxury</p>
                      </div>
                      
                      <div className="action-items">
                        <h5>Monitoring Checklist</h5>
                        <div className="action-item">📊 Track Q4 corporate renewal rates</div>
                        <div className="action-item">🏗️ Monitor DIFC/Downtown supply pipeline delays</div>
                        <div className="action-item">👨‍👩‍👧‍👦 Watch family demographics shift (schools, amenities)</div>
                        <div className="action-item">💡 Identify renovation arbitrage opportunities</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>

          {/* Data Sources Status */}
          <section className="section">
            <div className="container">
              <h2>Live Data Feeds</h2>
              <div className="data-sources-grid">
                <div className="source-status active">
                  <div className="source-info">
                    <h4>Knight Frank Research</h4>
                    <p>Prime market reports & yield analysis</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Live • Last: 2h ago</span>
                  </div>
                </div>

                <div className="source-status active">
                  <div className="source-info">
                    <h4>Dubai Land Department</h4>
                    <p>Transaction data & regulatory updates</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Live • Last: 1h ago</span>
                  </div>
                </div>

                <div className="source-status active">
                  <div className="source-info">
                    <h4>PropertyFinder Analytics</h4>
                    <p>Listing velocity & pricing trends</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Live • Last: 15m ago</span>
                  </div>
                </div>

                <div className="source-status warning">
                  <div className="source-info">
                    <h4>Savills Market View</h4>
                    <p>Institutional investment flows</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Delayed • Last: 8h ago</span>
                  </div>
                </div>

                <div className="source-status active">
                  <div className="source-info">
                    <h4>RERA Database</h4>
                    <p>Service charges & management data</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Live • Last: 30m ago</span>
                  </div>
                </div>

                <div className="source-status active">
                  <div className="source-info">
                    <h4>CBRE Research</h4>
                    <p>Supply pipeline & absorption rates</p>
                  </div>
                  <div className="status-indicator">
                    <span className="status-dot"></span>
                    <span className="status-text">Live • Last: 4h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contrarian Views */}
          <section className="section">
            <div className="container">
              <h2>Contrarian Intelligence</h2>
              <div className="contrarian-cards">
                <div className="contrarian-card">
                  <div className="contrarian-header">
                    <h3>The Downtown Dubai Thesis</h3>
                    <span className="confidence-score">Confidence: 82%</span>
                  </div>
                  <p><strong>Market Consensus:</strong> Downtown pricing peaked, rotation to emerging areas</p>
                  <p><strong>Our Analysis:</strong> Institutional money still flowing in. Supply constraints through 2026 suggest 15-20% upside remains.</p>
                  <div className="contrarian-data">
                    <span className="data-point">Institutional Flows: +AED 2.3B (Q3)</span>
                    <span className="data-point">Supply Gap: 68% below historical average</span>
                  </div>
                </div>

                <div className="contrarian-card">
                  <div className="contrarian-header">
                    <h3>The Short-Let Saturation Myth</h3>
                    <span className="confidence-score">Confidence: 76%</span>
                  </div>
                  <p><strong>Market Consensus:</strong> Airbnb market oversaturated, yields compressing</p>
                  <p><strong>Our Analysis:</strong> Professional operators with 10+ units still seeing 7%+ net yields. Amateur hosts driving down averages.</p>
                  <div className="contrarian-data">
                    <span className="data-point">Pro Operators: 7.2% avg yield</span>
                    <span className="data-point">Amateur Hosts: 4.1% avg yield</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* Premium Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Regulatory Compliance</h4>
              <div className="mb-2">
                <strong>RERA Licensed</strong>
                <div className="highlight">RERA/DLD/1578/2023</div>
                <div>Dubai real estate regulatory authority</div>
              </div>
            </div>
            <div className="footer-section">
              <h4>Business Registration</h4>
              <div className="mb-2">
                <strong>DET Compliant</strong>
                <div className="highlight">DET/STL/2023/089</div>
                <div>Dubai economy & tourism registered</div>
              </div>
            </div>
            <div className="footer-section">
              <h4>Financial Security</h4>
              <div className="mb-2">
                <strong>Escrow Protected</strong>
                <div className="highlight">ADCB Trust Account</div>
                <div>Client funds held separately</div>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid var(--neutral-700)', paddingTop: '2rem', textAlign: 'center' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--neutral-400)', lineHeight: '1.6' }}>
              © 2025 Circle Property Management LLC. All rights reserved.<br/>
              <strong>Risk Disclosure:</strong> Property investments carry risk. Past performance does not predict future results.
        </p>
          </div>
        </div>
      </footer>

      {/* Modal Forms */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActiveModal(null)}>×</button>
            
            {activeModal === 'payment' && (
              <div>
                <h2>Complete Your Payment</h2>
                <p>Secure payment for your selected services</p>
                
                {(() => {
                  const adjusted = getAdjustedPortfolio()
                  return (
                    <div className="payment-summary">
                      <h3>Payment Summary</h3>
                      <div className="payment-items">
                        {adjusted.services.map((service) => (
                          <div key={service.id} className="payment-item">
                            <span>{service.name}</span>
                            <span>AED {service.price.toLocaleString()}</span>
                          </div>
                        ))}
                        {adjusted.bundles.map((bundle) => (
                          <div key={bundle.id} className="payment-item">
                            <span>{bundle.name}</span>
                            <span>AED {bundle.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                      
                      {adjusted.conflicts.length > 0 && (
                        <div className="payment-savings">
                          <h4>Package Optimizations Applied:</h4>
                          {adjusted.conflicts.map((conflict, index) => (
                            <p key={index}>{conflict.bundle} includes: {conflict.includedServices.join(', ')}</p>
                          ))}
                        </div>
                      )}
                      
                      <div className="payment-total">
                        <strong>Total: AED {adjusted.adjustedTotal.toLocaleString()}</strong>
                      </div>
                    </div>
                  )
                })()}
                
                <div className="payment-methods">
                  <h3>Select Payment Method</h3>
                  
                  <div className="payment-method-card">
                    <h4>💳 Credit Card</h4>
                    <p>Instant payment via Visa, Mastercard, or American Express</p>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div style={{display: 'flex', gap: '1rem'}}>
                      <div className="form-group" style={{flex: 1}}>
                        <label>Expiry</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group" style={{flex: 1}}>
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                    <button className="btn btn-primary full-width">Pay Now</button>
                  </div>
                  
                  <div className="payment-method-card">
                    <h4>🏦 Bank Transfer</h4>
                    <p>Direct transfer to Circle Property account</p>
                    <div className="bank-details">
                      <p><strong>Bank:</strong> Emirates NBD</p>
                      <p><strong>Account:</strong> Circle Property Management LLC</p>
                      <p><strong>IBAN:</strong> AE07 0330 0000 0123 4567 890</p>
                      <p><strong>SWIFT:</strong> EBILAEAD</p>
                    </div>
                    <button className="btn btn-secondary full-width">Generate Transfer Instructions</button>
                  </div>
                </div>
                
                <div className="payment-actions">
                  <button className="btn btn-secondary" onClick={() => setActiveModal(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary full-width">
                    Complete Payment
                  </button>
                </div>
              </div>
            )}

            {activeModal === 'registration' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Stay Informed</h2>
                <p>Subscribe for market insights and access all Circle Property services seamlessly.</p>
                
                <div className="form-group">
                  <label>Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div className="form-group">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="your.email@company.com"
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+971 50 123 4567"
                  />
                </div>
                
                <div className="form-group">
                  <label>Investor Type *</label>
                  <select
                    required
                    value={formData.investorType}
                    onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                  >
                    <option value="">Select investor type</option>
                    <option value="HNWI">High Net Worth Individual</option>
                    <option value="Family Office">Family Office</option>
                    <option value="Property Owner">Property Owner</option>
                    <option value="Developer">Developer</option>
                    <option value="Investment Manager">Investment Manager</option>
                    <option value="Fund Manager">Fund Manager</option>
                  </select>
                </div>
                
                <div className="checkbox-wrapper">
                  <input type="checkbox" id="terms-agree" required />
                  <label htmlFor="terms-agree">
                    I agree to receive market updates and communications from Circle Property.
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Subscribe
                </button>
              </form>
            )}

            {activeModal === 'consultation' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Schedule Consultation</h2>
                <p>30-minute strategy session with senior partners</p>
                
                {servicePortfolio.length > 0 && (
                  <div className="consultation-services">
                    <h3>Your Selected Services</h3>
                    <div className="selected-services-list">
                      {servicePortfolio.map((service) => (
                        <div key={service.id} className="selected-service-item">
                          <span>{service.name}</span>
                          <span>{service.price > 0 ? `AED ${service.price.toLocaleString()}` : 'Bespoke Quote'}</span>
                        </div>
                      ))}
                    </div>
                    <div className="services-total">
                      <strong>Total: AED {getPortfolioTotal().toLocaleString()}</strong>
                      {servicePortfolio.some(s => s.price === 0) && (
                        <span className="bespoke-note"> + Bespoke items</span>
                      )}
                    </div>
                  </div>
                )}
                
                {!userProfile.isRegistered && (
                  <>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Investor Type *</label>
                      <select
                        required
                        value={formData.investorType}
                        onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                      >
                        <option value="">Select investor type</option>
                        <option value="HNWI">High Net Worth Individual</option>
                        <option value="Family Office">Family Office</option>
                        <option value="Property Owner">Property Owner</option>
                        <option value="Developer">Developer</option>
                        <option value="Investment Manager">Investment Manager</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="form-group">
                  <label>Preferred Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Preferred Contact Method *</label>
                  <select
                    required
                    value={formData.contactMethod || ''}
                    onChange={(e) => setFormData({...formData, contactMethod: e.target.value})}
                  >
                    <option value="">Select contact method</option>
                    <option value="phone">Phone Call</option>
                    <option value="whatsapp">WhatsApp Video</option>
                    <option value="email">Email Discussion</option>
                    <option value="in-person">In-Person Meeting (Dubai)</option>
                    <option value="zoom">Video Conference</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Message (Optional)</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Brief overview of your objectives..."
                    rows={3}
                  />
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Schedule Consultation
                </button>
              </form>
            )}

            {activeModal === 'quietAccess' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Quiet Listings Access</h2>
                <p>Exclusive, off-market opportunities. NDA required for full access.</p>
                
                {!userProfile.isRegistered && (
                  <>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Investor Type *</label>
                      <select
                        required
                        value={formData.investorType}
                        onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                      >
                        <option value="">Select investor type</option>
                        <option value="HNWI">High Net Worth Individual</option>
                        <option value="Family Office">Family Office</option>
                        <option value="Investment Manager">Investment Manager</option>
                        <option value="Fund Manager">Fund Manager</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="form-group">
                  <label>Investment Ticket Size (AED) *</label>
                  <select
                    required
                    value={formData.ticketSize}
                    onChange={(e) => setFormData({...formData, ticketSize: e.target.value})}
                  >
                    <option value="">Select range</option>
                    <option value="5M-15M">AED 5M - 15M</option>
                    <option value="15M-50M">AED 15M - 50M</option>
                    <option value="50M-100M">AED 50M - 100M</option>
                    <option value="100M+">AED 100M+</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Asset Preferences</label>
                  <input
                    type="text"
                    value={formData.assetPreferences}
                    onChange={(e) => setFormData({...formData, assetPreferences: e.target.value})}
                    placeholder="e.g., Waterfront Short-let, Branded Residences"
                  />
                </div>
                
                <div className="checkbox-wrapper">
                  <input type="checkbox" id="nda-agree" required />
                  <label htmlFor="nda-agree">
                    I acknowledge that an NDA is required for full access to quiet listings.
                  </label>
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Request Access
                </button>
              </form>
            )}

            {activeModal === 'emailAnalysis' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Email Detailed Analysis</h2>
                <p>Receive comprehensive yield analysis with methodology and assumptions in PDF format.</p>
                
                {!userProfile.isRegistered && (
                  <>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@company.com"
                      />
                    </div>
                  </>
                )}
                
                <div className="analysis-summary">
                  <h4>Analysis Summary:</h4>
                  <p><strong>Project:</strong> {selectedProject}</p>
                  <p><strong>Model:</strong> {selectedModel}</p>
                  {results && (
                    <p><strong>Est. Net Yield:</strong> {results.netYield.min}% - {results.netYield.max}%</p>
                  )}
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Email Analysis (PDF)
                </button>
              </form>
            )}

            {activeModal === 'detailedInfo' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Request Detailed Information</h2>
                <p>Access comprehensive property details, financial projections, and exclusive insights.</p>
                
                {!userProfile.isRegistered && (
                  <>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Enter your full name"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="your.email@company.com"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Investor Type *</label>
                      <select
                        required
                        value={formData.investorType}
                        onChange={(e) => setFormData({...formData, investorType: e.target.value})}
                      >
                        <option value="">Select investor type</option>
                        <option value="HNWI">High Net Worth Individual</option>
                        <option value="Family Office">Family Office</option>
                        <option value="Investment Manager">Investment Manager</option>
                        <option value="Fund Manager">Fund Manager</option>
                      </select>
                    </div>
                  </>
                )}
                
                <div className="property-summary">
                  <h4>Property: Dubai Creek Harbour - Branded Residences</h4>
                  <p>AED 12.5M | 2BR Penthouse | 7.2% Est. Net Yield</p>
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Request Information Package
                </button>
              </form>
            )}

            {activeModal === 'switchConsultation' && (
              <form onSubmit={handleFormSubmit}>
                <h2>Schedule Switch Consultation</h2>
                <p>30-minute session to discuss transitioning your property management to Circle Property.</p>
                
                <div className="form-group">
                  <label>Current Property Count</label>
                  <select
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  >
                    <option value="">Select number of properties</option>
                    <option value="1-3 properties">1-3 properties</option>
                    <option value="4-10 properties">4-10 properties</option>
                    <option value="11-25 properties">11-25 properties</option>
                    <option value="25+ properties">25+ properties</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Current Management Issues (Optional)</label>
                  <textarea
                    value={formData.assetPreferences}
                    onChange={(e) => setFormData({...formData, assetPreferences: e.target.value})}
                    placeholder="e.g., Low occupancy, high maintenance costs, poor communication..."
                    rows={3}
                  />
                </div>
                
                <div className="form-group">
                  <label>Preferred Consultation Date</label>
                  <input
                    type="date"
                    value={formData.preferredDate}
                    onChange={(e) => setFormData({...formData, preferredDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="form-group">
                  <label>Preferred Time</label>
                  <select
                    value={formData.preferredTime}
                    onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                  >
                    <option value="">Select time</option>
                    <option value="09:00">09:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">02:00 PM</option>
                    <option value="15:00">03:00 PM</option>
                    <option value="16:00">04:00 PM</option>
                  </select>
                </div>
                
                <div className="property-summary">
                  <h4>What We'll Cover:</h4>
                  <ul>
                    <li>Current portfolio performance review</li>
                    <li>Transition timeline and process</li>
                    <li>Cost-benefit analysis</li>
                    <li>Net yield optimization opportunities</li>
                  </ul>
                </div>
                
                <button type="submit" className="btn btn-primary full-width">
                  Schedule Switch Consultation
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
