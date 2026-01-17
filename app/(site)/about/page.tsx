import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";

import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Harshil Malhotra and his experience.",
};

export default function AboutPage() {
    return (
        <div className="flex flex-col gap-12 pb-24">
            <AboutSection />
            <ExperienceSection />
        </div>
    );
}
