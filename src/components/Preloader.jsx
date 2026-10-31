import React, { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { Sparkles } from 'lucide-react';

export default function Preloader({ onComplete }) {
  // Detect mobile vs desktop screen (threshold: 768px)
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile ? (
    <MobilePreloader onComplete={onComplete} />
  ) : (
    <DesktopPreloader onComplete={onComplete} />
  );
}

/* ==========================================================================
   DESKTOP PRELOADER — REFINED CINEMATIC 3D DEVELOPER EXPERIENCE (NO AUDIO)
   ========================================================================== */
function DesktopPreloader({ onComplete }) {
  const canvasContainerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [loadingMessage, setLoadingMessage] = useState('INITIALIZING EXPERIENCE');
  const [isExiting, setIsExiting] = useState(false);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  // Loading Progress & Milestone Messages Sequence (~3.1s total)
  useEffect(() => {
    let currentPercent = 0;
    const interval = setInterval(() => {
      const increment = currentPercent < 30 ? 4 : currentPercent < 75 ? 3 : 2;
      currentPercent = Math.min(currentPercent + increment, 100);
      setProgress(currentPercent);

      if (currentPercent < 28) {
        setLoadingMessage('INITIALIZING EXPERIENCE');
      } else if (currentPercent < 58) {
        setLoadingMessage('PREPARING INTERFACE');
      } else if (currentPercent < 88) {
        setLoadingMessage('LOADING COMPONENTS');
      } else if (currentPercent < 100) {
        setLoadingMessage('ALMOST READY');
      } else {
        setLoadingMessage('SYSTEM READY');
      }

      if (currentPercent >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onComplete();
          }, 650);
        }, 300);
      }
    }, 52);

    // Fallback safety timeout in case interval is blocked
    const fallbackSafety = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearInterval(interval);
      clearTimeout(fallbackSafety);
    };
  }, [onComplete]);

  // Three.js WebGL 3D Metallic "K" & Refined Atmospheric Scene
  useEffect(() => {
    const container = canvasContainerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    let scene;
    let camera;
    let kGeometry;
    let kMaterial;
    let edgeGeo;
    let edgeMat;
    let pGeo;
    let pMat;
    let pTexture;
    let animationFrameId;

    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });

      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      
      container.innerHTML = '';
      container.appendChild(renderer.domElement);

      // Scene & Camera (Distance set to keep K proportionate and elegant)
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(36, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 0.08, 6.0);

      // 1. Build Precision-Engineered 3D "K" Shape
      const kShape = new THREE.Shape();
      kShape.moveTo(-1.25, -1.8);
      kShape.lineTo(-1.25, 1.8);
      kShape.lineTo(-0.62, 1.8);
      kShape.lineTo(-0.62, 0.42);
      kShape.lineTo(0.72, 1.8);
      kShape.lineTo(1.48, 1.8);
      kShape.lineTo(0.18, 0.12);
      kShape.lineTo(1.52, -1.8);
      kShape.lineTo(0.78, -1.8);
      kShape.lineTo(-0.62, -0.32);
      kShape.lineTo(-0.62, -1.8);
      kShape.closePath();

      const extrudeSettings = {
        depth: 0.4,
        bevelEnabled: true,
        bevelSegments: 5,
        steps: 1,
        bevelSize: 0.045,
        bevelThickness: 0.065
      };

      kGeometry = new THREE.ExtrudeGeometry(kShape, extrudeSettings);
      kGeometry.center();

      // Luxury Metallic Material with Deep Violet Undertones & Reflections
      kMaterial = new THREE.MeshPhysicalMaterial({
        color: new THREE.Color('#1B0F33'),
        emissive: new THREE.Color('#110620'),
        emissiveIntensity: 0.2,
        metalness: 0.92,
        roughness: 0.16,
        clearcoat: 0.88,
        clearcoatRoughness: 0.12,
        reflectivity: 0.96
      });

      const kMesh = new THREE.Mesh(kGeometry, kMaterial);
      // Proportionate scale: balanced centerpiece with ample negative space
      kMesh.scale.set(0.48, 0.48, 0.48);

      // Sharp Edge Contour Lines (Violet Specular Gleam)
      edgeGeo = new THREE.EdgesGeometry(kGeometry, 26);
      edgeMat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#C084FC'),
        transparent: true,
        opacity: 0.38,
        blending: THREE.AdditiveBlending
      });
      const edgeLines = new THREE.LineSegments(edgeGeo, edgeMat);
      kMesh.add(edgeLines);

      // Initial cinematic tilt
      kMesh.rotation.y = prefersReducedMotion ? 0 : -0.52;
      kMesh.rotation.x = prefersReducedMotion ? 0 : 0.16;
      kMesh.position.y = 0.1;
      scene.add(kMesh);

      // 2. Cinematic Lighting Scheme
      const ambientLight = new THREE.AmbientLight(0x0c0717, 1.3);
      scene.add(ambientLight);

      // Key Directional Light (Electric Purple)
      const keyLight = new THREE.DirectionalLight('#8B5CF6', 4.5);
      keyLight.position.set(-3.5, 4.2, 5.0);
      scene.add(keyLight);

      // Rim Point Light (Light Violet specular highlight)
      const rimLight = new THREE.PointLight('#C4B5FD', 7.0, 18);
      rimLight.position.set(3.2, 2.0, -2.8);
      scene.add(rimLight);

      // Fill Light (Deep Purple)
      const fillLight = new THREE.PointLight('#6D28D9', 3.0, 14);
      fillLight.position.set(-2.2, -3.0, 3.2);
      scene.add(fillLight);

      // Moving Spotlight for specular sweep across the metallic face
      const spotLight = new THREE.SpotLight('#F5F3FF', 7.0, 20, Math.PI / 5, 0.45, 1.2);
      spotLight.position.set(0, 5, 4);
      spotLight.target = kMesh;
      scene.add(spotLight);

      // 3. Subtle Floating Atmospheric Micro-Particles (40 lightweight embers)
      const pCanvas = document.createElement('canvas');
      pCanvas.width = 64;
      pCanvas.height = 64;
      const pCtx = pCanvas.getContext('2d');
      const pGrad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      pGrad.addColorStop(0, 'rgba(255, 255, 255, 1)');
      pGrad.addColorStop(0.2, 'rgba(196, 181, 253, 0.85)');
      pGrad.addColorStop(0.5, 'rgba(139, 92, 246, 0.3)');
      pGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = pGrad;
      pCtx.fillRect(0, 0, 64, 64);
      pTexture = new THREE.CanvasTexture(pCanvas);

      const pCount = 40;
      pGeo = new THREE.BufferGeometry();
      const pPositions = new Float32Array(pCount * 3);
      const pYVels = new Float32Array(pCount);

      for (let i = 0; i < pCount; i++) {
        pPositions[i * 3] = (Math.random() - 0.5) * 11;
        pPositions[i * 3 + 1] = (Math.random() - 0.5) * 8;
        pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
        pYVels[i] = 0.0015 + Math.random() * 0.0025;
      }

      pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));
      pMat = new THREE.PointsMaterial({
        size: 0.1,
        map: pTexture,
        transparent: true,
        opacity: 0.5,
        blending: THREE.AdditiveBlending,
        depthWrite: false
      });
      const particles = new THREE.Points(pGeo, pMat);
      scene.add(particles);

      // 4. Animation Loop with Smooth Rotation
      const animStartTime = performance.now();
      const totalDuration = 3100;

      const renderLoop = (time) => {
        animationFrameId = requestAnimationFrame(renderLoop);

        const elapsed = time - animStartTime;
        const t = Math.min(elapsed / totalDuration, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        if (!prefersReducedMotion) {
          const targetRotY = -0.52 * (1 - ease) + Math.sin(time * 0.001) * 0.03;
          const targetRotX = 0.16 * (1 - ease) + Math.cos(time * 0.0008) * 0.02;
          kMesh.rotation.y = targetRotY;
          kMesh.rotation.x = targetRotX;

          camera.position.z = 6.0 - 0.25 * ease;
          spotLight.position.x = -2.5 + ease * 5.0 + Math.sin(time * 0.0015) * 0.4;

          const posAttr = pGeo.attributes.position;
          for (let i = 0; i < pCount; i++) {
            let y = posAttr.getY(i);
            y += pYVels[i];
            if (y > 4.2) y = -4.2;
            posAttr.setY(i, y);
          }
          posAttr.needsUpdate = true;
          particles.rotation.y = time * 0.0002;
        }

        renderer.render(scene, camera);
      };

      animationFrameId = requestAnimationFrame(renderLoop);
    } catch (err) {
      console.warn('WebGL or Three.js scene error:', err);
      setWebGlAvailable(false);
      return;
    }

    const handleWindowResize = () => {
      if (!container || !renderer || !camera) return;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleWindowResize);
      if (container && renderer && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      kGeometry?.dispose();
      kMaterial?.dispose();
      edgeGeo?.dispose();
      edgeMat?.dispose();
      pGeo?.dispose();
      pMat?.dispose();
      pTexture?.dispose();
      renderer?.dispose();
    };
  }, []);

  return (
    <div className={`cinematic-preloader-root ${isExiting ? 'fade-out' : ''}`}>
      {/* Background Cinematic Atmosphere */}
      <div className="cinematic-backdrop" aria-hidden="true">
        <div className="cinematic-ambient-radial"></div>
        <div className="cinematic-beam"></div>
        <div className="cinematic-anamorphic-streak"></div>
        <div className="cinematic-vignette"></div>
      </div>

      {/* Three.js 3D WebGL Canvas Layer or CSS 3D Metallic K Fallback */}
      {webGlAvailable ? (
        <div ref={canvasContainerRef} className="cinematic-canvas-stage" />
      ) : (
        <div className="cinematic-fallback-stage">
          <div className="cinematic-fallback-k">K</div>
        </div>
      )}

      {/* Minimal Cinematic Overlay Interface */}
      <div className="cinematic-ui-overlay">
        {/* Gradually Revealed Brand Identity */}
        <div className={`cinematic-brand-lockup ${progress > 18 ? 'revealed' : ''}`}>
          <h1 className="cinematic-brand-title">
            KARTHICK
          </h1>
          <p className="cinematic-brand-sub">FULL STACK DEVELOPER & DATA ANALYST</p>
        </div>

        {/* Minimal Animated Progress Indicator */}
        <div className="cinematic-progress-block">
          <div className="cinematic-progress-header">
            <span className="cinematic-step-message">{loadingMessage}</span>
            <span className="cinematic-percent-value">{progress}%</span>
          </div>
          <div className="cinematic-progress-track">
            <div
              className="cinematic-progress-fill"
              style={{ width: `${progress}%` }}
            >
              <div className="cinematic-progress-glow-head"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Final Cinematic Transition Light Flare */}
      <div className={`cinematic-reveal-flare ${isExiting ? 'flare-active' : ''}`}></div>
    </div>
  );
}

/* ==========================================================================
   MOBILE PRELOADER - VISUAL VIDEO ANIMATION (NO AUDIO)
   ========================================================================== */
function MobilePreloader({ onComplete }) {
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showPlayFallback, setShowPlayFallback] = useState(false);

  const handleFinish = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 600);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    const current = video.currentTime;
    const dur = video.duration;
    const percent = Math.min(Math.round((current / dur) * 100), 100);
    setProgress(percent);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        setShowPlayFallback(true);
      });
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        handleFinish();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Resilient safety timer: advance naturally if video hangs or autoplay is blocked on mobile
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 4000);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={`video-preloader-root ${isExiting ? 'fade-out' : ''}`}>
      <div className="preloader-bg-ambient"></div>

      <div className="preloader-stage">
        <div className="preloader-video-wrapper">
          <video
            ref={videoRef}
            src="/preloader.mp4"
            autoPlay
            muted
            defaultMuted
            playsInline
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleFinish}
            onError={() => handleFinish()}
            className="preloader-core-video"
          />

          {showPlayFallback && (
            <div className="preloader-autoplay-prompt">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowPlayFallback(false);
                  if (videoRef.current) {
                    videoRef.current.play();
                  }
                }}
                className="btn btn-primary prompt-play-btn"
              >
                <Sparkles size={16} />
                <span>Enter Site</span>
              </button>
            </div>
          )}
        </div>

        <div className="preloader-minimal-progress">
          <div
            className="minimal-progress-bar"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
