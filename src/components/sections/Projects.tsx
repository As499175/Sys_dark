"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";
import { ArrowUpRight, Github } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { projects, type Project, type ProjectCategory } from "@/data/projects";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

type Filter = "All" | ProjectCategory;
const FILTERS: Filter[] = ["All", "AI", "Security", "Web"];

/* Gradient-mesh thumbnail rendered as inline SVG (no image files needed).
   TODO: swap for next/image screenshots once real assets exist. */
function MeshThumb({ mesh, title }: { mesh: Project["mesh"]; title: string }) {
  const id = title.replace(/\W/g, "");
  return (
    <svg viewBox="0 0 400 220" className="h-full w-full" role="img" aria-label={`Abstract gradient artwork for ${title}`}>
      <defs>
        <radialGradient id={`a${id}`} cx="20%" cy="30%" r="70%">
          <stop offset="0%" stopColor={mesh[0]} stopOpacity="0.9" />
          <stop offset="100%" stopColor={mesh[2]} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`b${id}`} cx="80%" cy="70%" r="65%">
          <stop offset="0%" stopColor={mesh[1]} stopOpacity="0.75" />
          <stop offset="100%" stopColor={mesh[2]} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="220" fill={mesh[2]} />
      <rect width="400" height="220" fill={`url(#a${id})`} />
      <rect width="400" height="220" fill={`url(#b${id})`} />
      {/* scan grid flourish */}
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1="0" y1={i * 34} x2="400" y2={i * 34} stroke="#ffffff" strokeOpacity="0.05" />
      ))}
      <text x="16" y="204" fontFamily="monospace" fontSize="10" fill="#E8ECF8" opacity="0.5">
        ~/projects/{title.toLowerCase().replace(/\s+/g, "-")}
      </text>
    </svg>
  );
}

/* 3D tilt card with moving specular highlight */
function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glare, setGlare] = useState({ x: 50, y: 50, o: 0 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    setStyle({
      transform: `perspective(900px) rotateX(${(0.5 - py) * 12}deg) rotateY(${(px - 0.5) * 12}deg)`,
      transition: "transform 0.08s linear",
    });
    setGlare({ x: px * 100, y: py * 100, o: 0.14 });
  };
  const onLeave = () => {
    setStyle({ transform: "perspective(900px) rotateX(0deg) rotateY(0deg)", transition: "transform 0.5s ease" });
    setGlare((g) => ({ ...g, o: 0 }));
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "hud-frame group relative overflow-hidden border border-white/8 bg-ink",
        project.featured && "md:col-span-2",
      )}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={style}
      ref={ref}
    >
      {/* thumbnail */}
      <div className={cn("relative w-full overflow-hidden", project.featured ? "aspect-[21/9]" : "aspect-[16/9]")}>
        <MeshThumb mesh={project.mesh} title={project.title} />
        <span className="absolute left-3 top-3 rounded-sm border border-cyan/50 bg-void/80 px-2 py-0.5 font-mono text-[0.6rem] uppercase tracking-widest text-cyan backdrop-blur">
          {project.category} · {project.year}
        </span>
        {/* specular highlight */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            opacity: glare.o,
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, #ffffff 0%, transparent 55%)`,
          }}
        />
      </div>

      <div className="p-5">
        <h3 className="font-display text-base font-bold uppercase tracking-wide text-text">
          <a href={`/projects/${project.slug}`} className="neon-link">
            {project.title}
          </a>
        </h3>
        <p className="mt-1.5 text-xs leading-relaxed text-muted">{project.impact}</p>
        <ul className="mt-3 flex flex-wrap gap-1.5" aria-label="Tech stack">
          {project.tech.slice(0, 5).map((t) => (
            <li key={t} className="rounded-sm border border-white/10 bg-ink2 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-4 flex items-center gap-4">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-muted transition-colors hover:text-cyan" aria-label={`${project.title} source code on GitHub`}>
              <Github className="h-3.5 w-3.5" aria-hidden="true" /> Code
            </a>
          )}
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 font-mono text-[0.68rem] text-muted transition-colors hover:text-magenta" aria-label={`${project.title} live site`}>
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" /> Live
            </a>
          ) : null}
          <a href={`/projects/${project.slug}`} className="ml-auto inline-flex items-center gap-1 font-mono text-[0.68rem] text-cyan transition-colors hover:text-glow">
            Case study <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </motion.article>
  );
}

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

export function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <Section id="projects" kicker="PROJECTS" kickerJp="作品集" title="Selected builds">
      {/* filter tabs */}
      <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Project filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            role="tab"
            aria-selected={filter === f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-sm border px-4 py-1.5 font-mono text-[0.68rem] uppercase tracking-[0.2em] transition-all",
              filter === f
                ? "border-cyan bg-cyan/10 text-cyan shadow-glow-cyan"
                : "border-white/10 bg-ink text-muted hover:border-cyan/40 hover:text-text",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout variants={gridVariants} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <TiltCard key={p.slug} project={p} />
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
