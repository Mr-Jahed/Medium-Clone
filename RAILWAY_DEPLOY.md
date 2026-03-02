# 🚂 Railway Deployment - Easiest Method (10 Minutes)

## Why Railway?
- ✅ Automatic detection of Django & React
- ✅ Free PostgreSQL included
- ✅ One-click deployment
- ✅ Auto SSL certificates
- ✅ $5 free credit monthly

## 📝 Step-by-Step Guide

### 1. Sign Up (2 minutes)
1. Go to [railway.app](https://railway.app)
2. Click "Login with GitHub"
3. Authorize Railway

### 2. Deploy Backend (3 minutes)
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your `Medium-Clone` repository
4. **IMPORTANT**: Click "Settings" → "Root Directory" → Set to `backend`
5. Click "Variables" and add:
   ```
   DEBUG=False
   SECRET_KEY=your-random-secret-key-here-make-it-long
   DJANGO_SETTINGS_MODULE=config.settings.prod
   NIXPACKS_PYTHON_VERSION=3.11
   ```
6. Click "Deploy"

### 3. Add Database (1 minute)
1. In same project, click "New"
2. Select "Database" → "PostgreSQL"
3. Railway automatically connects it! 🎉
4. No manual DATABASE_URL needed!

### 4. Deploy Frontend (3 minutes)
1. In same project, click "New"
2. Select "GitHub Repo" (same repo)
3. Click "Settings" → "Root Directory" → Set to `frontend`
4. Add Environment Variable:
   ```
   REACT_APP_API_URL=https://YOUR-BACKEND-URL.railway.app
   ```
5. Click "Deploy"

### 5. Final Configuration (1 minute)
1. Get your backend URL from Railway dashboard
2. Update backend environment variables:
   ```
   ALLOWED_HOSTS=.railway.app
   CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-URL.railway.app
   ```
3. Redeploy backend

## 🎉 Done!

Your URLs:
- Frontend: `https://medium-clone-frontend.railway.app`
- Backend: `https://medium-clone-backend.railway.app`
- Admin: `https://medium-clone-backend.railway.app/admin`

## 🔧 Create Superuser

1. Go to backend service in Railway
2. Click "Settings" → "Deploy Logs"
3. Wait for deployment to finish
4. Go to backend service → Click on the service
5. In the Railway dashboard, you can run commands via their CLI or use Django admin after first login

## 💡 Pro Tips

- Railway gives $5/month free credit
- Auto-deploys on every git push
- Built-in monitoring & logs
- Custom domains supported

## 🐛 If Build Fails

**Error: "railpack build failed"?**

1. Go to Settings → Root Directory → Set to `backend`
2. Add environment variable: `NIXPACKS_PYTHON_VERSION=3.11`
3. Make sure `nixpacks.toml` exists in backend folder
4. Redeploy

**Still failing?** Use Render.com instead (see `RENDER_FIXED.md`)

---

**Total Time: 10 minutes** ⏱️
**Difficulty: Beginner** 🟢
