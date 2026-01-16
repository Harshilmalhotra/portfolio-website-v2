import { createClient } from "next-sanity";
import { loadEnvConfig } from "@next/env";

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

async function migrate() {
    console.log("Fetching projects...");
    const projects = await client.fetch(`*[_type == "project"]`);

    // Fetch all tech stack items to map names/IDs
    const techStack = await client.fetch(`*[_type == "techStack"]{_id, name}`);
    const techMap = new Map(techStack.map((t: any) => [t.name.toLowerCase(), t._id]));

    for (const project of projects) {
        // Check if technologies is an array of strings
        if (Array.isArray(project.technologies) && typeof project.technologies[0] === 'string') {
            console.log(`Migrating project: ${project.name}`);

            const newTechnologies = [];
            for (const techName of project.technologies) {
                // Try to find matching tech stack item
                let techId = techMap.get(techName.toLowerCase());

                // Special handling for common mismatches if needed
                if (!techId) {
                    // Try exact match if case differs mysteriously
                    const found = techStack.find((t: any) => t.name === techName);
                    if (found) techId = found._id;
                }

                if (techId) {
                    newTechnologies.push({
                        _type: 'reference',
                        _key: `${techId}-${Date.now()}`, // unique key
                        _ref: techId
                    });
                } else {
                    console.warn(`  Warning: No Tech Stack item found for "${techName}" in "${project.name}". Skipped.`);
                }
            }

            if (newTechnologies.length > 0) {
                await client.patch(project._id)
                    .set({ technologies: newTechnologies })
                    .commit();
                console.log(`  Updated ${project.name} with ${newTechnologies.length} references.`);
            } else {
                console.log(`  Unset technologies for ${project.name} (none matched).`);
                await client.patch(project._id)
                    .unset(['technologies'])
                    .commit();
            }
        } else {
            console.log(`Skipping ${project.name} (already migrated or empty).`);
        }
    }
    console.log("Migration complete.");
}

migrate().catch(err => {
    console.error("Migration failed:", err);
    process.exit(1);
});
