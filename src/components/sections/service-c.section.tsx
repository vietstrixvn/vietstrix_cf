'use client';

import { useState, useRef, useCallback } from 'react';
import { Container } from '../wrappers/container';
import { useTranslations } from 'next-intl';
import { useScrollPin } from '@/hooks';

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
  const lastIndexRef = useRef(0);

  // Stable callback — only triggers setState when the computed index actually changes
  // This avoids ~60 React re-renders/sec during scroll when the index stays the same
  const handleProgress = useCallback((progress: number) => {
    const newIndex = Math.min(Math.floor(progress * 6), 5);
    if (newIndex !== lastIndexRef.current) {
      lastIndexRef.current = newIndex;
      setActiveIndex(newIndex);
    }
  }, []);

  const pinRef = useScrollPin<HTMLDivElement>({
    end: '+=250%',
    scrub: true,
    onProgress: handleProgress,
  });

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



  return (
    <section className="w-full relative bg-white overflow-visible">
      {/* Header & Mobile layout inside normal flow */}
      <Container width="max-w-8xl" className="mx-auto flex flex-col gap-8 md:gap-12 w-full pt-12 lg:pt-16">
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

        {/* Mobile/Tablet Fallback Layout (Hidden on Desktop) */}
        <div className="lg:hidden flex flex-col gap-8 w-full">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="relative flex flex-col overflow-hidden border border-primary-200 bg-white p-6 shadow-md"
            >
              {/* 4 dấu + góc */}
              <span className="absolute top-2 left-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
              <span className="absolute top-2 right-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
              <span className="absolute bottom-2 left-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
              <span className="absolute bottom-2 right-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>

              {/* Visual Card */}
              <div className="relative h-56 w-full flex-shrink-0 flex items-center justify-center bg-transparent mb-6 overflow-hidden">
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

      {/* Desktop Interactive Layout (Hidden on Mobile/Tablet) */}
      <div
        ref={pinRef}
        className="hidden lg:flex w-full h-screen items-center justify-center overflow-hidden"
      >
        <Container width="max-w-8xl" className="mx-auto w-full">
          <div className="grid grid-cols-2 gap-16 items-center min-h-[480px]">
            {/* Left Column: Vertical Progress + Text content */}
            <div className="flex items-start gap-8 h-[360px]">
              {/* Vertical Progress Indicators */}
              <div className="flex flex-col gap-3 pt-2 shrink-0 justify-center h-full">
                {services.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1 transition-all duration-500 ease-out ${activeIndex === index
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
                    className={`absolute inset-0 flex flex-col justify-center transition-all duration-500 ease-out will-change-[transform,opacity] ${activeIndex === index
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
              <div className="w-full h-full bg-white border border-primary-200 shadow-xl overflow-hidden relative">
                {/* 4 dấu + góc */}
                <span className="absolute top-2 left-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
                <span className="absolute top-2 right-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
                <span className="absolute bottom-2 left-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>
                <span className="absolute bottom-2 right-2 text-primary-200 text-xs z-20 pointer-events-none">+</span>

                {services.map((service, index) => {
                  const isCurrent = activeIndex === index;
                  const isPassed = index < activeIndex;

                  let stackStyle = 'opacity-0 scale-95 translate-y-8 z-0 pointer-events-none';
                  if (isCurrent) {
                    stackStyle = 'opacity-100 scale-100 translate-y-0 z-10 pointer-events-auto';
                  } else if (isPassed) {
                    stackStyle = 'opacity-0 -translate-y-8 scale-105 z-0 pointer-events-none';
                  }

                  return (
                    <div
                      key={service.id}
                      className={`absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ease-out will-change-[transform,opacity] ${stackStyle}`}
                    >
                      <div className="w-full h-full flex items-center justify-center scale-105
                        [&>div]:!w-full [&>div]:!h-full [&>div]:!max-w-none [&>div]:!p-0 [&>div]:flex [&>div]:items-center [&>div]:justify-center"
                      >
                        {service.renderCard(isCurrent)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}
