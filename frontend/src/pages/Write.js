import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import api from '../services/api';
import RichTextEditor from '../components/RichTextEditor';
import useAutoSave from '../hooks/useAutoSave';

const Write = () => {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    featured_image: null,
    tag_names: []
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [draftId, setDraftId] = useState(null);
  
  const { user } = useAuth();
  const navigate = useNavigate();

  const autoSaveDraft = useCallback(async (data) => {
    if (!data.title || !data.content) return;
    
    try {
      const submitData = new FormData();
      submitData.append('title', data.title);
      submitData.append('content', data.content);
      submitData.append('excerpt', data.excerpt);
      submitData.append('status', 'draft');
      
      if (data.featured_image) {
        submitData.append('featured_image', data.featured_image);
      }

      if (draftId) {
        await api.patch(`/articles/${draftId}/`, submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        const response = await api.post('/articles/', submitData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        setDraftId(response.data.id);
      }
    } catch (err) {
      console.error('Auto-save failed:', err);
    }
  }, [draftId]);

  const autoSaveStatus = useAutoSave(formData, autoSaveDraft, 3000);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        featured_image: file
      }));
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('content', formData.content);
      submitData.append('excerpt', formData.excerpt);
      submitData.append('status', publish ? 'published' : 'draft');
      
      if (formData.featured_image) {
        submitData.append('featured_image', formData.featured_image);
      }

      const response = await api.post('/articles/', submitData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (publish && response.data.slug) {
        await api.post(`/articles/${response.data.slug}/publish/`);
      }

      navigate('/');
    } catch (err) {
      setError('Failed to save article. Please try again.');
      console.error('Error saving article:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="content-container">
        <div className="empty-state">
          <h3>Please sign in to write</h3>
          <p>You need to be logged in to create articles.</p>
          <Link to="/login" className="btn-primary">Sign In</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="write-container">
      <Link to="/" className="back-button">
        ← Back to Home
      </Link>
      
      <h1 className="write-title">Tell your story</h1>
      
      {error && (
        <div className="error" style={{marginBottom: '20px', padding: '12px', background: '#fee', border: '1px solid #fcc', borderRadius: '4px', color: '#c33'}}>
          {error}
        </div>
      )}
      
      <form className="write-form">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="title-input"
          required
        />
        
        <div className="image-upload">
          <label className="form-label">Featured Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {imagePreview && (
            <img 
              src={imagePreview} 
              alt="Preview" 
              className="image-preview"
            />
          )}
        </div>
        
        <textarea
          name="excerpt"
          value={formData.excerpt}
          onChange={handleChange}
          placeholder="Write a brief excerpt (optional)..."
          className="form-textarea"
          style={{minHeight: '80px'}}
        />
        
        <RichTextEditor
          value={formData.content}
          onChange={(content) => setFormData(prev => ({ ...prev, content }))}
          placeholder="Tell your story..."
        />
        
        {autoSaveStatus !== 'idle' && (
          <div className={`auto-save-indicator ${autoSaveStatus}`}>
            {autoSaveStatus === 'saving' && '💾 Saving draft...'}
            {autoSaveStatus === 'saved' && '✓ Draft saved'}
            {autoSaveStatus === 'error' && '⚠ Save failed'}
          </div>
        )}
        
        <div className="form-actions">
          <button
            type="button"
            onClick={(e) => handleSubmit(e, false)}
            className="btn-secondary"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Draft'}
          </button>
          
          <button
            type="button"
            onClick={(e) => handleSubmit(e, true)}
            className="btn-primary"
            disabled={loading || !formData.title || !formData.content}
          >
            {loading ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Write;