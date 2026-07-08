'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, Link } from '@/i18n/navigation';
import { LangButton, CustomImage } from '@/components';
import { Icons } from '@/assets';
import gsap from 'gsap';

interface DropdownItem {
  label: string;
  href: any;
}

interface NavItem {
  label: string;
  href: any;
  dropdown?: DropdownItem[];
}

interface HeaderClientProps {
  navItems: NavItem[];
}

export default function NavBarClient({ navItems }: HeaderClientProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  const isWhiteTextPage = pathname === '/' || pathname === '/about-us';

  const isActive = (href: any) => {
    let pathToCheck = href;
    if (typeof href === 'object' && href !== null && href.pathname) {
      pathToCheck = href.pathname;
      if (href.params) {
        Object.entries(href.params).forEach(([key, value]) => {
          pathToCheck = pathToCheck.replace(`[${key}]`, String(value));
        });
      }
    }
    if (pathToCheck === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(pathToCheck);
  };

  // Optimized scroll listener with RAF
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // 🎯 GSAP navbar animation - optimized with kill + will-change
  useEffect(() => {
    if (!containerRef.current) return;

    // Kill previous tween to prevent conflicts
    if (tweenRef.current) {
      tweenRef.current.kill();
    }

    // Set will-change before animation
    if (!containerRef.current) return;
    gsap.set(containerRef.current, { willChange: 'transform, opacity' });

    if (scrolled) {
      // Scrolled state: compact pill dock
      tweenRef.current = gsap.to(containerRef.current, {
        maxWidth: '1280px',
        padding: '8px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0.26)',
        backdropFilter: 'blur(32px)',
        borderColor: 'rgba(255, 255, 255, 0.45)',
        boxShadow: '0 15px 35px -10px rgba(0, 75, 161, 0.12), 0 1px 4px rgba(255, 255, 255, 0.45) inset',
        borderRadius: '10px',
        duration: 0.65,
        ease: 'power2.out',
        onComplete: () => {
          // Remove will-change after animation completes
          if (containerRef.current) gsap.set(containerRef.current, { willChange: 'auto' });
        }
      });
    } else {
      // Unscrolled state: full width transparent
      tweenRef.current = gsap.to(containerRef.current, {
        maxWidth: '2400px',
        padding: '12px 16px',
        backgroundColor: 'rgba(255, 255, 255, 0)',
        backdropFilter: 'blur(0px)',
        borderColor: 'rgba(255, 255, 255, 0)',
        boxShadow: 'none',
        borderRadius: '16px',
        duration: 0.65,
        ease: 'power2.out',
        onComplete: () => {
          if (containerRef.current) gsap.set(containerRef.current, { willChange: 'auto' });
        }
      });
    }

    return () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
      }
    };
  }, [scrolled]);

  // 🎯 GSAP mobile menu animation
  useEffect(() => {
    if (!mobileMenuRef.current || !overlayRef.current) return;

    const menu = mobileMenuRef.current;
    const overlay = overlayRef.current;

    if (mobileOpen) {
      // Open animation
      gsap.set([menu, overlay], { display: 'block' });
      const tl = gsap.timeline();
      tl.fromTo(
        overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.25, ease: 'power2.out' }
      ).fromTo(
        menu,
        { x: '100%' },
        { x: '0%', duration: 0.35, ease: 'power3.out' },
        '<'
      );
    } else {
      // Close animation
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set([menu, overlay], { display: 'none' });
        }
      });
      tl.to(menu, {
        x: '100%',
        duration: 0.3,
        ease: 'power3.in'
      }).to(
        overlay,
        { opacity: 0, duration: 0.2, ease: 'power2.in' },
        '<0.1'
      );
    }
  }, [mobileOpen]);

  return (
    <header
      data-navbar
      className="fixed z-50 px-4 w-full flex justify-center items-center min-h-[80px]"
    >
      <div
        ref={containerRef}
        className="w-full mx-auto rounded-xl border"
        style={{
          width: '100%',
          maxWidth: '2400px',
          padding: '12px 16px',
          backgroundColor: 'rgba(255, 255, 255, 0)',
          backdropFilter: 'blur(0px)',
          WebkitBackdropFilter: 'blur(0px)',
          borderColor: 'rgba(255, 255, 255, 0)',
          boxShadow: 'none',
        }}
      >
        <nav className="flex items-center justify-between gap-4 md:gap-8">
          {/* Logo */}
          <div className="rounded-md flex items-center justify-center">
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0 group"
              id="logo-link"
            >
              <CustomImage
                src="/icons/logo.svg"
                alt="Vietstrix Team"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                width={44}
                height={44}
                style={{ width: 'auto' }}
              />
            </Link>
            <Link href="/" className={`flex font-semibold transition-colors duration-300 ${scrolled || !isWhiteTextPage ? 'text-main' : 'text-white'}`}>
              <span className="text-xl leading-none font-semibold uppercase">
                VIETSTRIX
              </span>
            </Link>
          </div>
          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label="Điều hướng chính"
          >
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.label} className="relative group/item">
                  <Link
                    href={item.href as any}
                    className={`relative group/link py-2 text-14 hover:scale-105 transition-all flex items-center gap-1 px-3.5 text-base rounded-sm ${active
                      ? 'text-secondary-100 font-bold bg-main rounded-md'
                      : scrolled || !isWhiteTextPage
                        ? 'text-main hover:font-bold hover:text-primary-800'
                        : 'text-white hover:font-bold hover:text-primary-200'
                      }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={`absolute left-0 -bottom-1 h-0.5 transition-all duration-300 ${active
                          ? 'w-full bg-main'
                          : `w-0 group-hover/link:w-full ${scrolled || !isWhiteTextPage ? 'bg-main' : 'bg-white'}`
                          }`}
                      />
                    </span>

                    {item.dropdown && (
                      <svg
                        className="w-3 h-3 group-hover/item:rotate-180 transition-transform"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="6 9 12 15 18 9"></polyline>
                      </svg>
                    )}
                  </Link>
                  {item.dropdown && (
                    <div className="absolute top-[calc(100%+8px)] left-0 min-w-[220px] bg-white rounded-md shadow-warm-lg border border-divider p-2 opacity-0 invisible -translate-y-2 group-hover/item:opacity-100 group-hover/item:visible group-hover/item:translate-y-0 transition-all z-50">
                      {item.dropdown.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href as any}
                          className="flex items-center gap-3 px-3.5 py-2.5 text-[0.875rem] text-secondary-800 rounded-sm hover:text-primary hover:bg-beige transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex gap-2 space-x-2">
              <LangButton scrolled={scrolled} />
              <Link
                href="/contact-us"
                className="bg-primary-950 text-white px-6 border-b-2 boerder-primary-200 py-2 rounded-md text-[0.85rem] font-bold shadow-warm-sm hover:bg-primary-900 hover:-translate-y-0.5 transition-all"
              >
                Contact Now
              </Link>
            </div>
            <button
              id="mobile-menu-btn"
              className={`lg:hidden w-[38px] h-[38px] rounded-sm flex items-center justify-center cursor-pointer transition-colors duration-300 ${scrolled || !isWhiteTextPage ? 'text-main' : 'text-white'
                }`}
              aria-label="Mở menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icons.Menu />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        ref={overlayRef}
        className="lg:hidden fixed inset-0 bg-black/50 z-40 hidden"
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div
        ref={mobileMenuRef}
        className="lg:hidden fixed top-0 right-0 h-full w-[260px] bg-white shadow-2xl z-50 hidden"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-divider">
            <div className="flex items-center gap-2">
              <CustomImage
                src="/icons/logo-cricle.svg"
                alt="Vietstrix Team"
                className="h-8 w-auto"
                width={32}
                height={32}
                style={{ width: 'auto' }}
              />
              <span className="text-lg font-semibold uppercase">VIETSTRIX</span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-sm hover:bg-gray-100"
              aria-label="Đóng menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto px-5 py-6">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.label}
                    href={item.href as any}
                    className={`px-3 py-3 rounded-md text-[0.95rem] font-medium transition-all ${active
                      ? 'text-main bg-primary-50 font-bold'
                      : 'text-main hover:bg-primary-50'
                      }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Footer Actions */}
          <div className="px-5 py-4 border-t border-divider space-y-3">
            <LangButton />
            <Link
              href="/contact-us"
              className="block w-full bg-primary-950 text-white text-center px-6 py-2.5 rounded-md text-[0.85rem] font-bold hover:bg-primary-900 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              Contact Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
