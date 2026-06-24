import { generatePageMetadata } from '@/constants/appInfos';
import AboutUsSection from './data';
import { getMentions } from '@/libs/seo/getMentions';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Vietstrix — Creative Digital Studio',
    description: `Discover how Vietstrix crafts user-friendly, high-performing digital experiences — built to last and designed to grow.`,
    path: '/about-us',
    ogImage: '/imgs/og/about.png',
    locale,
    keywords: [
      'vietstrix',
      'creative digital studio',
      'web design and development',
      'digital product development',
      'user experience design',
      'frontend development',
    ],
  });
}

export const revalidate = 86400;

export default async function Page() {
  const { mentions } = await getMentions({
    pageSize: 12,
  });

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: 'Vietstrix — Creative Digital Studio',
    description:
      'Learn how Vietstrix builds user-friendly, scalable digital products — from websites to systems — designed for long-term growth.',
    url: 'https://www.vietstrix.com/about-us',
    inLanguage: 'en', // 👈 thêm
    mainEntity: {
      '@type': 'Organization',
      name: 'Vietstrix',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <AboutUsSection mentions={mentions} />
    </>
  );
}
