import React, { useEffect } from 'react';
import { ExternalLink, ArrowLeft, ShieldAlert, CheckCircle2, X, Lock } from 'lucide-react';
import { useUI } from '../context/UIContext';

export default function ConfirmationModal() {
  const { confirmation, closeConfirmation, proceedConfirmation } = useUI();

  // Handle ESC key press
  useEffect(() => {
    if (!confirmation.isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeConfirmation();
      } else if (e.key === 'Enter') {
        proceedConfirmation();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [confirmation.isOpen, closeConfirmation, proceedConfirmation]);

  if (!confirmation.isOpen) return null;

  const isExternal = confirmation.type === 'external';

  return (
    <div
      className="modal-backdrop confirm-modal-backdrop"
      onClick={closeConfirmation}
      role="dialog"
      aria-modal="true"
      aria-labelledby="confirm-modal-title"
    >
      <div
        className="confirm-modal-container"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          className="confirm-modal-close"
          onClick={closeConfirmation}
          aria-label="Close confirmation dialog"
          title="Close (Esc)"
        >
          <X size={18} />
        </button>

        {/* Top Floating Glow Icon */}
        <div className="confirm-icon-wrap">
          <div className="confirm-icon-aura" aria-hidden="true" />
          <div className="confirm-icon-box">
            {isExternal ? (
              <ExternalLink size={24} className="confirm-icon-svg" />
            ) : confirmation.type === 'warning' ? (
              <ShieldAlert size={24} className="confirm-icon-svg warning" />
            ) : (
              <CheckCircle2 size={24} className="confirm-icon-svg success" />
            )}
          </div>
        </div>

        {/* Content */}
        <div className="confirm-modal-content">
          <h3 id="confirm-modal-title" className="confirm-modal-title">
            {confirmation.title}
          </h3>

          <p className="confirm-modal-message">
            {confirmation.message}
          </p>

          {/* External Destination Info Box */}
          {isExternal && confirmation.destinationUrl && (
            <div className="confirm-destination-box">
              <div className="destination-header">
                <span className="destination-label">DESTINATION SITE</span>
                {confirmation.domain && (
                  <span className="destination-domain-pill">
                    <Lock size={10} className="lock-icon" />
                    <span>{confirmation.domain}</span>
                  </span>
                )}
              </div>
              <div className="destination-url-text" title={confirmation.destinationUrl}>
                {confirmation.destinationUrl}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="confirm-modal-actions">
            <button
              onClick={closeConfirmation}
              className="confirm-btn confirm-btn-cancel"
            >
              <ArrowLeft size={15} />
              <span>{confirmation.cancelLabel || 'Go Back'}</span>
            </button>

            <button
              onClick={proceedConfirmation}
              className="confirm-btn confirm-btn-proceed"
              autoFocus
            >
              <span>{confirmation.confirmLabel || 'Continue'}</span>
              <ExternalLink size={15} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
