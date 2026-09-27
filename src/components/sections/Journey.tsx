"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Shield, Flag, Briefcase, Bug, Trophy } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { timeline, type TimelineEntry } from "@/data/timeline";
import { useIsMobile, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const ICONS = { graduation: GraduationCap, shield: Shield, flag: Flag, briefcase: Briefcase, bug: Bug, trophy: Trophy } as const;

function Card({ entry }: { entry: TimelineEntry }) {
  const Icon = ICONS[entry.icon];
  const isTodo = entry.date === "TODO";
  return (
    <article className="hud-frame relative w-[85vw] max-w-[340px] shrink-0 border border-white/8 bg-ink p-5 sm:w-[340px]">
      <div className="mb-3 flex items-center justify-between">
        <span className={`font-mono text-[0.62rem] uppercase tracking-[0.25em] ${isTodo ? "text-gold" : "text-cyan"}`}>
          {entry.date}
        </span>
        <Icon className="h-4 w-4 text-violet" aria-hidden="true" />
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-wide text-text">{entry.title}</h3>
      <p className="mt-1 text-xs text-muted">{entry.org}</p>
      <ul className="mt-3 space-y-1.5">
        {entry.bullets.map((b) => (
          <li key={b} className="flex gap-2 text-[0.72rem] leading-relaxed text-muted">
            <span className="mt-1 h-1 w-1 shrink-0 rotate-45 bg-magenta" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Vertical accordion fallback (mobile + reduced motion). */
function VerticalJourney() {
  return (
    <ol className="relative space-y-6 border-l border-cyan/25 pl-6" aria-label="Career timeline">
      {timeline.map((e) => (
        <li key={e.title + e.date} className="relative">
          <span className="absolute -left-[29px] top-2 h-2.5 w-2.5 rotate-45 border border-cyan bg-void" aria-hidden="true" />
          <Card entry={e} />
        </li>
      ))}
    </ol>
  );
}

export function Journey() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();

  const horizontal = !reduced && isMobile === false; // wait for media query resolution

  useEffect(() => {
    if (!horizontal) return;
    const wrap = wrapRef.current;
    const track = trackRef.current;
    if (!wrap || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    const getDistance = () => track.scrollWidth - window.innerWidth;

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: wrap,
        start: "top top",
        end: () => `+=${getDistance() + 200}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.refresh();
    };
  }, [horizontal]);

  return (
    <Section id="journey" kicker="JOURNEY" kickerJp="年表" title="Path so far">
      {!horizontal ? (
        <VerticalJourney />
      ) : (
        <div ref={wrapRef} className="relative overflow-hidden">
          {/* progress rail */}
          <div className="pointer-events-none absolute left-0 top-1/2 z-10 hidden h-px w-full -translate-y-8 bg-gradient-to-r from-transparent via-cyan/30 to-transparent lg:block" aria-hidden="true" />
          <div ref={trackRef} className="flex w-max gap-6 will-change-transform">
            {timeline.map((e) => (
              <Card key={e.title + e.date} entry={e} />
            ))}
          </div>
          <p className="mt-6 font-mono text-[0.62rem] uppercase tracking-[0.3em] text-muted">
            ↓ keep scrolling — timeline runs sideways
          </p>
        </div>
      )}
    </Section>
  );
}
