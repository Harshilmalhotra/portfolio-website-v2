import { NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { submitToIndexNow, submitToGoogleIndexing } from "@/lib/seo";
import { revalidatePath } from "next/cache";

const SECRET = process.env.SANITY_WEBHOOK_SECRET;

const DOMAINS = ["https://harshilmalhotra.dev", "https://harshil.is-a.dev"];

const GLOBAL_PATHS = [
    "/",
    "/about",
    "/dashboard",
    "/palette",
    "/projects",
    "/sitemap.xml",
    "/robots.txt",
];

export async function POST(req: NextRequest) {
    if (!SECRET) {
        console.error("Missing SANITY_WEBHOOK_SECRET");
        return NextResponse.json({ message: "Missing secret" }, { status: 500 });
    }

    // parseBody handles body parsing and signature validation
    const { isValidSignature, body } = await parseBody(req, SECRET);

    if (!isValidSignature) {
        return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
    }

    const documents = Array.isArray(body) ? body : [body];

    const affectedSlugs = new Set<string>();
    let operation: "create" | "update" | "delete" = "update";

    for (const doc of documents) {
        if (doc._type === "project" && doc.slug?.current) {
            affectedSlugs.add(doc.slug.current);
        }
        // Try to detect operation from the document if available
        if (doc.operation) {
            operation = doc.operation;
        }
    }

    // Generate URLs
    const urlsToSubmit = new Set<string>();

    for (const domain of DOMAINS) {
        // Global pages
        for (const path of GLOBAL_PATHS) {
            urlsToSubmit.add(`${domain}${path}`);
        }

        // Project pages
        for (const slug of affectedSlugs) {
            urlsToSubmit.add(`${domain}/projects/${slug}`);
        }
    }

    const uniqueUrls = Array.from(urlsToSubmit);
    const googleOperation = operation === "delete" ? "URL_DELETED" : "URL_UPDATED";

    console.log(`Processing ${operation} for slugs: ${Array.from(affectedSlugs).join(", ")}`);
    console.log(`Generated ${uniqueUrls.length} URLs for submission.`);

    // Execute in parallel
    // IndexNow
    const indexNowPromise = submitToIndexNow(uniqueUrls);

    // Google Indexing
    const googlePromise = submitToGoogleIndexing(uniqueUrls, googleOperation);

    // ISR Revalidation
    // We only revalidate paths on the current domain (which is where this code runs)
    // Revalidation is relative to the Next.js app
    const revalidationPromise = (async () => {
        try {
            revalidatePath("/");
            revalidatePath("/projects");
            revalidatePath("/sitemap.xml"); // sitemap usually dynamic but good to revalidate if static
            
            // Revalidate each project slug
            for (const slug of affectedSlugs) {
                revalidatePath(`/projects/${slug}`);
            }
            console.log("Revalidation triggered");
        } catch (e) {
            console.error("Revalidation failed:", e);
        }
    })();

    await Promise.allSettled([indexNowPromise, googlePromise, revalidationPromise]);

    return NextResponse.json({
        ok: true,
        operation,
        slugs: Array.from(affectedSlugs),
        urlsSubmitted: uniqueUrls.length,
    });
}
