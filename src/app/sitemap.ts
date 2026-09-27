import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashiq0x.vercel.app"; // TODO: set real URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    ...projects.map((p) => ({
      url: `${BASE}/projects/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
