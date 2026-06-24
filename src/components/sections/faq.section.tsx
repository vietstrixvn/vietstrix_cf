'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { Container } from '../wrappers/container';
import { FeaturesBadge } from '../customs/badge.custom';

export default function FAQSection() {
  const t = useTranslations('Page.FAQ');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = [1, 2, 3, 4, 5, 6];

  // Dynamic FAQ Page Schema for SEO / Search Engine crawlers
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqKeys.map((key) => ({
      '@type': 'Question',
      name: t(`items.q${key}`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`items.a${key}`),
      },
    })),
  };

  return (
    <section className="relative bg-white text-slate-900 py-20 lg:py-28 px-6 md:px-12 w-full border-t border-slate-100">
      {/* FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <Container className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 space-y-4">
          <FeaturesBadge title="FAQ" />
          <h2 className="text-3xl md:text-5xl font-black uppercase text-[#063265] tracking-tight">
            {t('title')}
          </h2>
          <p className="text-sm md:text-base text-slate-500 max-w-xl">
            {t('subtitle')}
          </p>
        </div>

        {/* Accordion list */}
        <div className="w-full space-y-4">
          {faqKeys.map((key, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={key}
                className="border border-slate-200/80 rounded-xl overflow-hidden bg-slate-50/30 hover:bg-slate-50/60 transition-all duration-300"
              >
                {/* Trigger Button */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-none group"
                  aria-expanded={isOpen}
                >
                  <span className="text-base md:text-lg font-bold text-slate-800 group-hover:text-[#007fff] transition-colors duration-300 pr-4">
                    {t(`items.q${key}`)}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-[#007fff]/10 group-hover:text-[#007fff] transition-colors duration-300">
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={isOpen ? 'minus' : 'plus'}
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </button>

                {/* Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-6 md:px-6 md:pb-8 pt-0 text-slate-600 text-sm md:text-base leading-relaxed border-t border-slate-100">
                        {t(`items.a${key}`)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
