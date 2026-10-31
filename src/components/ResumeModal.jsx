import React from 'react';
import { X, Download, Printer, Mail, MapPin, ExternalLink, Award, BookOpen, Code2 } from 'lucide-react';
import { personalInfo, skillsData, projectsData, certificationsData } from '../data/portfolioData';

export default function ResumeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // Generate text/markdown or trigger print to save as PDF
    const resumeText = `
KARTHICK
${personalInfo.tagline}
Email: ${personalInfo.contact.email} | GitHub: ${personalInfo.contact.github} | Location: ${personalInfo.contact.location}

============================================================
EDUCATION
============================================================
${personalInfo.education.degree}
${personalInfo.education.institution} (${personalInfo.education.period})
Key Focus: ${personalInfo.education.focus}

============================================================
TECHNICAL SKILLS
============================================================
${skillsData.map(s => `- ${s.name} (${s.badge}): ${s.description}`).join('\n')}

============================================================
FEATURED PROJECTS
============================================================
${projectsData.map(p => `* ${p.title} (${p.subtitle})
  Tech: ${p.tech.join(', ')}
  Description: ${p.description}`).join('\n\n')}

============================================================
CERTIFICATIONS & HONORS
============================================================
${certificationsData.map(c => `* ${c.title} - ${c.issuer}`).join('\n')}
    `;

    const blob = new Blob([resumeText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Karthick_FullStack_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="resume-modal-bar">
          <div className="modal-bar-title">
            <span className="dot dot-red"></span>
            <span className="dot dot-yellow"></span>
            <span className="dot dot-green"></span>
            <span className="modal-title-text">Karthick_Resume.pdf (Preview)</span>
          </div>
          <div className="modal-bar-actions">
            <button onClick={handlePrint} className="modal-action-btn" title="Print / Save as PDF">
              <Printer size={16} />
              <span>Print / PDF</span>
            </button>
            <button onClick={handleDownload} className="modal-action-btn primary" title="Download Resume">
              <Download size={16} />
              <span>Download Text</span>
            </button>
            <button onClick={onClose} className="modal-close-btn" aria-label="Close modal">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Resume Printable Paper Body */}
        <div className="resume-paper" id="printable-resume">
          {/* Header */}
          <div className="resume-header">
            <div>
              <h1 className="resume-name">{personalInfo.name}</h1>
              <p className="resume-role">{personalInfo.tagline}</p>
            </div>
            <div className="resume-meta">
              <div><Mail size={13} /> {personalInfo.contact.email}</div>
              <div><MapPin size={13} /> {personalInfo.contact.location}</div>
              <div><Code2 size={13} /> github.com/KARTHICKT2007</div>
            </div>
          </div>

          <div className="resume-divider"></div>

          {/* Professional Summary */}
          <section className="resume-section">
            <h2 className="resume-section-heading">Professional Summary</h2>
            <p className="resume-text">{personalInfo.bio}</p>
          </section>

          {/* Education */}
          <section className="resume-section">
            <h2 className="resume-section-heading">Education</h2>
            <div className="resume-item">
              <div className="resume-item-top">
                <span className="resume-item-title">{personalInfo.education.degree}</span>
                <span className="resume-item-date">{personalInfo.education.period}</span>
              </div>
              <div className="resume-item-sub">{personalInfo.education.institution} • {personalInfo.education.location}</div>
              <p className="resume-item-desc">{personalInfo.education.focus}</p>
            </div>
          </section>

          {/* Core Technical Skills */}
          <section className="resume-section">
            <h2 className="resume-section-heading">Technical Skills</h2>
            <div className="resume-skills-grid">
              <div>
                <strong>Frontend:</strong> React, JavaScript (ES6+), HTML5, CSS3, Modern UI/UX
              </div>
              <div>
                <strong>Database & Analytics:</strong> SQL, Relational Schema Design, Normalization, Query Optimization
              </div>
              <div>
                <strong>Cloud & Systems:</strong> Oracle Cloud Infrastructure (OCI), Win32 API, Git, Vite Ecosystem
              </div>
            </div>
          </section>

          {/* Featured Projects */}
          <section className="resume-section">
            <h2 className="resume-section-heading">Key Projects</h2>
            {projectsData.map((proj) => (
              <div key={proj.id} className="resume-item mb-2">
                <div className="resume-item-top">
                  <span className="resume-item-title">{proj.title}</span>
                  <span className="resume-item-badge">{proj.tech.slice(0, 3).join(', ')}</span>
                </div>
                <p className="resume-item-desc">{proj.description}</p>
              </div>
            ))}
          </section>

          {/* Certifications */}
          <section className="resume-section">
            <h2 className="resume-section-heading">Certifications & Honors</h2>
            <ul className="resume-cert-list">
              {certificationsData.map((cert) => (
                <li key={cert.id}>
                  <strong>{cert.title}</strong> — <span>{cert.issuer}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
}
