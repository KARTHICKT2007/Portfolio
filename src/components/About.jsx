import React from 'react';
import { GraduationCap, Code2, Trophy, MapPin, Rocket, Download } from 'lucide-react';
import aboutPortrait from '../assets/about_portrait.png';

export default function About({ onOpenResume }) {
  const handleScrollToProjects = (e) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="section-padding about-section">
      {/* Giant Background Editorial Typography */}
      <div className="about-backdrop-wrap" aria-hidden="true">
        <span className="about-backdrop-text">ABOUT ME</span>
      </div>

      <div className="section-container about-outer-container">
        {/* Top Pill Badge */}
        <div className="about-pill-header">
          <div className="about-pill-badge">
            <span className="about-pill-dot" aria-hidden="true"></span>
            <span>About Me</span>
          </div>
        </div>

        {/* Main 3-Column Editorial Layout */}
        <div className="about-editorial-layout">
          {/* ================================================================
              LEFT COLUMN — PORTRAIT WITH NEON ACCENT
              ================================================================ */}
          <div className="about-left-col">
            <div className="about-portrait-stage">
              {/* Neon Angular Accent Shape */}
              <div className="about-neon-polygon" aria-hidden="true"></div>

              {/* Ambient Halo Lighting */}
              <div className="about-portrait-halo" aria-hidden="true"></div>

              {/* Cutout Portrait with Smooth Faded Bottom */}
              <div className="about-portrait-frame">
                <img
                  src={aboutPortrait}
                  alt="Karthick - Aspiring Full Stack Developer & Data Analyst"
                  className="about-portrait-img"
                  loading="lazy"
                  width="420"
                  height="490"
                />
              </div>
            </div>
          </div>

          {/* ================================================================
              CENTER COLUMN — NARRATIVE & ACTION BUTTONS
              ================================================================ */}
          <div className="about-center-col">
            <div className="about-cursive-greeting">Hello!</div>
            <h3 className="about-display-name">I’m Karthick</h3>
            <div className="about-role-subtitle">
              Aspiring Full Stack Developer & Data Analyst
            </div>

            <p className="about-editorial-bio">
              I am a <strong>Computer Science student</strong>, passionate about building modern <strong>web applications</strong>, exploring <strong>data analytics</strong>, and turning ideas into innovative solutions. I love learning new technologies and solving real-world problems.
            </p>

            <div className="about-cta-group">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="about-btn-primary"
              >
                <Rocket size={17} />
                <span>Explore My Projects</span>
              </a>

              <button
                onClick={onOpenResume}
                className="about-btn-secondary"
                title="Download Official Resume"
              >
                <Download size={17} />
                <span>Download Resume</span>
              </button>
            </div>
          </div>

          {/* ================================================================
              RIGHT COLUMN — 4 STACKED GLASSMORPHIC HIGHLIGHT CARDS
              ================================================================ */}
          <div className="about-right-col">
            {/* 1. Education */}
            <div className="about-glass-card">
              <div className="glass-card-icon-wrap">
                <GraduationCap size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-body">
                <h4 className="glass-card-title">Education</h4>
                <div className="glass-card-bold">B.Sc. Computer Science</div>
                <div className="glass-card-desc">
                  Arulmigu Palaniandavar College of Arts and Culture, Palani
                </div>
                <div className="glass-card-sub">
                  Madurai Kamaraj University
                </div>
                <div className="glass-card-period">(2024 – 2027)</div>
              </div>
            </div>

            {/* 2. Skills */}
            <div className="about-glass-card">
              <div className="glass-card-icon-wrap">
                <Code2 size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-body">
                <h4 className="glass-card-title">Skills</h4>
                <div className="glass-card-bold">React • JavaScript • SQL</div>
                <div className="glass-card-desc">HTML • CSS • Oracle Cloud</div>
              </div>
            </div>

            {/* 3. Certifications */}
            <div className="about-glass-card">
              <div className="glass-card-icon-wrap">
                <Trophy size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-body">
                <h4 className="glass-card-title">Certifications</h4>
                <div className="glass-card-bold">Oracle Cloud | Oracle APEX</div>
                <div className="glass-card-desc">AI & Data Analytics</div>
              </div>
            </div>

            {/* 4. Location */}
            <div className="about-glass-card">
              <div className="glass-card-icon-wrap">
                <MapPin size={22} className="glass-card-icon" />
              </div>
              <div className="glass-card-body">
                <h4 className="glass-card-title">Location</h4>
                <div className="glass-card-bold">Tamil Nadu, India</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
