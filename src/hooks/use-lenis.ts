"use client";

import { useEffect, useRef, useCallback } from "react";
import Lenis from "@studio-freight/lenis";

interface LenisConfig {
  wrapper?: HTMLElement | Window;
  content?: HTMLElement;
  duration?: number;
  easing?: (t: number) => number;
  orientation?: 'vertical' | 'horizontal';
  gestureOrientation?: 'vertical' | 'horizontal';
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

interface UseLenisReturn {
  lenis: Lenis | null;
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number; immediate?: boolean }) => void;
}

export default function useLenis(config?: LenisConfig): UseLenisReturn {
  const lenisRef = useRef<Lenis | null>(null);

  const scrollTo = useCallback((
    target: string | number | HTMLElement,
    options?: { offset?: number; duration?: number; immediate?: boolean }
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
    }
  }, []);

  useEffect(() => {
    try {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        ...config, 
      });

      const raf = (time: number) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
          requestAnimationFrame(raf);
        }
      };

      requestAnimationFrame(raf);

      const handleVisibilityChange = () => {
        if (document.hidden) {
          lenisRef.current?.destroy();
        } else {
          lenisRef.current = new Lenis(config);
        }
      };

      document.addEventListener('visibilitychange', handleVisibilityChange);

      return () => {
        document.removeEventListener('visibilitychange', handleVisibilityChange);
        lenisRef.current?.destroy();
        lenisRef.current = null;
      };
    } catch (error) {
      console.error('Error initializing Lenis:', error);
      return () => {}; 
    }
  }, [config]); 
  return {
    lenis: lenisRef.current,
    scrollTo,
  };
}