'use client';

import { useEffect, useRef } from 'react';
import { Zap, Layers, Users, Headset } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SectionTag } from '../customs/section-tag.custom';
import { useTranslations } from 'next-intl';
import { Container } from '../wrappers/container';

export default function OurStrength() {
  const t = useTranslations('Page.Strength');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Synchronized entrance for the header tags & text blocks
      gsap.fromTo(
        '.strength-header-item',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.strength-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // 2. Cascading staggered entrance for the Strength grid cards
      gsap.fromTo(
        '.strength-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.strength-grid',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const features = [
    {
      name: `${t('title.t1')}`,
      description: `${t('answer.a1')}`,
      icon: Layers,
    },
    {
      name: `${t('title.t2')}`,
      description: `${t('answer.a2')}`,
      icon: Zap,
    },
    {
      name: `${t('title.t3')}`,
      description: `${t('answer.a3')}`,
      icon: Users,
    },
    {
      name: `${t('title.t4')}`,
      description: `${t('answer.a4')}`,
      icon: Headset,
    },
  ];

  return (
    <div
      ref={containerRef}
      className="py-12 md:py-20 relative overflow-hidden"
      id="features"
    >
      <Container width="max-w-8xl" className="w-full mx-auto px-0 relative z-10">
        {/* Header Block */}
        <div className="strength-header lg:text-left flex flex-col">
          <div className="strength-header-item opacity-0">
            <SectionTag title="Our Strength" />
          </div>
          <p className="strength-header-item opacity-0 mt-4 text-3xl sm:text-4xl lg:text-5xl leading-tight font-extrabold tracking-tight text-foreground">
            {t('headline')}
          </p>
          <p className="strength-header-item opacity-0 mt-4 max-w-4xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
            {t('description')}
          </p>
        </div>

        {/* Strength Cards Grid */}
        <div className="strength-grid mt-16 md:mt-24 w-full">
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 w-full">
            {features.map((feature) => (
              <div
                key={feature.name}
                className="strength-card opacity-0 relative w-full flex flex-col items-start"
              >
                <dt className="flex items-start w-full">
                  {/* Styled Icon Box using high-performance CSS hardware-accelerated transitions */}
                  <div className="flex items-center justify-center h-12 w-12 shrink-0 rounded-md bg-[#013162] text-white hover:scale-105 active:scale-95 transition-transform duration-300 ease-out cursor-pointer select-none">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <p className="ml-4 text-xl font-bold text-foreground leading-normal self-center uppercase tracking-tight">
                    {feature.name}
                  </p>
                </dt>
                <dd className="mt-3 ml-16 text-base text-muted-foreground leading-relaxed">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>
    </div>
  );
}
