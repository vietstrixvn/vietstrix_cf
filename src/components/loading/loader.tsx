'use client';

import { MeshGradient } from '@paper-design/shaders-react';
import { LoaderProps } from '@/types';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export function Loader({ onLoadingComplete, duration = 2500 }: LoaderProps) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [progress, setProgress] = useState(0);

  const loaderContainerRef = useRef<HTMLDivElement>(null);
  const erosionTargetRef = useRef<HTMLDivElement>(null);
  const waveGroupRef = useRef<SVGGElement>(null);

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
    const ctx = gsap.context(() => {
      // 1. Animate wave Y position (rises from 1593 to -150)
      gsap.fromTo(
        waveGroupRef.current,
        { y: 1593 },
        {
          y: -150,
          duration: duration / 1000,
          ease: 'power1.inOut',
        }
      );

      // 2. Animate progress count and fade out exit
      const progressObj = { val: 0 };
      gsap.to(progressObj, {
        val: 100,
        duration: duration / 1000,
        ease: 'power1.inOut',
        onUpdate: () => {
          setProgress(Math.floor(progressObj.val));
        },
        onComplete: () => {
          gsap.to(loaderContainerRef.current, {
            opacity: 0,
            scale: 1.05,
            duration: 0.6,
            ease: 'power2.inOut',
            onComplete: () => {
              onLoadingComplete?.();
            },
          });
        },
      });

      // 3. Stagger animate letters of "PROCESSING..."
      gsap.to('.processing-letter', {
        y: -6,
        opacity: 0.6,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        stagger: {
          each: 0.08,
          from: 'start',
        },
        ease: 'sine.inOut',
      });
    }, loaderContainerRef);

    return () => ctx.revert();
  }, [duration, onLoadingComplete]);

  const letters = 'PROCESSING...'.split('');

  return (
    <div
      ref={loaderContainerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center bg-main justify-center text-white bg-cover bg-center overflow-hidden"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes waveFlowRight {
          0% { transform: translateX(0px); }
          100% { transform: translateX(-1395px); }
        }
        @keyframes waveFlowLeft {
          0% { transform: translateX(-1395px); }
          100% { transform: translateX(0px); }
        }
        .wave-front {
          animation: waveFlowRight 5s linear infinite;
        }
        .wave-back {
          animation: waveFlowLeft 3.5s linear infinite;
        }
      `}} />

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

      <div className="relative flex flex-col items-center justify-center z-10">
        <div className="relative w-32 h-32 md:w-36 md:h-36 flex items-center justify-center animate-fade-in">
          <svg
            className="w-full h-full drop-shadow-[0_0_25px_rgba(5,139,224,0.55)]"
            viewBox="0 0 1395 1593"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* The mask/clipPath defining the logo shape */}
              <clipPath id="logo-clip-path">
                <path d="M797.995 1205.5L798.005 1205.5L798.004 1205.5L798.008 1205.5L999.409 798.812L1199.49 1193.5L999.497 1593H599.503L0.00585938 395L198.999 0.0107422L797.995 1205.5ZM1394.99 0.00488281L999.409 798.789L798.006 401.499L999.503 0.00488281H1394.99Z" />
              </clipPath>

              {/* Gradient for Back Wave */}
              <linearGradient id="wave-grad-back" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#005ec4" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0025a0" stopOpacity="0.95" />
              </linearGradient>

              {/* Gradient for Front Wave */}
              <linearGradient id="wave-grad-front" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00d2ff" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#058be0" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* Background shape - represents the unfilled/empty outline of the logo */}
            <path
              d="M797.995 1205.5L798.005 1205.5L798.004 1205.5L798.008 1205.5L999.409 798.812L1199.49 1193.5L999.497 1593H599.503L0.00585938 395L198.999 0.0107422L797.995 1205.5ZM1394.99 0.00488281L999.409 798.789L798.006 401.499L999.503 0.00488281H1394.99Z"
              fill="rgba(255, 255, 255, 0.07)"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="10"
            />

            {/* Wave group clipped to the logo shape */}
            <g clipPath="url(#logo-clip-path)">
              <g ref={waveGroupRef} style={{ transform: 'translateY(1593px)' }}>
                {/* Back wave scrolling left */}
                <path
                  className="wave-back"
                  d="M 0 100 Q 348.75 40, 697.5 100 T 1395 100 Q 1743.75 40, 2092.5 100 T 2790 100 L 2790 1800 L 0 1800 Z"
                  fill="url(#wave-grad-back)"
                />
                {/* Front wave scrolling right */}
                <path
                  className="wave-front"
                  d="M 0 100 Q 348.75 20, 697.5 100 T 1395 100 Q 1743.75 20, 2092.5 100 T 2790 100 L 2790 1800 L 0 1800 Z"
                  fill="url(#wave-grad-front)"
                />
              </g>
            </g>

            {/* Stroke overlay to give a crisp border to the logo on top of the waves */}
            <path
              d="M797.995 1205.5L798.005 1205.5L798.004 1205.5L798.008 1205.5L999.409 798.812L1199.49 1193.5L999.497 1593H599.503L0.00585938 395L198.999 0.0107422L797.995 1205.5ZM1394.99 0.00488281L999.409 798.789L798.006 401.499L999.503 0.00488281H1394.99Z"
              stroke="#058BE0"
              strokeWidth="12"
              strokeLinejoin="round"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </div>

        <div className="relative mt-8 flex flex-col items-center gap-3">
          {/* Percentage Counter */}
          <div className="text-3xl font-extrabold tracking-widest text-white font-mono min-w-[100px] text-center drop-shadow-[0_2px_10px_rgba(5,139,224,0.65)]">
            {progress}%
          </div>
          {/* Animated Processing Text */}
          <div className="flex items-center gap-1 select-none">
            {letters.map((char, index) => (
              <span
                key={index}
                className="processing-letter inline-block text-[11px] uppercase tracking-[0.25em] text-blue-200 font-extrabold"
                style={{ display: 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
