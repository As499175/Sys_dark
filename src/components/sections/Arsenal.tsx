"use client";

import { Section } from "@/components/fx/Section";
import { profile } from "@/data/profile";
import { Shield, Brain, Code2, Users } from "lucide-react";

/**
 * Arsenal — the compact "what I bring" strip between About and Skills.
 * Four capability cards with HUD frames; keeps the page scannable.
 */
const ITEMS = [
  {
    Icon: Shield,
    title: "Offensive Security",
    body: "OWASP-driven web/API testing, recon automation, and reports triagers accept on the first pass.",
    accent: "text-cyan border-cyan/40",
  },
  {
    Icon: Brain,
    title: "Applied AI",
    body: "LLM & RAG systems, classical ML with scikit-learn, and prompt pipelines that survive red-teaming.",
    accent: "text-violet border-violet/40",
  },
  {
    Icon: Code2,
    title: "Full-Stack Builds",
    body: "Next.js + TypeScript front, Node + Postgres back. Shipped, measured, and hardened before launch.",
    accent: "text-magenta border-magenta/40",
  },
  {
    Icon: Users,
    title: "Community Leadership",
    body: `VP of the ${profile.study.university} Cyber Security Club — workshops, CTFs, and mentoring at scale.`,
    accent: "text-gold border-gold/40",
  },
];

export function Arsenal() {
  return (
    <Section id="arsenal" kicker="ARSENAL" kickerJp="装備" title="What I bring">
      <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4" aria-label="Core capabilities">
        {ITEMS.map(({ Icon, title, body, accent }) => (
          <li
            key={title}
            className={`hud-frame group relative border-l-2 bg-ink p-6 transition-shadow duration-300 hover:shadow-glow-cyan ${accent}`}
          >
            <Icon className="mb-4 h-6 w-6" aria-hidden="true" />
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-text">{title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted">{body}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
