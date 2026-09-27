"use client";

import { useEffect, useRef, useState } from "react";
import { Section } from "@/components/fx/Section";
import { owaspTop10 } from "@/data/skills";
import { TypingTerminal } from "@/components/fx/TypingTerminal";
import { usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const SCAN_LINES = [
  "$ subfinder -d target.com | httpx -silent",
  "  ↳ 47 live hosts · 6 out-of-scope dropped",
  "$ nuclei -t cves.json -severity high -o findings.jsonl",
  "  ↳ [IDOR] /api/v1/invoices?order_id=… — medium",
  "  ↳ [SSRF ] webhook fetch follows 302 to 169.254.169.254",
  "$ manual pass: auth matrix + business logic abuse cases",
  "  ↳ confirmed chain: low-priv user → org data read",
  "$ report --template full --poc video+curl",
  "  ↳ submitted via HackerOne program policy",
  "[ triager ] reproduced ✔ · awaiting bounty decision",
];

const METHOD = ["Recon", "Enumerate", "Exploit", "Report", "Remediate"] as const;

/** Hall of Fame — TODO: only list programs that publicly acknowledge you. */
const HOF: string[] = [
  // "TODO: Program name — acknowledgement page link",
];

export function BugBounty() {
  const reduced = usePrefersReducedMotion();
  const [done, setDone] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && setVisible(true), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Section id="bounty" kicker="BUG BOUNTY / RESEARCH" kickerJp="バグバウンティ" title="Live from the shell">
      <div ref={ref} className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        {/* mock scan terminal */}
        <div className="hud-frame glass relative overflow-hidden rounded-md" role="img" aria-label="Simulated bug-bounty recon terminal showing a scan from subdomain enumeration to a triaged report">
          <div className="flex items-center justify-between border-b border-white/10 bg-ink px-4 py-2.5 font-mono text-[0.68rem]">
            <span className="text-muted">ashiq0x@recon: ~/engagement</span>
            <button
              type="button"
              onClick={() => { setDone(false); setRestartKey((k) => k + 1); }}
              className="rounded-sm border border-white/10 px-2 py-0.5 text-cyan transition-colors hover:border-cyan/60"
            >
              ↻ rerun
            </button>
          </div>
          <div className="min-h-[16rem] p-4">
            {visible && (
              <TypingTerminal key={restartKey} lines={SCAN_LINES} onDone={() => setDone(true)} cps={reduced ? 100000 : 60} />
            )}
            {done && (
              <p className="mt-2 font-mono text-xs text-ok" style={{ textShadow: "0 0 12px rgba(61,252,154,.5)" }}>
                ▸ STATUS: TRIAGED ✔ — responsible disclosure, always.
              </p>
            )}
          </div>
        </div>

        {/* methodology + OWASP chips */}
        <div className="flex flex-col gap-6">
          <ol className="hud-frame relative border border-white/8 bg-ink p-5" aria-label="Testing methodology">
            <li className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">Methodology</li>
            <div className="flex flex-wrap items-center gap-y-2">
              {METHOD.map((m, i) => (
                <span key={m} className="flex items-center">
                  <span className="rounded-sm border border-violet/40 bg-ink-2 px-2.5 py-1 font-mono text-[0.66rem] uppercase tracking-widest text-text">
                    {m}
                  </span>
                  {i < METHOD.length - 1 && <span className="mx-1.5 text-cyan" aria-hidden="true">▸</span>}
                </span>
              ))}
            </div>
          </ol>

          <div className="hud-frame relative border border-white/8 bg-ink p-5">
            <p className="mb-3 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">OWASP Top 10 — hunting ground</p>
            <ul className="flex flex-wrap gap-2" aria-label="OWASP Top 10 categories">
              {owaspTop10.map((c) => (
                <li key={c.id}>
                  <span
                    tabIndex={0}
                    title={c.note}
                    aria-describedby={`owasp-${c.id}`}
                    className="cursor-help rounded-sm border border-danger/40 bg-ink-2 px-2 py-1 font-mono text-[0.62rem] text-muted transition-all hover:border-danger hover:text-danger hover:shadow-[0_0_14px_rgba(255,59,59,0.3)] focus-visible:border-danger"
                  >
                    {c.id} {c.name}
                  </span>
                  <span id={`owasp-${c.id}`} className="sr-only">{c.note}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-l-2 border-cyan/60 bg-ink p-4 text-xs leading-relaxed text-muted">
            <p className="mb-1 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-cyan">Responsible Disclosure Policy</p>
            I only test in-scope assets, never access or exfiltrate real user data, give vendors time to
            fix before any public mention, and share full reproduction steps with every report.
          </div>

          <div className="hud-frame relative border border-white/8 bg-ink p-5">
            <p className="mb-2 font-mono text-[0.6rem] uppercase tracking-[0.3em] text-gold">Hall of Fame</p>
            {HOF.length === 0 ? (
              <p className="text-xs text-muted">
                TODO: acknowledgements will appear here as programs publish them. Nothing listed until it exists.
              </p>
            ) : (
              <ul className="space-y-1 text-xs text-text">{HOF.map((h) => <li key={h}>✔ {h}</li>)}</ul>
            )}
          </div>
        </div>
      </div>
    </Section>
  );
}
