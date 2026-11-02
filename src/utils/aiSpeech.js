/**
 * Karthick AI Voice Assistant - Audio & Speech Synthesis Engine
 * Built with Web Audio API (synthesized futuristic sound effects)
 * and Web Speech API SpeechSynthesis with intelligent Young Male Voice selection.
 */

// Shared Audio Context for UI Sound Effects
let audioCtx = null;
let soundMuted = false;

export function setSoundMuted(muted) {
  soundMuted = muted;
}

export function isSoundMuted() {
  return soundMuted;
}

function getAudioContext() {
  if (!audioCtx) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      audioCtx = new AudioCtx();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play subtle, futuristic, soft synthesized sound effects for Karthick AI
 * Types: 'open', 'close', 'mic', 'listen', 'finish'
 */
export function playAiSound(type) {
  if (soundMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (type === 'open') {
      // Gentle ascending futuristic chime (Purple resonance)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'triangle';

      osc1.frequency.setValueAtTime(392, now); // G4
      osc1.frequency.exponentialRampToValueAtTime(587.33, now + 0.12); // D5
      osc1.frequency.exponentialRampToValueAtTime(880, now + 0.28); // A5

      osc2.frequency.setValueAtTime(196, now);
      osc2.frequency.exponentialRampToValueAtTime(440, now + 0.28);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.4);
      osc2.stop(now + 0.4);
    } else if (type === 'close') {
      // Soft descending close tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, now);
      osc.frequency.exponentialRampToValueAtTime(293.66, now + 0.18);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.09, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.24);
    } else if (type === 'mic') {
      // Mic activation ping
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(659.25, now); // E5
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.14, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.18);
    } else if (type === 'listen') {
      // Subtle pulse to indicate listening has started
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.linearRampToValueAtTime(660, now + 0.07);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.1, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.15);
    } else if (type === 'finish') {
      // AI response completion chime
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, now); // C5
      osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.12); // G5

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.11, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now);
      osc.stop(now + 0.26);
    }
  } catch {
    // Audio context fallback
  }
}

/**
 * Intelligent selection of a natural, friendly Young Male English Voice.
 * Searches browser voices for quality English male voices.
 */
export function getYoungMaleVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  // Filter English voices
  const enVoices = voices.filter(v => v.lang.startsWith('en'));

  // Priority 1: Preferred young/friendly male voice identifiers
  const preferredMaleNames = [
    'guy', // Natural US male (Google / Microsoft Guy Online)
    'david', // Microsoft David - clear English male
    'george', // Microsoft George - UK male
    'james', // Microsoft James
    'daniel', // Daniel (UK English male - Siri/Apple/Browser)
    'alex', // Alex (Apple US English male)
    'rishi', // Google English India male
    'en-us-male',
    'en-gb-male',
    'mark',
    'andrew'
  ];

  for (const name of preferredMaleNames) {
    const found = enVoices.find(v => v.name.toLowerCase().includes(name));
    if (found) return found;
  }

  // Priority 2: Any English voice with "male" in name or gender attribute
  const maleVoice = enVoices.find(v => {
    const n = v.name.toLowerCase();
    return n.includes('male') && !n.includes('female');
  });
  if (maleVoice) return maleVoice;

  // Priority 3: Google US English / Natural English
  const googleVoice = enVoices.find(v => v.name.includes('Google US English') || v.name.includes('Natural'));
  if (googleVoice) return googleVoice;

  // Priority 4: Default English voice
  const defaultEn = enVoices.find(v => v.default) || enVoices[0];
  if (defaultEn) return defaultEn;

  return voices[0] || null;
}

/**
 * Speak text aloud using the young male voice configuration
 */
let activeUtterance = null;

export function speakText(text, { onStart, onEnd, onError } = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  // Stop any currently speaking utterance
  stopSpeaking();

  const utterance = new SpeechSynthesisUtterance(text);
  activeUtterance = utterance;

  // Voice selection
  const voice = getYoungMaleVoice();
  if (voice) {
    utterance.voice = voice;
    utterance.lang = voice.lang || 'en-US';
  } else {
    utterance.lang = 'en-US';
  }

  // Natural young male voice pacing:
  // Rate ~1.0 for conversational natural speed; pitch ~1.02 for bright, young male tone
  utterance.rate = 1.0;
  utterance.pitch = 1.04;

  utterance.onstart = () => {
    if (onStart) onStart();
  };

  utterance.onend = () => {
    activeUtterance = null;
    if (onEnd) onEnd();
  };

  utterance.onerror = (e) => {
    activeUtterance = null;
    if (onError) onError(e);
    else if (onEnd) onEnd();
  };

  window.speechSynthesis.speak(utterance);
}

/**
 * Stop any current speech synthesis immediately
 */
export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
    activeUtterance = null;
  }
}
