import { ScrollToTopButton } from '@/components';
import { PublicLayout } from '@/components/layout/public_layout/layout';
import { DelayedLoading } from '@/components/loading/delay';
import { metadata as rootMetadata } from '@/constants/appInfos';
import type { Metadata } from 'next';
import React from 'react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const url = isEn
    ? 'https://www.vietstrix.com'
    : 'https://www.vietstrix.com/vi';

  return {
    ...rootMetadata,
    openGraph: {
      ...rootMetadata.openGraph,
      url,
      locale: isEn ? 'en_US' : 'vi_VN',
      images: [
        {
          url: 'https://www.vietstrix.com/imgs/OG-Image.png',
          width: 1200,
          height: 630,
          alt: 'Vietstrix',
        },
      ],
    },
    alternates: { canonical: url },
  };
}

export default async function LayoutDefault({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  return (
    <>
      <DelayedLoading duration={500} />
      <PublicLayout locale={locale}>
        <main className="relative min-h-screen">
          <div className="relative">{children}</div>
          <ScrollToTopButton />
        </main>
      </PublicLayout>
    </>
  );
}
