'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MeshGradient } from '@paper-design/shaders-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useErosionMask } from '@/hooks/useErosionMask';

export default function HeroSection() {
  const t = useTranslations('Page');
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const erosionTargetRef = useRef<HTMLDivElement>(null);

  // Erosion mask hook — procedural organic dissolution with sharp edges
  const { updateMask } = useErosionMask(containerRef, {
    width: 256,
    height: 512,
    seed: 42,
    edgeBandHeight: 0.005,      // make the transition zone super narrow for a razor-sharp crisp edge
    displacementAmplitude: 0.09, // how bumpy/blobby the edge is
  });

  // Stable callback ref for GSAP
  const updateMaskRef = useRef(updateMask);
  updateMaskRef.current = updateMask;

  useEffect(() => {
    if (
      !heroContentRef.current ||
      !containerRef.current ||
      !erosionTargetRef.current
    )
      return;

    gsap.registerPlugin(ScrollTrigger);

    const titlePrefix = heroContentRef.current.querySelector('.hero-title-prefix');
    const titleSuffix = heroContentRef.current.querySelector('.hero-title-suffix');
    const description = heroContentRef.current.querySelector('.hero-description');
    const buttons = heroContentRef.current.querySelector('.hero-buttons');

    // 1. Entrance animation
    const tl = gsap.timeline();
    tl.fromTo(
      [titlePrefix, titleSuffix, description, buttons],
      { opacity: 0, y: 35 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );

    // 2. Organic erosion mask driven by scroll
    const progressObj = { value: 0 };

    const erosionTween = gsap.to(progressObj, {
      value: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3,
      },
      onUpdate: () => {
        updateMaskRef.current(progressObj.value * 0.45);
      },
      ease: 'none',
    });

    // 3. Hero content: fade out and drift upward
    const motionTween = gsap.to(heroContentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 25%',
        scrub: true,
      },
      opacity: 0,
      y: -80,
      ease: 'none',
    });

    // 4. Coordinated slide-up for About content to follow the wave front
    const aboutContent = document.querySelector('.about-grid-content');
    let aboutTween: gsap.core.Tween | null = null;
    if (aboutContent) {
      aboutTween = gsap.fromTo(
        aboutContent,
        { y: '220px', opacity: 0.2 },
        {
          y: '0px',
          opacity: 1,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.3,
          },
          ease: 'power1.out',
        }
      );
    }

    return () => {
      erosionTween.scrollTrigger?.kill();
      erosionTween.kill();
      motionTween.scrollTrigger?.kill();
      motionTween.kill();
      if (aboutTween) {
        aboutTween.scrollTrigger?.kill();
        aboutTween.kill();
      }
    };
  }, []);

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

  const handleScrollToNext = () => {
    if (typeof document === 'undefined') return;
    const nextSection = document.getElementById('about');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-white relative overflow-hidden flex flex-col justify-center pb-16 sm:pb-24"
    >
      {/* SVG defs for gradients/filters used elsewhere */}
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
        </defs>
      </svg>

      {/* Erosion target — wraps the entire hero visual layer */}
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

      <div className="max-w-7xl mx-auto w-full relative z-10 px-4 sm:px-6 md:px-12 pt-20 sm:pt-24 lg:pt-0">
        {/* Full width text layout - Centered both ways */}
        <div className="w-full flex flex-col items-center justify-center text-center">
          {/* Main content wrapper */}
          <div
            ref={heroContentRef}
            className="space-y-6 sm:space-y-8 max-w-4xl relative z-10 mx-auto flex flex-col items-center justify-center"
          >
            <div className="space-y-3 sm:space-y-4 flex flex-col items-center w-full">
              {/* Heading */}
              <h1 className="uppercase font-black text-white leading-tight tracking-tighter flex flex-col items-center text-center w-full">
                <span className="hero-title-prefix opacity-0 text-[11px] sm:text-xs md:text-sm lg:text-base font-bold tracking-[0.25em] text-white/95 uppercase mb-2">
                  {t('Hero.titlePrefix')}
                </span>
                <span className="hero-title-suffix opacity-0 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white drop-shadow-md max-w-3xl leading-[1.15]">
                  {t('Hero.titleSuffix')}
                </span>
              </h1>

              {/* Description */}
              <p className="hero-description opacity-0 text-sm sm:text-base font-bold text-primary-100 leading-relaxed max-w-2xl text-center mt-2">
                {t('Hero.description')}
              </p>
            </div>
            {/* CTA Buttons */}
            <div className="hero-buttons opacity-0 flex flex-row justify-center gap-3 w-full">
              <Link
                href="/contact-us"
                className="flex items-center justify-center px-5 py-3 bg-white border border-white gap-4 group cursor-pointer flex-1 sm:flex-none"
              >
                <span className="font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-main whitespace-nowrap">
                  Contact Us
                </span>
              </Link>
              <div
                className="flex items-center justify-center px-5 py-3 bg-main/80 border border-main gap-2 group cursor-pointer flex-1 sm:flex-none"
                onClick={handleScrollToNext}
              >
                <span className="font-bold uppercase tracking-[0.2em] text-xs sm:text-sm text-gray-100 whitespace-nowrap">
                  Explore
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
