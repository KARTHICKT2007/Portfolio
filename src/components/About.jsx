import React from 'react';
import { GraduationCap, Award, BookOpen, MapPin, Calendar, CheckCircle2, Terminal, Code2, Database } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export default function About() {
  return (
    <section id="about" className="section-padding about-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="tag-bracket">//</span> 01. PROFILE OVERVIEW
          </div>
          <h2 className="section-title">
            About <span className="text-gradient">Me</span>
          </h2>
          <p className="section-subtitle">
            Merging strong computer science foundations with modern full-stack development and analytical precision.
          </p>
        </div>

        <div className="about-grid">
          {/* Left Column: Personal Narrative & Philosophy */}
          <div className="about-bio-card">
            <h3 className="about-card-title">
              <span className="text-electric">Engineering</span> Modern Digital Solutions
            </h3>

            <div className="about-paragraphs">
              {personalInfo.about.map((paragraph, idx) => (
                <p key={idx} className="about-text">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Quick Principles / Focus Areas */}
            <div className="about-principles">
              <div className="principle-item">
                <div className="principle-icon-wrap">
                  <Code2 size={20} className="principle-icon" />
                </div>
                <div>
                  <h4 className="principle-title">Modern Full Stack Engineering</h4>
                  <p className="principle-desc">Clean, maintainable code architectures with React, JavaScript, and modular CSS.</p>
                </div>
              </div>

              <div className="principle-item">
                <div className="principle-icon-wrap">
                  <Database size={20} className="principle-icon" />
                </div>
                <div>
                  <h4 className="principle-title">Data-Driven Analytical Thinking</h4>
                  <p className="principle-desc">Relational database modeling with SQL and cloud infrastructure via Oracle Cloud.</p>
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="about-stats-grid">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="stat-card">
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Education & Academic Credentials */}
          <div className="about-education-card">
            <div className="card-top-header">
              <div className="header-icon-box">
                <GraduationCap size={24} className="grad-icon" />
              </div>
              <div>
                <span className="card-top-tag">ACADEMIC FOUNDATION</span>
                <h3 className="card-top-title">Education & Credentials</h3>
              </div>
            </div>

            {/* Degree Card */}
            <div className="education-detail-box">
              <div className="edu-badge-row">
                <span className="edu-status-badge">Undergraduate (2023 - 2026)</span>
                <span className="edu-period">
                  <Calendar size={13} /> {personalInfo.education.period}
                </span>
              </div>

              <h4 className="edu-degree-title">{personalInfo.education.degree}</h4>
              <div className="edu-university">
                <BookOpen size={16} />
                <span>{personalInfo.education.institution}</span>
              </div>
              <div className="edu-location">
                <MapPin size={14} />
                <span>{personalInfo.education.location}</span>
              </div>

              <div className="edu-divider"></div>

              <div className="edu-focus-area">
                <h5 className="focus-heading">Core Curriculum & Technical Focus:</h5>
                <p className="focus-description">{personalInfo.education.focus}</p>
                
                <ul className="focus-list">
                  <li>
                    <CheckCircle2 size={15} className="focus-check" />
                    <span>Relational Database Management Systems (RDBMS & SQL)</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} className="focus-check" />
                    <span>Data Structures & Algorithmic Problem Solving</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} className="focus-check" />
                    <span>Full Stack Web Development & Frontend Frameworks</span>
                  </li>
                  <li>
                    <CheckCircle2 size={15} className="focus-check" />
                    <span>Software Engineering Lifecycle & Cloud Computing</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Verification Note */}
            <div className="academic-seal-box">
              <div className="seal-text">
                <strong>Madurai Kamaraj University (MKU)</strong> is a premier recognized state university in Tamil Nadu, India.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
