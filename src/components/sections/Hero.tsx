"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { motion } from "motion/react";
import { ChevronDown, Download, Mail } from "lucide-react";
import { GlitchText } from "@/components/fx/GlitchText";
import { TypingTerminal } from "@/components/fx/TypingTerminal";
import { MagneticButton } from "@/components/fx/MagneticButton";
import { usePrefersReducedMotion, useIsMobile } from "@/hooks/useMediaQuery";
import { useCountUp } from "@/hooks/useCountUp";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/* R3F canvases: lazy, client-only, and never mounted on mobile / reduced-motion. */
const ParticleSakura = dynamic(() => import("@/components/canvas/ParticleSakura"), { ssr: false });
const HeroSphere = dynamic(() => import("@/components/canvas/HeroSphere"), { ssr: false });

const HERO_CHIPS = ["OWASP Top 10", "Python", "React", "Pentest"];

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
const H1_PATH =
  "M27.3 0 0 29.6h6.9L34.2 0H27.3zM6.8 34.2 0 41.1h6.9l6.8-6.9h-6.9z"; // simplified HackerOne-ish mark placeholder

interface HeroProps {
  sakuraOn: boolean;
  burstKey: number;
  langBn: boolean;
}

function Stat({ label, value, suffix }: { label: string; value: number; suffix: string }) {
  const n = useCountUp(value, true);
  return (
    <div className="hud-frame px-4 py-3 text-center sm:text-left">
      <p className="font-display text-2xl font-bold text-cyan text-glow">
        {String(n).padStart(2, "0")}
        {suffix}
      </p>
      <p className="mt-1 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-muted">{label}</p>
    </div>
  );
}

export function Hero({ sakuraOn, burstKey, langBn }: HeroProps) {
  const reduced = usePrefersReducedMotion();
  const isMobile = useIsMobile();
  const heavyFx = !reduced && !isMobile;

  /* NOTE: mouse-move parallax was intentionally REMOVED for performance —
     it re-rendered the whole hero on every pointer frame. The hero now uses
     gentle, GPU-cheap CSS float/drift animations that match the cyberpunk
     mood without taxing the main thread. */

  const roles = useMemo(() => [...profile.roles], []);

  return (
    <section id="home" className="relative flex min-h-dvh items-center overflow-hidden pt-16">
      {/* ---------- background layers ---------- */}
      <div aria-hidden="true" className="absolute inset-0 -z-10">
        {/* CSS gradient fallback — always present beneath the canvas */}
        <div className="hero-gradient absolute inset-0" />
        {heavyFx && sakuraOn && (
          <div className="absolute inset-0">
            <ParticleSakura key={burstKey} burst={burstKey > 0} />
          </div>
        )}
        {heavyFx && (
          <div className="absolute right-[-10%] top-[10%] h-[70vh] w-[55vw]">
            <HeroSphere />
          </div>
        )}
        {/* radial vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-void)_92%)]" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:py-10">
        {/* ---------- left column ---------- */}
        <div className="flex flex-col justify-center">
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="kicker"
          >
            UTTARA UNIVERSITY · CSE · DHAKA <span className="jp ml-2">ダカ</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <GlitchText
              as="h1"
              text="ASHIQUR RAHMAN BHUIYAN"
              className="mt-4 block font-display text-[clamp(2.75rem,9vw,7rem)] font-black leading-[0.95] tracking-[-0.03em] text-text"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 h-8 font-mono text-lg text-violet sm:text-xl"
            aria-live="polite"
          >
            <TypingTerminal lines={roles} cps={14} lineDelayMs={900} loop />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
            lang={langBn ? "bn" : "en"}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg"
          >
            {langBn ? profile.tagline.bn : profile.tagline.en}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="#projects" className="btn-primary sweep glow">
              VIEW MY WORK
            </MagneticButton>
            <MagneticButton
              href={profile.resumeUrl}
              download
              className="btn-ghost hud-frame inline-flex items-center gap-2"
              ariaLabel="Download CV (PDF)"
            >
              <Download className="h-4 w-4" aria-hidden="true" /> DOWNLOAD CV
            </MagneticButton>
            <div className="flex items-center gap-2">
              {[
                { href: profile.links.github, label: "GitHub — @ashiq0x", path: GH_PATH },
                { href: profile.links.linkedin, label: "LinkedIn — Md. Ashiqur Rahman", path: LI_PATH },
                { href: profile.links.hackerone, label: "HackerOne — @ashiq0x", path: H1_PATH },
                { href: profile.links.x, label: "X — @ashiq0x", path: X_PATH },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center border border-white/10 bg-ink/60 text-muted backdrop-blur transition-all hover:border-cyan/50 hover:text-cyan hover:shadow-glow-cyan"
                >
                  <BrandMark path={s.path} className="h-4 w-4" />
                </a>
              ))}
              <a
                href={`mailto:${profile.email}`}
                aria-label={`Email ${profile.email}`}
                title="Email"
                className="grid h-10 w-10 place-items-center border border-white/10 bg-ink/60 text-muted backdrop-blur transition-all hover:border-magenta/50 hover:text-magenta hover:shadow-glow-magenta"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </motion.div>

          {/* Stat strip */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4"
          >
            {profile.stats.map((s) => (
              <Stat key={s.label} label={s.label} value={s.value} suffix={s.suffix} />
            ))}
          </motion.div>
        </div>

        {/* ---------- right column: portrait + HUD chips + JP rail ---------- */}
        <div className="relative hidden items-center justify-center lg:flex" aria-hidden="false">
          {/* vertical JP rail */}
          <div className="jp-rail absolute right-2 top-1/2 -translate-y-1/2 font-jp text-xs tracking-[0.5em] text-muted/70">
            人工知能 · サイバーセキュリティ
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* hexagon frame with animated conic border */}
            <div className="hex-portrait relative mx-auto aspect-[0.88] w-72">
              <div className="hex-ring absolute inset-[-6px]" aria-hidden="true" />
              <div className="hex-clip absolute inset-0 overflow-hidden bg-ink-2">
                {/* No real photo yet — stylised initials plate. TODO: swap for next/image portrait. */}
                <div className="grid h-full w-full place-items-center bg-[linear-gradient(160deg,var(--color-ink),var(--color-ink2))]">
                  <span className="font-display text-7xl font-black text-transparent [-webkit-background-clip:text] [background-clip:text] bg-[linear-gradient(120deg,var(--color-cyan),var(--color-violet),var(--color-magenta))]">
                    {profile.initials}
                  </span>
                </div>
              </div>
            </div>

            {/* floating HUD chips */}
            {HERO_CHIPS.map((chip, i) => (
              <motion.span
                key={chip}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.12 }}
                className={cn(
                  "hud-chip absolute whitespace-nowrap px-3 py-1.5 font-mono text-[0.65rem] uppercase tracking-widest text-cyan",
                  i === 0 && "-left-16 top-6",
                  i === 1 && "-right-14 top-20",
                  i === 2 && "-left-12 bottom-24",
                  i === 3 && "-right-16 bottom-8",
                )}
                style={reduced ? undefined : { animation: `float-chip ${5 + i}s ease-in-out ${i * 0.7}s infinite` }}
              >
                {chip}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-cyan"
      >
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.35em]">SCROLL</span>
        <ChevronDown className="h-5 w-5 animate-bounce-slow" aria-hidden="true" />
      </motion.a>
    </section>
  );
}
