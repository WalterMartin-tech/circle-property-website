# Circle Property - Optimization Module Architecture & Development Plan

**Date:** October 5, 2025  
**Version:** 1.0  
**Status:** Architecture Design & Implementation Roadmap

---

## 🎯 Executive Summary

This document outlines the architecture and development plan for integrating **4 optimization modules** into the Circle Property platform:

1. **Deal Picker** - Budget-constrained portfolio acquisition optimization
2. **Debt Stack Mixer** - LTV/DSCR-compliant financing optimization
3. **Capex Phasing Planner** - Value-add project scheduling optimization
4. **Leasing Mix Optimizer** - Revenue optimization with WAULT constraints

**Technology Stack:**
- **Frontend:** Next.js 15 + React 19 (existing) + React Hook Form + Zod
- **Backend:** **Python FastAPI** (new microservice) + SciPy + OR-Tools
- **Current Backend:** Node.js/Express (existing, separate concerns)
- **Database:** PostgreSQL (existing) + Redis (caching)
- **File Generation:** XLSX (openpyxl), CSV (pandas), PDF (ReportLab)

---

## 📊 Architecture Decision: Why Python Backend?

### **Current Architecture**
```
circle-property-fullstack/
├── frontend/          # Next.js 15 + React 19 ✅ Keep
├── backend/           # Node.js + Express + TypeScript ✅ Keep for user/payment/auth
└── optimization-service/  # Python FastAPI 🆕 Add for optimization
```

### **Rationale for Python Microservice**

| Concern | Node.js | Python | Decision |
|---------|---------|--------|----------|
| **Optimization Libraries** | Limited (glpk.js, lpsolve) | SciPy, OR-Tools, PuLP | ✅ **Python** |
| **Performance** | Good for I/O | Better for CPU-heavy math | ✅ **Python** |
| **Data Science Ecosystem** | Weak | pandas, numpy, openpyxl | ✅ **Python** |
| **Team Skills** | Strong | Mixed | ⚠️ Consider |
| **Deployment** | Simple (Vercel) | Docker required | ⚠️ More complex |
| **Integration** | Direct | REST API | ✅ Clean separation |

### **Recommended Architecture: Hybrid Microservices**

```
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (Next.js 15)                    │
│         /optimizations/* pages + React components           │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
               │ REST API                     │ REST API
               ▼                              ▼
┌──────────────────────────────┐  ┌──────────────────────────┐
│  Node.js Backend (Express)   │  │ Python Backend (FastAPI) │
│  - User auth & profiles      │  │ - Deal Picker optimizer  │
│  - Payments (Stripe)         │  │ - Debt Stack optimizer   │
│  - Portfolios & services     │  │ - Capex Phasing optimizer│
│  - Consultations             │  │ - Leasing Mix optimizer  │
│  - Property data             │  │ - File generation (xlsx) │
└──────────────┬───────────────┘  └──────────┬───────────────┘
               │                              │
               ▼                              ▼
┌──────────────────────────────────────────────────────────────┐
│              PostgreSQL Database (Shared)                     │
│  Tables: users, optimizations, optimization_results, files   │
└──────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Detailed Architecture Design

### **1. Frontend Architecture**

#### **New Pages**
```
frontend/src/app/
├── optimizations/
│   ├── page.tsx                    # Landing page (4 module cards)
│   ├── deal-picker/
│   │   └── page.tsx                # Deal Picker UI
│   ├── debt-stack/
│   │   └── page.tsx                # Debt Stack UI
│   ├── capex-phasing/
│   │   └── page.tsx                # Capex Phasing UI
│   └── leasing-mix/
│       └── page.tsx                # Leasing Mix UI
```

#### **New Components**
```
frontend/src/components/optimizations/
├── shared/
│   ├── OptimizationStepper.tsx     # 3-step wizard (Input → Run → Results)
│   ├── ResultsSummary.tsx          # KPIs, charts, binding constraints
│   ├── ShadowPricesPanel.tsx       # Explainability UI
│   ├── BindingConstraintsPanel.tsx # What constrained the plan
│   ├── WhatIfBuilder.tsx           # Scenario suggestions
│   ├── FileDownloads.tsx           # XLSX/CSV/PDF downloads
│   └── AIAssistant.tsx             # AI prompts sidebar
├── deal-picker/
│   ├── DealPickerForm.tsx          # RHF + Zod form
│   ├── DealPickerResults.tsx       # Allocation charts
│   └── DealUploadCSV.tsx           # CSV upload widget
├── debt-stack/
│   ├── DebtStackForm.tsx
│   ├── DebtStackResults.tsx
│   └── TrancheBuilder.tsx
├── capex-phasing/
│   ├── CapexPhasingForm.tsx
│   ├── CapexGanttChart.tsx
│   └── ProjectCapacityPanel.tsx
└── leasing-mix/
    ├── LeasingMixForm.tsx
    ├── LeasingMixResults.tsx
    └── PackageBuilder.tsx
```

#### **State Management**
```typescript
// frontend/src/stores/optimizationStore.ts
import { create } from 'zustand'

interface OptimizationState {
  currentStep: number
  inputData: any
  results: any
  isOptimizing: boolean
  error: string | null
  setStep: (step: number) => void
  setInputData: (data: any) => void
  runOptimization: (endpoint: string, data: any) => Promise<void>
  reset: () => void
}

export const useOptimizationStore = create<OptimizationState>((set) => ({
  // Implementation
}))
```

#### **API Client**
```typescript
// frontend/src/lib/optimizationApi.ts
import { z } from 'zod'

const OPTIMIZATION_API_BASE = process.env.NEXT_PUBLIC_OPTIMIZATION_API_URL || 'http://localhost:8001/api/v1'

export const optimizationApi = {
  dealPicker: {
    optimize: async (data: DealPickerRequest) => {
      // Zod validation + fetch
    },
    downloadXLSX: async (resultId: string) => {
      // Download file
    }
  },
  debtStack: {
    optimize: async (data: DebtStackRequest) => { /* ... */ }
  },
  capexPhasing: {
    optimize: async (data: CapexRequest) => { /* ... */ }
  },
  leasingMix: {
    optimize: async (data: LeasingRequest) => { /* ... */ }
  }
}
```

---

### **2. Backend Architecture (Python FastAPI)**

#### **Project Structure**
```
optimization-service/
├── app/
│   ├── __init__.py
│   ├── main.py                     # FastAPI app entry point
│   ├── config.py                   # Settings (DB, Redis, CORS)
│   ├── database.py                 # SQLAlchemy setup
│   ├── models/
│   │   ├── __init__.py
│   │   ├── optimization.py         # DB models (SQLAlchemy)
│   │   └── schemas.py              # Pydantic schemas (shared)
│   ├── routers/
│   │   ├── __init__.py
│   │   ├── deal_picker.py          # POST /deal-picker/optimize
│   │   ├── debt_stack.py           # POST /debt-stack/optimize
│   │   ├── capex_phasing.py        # POST /capex-phasing/optimize
│   │   └── leasing_mix.py          # POST /leasing-mix/optimize
│   ├── solvers/
│   │   ├── __init__.py
│   │   ├── deal_picker_solver.py   # SciPy HiGHS LP
│   │   ├── debt_stack_solver.py    # SciPy HiGHS LP
│   │   ├── capex_solver.py         # OR-Tools MILP
│   │   └── leasing_solver.py       # SciPy HiGHS LP
│   ├── writers/
│   │   ├── __init__.py
│   │   ├── xlsx_writer.py          # openpyxl
│   │   ├── csv_writer.py           # pandas
│   │   └── pdf_writer.py           # ReportLab
│   ├── utils/
│   │   ├── __init__.py
│   │   ├── validators.py           # Input validation helpers
│   │   ├── explainability.py       # Shadow prices, binding constraints
│   │   └── file_storage.py         # S3 or local storage
│   └── static/
│       ├── templates/              # CSV templates
│       └── outputs/                # Generated files (temp)
├── tests/
│   ├── test_deal_picker.py
│   ├── test_debt_stack.py
│   ├── test_capex.py
│   ├── test_leasing.py
│   └── test_writers.py
├── requirements.txt
├── Dockerfile
├── .env.example
└── README.md
```

#### **Key Dependencies**
```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.0
sqlalchemy==2.0.25
alembic==1.13.1
psycopg2-binary==2.9.9
redis==5.0.1

# Optimization
scipy==1.12.0
ortools==9.8.3296
numpy==1.26.3
pandas==2.1.4

# File generation
openpyxl==3.1.2
reportlab==4.0.9
python-multipart==0.0.6

# Testing
pytest==7.4.4
pytest-asyncio==0.21.1
httpx==0.26.0
```

#### **API Endpoints**

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import deal_picker, debt_stack, capex_phasing, leasing_mix

app = FastAPI(
    title="Circle Property Optimization API",
    version="1.0.0",
    description="Industrial-grade optimization for real estate decisions"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://circle-property-website.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(deal_picker.router, prefix="/api/v1/deal-picker", tags=["Deal Picker"])
app.include_router(debt_stack.router, prefix="/api/v1/debt-stack", tags=["Debt Stack"])
app.include_router(capex_phasing.router, prefix="/api/v1/capex-phasing", tags=["Capex Phasing"])
app.include_router(leasing_mix.router, prefix="/api/v1/leasing-mix", tags=["Leasing Mix"])

@app.get("/health")
async def health_check():
    return {"status": "ok", "service": "optimization-api"}
```

#### **Solver Example: Deal Picker**

```python
# app/solvers/deal_picker_solver.py
from scipy.optimize import linprog
import numpy as np
from typing import Dict, List, Any

def optimize_deal_picker(
    deals: List[Dict[str, Any]],
    budget: float,
    sector_caps: Dict[str, float],
    city_caps: Dict[str, float],
    risk_penalty: float = 0.0
) -> Dict[str, Any]:
    """
    LP formulation:
    Maximize: sum(allocation[i] * (yield[i] - risk_penalty * risk[i]))
    Subject to:
        - sum(allocation[i] * price[i]) <= budget
        - sum(allocation[i] where sector == s) <= sector_cap[s] for all s
        - sum(allocation[i] where city == c) <= city_cap[c] for all c
        - 0 <= allocation[i] <= 1 for all i
    """
    n = len(deals)
    
    # Objective: maximize yield (so negate for linprog minimization)
    c = np.array([-(d['yield'] - risk_penalty * d.get('risk', 0)) for d in deals])
    
    # Budget constraint: sum(allocation * price) <= budget
    A_budget = np.array([[d['price'] for d in deals]])
    b_budget = np.array([budget])
    
    # Sector caps (build constraint matrix)
    sectors = list(sector_caps.keys())
    A_sector = []
    b_sector = []
    for sector in sectors:
        row = [1 if d['sector'] == sector else 0 for d in deals]
        A_sector.append(row)
        b_sector.append(sector_caps[sector])
    
    # City caps
    cities = list(city_caps.keys())
    A_city = []
    b_city = []
    for city in cities:
        row = [1 if d['city'] == city else 0 for d in deals]
        A_city.append(row)
        b_city.append(city_caps[city])
    
    # Combine constraints
    A_ub = np.vstack([A_budget, A_sector, A_city]) if A_sector and A_city else A_budget
    b_ub = np.concatenate([b_budget, b_sector, b_city]) if A_sector and A_city else b_budget
    
    # Bounds: 0 <= allocation <= 1
    bounds = [(0, 1) for _ in range(n)]
    
    # Solve
    result = linprog(
        c=c,
        A_ub=A_ub,
        b_ub=b_ub,
        bounds=bounds,
        method='highs',
        options={'presolve': True}
    )
    
    if not result.success:
        raise ValueError(f"Optimization failed: {result.message}")
    
    # Extract results
    allocations = result.x
    objective_value = -result.fun  # Negate back to maximization
    
    # Shadow prices (dual values) for explainability
    shadow_prices = result.ineqlin.marginals if hasattr(result, 'ineqlin') else []
    
    # Binding constraints (slack near zero)
    slack = b_ub - A_ub @ allocations
    binding_constraints = []
    constraint_names = ['budget'] + [f'sector_{s}' for s in sectors] + [f'city_{c}' for c in cities]
    for i, (name, sl) in enumerate(zip(constraint_names, slack)):
        if abs(sl) < 1e-6:
            binding_constraints.append({
                'constraint': name,
                'slack': float(sl),
                'shadow_price': float(shadow_prices[i]) if shadow_prices else None
            })
    
    return {
        'status': 'optimal',
        'objective_value': float(objective_value),
        'allocations': [
            {
                'deal_id': deals[i]['id'],
                'allocation': float(allocations[i]),
                'allocated_amount': float(allocations[i] * deals[i]['price'])
            }
            for i in range(n) if allocations[i] > 1e-6
        ],
        'binding_constraints': binding_constraints,
        'total_allocated': float(np.sum(allocations * np.array([d['price'] for d in deals]))),
        'total_yield': float(objective_value)
    }
```

---

### **3. Database Schema (PostgreSQL)**

```sql
-- Add to existing Prisma schema or create new tables

CREATE TABLE optimizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    module_type VARCHAR(50) NOT NULL, -- 'deal-picker', 'debt-stack', etc.
    input_data JSONB NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'pending', -- 'pending', 'running', 'completed', 'failed'
    created_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    error_message TEXT
);

CREATE TABLE optimization_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    optimization_id UUID NOT NULL REFERENCES optimizations(id) ON DELETE CASCADE,
    result_data JSONB NOT NULL, -- Full solver output
    objective_value DECIMAL,
    binding_constraints JSONB,
    shadow_prices JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE optimization_files (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    optimization_id UUID NOT NULL REFERENCES optimizations(id) ON DELETE CASCADE,
    file_type VARCHAR(10) NOT NULL, -- 'xlsx', 'csv', 'pdf'
    file_name VARCHAR(255) NOT NULL,
    file_path TEXT NOT NULL,
    file_size INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_optimizations_user_id ON optimizations(user_id);
CREATE INDEX idx_optimization_results_optimization_id ON optimization_results(optimization_id);
```

#### **Prisma Schema Addition**

```prisma
// Add to backend/prisma/schema.prisma

model Optimization {
  id          String   @id @default(cuid())
  userId      String
  user        User     @relation(fields: [userId], references: [id])
  
  moduleType  ModuleType
  inputData   Json
  status      OptimizationStatus @default(PENDING)
  
  createdAt   DateTime @default(now())
  completedAt DateTime?
  errorMessage String?
  
  results     OptimizationResult[]
  files       OptimizationFile[]
  
  @@map("optimizations")
}

model OptimizationResult {
  id              String   @id @default(cuid())
  optimizationId  String
  optimization    Optimization @relation(fields: [optimizationId], references: [id], onDelete: Cascade)
  
  resultData      Json
  objectiveValue  Decimal?
  bindingConstraints Json?
  shadowPrices    Json?
  
  createdAt       DateTime @default(now())
  
  @@map("optimization_results")
}

model OptimizationFile {
  id              String   @id @default(cuid())
  optimizationId  String
  optimization    Optimization @relation(fields: [optimizationId], references: [id], onDelete: Cascade)
  
  fileType        String   // 'xlsx', 'csv', 'pdf'
  fileName        String
  filePath        String
  fileSize        Int?
  
  createdAt       DateTime @default(now())
  
  @@map("optimization_files")
}

enum ModuleType {
  DEAL_PICKER
  DEBT_STACK
  CAPEX_PHASING
  LEASING_MIX
}

enum OptimizationStatus {
  PENDING
  RUNNING
  COMPLETED
  FAILED
}
```

---

## 🚀 Development Plan

### **Phase 1: Foundation (Week 1-2)**

**Goal:** Set up Python backend and basic infrastructure

#### **Tasks:**
1. **Set up Python FastAPI service**
   - Initialize project structure
   - Set up virtual environment
   - Install dependencies (FastAPI, SciPy, OR-Tools, etc.)
   - Create `Dockerfile` for deployment

2. **Database setup**
   - Add Prisma schema changes
   - Run migrations
   - Test database connectivity from Python

3. **Basic API scaffolding**
   - Health check endpoint
   - CORS configuration
   - Basic error handling
   - Request/response logging

4. **Development environment**
   - Docker Compose for local development
   - Hot reload configuration
   - Environment variables setup

**Deliverables:**
- [ ] Python FastAPI service running on `localhost:8001`
- [ ] Database schema migrated
- [ ] Docker Compose setup
- [ ] Health check endpoint working

---

### **Phase 2: Deal Picker Module (Week 3-4)**

**Goal:** Implement and deploy first optimization module end-to-end

#### **Backend Tasks:**
1. **Solver implementation**
   - Implement LP solver using SciPy HiGHS
   - Add shadow price extraction
   - Add binding constraint detection
   - Write unit tests

2. **API endpoint**
   - Define Pydantic request/response schemas
   - Implement `/api/v1/deal-picker/optimize` endpoint
   - Add CSV file upload support
   - Add result storage to database

3. **File generation**
   - Implement XLSX writer for allocation results
   - Implement CSV export
   - Add file storage (local or S3)

#### **Frontend Tasks:**
1. **Landing page**
   - Create `/optimizations` page
   - Add module cards (4 modules)
   - Add hero section with value props

2. **Deal Picker UI**
   - Create `/optimizations/deal-picker` page
   - Build 3-step wizard (Input → Run → Results)
   - Implement form with React Hook Form + Zod
   - Add CSV upload widget
   - Build results visualization (charts, tables)
   - Add explainability panels (binding constraints, shadow prices)
   - Implement file download buttons

3. **API integration**
   - Create API client functions
   - Add Zod schemas for validation
   - Implement error handling
   - Add loading states

**Deliverables:**
- [ ] Deal Picker solver working with unit tests
- [ ] Deal Picker API endpoint deployed
- [ ] Deal Picker frontend UI complete
- [ ] End-to-end flow tested
- [ ] XLSX/CSV downloads working

---

### **Phase 3: Debt Stack & Capex Modules (Week 5-6)**

**Goal:** Add second and third optimization modules

#### **Backend Tasks:**
1. **Debt Stack solver** (LP)
   - Implement LTV/DSCR constraints
   - Add scenario weighting for floating rates
   - Add hedge optimization (optional)
   - Generate debt amortization schedule

2. **Capex Phasing solver** (MILP)
   - Implement OR-Tools CBC solver
   - Add monthly cash constraints
   - Add parallel project capacity limits
   - Calculate rent uplift timeline

3. **File generation**
   - Debt Stack: term sheet PDF + amortization XLSX
   - Capex: Gantt chart XLSX

#### **Frontend Tasks:**
1. **Debt Stack UI**
   - Build form for LTV/DSCR inputs
   - Add tranche builder interface
   - Create results dashboard (stack visualization)
   - Add term sheet preview

2. **Capex Phasing UI**
   - Build project input form
   - Add capacity constraint inputs
   - Create Gantt chart visualization
   - Add timeline and uplift charts

**Deliverables:**
- [ ] Debt Stack module complete
- [ ] Capex Phasing module complete
- [ ] Both modules tested and deployed
- [ ] Documentation updated

---

### **Phase 4: Leasing Mix & Polish (Week 7-8)**

**Goal:** Complete all modules and add advanced features

#### **Backend Tasks:**
1. **Leasing Mix solver** (LP)
   - Implement WAULT linearization
   - Add incentive budget constraints
   - Add occupancy targets
   - Calculate 12-month NCF

2. **Advanced features**
   - Add "What-If" scenario builder
   - Add optimization history
   - Add result comparison
   - Implement caching for repeated runs

#### **Frontend Tasks:**
1. **Leasing Mix UI**
   - Build package builder
   - Add WAULT constraint inputs
   - Create leasing offer visualization
   - Add NCF timeline chart

2. **Polish & UX**
   - Add AI assistant prompts (copy from optimizations_prompts.md)
   - Implement tooltips for all inputs
   - Add empty states and error handling
   - Improve loading states and animations
   - Add success modals and commitment flows

3. **Advanced features**
   - What-If scenario builder UI
   - Optimization history page
   - Result comparison tool
   - Secure link sharing

**Deliverables:**
- [ ] All 4 modules complete and deployed
- [ ] AI assistant integrated
- [ ] Advanced features working
- [ ] Full UX polish complete

---

### **Phase 5: Testing & Deployment (Week 9-10)**

**Goal:** Production-ready deployment with monitoring

#### **Tasks:**
1. **Testing**
   - Full E2E testing of all modules
   - Load testing (concurrent optimizations)
   - Security testing (auth, file uploads)
   - Browser compatibility testing

2. **Deployment**
   - Deploy Python service to Railway/Render
   - Set up Redis for caching
   - Configure file storage (S3 or equivalent)
   - Set up monitoring (Sentry, logs)

3. **Documentation**
   - API documentation (Swagger)
   - User guide for each module
   - Video tutorials
   - Sample datasets and templates

4. **Performance optimization**
   - Add result caching
   - Optimize solver parameters
   - Add job queue for long-running optimizations
   - Implement rate limiting

**Deliverables:**
- [ ] Production deployment complete
- [ ] Monitoring and alerting set up
- [ ] Documentation complete
- [ ] Performance optimized

---

## 💰 Cost Estimation

### **Development Costs (Time)**

| Phase | Duration | Effort | Notes |
|-------|----------|--------|-------|
| Phase 1: Foundation | 2 weeks | 60 hours | Python setup, DB schema |
| Phase 2: Deal Picker | 2 weeks | 80 hours | First module (reference) |
| Phase 3: Debt + Capex | 2 weeks | 70 hours | Leverage Phase 2 patterns |
| Phase 4: Leasing + Polish | 2 weeks | 60 hours | Final module + UX |
| Phase 5: Testing + Deploy | 2 weeks | 50 hours | QA, deployment, docs |
| **Total** | **10 weeks** | **320 hours** | ~2.5 months |

### **Infrastructure Costs (Monthly)**

| Service | Provider | Cost | Notes |
|---------|----------|------|-------|
| Frontend hosting | Vercel | $0 | Free tier sufficient |
| Node.js backend | Railway | $5-10 | Existing |
| **Python backend** | Railway/Render | $7-12 | **New** |
| PostgreSQL | Railway | Included | Existing |
| Redis | Railway | Included | Existing |
| File storage | AWS S3 | $5-10 | For XLSX/PDF files |
| Monitoring | Sentry | $0-26 | Free tier → Team |
| **Total Monthly** | - | **$17-58** | Incremental: $12-20 |

---

## 🔒 Security Considerations

1. **Authentication**
   - All optimization endpoints require Bearer token
   - User can only access their own optimization results
   - File downloads require signed URLs (time-limited)

2. **Input Validation**
   - Pydantic schemas validate all inputs
   - File upload size limits (10MB max)
   - CSV/Excel format validation
   - Sanity checks on constraint values

3. **Rate Limiting**
   - 10 optimization requests per user per hour
   - 100 file downloads per user per day
   - Redis-backed rate limiting

4. **Data Privacy**
   - Optimization inputs/results stored encrypted
   - Files auto-deleted after 30 days
   - GDPR compliance (data export, deletion)

5. **Infrastructure**
   - HTTPS only
   - CORS restricted to production domains
   - Secrets in environment variables (never committed)
   - Regular dependency updates

---

## 📈 Success Metrics

### **Technical Metrics**
- Optimization success rate > 95%
- Average solve time < 5 seconds (LP), < 30 seconds (MILP)
- API uptime > 99.5%
- File generation success rate > 99%

### **Business Metrics**
- User adoption: 20% of active users try optimization
- Module usage: Deal Picker > Debt Stack > Capex > Leasing
- Conversion: 30% of optimization users book consultation
- Retention: 50% of users run multiple optimizations

### **User Experience Metrics**
- Time to first optimization < 5 minutes
- User satisfaction (NPS) > 8/10
- Support ticket rate < 2% of optimization runs
- What-If scenario usage > 40% of optimizations

---

## 🎓 Training & Documentation

### **For Development Team**
1. **Python optimization primer**
   - Linear programming fundamentals
   - SciPy and OR-Tools tutorials
   - Best practices for solver configuration

2. **Architecture walkthrough**
   - Microservices communication patterns
   - Database schema and relationships
   - File generation and storage

3. **Code review checklist**
   - Solver validation tests
   - Input sanitization
   - Error handling
   - Performance benchmarks

### **For End Users**
1. **Video tutorials** (5-10 min each)
   - Deal Picker walkthrough
   - Understanding shadow prices
   - What-If scenario building
   - Exporting and sharing results

2. **Sample datasets**
   - Pre-filled CSV templates
   - Realistic example portfolios
   - Edge case scenarios

3. **Help documentation**
   - Glossary of optimization terms
   - Troubleshooting guide
   - FAQ for each module

---

## 🚨 Risk Mitigation

### **Technical Risks**

| Risk | Impact | Mitigation |
|------|--------|------------|
| Solver performance issues | High | Add timeout limits, queue long jobs, benchmark before launch |
| Python deployment complexity | Medium | Use Docker, test early on Railway/Render |
| File storage costs | Low | Auto-delete after 30 days, compress files |
| Integration bugs | Medium | Comprehensive E2E tests, staging environment |

### **Business Risks**

| Risk | Impact | Mitigation |
|------|--------|------------|
| Low user adoption | High | Launch with sample data, video tutorials, free trial |
| Complex UX confuses users | Medium | User testing, progressive disclosure, AI assistant |
| Incorrect optimization results | Critical | Extensive unit tests, manual validation, disclaimer |
| Support burden | Medium | Self-service docs, AI explanations, expert fallback |

---

## 🎯 Next Immediate Actions

### **This Week (Week 1)**
1. [ ] Review and approve this architecture plan
2. [ ] Set up Python development environment
3. [ ] Initialize FastAPI project structure
4. [ ] Create `optimization-service` directory
5. [ ] Set up Docker Compose for local development
6. [ ] Add database schema changes (Prisma migration)

### **Next Week (Week 2)**
1. [ ] Implement Deal Picker LP solver (core logic)
2. [ ] Write unit tests for solver
3. [ ] Create FastAPI endpoint stub
4. [ ] Build frontend landing page (`/optimizations`)
5. [ ] Create frontend Deal Picker page scaffold

### **Approval Checklist**
- [ ] Architecture approved by technical lead
- [ ] Budget approved ($12-20/month infrastructure)
- [ ] Timeline approved (10 weeks)
- [ ] Team capacity confirmed
- [ ] Priorities aligned with business goals

---

## 📞 Questions & Decisions Needed

1. **Deployment Platform**: Railway or Render for Python backend?
   - **Recommendation**: Railway (simpler, all-in-one)

2. **File Storage**: AWS S3 or local storage?
   - **Recommendation**: S3 for production, local for dev

3. **Authentication**: Use existing Node.js auth or implement in Python?
   - **Recommendation**: Frontend sends JWT, Python validates (shared secret)

4. **Phased Rollout**: Beta test with subset of users first?
   - **Recommendation**: Yes, start with 10-20 beta users per module

5. **Pricing**: Free tier, pay-per-optimization, or subscription?
   - **Recommendation**: Free for first 5/month, then $50/month unlimited

---

**Document Status:** Ready for Review  
**Next Update:** After Phase 1 completion  
**Owner:** Development Team  
**Reviewers:** Technical Lead, Product Manager, Founders

---

*This architecture is designed to integrate seamlessly with your existing Next.js frontend and Node.js backend while leveraging Python's superior optimization ecosystem. The microservices approach keeps concerns separated and allows independent scaling.*

