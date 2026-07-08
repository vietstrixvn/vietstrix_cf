import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import BlogList from './data';
import { logError } from '@/utils';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  return generatePageMetadata({
    title: isVi ? 'Blog' : 'Blogs',
    description: isVi
      ? 'Vietstrix chia sẻ kiến thức thực tế về lập trình, xây dựng sản phẩm và mở rộng ý tưởng thành sản phẩm thật sự.'
      : 'Vietstrix shares real-world insights on coding, product building, and scaling ideas into actual products. No fluff — just practical knowledge, optimization, and execution.',
    path: '/blogs',
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
  });

}

// Page uses searchParams, so it must be dynamically rendered.

import { setRequestLocale } from 'next-intl/server';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string; search?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const search = await searchParams;
  const page = parseInt(search.page || '1');
  const categoryFilter = search.category;
  const searchQuery = search.search || null;

  try {
    const [postsData, recentPostsData, allCategories] = await Promise.all([
      getPosts({
        page,
        pageSize: 12,
        type: 'blogs',
        categoryId: categoryFilter || null,
        lang: locale,
        search: searchQuery,
      }),
      getPosts({
        page: 1,
        pageSize: 5,
        ...(categoryFilter && { category_id: categoryFilter }),
        type: 'blogs',
      }),
      getCategories({ type: 'blogs', lang: locale }),
    ]);

    const { posts, pagination } = postsData;
    const { posts: recentPosts } = recentPostsData;

    const categories = allCategories.filter(
      (cat: any) => cat.lang === locale || cat.locale === locale
    );

    const blogJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Vietstrix Blog',
      description:
        'Insights on web development, product building, UI/UX, and real-world engineering.',
      url:
        locale === 'vi'
          ? 'https://www.vietstrix.com/vi/bai-viet'
          : 'https://www.vietstrix.com/blogs',
      inLanguage: locale, // 👈 đúng ngôn ngữ theo locale
      publisher: {
        '@type': 'Organization',
        name: 'Vietstrix',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.vietstrix.com/icons/logo-cricle.svg',
        },
      },
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
        />
        <BlogList
          post={posts}
          recentPosts={recentPosts}
          categories={categories}
          pagination={pagination}
          currentPage={page}
          initialSearch={searchQuery || ''}
        />
      </>
    );
  } catch (error) {
    logError('Error fetching posts:', error);
    notFound();
  }
}
