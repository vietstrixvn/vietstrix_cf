import { MetadataRoute } from 'next';
import { siteBaseUrl } from '@/constants';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // 1. Static Pages (Giữ nguyên vì route tĩnh này chuẩn)
  const staticPages = [
    { path: '', viPath: 'vi', priority: 1.0, changeFrequency: 'daily' as const },
    { path: 'about-us', viPath: 'vi/gioi-thieu', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'services', viPath: 'vi/dich-vu', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'projects', viPath: 'vi/du-an', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: 'blogs', viPath: 'vi/bai-viet', priority: 0.8, changeFrequency: 'weekly' as const },
    { path: 'contact-us', viPath: 'vi/lien-he', priority: 0.7, changeFrequency: 'weekly' as const },
  ];

  for (const page of staticPages) {
    const enUrl = page.path ? `${siteBaseUrl}/${page.path}` : siteBaseUrl;
    const viUrl = `${siteBaseUrl}/${page.viPath}`;

    sitemapEntries.push({
      url: enUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: { en: enUrl, vi: viUrl } },
    });

    sitemapEntries.push({
      url: viUrl,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: { languages: { en: enUrl, vi: viUrl } },
    });
  }

  // 2. Dynamic Categories & Posts
  try {
    const [
      enBlogCategories, viBlogCategories,
      enBlogsResponse, viBlogsResponse,
      enProjectsResponse, viProjectsResponse,
    ] = await Promise.all([
      getCategories({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(() => []),
      getCategories({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(() => []),
      getPosts({ type: 'blogs', lang: 'en', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'blogs', lang: 'vi', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'en', pageSize: 100 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'vi', pageSize: 100 }).catch(() => ({ posts: [] })),
    ]);

    const enBlogCategoriesFiltered = enBlogCategories.filter((cat: any) => cat.lang === 'en');
    const viBlogCategoriesFiltered = viBlogCategories.filter((cat: any) => cat.lang === 'vi');

    const enBlogs = (enBlogsResponse.posts || []).filter((post: any) => post.lang === 'en');
    const viBlogs = (viBlogsResponse.posts || []).filter((post: any) => post.lang === 'vi');
    const enProjects = (enProjectsResponse.posts || []).filter((post: any) => post.lang === 'en');
    const viProjects = (viProjectsResponse.posts || []).filter((post: any) => post.lang === 'vi');

    // --- XỬ LÝ CATEGORIES ---
    // Khuyến khích: Trong DB nên có một trường chung như `translation_group_id` thay vì so slug.
    // Tạm thời tối ưu logic kiểm tra tồn tại thực tế của slug từng bên để tránh tạo URL ma.
    const viCategoryMap = new Map(viBlogCategoriesFiltered.map((cat: any) => [cat.slug, cat]));
    const enCategoryMap = new Map(enBlogCategoriesFiltered.map((cat: any) => [cat.slug, cat]));

    // Thêm các category có cả EN và VI hoặc chỉ có EN
    enBlogCategoriesFiltered.forEach((cat: any) => {
      const enUrl = `${siteBaseUrl}/blogs/${cat.slug}`;
      const viUrl = `${siteBaseUrl}/vi/bai-viet/${cat.slug}`;
      const lastMod = new Date(cat.updated_at || cat.created_at || new Date());

      if (viCategoryMap.has(cat.slug)) {
        // Có cả 2 ngôn ngữ trùng slug
        sitemapEntries.push({
          url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.6,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
        sitemapEntries.push({
          url: viUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.6,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
      } else {
        // Chỉ có EN
        sitemapEntries.push({ url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.6 });
      }
    });

    // Thêm các category CHỈ có ở bản tiếng Việt (Tránh bị lặp lại phần đã xử lý ở trên)
    viBlogCategoriesFiltered.forEach((cat: any) => {
      if (!enCategoryMap.has(cat.slug)) {
        const viUrl = `${siteBaseUrl}/vi/bai-viet/${cat.slug}`;
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(cat.updated_at || cat.created_at || new Date()),
          changeFrequency: 'weekly',
          priority: 0.6,
        });
      }
    });

    // --- XỬ LÝ BLOGS ---
    const viBlogMap = new Map(viBlogs.map((post: any) => [post.slug, post]));
    const enBlogMap = new Map(enBlogs.map((post: any) => [post.slug, post]));

    enBlogs.forEach((post: any) => {
      const enCategorySlug = post.category?.slug || 'news';
      const enUrl = `${siteBaseUrl}/blogs/${enCategorySlug}/${post.slug}`;
      const lastMod = new Date(post.updated_at || post.created_at || new Date());

      const viPost = viBlogMap.get(post.slug) as any;

      if (viPost) {
        // Nếu trùng slug, lấy chính xác slug category của bản VI (Tránh hardcode nhầm cấu trúc)
        const viCategorySlug = viPost.category?.slug || 'tin-tuc';
        const viUrl = `${siteBaseUrl}/vi/bai-viet/${viCategorySlug}/${post.slug}`;

        sitemapEntries.push({
          url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.7,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(viPost.updated_at || viPost.created_at || new Date()),
          changeFrequency: 'weekly', priority: 0.7,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
      } else {
        sitemapEntries.push({ url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.7 });
      }
    });

    // Blogs chỉ có bản tiếng Việt
    viBlogs.forEach((post: any) => {
      if (!enBlogMap.has(post.slug)) {
        const categorySlug = post.category?.slug || 'tin-tuc';
        const viUrl = `${siteBaseUrl}/vi/bai-viet/${categorySlug}/${post.slug}`;
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: 'weekly', priority: 0.7,
        });
      }
    });

    // --- XỬ LÝ PROJECTS ---
    const viProjectMap = new Map(viProjects.map((post: any) => [post.slug, post]));
    const enProjectMap = new Map(enProjects.map((post: any) => [post.slug, post]));

    enProjects.forEach((post: any) => {
      const enUrl = `${siteBaseUrl}/projects/${post.slug}`;
      const lastMod = new Date(post.updated_at || post.created_at || new Date());
      const viPost = viProjectMap.get(post.slug) as any;

      if (viPost) {
        const viUrl = `${siteBaseUrl}/vi/du-an/${post.slug}`;
        sitemapEntries.push({
          url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.8,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(viPost.updated_at || viPost.created_at || new Date()),
          changeFrequency: 'weekly', priority: 0.8,
          alternates: { languages: { en: enUrl, vi: viUrl } }
        });
      } else {
        sitemapEntries.push({ url: enUrl, lastModified: lastMod, changeFrequency: 'weekly', priority: 0.8 });
      }
    });

    viProjects.forEach((post: any) => {
      if (!enProjectMap.has(post.slug)) {
        const viUrl = `${siteBaseUrl}/vi/du-an/${post.slug}`;
        sitemapEntries.push({
          url: viUrl,
          lastModified: new Date(post.updated_at || post.created_at || new Date()),
          changeFrequency: 'weekly', priority: 0.8,
        });
      }
    });

  } catch (error) {
    console.error('Error fetching dynamic sitemap entries:', error);
  }

  return sitemapEntries;
}
