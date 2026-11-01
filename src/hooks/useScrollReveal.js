import { useEffect, useRef, useState } from 'react';

/**
 * useScrollReveal: Lightweight individual element scroll reveal hook.
 */
export function useScrollReveal(options = {}) {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const node = elementRef.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(node);
      }
    }, {
      threshold: options.threshold ?? 0.1,
      rootMargin: options.rootMargin ?? '0px 0px -40px 0px',
      ...options
    });

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, []);

  return [elementRef, isVisible];
}

/**
 * useSectionTransitions: Master hook that coordinates section entrance transitions,
 * subtle staggered reveals, and clean scroll offsets across the entire portfolio.
 */
export function useSectionTransitions() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const rootEl = document.documentElement;

    // Enable the reveal transitions in CSS
    rootEl.classList.add('js-reveal');

    // If reduced motion is requested or IntersectionObserver is not supported, reveal everything immediately
    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      document.querySelectorAll('.section-reveal').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          // Once revealed, unobserve to prevent repeated replaying on micro-scrolls
          observer.unobserve(entry.target);
        }
      });
    };

    // Use a comfortable trigger point: 8% visibility or 50px before entering bottom of viewport
    const observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.08,
      rootMargin: '0px 0px -50px 0px'
    });

    const revealTargets = document.querySelectorAll('.section-reveal');
    revealTargets.forEach((target) => {
      // Home / Hero or any element already in the visible viewport on load is revealed immediately
      const rect = target.getBoundingClientRect();
      if (target.id === 'home' || (rect.top >= 0 && rect.top < window.innerHeight * 0.85)) {
        target.classList.add('is-revealed');
      } else {
        observer.observe(target);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}
