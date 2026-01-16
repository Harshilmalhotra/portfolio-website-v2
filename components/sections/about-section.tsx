import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarHeading } from "./star-heading";
import { StatsSection } from "./stats-section";
import { Download } from "lucide-react";
import { Profile, Stat } from "@/types/sanity";
import { PortableText } from "next-sanity";

interface AboutSectionProps {
    profile?: Profile;
    stats?: Stat[];
}

export function AboutSection({ profile, stats }: AboutSectionProps) {
    return (
        <section className="py-24" id="about">
            <div className="max-w-screen-lg w-full mx-auto">
                <StarHeading title="About me" className="mb-8" />
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col gap-8">
                            <h3 className="text-4xl">Hi, I'm {profile?.name || "Harshil Malhotra"}</h3>
                            <Button asChild className="w-fit rounded-full">
                                <Link href="/resume.pdf" download><Download className="mr-2" /> Download CV</Link>
                            </Button>
                        </div>
                        <div className="text-xl leading-loose text-muted-foreground">
                            {profile?.about ? (
                                <PortableText value={profile.about} />
                            ) : (
                                <p>
                                    I Build production-grade web and backend systems with strong foundations in distributed systems, cloud, and security.
                                    I specialize in AI-powered applications, real-time pipelines, and scalable APIs that run reliably at scale.
                                </p>
                            )}
                        </div>
                    </div>
                    <StatsSection stats={stats} />
                </div>
            </div>
        </section>
    );
}
