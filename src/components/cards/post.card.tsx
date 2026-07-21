import React, { memo } from 'react';
import { CustomImage } from '@/components';
import { PostResponse } from '@/types/portfolio';
import { formatSmartDate } from '@/utils';
import { Link } from '@/i18n/navigation';

export const PostCard = memo(({ item }: { item: PostResponse }) => {
  const imageUrl = item.images?.[0]?.url || '/imgs/vsv.webp';

  return (
    <Link
      href={{
        pathname: '/blogs/[cate-slug]/[slug]',
        params: { 'cate-slug': item.category.slug, slug: item.slug },
      }}
      className="flex group flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg h-full"
    >
      <div className="relative group border border-primary-200 will-change-[background-color] transition-[background-color] duration-150 hover:bg-main cursor-pointer bg-white hover:z-10 overflow-hidden h-full flex flex-col">
        {/* 4 dấu + góc */}
        <span className="absolute top-2 left-2 text-primary-200 group-hover:text-white/40 transition-colors duration-150 text-xs z-20 pointer-events-none">
          +
        </span>
        <span className="absolute top-2 right-2 text-primary-200 group-hover:text-white/40 transition-colors duration-150 text-xs z-20 pointer-events-none">
          +
        </span>
        <span className="absolute bottom-2 left-2 text-primary-200 group-hover:text-white/40 transition-colors duration-150 text-xs z-20 pointer-events-none">
          +
        </span>
        <span className="absolute bottom-2 right-2 text-primary-200 group-hover:text-white/40 transition-colors duration-150 text-xs z-20 pointer-events-none">
          +
        </span>

        {/* Thumbnail */}
        <div className="w-full aspect-video relative overflow-hidden shrink-0">
          <CustomImage
            src={imageUrl}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Body */}
        <div className="flex flex-col gap-3 px-[18px] py-4 flex-1">
          {/* Meta */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400 group-hover:text-white/60 transition-colors duration-150">
              Articles
            </span>
            <div className="w-[3px] h-[3px]  bg-gray-300 group-hover:bg-white/40 transition-colors duration-150" />
            <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400 group-hover:text-white/60 transition-colors duration-150">
              {item.category.title}
            </span>
          </div>

          {/* Title */}
          <p className="text-lg font-normal group-hover:underline group-hover:text-white leading-relaxed text-gray-900 line-clamp-3 transition-colors duration-150">
            {item.title}
          </p>

          {/* Date */}
          <p className="text-xs tracking-wide text-gray-400 group-hover:text-white/60 transition-colors duration-150 mt-auto">
            {formatSmartDate(item.created_at)}
          </p>
        </div>
      </div>
    </Link>
  );
});
PostCard.displayName = 'PostCard';
