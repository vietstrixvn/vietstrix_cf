import { MetadataRoute } from 'next';
import { getPosts } from '@/libs/seo/getPosts';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.vietstrix.com';

  // Static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          en: baseUrl,
          vi: `${baseUrl}/vi`,
        },
      },
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/about-us`,
          vi: `${baseUrl}/vi/gioi-thieu`,
        },
      },
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/services`,
          vi: `${baseUrl}/vi/dich-vu`,
        },
      },
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/projects`,
          vi: `${baseUrl}/vi/du-an`,
        },
      },
    },
    {
      url: `${baseUrl}/blogs`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/blogs`,
          vi: `${baseUrl}/vi/bai-viet`,
        },
      },
    },
    {
      url: `${baseUrl}/contact-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/contact-us`,
          vi: `${baseUrl}/vi/lien-he`,
        },
      },
    },
  ];

  try {
    // Dynamic blog posts
    const [blogsEn, blogsVi, projectsEn, projectsVi] = await Promise.all([
      getPosts({ type: 'blogs', pageSize: 1000, lang: 'en' }),
      getPosts({ type: 'blogs', pageSize: 1000, lang: 'vi' }),
      getPosts({ type: 'project', pageSize: 1000, lang: 'en' }),
      getPosts({ type: 'project', pageSize: 1000, lang: 'vi' }),
    ]);

    const blogRoutes: MetadataRoute.Sitemap = [
      ...(blogsEn?.posts || []).map((post: any) => {
        const lastMod = post.updatedAt || post.createdAt;
        return {
          url: `${baseUrl}/blogs/${post.category}/${post.slug}`,
          lastModified: lastMod ? new Date(lastMod) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        };
      }),
      ...(blogsVi?.posts || []).map((post: any) => {
        const lastMod = post.updatedAt || post.createdAt;
        return {
          url: `${baseUrl}/vi/bai-viet/${post.category}/${post.slug}`,
          lastModified: lastMod ? new Date(lastMod) : new Date(),
          changeFrequency: 'weekly' as const,
          priority: 0.6,
        };
      }),
    ];

    const projectRoutes: MetadataRoute.Sitemap = [
      ...(projectsEn?.posts || []).map((post: any) => {
        const lastMod = post.updatedAt || post.createdAt;
        return {
          url: `${baseUrl}/projects/${post.slug}`,
          lastModified: lastMod ? new Date(lastMod) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      }),
      ...(projectsVi?.posts || []).map((post: any) => {
        const lastMod = post.updatedAt || post.createdAt;
        return {
          url: `${baseUrl}/vi/du-an/${post.slug}`,
          lastModified: lastMod ? new Date(lastMod) : new Date(),
          changeFrequency: 'monthly' as const,
          priority: 0.7,
        };
      }),
    ];

    return [...staticRoutes, ...blogRoutes, ...projectRoutes];
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return staticRoutes;
  }
}
