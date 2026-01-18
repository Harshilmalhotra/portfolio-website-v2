import { client } from "@/lib/sanity";

export async function sanityFetch<T>({
  query,
  params = {},
  fallback = null, 
  tags = []
}: {
  query: string;
  params?: Record<string, any>;
  fallback?: T | null;
  tags?: string[];
}): Promise<T | null> {
  try {
    const data = await client.fetch<T>(query, params, {
      next: { tags },
    });
    return data;
  } catch (error) {
    console.error(`[SanityFetch] CAUGHT ERROR for query "${query.substring(0, 50)}...":`, error);
    return fallback;
  }
}
