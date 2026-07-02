import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { generatePostMetadata } from '@/utils/metadata.utils';
import ArticleDetail from './data';
import { logError } from '@/utils';
import { getPostBySlug } from '@/libs/seo/getPosts';

// Generate static params for ISR
import { endpoints, handleAPI } from '@/apis';
export async function generateStaticParams() {
  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.list}?page_size=100&status=show&type=project`,
      'GET'
    );

    // API returns { pagination, results }
    const posts = response?.data?.results || [];

    return posts.map((post: any) => ({
      slug: post.slug,
    }));
  } catch (error) {
    logError('Error generating static params:', error);
    return [];
  }
}

import { setRequestLocale } from 'next-intl/server';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  return generatePostMetadata({ slug, locale });
}

// Revalidate every 1 hour
export const revalidate = 3600;

export default async function PostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    notFound();
  }

  try {
    const post = await getPostBySlug(slug, locale);

    if (!post) {
      notFound();
    }

    const { generateArticleJsonLd } = await import('@/utils/metadata.utils');
    const { generateBreadcrumbJsonLd } =
      await import('@/utils/breadcrumb.utils');

    const articleJsonLd = generateArticleJsonLd(post);

    // Generate breadcrumb structured data
    const isVi = locale === 'vi';
    const breadcrumbItems = [
      {
        label: isVi ? 'Dự án' : 'Projects',
        href: isVi ? '/vi/du-an' : '/projects',
      },
      {
        label: post.title,
        href: isVi ? `/vi/du-an/${post.slug}` : `/projects/${post.slug}`,
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
        <ArticleDetail post={post} />
      </>
    );
  } catch (error) {
    logError('[Project Detail] Error:', error);
    notFound();
  }
}
