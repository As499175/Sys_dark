"use client";

import { BadgeCheck } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { certifications } from "@/data/achievements";

/** Infinite dual-direction marquee of cert badges. Hover pauses + glows. */
export function Certifications() {
  const rowA = [...certifications, ...certifications];
  const rowB = [...certifications.slice().reverse(), ...certifications.slice().reverse()];

  const Badge = ({ c, i }: { c: (typeof certifications)[number]; i: number }) => (
    <span
      key={`${c.name}-${i}`}
      className="hud-frame group flex shrink-0 items-center gap-3 border border-white/8 bg-ink px-5 py-3 transition-all duration-300 hover:border-gold/60 hover:shadow-[0_0_20px_rgba(255,209,102,0.25)]"
    >
      <BadgeCheck className="h-5 w-5 text-gold" aria-hidden="true" />
      <span>
        <span className="block font-display text-[0.72rem] font-bold uppercase tracking-wider text-text">{c.name}</span>
        <span className="block font-mono text-[0.58rem] text-muted">{c.issuer} · {c.id}</span>
      </span>
    </span>
  );

  return (
    <Section id="certs" kicker="CERTIFICATIONS" kickerJp="資格" title="Paper trail">
      <p className="mb-6 max-w-xl text-xs text-muted">
        Badges below are placeholders for planned/claimed certs. TODO: replace each with the real
        credential ID before launch — nothing unverified ships.
      </p>
      <div className="relative space-y-4 overflow-hidden py-2" aria-label="Certification marquee">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-void to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-void to-transparent" />
        <ul className="animate-marquee flex w-max gap-4 hover:[animation-play-state:paused]">
          {rowA.map((c, i) => <Badge key={`a${i}`} c={c} i={i} />)}
        </ul>
        <ul className="animate-marquee-rev flex w-max gap-4 hover:[animation-play-state:paused]" aria-hidden="true">
          {rowB.map((c, i) => <Badge key={`b${i}`} c={c} i={i} />)}
        </ul>
      </div>
    </Section>
  );
}
