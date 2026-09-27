"use client";

import { cn } from "@/lib/utils";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "span" | "h1" | "h2" | "div";
}

/**
 * Text glitch-on-hover: 3 RGB-split layers (base + cyan A + magenta B).
 * The glitch keyframes are global CSS (globals.css); hover activation lives
 * in globals.css under `.glitch:hover .glitch-a`. Reduced-motion users get
 * static text because the media query zeroes animation durations.
 */
export function GlitchText({ text, className, as: Tag = "span" }: GlitchTextProps) {
  return (
    <Tag className={cn("glitch group relative inline-block", className)} data-text={text}>
      {/* base layer — accessible text */}
      <span className="relative z-10">{text}</span>
      {/* RGB split layers (decorative) */}
      <span
        aria-hidden="true"
        className="glitch-a absolute inset-0 z-0 text-cyan opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90"
      >
        {text}
      </span>
      <span
        aria-hidden="true"
        className="glitch-b absolute inset-0 z-0 text-magenta opacity-0 group-hover:opacity-90 group-focus-visible:opacity-90"
      >
        {text}
      </span>
    </Tag>
  );
}
