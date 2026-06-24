import { siteBaseUrl } from '@/constants';
import { getPosts } from '@/libs/seo/getPosts';

export async function generateLLMsTxt(): Promise<string> {
  let projectsList = '';
  let blogsList = '';

  try {
    const [enBlogsResponse, viBlogsResponse, enProjectsResponse, viProjectsResponse] = await Promise.all([
      getPosts({ type: 'blogs', lang: 'en', pageSize: 20 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'blogs', lang: 'vi', pageSize: 20 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'en', pageSize: 20 }).catch(() => ({ posts: [] })),
      getPosts({ type: 'project', lang: 'vi', pageSize: 20 }).catch(() => ({ posts: [] })),
    ]);

    const enBlogs = enBlogsResponse.posts || [];
    const viBlogs = viBlogsResponse.posts || [];
    const enProjects = enProjectsResponse.posts || [];
    const viProjects = viProjectsResponse.posts || [];

    if (enProjects.length > 0) {
      projectsList += '### English Projects\n';
      enProjects.forEach((post: any) => {
        projectsList += `- [${post.title}](${siteBaseUrl}/projects/${post.slug}): ${post.description || 'Vietstrix case study.'}\n`;
      });
    }

    if (viProjects.length > 0) {
      projectsList += '\n### Vietnamese Projects (Dự án)\n';
      viProjects.forEach((post: any) => {
        projectsList += `- [${post.title}](${siteBaseUrl}/vi/du-an/${post.slug}): ${post.description || 'Vietstrix case study.'}\n`;
      });
    }

    if (enBlogs.length > 0) {
      blogsList += '### English Articles\n';
      enBlogs.forEach((post: any) => {
        const categorySlug = post.category?.slug || 'tin-tuc';
        blogsList += `- [${post.title}](${siteBaseUrl}/blogs/${categorySlug}/${post.slug}): ${post.description || 'Vietstrix blog post.'}\n`;
      });
    }

    if (viBlogs.length > 0) {
      blogsList += '\n### Vietnamese Articles (Bài viết)\n';
      viBlogs.forEach((post: any) => {
        const categorySlug = post.category?.slug || 'tin-tuc';
        blogsList += `- [${post.title}](${siteBaseUrl}/vi/bai-viet/${categorySlug}/${post.slug}): ${post.description || 'Vietstrix blog post.'}\n`;
      });
    }
  } catch (error) {
    console.error('Error generating llms.txt content:', error);
  }

  return `# Vietstrix | Web & MVP Development Agency

> Vietstrix is a product-driven freelance team building high-performance and scalable web applications. We partner with startups and businesses to turn ideas into reliable digital products — from design and development to deployment and growth.

## Core Services
- Custom Web Development (Next.js, React, NestJS, Node.js)
- MVP Development for Startups
- UI/UX Design & Prototyping
- System Architecture & Cloud Scaling

## Tech Stack
- Frontend: React, Next.js, TypeScript, TailwindCSS, GSAP, Three.js
- Backend: Node.js, NestJS, Express, PostgreSQL, MongoDB, Redis
- Cloud & Devops: Docker, AWS, VNG Cloud, Vercel, CI/CD

## Core Navigation (Sitemap)
- Home (EN): ${siteBaseUrl}
- Home (VI): ${siteBaseUrl}/vi
- About Us (EN): ${siteBaseUrl}/about-us
- About Us (VI): ${siteBaseUrl}/vi/gioi-thieu
- Services (EN): ${siteBaseUrl}/services
- Services (VI): ${siteBaseUrl}/vi/dich-vu
- Projects (EN): ${siteBaseUrl}/projects
- Projects (VI): ${siteBaseUrl}/vi/du-an
- Blogs (EN): ${siteBaseUrl}/blogs
- Blogs (VI): ${siteBaseUrl}/vi/bai-viet
- Contact Us (EN): ${siteBaseUrl}/contact-us
- Contact Us (VI): ${siteBaseUrl}/vi/lien-he

## Projects Showcase
${projectsList || '- No projects found.'}

## Blog Articles
${blogsList || '- No blog posts found.'}
`;
}
