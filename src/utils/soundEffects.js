/**
 * Karthick Portfolio - Interactive Sound Effects Engine
 * Synthesized using Web Audio API (Zero external audio file dependencies).
 * Features short, subtle, professional auditory feedback with global ON/OFF control.
 */

let audioCtx = null;
const STORAGE_KEY = 'karthick_portfolio_sound_enabled';

// Initialize state from localStorage (default: enabled)
let soundEnabled = (() => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved !== null ? saved === 'true' : true;
  } catch (e) {
    return true;
  }
})();

// Listeners for sound state change
const listeners = new Set();

export function isSoundEnabled() {
  return soundEnabled;
}

export function setSoundEnabled(enabled) {
  soundEnabled = Boolean(enabled);
  try {
    localStorage.setItem(STORAGE_KEY, String(soundEnabled));
  } catch (e) {}

  listeners.forEach((fn) => {
    try {
      fn(soundEnabled);
    } catch (e) {}
  });
}

export function toggleSound() {
  setSoundEnabled(!soundEnabled);
  if (soundEnabled) {
    playSound('success');
  }
  return soundEnabled;
}

export function subscribeSoundChange(callback) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

/**
 * Play a synthesized sound effect.
 * @param {'click' | 'nav' | 'modalOpen' | 'modalClose' | 'success' | 'alert' | 'copy' | 'externalPrompt' | 'toast'} type
 */
export function playSound(type = 'click') {
  if (!soundEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    switch (type) {
      case 'click': {
        // Ultra-short, soft tactile click (12ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(320, now + 0.012);

        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.015);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.018);
        break;
      }

      case 'nav': {
        // Soft airy navigation transition (60ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.05); // E5

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.035, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.07);
        break;
      }

      case 'modalOpen': {
        // Futuristic ascending harmonic sweep (160ms)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(440, now);
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.08);
        osc1.frequency.exponentialRampToValueAtTime(880, now + 0.16);

        osc2.frequency.setValueAtTime(220, now);
        osc2.frequency.exponentialRampToValueAtTime(440, now + 0.16);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.2);
        osc2.stop(now + 0.2);
        break;
      }

      case 'modalClose': {
        // Gentle descending tone (110ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(329.63, now + 0.1);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.11);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.12);
        break;
      }

      case 'success': {
        // Bright dual-tone confirmation chime (200ms)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'sine';

        osc1.frequency.setValueAtTime(587.33, now); // D5
        osc1.frequency.setValueAtTime(880, now + 0.08); // A5

        osc2.frequency.setValueAtTime(293.66, now);
        osc2.frequency.setValueAtTime(440, now + 0.08);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.065, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.07, now + 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.24);
        osc2.stop(now + 0.24);
        break;
      }

      case 'alert':
      case 'warning': {
        // Gentle attention ping (140ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(466.16, now); // Bb4
        osc.frequency.exponentialRampToValueAtTime(415.3, now + 0.12);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
        break;
      }

      case 'copy': {
        // Crisp high-frequency metallic ping (70ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.5, now); // C6
        osc.frequency.exponentialRampToValueAtTime(1318.5, now + 0.04); // E6

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.045, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.08);
        break;
      }

      case 'externalPrompt': {
        // Cyber inquiry tone (harmonic interval) (130ms)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = 'sine';
        osc2.type = 'triangle';

        osc1.frequency.setValueAtTime(493.88, now); // B4
        osc1.frequency.exponentialRampToValueAtTime(659.25, now + 0.07); // E5

        osc2.frequency.setValueAtTime(246.94, now);
        osc2.frequency.exponentialRampToValueAtTime(329.63, now + 0.07);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + 0.15);
        osc2.stop(now + 0.15);
        break;
      }

      case 'toast': {
        // Soft bubble pop chime (80ms)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(659.25, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.04, now + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
        break;
      }

      default:
        break;
    }
  } catch (err) {
    // Non-blocking fallback
  }
}
