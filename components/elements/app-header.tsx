"use client";
import Image from "next/image";
import Link from "next/link";
import { ContactForm } from "@/components/elements/contact-form";
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const MENUS = [
    { title: "Home", link: "/" },
    { title: "Projects", link: "/projects" },
    { title: "About Me", link: "/about" },
    { title: "Links", link: "/links" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                isOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            if (isOpen) setIsOpen(false);
        };

        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("scroll", handleScroll);
        
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    return (
        <>
            <header className="fixed top-0 left-4 right-4 md:left-0 md:right-0 z-50 px-4 py-2 flex justify-between items-center bg-background/80 backdrop-blur-md max-w-screen-lg mx-auto mt-4 rounded-full border">
                <Link href="/" className="font-bold text-lg">
                    <Image src="/harshilLogo.svg" alt="Harshil Logo" width={45} height={45} className="w-12 h-12" />
                </Link>
                <nav className="hidden md:flex gap-1">
                    {MENUS.map(menu => (
                        <Link key={menu.link} href={menu.link} className="px-4 py-2 hover:bg-muted rounded-full">
                            {menu.title}
                        </Link>
                    ))}
                </nav>
                <div className="hidden md:block">
                    <ContactForm />
                </div>
                <Button ref={buttonRef} variant="ghost" size="icon" className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X /> : <Menu />}
                </Button>
            </header>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed top-20 left-4 right-4 z-40 p-4 bg-background/80 backdrop-blur-md border rounded-3xl md:hidden flex flex-col gap-2 shadow-lg max-w-screen-lg mx-auto"
                    >
                        {MENUS.map(menu => (
                            <Link 
                                key={menu.link} 
                                href={menu.link} 
                                onClick={() => setIsOpen(false)}
                                className="px-4 py-3 hover:bg-muted rounded-xl text-center font-medium"
                            >
                                {menu.title}
                            </Link>
                        ))}
                            <button 
                                className="w-full px-4 py-3 hover:bg-muted rounded-xl text-center font-medium"
                                onClick={() => {
                                    setIsOpen(false);
                                    setIsContactOpen(true);
                                }}
                            >
                                Contact Me
                            </button>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Hidden persistent contact form for mobile actions */}
            <ContactForm open={isContactOpen} onOpenChange={setIsContactOpen}>
                <span className="hidden" />
            </ContactForm>
        </>
    );
}
