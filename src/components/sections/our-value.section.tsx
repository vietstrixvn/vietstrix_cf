'use client';

import { useEffect, useRef, useMemo } from 'react';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OurValueSection() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const viText =
    'Ý tưởng của khách hàng luôn là nền tảng cho mọi dự án. Từ những định hướng ban đầu, tụi mình kết hợp tư duy thiết kế và công nghệ để tạo nên những trải nghiệm số được cá nhân hóa, khác biệt và hiệu quả.';
  const enText =
    "Our clients' ideas are the foundation of every project. Starting from their initial vision, we combine design thinking and technology to create personalized, distinctive, and effective digital experiences.";

  const sentence = locale === 'vi' ? viText : enText;
  const words = sentence.split(' ');

  // Memoize fromStates để tránh recalculate mỗi render
  const fromStates = useMemo(() => {
    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    return words.map(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.max(windowWidth, windowHeight) * 0.6 + Math.random() * 200;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (Math.random() - 0.5) * 360;
      const scale = 0.6 + Math.random() * 0.8;
      return { x, y, rotation, scale };
    });
  }, [words.length]);

  useEffect(() => {
    if (!sectionRef.current || !textContainerRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const wordElements = textContainerRef.current.querySelectorAll('.fly-word');
    if (!wordElements || wordElements.length === 0) return;

    // Check reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(wordElements, { opacity: 1, x: 0, y: 0, rotation: 0, scale: 1 });
      return;
    }

    // Promote all words to GPU layers before animation starts
    const setWillChange = (active: boolean) => {
      gsap.set(wordElements, { willChange: active ? 'transform, opacity' : 'auto' });
    };

    // Single timeline with optimized settings
    tlRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=100%',
        scrub: 1.2, // Increased from 0.8 — smoother interpolation = fewer intermediate repaints
        pin: true,
        anticipatePin: 1,
        fastScrollEnd: true,
        onEnter: () => setWillChange(true),
        onEnterBack: () => setWillChange(true),
        onLeave: () => setWillChange(false),
        onLeaveBack: () => setWillChange(false),
      },
    });

    // Prepare per-element fromVars arrays for batched stagger animation
    // This avoids creating 35+ individual tweens — GSAP batches them internally
    const allElements = Array.from(wordElements);

    // Set initial scattered positions
    allElements.forEach((el, idx) => {
      const state = fromStates[idx];
      gsap.set(el, {
        x: state.x,
        y: state.y,
        rotation: state.rotation,
        scale: state.scale,
        opacity: 0,
        force3d: true, // Promote to GPU layer — avoids forced reflows during scroll
      });
    });

    // Single batched tween with stagger — GSAP optimizes the tick loop internally
    tlRef.current.to(
      allElements,
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out',
        force3d: true,
        stagger: {
          each: 0.015,
          from: 'start',
        },
      },
      0
    );

    // Subtle glow — simplified
    tlRef.current.to(
      wordElements,
      {
        color: '#ffffff',
        duration: 0.3,
        ease: 'none',
      },
      '>-0.15'
    );

    return () => {
      if (tlRef.current) {
        tlRef.current.scrollTrigger?.kill();
        tlRef.current.kill();
      }
      // Remove will-change and inline styles after animation
      gsap.set(wordElements, { clearProps: 'all' });
    };
  }, [locale, fromStates]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-main text-white overflow-hidden flex flex-col justify-center items-center py-20 px-6 md:px-12"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Text Container */}
      <div className="w-full max-w-5xl flex items-center justify-center min-h-[400px]">
        <div
          ref={textContainerRef}
          className="relative w-full text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.35em] font-extrabold uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-[1.35] tracking-tight text-slate-500"
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className="fly-word inline-block relative select-none"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}