import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div>
            <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>😕</h1>
            <h2 style={{ fontSize: '24px', marginBottom: '16px' }}>Oops! Something went wrong</h2>
            <p style={{ color: '#6b6b6b', marginBottom: '24px' }}>
              We're sorry for the inconvenience. Please try refreshing the page.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button 
                onClick={() => window.location.reload()} 
                style={{
                  padding: '12px 24px',
                  background: '#1a8917',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Refresh Page
              </button>
              <Link 
                to="/" 
                style={{
                  padding: '12px 24px',
                  background: '#f0f0f0',
                  color: '#333',
                  border: 'none',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Go Home
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
