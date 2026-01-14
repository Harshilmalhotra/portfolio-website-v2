export function StatsSection() {
    const stats = [
        { label: "Years experience", number: "3+" },
        { label: "Projects delivered", number: "5+" },
        { label: "Satisfaction", number: "99%" },
    ];
    return (
        <div className="max-w-screen-lg w-full mx-auto py-8">
            <ul className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <li key={i} className="flex justify-center flex-col items-center">
                        <span className="text-5xl font-medium">{stat.number}</span>
                        <span className="text-lg">{stat.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}
