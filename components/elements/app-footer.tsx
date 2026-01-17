import { SocialLinks } from "./social-links";
import { client } from "@/lib/sanity";
import { lastUpdatedQuery } from "@/lib/queries";
import Image from "next/image";


export async function Footer() {
    const showLastUpdated = process.env.NEXT_PUBLIC_SHOW_LAST_UPDATED === "true";
    let lastUpdated: string | null = null;

    if (showLastUpdated) {
        lastUpdated = await client.fetch(lastUpdatedQuery);
    }

    return (
        <footer className="py-12 px-6 text-center text-muted-foreground flex flex-col items-center gap-4">
            <SocialLinks />
            <div className="flex flex-col gap-1 items-center">
                <Image 
                    src="/harshilLogo.svg" 
                    alt="Harshil Logo" 
                    width={32} 
                    height={32} 
                    className="w-8 h-8 mb-2 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
                <p>&copy; 2026 Harshil. Built with Sanity & Next.js.</p>
                {showLastUpdated && lastUpdated && (
                    <p className="text-xs text-muted-foreground/60">
                        Last updated: {new Date(lastUpdated).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                        })} IST
                    </p>
                )}
            </div>
        </footer>
    );
}
