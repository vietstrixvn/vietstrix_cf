'use client';

import { usePathname, useRouter } from '@/i18n/navigation';
import { useLocale } from 'next-intl';

export const LangButton = ({ scrolled = true }: { scrolled?: boolean }) => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const isVietnamese = locale === 'vi';

  const handleLangChange = (lang: 'vi' | 'en') => {
    if (lang === locale) return;

    let targetPath = pathname;

    // Tránh đổi ngôn ngữ trực tiếp tại trang chi tiết/dynamic page của blogs và projects.
    // Nếu đang ở trang danh sách category hoặc chi tiết bài viết/dự án, mặc định đưa về /blogs hoặc /projects.
    if (pathname.startsWith('/blogs/') || pathname.startsWith('/bai-viet/')) {
      targetPath = '/blogs';
    } else if (pathname.startsWith('/projects/') || pathname.startsWith('/du-an/')) {
      targetPath = '/projects';
    }

    router.replace(targetPath as any, { locale: lang });
  };

  return (
    <div className="flex items-center gap-4 text-base lg:text-lg">
      <span
        onClick={() => handleLangChange('en')}
        className={`cursor-pointer transition-colors duration-300 ${!isVietnamese
          ? 'text-white  p-2 border-b-2 bg-main'
          : scrolled
            ? 'text-main'
            : 'text-white'
          }`}
      >
        EN
      </span>
      <span className={`transition-colors duration-300 ${scrolled ? 'text-main/60' : 'text-white/60'}`}>/</span>
      <span
        onClick={() => handleLangChange('vi')}
        className={`cursor-pointer transition-colors duration-300 ${isVietnamese
          ? 'text-white  p-2 border-b-2 bg-main'
          : scrolled
            ? 'text-main'
            : 'text-main'
          }`}
      >
        VN
      </span>
    </div>
  );
};
