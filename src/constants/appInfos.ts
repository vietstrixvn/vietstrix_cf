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
    'web development',
    'freelance developer',
    'outsourcing web',
    'frontend development',
    'backend development',
    'fullstack development',
    'reactjs',
    'nextjs',
    'web app development',
    'software outsourcing',
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
  const localizedPaths: Record<string, { en: string; vi: string }> = {
    '/': { en: '', vi: '/vi' },
    '/about-us': { en: '/about-us', vi: '/vi/gioi-thieu' },
    '/services': { en: '/services', vi: '/vi/dich-vu' },
    '/projects': { en: '/projects', vi: '/vi/du-an' },
    '/blogs': { en: '/blogs', vi: '/vi/bai-viet' },
    '/contact-us': { en: '/contact-us', vi: '/vi/lien-he' },
  };

  const localeKey = locale === 'vi' ? 'vi' : 'en';
  const localizedPath = localizedPaths[path]?.[localeKey] ?? path;
  const url = `${appInfo.domain}${localizedPath}`;
  const image = ogImage ?? appInfo.ogImage;
  const fullTitle = `${title} | ${appInfo.title}`;
  const desc = description ?? appInfo.description;

  const languagesAlternates = {
    en: `${appInfo.domain}${localizedPaths[path]?.en ?? path}`,
    vi: `${appInfo.domain}${localizedPaths[path]?.vi ?? `/vi${path}`}`,
    'x-default': `${appInfo.domain}${localizedPaths[path]?.en ?? path}`,
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
