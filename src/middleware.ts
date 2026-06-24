import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const userAgent = request.headers.get('user-agent') || '';

  const isBot =
    /facebookexternalhit|Twitterbot|Googlebot|bingbot|crawler|spider|bot/i.test(
      userAgent
    );

  if (isBot) {
    const url = request.nextUrl.clone();

    // Nếu bot truy cập các đường dẫn đã có sẵn locale prefix (/en hoặc /vi),
    // bắt buộc phải qua intlMiddleware để dịch các route đã bản địa hóa (ví dụ: /vi/lien-he -> /vi/contact-us)
    if (url.pathname.startsWith('/en') || url.pathname.startsWith('/vi')) {
      return intlMiddleware(request);
    }

    // Ngược lại (chưa có locale prefix), tự động rewrite sang /en
    url.pathname = `/en${url.pathname === '/' ? '' : url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|templates|share|test|3d|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|woff|woff2|ttf|otf|html|xls|xml|txt|glb|gltf|bin)).*)',
  ],
};
