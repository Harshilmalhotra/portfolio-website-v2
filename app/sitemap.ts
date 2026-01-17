import { MetadataRoute } from "next";
import { groq } from "next-sanity";
import { client } from "@/lib/sanity";

const query = groq`*[]`;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await client.fetch(query);
  const projects = data.filter((d: any) => d._type === "project") || [];

  // Static routes
  const routes = ["", "/about", "/projects", "/dashboard", "/palette"].map(
    (route) => ({
      url: `https://harshilm.vercel.app${route}`,
      lastModified: new Date().toISOString().split("T")[0],
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.8,
    })
  );

  // Dynamic routes (Projects)
  const projectRoutes = projects.map((project: any) => ({
    url: `https://harshilm.vercel.app/projects/${project.slug.current}`,
    lastModified: project._updatedAt.split("T")[0],
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...routes, ...projectRoutes];
}
