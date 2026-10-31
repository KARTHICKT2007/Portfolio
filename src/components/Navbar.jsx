import React, { useState, useEffect } from 'react';
import {
  Home,
  User,
  Briefcase,
  Folder,
  Award,
  Mail,
  Sun,
  Moon
} from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const desktopNavItems = [
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Experience', href: '#skills', icon: Briefcase },
    { id: 'projects', label: 'Projects', href: '#projects', icon: Folder },
    { id: 'certifications', label: 'Certificates', href: '#certifications', icon: Award },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  const mobileDockItems = [
    { id: 'home', label: 'Home', href: '#home', icon: Home },
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Experience', href: '#skills', icon: Briefcase },
    { id: 'projects', label: 'Projects', href: '#projects', icon: Folder },
    { id: 'certifications', label: 'Certificates', href: '#certifications', icon: Award },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['home', 'about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 260;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection('home');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* ====================================================================
          MOBILE TOP HEADER (Visible on Mobile / Tablet < 900px)
          ==================================================================== */}
      <header className={`mobile-top-header ${isScrolled ? 'scrolled' : ''}`}>
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="mobile-top-brand"
          title="Karthick Portfolio"
        >
          <span className="brand-text">Karthick K.</span>
        </a>

        <div className="mobile-top-actions">
          <button
            onClick={toggleTheme}
            className="mobile-theme-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} strokeWidth={2.4} className="theme-icon sun-icon" />
            ) : (
              <Moon size={18} strokeWidth={2.4} className="theme-icon moon-icon" />
            )}
          </button>

          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mobile-top-hire-btn"
          >
            Hire me
          </a>
        </div>
      </header>

      {/* ====================================================================
          MOBILE FLOATING BOTTOM DOCK (Icons Only — Curved Purple Capsule)
          ==================================================================== */}
      <nav className="mobile-bottom-dock-wrapper" aria-label="Mobile Navigation">
        <div className="mobile-bottom-dock">
          {mobileDockItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`mobile-dock-btn ${isActive ? 'active' : ''}`}
                aria-label={item.label}
                title={item.label}
              >
                <Icon size={20} strokeWidth={isActive ? 2.4 : 1.8} />
              </a>
            );
          })}
        </div>
      </nav>

      {/* ====================================================================
          DESKTOP FLOATING CAPSULE NAVBAR (Visible on Desktop >= 900px)
          ==================================================================== */}
      <div className="desktop-pill-wrapper">
        <nav className={`capsule-navbar ${isScrolled ? 'scrolled' : ''}`} aria-label="Main Navigation">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="capsule-logo"
            title="Karthick Portfolio"
          >
            <span className="capsule-logo-text">Karthick K.</span>
          </a>

          {/* Vertical Divider 1 */}
          <div className="capsule-divider" aria-hidden="true" />

          {/* Nav Items with Icons */}
          <div className="capsule-nav-links">
            {desktopNavItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`capsule-nav-item ${isActive ? 'active' : ''}`}
                >
                  {isActive && <span className="capsule-light-beam" aria-hidden="true" />}
                  <IconComponent size={16} strokeWidth={isActive ? 2.2 : 1.8} className="capsule-item-icon" />
                  <span className="capsule-item-label">{item.label}</span>
                </a>
              );
            })}
          </div>

          {/* Vertical Divider 2 */}
          <div className="capsule-divider" aria-hidden="true" />

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="capsule-theme-btn"
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <Sun size={18} strokeWidth={2.4} className="capsule-sun-icon" />
            ) : (
              <Moon size={18} strokeWidth={2.4} className="capsule-moon-icon" />
            )}
          </button>

          {/* Hire Me Pill CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="capsule-hire-btn"
          >
            Hire me
          </a>
        </nav>
      </div>
    </>
  );
}
