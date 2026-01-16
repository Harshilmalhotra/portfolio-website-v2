import { Header } from "@/components/elements/app-header";
import { Footer } from "@/components/elements/app-footer";
import { Toaster } from "sonner";
import { AOSProvider } from "@/components/providers/aos-provider";

export default function SiteLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <AOSProvider />
            <Header />
            <main className="min-h-screen">
                {children}
            </main>
            <Footer />
            <Toaster />
        </>
    );
}
