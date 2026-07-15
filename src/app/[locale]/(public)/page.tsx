import { generatePageMetadata } from '@/constants/appInfos';
import { getPosts } from '@/libs/seo/getPosts';
import type { Metadata } from 'next';
import HomePage from './data';
import { getMentions } from '@/libs/seo/getMentions';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Build everything custom',
    description:
      'Vietstrix is a product-driven team building scalable web apps, helping startups turn ideas into reliable digital products from design to deployment.',
    path: '/',
    locale,
  });
}

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  const [postsData, projectsData, mentionsData] = await Promise.all([
    getPosts({
      type: 'blogs',
      pageSize: 3,
      lang: locale,
    }),
    getPosts({
      type: 'project',
      pageSize: 4,
      lang: locale,
    }),
    getMentions({
      pageSize: 12,
    }),
  ]);

  const posts = postsData?.posts || [];
  const projects = projectsData?.posts || [];
  const mentions = mentionsData?.mentions || [];

  return (
    <>
      <HomePage posts={posts} projects={projects} mentions={mentions} />
    </>
  );
}
