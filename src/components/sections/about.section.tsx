'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Container } from '../wrappers/container';
import { InteractiveClean } from '../customs/interactive-clean.custom';
import IntroMarquee from './intro.section';

export default function AboutUsSection() {
  const t = useTranslations('Page');
  const quoteSymbolRef = useRef<HTMLDivElement>(null);
  const sloganRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const brandIntroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const words = sloganRef.current?.querySelectorAll('.about-word');
    if (!words) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sloganRef.current,
        start: 'top 85%', // triggers when text is near viewport bottom
        toggleActions: 'play none none reverse',
      },
    });

    // 1. Large decorative quote symbol pops in
    tl.fromTo(
      quoteSymbolRef.current,
      { opacity: 0, scale: 0.5, y: -20 },
      { opacity: 0.3, scale: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)' }
    );

    // 2. Words slide up in sequence (staggered) from their masked containers
    tl.to(
      words,
      {
        y: '0%',
        opacity: 1,
        duration: 0.8,
        stagger: 0.04,
        ease: 'power4.out',
      },
      '-=0.9' // overlap with quote symbol animation
    );

    // 3. Author attribution slides up next
    tl.fromTo(
      authorRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.4'
    );

    // 4. Brand introduction paragraph slides up
    tl.fromTo(
      brandIntroRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  const sloganText = t('Slogan');
  const sloganWords = sloganText.split(' ');

  return (
    <div className="lg:min-h-screen h-auto bg-white flex flex-col">
      <Container className="relative mx-auto px-6 md:px-12 overflow-hidden flex-1 flex items-center py-16 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full about-grid-content">
          <div className="flex flex-col justify-center items-start lg:pr-12 order-1 lg:order-1">
            <div className="relative">
              {/* Large decorative quote */}
              <div
                ref={quoteSymbolRef}
                className="absolute -left-6 -top-16 lg:-left-24 lg:-top-32 text-main opacity-30 text-[140px] lg:text-[280px] leading-none pointer-events-none select-none simteste"
                style={{ fontFamily: 'var(--font-alex-brush), cursive' }}
              >
                &ldquo;
              </div>

              {/* Main quote with improved spacing and hierarchy */}
              <blockquote className="relative z-10 max-w-xl text-main">
                <p
                  ref={sloganRef}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase text-lorenzo-text-light leading-[1.15] tracking-tight mb-8 flex flex-wrap gap-x-[0.25em] gap-y-[0.1em]"
                >
                  {sloganWords.map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden">
                      <span className="about-word inline-block translate-y-full opacity-0">
                        {word}
                      </span>
                    </span>
                  ))}
                </p>
              </blockquote>

              {/* Author attribution */}
              <div ref={authorRef} className="mt-4">
                <p className="text-base font-medium font-mono md:text-lg text-primary-800">
                  - Hoang Pham
                </p>
              </div>

            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative w-56 h-56 md:w-72 md:h-72 lg:w-full lg:h-full lg:aspect-4/5 max-w-lg mx-auto lg:mx-0 order-2 lg:order-2"
            style={{ touchAction: 'pan-y' }}
          >
            <InteractiveClean />
          </motion.div>
        </div>
      </Container>
      <IntroMarquee />
    </div>
  );
}
