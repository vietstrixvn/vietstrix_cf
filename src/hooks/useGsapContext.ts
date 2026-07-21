'use client';

import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * useGsapContext
 *
 * Registers ScrollTrigger once, creates a scoped gsap.context tied to
 * the returned ref, runs your animation callback, and auto-reverts on
 * unmount. Replaces the boilerplate repeated in every section file:
 *
 *   gsap.registerPlugin(ScrollTrigger)
 *   const ctx = gsap.context(() => { ... }, ref)
 *   return () => ctx.revert()
 *
 * @param callback  Function that receives the scoped gsap context. Define
 *                  all tweens / ScrollTriggers here. May return a cleanup fn.
 * @param deps      Re-run the animation when these values change (default []).
 * @returns         A ref to attach to the root element of the section.
 *
 * @example
 *   const ref = useGsapContext((ctx) => {
 *     ctx.add(() => {
 *       gsap.fromTo('.card', { opacity: 0 }, { opacity: 1, scrollTrigger: { ... } });
 *     });
 *   }, [locale]);
 */
export function useGsapContext<T extends HTMLElement = HTMLDivElement>(
  callback: (ctx: gsap.Context) => void | (() => void),
  deps: React.DependencyList = []
): RefObject<T | null> {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !ref.current) return;

    // Safe to call multiple times — GSAP deduplicates plugin registration
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const cleanup = callback(ctx);
      if (typeof cleanup === 'function') {
        // Store cleanup so ctx.revert() picks it up
        ctx.add(() => cleanup);
      }
    }, ref);

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}
