"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Command } from "lucide-react";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#bounty", label: "Bounty" },
  { href: "#contact", label: "Contact" },
];

interface NavbarProps {
  onOpenPalette: () => void;
  /** EN ⇄ বাং toggle for the hero tagline */
  langBn: boolean;
  onToggleLang: () => void;
}

export function Navbar({ onOpenPalette, langBn, onToggleLang }: NavbarProps) {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [last, setLast] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    // auto-hide on scroll-down, show on scroll-up
    if (y > last && y > 160) setHidden(true);
    else setHidden(false);
    setLast(y);
  });

  // lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: hidden ? -90 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors",
          scrolled ? "glass" : "bg-transparent",
        )}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
        >
          {/* Logo: AR in hexagon with rotating dashed ring */}
          <a href="#home" className="relative flex items-center gap-3" aria-label="Home — Ashiqur Rahman Bhuiyan">
            <span className="relative grid h-10 w-10 place-items-center">
              <svg viewBox="0 0 44 44" className="absolute inset-0 h-full w-full" aria-hidden="true">
                <polygon
                  points="22,2 40,12 40,32 22,42 4,32 4,12"
                  fill="none"
                  stroke="#00f0ff"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <circle
                  cx="22"
                  cy="22"
                  r="20"
                  fill="none"
                  stroke="#ff2d95"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                  className="animate-spin-slow origin-center"
                />
              </svg>
              <span className="font-display text-xs font-black tracking-widest text-cyan text-glow">
                {profile.initials}
              </span>
            </span>
            <span className="hidden font-mono text-sm text-text sm:block">
              {profile.handle}
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-6 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="neon-link font-mono text-[0.78rem] uppercase tracking-[0.18em] text-muted transition-colors hover:text-text"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            {/* Status pill */}
            <span className="hidden items-center gap-2 rounded-full border border-white/10 bg-ink px-3 py-1.5 font-mono text-[0.62rem] tracking-widest text-ok md:inline-flex">
              <span className="relative h-2 w-2 rounded-full bg-ok animate-pulse-dot" aria-hidden="true" />
              STATUS: {profile.status}
            </span>

            {/* EN ⇄ বাং — hero tagline language toggle */}
            <button
              type="button"
              onClick={onToggleLang}
              className="hidden items-center gap-1.5 rounded-full border border-white/10 bg-ink px-3 py-1.5 font-mono text-[0.62rem] tracking-widest text-muted transition-colors hover:border-cyan/50 hover:text-cyan md:inline-flex"
              aria-label="Toggle hero tagline language between English and Bangla"
              aria-pressed={langBn}
            >
              EN <span className="text-cyan">⇄</span> বাং
            </button>

            {/* Command palette hint */}
            <button
              type="button"
              onClick={onOpenPalette}
              className="hidden items-center gap-2 rounded-md border border-white/10 bg-ink px-2.5 py-1.5 font-mono text-[0.65rem] text-muted transition-colors hover:border-cyan/50 hover:text-cyan md:inline-flex"
              aria-label="Open command palette"
            >
              <Command className="h-3.5 w-3.5" aria-hidden="true" />
              Ctrl K
            </button>

            {/* Mobile menu toggle */}
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/10 bg-ink text-cyan lg:hidden"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="font-mono text-lg">{menuOpen ? "✕" : "≡"}</span>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Full-screen anime overlay menu (mobile) */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] flex flex-col bg-void/95 backdrop-blur-xl lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
          >
            {/* big JP watermark */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -right-6 top-1/2 -translate-y-1/2 select-none font-jp text-[9rem] leading-none text-ink2 opacity-60"
              style={{ writingMode: "vertical-rl" }}
            >
              サイバーセキュリティ
            </span>
            <div className="flex h-16 items-center justify-between px-5">
              <span className="kicker">// NAVIGATE</span>
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-md border border-white/10 text-cyan"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <ul className="flex flex-1 flex-col justify-center gap-2 px-8">
              {LINKS.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="block font-display text-3xl font-bold uppercase tracking-tight text-text transition-colors hover:text-cyan"
                  >
                    <span className="mr-3 font-mono text-xs text-muted">
                      0{i + 1}
                    </span>
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <p className="px-8 pb-8 font-mono text-[0.65rem] text-muted">
              {profile.study.university} · Dhaka — 2022 → now
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
