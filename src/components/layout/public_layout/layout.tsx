import type { LayoutProps } from '@/types';
import FooterSection from './footer';
import NavBar from './nav';

export const PublicLayout: React.FC<LayoutProps & { locale?: string }> = ({
  children,
  locale = 'vi',
}) => {
  return (
    <main className="bg-white">
      <NavBar locale={locale} />
      <section className="flex-1">{children}</section>
      <FooterSection />
    </main>
  );
};
