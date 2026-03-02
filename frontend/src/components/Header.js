import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { notificationsAPI } from '../services/api';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showNotificationPopup, setShowNotificationPopup] = useState(false);
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    if (user) {
      fetchUnreadCount();
    }
  }, [user]);

  useEffect(() => {
    // Auto-open sidebar when navigating back or to any page
    if (user) {
      setSidebarOpen(true);
    }
  }, [location.pathname, user]);

  useEffect(() => {
    // Update main content margin based on sidebar state
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
      if (user && sidebarOpen) {
        mainContent.classList.remove('sidebar-hidden');
      } else {
        mainContent.classList.add('sidebar-hidden');
      }
    }
  }, [sidebarOpen, user]);

  const fetchUnreadCount = async () => {
    try {
      const response = await notificationsAPI.getAll();
      const notifications = response.data.results || response.data;
      const unread = notifications.filter(n => !n.is_read);
      
      if (unread.length > 0) {
        setLatestNotification(unread[0]);
        setShowNotificationPopup(true);
        setTimeout(() => setShowNotificationPopup(false), 5000);
      }
      
      setUnreadCount(unread.length);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const handleLogout = () => {
    logout();
    setSidebarOpen(false);
    navigate('/login');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleNotificationClick = () => {
    setUnreadCount(0);
    navigate('/notifications');
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000${imagePath}`;
  };

  return (
    <>
      <header className="header">
        <div className="header-container">
          {user && (
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              ☰
            </button>
          )}
          
          <Link to="/" className="logo">
            Medium
          </Link>
          
          <div className="header-search">
            <form onSubmit={handleSearch} className="search-form">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="search-input"
              />
              <button type="submit" className="search-btn">
                🔍
              </button>
            </form>
          </div>
          
          <nav className="nav-links">
            {user ? (
              <div className="user-menu">
                <Link to="/write" className="write-btn">
                  Write
                </Link>
                <button 
                  onClick={handleNotificationClick}
                  className="nav-link notification-link"
                >
                  <svg className="notification-bell" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                  </svg>
                  {unreadCount > 0 && (
                    <span className="notification-badge">{unreadCount}</span>
                  )}
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="nav-link">
                  Sign In
                </Link>
                <Link to="/register" className="write-btn">
                  Get Started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Sidebar */}
      {user && (
        <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="sidebar-user">
              {user.avatar ? (
                <img 
                  src={getImageUrl(user.avatar)} 
                  alt={user.username}
                  className="sidebar-avatar"
                />
              ) : (
                <div className="sidebar-avatar">
                  {user.first_name ? user.first_name[0].toUpperCase() : user.email[0].toUpperCase()}
                </div>
              )}
              <div className="sidebar-user-info">
                <div className="sidebar-username">
                  {user.first_name && user.last_name
                    ? `${user.first_name} ${user.last_name}`
                    : user.username
                  }
                </div>
                <div className="sidebar-email">{user.email}</div>
              </div>
            </div>
          </div>
          
          <nav className="sidebar-nav">
            <Link to="/" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span className="sidebar-text">Home</span>
            </Link>
            
            <Link to="/stories" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <span className="sidebar-text">Stories</span>
            </Link>
            
            <Link to="/write" className="sidebar-link sidebar-link-highlight" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"/>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
              </svg>
              <span className="sidebar-text">Write</span>
            </Link>
            
            <div className="sidebar-divider"></div>
            
            <Link to={`/profile/${user.email}`} className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span className="sidebar-text">Profile</span>
            </Link>
            
            <Link to="/saved" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
              </svg>
              <span className="sidebar-text">Saved Articles</span>
            </Link>
            
            <Link to="/following" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span className="sidebar-text">Following</span>
            </Link>
            
            <Link to="/notifications" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
              </svg>
              <span className="sidebar-text">Notifications</span>
              {unreadCount > 0 && (
                <span className="sidebar-badge">{unreadCount}</span>
              )}
            </Link>
            
            <div className="sidebar-divider"></div>
            
            <Link to="/settings" className="sidebar-link" onClick={() => setSidebarOpen(false)}>
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6m5.2-13.2l-4.2 4.2m0 6l4.2 4.2M23 12h-6m-6 0H1m18.2 5.2l-4.2-4.2m0-6l4.2-4.2"/>
              </svg>
              <span className="sidebar-text">Settings</span>
            </Link>
            
            <div className="sidebar-divider"></div>
            
            <button onClick={handleLogout} className="sidebar-link sidebar-link-logout">
              <svg className="sidebar-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
              <span className="sidebar-text">Sign Out</span>
            </button>
          </nav>
        </div>
      )}
      
      {showNotificationPopup && latestNotification && (
        <div className="notification-popup">
          <div className="popup-header">
            <span className="popup-icon">🔔</span>
            <span className="popup-title">New Notification</span>
            <button 
              className="popup-close" 
              onClick={() => setShowNotificationPopup(false)}
            >
              ×
            </button>
          </div>
          <div className="popup-content">
            <p>{latestNotification.message}</p>
            {latestNotification.article && (
              <Link 
                to={`/article/${latestNotification.article.slug}`}
                className="popup-link"
                onClick={() => setShowNotificationPopup(false)}
              >
                View Article →
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;