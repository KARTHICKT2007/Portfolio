import React, { useState } from 'react';
import {
  LayoutGrid,
  Tag,
  Atom,
  Database,
  Sparkles,
  Globe,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
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
    { id: 'frontend', label: 'React & Web', icon: Atom },
    { id: 'database', label: 'Database & SQL', icon: Database }
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
      statusBadge: { label: 'Frontend', type: 'purple' },
      cardTitle: 'Productivity & Task Manager',
      cardDesc:
        'A modern, responsive task and workflow management web application built with React and Vite.',
      cardTech: ['React', 'Vite', 'Tailwind CSS', 'LocalStorage']
    },
    'mobilehub': {
      thumb: thumbMobile,
      categoryBadge: { label: 'Database', icon: Database },
      statusBadge: { label: 'Frontend', type: 'purple' },
      cardTitle: 'MobileHub – Tech Showcase & Catalog',
      cardDesc:
        'A dynamic React application showcasing mobile technology catalogs with advanced features.',
      cardTech: ['React', 'JavaScript', 'CSS3', 'Responsive Design']
    },
    'sql-analytics': {
      thumb: thumbSql,
      categoryBadge: { label: 'Analytics', icon: TrendingUp },
      statusBadge: { label: 'Database', type: 'green' },
      cardTitle: 'Relational Database Analytics & SQL Engine',
      cardDesc:
        'A comprehensive database solution with real-world business queries and data aggregation.',
      cardTech: ['SQL', 'Query Optimization', 'Data Modeling', 'Indexing']
    }
  };

  const filteredProjects =
    filter === 'all'
      ? projectsData
      : projectsData.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container projects-custom-container">
        {/* Top Pill Header */}
        <div className="projects-pill-header-wrap">
          <div className="projects-pill-header">
            <span className="projects-pill-dot" aria-hidden="true"></span>
            <span className="projects-pill-label">03 / FEATURED WORK</span>
          </div>
        </div>

        {/* Section Heading & Subtitle */}
        <div className="projects-hero-header">
          <h2 className="projects-hero-title">
            Engineered <span className="projects-text-gradient">Projects</span>
          </h2>
          <p className="projects-hero-subtitle">
            Authentic, hands-on software architectures built with modern engineering practices and clean code standards.
          </p>
        </div>

        {/* Filter Navigation Bar */}
        <div className="projects-filter-bar">
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
        <div className="projects-neon-grid">
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

                  {/* Bottom Row: Tech Chips + Arrow Action */}
                  <div className="project-neon-bottom-row">
                    <div className="project-neon-tech-chips">
                      {meta.cardTech.map((tech, idx) => (
                        <span key={idx} className="project-tech-chip">
                          {tech}
                        </span>
                      ))}
                    </div>

                    <button
                      className="project-neon-arrow-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      aria-label={`View details of ${meta.cardTitle}`}
                      title="Inspect Architecture & Demo Details"
                    >
                      <ArrowUpRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent: CODE • ANALYZE • INNOVATE */}
        <div className="projects-bottom-accent">
          <span className="accent-line"></span>
          <span className="accent-text">CODE &nbsp;•&nbsp; ANALYZE &nbsp;•&nbsp; INNOVATE</span>
          <span className="accent-line"></span>
        </div>
      </div>
    </section>
  );
}
