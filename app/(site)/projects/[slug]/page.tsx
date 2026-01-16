import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProjectPreviewCarousel } from "@/components/elements/project-preview-carousel";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { client } from "@/lib/sanity";
import { groq, PortableText } from "next-sanity";
import { Project } from "@/types/sanity";
import { urlFor } from "@/lib/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

import { fallbackProjects } from "@/lib/fallback-data";
import { SanityConnectionAlert } from "@/components/elements/sanity-connection-alert";

// Revalidate every 60 seconds
export const revalidate = 60;

export async function generateStaticParams() {
    try {
        const query = groq`*[_type == "project"]{ "slug": slug.current }`;
        const projects = await client.fetch(query);
        return projects.map((p: { slug: string }) => ({ slug: p.slug }));
    } catch (error) {
        console.error("Error in generateStaticParams:", error);
        return [];
    }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    let project: Project | null = null;
    let isError = false;

    try {
        const query = groq`*[_type == "project" && slug.current == $slug][0] {
            ...,
            "technologies": technologies[]->{
                name,
                icon,
                techImage
            },
            content[],
            previews
        }`;
        project = await client.fetch(query, { slug });
    } catch (error) {
        console.error(`Error fetching project ${slug}:`, error);
        isError = true;
        // Check if fallback exists
        const fallback = fallbackProjects.find(p => p.slug.current === slug);
        if (fallback) {
            // Cast fallback to Project, noting types might be slightly different for local data
            project = fallback as unknown as Project;
        }
    }

    if (!project) notFound();

    const previews = project.previews?.map((p) => ({
        imageUrl: urlFor(p).url(),
        imageAlt: p.alt || "Project preview"
    }));

    return (
        <article className="max-w-3xl mx-auto py-24 px-6 flex flex-col gap-8">
            <SanityConnectionAlert isError={isError} />
            <Button variant="ghost" className="w-fit rounded-full pl-0 hover:pl-2 transition-all" asChild>
                <Link href="/projects"><ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects</Link>
            </Button>

            <header className="space-y-4">
                <h1 className="text-4xl font-bold">{project.name}</h1>
                <p className="text-xl text-muted-foreground">{project.shortDesc}</p>

                {/* Tech Stack Display */}
                {project.technologies && project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                        <TooltipProvider>
                            {project.technologies.map((tech) => (
                                <Tooltip key={tech._id || tech.name}>
                                    <TooltipTrigger asChild>
                                        <div className="p-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors cursor-default">
                                            {tech.techImage ? (
                                                <Image
                                                    src={urlFor(tech.techImage).width(24).height(24).url()}
                                                    alt={tech.name}
                                                    width={24}
                                                    height={24}
                                                    className="w-6 h-6 object-contain"
                                                />
                                            ) : (
                                                <span className="text-sm font-medium">{tech.name}</span>
                                            )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{tech.name}</p>
                                    </TooltipContent>
                                </Tooltip>
                            ))}
                        </TooltipProvider>
                    </div>
                )}

                <div className="flex gap-4 pt-4">
                    {project.demoLink && (
                        <Button asChild className="rounded-full">
                            <Link href={project.demoLink} target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> Try Project</Link>
                        </Button>
                    )}
                    {project.sourceLink && (
                        <Button variant="outline" asChild className="rounded-full">
                            <Link href={project.sourceLink} target="_blank"><Github className="mr-2 h-4 w-4" /> GitHub</Link>
                        </Button>
                    )}
                </div>
            </header>

            {previews && previews.length > 0 && <ProjectPreviewCarousel previews={previews} />}

            <div className="prose dark:prose-invert max-w-none">
                {project.content ? (
                    <PortableText value={project.content} />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: project.description || "" }} />
                )}
            </div>
        </article>
    );
}
