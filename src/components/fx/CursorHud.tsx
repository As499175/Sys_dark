"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

/**
 * Custom HUD cursor: a small cyan dot + a trailing ring that lags behind.
 * Desktop, fine-pointer only; disabled for reduced motion. Native cursor is
 * kept visible for accessibility (this augments, never replaces).
 *
 * PERFORMANCE NOTE: the user asked to remove "hard" mouse animations from the
 * default experience, so this is OFF by default. It can be re-enabled with the
 * `NEXT_PUBLIC_HUD_CURSOR=true` env var (or by passing enabled={true}).
 */
export function CursorHud({ enabled: forceEnabled }: { enabled?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  const wantHud = forceEnabled ?? process.env.NEXT_PUBLIC_HUD_CURSOR === "true";

  useEffect(() => {
    if (reduced || !wantHud) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    let rx = window.innerWidth / 2;
    let ry = window.innerHeight / 2;
    let x = rx;
    let y = ry;
    let raf = 0;
    let hovering = false;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      const el = e.target as HTMLElement | null;
      hovering = !!el?.closest("a, button, input, textarea, select, [data-cursor-hover]");
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      if (ringRef.current) {
        const s = hovering ? 1.8 : 1;
        ringRef.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%) scale(${s})`;
        ringRef.current.style.borderColor = hovering ? "#ff2d95" : "#00f0ff";
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, wantHud]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-cyan shadow-glow-cyan"
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-8 w-8 rounded-full border transition-transform duration-150"
        style={{ borderColor: "#00f0ff" }}
      />
    </div>
  );
}
