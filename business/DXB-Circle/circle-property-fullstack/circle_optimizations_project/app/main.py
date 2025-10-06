from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .routers import deal_picker, debt_stack, capex_phasing, leasing_mix
import os

app = FastAPI(
    title="Beechford Estate Office - Smart Plans API",
    version="1.0.0",
    description="Institutional-grade optimization for real estate portfolio management"
)

# CORS Configuration
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

# Health check endpoint
@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "beechford-smart-plans-api",
        "version": "1.0.0"
    }

# Root endpoint with API info
@app.get("/")
async def root():
    return {
        "message": "Beechford Estate Office - Smart Plans API",
        "tagline": "Institutional-grade modeling with full transparency",
        "docs": "/docs",
        "modules": ["deal-picker", "debt-stack", "capex-phasing", "leasing-mix"],
        "health": "/health"
    }

# Include routers
app.include_router(deal_picker.router)
app.include_router(debt_stack.router)
app.include_router(capex_phasing.router)
app.include_router(leasing_mix.router)

# Create files directories if they don't exist
os.makedirs("./files/outputs", exist_ok=True)
os.makedirs("./files/templates", exist_ok=True)

# Mount static files
app.mount("/files", StaticFiles(directory="files"), name="files")
