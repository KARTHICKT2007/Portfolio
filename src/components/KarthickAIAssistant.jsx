import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Mic,
  MicOff,
  X,
  Volume2,
  VolumeX,
  RotateCcw,
  Square,
  Send,
  HelpCircle,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import {
  playAiSound,
  speakText,
  stopSpeaking,
  setSoundMuted,
  isSoundMuted
} from '../utils/aiSpeech';
import {
  RESUME_SUGGESTED_QUESTIONS,
  processResumeQuestion
} from '../utils/resumeKnowledge';

export default function KarthickAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [assistantState, setAssistantState] = useState('idle'); // 'idle' | 'listening' | 'processing' | 'speaking'
  const [statusMessage, setStatusMessage] = useState('Ready to listen');
  const [activeQuestion, setActiveQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isMuted, setIsMuted] = useState(false);
  const [hasGreeted, setHasGreeted] = useState(false);

  // Microphone Permission States
  const [permissionPrompt, setPermissionPrompt] = useState(false);
  const [permissionError, setPermissionError] = useState('');
  const [micGranted, setMicGranted] = useState(false);

  // Manual text input fallback
  const [textQuery, setTextQuery] = useState('');

  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);

  // Initialize SpeechRecognition support
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
          isListeningRef.current = true;
          setAssistantState('listening');
          setStatusMessage('Listening to your voice...');
          playAiSound('listen');
        };

        recognition.onresult = (event) => {
          let interim = '';
          let final = '';

          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              final += transcript;
            } else {
              interim += transcript;
            }
          }

          const currentText = final || interim;
          if (currentText) {
            setActiveQuestion(currentText);
          }

          if (final) {
            handleProcessQuestion(final);
          }
        };

        recognition.onerror = (event) => {
          isListeningRef.current = false;
          if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
            setPermissionError('Microphone access was denied. Please allow microphone permissions in your browser settings.');
            setAssistantState('idle');
            setStatusMessage('Microphone access denied');
          } else if (event.error === 'no-speech') {
            setAssistantState('idle');
            setStatusMessage('No speech detected. Tap mic to try again.');
          } else {
            setAssistantState('idle');
            setStatusMessage('Listening paused. Tap mic to speak.');
          }
        };

        recognition.onend = () => {
          isListeningRef.current = false;
          // Only reset to idle if not currently processing or speaking
          setAssistantState((prev) => (prev === 'listening' ? 'idle' : prev));
        };

        recognitionRef.current = recognition;
      } catch {
        recognitionRef.current = null;
      }
    }

    return () => {
      stopSpeaking();
      if (recognitionRef.current && isListeningRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  // Handle open assistant
  const handleOpenAssistant = () => {
    setIsOpen(true);
    playAiSound('open');

    // Spoken greeting on first launch in a session
    if (!hasGreeted) {
      setHasGreeted(true);
      const greeting = "Hello! I'm Karthick AI. What would you like to know about Karthick?";
      setAssistantState('speaking');
      setStatusMessage('Speaking greeting...');

      speakText(greeting, {
        onStart: () => {
          setAssistantState('speaking');
          setStatusMessage('Speaking greeting...');
        },
        onEnd: () => {
          setAssistantState('idle');
          setStatusMessage('Ready to listen');
        },
        onError: () => {
          setAssistantState('idle');
          setStatusMessage('Ready to listen');
        }
      });
    } else {
      setAssistantState('idle');
      setStatusMessage('Ready to listen');
    }
  };

  // Handle close assistant
  const handleCloseAssistant = () => {
    stopSpeaking();
    if (recognitionRef.current && isListeningRef.current) {
      try {
        recognitionRef.current.abort();
      } catch {
        // ignore
      }
    }
    isListeningRef.current = false;
    setAssistantState('idle');
    setIsOpen(false);
    playAiSound('close');
  };

  // Request actual microphone permission
  const requestMicPermission = async () => {
    setPermissionError('');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Permission granted - stop test tracks
      stream.getTracks().forEach((track) => track.stop());
      setMicGranted(true);
      setPermissionPrompt(false);
      setStatusMessage("Microphone connected. I'm ready to listen.");
      playAiSound('mic');

      // Start actual listening
      startListening();
    } catch {
      setPermissionError(
        'Microphone access is blocked. Please click the camera/mic icon in your browser URL bar to allow microphone access.'
      );
      setAssistantState('idle');
      setStatusMessage('Microphone access blocked');
    }
  };

  // Start speech recognition
  const startListening = () => {
    stopSpeaking();
    setPermissionError('');

    if (!recognitionRef.current) {
      setPermissionError('Speech recognition is not supported in this browser. Please type your question below.');
      return;
    }

    try {
      playAiSound('mic');
      recognitionRef.current.start();
    } catch {
      // If already started, restart
      try {
        recognitionRef.current.stop();
        setTimeout(() => {
          try {
            recognitionRef.current.start();
          } catch {
            // ignore
          }
        }, 150);
      } catch {
        // ignore
      }
    }
  };

  // Trigger microphone button click
  const handleMicClick = () => {
    if (assistantState === 'listening') {
      // Stop listening
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      isListeningRef.current = false;
      setAssistantState('idle');
      setStatusMessage('Listening paused');
      return;
    }

    if (assistantState === 'speaking') {
      stopSpeaking();
      setAssistantState('idle');
      setStatusMessage('Ready to listen');
      return;
    }

    // Check if permission prompt is required
    if (!micGranted && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      setPermissionPrompt(true);
      return;
    }

    startListening();
  };

  // Process a natural language question using resume information
  const handleProcessQuestion = (questionText) => {
    if (!questionText || !questionText.trim()) return;

    setActiveQuestion(questionText);
    setAssistantState('processing');
    setStatusMessage('Searching Karthick\'s resume...');

    setTimeout(() => {
      const result = processResumeQuestion(questionText);
      setAiResponse(result.text);
      setAssistantState('speaking');
      setStatusMessage('Speaking response...');
      playAiSound('finish');

      speakText(result.text, {
        onStart: () => {
          setAssistantState('speaking');
          setStatusMessage('Speaking response...');
        },
        onEnd: () => {
          setAssistantState('idle');
          setStatusMessage('Ready to listen');
        },
        onError: () => {
          setAssistantState('idle');
          setStatusMessage('Ready to listen');
        }
      });
    }, 380);
  };

  // Repeat last AI response
  const handleRepeatResponse = () => {
    if (!aiResponse) return;
    stopSpeaking();
    setAssistantState('speaking');
    setStatusMessage('Repeating response...');
    playAiSound('mic');

    speakText(aiResponse, {
      onStart: () => {
        setAssistantState('speaking');
        setStatusMessage('Speaking response...');
      },
      onEnd: () => {
        setAssistantState('idle');
        setStatusMessage('Ready to listen');
      },
      onError: () => {
        setAssistantState('idle');
        setStatusMessage('Ready to listen');
      }
    });
  };

  // Stop speaking
  const handleStopSpeaking = () => {
    stopSpeaking();
    setAssistantState('idle');
    setStatusMessage('Ready to listen');
  };

  // Toggle sound effects mute
  const handleToggleSound = () => {
    const next = !isMuted;
    setIsMuted(next);
    setSoundMuted(next);
  };

  // Manual query submission
  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!textQuery.trim()) return;
    const q = textQuery.trim();
    setTextQuery('');
    handleProcessQuestion(q);
  };

  return (
    <>
      {/* ====================================================================
          3D FLOATING AI ASSISTANT ORB BUTTON
          ==================================================================== */}
      <div className="ai-floating-orb-wrapper">
        <button
          className={`ai-floating-orb-btn ${isOpen ? 'active' : ''}`}
          onClick={() => (isOpen ? handleCloseAssistant() : handleOpenAssistant())}
          aria-label={isOpen ? 'Close Karthick AI' : 'Open Karthick AI Voice Assistant'}
          title="Karthick AI Voice Assistant"
        >
          {/* Outer Rotating Orbital Rings */}
          <span className="orb-orbital-ring ring-1" aria-hidden="true" />
          <span className="orb-orbital-ring ring-2" aria-hidden="true" />

          {/* Glowing Aura & Core */}
          <span className="orb-glow-aura" aria-hidden="true" />
          <span className="orb-3d-sphere">
            <span className="orb-sphere-core" />
            <Sparkles size={18} className="orb-sparkle-icon" />
          </span>

          {/* Floating Pill Tag */}
          <span className="orb-floating-tag">
            <span className="tag-pulse-dot" />
            <span className="tag-text">Karthick AI</span>
          </span>
        </button>
      </div>

      {/* ====================================================================
          KARTHICK AI VOICE ASSISTANT MODAL INTERFACE
          ==================================================================== */}
      {isOpen && (
        <div className="ai-modal-backdrop" onClick={handleCloseAssistant}>
          <div
            className="ai-modal-container"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ai-modal-title"
          >
            {/* Top Bar Header */}
            <header className="ai-modal-header">
              <div className="ai-brand-group">
                <div className="ai-brand-icon-box">
                  <Sparkles size={16} className="text-electric" />
                </div>
                <h2 id="ai-modal-title" className="ai-brand-title">
                  Karthick AI
                </h2>
              </div>

              <div className="ai-header-actions">
                <span className="ai-voice-badge">
                  <span className="voice-badge-dot" />
                  Voice enabled
                </span>

                <button
                  className="ai-action-icon-btn"
                  onClick={handleToggleSound}
                  aria-label={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
                  title={isMuted ? 'Unmute Sound Effects' : 'Mute Sound Effects'}
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>

                <button
                  className="ai-action-icon-btn close-btn"
                  onClick={handleCloseAssistant}
                  aria-label="Close Assistant"
                  title="Close Assistant (Esc)"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            {/* Modal Body */}
            <div className="ai-modal-body">
              {/* Central Animated AI Orb */}
              <div className={`ai-central-orb-stage state-${assistantState}`}>
                <div className="ai-central-orb-halo" />
                <div className="ai-central-orb">
                  {assistantState === 'speaking' ? (
                    /* Dynamic Sound Wave Equalizer */
                    <div className="ai-orb-waveform" aria-hidden="true">
                      <span className="bar bar-1" />
                      <span className="bar bar-2" />
                      <span className="bar bar-3" />
                      <span className="bar bar-4" />
                      <span className="bar bar-5" />
                    </div>
                  ) : assistantState === 'listening' ? (
                    /* Pulsing Microphone Pulse */
                    <div className="ai-orb-listening-pulse" aria-hidden="true">
                      <Mic size={24} className="orb-inner-mic" />
                      <span className="sound-ripple ripple-1" />
                      <span className="sound-ripple ripple-2" />
                    </div>
                  ) : assistantState === 'processing' ? (
                    /* Orbital Processing Rings */
                    <div className="ai-orb-processing-spinner" aria-hidden="true">
                      <span className="spinner-particle" />
                    </div>
                  ) : (
                    /* Idle Soundwave Icon */
                    <div className="ai-orb-idle-bars" aria-hidden="true">
                      <span className="idle-bar b1" />
                      <span className="idle-bar b2" />
                      <span className="idle-bar b3" />
                    </div>
                  )}
                </div>
              </div>

              {/* Greeting Headings */}
              <div className="ai-greeting-wrap">
                <h3 className="ai-greeting-title">Hello, I'm Karthick AI</h3>
                <p className="ai-greeting-subtitle">
                  Ask me anything about Karthick's resume.
                </p>

                <div className={`ai-status-pill status-${assistantState}`}>
                  <span className="status-live-dot" />
                  <span className="status-text">{statusMessage}</span>
                </div>
              </div>

              {/* Microphone Permission Alert Banner (if needed) */}
              {permissionPrompt && (
                <div className="ai-permission-card">
                  <div className="permission-card-icon">
                    <Mic size={20} />
                  </div>
                  <div className="permission-card-content">
                    <h4 className="permission-title">Microphone Access Required</h4>
                    <p className="permission-desc">
                      Karthick AI needs microphone access to listen to your questions. Please allow microphone access to continue.
                    </p>
                    <div className="permission-actions">
                      <button
                        className="permission-allow-btn"
                        onClick={requestMicPermission}
                      >
                        <CheckCircle2 size={15} />
                        Allow Microphone
                      </button>
                      <button
                        className="permission-cancel-btn"
                        onClick={() => setPermissionPrompt(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Permission Error / Instructions */}
              {permissionError && (
                <div className="ai-error-banner">
                  <AlertCircle size={16} className="error-icon" />
                  <span>{permissionError}</span>
                </div>
              )}

              {/* AI Response Card (shows question & spoken answer) */}
              {activeQuestion && (
                <div className="ai-dialog-flow-card">
                  <div className="ai-user-query-row">
                    <span className="query-label">You asked:</span>
                    <span className="query-text">"{activeQuestion}"</span>
                  </div>

                  {aiResponse && (
                    <div className="ai-response-box">
                      <div className="response-header">
                        <span className="response-badge">
                          <Sparkles size={12} />
                          Resume Answer
                        </span>

                        <div className="response-actions">
                          {assistantState === 'speaking' ? (
                            <button
                              className="response-btn stop-btn"
                              onClick={handleStopSpeaking}
                              title="Stop Speaking"
                            >
                              <Square size={13} />
                              <span>Stop</span>
                            </button>
                          ) : (
                            <button
                              className="response-btn repeat-btn"
                              onClick={handleRepeatResponse}
                              title="Repeat Response Aloud"
                            >
                              <RotateCcw size={13} />
                              <span>Repeat</span>
                            </button>
                          )}
                        </div>
                      </div>

                      <p className="response-content-text">{aiResponse}</p>
                    </div>
                  )}
                </div>
              )}

              {/* "TRY ASKING" Suggested Questions Section */}
              <div className="ai-suggestions-card">
                <div className="suggestions-header">
                  <HelpCircle size={13} className="text-electric" />
                  <span>TRY ASKING</span>
                </div>

                <div className="suggestions-chips-grid">
                  {RESUME_SUGGESTED_QUESTIONS.map((question, index) => (
                    <button
                      key={index}
                      className="suggestion-chip-btn"
                      onClick={() => handleProcessQuestion(question)}
                      title={`Ask: ${question}`}
                    >
                      <span className="chip-bullet">•</span>
                      <span className="chip-text">{question}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Main Microphone Interaction Action */}
              <div className="ai-mic-stage">
                <button
                  className={`ai-big-mic-btn ${assistantState === 'listening' ? 'listening' : ''} ${assistantState === 'speaking' ? 'speaking' : ''}`}
                  onClick={handleMicClick}
                  aria-label={
                    assistantState === 'listening'
                      ? 'Listening... Click to pause'
                      : assistantState === 'speaking'
                      ? 'Speaking response. Click to stop'
                      : 'Tap to speak question'
                  }
                  title="Tap to speak"
                >
                  {assistantState === 'speaking' ? (
                    <Volume2 size={30} className="mic-icon" />
                  ) : assistantState === 'listening' ? (
                    <Mic size={30} className="mic-icon pulse" />
                  ) : (
                    <Mic size={30} className="mic-icon" />
                  )}
                  <span className="mic-ring-pulse" />
                </button>

                <span className="mic-action-label">
                  {assistantState === 'listening'
                    ? 'Listening... Tap to finish'
                    : assistantState === 'speaking'
                    ? 'Speaking response... Tap to stop'
                    : 'Tap to speak'}
                </span>
                <span className="mic-action-sublabel">
                  Your voice is converted into a question
                </span>

                {/* Capability Badges */}
                <div className="ai-capabilities-row">
                  <span className="capability-tag">Voice input</span>
                  <span className="capability-tag">AI response</span>
                  <span className="capability-tag">Voice output</span>
                </div>

                {/* Text Fallback Input Bar */}
                <form className="ai-text-input-form" onSubmit={handleTextSubmit}>
                  <input
                    type="text"
                    className="ai-text-field"
                    placeholder="Or type a question about Karthick..."
                    value={textQuery}
                    onChange={(e) => setTextQuery(e.target.value)}
                    aria-label="Type question about Karthick's resume"
                  />
                  <button
                    type="submit"
                    className="ai-text-send-btn"
                    disabled={!textQuery.trim()}
                    aria-label="Send question"
                  >
                    <Send size={15} />
                  </button>
                </form>
              </div>
            </div>

            {/* Modal Footer */}
            <footer className="ai-modal-footer">
              <span className="footer-powered-text">
                Powered by Karthick Resume AI
              </span>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
