import React, { useState, useRef, useEffect } from 'react';
import './RichTextEditor.css';

const RichTextEditor = ({ value, onChange, placeholder = "Tell your story..." }) => {
  const editorRef = useRef(null);
  const fileInputRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    if (editorRef.current && value && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCommand = (command, value = null) => {
    document.execCommand(command, false, value);
    editorRef.current.focus();
  };

  const handleHeading = (level) => {
    execCommand('formatBlock', `h${level}`);
  };

  const handleLink = () => {
    if (showLinkInput && linkUrl) {
      execCommand('createLink', linkUrl);
      setLinkUrl('');
      setShowLinkInput(false);
    } else {
      setShowLinkInput(true);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        execCommand('insertImage', event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUrl = () => {
    if (showImageInput && imageUrl) {
      execCommand('insertImage', imageUrl);
      setImageUrl('');
      setShowImageInput(false);
    } else {
      setShowImageInput(true);
    }
  };

  const handleCodeBlock = () => {
    const selection = window.getSelection();
    const selectedText = selection.toString();
    
    if (selectedText) {
      const codeBlock = `<pre><code>${selectedText}</code></pre>`;
      execCommand('insertHTML', codeBlock);
    } else {
      execCommand('formatBlock', 'pre');
    }
  };

  const handleQuote = () => {
    execCommand('formatBlock', 'blockquote');
  };

  return (
    <div className="rich-editor-container">
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => handleHeading(1)}
            className="toolbar-btn"
            title="Heading 1"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => handleHeading(2)}
            className="toolbar-btn"
            title="Heading 2"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => handleHeading(3)}
            className="toolbar-btn"
            title="Heading 3"
          >
            H3
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('bold')}
            className="toolbar-btn"
            title="Bold (Ctrl+B)"
          >
            <strong>B</strong>
          </button>
          <button
            type="button"
            onClick={() => execCommand('italic')}
            className="toolbar-btn"
            title="Italic (Ctrl+I)"
          >
            <em>I</em>
          </button>
          <button
            type="button"
            onClick={() => execCommand('underline')}
            className="toolbar-btn"
            title="Underline (Ctrl+U)"
          >
            <u>U</u>
          </button>
          <button
            type="button"
            onClick={() => execCommand('strikeThrough')}
            className="toolbar-btn"
            title="Strikethrough"
          >
            <s>S</s>
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('insertUnorderedList')}
            className="toolbar-btn"
            title="Bullet List"
          >
            ☰
          </button>
          <button
            type="button"
            onClick={() => execCommand('insertOrderedList')}
            className="toolbar-btn"
            title="Numbered List"
          >
            ≡
          </button>
          <button
            type="button"
            onClick={handleQuote}
            className="toolbar-btn"
            title="Quote"
          >
            "
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={handleLink}
            className="toolbar-btn"
            title="Insert Link"
          >
            🔗
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="toolbar-btn"
            title="Upload Image"
          >
            🖼️
          </button>
          <button
            type="button"
            onClick={handleImageUrl}
            className="toolbar-btn"
            title="Image URL"
          >
            🌐
          </button>
          <button
            type="button"
            onClick={handleCodeBlock}
            className="toolbar-btn"
            title="Code Block"
          >
            &lt;/&gt;
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('justifyLeft')}
            className="toolbar-btn"
            title="Align Left"
          >
            ⬅
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyCenter')}
            className="toolbar-btn"
            title="Align Center"
          >
            ↔
          </button>
          <button
            type="button"
            onClick={() => execCommand('justifyRight')}
            className="toolbar-btn"
            title="Align Right"
          >
            ➡
          </button>
        </div>

        <div className="toolbar-divider"></div>

        <div className="toolbar-group">
          <button
            type="button"
            onClick={() => execCommand('undo')}
            className="toolbar-btn"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            type="button"
            onClick={() => execCommand('redo')}
            className="toolbar-btn"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>
        </div>
      </div>

      {showLinkInput && (
        <div className="link-input-container">
          <input
            type="url"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            placeholder="Enter URL (https://...)"
            className="link-input"
            autoFocus
          />
          <button type="button" onClick={handleLink} className="btn-small">
            Insert
          </button>
          <button
            type="button"
            onClick={() => {
              setShowLinkInput(false);
              setLinkUrl('');
            }}
            className="btn-small btn-cancel"
          >
            Cancel
          </button>
        </div>
      )}

      {showImageInput && (
        <div className="link-input-container">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Enter image URL (https://...)"
            className="link-input"
            autoFocus
          />
          <button type="button" onClick={handleImageUrl} className="btn-small">
            Insert
          </button>
          <button
            type="button"
            onClick={() => {
              setShowImageInput(false);
              setImageUrl('');
            }}
            className="btn-small btn-cancel"
          >
            Cancel
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      <div
        ref={editorRef}
        className="rich-editor-content"
        contentEditable
        onInput={handleInput}
        data-placeholder={placeholder}
        suppressContentEditableWarning
      />
    </div>
  );
};

export default RichTextEditor;
