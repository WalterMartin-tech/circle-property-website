# ✅ Deployment Checklist - Beechford Estate Office

**Quick reference for production deployment**

---

## 🚀 **Quick Start (Copy-Paste Commands)**

### **1. Deploy Frontend:**
```bash
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/frontend
npm run build
vercel --prod
```

### **2. Deploy Backend:**
```bash
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/circle_optimizations_project
vercel --prod
```

### **3. Update Frontend Env Var:**
```bash
# After backend deployed, get the URL and add to frontend:
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://beechford-api.vercel.app (your backend URL)

# Redeploy frontend with new env var:
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/frontend
vercel --prod
```

### **4. Update Backend CORS:**
```bash
# Edit app/main.py and add frontend URL to allow_origins
# Then commit and push (auto-deploys)
git add .
git commit -m "chore: update CORS for production"
git push origin main
```

---

## ✅ **Pre-Deployment Checklist**

### **Frontend:**
- [ ] `npm run build` succeeds locally
- [ ] No TypeScript errors
- [ ] All pages load in dev mode
- [ ] Environment variables documented
- [ ] `vercel.json` configured (if needed)

### **Backend:**
- [ ] Python dependencies in `requirements.txt`
- [ ] `vercel.json` created for Vercel deployment
- [ ] Health check endpoint works (`/health`)
- [ ] CORS middleware configured
- [ ] All router files importable

---

## 🧪 **Testing After Deployment**

### **Backend Tests:**
```bash
# Replace with your actual backend URL
BACKEND_URL="https://beechford-api.vercel.app"

# Test health
curl $BACKEND_URL/health

# Test API info
curl $BACKEND_URL/

# Test interactive docs (open in browser)
open $BACKEND_URL/docs
```

### **Frontend Tests:**
```bash
# Replace with your actual frontend URL
FRONTEND_URL="https://beechford-estates.vercel.app"

# Open homepage
open $FRONTEND_URL

# Test key pages
open $FRONTEND_URL/about
open $FRONTEND_URL/optimizations
open $FRONTEND_URL/optimizations/deal-picker
```

### **Integration Test:**
1. Open: `$FRONTEND_URL/optimizations/deal-picker`
2. Keep default values
3. Click "Run Optimization"
4. **Expected:** Results appear
5. **Check Console:** No CORS errors

---

## 📊 **Post-Deployment Verification**

### **Frontend:**
- [ ] Homepage loads
- [ ] All navigation links work
- [ ] About page displays correctly
- [ ] Smart Plans page loads
- [ ] All 4 optimizer pages accessible
- [ ] No 404 errors
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Images load
- [ ] Fonts load correctly

### **Backend:**
- [ ] `/health` returns `{"status": "ok"}`
- [ ] `/` returns API info
- [ ] `/docs` shows Swagger UI
- [ ] CORS headers present
- [ ] No 500 errors in logs

### **Integration:**
- [ ] Frontend can reach backend
- [ ] No CORS errors
- [ ] Deal Picker returns results
- [ ] Debt Stack returns results
- [ ] CapEx Phasing returns results
- [ ] Leasing Mix returns results
- [ ] Error messages display correctly
- [ ] Loading states work

---

## 🎨 **Performance Checks**

### **Lighthouse Test:**
```bash
# Run on deployed site
npx lighthouse $FRONTEND_URL --view
```

**Target Scores:**
- [ ] Performance: 90+
- [ ] Accessibility: 95+
- [ ] Best Practices: 100
- [ ] SEO: 100

### **Core Web Vitals:**
- [ ] LCP (Largest Contentful Paint): < 2.5s
- [ ] FID (First Input Delay): < 100ms
- [ ] CLS (Cumulative Layout Shift): < 0.1

---

## 🔐 **Security Checks**

### **Headers:**
```bash
curl -I $FRONTEND_URL | grep -i "x-frame-options\|x-content-type-options\|referrer-policy"
```

**Should see:**
- [ ] `X-Frame-Options: SAMEORIGIN`
- [ ] `X-Content-Type-Options: nosniff`
- [ ] `Referrer-Policy: origin-when-cross-origin`

### **HTTPS:**
- [ ] Frontend uses HTTPS
- [ ] Backend uses HTTPS
- [ ] No mixed content warnings
- [ ] SSL certificate valid

---

## 🔄 **CI/CD Verification**

### **Test Auto-Deployment:**
```bash
# Make a small change
cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/frontend
echo "// Test CI/CD" >> README.md

# Commit and push
git add README.md
git commit -m "test: verify CI/CD"
git push origin main

# Check deployment (should happen automatically)
# Visit Vercel dashboard or run:
vercel ls
```

**Expected:**
- [ ] Vercel detects push within 10 seconds
- [ ] Build starts automatically
- [ ] Build completes in ~90 seconds
- [ ] Deployment goes live automatically
- [ ] New version accessible at production URL

---

## 📝 **Environment Variables**

### **Frontend (Vercel Dashboard → beechford-estates → Settings → Environment Variables):**
```
NEXT_PUBLIC_API_URL=https://beechford-api.vercel.app
```

### **Backend (Vercel Dashboard → beechford-api → Settings → Environment Variables):**
```
PYTHONUNBUFFERED=1
# Add others as needed
```

---

## 🚨 **Common Issues & Fixes**

### **Issue 1: Build Fails**
```bash
# Check logs
vercel logs <deployment-url>

# Fix locally first
npm run build  # or python test

# Then redeploy
vercel --prod
```

### **Issue 2: CORS Errors**
```
Access to fetch has been blocked by CORS policy
```
**Fix:**
1. Add frontend URL to backend `allow_origins`
2. Commit and push backend changes
3. Wait for auto-deploy (~2 min)

### **Issue 3: Environment Variables Not Working**
```bash
# Redeploy after adding env vars
vercel --prod --force

# Or via dashboard: Deployments → ... → Redeploy
```

### **Issue 4: 404 on Routes**
**Check:**
- [ ] `vercel.json` routes configuration
- [ ] Next.js pages exist in correct locations
- [ ] No typos in URLs

### **Issue 5: API Not Responding**
```bash
# Check backend health
curl https://beechford-api.vercel.app/health

# Check Vercel function logs
vercel logs --follow

# Redeploy if needed
vercel --prod --force
```

---

## 📞 **Quick Commands Reference**

```bash
# Deploy
vercel --prod

# Check deployment status
vercel ls

# View logs
vercel logs

# View logs (follow mode)
vercel logs --follow

# Rollback to previous deployment
vercel rollback

# Remove a deployment
vercel rm <deployment-url>

# Check which project you're in
vercel inspect

# Link to different project
vercel link

# Add environment variable
vercel env add VAR_NAME production

# List environment variables
vercel env ls
```

---

## ✅ **Final Checklist**

### **Before Going Live:**
- [ ] All tests pass
- [ ] No console errors
- [ ] No 404 errors
- [ ] Mobile tested
- [ ] Performance acceptable (Lighthouse 90+)
- [ ] SEO tags verified
- [ ] Custom domain configured (optional)
- [ ] Analytics set up (optional)
- [ ] Error tracking set up (optional)

### **Documentation:**
- [ ] Update README with production URLs
- [ ] Document environment variables
- [ ] Note deployment process
- [ ] List known issues (if any)

### **Monitoring:**
- [ ] Vercel Analytics enabled
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Uptime monitoring (optional)
- [ ] Performance monitoring

---

## 🎉 **Success!**

**You'll know deployment is successful when:**
1. ✅ Both URLs are live and accessible
2. ✅ Frontend connects to backend successfully
3. ✅ All optimizer modules work end-to-end
4. ✅ No errors in browser console or Vercel logs
5. ✅ CI/CD triggers on every push
6. ✅ Lighthouse scores 90+

---

## 📈 **Next Steps After Deployment**

1. **Monitor** - Check Vercel dashboard for errors
2. **Test** - Try all features in production
3. **Share** - Send URLs to stakeholders
4. **Iterate** - Make improvements based on feedback
5. **Scale** - Add features, optimize performance

---

**Deployment should take 15-20 minutes total. Good luck!** 🚀✨

