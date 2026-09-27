import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink, GitBranch, Check } from "lucide-react";
import { projects } from "@/data/projects";
import { ScrambleText } from "@/components/fx/ScrambleText";

/* Static params for known slugs; fallback lets future data additions render without rebuild. */
export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.impact,
    alternates: { canonical: `/projects/${project.slug}` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main id="main" className="mx-auto w-full max-w-5xl px-5 pb-24 pt-28 sm:px-8">
      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-muted transition-colors hover:text-cyan"
      >
        <ArrowLeft size={14} /> Back to projects
      </Link>

      <div className="mt-6 inline-block rounded-full border border-white/10 bg-ink-2 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-[0.25em] text-cyan">
        {project.category} · {project.year}
      </div>

      <h1 className="font-display mt-4 text-4xl font-black uppercase tracking-tight text-text sm:text-5xl">
        <ScrambleText text={project.title.toUpperCase()} />
      </h1>

      <p className="mt-4 max-w-2xl text-lg text-muted">{project.impact}</p>

      {/* Gradient-mesh hero plate (same visual language as the cards — no image files needed) */}
      <div
        className="hud-frame mt-10 aspect-[21/9] w-full overflow-hidden"
        style={{
          background: `radial-gradient(60% 90% at 20% 20%, ${project.mesh[0]}55, transparent 70%),
                       radial-gradient(50% 80% at 80% 30%, ${project.mesh[1]}44, transparent 70%),
                       radial-gradient(70% 100% at 50% 90%, ${project.mesh[2]}33, transparent 70%),
                       #0B0E17`,
        }}
        role="img"
        aria-label={`${project.title} abstract gradient artwork`}
      />

      <section className="mt-10 grid gap-10 md:grid-cols-[1fr_320px]">
        <div>
          <h2 className="font-mono text-xs uppercase tracking-[0.35em] text-cyan">
            {"// Overview — 概要"}
          </h2>
          <p className="mt-4 leading-relaxed text-text/90">{project.description}</p>

          <h2 className="font-mono mt-10 text-xs uppercase tracking-[0.35em] text-cyan">
            {"// Highlights — ハイライト"}
          </h2>
          <ul className="mt-4 space-y-3">
            {project.highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 text-sm text-text/90">
                <Check size={16} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="hud-frame h-fit bg-ink/60 p-6 backdrop-blur-md">
          <h2 className="font-mono text-xs uppercase tracking-[0.35em] text-muted">
            Stack
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-ink-2 px-3 py-1 font-mono text-[0.7rem] text-text/80"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3">
            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary sweep inline-flex"
              >
                <GitBranch size={16} /> Source code
              </a>
            ) : null}
            {project.live ? (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost inline-flex items-center justify-center gap-2"
              >
                <ExternalLink size={16} /> Live demo
              </a>
            ) : (
              <p className="font-mono text-[0.7rem] text-muted">
                {/* TODO: add a live URL in src/data/projects.ts when deployed */}
                Live demo coming soon — ask me for a walkthrough.
              </p>
            )}
          </div>
        </aside>
      </section>

      <div className="mt-14 border-t border-white/8 pt-6">
        <Link href="/#contact" className="neon-link font-mono text-sm">
          Start a conversation about work like this →
        </Link>
      </div>
    </main>
  );
}
