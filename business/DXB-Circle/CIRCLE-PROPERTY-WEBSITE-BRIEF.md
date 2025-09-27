# Circle Property — Website Brief Analysis (v1.0)

## Executive Summary

This brief outlines a comprehensive Dubai property investment platform focused on evidence-driven decisions, transparent economics, and one-window execution. The website targets HNWIs, family offices, SME owners, and experienced brokers seeking Dubai property investment opportunities.

## Key Strategic Elements

### Core Value Proposition
> Evidence-driven Dubai property decisions with transparent economics, one-window execution, and ongoing performance management.

### Primary CTAs
- **Primary**: Book a 20-min discovery call
- **Secondary**: Get the Dubai Yield Pack (free)

### Target Audiences (ICPs)
1. HNWIs/Family Offices (UAE & international)
2. SME owners / corporate relocation (portfolios of 12–50 units)
3. Experienced brokers seeking Dubai execution partner

## Information Architecture

### Core Pages (12 main sections)
1. **Home** - Immediate trust + action
2. **Market Intelligence** - Live dashboards, data advantage
3. **Deals & Comps** - Transparent inventory + realistic comps
4. **Services** - High-touch, Online, Consultancy delivery models
5. **Strategy Playbooks** - 6 investment strategies mapped to client intent
6. **Tools & Calculators** - Immediate utility (Yield, TCO, Mortgage, STR)
7. **Case Studies** - Proof with anonymized numbers
8. **About & Team** - Discreet credibility
9. **Compliance** - Trust + risk hygiene
10. **Insights** - Ongoing proof & SEO
11. **Contact / Book a Call** - Low-friction conversion
12. **Client Portal** - Serious aftercare demonstration

### Strategy Playbooks (6 types)
- **Max Profit** - STR + refurb with stop-loss
- **Secure Income** - Stable rental yields
- **Immediate Occupancy** - Quick tenant placement
- **Quality of Life** - Personal use + investment
- **Safe Haven** - Capital preservation focus
- **Blended** - Mixed strategy approach

## Technical Architecture

### Recommended Tech Stack
- **Frontend**: Next.js (App Router), server components
- **Styling**: Tailwind CSS or CSS modules
- **CMS**: Headless (Contentful/Strapi/Sanity)
- **Forms**: Cal.com/Calendly embed, serverless functions
- **Calculators**: Client-side React with shared validation
- **Analytics**: GA4 + server-side events
- **CRM**: HubSpot/Pipedrive integration

### Key Features Required
1. **Live Data Integration** - Real-time market metrics with timestamps
2. **Interactive Calculators** - Yield, TCO, Mortgage, STR scenarios
3. **Gated Content System** - Freemium model for deeper insights
4. **Booking Integration** - Embedded scheduler for discovery calls
5. **Client Portal Preview** - Screenshots of actual client dashboards
6. **Compliance Framework** - KYC/AML, disclaimers, data privacy

## Content Strategy

### Tone & Voice
- British-lean, plain English
- Confident, not brash
- Always show assumptions with numbers
- No "guaranteed returns" - avoid puffery

### SEO Focus Keywords
- dubai property investment
- dubai rental yield
- dubai buy-to-let
- dubai off-plan analysis
- dubai real estate comps
- STR dubai yields

## Component Library Requirements

### Shared Components
- Stat tiles (with timestamp)
- Strategy cards (risk band badge)
- Case study grid (before/after table)
- Calculator widgets (inline + modal)
- SLA strip (icons + numbers)
- Methodology & Sources accordion
- CTA bar (sticky on scroll)
- Trust & compliance ribbon

## Analytics & Tracking

### Key Events to Track
- Page views + scroll depth
- CTA clicks: book_call, yield_pack_download, calculator_save
- Calculator interactions: calc_open, calc_submit
- Gate conversions: insights_download, case_study_pdf
- Funnel: MQL→SQL→Mandate

## Launch Timeline

### 30 Days (MVP)
- Home, Services, Contact pages
- Tools v1 (Yield/TCO calculators)
- 1 Case Study
- Basic analytics & SEO

### 60 Days (Enhanced)
- Market Intelligence dashboards v1
- 2 additional Case Studies
- Strategy Playbooks
- Scheduler integration
- Downloadable Yield Pack

### 90 Days (Full Platform)
- Deals & Comps section
- Compliance page
- Portal teaser
- Gated downloads
- PR placements
- First webinar

## Compliance & Legal

### UAE Requirements
- Prominent disclaimers on performance figures
- Clear consent boxes (marketing opt-in)
- Cookie banner with preferences
- KYC/AML statement and MLRO contact
- SAR/EDD policy summary

## Performance & Accessibility

### Standards
- **WCAG 2.1 AA**: Semantic HTML, focus states, alt text, 16px+ base, 4.5:1 contrast
- **Performance**: <2.5s LCP on 3G, optimized images
- **Security**: HTTPS, CSP, reCAPTCHA on forms, data minimization

## CMS Content Model

### Core Content Types
- `Page` (slug, hero, sections[])
- `CaseStudy` (title, problem, approach, numbers_before/after, timeline, pdf)
- `Insight` (title, summary, body, tags, download)
- `Strategy` (name, risk_band, targets, rules, memo_sample)
- `MetricSnapshot` (name, value, unit, updated_at, source)
- `Deal` (type, status, key_numbers, gallery, comp_set)

## Implementation Priority

### High Priority (Core MVP)
1. Home page with hero + live stats
2. Yield & TCO calculators (no-gate)
3. Services page with clear delivery models
4. Contact/booking integration
5. Basic case study template

### Medium Priority (Enhanced Features)
1. Market Intelligence dashboards
2. Strategy Playbooks section
3. Gated content system
4. Client portal preview
5. Insights/blog system

### Lower Priority (Advanced Features)
1. Advanced deal comparison tools
2. Comprehensive compliance section
3. Multi-language support
4. Advanced analytics dashboards
5. API integrations for live data

## Success Metrics

### Primary KPIs
- Discovery call bookings
- Yield Pack downloads
- Calculator usage/saves
- MQL to SQL conversion rate
- Time on site for key pages

### Secondary KPIs
- Organic search traffic growth
- Case study PDF downloads
- Portal preview engagement
- Social proof interactions
- Mobile vs desktop usage patterns
