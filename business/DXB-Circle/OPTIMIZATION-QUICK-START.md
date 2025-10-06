# Circle Property Optimizations - Quick Start Guide

**Date:** October 5, 2025  
**Status:** Ready to Begin Implementation

---

## 🎯 What We're Building

**4 Optimization Modules** for institutional real estate investors:

1. **Deal Picker** - Budget-constrained portfolio selection (LP)
2. **Debt Stack Mixer** - LTV/DSCR-compliant financing (LP)
3. **Capex Phasing** - Value-add project scheduling (MILP)
4. **Leasing Mix** - Revenue optimization with WAULT (LP)

---

## 🏗️ Architecture Summary

### **Hybrid Microservices**

```
Frontend (Next.js 15) → Node.js Backend (existing) → PostgreSQL
                     ↓
                     → Python Backend (new) → SciPy/OR-Tools
                                           → File Generation (XLSX/PDF)
```

**Why Python?**
- ✅ SciPy and OR-Tools are industry-standard for optimization
- ✅ Better performance for CPU-intensive math
- ✅ Rich data science ecosystem (pandas, numpy, openpyxl)
- ✅ Clean separation of concerns (optimization vs business logic)

**Cost:** +$12-20/month (Python backend + file storage)

---

## 📋 10-Week Development Plan

| Phase | Duration | Deliverables |
|-------|----------|--------------|
| **Phase 1: Foundation** | Week 1-2 | Python FastAPI service, DB schema, Docker setup |
| **Phase 2: Deal Picker** | Week 3-4 | First module end-to-end (reference implementation) |
| **Phase 3: Debt + Capex** | Week 5-6 | Two more modules leveraging Phase 2 patterns |
| **Phase 4: Leasing + Polish** | Week 7-8 | Final module + UX polish + AI assistant |
| **Phase 5: Testing + Deploy** | Week 9-10 | Production deployment + monitoring + docs |

**Total Effort:** 320 hours (~2.5 months)

---

## 🚀 Week 1 Action Items

### **Day 1-2: Setup Python Environment**

```bash
# Create Python service directory
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack
mkdir optimization-service
cd optimization-service

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # On Mac/Linux

# Create requirements.txt
cat > requirements.txt << EOF
fastapi==0.109.0
uvicorn[standard]==0.27.0
pydantic==2.5.0
sqlalchemy==2.0.25
psycopg2-binary==2.9.9
redis==5.0.1
scipy==1.12.0
ortools==9.8.3296
numpy==1.26.3
pandas==2.1.4
openpyxl==3.1.2
reportlab==4.0.9
pytest==7.4.4
httpx==0.26.0
EOF

# Install dependencies
pip install -r requirements.txt

# Create project structure
mkdir -p app/{routers,solvers,models,writers,utils,static/{templates,outputs}}
mkdir tests
touch app/__init__.py app/main.py app/config.py
```

### **Day 3: Basic FastAPI Setup**

```python
# app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Circle Property Optimization API",
    version="1.0.0",
    description="Industrial-grade optimization for real estate decisions"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {
        "status": "ok",
        "service": "optimization-api",
        "version": "1.0.0"
    }

@app.get("/")
async def root():
    return {
        "message": "Circle Property Optimization API",
        "docs": "/docs",
        "health": "/health"
    }
```

```bash
# Run the server
uvicorn app.main:app --reload --port 8001

# Test it
curl http://localhost:8001/health
# Should return: {"status":"ok","service":"optimization-api","version":"1.0.0"}
```

### **Day 4: Database Schema**

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
  
  fileType        String
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

```bash
# Run migration
cd ../backend
npx prisma migrate dev --name add_optimization_tables
npx prisma generate
```

### **Day 5: Docker Setup**

```dockerfile
# optimization-service/Dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application
COPY ./app ./app

# Expose port
EXPOSE 8001

# Run application
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8001"]
```

```yaml
# Add to docker-compose.yml
services:
  optimization-api:
    build:
      context: ./optimization-service
      dockerfile: Dockerfile
    ports:
      - "8001:8001"
    environment:
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
    depends_on:
      - postgres
      - redis
    volumes:
      - ./optimization-service/app:/app/app
```

```bash
# Test Docker setup
docker-compose up optimization-api

# Should see: "Application startup complete"
```

---

## 🧪 Week 2: First Solver

### **Deal Picker LP Solver**

```python
# app/solvers/deal_picker_solver.py
from scipy.optimize import linprog
import numpy as np
from typing import List, Dict, Any

def optimize_deal_picker(
    deals: List[Dict[str, Any]],
    budget: float,
    sector_caps: Dict[str, float] = None,
    city_caps: Dict[str, float] = None
) -> Dict[str, Any]:
    """
    Maximize: sum(allocation[i] * yield[i])
    Subject to:
        - sum(allocation[i] * price[i]) <= budget
        - 0 <= allocation[i] <= 1
    """
    n = len(deals)
    
    # Objective (negate for minimization)
    c = np.array([-d['yield'] for d in deals])
    
    # Budget constraint
    A_budget = np.array([[d['price'] for d in deals]])
    b_budget = np.array([budget])
    
    # Bounds
    bounds = [(0, 1) for _ in range(n)]
    
    # Solve
    result = linprog(
        c=c,
        A_ub=A_budget,
        b_ub=b_budget,
        bounds=bounds,
        method='highs'
    )
    
    if not result.success:
        raise ValueError(f"Optimization failed: {result.message}")
    
    allocations = result.x
    objective = -result.fun
    
    return {
        'status': 'optimal',
        'objective_value': float(objective),
        'allocations': [
            {
                'deal_id': deals[i]['id'],
                'allocation': float(allocations[i]),
                'amount': float(allocations[i] * deals[i]['price'])
            }
            for i in range(n) if allocations[i] > 1e-6
        ]
    }
```

### **Test the Solver**

```python
# tests/test_deal_picker.py
import pytest
from app.solvers.deal_picker_solver import optimize_deal_picker

def test_simple_deal_picker():
    deals = [
        {'id': '1', 'price': 1000000, 'yield': 0.06},
        {'id': '2', 'price': 1500000, 'yield': 0.07},
        {'id': '3', 'price': 2000000, 'yield': 0.055}
    ]
    budget = 3000000
    
    result = optimize_deal_picker(deals, budget)
    
    assert result['status'] == 'optimal'
    assert result['objective_value'] > 0
    assert len(result['allocations']) > 0
    
    # Check budget constraint
    total_allocated = sum(a['amount'] for a in result['allocations'])
    assert total_allocated <= budget

def test_infeasible_budget():
    deals = [
        {'id': '1', 'price': 1000000, 'yield': 0.06}
    ]
    budget = 500000  # Too low
    
    # Should handle gracefully
    result = optimize_deal_picker(deals, budget)
    
    # Solver should return partial allocation or feasible solution
    assert result['status'] in ['optimal', 'feasible']
```

```bash
# Run tests
pytest tests/test_deal_picker.py -v

# Should see: 2 passed
```

---

## 📊 Week 3-4: Deal Picker Module Complete

### **Frontend Page Structure**

```tsx
// frontend/src/app/optimizations/deal-picker/page.tsx
'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const dealPickerSchema = z.object({
  budget: z.number().min(100000).max(1000000000),
  deals: z.array(z.object({
    id: z.string(),
    name: z.string(),
    price: z.number(),
    yield: z.number(),
    sector: z.string(),
    city: z.string()
  })).min(2)
})

type DealPickerInput = z.infer<typeof dealPickerSchema>

export default function DealPickerPage() {
  const [step, setStep] = useState(1) // 1: Input, 2: Running, 3: Results
  const [results, setResults] = useState(null)
  
  const { register, handleSubmit, formState: { errors } } = useForm<DealPickerInput>({
    resolver: zodResolver(dealPickerSchema)
  })
  
  const onSubmit = async (data: DealPickerInput) => {
    setStep(2)
    
    try {
      const response = await fetch('http://localhost:8001/api/v1/deal-picker/optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })
      
      const result = await response.json()
      setResults(result)
      setStep(3)
    } catch (error) {
      console.error('Optimization failed:', error)
      setStep(1)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Deal Picker</h1>
      
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Form inputs */}
        </form>
      )}
      
      {step === 2 && (
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Running optimization...</p>
        </div>
      )}
      
      {step === 3 && results && (
        <div>
          <h2 className="text-2xl font-bold mb-4">Results</h2>
          <div className="bg-white rounded-lg p-6 shadow">
            <p className="text-lg">Total Yield: {results.objective_value.toFixed(2)}%</p>
            <p className="text-lg">Deals Selected: {results.allocations.length}</p>
            {/* More results UI */}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## 🎯 Success Criteria

### **Week 1-2 (Foundation)**
- [ ] Python FastAPI running on `localhost:8001`
- [ ] `/health` endpoint returns 200
- [ ] Database schema migrated
- [ ] Docker Compose working
- [ ] Deal Picker solver passes unit tests

### **Week 3-4 (Deal Picker Module)**
- [ ] API endpoint `POST /deal-picker/optimize` working
- [ ] Frontend page accessible at `/optimizations/deal-picker`
- [ ] Can upload CSV and run optimization
- [ ] Results display with charts
- [ ] XLSX download working
- [ ] End-to-end test passing

---

## 📚 Key Resources

### **Documentation Created**
1. `optimization_pack.md` - Engineering requirements
2. `optimizations_prompts.md` - UX copy and prompts
3. `OPTIMIZATION-ARCHITECTURE-PLAN.md` - Full architecture (this document)
4. `OPTIMIZATION-QUICK-START.md` - Quick start guide

### **External Resources**
- **SciPy LP:** https://docs.scipy.org/doc/scipy/reference/optimize.linprog-highs.html
- **OR-Tools:** https://developers.google.com/optimization
- **FastAPI:** https://fastapi.tiangolo.com/
- **React Hook Form:** https://react-hook-form.com/
- **Zod:** https://zod.dev/

---

## 🚨 Common Pitfalls to Avoid

1. **Don't scale too early** - Start with simple LP, add MILP only when needed
2. **Don't skip tests** - Optimization bugs are hard to catch without unit tests
3. **Don't ignore explainability** - Shadow prices and binding constraints are critical
4. **Don't over-optimize** - 5-second solve time is fine for web use
5. **Don't forget error handling** - Infeasible problems will happen

---

## 💡 Pro Tips

1. **Scale AED to kAED** - Solver numerics work better with smaller numbers
2. **Use warm starts** - Cache previous solutions for what-if scenarios
3. **Add timeouts** - Kill solvers after 60 seconds
4. **Validate inputs early** - Bad data = bad results
5. **Log everything** - You'll need to debug optimization failures

---

## ✅ Quick Checklist

### **Before Starting**
- [ ] Architecture plan reviewed and approved
- [ ] Budget approved (+$12-20/month)
- [ ] Timeline approved (10 weeks)
- [ ] Python developer assigned
- [ ] Frontend developer assigned

### **After Week 1**
- [ ] Python environment set up
- [ ] FastAPI running locally
- [ ] Database schema migrated
- [ ] First solver working

### **After Week 4**
- [ ] Deal Picker module deployed
- [ ] End-to-end flow tested
- [ ] Files downloading correctly
- [ ] First beta users onboarded

---

**Ready to start?** Begin with Week 1 setup above! 🚀

**Questions?** Refer to the full architecture plan: `OPTIMIZATION-ARCHITECTURE-PLAN.md`

**Next Steps:** Set up Python environment and create FastAPI project structure.

