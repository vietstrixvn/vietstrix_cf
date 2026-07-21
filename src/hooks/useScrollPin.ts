'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollPinOptions {
  /**
   * Total scroll distance to keep the element pinned.
   * Use CSS-style strings: '+=200%' means 2x viewport height.
   * Default: '+=200%'
   */
  end?: string;
  /** ScrollTrigger start position. Default: 'top top' */
  start?: string;
  /** Scrub amount — true (sync), number (lag seconds), false (no scrub). Default: true */
  scrub?: boolean | number;
  /** Add spacing after the pinned element. Default: true */
  pinSpacing?: boolean;
  /** Callback fired on each ScrollTrigger update, receives progress 0–1 */
  onProgress?: (progress: number) => void;
  /**
   * Breakpoint to enable pinning (min-width in px).
   * Below this width, pin is skipped (useful for mobile-only disable).
   * Default: 1024 (lg breakpoint)
   */
  minWidth?: number;
  /**
   * Pre-allocate pin spacer before section reaches viewport.
   * Prevents the layout "snap" when pin activates — critical for
   * back-to-back pinned sections. Default: 1
   */
  anticipatePin?: number;
  /**
   * Snap to final state quickly when user flings trackpad/touch.
   * Reduces jank from slow interpolation through intermediate frames.
   * Default: true
   */
  fastScrollEnd?: boolean;
}

/**
 * useScrollPin
 *
 * Creates a GSAP ScrollTrigger pin for a section with optional progress
 * callback. Extracted from service-c.section and our-value.section where
 * the same pin+scrub pattern was duplicated.
 *
 * Auto-cleans up on unmount and uses gsap.matchMedia to disable on mobile.
 *
 * @example
 *   const pinRef = useScrollPin({
 *     end: '+=250%',
 *     onProgress: (p) => setActiveIndex(Math.min(Math.floor(p * 6), 5)),
 *   });
 *   return <div ref={pinRef} className="h-screen">...</div>;
 */
export function useScrollPin<T extends HTMLElement = HTMLDivElement>(
  options: ScrollPinOptions = {}
): RefObject<T | null> {
  const {
    end = '+=200%',
    start = 'top top',
    scrub = true,
    pinSpacing = true,
    onProgress,
    minWidth = 1024,
    anticipatePin = 1,
    fastScrollEnd = true,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add(`(min-width: ${minWidth}px)`, () => {
      const el = ref.current;
      if (!el) return;

      const trigger = ScrollTrigger.create({
        trigger: el,
        start,
        end,
        pin: true,
        pinSpacing,
        scrub,
        anticipatePin,
        fastScrollEnd,
        ...(onProgress
          ? {
              onUpdate: (self) => onProgress(self.progress),
            }
          : {}),
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [end, start, scrub, pinSpacing, onProgress, minWidth, anticipatePin, fastScrollEnd]);

  return ref;
}
