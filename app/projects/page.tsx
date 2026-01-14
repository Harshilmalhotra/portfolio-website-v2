import { ProjectCard } from "@/components/elements/project-card";
import { projects } from "@/data/project";

export default function ProjectsPage() {
    return (
        <div className="py-24 max-w-screen-lg mx-auto px-6">
            <h1 className="text-4xl font-medium mb-4">Projects</h1>
            <p className="text-lg text-muted-foreground mb-12">All apps, experiments, and open source work.</p>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {projects.map((project, i) => (
                    <li key={i}>
                        <ProjectCard project={project} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
