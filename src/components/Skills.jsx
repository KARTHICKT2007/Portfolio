import React from 'react';
import { Code2, Database, Cloud, Terminal } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      id: 'frontend',
      title: 'Frontend Development',
      domain: 'CLIENT-SIDE ARCHITECTURE',
      badge: 'UI & Web',
      icon: Code2,
      description:
        'Crafting responsive, high-performance web applications with clean component architecture and fluid interactions.',
      skills: [
        'HTML5',
        'CSS3',
        'JavaScript',
        'React',
        'Vite',
        'Responsive Design'
      ],
      theme: 'cyan',
      focusTag: 'Interactive UI',
      duration: 28
    },
    {
      id: 'database',
      title: 'Database & Backend',
      domain: 'RELATIONAL SYSTEMS',
      badge: 'Data & Queries',
      icon: Database,
      description:
        'Architecting normalized relational schemas, analytical reporting, and optimized SQL query pipelines.',
      skills: [
        'SQL',
        'Relational Database Design',
        'Query Optimization',
        'Data Modeling'
      ],
      theme: 'purple',
      focusTag: 'Data Integrity',
      duration: 30
    },
    {
      id: 'cloud',
      title: 'Cloud & Platforms',
      domain: 'INFRASTRUCTURE & ORACLE',
      badge: 'Cloud Services',
      icon: Cloud,
      description:
        'Provisioning cloud compute resources, networking, and rapid enterprise web apps with Oracle APEX.',
      skills: [
        'Oracle Cloud',
        'Oracle APEX',
        'Cloud Fundamentals'
      ],
      theme: 'violet',
      focusTag: 'OCI Infrastructure',
      duration: 24
    },
    {
      id: 'tools',
      title: 'Tools & Productivity',
      domain: 'WORKFLOW & VERSIONING',
      badge: 'Dev Tools',
      icon: Terminal,
      description:
        'Accelerating software delivery with modern version control, efficient IDE workflows, and structured documentation.',
      skills: [
        'Git & GitHub',
        'VS Code',
        'MS Excel',
        'MS Word'
      ],
      theme: 'emerald',
      focusTag: 'Workflow Speed',
      duration: 24
    }
  ];

  return (
    <section id="skills" className="section-padding skills-section section-reveal">
      <div className="section-container skills-custom-container">
        {/* Section Header Badge */}
        <div className="skills-pill-header-wrap reveal-header">
          <div className="skills-pill-header">
            <span className="skills-pill-dot" aria-hidden="true"></span>
            <span className="skills-pill-label">04 / TECHNICAL EXPERTISE</span>
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="skills-hero-header reveal-header">
          <h2 className="skills-hero-title">
            Core Skills &amp; <span className="skills-text-gradient">Technologies</span>
          </h2>
          <p className="skills-hero-subtitle">
            Technologies I use to build modern applications and solve real-world problems.
          </p>
        </div>

        {/* 4 Category Cards Grid */}
        <div className="skills-cards-grid reveal-stagger">
          {skillCategories.map((cat) => {
            const IconComponent = cat.icon;
            // Repeat skills twice per group to ensure dense, continuous coverage on any display
            const groupSkills = [...cat.skills, ...cat.skills];

            return (
              <div
                key={cat.id}
                className="skills-category-card"
                tabIndex={0}
                aria-label={`${cat.title} category`}
              >
                {/* Subtle Neon Card Top Glow */}
                <div className="skills-card-glow" aria-hidden="true"></div>

                {/* Card Header */}
                <div className="skills-card-header">
                  <div className={`skills-cat-icon-box icon-${cat.theme}`}>
                    <IconComponent size={22} className="skills-cat-icon" />
                  </div>

                  <div className="skills-cat-title-block">
                    <span className="skills-cat-domain">{cat.domain}</span>
                    <h3 className="skills-cat-title">{cat.title}</h3>
                  </div>

                  <span className="skills-cat-badge">{cat.badge}</span>
                </div>

                {/* Brief Description */}
                <p className="skills-cat-desc">{cat.description}</p>

                {/* Independent Running Animation Track Inside Every Card */}
                <div
                  className="skills-marquee-container"
                  aria-label={`${cat.title} running skill chips`}
                >
                  <div
                    className="skills-marquee-track"
                    style={{ '--marquee-duration': `${cat.duration}s` }}
                  >
                    {/* Primary Set */}
                    <div className="skills-marquee-group">
                      {groupSkills.map((skill, idx) => (
                        <span key={`grp1-${idx}`} className="skill-chip">
                          <span
                            className={`skill-chip-dot dot-${cat.theme}`}
                            aria-hidden="true"
                          ></span>
                          <span className="skill-chip-text">{skill}</span>
                        </span>
                      ))}
                    </div>

                    {/* Duplicate Set for Seamless Infinite Loop */}
                    <div className="skills-marquee-group" aria-hidden="true">
                      {groupSkills.map((skill, idx) => (
                        <span key={`grp2-${idx}`} className="skill-chip">
                          <span
                            className={`skill-chip-dot dot-${cat.theme}`}
                            aria-hidden="true"
                          ></span>
                          <span className="skill-chip-text">{skill}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Info */}
                <div className="skills-card-footer">
                  <div className="skills-footer-left">
                    <span className={`status-pulse-dot dot-${cat.theme}`}></span>
                    <span className="skills-count-text">
                      {cat.skills.length} Core Technologies
                    </span>
                  </div>

                  <span className="skills-focus-badge">{cat.focusTag}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
