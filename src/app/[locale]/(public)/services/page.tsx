import { generatePageMetadata } from '@/constants/appInfos';
import ServicePage from './data';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    title: 'Vietstrix — Digital Services',
    description: `Explore Vietstrix services — from user-friendly websites to scalable digital products, built for performance and long-term growth.`,
    path: '/services',
    ogImage: '/imgs/og/service.png',
    locale,
    keywords: [
      'vietstrix services',
      'web design services',
      'web development services',
      'digital product services',
      'ui ux design services',
      'frontend development services',
    ],
  });
}

export const revalidate = 86400;

export default function Page() {
  const servicePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Vietstrix Digital Services',
    description:
      'We design, build, and optimize digital products — from websites to scalable systems — focused on performance, usability, and long-term growth.',
    url: 'https://www.vietstrix.com/services', // 👈 thêm url
    inLanguage: 'en', // 👈 thêm inLanguage
    provider: {
      '@type': 'Organization',
      name: 'Vietstrix',
      url: 'https://www.vietstrix.com',
    },
    areaServed: {
      '@type': 'Place',
      name: 'Global',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <ServicePage />
    </>
  );
}
