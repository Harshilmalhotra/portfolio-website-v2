import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity";

const query = groq`*[_type == "project" && defined(slug.current)] {
  "slug": slug.current,
  _updatedAt
}`;

import { sanityFetch } from "@/lib/sanity.server";

// ...

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const projects = await sanityFetch<any[]>({ query, fallback: [] }) || [];

  const routes = ["", "/about", "/projects", "/dashboard", "/palette"].map(
    (route) => ({
      url: `https://harshilmalhotra.dev${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  const projectRoutes = projects.map((project: any) => ({
    url: `https://harshilmalhotra.dev/projects/${project.slug}`,
    lastModified: project._updatedAt.split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
