import React from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Layers, Smartphone, Database, ArrowRight, CloudSun, Calculator } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cpu': return <Cpu size={28} className="modal-icon-glow" />;
      case 'Layers': return <Layers size={28} className="modal-icon-glow" />;
      case 'Smartphone': return <Smartphone size={28} className="modal-icon-glow" />;
      case 'Database': return <Database size={28} className="modal-icon-glow" />;
      case 'CloudSun': return <CloudSun size={28} className="modal-icon-glow" />;
      case 'Calculator': return <Calculator size={28} className="modal-icon-glow" />;
      default: return <Cpu size={28} className="modal-icon-glow" />;
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="project-modal-header">
          <div className="modal-header-left">
            <div className="modal-avatar-badge">
              {getIcon(project.icon)}
            </div>
            <div>
              <span className="project-category-badge">{project.category.toUpperCase()}</span>
              <h2 className="project-modal-title">{project.title}</h2>
              <p className="project-modal-subtitle">{project.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="project-metrics-grid">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="metric-pill">
                  <CheckCircle2 size={15} className="metric-check" />
                  <span>{metric}</span>
                </div>
              ))}
            </div>
          )}

          {/* Detailed Architecture / Overview */}
          <div className="modal-description-box">
            <h3 className="box-title">System Overview & Architecture</h3>
            <p className="box-text">{project.longDescription || project.description}</p>
          </div>

          {/* Tech Stack */}
          <div className="modal-tech-box">
            <h3 className="box-title">Technologies & Tools</h3>
            <div className="tech-tags-wrap">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-chip">
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="project-modal-footer">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="action-link secondary"
          >
            <GithubIcon size={17} />
            <span>View Source on GitHub</span>
          </a>
          <button
            onClick={() => {
              if (project.demo && project.demo !== '#') {
                window.open(project.demo, '_blank');
              } else {
                alert(`Interactive live preview is connected to repository: ${project.github}`);
              }
            }}
            className="action-link primary"
          >
            <ExternalLink size={17} />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
