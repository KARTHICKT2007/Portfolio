import React, { useRef, useState, useEffect } from 'react';
import { Volume2, VolumeX, FastForward, Sparkles, Terminal, ShieldCheck } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [phaseText, setPhaseText] = useState('INITIALIZING ENVIRONMENT...');
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);

  // Synchronized phase labels matching video scenes
  const phaseTimeline = [
    { start: 0.0, end: 1.3, text: '// SWING INTO THE FUTURE' },
    { start: 1.3, end: 4.0, text: '01 // FRONTEND DEVELOPMENT' },
    { start: 4.0, end: 6.9, text: '02 // BACKEND DEVELOPMENT & SQL' },
    { start: 6.9, end: 9.4, text: '03 // REACT & WEB ARCHITECTURE' },
    { start: 9.4, end: 11.6, text: '04 // UI/UX DESIGN & INTERACTION' },
    { start: 11.6, end: 16.0, text: '05 // LAUNCHING KARTHICK.DEV' }
  ];

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 650);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;

    const current = video.currentTime;
    const dur = video.duration;
    const percent = Math.min(Math.round((current / dur) * 100), 100);
    setProgress(percent);

    const activePhase = phaseTimeline.find(p => current >= p.start && current < p.end);
    if (activePhase) {
      setPhaseText(activePhase.text);
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setVideoLoaded(true);
        })
        .catch(() => {
          // Autoplay blocked by browser policy without gesture
          setShowPlayFallback(true);
        });
    }

    // Escape or Enter key shortcut to skip intro
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`video-preloader-root ${isExiting ? 'fade-out' : ''}`}>
      {/* Background ambient purple glow */}
      <div className="preloader-bg-ambient"></div>

      {/* Main Video Presentation Stage */}
      <div className="preloader-stage">
        {/* Subtle top HUD / active phase pill */}
        <div className="preloader-top-hud">
          <div className="preloader-brand-pill">
            <span className="hud-radar-dot"></span>
            <span className="hud-brand-name">&lt;Karthick.dev /&gt;</span>
          </div>

          <div className="preloader-phase-indicator">
            <Terminal size={14} className="hud-term-icon" />
            <span className="phase-indicator-text">{phaseText}</span>
          </div>

          <div className="preloader-top-actions">
            <button
              onClick={handleToggleMute}
              className="hud-action-btn"
              title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
              aria-label={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
            </button>

            <button
              onClick={handleFinish}
              className="hud-skip-btn"
              title="Skip intro and open portfolio"
              aria-label="Skip Intro"
            >
              <span>Skip Intro</span>
              <FastForward size={14} />
            </button>
          </div>
        </div>

        {/* Video Player Frame with smooth purple glow frame */}
        <div className="preloader-video-wrapper">
          <video
            ref={videoRef}
            src="/preloader.mp4"
            autoPlay
            muted={isMuted}
            defaultMuted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleFinish}
            onLoadedData={() => setVideoLoaded(true)}
            className="preloader-core-video"
          />

          {/* Autoplay fallback button if browser requires user gesture */}
          {showPlayFallback && (
            <div className="preloader-autoplay-prompt">
              <button
                onClick={() => {
                  setShowPlayFallback(false);
                  videoRef.current?.play().then(() => setVideoLoaded(true));
                }}
                className="btn btn-primary prompt-play-btn"
              >
                <Sparkles size={18} />
                <span>Play Animation / Enter Site</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom HUD: Dynamic Progress Track & Percentage */}
        <div className="preloader-bottom-hud">
          <div className="hud-progress-info">
            <span className="hud-status-label">LOADING PORTFOLIO ENVIRONMENT</span>
            <span className="hud-percent-text">{progress}%</span>
          </div>
          <div className="hud-progress-track">
            <div
              className="hud-progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
