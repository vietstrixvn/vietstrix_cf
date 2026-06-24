'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { useLocale } from 'next-intl';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

/**
 * SEO-friendly Breadcrumb component
 * Improves internal linking structure and user navigation
 */
export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const locale = useLocale();
  const homeHref = locale === 'vi' ? '/vi' : '/';

  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center gap-2 text-sm text-gray-600 mb-6 ${className}`}
    >
      {/* Home link */}
      <Link
        href={homeHref}
        className="hover:text-primary transition-colors flex items-center gap-1"
        aria-label="Home"
      >
        <Home className="w-4 h-4" />
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-4 h-4 text-gray-400" />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                className="hover:text-primary transition-colors line-clamp-1"
              >
                {item.label}
              </Link>
            ) : (
              <span
                className={`${isLast ? 'text-gray-900 font-medium' : ''} line-clamp-1`}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </span>
            )}
          </div>
        );
      })}
    </nav>
  );
}

/**
 * Generate JSON-LD structured data for breadcrumb
 * Helps search engines understand site structure
 */
export function generateBreadcrumbJsonLd(
  items: BreadcrumbItem[],
  baseUrl: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.href ? `${baseUrl}${item.href}` : undefined,
    })),
  };
}
