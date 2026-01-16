import { SocialLinks } from "./social-links";
export function Footer() {
    return (
        <footer className="py-12 px-6 text-center text-muted-foreground flex flex-col items-center gap-4">
            <SocialLinks />
            <p>&copy; 2026 Harshil. Built with Sanity & Next.js.</p>
        </footer>
    );
}
