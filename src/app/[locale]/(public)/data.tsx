'use client';

import HeroSection from './hero';
import AboutEditorialSection from '@/components/sections/about-editorial.section';
import { PostResponse } from '@/types/portfolio';
import { MentionResponse } from '@/types/portfolio/post/responses';
import dynamic from 'next/dynamic';

// SEO-critical sections: ssr: true so Google can crawl content
const ProjectsSection = dynamic(() => import('@/components/sections/project.section'), { ssr: true, loading: () => null });
const BlogSection = dynamic(() => import('@/components/sections/post.section'), { ssr: true, loading: () => null });
const MentionsSection = dynamic(() => import('@/components/sections/mention.section'), { ssr: true, loading: () => null });
const FAQSection = dynamic(() => import('@/components/sections/faq.section'), { ssr: true, loading: () => null });

// Pre-rendered sections for optimal SEO, zero CLS, and smooth hydration
const CTASection = dynamic(() => import('@/components/sections/cta.section'), { ssr: true });
const OurValueSection = dynamic(() => import('@/components/sections/our-value.section'), { ssr: true });
const ServicesAnimationSection = dynamic(() => import('@/components/sections/service-c.section'), { ssr: true });
const PerformentSection = dynamic(() => import('@/components/sections/starts.section'), { ssr: true });

interface HomePageProps {
  projects?: PostResponse[];
  posts?: PostResponse[];
  mentions?: MentionResponse[];
}

export default function HomePage({ posts, projects, mentions }: HomePageProps) {
  return (
    <main className="relative bg-white">
      {/* Hero */}
      <HeroSection />

      {/* About wrapper - sticky + clip */}
      <div style={{ position: 'relative', height: '250vh', overflow: 'clip' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          <AboutEditorialSection />
        </div>
      </div>

      {/* Services bắt đầu ngay sau wrapper - dùng marginTop âm để kéo lên ĐÈ lên About */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>
        <section
          id="services"
          className="relative bg-white"
          style={{ borderRadius: '20px 20px 0 0' }}
        >
          <ServicesAnimationSection />

        </section>

        <section id="our-value" className="relative">
          <OurValueSection />
          <PerformentSection />
        </section>

        <section id="projects" className="relative bg-white">
          <ProjectsSection projects={projects} />
        </section>
        <section id="mentions" className="relative bg-white">
          <MentionsSection mentions={mentions} />
        </section>
        <section id="blog" className="relative bg-white">
          <BlogSection posts={posts} />
        </section>

        <section id="faq" className="relative bg-white">
          <FAQSection />
        </section>

        <section id="cta" className="relative">
          <CTASection />
        </section>
      </div>
    </main>
  );
}
