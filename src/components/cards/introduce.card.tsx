'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { StatsSection } from './statis.card';
import { CustomImage } from '../media/image.component';
// import { StatsSection } from './StatsSection';

// Variants cho animation
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariantsRight = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function AboutSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div className="mt-16">
      {/* Heading */}
      <StatsSection />

      {/* About content */}
      <div ref={ref} className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            className="flex flex-col md:flex-row gap-12 items-start"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'show' : 'hidden'}
          >
            <motion.div
              className="md:w-2/3 justify-start flex flex-col gap-4"
              variants={itemVariantsRight}
            >
              <p className="text-lg text-gray-900 leading-relaxed">
                &quot;Full-stack developer with hands-on experience from
                freelance work and personal projects. Proficient in Node.js,
                NestJS, React, and modern tooling such as Docker and Redis.
                Experienced in building and deploying real-world web
                applications with attention to performance, scalability, and
                user experience. Recently gained exposure to microservices and
                gRPC, and eager to deepen expertise in distributed system
                design.&quot;
              </p>
            </motion.div>
            <div className="w-[56rem] border-2 rounded-md border-white max-w-2xl aspect-video relative ">
              <CustomImage
                src="/imgs/1.jpg"
                alt="Decorative bird illustration"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* StatsSection lazy-loaded */}
    </div>
  );
}
