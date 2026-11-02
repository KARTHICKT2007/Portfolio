import React, { useState } from 'react';
import { X, Download, Printer, ExternalLink, FileText, FileCode, Mail, Phone, MapPin, Code2 } from 'lucide-react';
import { personalInfo, projectsData, certificationsData } from '../data/portfolioData';
import { useUI } from '../context/UIContext';

export default function ResumeModal({ isOpen, onClose }) {
  const { showToast, playSound, confirmExternal } = useUI();
  const [viewMode, setViewMode] = useState('pdf'); // 'pdf' | 'formatted'

  if (!isOpen) return null;

  const handlePrint = () => {
    playSound('click');
    showToast({ type: 'info', message: 'Opening printable PDF document...', duration: 2500 });
    window.open(personalInfo.resume.pdfUrl, '_blank');
  };

  const handleDownload = () => {
    playSound('success');
    showToast({ type: 'success', message: 'Downloading official PDF resume...', duration: 3500 });
  };

  const handleDriveClick = (e) => {
    e.preventDefault();
    confirmExternal(personalInfo.resume.driveUrl, "Open Original Resume in Google Drive");
  };

  const handleClose = () => {
    playSound('modalClose');
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleClose}>
      <div className="resume-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Top Bar */}
        <div className="resume-modal-bar">
          <div className="resume-bar-top-row">
            <div className="modal-bar-title">
              <span className="dot dot-red"></span>
              <span className="dot dot-yellow"></span>
              <span className="dot dot-green"></span>
              <span className="modal-title-text">{personalInfo.resume.fileName}</span>
            </div>

            {/* View Mode Toggle */}
            <div className="resume-view-toggle">
              <button
                onClick={() => { setViewMode('pdf'); playSound('click'); }}
                className={`resume-toggle-btn ${viewMode === 'pdf' ? 'active' : ''}`}
                title="View Official PDF Document"
              >
                <FileText size={13} />
                <span>PDF Preview</span>
              </button>
              <button
                onClick={() => { setViewMode('formatted'); playSound('click'); }}
                className={`resume-toggle-btn ${viewMode === 'formatted' ? 'active' : ''}`}
                title="View Responsive Web Resume"
              >
                <FileCode size={13} />
                <span>Web View</span>
              </button>
            </div>

            <button onClick={handleClose} className="modal-close-btn" aria-label="Close modal">
              <X size={18} />
            </button>
          </div>

          <div className="resume-bar-actions-row">
            {/* Direct Google Drive Link */}
            <a
              href={personalInfo.resume.driveUrl}
              onClick={handleDriveClick}
              className="modal-action-btn"
              title="Open Original Document in Google Drive"
            >
              <ExternalLink size={13} />
              <span>Google Drive</span>
            </a>

            {/* Direct Download PDF */}
            <a
              href={personalInfo.resume.pdfUrl}
              download={personalInfo.resume.fileName}
              onClick={handleDownload}
              className="modal-action-btn primary"
              title="Download Official PDF Resume"
            >
              <Download size={13} />
              <span>Download PDF</span>
            </a>

            <button onClick={handlePrint} className="modal-action-btn print-btn" title="Open Fullscreen / Print">
              <Printer size={13} />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Modal Body: PDF Viewer or Formatted Web View */}
        {viewMode === 'pdf' ? (
          <div className="resume-pdf-container">
            <div className="resume-mobile-hint-bar">
              <span>Tip: For optimal reading on mobile, tap <strong>Web View</strong> above or <strong>Google Drive</strong> to pan & zoom.</span>
            </div>
            <div className="resume-iframe-wrapper">
              <iframe
                src={`${personalInfo.resume.pdfUrl}#view=FitH`}
                className="resume-pdf-frame"
                title="Karthick Official Resume Document"
              />
            </div>
            {/* Footer with quick action controls */}
            <div className="resume-pdf-mobile-bar">
              <span className="resume-pdf-host-text">Original document hosted on Google Drive</span>
              <div className="resume-pdf-mobile-actions">
                <button
                  onClick={() => { setViewMode('formatted'); playSound('click'); }}
                  className="resume-inline-mode-btn"
                  title="Switch to readable web view"
                >
                  <FileCode size={12} />
                  <span>Web View</span>
                </button>
                <a
                  href={personalInfo.resume.driveUrl}
                  onClick={handleDriveClick}
                  className="resume-inline-drive-btn"
                >
                  <ExternalLink size={12} />
                  <span>Open in Drive</span>
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* Resume Printable Paper Body */
          <div className="resume-paper" id="printable-resume">
            {/* Header */}
            <div className="resume-header">
              <div>
                <h1 className="resume-name">{personalInfo.name}</h1>
                <p className="resume-role">{personalInfo.tagline}</p>
              </div>
              <div className="resume-meta">
                <div><Mail size={13} /> {personalInfo.contact.email}</div>
                <div><Phone size={13} /> {personalInfo.contact.phoneDisplay || personalInfo.contact.phone}</div>
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
                <div className="resume-item-sub">{personalInfo.education.college}</div>
                <div className="resume-item-sub text-muted">Affiliated with {personalInfo.education.institution} • {personalInfo.education.location}</div>
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
        )}
      </div>
    </div>
  );
}
