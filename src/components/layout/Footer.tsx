"use client";

import { ArrowUp, Mail } from "lucide-react";
import { profile } from "@/data/profile";

/* Inline brand marks (lucide dropped brand glyphs). */
function BrandMark({ path, className }: { path: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d={path} />
    </svg>
  );
}
const GH_PATH =
  "M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.24 3.34.95.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14 0 1.55-.01 2.79-.01 3.17 0 .31.21.68.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z";
const LI_PATH =
  "M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z";
const X_PATH =
  "M18.9 1.15h3.68l-8.05 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative mt-24 border-t border-white/5 px-5 pb-10 pt-16 sm:px-8">
      <div className="mx-auto max-w-7xl">
        {/* big outlined wordmark that fills on hover */}
        <a
          href="#home"
          aria-label="Back to top"
          className="wordmark block select-none text-center font-display text-[clamp(1.8rem,7vw,5.5rem)] font-black leading-none tracking-[-0.03em]"
        >
          ASHIQUR RAHMAN BHUIYAN
        </a>

        <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* socials */}
          <ul className="flex items-center gap-3" aria-label="Social links">
            {[
              { href: profile.links.github, label: "GitHub — @ashiq0x", path: GH_PATH },
              { href: profile.links.linkedin, label: "LinkedIn — Md. Ashiqur Rahman", path: LI_PATH },
              { href: profile.links.x, label: "X — @ashiq0x", path: X_PATH },
            ].map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center border border-white/10 bg-ink text-muted transition-all hover:border-cyan/50 hover:text-cyan hover:shadow-glow-cyan"
                >
                  <BrandMark path={s.path} className="h-4 w-4" />
                </a>
              </li>
            ))}
            <li>
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                title="Email"
                className="grid h-9 w-9 place-items-center border border-white/10 bg-ink text-muted transition-all hover:border-magenta/50 hover:text-magenta hover:shadow-glow-magenta"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </li>
          </ul>

          <p className="text-center font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted">
            © {year} · Built with Next.js, Motion &amp; Three.js · Designed in the dark
          </p>

          {/* back-to-top HUD button */}
          <a
            href="#home"
            aria-label="Back to top"
            className="hud-frame group relative inline-flex items-center gap-2 border border-white/10 bg-ink px-4 py-2 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-muted transition-colors hover:border-cyan/60 hover:text-cyan"
          >
            <ArrowUp className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" aria-hidden="true" />
            TOP
          </a>
        </div>
      </div>
    </footer>
  );
}
