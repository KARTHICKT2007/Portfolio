import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { isSoundEnabled, setSoundEnabled, toggleSound, playSound } from '../utils/soundEffects';

const UIContext = createContext(null);

export function useUI() {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
}

export function UIProvider({ children }) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [toasts, setToasts] = useState([]);
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    title: '',
    message: '',
    destinationUrl: '',
    domain: '',
    confirmLabel: 'Continue',
    cancelLabel: 'Go Back',
    type: 'external', // 'external' | 'action' | 'warning'
    onConfirm: null,
    onCancel: null
  });

  // Keep state synchronized with SoundEffects module
  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Toast Notification System
  const showToast = useCallback(({ type = 'info', message, duration = 3500 }) => {
    const id = Date.now() + Math.random().toString(36).substring(2, 6);
    const newToast = { id, type, message, duration };

    setToasts((prev) => [...prev.slice(-3), newToast]); // keep max 4 toasts
    playSound(type === 'success' ? 'success' : type === 'error' || type === 'warning' ? 'alert' : 'toast');

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
    return id;
  }, [removeToast]);

  const handleToggleSound = useCallback(() => {
    const newState = toggleSound();
    setSoundOn(newState);
    showToast({
      type: newState ? 'success' : 'info',
      message: newState ? 'Sound effects enabled' : 'Sound effects muted',
      duration: 2500
    });
    return newState;
  }, [showToast]);

  // Safe Domain Extractor
  const extractDomain = (url) => {
    try {
      if (!url) return '';
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, '');
    } catch (e) {
      return url.replace(/^https?:\/\//, '').split('/')[0];
    }
  };

  // External Website Link Confirmation
  const confirmExternal = useCallback((url, customTitle) => {
    if (!url || url === '#' || url.startsWith('javascript:')) return;
    const domain = extractDomain(url);

    playSound('externalPrompt');
    setConfirmation({
      isOpen: true,
      title: customTitle || "Leaving Karthick's Portfolio",
      message: 'You are about to visit an external website. Do you want to continue?',
      destinationUrl: url,
      domain,
      confirmLabel: 'Continue',
      cancelLabel: 'Go Back',
      type: 'external',
      onConfirm: () => {
        playSound('success');
        window.open(url, '_blank', 'noopener,noreferrer');
        showToast({
          type: 'info',
          message: `Opened ${domain}`,
          duration: 3000
        });
      },
      onCancel: () => {
        playSound('modalClose');
      }
    });
  }, [showToast]);

  // Generic Important Action Confirmation (e.g. Resume Download, Contact Action)
  const confirmAction = useCallback(({
    title,
    message,
    confirmLabel = 'Confirm',
    cancelLabel = 'Cancel',
    type = 'action',
    onConfirm
  }) => {
    playSound('externalPrompt');
    setConfirmation({
      isOpen: true,
      title,
      message,
      destinationUrl: '',
      domain: '',
      confirmLabel,
      cancelLabel,
      type,
      onConfirm: () => {
        playSound('success');
        if (typeof onConfirm === 'function') {
          onConfirm();
        }
      },
      onCancel: () => {
        playSound('modalClose');
      }
    });
  }, []);

  const closeConfirmation = useCallback(() => {
    if (confirmation.onCancel) {
      confirmation.onCancel();
    }
    setConfirmation((prev) => ({ ...prev, isOpen: false }));
  }, [confirmation]);

  const proceedConfirmation = useCallback(() => {
    if (confirmation.onConfirm) {
      confirmation.onConfirm();
    }
    setConfirmation((prev) => ({ ...prev, isOpen: false }));
  }, [confirmation]);

  // Global Click Interceptor for external links & universal click sounds on every click
  useEffect(() => {
    let lastClickTime = 0;

    const handleGlobalClick = (e) => {
      const now = Date.now();
      const canPlayClickSound = now - lastClickTime > 35;

      // Find closest anchor tag
      const anchor = e.target.closest('a');
      if (anchor) {
        const href = anchor.getAttribute('href');
        // External link check
        if (href && (href.startsWith('http://') || href.startsWith('https://'))) {
          // If not currently on this host
          const isExternal = !href.startsWith(window.location.origin) && !href.startsWith('/');
          if (isExternal) {
            e.preventDefault();
            e.stopPropagation();
            confirmExternal(href);
            return;
          }
        }
        // Smooth internal navigation sound
        if (href && href.startsWith('#')) {
          lastClickTime = now;
          playSound('nav');
          return;
        }
      }

      // Check for specialized UI components that handle their own dedicated audio
      const isAiOrb = e.target.closest('.ai-floating-orb-wrapper');
      const isAiModal = e.target.closest('.ai-assistant-modal');
      const isConfirmAction = e.target.closest('.confirm-modal-actions');

      if (isAiOrb || isAiModal || isConfirmAction) {
        return;
      }

      // Play responsive tactile click sound on every single click
      if (canPlayClickSound) {
        lastClickTime = now;
        playSound('click');
      }
    };

    document.addEventListener('click', handleGlobalClick, { capture: true });
    return () => document.removeEventListener('click', handleGlobalClick, { capture: true });
  }, [confirmExternal]);

  return (
    <UIContext.Provider
      value={{
        soundEnabled: soundOn,
        toggleSound: handleToggleSound,
        playSound,
        showToast,
        removeToast,
        toasts,
        confirmation,
        confirmExternal,
        confirmAction,
        closeConfirmation,
        proceedConfirmation
      }}
    >
      {children}
    </UIContext.Provider>
  );
}
