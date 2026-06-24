import '@/assets/styles/public.css';
import { routing } from '@/i18n/routing';
import NotFoundPage from '@/components/NotFoundPage';
import { NextIntlClientProvider } from 'next-intl';

export default async function GlobalNotFound() {
  const locale = routing.defaultLocale;
  const messages = (await import(`../../messages/${locale}.json`)).default;

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <NotFoundPage />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
