'use client';

import React from 'react';
import { PostCard } from '../cards/post.card';
import { PostResponse } from '@/types/portfolio';
import { motion } from 'framer-motion';
import { DesktopEmpty, DesktopLoader } from '../animations/tech.animation';
import { useTranslations } from 'next-intl';
import { CustomButton } from '../buttons/view.button';

interface RecentPostSectionProps {
  posts: PostResponse[];
  isLoading?: boolean;
}

export const RecentPostSection = ({
  posts,
  isLoading = false,
}: RecentPostSectionProps) => {
  const t = useTranslations('Blog');

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-heading text-xl font-bold text-secondary-800">
          {t('Recent.title')}
        </h3>
        <CustomButton href="/blogs" variant="outline">
          View More
        </CustomButton>
      </div>
      <motion.div
        className="w-full"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={{ show: { transition: { staggerChildren: 0.2 } } }}
      >
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            <DesktopLoader />
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            {posts.map((item) => (
              <PostCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-md min-h-[400px]">
            <DesktopEmpty />
          </div>
        )}
      </motion.div>
    </div>
  );
};
