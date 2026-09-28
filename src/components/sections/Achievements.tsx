"use client";

import { useState } from "react";
import { Crown, ShieldCheck, Users, Flag, Bug, Mic, BadgeCheck } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { achievements, type Achievement } from "@/data/achievements";

const ICONS = {
  crown: Crown,
  shield: ShieldCheck,
  users: Users,
  flag: Flag,
  bug: Bug,
  mic: Mic,
  badge: BadgeCheck,
} as const;

function FlipCard({ a }: { a: Achievement }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = ICONS[a.icon];
  return (
    <div className="[perspective:1200px]">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        aria-expanded={flipped}
        aria-label={`${a.title} — ${flipped ? "hide" : "show"} details`}
        data-cursor-hover
        className="relative block h-44 w-full text-left [transform-style:preserve-3d] transition-transform duration-500"
        style={{ transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)" }}
      >
        {/* front */}
        <span className="hud-frame absolute inset-0 flex flex-col justify-between border border-white/8 bg-ink p-5 [backface-visibility:hidden]">
          <span className="flex items-center justify-between">
            <Icon className="h-7 w-7 text-gold drop-shadow-[0_0_10px_rgba(255,209,102,0.5)]" aria-hidden="true" />
            {a.verified ? (
              <span className="rounded-sm border border-gold/50 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-gold">
                ✔ Verified
              </span>
            ) : (
              <span className="rounded-sm border border-white/15 px-1.5 py-0.5 font-mono text-[0.55rem] uppercase tracking-widest text-muted">
                TODO
              </span>
            )}
          </span>
          <span className="font-display text-sm font-bold uppercase leading-snug tracking-wide text-text">
            {a.title}
          </span>
          <span className="font-mono text-[0.55rem] uppercase tracking-[0.3em] text-muted">tap to flip ↻</span>
        </span>
        {/* back */}
        <span className="absolute inset-0 flex items-center border border-magenta/30 bg-ink-2 p-5 text-xs leading-relaxed text-muted [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {a.detail}
        </span>
      </button>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" kicker="ACHIEVEMENTS" kickerJp="実績" title="Trophy case">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {achievements.map((a) => (
          <FlipCard key={a.title} a={a} />
        ))}
      </div>
      <p className="mt-6 font-mono text-[0.62rem] text-muted">
        * Only verifiable facts are marked ✔. TODO cards await real event names, ranks and credential IDs.
      </p>
    </Section>
  );
}
