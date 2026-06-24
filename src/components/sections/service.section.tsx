'use client';

import { useState, useEffect, useRef } from 'react';
import { Container } from '../wrappers/container';
import { useTranslations } from 'next-intl';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
  SystemCard,
  UxUiCard,
  DevelopmentCard,
  MvpCard,
  RedesignCard,
  AiToCodeCard,
} from '../animations/tech.animation';
import { SectionTag } from '../customs/section-tag.custom';

export default function ServicesSection() {
  const t = useTranslations('Service');
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Mobile/Tablet Layout: Flat alignment (no staggered offset)
      mm.add('(max-width: 1023px)', () => {
        gsap.fromTo(
          '.main-service-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.main-services-grid',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          '.sub-service-card',
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.sub-services-grid',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });

      // Desktop Layout: Staggered staircase alignment (cao rồi thấp dần)
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(
          '.main-service-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: (index) => {
              if (index === 1) return 48; // Shift down
              if (index === 2) return 96; // Shift down more
              return 0;
            },
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.main-services-grid',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );

        gsap.fromTo(
          '.sub-service-card',
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: (index) => {
              if (index === 1) return 48;
              if (index === 2) return 96;
              return 0;
            },
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.sub-services-grid',
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      id: 1,
      title: 'End-to-End Web Development',
      description: `${t('Services.step.q1')}`,
      card: <DevelopmentCard isHovered={hoveredId === 1} />,
    },
    {
      id: 2,
      title: 'AI Design to Real Website',
      description: `${t('Services.step.q2')}`,
      card: <AiToCodeCard isHovered={hoveredId === 2} />,
    },
    {
      id: 3,
      title: 'Product Design & UI/UX',
      description: `${t('Services.step.q3')}`,
      card: <UxUiCard isHovered={hoveredId === 3} />,
    },
    {
      id: 4,
      title: 'Web Systems & Optimization',
      description: `${t('Services.step.q4')}`,
      card: <SystemCard isHovered={hoveredId === 4} />,
    },
    {
      id: 5,
      title: 'MVP Development for Startups',
      description: `${t('Services.step.q5')}`,
      card: <MvpCard isHovered={hoveredId === 5} />,
    },
    {
      id: 6,
      title: 'Website Redesign & Revamp',
      description: `${t('Services.step.q6')}`,
      card: <RedesignCard isHovered={hoveredId === 6} />,
    },
  ];

  return (
    <section ref={containerRef} className="w-full bg-white py-16 lg:py-24 overflow-hidden">
      <Container width="max-w-8xl" className="mx-auto">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between text-left">
          <div className="flex-1">
            <SectionTag title="Our Services" />
            <h2 className="text-4xl font-bold leading-tight text-main lg:text-5xl mt-4 font-heading">
              Our services
            </h2>
          </div>

          {/* Description */}
          <div className="flex-1 lg:pl-8 lg:pt-4">
            <p className="text-base sm:text-lg leading-relaxed text-black">
              {t('Services.description')}
            </p>
          </div>
        </div>

        {/* Top 3 services - main */}
        <div className="grid gap-12 md:grid-cols-3 main-services-grid pb-24">
          {services.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className={`main-service-card opacity-0 group flex h-full flex-col text-left ${
                index === 1 ? 'lg:translate-y-12' : index === 2 ? 'lg:translate-y-24' : ''
              }`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-48 w-full flex-shrink-0 sm:h-56 bg-transparent">
                {service.card}
              </div>
              <div className="relative flex flex-1 flex-col justify-start pt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-main mb-3 leading-tight font-heading">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom 3 services */}
        <div className="mt-16 lg:mt-24 grid gap-12 md:grid-cols-3 sub-services-grid pb-24">
          {services.slice(3).map((service, index) => (
            <div
              key={service.id}
              className={`sub-service-card opacity-0 group flex h-full flex-col text-left ${
                index === 1 ? 'lg:translate-y-12' : index === 2 ? 'lg:translate-y-24' : ''
              }`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative h-48 w-full flex-shrink-0 sm:h-56 bg-transparent">
                {service.card}
              </div>
              <div className="relative flex flex-1 flex-col justify-start pt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-main mb-3 leading-tight font-heading">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
