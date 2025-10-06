# 🚀 Deploy to Production - Step-by-Step Guide

**Date:** October 6, 2025  
**Status:** Ready to Deploy  
**Time Required:** 15-20 minutes

---

## 📋 **Prerequisites Check**

### **Required Accounts:**
- ✅ GitHub account (you have this)
- ✅ Vercel account (free) - Sign up at https://vercel.com
- ❌ Railway account (NOT needed - we'll use Vercel for backend too)

### **Required Tools:**
```bash
# Check if you have these installed:
node --version   # Should be v18+ or v20+
npm --version    # Should be v9+ or v10+
git --version    # Should be v2+
```

---

## 🎯 **Deployment Strategy**

We'll use **Vercel for everything** (simpler than Railway):

```
Frontend (Next.js)     → Vercel
Backend (Python API)   → Vercel Serverless Functions
Database (if needed)   → Vercel PostgreSQL (future)
```

**Benefits:**
- ✅ Single platform (easier management)
- ✅ Automatic CI/CD for both
- ✅ Free tier very generous
- ✅ One dashboard for everything
- ✅ Automatic HTTPS & domains

---

## 📦 **Step 1: Frontend Deployment (5 minutes)**

### **1.1 Navigate to frontend:**
```bash
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/frontend
```

### **1.2 Test build locally:**
```bash
npm run build
```
**Expected output:**
```
✓ Compiled successfully
✓ Linting and checking validity of types
✓ Collecting page data
✓ Generating static pages (12/12)
✓ Finalizing page optimization

Route (app)                              Size     First Load JS
┌ ○ /                                    5 kB        100 kB
├ ○ /about                               8 kB        103 kB
├ ○ /invest                              12 kB       107 kB
...
```

**If build fails:** Let me know and I'll fix the errors.

### **1.3 Deploy to Vercel:**

#### **Option A: Via Vercel CLI (Recommended)**
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

**Follow prompts:**
```
? Set up and deploy "~/...frontend"? [Y/n] y
? Which scope? Your Account
? Link to existing project? [y/N] n
? What's your project's name? beechford-estates
? In which directory is your code located? ./
? Want to override settings? [y/N] n
```

**Output:**
```
🔍  Inspect: https://vercel.com/your-account/beechford-estates/...
✅  Production: https://beechford-estates.vercel.app
```

#### **Option B: Via Vercel Dashboard**
1. Go to https://vercel.com/new
2. Import Git Repository
3. Select `circle-property-fullstack/frontend`
4. Framework: Next.js (auto-detected)
5. Root Directory: `./`
6. Click "Deploy"

### **1.4 Save Production URL:**
```bash
# You'll get a URL like:
https://beechford-estates.vercel.app

# Or custom domain:
https://www.beechfordestates.com
```

---

## 🔌 **Step 2: Backend Deployment (10 minutes)**

### **Option A: Vercel Serverless (Recommended)**

Since Vercel now supports Python, we can deploy the FastAPI backend as serverless functions.

#### **2.1 Create Vercel configuration for backend:**

**File:** `circle_optimizations_project/vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "app/main.py",
      "use": "@vercel/python"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "app/main.py"
    }
  ]
}
```

#### **2.2 Create requirements.txt (already exists):**
```bash
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/circle_optimizations_project
cat requirements.txt
```

#### **2.3 Deploy backend:**
```bash
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/circle_optimizations_project

vercel --prod
```

**Follow prompts:**
```
? Set up and deploy? [Y/n] y
? Which scope? Your Account
? Link to existing project? [y/N] n
? What's your project's name? beechford-api
? In which directory is your code located? ./
? Want to override settings? [y/N] n
```

**Output:**
```
✅  Production: https://beechford-api.vercel.app
```

### **Option B: Railway (Alternative if Vercel Python doesn't work)**

If you prefer Railway or Vercel serverless has issues:

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize
cd circle_optimizations_project
railway init

# Deploy
railway up

# Get URL
railway domain
```

---

## 🔗 **Step 3: Connect Frontend to Backend (3 minutes)**

### **3.1 Update Backend CORS:**

**File:** `circle_optimizations_project/app/main.py`
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://beechford-estates.vercel.app",  # Add your frontend URL
        "https://www.beechfordestates.com"       # Add custom domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

**Commit and push:**
```bash
git add app/main.py
git commit -m "chore: update CORS for production"
git push origin main
```
**Auto-deploys to backend in ~2 minutes**

### **3.2 Update Frontend Environment Variables:**

**Via Vercel Dashboard:**
1. Go to: https://vercel.com/your-account/beechford-estates/settings/environment-variables
2. Add variable:
   - **Name:** `NEXT_PUBLIC_API_URL`
   - **Value:** `https://beechford-api.vercel.app` (your backend URL)
   - **Environment:** Production
3. Click "Save"
4. Go to "Deployments" → Click "..." on latest → "Redeploy"

**Via Vercel CLI:**
```bash
cd circle-property-fullstack/frontend
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://beechford-api.vercel.app

# Redeploy
vercel --prod
```

---

## ✅ **Step 4: Test Production (2 minutes)**

### **4.1 Test Backend:**
```bash
# Health check
curl https://beechford-api.vercel.app/health

# Expected response:
{
  "status": "ok",
  "service": "beechford-smart-plans-api",
  "version": "1.0.0"
}

# API info
curl https://beechford-api.vercel.app/

# Interactive docs
open https://beechford-api.vercel.app/docs
```

### **4.2 Test Frontend:**
```bash
# Open in browser
open https://beechford-estates.vercel.app

# Test pages:
# - Homepage: ✅
# - About: ✅
# - Smart Plans: ✅
# - Deal Picker: ✅
# - All optimizers: ✅
```

### **4.3 Test Full Integration:**
1. Go to: `https://beechford-estates.vercel.app/optimizations/deal-picker`
2. Enter test data (use defaults)
3. Click "Run Optimization"
4. **Expected:** Results appear (from backend API)
5. **Check browser console:** No CORS errors

---

## 🎨 **Step 5: Custom Domain (Optional)**

### **5.1 Add Custom Domain to Vercel:**

**For Frontend:**
1. Vercel Dashboard → beechford-estates → Settings → Domains
2. Add domain: `www.beechfordestates.com`
3. Follow DNS instructions
4. Wait for SSL certificate (auto, ~1 minute)

**For Backend:**
1. Vercel Dashboard → beechford-api → Settings → Domains
2. Add domain: `api.beechfordestates.com`
3. Follow DNS instructions

### **5.2 Update Environment Variables:**
```bash
# Frontend
NEXT_PUBLIC_API_URL=https://api.beechfordestates.com

# Backend CORS
allow_origins=[
    "https://www.beechfordestates.com",
    "https://beechfordestates.com"
]
```

---

## 📊 **Step 6: Verify CI/CD (1 minute)**

### **Test Automatic Deployment:**

```bash
# Make a small change
cd circle-property-fullstack/frontend
echo "// Test deployment" >> src/app/page.tsx

# Commit and push
git add .
git commit -m "test: verify CI/CD"
git push origin main

# Watch deployment
vercel inspect
# Or check Vercel Dashboard → Deployments

# Should auto-deploy in ~90 seconds ✨
```

---

## 🎉 **Deployment Complete Checklist**

### **Frontend:**
- [ ] Deployed to Vercel
- [ ] Production URL works
- [ ] All pages load correctly
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Environment variables set
- [ ] Custom domain configured (optional)

### **Backend:**
- [ ] Deployed to Vercel/Railway
- [ ] `/health` endpoint returns 200
- [ ] Interactive docs (`/docs`) accessible
- [ ] CORS configured with frontend URL
- [ ] All 4 optimizer endpoints working

### **Integration:**
- [ ] Frontend can call backend API
- [ ] No CORS errors in browser console
- [ ] Optimization modules return real results
- [ ] File downloads work
- [ ] Error handling works

### **CI/CD:**
- [ ] Push to GitHub auto-deploys
- [ ] Deployment completes in ~2-3 minutes
- [ ] Build failures block deployment
- [ ] Can rollback to previous version

---

## 🚨 **Troubleshooting**

### **Build Fails:**
```bash
# Check build logs
vercel logs <deployment-url>

# Common fixes:
npm install    # Update dependencies
npm run build  # Test build locally
```

### **CORS Errors:**
```
Error: CORS policy blocked
```
**Fix:**
1. Check backend CORS configuration
2. Ensure frontend URL is in `allow_origins`
3. Redeploy backend after changes

### **API Not Responding:**
```
Error: Failed to fetch
```
**Fix:**
1. Check `NEXT_PUBLIC_API_URL` environment variable
2. Test backend health: `curl https://your-api.vercel.app/health`
3. Check Vercel function logs

### **Environment Variables Not Working:**
```
API_URL is undefined
```
**Fix:**
1. Ensure variable starts with `NEXT_PUBLIC_` for client-side access
2. Redeploy after adding env vars (they don't apply to existing builds)
3. Clear Next.js cache: `rm -rf .next`

---

## 📝 **Post-Deployment Tasks**

### **Immediate:**
1. ✅ Test all pages
2. ✅ Test all optimizer modules
3. ✅ Verify mobile responsiveness
4. ✅ Check Lighthouse scores
5. ✅ Submit sitemap to Google Search Console

### **This Week:**
1. Set up monitoring (Vercel Analytics)
2. Configure custom domain
3. Add SSL certificate (auto with Vercel)
4. Set up error tracking (Sentry - optional)
5. Configure backup strategy

### **Ongoing:**
1. Monitor performance metrics
2. Review deployment logs
3. Update dependencies monthly
4. Review and optimize API responses
5. Monitor Core Web Vitals

---

## 🎯 **Quick Reference**

### **Important URLs:**
```bash
# Frontend
Production: https://beechford-estates.vercel.app
Dashboard: https://vercel.com/your-account/beechford-estates

# Backend
Production: https://beechford-api.vercel.app
Dashboard: https://vercel.com/your-account/beechford-api
API Docs: https://beechford-api.vercel.app/docs

# Repository
GitHub: https://github.com/your-account/DXB-Circle
```

### **Common Commands:**
```bash
# Deploy
vercel --prod

# Check logs
vercel logs

# Rollback
vercel rollback

# List deployments
vercel ls

# Check status
vercel inspect <deployment-url>
```

---

## 🎊 **Success Criteria**

**You'll know deployment is successful when:**

1. ✅ Frontend loads at production URL
2. ✅ All pages navigate correctly
3. ✅ Backend `/health` returns `{"status": "ok"}`
4. ✅ Optimization modules return results
5. ✅ No CORS errors in browser console
6. ✅ File downloads work
7. ✅ Git push triggers auto-deployment
8. ✅ Lighthouse score 90+

---

## 📞 **Need Help?**

If anything gets stuck:
1. Check Vercel deployment logs
2. Check browser console for errors
3. Test backend `/health` endpoint
4. Verify environment variables
5. Try redeploying: `vercel --prod --force`

---

**Ready to deploy! Follow these steps and let me know if you hit any issues.** 🚀✨

**Estimated total time: 15-20 minutes**

