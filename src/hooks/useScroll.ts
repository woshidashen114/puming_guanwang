import { useEffect, useRef, useState } from 'react';

/** Global scroll progress (0 → 1) across the entire document. */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return progress;
}

/**
 * Lerp-smoothed scroll progress. Chases the real scroll value with easing
 * for buttery 3D motion. Returns the smoothed value plus a ref to the raw
 * target so callers can read the latest target without re-render thrash.
 */
export function useSmoothScrollProgress() {
  const [smooth, setSmooth] = useState(0);
  const targetRef = useRef(0);
  const rafRef = useRef(0);
  const currentRef = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      targetRef.current = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    const tick = () => {
      const target = targetRef.current;
      const current = currentRef.current;
      const next = current + (target - current) * 0.08;
      currentRef.current = next;
      setSmooth(next);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return smooth;
}

/**
 * Returns a 0 → 1 progress value representing how far the target element
 * has travelled through the viewport. 0 when it enters at the bottom, 1 when
 * it exits at the top.
 */
export function useElementProgress<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = rect.height + vh;
        const passed = vh - rect.top;
        const p = total > 0 ? Math.min(1, Math.max(0, passed / total)) : 0;
        setProgress(p);
      });
    };

    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      cancelAnimationFrame(raf);
    };
  }, []);

  return { ref, progress };
}

/** Clamp + linear-remap helper. */
export function remap(value: number, inMin: number, inMax: number, outMin: number, outMax: number) {
  const t = Math.min(1, Math.max(0, (value - inMin) / (inMax - inMin)));
  return outMin + t * (outMax - outMin);
}
