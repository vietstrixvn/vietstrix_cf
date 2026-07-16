import { generatePageMetadata } from '@/constants/appInfos';
import ServicePage from './data';
import { setRequestLocale } from 'next-intl/server';

import type { Metadata } from 'next';

export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'vi' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  return generatePageMetadata({
    title: isVi ? 'Vietstrix — Dịch Vụ Kỹ Thuật Số' : 'Vietstrix — Digital Services',
    description: isVi
      ? 'Khám phá các dịch vụ của Vietstrix — từ các trang web tối ưu đến các sản phẩm kỹ thuật số có khả năng mở rộng, được xây dựng để đạt hiệu suất cao nhất.'
      : 'Explore Vietstrix services — from user-friendly websites to scalable digital products, built for performance and long-term growth.',
    path: '/services',
    ogImage: '/imgs/og/service.png',
    locale,
    keywords: isVi
      ? [
          'dịch vụ vietstrix',
          'dịch vụ thiết kế web',
          'dịch vụ phát triển web',
          'dịch vụ sản phẩm số',
          'dịch vụ thiết kế ui ux',
          'dịch vụ lập trình frontend',
          'lập trình web app theo yêu cầu tphcm',
          'thuê team làm mvp cho startup việt nam',
          'dịch vụ tối ưu hiệu năng core web vitals',
          'chuyển đổi figma sang nextjs chuẩn seo',
        ]
      : [
          'vietstrix services',
          'web design services',
          'web development services',
          'digital product services',
          'ui ux design services',
          'frontend development services',
          'custom web app development ho chi minh',
          'mvp development agency vietnam',
          'nextjs migration and performance audit',
          'ai design to production ready nextjs',
        ],
  });
}

export const revalidate = 300;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isVi = locale === 'vi';

  const servicePageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: isVi ? 'Dịch Vụ Kỹ Thuật Số Vietstrix' : 'Vietstrix Digital Services',
    description: isVi
      ? 'Chúng tôi thiết kế, xây dựng và tối ưu hóa các sản phẩm kỹ thuật số — từ trang web đến các hệ thống có khả năng mở rộng lớn — tập trung vào hiệu suất và trải nghiệm người dùng.'
      : 'We design, build, and optimize digital products — from websites to scalable systems — focused on performance, usability, and long-term growth.',
    url: isVi ? 'https://www.vietstrix.com/vi/dich-vu' : 'https://www.vietstrix.com/services',
    inLanguage: locale,
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

  const breadcrumbItems = [
    {
      label: isVi ? 'Trang chủ' : 'Home',
      href: '/',
    },
    {
      label: isVi ? 'Dịch vụ' : 'Services',
      href: isVi ? '/vi/dich-vu' : '/services',
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicePageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <ServicePage />
    </>
  );
}
