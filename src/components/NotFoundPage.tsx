'use client';

import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function NotFound() {
  const t = useTranslations('NotFound');

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

      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center ">
        <div className="max-w-md space-y-6 text-main">
          <h1 className="text-[220px] font-bold leading-none tracking-tighter">
            404
          </h1>
          <h2 className="text-4xl font-bold"> {t('title')}</h2>
          <p className="text-gray-600">
            {t('desc1')} <br />
            {t('desc2')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/"
              className="inline-flex uppercase items-center justify-center gap-2 rounded-md bg-main px-6 py-3 font-medium text-white transition-all hover:bg-main/90 hover:scale-105 transform duration-300"
            >
              {t('button')}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
