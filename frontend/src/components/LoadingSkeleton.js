import React from 'react';
import './LoadingSkeleton.css';

export const ArticleCardSkeleton = () => (
  <div className="skeleton-card">
    <div className="skeleton-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text-group">
        <div className="skeleton-text skeleton-text-sm"></div>
        <div className="skeleton-text skeleton-text-xs"></div>
      </div>
    </div>
    <div className="skeleton-title"></div>
    <div className="skeleton-excerpt"></div>
    <div className="skeleton-excerpt" style={{ width: '60%' }}></div>
    <div className="skeleton-meta">
      <div className="skeleton-text skeleton-text-xs"></div>
      <div className="skeleton-text skeleton-text-xs"></div>
    </div>
  </div>
);

export const ArticleDetailSkeleton = () => (
  <div className="skeleton-detail">
    <div className="skeleton-title-large"></div>
    <div className="skeleton-header">
      <div className="skeleton-avatar"></div>
      <div className="skeleton-text-group">
        <div className="skeleton-text skeleton-text-sm"></div>
        <div className="skeleton-text skeleton-text-xs"></div>
      </div>
    </div>
    <div className="skeleton-image"></div>
    <div className="skeleton-content">
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text"></div>
      <div className="skeleton-text" style={{ width: '80%' }}></div>
    </div>
  </div>
);

export const ProfileSkeleton = () => (
  <div className="skeleton-profile">
    <div className="skeleton-avatar-large"></div>
    <div className="skeleton-title"></div>
    <div className="skeleton-text"></div>
    <div className="skeleton-stats">
      <div className="skeleton-stat"></div>
      <div className="skeleton-stat"></div>
      <div className="skeleton-stat"></div>
    </div>
  </div>
);
