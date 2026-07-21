'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollTimelineOptions {
  /** ScrollTrigger start. Default: 'top 75%' */
  start?: string;
  /** ScrollTrigger end. Default: 'bottom 25%' */
  end?: string;
  /** toggleActions string. Default: 'play none none reverse' */
  toggleActions?: string;
  /** Pin the section while timeline plays. Default: false */
  pin?: boolean;
  /** Scrub amount. Default: false */
  scrub?: boolean | number;
}

/**
 * useGsapTimeline
 *
 * Creates a scoped GSAP timeline bound to a ScrollTrigger on the returned ref.
 * The callback receives the timeline so you can chain .to()/.from()/.fromTo()
 * calls without manually setting up registerPlugin / ctx / cleanup every time.
 *
 * Useful for sequenced multi-step animations (e.g. about-editorial: problem
 * text fades in, then solution text overlaps by -0.4s).
 *
 * @example
 *   const ref = useGsapTimeline(
 *     (tl) => {
 *       tl.to(problemRef.current, { opacity: 1, y: 0, duration: 0.8 });
 *       tl.to(solutionRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
 *     },
 *     { start: 'top 75%', end: 'bottom 25%', toggleActions: 'play none none reverse' },
 *     [locale]
 *   );
 */
export function useGsapTimeline<T extends HTMLElement = HTMLElement>(
  callback: (tl: gsap.core.Timeline) => void,
  options: ScrollTimelineOptions = {},
  deps: React.DependencyList = []
): RefObject<T | null> {
  const {
    start = 'top 75%',
    end = 'bottom 25%',
    toggleActions = 'play none none reverse',
    pin = false,
    scrub = false,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start,
          end,
          toggleActions: pin || scrub ? undefined : toggleActions,
          pin: pin || undefined,
          scrub: scrub || undefined,
          anticipatePin: pin ? 1 : undefined,
          fastScrollEnd: pin ? true : undefined,
        },
      });

      callback(tl);
    }, ref);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
