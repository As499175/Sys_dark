import type { NextConfig } from "next";

/**
 * Dual-mode config (Windows/Linux/macOS — no shell scripts needed):
 *
 *  • Default (Vercel / `npm run dev` / `npm start`): full Next.js server,
 *    including the /api/contact route handler.
 *
 *  • Static export (GitHub Pages / Netlify free tier):
 *      NEXT_OUTPUT=export npm run build
 *    emits an `out/` folder of pure static files. The contact form detects
 *    the missing API and falls back to a mailto: link automatically.
 *    Set NEXT_BASE_PATH=/<repo-name> when publishing to a project site
 *    (not needed for <user>.github.io root sites).
 */
const isExport = process.env.NEXT_OUTPUT === "export";
const basePath = process.env.NEXT_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* Dynamic params off → lets `output: "export"` use generateStaticParams paths. */
  dynamicParams: false,
  /* The client reads these to decide: use the /api/contact route handler,
     or fall back to a mailto: link (static export has no server). */
  env: {
    NEXT_PUBLIC_HAS_API: isExport ? "" : "1",
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  ...(isExport ? { output: "export" as const } : {}),
  ...(basePath ? { basePath, assetPrefix: `${basePath}/`, images: { unoptimized: true } } : {}),
};

export default nextConfig;
