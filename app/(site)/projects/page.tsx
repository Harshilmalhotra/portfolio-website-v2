import { ProjectCard } from "@/components/elements/project-card";
import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import { Project } from "@/types/sanity";

import { fallbackProjects } from "@/lib/fallback-data";
import { SanityConnectionAlert } from "@/components/elements/sanity-connection-alert";

// Revalidate every 60 seconds
export const revalidate = 60;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of projects and experiments by Harshil Malhotra.",
};

export default async function ProjectsPage() {
    let projects: Project[];
    let isError = false;

    try {
        projects = await client.fetch(projectsQuery);
    } catch (error) {
        console.error("Error fetching projects:", error);
        isError = true;
        projects = fallbackProjects;
    }

    return (
        <div className="py-24 max-w-screen-lg mx-auto px-6">
            <SanityConnectionAlert isError={isError} />
            <h1 className="text-4xl font-medium mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground mb-12">All apps, experiments, and open source work.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project) => (
                    <li key={project._id}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
