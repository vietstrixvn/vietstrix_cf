import { generatePageMetadata } from '@/constants/appInfos';
import ContactPage from './data';

import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isVi = locale === 'vi';

  return generatePageMetadata({
    title: isVi ? 'Vietstrix — Hãy Cùng Nhau Hợp Tác' : 'Vietstrix — Let’s Build Something Together',
    description: isVi
      ? 'Bạn có ý tưởng hay dự án nào không? Liên hệ với Vietstrix ngay hôm nay để bắt đầu xây dựng các sản phẩm kỹ thuật số tối ưu và thân thiện với người dùng.'
      : 'Have an idea or project in mind? Get in touch with Vietstrix to start building user-friendly, high-performing digital products.',
    path: '/contact-us',
    ogImage: '/imgs/og/contact.png',
    locale,
    keywords: isVi
      ? [
        'liên hệ vietstrix',
        'thuê lập trình viên',
        'phát triển sản phẩm số',
        'thiết kế web',
        'dịch vụ ui ux',
        'đội ngũ lập trình',
      ]
      : [
        'contact vietstrix',
        'hire web developer',
        'digital product development',
        'web design contact',
        'ui ux services',
        'build website team',
      ],
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const isVi = locale === 'vi';

  const contactPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: isVi ? 'Liên hệ Vietstrix' : 'Contact Vietstrix',
    inLanguage: locale,
    url: isVi ? 'https://www.vietstrix.com/vi/contact-us' : 'https://www.vietstrix.com/contact-us',
    description: isVi
      ? 'Liên hệ với Vietstrix để thảo luận về ý tưởng của bạn và bắt đầu xây dựng sản phẩm kỹ thuật số tiếp theo.'
      : 'Reach out to Vietstrix to discuss your ideas and start building your next digital product.',
    mainEntity: {
      '@type': 'Organization',
      name: 'Vietstrix',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageJsonLd) }}
      />
      <ContactPage />
    </>
  );
}
