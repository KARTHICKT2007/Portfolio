import React, { useState } from 'react';
import { Atom, FileCode2, Code2, Palette, Database, Cloud, Check, Sparkles, Filter } from 'lucide-react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    { id: 'all', label: 'All Technologies' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'database', label: 'Database & SQL' },
    { id: 'cloud', label: 'Cloud & Infrastructure' }
  ];

  const filteredSkills = activeCategory === 'all'
    ? skillsData
    : skillsData.filter((skill) => skill.category === activeCategory);

  const getSkillIcon = (iconName) => {
    switch (iconName) {
      case 'Atom': return <Atom size={22} className="skill-svg-icon react-icon" />;
      case 'FileCode2': return <FileCode2 size={22} className="skill-svg-icon js-icon" />;
      case 'Code2': return <Code2 size={22} className="skill-svg-icon html-icon" />;
      case 'Palette': return <Palette size={22} className="skill-svg-icon css-icon" />;
      case 'Database': return <Database size={22} className="skill-svg-icon sql-icon" />;
      case 'Cloud': return <Cloud size={22} className="skill-svg-icon oci-icon" />;
      default: return <Code2 size={22} className="skill-svg-icon" />;
    }
  };

  return (
    <section id="skills" className="section-padding skills-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-number">02</span> TECHNICAL PROFICIENCY
          </div>
          <h2 className="section-title">
            Core <span className="text-gradient">Skills</span> & Technologies
          </h2>
          <p className="section-subtitle">
            Demonstrated competencies across modern frontend systems, relational databases, and enterprise cloud solutions.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="skills-filter-container">
          <div className="skills-filter-list">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="skills-grid">
          {filteredSkills.map((skill) => {
            const isSelected = selectedSkill === skill.name;
            return (
              <div
                key={skill.name}
                className={`skill-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setSelectedSkill(isSelected ? null : skill.name)}
                onMouseEnter={() => setSelectedSkill(skill.name)}
              >
                {/* Glow Border Effect */}
                <div className="skill-card-glow"></div>

                <div className="skill-card-inner">
                  {/* Top Bar */}
                  <div className="skill-top-bar">
                    <div className="skill-icon-box">
                      {getSkillIcon(skill.icon)}
                    </div>
                    <span className="skill-badge-pill">{skill.badge}</span>
                  </div>

                  {/* Skill Name & Description */}
                  <h3 className="skill-name">{skill.name}</h3>
                  <p className="skill-desc">{skill.description}</p>

                  {/* Proficiency Meter */}
                  <div className="skill-meter-wrap">
                    <div className="skill-meter-header">
                      <span className="meter-label">Proficiency Level</span>
                      <span className="meter-value">{skill.level}%</span>
                    </div>
                    <div className="skill-progress-bar">
                      <div
                        className="skill-progress-fill"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="skill-highlights">
                    <span className="highlights-title">Key Competencies:</span>
                    <div className="highlights-tags">
                      {skill.highlights.map((item, idx) => (
                        <span key={idx} className="highlight-tag">
                          <Check size={11} className="tag-check" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
