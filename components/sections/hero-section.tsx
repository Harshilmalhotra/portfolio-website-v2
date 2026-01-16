"use client";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconClover } from "@/components/ui/icon-clover";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
export function HeroSection() {
    return (
        <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden">
            <div className="max-w-screen-lg w-full px-6 flex flex-col md:flex-row items-center gap-12 z-10">
                <div className="flex-1 flex flex-col gap-6 text-center md:text-left">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border bg-muted/50 mb-4">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-xs font-medium">Available for work</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
                            Harshil Malhotra
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground font-light mb-8">
                            Fullstack Developer building digital experiences.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Button asChild size="lg" className="rounded-full text-lg h-12 px-8">
                                <Link href="/projects">
                                    View Projects <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full text-lg h-12 px-8">
                                <Link href="#about">
                                    More About Me
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <div className="flex-1 flex justify-center md:justify-end">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl rounded-full" />
                        <div className="relative bg-background border rounded-2xl p-8 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                            <IconClover className="w-48 h-48 md:w-64 md:h-64 text-primary animate-spin-[10s]" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Background decorations */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10" />
        </section>
    );
}
