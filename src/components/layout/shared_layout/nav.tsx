'use client';

import { useState, useEffect } from 'react';
import { Container } from '@/components/wrappers/container';
import { CustomImage } from '@/components';
import { Icons } from '@/assets';
import Link from 'next/link';

export default function NavBarShare() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  return (
    <header
      data-navbar
      className={`fixed z-50 px-4 lg:px w-full flex justify-center items-center min-h-[80px] ${
        scrolled ? 'bg-transparent' : 'bg-transparent'
      }`}
    >
      <Container
        className={`w-fit mx-auto px-6 py-2 rounded-md shadow-md transition-all duration-200
          ${scrolled ? 'bg-white/40 backdrop-blur-2xl shadow-lg' : 'bg-white'}`}
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
                src="/icons/logo-cricle.svg"
                alt="Vietstrix Team"
                className="h-11 w-auto object-contain group-hover:scale-105 transition-transform"
                width={44}
                height={44}
              />
            </Link>
            <div className="flex text-black font-semibold">
              <span className="text-xl leading-none font-semibold uppercase">
                VIETSTRIX
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex gap-2 space-x-2">
              <Link
                href="/contact-us"
                className="bg-primary-950 text-white px-6 border-b-2 boerder-primary-200 py-2 rounded-md text-[0.85rem] font-bold shadow-warm-sm hover:bg-primary-900 hover:-translate-y-0.5 transition-all"
              >
                Contact Now
              </Link>
            </div>
            <button
              id="mobile-menu-btn"
              className="lg:hidden w-[38px] h-[38px] rounded-sm flex items-center justify-center text-text cursor-pointer"
              aria-label="Mở menu"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <Icons.Menu />
            </button>
          </div>
        </nav>
      </Container>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-[260px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
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

          {/* Footer Actions */}
          <div className="px-5 py-4 border-t border-divider space-y-3">
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
