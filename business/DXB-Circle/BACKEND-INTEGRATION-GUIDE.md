# 🔌 Backend Integration Guide - Complete Setup

**Date:** October 6, 2025  
**Status:** ✅ Backend Ready | 🔄 Integration In Progress

---

## 🎯 **Overview**

This guide covers the complete backend setup and frontend integration for the **Beechford Estate Office Smart Plans API** — a Python FastAPI backend providing institutional-grade optimization services.

---

## 📂 **Architecture**

### **Tech Stack:**
```
Frontend (Next.js/React/TypeScript)
        ↓
  API Calls (fetch)
        ↓
Backend (Python FastAPI)
        ↓
Optimization Engines:
  - SciPy HiGHS (Linear Programming)
  - OR-Tools CBC (Mixed-Integer Programming)
        ↓
Response (JSON) + Downloads (XLSX, PDF)
```

---

## ✅ **Backend Setup (Complete)**

### **1. Virtual Environment Created**
```bash
cd circle-property-fullstack/circle_optimizations_project
python3 -m venv venv
source venv/bin/activate
```

### **2. Dependencies Installed**
```bash
pip install -r requirements.txt
```

**Packages Installed:**
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `numpy` - Numerical computing
- `scipy` - Scientific computing (LP solver)
- `ortools` - Google OR-Tools (MILP solver)
- `openpyxl` - Excel file generation
- `reportlab` - PDF generation
- `pytest` - Testing framework

### **3. App Structure**
```
circle_optimizations_project/
├── app/
│   ├── main.py                    # FastAPI app + CORS + health check
│   ├── routers/                   # API endpoints
│   │   ├── deal_picker.py         # POST /optimize/deal-picker
│   │   ├── debt_stack.py          # POST /optimize/debt-stack
│   │   ├── capex_phasing.py       # POST /optimize/capex-phasing
│   │   └── leasing_mix.py         # POST /optimize/leasing-mix
│   ├── schemas/                   # Request/Response models
│   │   ├── deal_picker.py
│   │   ├── debt_stack.py
│   │   ├── capex.py
│   │   └── leasing.py
│   └── services/                  # Business logic
│       ├── optimizers/            # LP/MILP solvers
│       │   ├── deal_picker_lp.py
│       │   ├── debt_stack_lp.py
│       │   ├── capex_milp.py
│       │   └── leasing_lp.py
│       └── files/                 # XLSX/PDF writers
│           ├── xlsx_writer.py
│           └── pdf_writer.py
├── venv/                          # Python virtual environment
├── requirements.txt               # Dependencies
├── Dockerfile                     # For deployment
└── .gitignore
```

### **4. Branding Updated**
✅ Changed `Circle Property` → `Beechford Estate Office` in:
- API title
- Service name
- Health check response
- Root endpoint message

---

## 🌐 **CORS Configuration**

### **Allowed Origins:**
```python
allow_origins=[
    "http://localhost:3000",        # Local development
    "https://circle-property-website.vercel.app"  # Production
]
```

**Note:** Update production URL when deploying to Vercel with Beechford domain.

---

## 🚀 **Running Backend Locally**

### **Start Server:**
```bash
cd circle-property-fullstack/circle_optimizations_project
source venv/bin/activate
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8001
```

### **Expected Output:**
```
INFO:     Uvicorn running on http://0.0.0.0:8001 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### **Test Endpoints:**

#### **Health Check:**
```bash
curl http://localhost:8001/health
```
**Response:**
```json
{
  "status": "ok",
  "service": "beechford-smart-plans-api",
  "version": "1.0.0"
}
```

#### **API Info:**
```bash
curl http://localhost:8001/
```
**Response:**
```json
{
  "message": "Beechford Estate Office - Smart Plans API",
  "tagline": "Institutional-grade modeling with full transparency",
  "docs": "/docs",
  "modules": ["deal-picker", "debt-stack", "capex-phasing", "leasing-mix"],
  "health": "/health"
}
```

#### **Interactive Docs:**
Open in browser: `http://localhost:8001/docs`

---

## 🔌 **Frontend Integration**

### **API Configuration**

#### **1. Create Environment Variables**

**File:** `circle-property-fullstack/frontend/.env.local`
```bash
# Backend API URL
NEXT_PUBLIC_API_URL=http://localhost:8001

# Production API URL (update when deploying)
# NEXT_PUBLIC_API_URL=https://api.beechfordestates.com
```

#### **2. Create API Client**

**File:** `frontend/src/lib/api-client.ts`
```typescript
// API Client for Smart Plans Backend

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message)
    this.name = 'ApiError'
  }
}

async function fetchAPI(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`
  
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Unknown error' }))
    throw new ApiError(response.status, error.message || response.statusText)
  }

  return response.json()
}

export const api = {
  // Health check
  health: () => fetchAPI('/health'),

  // Deal Picker
  optimizeDealPicker: (data: any) => 
    fetchAPI('/optimize/deal-picker', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Debt Stack
  optimizeDebtStack: (data: any) =>
    fetchAPI('/optimize/debt-stack', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // CapEx Phasing
  optimizeCapEx: (data: any) =>
    fetchAPI('/optimize/capex-phasing', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Leasing Mix
  optimizeLeasingMix: (data: any) =>
    fetchAPI('/optimize/leasing-mix', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // Download files
  downloadFile: (fileUrl: string) =>
    fetch(`${API_BASE_URL}${fileUrl}`).then(res => res.blob()),
}
```

---

### **3. Update Optimizer Pages**

#### **Example: Deal Picker Integration**

**Before** (Mock data):
```typescript
const handleRunOptimization = () => {
  // Mock optimization logic
  const mockResult = {
    portfolio_summary: { /* ... */ },
    asset_allocations: [ /* ... */ ],
    // ...
  }
  setResult(mockResult)
}
```

**After** (Real API):
```typescript
import { api, ApiError } from '@/lib/api-client'

const handleRunOptimization = async () => {
  setLoading(true)
  setError(null)
  
  try {
    const requestData = {
      budget,
      objective,
      risk_penalty: riskPenalty,
      target_yield: objective === 'target_yield' ? targetYield / 100 : null,
      deals: deals.map(d => ({
        deal_id: d.deal_id,
        ask_price: d.ask_price,
        expected_noi: d.expected_noi,
        sector: d.sector,
        city: d.city,
        risk_score: d.risk_score,
        must_buy: d.must_buy,
      })),
    }

    const response = await api.optimizeDealPicker(requestData)
    setResult(response)
  } catch (err) {
    if (err instanceof ApiError) {
      setError(`Optimization failed: ${err.message}`)
    } else {
      setError('An unexpected error occurred')
    }
    console.error('Optimization error:', err)
  } finally {
    setLoading(false)
  }
}
```

---

### **4. Add Loading & Error States**

```typescript
const [loading, setLoading] = useState(false)
const [error, setError] = useState<string | null>(null)

// In UI:
{loading && (
  <div className="flex items-center justify-center py-12">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
    <p className="ml-4 text-slate-600">Running optimization...</p>
  </div>
)}

{error && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    <p className="text-red-800">{error}</p>
    <button onClick={() => setError(null)} className="text-red-600 underline mt-2">
      Dismiss
    </button>
  </div>
)}
```

---

### **5. File Downloads**

```typescript
const handleDownloadXLSX = async () => {
  try {
    const blob = await api.downloadFile(result.download_links.xlsx)
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `deal-picker-${Date.now()}.xlsx`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  } catch (err) {
    console.error('Download failed:', err)
    alert('Failed to download file')
  }
}
```

---

## 🧪 **Testing**

### **1. Backend Unit Tests**
```bash
cd circle_optimizations_project
source venv/bin/activate
pytest tests/
```

### **2. API Integration Tests**

#### **Test Health Endpoint:**
```bash
curl -X GET http://localhost:8001/health
```

#### **Test Deal Picker:**
```bash
curl -X POST http://localhost:8001/optimize/deal-picker \
  -H "Content-Type: application/json" \
  -d '{
    "budget": 10000000,
    "objective": "cash_yield",
    "deals": [
      {
        "deal_id": "DEAL-001",
        "ask_price": 2500000,
        "expected_noi": 200000,
        "sector": "Residential",
        "city": "Dubai Marina",
        "risk_score": 3,
        "must_buy": false
      }
    ]
  }'
```

---

## 🚢 **Deployment**

### **Railway Deployment**

#### **1. Install Railway CLI:**
```bash
npm install -g @railway/cli
```

#### **2. Login:**
```bash
railway login
```

#### **3. Initialize Project:**
```bash
cd circle_optimizations_project
railway init
```

#### **4. Deploy:**
```bash
railway up
```

#### **5. Set Environment Variables:**
```bash
railway variables set PORT=8001
railway variables set PYTHONUNBUFFERED=1
```

#### **6. Get Deployment URL:**
```bash
railway status
```
**Example URL:** `https://beechford-api-production.up.railway.app`

---

### **Docker Deployment (Alternative)**

#### **Build Image:**
```bash
docker build -t beechford-api .
```

#### **Run Container:**
```bash
docker run -d -p 8001:8001 --name beechford-api beechford-api
```

#### **Push to Registry:**
```bash
docker tag beechford-api ghcr.io/your-org/beechford-api:latest
docker push ghcr.io/your-org/beechford-api:latest
```

---

## 🔧 **Frontend Configuration Updates**

### **Update CORS Origins (After Deployment)**

**File:** `circle_optimizations_project/app/main.py`
```python
allow_origins=[
    "http://localhost:3000",
    "https://beechford-estates-website.vercel.app",  # Update to actual domain
    "https://www.beechfordestates.com"  # Custom domain
]
```

### **Update Frontend .env**

**Production:**
```bash
NEXT_PUBLIC_API_URL=https://beechford-api-production.up.railway.app
```

---

## ✅ **Integration Checklist**

### **Backend:**
- [x] Virtual environment created
- [x] Dependencies installed
- [x] App imports successfully
- [x] Branding updated to Beechford
- [x] CORS configured
- [x] Health endpoint tested
- [ ] All 4 optimizer endpoints tested
- [ ] File generation tested (XLSX, PDF)
- [ ] Deployed to Railway

### **Frontend:**
- [ ] API client created (`api-client.ts`)
- [ ] Environment variables configured (`.env.local`)
- [ ] Deal Picker connected to backend
- [ ] Debt Stack connected to backend
- [ ] CapEx Phasing connected to backend
- [ ] Leasing Mix connected to backend
- [ ] Loading states added
- [ ] Error handling implemented
- [ ] File downloads tested
- [ ] Production API URL updated (after deployment)

---

## 🎯 **Next Steps**

### **Phase 1: Local Testing** (Current)
1. ✅ Start backend server
2. ✅ Verify health endpoint
3. 🔄 Test each optimizer endpoint manually
4. 🔄 Create API client in frontend
5. 🔄 Connect Deal Picker to backend
6. 🔄 Test full optimization flow locally

### **Phase 2: Full Integration**
7. Connect remaining 3 optimizers
8. Add loading states & error handling
9. Test file downloads
10. Implement retry logic
11. Add request/response logging

### **Phase 3: Deployment**
12. Deploy backend to Railway
13. Update frontend environment variables
14. Test production API connection
15. Monitor performance & errors
16. Set up logging & analytics

---

## 📊 **API Endpoints Summary**

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/health` | GET | Health check |
| `/` | GET | API info |
| `/docs` | GET | Interactive API docs (Swagger UI) |
| `/optimize/deal-picker` | POST | Portfolio optimization |
| `/optimize/debt-stack` | POST | Debt structuring |
| `/optimize/capex-phasing` | POST | CapEx scheduling |
| `/optimize/leasing-mix` | POST | Leasing optimization |
| `/files/outputs/*` | GET | Download generated files |

---

## 🎉 **Status Summary**

### **✅ Completed:**
- Python virtual environment setup
- All dependencies installed
- FastAPI app configured
- Branding updated to Beechford
- CORS middleware added
- Health check endpoint verified
- App structure validated

### **🔄 In Progress:**
- Frontend API client creation
- Optimizer endpoint testing
- Full integration with all 4 modules

### **⏳ Pending:**
- Railway deployment
- Production URL configuration
- End-to-end testing
- Monitoring setup

---

**Backend is ready! Next: Create API client and connect frontend optimizers.** 🔌⚡✨

