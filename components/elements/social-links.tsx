import { Github, Instagram, Linkedin } from "lucide-react";
import Link from "next/link";
import { contactGithubLink, contactIgLink, contactLinkedIn } from "@/data/contact";
import { Button } from "../ui/button";

export function SocialLinks() {
  return (
    <div className="flex gap-2">
      <Button variant="ghost" size="icon" asChild className="rounded-full">
        <Link href={contactGithubLink} target="_blank" rel="noopener noreferrer">
          <Github />
        </Link>
      </Button>

      <Button variant="ghost" size="icon" asChild className="rounded-full">
        <Link href={contactLinkedIn} target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </Link>
      </Button>

      <Button variant="ghost" size="icon" asChild className="rounded-full">
        <Link href={contactIgLink} target="_blank" rel="noopener noreferrer">
          <Instagram />
        </Link>
      </Button>
    </div>
  );
}
