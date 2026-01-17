import { client, urlFor } from "@/lib/sanity";
import { usefulLinksQuery } from "@/lib/queries";
import { UsefulLink } from "@/types/sanity";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

// Revalidate every 60 seconds
export const revalidate = 60;

// Helper to determine text color based on background color class
const getTextColorClass = (bgClass: string) => {
  if (bgClass.includes("foreground")) return "text-background"; // e.g., bg-primary-foreground -> text-background (usually)
  if (bgClass.includes("primary")) return "text-primary-foreground";
  if (bgClass.includes("muted")) return "text-muted-foreground"; // Actually bg-muted usually pairs with text-foreground or text-muted-foreground? Muted bg is light gray, text is dark. 
  // Let's refine based on standard shadcn/tailwind conventions or the palette page.
  // The palette page doesn't explicitly map bg to text, but standard conventions:
  
  switch (bgClass) {
    case "bg-background": return "text-foreground border border-border";
    case "bg-foreground": return "text-background";
    case "bg-primary": return "text-primary-foreground";
    case "bg-primary-foreground": return "text-primary";
    case "bg-muted": return "text-foreground"; 
    case "bg-muted-foreground": return "text-muted";
    case "bg-accent": return "text-accent-foreground";
    case "bg-accent-foreground": return "text-accent"; 
    case "bg-border": return "text-foreground";
    default: return "text-foreground border border-border";
  }
};

export default async function LinksPage() {
  const links = await client.fetch<UsefulLink[]>(usefulLinksQuery).catch((err) => {
    console.error("Error fetching useful links:", err);
    return [];
  });

  return (
    <div className="container mx-auto max-w-md py-24 px-6 min-h-[80vh]">
      <div className="flex flex-col items-center mb-12 space-y-4">
        <div className="rounded-full bg-muted p-4 mb-2">
            <ExternalLink className="w-8 h-8 text-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-center">Links</h1>
        <p className="text-muted-foreground text-center">
            Connect with me on social media or view my resume.
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {links.length > 0 ? (
          links.map((link) => {
            const textColorClass = getTextColorClass(link.color || "bg-muted");
            
            return (
              <Link
                key={link._id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group relative flex items-center p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm hover:shadow-md",
                  link.color || "bg-muted",
                  textColorClass
                )}
              >
                <div className="flex items-center justify-center w-10 h-10 mr-4 shrink-0">
                    {link.icon ? (
                         <div className="relative w-full h-full">
                            <Image 
                                src={urlFor(link.icon).url()} 
                                alt={link.name}
                                fill
                                className="object-contain"
                            />
                         </div>
                    ) : (
                        <ExternalLink className="w-6 h-6 opacity-70" />
                    )}
                </div>
                
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{link.label || link.name}</h2>
                </div>
                
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="w-5 h-5" />
                </div>
              </Link>
            );
          })
        ) : (
            <div className="text-center py-12 text-muted-foreground">
                <p>No links found.</p>
            </div>
        )}
      </div>
    </div>
  );
}
