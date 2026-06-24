import { Metadata } from 'next';
import { endpoints } from '@/apis';
import { handleAPI } from '@/apis/handler';
import { logError } from './logger.util';

interface PostMetadataOptions {
  slug: string;
  locale?: string;
  baseUrl?: string;
  siteName?: string;
  defaultImage?: string;
}

/**
 * Helper to dynamically format the correct absolute post/portfolio URL based on type and active locale.
 * Matches next-intl path translations configured in i18n/routing.ts
 */
export const getPostUrl = (
  post: any,
  locale: string = 'en',
  baseUrl: string = 'https://www.vietstrix.com'
): string => {
  const isProject = post.type === 'project' || post.type === 'projects';
  const categorySlug = post.category?.slug || 'tin-tuc';

  if (locale === 'vi') {
    if (isProject) {
      return `${baseUrl}/vi/du-an/${post.slug}`;
    }
    return `${baseUrl}/vi/bai-viet/${categorySlug}/${post.slug}`;
  }

  // English (default) - uses standard URL path with prefix 'as-needed' (so no /en prefix for en)
  if (isProject) {
    return `${baseUrl}/projects/${post.slug}`;
  }
  return `${baseUrl}/blogs/${categorySlug}/${post.slug}`;
};

/**
 * Shared helper to optimize and ensure OG Image is always an absolute URL.
 * Leverages Next.js built-in image optimizer to compress size under 400 KB (WhatsApp/LinkedIn friendly).
 */
export const getOptimizedOgImageUrl = (
  url?: string,
  baseUrl: string = 'https://www.vietstrix.com',
  defaultImage: string = '/imgs/vsv.webp'
): string => {
    if (!url) return `${baseUrl}${defaultImage.startsWith('/') ? defaultImage : `/${defaultImage}`}`;

  const isRemote = url.startsWith('http://') || url.startsWith('https://');
  const isAllowedRemote = url.includes('hcm03.vstorage.vngcloud.vn') || url.includes('api.dicebear.com');

  // If it's a remote image not in nextConfig remotePatterns, we can't use Next.js optimizer
  if (isRemote && !isAllowedRemote) {
    return url;
  }

  // For next/image: local paths must be relative (e.g. /imgs/vsv.webp), remote must be full URL
  const targetPath = isRemote ? url : (url.startsWith('/') ? url : `/${url}`);

  // Compress to 1200px width at 70% quality (reduces size from 600KB+ to ~150KB)
  return `${baseUrl}/_next/image?url=${encodeURIComponent(targetPath)}&w=1200&q=70`;
};

/**
 * Generate metadata for post detail pages
 * @param options - Configuration options for metadata generation
 * @returns Metadata object for Next.js
 */
export async function generatePostMetadata(
  options: PostMetadataOptions
): Promise<Metadata> {
  const {
    slug,
    locale = 'en',
    baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietstrix.com',
    siteName = 'Vietstrix',
    defaultImage = '/imgs/vsv.webp',
  } = options;

  if (!slug || slug === '[slug]' || slug === '%5Bslug%5D') {
    return {
      title: 'Post Not Found',
    };
  }

  try {
    const response = await handleAPI<any>(
      `${endpoints.cms.portfolios.slug(slug)}?populate=category,images,tags,creator&lang=${locale}`,
      'GET'
    );
    const post = response?.data;

    if (!post) {
      return {
        title: 'Post Not Found',
      };
    }

    const creatorName = post.creator
      ? `${post.creator.first_name || ''} ${post.creator.last_name || ''}`.trim()
      : (post.author?.name || 'Hoang Pham Minh');

    const articleUrl = getPostUrl(post, locale, baseUrl);
    const ogImageUrl = getOptimizedOgImageUrl(post.thumbnail || post.images?.[0]?.url, baseUrl, defaultImage);

    const rawDescription = post.excerpt || post.description || '';
    const cleanDescription = rawDescription
      .replace(/<[^>]*>/g, '') // Strip HTML tags
      .replace(/\s+/g, ' ')    // Collapse multiple whitespaces
      .trim()
      .slice(0, 160);

    const keywords = post.tags?.map((tag: any) => tag.title || tag.slug).filter(Boolean) || [];

    return {
      title: post.title,
      description: cleanDescription,
      keywords: keywords,
      authors: [{ name: creatorName }],
      openGraph: {
        title: post.title,
        description: cleanDescription,
        url: articleUrl,
        siteName,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        locale: locale === 'vi' ? 'vi_VN' : 'en_US',
        type: 'article',
        publishedTime: post.created_at,
        modifiedTime: post.updated_at,
        authors: [creatorName],
        tags: keywords,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: cleanDescription,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: articleUrl,
      },
    };
  } catch (error) {
    logError('Metadata fetch error:', error);

    return {
      title: 'Error loading post',
    };
  }
}

/**
 * Generate JSON-LD structured data for article
 * @param post - Post data object
 * @returns JSON-LD object
 */
export function generateArticleJsonLd(post: any) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.vietstrix.com';
  const locale = post?.lang || 'en';

  const creatorName = post?.creator
    ? `${post.creator.first_name || ''} ${post.creator.last_name || ''}`.trim()
    : 'Hoang Pham Minh';

  const image = getOptimizedOgImageUrl(post.thumbnail || post.images?.[0]?.url, baseUrl);

  const authorUrl = post.creator?.social_links?.linkedin
    || post.creator?.social_links?.github
    || post.creator?.social_links?.facebook
    || baseUrl;

  // Clean description for schema: remove html tags and limit length
  const cleanDescription = (post.excerpt || post.description || '')
    .replace(/<[^>]*>/g, '')
    .slice(0, 160)
    .trim();

  const articleUrl = getPostUrl(post, locale, baseUrl);

  return {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    '@id': `${articleUrl}#article`,
    isPartOf: {
      '@type': 'WebPage',
      '@id': articleUrl,
      url: articleUrl,
      name: post.title,
    },
    headline: post.title,
    description: cleanDescription,
    image: image,
    datePublished: post.created_at,
    dateModified: post.updated_at || post.created_at,
    mainEntityOfPage: articleUrl,
    author: {
      '@type': 'Person',
      name: creatorName,
      jobTitle: post.creator?.role_title || 'Software Engineer',
      image: post.creator?.avatar_url || `${baseUrl}/icons/logo-cricle.svg`,
      sameAs: [authorUrl].filter(Boolean),
    },
    publisher: {
      '@type': 'Organization',
      name: 'Vietstrix',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/icons/logo-cricle.svg`,
      },
      sameAs: [
        'https://www.facebook.com/VietStrix.dev',
        'https://github.com/vietstrixvn',
        'https://www.linkedin.com/company/vietstrix',
        'https://www.instagram.com/vietstrix',
      ],
    },
  };
}
