'use client';

import { Container } from '@/components/wrappers/container';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { MeshGradient } from '@paper-design/shaders-react';
import gsap from 'gsap';
import { About3DLogo } from './about-logo';

export const AboutHeroSetion = () => {
  const t = useTranslations('About');
  const [isDesktop, setIsDesktop] = useState(false);
  const erosionTargetRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsDesktop(window.innerWidth >= 1024);
      }, 150);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Cinematic character reveal on mount
    const chars = gsap.utils.toArray('.char-reveal') as HTMLElement[];
    if (chars.length === 0) return;

    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: '80%',
        rotateX: -45,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: '0%',
        rotateX: 0,
        scale: 1,
        duration: 0.9,
        stagger: 0.03, // cascading waterfall delay for letters
        ease: 'back.out(1.6)', // bouncy cinematic landing
        delay: 0.2,
      }
    );
  }, []);

  // Helper to split any localized string into individually animatable character spans
  const splitText = (text: string) => {
    return text.split('').map((char, index) => (
      <span
        key={index}
        className="char-reveal inline-block opacity-0 will-change-transform"
        style={{
          display: char === ' ' ? 'inline' : 'inline-block',
          transformOrigin: 'bottom center',
          perspective: '1000px',
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen py-16 bg-white md:py-24 relative overflow-hidden pt-20 sm:pt-24 flex items-center justify-center"
    >
      {/* SVG defs for gradients/filters */}
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter
            id="gooey-filter"
            x="-50%"
            y="-50%"
            width="200%"
            height="200%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
          <filter id="logo-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <linearGradient
            id="logo-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#007fff" />
            <stop offset="50%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#063265" />
          </linearGradient>
          <linearGradient
            id="hero-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor="#0065d7" />
            <stop offset="70%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#ffffff" />
          </linearGradient>
          <filter id="text-glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Background layer */}
      <div
        ref={erosionTargetRef}
        className="absolute inset-0 w-full h-full"
        style={{ willChange: 'mask-image' }}
      >
        {/* Background: MeshGradient on Desktop, static gradient on Mobile */}
        {isDesktop ? (
          <MeshGradient
            className="w-full h-full"
            colors={[
              '#74d5fcff',
              '#0183c4ff',
              '#004ba1ff',
              '#0987c2ff',
              '#0025a0ff',
            ]}
            speed={0.15}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-tr from-[#0025a0] via-[#004ba1] to-[#0183c4]" />
        )}
      </div>

      <Container className="mx-auto relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center w-full">
          {/* Left Column: Big uppercase H1 text reveal */}
          <div className="lg:col-span-8 flex flex-col items-start justify-center w-full">
            <h1 className="uppercase font-black text-main text-[40px] sm:text-[56px] md:text-[72px] lg:text-[80px] xl:text-[96px] leading-[0.85] tracking-tighter flex flex-col w-full overflow-hidden">
              {/* Row 1 */}
              <span className="text-white flex flex-wrap">
                {splitText(t('Hero.title.t1'))}
              </span>
              {/* Row 2 */}
              <span className="ml-[32px] sm:ml-[60px] md:ml-[80px] lg:ml-[120px] text-white py-2 sm:py-3 md:py-4 flex flex-wrap">
                {splitText(t('Hero.title.t2'))}
              </span>
              {/* Row 3 */}
              <span className="text-white flex flex-wrap">
                {splitText(t('Hero.title.t3'))}
              </span>
            </h1>
          </div>

          {/* Right Column: Rotating 3D Logo GLB (hidden on mobile, visible on desktop) */}
          <div className="hidden lg:block lg:col-span-4 w-full">
            <About3DLogo />
          </div>
        </div>
      </Container>
    </section>
  );
};
