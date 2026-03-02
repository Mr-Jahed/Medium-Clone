# Medium Clone - Full Stack Application

A professional Medium-like blogging platform built with Django REST Framework and React.

## 🚀 Features

### Core Features
- ✅ User Authentication (Register, Login, Password Reset)
- ✅ Article CRUD Operations
- ✅ Rich Text Editor with formatting tools
- ✅ Comments & Nested Replies
- ✅ Claps/Reactions System
- ✅ Bookmarks/Save Articles
- ✅ Follow/Unfollow Authors
- ✅ Real-time Notifications
- ✅ Search Functionality
- ✅ Tags & Categories
- ✅ User Profiles
- ✅ Reading Progress Bar
- ✅ Audio Version (Text-to-Speech)
- ✅ Dark Mode
- ✅ Responsive Design

### Production Features
- ✅ Error Boundary & Error Handling
- ✅ Toast Notifications
- ✅ Loading Skeletons
- ✅ 404 Page
- ✅ Auto-save Drafts
- ✅ Image Upload
- ✅ Social Sharing Ready

## 🛠️ Tech Stack

### Backend
- Django 4.2.7
- Django REST Framework 3.14.0
- PostgreSQL / SQLite
- Redis (Caching & Celery)
- Celery (Background Tasks)
- Channels (WebSockets)
- Pillow (Image Processing)

### Frontend
- React 18.2.0
- React Router 6.8.0
- Axios
- Context API (State Management)
- CSS3 (Custom Styling)

## 📋 Prerequisites

- Python 3.8+
- Node.js 16+
- PostgreSQL (optional, SQLite works for development)
- Redis (optional, for caching and real-time features)

## 🚀 Quick Start

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

Backend will run on: `http://localhost:8000`

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will run on: `http://localhost:3000`

## 📁 Project Structure

```
Medium-Clone/
├── backend/
│   ├── apps/
│   │   ├── articles/      # Article management
│   │   ├── comments/      # Comments system
│   │   ├── feeds/         # User feeds
│   │   ├── interactions/  # Claps, bookmarks
│   │   ├── notifications/ # Notification system
│   │   └── users/         # User management
│   ├── config/            # Django settings
│   ├── media/             # Uploaded files
│   └── manage.py
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── contexts/      # React contexts
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── App.js
│   └── package.json
└── README.md
```

## 🔧 Environment Variables

### Backend (.env)
```
SECRET_KEY=your-secret-key
DEBUG=True
DATABASE_URL=sqlite:///db.sqlite3
REDIS_URL=redis://localhost:6379/0
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:8000
```

## 📚 API Documentation

API endpoints are available at: `http://localhost:8000/api/`

### Main Endpoints
- `/api/auth/` - Authentication
- `/api/articles/` - Articles
- `/api/comments/` - Comments
- `/api/interactions/` - Claps & Bookmarks
- `/api/notifications/` - Notifications
- `/api/users/` - User profiles

## 🎨 Features Documentation

- [Rich Text Editor](./RICH_TEXT_EDITOR.md)
- [Reading Progress Bar](./READING_PROGRESS_BAR.md)
- [Audio Version](./AUDIO_VERSION.md)
- [Dark Mode](./DARK_MODE_ENHANCED.md)
- [Production Deployment](./PRODUCTION_READY.md)

## 🚀 Deployment

See [PRODUCTION_READY.md](./PRODUCTION_READY.md) for complete deployment guide including:
- Docker configuration
- Nginx setup
- SSL certificates
- CI/CD pipeline
- Monitoring setup
- Security checklist

## 🧪 Testing

```bash
# Backend tests
cd backend
python manage.py test

# Frontend tests
cd frontend
npm test
```

## 📝 Available Scripts

### Backend
- `python manage.py runserver` - Start development server
- `python manage.py migrate` - Run database migrations
- `python manage.py createsuperuser` - Create admin user
- `python manage.py test` - Run tests

### Frontend
- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm eject` - Eject from Create React App

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Mr. Jahed Inamdar**
- GitHub: [@Mr-Jahed](https://github.com/Mr-Jahed)
- LinkedIn: [jahed-inamdar](https://linkedin.com/in/jahed-inamdar)

## 🙏 Acknowledgments

- Inspired by Medium.com
- Built with Django and React
- Icons from various open-source libraries

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Made with ❤️ by Mr. Jahed Inamdar
