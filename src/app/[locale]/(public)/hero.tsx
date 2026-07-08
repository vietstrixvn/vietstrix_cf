'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useErosionMask } from '@/hooks/useErosionMask';
import dynamic from 'next/dynamic';

const MeshGradient = dynamic(
  () => import('@paper-design/shaders-react').then((mod) => mod.MeshGradient),
  { ssr: false }
);

export default function HeroSection() {
  const t = useTranslations('Page');

  // Refs for animation targets
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const erosionTargetRef = useRef<HTMLDivElement>(null);

  // Animation refs for cleanup
  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const erosionTweenRef = useRef<gsap.core.Tween | null>(null);
  const motionTweenRef = useRef<gsap.core.Tween | null>(null);
  const aboutTweenRef = useRef<gsap.core.Tween | null>(null);

  const [isDesktop, setIsDesktop] = useState(false);

  // Erosion mask with optimized settings
  const { updateMask } = useErosionMask(containerRef, {
    width: 256,
    height: 512,
    seed: 42,
    edgeBandHeight: 0.005,
    displacementAmplitude: 0.09,
  });

  const updateMaskRef = useRef(updateMask);
  updateMaskRef.current = updateMask;

  // 🎯 Optimized resize handler with proper debounce
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    let rafId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          setIsDesktop(window.innerWidth >= 1024);
        });
      }, 150);
    };

    handleResize();
    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 🎯 GSAP Animations - fully optimized
  useEffect(() => {
    if (!heroContentRef.current || !containerRef.current || !erosionTargetRef.current) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // Query all animated elements
    const titlePrefix = heroContentRef.current.querySelector('.hero-title-prefix');
    const titleMain = heroContentRef.current.querySelector('.hero-title-main');
    const titleDescription = heroContentRef.current.querySelector('.hero-description');
    const buttons = heroContentRef.current.querySelector('.hero-buttons');

    // Set will-change before animations
    gsap.set([titlePrefix, titleMain, titleDescription, buttons], {
      willChange: 'transform, opacity'
    });

    // 1. Entrance animation timeline
    tlRef.current = gsap.timeline({
      onComplete: () => {
        // Remove will-change after entrance completes
        gsap.set([titlePrefix, titleMain, titleDescription, buttons], {
          willChange: 'auto'
        });
      }
    });

    tlRef.current.fromTo(
      [titlePrefix, titleMain, titleDescription, buttons],
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        clearProps: 'transform',
      }
    );

    // 2. Erosion mask scroll animation (throttled)
    const progressObj = { value: 0 };
    let lastUpdate = 0;
    const throttleDelay = 16; // ~60fps

    erosionTweenRef.current = gsap.to(progressObj, {
      value: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 0.3,
      },
      onUpdate: () => {
        const now = performance.now();
        if (now - lastUpdate > throttleDelay) {
          updateMaskRef.current(progressObj.value * 0.45);
          lastUpdate = now;
        }
      },
      ease: 'none',
    });

    // 3. Hero content fade out + drift
    if (!heroContentRef.current) return;
    gsap.set(heroContentRef.current, { willChange: 'transform, opacity' });

    motionTweenRef.current = gsap.to(heroContentRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom 25%',
        scrub: true,
      },
      opacity: 0,
      y: -80,
      ease: 'none',
      onComplete: () => {
        if (heroContentRef.current) gsap.set(heroContentRef.current, { willChange: 'auto' });
      }
    });

    // 4. About section slide-up coordination
    const aboutContent = document.querySelector('.about-grid-content');
    if (aboutContent) {
      gsap.set(aboutContent, { willChange: 'transform, opacity' });

      aboutTweenRef.current = gsap.fromTo(
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
          onComplete: () => {
            gsap.set(aboutContent, { willChange: 'auto' });
          }
        }
      );
    }

    // Cleanup all tweens and ScrollTriggers
    return () => {
      if (tlRef.current) tlRef.current.kill();

      if (erosionTweenRef.current) {
        erosionTweenRef.current.scrollTrigger?.kill();
        erosionTweenRef.current.kill();
      }

      if (motionTweenRef.current) {
        motionTweenRef.current.scrollTrigger?.kill();
        motionTweenRef.current.kill();
      }

      if (aboutTweenRef.current) {
        aboutTweenRef.current.scrollTrigger?.kill();
        aboutTweenRef.current.kill();
      }

      // Reset will-change
      if (heroContentRef.current) {
        gsap.set([heroContentRef.current, titlePrefix, titleMain, titleDescription, buttons], {
          clearProps: 'all'
        });
      }
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
      className="min-h-screen bg-white relative overflow-hidden flex items-end pb-20 sm:pb-28 lg:pb-32"
    >
      {/* SVG Filters & Gradients */}
      <svg className="absolute inset-0 w-0 h-0 pointer-events-none" aria-hidden="true">
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

      {/* Erosion-masked background layer */}
      <div
        ref={erosionTargetRef}
        className="absolute inset-0 w-full h-full"
      >
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

      {/* Content Layer - Standard container with max-width */}
      <div className="w-full relative z-10 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto py-16">
          {/* Hero Content Grid - Modern layout structure */}
          <div
            ref={heroContentRef}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end"
          >
            {/* Left Column: Main Title (spans 8/12 on desktop) */}
            <div className="lg:col-span-8 space-y-6">
              {/* Eyebrow / Prefix */}
              <span className="hero-title-prefix block opacity-0 text-xs sm:text-sm md:text-base font-bold tracking-[0.25em] text-white/90 uppercase">
                {t('Hero.titlePrefix')}
              </span>

              {/* Main Title */}
              <h1
                className="hero-title-main opacity-0 font-black text-white leading-[1.05] tracking-tighter"
                style={{
                  fontSize: 'clamp(40px, 7vw, 120px)',
                  textShadow: '0 2px 20px rgba(0,0,0,0.15)'
                }}
              >
                {t('Hero.titleSuffix')}
              </h1>
            </div>

            {/* Right Column: Description + CTA (spans 4/12 on desktop) */}
            <div className="lg:col-span-4 space-y-6 lg:pb-2">
              {/* Description */}
              <p className="hero-description opacity-0 text-sm sm:text-base lg:text-lg font-medium text-white/95 leading-relaxed max-w-md">
                {t('Hero.description')}
              </p>

              {/* CTA Buttons */}
              <div className="hero-buttons opacity-0 flex flex-row flex-wrap gap-3">
                <Link
                  href="/contact-us"
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-white hover:bg-white/95 border border-white transition-all duration-300 group"
                >
                  <span className="font-bold uppercase tracking-[0.15em] text-xs sm:text-sm text-main">
                    Contact Us
                  </span>
                </Link>

                <button
                  onClick={handleScrollToNext}
                  className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent hover:bg-white/10 border border-white/50 hover:border-white transition-all duration-300 group"
                >
                  <span className="font-bold uppercase tracking-[0.15em] text-xs sm:text-sm text-white">
                    Explore
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
