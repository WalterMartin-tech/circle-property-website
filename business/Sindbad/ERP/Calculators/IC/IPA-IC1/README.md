
---

## 🔑 Workflow Rules

- **`frontend/`** → Only **source code** (React/Next.js, TypeScript).
  - Run locally with:
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

- **`backend/`** → FastAPI app (calculation engine, endpoints).
  - Run locally with:
    ```bash
    cd backend
    uvicorn app.main:app --reload
    ```

- **`builds/`** → Only **canonical frozen HTML builds**.
  - Each file is versioned: `ipa-ic1-vX.Y.html`.
  - Example: `ipa-ic1-v13.11.html` (first clean baseline).
  - Always tagged in Git (`git tag v13.11`).

- **`patches/`** → For drafts, hotfixes, `.bak` files, or experimental drops.
  - Ignored by Git, so you can throw anything in here.
  - Old builds (v11.x, v12.0) are archived here under `old_builds/`.

---

## 🚀 Versioning Strategy

- New baseline = commit + tag:
  ```bash
  git add builds/ipa-ic1-v13.12.html
  git commit -m "build(v13.12): new baseline"
  git tag v13.12




# IPA Calculator — Architecture Overview

## Overview
Lightweight, two-service setup for an installment/IPA calculator:
- **Backend:** FastAPI with Pydantic models, pure-Python calculation engine, on-the-fly XLSX/PDF export. No DB.
- **Frontend:** Next.js UI that validates inputs, calls the API, and offers export actions.

## Repository Layout
```
ipa_optionB_fastapi_nextjs/
├─ backend/         # FastAPI app (uvicorn in dev)
│  ├─ app/
│  │  ├─ main.py    # FastAPI app factory & routes
│  │  ├─ schemas.py # Pydantic models (request/response)
│  │  ├─ calc/      # Pure-Python calculation engine
│  │  ├─ export/    # XLSX/PDF generators
│  │  └─ utils/     # CORS, logging, helpers
│  └─ pyproject.toml / requirements.txt
├─ frontend/        # Next.js app
│  ├─ app/ or pages/
│  ├─ components/
│  └─ package.json
└─ README.md (or this file)
```

## API (current)
Base path: `/`
- `GET /health` → `{"status": "ok"}`
- `POST /calculate` → JSON result (validated by Pydantic)
- `POST /export/xlsx` → streams a generated Excel file
- `POST /export/pdf` → streams a generated PDF

### Sample payload
```json
{
  "principal": 100000,
  "rate": 0.12,
  "term_months": 36,
  "fees": {"upfront": 100, "monthly": 0},
  "country": "CI"
}
```

## Frontend
- React/Next.js form → calls `POST /calculate`
- Displays result; buttons call `POST /export/xlsx` and `POST /export/pdf`
- Frontend uses `NEXT_PUBLIC_API_BASE` to reach the backend

## Configuration
**Backend** (`backend/.env`)
```
UVICORN_HOST=0.0.0.0
UVICORN_PORT=8000
CORS_ORIGINS=http://localhost:3000,https://your-frontend.example
EXPORT_TMP=/tmp
SENTRY_DSN=
```
**Frontend** (`frontend/.env.local`)
```
NEXT_PUBLIC_API_BASE=http://localhost:8000
```

## Local Development
**Terminal A (backend)**
```
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```
**Terminal B (frontend)**
```
cd frontend
npm install
npm run dev  # http://localhost:3000
```

## Deploy (current plan)
- **Backend:** containerized and deployed on **Koyeb** (you also have a legacy `fly.toml`; not used now)
- **Frontend:** local for now; prod target Vercel/Koyeb (TBD)
- Set `NEXT_PUBLIC_API_BASE` to the Koyeb API URL in prod

## Security & Ops
- Stateless; no persistence
- CORS locked to the frontend origin(s)
- `/health` for basic monitoring
- Sentry (planned)
- CI/CD via GitHub Actions (planned)

## Diagram
The Mermaid below renders natively on GitHub:

```mermaid
flowchart LR
  user[User (Browser)]
  subgraph Frontend
    next[Next.js UI :3000]
  end
  subgraph Backend
    api[(FastAPI Service :8000)]
    calc[Calculation Engine (Pure Python)]
    exp[XLSX/PDF Exporters]
    cors{CORS Middleware}
  end

  user --> next
  next -->|HTTP fetch| api
  api --> calc
  api -->|Generate| exp
  api --> health[/GET /health/]
  api --> calcEP[/POST /calculate/]
  api --> xlsxEP[/POST /export/xlsx/]
  api --> pdfEP[/POST /export/pdf/]
  next -->|Env var| cfg[NEXT_PUBLIC_API_BASE]

  subgraph Dev
    dev[(Local Dev)]
  end
  dev --> next
  dev --> api

  cloud[Koyeb (Container Runtime)] --- api
  vercel[Vercel (Target - TBD)] --- next
```

---

*Last updated: 12 Aug 2025 (Asia/Muscat)*
