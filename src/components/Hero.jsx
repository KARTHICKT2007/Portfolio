import React from 'react';
import { ArrowDown, Sparkles, Download, Layers, Code2, Award, BookOpen } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import profileImg from '../assets/profile.png';

export default function Hero({ onOpenResume }) {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="editorial-hero-section">
      {/* Giant Background Editorial Typography */}
      <div className="editorial-backdrop-wrap" aria-hidden="true">
        <span className="editorial-backdrop-text">PORTFOLIO</span>
      </div>

      <div className="section-container editorial-hero-container">
        {/* ================================================================
            LEFT SECTION – PERSONAL INTRODUCTION
            ================================================================ */}
        <div className="editorial-left-col">
          {/* Cursive / Handwritten style greeting */}
          <div className="editorial-script-greeting">Hello, I'm</div>

          {/* Large Bold Editorial Personal Name */}
          <h1 className="editorial-hero-name">KARTHICK</h1>

          {/* Professional Title */}
          <div className="editorial-role-tag">
            <span className="editorial-role-text">ASPIRING FULL STACK DEVELOPER & DATA ANALYST</span>
          </div>

          {/* Professional Introduction Narrative */}
          <p className="editorial-hero-bio">
            Computer Science student passionate about engineering scalable web applications,
            clean user-centric interfaces, and structured relational data architectures.
          </p>

          {/* Availability Label */}
          <div className="editorial-availability-badge">
            <span className="radar-status-dot" aria-hidden="true"></span>
            <span className="availability-text">Available for Opportunities & Projects</span>
          </div>

          {/* CTA Buttons */}
          <div className="editorial-cta-group">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="editorial-primary-btn"
            >
              <Layers size={17} />
              <span>Explore Projects</span>
            </a>

            <button
              onClick={onOpenResume}
              className="editorial-secondary-btn"
              title="Download Official Resume"
            >
              <Download size={17} />
              <span>Download Resume</span>
            </button>
          </div>
        </div>

        {/* ================================================================
            CENTER SECTION – PROFILE IMAGE
            ================================================================ */}
        <div className="editorial-center-col">
          <div className="editorial-portrait-wrapper">
            {/* Ambient Purple Halo Lighting */}
            <div className="editorial-portrait-halo" aria-hidden="true"></div>

            {/* Cutout Portrait with Smooth Faded Bottom */}
            <div className="editorial-portrait-frame">
              <img
                src={profileImg}
                alt="Karthick - Aspiring Full Stack Developer & Data Analyst"
                className="editorial-portrait-img"
                loading="eager"
                width="808"
                height="1024"
              />
            </div>

            {/* Floating Location Badge */}
            <div className="editorial-location-tag">
              <span className="tag-pin-icon" aria-hidden="true">📍</span>
              <span className="tag-location-text">Dindigul, Tamil Nadu</span>
            </div>
          </div>
        </div>

        {/* ================================================================
            RIGHT SECTION – HIGHLIGHTS
            ================================================================ */}
        <div className="editorial-right-col">
          {/* Circular Sparkle Tagline Quote */}
          <div className="editorial-spark-card">
            <div className="spark-icon-circle">
              <Sparkles size={15} className="spark-icon" />
            </div>
            <p className="spark-quote-text">
              Turning ideas into powerful, high-performance digital experiences.
            </p>
          </div>

          {/* Vertical Highlights Information Area */}
          <div className="editorial-highlights-stack">
            {/* 1. Core Technical Stack */}
            <div className="highlight-item">
              <div className="highlight-lead">
                <Code2 size={15} className="highlight-lead-icon" />
                <span className="highlight-lead-badge">CORE STACK</span>
              </div>
              <div className="highlight-body">
                <span className="highlight-title">React • JavaScript • SQL</span>
                <span className="highlight-sub">Oracle Cloud • Vite • Modern CSS</span>
              </div>
            </div>

            <div className="highlight-divider" aria-hidden="true"></div>

            {/* 2. Featured Projects */}
            <div className="highlight-item">
              <div className="highlight-lead">
                <Layers size={15} className="highlight-lead-icon" />
                <span className="highlight-lead-badge">4+</span>
              </div>
              <div className="highlight-body">
                <span className="highlight-title">FEATURED PROJECTS</span>
                <span className="highlight-sub">Production-Ready Web & Data Apps</span>
              </div>
            </div>

            <div className="highlight-divider" aria-hidden="true"></div>

            {/* 3. Certifications */}
            <div className="highlight-item">
              <div className="highlight-lead">
                <Award size={15} className="highlight-lead-icon" />
                <span className="highlight-lead-badge">CREDENTIALS</span>
              </div>
              <div className="highlight-body">
                <span className="highlight-title">OCI & SQL CERTIFIED</span>
                <span className="highlight-sub">Cloud Architecture & DB Modeling</span>
              </div>
            </div>

            <div className="highlight-divider" aria-hidden="true"></div>

            {/* 4. Academic Foundation */}
            <div className="highlight-item">
              <div className="highlight-lead">
                <BookOpen size={15} className="highlight-lead-icon" />
                <span className="highlight-lead-badge">2024–27</span>
              </div>
              <div className="highlight-body">
                <span className="highlight-title">B.SC. COMPUTER SCIENCE</span>
                <span className="highlight-sub">APCAC, Palani • Madurai Kamaraj University</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down Arrow Indicator */}
      <a href="#about" className="editorial-scroll-indicator" aria-label="Scroll down to About section">
        <ArrowDown size={17} className="scroll-arrow-icon" />
      </a>
    </section>
  );
}
