import React from 'react';
import { Mail, Heart, Sparkles, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="section-container footer-content">
        {/* Brand & Tagline */}
        <div className="footer-brand-col">
          <div className="footer-logo">
            <span className="logo-name">Karthick</span>
          </div>
          <p className="footer-tagline">
            Aspiring Full Stack Developer & Data Analyst. Crafting high-performance web systems and data-driven solutions.
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="footer-links-col">
          <span className="footer-heading">Navigation</span>
          <ul className="footer-nav-list">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#skills">Skills</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#certifications">Certifications</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>

        {/* Social & Connect */}
        <div className="footer-social-col">
          <span className="footer-heading">Connect</span>
          <div className="footer-social-row">
            <a
              href={personalInfo.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="footer-icon-link"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href={personalInfo.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="footer-icon-link"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href={`mailto:${personalInfo.contact.email}`}
              aria-label="Email Karthick"
              className="footer-icon-link"
            >
              <Mail size={18} />
            </a>
          </div>

          <div className="tech-badge-built">
            <Terminal size={13} className="text-electric" />
            <span>Built with React + Vite</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <div className="section-container footer-bottom-inner">
          <p className="copyright-text">
            &copy; {currentYear} Karthick T. All rights reserved.
          </p>
          <div className="status-live">
            <span className="status-live-dot"></span>
            <span>Arulmigu Palaniandavar College • Madurai Kamaraj University</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
