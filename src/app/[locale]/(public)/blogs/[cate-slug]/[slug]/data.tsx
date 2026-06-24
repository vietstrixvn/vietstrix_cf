'use client';

import { formatSmartDate } from '@/utils';
import { useEffect } from 'react';
import { Icons } from '@/assets';
import Link from 'next/link';
import { RichTextContent } from '@/components/tiptap/RichTextContent';
import { PostResponse } from '@/types/portfolio';
import { Container } from '@/components/wrappers/container';
import { CustomImage } from '@/components';
import TableOfContents from '@/components/cards/toc.card';
import { RecentPostSection } from '@/components/sections/recent-post.section';
import AuthorCard from '@/components/cards/author.card';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { useLocale } from 'next-intl';

interface ArticleDetailProps {
  post: PostResponse;
  recentPosts?: PostResponse[];
}

export default function ArticleDetail({
  post,
  recentPosts = [],
}: ArticleDetailProps) {
  const locale = useLocale();
  const isVi = locale === 'vi';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-main mb-4">
            {'Post not found'}
          </h2>
          <Link
            href="/project"
            className="text-primary font-bold hover:underline"
          >
            Back
          </Link>
        </div>
      </div>
    );
  }

  // Generate breadcrumb items
  const categorySlug = post.category?.slug || 'tin-tuc';
  const breadcrumbItems = [
    {
      label: isVi ? 'Blog' : 'Blogs',
      href: isVi ? '/vi/bai-viet' : '/blogs',
    },
    {
      label: post.category?.title || (isVi ? 'Tin tức' : 'News'),
      href: isVi ? `/vi/bai-viet/${categorySlug}` : `/blogs/${categorySlug}`,
    },
    {
      label: post.title,
    },
  ];

  return (
    <Container className="pt-20 mx-auto pb-32 bg-white overflow-x-hidden lg:overflow-x-visible">
      {/* Breadcrumb Navigation */}
      <Breadcrumb items={breadcrumbItems} />

      {/* Article Hero Image */}
      <section className="h-auto aspect-[16/9] md:h-[60vh] md:aspect-auto overflow-hidden">
        <CustomImage
          src={post.images?.[0]?.url || '/imgs/vsv.webp'}
          alt={post.title}
          className="rounded-none object-cover w-full h-full"
          width={1200}
          height={600}
        />
      </section>

      {/* Article Header */}
      <section className=" mt-12">
        <div className="w-full">
          <span className="inline-block text-[0.7rem] font-bold uppercase tracking-widest mb-4 px-4 py-1 rounded-md bg-secondary-100 shadow-sm text-main">
            {post?.category?.title || 'Tin tức'}
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-black text-secondary-800 leading-[1.1] mb-6">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-[0.9rem] text-secondary-700">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-beige flex items-center justify-center text-xs font-bold text-primary">
                <CustomImage
                  src="/icons/logo-cricle.svg"
                  alt="logo"
                  width={25}
                  height={50}
                />
              </div>
              <span className="font-bold text-main">
                {post?.creator?.first_name || 'Admin'}{' '}
                {post?.creator?.last_name || ''}
              </span>
            </div>
            <span>•</span>
            <time>{formatSmartDate(post?.created_at)}</time>
          </div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="mt-8 space-y-4">
        {/* Share Section */}
        <div className="mt-16 pt-10 border-t border-divider flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold uppercase tracking-wider text-secondary-700">
              Share:
            </span>
            <button
              onClick={() => {
                const url = window.location.href;
                navigator.clipboard.writeText(url).then(() => {});
              }}
              className="flex text-main items-center gap-2 px-4 py-2 rounded-md border border-divider hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
            >
              <Icons.Link />
              <span className="text-sm font-medium">Copy link</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="mt-8">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-20">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24">
              <TableOfContents htmlContent={post.description} />
            </div>
          </aside>
          <div className="lg:col-span-9 space-y-6 min-w-0">
            <div className="max-w-none prose prose-lg prose-primary overflow-hidden">
              <RichTextContent
                html={post.description}
                className="prose rich-text-content prose-sm max-w-none"
              />
            </div>
            <AuthorCard author={post?.creator} />
            <div className="flex flex-wrap items-center gap-2 overflow-hidden">
              <span className="text-sm font-bold text-secondary-700">
                Tags:
              </span>
              {post.tags?.map((tag) => (
                <span
                  key={tag.id}
                  className="inline-block px-3 py-1 text-xs font-medium rounded-md bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors duration-200"
                >
                  {tag.title}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-16">
        <RecentPostSection posts={recentPosts} />
      </section>
    </Container>
  );
}
