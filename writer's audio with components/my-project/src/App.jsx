import { useState, useEffect, useRef } from 'react';
import { writers } from './data/writers';
import { useSpaceHold } from './hooks/useSpaceHold';

import HeaderBrand from './components/HeaderBrand';
import LandingScreen from './components/LandingScreen';
import TitleScreen from './components/TitleScreen';
import Showcase from './components/Showcase';
import WriterProfileModal from './components/WriterProfileModal';
import VerseExplanationModal from './components/VerseExplanationModal';
import HelpModal from './components/HelpModal';
import MontageFlash from './components/MontageFlash';

export default function App() {
  const [screen, setScreen] = useState('landing'); // 'landing' | 'title' | 'showcase'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isVerseOpen, setIsVerseOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Montage states
  const [isMontageActive, setIsMontageActive] = useState(false);
  const [montageFrame, setMontageFrame] = useState('');

  const audioRef = useRef(null);
  const currentWriter = writers[currentIndex];

  // Sound Engine
  useEffect(() => {
    if (screen !== 'showcase' || !soundEnabled) {
      if (audioRef.current) audioRef.current.pause();
      return;
    }

    const trackUrl = (isProfileOpen || isVerseOpen) 
      ? currentWriter.profileAudio 
      : currentWriter.mainAudio;

    if (audioRef.current) {
      audioRef.current.pause();
    }

    const audio = new Audio(trackUrl);
    audio.loop = true;
    audio.play().catch(() => {});
    audioRef.current = audio;

    return () => audio.pause();
  }, [screen, currentIndex, isProfileOpen, isVerseOpen, soundEnabled, currentWriter]);

  // Writer Montage Switch
  const triggerNextWriter = () => {
    setIsMontageActive(true);
    const bgs = writers.flatMap(w => [w.bgPic, w.authorPic, w.versePic]);
    let flashCount = 0;

    const interval = setInterval(() => {
      setMontageFrame(bgs[Math.floor(Math.random() * bgs.length)]);
      flashCount++;
      if (flashCount >= 8) {
        clearInterval(interval);
        setCurrentIndex((prev) => (prev + 1) % writers.length);
        setIsMontageActive(false);
      }
    }, 120);
  };

  // Spacebar Mechanic Hook
  const isAnyModalOpen = isProfileOpen || isVerseOpen || isHelpOpen;
  const isSpaceHoldEnabled = (screen === 'title' || screen === 'showcase') && !isMontageActive && !isAnyModalOpen;

  const { progress } = useSpaceHold({
    duration: 1400,
    enabled: isSpaceHoldEnabled,
    onComplete: () => {
      if (screen === 'title') {
        setScreen('showcase');
      } else if (screen === 'showcase') {
        triggerNextWriter();
      }
    }
  });

  // ESC Listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsProfileOpen(false);
        setIsVerseOpen(false);
        setIsHelpOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <>
      <div className="screen-texture" />
      <div className="vignette" />
      <HeaderBrand />

      {screen === 'landing' && (
        <LandingScreen onFinish={() => setScreen('title')} />
      )}

      {screen === 'title' && (
        <TitleScreen holdProgress={progress} />
      )}

      {screen === 'showcase' && (
        <Showcase
          writer={currentWriter}
          holdProgress={progress}
          onOpenProfile={() => { setIsVerseOpen(false); setIsProfileOpen(true); }}
          onOpenVerse={() => { setIsProfileOpen(false); setIsVerseOpen(true); }}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
          soundEnabled={soundEnabled}
          onOpenHelp={() => setIsHelpOpen(true)}
        />
      )}

      <WriterProfileModal
        writer={currentWriter}
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        onSwitchToVerse={() => { setIsProfileOpen(false); setIsVerseOpen(true); }}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <VerseExplanationModal
        writer={currentWriter}
        isOpen={isVerseOpen}
        onClose={() => setIsVerseOpen(false)}
        onSwitchToWriter={() => { setIsVerseOpen(false); setIsProfileOpen(true); }}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <MontageFlash active={isMontageActive} frameUrl={montageFrame} />
    </>
  );
}