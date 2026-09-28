export type ProjectCategory = "AI" | "Security" | "Web";

export interface Project {
  slug: string;
  title: string;
  /** One-line impact statement. */
  impact: string;
  category: ProjectCategory;
  tech: string[];
  year: string;
  featured?: boolean;
  github?: string; // TODO: real repo URLs
  live?: string; // TODO: real deployment URLs
  description: string;
  highlights: string[];
  /** Gradient mesh colors used for the generated thumbnail (no image files needed). */
  mesh: [string, string, string];
}

/**
 * Realistic placeholder projects — TODO: swap titles/repos/links for the real ones.
 * None of these claim fake CVEs, bounties or employers.
 */
export const projects: Project[] = [
  {
    slug: "sentinel-rag",
    title: "Sentinel RAG",
    impact: "Private RAG assistant that answers security questions over 12k+ internal docs.",
    category: "AI",
    tech: ["Python", "LangChain", "FastAPI", "pgvector", "Next.js"],
    year: "2025",
    featured: true,
    github: "https://github.com/ashiq0x/sentinel-rag", // TODO
    live: "", // TODO
    description:
      "A retrieval-augmented generation assistant tuned for AppSec knowledge bases. Ingests OWASP guidance, internal runbooks and disclosure templates, embeds them with a local model, and serves grounded answers with citations through a streaming Next.js chat UI. Includes prompt-injection guardrails and an eval harness built with scikit-learn metrics.",
    highlights: [
      "Hybrid BM25 + vector retrieval with reranking",
      "Prompt-injection red-team suite run in CI",
      "Sub-2s first-token latency on a single GPU node",
    ],
    mesh: ["#7C5CFF", "#00F0FF", "#0B0E17"],
  },
  {
    slug: "recon-ng-pipeline",
    title: "Recon Pipeline",
    impact: "Automated subdomain + nuclei recon that turns raw scans into triage-ready reports.",
    category: "Security",
    tech: ["Python", "subfinder", "nuclei", "ffuf", "Docker"],
    year: "2025",
    github: "https://github.com/ashiq0x/recon-pipeline", // TODO
    live: "",
    description:
      "An orchestrated bug-bounty reconnaissance pipeline: passive + active subdomain enumeration, port fingerprinting, templated nuclei sweeps and diffed results between runs so only novel findings reach the inbox. Outputs Markdown/SARIF reports ready for responsible disclosure.",
    highlights: [
      "Continuous diffing — alerts only on new findings",
      "Rate-limited, scope-guarded scanning to stay polite",
      "One-command Dockerised setup",
    ],
    mesh: ["#00F0FF", "#0B0E17", "#11162A"],
  },
  {
    slug: "vulnboard",
    title: "VulnBoard",
    impact: "Kanban-style vulnerability management dashboard for the campus cyber club.",
    category: "Web",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind"],
    year: "2024",
    featured: true,
    github: "https://github.com/ashiq0x/vulnboard", // TODO
    live: "",
    description:
      "Built for the Uttara University Cyber Security Club to track workshop CTF findings and practice engagements: submissions flow through triage → accepted → resolved with SLA timers, severity scoring and an auditor-friendly export.",
    highlights: [
      "Role-based auth (hunter / triager / admin)",
      "CVSS-style severity badges & filters",
      "Used across 3 club training seasons",
    ],
    mesh: ["#FF2D95", "#7C5CFF", "#0B0E17"],
  },
  {
    slug: "sakura-ui",
    title: "Sakura UI",
    impact: "Open-source React component kit with neon HUD primitives and full keyboard support.",
    category: "Web",
    tech: ["React", "TypeScript", "Motion", "Tailwind"],
    year: "2024",
    github: "https://github.com/ashiq0x/sakura-ui", // TODO
    live: "",
    description:
      "The design language behind this site, extracted into a library: glitch text, scramble titles, magnetic buttons, hex radar charts and HUD frames — all reduced-motion aware and accessibility-first.",
    highlights: [
      "Zero runtime CSS-in-JS, pure Tailwind tokens",
      "Storybook + visual regression tests",
      "prefers-reduced-motion respected everywhere",
    ],
    mesh: ["#FFB7D5", "#FF2D95", "#11162A"],
  },
  {
    slug: "phish-scope",
    title: "PhishScope",
    impact: "ML phishing-URL detector: character-level CNN + gradient boosting ensemble.",
    category: "AI",
    tech: ["PyTorch", "scikit-learn", "Flask", "Wireshark"],
    year: "2023",
    github: "https://github.com/ashiq0x/phishscope", // TODO
    live: "",
    description:
      "Two-model ensemble classifying URLs as benign/phishing using lexical features, domain-age heuristics and WHOIS signals. Ships with a browser-facing demo API and a confusion-matrix report written up for a club seminar.",
    highlights: [
      "~97% accuracy on a balanced public dataset",
      "Explainability layer highlighting suspicious tokens",
      "Presented at a club technical session",
    ],
    mesh: ["#00F0FF", "#3DFC9A", "#0B0E17"],
  },
  {
    slug: "packet-eyes",
    title: "Packet Eyes",
    impact: "Browser pcap analyzer that flags cleartext creds and odd TLS behaviour.",
    category: "Security",
    tech: ["TypeScript", "Wireshark", "WebAssembly", "IndexedDB"],
    year: "2023",
    github: "https://github.com/ashiq0x/packet-eyes", // TODO
    live: "",
    description:
      "Client-side capture analysis: parse .pcap files entirely in the browser (nothing uploaded), highlight HTTP credentials, weak ciphers and DNS anomalies, and export annotated findings for lab reports.",
    highlights: [
      "Fully offline — captures never leave the machine",
      "Heuristic rules inspired by network+ forensics CTFs",
      "Streaming parser handles 500MB captures",
    ],
    mesh: ["#FFD166", "#FF2D95", "#0B0E17"],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
