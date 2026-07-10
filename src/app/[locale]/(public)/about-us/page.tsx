import { generatePageMetadata } from '@/constants/appInfos';
import AboutUsSection from './data';
import { getMentions } from '@/libs/seo/getMentions';
import { setRequestLocale } from 'next-intl/server';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';
  setRequestLocale(locale);

  return generatePageMetadata({
    title: isVi ? 'Về Vietstrix' : 'About Vietstrix',
    description: isVi
      ? 'Tìm hiểu về Vietstrix — đội ngũ phát triển sản phẩm số tập trung vào website custom, ứng dụng web hiệu năng cao và giải pháp kỹ thuật có khả năng mở rộng.'
      : 'Learn about Vietstrix — a product-driven team building custom websites, high-performance web applications, and scalable digital solutions.',
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
  setRequestLocale(locale);

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

  const breadcrumbItems = [
    {
      label: isVi ? 'Trang chủ' : 'Home',
      href: '/',
    },
    {
      label: isVi ? 'Về chúng tôi' : 'About Us',
      href: isVi ? '/vi/gioi-thieu' : '/about-us',
    },
  ];
  const { generateBreadcrumbJsonLd } = await import('@/utils/breadcrumb.utils');
  const breadcrumbJsonLd = generateBreadcrumbJsonLd(
    breadcrumbItems,
    'https://www.vietstrix.com'
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <AboutUsSection mentions={mentions} />
    </>
  );
}
