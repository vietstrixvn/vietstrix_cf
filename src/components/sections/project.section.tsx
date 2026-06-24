'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useRef, useState } from 'react';
import { PostResponse } from '@/types/portfolio';
import { DesktopEmpty, DesktopLoader } from '../animations/tech.animation';
import { useTranslations } from 'next-intl';
import { SectionTag } from '../customs/section-tag.custom';
import { truncateHtmlToText } from '@/utils';

export default function ProjectsSection({
  projects = [],
  isLoading = false,
}: {
  projects?: PostResponse[];
  isLoading?: boolean;
}) {
  const dynamicHeight = projects.length <= 2 ? 825 : 1650;
  const t = useTranslations('Page');

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <DesktopLoader />
        </div>
      );
    }

    if (projects.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-md">
          <DesktopEmpty />
        </div>
      );
    }

    return (
      <div className="relative">
        {/* Left column */}
        <div className="md:w-1/2 md:absolute md:left-0 md:top-0 md:pr-6 space-y-16">
          {projects
            .filter((_, i) => i % 2 === 0)
            .map((study, index) => (
              <CaseStudyCard key={study.id} study={study} index={index * 2} />
            ))}
        </div>

        {/* Right column - starts lower */}
        <div className="md:w-1/2 md:absolute md:right-0 md:top-[10%] md:pl-6 space-y-16">
          {projects
            .filter((_, i) => i % 2 === 1)
            .map((study, index) => (
              <CaseStudyCard
                key={study.id}
                study={study}
                index={index * 2 + 1}
              />
            ))}
        </div>

        <div
          className="hidden md:block"
          style={{ height: `${dynamicHeight}px` }}
        />
      </div>
    );
  };

  return (
    <section className="py-4 px-4 md:px-4 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <SectionTag title="Our experience" />
          <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl">
              {t('Project.title')}
            </h2>
            <div className="space-y-4">
              <p className="text-base leading-relaxed text-black">
                {t('Project.description')}
              </p>
              <div className="flex justify-end">
                <Link
                  href="/projects"
                  className="bg-primary-950 text-white px-6 border-b-2 boerder-primary-200 py-2 rounded-md text-[0.85rem] font-black shadow-warm-sm hover:bg-primary-900 hover:-translate-y-0.5 transition-all"
                >
                  {t('Project.button')}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {renderContent()}
      </div>
    </section>
  );
}

interface CaseStudyCardProps {
  study: PostResponse;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const imageUrl = study.images?.[0]?.url || '/placeholder.svg';
  const year = new Date(study.created_at).getFullYear();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    setMousePosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-2 md:mb-0 cursor-pointer"
    >
      <Link
        href={{ pathname: '/projects/[slug]', params: { slug: study.slug } }}
      >
        <div
          ref={imageRef}
          className="overflow-hidden rounded-md group relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          <div className="aspect-4/3 relative">
            <Image
              src={imageUrl}
              alt={study.title}
              width={800}
              height={600}
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />

            {isHovering && (
              <motion.div
                className="absolute flex items-center justify-center bg-main bg-opacity-60 text-white px-4 py-2 rounded-md text-sm font-medium z-10 pointer-events-none whitespace-nowrap"
                style={{
                  left: mousePosition.x - 50,
                  top: mousePosition.y - 20,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.15 }}
              >
                Read more
              </motion.div>
            )}

            <div className="absolute inset-0 bg-black/30 bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <p className="text-gray-600 font-medium">
              {study.category?.title || 'Project'}
            </p>
            <p className="text-gray-500">{year}</p>
          </div>

          <h3 className="text-2xl font-bold mb-4 text-main">{study.title}</h3>

          {study.description && (
            <p className="text-gray-600 line-clamp-2">
              {truncateHtmlToText(study.description, 300)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
