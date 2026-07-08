import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

const botIntlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(request: NextRequest) {
  const host = request.headers.get('host') || '';

  // Redirect non-www to www (vietstrix.com -> www.vietstrix.com)
  if (host === 'vietstrix.com') {
    const url = request.nextUrl.clone();
    url.host = 'www.vietstrix.com';
    url.protocol = 'https:'; // Force HTTPS on redirect
    return NextResponse.redirect(url, 301);
  }

  const userAgent = request.headers.get('user-agent') || '';

  const isBot =
    /facebookexternalhit|Twitterbot|Googlebot|bingbot|crawler|spider|bot/i.test(
      userAgent
    );

  if (isBot) {
    return botIntlMiddleware(request);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|templates|share|test|3d|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|html|xls|xml|txt|glb|gltf|bin)).*)',
  ],
};
