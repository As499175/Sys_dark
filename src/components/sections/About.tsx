"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Radar, Briefcase, Languages } from "lucide-react";
import { Section } from "@/components/fx/Section";
import { profile } from "@/data/profile";

interface Line {
  cmd?: string;
  out: string[];
}

const BOOT: Line[] = [
  {
    out: [
      "BIOS :: UTTARA-UNIVERSITY v2.6 .... OK",
      "kernel :: ashiq0x@dhaka ~ loading modules",
      "[ ok ] ai.module        (pytorch, langchain)",
      "[ ok ] appsec.module    (owasp, burp, recon)",
      "[ ok ] fullstack.module (next, node, postgres)",
    ],
  },
];

/** Small interactive shell with easter-egg commands: skills / contact / flag. */
function TerminalCard() {
  const [history, setHistory] = useState<Line[]>(BOOT);
  const [input, setInput] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // fake boot typing sequence
  useEffect(() => {
    const t1 = window.setTimeout(
      () => {
        setHistory((h) => [...h, { cmd: "whoami", out: ["md_ashiqur — ashiqr0x (uid=1337, groups=hackers,cse)"] }]);
      },
      900,
    );
    const t2 = window.setTimeout(
      () => {
        setHistory((h) => [
          ...h,
          {
            cmd: "cat about.md",
            out: [
              "# Ashiqur Rahman Bhuiyan",
              "CSE undergrad @ Uttara University · Dhaka",
              "AI + Cyber Security. I break things, then make",
              "them unbreakable — and ship the fixes.",
              "try: `skills` · `contact` · ???",
            ],
          },
        ]);
        setBooted(true);
      },
      1700,
    );
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const run = (raw: string) => {
    const cmd = raw.trim().toLowerCase();
    let out: string[] = [];
    switch (cmd) {
      case "skills":
        out = [
          "offense : OWASP Top 10 · Burp · Nmap · nuclei · Ghidra",
          "ai      : PyTorch · LLM/RAG · LangChain · sklearn",
          "build   : React · Next.js · TypeScript · Node · Postgres",
        ];
        break;
      case "contact":
        out = [`email    : ${profile.email}`, `linkedin : ${profile.links.linkedin}`, `github   : ${profile.links.github}`];
        break;
      case "flag":
        out = [
          "╔══════════════════════════════════════════╗",
          "║  FLAG{n30n_s4kur4_hunt3r_@shiq0x_2bd}      ║",
          "╚══════════════════════════════════════════╝",
          "> found it? email me, we should talk.",
        ];
        break;
      case "help":
        out = ["available: skills · contact · flag · whoami"];
        break;
      case "":
        out = [];
        break;
      default:
        out = [`zsh: command not found: ${cmd} (try 'help')`];
    }
    setHistory((h) => [...h, { cmd: raw, out }]);
  };

  return (
    <div
      className="hud-frame glass relative flex h-[26rem] flex-col overflow-hidden rounded-md font-mono text-[0.75rem]"
      onClick={() => inputRef.current?.focus()}
      data-cursor-hover
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 bg-ink px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-danger" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-ok" aria-hidden="true" />
        <span className="ml-2 text-muted">ashiq0x@dhaka: ~/about</span>
      </div>

      <div ref={scrollRef} className="flex-1 space-y-1 overflow-y-auto p-4 leading-relaxed">
        {history.map((line, i) => (
          <div key={i}>
            {line.cmd !== undefined && (
              <p>
                <span className="text-magenta">➜ </span>
                <span className="text-violet">~ </span>
                <span className="text-cyan">{line.cmd}</span>
              </p>
            )}
            {line.out.map((o, j) => (
              <p key={j} className="whitespace-pre-wrap text-muted">
                {o}
              </p>
            ))}
          </div>
        ))}
        {booted && (
          <p className="flex items-center gap-1">
            <span className="text-magenta">➜ </span>
            <span className="text-violet">~ </span>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  run(input);
                  setInput("");
                }
              }}
              aria-label="Terminal input — try skills, contact or flag"
              className="flex-1 border-none bg-transparent text-text caret-cyan outline-none"
              spellCheck={false}
              autoComplete="off"
            />
            <span className="animate-blink text-cyan">▊</span>
          </p>
        )}
      </div>
    </div>
  );
}

const TILES = [
  { Icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
  { Icon: Radar, label: "Focus", value: "AI + Application Security" },
  { Icon: Briefcase, label: "Status", value: "Open to internships & bug bounty collabs" },
  { Icon: Languages, label: "Languages", value: "Bangla, English" },
];

export function About() {
  return (
    <Section id="about" kicker="ABOUT" kickerJp="自己紹介" title="Hacker, builder, club lead">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
        <TerminalCard />
        <div className="space-y-5 text-sm leading-relaxed text-muted sm:text-base">
          <p>
            I&apos;m a Computer Science &amp; Engineering student at Uttara University in Dhaka,
            splitting my time between two obsessions: <span className="text-text">artificial
            intelligence</span> and <span className="text-text">cyber security</span>. One builds
            systems that think; the other finds where they lie. I like living in the gap between them.
          </p>
          <p>
            On the offensive side I work the full loop — recon → exploit → responsible disclosure.
            Subdomain enumeration, nuclei sweeps, manual testing past the automated noise, then a
            report clean enough that a triager can reproduce it in five minutes. As Vice President of
            our Cyber Security Club I teach that same loop to newer students, because a community of
            hunters beats a lone one.
          </p>
          <p>
            On the build side I&apos;m a full-stack developer: Next.js and TypeScript up front,
            Node and PostgreSQL behind, AI features wired in where they earn their keep. I care about
            performance budgets, keyboard paths and honest interfaces — products you can ship on Friday
            and still defend on Monday.
          </p>
        </div>
      </div>

      {/* info tiles */}
      <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-label="Quick facts">
        {TILES.map(({ Icon, label, value }) => (
          <li key={label} className="hud-frame hud-frame-h4 relative border border-white/8 bg-ink p-5">
            <Icon className="mb-3 h-4 w-4 text-cyan" aria-hidden="true" />
            <p className="font-mono text-[0.6rem] uppercase tracking-[0.3em] text-muted">{label}</p>
            <p className="mt-1.5 text-sm font-medium text-text">{value}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}
