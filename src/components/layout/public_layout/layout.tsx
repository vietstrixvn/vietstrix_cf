import type { LayoutProps } from '@/types';
import FooterSection from './footer';
import NavBar from './nav';

export const PublicLayout: React.FC<LayoutProps & { locale?: string }> = ({
  children,
  locale = 'vi',
}) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-white">
      {/* Main Content Area (slides up over footer) */}
      <div className="relative z-10 bg-white flex-1 flex flex-col shadow-[0_15px_30px_rgba(0,0,0,0.08)]">
        <NavBar locale={locale} />
        <section className="flex-1">{children}</section>
      </div>

      {/* Sticky Footer Area (reveals from behind) */}
      <div className="sticky bottom-0 z-0 w-full">
        <FooterSection />
      </div>
    </div>
  );
};
