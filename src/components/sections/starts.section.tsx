'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Arrows } from '@/assets';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function PerformentSection() {
  const t = useTranslations('Page.Stats');
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);
  const counterRefs = useRef<gsap.core.Tween[]>([]);

  const statsData = [
    {
      number: '01',
      title: t('item1.title'),
      value: 8760,
      suffix: '',
      label: t('item1.label'),
      desc: t('item1.desc'),
    },
    {
      number: '02',
      title: t('item2.title'),
      value: 15,
      suffix: '+',
      label: t('item2.label'),
      desc: t('item2.desc'),
    },
    {
      number: '03',
      title: t('item3.title'),
      value: 100,
      suffix: '%',
      label: t('item3.label'),
      desc: t('item3.desc'),
    },
    {
      number: '04',
      title: t('item4.title'),
      value: 98,
      suffix: '%',
      label: t('item4.label'),
      desc: t('item4.desc'),
    },
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Optimized counter update with RAF throttling
  const createCounter = useCallback((element: Element, target: number, delay: number) => {
    const counterObj = { val: 0 };
    let rafId: number;
    let lastUpdate = 0;

    return gsap.to(counterObj, {
      val: target,
      duration: 2,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        once: true,
      },
      onUpdate: function () {
        const now = performance.now();
        // Throttle to ~30fps for counter updates (smoother than 60fps for numbers)
        if (now - lastUpdate > 33) {
          if (rafId) cancelAnimationFrame(rafId);
          rafId = requestAnimationFrame(() => {
            element.textContent = String(Math.floor(counterObj.val));
          });
          lastUpdate = now;
        }
      },
      onComplete: () => {
        if (rafId) cancelAnimationFrame(rafId);
        element.textContent = String(target);
      }
    });
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !isClient) return;

    const ctx = gsap.context(() => {
      const allItems = cardRefs.current.filter(Boolean) as HTMLDivElement[];

      // Check reduced motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotion) {
        gsap.set(allItems, { opacity: 1, y: 0 });
        cardRefs.current.forEach((card, index) => {
          const counterEl = card?.querySelector('.counter-value');
          if (counterEl) {
            counterEl.textContent = String(statsData[index].value);
          }
        });
        if (bottomRef.current) {
          gsap.set(bottomRef.current, { opacity: 1, y: 0 });
        }
        return;
      }

      // Single batch entrance animation
      gsap.fromTo(
        allItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      // Optimized counters with RAF throttling
      cardRefs.current.forEach((card, index) => {
        if (!card) return;
        const counterEl = card.querySelector('.counter-value');
        if (counterEl) {
          const tween = createCounter(counterEl, statsData[index].value, index * 0.1 + 0.2);
          counterRefs.current[index] = tween;
        }
      });

      // Bottom section
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            delay: 0.6,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      counterRefs.current.forEach(tween => tween?.kill());
      counterRefs.current = [];
      ctx.revert();
    };
  }, [isClient, createCounter, statsData]);

  return (
    <div
      ref={containerRef}
      className="w-full bg-white py-24 px-6 sm:px-12 md:px-16 relative overflow-hidden border-b border-neutral-100"
    >

      <div className="max-w-7xl mx-auto relative z-10">
        {/* 4 Stat Columns */}
        <div className="grid grid-cols-12 gap-8 md:gap-12 lg:gap-16">
          {statsData.map((stat, index) => (
            <div
              key={index}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col justify-start space-y-4"
            >
              <span className="text-sm font-bold tracking-wider text-main uppercase">
                {stat.number}. {stat.title}
              </span>

              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight leading-tight">
                &ldquo;
                <span className="counter-value font-mono">0</span>
                {stat.suffix} {stat.label}&rdquo;
              </h3>

              <p className="text-neutral-500 font-medium text-sm sm:text-base leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div
          ref={bottomRef}
          className="mt-20 pt-10 border-t border-neutral-100 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <p className="text-neutral-600 font-medium text-lg sm:text-xl">
            {t('question')}
          </p>
          <Link
            href="/contact-us"
            className="inline-flex items-center gap-3 bg-main hover:bg-main/90 text-white font-bold h-12 px-6 rounded-full transition-all duration-300 group shadow-lg shadow-main/10 hover:shadow-main/20 shrink-0"
          >
            <span>{t('cta')}</span>
            <Arrows.ArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
