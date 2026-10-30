import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentScroll = window.scrollY;

      if (totalScroll > 0) {
        setScrollProgress((currentScroll / totalScroll) * 100);
      }

      setVisible(currentScroll > 320);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <button
      onClick={scrollToTop}
      className={`back-to-top-btn ${visible ? 'visible' : ''}`}
      aria-label="Scroll back to top of page"
      title="Back to Top"
    >
      <svg className="progress-ring" width="48" height="48">
        <circle
          className="progress-ring-bg"
          stroke="rgba(139, 92, 246, 0.2)"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
        <circle
          className="progress-ring-circle"
          stroke="#8B5CF6"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="24"
          cy="24"
        />
      </svg>
      <ArrowUp size={18} className="arrow-icon" />
    </button>
  );
}
