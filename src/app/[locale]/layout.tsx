import '@/assets/styles/public.css';
import { JsonLd } from '@/components/JsonLd';
import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from '@/constants/appInfos';
import { LoadingProvider } from '@/contexts/loading.context';
import { MobileProvider } from '@/contexts/mobile.context';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/contexts/react-query.context';
import CookieConsent from '@/components/cookies/cookie-consent';

export const metadata = siteMetadata;
export const viewport = siteViewport;

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale} className="mdl-js" suppressHydrationWarning>
      <head>
        <meta property="fb:app_id" content="939394498693137" />
        <link rel="preconnect" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="dns-prefetch" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd />
      </head>
      <body className={`antialiased ${inter.variable}`} suppressHydrationWarning>
        {/* Default denied consent — CookieConsent component will grant on accept */}
        <Script id="gtag-consent-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
          });
        `}</Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-QLE41CQ8TP"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-QLE41CQ8TP');
        `}</Script>
        <Script id="gtm-script" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-W9HJ7NXD');
        `}</Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W9HJ7NXD"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <LoadingProvider>
          <MobileProvider>
            <ReactQueryProvider>
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
                <CookieConsent />
                <Toaster position="top-right" richColors />
              </NextIntlClientProvider>
            </ReactQueryProvider>
          </MobileProvider>
        </LoadingProvider>
        <Script
          id="add-mdl-class"
          strategy="afterInteractive"
        >{`document.documentElement.classList.add('mdl-js');`}</Script>
      </body>
    </html>
  );
}
