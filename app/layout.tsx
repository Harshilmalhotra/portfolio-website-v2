import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { groq } from "next-sanity";
import { Inter, JetBrains_Mono } from "next/font/google"; // already exists
import { client, urlFor } from "@/lib/sanity";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const query = groq`*[]`;

export async function generateMetadata(): Promise<Metadata> {
  const data = await client.fetch(query);
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
    "Harshil Malhotra",
    "Harshil",
    "Fullstack Developer",
    "Software Engineer",
    "Web Development",
    "Next.js",
    "React",
    "TypeScript",
    "Sanity",
    "Portfolio",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await client.fetch(query);
  const profile = data.find((d: any) => d._type === "profile") || {};
  
  // JSON-LD for Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name || "Harshil Malhotra",
    url: "https://harshilm.vercel.app",
    image: profile.heroImage ? urlFor(profile.heroImage).url() : "",
    sameAs: profile.socialLinks?.map((s: any) => s.url) || [],
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
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
