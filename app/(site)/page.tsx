import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechSection } from "@/components/sections/tech-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectCard } from "@/components/elements/project-card";
import { client } from "@/lib/sanity";
import { projectsQuery, techStackQuery, experienceQuery, techCategoryQuery } from "@/lib/queries";
import { Project, TechStack, Experience, TechCategory } from "@/types/sanity";
import { fallbackExperience, fallbackProjects, fallbackTechStack } from "@/lib/fallback-data";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  const [projects, techStack, experience, techCategories] = await Promise.all([
    client.fetch<Project[]>(projectsQuery).catch(err => {
      console.error("Error fetching projects:", err);
      return fallbackProjects;
    }),
    client.fetch<TechStack[]>(techStackQuery).catch(err => {
      console.error("Error fetching techStack:", err);
      return fallbackTechStack;
    }),
    client.fetch<Experience[]>(experienceQuery).catch(err => {
      console.error("Error fetching experience:", err);
      return fallbackExperience;
    }),
    client.fetch<TechCategory[]>(techCategoryQuery).catch(err => {
        console.error("Error fetching tech categories:", err);
        return [];
    })
  ]);

  return (
    <div className="flex flex-col gap-0 pb-24">
      <HeroSection />
      <AboutSection />
      <TechSection techStack={techStack} categories={techCategories} />
      <ExperienceSection experiences={experience} />
      <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.filter(p => p.isFeatured).slice(0, 4).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
