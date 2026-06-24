import '@/assets/styles/public.css';
import { JsonLd } from '@/components/JsonLd';
import {
  metadata as siteMetadata,
  viewport as siteViewport,
} from '@/constants/appInfos';
import { LoadingProvider } from '@/contexts/loading.context';
import { MobileProvider } from '@/contexts/mobile.context';
import Script from 'next/script';
import { ReactNode } from 'react';
import { Toaster } from 'sonner';
import { Inter } from 'next/font/google';
import ReactQueryProvider from '@/contexts/react-query.context';
import { ShareLayout } from '@/components/layout';

export const metadata = siteMetadata;
export const viewport = siteViewport;

const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export default async function LocaleLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html className="mdl-js" suppressHydrationWarning>
      <head>
        <meta property="fb:app_id" content="939394498693137" />
        <link rel="preconnect" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="dns-prefetch" href="https://hcm03.vstorage.vngcloud.vn" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <JsonLd />
      </head>
      <body
        className={`antialiased ${inter.variable}`}
        suppressHydrationWarning
      >
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-169R801JZ0"
        />
        <Script id="google-analytics">{`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-169R801JZ0');
  `}</Script>
        <LoadingProvider>
          <MobileProvider>
            <ReactQueryProvider>
              <ShareLayout>{children}</ShareLayout>
              <Toaster position="top-right" richColors />
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
