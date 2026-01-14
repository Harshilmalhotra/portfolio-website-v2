"use client";
import Link from "next/link";
import { ContactForm } from "@/components/elements/contact-form";

const MENUS = [
    { title: "Home", link: "/" },
    { title: "Projects", link: "/projects" },
    { title: "About Me", link: "/about" },
];

export function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-3 flex justify-between items-center bg-background/80 backdrop-blur-md max-w-screen-lg mx-auto mt-4 rounded-full border">
            <Link href="/" className="font-bold text-lg">Harshil</Link>
            <nav className="hidden md:flex gap-1">
                {MENUS.map(menu => (
                    <Link key={menu.link} href={menu.link} className="px-4 py-2 hover:bg-muted rounded-full">
                        {menu.title}
                    </Link>
                ))}
            </nav>
            <ContactForm />
        </header>
    );
}
