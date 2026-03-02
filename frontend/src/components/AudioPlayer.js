import React, { useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';

const AudioPlayer = ({ title, content }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const utteranceRef = useRef(null);

  useEffect(() => {
    const loadVoices = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      const englishVoices = availableVoices.filter(voice => 
        voice.lang.startsWith('en')
      );
      setVoices(englishVoices);
      if (englishVoices.length > 0 && !selectedVoice) {
        setSelectedVoice(englishVoices[0]);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  const cleanText = (text) => {
    return text
      .replace(/<[^>]*>/g, '')
      .replace(/\n+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  };

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      const textToRead = `${title}. ${cleanText(content)}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.rate = speed;
      utterance.pitch = 1;
      utterance.volume = 1;

      utterance.onend = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setIsPaused(false);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
      setIsPaused(false);
    }
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsPlaying(false);
    setIsPaused(false);
  };

  const handleSpeedChange = (newSpeed) => {
    setSpeed(newSpeed);
    if (isPlaying || isPaused) {
      handleStop();
    }
  };

  const handleVoiceChange = (e) => {
    const voice = voices.find(v => v.name === e.target.value);
    setSelectedVoice(voice);
    if (isPlaying || isPaused) {
      handleStop();
    }
  };

  return (
    <div className="audio-player">
      <div className="audio-player-header">
        <div className="audio-icon">🎧</div>
        <div className="audio-title">Listen to this article</div>
      </div>

      <div className="audio-controls">
        {!isPlaying && !isPaused && (
          <button className="audio-btn play-btn" onClick={handlePlay}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Play
          </button>
        )}

        {isPlaying && (
          <button className="audio-btn pause-btn" onClick={handlePause}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
            </svg>
            Pause
          </button>
        )}

        {isPaused && (
          <button className="audio-btn play-btn" onClick={handlePlay}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
            Resume
          </button>
        )}

        {(isPlaying || isPaused) && (
          <button className="audio-btn stop-btn" onClick={handleStop}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="6" width="12" height="12"/>
            </svg>
            Stop
          </button>
        )}
      </div>

      <div className="audio-settings">
        <div className="audio-setting">
          <label>Speed:</label>
          <div className="speed-buttons">
            {[0.5, 0.75, 1, 1.25, 1.5, 2].map(s => (
              <button
                key={s}
                className={`speed-btn ${speed === s ? 'active' : ''}`}
                onClick={() => handleSpeedChange(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>

        {voices.length > 0 && (
          <div className="audio-setting">
            <label>Voice:</label>
            <select 
              className="voice-select" 
              value={selectedVoice?.name || ''} 
              onChange={handleVoiceChange}
            >
              {voices.map(voice => (
                <option key={voice.name} value={voice.name}>
                  {voice.name} ({voice.lang})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
