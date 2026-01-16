"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Project } from "@/types/sanity";

export function ProjectCard({ project }: { project: Project }) {
    const { name, shortDesc, slug, role } = project;
    const href = slug?.current ? `/projects/${slug.current}` : "#";
    const Wrapper = ({ children }: any) => slug?.current ? <Link href={href} className="group relative block">{children}</Link> : <div>{children}</div>;
    return (
        <Wrapper>
            <div className={cn("min-h-72 w-full rounded-2xl border p-6 flex flex-col justify-end bg-card/50 hover:bg-muted/50 transition-colors duration-300")}>
                <div className="flex flex-col gap-4">
                    <h3 className="text-xl font-medium">{name}</h3>
                    <p className="text-muted-foreground">{shortDesc}</p>
                    <span className="text-xs font-mono uppercase font-bold text-primary">{role}</span>
                </div>
            </div>
        </Wrapper>
    );
}
