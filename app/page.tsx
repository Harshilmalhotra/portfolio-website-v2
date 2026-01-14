import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechSection } from "@/components/sections/tech-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectCard } from "@/components/elements/project-card";
import { projects } from "@/data/project";

export default function Home() {
  return (
    <div className="flex flex-col gap-0 pb-24">
      <HeroSection />
      <AboutSection />
      <TechSection />
      <ExperienceSection />
      <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
