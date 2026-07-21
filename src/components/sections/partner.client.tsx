'use client';

import { MentionResponse } from '@/types/portfolio/post/responses';
import Link from 'next/link';
import { useEffect, useRef, useState, useCallback, memo } from 'react';
import { SectionTag } from '../customs/section-tag.custom';
import { LoadingSpin } from '../loading';
import { NotiPostNull } from '../loading/null_custom';
import { CustomImage } from '../media/image.component';
import { useTranslations } from 'next-intl';
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';
import { Container } from '../wrappers/container';

interface PartnersClientProps {
  mentions: MentionResponse[];
}

export default function PartnersClient({ mentions }: PartnersClientProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isIntersected, setIsIntersected] = useState(false);
  const t = useTranslations('Page');

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : mentions.length - 1));
  }, [mentions.length]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < mentions.length - 1 ? prev + 1 : 0));
  }, [mentions.length]);

  const getVisibleMentions = () => {
    if (mentions.length === 0) return [];
    if (mentions.length === 1) return [mentions[0]];
    const first = mentions[currentIndex % mentions.length];
    const second = mentions[(currentIndex + 1) % mentions.length];
    return [first, second];
  };

  const visibleMentions = getVisibleMentions();

  const isPaused = !isPlaying;

  // Intersection Observer for lazy video loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersected(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px',
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

  // Consolidated video event handlers
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

  const togglePlay = useCallback(() => {
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
  }, [isPlaying, isCompleted]);

  const toggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  }, []);

  return (
    <section id="mentions-section" className="relative bg-white text-slate-900 py-12 lg:py-20 px-6 md:px-12 lg:px-16 w-full border-t border-slate-100 overflow-x-hidden">
      <Container width='max-w-8xl'>
        <SectionTag title="TESTIMONIALS" />

        {/* Header layout matching BlogSection with Prev/Next buttons */}
        <div className="mb-12 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl">
              {t('Message.heading')}
            </h2>
          </div>
          <div className="flex-1 lg:pl-8">
            <p className="text-base leading-relaxed text-black">
              {t('Message.description') ||
                'Hear directly from the founders, partners, and clients who have built and scaled their products with Vietstrix.'}
            </p>
          </div>
        </div>

        <div ref={containerRef} className="mx-auto px-4 mb-20 w-full">
          <div
            className="relative w-full  overflow-hidden bg-black shadow-2xl border border-secondary-100/50 group cursor-pointer aspect-[2048/1080]"
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
              preload={isIntersected ? 'metadata' : 'none'}
              poster={isIntersected ? undefined : 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 1080"%3E%3Crect fill="%23000" width="2048" height="1080"/%3E%3C/svg%3E'}
            />

            {/* Subtle Ambient Glow - simplified */}
            <div className="absolute -inset-1 bg-gradient-to-r from-main to-secondary-500  blur-lg opacity-5 group-hover:opacity-10 transition duration-700 -z-10" />

            {/* Overlay vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/15 pointer-events-none" />

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
        ) : (
          <div className="w-full flex flex-col items-center gap-8">
            <div className={`grid gap-6 max-w-6xl w-full mx-auto transition-all duration-300 ${visibleMentions.length === 1 ? 'grid-cols-1 max-w-2xl' : 'grid-cols-1 lg:grid-cols-2'}`}>
              {visibleMentions.map((mention, index) => (
                <MentionCard
                  key={`${mention.id}-${index}`}
                  mention={mention}
                  className="w-full"
                />
              ))}
            </div>

            {/* Prev / Next Navigation Buttons placed directly below cards */}
            {mentions.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-2">
                <button
                  onClick={handlePrev}
                  className="w-12 h-12  border border-primary-200 bg-white flex items-center justify-center text-main hover:bg-main hover:text-white hover:border-main transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-12 h-12 border border-primary-200 bg-white flex items-center justify-center text-main hover:bg-main hover:text-white hover:border-main transition-all duration-200 shadow-sm hover:shadow-lg active:scale-95 cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            )}
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

// Memoize card để tránh re-render
const MentionCard = memo(function MentionCard({ mention, className }: MentionCardProps) {
  return (
    <Link
      href={mention.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative p-6 border border-primary-200 transition-all duration-300 hover:bg-main hover:border-main hover:shadow-xl cursor-pointer bg-white hover:z-10 overflow-hidden h-full flex flex-col whitespace-normal ${className || ''
        }`}
    >
      {/* 4 dấu + cố định góc thẻ giống Blog PostCard */}
      <span className="absolute top-2 left-2 text-primary-200 group-hover:text-white/60 text-xs z-20 pointer-events-none transition-colors">
        +
      </span>
      <span className="absolute top-2 right-2 text-primary-200 group-hover:text-white/60 text-xs z-20 pointer-events-none transition-colors">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-primary-200 group-hover:text-white/60 text-xs z-20 pointer-events-none transition-colors">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-primary-200 group-hover:text-white/60 text-xs z-20 pointer-events-none transition-colors">
        +
      </span>

      {/* Header với logo đối tác và thông tin */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative w-12 h-12  bg-white border border-gray-100 flex-shrink-0 flex items-center justify-center shadow-sm overflow-hidden p-1">
            {mention.image_media?.url ? (
              <CustomImage
                src={mention.image_media.url}
                alt={mention.name}
                width={80}
                height={80}
                className="object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold text-base select-none">
                {mention.name.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col justify-center">
            <h3 className="font-semibold text-main text-base leading-snug group-hover:text-white transition-colors">
              {mention.name}
            </h3>
            <p className="text-xs text-gray-500 group-hover:text-white/80 transition-colors mt-0.5">
              {mention.title}
            </p>
          </div>
        </div>

        <div className="text-3xl font-bold text-main group-hover:text-white transition-colors select-none leading-none">
          &quot;
        </div>
      </div>

      {/* Đường phân cách nét đứt */}
      <div className="border-t border-dashed border-gray-300 group-hover:border-white/30 my-3 transition-colors" />

      {/* Before & After side-by-side blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1 mt-1">
        {/* Before block */}
        <div className="flex flex-col p-4  border border-gray-100 group-hover:border-white/20 bg-gray-50/70 group-hover:bg-white/10 transition-colors">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-white/80 transition-colors">
            Before
          </h4>
          <p className="text-sm italic text-gray-700 group-hover:text-white transition-colors leading-relaxed">
            &quot;{mention.before}&quot;
          </p>
        </div>

        {/* After block */}
        <div className="flex flex-col p-4  bg-main group-hover:bg-white/15 border border-transparent group-hover:border-white/30 transition-colors">
          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-gray-300 group-hover:text-white/80 transition-colors">
            After
          </h4>
          <p className="text-sm italic text-white transition-colors leading-relaxed">
            &quot;{mention.after}&quot;
          </p>
        </div>
      </div>
    </Link>
  );
});
