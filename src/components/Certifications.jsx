import React, { useState } from 'react';
import {
  Award,
  Cloud,
  Code2,
  Database,
  Sparkles,
  Briefcase,
  Globe,
  Layers,
  ShieldCheck,
  Trophy,
  BarChart3,
  FileCode2,
  Cpu,
  GitBranch,
  Atom,
  CheckCircle2,
  Tag
} from 'lucide-react';
import { certificationsData, certificationCategories } from '../data/portfolioData';

export default function Certifications() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredCerts = activeCategory === 'all'
    ? certificationsData
    : certificationsData.filter((c) => c.category === activeCategory);

  const getCertIcon = (iconName) => {
    switch (iconName) {
      case 'Cloud': return <Cloud size={20} className="cert-card-icon oci" />;
      case 'Database': return <Database size={20} className="cert-card-icon sql" />;
      case 'BarChart3': return <BarChart3 size={20} className="cert-card-icon apex" />;
      case 'Code2': return <Code2 size={20} className="cert-card-icon code" />;
      case 'Atom': return <Atom size={20} className="cert-card-icon react" />;
      case 'FileCode2': return <FileCode2 size={20} className="cert-card-icon js" />;
      case 'Cpu': return <Cpu size={20} className="cert-card-icon logic" />;
      case 'GitBranch': return <GitBranch size={20} className="cert-card-icon git" />;
      case 'Sparkles': return <Sparkles size={20} className="cert-card-icon ai" />;
      case 'Briefcase': return <Briefcase size={20} className="cert-card-icon intern" />;
      case 'Globe': return <Globe size={20} className="cert-card-icon lang" />;
      case 'Layers': return <Layers size={20} className="cert-card-icon app" />;
      case 'ShieldCheck': return <ShieldCheck size={20} className="cert-card-icon sec" />;
      case 'Trophy': return <Trophy size={20} className="cert-card-icon trophy" />;
      default: return <Award size={20} className="cert-card-icon" />;
    }
  };

  const getBadgeClass = (type) => {
    switch (type) {
      case 'Formal Certification': return 'type-cert';
      case 'Course & Applied Project': return 'type-project';
      case 'Course Completion': return 'type-course';
      case 'Internship': return 'type-intern';
      case 'Event Participation': return 'type-event';
      case 'Government Credential': return 'type-gov';
      default: return 'type-competency';
    }
  };

  return (
    <section id="certifications" className="section-padding certifications-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-number">04</span> CREDENTIALS & ACCOMPLISHMENTS
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Formal certifications, specialized course completions, technical proficiencies, and recognized event participations.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="cert-filters-wrap" role="tablist" aria-label="Certification categories">
          {certificationCategories.map((cat) => {
            const count = cat.id === 'all'
              ? certificationsData.length
              : certificationsData.filter((c) => c.category === cat.id).length;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`cert-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
                <span className="cert-filter-count">{count}</span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grid */}
        <div className="certifications-grid">
          {filteredCerts.map((cert) => (
            <div key={cert.id} className="cert-card">
              <div className="cert-card-border-glow"></div>

              <div className="cert-card-body">
                {/* Header row: Icon & Credential Type Badge */}
                <div className="cert-card-top">
                  <div className="cert-icon-wrapper">
                    {getCertIcon(cert.icon)}
                  </div>
                  <span className={`cert-type-pill ${getBadgeClass(cert.type)}`}>
                    {cert.type}
                  </span>
                </div>

                {/* Title & Issuer */}
                <div className="cert-info-block">
                  <h3 className="cert-title">{cert.title}</h3>
                  {cert.issuer && (
                    <div className="cert-issuer-row">
                      <span className="cert-issuer-label">Issuer / Context:</span>
                      <span className="cert-issuer">{cert.issuer}</span>
                    </div>
                  )}
                </div>

                {/* Skills Verified Tags */}
                {cert.skills && cert.skills.length > 0 && (
                  <div className="cert-skills-wrap">
                    <div className="cert-tags">
                      {cert.skills.map((skill, index) => (
                        <span key={index} className="cert-skill-chip">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
