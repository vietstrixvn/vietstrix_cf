import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import BlogList from './data';
import { logError } from '@/utils';

import { setRequestLocale } from 'next-intl/server';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; 'cate-slug': string }>;
}): Promise<Metadata> {
  const { locale, 'cate-slug': cateSlug } = await params;
  const isVi = locale === 'vi';
  const path = `/blogs/${cateSlug}`;
  
  const languagesAlternates = {
    en: `https://www.vietstrix.com/blogs/${cateSlug}`,
    vi: `https://www.vietstrix.com/vi/bai-viet/${cateSlug}`,
    'x-default': `https://www.vietstrix.com/blogs/${cateSlug}`,
  };

  return generatePageMetadata({
    title: isVi ? `Bài viết — ${cateSlug}` : `Blogs — ${cateSlug}`,
    description: isVi
      ? `Các bài viết chia sẻ kiến thức về ${cateSlug} - không lý thuyết suông, chỉ có kinh nghiệm thực tế và tối ưu hệ thống.`
      : `Real-world insights, coding tips, and engineering lessons under ${cateSlug} category.`,
    path,
    locale,
    ogImage: '/imgs/og/blogs.png',
    keywords: [
      'development blog',
      'web development',
      'software engineering',
      'product development',
      'ui ux design',
      'fullstack development',
      'startup journey',
      'vietstrix blog',
    ],
    alternates: {
      languages: languagesAlternates,
    },
  });
}

// Page uses searchParams, so it must be dynamically rendered.

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; 'cate-slug': string }>;
  searchParams: Promise<{ page?: string }>;
}) {
  const { locale, 'cate-slug': cateSlug } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  if (
    !cateSlug ||
    cateSlug === '[cate-slug]' ||
    cateSlug === '%5Bcate-slug%5D'
  ) {
    notFound();
  }

  const search = await searchParams;
  const page = parseInt(search.page || '1');

  try {
    // Fetch categories first to get category ID from slug
    const allCategories = await getCategories({ type: 'blogs', lang: locale });

    // Filter categories by locale
    const categories = allCategories.filter(
      (cat: any) => cat.lang === locale || cat.locale === locale
    );

    // Find the category by slug
    const currentCategory = categories.find(
      (cat: any) => cat.slug === cateSlug
    );

    // If category not found, return 404
    if (!currentCategory) {
      notFound();
    }

    // Fetch posts and recent posts in parallel using the category ID
    const [postsData, recentPostsData] = await Promise.all([
      getPosts({
        page,
        pageSize: 12,
        type: 'blogs',
        categoryId: currentCategory.id,
        lang: locale,
      }),
      getPosts({
        page: 1,
        pageSize: 5,
        categoryId: currentCategory.id,
        type: 'blogs',
        lang: locale,
      }),
    ]);

    const { posts, pagination } = postsData;
    const { posts: recentPosts } = recentPostsData;

    // Blog structured data
    const blogJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Vietstrix Blog',
      description:
        'Insights on web development, product building, UI/UX, and real-world engineering. Practical knowledge, system optimization, and lessons from building scalable products.',
      url:
        locale === 'vi'
          ? `https://www.vietstrix.com/vi/bai-viet/${cateSlug}`
          : `https://www.vietstrix.com/blogs/${cateSlug}`,
      publisher: {
        '@type': 'Organization',
        name: 'Vietstrix',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vietstrix.com/icons/logo-cricle.svg',
        },
      },
      inLanguage: ['en', 'vi'],
    };

    const breadcrumbItems = [
      {
        label: isVi ? 'Trang chủ' : 'Home',
        href: isVi ? '/vi' : '/',
      },
      {
        label: isVi ? 'Bài viết' : 'Blogs',
        href: isVi ? '/vi/bai-viet' : '/blogs',
      },
      {
        label: currentCategory.title,
        href: isVi ? `/vi/bai-viet/${cateSlug}` : `/blogs/${cateSlug}`,
      },
    ];
    const { generateBreadcrumbJsonLd } = await import('@/utils/breadcrumb.utils');
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(
      breadcrumbItems,
      'https://www.vietstrix.com'
    );

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <BlogList
          post={posts}
          recentPosts={recentPosts}
          categories={categories}
          pagination={pagination}
          currentPage={page}
        />
      </>
    );
  } catch (error) {
    logError('Error fetching posts:', error);
    notFound();
  }
}
