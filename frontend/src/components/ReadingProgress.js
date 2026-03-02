import React, { useState, useEffect } from 'react';
import './ReadingProgress.css';

const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      const scrollProgress = (scrollTop / documentHeight) * 100;
      setProgress(scrollProgress);
      
      setShowBackToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      <div className="reading-progress-container">
        <div 
          className="reading-progress-bar" 
          style={{ width: `${progress}%` }}
        />
      </div>

      {showBackToTop && (
        <button 
          className="back-to-top-btn" 
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 15l-6-6-6 6"/>
          </svg>
        </button>
      )}
    </>
  );
};

export default ReadingProgress;
