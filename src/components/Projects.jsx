import React, { useState } from 'react';
import {
  LayoutGrid,
  Tag,
  Atom,
  Database,
  Sparkles,
  Globe,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  CloudSun,
  Calculator
} from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/portfolioData';

// Thumbnails cropped directly from reference mockup
import thumbVoice from '../assets/project_thumb_1.png';
import thumbKymorix from '../assets/project_thumb_2.png';
import thumbMobile from '../assets/project_thumb_3.png';
import thumbSql from '../assets/project_thumb_4.png';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects', icon: LayoutGrid },
    { id: 'ai', label: 'AI & Systems', icon: Tag },
    { id: 'frontend', label: 'React & Web', icon: Atom }
  ];

  // Specific visual metadata matching user's design reference
  const projectMetaMap = {
    'voice-assistant': {
      thumb: thumbVoice,
      categoryBadge: { label: 'AI', icon: Sparkles },
      statusBadge: { label: 'Featured', type: 'green' },
      cardTitle: 'AI Based Voice-Controlled Desktop Assistant',
      cardDesc:
        'A high-performance, real-time desktop automation system designed for complete hands-free control.',
      cardTech: ['Python', 'Tkinter', 'Speech AI', 'OpenCV']
    },
    'kymorix': {
      thumb: thumbKymorix,
      categoryBadge: { label: 'Web', icon: Globe },
      statusBadge: { label: 'Featured', type: 'green' },
      cardTitle: 'Kymorix — Productivity & Task Manager',
      cardDesc:
        'A modern, responsive task and workflow management web application built with React and Vite.',
      cardTech: ['React', 'Vite', 'JavaScript', 'LocalStorage']
    },
    'weather-forecast': {
      thumb: thumbMobile,
      categoryBadge: { label: 'Web', icon: CloudSun },
      statusBadge: { label: 'Live App', type: 'purple' },
      cardTitle: 'Weather-Forecast',
      cardDesc:
        'Real-time weather forecast application with dynamic city search, atmospheric conditions, and 7-day outlook.',
      cardTech: ['JavaScript', 'HTML5', 'CSS3', 'Weather API']
    },
    'scientific-calculator': {
      thumb: thumbSql,
      categoryBadge: { label: 'Web', icon: Calculator },
      statusBadge: { label: 'Live App', type: 'purple' },
      cardTitle: 'Scientific-Calculator',
      cardDesc:
        'Interactive glassmorphic scientific calculator with comprehensive arithmetic computations and keyboard support.',
      cardTech: ['JavaScript', 'HTML5', 'CSS3', 'Math Engine']
    }
  };

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding projects-section section-reveal">
      <div className="section-container projects-custom-container">
        {/* Top Pill Header */}
        <div className="projects-pill-header-wrap reveal-header">
          <div className="projects-pill-header">
            <span className="projects-pill-dot" aria-hidden="true"></span>
            <span className="projects-pill-label"> FEATURED WORK</span>
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="projects-hero-header reveal-header">
          <h2 className="projects-hero-title">
            Engineered <span className="projects-text-gradient">Projects</span>
          </h2>
          <p className="projects-hero-subtitle">
            Authentic, hands-on software architectures built with modern engineering practices and clean code standards.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="projects-filter-bar reveal-header">
          {filterTabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = filter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`projects-filter-pill ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <TabIcon size={15} className="filter-pill-icon" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 2x2 Glowing Neon Cards Grid */}
        <div className="projects-neon-grid reveal-stagger">
          {filteredProjects.map((project) => {
            const meta = projectMetaMap[project.id] || {
              thumb: thumbVoice,
              categoryBadge: { label: project.category.toUpperCase(), icon: Sparkles },
              statusBadge: {
                label: project.featured ? 'Featured' : 'Active',
                type: 'purple'
              },
              cardTitle: project.title,
              cardDesc: project.description,
              cardTech: project.tech ? project.tech.slice(0, 4) : []
            };
            const CatIcon = meta.categoryBadge.icon;

            return (
              <div
                key={project.id}
                className="project-neon-card"
                onClick={() => onSelectProject(project)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectProject(project);
                  }
                }}
              >
                {/* Left Thumbnail Box */}
                <div className="project-neon-thumb-box">
                  <img
                    src={meta.thumb}
                    alt={meta.cardTitle}
                    className="project-neon-thumb-img"
                    loading="lazy"
                  />
                </div>

                {/* Right Content */}
                <div className="project-neon-info">
                  {/* Category & Status Tags */}
                  <div className="project-neon-tags-row">
                    <span className="project-neon-cat-tag">
                      <CatIcon size={12} className="cat-tag-icon" />
                      <span>{meta.categoryBadge.label}</span>
                    </span>

                    <span
                      className={`project-neon-status-tag status-${meta.statusBadge.type}`}
                    >
                      <span className="status-dot" aria-hidden="true"></span>
                      <span>{meta.statusBadge.label}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="project-neon-title">{meta.cardTitle}</h3>

                  {/* Concise Description */}
                  <p className="project-neon-desc">{meta.cardDesc}</p>

                  {/* Technology Chips Marquee */}
                  <div
                    className="project-tech-marquee-container"
                    aria-label="Technologies used"
                  >
                    <div
                      className="project-tech-marquee-track"
                      style={{
                        '--proj-marquee-duration': `${Math.max(16, meta.cardTech.length * 4.5)}s`
                      }}
                    >
                      {/* Primary Set */}
                      <div className="project-tech-marquee-group">
                        {[...meta.cardTech, ...meta.cardTech].map((tech, idx) => (
                          <span key={`pt1-${idx}`} className="project-tech-chip">
                            <span
                              className="project-chip-dot"
                              aria-hidden="true"
                            ></span>
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Duplicate Set for Seamless Infinite Loop */}
                      <div
                        className="project-tech-marquee-group"
                        aria-hidden="true"
                      >
                        {[...meta.cardTech, ...meta.cardTech].map((tech, idx) => (
                          <span key={`pt2-${idx}`} className="project-tech-chip">
                            <span
                              className="project-chip-dot"
                              aria-hidden="true"
                            ></span>
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Separate GitHub & Live Demo Action Buttons Row */}
                  <div className="project-neon-actions-row">
                    <div className="project-card-btn-group">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-card-btn project-btn-github"
                        onClick={(e) => e.stopPropagation()}
                        aria-label={`View ${meta.cardTitle} GitHub repository`}
                        title="Source Code on GitHub"
                      >
                        <GithubIcon size={13} />
                        <span>GitHub</span>
                      </a>

                      {project.demo && project.demo !== '#' ? (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-card-btn project-btn-demo"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`Open live website of ${meta.cardTitle}`}
                          title="Open Live Website"
                        >
                          <ExternalLink size={13} />
                          <span>Live Demo</span>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="project-card-btn project-btn-demo"
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectProject(project);
                          }}
                          aria-label={`Inspect ${meta.cardTitle} live details`}
                          title="Inspect Architecture"
                        >
                          <ExternalLink size={13} />
                          <span>Live Demo</span>
                        </button>
                      )}
                    </div>

                    <button
                      type="button"
                      className="project-neon-arrow-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      aria-label={`Inspect architecture details of ${meta.cardTitle}`}
                      title="Inspect Architecture"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent: CODE • ANALYZE • INNOVATE */}
        <div className="projects-bottom-accent reveal-subtle">
          <span className="accent-line"></span>
          <span className="accent-text">CODE &nbsp;•&nbsp; ANALYZE &nbsp;•&nbsp; INNOVATE</span>
          <span className="accent-line"></span>
        </div>
      </div>
    </section>
  );
}
