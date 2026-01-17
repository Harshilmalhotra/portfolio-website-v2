import { createClient } from "next-sanity";
import nextEnv from "@next/env";
import fs from "fs";
import path from "path";

const { loadEnvConfig } = nextEnv;

// Load environment variables
loadEnvConfig(process.cwd());

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
    console.error("Missing configuration. Please check your .env file.");
    process.exit(1);
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: "2024-01-01",
});

const categories = [
    { title: "Other Tools", order: 0 },
    { title: "Languages", order: 1 },
    { title: "Databases", order: 2 },
    { title: "Backend and Web", order: 3 },
    { title: "Cloud and Dev Ops", order: 4 },
    { title: "Core CS", order: 5 },
];

interface TechItem {
    name: string;
    categoryTitle: string;
    iconSlug?: string; // Filename without extension
}

// Slugs match public/icons/[slug].svg or .png
const techStack: TechItem[] = [
    // Languages
    { name: "C", categoryTitle: "Languages", iconSlug: "c" },
    { name: "C++", categoryTitle: "Languages", iconSlug: "cplusplus" },
    { name: "Python", categoryTitle: "Languages", iconSlug: "python" },
    { name: "JavaScript", categoryTitle: "Languages", iconSlug: "javascript" }, // or 'js'
    { name: "TypeScript", categoryTitle: "Languages", iconSlug: "typescript" }, // We'll see if 'typescript.svg' exists, otherwise fetch

    // Core CS
    { name: "Data Structures & Algorithms", categoryTitle: "Core CS" },
    { name: "Object-Oriented Programming", categoryTitle: "Core CS" },
    { name: "Operating Systems", categoryTitle: "Core CS" },
    
    // Databases
    { name: "PostgreSQL", categoryTitle: "Databases", iconSlug: "postgresql" },
    { name: "MongoDB", categoryTitle: "Databases", iconSlug: "mongodb" },
    { name: "Supabase", categoryTitle: "Databases", iconSlug: "supabase" },
    { name: "MySQL", categoryTitle: "Databases", iconSlug: "mysql" },
    { name: "Redis", categoryTitle: "Databases", iconSlug: "redis" },
    { name: "Oracle", categoryTitle: "Databases", iconSlug: "oracle" },

    // Backend & Web
    { name: "Node.js", categoryTitle: "Backend and Web", iconSlug: "nodejs" },
    { name: "Express.js", categoryTitle: "Backend and Web", iconSlug: "express" },
    { name: "FastAPI", categoryTitle: "Backend and Web", iconSlug: "fastapi" },
    { name: "React.js", categoryTitle: "Backend and Web", iconSlug: "react" },
    { name: "Next.js", categoryTitle: "Backend and Web", iconSlug: "nextjs" },
    { name: "Tailwind CSS", categoryTitle: "Backend and Web", iconSlug: "tailwind" },
    // HTML5, CSS3 not in local list, remove iconSlug or keep to fetch if fallback
    { name: "HTML5", categoryTitle: "Backend and Web", iconSlug: "html5" }, 
    { name: "CSS3", categoryTitle: "Backend and Web", iconSlug: "css" }, // 'css' verified via curl

    // Cloud & Dev Ops
    { name: "Docker", categoryTitle: "Cloud and Dev Ops", iconSlug: "docker" },
    { name: "GitHub Actions", categoryTitle: "Cloud and Dev Ops", iconSlug: "githubactions" },
    { name: "Kubernetes", categoryTitle: "Cloud and Dev Ops", iconSlug: "kubernetes" },
    { name: "AWS", categoryTitle: "Cloud and Dev Ops", iconSlug: "aws" }, // Mapped to aws.svg
    { name: "Azure", categoryTitle: "Cloud and Dev Ops", iconSlug: "azure" }, // Mapped to azure.svg
    { name: "Git", categoryTitle: "Cloud and Dev Ops", iconSlug: "git" },
    { name: "Terraform", categoryTitle: "Cloud and Dev Ops", iconSlug: "terraform" },

    // Other Tools
    { name: "Linux", categoryTitle: "Other Tools", iconSlug: "linux" },
    { name: "VS Code", categoryTitle: "Other Tools", iconSlug: "visualstudiocode" }, // Not in local, keep for fetch?
    { name: "Postman", categoryTitle: "Other Tools", iconSlug: "postman" },
    { name: "OpenCV", categoryTitle: "Other Tools", iconSlug: "opencv" },
    { name: "PyTorch", categoryTitle: "Other Tools", iconSlug: "pytorch" },
    { name: "TensorFlow", categoryTitle: "Other Tools", iconSlug: "tensorflow" },
    { name: "Scikit-learn", categoryTitle: "Other Tools", iconSlug: "scikitlearn" },
];

async function getIconBuffer(slug: string): Promise<{ buffer: Buffer; ext: string } | null> {
    // 1. Try local file
    const extensions = ["svg", "png"];
    for (const ext of extensions) {
        const localPath = path.join(process.cwd(), "public", "icons", `${slug}.${ext}`);
        if (fs.existsSync(localPath)) {
            console.log(`  Found local icon: ${localPath}`);
            return {
                buffer: fs.readFileSync(localPath),
                ext,
            };
        }
    }

    // 2. Fallback to Simple Icons CDN
    console.log(`  Local icon not found for ${slug}, trying Simple Icons CDN...`);
    const url = `https://cdn.simpleicons.org/${slug}`;
    try {
        const res = await fetch(url);
        if (res.ok) {
            const arrayBuffer = await res.arrayBuffer();
            return {
                buffer: Buffer.from(arrayBuffer),
                ext: "svg", // Simple Icons serves SVGs
            };
        }
    } catch (e) {
        console.warn(`  Failed to fetch from CDN: ${encodeURIComponent(url)}`);
    }

    return null;
}

async function uploadImage(buffer: Buffer, filename: string, ext: string) {
    const contentType = ext === "svg" ? "image/svg+xml" : `image/${ext}`;
    return client.assets.upload("image", buffer, {
        filename: `${filename}.${ext}`,
        contentType,
    });
}

async function seed() {
    console.log("Starting full re-seed...");

    // 1. Seed Categories
    console.log("--- Seeding Categories ---");
    const categoryMap = new Map<string, string>();

    for (const cat of categories) {
        const doc = {
            _type: "techCategory",
            _id: `category-${cat.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}`,
            title: cat.title,
            order: cat.order,
        };
        const created = await client.createOrReplace(doc);
        categoryMap.set(cat.title, created._id);
        console.log(`Updated category: ${cat.title}`);
    }

    // 2. Seed Tech Stack
    console.log("\n--- Seeding Tech Stack ---");
    for (const item of techStack) {
        console.log(`Processing ${item.name}...`);

        const categoryId = categoryMap.get(item.categoryTitle);
        if (!categoryId) {
            console.error(`  Category not found for ${item.name}: ${item.categoryTitle}`);
            continue;
        }

        let imageAssetId = null;
        if (item.iconSlug) {
            const result = await getIconBuffer(item.iconSlug);
            if (result) {
                const asset = await uploadImage(result.buffer, item.iconSlug, result.ext);
                imageAssetId = asset._id;
            } else {
                console.warn(`  No icon found for ${item.name} (slug: ${item.iconSlug})`);
            }
        }

        const doc = {
            _type: "techStack",
            _id: item.name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
            name: item.name,
            // category: item.categoryTitle, // Deprecated
            categoryRef: {
                _type: "reference",
                _ref: categoryId,
            },
            techImage: imageAssetId ? {
                _type: "image",
                asset: {
                    _type: "reference",
                    _ref: imageAssetId,
                }
            } : undefined
        };

        await client.createOrReplace(doc);
        console.log(`  Created/Updated: ${item.name}`);
    }

    console.log("\nSeeding complete!");
}

seed().catch((err) => {
    console.error("Seeding failed:", err);
    process.exit(1);
});
