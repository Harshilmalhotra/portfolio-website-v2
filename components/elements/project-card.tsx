"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Project } from "@/types/sanity";
import { ExternalLink, Github } from "lucide-react";
import { urlFor } from "@/lib/image";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function ProjectCard({ project }: { project: Project }) {
    const { name, shortDesc, slug, role, technologies, demoLink, sourceLink, coverImageUrl } = project;
    const href = slug?.current ? `/projects/${slug.current}` : "#";

    return (
        <div className="group relative h-full block">
            <div className={cn("h-full w-full rounded-2xl border p-4 flex flex-col gap-4 bg-card/50 hover:bg-muted/50 transition-colors duration-300 overflow-hidden")}>
                {/* Main Card Link - Stretched Overlay */}
                {slug?.current && (
                    <Link href={href} className="absolute inset-0 z-0" aria-label={`View project ${name}`}>
                        <span className="sr-only">View project {name}</span>
                    </Link>
                )}

                {/* Cover Image */}
                <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted z-0">
                    {coverImageUrl ? (
                        <Image
                            src={urlFor(coverImageUrl).width(600).height(400).url()}
                            alt={name}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-muted-foreground/20">
                            <Github className="w-12 h-12" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col justify-between flex-1 gap-4 z-10 pointer-events-none">
                    <div className="space-y-2 pointer-events-auto">
                        <div className="flex justify-between items-start gap-2">
                            <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4 line-clamp-1">{name}</h3>
                            <div className="flex gap-1 shrink-0 relative z-20">
                                {demoLink && (
                                    <Link
                                        href={demoLink}
                                        target="_blank"
                                        className="p-1.5 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-primary backdrop-blur-sm bg-background/20"
                                        title="Try Project"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                    </Link>
                                )}
                                {sourceLink && (
                                    <Link
                                        href={sourceLink}
                                        target="_blank"
                                        className="p-1.5 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-primary backdrop-blur-sm bg-background/20"
                                        title="GitHub"
                                    >
                                        <Github className="h-4 w-4" />
                                    </Link>
                                )}
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{shortDesc}</p>
                    </div>

                    <div className="flex items-center justify-between mt-auto pointer-events-auto">
                        {technologies && technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 relative z-20">
                                <TooltipProvider>
                                    {technologies.slice(0, 5).map((tech, i) => (
                                        <Tooltip key={i}>
                                            <TooltipTrigger asChild>
                                                <div className="relative w-6 h-6 rounded-md overflow-hidden bg-background/50 border flex items-center justify-center">
                                                    {tech.techImage ? (
                                                        <Image
                                                            src={urlFor(tech.techImage).width(24).height(24).url()}
                                                            alt={tech.name}
                                                            width={20}
                                                            height={20}
                                                            className="object-contain p-0.5"
                                                        />
                                                    ) : (
                                                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{tech.name.substring(0, 2)}</span>
                                                    )}
                                                </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{tech.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    ))}
                                    {technologies.length > 5 && (
                                        <span className="text-xs text-muted-foreground flex items-center justify-center h-6 w-6 bg-muted rounded-full">
                                            +{technologies.length - 5}
                                        </span>
                                    )}
                                </TooltipProvider>
                            </div>
                        )}
                        <span className="text-xs font-mono uppercase font-bold text-primary/80">{role}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
