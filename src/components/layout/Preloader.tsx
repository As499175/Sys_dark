"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const MSG = "ESTABLISHING SECURE CONNECTION…";
const KEY = "ashiq-preloader-done";

interface PreloaderProps {
  /** fired once the boot sequence completes (or is skipped) — used to trigger the sakura burst */
  onDone?: () => void;
}

/**
 * Preloader: mono typing → progress bar + hex counter 0x00→0xFF → sakura
 * burst hint + curtain wipe. ≤1.2s total, skippable (click/Esc), and
 * sessionStorage-guarded so it never replays on in-app navigation.
 */
export function Preloader({ onDone }: PreloaderProps) {
  const [visible, setVisible] = useState(false);
  const [typed, setTyped] = useState("");
  const [progress, setProgress] = useState(0);
  const finished = useRef(false);

  const finish = useCallback(() => {
    if (finished.current) return;
    finished.current = true;
    setProgress(100);
    onDone?.();
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* private mode */
    }
    window.setTimeout(() => setVisible(false), 650);
  }, [onDone]);

  useEffect(() => {
    let done = false;
    try {
      done = sessionStorage.getItem(KEY) === "1";
    } catch {
      done = false;
    }
    if (done || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const DURATION = 1100; // keep the whole thing ≤1.2s
    let start = 0;
    let raf = 0;
    const tick = (now: number) => {
      if (!start) {
        start = now;
        setVisible(true); // show on first frame — avoids a synchronous setState in the effect body
      }
      const p = Math.min((now - start) / DURATION, 1);
      setProgress(Math.round(p * 100));
      setTyped(MSG.slice(0, Math.floor(p * MSG.length * 1.4)));
      if (p >= 1) finish();
      else raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const skip = () => finish();
    window.addEventListener("keydown", skip);
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finish]);

  const hex = "0x" + Math.round((progress / 100) * 255).toString(16).toUpperCase().padStart(2, "0");

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-void"
          initial={{ opacity: 1 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          role="status"
          aria-label="Loading site"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-cyan">
            {typed}
            <span className="animate-blink">▊</span>
          </p>
          <div className="hud-frame relative mt-6 h-1 w-64 overflow-hidden bg-ink-2">
            <div
              className="h-full bg-gradient-to-r from-cyan via-violet to-magenta shadow-glow-cyan transition-[width] duration-100"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-3 font-mono text-[0.65rem] text-muted">
            {hex} · {String(progress).padStart(3, "0")}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
