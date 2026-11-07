import { useEffect } from 'react';

export default function LandingScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(onFinish, 3500);
    const handleKeyDown = (e) => {
      if (e.code === 'Space' || e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        onFinish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onFinish]);

  return (
    <div id="landing" className="screen active" onClick={onFinish}>
      <div className="content">
        <div className="robot-logo brand-logo">
          <svg viewBox="0 0 100 100" fill="none" stroke="#1a1a1a" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 28 C5 41 5 61 16 74" strokeOpacity="0.35" strokeWidth="1.8" />
            <path d="M23 37 C15 45 15 57 23 65" strokeOpacity="0.7" strokeWidth="2.2" />
            <path d="M77 37 C85 45 85 57 77 65" strokeOpacity="0.7" strokeWidth="2.2" />
            <path d="M84 28 C95 41 95 61 84 74" strokeOpacity="0.35" strokeWidth="1.8" />
            <path d="M50 14 L33 50 C34 63 39 71 39 80 L61 80 C61 71 66 63 67 50 Z" />
            <line x1="50" y1="14" x2="50" y2="44" strokeWidth="2" />
            <circle cx="50" cy="47" r="3.2" fill="#1a1a1a" stroke="none" />
            <path d="M39 52 C44 38 47 26 48 20" strokeWidth="1.5" strokeOpacity="0.6" />
            <path d="M61 52 C56 38 53 26 52 20" strokeWidth="1.5" strokeOpacity="0.6" />
            <line x1="36" y1="84" x2="64" y2="84" strokeWidth="2.2" />
          </svg>
        </div>
        <div className="brand">NIRA</div>
        <div className="icon-row">
          <span>🎵</span><span className="eq">=</span><span>🎧</span>
        </div>
        <p className="intro-text">
          For the 2nd birthday, <span className="accent">Nira</span> presents <span className="accent2">Recall</span>, a sensory literary platform.
        </p>
        <p className="sub-text">So turn your speakers on, or put on your headphones.</p>
      </div>
    </div>
  );
}