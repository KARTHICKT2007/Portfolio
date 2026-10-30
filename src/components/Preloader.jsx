import React, { useRef, useState, useEffect } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Atom,
  FileCode2,
  Database,
  Cloud,
  Code2,
  Terminal,
  Cpu,
  Layers,
  CheckCircle2
} from 'lucide-react';

export default function Preloader({ onComplete }) {
  // Detect mobile vs desktop screen (threshold: 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <MobilePreloader onComplete={onComplete} />
  ) : (
    <DesktopPreloader onComplete={onComplete} />
  );
}

/* ==========================================================================
   DESKTOP PRELOADER - NEW, MODERN & PROFESSIONAL (NO FOOTER.MP4)
   ========================================================================== */
function DesktopPreloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const audioRef = useRef(null);
  const audioContextRef = useRef(null);

  // Web Development Animated Phases
  const devSteps = [
    { label: 'FRONTEND DEVELOPMENT', sub: 'Initializing React 19, Vite & Virtual DOM', tag: 'UI / UX' },
    { label: 'REACT ARCHITECTURE', sub: 'Mounting Component Tree & State Hooks', tag: 'ES6+ MODERN' },
    { label: 'BACKEND & SQL ANALYTICS', sub: 'Connecting Relational Database & Queries', tag: 'DATABASE' },
    { label: 'ORACLE CLOUD INFRASTRUCTURE', sub: 'Deploying Virtual Networks & Cloud Pipelines', tag: 'OCI CLOUD' },
    { label: 'SYSTEM VERIFIED • READY', sub: 'Finalizing Karthick Portfolio Interface', tag: 'COMPLETE' }
  ];

  // Synthesize clean high-tech audio chime when unmuted
  const playTechChime = (freq = 520) => {
    if (isMuted) return;
    try {
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // AudioContext unavailable
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);

    if (audioRef.current) {
      audioRef.current.muted = nextMuted;
      if (!nextMuted) {
        audioRef.current.play().catch(() => {});
        playTechChime(640);
      } else {
        audioRef.current.pause();
      }
    }
  };

  // Fast, smooth, and professional loading progress (approx 2.8s total)
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      // Non-linear progression: quick burst -> smooth climb -> 100%
      const increment = currentPercent < 40 ? 4 : currentPercent < 80 ? 3 : 2;
      currentPercent = Math.min(currentPercent + increment, 100);
      setProgress(currentPercent);

      // Play soft sound pulse at milestones
      if (currentPercent === 25 || currentPercent === 50 || currentPercent === 75 || currentPercent === 100) {
        playTechChime(440 + currentPercent * 2);
      }

      // Update compilation phase
      const stepIdx = Math.min(
        Math.floor((currentPercent / 100) * devSteps.length),
        devSteps.length - 1
      );
      setCurrentStepIndex(stepIdx);

      if (currentPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 600);
        }, 400);
      }
    }, 55);

    return () => clearInterval(interval);
  }, [onComplete, isMuted]);

  return (
    <div className={`desktop-preloader-root ${isExiting ? 'fade-out' : ''}`}>
      {/* Background Ambience: Glowing Orbs, Cyber Grid, Deep Purple Gradient */}
      <div className="dp-ambient-glow orb-1"></div>
      <div className="dp-ambient-glow orb-2"></div>
      <div className="dp-cyber-grid" aria-hidden="true"></div>
      <div className="dp-scanlines" aria-hidden="true"></div>

      {/* Standalone ambient audio track from project */}
      <audio ref={audioRef} src="/soundtrack.m4a" loop preload="auto" />

      {/* Top Sound Control: ONLY Sound Icon with NO text beside it */}
      <div className="dp-sound-hud">
        <button
          onClick={handleToggleMute}
          className={`dp-sound-icon-btn ${!isMuted ? 'active' : ''}`}
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
          aria-label={isMuted ? 'Unmute' : 'Mute'}
        >
          {isMuted ? (
            <VolumeX size={20} className="dp-sound-icon" />
          ) : (
            <Volume2 size={20} className="dp-sound-icon playing" />
          )}
        </button>
      </div>

      {/* Centerpiece Stage: Perfectly Centered & Aligned */}
      <div className="dp-center-stage">
        {/* Animated Central Orbital Ring & Tech Reactor */}
        <div className="dp-reactor-wrapper">
          {/* Outer dashed spinning ring */}
          <div className="dp-ring dp-ring-outer"></div>

          {/* Middle counter-rotating ring with brackets */}
          <div className="dp-ring dp-ring-middle">
            <span className="dp-orbital-tag tag-top">&lt;dev&gt;</span>
            <span className="dp-orbital-tag tag-bottom">&#123;code&#125;</span>
          </div>

          {/* Inner glowing pulse ring */}
          <div className="dp-ring dp-ring-inner"></div>

          {/* Core Logo / Symbol */}
          <div className="dp-reactor-core">
            <Atom size={44} className="dp-core-atom-icon" />
            <div className="dp-core-pulse"></div>
          </div>

          {/* Orbiting Web-Dev Tech Icons */}
          <div className="dp-orbit-node node-react" title="React 19">
            <Atom size={18} />
          </div>
          <div className="dp-orbit-node node-js" title="JavaScript ES6+">
            <FileCode2 size={18} />
          </div>
          <div className="dp-orbit-node node-sql" title="SQL Database">
            <Database size={18} />
          </div>
          <div className="dp-orbit-node node-cloud" title="Oracle Cloud">
            <Cloud size={18} />
          </div>
        </div>

        {/* Developer Branding Lockup */}
        <div className="dp-brand-lockup">
          <div className="dp-brand-badge">
            <span className="dp-radar-dot"></span>
            <span className="dp-badge-text">KARTHICK.DEV</span>
          </div>
          <h1 className="dp-brand-name">
            <span className="dp-bracket">&lt;</span>
            <span className="dp-name-text">Karthick</span>
            <span className="dp-accent-dot">.dev</span>
            <span className="dp-bracket"> /&gt;</span>
          </h1>
          <p className="dp-brand-title">Aspiring Full Stack Developer & Data Analyst</p>
        </div>

        {/* Web Development Animated Phase Card */}
        <div className="dp-phase-card">
          <div className="dp-phase-header">
            <span className="dp-terminal-prefix">&gt;_</span>
            <span className="dp-phase-tag">{devSteps[currentStepIndex].tag}</span>
            <span className="dp-phase-status">PROCESSING</span>
          </div>
          <div className="dp-phase-content">
            <div className="dp-phase-title">{devSteps[currentStepIndex].label}</div>
            <div className="dp-phase-desc">{devSteps[currentStepIndex].sub}</div>
          </div>
        </div>

        {/* Stylish Loading Progress Indicator */}
        <div className="dp-progress-block">
          <div className="dp-progress-header">
            <span className="dp-progress-label">INITIALIZING ENVIRONMENT</span>
            <span className="dp-progress-value">{progress}%</span>
          </div>
          <div className="dp-progress-track">
            <div
              className="dp-progress-bar"
              style={{ width: `${progress}%` }}
            >
              <div className="dp-progress-glow-head"></div>
            </div>
          </div>
        </div>

        {/* Minimal High-Tech Tech Stack Ticker */}
        <div className="dp-stack-pills">
          <span className="dp-stack-chip">HTML5</span>
          <span className="dp-stack-chip">CSS3</span>
          <span className="dp-stack-chip">JAVASCRIPT</span>
          <span className="dp-stack-chip active">REACT</span>
          <span className="dp-stack-chip active">SQL</span>
          <span className="dp-stack-chip active">ORACLE CLOUD</span>
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   MOBILE PRELOADER - KEPT COMPLETELY UNCHANGED
   ========================================================================== */
function MobilePreloader({ onComplete }) {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);

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

    if (audioRef.current && !audioRef.current.paused && Math.abs(audioRef.current.currentTime - current) > 0.3) {
      audioRef.current.currentTime = current;
    }
  };

  const handleToggleMute = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    const audio = audioRef.current;

    const targetMuted = !isMuted;
    setIsMuted(targetMuted);

    if (video) {
      video.muted = targetMuted;
      video.volume = targetMuted ? 0 : 1.0;
    }

    if (audio) {
      audio.muted = targetMuted;
      if (!targetMuted) {
        audio.currentTime = video ? video.currentTime : 0;
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
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
          setShowPlayFallback(true);
        });
    }

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
      <div className="preloader-bg-ambient"></div>
      <audio ref={audioRef} src="/soundtrack.m4a" preload="auto" />

      <div className="preloader-stage">
        <div className="preloader-sound-only-hud">
          <button
            onClick={handleToggleMute}
            className={`sound-only-btn ${!isMuted ? 'active-sound' : ''}`}
            title={isMuted ? 'Enable Sound' : 'Mute Sound'}
            aria-label={isMuted ? 'Enable Audio' : 'Mute Audio'}
          >
            {isMuted ? (
              <VolumeX size={20} className="sound-icon-muted" />
            ) : (
              <Volume2 size={20} className="sound-icon-playing" />
            )}
            <span className="sound-pill-label">
              {isMuted ? 'Sound Off' : 'Sound On'}
            </span>
          </button>
        </div>

        <div className="preloader-video-wrapper" onClick={handleToggleMute}>
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

          {showPlayFallback && (
            <div className="preloader-autoplay-prompt">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayFallback(false);
                  if (videoRef.current) {
                    videoRef.current.play().then(() => setVideoLoaded(true));
                  }
                }}
                className="btn btn-primary prompt-play-btn"
              >
                <Sparkles size={18} />
                <span>Play Animation / Enter Site</span>
              </button>
            </div>
          )}
        </div>

        <div className="preloader-minimal-progress">
          <div
            className="minimal-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
