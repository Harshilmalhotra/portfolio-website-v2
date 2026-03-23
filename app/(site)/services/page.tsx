import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Services offered by Harshil Malhotra including Web Development and App Development.",
};

export default function ServicesPage() {
    return (
        <div className="py-24 max-w-screen-lg mx-auto px-6 mt-16">
            <h1 className="text-4xl font-medium mb-4">Services</h1>
            <p className="text-lg text-muted-foreground mb-12">Here are some of the services I offer. Feel free to reach out for inquiries.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 border rounded-2xl bg-card hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">Web Development</h2>
                    <p className="text-muted-foreground">
                        Custom websites and web applications built with modern technologies like React, Next.js, and Node.js. Focus on performance, accessibility, and user experience.
                    </p>
                </div>
                <div className="p-8 border rounded-2xl bg-card hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">App Development</h2>
                    <p className="text-muted-foreground">
                        Cross-platform mobile applications for iOS and Android using Flutter or React Native, delivering native-like performance and beautiful interfaces.
                    </p>
                </div>
                <div className="p-8 border rounded-2xl bg-card hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">UI/UX Design</h2>
                    <p className="text-muted-foreground">
                        User-centered design solutions tailored for web and mobile products, ensuring engaging, intuitive, and visually appealing experiences.
                    </p>
                </div>
                <div className="p-8 border rounded-2xl bg-card hover:border-primary/50 transition-colors shadow-sm">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                        <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-semibold mb-3">Consulting</h2>
                    <p className="text-muted-foreground">
                        Technical consultation on software architecture, best practices, technology stack choices, and strategy for digital product development.
                    </p>
                </div>
            </div>
        </div>
    );
}
