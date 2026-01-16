import { TechStack } from "@/types/sanity";
import { StarHeading } from "./star-heading";
import Image from "next/image";
import { urlFor } from "@/lib/sanity";

interface TechSectionProps {
    techStack?: TechStack[];
}

export function TechSection({ techStack }: TechSectionProps) {
    // Helper to group tech stack by category
    const groupedStack = techStack?.reduce((acc, item) => {
        const category = item.category || "Other";
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(item);
        return acc;
    }, {} as Record<string, TechStack[]>) || {};

    const categories = Object.keys(groupedStack);

    // Fallback data
    const defaultTechStacks = [
        { id: "frontend", title: "Frontend", items: [{ name: "Next.js" }, { name: "React" }, { name: "Tailwind" }] },
        { id: "backend", title: "Backend", items: [{ name: "Node.js" }, { name: "PostgreSQL" }] },
    ];

    const getIconSrc = (tech: TechStack | { name: string }) => {
        // 1. Check if Sanity image exists (only for TechStack type)
        if ('techImage' in tech && tech.techImage) {
            return urlFor(tech.techImage).url();
        }

        // 2. Check local map for known tech
        const nameLower = tech.name.toLowerCase().replace(/\./g, "").replace(/\s/g, "");
        const localMap: Record<string, string> = {
            "react": "/icons/react.svg",
            "nextjs": "/icons/nextjs.svg",
            "tailwind": "/icons/tailwind.svg",
            "nodejs": "/icons/nodejs.svg",
            "postgresql": "/icons/postgresql.svg",
        };

        if (localMap[nameLower]) {
            return localMap[nameLower];
        }

        // 3. No icon (component handles null/undefined)
        return null;
    };


    return (
        <section className="py-24" id="tech">
            <div className="max-w-screen-lg w-full mx-auto">
                <StarHeading title="My Tech Stack" className="mb-12" />
                <div className="flex flex-col gap-16">
                    {categories.length > 0 ? (
                        categories.map(category => (
                            <div key={category} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <h3 className="text-3xl font-medium">{category}</h3>
                                <ul className="md:col-span-3 flex flex-wrap gap-4">
                                    {groupedStack[category].map(item => {
                                        const iconSrc = getIconSrc(item);
                                        return (
                                            <li key={item._id} className="px-4 py-2 border rounded-full hover:bg-muted transition-colors flex items-center gap-2">
                                                {iconSrc && (
                                                    <Image
                                                        src={iconSrc}
                                                        alt={item.name}
                                                        width={20}
                                                        height={20}
                                                        className="object-contain"
                                                    />
                                                )}
                                                {item.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))
                    ) : (
                        defaultTechStacks.map(stack => (
                            <div key={stack.id} className="grid grid-cols-1 md:grid-cols-4 gap-8">
                                <h3 className="text-3xl font-medium">{stack.title}</h3>
                                <ul className="md:col-span-3 flex flex-wrap gap-4">
                                    {stack.items.map(item => {
                                        const iconSrc = getIconSrc(item);
                                        return (
                                            <li key={item.name} className="px-4 py-2 border rounded-full hover:bg-muted transition-colors flex items-center gap-2">
                                                {iconSrc && (
                                                    <Image
                                                        src={iconSrc}
                                                        alt={item.name}
                                                        width={20}
                                                        height={20}
                                                        className="object-contain"
                                                    />
                                                )}
                                                {item.name}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
}
