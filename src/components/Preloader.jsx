import React, { useRef, useState, useEffect } from 'react';
import { FastForward, Volume2, VolumeX } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const [isExiting, setIsExiting] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 550);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div
      className={`video-preloader-root ${isExiting ? 'fade-out' : ''}`}
      onClick={handleFinish}
      title="Click anywhere to enter"
    >
      {/* Ambient background reflection for wide PC displays */}
      <video
        src="/preloader.mp4"
        autoPlay
        muted
        defaultMuted
        loop
        playsInline
        aria-hidden="true"
        className="preloader-ambient-backdrop"
      />
      <div className="preloader-ambient-vignette" />

      {/* Main Full Video (No overlays, full display) */}
      <div className="preloader-video-container">
        <video
          ref={videoRef}
          src="/preloader.mp4"
          autoPlay
          muted={isMuted}
          defaultMuted
          playsInline
          preload="auto"
          onEnded={handleFinish}
          className="preloader-main-video"
        />
      </div>

      {/* Subtle, non-intrusive corner controls */}
      <div className="preloader-minimal-controls" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={toggleMute}
          className="preloader-mute-btn"
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          title={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
        </button>
        <button
          onClick={handleFinish}
          className="preloader-skip-pill"
          aria-label="Skip intro"
          title="Skip intro and view website (Esc)"
        >
          <span>Skip</span>
          <FastForward size={13} />
        </button>
      </div>
    </div>
  );
}
