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
  /** cycle through `lines` type → redact-delete → next (hero role rotator) */
  loop?: boolean;
}

/** Redaction bar used while deleting a line in loop mode. */
const REDACT = "\u2588";

/** Fake terminal typing effect for boot logs + looping role rotator. */
export function TypingTerminal({
  lines,
  className,
  cps = 55,
  lineDelayMs = 260,
  onDone,
  loop = false,
}: TypingTerminalProps) {
  const reduced = usePrefersReducedMotion();
  const [rendered, setRendered] = useState<string[]>(reduced ? lines : []);
  const active = useRef(true);

  useEffect(() => {
    if (reduced) {
      // Reduced motion: show the first rotating line statically (no autoplay).
      setRendered(loop ? [lines[0] ?? ""] : lines);
      onDone?.();
      return;
    }
    if (loop) {
      // ---- rotator: type a line, hold, redact-delete, next line ----
      let li = 0;
      let ci = 0;
      let deleting = false;
      active.current = true;
      const tick = () => {
        if (!active.current) return;
        const line = lines[li % lines.length] ?? "";
        if (!deleting) {
          setRendered([line.slice(0, ci)]);
          ci += 1;
          if (ci > line.length) {
            deleting = true;
            window.setTimeout(tick, 1600); // hold
            return;
          }
          window.setTimeout(tick, 1000 / cps);
        } else {
          const shown = line.slice(0, ci);
          const bars = REDACT.repeat(Math.max(0, Math.min(6, line.length - ci)));
          setRendered([shown + bars]);
          ci -= 1;
          if (ci < 0) {
            deleting = false;
            ci = 0;
            li += 1;
            window.setTimeout(tick, 260);
            return;
          }
          window.setTimeout(tick, 1000 / (cps * 2)); // delete faster
        }
      };
      const t = window.setTimeout(tick, 300);
      return () => {
        active.current = false;
        window.clearTimeout(t);
      };
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
          {/* blinking block cursor on the live (loop) line */}
          {loop && i === rendered.length - 1 && (
            <span aria-hidden="true" className="ml-0.5 inline-block h-[1em] w-[0.55em] animate-blink bg-violet align-middle" />
          )}
        </p>
      ))}
    </div>
  );
}
