import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashiq0x.vercel.app"; // TODO: set real URL

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/#about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/#skills`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/#projects`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/#journey`, changeFrequency: "yearly", priority: 0.6 },
    { url: `${BASE}/#bounty`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/#contact`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
