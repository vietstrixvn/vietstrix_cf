'use client';

import { useEffect, useRef, RefObject, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface CounterItem {
  value: number;
  /** Selector to find the counter text node within each card. Default: '.counter-value' */
  selector?: string;
}

export interface UseCounterAnimationOptions {
  /** Data array — one entry per card ref */
  items: CounterItem[];
  /** Card ref elements to animate in on scroll */
  cardElements: (HTMLElement | null)[];
  /** Optional bottom section element to fade in after cards */
  bottomElement?: HTMLElement | null;
  /** ScrollTrigger start. Default: 'top 80%' */
  start?: string;
  /** Counter animation duration in seconds. Default: 2 */
  duration?: number;
  /** RAF throttle interval in ms — lower = smoother but more CPU. Default: 33 (~30fps) */
  throttleMs?: number;
}

/**
 * useCounterAnimation
 *
 * Scroll-triggered counter animation extracted from starts.section.tsx.
 * Handles:
 *   1. Cards fade-in + slide-up on scroll (batch, with stagger)
 *   2. RAF-throttled number counters per card
 *   3. Bottom CTA section fade-in
 *   4. Reduced-motion: skips animation, sets final values instantly
 *   5. Full cleanup on unmount
 *
 * @example
 *   const containerRef = useCounterAnimation({
 *     items: statsData.map(s => ({ value: s.value })),
 *     cardElements: cardRefs.current,
 *     bottomElement: bottomRef.current,
 *   });
 */
export function useCounterAnimation(
  options: UseCounterAnimationOptions,
  deps: React.DependencyList = []
): RefObject<HTMLDivElement | null> {
  const {
    items,
    cardElements,
    bottomElement,
    start = 'top 80%',
    duration = 2,
    throttleMs = 33,
  } = options;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const tweenRefs = useRef<gsap.core.Tween[]>([]);

  const createCounter = useCallback(
    (element: Element, target: number, delay: number) => {
      const counterObj = { val: 0 };
      let rafId: number;
      let lastUpdate = 0;

      return gsap.to(counterObj, {
        val: target,
        duration,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start,
          once: true,
        },
        onUpdate() {
          const now = performance.now();
          if (now - lastUpdate > throttleMs) {
            if (rafId) cancelAnimationFrame(rafId);
            rafId = requestAnimationFrame(() => {
              element.textContent = String(Math.floor(counterObj.val));
            });
            lastUpdate = now;
          }
        },
        onComplete() {
          if (rafId) cancelAnimationFrame(rafId);
          element.textContent = String(target);
        },
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [duration, start, throttleMs]
  );

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const allCards = cardElements.filter(Boolean) as HTMLElement[];
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      gsap.set(allCards, { opacity: 1, y: 0 });
      if (bottomElement) gsap.set(bottomElement, { opacity: 1, y: 0 });
      allCards.forEach((card, i) => {
        const counterEl = card.querySelector(items[i]?.selector ?? '.counter-value');
        if (counterEl) counterEl.textContent = String(items[i]?.value ?? 0);
      });
      return;
    }

    const ctx = gsap.context(() => {
      // Cards batch entrance
      gsap.fromTo(
        allCards,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: { trigger: containerRef.current, start, once: true },
        }
      );

      // Counters
      allCards.forEach((card, i) => {
        const counterEl = card.querySelector(items[i]?.selector ?? '.counter-value');
        if (counterEl && items[i]) {
          const tween = createCounter(counterEl, items[i].value, i * 0.1 + 0.2);
          tweenRefs.current[i] = tween;
        }
      });

      // Bottom section
      if (bottomElement) {
        gsap.fromTo(
          bottomElement,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: { trigger: containerRef.current, start, once: true },
          }
        );
      }
    }, containerRef);

    return () => {
      tweenRefs.current.forEach((t) => t?.kill());
      tweenRefs.current = [];
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardElements, bottomElement, ...deps]);

  return containerRef;
}
