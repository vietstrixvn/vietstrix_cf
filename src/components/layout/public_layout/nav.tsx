import { logError } from '@/utils';
import NavBarClient from './nav.client';
import { getCategories } from '@/libs';

// ISR: Revalidate mỗi 1 giờ
export const revalidate = 3600;

interface DropdownItem {
  label: string;
  href: any;
}

interface NavItem {
  label: string;
  href: any;
  dropdown?: DropdownItem[];
}

const staticNavItems: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  { label: 'About Us', href: '/about-us' },
  { label: 'Service', href: '/services' },
  { label: 'Project', href: '/projects' },
];

async function getNavItems(locale: string): Promise<NavItem[]> {
  try {
    const blogCategories = await getCategories({
      type: 'blogs',
      status: 'show',
      lang: locale,
    });

    // Filter to ensure only categories matching the current locale
    const filteredCategories = blogCategories.filter(
      (cat: any) => cat.locale === locale || cat.lang === locale
    );

    // Remove duplicates by slug (in case API returns duplicates)
    const uniqueCategories = filteredCategories.reduce(
      (acc: any[], cat: any) => {
        if (!acc.find((c: any) => c.slug === cat.slug)) {
          acc.push(cat);
        }
        return acc;
      },
      []
    );

    // Build blog dropdown
    const blogDropdown: DropdownItem[] = [
      { label: 'All Post', href: '/blogs' },
      ...uniqueCategories.map((cat: any) => ({
        label: cat.title,
        href: {
          pathname: '/blogs/[cate-slug]',
          params: { 'cate-slug': cat.slug }
        },
      })),
    ];

    return [
      ...staticNavItems,
      {
        label: 'Blog',
        href: '/blogs',
        dropdown: blogDropdown,
      },
    ];
  } catch (error) {
    logError('Error fetching categories:', error);
    // Fallback to static items if API fails
    return [
      ...staticNavItems,
      {
        label: 'Blog',
        href: '/blogs',
        dropdown: [{ label: 'All Blog', href: '/blogs' }],
      },
    ];
  }
}

export default async function NavBar({ locale = 'vi' }: { locale?: string }) {
  const navItems = await getNavItems(locale);

  return <NavBarClient navItems={navItems} />;
}
