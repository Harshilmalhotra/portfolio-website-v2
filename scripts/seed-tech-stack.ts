import { createClient } from "next-sanity";
import { loadEnvConfig } from "@next/env";
// import fetch from "node-fetch"; // Using native fetch in Node 18+

// Load environment variables
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error("Missing configuration. Please check your .env file for:");
    console.error(" - NEXT_PUBLIC_SANITY_PROJECT_ID");
    console.error(" - NEXT_PUBLIC_SANITY_DATASET");
    console.error(" - SANITY_API_TOKEN");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: "2024-01-01",
});

interface TechItem {
    name: string;
    category: "Frontend" | "Backend" | "Full Stack" | "Tools" | "DevOps" | "Languages" | "Other";
    iconSlug?: string; // Simple Icons slug
}

const techStack: TechItem[] = [
    // Languages
    { name: "C", category: "Languages", iconSlug: "c" },
    { name: "C++", category: "Languages", iconSlug: "cplusplus" },
    { name: "Python", category: "Languages", iconSlug: "python" },
    { name: "JavaScript", category: "Languages", iconSlug: "javascript" },

    // Core CS - Mapped to Other/Tools/Languages
    { name: "Data Structures & Algorithms", category: "Other" }, // No icon
    { name: "Object-Oriented Programming", category: "Other" }, // No icon
    { name: "Operating Systems", category: "Other" }, // No icon
    { name: "Linux", category: "Tools", iconSlug: "linux" },
    { name: "SQL", category: "Languages", iconSlug: "postgresql" }, // Using postgres as generic SQL rep if needed, or skip

    // Backend & Web
    { name: "Node.js", category: "Backend", iconSlug: "nodedotjs" },
    { name: "Express.js", category: "Backend", iconSlug: "express" },
    { name: "FastAPI", category: "Backend", iconSlug: "fastapi" },
    { name: "React.js", category: "Frontend", iconSlug: "react" },
    { name: "Next.js", category: "Full Stack", iconSlug: "nextdotjs" },
    { name: "Tailwind CSS", category: "Frontend", iconSlug: "tailwindcss" },

    // Databases
    { name: "PostgreSQL", category: "Backend", iconSlug: "postgresql" },
    { name: "MongoDB", category: "Backend", iconSlug: "mongodb" },
    { name: "Supabase", category: "Backend", iconSlug: "supabase" },

    // Cloud & DevOps
    { name: "Docker", category: "DevOps", iconSlug: "docker" },
    { name: "CI/CD", category: "DevOps" }, // Abstract
    { name: "GitHub Actions", category: "DevOps", iconSlug: "githubactions" },
    { name: "Kubernetes", category: "DevOps", iconSlug: "kubernetes" },
    { name: "AWS", category: "DevOps", iconSlug: "amazonwebservices" }, // For "AWS (EC2, S3, Lambda)"
    { name: "Azure", category: "DevOps", iconSlug: "microsoftazure" },

    // AI/ML
    { name: "TensorFlow", category: "Other", iconSlug: "tensorflow" },
    { name: "PyTorch", category: "Other", iconSlug: "pytorch" },
    { name: "Scikit-learn", category: "Other", iconSlug: "scikitlearn" },
    { name: "OpenCV", category: "Other", iconSlug: "opencv" },
    { name: "MediaPipe", category: "Other" }, // No simple icon found easily, maybe 'google'? Skip for now.
];

async function fetchIcon(slug: string): Promise<Buffer | null> {
    const url = `https://cdn.simpleicons.org/${slug}`;
    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.warn(`Failed to fetch icon for ${slug}: ${res.statusText}`);
            return null;
        }
        const arrayBuffer = await res.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } catch (error) {
        console.error(`Error fetching icon ${slug}:`, error);
        return null;
    }
}

async function uploadImage(buffer: Buffer, filename: string) {
    return client.assets.upload("image", buffer, {
        filename: `${filename}.svg`,
        contentType: "image/svg+xml",
    });
}

async function seed() {
    console.log(`Starting seed for ${techStack.length} items...`);

    for (const item of techStack) {
        console.log(`Processing ${item.name}...`);

        let imageAssetId = null;

        if (item.iconSlug) {
            const buffer = await fetchIcon(item.iconSlug);
            if (buffer) {
                const asset = await uploadImage(buffer, item.iconSlug);
                imageAssetId = asset._id;
                console.log(`  Uploaded icon for ${item.name}`);
            }
        }

        const doc = {
            _type: "techStack",
            _id: item.name.toLowerCase().replace(/[^a-z0-9]/g, "-"), // Generate a slug-like ID
            name: item.name,
            category: item.category,
            techImage: imageAssetId ? {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: imageAssetId,
                }
            } : undefined
        };

        await client.createOrReplace(doc);
        console.log(`  Created/Updated document for ${item.name}`);
    }

    console.log("Seeding complete!");
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
