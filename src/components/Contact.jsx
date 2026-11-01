import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Copy, 
  Check, 
  Code2, 
  Monitor, 
  TrendingUp, 
  Handshake, 
  ArrowUpRight 
} from 'lucide-react';
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
      {/* Background Watermark Typography */}
      <div className="contact-watermark-wrap" aria-hidden="true">
        <span className="contact-watermark-text">KARTHICK</span>
      </div>

      <div className="section-container contact-custom-container">
        {/* Top Header Pill */}
        <div className="contact-pill-header-wrap">
          <div className="contact-pill-header">
            <span className="contact-pill-dot" aria-hidden="true"></span>
            <span className="contact-pill-label">05 / GET IN TOUCH</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="contact-hero-header">
          <h2 className="contact-hero-title">
            LET'S <span className="contact-text-gradient">TALK</span>
          </h2>
          <p className="contact-hero-subtitle">
            Have an idea, opportunity, or project in mind? I’d love to hear about it.
          </p>
        </div>

        {/* 2-Column Cards Grid */}
        <div className="contact-two-col-grid">
          {/* ================================================================
              LEFT CARD: A GOOD PROJECT STARTS WITH A CONVERSATION
              ================================================================ */}
          <div className="contact-neon-card contact-left-card">
            <div className="contact-card-heading-wrap">
              <h3 className="contact-card-main-title">
                A GOOD PROJECT STARTS<br />
                WITH A <span className="text-electric-glow">CONVERSATION.</span>
              </h3>
              <p className="contact-card-lead-desc">
                I'm open to junior developer roles, collaborative projects, and ideas that solve real problems.
              </p>
            </div>

            {/* Contact Details List */}
            <div className="contact-items-stack">
              {/* 1. Email */}
              <div className="contact-detail-row">
                <div className="contact-icon-square">
                  <Mail size={18} />
                </div>
                <div className="contact-info-col">
                  <span className="contact-label-micro">EMAIL</span>
                  <div className="contact-value-copy-group">
                    <a href={`mailto:${personalInfo.contact.email}`} className="contact-val-text link">
                      {personalInfo.contact.email}
                    </a>
                    <button
                      onClick={copyEmailToClipboard}
                      className="contact-copy-inline-btn"
                      title="Copy email to clipboard"
                      aria-label="Copy email"
                    >
                      {copiedEmail ? <Check size={13} className="copied-check" /> : <Copy size={13} />}
                    </button>
                    {copiedEmail && <span className="contact-inline-toast">Copied!</span>}
                  </div>
                </div>
              </div>

              {/* 2. Location */}
              <div className="contact-detail-row">
                <div className="contact-icon-square">
                  <MapPin size={18} />
                </div>
                <div className="contact-info-col">
                  <span className="contact-label-micro">LOCATION</span>
                  <span className="contact-val-text">{personalInfo.contact.location}</span>
                </div>
              </div>

              {/* 3. GitHub */}
              <div className="contact-detail-row">
                <div className="contact-icon-square">
                  <GithubIcon size={18} />
                </div>
                <div className="contact-info-col">
                  <span className="contact-label-micro">GITHUB</span>
                  <a
                    href={personalInfo.contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-val-text link"
                  >
                    github.com/KARTHICKT2007
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Social Pills */}
            <div className="contact-social-pills-row">
              <a
                href={personalInfo.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
                title="GitHub Profile"
              >
                <GithubIcon size={15} />
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-social-pill"
                title="LinkedIn Profile"
              >
                <LinkedinIcon size={15} />
                <span>LinkedIn</span>
              </a>

              <a
                href={`mailto:${personalInfo.contact.email}`}
                className="contact-social-pill"
                title="Direct Email"
              >
                <Mail size={15} />
                <span>Direct Mail</span>
              </a>
            </div>
          </div>

          {/* ================================================================
              RIGHT CARD: CURRENTLY OPEN TO & SIGNATURE CALLOUT
              ================================================================ */}
          <div className="contact-neon-card contact-right-card">
            {/* Ambient Corner Light Arc */}
            <div className="contact-card-light-arc" aria-hidden="true"></div>

            {/* Top Status Header */}
            <div className="contact-open-header">
              <span className="open-status-dot" aria-hidden="true"></span>
              <span className="open-status-text">CURRENTLY OPEN TO</span>
              <div className="open-status-line" aria-hidden="true"></div>
            </div>

            {/* 4 Opportunity Pills */}
            <div className="contact-open-pills-stack">
              <div className="contact-open-pill">
                <div className="open-pill-icon-wrap">
                  <Code2 size={16} />
                </div>
                <span className="open-pill-text">Junior / Associate Developer</span>
              </div>

              <div className="contact-open-pill">
                <div className="open-pill-icon-wrap">
                  <Monitor size={16} />
                </div>
                <span className="open-pill-text">Full-Stack Web Projects</span>
              </div>

              <div className="contact-open-pill">
                <div className="open-pill-icon-wrap">
                  <TrendingUp size={16} />
                </div>
                <span className="open-pill-text">Data & Analytics Opportunities</span>
              </div>

              <div className="contact-open-pill">
                <div className="open-pill-icon-wrap">
                  <Handshake size={16} />
                </div>
                <span className="open-pill-text">Learning & Collaboration</span>
              </div>
            </div>

            {/* Bottom Row: Ideas Anchor + Tilted Callout */}
            <div className="contact-right-bottom-row">
              <div className="contact-ideas-anchor">
                <div className="anchor-dash" aria-hidden="true"></div>
                <span className="anchor-text">GOOD IDEAS START HERE</span>
                <ArrowUpRight size={14} className="anchor-icon" />
              </div>

              <div className="contact-real-callout" aria-hidden="true">
                <span className="callout-line-1">LET'S BUILD</span>
                <span className="callout-line-2">SOMETHING</span>
                <span className="callout-line-3">REAL.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
