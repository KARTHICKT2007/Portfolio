import React, { useState, useEffect } from 'react';
import Preloader from './components/Preloader';
import CyberBackground from './components/CyberBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ProjectModal from './components/ProjectModal';
import ResumeModal from './components/ResumeModal';
import { useSectionTransitions } from './hooks/useScrollReveal';
import './styles/App.css';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('karthick_portfolio_theme') || 'dark';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  // Initialize master scroll reveal & smooth section transitions
  useSectionTransitions();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('karthick_portfolio_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app-root ${theme}-mode`}>
      {/* Custom Animated Preloader */}
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      {/* Cyber Ambient Background */}
      <CyberBackground />

      {/* Main Layout */}
      <div className="portfolio-wrapper">
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        <main id="main-content">
          <Hero onOpenResume={() => setIsResumeOpen(true)} />
          <About onOpenResume={() => setIsResumeOpen(true)} />
          <Skills />
          <Projects onSelectProject={(project) => setSelectedProject(project)} />
          <Certifications />
          <Contact />
        </main>

        <Footer />
        <BackToTop />

        {/* Interactive Modals */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <ResumeModal
          isOpen={isResumeOpen}
          onClose={() => setIsResumeOpen(false)}
        />
      </div>
    </div>
  );
}
