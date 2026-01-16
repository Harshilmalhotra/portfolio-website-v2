import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ProjectPreviewCarousel } from "@/components/elements/project-preview-carousel";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { client } from "@/lib/sanity";
import { groq, PortableText, type PortableTextComponents } from "next-sanity";
import { Project } from "@/types/sanity";
import { urlFor } from "@/lib/image";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import vscDarkPlus from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
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

            {/* Cover Image */}
            {project.coverImageUrl && (
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted border">
                    <Image
                        src={urlFor(project.coverImageUrl).width(1200).height(800).url()}
                        alt={project.name}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}

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
                                        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-secondary/50 hover:bg-secondary transition-colors cursor-default border">
                                            {tech.techImage ? (
                                                <Image
                                                    src={urlFor(tech.techImage).width(24).height(24).url()}
                                                    alt={tech.name}
                                                    width={20}
                                                    height={20}
                                                    className="object-contain"
                                                />
                                            ) : (
                                                <span className="text-xs uppercase font-bold text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{tech.name.substring(0, 2)}</span>
                                            )}
                                            <span className="text-sm font-medium">{tech.name}</span>
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
                    <PortableText
                        value={project.content}
                        components={components}
                    />
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: project.description || "" }} />
                )}
            </div>
        </article>
    );
}

const components: PortableTextComponents = {
    types: {
        image: ({ value }: { value: any }) => {
            return (
                <div className="relative w-full aspect-video my-8 rounded-lg overflow-hidden bg-muted">
                    <Image
                        src={urlFor(value).url()}
                        fill
                        className="object-contain"
                        alt={value.alt || 'Project Image'}
                    />
                </div>
            )
        },
        code: ({ value }: { value: any }) => {
            return (
                <div className="my-8 rounded-lg overflow-hidden border border-border bg-[#1e1e1e]">
                    {value.filename && (
                        <div className="flex items-center justify-between px-4 py-2 bg-[#2d2d2d] border-b border-white/10">
                            <span className="text-xs text-muted-foreground font-mono">{value.filename}</span>
                            <span className="text-xs text-muted-foreground font-mono opacity-50">{value.language}</span>
                        </div>
                    )}
                    <SyntaxHighlighter
                        language={value.language || 'text'}
                        style={vscDarkPlus}
                        customStyle={{ margin: 0, padding: '1.5rem', background: 'transparent', fontSize: '14px', lineHeight: '1.5' }}
                        showLineNumbers={true}
                        wrapLines={true}
                    >
                        {value.code || ''}
                    </SyntaxHighlighter>
                </div>
            )
        }
    },
    block: {
        h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mt-12 mb-4 scroll-m-20">{children}</h1>,
        h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mt-10 mb-4 scroll-m-20 border-b pb-2">{children}</h2>,
        h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-bold mt-8 mb-3 scroll-m-20">{children}</h3>,
        normal: ({ children }: { children?: React.ReactNode }) => <p className="leading-7 [&:not(:first-child)]:mt-6 text-muted-foreground/90">{children}</p>,
        blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-primary pl-6 italic my-6 bg-muted/30 py-4 rounded-r-lg">{children}</blockquote>,
    },
    marks: {
        link: ({ children, value }: { children?: React.ReactNode, value?: any }) => {
            const rel = !value?.href?.startsWith('/') ? 'noreferrer noopener' : undefined;
            return (
                <a href={value?.href} target="_blank" rel={rel} className="font-medium text-primary underline underline-offset-4 decoration-primary/50 hover:decoration-primary transition-colors">
                    {children}
                </a>
            )
        },
        code: ({ children }: { children?: React.ReactNode }) => <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">{children}</code>,
    },
    list: {
        bullet: ({ children }: { children?: React.ReactNode }) => <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>,
        number: ({ children }: { children?: React.ReactNode }) => <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>,
    },
}
