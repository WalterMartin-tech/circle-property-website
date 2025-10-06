# Circle Property Backend - Deployment Guide
20251001

## 📋 Overview

This guide walks you through deploying the Circle Property backend (Node.js + Express + PostgreSQL + Redis) to production. The backend is currently in `circle-property-fullstack/backend/` and includes full API functionality for user management, payments, portfolios, and consultations.

---

## 🎯 Deployment Strategy Options

### **Option 1: Railway (Recommended - Easiest)**
- ✅ All-in-one platform (server + database + Redis)
- ✅ Automatic deployments from GitHub
- ✅ Built-in PostgreSQL and Redis
- ✅ Free tier available ($5/month after free credits)
- ✅ Simple environment variable management

### **Option 2: Render**
- ✅ Similar to Railway, all-in-one
- ✅ Free tier for PostgreSQL
- ✅ Automatic SSL certificates
- ✅ Easy GitHub integration
- 💰 ~$7/month for web service

### **Option 3: DigitalOcean App Platform**
- ✅ Managed infrastructure
- ✅ Scalable and reliable
- ✅ Good for production workloads
- 💰 ~$12/month minimum

### **Option 4: AWS (Advanced)**
- ✅ Most scalable and configurable
- ✅ Industry standard
- ⚠️ More complex setup
- 💰 Variable pricing (~$30-50/month)

---

## 🚀 Deployment Steps (Railway - Recommended)

### **Step 1: Prepare Your Backend**

1. **Ensure your backend is in a separate GitHub repository**
   ```bash
   cd /Users/waltermartin/Dev/work/business/DXB-Circle/circle-property-fullstack/backend
   
   # Initialize new repository
   git init
   git add .
   git commit -m "Initial backend deployment setup"
   
   # Create new GitHub repo (via GitHub UI or CLI)
   gh repo create circle-property-backend --private
   
   # Push to GitHub
   git remote add origin https://github.com/WalterMartin-tech/circle-property-backend.git
   git branch -M main
   git push -u origin main
   ```

2. **Verify your `package.json` scripts**
   ```json
   {
     "scripts": {
       "start": "node dist/server.js",
       "build": "tsc && tsc-alias",
       "dev": "tsx watch src/server.ts",
       "db:migrate": "prisma migrate deploy"
     }
   }
   ```

### **Step 2: Sign Up for Railway**

1. Go to https://railway.app/
2. Sign up with GitHub
3. Click "New Project"
4. Select "Deploy from GitHub repo"
5. Choose `circle-property-backend` repository

### **Step 3: Add PostgreSQL Database**

1. In your Railway project, click **"+ New"**
2. Select **"Database"** → **"PostgreSQL"**
3. Railway automatically provisions a database
4. Copy the `DATABASE_URL` from the PostgreSQL service

### **Step 4: Add Redis**

1. Click **"+ New"** again
2. Select **"Database"** → **"Redis"**
3. Railway provisions Redis instance
4. Copy the `REDIS_URL`

### **Step 5: Configure Environment Variables**

In your Railway backend service, add these environment variables:

```bash
# Database
DATABASE_URL=${{Postgres.DATABASE_URL}}  # Auto-populated by Railway
REDIS_URL=${{Redis.REDIS_URL}}          # Auto-populated by Railway

# Application
NODE_ENV=production
PORT=8000

# Authentication
JWT_SECRET=<generate-a-strong-random-string>
JWT_EXPIRES_IN=7d

# CORS (your frontend domain)
FRONTEND_URL=https://circle-property-website.vercel.app

# Stripe (get from https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx

# SendGrid (get from https://app.sendgrid.com/settings/api_keys)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
SENDGRID_FROM_EMAIL=noreply@circleproperty.ae

# AWS S3 (for file uploads - optional)
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxx
AWS_REGION=eu-central-1
AWS_S3_BUCKET=circle-property-uploads

# Encryption
ENCRYPTION_KEY=<generate-32-character-random-string>
```

**Generate secure secrets:**
```bash
# JWT Secret (64 characters)
openssl rand -base64 48

# Encryption Key (32 characters)
openssl rand -base64 24
```

### **Step 6: Configure Build and Start Commands**

In Railway service settings:

- **Build Command:** `npm install && npm run build && npx prisma migrate deploy`
- **Start Command:** `npm start`
- **Port:** Auto-detected (uses PORT env variable)

### **Step 7: Deploy**

1. Railway automatically builds and deploys on push
2. Monitor build logs in Railway dashboard
3. Once deployed, you'll get a URL like: `https://circle-property-backend-production.up.railway.app`

### **Step 8: Run Database Migrations**

Railway will automatically run migrations during build, but you can also run manually:

1. In Railway, click your backend service
2. Go to **"Variables"** tab
3. Click **"Deploy"** → **"Command"**
4. Run: `npx prisma migrate deploy`

### **Step 9: Seed Database (Optional)**

If you have seed data:

```bash
# In Railway shell or via deployment command
npm run db:seed
```

### **Step 10: Test Your API**

```bash
# Health check
curl https://your-railway-url.up.railway.app/health

# API info
curl https://your-railway-url.up.railway.app/api

# Expected response:
{
  "status": "OK",
  "timestamp": "2025-09-29T...",
  "uptime": 123.45,
  "environment": "production"
}
```

---

## 🔗 Connect Frontend to Backend

### **Update Frontend Environment Variables**

Create `.env.local` in your frontend:

```bash
NEXT_PUBLIC_API_URL=https://your-railway-url.up.railway.app/api
```

### **Update Frontend API Calls**

Create or update `frontend/src/lib/api.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

export const api = {
  async get(endpoint: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    return response.json();
  },
  
  async post(endpoint: string, data: any) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  },
  
  // Add PUT, DELETE, etc.
};
```

### **Add to Vercel Environment Variables**

1. Go to Vercel Dashboard
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add:
   - `NEXT_PUBLIC_API_URL` = `https://your-railway-url.up.railway.app/api`

---

## 🔒 Security Checklist

Before going live:

- [ ] All environment variables set
- [ ] JWT secret is strong and unique
- [ ] CORS configured to only allow your frontend domain
- [ ] Rate limiting enabled (already in `server.ts`)
- [ ] Database backups configured
- [ ] SSL/HTTPS enabled (Railway does this automatically)
- [ ] Sensitive data encrypted
- [ ] API keys rotated from test to production
- [ ] Error messages don't leak sensitive info

---

## 📊 Monitoring & Maintenance

### **Railway Built-in Monitoring**
- CPU and memory usage
- Request logs
- Error tracking
- Deployment history

### **Additional Tools (Optional)**

**Error Tracking:**
```bash
npm install @sentry/node
```

**Performance Monitoring:**
- New Relic
- Datadog
- Railway Metrics

**Database Monitoring:**
- Railway built-in PostgreSQL metrics
- Prisma query logging

---

## 💰 Cost Estimation

### **Railway (Recommended)**
- **Free Tier:** $5 credit/month (limited)
- **Hobby Plan:** $5/month after credits
- **PostgreSQL:** Included
- **Redis:** Included
- **Bandwidth:** 100GB included
- **Total:** ~$5-10/month for small-medium traffic

### **Render**
- **Web Service:** $7/month
- **PostgreSQL:** Free (limited) or $7/month
- **Redis:** $10/month
- **Total:** ~$7-24/month

### **DigitalOcean**
- **App Platform:** $12/month
- **Managed PostgreSQL:** $15/month
- **Managed Redis:** $15/month
- **Total:** ~$42/month

---

## 🔄 CI/CD Setup

### **Automatic Deployments**

Railway automatically deploys when you push to GitHub:

```bash
# Make changes to backend
vim src/server.ts

# Commit and push
git add .
git commit -m "Update API endpoint"
git push origin main

# Railway automatically:
# 1. Detects push
# 2. Runs build
# 3. Runs migrations
# 4. Deploys new version
# 5. Zero-downtime deployment
```

### **Branch Deployments**

- **main branch** → Production deployment
- **staging branch** → Staging environment (configure separately)
- **feature branches** → Preview deployments (optional)

---

## 🧪 Testing Before Deployment

### **Run Full Test Suite**
```bash
cd backend
npm run test
npm run test:coverage
```

### **Local Production Build Test**
```bash
npm run build
NODE_ENV=production npm start
```

### **Database Migration Test**
```bash
npx prisma migrate dev
```

---

## 📝 Post-Deployment Checklist

After deploying:

- [ ] Test all API endpoints
- [ ] Verify database migrations ran successfully
- [ ] Check health endpoint
- [ ] Test authentication flow
- [ ] Verify CORS is working with frontend
- [ ] Test payment integration (Stripe test mode)
- [ ] Check email sending (SendGrid)
- [ ] Monitor error logs for 24 hours
- [ ] Set up uptime monitoring (UptimeRobot, Pingdom)
- [ ] Document API URL for team
- [ ] Update README with deployment info

---

## 🆘 Troubleshooting

### **Build Fails**

Check Railway logs for specific errors:
- TypeScript compilation errors
- Missing dependencies
- Prisma migration failures

### **Database Connection Issues**

```bash
# Verify DATABASE_URL is set
echo $DATABASE_URL

# Test connection
npx prisma db push
```

### **CORS Errors**

Update `backend/src/server.ts`:
```typescript
app.use(cors({
  origin: ['https://circle-property-website.vercel.app'],
  credentials: true
}));
```

### **Environment Variables Not Loading**

- Ensure variables are set in Railway dashboard
- Restart the service
- Check for typos in variable names

---

## 🎓 Additional Resources

- **Railway Docs:** https://docs.railway.app/
- **Prisma Deploy:** https://www.prisma.io/docs/guides/deployment
- **Express Security:** https://expressjs.com/en/advanced/best-practice-security.html
- **Stripe Integration:** https://stripe.com/docs/api
- **SendGrid Setup:** https://docs.sendgrid.com/

---

## 📞 Support

If you encounter issues:
1. Check Railway deployment logs
2. Verify all environment variables
3. Test database connectivity
4. Review CORS configuration
5. Check API endpoint responses

---

**Last Updated:** 29-09-2025  
**Project:** Circle Property Backend  
**Deployment Platform:** Railway (Recommended)

---

## Quick Start Command Summary

```bash
# 1. Create separate backend repo
cd circle-property-fullstack/backend
git init
gh repo create circle-property-backend --private
git add .
git commit -m "Initial backend setup"
git push -u origin main

# 2. Deploy to Railway
# - Go to railway.app
# - Connect GitHub repo
# - Add PostgreSQL + Redis
# - Configure environment variables
# - Deploy!

# 3. Connect frontend
# Add to Vercel env: NEXT_PUBLIC_API_URL

# 4. Test
curl https://your-app.railway.app/health
```

Good luck with your deployment! 🚀

