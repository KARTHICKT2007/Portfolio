/**
 * Karthick AI Voice Assistant - Audio & Speech Synthesis Engine
 * Built with Web Audio API (synthesized futuristic sound effects)
 * and Web Speech API SpeechSynthesis with intelligent Young Male Voice selection.
 */

import { isSoundEnabled, setSoundEnabled } from './soundEffects';

// Shared Audio Context for UI Sound Effects
let audioCtx = null;

export function setSoundMuted(muted) {
  setSoundEnabled(!muted);
}

export function isSoundMuted() {
  return !isSoundEnabled();
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
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
  if (isSoundMuted()) return;
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
 * Intelligent voice caching and selection of a natural, friendly Young Male English Voice.
 */
let cachedVoices = [];

function loadVoices() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return [];
  try {
    cachedVoices = window.speechSynthesis.getVoices() || [];
  } catch {
    cachedVoices = [];
  }
  return cachedVoices;
}

// Preload voices as early as possible
if (typeof window !== 'undefined' && window.speechSynthesis) {
  loadVoices();
  if (typeof window.speechSynthesis.onvoiceschanged !== 'undefined') {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }
}

export function getYoungMaleVoice() {
  if (typeof window === 'undefined' || !window.speechSynthesis) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  if (!voices || voices.length === 0) return null;

  // Filter English voices
  const enVoices = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
  const candidatePool = enVoices.length > 0 ? enVoices : voices;

  // Female voice names to filter OUT so we don't accidentally pick a female voice
  const femaleKeywords = [
    'zira', 'jenny', 'aria', 'sonia', 'female', 'samantha', 'victoria',
    'karen', 'susan', 'hazel', 'linda', 'heather', 'catherine', 'helena',
    'amy', 'emma', 'olivia', 'ava', 'sophia', 'isabella', 'mia'
  ];

  const isFemaleVoice = (voiceName) => {
    const lower = voiceName.toLowerCase();
    return femaleKeywords.some((f) => lower.includes(f));
  };

  // Male / Young male identifiers in priority order
  const preferredMaleKeywords = [
    'guy online', // Microsoft Guy Online (Natural) - excellent US English young male
    'guy',
    'microsoft david', // Clear, standard US English male
    'david',
    'microsoft mark', // Microsoft Mark
    'mark',
    'microsoft george', // UK Male
    'george',
    'microsoft ryan', // Microsoft Ryan
    'ryan',
    'daniel', // Siri / Apple UK English male
    'alex', // Apple US English male
    'nathan',
    'aaron',
    'evan',
    'rishi', // Google English India male
    'en-us-male',
    'en-gb-male',
    'male'
  ];

  // Pass 1: Look for highest priority young male voices
  for (const keyword of preferredMaleKeywords) {
    const found = candidatePool.find((v) => {
      const name = (v.name || '').toLowerCase();
      return name.includes(keyword) && !isFemaleVoice(name);
    });
    if (found) return found;
  }

  // Pass 2: Any English voice that does NOT match female keywords
  const nonFemaleEnglish = candidatePool.find((v) => !isFemaleVoice(v.name || ''));
  if (nonFemaleEnglish) return nonFemaleEnglish;

  // Pass 3: Default English voice
  const defaultEn = candidatePool.find((v) => v.default) || candidatePool[0];
  if (defaultEn) return defaultEn;

  return voices[0] || null;
}

/**
 * Speak text aloud using the young male voice configuration.
 * Includes anti-stuck handling and garbage collection protection.
 */
let currentSpeechUtterance = null;
let speechTimeoutId = null;

export function speakText(text, { onStart, onEnd, onError } = {}) {
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    if (onEnd) onEnd();
    return;
  }

  if (!text || !text.trim()) {
    if (onEnd) onEnd();
    return;
  }

  // Clear any pending speak timeout
  if (speechTimeoutId) {
    clearTimeout(speechTimeoutId);
    speechTimeoutId = null;
  }

  // Stop any currently speaking utterance and un-pause if needed
  try {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    window.speechSynthesis.cancel();
  } catch {
    // ignore
  }

  // Small tick delay to let the browser cancel previous speech cleanly
  speechTimeoutId = setTimeout(() => {
    try {
      const utterance = new SpeechSynthesisUtterance(text);
      currentSpeechUtterance = utterance;
      // Also pin to window to prevent garbage collection mid-speech in Chromium
      window.__karthickActiveUtterance = utterance;

      // Select natural young male voice
      const voice = getYoungMaleVoice();
      if (voice) {
        utterance.voice = voice;
        utterance.lang = voice.lang || 'en-US';
      } else {
        utterance.lang = 'en-US';
      }

      // Natural young male voice tuning:
      // Rate 0.98 for clear, friendly, human pacing without rush
      // Pitch 0.98 for a rich, warm, young male tone without high-pitched squeakiness
      utterance.rate = 0.98;
      utterance.pitch = 0.98;
      utterance.volume = 1.0;

      utterance.onstart = () => {
        if (onStart) onStart();
      };

      utterance.onend = () => {
        currentSpeechUtterance = null;
        window.__karthickActiveUtterance = null;
        if (onEnd) onEnd();
      };

      utterance.onerror = (e) => {
        currentSpeechUtterance = null;
        window.__karthickActiveUtterance = null;
        if (onError) onError(e);
        else if (onEnd) onEnd();
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      currentSpeechUtterance = null;
      window.__karthickActiveUtterance = null;
      if (onError) onError(err);
      else if (onEnd) onEnd();
    }
  }, 40);
}

/**
 * Stop any current speech synthesis immediately
 */
export function stopSpeaking() {
  if (speechTimeoutId) {
    clearTimeout(speechTimeoutId);
    speechTimeoutId = null;
  }

  if (typeof window !== 'undefined' && window.speechSynthesis) {
    try {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
      }
      window.speechSynthesis.cancel();
    } catch {
      // ignore
    }
    currentSpeechUtterance = null;
    window.__karthickActiveUtterance = null;
  }
}
