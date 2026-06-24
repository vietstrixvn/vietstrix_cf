'use client';

import { Container } from '../wrappers/container';
import { formatSmartDate, truncateHtmlToText } from '@/utils';
import { useTranslations } from 'next-intl';
import { PostResponse } from '@/types/portfolio';
import { SectionTag } from '../customs/section-tag.custom';
import { CustomImage } from '../media/image.component';
import { DesktopEmpty } from '../animations/tech.animation';
import { Link } from '@/i18n/navigation';

export default function BlogSection({
  posts = [],
}: {
  posts?: PostResponse[];
}) {
  const t = useTranslations('Page');

  return (
    <div className="w-full bg-white mb-8">
      {/* Suggested Posts */}
      <Container className="mx-auto px-4 py-8 ">
        <SectionTag title="MORE FROM US" />
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            {/* Main Title */}
            <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl">
              Blog & News
            </h2>
          </div>

          {/* Description */}
          <div className="flex-1 lg:pl-8">
            <p className="text-base leading-relaxed text-black">
              {t('Blog.description')}
            </p>
          </div>
        </div>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                href={{
                  pathname: '/blogs/[cate-slug]/[slug]',
                  params: { 'cate-slug': post.category.slug, slug: post.slug },
                }}
                key={post.id}
                className="group flex flex-col border border-gray-200 rounded-md overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-48 overflow-hidden">
                  <CustomImage
                    src={post.images?.[0]?.url || '/placeholder.svg'}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-main text-white text-xs font-semibold px-2 py-1">
                    {post.category.title}
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="font-semibold text-main text-lg mb-2 group-hover:text-blue-600 transition-colors">
                    {truncateHtmlToText(post.title, 120)}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-500 text-xs">
                    <span>
                      {' '}
                      {post.creator.last_name} {post.creator.first_name}
                    </span>

                    <span>•</span>
                    <span>{formatSmartDate(post.created_at)}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200 rounded-md">
            <DesktopEmpty />
          </div>
        )}
      </Container>
    </div>
  );
}
