import React from 'react';
import { Send, Download, ArrowDown, Sparkles, Terminal, Code2, Database, Cloud, ExternalLink, ShieldCheck } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onOpenResume }) {
  const handleScrollToContact = (e) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => {
        const input = document.getElementById('contact-name');
        if (input) input.focus();
      }, 500);
    }
  };

  return (
    <section id="home" className="hero-section">
      <div className="section-container hero-container">
        {/* Left Column: Introductions & CTAs */}
        <div className="hero-content">
          {/* Status Badge */}
          <div className="hero-status-pill">
            <span className="pulsing-radar-dot"></span>
            <span className="status-text">Available for Opportunities & Projects</span>
          </div>

          {/* Subtitle / Intro prefix */}
          <div className="hero-greeting">
            <span className="greeting-prefix">Hello world, I'm</span>
          </div>

          {/* Name with Electric Purple Glow */}
          <h1 className="hero-name">
            <span className="name-highlight">{personalInfo.name}</span>
          </h1>

          {/* Professional Title */}
          <div className="hero-title-wrap">
            <div className="cyber-bracket">&gt;</div>
            <h2 className="hero-title">{personalInfo.tagline}</h2>
          </div>

          {/* Bio Description */}
          <p className="hero-description">
            {personalInfo.bio}
          </p>

          {/* Core Tech Stack Badges */}
          <div className="hero-tech-row">
            <span className="hero-tech-label">Primary Stack:</span>
            <div className="hero-tech-badges">
              <span className="hero-badge"><Code2 size={13} /> React</span>
              <span className="hero-badge"><Code2 size={13} /> JavaScript</span>
              <span className="hero-badge"><Database size={13} /> SQL</span>
              <span className="hero-badge"><Cloud size={13} /> Oracle Cloud</span>
              <span className="hero-badge">HTML5 / CSS3</span>
            </div>
          </div>

          {/* CTA Action Buttons */}
          <div className="hero-cta-group">
            <a
              href="#contact"
              onClick={handleScrollToContact}
              className="btn btn-primary hero-btn"
            >
              <Send size={18} />
              <span>Hire Me</span>
            </a>

            <button
              onClick={onOpenResume}
              className="btn btn-secondary hero-btn"
              title="View & Download Official Resume"
            >
              <Download size={18} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        {/* Right Column: Futuristic AI Avatar & Developer Terminal Card */}
        <div className="hero-visual">
          <div className="avatar-cyber-wrapper">
            {/* Ambient Purple Halo Glow */}
            <div className="avatar-halo-glow"></div>

            {/* Futuristic Hologram Card */}
            <div className="avatar-card">
              {/* Profile Image & Avatar Frame */}
              <div className="avatar-display-frame">
                {/* SVG/Vector futuristic Developer Avatar with purple cyber aesthetics */}
                <div className="avatar-svg-container">
                  <svg
                    viewBox="0 0 240 240"
                    className="developer-hologram-avatar"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stop-color="#8B5CF6" />
                        <stop offset="50%" stop-color="#A78BFA" />
                        <stop offset="100%" stop-color="#6D28D9" />
                      </linearGradient>
                      <linearGradient id="avatarFace" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stop-color="#2E1065" />
                        <stop offset="100%" stop-color="#170D2B" />
                      </linearGradient>
                      <filter id="purpleNeon" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Background Ring */}
                    <circle cx="120" cy="120" r="105" fill="#120D1F" stroke="#8B5CF6" stroke-width="2" stroke-dasharray="6 4" opacity="0.6" />
                    <circle cx="120" cy="120" r="95" fill="url(#avatarFace)" stroke="#A78BFA" stroke-width="1.5" />

                    {/* Developer Cyber Head & Silhouette */}
                    {/* Head */}
                    <circle cx="120" cy="85" r="38" fill="#1E1533" stroke="url(#purpleGrad)" stroke-width="2.5" />
                    
                    {/* Futuristic Cyber Visor / Glasses */}
                    <path
                      d="M95 82 Q120 78 145 82 L143 92 Q120 96 97 92 Z"
                      fill="#8B5CF6"
                      filter="url(#purpleNeon)"
                      opacity="0.9"
                    />
                    <line x1="100" y1="87" x2="140" y2="87" stroke="#F5F3FF" stroke-width="1.5" />

                    {/* Hair / Stylized top */}
                    <path
                      d="M86 75 Q120 42 154 75 Q145 60 120 58 Q95 60 86 75 Z"
                      fill="#8B5CF6"
                      opacity="0.8"
                    />

                    {/* Neck and Shoulders */}
                    <path
                      d="M106 120 L106 135 L134 135 L134 120 Z"
                      fill="#1E1533"
                    />
                    <path
                      d="M62 195 Q70 142 104 136 L136 136 Q170 142 178 195 Z"
                      fill="#170D2B"
                      stroke="url(#purpleGrad)"
                      stroke-width="2"
                    />

                    {/* Circuit lines on body */}
                    <path d="M120 145 L120 185 M98 165 L142 165" stroke="#A78BFA" stroke-width="1.5" stroke-dasharray="3 3" opacity="0.7" />
                    <circle cx="120" cy="165" r="4" fill="#8B5CF6" filter="url(#purpleNeon)" />
                  </svg>
                </div>

                {/* Cyber badge overlay */}
                <div className="avatar-cyber-pill">
                  <ShieldCheck size={14} className="badge-icon-verified" />
                  <span>Verified Developer</span>
                </div>
              </div>

              {/* Terminal Code Snapshot */}
              <div className="avatar-code-box">
                <div className="code-header">
                  <span className="dot dot-red"></span>
                  <span className="dot dot-yellow"></span>
                  <span className="dot dot-green"></span>
                  <span className="code-filename">karthick.config.ts</span>
                </div>
                <pre className="code-content">
                  <code>
                    <span className="c-keyword">const</span> <span className="c-name">developer</span> = &#123;{'\n'}
                    {'  '}name: <span className="c-string">"{personalInfo.name}"</span>,{'\n'}
                    {'  '}degree: <span className="c-string">"BSc CS @ MKU"</span>,{'\n'}
                    {'  '}role: <span className="c-string">"Full Stack & Data"</span>,{'\n'}
                    {'  '}status: <span className="c-green">"READY_TO_DEPLOY"</span>{'\n'}
                    &#125;;
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <a href="#about" className="scroll-indicator" aria-label="Scroll down to About section">
        <ArrowDown size={18} className="scroll-arrow-icon" />
      </a>
    </section>
  );
}
