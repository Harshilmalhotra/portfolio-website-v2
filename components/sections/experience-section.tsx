"use client";
import { Building, MapPin } from "lucide-react";
import { dateToMMYYYY } from "@/lib/utils";
import { Timeline } from "../ui/timeline";
import { StarHeading } from "./star-heading";
import { Experience } from "@/types/sanity";

interface ExperienceSectionProps {
    experiences?: Experience[];
}

export function ExperienceSection({ experiences: sanityExperiences }: ExperienceSectionProps) {
    // Fallback or use passed data
    // Would be better to rename prop or local var to disambiguate from imported 'experiences' data if I was still importing it, 
    // but I removed the import.

    return (
        <section className="z-0 py-24" id="experiences">
            <div className="max-w-screen-lg w-full mx-auto space-y-8 px-6">
                <div className="space-y-6">
                    <div data-aos="fade-up">
                        <StarHeading title="My Work Experience" description="Experiences that I've had throughout my career." />
                    </div>
                    <Timeline>
                        {sanityExperiences?.map((ex, i) => (
                            <Timeline.Item key={ex._id || i}>
                                <Timeline.Heading className="flex flex-col gap-3">
                                    <div className="flex flex-col gap-2">
                                        <time className="text-sm font-light">{dateToMMYYYY(ex.startDate)} - {ex.stillWorking ? "Now" : ex.endDate ? dateToMMYYYY(ex.endDate as string) : "Present"}</time>
                                        <h3 className="text-xl md:text-2xl font-medium text-primary">{ex.position}</h3>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="text-sm flex items-center gap-2"><Building className="w-4 h-4" />{ex.company}</p>
                                    </div>
                                </Timeline.Heading>
                                <Timeline.Content>
                                    <p className="mb-4 text-base sm:text-lg">{ex.shortDesc}</p>
                                    {ex.tasks && <ul className="list-disc pl-4 text-sm text-muted-foreground">{ex.tasks.map(t => <li key={t}>{t}</li>)}</ul>}
                                </Timeline.Content>
                            </Timeline.Item>
                        ))}
                    </Timeline>
                </div>
            </div>
        </section>
    );
}
