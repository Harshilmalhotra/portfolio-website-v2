import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { Inter, JetBrains_Mono } from "next/font/google"; // already exists
import { client, urlFor } from "@/lib/sanity";
import { sanityFetch } from "@/lib/sanity.server";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const query = groq`*[]`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await sanityFetch<any[]>({ query, fallback: [] }) || [];
  const profile = data.find((d: any) => d._type === "profile") || {};
  const projects = data.filter((d: any) => d._type === "project") || [];
  const experience = data.filter((d: any) => d._type === "experience") || [];
  const techStack = data.filter((d: any) => d._type === "techStack") || [];

  const title = profile.name ? `${profile.name} | Portfolio` : "Harshil Malhotra | Portfolio";
  const description = profile.tagline || profile.shortDesc || "Fullstack Developer Portfolio";

  // Generate dynamic keywords
  const dynamicKeywords = [
    ...projects.map((p: any) => p.name),
    ...experience.map((e: any) => e.company),
    ...techStack.map((t: any) => t.name),
  ];

  const keywords = [
  // Identity & Name Variations
  "Harshil Malhotra",
  "Harshil",
  "Harshil M",
  "Harshil Malhotra Developer",
  "Harshil Malhotra Engineer",
  "Harshil Malhotra Portfolio",
  "Harshil Malhotra SRM",
  "Harshil Malhotra Chennai",
  "Harshil Malhotra India",
  "Harshil Malhotra Fullstack",
  "Harshil Malhotra Software Engineer",
  "Harshil Malhotra Web Developer",
  "Harshil Malhotra React Developer",
  "Harshil Malhotra Next.js Developer",

  // Education
  "SRM Institute of Science and Technology",
  "SRM University",
  "SRM Chennai",
  "SRM Kattankulathur",
  "BTech Computer Science",
  "B.Tech CSE",
  "Computer Science Engineering Student",
  "Engineering Student India",
  "Indian Computer Science Student",
  "Top Engineering Colleges India",

  // Roles & Titles
  "Fullstack Developer",
  "Software Engineer",
  "Web Developer",
  "Frontend Engineer",
  "Backend Engineer",
  "Product Engineer",
  "Technical Product Manager",
  "TPM Intern",
  "Developer Intern",
  "Software Engineering Intern",
  "SDE Intern",
  "AI Developer",
  "Cloud Developer",

  // Tech Stack – Frontend
  "React",
  "React.js",
  "Next.js",
  "Next.js App Router",
  "TypeScript",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "Shadcn UI",
  "Radix UI",
  "Framer Motion",
  "Responsive Web Design",
  "Modern Web UI",
  "Frontend Performance Optimization",
  "SEO Friendly Websites",

  // Tech Stack – Backend
  "Node.js",
  "Express.js",
  "REST APIs",
  "API Development",
  "Backend Systems",
  "Authentication Systems",
  "Authorization",
  "JWT Authentication",
  "Secure APIs",
  "Scalable Backend",
  "Distributed Systems",
  "Microservices",

  // Databases & Infra
  "MongoDB",
  "PostgreSQL",
  "MySQL",
  "Database Design",
  "Cloud Databases",
  "Serverless Architecture",
  "AWS",
  "Cloud Computing",
  "DevOps Basics",
  "CI/CD",
  "Deployment Pipelines",

  // CMS & Tools
  "Sanity CMS",
  "Headless CMS",
  "Content Management System",
  "Git",
  "GitHub",
  "Version Control",
  "Open Source Contributor",
  "GitHub Projects",
  "Developer Portfolio",

  // Product & TPM
  "Technical Product Management",
  "Product Thinking",
  "North Star Metrics",
  "Value Star Matrix",
  "Sprint Planning",
  "Release Notes",
  "Pre Production Signoff",
  "Product Roadmaps",
  "Stakeholder Management",
  "Agile Methodology",
  "Scrum",
  "Product Analytics",

  // Internship & Experience
  "Bajaj Finserv Health",
  "Bajaj Finserv Health Intern",
  "TPM at Bajaj Finserv",
  "Healthcare Tech",
  "Fintech Developer",
  "Product Engineering Intern",
  "Industry Experience",
  "Startup Experience",

  // Leadership & Clubs
  "Vice President Liftoff Club",
  "Liftoff Club SRM",
  "SaaS Product Development",
  "AI Product Development",
  "Student Leadership",
  "Tech Community Leader",
  "Joint Secretary NSCC SRM",
  "NSCC SRM",
  "College Tech Clubs",
  "Leadership Experience",

  // Projects & Work
  "Fullstack Projects",
  "Production Grade Systems",
  "Scalable Applications",
  "AI Powered Applications",
  "SaaS Platforms",
  "Web Apps",
  "Backend Systems Design",
  "Portfolio Projects",
  "Real World Projects",

  // Career & Goals
  "Aspiring Google Intern",
  "Google Software Engineering Internship",
  "SDE Intern India",
  "Software Engineer 2026",
  "Tech Career India",
  "High Impact Engineer",
  "Problem Solver",
  "System Design Enthusiast",

  // Portfolio & Branding
  "Developer Portfolio",
  "Personal Website",
  "Tech Portfolio",
  "Minimal Portfolio",
  "Modern Portfolio",
  "Animated Portfolio",
  "Next.js Portfolio",
  "Developer Branding",
  "Personal Brand",
  "Online Presence",

  // Skills & Concepts
  "Data Structures",
  "Algorithms",
  "DSA Beginner",
  "Problem Solving",
  "System Design Basics",
  "Clean Code",
  "Code Optimization",
  "Best Practices",
  "Software Architecture",
  "Engineering Excellence",

  // Location & Geography
  "Chennai Developer",
  "Indian Software Engineer",
  "India Tech Talent",
  "Asia Developers",
  "Remote Developer",
  "Global Software Engineer",

  // Contact & Professional
  "LinkedIn Developer",
  "GitHub Developer",
  "Open to Work",
  "Available for Internships",
  "Available for Full Time",
  "Tech Resume",
  "Developer CV",
  "Engineering Resume",

  // Extra SEO Boosters
  "Modern Web Technologies",
  "High Performance Websites",
  "Secure Web Applications",
  "Scalable SaaS",
  "Startup Ready Engineer",
  "Industry Ready Developer",
  "Future Software Engineer",
  "Passionate Developer",
  "Tech Enthusiast",
  "Builder Mindset",
  "Engineer with Product Sense",

  // Final fillers to cross 300+
  "React Native",
  "Expo",
  "Mobile App Development",
  "Cross Platform Apps",
  "API Security",
  "Web Security",
  "Cloud Native Apps",
  "AI Integration",
  "Automation Tools",
  "Email Services",
  "SMTP Systems",
  "Node.js Mailing Service",
  "Backend Automation",
  "Developer Tools",
  "Engineering Leadership",
  "Tech Blogging",
  "Learning in Public",
  "Continuous Learning",
    ...dynamicKeywords,
  ];

  const ogImage = profile.heroImage ? urlFor(profile.heroImage).width(1200).height(630).url() : "";
  const linkedIn = profile.socialLinks?.find((s: any) => s.platform?.toLowerCase().includes("linkedin"))?.url;
  const github = profile.socialLinks?.find((s: any) => s.platform?.toLowerCase().includes("github"))?.url;

  return {
    title: {
      default: "Harshil Malhotra | Portfolio",
      template: "Harshil Malhotra | Portfolio | %s",
    },
    description,
    keywords,
    authors: [{ name: profile.name || "Harshil Malhotra", url: linkedIn || github }],
    metadataBase: new URL("https://harshilm.vercel.app"),
    alternates: {
      canonical: "/",
      languages: {
        "en-US": "/",
      },
    },
    openGraph: {
      title,
      description,
      url: "https://harshilm.vercel.app",
      siteName: `${profile.name || "Harshil Malhotra"} Portfolio`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: profile.name || "Harshil Malhotra",
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
      creator: "@harshilmalhotra",
    },
    icons: {
      icon: "/harshilLogo.svg",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

import { SanityConnectionAlert } from "@/components/elements/sanity-connection-alert";

// ...

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await sanityFetch<any[]>({ query, fallback: null });
  const isError = data === null;
  const validData = data || [];
  
  const profile = validData.find((d: any) => d._type === "profile") || {};
  
  // JSON-LD for Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name || "Harshil Malhotra",
    url: "https://harshilm.vercel.app",
    image: profile.heroImage ? urlFor(profile.heroImage).url() : "",
    sameAs: [
      ...(profile.socialLinks?.map((s: any) => s.url) || []),
      "https://www.linkedin.com/in/harshil-malhotra", // Fallback/Explicit
      "https://github.com/Harshilmalhotra",
    ].filter((v, i, a) => a.indexOf(v) === i), // Unique values
    jobTitle: "Fullstack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Self-Employed",
    },
     description: profile.tagline || "Fullstack Developer",
  };

  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${mono.variable} font-sans antialiased`}>
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
          />
        <SanityConnectionAlert isError={isError} />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
