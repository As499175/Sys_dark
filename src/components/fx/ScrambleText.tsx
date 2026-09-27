"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "アイウエオカキクケコサシスセソABCDEF0123456789!<>-_\\/[]{}—=+*^?#";

interface ScrambleTextProps {
  text: string;
  className?: string;
  /** ms per character resolve step */
  speed?: number;
}

/**
 * Scramble-decode title: on entering the viewport, characters cycle through
 * random glyphs then settle left→right. Reduced motion → plain text.
 */
export function ScrambleText({ text, className, speed = 28 }: ScrambleTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        io.disconnect();

        let frame = 0;
        const total = text.length;
        const id = window.setInterval(() => {
          const resolved = Math.floor(frame / 2);
          const out = text
            .split("")
            .map((ch, i) => {
              if (ch === " ") return " ";
              if (i < resolved) return ch;
              return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            })
            .join("");
          setDisplay(out);
          frame += 1;
          if (resolved > total) {
            window.clearInterval(id);
            setDisplay(text);
          }
        }, speed);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [text, speed]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
}
