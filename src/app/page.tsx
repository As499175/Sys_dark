"use client";

/*
 * Home — composes all sections in the required order.
 * Owns global interactive state: preloader, EN⇄বাং hero tagline,
 * sakura particles toggle (command palette), and the Konami "GOD MODE" easter egg.
 */

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { CommandPalette } from "@/components/layout/CommandPalette";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Arsenal } from "@/components/sections/Arsenal";
import { Projects } from "@/components/sections/Projects";
import { Journey } from "@/components/sections/Journey";
import { Achievements } from "@/components/sections/Achievements";
import { BugBounty } from "@/components/sections/BugBounty";
import { Certifications } from "@/components/sections/Certifications";
import { Testimonials } from "@/components/sections/Testimonials";
import { Contact } from "@/components/sections/Contact";
import { Grain } from "@/components/fx/Grain";
import { Scanlines } from "@/components/fx/Scanlines";
import { CursorHud } from "@/components/fx/CursorHud";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export default function Home() {
  const reduced = usePrefersReducedMotion();

  const [langBn, setLangBn] = useState(false);
  const [sakuraOn, setSakuraOn] = useState(true);
  const [burstKey, setBurstKey] = useState(0);
  const [godMode, setGodMode] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);

  /* Ctrl/Cmd + K → command palette */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* Konami code → glitch flash + sakura burst + GOD MODE theme */
  useEffect(() => {
    let idx = 0;
    const onKey = (e: KeyboardEvent) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[idx]) {
        idx += 1;
        if (idx === KONAMI.length) {
          idx = 0;
          setGodMode((v) => !v);
          setBurstKey((k) => k + 1);
          setGlitching(true);
          window.setTimeout(() => setGlitching(false), 700);
        }
      } else {
        idx = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const onLoaded = useCallback(() => {
    setBurstKey((k) => k + 1); // sakura burst as the curtain lifts
  }, []);

  const toggleSakura = useCallback(() => setSakuraOn((v) => !v), []);
  const toggleLang = useCallback(() => setLangBn((v) => !v), []);

  return (
    <>
      <Preloader onDone={onLoaded} />

      {/* one-shot glitch overlay for the Konami easter egg */}
      <AnimatePresence>
        {glitching && !reduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.4, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, times: [0, 0.2, 0.45, 0.7, 1] }}
            className="pointer-events-none fixed inset-0 z-[95] mix-blend-screen"
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(255,45,149,.18) 0 2px, transparent 2px 4px), repeating-linear-gradient(90deg, rgba(0,240,255,.12) 0 3px, transparent 3px 6px)",
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className={cn("relative", godMode && "god-mode", glitching && "konami-glitch")}>
        <Grain />
        <Scanlines />
        <CursorHud />

        <Navbar onOpenPalette={() => setPaletteOpen(true)} langBn={langBn} onToggleLang={toggleLang} />
        <CommandPalette
          open={paletteOpen}
          onClose={() => setPaletteOpen(false)}
          sakuraOn={sakuraOn}
          onToggleSakura={toggleSakura}
        />

        <main id="main">
          <Hero sakuraOn={sakuraOn} burstKey={burstKey} langBn={langBn} />
          <About />
          <Skills />
          <Arsenal />
          <Projects />
          <Journey />
          <Achievements />
          <BugBounty />
          <Certifications />
          <Testimonials />
          <Contact />
        </main>

        <Footer />

        {/* GOD MODE toast — subtle, auto-dismisses */}
        <AnimatePresence>
          {godMode && (
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed bottom-6 left-1/2 z-[100] -translate-x-1/2"
              role="status"
            >
              <div className="hud-frame bg-ink/90 px-5 py-3 font-mono text-xs tracking-[0.2em] text-gold backdrop-blur-md">
                ▲ GOD MODE ENGAGED — you found the cheat code. So did the best hires.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
