'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import { useTranslations } from 'next-intl';

export function WorkflowSection() {
  const t = useTranslations('About');
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: '+=150%',
            pin: true,
            scrub: 1.5,
            anticipatePin: 1,
          },
        });

        // Cards 1 and 3 start completely off-screen and rise way up (linear easing to match scrollbar)
        tl.fromTo(
          '.parallax-up',
          { y: 550 },
          {
            y: -140,
            ease: 'none',
          },
          0
        );

        // Cards 2 and 4 start partially visible at the bottom and rise slightly to reveal details
        tl.fromTo(
          '.parallax-static',
          { y: 220 },
          {
            y: 0,
            ease: 'none',
          },
          0
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      id: '01',
      title: `${t('Workflow.step.q1')}`,
      desc: `${t('Workflow.step.a1')}`,
    },
    {
      id: '02',
      title: `${t('Workflow.step.q2')}`,
      desc: `${t('Workflow.step.a2')}`,
    },
    {
      id: '03',
      title: `${t('Workflow.step.q3')}`,
      desc: `${t('Workflow.step.a3')}`,
    },
    {
      id: '04',
      title: `${t('Workflow.step.q4')}`,
      desc: `${t('Workflow.step.a4')}`,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="workflow-container relative lg:h-screen flex flex-col justify-between py-16 px-4 text-center overflow-hidden bg-white"
    >
      <Container width="max-w-8xl" className="w-full h-full flex flex-col justify-between">
        {/* Header Block: 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full text-left items-end pt-4">
          <div className="lg:col-span-6">
            <FeaturesBadge title="WORKFLOW" />
            <h2 className="text-4xl sm:text-5xl font-bold text-main mt-6 leading-tight uppercase font-heading">
              {t('Workflow.title')}
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pl-8">
            <p className="text-base sm:text-lg text-secondary-800 leading-relaxed font-normal">
              {t('Workflow.description')}
            </p>
          </div>
        </div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 w-full items-end pb-0">
          {steps.map((step, index) => {
            const isParallax = index === 0 || index === 2; // Steps 01 and 03
            return (
              <div
                key={step.id}
                className={isParallax ? 'parallax-up' : 'parallax-static'}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="relative p-6 group border border-primary-200 lg:border-r-0 last:lg:border-r transition-colors duration-300 hover:bg-main h-[280px] sm:h-[300px] lg:h-[360px] cursor-pointer bg-white hover:z-10"
                >
                  <div className="text-left h-full flex flex-col justify-between">
                    <div>
                      {/* Corner crosses */}
                      <span className="absolute top-2 left-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                        +
                      </span>
                      <span className="absolute top-2 right-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                        +
                      </span>
                      <span className="absolute bottom-2 left-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                        +
                      </span>
                      <span className="absolute bottom-2 right-2 text-primary-200 transition-colors group-hover:text-primary-200 text-xs">
                        +
                      </span>

                      {/* Number box */}
                      <div className="inline-flex items-center justify-center w-12 h-12 border border-primary-200 text-base font-medium text-main transition-all group-hover:text-white group-hover:font-bold mb-5">
                        {step.id}
                      </div>

                      <p className="text-lg transition-colors group-hover:text-white group-hover:font-bold text-main mb-2">
                        {step.title}
                      </p>
                      <p className="text-sm transition-colors group-hover:text-secondary-100 text-secondary-800 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>

        {/* CTA (Hidden on desktop to let cards align at the bottom, shown on mobile) */}
        <div className="w-full flex justify-center mt-12 lg:hidden">
          <button className="bg-main hover:bg-primary-700 text-white text-xs font-medium tracking-widest uppercase px-7 py-3.5 transition-colors">
            {t('Workflow.button')} →
          </button>
        </div>
      </Container>
    </section>
  );
}
