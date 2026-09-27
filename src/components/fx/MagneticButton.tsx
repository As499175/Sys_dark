"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  strength?: number;
  download?: boolean;
  target?: string;
  rel?: string;
  ariaLabel?: string;
}

/** Button/link that pulls toward the cursor within a radius. */
export function MagneticButton({
  children,
  className,
  href,
  onClick,
  strength = 12,
  download,
  target,
  rel,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * strength * 2);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * strength * 2);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const inner = (
    <motion.span
      whileTap={{ scale: 0.96 }}
      className={cn("inline-flex items-center justify-center gap-2", className)}
    >
      {children}
    </motion.span>
  );

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className="inline-block">
      <motion.div style={{ x: sx, y: sy }}>
        {href ? (
          <a
            href={href}
            download={download}
            target={target}
            rel={rel}
            aria-label={ariaLabel}
            className="block"
          >
            {inner}
          </a>
        ) : (
          <button type="button" onClick={onClick} aria-label={ariaLabel} className="block">
            {inner}
          </button>
        )}
      </motion.div>
    </div>
  );
}
