import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';

export default function Preloader({ onComplete }) {
  const canvasRef = useRef(null);
  const rootRef = useRef(null);
  const subRef = useRef(null);
  const fillRef = useRef(null);
  const flashRef = useRef(null);
  const ring1Ref = useRef(null);
  const ring2Ref = useRef(null);

  const [hasStarted, setHasStarted] = useState(false);
  const [isGateHidden, setIsGateHidden] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Audio Context Ref
  const audioCtxRef = useRef(null);
  const masterGainRef = useRef(null);
  const droneRef = useRef(null);
  const isMutedRef = useRef(false);
  const animFrameRef = useRef(null);

  // Initialize Audio
  const initAudio = () => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ac = new AudioCtx();
      const master = ac.createGain();
      master.gain.value = isMutedRef.current ? 0 : 0.6;
      master.connect(ac.destination);
      audioCtxRef.current = ac;
      masterGainRef.current = master;
    } catch {
      audioCtxRef.current = null;
    }
  };

  const startDrone = () => {
    const ac = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ac || !master) return;

    try {
      const f = ac.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 180;
      f.Q.value = 6;

      const g = ac.createGain();
      g.gain.value = 0;
      g.gain.linearRampToValueAtTime(0.16, ac.currentTime + 0.8);

      const o1 = ac.createOscillator();
      o1.type = 'sawtooth';
      o1.frequency.value = 55;

      const o2 = ac.createOscillator();
      o2.type = 'square';
      o2.frequency.value = 82.5;
      o2.detune.value = 7;

      const lfo = ac.createOscillator();
      lfo.frequency.value = 5;
      const lg = ac.createGain();
      lg.gain.value = 30;
      lfo.connect(lg);
      lg.connect(f.detune);

      o1.connect(f);
      o2.connect(f);
      f.connect(g);
      g.connect(master);

      o1.start();
      o2.start();
      lfo.start();
      droneRef.current = { o1, o2, lfo, f, g };
    } catch {
      // Audio fallback silent
    }
  };

  const droneSet = (e) => {
    const ac = audioCtxRef.current;
    const drone = droneRef.current;
    if (!ac || !drone) return;
    try {
      const t = ac.currentTime;
      drone.o1.frequency.setTargetAtTime(55 + e * 110, t, 0.1);
      drone.o2.frequency.setTargetAtTime(82.5 + e * 165, t, 0.1);
      drone.f.frequency.setTargetAtTime(180 + e * 3800, t, 0.1);
    } catch {
      // Audio fallback
    }
  };

  const stopDrone = () => {
    const ac = audioCtxRef.current;
    const drone = droneRef.current;
    if (!ac || !drone) return;
    try {
      const t = ac.currentTime;
      drone.g.gain.cancelScheduledValues(t);
      drone.g.gain.setTargetAtTime(0, t, 0.2);
      setTimeout(() => {
        try {
          drone.o1.stop();
          drone.o2.stop();
          drone.lfo.stop();
        } catch {
          // Ignore
        }
      }, 1200);
      droneRef.current = null;
    } catch {
      // Audio fallback
    }
  };

  const tick = (fr) => {
    const ac = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ac || !master) return;
    try {
      const t = ac.currentTime;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = 'square';
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.06);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.07);
    } catch {
      // Audio fallback
    }
  };

  const whoosh = () => {
    const ac = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ac || !master) return;
    try {
      const t = ac.currentTime;
      const len = Math.floor(ac.sampleRate * 1.4);
      const b = ac.createBuffer(1, len, ac.sampleRate);
      const d = b.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;

      const s = ac.createBufferSource();
      s.buffer = b;
      const bp = ac.createBiquadFilter();
      bp.type = 'bandpass';
      bp.Q.value = 1.2;
      bp.frequency.setValueAtTime(200, t);
      bp.frequency.exponentialRampToValueAtTime(7000, t + 0.9);

      const g = ac.createGain();
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(0.7, t + 0.7);
      g.gain.exponentialRampToValueAtTime(0.001, t + 1.4);

      s.connect(bp);
      bp.connect(g);
      g.connect(master);
      s.start(t);

      const o = ac.createOscillator();
      const og = ac.createGain();
      o.type = 'sine';
      o.frequency.setValueAtTime(70, t);
      o.frequency.exponentialRampToValueAtTime(30, t + 0.9);
      og.gain.setValueAtTime(0.5, t + 0.5);
      og.gain.exponentialRampToValueAtTime(0.001, t + 1.3);
      o.connect(og);
      og.connect(master);
      o.start(t + 0.5);
      o.stop(t + 1.4);
    } catch {
      // Audio fallback
    }
  };

  const chime = () => {
    const ac = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ac || !master) return;
    try {
      const t = ac.currentTime + 0.05;
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((fr, i) => {
        const o = ac.createOscillator();
        const g = ac.createGain();
        const s = t + i * 0.09;
        o.type = 'triangle';
        o.frequency.value = fr;
        g.gain.setValueAtTime(0.001, s);
        g.gain.exponentialRampToValueAtTime(0.16, s + 0.02);
        g.gain.exponentialRampToValueAtTime(0.001, s + 1.6);
        o.connect(g);
        g.connect(master);
        o.start(s);
        o.stop(s + 1.7);
      });
    } catch {
      // Audio fallback
    }
  };

  const pluck = (fr) => {
    const ac = audioCtxRef.current;
    const master = masterGainRef.current;
    if (!ac || !master) return;
    try {
      const t = ac.currentTime;
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = 'triangle';
      o.frequency.value = fr;
      g.gain.setValueAtTime(0.001, t);
      g.gain.exponentialRampToValueAtTime(0.18, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, t + 0.7);
      o.connect(g);
      g.connect(master);
      o.start(t);
      o.stop(t + 0.75);
    } catch {
      // Audio fallback
    }
  };

  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    isMutedRef.current = next;
    if (masterGainRef.current && audioCtxRef.current) {
      masterGainRef.current.gain.setTargetAtTime(next ? 0 : 0.6, audioCtxRef.current.currentTime, 0.05);
    }
  };

  const handleSkip = () => {
    stopDrone();
    if (audioCtxRef.current) {
      try { audioCtxRef.current.close(); } catch { /* ignore */ }
    }
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
    }
    if (rootRef.current) {
      rootRef.current.classList.add('done');
    }
    setTimeout(() => {
      onComplete();
    }, 300);
  };

  const pulseRings = () => {
    if (ring1Ref.current && ring2Ref.current) {
      ring1Ref.current.classList.remove('go');
      ring2Ref.current.classList.remove('go');
      void ring1Ref.current.offsetWidth;
      ring1Ref.current.classList.add('go');
      ring2Ref.current.classList.add('go');
    }
  };

  // Three.js Scene Setup & Life-Cycle
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    } catch {
      onComplete();
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x06030d, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 300);

    let camDist = 11;
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      camDist = Math.max(11, 14.5 / (1.03 * camera.aspect));
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    let mx = 0;
    let my = 0;
    const handleMouseMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener('mousemove', handleMouseMove);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // Background Stars Field
    const bs = new Float32Array(1800 * 3);
    for (let i = 0; i < 1800; i++) {
      const r = 40 + Math.random() * 80;
      const a = Math.random() * 6.283;
      const b = Math.acos(2 * Math.random() - 1);
      bs[i * 3] = r * Math.sin(b) * Math.cos(a);
      bs[i * 3 + 1] = r * Math.sin(b) * Math.sin(a);
      bs[i * 3 + 2] = r * Math.cos(b);
    }
    const bg = new THREE.BufferGeometry();
    bg.setAttribute('position', new THREE.BufferAttribute(bs, 3));
    const stars = new THREE.Points(
      bg,
      new THREE.PointsMaterial({ color: 0xc4b5fd, size: 0.35, transparent: true, opacity: 0.7 })
    );
    scene.add(stars);

    // Uniforms & Shaders
    const U = {
      uTime: { value: 0 },
      uStage: { value: 0 },
      uSwirl: { value: 1 },
      uExplode: { value: 0 },
      uSize: { value: window.innerWidth < 768 ? 3.2 : 2.6 },
      uPR: { value: Math.min(window.devicePixelRatio || 1, 2) },
      uTint: { value: new THREE.Vector3(0.55, 0.36, 0.96) }
    };

    const VS = `
attribute vec3 aStart;
attribute vec3 aA;
attribute vec3 aB;
attribute vec3 aC;
attribute vec3 aD;
attribute vec3 aName;
attribute float aSeed;
uniform float uTime, uStage, uSwirl, uExplode, uSize, uPR;
uniform vec3 uTint;
varying vec3 vC;

float mk(float k, float s) {
  float m = clamp((uStage - k) * 1.5 - s * 0.5, 0.0, 1.0);
  return m * m * (3.0 - 2.0 * m);
}

void main() {
  float r = length(aStart.xz);
  float an = uTime * (0.35 + 1.4 / (r * 0.35 + 0.7)) * uSwirl;
  float c = cos(an);
  float s = sin(an);
  vec3 g = vec3(aStart.x * c - aStart.z * s, aStart.y + sin(uTime * 2.0 + aSeed * 20.0) * 0.08, aStart.x * s + aStart.z * c);
  float tl = 1.05;
  g = vec3(g.x, g.y * cos(tl) - g.z * sin(tl), g.y * sin(tl) + g.z * cos(tl));
  float m0 = mk(0.0, aSeed);
  float m1 = mk(1.0, aSeed);
  float m2 = mk(2.0, aSeed);
  float m3 = mk(3.0, aSeed);
  float m4 = mk(4.0, aSeed);
  vec3 p = mix(g, aA, m0);
  p = mix(p, aB, m1);
  p = mix(p, aC, m2);
  p = mix(p, aD, m3);
  float tb = m0 * (1.0 - m0) + m1 * (1.0 - m1) + m2 * (1.0 - m2) + m3 * (1.0 - m3);
  p += vec3(sin(aSeed * 40.0 + uTime * 2.0), cos(aSeed * 30.0 + uTime * 2.0), sin(aSeed * 20.0 + uTime)) * tb * 6.0;
  float w = smoothstep(0.0, 1.0, uStage) * (1.0 - clamp(uStage - 4.0, 0.0, 1.0));
  float ra = uTime * 0.9 * w;
  float rc = cos(ra);
  float rs = sin(ra);
  p = vec3(p.x * rc - p.z * rs, p.y, p.x * rs + p.z * rc);
  p = mix(p, aName, m4);
  p += vec3(sin(aSeed * 40.0 + uTime * 2.0), cos(aSeed * 30.0 + uTime * 2.0), sin(aSeed * 20.0)) * m4 * (1.0 - m4) * 6.0;
  p += vec3(sin(uTime * 3.0 + aSeed * 50.0), cos(uTime * 2.5 + aSeed * 70.0), sin(uTime * 2.0 + aSeed * 30.0)) * 0.02;
  float ex = uExplode * uExplode;
  p.xy *= 1.0 + ex * 2.5;
  p.z += ex * 45.0 * (0.4 + aSeed);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * uPR * (0.6 + aSeed * 1.1) * (10.0 / -mv.z);
  vec3 a = vec3(0.55, 0.36, 0.96);
  vec3 b = vec3(0.78, 0.62, 1.0);
  vec3 d = vec3(0.95, 0.45, 0.95);
  vec3 e = vec3(0.4, 0.85, 1.0);
  vec3 col = aSeed < 0.55 ? mix(a, b, aSeed / 0.55) : (aSeed < 0.88 ? mix(b, d, (aSeed - 0.55) / 0.33) : e);
  vec3 base = mix(col, uTint * (0.75 + 0.5 * aSeed), 0.6);
  vC = mix(base, vec3(0.93, 0.88, 1.0), m4 * 0.5);
}
    `;

    const FS = `
varying vec3 vC;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float a = pow(smoothstep(0.5, 0.0, d), 1.6);
  gl_FragColor = vec4(vC * 1.4, a);
}
    `;

    // Tech Shapes Helpers
    const rs = () => {
      const u = Math.random() * 2 - 1;
      const t = Math.random() * 6.283;
      const s = Math.sqrt(1 - u * u);
      return [s * Math.cos(t), u, s * Math.sin(t)];
    };
    const jt = () => (Math.random() - 0.5) * 0.07;
    const sp = (a, i, x, y, z) => {
      a[i * 3] = (x + jt()) * 1.25;
      a[i * 3 + 1] = (y + jt()) * 1.25;
      a[i * 3 + 2] = (z + jt()) * 1.25;
    };

    const react = (a, N) => {
      for (let i = 0; i < N; i++) {
        let x, y, z;
        if (Math.random() < 0.09) {
          const v = rs();
          const rr = Math.sqrt(Math.random()) * 0.6;
          x = v[0] * rr;
          y = v[1] * rr;
          z = v[2] * rr;
        } else {
          const k = Math.floor(Math.random() * 3);
          const th = Math.random() * 6.283;
          const ex = 3.9 * Math.cos(th);
          const ey = 1.45 * Math.sin(th);
          const ag = k * 1.0472 + 0.35;
          x = ex * Math.cos(ag) - ey * Math.sin(ag);
          y = ex * Math.sin(ag) + ey * Math.cos(ag);
          z = Math.sin(th * 2 + k) * 0.5;
        }
        sp(a, i, x, y, z);
      }
    };

    const dbase = (a, N) => {
      const ty = 0.4;
      const c = Math.cos(ty);
      const s = Math.sin(ty);
      for (let i = 0; i < N; i++) {
        const q = Math.random();
        const th = Math.random() * 6.283;
        let x, y, z;
        if (q < 0.5) {
          y = -2.4 + Math.floor(Math.random() * 4) * 1.6;
          x = Math.cos(th) * 2.3;
          z = Math.sin(th) * 2.3;
        } else if (q < 0.88) {
          y = -2.4 + Math.random() * 4.8;
          x = Math.cos(th) * 2.3;
          z = Math.sin(th) * 2.3;
        } else {
          const rr = Math.sqrt(Math.random()) * 2.3;
          y = 2.4;
          x = Math.cos(th) * rr;
          z = Math.sin(th) * rr;
        }
        sp(a, i, x, y * c - z * s, y * s + z * c);
      }
    };

    const CL = [
      [-2.3, -0.5, 1.3],
      [-0.7, 0.5, 1.9],
      [1.4, 0.1, 1.6],
      [2.8, -0.6, 1.1]
    ];

    const cloud = (a, N) => {
      for (let i = 0; i < N; i++) {
        let x = 0, y = 0, z = 0, ok = false, tr = 0;
        while (!ok && tr++ < 30) {
          const c = CL[Math.floor(Math.random() * 4)];
          const v = rs();
          x = c[0] + v[0] * c[2];
          y = c[1] + v[1] * c[2];
          z = v[2] * c[2] * 0.7;
          ok = y > -1.7;
          for (let j = 0; j < 4 && ok; j++) {
            const d = CL[j];
            if (d !== c) {
              const dx = x - d[0];
              const dy = y - d[1];
              const dz = z / 0.7;
              if (dx * dx + dy * dy + dz * dz < d[2] * d[2] * 0.97) ok = false;
            }
          }
        }
        if (Math.random() < 0.1) {
          x = -3.4 + Math.random() * 7.2;
          y = -1.7;
          z = (Math.random() - 0.5) * 1.2;
        }
        sp(a, i, x - 0.2, y + 0.2, z);
      }
    };

    const SG = [
      [-2.5, 1.9, -4.4, 0],
      [-4.4, 0, -2.5, -1.9],
      [1, 2.3, -1, -2.3],
      [2.5, 1.9, 4.4, 0],
      [4.4, 0, 2.5, -1.9]
    ];

    const code = (a, N) => {
      const L = SG.map((s) => Math.hypot(s[2] - s[0], s[3] - s[1]));
      const T = L.reduce((p, c) => p + c, 0);
      for (let i = 0; i < N; i++) {
        let q = Math.random() * T;
        let k = 0;
        while (k < 4 && q > L[k]) {
          q -= L[k];
          k++;
        }
        const s = SG[k];
        const t = Math.min(q / L[k], 1);
        const v = rs();
        const r = Math.random() * 0.3;
        sp(a, i, s[0] + (s[2] - s[0]) * t + v[0] * r, s[1] + (s[3] - s[1]) * t + v[1] * r, v[2] * r);
      }
    };

    let pts = null;
    const buildParticles = () => {
      const W = 1500;
      const H = 320;
      const cv = document.createElement('canvas');
      cv.width = W;
      cv.height = H;
      const x = cv.getContext('2d');
      x.fillStyle = '#fff';
      x.textAlign = 'center';
      x.textBaseline = 'middle';
      x.font = '400 270px "Bebas Neue", Impact, sans-serif';
      if ('letterSpacing' in x) x.letterSpacing = '16px';
      x.fillText('KARTHICK', W / 2, H / 2 + 10);

      const d = x.getImageData(0, 0, W, H).data;
      const T = [];
      for (let py = 0; py < H; py += 3) {
        for (let px = 0; px < W; px += 3) {
          if (d[(py * W + px) * 4 + 3] > 140) T.push([px, py]);
        }
      }

      const N = Math.max(T.length, 11000);
      const k = 14.5 / W;
      const st = new Float32Array(N * 3);
      const A = new Float32Array(N * 3);
      const B = new Float32Array(N * 3);
      const C = new Float32Array(N * 3);
      const D = new Float32Array(N * 3);
      const tg = new Float32Array(N * 3);
      const sd = new Float32Array(N);

      react(A, N);
      dbase(B, N);
      cloud(C, N);
      code(D, N);

      for (let i = 0; i < N; i++) {
        const t = T[i < T.length ? i : Math.floor(Math.random() * T.length)];
        tg[i * 3] = (t[0] - W / 2) * k + (Math.random() - 0.5) * 0.03;
        tg[i * 3 + 1] = -(t[1] - H / 2) * k + 1.0;
        tg[i * 3 + 2] = (Math.random() - 0.5) * 0.35;

        const rr = Math.pow(Math.random(), 1.6) * 10 + 0.15;
        const arm = Math.floor(Math.random() * 3) * 2.0944;
        const ang = arm + rr * 0.85 + (Math.random() - 0.5) * (0.5 + rr * 0.07);
        st[i * 3] = Math.cos(ang) * rr;
        st[i * 3 + 2] = Math.sin(ang) * rr;
        st[i * 3 + 1] = (Math.random() - 0.5) * 0.9 * Math.exp(-rr * 0.25);
        sd[i] = Math.random();
      }

      const g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.BufferAttribute(st, 3));
      [
        ['aStart', st],
        ['aA', A],
        ['aB', B],
        ['aC', C],
        ['aD', D],
        ['aName', tg]
      ].forEach((o) => {
        g.setAttribute(o[0], new THREE.BufferAttribute(o[1], 3));
      });
      g.setAttribute('aSeed', new THREE.BufferAttribute(sd, 1));

      pts = new THREE.Points(
        g,
        new THREE.ShaderMaterial({
          uniforms: U,
          vertexShader: VS,
          fragmentShader: FS,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending
        })
      );
      pts.frustumCulled = false;
      scene.add(pts);
    };

    const readyPromise = Promise.race([
      document.fonts.load('400 270px "Bebas Neue"'),
      new Promise((r) => setTimeout(r, 2200))
    ])
      .catch(() => {})
      .then(buildParticles);

    // Animation Timeline Variables
    let phase = 'idle';
    let t0 = 0;
    let lastTick = 0;
    let fmt = [0, 0, 0, 0];
    const G = 1700;
    const SS = 1050;
    const TR = 700;
    const SEQ = G + 4 * SS;
    const PAL = [
      [0.55, 0.36, 0.96],
      [0.38, 0.85, 0.98],
      [0.7, 0.5, 1],
      [1, 0.55, 0.42],
      [0.35, 0.95, 0.6],
      [0.93, 0.88, 1]
    ];
    const NOTES = [440, 523.25, 659.25, 783.99];

    const ease = (p) => (p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

    const beginSequence = () => {
      const loader = rootRef.current;
      const sub = subRef.current;
      const fill = fillRef.current;
      const flash = flashRef.current;

      if (loader) loader.classList.remove('done', 'exit', 'morph', 'formed');
      if (sub) sub.classList.remove('show');

      U.uStage.value = 0;
      U.uExplode.value = 0;
      U.uSwirl.value = 1;
      if (flash) flash.style.opacity = '0';
      if (fill) fill.style.width = '0%';
      lastTick = 0;
      fmt = [0, 0, 0, 0];
      t0 = performance.now();
      phase = 'seq';
      startDrone();
    };

    // Expose sequence start to React state
    window.__pflStart = () => {
      readyPromise.then(beginSequence);
    };

    camera.position.set(0, 5, 16);

    const animate = (now) => {
      animFrameRef.current = requestAnimationFrame(animate);

      U.uTime.value = now * 0.001;
      stars.rotation.y = now * 0.00004;

      let stage = 0;
      const bx = 0;
      let by = 5;
      let bz = 16;

      const fill = fillRef.current;
      const loader = rootRef.current;
      const sub = subRef.current;
      const flash = flashRef.current;

      if (phase === 'seq') {
        const t = now - t0;
        const p = Math.min(t / SEQ, 1);
        const e = ease(p);

        if (fill) fill.style.width = `${p * 100}%`;
        droneSet(e);
        U.uSwirl.value = 1 + Math.min(t / G, 1) * 2;

        for (let k = 0; k < 4; k++) {
          const xx = Math.min(Math.max((t - G - k * SS) / TR, 0), 1);
          stage += xx;
          if (xx >= 1 && !fmt[k]) {
            fmt[k] = 1;
            pluck(NOTES[k]);
            pulseRings();
          }
        }

        const tk = Math.floor(p * 24);
        while (lastTick < tk) {
          lastTick++;
          tick(280 + lastTick * 30);
        }

        const e2 = ease(Math.min(t / (G + 500), 1));
        bz = 16 - (16 - camDist) * e2;
        by = 5 * (1 - e2);

        if (t >= SEQ) {
          phase = 'name';
          t0 = now;
          if (loader) loader.classList.add('morph');
          whoosh();
        }
      } else if (phase === 'name') {
        const f = Math.min((now - t0) / 2100, 1);
        stage = 4 + f;
        bz = camDist;
        by = 0;
        U.uSwirl.value = 3;

        if (f >= 1) {
          phase = 'hold';
          t0 = now;
          if (loader) loader.classList.add('formed');
          stopDrone();
          chime();
          if (sub) sub.classList.add('show');
          pulseRings();
        }
      } else if (phase === 'hold') {
        stage = 5;
        bz = camDist - ((now - t0) / 2600) * 1.2;
        by = 0;

        if (now - t0 > 2700) {
          phase = 'exit';
          t0 = now;
          if (loader) loader.classList.add('exit');
          whoosh();
        }
      } else if (phase === 'exit') {
        stage = 5;
        const q = Math.min((now - t0) / 1250, 1);
        U.uExplode.value = q;
        bz = camDist - 1.2 - q * 3;
        by = 0;

        if (flash) {
          flash.style.opacity = q > 0.5 ? `${Math.max(0, 1 - (q - 0.5) / 0.4) * 0.95}` : `${q * 0.3}`;
        }

        if (q > 0.55 && loader && !loader.classList.contains('done')) {
          loader.classList.add('done');
        }

        if (q >= 1) {
          phase = 'done';
          stopDrone();
          if (audioCtxRef.current) {
            try { audioCtxRef.current.close(); } catch { /* ignore */ }
          }
          onComplete();
          return;
        }
      } else if (phase === 'done') {
        return;
      }

      U.uStage.value = stage;
      const i2 = Math.min(Math.floor(stage), 4);
      let fr = stage - i2;
      fr = fr * fr * (3 - 2 * fr);
      U.uTint.value.set(
        PAL[i2][0] + (PAL[i2 + 1][0] - PAL[i2][0]) * fr,
        PAL[i2][1] + (PAL[i2 + 1][1] - PAL[i2][1]) * fr,
        PAL[i2][2] + (PAL[i2 + 1][2] - PAL[i2][2]) * fr
      );

      camera.position.x += (bx + mx * 1.6 - camera.position.x) * 0.06;
      camera.position.y += (by - my * 1.2 - camera.position.y) * 0.06;
      camera.position.z += (bz - camera.position.z) * 0.08;
      camera.lookAt(0, stage > 0 ? 0.4 : 0, 0);

      renderer.render(scene, camera);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
      stopDrone();
      if (audioCtxRef.current) {
        try { audioCtxRef.current.close(); } catch { /* ignore */ }
      }
      if (renderer) renderer.dispose();
      delete window.__pflStart;
    };
  }, [onComplete]);

  const handleStart = () => {
    initAudio();
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    setHasStarted(true);
    setIsGateHidden(true);
    if (window.__pflStart) {
      window.__pflStart();
    }
  };

  return (
    <div className="pfl-root" id="loader" ref={rootRef}>
      <canvas className="pfl-canvas" id="c" ref={canvasRef} />
      <div className="pfl-vig" />
      <div className="pfl-ring" ref={ring1Ref} />
      <div className="pfl-ring r2" ref={ring2Ref} />

      <div className="pfl-sub" id="sub" ref={subRef}>
        <div className="pfl-ln" />
        <div className="pfl-role" id="role">
          {'FULL STACK DEVELOPER'.split('').map((char, index) => (
            <span key={index} style={{ '--i': index }}>
              {char === ' ' ? '\u00A0' : char}
            </span>
          ))}
        </div>
        <div className="pfl-ln" />
      </div>

      <div className="pfl-bar" id="bar">
        <i id="fill" ref={fillRef} />
      </div>

      <div className="pfl-flash" id="flash" ref={flashRef} />

      {/* Futuristic Initial Gate with Pulsing Glowing Action Button */}
      {!hasStarted && (
        <div className={`pfl-gate ${isGateHidden ? 'hide' : ''}`} id="gate">
          <button
            className="pfl-enter"
            id="enter"
            onClick={handleStart}
            aria-label="Initialize Experience"
            title="Start Experience"
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 4l14 8-14 8z" />
            </svg>
          </button>
          <div className="pfl-gate-hint">CLICK TO INITIALIZE EXPERIENCE</div>
        </div>
      )}

      {/* Floating Modern Controls: Skip & Audio Controls */}
      <div className="pfl-ctl-group pfl-ctl-top">
        <button
          className="pfl-ctl"
          onClick={handleSkip}
          aria-label="Skip to Portfolio"
          title="Skip to Portfolio (Esc)"
        >
          <span>Skip</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div className="pfl-ctl-group pfl-ctl-bottom">
        <button
          className={`pfl-ctl circle ${isMuted ? 'off' : ''}`}
          id="mute"
          onClick={toggleMute}
          aria-label="Toggle Sound"
          title={isMuted ? 'Unmute Sound' : 'Mute Sound'}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 9v6h4l5 4V5L8 9z" />
            {!isMuted ? (
              <g className="w">
                <path d="M16.5 8.5a5 5 0 0 1 0 7" />
                <path d="M19 6a8.5 8.5 0 0 1 0 12" />
              </g>
            ) : (
              <g className="x">
                <path d="M17 9l5 6M22 9l-5 6" />
              </g>
            )}
          </svg>
        </button>
      </div>
    </div>
  );
}
