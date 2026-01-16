import { HeroSection } from "@/components/sections/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { TechSection } from "@/components/sections/tech-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { ProjectCard } from "@/components/elements/project-card";
import { client } from "@/lib/sanity";
import { profileQuery, projectsQuery, techStackQuery, experienceQuery, statsQuery } from "@/lib/queries";
import { Profile, Project, TechStack, Experience, Stat } from "@/types/sanity";

import { fallbackExperience, fallbackProfile, fallbackProjects, fallbackStats, fallbackTechStack } from "@/lib/fallback-data";
import { SanityConnectionAlert } from "@/components/elements/sanity-connection-alert";

// Revalidate every 60 seconds
export const revalidate = 60;

export default async function Home() {
  let profile: Profile;
  let projects: Project[];
  let techStack: TechStack[];
  let experience: Experience[];
  let stats: Stat[];
  let isError = false;

  try {
    profile = await client.fetch(profileQuery);
    projects = await client.fetch(projectsQuery);
    techStack = await client.fetch(techStackQuery);
    experience = await client.fetch(experienceQuery);
    stats = await client.fetch(statsQuery);
  } catch (error) {
    console.error("Error fetching data from Sanity:", error);
    isError = true;
    profile = fallbackProfile;
    projects = fallbackProjects;
    techStack = fallbackTechStack;
    experience = fallbackExperience;
    stats = fallbackStats;
  }

  return (
    <div className="flex flex-col gap-0 pb-24">
      <SanityConnectionAlert isError={isError} />
      <HeroSection profile={profile} />
      <AboutSection profile={profile} stats={stats} />
      <TechSection techStack={techStack} />
      <ExperienceSection experiences={experience} />
      <section id="projects" className="py-24 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12">Selected Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.slice(0, 4).map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
