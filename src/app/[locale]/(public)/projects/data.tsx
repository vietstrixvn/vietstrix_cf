import { HeroCustom } from '@/components/customs/hero.custom';
import { OurProjectSection } from '@/components/pages/project/section.project';
import CTASection from '@/components/sections/cta.section';
import { ProjectListProps } from '@/types/portfolio';
import React from 'react';

const ProjectList: React.FC<ProjectListProps> = ({
  project,
  categories,
  pagination,
  currentPage,
}) => {
  return (
    <main className="relative bg-white">
      <HeroCustom image="/imgs/OG-Image.png" title="Project" />
      <section>
        <OurProjectSection
          project={project}
          categories={categories}
          pagination={pagination}
          currentPage={currentPage}
        />
      </section>
      <CTASection />
    </main>
  );
};

export default ProjectList;
