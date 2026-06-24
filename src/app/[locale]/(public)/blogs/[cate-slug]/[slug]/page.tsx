import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { endpoints } from '@/apis';
import { handleAPI } from '@/apis/handler';
import { generatePostMetadata } from '@/utils/metadata.utils';
import ArticleDetail from './data';
import { logError } from '@/utils';

export const dynamicParams = true;

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; 'cate-slug': string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return generatePostMetadata({ slug, locale });
}

// Revalidate every 1 hour
export const revalidate = 3600;

import { setRequestLocale } from 'next-intl/server';

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; 'cate-slug': string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    notFound();
  }

  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.slug(slug)}?populate=category,images,tags,creator&lang=${locale}`,
      'GET'
    );

    const post = response?.data;

    if (!post) {
      notFound();
    }

    // Redirect permanently if the post's language does not match the URL's locale context
    if (post.lang && post.lang !== locale) {
      const categorySlug = post.category?.slug || 'tin-tuc';
      if (post.lang === 'vi') {
        permanentRedirect(`/vi/bai-viet/${categorySlug}/${post.slug}`);
      } else {
        permanentRedirect(`/blogs/${categorySlug}/${post.slug}`);
      }
    }

    // Fetch recent posts from same category
    const recentPostsResponse = await handleAPI<any>(
      `${endpoints.cms.portfolios.list}?page=1&page_size=3&status=show&type=blogs&category_id=${post.category?.id}&lang=${locale}`,
      'GET'
    );

    const recentPosts = recentPostsResponse?.data?.results || [];
    // Filter out current post
    const filteredRecentPosts = recentPosts.filter(
      (p: any) => p.id !== post.id
    );

    const { generateArticleJsonLd } = await import('@/utils/metadata.utils');
    const { generateBreadcrumbJsonLd } =
      await import('@/utils/breadcrumb.utils');

    const articleJsonLd = generateArticleJsonLd(post);

    // Generate breadcrumb structured data
    const categorySlug = post.category?.slug || 'tin-tuc';
    const isVi = locale === 'vi';
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
        href: isVi
          ? `/vi/bai-viet/${categorySlug}/${post.slug}`
          : `/blogs/${categorySlug}/${post.slug}`,
      },
    ];
    const breadcrumbJsonLd = generateBreadcrumbJsonLd(
      breadcrumbItems,
      'https://www.vietstrix.com'
    );

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <ArticleDetail post={post} recentPosts={filteredRecentPosts} />
      </>
    );
  } catch (error) {
    logError('[Project Detail] Error:', error);
    notFound();
  }
}
