"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Quote } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { testimonials } from "@/data/achievements";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

/** 3 quote cards, auto-rotating every 6s with manual dots. */
export function Testimonials() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return; // no autoplay for reduced-motion users
    const id = window.setInterval(() => setIndex((i) => (i + 1) % testimonials.length), 6000);
    return () => window.clearInterval(id);
  }, [reduced]);

  const t = testimonials[index] ?? testimonials[0];
  if (!t) return null;

  return (
    <Section id="testimonials" kicker="TESTIMONIALS" kickerJp="推薦" title="Word on the street">
      <div className="relative mx-auto max-w-3xl">
        <AnimatePresence mode="wait">
          <motion.figure
            key={index}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hud-frame glass relative rounded-md p-8 text-center md:p-10"
          >
            <Quote className="mx-auto mb-4 h-6 w-6 text-magenta" aria-hidden="true" />
            <blockquote className="text-sm leading-relaxed text-text sm:text-base">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-6 flex items-center justify-center gap-3">
              {/* avatar ring */}
              <span className="grid h-11 w-11 place-items-center rounded-full border-2 border-cyan/70 bg-ink font-display text-xs font-bold text-cyan shadow-glow-cyan" aria-hidden="true">
                {t.name.replace("TODO — ", "").slice(0, 2).toUpperCase()}
              </span>
              <span className="text-left">
                <span className="block text-sm font-medium text-text">{t.name}</span>
                <span className="block font-mono text-[0.62rem] uppercase tracking-widest text-muted">{t.role}</span>
              </span>
            </figcaption>
            {/* neon underline */}
            <span className="absolute bottom-4 left-1/2 h-px w-24 -translate-x-1/2 bg-gradient-to-r from-transparent via-cyan to-transparent" aria-hidden="true" />
          </motion.figure>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-center gap-3" role="tablist" aria-label="Testimonial selector">
          {testimonials.map((_, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === index}
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-2 w-8 rounded-full transition-all",
                i === index ? "bg-cyan shadow-glow-cyan" : "bg-ink2 hover:bg-muted",
              )}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
