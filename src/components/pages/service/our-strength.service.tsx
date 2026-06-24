'use client';

import React from 'react';
import { Container } from '@/components/wrappers/container';
import { FeaturesBadge } from '@/components/customs/badge.custom';
import { useTranslations } from 'next-intl';

export const OurStrengthCard = () => {
  const t = useTranslations('Service');

  const solution = [
    {
      id: '1',
      title: `${t('OurStrength.step.q1')}`,
      desc: `${t('OurStrength.step.a2')}`,
    },
    {
      id: '2',
      title: `${t('OurStrength.step.q2')}`,
      desc: `${t('OurStrength.step.a2')}`,
    },
    {
      id: '3',
      title: `${t('OurStrength.step.q3')}`,
      desc: `${t('OurStrength.step.a3')}`,
    },
  ];
  return (
    <Container className="mx-auto py-8">
      <FeaturesBadge title="Our_service" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="flex flex-col gap-12">
          <div className="max-w-xl">
            <h2 className="text-4xl text-main font-bold mt-4 mb-4">
              {t('OurStrength.title')}
            </h2>
            <p className="text-secondary-800 text-base md:text-base font-body leading-relaxed">
              {t('OurStrength.description.t1')}{' '}
              <span className="font-bold">
                {t('OurStrength.description.t2')}{' '}
              </span>{' '}
              {t('OurStrength.description.t3')}{' '}
            </p>
          </div>
          <div className="">
            <button className="mt-8 bg-main hover:bg-primary-700 text-white font-mono text-xs font-medium tracking-widest uppercase px-7 py-3.5 transition-colors">
              {t('OurStrength.button')}→
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-8  mt-6">
          {solution.map((item, i) => (
            <div
              key={i}
              className="bg-primary-50 p-5 rounded-md transition-all duration-500 hover:translate-x-2"
            >
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="text-secondary-800 text-2xl font-bold text-on-surface mb-4">
                    {item.title}
                  </h3>
                  <p className="text-on-surface-variant leading-relaxed font-body">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
