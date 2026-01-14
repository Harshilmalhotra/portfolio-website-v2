import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { contactGithubLink, contactIgLink, contactLinkedIn } from "@/data/contact";
import { Button } from "../ui/button";

export function SocialLinks() {
    return (
        <div className="flex gap-2">
            <Button variant="ghost" target= "_blank" size="icon" asChild className="rounded-full"><Link href={contactGithubLink}><Github /></Link></Button>
            <Button variant="ghost"  target="_blank" size="icon" asChild className="rounded-full"><Link href={contactLinkedIn}><Linkedin /></Link></Button>
            <Button variant="ghost" target="_blank"  size="icon" asChild className="rounded-full"><Link href={contactIgLink}><Instagram /></Link></Button>
        </div>
    );
}
