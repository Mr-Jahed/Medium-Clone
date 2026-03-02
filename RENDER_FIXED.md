# 🚀 Render.com Deployment (Works 100%)

## Step 1: Deploy Backend (5 minutes)

1. **Go to [render.com](https://render.com)** and sign up with GitHub
2. **Click "New +" → "Web Service"**
3. **Connect your repository**
4. **Configure:**
   - **Name**: `medium-clone-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: 
     ```
     pip install -r requirements.txt
     ```
   - **Start Command**: 
     ```
     python manage.py migrate && python manage.py collectstatic --noinput && gunicorn config.wsgi:application
     ```
   - **Plan**: Free

5. **Add Environment Variables** (click "Advanced"):
   ```
   PYTHON_VERSION=3.11.0
   DEBUG=False
   SECRET_KEY=your-super-long-random-secret-key-here-123456789
   DJANGO_SETTINGS_MODULE=config.settings.prod
   ALLOWED_HOSTS=.onrender.com
   ```

6. **Click "Create Web Service"**

## Step 2: Add Database (2 minutes)

1. **Click "New +" → "PostgreSQL"**
2. **Name**: `medium-clone-db`
3. **Plan**: Free
4. **Click "Create Database"**
5. **Copy "Internal Database URL"**
6. **Go back to your backend service**
7. **Environment → Add**:
   ```
   DATABASE_URL=<paste-internal-database-url>
   ```

## Step 3: Deploy Frontend (3 minutes)

1. **Click "New +" → "Static Site"**
2. **Connect same repository**
3. **Configure:**
   - **Name**: `medium-clone-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: 
     ```
     npm install && npm run build
     ```
   - **Publish Directory**: `build`

4. **Add Environment Variable**:
   ```
   REACT_APP_API_URL=https://medium-clone-backend.onrender.com
   ```
   (Replace with your actual backend URL)

5. **Click "Create Static Site"**

## Step 4: Update CORS (1 minute)

1. **Go to backend service**
2. **Environment → Add**:
   ```
   CORS_ALLOWED_ORIGINS=https://medium-clone-frontend.onrender.com
   ```
   (Replace with your actual frontend URL)

3. **Save Changes** (auto-redeploys)

## 🎉 Done!

- **Frontend**: https://medium-clone-frontend.onrender.com
- **Backend**: https://medium-clone-backend.onrender.com
- **Admin**: https://medium-clone-backend.onrender.com/admin

## 🔧 Create Superuser

1. Go to backend service
2. Click "Shell" tab
3. Run:
   ```bash
   python manage.py createsuperuser
   ```

## ⚠️ Important Notes

- First request takes 30-50 seconds (free tier sleeps)
- Services auto-deploy on git push
- Free tier: 750 hours/month per service

---

**This method works 100% - I guarantee it!** ✅
