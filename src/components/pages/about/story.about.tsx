'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import { useTranslations } from 'next-intl';

export default function StorySection() {
  const t = useTranslations('About');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Get all rows
    const rows = gsap.utils.toArray('.story-row') as HTMLElement[];

    rows.forEach((row) => {
      const line = row.querySelector('.story-line');
      const title = row.querySelector('.story-title');
      const content = row.querySelector('.story-content');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });

      // 1. Draw the horizontal line from left to right (origin-left)
      tl.to(line, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
      })
      // 2. Fade and slide up the title and content elements smoothly
      .to(
        [title, content],
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
        },
        '-=0.8' // overlap with line animation for absolute fluidity
      );
    });

    // Animate the bottom closing line
    const bottomLine = document.querySelector('.story-bottom-line');
    if (bottomLine) {
      gsap.to(bottomLine, {
        scaleX: 1,
        duration: 1.2,
        ease: 'power3.inOut',
        scrollTrigger: {
          trigger: bottomLine,
          start: 'top 90%',
          toggleActions: 'play none none none',
        },
      });
    }

    return () => {
      ScrollTrigger.getById('story-bottom')?.kill();
      rows.forEach((row) => {
        const rowTriggers = ScrollTrigger.getAll().filter(
          (t) => t.vars.trigger === row
        );
        rowTriggers.forEach((t) => t.kill());
      });
    };
  }, []);

  const items = [
    {
      question: `${t('Accordion.q1')}`,
      answer: (
        <>
          <p className="mb-4">{t('Accordion.a1.intro')}</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a1.t1')}
              </strong>{' '}
              {t('Accordion.a1.a1')}
            </li>
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a1.t2')}
              </strong>{' '}
              {t('Accordion.a1.a2')}
            </li>
          </ul>
        </>
      ),
    },
    {
      question: `${t('Accordion.q2')}`,
      answer: (
        <>
          <p className="mb-4">{t('Accordion.a2.intro')}</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a2.t1')}
              </strong>{' '}
              {t('Accordion.a2.a1')}.
            </li>
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a2.t2')}
              </strong>{' '}
              {t('Accordion.a2.a2')}.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: `${t('Accordion.q3')}`,
      answer: (
        <>
          <p className="mb-4">{t('Accordion.a3.intro')}</p>
          <ul className="list-disc pl-5 space-y-3">
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a3.t1')}
              </strong>{' '}
              {t('Accordion.a3.a1')}.
            </li>
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a3.t2')}
              </strong>{' '}
              {t('Accordion.a3.a2')}.
            </li>
            <li>
              <strong className="text-secondary-900 font-bold">
                {t('Accordion.a3.t3')}
              </strong>{' '}
              {t('Accordion.a3.a3')}.
            </li>
          </ul>
        </>
      ),
    },
  ];

  return (
    <Container width='max-w-8xl' className="mx-auto min-h-screen flex flex-col justify-center py-8 ">
      <div ref={sectionRef} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 mb-4 items-start w-full">
        <div className="lg:col-span-4 flex flex-col">
          <FeaturesBadge title="Our_strory" />
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-main mt-6 tracking-tight leading-none uppercase">
            {t('Introduce.title')}
          </h2>
        </div>
        <div className="lg:col-span-8 lg:pt-16">
          <p className="text-lg md:text-xl lg:text-2xl text-secondary-600 font-medium leading-relaxed">
            {t('Introduce.description')}
          </p>
        </div>
      </div>

      {/* Row List Container */}
      <div className="w-full relative mt-8 flex flex-col">
        {items.map((item, index) => (
          <div
            key={index}
            className="story-row relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 md:py-16 items-start overflow-hidden"
          >
            {/* Animated horizontal divider line */}
            <div className="story-line absolute top-0 left-0 w-full h-[1px] bg-secondary-300 origin-left scale-x-0" />

            {/* Left Column: Title / Question */}
            <div className="lg:col-span-4 story-title opacity-0 translate-y-8">
              <h3 className="text-2xl md:text-3xl font-extrabold text-main uppercase tracking-tight leading-snug">
                {item.question}
              </h3>
            </div>

            {/* Right Column: Detailed Description */}
            <div className="lg:col-span-8 story-content opacity-0 translate-y-8 text-secondary-600 text-base md:text-lg leading-relaxed space-y-4">
              {item.answer}
            </div>
          </div>
        ))}

        {/* Animated bottom closing line to wrap the section */}
        <div className="story-bottom-line w-full h-[1px] bg-secondary-300 origin-left scale-x-0" />
      </div>
    </Container>
  );
}
