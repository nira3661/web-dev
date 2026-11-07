import { useState, useEffect, useRef } from 'react';

export function useSpaceHold({ duration = 1400, onComplete, enabled = true }) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const holdStartRef = useRef(null);
  const animFrameRef = useRef(null);
  const isHoldingRef = useRef(false);
  const progressRef = useRef(0);
  const onCompleteRef = useRef(onComplete);

  // Keep onComplete reference current on every render
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Reset state if disabled
  useEffect(() => {
    if (!enabled) {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      isHoldingRef.current = false;
      setIsHolding(false);
      progressRef.current = 0;
      setProgress(0);
      document.body.classList.remove('holding');
    }
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (e) => {
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (isSpace && !e.repeat && !isHoldingRef.current) {
        e.preventDefault();
        isHoldingRef.current = true;
        setIsHolding(true);
        holdStartRef.current = performance.now();
        document.body.classList.add('holding');

        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }

        const tick = () => {
          if (!isHoldingRef.current) return;
          const elapsed = performance.now() - holdStartRef.current;
          const currentProgress = Math.min(100, (elapsed / duration) * 100);
          progressRef.current = currentProgress;
          setProgress(currentProgress);

          if (currentProgress < 100) {
            animFrameRef.current = requestAnimationFrame(tick);
          } else {
            isHoldingRef.current = false;
            setIsHolding(false);
            document.body.classList.remove('holding');
            progressRef.current = 0;
            setProgress(0);
            if (onCompleteRef.current) {
              onCompleteRef.current();
            }
          }
        };

        animFrameRef.current = requestAnimationFrame(tick);
      }
    };

    const handleKeyUp = (e) => {
      const isSpace = e.code === 'Space' || e.key === ' ' || e.key === 'Spacebar';
      if (isSpace && isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
        document.body.classList.remove('holding');

        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }

        // Smooth springback animation
        let p = progressRef.current;
        const spring = () => {
          p = Math.max(0, p - 6);
          progressRef.current = p;
          setProgress(p);
          if (p > 0) {
            animFrameRef.current = requestAnimationFrame(spring);
          }
        };
        animFrameRef.current = requestAnimationFrame(spring);
      }
    };

    const handleBlur = () => {
      if (isHoldingRef.current) {
        isHoldingRef.current = false;
        setIsHolding(false);
        document.body.classList.remove('holding');
        if (animFrameRef.current) {
          cancelAnimationFrame(animFrameRef.current);
        }
        progressRef.current = 0;
        setProgress(0);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
      document.body.classList.remove('holding');
    };
  }, [enabled, duration]);

  return { progress, isHolding };
}
