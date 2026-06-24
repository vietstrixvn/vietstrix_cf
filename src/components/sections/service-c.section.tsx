'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '../wrappers/container';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  SystemCard,
  UxUiCard,
  DevelopmentCard,
  MvpCard,
  RedesignCard,
  AiToCodeCard,
} from '../animations/tech.animation';
import { SectionTag } from '../customs/section-tag.custom';

export default function ServicesAnimationSection() {
  const t = useTranslations('Service');
  const [activeIndex, setActiveIndex] = useState(0);

  const sectionRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      id: 1,
      title: 'End-to-End Web Development',
      description: `${t('Services.step.q1')}`,
      renderCard: (isActive: boolean) => <DevelopmentCard isHovered={isActive} />,
    },
    {
      id: 2,
      title: 'AI Design to Real Website',
      description: `${t('Services.step.q2')}`,
      renderCard: (isActive: boolean) => <AiToCodeCard isHovered={isActive} />,
    },
    {
      id: 3,
      title: 'Product Design & UI/UX',
      description: `${t('Services.step.q3')}`,
      renderCard: (isActive: boolean) => <UxUiCard isHovered={isActive} />,
    },
    {
      id: 4,
      title: 'Web Systems & Optimization',
      description: `${t('Services.step.q4')}`,
      renderCard: (isActive: boolean) => <SystemCard isHovered={isActive} />,
    },
    {
      id: 5,
      title: 'MVP Development for Startups',
      description: `${t('Services.step.q5')}`,
      renderCard: (isActive: boolean) => <MvpCard isHovered={isActive} />,
    },
    {
      id: 6,
      title: 'Website Redesign & Revamp',
      description: `${t('Services.step.q6')}`,
      renderCard: (isActive: boolean) => <RedesignCard isHovered={isActive} />,
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px)', () => {
      const section = sectionRef.current;
      const pinEl = pinRef.current;
      if (!section || !pinEl) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=350%',
        pin: pinEl,
        pinSpacing: true,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(Math.floor(progress * 6), 5);
          setActiveIndex(newIndex);
        },
      });

      return () => {
        trigger.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} className="w-full relative bg-white overflow-visible lg:min-h-screen">
      {/* Pinned inner container */}
      <div
        ref={pinRef}
        className="w-full h-auto lg:h-screen flex flex-col justify-center py-12 lg:py-16 overflow-visible lg:overflow-hidden"
      >
        <Container width="max-w-8xl" className="mx-auto flex flex-col h-full justify-between gap-8 md:gap-12 w-full">
          {/* Header */}
          <div>
            <SectionTag title="Our Services" />
            <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl uppercase tracking-tight">
                Our services
              </h2>
              <p className="max-w-xl text-base leading-relaxed text-black/85 lg:pl-8">
                {t('Services.description')}
              </p>
            </div>
          </div>

          {/* Desktop Interactive Layout (Hidden on Mobile/Tablet) */}
          <div className="hidden lg:grid grid-cols-2 gap-16 items-center flex-1 min-h-[480px]">
            {/* Left Column: Vertical Progress + Text content */}
            <div className="flex items-start gap-8 h-[360px]">
              {/* Vertical Progress Indicators */}
              <div className="flex flex-col gap-3 pt-2 shrink-0 justify-center h-full">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 rounded-full transition-all duration-500 ease-out ${
                      activeIndex === index
                        ? 'bg-[#063265] h-12 shadow-sm'
                        : 'bg-gray-200 h-6'
                    }`}
                  />
                ))}
              </div>

              {/* Text content stack */}
              <div className="relative flex-1 h-full">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out ${
                      activeIndex === index
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : activeIndex > index
                        ? 'opacity-0 -translate-y-12 pointer-events-none'
                        : 'opacity-0 translate-y-12 pointer-events-none'
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-wider text-secondary-500 mb-2">
                      0{index + 1} . {service.id === 1 ? 'Development' : service.id === 2 ? 'AI Conversion' : service.id === 3 ? 'UI/UX Design' : service.id === 4 ? 'Optimization' : service.id === 5 ? 'MVP Phase' : 'Redesign'}
                    </span>
                    <h3 className="text-3xl lg:text-4xl font-extrabold text-main mb-4 leading-tight">
                      {service.title}
                    </h3>
                    <p className="text-lg text-foreground/80 leading-relaxed max-w-lg">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Illustration Cards Stack */}
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              <div className="w-full h-full bg-gray-50/80 rounded-[24px] border border-gray-100/80 shadow-2xl shadow-gray-200/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                {services.map((service, index) => (
                  <div
                    key={service.id}
                    className={`absolute inset-0 flex items-center justify-center p-8 transition-all duration-700 ease-out ${
                      activeIndex === index
                        ? 'opacity-100 scale-100 rotate-0 pointer-events-auto z-10'
                        : activeIndex > index
                        ? 'opacity-0 scale-95 -rotate-2 pointer-events-none z-0'
                        : 'opacity-0 scale-95 rotate-2 pointer-events-none z-0'
                    }`}
                  >
                    <div className="w-full h-full flex items-center justify-center scale-105
                      [&>div]:!w-full [&>div]:!h-full [&>div]:!max-w-none [&>div]:!p-0 [&>div]:flex [&>div]:items-center [&>div]:justify-center"
                    >
                      {service.renderCard(activeIndex === index)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Fallback Layout (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col gap-8 mt-8 w-full">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="flex flex-col overflow-hidden rounded-xl border border-gray-100 bg-gray-50/50 p-6 shadow-md"
              >
                {/* Visual Card */}
                <div className="relative h-56 w-full flex-shrink-0 flex items-center justify-center bg-white rounded-lg border border-gray-100 shadow-sm mb-6 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center p-4
                    [&>div]:!w-full [&>div]:!h-full [&>div]:!max-w-none [&>div]:!p-0 [&>div]:flex [&>div]:items-center [&>div]:justify-center"
                  >
                    {service.renderCard(true)}
                  </div>
                </div>
                {/* Text Content */}
                <div className="flex flex-col">
                  <span className="text-xs font-semibold uppercase tracking-wider text-secondary-500 mb-1">
                    0{index + 1}
                  </span>
                  <h3 className="text-xl font-bold text-main mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
    </section>
  );
}
