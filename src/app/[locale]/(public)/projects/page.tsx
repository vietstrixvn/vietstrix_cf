import { generatePageMetadata } from '@/constants/appInfos';
import { notFound } from 'next/navigation';
import { getPosts } from '@/libs/seo/getPosts';
import { getCategories } from '@/libs/seo/getCategories';
import ProjectList from './data';
import { logError } from '@/utils';

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  return generatePageMetadata({
    title: isVi ? 'Dự Án' : 'Projects',
    description: isVi
      ? 'Tổng hợp các dự án của Vietstrix — nơi ý tưởng được biến thành sản phẩm thật sự. Từ UI/UX đến hệ thống fullstack, mỗi dự án phản ánh tư duy thực thi và khả năng mở rộng.'
      : 'A collection of Vietstrix projects — where ideas are turned into real products. From UI/UX to fullstack systems, each project reflects practical execution and scalable thinking.',
    path: '/projects',
    locale,
    ogImage: '/imgs/og/project.png',
    keywords: [
      'web development projects',
      'software projects',
      'product development case study',
      'fullstack projects',
      'startup projects',
      'vietstrix portfolio',
      'dự án web',
      'dự án phần mềm',
      'phát triển sản phẩm',
      'case study dự án',
      'dự án startup',
      'portfolio vietstrix',
    ],
  });
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string }>;
}) {
  const { locale } = await params;
  const search = await searchParams;
  const page = parseInt(search.page || '1');
  const categoryFilter = search.category;

  try {
    const [postsData, categories] = await Promise.all([
      getPosts({
        page,
        pageSize: 12,
        type: 'project',
        categoryId: categoryFilter || null,
        lang: locale,
      }),
      getCategories({ type: 'project', lang: locale }),
    ]);

    const { posts, pagination } = postsData;

    const projectsJsonLd = {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: locale === 'vi' ? 'Dự Án Vietstrix' : 'Vietstrix Projects',
      description:
        locale === 'vi'
          ? 'Tổng hợp các dự án thực tế của Vietstrix, thể hiện năng lực phát triển web, thiết kế UI/UX và kỹ thuật sản phẩm có khả năng mở rộng.'
          : 'A collection of real-world projects by Vietstrix, showcasing web development, UI/UX design, and scalable product engineering.',
      url:
        locale === 'vi'
          ? 'https://www.vietstrix.com/vi/du-an'
          : 'https://www.vietstrix.com/projects',
      inLanguage: locale, // 👈 động theo locale
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsJsonLd) }}
        />
        <ProjectList
          project={posts}
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
