'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { SectionTag } from '../customs/section-tag.custom';
import { Container } from '../wrappers/container';

export default function FAQSection() {
  const t = useTranslations('Page.FAQ');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqKeys = [1, 2, 3, 4, 5, 6];

  const rows = [
    { left: 1, right: 2, leftIdx: 0, rightIdx: 1 },
    { left: 3, right: 4, leftIdx: 2, rightIdx: 3 },
    { left: 5, right: 6, leftIdx: 4, rightIdx: 5 },
  ];

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

  const FAQCell = ({
    faqKey,
    index,
    isLeft,
  }: {
    faqKey: number;
    index: number;
    isLeft: boolean;
  }) => {
    const isOpen = openIndex === index;

    return (
      <div
        className={`relative p-6 lg:p-8 flex flex-col justify-start h-full min-h-[140px] transition-colors duration-200 cursor-pointer hover:bg-slate-50/50 ${isLeft
          ? 'border-l-2 border-dashed border-orange-400 md:border-r md:border-slate-200 max-md:border-b max-md:border-dashed max-md:border-slate-300'
          : ''
          }`}
        onClick={() => toggleAccordion(index)}
      >
        {/* Header inside cell: Question title & Plus/X Icon */}
        <div className="flex items-start justify-between gap-4 w-full pr-8">
          <h3 className="text-base md:text-lg font-medium text-slate-900 leading-snug">
            {t(`items.q${faqKey}`)}
          </h3>
          <div className="absolute top-6 right-6 lg:top-8 lg:right-8 text-slate-400 hover:text-slate-600 transition-colors">
            {isOpen ? (
              <X size={20} className="stroke-[1.5]" />
            ) : (
              <Plus size={20} className="stroke-[1.5]" />
            )}
          </div>
        </div>

        {/* Answer section expanding directly inside cell */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <p className="text-sm md:text-base text-slate-500 leading-relaxed mt-4 pr-4">
                {t(`items.a${faqKey}`)}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <Container width='max-w-8xl' className="relative bg-white text-slate-900 py-24 lg:py-32 w-full border-t border-slate-100 flex flex-col justify-center">
      {/* FAQ Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="w-full mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24">
          {/* Left Column (4/12) — Header & CTA */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-12 lg:sticky lg:top-28 self-start">
            {/* Section Header */}
            <div className="flex flex-col items-start text-left space-y-6">
              <SectionTag title="FAQ" />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-black uppercase text-[#063265] tracking-tight">
                {t('title')}
              </h2>
              <p className="text-sm md:text-base text-slate-500 leading-relaxed">
                {t('subtitle')}
              </p>
            </div>

            {/* CTA Footer */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8 border-t border-slate-200 w-full">
              <p className="text-xs font-semibold tracking-widest uppercase text-slate-500">
                {t('cta_label') || 'GOT SOME OTHER QUESTIONS?'}
              </p>
              <Link
                href={`/${locale}/contact-us`}
                className="inline-block bg-main hover:bg-slate-700 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 transition-colors duration-200 whitespace-nowrap"
              >
                {t('cta_button') || 'SEND MESSAGE'}
              </Link>
            </div>
          </div>

          {/* Right Column (8/12) — Grid Rows with Synced Height & Continuous Lines */}
          <div className="lg:col-span-8 w-full flex flex-col">
            {rows.map((row, rIdx) => (
              <div
                key={rIdx}
                className={`grid grid-cols-1 md:grid-cols-2 items-stretch ${rIdx < rows.length - 1
                  ? 'border-b border-dashed border-slate-300'
                  : ''
                  }`}
              >
                <FAQCell faqKey={row.left} index={row.leftIdx} isLeft={true} />
                <FAQCell faqKey={row.right} index={row.rightIdx} isLeft={false} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
