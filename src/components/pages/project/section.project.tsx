'use client';

import { FeaturesBadge } from '@/components/customs/badge.custom';
import { motion } from 'framer-motion';
import { memo } from 'react';

import { truncateHtmlToText } from '@/utils';
import { Link } from '@/i18n/navigation';
import {
  DesktopEmpty,
  DesktopLoader,
} from '@/components/animations/tech.animation';
import { CustomImage } from '@/components/media/image.component';
import { ProjectListProps } from '@/types/portfolio';

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const WorkItem = memo(({ item }: { item: any }) => {
  const imageUrl = item.images?.[0]?.url || '/imgs/OG-Image.png';

  return (
    <Link href={{ pathname: '/projects/[slug]', params: { slug: item.slug } }}>
      <motion.div
        variants={itemVariants}
        whileInView="show"
        initial="hidden"
        viewport={{ once: true, amount: 0.2 }}
        className="border-b border-gray-200 flex flex-col p-4 md:p-2 gap-6
                   min-h-[60vh] md:h-screen
                   backdrop-blur-sm hover:bg-gray-50/50 transition-all duration-300"
      >
        <div className="flex flex-col gap-3">
          {' '}
          {/* ← bỏ md:flex-row, stack dọc */}
          <div className="space-y-2">
            <div className="text-main text-sm font-semibold tracking-widest uppercase">
              {item.category?.title || 'Uncategorized'}
            </div>
            <h3 className="text-xl md:text-3xl font-bold text-main">
              /{item.title}
            </h3>
          </div>
          <p className="text-gray-600 leading-relaxed text-sm md:text-base">
            {truncateHtmlToText(item.description, 120)}
          </p>
        </div>

        {/* Image */}
        <div className="flex-1 w-full overflow-hidden rounded-md min-h-[200px]">
          {' '}
          {/* ← thêm min-h */}
          <CustomImage
            src={imageUrl}
            alt={item.title}
            width={900}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>
    </Link>
  );
});
WorkItem.displayName = 'WorkItem';

export const OurProjectSection: React.FC<ProjectListProps> = ({
  project,
  isLoading = false,
}) => {
  return (
    <section className="bg-white min-h-screen px">
      <div className="w-full mx-auto grid grid-cols-12 gap-8">
        {/* ── Left side: sticky ── */}
        <div className="col-span-12 lg:col-span-4 px-2 pt-6 lg:sticky lg:top-24 h-fit">
          <FeaturesBadge title="Our_projects" />
          <h2 className="text-4xl font-bold text-main font-mono uppercase mt-4 mb-4 flex items-center gap-2 leading-tight">
            Our core values.
          </h2>
        </div>

        {/* ── Right side: fullscreen cards stacked ── */}
        <motion.div
          className="col-span-12 lg:col-span-8"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ show: { transition: { staggerChildren: 0.2 } } }}
        >
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-12">
              <DesktopLoader />
            </div>
          ) : project.length > 0 ? (
            project.map((item) => <WorkItem key={item.id} item={item} />)
          ) : (
            <div className="flex flex-col min-h-screen items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-md ">
              <DesktopEmpty />
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
