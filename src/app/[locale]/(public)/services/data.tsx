import { WorkflowSection } from '@/components/pages/about/workflow.about';
import { ServiceHeroSetion } from '@/components/pages/service/hero.service';
import { OurStrengthCard } from '@/components/pages/service/our-strength.service';
import CTASection from '@/components/sections/cta.section';
import OurStrength from '@/components/sections/our-strength.section';
import ServicesSection from '@/components/sections/service.section';
import React from 'react';

export default async function ServicePage() {
  return (
    <main className="relative bg-white">
      <ServiceHeroSetion />
      <ServicesSection />
      <WorkflowSection />
      <OurStrength />

      <OurStrengthCard />
      <CTASection />
    </main>
  );
}
