import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectPreviewCarousel } from "@/components/elements/project-preview-carousel";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { client } from "@/lib/sanity";
import { groq } from "next-sanity";
import { Project } from "@/types/sanity";
import { PortableText } from "next-sanity";
import { urlFor } from "@/lib/image";

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
            content[],
            previews
        }`;
        project = await client.fetch(query, { slug });
    } catch (error) {
        console.error(`Error fetching project ${slug}:`, error);
        isError = true;
        // Check if it matches a fallback project
        project = fallbackProjects.find(p => p.slug.current === slug) || null;
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

                <div className="flex gap-4 pt-4">
                    {project.demoLink && (
                        <Button asChild className="rounded-full">
                            <Link href={project.demoLink} target="_blank"><ExternalLink className="mr-2 h-4 w-4" /> View Demo</Link>
                        </Button>
                    )}
                    {project.sourceLink && (
                        <Button variant="outline" asChild className="rounded-full">
                            <Link href={project.sourceLink} target="_blank"><Github className="mr-2 h-4 w-4" /> Source</Link>
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
