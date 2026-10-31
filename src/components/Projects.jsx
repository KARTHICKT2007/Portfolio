import React, { useState } from 'react';
import { ExternalLink, Cpu, Layers, Smartphone, Database, ArrowUpRight, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectsData } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [filter, setFilter] = useState('all');

  const filterTabs = [
    { id: 'all', label: 'All Projects' },
    { id: 'ai', label: 'AI & Systems' },
    { id: 'frontend', label: 'React & Web' },
    { id: 'database', label: 'Database & SQL' }
  ];

  const filteredProjects = filter === 'all'
    ? projectsData
    : projectsData.filter((p) => p.category === filter);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu size={20} className="proj-card-icon" />;
      case 'Layers': return <Layers size={20} className="proj-card-icon" />;
      case 'Smartphone': return <Smartphone size={20} className="proj-card-icon" />;
      case 'Database': return <Database size={20} className="proj-card-icon" />;
      default: return <Cpu size={20} className="proj-card-icon" />;
    }
  };

  return (
    <section id="projects" className="section-padding projects-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-number">03</span> FEATURED WORK
          </div>
          <h2 className="section-title">
            Engineered <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-subtitle">
            Authentic, hands-on software architectures built with modern engineering practices and clean code standards.
          </p>
        </div>

        {/* Filter Navigation */}
        <div className="projects-filter-nav">
          <div className="filter-pill-container">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`filter-tab-btn ${filter === tab.id ? 'active' : ''}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              <div className="project-card-glow"></div>

              <div className="project-card-content">
                {/* Header row */}
                <div className="project-card-header">
                  <div className="project-icon-box">
                    {getIcon(project.icon)}
                  </div>
                  <div className="project-badges-row">
                    {project.featured && (
                      <span className="badge-featured">
                        <Sparkles size={11} /> Featured
                      </span>
                    )}
                    <span className="badge-tech-cat">{project.category.toUpperCase()}</span>
                  </div>
                </div>

                {/* Subtitle & Title */}
                <div className="project-card-title-block">
                  <span className="project-card-sub">{project.subtitle}</span>
                  <h3
                    className="project-card-title clickable"
                    onClick={() => onSelectProject(project)}
                  >
                    {project.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="project-card-desc">{project.description}</p>

                {/* Key Metrics / Highlights */}
                {project.metrics && (
                  <div className="project-card-metrics">
                    {project.metrics.map((metric, i) => (
                      <span key={i} className="metric-tag">
                        {metric}
                      </span>
                    ))}
                  </div>
                )}

                {/* Tech Chips */}
                <div className="project-card-tech">
                  {project.tech.map((t, idx) => (
                    <span key={idx} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>

                {/* Card Action Buttons: Functional GitHub & Live Demo */}
                <div className="project-card-footer">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="card-action-btn secondary"
                    title="View Source on GitHub"
                  >
                    <GithubIcon size={16} />
                    <span>Code</span>
                  </a>

                  <button
                    onClick={() => onSelectProject(project)}
                    className="card-action-btn primary"
                    title="Inspect Architecture & Demo Details"
                  >
                    <span>Details & Demo</span>
                    <ArrowUpRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
