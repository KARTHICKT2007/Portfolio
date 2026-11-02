import React, { useEffect } from 'react';
import { X, ExternalLink, CheckCircle2, Cpu, Layers, Smartphone, Database, CloudSun, Calculator } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { useUI } from '../context/UIContext';
import { playSound } from '../utils/soundEffects';

export default function ProjectModal({ project, onClose }) {
  const { confirmExternal } = useUI();

  useEffect(() => {
    if (project) {
      playSound('modalOpen');
    }
  }, [project]);

  if (!project) return null;

  const handleClose = () => {
    playSound('modalClose');
    onClose();
  };

  const getIcon = (iconName) => {
    const iconSize = 18;
    switch (iconName) {
      case 'Cpu': return <Cpu size={iconSize} className="modal-icon-glow" />;
      case 'Layers': return <Layers size={iconSize} className="modal-icon-glow" />;
      case 'Smartphone': return <Smartphone size={iconSize} className="modal-icon-glow" />;
      case 'Database': return <Database size={iconSize} className="modal-icon-glow" />;
      case 'CloudSun': return <CloudSun size={iconSize} className="modal-icon-glow" />;
      case 'Calculator': return <Calculator size={iconSize} className="modal-icon-glow" />;
      default: return <Cpu size={iconSize} className="modal-icon-glow" />;
    }
  };

  const handleGithubClick = (e) => {
    e.preventDefault();
    if (project.github && project.github !== '#') {
      confirmExternal(project.github, `Visit GitHub: ${project.title}`);
    }
  };

  const handleDemoClick = (e) => {
    e.preventDefault();
    if (project.demo && project.demo !== '#') {
      confirmExternal(project.demo, `Launch Demo: ${project.title}`);
    } else {
      confirmExternal(project.github, `Repository Source: ${project.title}`);
    }
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="project-modal-header">
          <div className="modal-header-left">
            <div className="modal-avatar-badge">
              {getIcon(project.icon)}
            </div>
            <div>
              <span className="project-category-badge">{project.category ? project.category.toUpperCase() : 'PROJECT'}</span>
              <h2 className="project-modal-title">{project.title}</h2>
              <p className="project-modal-subtitle">{project.subtitle}</p>
            </div>
          </div>
          <button onClick={handleClose} className="modal-close-btn" aria-label="Close modal">
            <X size={15} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="project-modal-body">
          {/* Key Metrics / Highlights */}
          {project.metrics && project.metrics.length > 0 && (
            <div className="project-metrics-grid">
              {project.metrics.map((metric, idx) => (
                <div key={idx} className="metric-pill">
                  <CheckCircle2 size={12} className="metric-check" />
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
              {project.tech && project.tech.map((t, idx) => (
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
            onClick={handleGithubClick}
            className="action-link secondary"
          >
            <GithubIcon size={14} />
            <span>View Source on GitHub</span>
          </a>
          <button
            onClick={handleDemoClick}
            className="action-link primary"
          >
            <ExternalLink size={14} />
            <span>Interactive Demo</span>
          </button>
        </div>
      </div>
    </div>
  );
}
