# 🚀 Deployment Guide - Medium Clone

## Quick Deploy to Render.com (Recommended - FREE)

### Prerequisites
- GitHub account
- Render.com account (free)
- Your code pushed to GitHub

---

## 📋 Step-by-Step Deployment

### Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Ready for deployment"

# Create repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/medium-clone.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy Backend on Render

1. **Go to [Render.com](https://render.com)** and sign up/login

2. **Click "New +" → "Web Service"**

3. **Connect your GitHub repository**

4. **Configure Backend:**
   - **Name**: `mediumclone-backend`
   - **Region**: Oregon (US West)
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: 
     ```bash
     pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate
     ```
   - **Start Command**: 
     ```bash
     gunicorn config.wsgi:application
     ```
   - **Plan**: Free

5. **Add Environment Variables:**
   Click "Advanced" → "Add Environment Variable"
   
   ```
   DEBUG=False
   SECRET_KEY=your-random-secret-key-here-make-it-long-and-random
   ALLOWED_HOSTS=.onrender.com
   CORS_ALLOWED_ORIGINS=https://mediumclone-frontend.onrender.com
   DATABASE_URL=(will be auto-filled when you add database)
   ```

6. **Click "Create Web Service"**

### Step 3: Add PostgreSQL Database

1. **In Render Dashboard, click "New +" → "PostgreSQL"**

2. **Configure Database:**
   - **Name**: `mediumclone-db`
   - **Database**: `mediumclone`
   - **User**: `mediumclone`
   - **Region**: Oregon (same as backend)
   - **Plan**: Free

3. **Click "Create Database"**

4. **Copy the "Internal Database URL"**

5. **Go back to your Backend service → Environment**

6. **Add/Update:**
   ```
   DATABASE_URL=<paste-internal-database-url-here>
   ```

7. **Click "Save Changes"** (this will redeploy)

### Step 4: Deploy Frontend on Render

1. **Click "New +" → "Static Site"**

2. **Connect same GitHub repository**

3. **Configure Frontend:**
   - **Name**: `mediumclone-frontend`
   - **Branch**: `main`
   - **Root Directory**: `frontend`
   - **Build Command**: 
     ```bash
     npm install && npm run build
     ```
   - **Publish Directory**: `build`

4. **Add Environment Variable:**
   ```
   REACT_APP_API_URL=https://mediumclone-backend.onrender.com
   ```

5. **Click "Create Static Site"**

### Step 5: Create Superuser

1. **Go to your Backend service on Render**

2. **Click "Shell" tab**

3. **Run:**
   ```bash
   python manage.py createsuperuser
   ```

4. **Follow prompts to create admin user**

---

## ✅ Verify Deployment

### Check Backend
Visit: `https://mediumclone-backend.onrender.com/api/`

You should see the API root.

### Check Frontend
Visit: `https://mediumclone-frontend.onrender.com`

You should see your Medium Clone homepage!

### Check Admin
Visit: `https://mediumclone-backend.onrender.com/admin/`

Login with superuser credentials.

---

## 🔧 Update Backend Settings for Production

Your backend needs these settings updated. I'll create them:

### File: `backend/config/settings.py`

Add at the end:
```python
import dj_database_url

# Production settings
if not DEBUG:
    # Database
    DATABASES['default'] = dj_database_url.config(
        default=os.getenv('DATABASE_URL'),
        conn_max_age=600
    )
    
    # Static files
    STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
    STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    
    # Security
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_BROWSER_XSS_FILTER = True
    SECURE_CONTENT_TYPE_NOSNIFF = True
    
    # CORS
    CORS_ALLOWED_ORIGINS = os.getenv('CORS_ALLOWED_ORIGINS', '').split(',')
    
    # Allowed hosts
    ALLOWED_HOSTS = os.getenv('ALLOWED_HOSTS', '').split(',')
```

---

## 🎉 Your App is Live!

### URLs:
- **Frontend**: `https://mediumclone-frontend.onrender.com`
- **Backend API**: `https://mediumclone-backend.onrender.com/api/`
- **Admin Panel**: `https://mediumclone-backend.onrender.com/admin/`

### Important Notes:
- ⚠️ Free tier services sleep after 15 minutes of inactivity
- ⚠️ First request after sleep takes ~30 seconds to wake up
- ⚠️ Free PostgreSQL has 1GB storage limit
- ✅ Automatic HTTPS included
- ✅ Automatic deployments on git push

---

## 🔄 Update Your Deployed App

```bash
# Make changes to your code
git add .
git commit -m "Your update message"
git push origin main
```

Render will automatically detect the push and redeploy! 🎉

---

## 🐛 Troubleshooting

### Backend won't start
1. Check logs in Render dashboard
2. Verify all environment variables are set
3. Check DATABASE_URL is correct

### Frontend can't connect to backend
1. Verify REACT_APP_API_URL is correct
2. Check CORS settings in backend
3. Ensure backend is running

### Database errors
1. Check DATABASE_URL format
2. Verify migrations ran successfully
3. Check database connection in logs

### Static files not loading
1. Run collectstatic in build command
2. Check STATIC_ROOT setting
3. Verify whitenoise is installed

---

## 💰 Cost Breakdown

### Free Tier (Render.com)
- Backend: FREE (750 hours/month)
- Frontend: FREE (100GB bandwidth)
- Database: FREE (1GB storage)
- **Total: $0/month** ✅

### Paid Tier (Better Performance)
- Backend: $7/month (always on)
- Frontend: FREE
- Database: $7/month (10GB storage)
- **Total: $14/month**

---

## 🚀 Alternative: Deploy to Railway.app

1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway auto-detects Django and React
5. Add environment variables
6. Deploy! 🎉

**Cost**: $5/month (includes everything)

---

## 📞 Need Help?

- Check Render logs for errors
- Review environment variables
- Verify database connection
- Check CORS settings

---

## 🎊 Congratulations!

Your Medium Clone is now live and accessible to the world! 🌍

Share your link:
`https://mediumclone-frontend.onrender.com`
