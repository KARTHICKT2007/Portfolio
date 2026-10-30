import React, { useEffect, useState } from 'react';
import { Terminal, Cpu, Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statusMessages = [
    'BOOTING SYSTEM CORE...',
    'INITIALIZING REACT & VITE PIPELINE...',
    'CONNECTING SQL & ORACLE CLOUD DATA...',
    'ESTABLISHING NEURAL INTERFACE...',
    'SYSTEM READY: WELCOME TO KARTHICK.DEV'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 400);
          return 100;
        }
        const increment = Math.floor(Math.random() * 8) + 4;
        const next = Math.min(prev + increment, 100);
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    const step = Math.floor((progress / 100) * (statusMessages.length - 1));
    setStatusIndex(step);
  }, [progress, statusMessages.length]);

  return (
    <div className="preloader-overlay">
      <div className="preloader-content">
        {/* Glowing Neural Ring */}
        <div className="preloader-cyber-ring">
          <div className="outer-orbit"></div>
          <div className="inner-orbit"></div>
          <div className="core-symbol">
            <Cpu size={36} className="glow-icon" />
          </div>
        </div>

        {/* Brand Name */}
        <div className="preloader-brand">
          <span className="brand-bracket">&lt;</span>
          <span className="brand-title">KARTHICK</span>
          <span className="brand-dot">.DEV</span>
          <span className="brand-bracket"> /&gt;</span>
        </div>

        {/* Progress Bar */}
        <div className="preloader-bar-wrap">
          <div
            className="preloader-bar-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Numeric Counter & Status */}
        <div className="preloader-footer">
          <div className="preloader-status">
            <span className="terminal-prompt">&gt;</span> {statusMessages[statusIndex]}
          </div>
          <div className="preloader-percent">{progress}%</div>
        </div>
      </div>
    </div>
  );
}
