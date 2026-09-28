"use client";

import { useEffect, useState } from "react";

export interface MousePos {
  x: number;
  y: number;
  /** Normalised -1..1 relative to viewport centre. */
  nx: number;
  ny: number;
}

/**
 * Tracks the pointer position with rAF batching so rapid mousemove events
 * collapse into at most ONE React state update per frame (prevents hero
 * re-render storms that made the page feel slow).
 *
 * Pass `active=false` to detach the listener entirely (reduced-motion users
 * never pay for mouse tracking).
 */
export function useMousePosition(active = true): MousePos {
  const [pos, setPos] = useState<MousePos>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    if (!active) return;
    let raf = 0;
    let last: MousePos | null = null;

    const flush = () => {
      raf = 0;
      if (last) setPos(last);
    };

    const onMove = (e: MouseEvent) => {
      last = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / window.innerWidth) * 2 - 1,
        ny: (e.clientY / window.innerHeight) * 2 - 1,
      };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [active]);

  return pos;
}
