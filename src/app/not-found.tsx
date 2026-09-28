import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "404 — Signal Lost" };

/* "404 // SIGNAL LOST" — anime error screen with CSS glitch text. */
export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden bg-void px-6 text-center">
      {/* faint grid backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,240,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,240,255,.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <p className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
        {"// "}ERROR 404 · 信号喪失
      </p>
      <h1
        className="glitch mt-6 font-display text-6xl font-black uppercase tracking-tight text-cyan sm:text-8xl"
        data-text="SIGNAL LOST"
      >
        SIGNAL LOST
      </h1>
      <p className="mt-6 max-w-md font-mono text-sm leading-relaxed text-muted">
        The route you requested is outside the perimeter. It may have been
        firewalled, moved, or never existed.
      </p>
      <div className="hud-frame mt-10 flex items-center gap-6 px-6 py-4">
        <Link
          href="/"
          className="font-mono text-sm uppercase tracking-widest text-cyan underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-cyan"
        >
          ← Return to base
        </Link>
        <span aria-hidden className="text-muted">
          |
        </span>
        <a
          href="/sitemap.xml"
          className="font-mono text-sm uppercase tracking-widest text-muted transition-colors hover:text-magenta focus-visible:outline-2 focus-visible:outline-cyan"
        >
          View sitemap
        </a>
      </div>
    </main>
  );
}
