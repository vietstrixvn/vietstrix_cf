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
      className="flex group flex-col overflow-hidden rounded-md border border-gray-200 bg-white cursor-pointer transition-all duration-250 hover:-translate-y-1 hover:border-gray-300 hover:shadow-xl"
    >
      {/* Thumbnail */}
      <div className="w-full aspect-video relative overflow-hidden bg-[#0d1b2a] flex items-center justify-center">
        <CustomImage
          src={imageUrl}
          alt={item.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3 px-[18px] py-4">
        {/* Meta */}
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400">
            Articles
          </span>
          <div className="w-[3px] h-[3px] rounded-md bg-gray-300" />
          <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-gray-400">
            {item.category.title}
          </span>
        </div>

        {/* Title */}
        <p className="text-lg font-normal group-hover:underline leading-relaxed text-gray-900 line-clamp-3">
          {item.title}
        </p>

        {/* Date */}
        <p className="text-xs tracking-wide text-gray-400">
          {formatSmartDate(item.created_at)}
        </p>
      </div>
    </Link>
  );
});
PostCard.displayName = 'PostCard';
