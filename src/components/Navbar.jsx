import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, Terminal, Sparkles, Send } from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Certifications', href: '#certifications' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        {/* Brand Logo */}
        <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="nav-logo">
          <span className="logo-bracket">&lt;</span>
          <span className="logo-name">Karthick</span>
          <span className="logo-accent">.dev</span>
          <span className="logo-bracket"> /&gt;</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navItems.map((item) => {
              const secId = item.href.replace('#', '');
              const isActive = activeSection === secId;
              return (
                <li key={item.href} className="nav-item">
                  <a
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`nav-link ${isActive ? 'active' : ''}`}
                  >
                    {item.label}
                    {isActive && <span className="active-glow-pill"></span>}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Action Controls: Theme Toggle & Hire Me CTA */}
        <div className="nav-actions">
          <button
            onClick={toggleTheme}
            className="theme-toggle-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={19} className="theme-icon sun-icon" />
            ) : (
              <Moon size={19} className="theme-icon moon-icon" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hire-me-btn d-none-mobile"
          >
            <Send size={15} />
            <span>Hire Me</span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="mobile-menu-toggle"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-list">
          {navItems.map((item) => {
            const secId = item.href.replace('#', '');
            const isActive = activeSection === secId;
            return (
              <li key={item.href} className="mobile-nav-item">
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                >
                  <span className="dot-indicator"></span>
                  {item.label}
                </a>
              </li>
            );
          })}
          <li className="mobile-nav-cta">
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="mobile-hire-btn"
            >
              <Send size={16} />
              <span>Let's Talk — Hire Me</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
