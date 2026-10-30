import React, { useRef, useState, useEffect } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  // Choose widescreen 16:9 video on desktop (>=769px) and 9:16 portrait on mobile
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 769;
    }
    return true;
  });

  const videoSrc = isDesktop ? '/preloader_desktop.mp4' : '/preloader.mp4';

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 769;
      setIsDesktop(desktop);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback (allowed when muted)
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [videoSrc]);

  return (
    <div
      className={`video-preloader-root ${isExiting ? 'fade-out' : ''}`}
      onClick={handleFinish}
    >
      {/* Crisp Full Video container (Edge-to-edge desktop & mobile) */}
      <div className="preloader-video-container">
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          autoPlay
          muted={isMuted}
          defaultMuted
          playsInline
          preload="auto"
          onEnded={handleFinish}
          className="preloader-main-video"
        />
      </div>

      {/* Sleek, Non-Intrusive Controls */}
      <div className="preloader-minimal-controls" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={toggleMute}
          className="preloader-mute-btn"
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          title={isMuted ? 'Unmute sound' : 'Mute sound'}
          type="button"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
        <button
          onClick={handleFinish}
          className="preloader-skip-pill"
          aria-label="Skip intro"
          title="Skip intro and view website (Esc)"
          type="button"
        >
          <span>Skip</span>
          <FastForward size={14} />
        </button>
      </div>
    </div>
  );
}
