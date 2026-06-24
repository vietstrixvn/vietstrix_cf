'use client';

import HeroSection from './hero';
import AboutUsSection from '@/components/sections/about.section';
import ProjectsSection from '@/components/sections/project.section';
import CTASection from '@/components/sections/cta.section';
import BlogSection from '@/components/sections/post.section';
import { PostResponse } from '@/types/portfolio';
import { MentionResponse } from '@/types/portfolio/post/responses';
import MentionsSection from '@/components/sections/mention.section';
import OurValueSection from '@/components/sections/our-value.section';
import ServicesAnimationSection from '@/components/sections/service-c.section';
import SolutionCard from '@/components/cards/solution.card';
import PerformentSection from '@/components/sections/starts.section';
import FAQSection from '@/components/sections/faq.section';

interface HomePageProps {
  projects?: PostResponse[];
  posts?: PostResponse[];
  mentions?: MentionResponse[];
}

export default function HomePage({ posts, projects, mentions }: HomePageProps) {
  return (
    <main className="relative bg-white">
      {/* Hero */}
      <section className="relative min-h-screen">
        <HeroSection />
      </section>

      {/* About wrapper - sticky + clip */}
      <div style={{ position: 'relative', height: '200vh', overflow: 'clip' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', zIndex: 1 }}>
          <section id="about" className="relative h-full">
            <AboutUsSection />
          </section>
        </div>
      </div>

      {/* Services bắt đầu ngay sau wrapper - dùng marginTop âm để kéo lên ĐÈ lên About */}
      <div style={{ position: 'relative', zIndex: 10, marginTop: '-100vh' }}>
        <section
          id="strength"
          className="relative  bg-white"
          style={{ borderRadius: '20px 20px 0 0' }}
        >
          <SolutionCard />
        </section>
        <section id="services" className="relative bg-white">
          <ServicesAnimationSection />
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
