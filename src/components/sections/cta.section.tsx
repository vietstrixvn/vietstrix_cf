'use client';

import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';

export default function CTASection() {
  const t = useTranslations('Page');

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100">
      {/* Geometric gradient shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-primary-300 to-transparent rounded-md opacity-70 blur-xl animate-float-slow" />
        <div className="absolute top-0 left-1/3 w-80 h-96 bg-gradient-to-b from-primary-200 to-transparent opacity-50 blur-xl transform -skew-y-12 animate-float-medium" />
        <div className="absolute -right-20 top-1/2 w-96 h-96 bg-gradient-to-l from-primary-300 to-transparent rounded-md opacity-70 blur-xl animate-float-fast" />
      </div>

      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(80px, -60px) scale(1.05);
          }
          66% {
            transform: translate(-20px, 30px) scale(0.95);
          }
        }

        @keyframes float-medium {
          0%,
          100% {
            transform: translate(0, 0) skewY(-12deg);
          }
          50% {
            transform: translate(-40px, 40px) skewY(-12deg) scale(1.1);
          }
        }

        @keyframes float-fast {
          0%,
          100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(-30px, -30px) rotate(5deg);
          }
          50% {
            transform: translate(20px, -40px) rotate(-5deg);
          }
          75% {
            transform: translate(-20px, 20px) rotate(3deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite; /* 20s → 4s */
        }

        .animate-float-medium {
          animation: float-medium 3s ease-in-out infinite; /* 15s → 3s */
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite; /* 12s → 2s */
        }
      `}</style>

      <div className="relative z-10 h-full flex flex-col lg:flex-row lg:items-center lg:justify-between px-6 sm:px-8 lg:px-16 py-16 sm:py-20 gap-8 lg:gap-0">
        {/* Left side - Main headline */}
        <div className="flex-1 max-w-2xl">
          <h2 className="text-4xl sm:text-5xl lg:text-7xl uppercase font-bold text-main leading-tight tracking-tight">
            <span className="block">{t('CTA.title.t1')}</span>
            <span className="block">{t('CTA.title.t2')}</span>
            <span className="block">{t('CTA.title.t3')}</span>
          </h2>
        </div>

        {/* Right side - CTA content */}
        <div className="flex flex-col items-start lg:items-end lg:pl-8">
          <p className="text-gray-700 lg:text-right mb-6 max-w-xs text-sm leading-relaxed">
            {t('CTA.description')}
          </p>
          <Button className="bg-main hover:bg-primary-800 text-white px-8 py-6 text-base font-medium">
            {t('CTA.button')}
          </Button>
        </div>
      </div>

      {/* Social proof - Bottom left */}
    </section>
  );
}
