import React from 'react';

export default function CyberBackground() {
  return (
    <div className="cyber-bg-container" aria-hidden="true">
      {/* Radial ambient glow orbs */}
      <div className="ambient-orb orb-primary"></div>
      <div className="ambient-orb orb-secondary"></div>
      <div className="ambient-orb orb-tertiary"></div>

      {/* Cyber perspective grid */}
      <div className="cyber-grid-overlay"></div>

      {/* Subtle particle scanline */}
      <div className="cyber-scanline"></div>
    </div>
  );
}
