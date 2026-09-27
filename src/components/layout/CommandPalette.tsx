"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { cn } from "@/lib/utils";

interface Cmd {
  id: string;
  label: string;
  hint: string;
  run: () => void;
}

/** Fuzzy subsequence match — good enough for a palette. */
function fuzzy(query: string, text: string): boolean {
  const q = query.toLowerCase();
  const t = text.toLowerCase();
  let i = 0;
  for (const ch of t) {
    if (ch === q[i]) i++;
    if (i === q.length) return true;
  }
  return q.length === 0;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  onToggleSakura: () => void;
  sakuraOn: boolean;
}

export function CommandPalette({ open, onClose, onToggleSakura, sakuraOn }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const commands = useMemo<Cmd[]>(() => {
    const sections = ["About", "Skills", "Projects", "Journey", "Achievements", "Bounty", "Certifications", "Contact"].map((s) => ({
      id: `nav-${s}`,
      label: `Go to ${s}`,
      hint: `#${s.toLowerCase()}`,
      run: () => document.getElementById(s.toLowerCase() === "bounty" ? "bounty" : s.toLowerCase())?.scrollIntoView({ behavior: "smooth" }),
    }));
    const projs = projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: p.title,
      hint: `/projects/${p.slug}`,
      run: () => router.push(`/projects/${p.slug}`),
    }));
    const actions: Cmd[] = [
      {
        id: "copy-email",
        label: "Copy email",
        hint: "clipboard",
        run: () => {
          navigator.clipboard?.writeText(profile.email).catch(() => {});
        },
      },
      { id: "download-cv", label: "Download CV", hint: profile.resumeUrl, run: () => router.push(profile.resumeUrl) },
      { id: "toggle-sakura", label: `${sakuraOn ? "Disable" : "Enable"} sakura particles`, hint: "fx", run: onToggleSakura },
      { id: "god-mode", label: "Toggle GOD MODE theme", hint: "easter egg", run: () => document.documentElement.classList.toggle("god-mode") },
      { id: "top", label: "Scroll to top", hint: "home", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
    ];
    return [...sections, ...projs, ...actions];
  }, [onToggleSakura, sakuraOn, router]);

  const filtered = useMemo(() => commands.filter((c) => fuzzy(query, c.label)), [commands, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSel(0);
      window.setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowDown") { e.preventDefault(); setSel((s) => Math.min(s + 1, filtered.length - 1)); }
      else if (e.key === "ArrowUp") { e.preventDefault(); setSel((s) => Math.max(s - 1, 0)); }
      else if (e.key === "Enter") { e.preventDefault(); filtered[sel]?.run(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, filtered, sel, onClose]);

  useEffect(() => {
    listRef.current?.children[sel]?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[80] flex items-start justify-center bg-void/80 px-4 pt-[18vh] backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="hud-frame glass w-full max-w-xl overflow-hidden rounded-md border-white/15"
          >
            <div className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
              <span className="font-mono text-cyan" aria-hidden="true">❯</span>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSel(0); }}
                placeholder="Type a command or search…"
                aria-label="Command search"
                className="flex-1 bg-transparent font-mono text-sm text-text outline-none placeholder:text-muted"
              />
              <kbd className="rounded border border-white/15 px-1.5 py-0.5 font-mono text-[0.6rem] text-muted">ESC</kbd>
            </div>
            <ul ref={listRef} className="max-h-72 overflow-y-auto p-2" role="listbox" aria-label="Commands">
              {filtered.length === 0 && (
                <li className="px-3 py-6 text-center font-mono text-xs text-muted">{"// no signal"}</li>
              )}
              {filtered.map((c, i) => (
                <li key={c.id} role="option" aria-selected={i === sel}>
                  <button
                    type="button"
                    onMouseEnter={() => setSel(i)}
                    onClick={() => { c.run(); onClose(); }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-sm px-3 py-2 text-left font-mono text-xs transition-colors",
                      i === sel ? "bg-cyan/10 text-cyan" : "text-muted hover:bg-white/5",
                    )}
                  >
                    <span>{c.label}</span>
                    <span className="text-[0.6rem] text-muted opacity-70">{c.hint}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="border-t border-white/10 px-4 py-2 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
              ↑↓ navigate · ⏎ execute · ashiq0x // ctrl+k
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
