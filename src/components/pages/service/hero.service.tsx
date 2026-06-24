'use client';

import { ServiceCard } from '@/components/animations/tech.animation';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';

export const ServiceHeroSetion = () => {
  const t = useTranslations('Service');

  const sectionRef = useRef(null);
  return (
    <section
      ref={sectionRef}
      className="w-full py-16 bg-white md:py-24 relative overflow-hidden pt-20 sm:pt-24"
    >
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.08] pointer-events-none z-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, #495057 1px, transparent 1px), linear-gradient(to bottom, #495057 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <Container className="mx-auto">
        <div className="mx-auto w-full flex justify-center">
          <FeaturesBadge title="OUR_MISSION" />
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center">
          <div className="w-full md:flex-1">
            <h1 className="uppercase font-black text-main text-[40px] sm:text-[56px] md:text-[72px] lg:text-[96px] leading-[0.85] tracking-tighter flex flex-col">
              <span className="text-main">{t('Hero.title.t1')}</span>
              <span className="ml-[32px] sm:ml-[60px] md:ml-[80px] lg:ml-[120px] text-outline-navy py-2 sm:py-3 md:py-4">
                {t('Hero.title.t2')}
              </span>
              <span className="text-primary-main">{t('Hero.title.t3')}</span>
            </h1>
          </div>
          <div className="flex md:flex-1 justify-center mt-2 md:mt-0 w-full">
            <div className="w-full scale-90 sm:scale-100 origin-top">
              <ServiceCard />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};
