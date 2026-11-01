import React from 'react';
import { Send, Download, ArrowDown, Sparkles, Terminal, Code2, Database, Cloud, ExternalLink, ShieldCheck, MapPin } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.png';

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
            <span className="greeting-prefix">Hello, I'm</span>
          </div>

          {/* Name with Electric Purple Glow */}
          <h1 className="hero-name">
            <span className="name-highlight">{personalInfo.fullName}</span>
          </h1>

          {/* Professional Title */}
          <div className="hero-title-wrap">
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

        {/* Right Column: Custom Professional Profile Picture Card */}
        <div className="hero-visual">
          <div className="profile-cyber-wrapper">
            {/* Ambient Purple Halo Glow */}
            <div className="profile-halo-glow" aria-hidden="true"></div>

            {/* Cyber Corner HUD Accent (Red bracket top-left from user reference) */}
            <div className="profile-corner-bracket" aria-hidden="true"></div>

            {/* Main Portrait Card with Curved Corners & Location Badge */}
            <div className="profile-portrait-card">
              <div className="profile-image-container">
                <img
                  src={profileImg}
                  alt={`${personalInfo.fullName} - ${personalInfo.tagline}`}
                  className="profile-portrait-img"
                  loading="eager"
                  width="300"
                  height="374"
                />
              </div>

              {/* Status Indicator Pill */}
              <div className="profile-status-chip">
                <span className="profile-status-dot"></span>
                <span>Active • Palani</span>
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
