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
    if (!sectionRef.current || !problemRef.current || !solutionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
    });

    return () => ctx.revert(); // Cleanup GSAP context
  }, [locale, problemText, solutionText]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative bg-white h-full flex items-center py-10 md:py-14 lg:py-20 about-grid-content overflow-hidden"
    >

      {/* Main Container */}
      <div className="relative w-full mx-auto px-4 sm:px-6 md:px-12">


        {/* Grid Layout: Content Left (65-70%) + Logo Right (30-35%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Column: Content */}
          <div ref={contentRef} className="lg:col-span-7 lg:col-start-2 space-y-6 md:space-y-8 lg:space-y-12">
            {/* Large Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-[1.05] tracking-tighter text-main">
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

                {/* Direct Contact Buttons */}
                <div className="flex flex-wrap items-center gap-3 mt-4 pt-4 border-t border-slate-100">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400 mr-2">
                    Quick Connect:
                  </span>

                  <a
                    href="https://wa.me/0906723985"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/20 bg-green-50/50 hover:bg-green-50 text-xs sm:text-sm font-semibold text-green-700 hover:text-green-800 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.444 5.703 1.447h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp
                  </a>

                  <a
                    href="https://t.me/hoangpm_strix"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-sky-500/20 bg-sky-50/50 hover:bg-sky-50 text-xs sm:text-sm font-semibold text-sky-700 hover:text-sky-800 transition-all duration-300 shadow-sm"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.161c-.18.717-.98 4.72-1.388 6.903-.173.923-.513 1.233-.842 1.263-.715.066-1.257-.473-1.95-1.023-1.084-.861-1.697-1.396-2.748-2.088-1.215-.8-2.28-1.242-3.136-1.848-.302-.213-.6-.425-.867-.643-.538-.435-.157-.756.243-1.127.35-.325 3.018-2.768 3.57-3.004.24-.1.458-.236.425.109-.033.345-2.046 2.37-2.617 2.946l-.37.373c-.5.503-1.047.8-1.579.782-.544-.018-1.077-.282-1.488-.415-.5-.164-.9-.25-.864-.53.018-.146.22-.296.602-.45 2.358-1.026 5.864-2.482 7.025-2.966.86-.36 1.62-.51 2.057-.492.355.015.65.177.785.45.1.202.132.428.1.758z" />
                    </svg>
                    Telegram
                  </a>
                </div>
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

          {/* Right Column: 3D Logo — only on desktop to avoid mobile perf hit */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="hidden lg:block lg:col-span-4 relative w-full aspect-square max-w-sm mx-auto lg:mx-0"
            style={{ touchAction: 'pan-y' }}
          >
            <InteractiveClean />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
