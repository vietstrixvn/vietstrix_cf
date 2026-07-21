'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface ScrollFadeInOptions {
  /** CSS selector (scoped to root ref) or HTMLElement array to animate */
  targets: string | Element[];
  /** Trigger element — defaults to the root ref */
  trigger?: string | Element | null;
  /** ScrollTrigger start position (default: 'top 85%') */
  start?: string;
  /** Initial Y offset in px (default: 30) */
  fromY?: number;
  /** Stagger delay between items in seconds (default: 0.12) */
  stagger?: number;
  /** Animation duration in seconds (default: 0.7) */
  duration?: number;
  /** GSAP ease string (default: 'power3.out') */
  ease?: string;
  /** Only play once (default: true) */
  once?: boolean;
}

/**
 * useScrollFadeIn
 *
 * Handles the most common scroll animation pattern in this project:
 * fade-in + slide-up elements when they enter the viewport.
 *
 * Replaces repeated gsap.fromTo({ opacity:0, y:X }, { opacity:1, y:0, scrollTrigger })
 * blocks found in about-editorial, our-strength, starts, service sections.
 *
 * @example
 *   // Single call replaces a full useEffect in most sections
 *   const ref = useScrollFadeIn({ targets: '.card', stagger: 0.15 });
 *   return <div ref={ref}>...</div>
 */
export function useScrollFadeIn<T extends HTMLElement = HTMLDivElement>(
  options: ScrollFadeInOptions
): RefObject<T | null> {
  const {
    targets,
    trigger,
    start = 'top 85%',
    fromY = 30,
    stagger = 0.12,
    duration = 0.7,
    ease = 'power3.out',
    once = true,
  } = options;

  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    gsap.registerPlugin(ScrollTrigger);

    // Respect OS-level reduce motion preference
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const ctx = gsap.context(() => {
      const resolvedTrigger = trigger ?? ref.current;

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        targets,
        { opacity: 0, y: fromY },
        {
          opacity: 1,
          y: 0,
          duration,
          stagger,
          ease,
          scrollTrigger: {
            trigger: resolvedTrigger,
            start,
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        }
      );
    }, ref);

    return () => ctx.revert();
  }, [targets, trigger, start, fromY, stagger, duration, ease, once]);

  return ref;
}
