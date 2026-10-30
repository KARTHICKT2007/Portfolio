import React, { useState } from 'react';
import { Award, Cloud, Code2, GraduationCap, Database, CheckCircle2, ExternalLink, ShieldCheck } from 'lucide-react';
import { certificationsData } from '../data/portfolioData';

export default function Certifications() {
  const [selectedCert, setSelectedCert] = useState(null);

  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'Cloud': return <Cloud size={26} className="cert-card-icon oci" />;
      case 'Code2': return <Code2 size={26} className="cert-card-icon react" />;
      case 'GraduationCap': return <GraduationCap size={26} className="cert-card-icon edu" />;
      case 'Database': return <Database size={26} className="cert-card-icon sql" />;
      default: return <Award size={26} className="cert-card-icon" />;
    }
  };

  return (
    <section id="certifications" className="section-padding certifications-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="tag-bracket">//</span> 04. CREDENTIALS & ACCOMPLISHMENTS
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="section-subtitle">
            Formal certifications, academic honors, and verified technical proficiencies.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {certificationsData.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-card-border-glow"></div>

              <div className="cert-card-body">
                {/* Header row */}
                <div className="cert-card-top">
                  <div className="cert-icon-wrapper">
                    {getCertIcon(cert.icon)}
                  </div>
                  <div className="cert-badge">
                    <ShieldCheck size={14} className="verified-check" />
                    <span>Verified</span>
                  </div>
                </div>

                {/* Title & Issuer */}
                <div className="cert-info-block">
                  <span className="cert-issuer">{cert.issuer}</span>
                  <h3 className="cert-title">{cert.title}</h3>
                  <span className="cert-date">{cert.date}</span>
                </div>

                {/* Description */}
                <p className="cert-desc">{cert.description}</p>

                {/* Skills Verified Tags */}
                <div className="cert-skills-wrap">
                  <span className="cert-skills-label">Skills Covered:</span>
                  <div className="cert-tags">
                    {cert.skills.map((skill, index) => (
                      <span key={index} className="cert-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="cert-card-footer">
                  <a
                    href={cert.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-verify-link"
                  >
                    <span>View Institution / Credential</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
