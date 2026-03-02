import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Comments from '../components/Comments';
import ReadingProgress from '../components/ReadingProgress';
import AudioPlayer from '../components/AudioPlayer';
import api from '../services/api';

const Article = () => {
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [clapCount, setClapCount] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [clapLoading, setClapLoading] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);
  
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchArticle();
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const response = await api.get(`/articles/${slug}/`);
      setArticle(response.data);
      
      // Get user's clap count and bookmark status if logged in
      if (user) {
        try {
          const clapResponse = await api.get(`/interactions/clap/${slug}/status/`);
          setClapCount(clapResponse.data.count || 0);
        } catch (e) {
          setClapCount(0);
        }
        
        try {
          const bookmarkResponse = await api.get(`/interactions/bookmark/${slug}/status/`);
          setIsBookmarked(bookmarkResponse.data.bookmarked || false);
        } catch (e) {
          setIsBookmarked(false);
        }
      }
    } catch (error) {
      setError('Article not found');
      console.error('Error fetching article:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClap = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setClapLoading(true);
    try {
      console.log('Clapping article:', slug);
      const response = await api.post(`/interactions/clap/${slug}/`);
      console.log('Clap response:', response.data);
      setClapCount(response.data.claps || clapCount + 1);
    } catch (error) {
      console.error('Error clapping article:', error.response?.data || error.message);
    } finally {
      setClapLoading(false);
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    setBookmarkLoading(true);
    try {
      console.log('Bookmarking article:', slug);
      if (isBookmarked) {
        const response = await api.delete(`/interactions/bookmark/${slug}/`);
        setIsBookmarked(false);
      } else {
        const response = await api.post(`/interactions/bookmark/${slug}/`);
        setIsBookmarked(true);
      }
      console.log('Bookmark response: toggled');
    } catch (error) {
      console.error('Error bookmarking article:', error.response?.data || error.message);
    } finally {
      setBookmarkLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:8000${imagePath}`;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        <h3>Loading article...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>
        <div className="error">
          <h3>{error}</h3>
          <p>The article you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ReadingProgress />
      <div className="content-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      
      <article>
        <header className="article-header">
          <h1 className="article-detail-title">{article.title}</h1>
          
          <div className="article-detail-meta">
            <div className="article-author">
              <Link to={`/profile/${article.author?.email}`} className="author-avatar">
                {article.author?.first_name 
                  ? article.author.first_name[0].toUpperCase()
                  : article.author?.email[0].toUpperCase()
                }
              </Link>
              <div>
                <Link to={`/profile/${article.author?.email}`} className="author-name">
                  {article.author?.first_name && article.author?.last_name
                    ? `${article.author.first_name} ${article.author.last_name}`
                    : article.author?.username
                  }
                </Link>
                <div className="article-date">
                  {formatDate(article.published_at || article.created_at)} · {article.read_time} min read
                </div>
              </div>
            </div>
            
            <div style={{display: 'flex', gap: '16px', alignItems: 'center'}}>
              <button 
                onClick={handleClap}
                className={`interaction-btn ${clapLoading ? 'loading' : ''}`}
                disabled={clapLoading}
              >
                👏 Clap {clapCount > 0 && `(${clapCount})`}
              </button>
              
              <button 
                onClick={handleBookmark}
                className={`interaction-btn ${isBookmarked ? 'bookmarked' : ''} ${bookmarkLoading ? 'loading' : ''}`}
                disabled={bookmarkLoading}
              >
                {isBookmarked ? '🔖 Saved' : '🔖 Save'}
              </button>
            </div>
          </div>
        </header>
        
        <AudioPlayer title={article.title} content={article.content} />
        
        {article.featured_image && (
          <img 
            src={getImageUrl(article.featured_image)} 
            alt={article.title}
            className="article-detail-image"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        )}
        
        <div className="article-detail-content">
          {article.content.split('\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
        
        {article.tags && article.tags.length > 0 && (
          <div className="article-tags">
            <div className="tags-wrapper">
              {article.tags.map((tag) => (
                <span key={tag.id} className="article-tag">
                  {tag.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>
      
      <Comments articleSlug={slug} />
    </div>
    </>
  );
};

export default Article;