'use client';

import { Arrows, Icons } from '@/assets';
import { CustomImage } from '@/components';
import { Contact } from '@/components/forms/contact.form';
import { useEffect, useState, useCallback } from 'react';

function ChannelCard() {
  const [copied, setCopied] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('');

  // Chỉ lấy URL phía client
  useEffect(() => {
    setCurrentUrl(window.location.href);
  }, []);

  const handleCopyLink = useCallback(async () => {
    const url = currentUrl || window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [currentUrl]);
  return (
    <div className="w-full rounded-md overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.18)] bg-white font-sans">
      {/* Banner */}
      <div className="relative">
        {/* 👇 Thay bằng <img src="..." /> của bạn */}
        <div className="w-full h-[200px] bg-gray-200 flex items-center justify-center">
          <CustomImage
            src={`/imgs/OG-Image.png`}
            alt="Vietstrix Team"
            fill
            className="object-cover"
          />
        </div>

        {/* Nút Subscribe & Share */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
          <div></div>
          <button
            onClick={handleCopyLink}
            className={`rounded-md w-9 h-9 flex items-center justify-center transition-all duration-300 ${
              copied
                ? 'bg-green-500 scale-110'
                : 'bg-gray-100 hover:bg-gray-200 active:scale-95'
            }`}
          >
            {copied ? (
              // checkmark icon
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="animate-bounce"
              >
                <path
                  d="M5 13l4 4L19 7"
                  stroke="#fff"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ) : (
              // share icon
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" stroke="#555" strokeWidth="2" />
                <circle cx="6" cy="12" r="3" stroke="#555" strokeWidth="2" />
                <circle cx="18" cy="19" r="3" stroke="#555" strokeWidth="2" />
                <path
                  d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"
                  stroke="#555"
                  strokeWidth="2"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Avatar */}
      <div className="relative flex justify-center h-[54px]">
        <div className="absolute -top-11 w-[88px] h-[88px] rounded-md border-4 border-white overflow-hidden bg-gray-200 shadow-lg">
          {/* 👇 Thay bằng <img src="..." className="w-full h-full object-cover" /> */}
          <div className="w-full h-full flex items-center justify-center ">
            <CustomImage
              src={`/icons/Og_Logo.svg`}
              alt="Vietstrix Team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="px-5 pb-6 pt-2 text-center">
        <h2 className="text-2xl font-extrabold text-main mt-1 tracking-tight">
          Vietstrix Team
        </h2>
        <p className="text-gray-500 text-lg mt-1">
          We build brands that don’t just look good — they feel right, online
          and in real life. Simple, bold, and made to last.
        </p>
      </div>
    </div>
  );
}

export default function CTASection() {
  const socialLinks = [
    {
      id: 'facebook',
      name: 'Facebook',
      description: 'Message · Comment · Fanpage',
      href: 'https://www.facebook.com/VietStrix.dev',
      icon: Icons.Facebook,
      color: '#1877F2',
      bgColor: '#EBF3FF',
      hoverShadow: 'hover:shadow-blue-200',
      borderColor: '#1877F2',
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      description: 'Video · Follow',
      href: 'https://www.tiktok.com/@vietstrix',
      icon: Icons.TikTok,
      color: '#000',
      bgColor: '#f9f9f9',
      hoverShadow: 'hover:shadow-gray-200',
      borderColor: '#e5e5e5',
    },
    {
      id: 'website',
      name: 'Website',
      description: 'Service · Portfolio · Blog',
      href: 'https://www.vietstrix.com/',
      icon: Icons.Globe,
      color: '#16A34A',
      bgColor: '#ECFDF5',
      hoverShadow: 'hover:shadow-green-200',
      borderColor: '#16A34A',
    },
    {
      id: 'zalo',
      name: 'Zalo',
      description: ' Call Now · 0906 723 985',
      href: 'https://zalo.me/0906723985',
      icon: Icons.Zalo,
      color: '#0068FF',
      bgColor: '#E6F0FF',
      hoverShadow: 'hover:shadow-blue-200',
      borderColor: '#0068FF',
      isActive: true,
    },
  ];
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-r from-primary-100 via-primary-50 to-primary-100">
      {/* Geometric gradient shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-primary-700 to-transparent rounded-md opacity-70 blur-xl animate-float-slow" />
        <div className="absolute top-0 left-1/3 w-80 h-96 bg-gradient-to-b from-primary-500 to-transparent opacity-50 blur-xl transform -skew-y-12 animate-float-medium" />
        <div className="absolute -right-20 top-1/2 w-96 h-96 bg-gradient-to-l from-primary-600 to-transparent rounded-md opacity-50 blur-xl animate-float-fast" />
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
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
      `,
        }}
      />

      <main className="relative pt-24 pb-12 px-6">
        {/* Blur dark overlay */}
        <div className="absolute inset-0 bg-main/20 backdrop-blur-sm" />
        <div className="relative z-10 max-w-2xl mx-auto space-y-section-margin">
          <section className="relative flex flex-col items-center justify-center text-center px py-12 ">
            <ChannelCard />
          </section>
          <section className="space-y-3">
            {/* CTA Header */}
            <div className="flex items-center gap-3 py-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-md bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-md h-2.5 w-2.5 bg-green-500" />
                </span>
                <span className="text-xs font-bold text-gray-700 uppercase tracking-widest whitespace-nowrap px-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-md">
                  Contact us for immediate consultation.
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* Social Links */}
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  className={`group relative flex items-center justify-between w-full rounded-md p-5 border-2 transition-all duration-300 overflow-hidden
              ${link.id === 'facebook' ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:border-blue-400' : ''}
              ${link.id === 'tiktok' ? 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-300 hover:border-gray-400' : ''}
              ${link.id === 'website' ? 'bg-gradient-to-br from-green-50 to-emerald-100 border-green-300 hover:border-green-400' : ''}
              ${link.id === 'zalo' ? 'bg-gradient-to-br from-blue-50 to-cyan-100 border-blue-300 hover:border-blue-500' : ''}
              hover:-translate-y-1 hover:shadow-2xl
            `}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                >
                  {/* Animated background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Content */}
                  <div className="flex items-center gap-4 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-md flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110
                ${link.id === 'facebook' ? 'bg-blue-200 text-blue-600' : ''}
                ${link.id === 'tiktok' ? 'bg-gray-200 text-gray-700' : ''}
                ${link.id === 'website' ? 'bg-green-500 text-white' : ''}
                ${link.id === 'zalo' ? 'bg-blue-500 text-white' : ''}
              `}
                    >
                      <Icon />
                    </div>
                    <div>
                      <p className="font-bold text-lg text-gray-900 transition-colors duration-300">
                        {link.name}
                      </p>
                      <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                        {link.isActive && (
                          <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-pulse absolute inline-flex h-full w-full rounded-md bg-green-500 opacity-75" />
                            <span className="relative inline-flex rounded-md h-1.5 w-1.5 bg-green-600" />
                          </span>
                        )}
                        {link.description}
                      </p>
                    </div>
                  </div>

                  {/* Arrow Button */}
                  <span
                    className={`w-10 h-10 rounded-md flex items-center justify-center transition-all duration-300 relative z-10
              ${link.id === 'facebook' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700' : ''}
              ${link.id === 'tiktok' ? 'bg-gray-100 text-gray-600 group-hover:bg-gray-200 group-hover:text-gray-700' : ''}
              ${link.id === 'website' ? 'bg-green-100 text-green-600 group-hover:bg-green-200 group-hover:text-green-700' : ''}
              ${link.id === 'zalo' ? 'bg-blue-100 text-blue-600 group-hover:bg-blue-200 group-hover:text-blue-700' : ''}
              group-hover:translate-x-2 group-hover:scale-125
            `}
                  >
                    <Arrows.ArrowRight />
                  </span>
                </a>
              );
            })}
          </section>
        </div>
        <div className="relative z-10  max-w-xl w-full mx-auto mt-8 space-y-section-margin">
          <Contact />
        </div>
      </main>
    </section>
  );
}
