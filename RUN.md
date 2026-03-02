# ✅ Setup Complete!

Database created with SQLite (no PostgreSQL needed).

## Run Application

### Terminal 1 - Backend:
```bash
cd backend
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2 - Frontend:
```bash
cd frontend
npm start
```

## Access:
- Frontend: http://localhost:3000
- Backend: http://localhost:8000
- API Docs: http://localhost:8000/api/docs/

## Create Admin User (Optional):
```bash
cd backend
venv\Scripts\activate
python manage.py createsuperuser
```

Then access admin at: http://localhost:8000/admin/
