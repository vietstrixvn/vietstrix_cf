import type { LayoutProps } from '@/types';
import NavBarShare from './nav';
import { FooterShare } from './footer';

export const ShareLayout: React.FC<LayoutProps & { locale?: string }> = ({
  children,
}) => {
  return (
    <main className="bg-white">
      <NavBarShare />
      <section className="flex-1">{children}</section>
      <FooterShare />
    </main>
  );
};
