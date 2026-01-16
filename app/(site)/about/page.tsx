import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-12 pb-24">
            <AboutSection />
            <ExperienceSection />
        </div>
    );
}
