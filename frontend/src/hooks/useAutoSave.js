import { useEffect, useRef, useState } from 'react';

const useAutoSave = (data, onSave, delay = 3000) => {
  const [status, setStatus] = useState('idle'); // idle, saving, saved
  const timeoutRef = useRef(null);
  const previousDataRef = useRef(data);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const dataChanged = JSON.stringify(data) !== JSON.stringify(previousDataRef.current);
    
    if (dataChanged && data.title && data.content) {
      setStatus('saving');
      
      timeoutRef.current = setTimeout(async () => {
        try {
          await onSave(data);
          setStatus('saved');
          previousDataRef.current = data;
          setTimeout(() => setStatus('idle'), 2000);
        } catch (error) {
          setStatus('error');
          console.error('Auto-save failed:', error);
        }
      }, delay);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [data, onSave, delay]);

  return status;
};

export default useAutoSave;
