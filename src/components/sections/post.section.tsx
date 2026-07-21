'use client';

import { useTranslations } from 'next-intl';
import { PostResponse } from '@/types/portfolio';
import { SectionTag } from '../customs/section-tag.custom';
import { DesktopEmpty } from '../animations/tech.animation';
import { Link } from '@/i18n/navigation';
import { PostCard } from '../cards/post.card';
import { Container } from '../wrappers/container';

export default function BlogSection({
  posts = [],
}: {
  posts?: PostResponse[];
}) {
  const t = useTranslations('Page');

  return (
    <Container width='max-w-8xl' className="w-full bg-white mb">
      {/* Suggested Posts */}
      <section className="relative bg-white text-slate-900 py-12 lg:py-20  w-full border-t border-slate-100">
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
            {posts.map((post, index) => {
              const isParallax = index === 0 || index === 2;

              return (
                <div
                  key={post.id}
                  className={isParallax ? 'parallax-up' : 'parallax-static'}
                >
                  <PostCard item={post} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-gray-200">
            <DesktopEmpty />
          </div>
        )}
        <div className="mt-12 flex justify-center">
          <Link
            href="/blogs"
            className="inline-block bg-main hover:bg-slate-700 text-white text-xs font-bold tracking-widest uppercase px-8 py-4 transition-colors duration-200 whitespace-nowrap"
          >
            {t('Blog.view_more') || 'VIEW MORE'}
          </Link>
        </div>
      </section>
    </Container>
  );
}
