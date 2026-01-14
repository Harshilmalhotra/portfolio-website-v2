import { cn } from "@/lib/utils";
import { IconClover } from "@/components/ui/icon-clover";
export function StarHeading({ title, description, className }: { title: string, description?: string, className?: string }) {
    return (
        <header className={cn("flex flex-col gap-4", className)}>
            <h2 className={cn("font-medium text-xl sm:text-2xl inline-flex items-center gap-4")}>
                <IconClover size={28} className="animate-spin [animation-duration:5000ms]" />
                {title}
            </h2>
            {description && <p className="text-base sm:text-lg">{description}</p>}
        </header>
    );
}
