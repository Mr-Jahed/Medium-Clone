import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{
      minHeight: 'calc(100vh - 200px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div>
        <h1 style={{ 
          fontSize: '120px', 
          fontWeight: '700', 
          margin: '0',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          404
        </h1>
        <h2 style={{ 
          fontSize: '32px', 
          fontWeight: '600', 
          marginBottom: '16px',
          color: '#242424'
        }}>
          Page Not Found
        </h2>
        <p style={{ 
          fontSize: '18px', 
          color: '#6b6b6b', 
          marginBottom: '32px',
          maxWidth: '500px'
        }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link 
            to="/" 
            style={{
              padding: '14px 32px',
              background: '#1a8917',
              color: 'white',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500',
              transition: 'background 0.2s'
            }}
          >
            Go Home
          </Link>
          <button 
            onClick={() => window.history.back()}
            style={{
              padding: '14px 32px',
              background: '#f0f0f0',
              color: '#333',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background 0.2s'
            }}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
