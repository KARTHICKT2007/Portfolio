import React, { useState } from 'react';
import { Mail, MapPin, Copy, Check } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Contact() {
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(personalInfo.contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="contact" className="section-padding contact-section">
      <div className="section-container">
        {/* Section Header */}
        <div className="section-header-block">
          <div className="section-tag">
            <span className="section-tag-number">05</span> GET IN TOUCH
          </div>
          <h2 className="section-title">
            Get In <span className="text-gradient">Touch</span>
          </h2>
          <p className="section-subtitle">
            Interested in collaborating, hiring for full-stack/analytics roles, or discussing innovative tech ideas? Let's connect.
          </p>
        </div>

        <div className="contact-single-card-wrap">
          {/* Direct Info & Social Cards */}
          <div className="contact-info-panel">
            <div className="contact-card-header">
              <h3 className="panel-title">Let's Build Something Extraordinary</h3>
              <p className="panel-subtitle">
                I am actively seeking junior/associate Full Stack Developer and Data Analyst roles. Whether you have a project inquiry or an open position, my inbox is open!
              </p>
            </div>

            {/* Direct Details */}
            <div className="contact-details-list">
              {/* Email */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <Mail size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">Official Email</span>
                  <div className="email-copy-row">
                    <a href={`mailto:${personalInfo.contact.email}`} className="detail-value link">
                      {personalInfo.contact.email}
                    </a>
                    <button
                      onClick={copyEmailToClipboard}
                      className="copy-btn"
                      title="Copy email to clipboard"
                    >
                      {copiedEmail ? <Check size={14} className="copied-check" /> : <Copy size={14} />}
                    </button>
                  </div>
                  {copiedEmail && <span className="copied-toast">Email copied!</span>}
                </div>
              </div>

              {/* Location */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <MapPin size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">Location</span>
                  <span className="detail-value">{personalInfo.contact.location}</span>
                </div>
              </div>

              {/* GitHub */}
              <div className="contact-detail-item">
                <div className="detail-icon-box">
                  <GithubIcon size={20} className="detail-icon" />
                </div>
                <div className="detail-text-wrap">
                  <span className="detail-label">GitHub Repository</span>
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="detail-value link"
                  >
                    github.com/KARTHICKT2007
                  </a>
                </div>
              </div>
            </div>

            {/* Social Hub Links */}
            <div className="social-links-block">
              <span className="social-block-title">Connect Across Networks</span>
              <div className="social-buttons-grid">
                <a
                  href={personalInfo.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="GitHub Profile"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                </a>

                <a
                  href={personalInfo.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-btn"
                  title="LinkedIn Profile"
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                </a>

                <a
                  href={`mailto:${personalInfo.contact.email}`}
                  className="social-btn"
                  title="Send Direct Email"
                >
                  <Mail size={18} />
                  <span>Direct Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
