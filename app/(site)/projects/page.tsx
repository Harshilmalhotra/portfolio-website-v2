import { ProjectCard } from "@/components/elements/project-card";
import { client } from "@/lib/sanity";
import { projectsQuery } from "@/lib/queries";
import { Project } from "@/types/sanity";

import { fallbackProjects } from "@/lib/fallback-data";

// Revalidate every 60 seconds
export const revalidate = 60;

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Showcase of projects and experiments by Harshil Malhotra.",
};

import { sanityFetch } from "@/lib/sanity.server";

// ...

export default async function ProjectsPage() {
    const projects = await sanityFetch<Project[]>({
        query: projectsQuery,
        fallback: fallbackProjects
    }) || fallbackProjects;
    
    // If we're using the fallback data reference, assume error occurred
    const isError = projects === fallbackProjects;

    return (
        <div className="py-24 max-w-screen-lg mx-auto px-6">
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
