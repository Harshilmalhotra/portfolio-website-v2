import { Stat } from "@/types/sanity";

interface StatsSectionProps {
    stats?: Stat[];
}

export function StatsSection({ stats }: StatsSectionProps) {
    const defaultStats = [
        { label: "Years experience", value: "3+" },
        { label: "Projects delivered", value: "5+" },
        { label: "Satisfaction", value: "99%" },
    ];

    const displayStats = stats && stats.length > 0 ? stats : defaultStats;

    return (
        <div className="max-w-screen-lg w-full mx-auto py-8">
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {displayStats.map((stat, i) => (
                    <li key={i} className="flex justify-center flex-col items-center">
                        <span className="text-5xl font-medium">{stat.value}</span>
                        <span className="text-lg">{stat.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
