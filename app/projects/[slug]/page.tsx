import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProjectPreviewCarousel } from "@/components/elements/project-preview-carousel";
import { projects } from "@/data/project";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

export async function generateStaticParams() {
    return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = projects.find((p) => p.slug === slug);

    if (!project) notFound();

    return (
        <article className="max-w-3xl mx-auto py-24 px-6 flex flex-col gap-8">
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

            {project.previews && <ProjectPreviewCarousel previews={project.previews} />}

            <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: project.content || project.description || "" }} />
            </div>
        </article>
    );
}
