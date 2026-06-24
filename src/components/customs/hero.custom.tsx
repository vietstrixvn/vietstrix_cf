'use client';

import { useIntersection } from '@/hooks/useIntersection';
import React from 'react';
import { CustomImage } from '../media/image.component';

export const HeroCustom = ({
  image,
  title,
}: {
  image: string;
  title: string;
}) => {
  const [heroRef, heroVisible] = useIntersection({
    threshold: 0.1,
    once: true,
  });
  return (
    <section
      className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden"
      ref={heroRef as unknown as React.RefObject<HTMLElement>}
    >
      <div className="absolute inset-0 z-0">
        <CustomImage
          src={image}
          alt="Vietstrix Team"
          fill
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"></div>
      </div>

      <div
        className={`container-custom relative z-10 text-center text-white transition-all duration-1000 transform ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <h1 className="text-2xl md:text-5xl font-bold mb-8">
          <span className="text-primary-bg opacity-">{title}</span>
        </h1>
      </div>
    </section>
  );
};
