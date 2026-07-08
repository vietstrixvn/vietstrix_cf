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
  const isVi = locale === 'vi';

  return generatePageMetadata({
    title: isVi ? 'Vietstrix — Studio Kỹ Thuật Số Sáng Tạo' : 'Vietstrix — Creative Digital Studio',
    description: isVi
      ? 'Khám phá cách Vietstrix tạo nên những trải nghiệm kỹ thuật số tối ưu, thân thiện với người dùng — được xây dựng để bền vững và phát triển.'
      : 'Discover how Vietstrix crafts user-friendly, high-performing digital experiences — built to last and designed to grow.',
    path: '/about-us',
    ogImage: '/imgs/og/about.png',
    locale,
    keywords: isVi
      ? [
          'vietstrix',
          'studio kỹ thuật số sáng tạo',
          'thiết kế và phát triển web',
          'phát triển sản phẩm số',
          'thiết kế trải nghiệm người dùng',
          'lập trình frontend',
        ]
      : [
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  const { mentions } = await getMentions({
    pageSize: 12,
  });

  const aboutPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: isVi ? 'Vietstrix — Studio Kỹ Thuật Số Sáng Tạo' : 'Vietstrix — Creative Digital Studio',
    description: isVi
      ? 'Tìm hiểu cách Vietstrix xây dựng các sản phẩm kỹ thuật số thân thiện với người dùng và có khả năng mở rộng — từ trang web đến hệ thống phức tạp — được thiết kế để phát triển lâu dài.'
      : 'Learn how Vietstrix builds user-friendly, scalable digital products — from websites to systems — designed for long-term growth.',
    url: isVi ? 'https://www.vietstrix.com/vi/gioi-thieu' : 'https://www.vietstrix.com/about-us',
    inLanguage: locale,
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
