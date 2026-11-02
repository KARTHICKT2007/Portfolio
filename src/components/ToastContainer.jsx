import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import { useUI } from '../context/UIContext';

export default function ToastContainer() {
  const { toasts, removeToast } = useUI();

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={16} className="toast-icon success" />;
      case 'error':
        return <AlertCircle size={16} className="toast-icon error" />;
      case 'warning':
        return <AlertTriangle size={16} className="toast-icon warning" />;
      default:
        return <Info size={16} className="toast-icon info" />;
    }
  };

  return (
    <div className="global-toast-container" aria-live="polite" aria-atomic="true">
      {toasts && toasts.map((toast) => (
        <div
          key={toast.id}
          className={`global-toast-card toast-${toast.type || 'info'}`}
          role="status"
        >
          <div className="toast-icon-wrapper">
            {getIcon(toast.type)}
          </div>

          <div className="toast-message-wrapper">
            <p className="toast-message-text">{toast.message}</p>
          </div>

          <button
            onClick={() => removeToast(toast.id)}
            className="toast-close-btn"
            aria-label="Dismiss notification"
            title="Dismiss"
          >
            <X size={13} />
          </button>

          {/* Timed progress bar */}
          {toast.duration > 0 && (
            <div
              className="toast-progress-bar"
              style={{ animationDuration: `${toast.duration}ms` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
