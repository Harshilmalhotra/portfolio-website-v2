"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Project } from "@/types/sanity";
import { ExternalLink, Github } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
    const { name, shortDesc, slug, role, technologies, demoLink, sourceLink } = project;
    const href = slug?.current ? `/projects/${slug.current}` : "#";
    const Wrapper = ({ children }: any) => slug?.current ? <Link href={href} className="group relative block h-full">{children}</Link> : <div className="h-full">{children}</div>;

    return (
        <Wrapper>
            <div className={cn("h-full w-full rounded-2xl border p-6 flex flex-col justify-between gap-6 bg-card/50 hover:bg-muted/50 transition-colors duration-300")}>
                <div className="space-y-4">
                    <div className="flex justify-between items-start">
                        <h3 className="text-xl font-medium group-hover:underline decoration-1 underline-offset-4">{name}</h3>
                        <div className="flex gap-2">
                            {demoLink && (
                                <Link
                                    href={demoLink}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-primary z-10"
                                    title="Try Project"
                                >
                                    <ExternalLink className="h-4 w-4" />
                                </Link>
                            )}
                            {sourceLink && (
                                <Link
                                    href={sourceLink}
                                    target="_blank"
                                    onClick={(e) => e.stopPropagation()}
                                    className="p-2 rounded-full hover:bg-background transition-colors text-muted-foreground hover:text-primary z-10"
                                    title="GitHub"
                                >
                                    <Github className="h-4 w-4" />
                                </Link>
                            )}
                        </div>
                    </div>
                    <p className="text-muted-foreground line-clamp-3">{shortDesc}</p>
                </div>

                <div className="space-y-4">
                    {technologies && technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {technologies.slice(0, 5).map((tech, i) => (
                                <div key={i} className="text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded">
                                    {tech.name}
                                </div>
                            ))}
                            {technologies.length > 5 && (
                                <span className="text-xs text-muted-foreground px-1 py-1">+{technologies.length - 5}</span>
                            )}
                        </div>
                    )}
                    <span className="text-xs font-mono uppercase font-bold text-primary block">{role}</span>
                </div>
            </div>
        </Wrapper>
    );
}
