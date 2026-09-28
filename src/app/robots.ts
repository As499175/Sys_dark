import type { MetadataRoute } from "next";

/* Static render — required so `output: "export"` (GitHub Pages) can build. */
export const dynamic = "force-static";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashiq0x.vercel.app"; // TODO: set real URL

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
