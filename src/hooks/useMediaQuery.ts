"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns null on server, boolean after mount. */
export function useMediaQuery(query: string): boolean | null {
  const [matches, setMatches] = useState<boolean | null>(null);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export function usePrefersReducedMotion(): boolean {
  const matches = useMediaQuery("(prefers-reduced-motion: reduce)");
  return matches === true;
}

export function useIsMobile(): boolean {
  const matches = useMediaQuery("(max-width: 768px)");
  return matches === true;
}
