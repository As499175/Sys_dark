"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface TypingTerminalProps {
  lines: string[];
  className?: string;
  /** chars per second */
  cps?: number;
  lineDelayMs?: number;
  onDone?: () => void;
}

/** Fake terminal typing effect for boot logs. */
export function TypingTerminal({
  lines,
  className,
  cps = 55,
  lineDelayMs = 260,
  onDone,
}: TypingTerminalProps) {
  const reduced = usePrefersReducedMotion();
  const [rendered, setRendered] = useState<string[]>(reduced ? lines : []);
  const active = useRef(true);

  useEffect(() => {
    if (reduced) {
      setRendered(lines);
      onDone?.();
      return;
    }
    let li = 0;
    let ci = 0;
    let buf: string[] = [];
    active.current = true;
    const tick = () => {
      if (!active.current) return;
      const line = lines[li] ?? "";
      if (ci <= line.length) {
        const shown = [...buf, line.slice(0, ci)];
        setRendered(shown);
        ci += 1;
        window.setTimeout(tick, 1000 / cps);
      } else {
        buf = [...buf, line];
        li += 1;
        ci = 0;
        if (li < lines.length) window.setTimeout(tick, lineDelayMs);
        else {
          setRendered(buf);
          onDone?.();
        }
      }
    };
    const t = window.setTimeout(tick, 300);
    return () => {
      active.current = false;
      window.clearTimeout(t);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines, reduced, cps, lineDelayMs]);

  return (
    <div className={cn("font-mono text-[0.78rem] leading-relaxed text-muted", className)}>
      {rendered.map((l, i) => (
        <p key={i} className={l.startsWith("$") ? "text-cyan" : undefined}>
          {l}
        </p>
      ))}
    </div>
  );
}
