import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechSection } from "@/components/sections/tech-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectCard } from "@/components/elements/project-card";
import { sanityFetch } from "@/lib/sanity.server";
import { projectsQuery, techStackQuery, experienceQuery, techCategoryQuery } from "@/lib/queries";
import { Project, TechStack, Experience, TechCategory } from "@/types/sanity";
import { fallbackExperience, fallbackProjects } from "@/lib/fallback-data";

// Revalidate every 60 seconds
export const revalidate = 60;

import { CertificationSection } from "@/components/sections/certification-section";
import { certificationsQuery } from "@/lib/queries";
import { Certification } from "@/types/sanity";
import { fallbackCertifications } from "@/lib/fallback-data";

// ... existing imports

export default async function Home() {
  const [projects, techStack, experience, techCategories, certifications] = await Promise.all([
    sanityFetch<Project[]>({ 
        query: projectsQuery, 
        fallback: fallbackProjects,
        tags: ["project"]
    }),
    sanityFetch<TechStack[]>({ 
        query: techStackQuery, 
        fallback: [],
        tags: ["techStack"]
    }),
    sanityFetch<Experience[]>({ 
        query: experienceQuery, 
        fallback: fallbackExperience,
        tags: ["experience"]
    }),
    sanityFetch<TechCategory[]>({ 
        query: techCategoryQuery, 
        fallback: [],
        tags: ["techCategory"]
    }),
    sanityFetch<Certification[]>({
        query: certificationsQuery,
        fallback: fallbackCertifications,
        tags: ["certification"]
    })
  ]);

  return (
    <div className="flex flex-col gap-0 pb-24">
      <HeroSection />
      <AboutSection />
      <TechSection techStack={techStack || []} categories={techCategories || []} />
      <ExperienceSection experiences={experience || fallbackExperience} />
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(projects || fallbackProjects).filter(p => p.isFeatured).slice(0, 4).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
      <CertificationSection certifications={(certifications || fallbackCertifications).filter(c => c.isFeatured)} />
    </div>
  );
}
