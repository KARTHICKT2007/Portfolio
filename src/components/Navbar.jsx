import React, { useState, useEffect } from 'react';
import {
  User,
  Briefcase,
  Folder,
  Award,
  Mail,
  Sun,
  Moon,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('about');

  const navItems = [
    { id: 'about', label: 'About', href: '#about', icon: User },
    { id: 'skills', label: 'Experience', href: '#skills', icon: Briefcase },
    { id: 'projects', label: 'Projects', href: '#projects', icon: Folder },
    { id: 'certifications', label: 'Certificates', href: '#certifications', icon: Award },
    { id: 'contact', label: 'Contact', href: '#contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);

      const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
      const scrollPos = window.scrollY + 220;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = document.getElementById(sections[i]);
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          return;
        }
      }
      // If near top, default to about
      setActiveSection('about');
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
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
    <header className="pill-navbar-wrapper">
      {/* Floating Capsule Bar */}
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

        {/* Desktop Nav Items with Icons */}
        <div className="capsule-nav-links">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`capsule-nav-item ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={16} strokeWidth={2} className="capsule-item-icon" />
                <span className="capsule-item-label">{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* Vertical Divider 2 */}
        <div className="capsule-divider" aria-hidden="true" />

        {/* Theme Toggle Button (Golden Sun / Moon) */}
        <button
          onClick={toggleTheme}
          className="capsule-theme-btn"
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun size={18} strokeWidth={2.2} className="capsule-sun-icon" />
          ) : (
            <Moon size={18} strokeWidth={2.2} className="capsule-moon-icon" />
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

        {/* Mobile Hamburger Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="capsule-mobile-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Floating Dropdown Menu */}
      <div className={`capsule-mobile-dropdown ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="capsule-mobile-list">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`capsule-mobile-item ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={18} strokeWidth={2} />
                <span>{item.label}</span>
              </a>
            );
          })}
          <div className="capsule-mobile-divider" />
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="capsule-mobile-hire"
          >
            Hire me
          </a>
        </div>
      </div>
    </header>
  );
}
