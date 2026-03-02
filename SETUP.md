# Medium Clone - Setup Guide

## ✅ Setup Status

- ✅ Backend dependencies installed
- ✅ Frontend dependencies installed  
- ⚠️ Database needs to be created manually

## Database Setup (Required)

### Option 1: Using pgAdmin (Easiest)
1. Open pgAdmin
2. Right-click on "Databases" → Create → Database
3. Name: `medium_clone_db1`
4. Owner: postgres
5. Save
6. Right-click on the new database → Restore
7. Select file: `medium_clone_backup_updated.sql`
8. Click Restore

### Option 2: Using SQL Shell (psql)
1. Open SQL Shell (psql) from Start Menu
2. Press Enter for defaults (server, database, port, username)
3. Enter postgres password
4. Run these commands:
```sql
CREATE DATABASE medium_clone_db1;
CREATE USER medium_clone_user1 WITH PASSWORD 'medium_clone_pass1';
GRANT ALL PRIVILEGES ON DATABASE medium_clone_db1 TO medium_clone_user1;
ALTER DATABASE medium_clone_db1 OWNER TO medium_clone_user1;
\q
```
5. Restore backup:
```bash
psql -U postgres -d medium_clone_db1 -f "c:\Users\DELL\OneDrive\Desktop\Clone-medium\Medium-Clone\medium_clone_backup_updated.sql"
```

## Run Application

### Terminal 1 - Backend
```bash
cd c:\Users\DELL\OneDrive\Desktop\Clone-medium\Medium-Clone\backend
venv\Scripts\activate
python manage.py runserver
```

### Terminal 2 - Frontend  
```bash
cd c:\Users\DELL\OneDrive\Desktop\Clone-medium\Medium-Clone\frontend
npm start
```

## Access Points
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API Docs: http://localhost:8000/api/docs/

## Database Credentials (Already in backend/.env)
- Database: medium_clone_db1
- User: medium_clone_user1  
- Password: medium_clone_pass1
- Host: localhost
- Port: 5432
