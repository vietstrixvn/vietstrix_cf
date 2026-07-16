import type { Metadata, Viewport } from 'next';

export const appInfo = {
  logo: '/icons/logo-cricle.svg',
  logoIco: '/icons/logo-cricle.ico',
  title: 'Vietstrix',
  description:
    'Vietstrix is a product-driven freelance team building high-performance and scalable web applications. We partner with startups and businesses to turn ideas into reliable digital products — from design and development to deployment and growth.',
  domain: 'https://www.vietstrix.com',
  ogImage: '/imgs/OG-Image.png',
  themeColor: '#ffffff',
  keywords: [
    // Core Services (EN)
    'web development',
    'freelance developer',
    'outsourcing web',
    'frontend development',
    'backend development',
    'fullstack development',
    'reactjs developer',
    'nextjs developer',
    'web app development',
    'software outsourcing',
    // High-intent B2B & Startup keywords (EN)
    'nextjs agency vietnam',
    'react freelance team ho chi minh',
    'software outsourcing company saigon',
    'hire nextjs developers vietnam',
    'custom web app development ho chi minh',
    'ai to code react service',
    'web performance optimization agency',
    'mvp development for startups vietnam',
    // Core Services & B2B keywords (VI)
    'công ty thiết kế website tphcm',
    'thuê dev freelance nextjs',
    'dịch vụ làm web app theo yêu cầu',
    'thiết kế website ui ux chuyên nghiệp tphcm',
    'chuyển đổi figma sang nextjs chuẩn seo',
    'lập trình web app mvp cho startup',
  ],
  twitterCreator: '@vietstrix',
  category: process.env.NEXT_PUBLIC_SITE_CATEGORY || 'Web Developer',
  publisher: process.env.NEXT_PUBLIC_SITE_PUBLISHER || 'Vietstrix',
};

export const metadata: Metadata = {
  title: appInfo.title,
  description: appInfo.description,
  keywords: appInfo.keywords,
  applicationName: appInfo.title,
  generator: 'Next.js',

  icons: {
    icon: [
      { url: appInfo.logoIco, type: 'image/x-icon' },
      { url: appInfo.logo, type: 'image/svg+xml' },
    ],
    apple: [
      { url: appInfo.logoIco, type: 'image/x-icon' },
    ],
    shortcut: appInfo.logoIco,
  },

  openGraph: {
    type: 'website',
    title: appInfo.title,
    description: appInfo.description,
    siteName: appInfo.title,
    url: appInfo.domain,
    images: [
      {
        url: appInfo.ogImage,
        width: 1200,
        height: 630,
        alt: appInfo.title,
      },
    ],
    locale: 'vi_VN',
  },

  twitter: {
    card: 'summary_large_image',
    title: appInfo.title,
    description: appInfo.description,
    images: [appInfo.ogImage],
    creator: '@vietstrix',
    site: '@vietstrix',
  },

  alternates: {
    canonical: appInfo.domain,
    languages: {
      en: `${appInfo.domain}`,
      vi: `${appInfo.domain}/vi`,
      'x-default': `${appInfo.domain}`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  verification: {
    google: 'DHscGD5w7gIke_3M9XpkRVleQLuva4RO7BrrE4YvC4c',
    yandex: 'cc89c2e7c496f9c9',
    other: {
      'msvalidate.01': '21E96D55E4AC61F069842D680492F4AC',
    },
  },
  category: 'technology',
  creator: 'Vietstrix',
  publisher: 'Vietstrix',

  authors: [
    {
      name: 'Vietstrix',
      url: appInfo.domain,
    },
  ],

  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },

  metadataBase: new URL(appInfo.domain),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: appInfo.themeColor,
};

export const siteBaseUrl = 'https://www.vietstrix.com';

export function getLocalizedPath(path: string, locale: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === 'en') {
    return cleanPath === '/' ? '' : cleanPath;
  }

  if (cleanPath === '/') return '/vi';

  if (cleanPath.startsWith('/about-us')) {
    return `/vi/gioi-thieu${cleanPath.slice('/about-us'.length)}`;
  }
  if (cleanPath.startsWith('/services')) {
    return `/vi/dich-vu${cleanPath.slice('/services'.length)}`;
  }
  if (cleanPath.startsWith('/projects')) {
    return `/vi/du-an${cleanPath.slice('/projects'.length)}`;
  }
  if (cleanPath.startsWith('/blogs')) {
    return `/vi/bai-viet${cleanPath.slice('/blogs'.length)}`;
  }
  if (cleanPath.startsWith('/contact-us')) {
    return `/vi/lien-he${cleanPath.slice('/contact-us'.length)}`;
  }

  return `/vi${cleanPath}`;
}

export function generatePageMetadata({
  title,
  description,
  ogImage,
  path,
  keywords,
  type = 'website',
  alternates,
  locale = 'en',
}: {
  title: string;
  description?: string;
  ogImage?: string;
  path: string;
  keywords?: string[];
  type?: 'website' | 'article';
  alternates?: Metadata['alternates'];
  locale?: string;
}): Metadata {
  const localeKey = locale === 'vi' ? 'vi' : 'en';
  const url = `${appInfo.domain}${getLocalizedPath(path, localeKey)}`;
  const image = ogImage ?? appInfo.ogImage;
  const fullTitle = `${title} | ${appInfo.title}`;
  const desc = description ?? appInfo.description;

  const languagesAlternates = {
    en: `${appInfo.domain}${getLocalizedPath(path, 'en')}`,
    vi: `${appInfo.domain}${getLocalizedPath(path, 'vi')}`,
    'x-default': `${appInfo.domain}${getLocalizedPath(path, 'en')}`,
  };

  return {
    metadataBase: new URL(appInfo.domain),
    title: fullTitle,
    description: desc,
    keywords: keywords ?? appInfo.keywords,
    openGraph: {
      type,
      title: fullTitle,
      description: desc,
      url,
      siteName: appInfo.title,
      images: [
        {
          url: `${appInfo.domain}${image}`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale === 'vi' ? 'vi_VN' : 'en_US',
    },

    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: desc,
      images: [`${appInfo.domain}${image}`],
      creator: appInfo.twitterCreator,
    },
    alternates: {
      canonical: url,
      languages: languagesAlternates,
      ...alternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
