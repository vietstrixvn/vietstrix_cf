'use client';

import React, { useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Arrows } from '@/assets';
import { useCounterAnimation } from '@/hooks';
import { Container } from '../wrappers/container';

export default function PerformentSection() {
  const t = useTranslations('Page.Stats');

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const statsData = React.useMemo(
    () => [
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
    ],
    [t]
  );

  // Single hook call replaces: isClient state, createCounter callback, and the full useEffect
  const containerRef = useCounterAnimation(
    {
      items: statsData.map((s) => ({ value: s.value })),
      cardElements: cardRefs.current,
      bottomElement: bottomRef.current,
    },
    [statsData]
  );

  return (
    <section
      ref={containerRef}
      className="relative bg-white text-slate-900 py-12 lg:py-20 px-6 md:px-12 lg:px-16 w-full border-t border-slate-100 overflow-x-hidden"
    >
      <Container width='max-w-8xl' className="relative z-10">
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
            className="inline-flex items-center gap-3 bg-main hover:bg-main/90 text-white font-bold h-12 px-6 transition-all duration-300 group shadow-lg shadow-main/10 hover:shadow-main/20 shrink-0"
          >
            <span>{t('cta')}</span>
            <Arrows.ArrowRight />
          </Link>
        </div>
      </Container>
    </section>
  );
}
