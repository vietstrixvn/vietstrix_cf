'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { Container } from '@/components/wrappers/container';
import { FeaturesBadge } from '@/components/customs/badge.custom';

export function FounderSection() {
  const t = useTranslations('About.Founder');

  return (
    <section className="py-20 lg:py-28 bg-stone-50 border-t border-b border-stone-200/60 overflow-hidden">
      <Container className="mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Left Side: Photo & Quote Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="relative group w-full max-w-sm aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
              <Image
                src="/imgs/ava.jpeg"
                alt="Hoang Pham - Founder of Vietstrix"
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* Quote block under picture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mt-6 border-l-2 border-main pl-4 italic text-sm md:text-base text-stone-600 max-w-sm"
            >
              {t('quote')}
            </motion.div>
          </motion.div>

          {/* Right Side: Copy & Profile Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center items-start"
          >
            <FeaturesBadge title="Our Founder" />

            <h2 className="text-4xl md:text-5xl font-black text-main mt-6 uppercase tracking-tight">
              {t('name')}
            </h2>
            <p className="text-sm md:text-base font-bold text-primary-800 uppercase tracking-widest mt-1">
              {t('role')}
            </p>

            <div className="mt-8 space-y-6 text-stone-600 text-base md:text-lg leading-relaxed font-normal">
              <p>{t('bio1')}</p>
              <p>{t('bio2')}</p>
            </div>

            {/* Micro-credentials/Facts list for E-E-A-T */}
            <div className="mt-8 grid grid-cols-2 gap-4 pt-6 border-t border-stone-200 w-full max-w-lg">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Approach</span>
                <span className="text-base font-bold text-main">Strategy & Execution</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-stone-400 font-semibold block">Focus</span>
                <span className="text-base font-bold text-main">Web & Digital Experiences</span>
              </div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
