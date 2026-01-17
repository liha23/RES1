import { MetadataRoute } from "next";
import { headers } from "next/headers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const h = await headers();
  const host = h.get("host") || "localhost:3000";
  const protocol = host.startsWith("localhost") ? "http" : "https";
  const BASE = `${protocol}://${host}`;

  // Static routes for GGSIPU Result page
  const staticPaths = ["/", "/result"];

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((p) => ({
    url: new URL(p, BASE).toString(),
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: p === "/" ? 1 : 0.9,
  }));

  return staticEntries;
}
