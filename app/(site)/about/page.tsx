import { AboutSection } from "@/components/sections/about-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { Metadata } from "next";
import { client } from "@/lib/sanity";
import { experienceQuery } from "@/lib/queries";
import { Experience } from "@/types/sanity";
import { fallbackExperience } from "@/lib/fallback-data";

export const metadata: Metadata = {
  title: "About",
  description: "Learn more about Harshil Malhotra and his experience.",
};

// Revalidate every 60 seconds
export const revalidate = 60;

import { sanityFetch } from "@/lib/sanity.server";

// ... existing imports

export default async function AboutPage() {
    const experiences = await sanityFetch<Experience[]>({ 
        query: experienceQuery, 
        fallback: fallbackExperience 
    }) || fallbackExperience;

    return (
        <div className="flex flex-col gap-12 pb-24">
            <AboutSection />
            <ExperienceSection experiences={experiences} />
        </div>
    );
}
