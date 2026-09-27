"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
import { ScrambleText } from "@/components/fx/ScrambleText";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  kicker: string;
  kickerJp?: string;
  title: string;
  children: ReactNode;
  className?: string;
}

/** Standard section wrapper: staggered fade+slide-up entrance + scramble title. */
export function Section({ id, kicker, kickerJp, title, children, className }: SectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8 md:py-32", className)}
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="kicker mb-3">
          // {kicker} {kickerJp ? <span className="jp">— {kickerJp}</span> : null}
        </p>
        <h2
          id={`${id}-title`}
          className="font-display text-3xl font-bold uppercase tracking-tight text-text md:text-5xl"
        >
          <ScrambleText text={title} />
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
        className="mt-10"
      >
        {children}
      </motion.div>
    </section>
  );
}
