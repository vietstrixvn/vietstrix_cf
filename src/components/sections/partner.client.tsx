'use client';

import { MentionResponse } from '@/types/portfolio/post/responses';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { SectionTag } from '../customs/section-tag.custom';
import { LoadingSpin } from '../loading';
import { NotiPostNull } from '../loading/null_custom';
import { CustomImage } from '../media/image.component';
import { Container } from '../wrappers/container';
import { useTranslations } from 'next-intl';
import { Volume2, VolumeX } from 'lucide-react';

interface PartnersClientProps {
  mentions: MentionResponse[];
}

export default function PartnersClient({ mentions }: PartnersClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);
  const t = useTranslations('Page');

  const isPaused = !isPlaying;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '150px', // preload when video is 150px away
        threshold: 0.01,
      }
    );

    const currentContainer = containerRef.current;
    if (currentContainer) {
      observer.observe(currentContainer);
    }

    return () => {
      if (currentContainer) {
        observer.unobserve(currentContainer);
      }
    };
  }, []);

  useEffect(() => {
    if (mentions) {
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [mentions]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => {
      setIsPlaying(true);
      setIsCompleted(false);
    };
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setIsCompleted(true);
    };

    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      if (isCompleted) {
        videoRef.current.currentTime = 0;
        setIsCompleted(false);
      }
      videoRef.current.play().catch((err) => {
        console.error('Video play failed:', err);
      });
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const shouldScroll = mentions.length > 5;

  return (
    <section id="mentions-section" className="py-24 overflow-x-hidden bg-white">
      <Container className="mx-auto">
        <div className="container-custom mb-16">
          <div className="text-center">
            <SectionTag title="Testimonials" />
            <h2 className="text-4xl text-secondary-700 font-bold mt-4 mb-4">
              {t('Message.heading')}
            </h2>
          </div>
        </div>

        <div ref={containerRef} className="mx-auto px-4 mb-20 w-full">
          <div
            className="relative w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-secondary-100/50 group cursor-pointer aspect-[2048/1080]"
            onClick={togglePlay}
          >
            {/* Pause overlay */}
            {isPaused && !isCompleted && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 backdrop-blur-[2px] transition-all duration-300">
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 shadow-xl scale-95 hover:scale-105 active:scale-95 transition-transform">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                    className="w-6 h-6 md:w-7 md:h-7 translate-x-0.5"
                  >
                    <path d="M8 5v14l11-7L8 5z" />
                  </svg>
                </div>
              </div>
            )}

            {/* Completed / Replay overlay */}
            {isCompleted && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-all duration-300">
                <div className="flex flex-col items-center gap-2 md:gap-3">
                  <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 shadow-xl hover:scale-110 active:scale-95 transition-transform duration-300">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="white"
                      className="w-6 h-6 md:w-7 md:h-7"
                    >
                      <path d="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z" />
                    </svg>
                  </div>
                  <span className="text-white text-[10px] md:text-xs font-mono tracking-wider bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 select-none">
                    REPLAY
                  </span>
                </div>
              </div>
            )}

            <video
              ref={videoRef}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              src={
                isIntersected
                  ? 'https://hcm03.vstorage.vngcloud.vn/v1/AUTH_161cb0839cf746f991ab035d9a50a0b6/vietstrix-team/video/vietstrix_1.mp4'
                  : undefined
              }
              muted={isMuted}
              playsInline
              preload={isIntersected ? 'auto' : 'none'}
            />

            {/* Subtle Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-main to-secondary-500 rounded-2xl blur-lg opacity-10 group-hover:opacity-20 transition duration-1000 -z-10" />

            {/* Overlay Grid/Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

            {/* Bottom Control Bar */}
            <div className="absolute bottom-0 left-0 right-0 p-3 md:p-6 flex items-center justify-between opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black/70 to-transparent z-20">
              {/* Play/Pause indicator */}
              <div className="flex items-center gap-3">
                <div className="w-auto px-3 h-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white text-[10px] md:text-xs font-mono select-none min-w-[72px] text-center">
                  {isCompleted ? 'ENDED' : isPlaying ? 'PLAYING' : 'PAUSED'}
                </div>
              </div>

              {/* Mute/Unmute toggle button */}
              <button
                onClick={toggleMute}
                className="p-2 md:p-2.5 min-w-[44px] min-h-[44px] rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/25 transition-all duration-200 shadow-md hover:scale-105 active:scale-95 flex items-center justify-center"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? (
                  <VolumeX className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[1.75]" />
                ) : (
                  <Volume2 className="w-4.5 h-4.5 md:w-5 md:h-5 stroke-[1.75]" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <LoadingSpin />
          </div>
        ) : mentions.length === 0 ? (
          <div className="container-custom">
            <NotiPostNull />
          </div>
        ) : shouldScroll ? (
          <div className="relative flex overflow-hidden group">
            {/* First track */}
            <div className="flex whitespace-nowrap animate-infinite-scroll group-hover:[animation-play-state:paused] py-4">
              {mentions.map((mention) => (
                <MentionCard
                  key={mention.id}
                  mention={mention}
                  className="mx-3 md:mx-4 shrink-0 w-[380px] max-w-[calc(100vw-32px)]"
                />
              ))}
            </div>

            {/* Duplicate track for seamless loop */}
            <div
              className="flex whitespace-nowrap animate-infinite-scroll group-hover:[animation-play-state:paused] py-4"
              aria-hidden="true"
            >
              {mentions.map((mention) => (
                <MentionCard
                  key={`dup-${mention.id}`}
                  mention={mention}
                  className="mx-3 md:mx-4 shrink-0 w-[380px] max-w-[calc(100vw-32px)]"
                />
              ))}
            </div>

            {/* Gradient overlays for smooth edges */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />
          </div>
        ) : (
          // Flex layout for <= 5 items
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-8 max-w-6xl mx-auto">
              {mentions.map((mention) => (
                <MentionCard
                  key={mention.id}
                  mention={mention}
                  className="w-full max-w-[min(384px,calc(100vw-32px))]"
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

interface MentionCardProps {
  mention: MentionResponse;
  className?: string;
}

function MentionCard({ mention, className }: MentionCardProps) {
  return (
    <Link
      href={mention.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group/card rounded-md bg-gradient-to-br from-stone-50 to-stone-100 p-6 shadow-lg border border-transparent hover:border-main/10 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 whitespace-normal ${className || ''}`}
    >
      {/* Header with image and quote icon */}
      <div className="mb-6 flex items-center justify-between">
        {/* Left: Logo + Name/Title */}
        <div className="flex items-center gap-4">
          <div className="relative overflow-hidden rounded-lg bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center shadow-sm">
            {mention.image_media?.url ? (
              <CustomImage
                src={mention.image_media.url}
                alt="Partner logo"
                width={200}
                height={200}
                className=" object-contain p-1.5 transition-opacity group-hover/card:opacity-75"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-lg select-none">
                {mention.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-base leading-snug">
              {mention.name}
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">{mention.title}</p>
          </div>
        </div>

        {/* Right: Quote Icon */}
        <div className="text-3xl md:text-5xl font-bold text-main/80 select-none leading-none -translate-y-1">
          &quot;
        </div>
      </div>

      {/* Dashed Divider Line */}
      <div className="border-t border-dashed border-gray-300 my-5" />

      <div className="mb-5">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-700">
          Before
        </h4>
        <p className="italic text-gray-700">&quot;{mention.before}&quot;</p>
      </div>

      <div className="rounded-lg bg-main p-4">
        <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-400">
          After
        </h4>
        <p className="italic text-white">&quot;{mention.after}&quot;</p>
      </div>
    </Link>
  );
}
