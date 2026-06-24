import { AboutHeroSetion } from '@/components/pages/about/hero.about';
import StorySection from '@/components/pages/about/story.about';
import { OurValuesSection } from '@/components/pages/about/values.about';
import { WorkflowSection } from '@/components/pages/about/workflow.about';
import { FounderSection } from '@/components/pages/about/founder.about';
import CTASection from '@/components/sections/cta.section';
import MentionsSection from '@/components/sections/mention.section';
import OurStrength from '@/components/sections/our-strength.section';
import { MentionResponse } from '@/types/portfolio/post/responses';
import React from 'react';
import PerformentSection from '@/components/sections/starts.section';

interface HomePageProps {
  mentions?: MentionResponse[];
}

export default async function AboutUsSection({ mentions }: HomePageProps) {
  return (
    <main className="relative bg-white">
      <AboutHeroSetion />
      <StorySection />
       <PerformentSection />
      <OurStrength />
      <WorkflowSection />
      <OurValuesSection />
      <FounderSection />
      <MentionsSection mentions={mentions} />
      <CTASection />
    </main>
  );
}
