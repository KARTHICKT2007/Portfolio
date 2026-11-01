import React from 'react';
import { GraduationCap, Code2, Award, MapPin } from 'lucide-react';
import aboutPortrait from '../assets/about_portrait.png';
import { personalInfo } from '../data/portfolioData';

export default function About({ onOpenResume }) {
  return (
    <section id="about" className="section-padding about-section">
      <div className="section-container about-custom-container">
        {/* Top Centered Pill Header */}
        <div className="about-pill-header-wrap">
          <div className="about-pill-header">
            <span className="about-pill-dot" aria-hidden="true"></span>
            <span className="about-pill-label">About Me</span>
          </div>
        </div>

        {/* Main 3-Column Grid */}
        <div className="about-main-grid">
          {/* Column 1: Profile Portrait with Glowing Neon Polygon */}
          <div className="about-portrait-col">
            <div className="about-neon-wrapper">
              {/* Neon Angled Geometric Polygon */}
              <div className="about-neon-polygon" aria-hidden="true"></div>

              {/* Ambient Backlight Flare */}
              <div className="about-neon-glow" aria-hidden="true"></div>

              {/* Cutout Portrait */}
              <div className="about-portrait-frame">
                <img
                  src={aboutPortrait}
                  alt="Karthick - Aspiring Full Stack Developer & Data Analyst"
                  className="about-portrait-img"
                  loading="lazy"
                  width="420"
                  height="380"
                />
              </div>
            </div>
          </div>

          {/* Column 2: Personal Narrative & Greeting */}
          <div className="about-intro-col">
            <div className="about-script-greeting">Hello!</div>
            <h2 className="about-hero-name">I'm Karthick</h2>
            <div className="about-hero-role">Aspiring Full Stack Developer & Data Analyst</div>
            <div className="about-accent-line" aria-hidden="true"></div>

            <p className="about-lead-bio">
              I am a <strong className="about-highlight">Computer Science student</strong>, passionate about building modern <strong className="about-highlight">web applications</strong>, exploring data analytics, and turning ideas into innovative solutions. I love learning new technologies and solving real-world problems.
            </p>
          </div>

          {/* Column 3: 4 Glassmorphism Highlight Cards */}
          <div className="about-cards-col">
            {/* 1. Education */}
            <div className="about-glass-card">
              <div className="glass-card-icon-box">
                <GraduationCap size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-content">
                <h4 className="glass-card-title">Education</h4>
                <div className="glass-card-primary">{personalInfo.education.degree}</div>
                <div className="glass-card-sub">{personalInfo.education.college}</div>
                <div className="glass-card-sub">{personalInfo.education.institution}</div>
                <div className="glass-card-period">({personalInfo.education.period})</div>
              </div>
            </div>

            {/* 2. Skills */}
            <div className="about-glass-card">
              <div className="glass-card-icon-box">
                <Code2 size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-content">
                <h4 className="glass-card-title">Skills</h4>
                <div className="glass-card-primary">React • JavaScript • SQL</div>
                <div className="glass-card-sub">HTML • CSS • Oracle Cloud</div>
              </div>
            </div>

            {/* 3. Certifications */}
            <div className="about-glass-card">
              <div className="glass-card-icon-box">
                <Award size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-content">
                <h4 className="glass-card-title">Certifications</h4>
                <div className="glass-card-primary">Oracle Cloud | Oracle APEX</div>
                <div className="glass-card-sub">AI & Data Analytics</div>
              </div>
            </div>

            {/* 4. Location */}
            <div className="about-glass-card">
              <div className="glass-card-icon-box">
                <MapPin size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-content">
                <h4 className="glass-card-title">Location</h4>
                <div className="glass-card-primary">{personalInfo.contact.location}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: 4 Metric Cards */}
        <div className="about-metrics-row">
          <div className="about-metric-card">
            <div className="metric-card-value">6+</div>
            <div className="metric-card-label">CORE TECHNOLOGIES</div>
          </div>

          <div className="about-metric-card">
            <div className="metric-card-value">4+</div>
            <div className="metric-card-label">COMPLETED PROJECTS</div>
          </div>

          <div className="about-metric-card">
            <div className="metric-card-value">OCI & SQL</div>
            <div className="metric-card-label">CLOUD & DB FOCUS</div>
          </div>

          <div className="about-metric-card">
            <div className="metric-card-value">100%</div>
            <div className="metric-card-label">COMMITMENT</div>
          </div>
        </div>
      </div>
    </section>
  );
}
