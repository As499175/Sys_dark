"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { Section } from "@/components/fx/Section";
import { radarAxes, skillGroups, toolbox, type SkillGroup } from "@/data/skills";
import { cn } from "@/lib/utils";

/* ---------------- Hexagon radar chart (pure SVG) ---------------- */
function RadarChart({ active }: { active: boolean }) {
  const size = 320;
  const cx = size / 2;
  const cy = size / 2;
  const r = 118;
  const n = radarAxes.length;

  const pt = (i: number, radius: number): [number, number] => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius];
  };

  const rings = [0.25, 0.5, 0.75, 1];
  const dataPoints = radarAxes.map((a, i) => pt(i, (a.level / 100) * r));
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ") + " Z";

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="mx-auto w-full max-w-sm" role="img" aria-label="Skill radar: Web Security 88, AI/ML 82, Backend 78, Frontend 85, DevOps 65, OSINT 74 out of 100">
      {/* grid rings */}
      {rings.map((ring) => (
        <polygon
          key={ring}
          points={radarAxes.map((_, i) => pt(i, ring * r).join(",")).join(" ")}
          fill="none"
          stroke="#ffffff"
          strokeOpacity={0.08}
        />
      ))}
      {/* spokes */}
      {radarAxes.map((_, i) => {
        const [x, y] = pt(i, r);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#ffffff" strokeOpacity={0.06} />;
      })}
      {/* data polygon — scales in when active */}
      <g style={{ transformOrigin: `${cx}px ${cy}px`, transform: active ? "scale(1)" : "scale(0)", transition: "transform 1s cubic-bezier(0.16,1,0.3,1)" }}>
        <path d={dataPath} fill="url(#radarFill)" stroke="#00f0ff" strokeWidth={1.5} style={{ filter: "drop-shadow(0 0 10px rgba(0,240,255,.4))" }} />
        {dataPoints.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={3} fill="#ff2d95" />
        ))}
      </g>
      <defs>
        <linearGradient id="radarFill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#7c5cff" stopOpacity="0.16" />
        </linearGradient>
      </defs>
      {/* labels */}
      {radarAxes.map((a, i) => {
        const [x, y] = pt(i, r + 26);
        return (
          <text
            key={a.name}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="10"
            fontFamily="var(--font-mono)"
            fill="#8A93B2"
          >
            {a.name}
            <tspan fill="#00f0ff" fontWeight="bold">{` ${a.level}`}</tspan>
          </text>
        );
      })}
    </svg>
  );
}

/* ---------------- Grouped progress columns ---------------- */
const accentMap: Record<SkillGroup["accent"], string> = {
  cyan: "#00f0ff",
  magenta: "#ff2d95",
  violet: "#7c5cff",
};

function ProgressColumn({ group, active }: { group: SkillGroup; active: boolean }) {
  const color = accentMap[group.accent];
  return (
    <div className="hud-frame relative border border-white/8 bg-ink p-5">
      <p className="font-display text-xs font-bold uppercase tracking-[0.25em]" style={{ color }}>
        ▸ {group.title}
      </p>
      <p className="mb-4 mt-0.5 font-jp text-[0.6rem] text-muted">{group.jp}</p>
      <ul className="space-y-3">
        {group.skills.map((s, i) => (
          <li key={s.name}>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-xs text-text">{s.name}</span>
              <span className="font-mono text-[0.62rem]" style={{ color }}>
                {active ? s.level : 0}%
              </span>
            </div>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-ink-2" role="progressbar" aria-valuenow={s.level} aria-valuemin={0} aria-valuemax={100} aria-label={`${s.name} proficiency`}>
              <div
                className="h-full rounded-full"
                style={{
                  width: active ? `${s.level}%` : "0%",
                  background: `linear-gradient(90deg, ${color}, ${color}66)`,
                  boxShadow: `0 0 10px ${color}55`,
                  transition: `width 1s cubic-bezier(0.16,1,0.3,1) ${i * 60}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Toolbox marquee ---------------- */
function ToolboxMarquee() {
  const items = [...toolbox, ...toolbox]; // duplicate for seamless loop
  return (
    <div className="relative mt-14 overflow-hidden py-4" aria-label="Toolbox" role="marquee">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-void to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-void to-transparent" />
      <ul className="animate-marquee flex w-max items-center gap-10 hover:[animation-play-state:paused]">
        {items.map((t, i) => (
          <li
            key={`${t.name}-${i}`}
            className="flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted opacity-60 grayscale transition-all duration-300 hover:text-cyan hover:opacity-100 hover:grayscale-0"
            aria-hidden={i >= toolbox.length}
          >
            <span className="h-1.5 w-1.5 rotate-45 bg-violet" aria-hidden="true" />
            {t.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setActive(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="skills" kicker="SKILLS" kickerJp="スキル" title="Capability matrix">
      <div ref={ref} className={cn("grid gap-8 lg:grid-cols-[minmax(0,1fr)_2fr]", active && "skills-active")}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="glass hud-frame relative flex flex-col items-center justify-center rounded-md p-6"
        >
          <RadarChart active={active} />
          <p className="mt-2 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted">
            hex-scan · self-assessed
          </p>
        </motion.div>
        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((g) => (
            <ProgressColumn key={g.title} group={g} active={active} />
          ))}
        </div>
      </div>
      <ToolboxMarquee />
    </Section>
  );
}
