interface BreadcrumbItem {
  label: string;
  href?: string;
}

/**
 * Generate JSON-LD structured data for breadcrumb
 * Helps search engines understand site structure
 * Server-side only utility
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
