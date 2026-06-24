//i18n/routing.ts

import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'vi'],
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/about-us': {
      en: '/about-us',
      vi: '/gioi-thieu',
    },
    '/services': {
      en: '/services',
      vi: '/dich-vu',
    },
    '/projects': {
      en: '/projects',
      vi: '/du-an',
    },
    '/projects/[slug]': {
      en: '/projects/[slug]',
      vi: '/du-an/[slug]',
    },
    '/blogs': {
      en: '/blogs',
      vi: '/bai-viet',
    },
    '/blogs/[cate-slug]': {
      en: '/blogs/[cate-slug]',
      vi: '/bai-viet/[cate-slug]',
    },
    '/blogs/[cate-slug]/[slug]': {
      en: '/blogs/[cate-slug]/[slug]',
      vi: '/bai-viet/[cate-slug]/[slug]',
    },
    '/contact-us': {
      en: '/contact-us',
      vi: '/lien-he',
    },
  },
});
