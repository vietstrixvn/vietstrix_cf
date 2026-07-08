'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import dynamic from 'next/dynamic';

const InteractiveClean = dynamic(
  () => import('../customs/interactive-clean.custom').then((mod) => mod.InteractiveClean),
  { ssr: false }
);

// Design Tokens
const COLORS = {
  textPrimary: '#063265',
  textMuted: 'rgba(6, 50, 101, 0.15)',
  textHighlight: '#063265',
} as const;

export default function AboutEditorialSection() {
  const locale = useLocale();
  const t = useTranslations('Page');
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const problemRef = useRef<HTMLParagraphElement>(null);
  const solutionRef = useRef<HTMLDivElement>(null);

  const problemText = t('Hero.description');
  const solutionText = t('Solution.text');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initial states
    gsap.set(problemRef.current, { opacity: 0, y: 30 });
    gsap.set(solutionRef.current, { opacity: 0, y: 40 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
        end: 'bottom 25%',
        toggleActions: 'play none none reverse',
      },
    });

    // 1. Problem text fades in
    tl.to(problemRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out',
    });

    // 2. Solution container enters
    tl.to(
      solutionRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
      },
      '-=0.4'
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [locale, problemText, solutionText]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white min-h-screen flex items-center py-16 md:py-20 lg:py-32 about-grid-content"
    >

      {/* Main Container */}
      <div className="relative w-full mx-auto px-4 sm:px-6 md:px-12">


        {/* Grid Layout: Content Left (65-70%) + Logo Right (30-35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div ref={contentRef} className="lg:col-span-7 lg:col-start-2 space-y-6 md:space-y-8 lg:space-y-12">
            {/* Large Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase leading-[1.05] tracking-tighter text-main">
              Digital Solutions
              <br />
              for Modern Business
            </h2>

            {/* Divider */}
            <div className="w-full max-w-xl h-px bg-slate-200" />

            {/* Two-column layout: Problem + Link */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
              {/* Left: Problem description */}
              <div className="md:col-span-8 space-y-4 md:space-y-6">
                <div className="flex items-start gap-3 md:gap-4">
                  <div className="flex-shrink-0 w-7 h-7 md:w-8 md:h-8 rounded-full bg-main/10 flex items-center justify-center">
                    <svg
                      className="w-3.5 h-3.5 md:w-4 md:h-4 text-main"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p
                      ref={problemRef}
                      className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600"
                    >
                      {problemText}
                    </p>
                  </div>
                </div>

                {/* Solution Text */}
                <div
                  ref={solutionRef}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase leading-[1.3] tracking-tight text-main"
                >
                  {solutionText}
                </div>

                <p className="text-base md:text-lg font-medium text-main mt-4 md:mt-6">
                  We transform ideas into reality.
                </p>
              </div>

              {/* Right: Learn More Link (breathing room) */}
              <div className="md:col-span-4 flex justify-start md:justify-end items-start mt-4 md:mt-0">
                <a
                  href="#services"
                  className="text-xs md:text-sm font-mono uppercase tracking-[0.15em] text-slate-500 hover:text-main transition-colors duration-300 group"
                >
                  Learn More
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="lg:col-span-4 relative w-full aspect-square max-w-[280px] sm:max-w-sm md:max-w-md mx-auto lg:mx-0 mt-8 lg:mt-0"
            style={{ touchAction: 'pan-y' }}
          >
            <InteractiveClean />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
