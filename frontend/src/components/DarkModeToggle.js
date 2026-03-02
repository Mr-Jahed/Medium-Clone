import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <button 
      className="dark-mode-toggle" 
      onClick={toggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {darkMode ? (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="5"/>
              <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
          )}
        </div>
      </div>
    </button>
  );
};

export default DarkModeToggle;
