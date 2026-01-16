import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarHeading } from "./star-heading";
import { StatsSection } from "./stats-section";
import { Download } from "lucide-react";

export function AboutSection() {
    return (
        <section className="py-24" id="about">
            <div className="max-w-screen-lg w-full mx-auto px-6">
                <StarHeading title="About me" className="mb-8" />
                <div className="flex flex-col gap-16">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="flex flex-col gap-8">
                            <h3 className="text-4xl">Hi, I'm Harshil Malhotra</h3>
                            <Button asChild className="w-fit rounded-full">
                                <Link
                                    href="https://drive.google.com/file/d/13aGt6YEz7HTIpjVivP7sAbLaIk0m06hS/view"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Download className="mr-2" /> Download CV
                                </Link>
                            </Button>
                        </div>
                        <div className="text-xl leading-loose text-muted-foreground">
                            <p>
                                I Build production-grade web and backend systems with strong foundations in distributed systems, cloud, and security.
                                I specialize in AI-powered applications, real-time pipelines, and scalable APIs that run reliably at scale.
                            </p>
                        </div>
                    </div>
                    <StatsSection />
                </div>
            </div>
        </section>
    );
}
