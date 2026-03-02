# 🚀 Quick Deployment Checklist

## ✅ Pre-Deployment (Complete These First)

- [ ] Code is working locally
- [ ] All files committed to Git
- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] Render.com account created

## 📝 Deployment Steps

### 1. Push to GitHub (5 minutes)
```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/YOUR_USERNAME/medium-clone.git
git push -u origin main
```

### 2. Deploy Backend (10 minutes)
- [ ] Go to Render.com
- [ ] New Web Service
- [ ] Connect GitHub repo
- [ ] Root Directory: `backend`
- [ ] Build Command: `pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- [ ] Start Command: `gunicorn config.wsgi:application`
- [ ] Add Environment Variables:
  ```
  DEBUG=False
  SECRET_KEY=make-this-very-long-and-random-123456789
  ALLOWED_HOSTS=.onrender.com
  DJANGO_SETTINGS_MODULE=config.settings.prod
  ```
- [ ] Create Service

### 3. Add Database (5 minutes)
- [ ] New PostgreSQL
- [ ] Name: `mediumclone-db`
- [ ] Copy Internal Database URL
- [ ] Add to Backend Environment:
  ```
  DATABASE_URL=<paste-url-here>
  ```

### 4. Deploy Frontend (5 minutes)
- [ ] New Static Site
- [ ] Connect same GitHub repo
- [ ] Root Directory: `frontend`
- [ ] Build Command: `npm install && npm run build`
- [ ] Publish Directory: `build`
- [ ] Add Environment Variable:
  ```
  REACT_APP_API_URL=https://YOUR-BACKEND-NAME.onrender.com
  ```

### 5. Final Steps (5 minutes)
- [ ] Update Backend CORS:
  ```
  CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND-NAME.onrender.com
  ```
- [ ] Create superuser via Shell
- [ ] Test frontend URL
- [ ] Test backend API
- [ ] Login to admin panel

## 🎉 Done!

Your app is live at:
- Frontend: `https://YOUR-FRONTEND-NAME.onrender.com`
- Backend: `https://YOUR-BACKEND-NAME.onrender.com`
- Admin: `https://YOUR-BACKEND-NAME.onrender.com/admin`

## ⚠️ Important Notes

1. **Free Tier Limitations:**
   - Services sleep after 15 min inactivity
   - First request takes ~30 seconds to wake
   - 750 hours/month free (enough for 1 service)

2. **Replace Placeholders:**
   - `YOUR_USERNAME` → Your GitHub username
   - `YOUR-BACKEND-NAME` → Your chosen backend name
   - `YOUR-FRONTEND-NAME` → Your chosen frontend name

3. **Secret Key:**
   - Generate random string (50+ characters)
   - Never share or commit to Git
   - Use: `python -c "from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())"`

## 🐛 Troubleshooting

**Backend won't start?**
- Check logs in Render dashboard
- Verify DATABASE_URL is set
- Check DJANGO_SETTINGS_MODULE=config.settings.prod

**Frontend can't connect?**
- Verify REACT_APP_API_URL
- Check CORS_ALLOWED_ORIGINS in backend
- Ensure backend is running

**Database errors?**
- Verify DATABASE_URL format
- Check migrations ran in build command
- Look at deployment logs

## 📞 Need Help?

Check `DEPLOY.md` for detailed instructions!

---

**Total Time: ~30 minutes** ⏱️
