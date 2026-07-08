'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturesBadge } from '../customs/badge.custom';

// Design Tokens
const ANIMATION_TIMING = {
  descriptionEnter: 1,
  descriptionExit: 1,
  containerEnter: 1,
  wordStagger: 0.1,
  wordReveal: 1.5,
  waitBetween: 0.6,
} as const;

const COLORS = {
  textPrimary: '#063265', // Brand dark blue
  textInitial: 'rgba(6, 50, 101, 0.12)', // 12% opacity for better contrast
  textFinal: '#063265',
} as const;

export default function SolutionCard() {
  const locale = useLocale();
  const t = useTranslations('Page');
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLHeadingElement>(null);

  // Use translation keys instead of hardcoded text
  const solutionText = t('Solution.text');
  const words = solutionText.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wordElements = textContainerRef.current?.querySelectorAll('.reveal-word');
    if (!wordElements || wordElements.length === 0) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      // Skip animations, show final state
      gsap.set(descriptionRef.current, { opacity: 0 });
      gsap.set(textContainerRef.current, { y: 0, opacity: 1 });
      gsap.set(wordElements, { color: COLORS.textFinal });
      return;
    }

    // Reset initial states
    gsap.set(descriptionRef.current, { y: 60, opacity: 0 });
    gsap.set(textContainerRef.current, { y: 60, opacity: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=200%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // 1. Description animates up & fades in
    tl.to(descriptionRef.current, {
      y: 0,
      opacity: 1,
      duration: ANIMATION_TIMING.descriptionEnter,
      ease: 'power2.out',
    });

    // 2. Description exits
    tl.to(
      descriptionRef.current,
      {
        y: -60,
        opacity: 0,
        duration: ANIMATION_TIMING.descriptionExit,
        ease: 'power2.in',
      },
      `+=${ANIMATION_TIMING.waitBetween}`
    );

    // 3. Solution container enters
    tl.to(
      textContainerRef.current,
      {
        y: 0,
        opacity: 1,
        duration: ANIMATION_TIMING.containerEnter,
        ease: 'power2.out',
      },
      '<'
    );

    // 4. Words reveal with color change
    tl.to(
      wordElements,
      {
        color: COLORS.textFinal,
        stagger: ANIMATION_TIMING.wordStagger,
        duration: ANIMATION_TIMING.wordReveal,
        ease: 'none',
      },
      '>-0.3'
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [locale, solutionText]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-white text-slate-800 overflow-hidden flex flex-col justify-center items-center min-h-screen py-20 lg:py-28 px-6 md:px-12 w-full"
      aria-labelledby="solution-heading"
    >
      <FeaturesBadge title="Solution" />

      {/* Ambient Background Lighting */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),rgba(255,255,255,0))] pointer-events-none" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/[0.02] rounded-full blur-[130px] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Content Container */}
      <div className="relative w-full max-w-5xl xl:max-w-6xl flex items-center justify-center py-8 min-h-[250px]">
        {/* Description (H2 for semantic hierarchy) */}
        <h2
          ref={descriptionRef}
          className="absolute inset-0 w-full text-center flex items-center justify-center font-extrabold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.4] tracking-tight text-[#063265]/80 opacity-0 pointer-events-none"
        >
          {t('Hero.description')}
        </h2>

        {/* Solution Text Reveal (H3 for sub-hierarchy) */}
        <div
          ref={textContainerRef}
          className="relative w-full text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.35em] font-extrabold uppercase text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl leading-[1.4] tracking-tight opacity-0"
          role="heading"
          aria-level={3}
          id="solution-heading"
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="reveal-word inline-block relative select-none will-change-transform transition-colors duration-300"
              style={{ color: COLORS.textInitial }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
