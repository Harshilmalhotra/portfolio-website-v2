"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ContactForm } from "@/components/elements/contact-form";
import { useState, useEffect, useRef } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

const MENUS = [
    { title: "Home", link: "/" },
    { title: "Projects", link: "/projects" },
    { title: "Certifications", link: "/certifications" },
    { title: "About Me", link: "/about" },
    { title: "Links", link: "/links" },
];

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isContactOpen, setIsContactOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const pathname = usePathname();

    const triggerSearch = () => {
        const searchTrigger = document.getElementById("search-trigger");
        if (searchTrigger) {
            searchTrigger.click();
        }
    };

    const handleScrollToTop = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (pathname === href && href === "/") {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
            setIsOpen(false);
        }
    };

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
                <Link href="/" className="font-bold text-lg" onClick={(e) => handleScrollToTop(e, "/")}>
                    <Image src="/harshilLogo.svg" alt="Harshil Logo" width={45} height={45} className="w-12 h-12" />
                </Link>
                <nav className="hidden md:flex gap-1 items-center">
                    {MENUS.map(menu => (
                        <Link 
                            key={menu.link} 
                            href={menu.link} 
                            className="px-4 py-2 hover:bg-muted rounded-full"
                            onClick={(e) => handleScrollToTop(e, menu.link)}
                        >
                            {menu.title}
                        </Link>
                    ))}
                    <button
                        onClick={triggerSearch}
                        className="p-2 hover:bg-muted rounded-full ml-1"
                        aria-label="Search"
                    >
                        <Search className="w-5 h-5" />
                    </button>
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
                                onClick={(e) => {
                                    handleScrollToTop(e, menu.link);
                                    setIsOpen(false);
                                }}
                                className="px-4 py-3 hover:bg-muted rounded-xl text-center font-medium"
                            >
                                {menu.title}
                            </Link>
                        ))}
                            <button 
                                className="w-full px-4 py-3 hover:bg-muted rounded-xl text-center font-medium flex items-center justify-center gap-2"
                                onClick={() => {
                                    setIsOpen(false);
                                    triggerSearch();
                                }}
                            >
                                <Search className="w-4 h-4" />
                                Search
                            </button>
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
