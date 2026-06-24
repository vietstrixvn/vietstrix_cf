'use client';

import { useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function OurValueSection() {
  const locale = useLocale();
  const sectionRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const viText =
    'Ý tưởng của khách hàng luôn là nền tảng cho mọi dự án. Từ những định hướng ban đầu, tụi mình kết hợp tư duy thiết kế và công nghệ để tạo nên những trải nghiệm số được cá nhân hóa, khác biệt và hiệu quả.';
  const enText =
    "Our clients' ideas are the foundation of every project. Starting from their initial vision, we combine design thinking and technology to create personalized, distinctive, and effective digital experiences.";

  const sentence = locale === 'vi' ? viText : enText;
  const words = sentence.split(' ');

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const wordElements = textContainerRef.current?.querySelectorAll('.fly-word');
    if (!wordElements || wordElements.length === 0) return;

    const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const windowHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    // 1. Generate unique off-screen coordinates for every word
    const fromStates = Array.from(wordElements).map((_, idx) => {
      const angle = Math.random() * Math.PI * 2;
      // Push completely outside the viewport bounds (diagonal + random padding)
      const radius = Math.max(windowWidth, windowHeight) * 0.75 + Math.random() * 300;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      const rotation = (Math.random() - 0.5) * 540; // random spin angle
      const scale = 0.4 + Math.random() * 1.2; // random fly-in sizes
      return { x, y, rotation, scale };
    });

    // 2. Coordinated GSAP ScrollTrigger timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=125%', // pins section for 1.25x viewport scroll room
        scrub: 1.2,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Separate the first 2 words from the rest
    const firstTwoElements = Array.from(wordElements).slice(0, 2);
    const otherElements = Array.from(wordElements).slice(2);

    // Timeline Track 1: First 2 words fly in and lock immediately at start
    firstTwoElements.forEach((el, idx) => {
      const state = fromStates[idx];
      tl.fromTo(
        el,
        {
          x: state.x,
          y: state.y,
          rotation: state.rotation,
          scale: state.scale,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.25,
          ease: 'power2.out',
        },
        0 // starts strictly at time = 0
      );
    });

    // Timeline Track 2: All remaining words gather organically from all directions
    otherElements.forEach((el, idx) => {
      const state = fromStates[idx + 2];
      tl.fromTo(
        el,
        {
          x: state.x,
          y: state.y,
          rotation: state.rotation,
          scale: state.scale,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotation: 0,
          scale: 1,
          opacity: 1,
          duration: 0.65,
          ease: 'power3.out',
        },
        0.08 + Math.random() * 0.25 // staggered randomized start time for organic feel
      );
    });

    // Timeline Track 3: Volumetric glowing climax once the sentence is assembled!
    tl.to(
      wordElements,
      {
        color: '#ffffff',
        textShadow: '0 0 25px rgba(99, 102, 241, 0.45)',
        duration: 0.2,
        stagger: 0.005,
      },
      '>-0.1' // triggers slightly before last words settle
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [locale]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-main text-white overflow-hidden flex flex-col justify-center items-center py-20 px-6 md:px-12"
    >
      {/* Studio Ambient Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-indigo-500/5 rounded-full blur-[130px] pointer-events-none" />

      {/* Assembly Canvas Bounding Container */}
      <div className="w-full max-w-5xl flex items-center justify-center min-h-[400px]">
        <div
          ref={textContainerRef}
          className="relative w-full text-center flex flex-wrap justify-center gap-x-[0.25em] gap-y-[0.35em] font-extrabold uppercase text-xl sm:text-2xl md:text-4xl lg:text-5xl leading-[1.35] tracking-tight text-slate-500"
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="fly-word inline-block relative select-none will-change-transform"
            >
              {word}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
