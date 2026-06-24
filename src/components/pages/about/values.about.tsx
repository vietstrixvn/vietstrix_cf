'use client';

import { FeaturesBadge } from '@/components/customs/badge.custom';
import { Container } from '@/components/wrappers/container';
import { motion } from 'framer-motion';
import { memo } from 'react';
import {
  Lightbulb,
  Zap,
  Cpu,
  Users,
  ShieldCheck,
  RefreshCcw,
} from 'lucide-react';
import { useTranslations } from 'next-intl';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WorkItem = memo(({ item }: { item: any }) => {
  const Icon = item.icon;

  return (
    <motion.div
      variants={itemVariants}
      whileInView="show"
      initial="hidden"
      viewport={{ once: true, amount: 0.2 }}
      className={`
        p-6 border border-white/10
        ${item.bg}
        backdrop-blur-sm
        hover:scale-[1.02] transition-all duration-300
      `}
    >
      {/* Icon */}
      <div
        className={`
          w-12 h-12 flex items-center justify-center
          rounded-md mb-6
          ${item.iconBg}
        `}
      >
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-main mb-2">{item.title}</h3>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed">{item.description}</p>
    </motion.div>
  );
});
WorkItem.displayName = 'WorkItem';

export const OurValuesSection = () => {
  const t = useTranslations('About');

  const workExperiences = [
    {
      title: `${t('Values.step.q1')}`,
      description: `${t('Values.step.a1')}`,
      icon: Lightbulb,
      bg: 'bg-blue-500/10',
      iconBg: 'bg-blue-500',
    },
    {
      title: `${t('Values.step.q2')}`,
      description: `${t('Values.step.a2')}`,
      icon: Zap,
      bg: 'bg-green-500/10',
      iconBg: 'bg-green-500',
    },
    {
      title: `${t('Values.step.q3')}`,
      description: `${t('Values.step.a3')}`,
      icon: Cpu,
      bg: 'bg-purple-500/10',
      iconBg: 'bg-purple-500',
    },
    {
      title: `${t('Values.step.q4')}`,
      description: `${t('Values.step.a4')}`,
      icon: Users,
      bg: 'bg-main/10',
      iconBg: 'bg-main',
    },
    {
      title: `${t('Values.step.q5')}`,
      description: `${t('Values.step.a5')}`,
      icon: ShieldCheck,
      bg: 'bg-orange-500/10',
      iconBg: 'bg-orange-500',
    },
    {
      title: `${t('Values.step.q6')}`,
      description: `${t('Values.step.a6')}`,
      icon: RefreshCcw,
      bg: 'bg-pink-500/10',
      iconBg: 'bg-pink-500',
    },
  ];

  return (
    <section className="bg-white min-h-screen py-16">
      {/* Section header */}

      <div className="border-b border-white mt-4" />

      <Container className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-12 gap-8 min-h-screen">
        {/* Left side */}
        <div className="col-span-12 lg:col-span-6 lg:p-6 lg:sticky lg:top-24 h-fit">
          <FeaturesBadge title="Our_Values" />
          <h2 className="text-4xl font-bold text-main font-mono uppercase mt-4 mb-4 flex items-center gap-2 leading-tight">
            {t('Values.title')}
          </h2>
        </div>

        {/* Right side */}
        <motion.div
          className="space-y-10 col-span-12 lg:col-span-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          {workExperiences.map((item, index) => (
            <WorkItem key={index} item={item} />
          ))}
        </motion.div>
      </Container>
    </section>
  );
};
