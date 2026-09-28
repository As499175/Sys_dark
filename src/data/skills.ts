export interface SkillItem {
  name: string;
  /** Proficiency 0–100 (self-assessed, honest). */
  level: number;
}

export interface SkillGroup {
  title: string;
  jp: string;
  accent: "cyan" | "magenta" | "violet";
  skills: SkillItem[];
}

/** Radar axes for the hexagon chart. */
export const radarAxes: SkillItem[] = [
  { name: "Web Security", level: 88 },
  { name: "AI / ML", level: 82 },
  { name: "Backend", level: 78 },
  { name: "Frontend", level: 85 },
  { name: "DevOps", level: 65 },
  { name: "OSINT", level: 74 },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & DATA",
    jp: "人工知能",
    accent: "violet",
    skills: [
      { name: "Python", level: 90 },
      { name: "PyTorch / TensorFlow", level: 78 },
      { name: "scikit-learn", level: 82 },
      { name: "LLM & RAG apps", level: 84 },
      { name: "LangChain", level: 76 },
      { name: "Prompt engineering", level: 88 },
      { name: "MLOps basics", level: 60 },
      { name: "Data pipelines", level: 70 },
    ],
  },
  {
    title: "CYBER SECURITY",
    jp: "サイバーセキュリティ",
    accent: "cyan",
    skills: [
      { name: "OWASP Top 10", level: 92 },
      { name: "Burp Suite", level: 86 },
      { name: "Nmap", level: 84 },
      { name: "Metasploit", level: 72 },
      { name: "Wireshark", level: 78 },
      { name: "Ghidra", level: 55 },
      { name: "SQLi / XSS / SSRF / IDOR", level: 90 },
      { name: "Recon (subfinder, nuclei, ffuf)", level: 85 },
      { name: "CTF (web / pwn / forensics)", level: 80 },
      { name: "Threat modelling", level: 70 },
      { name: "Secure code review", level: 75 },
      { name: "OSINT", level: 74 },
    ],
  },
  {
    title: "WEB DEV",
    jp: "ウェブ開発",
    accent: "magenta",
    skills: [
      { name: "React", level: 88 },
      { name: "Next.js", level: 86 },
      { name: "TypeScript", level: 84 },
      { name: "Tailwind CSS", level: 90 },
      { name: "Node.js", level: 80 },
      { name: "Express", level: 78 },
      { name: "PostgreSQL / MongoDB", level: 74 },
      { name: "REST & GraphQL", level: 80 },
      { name: "Docker", level: 66 },
      { name: "Git", level: 85 },
      { name: "Vercel / AWS", level: 70 },
      { name: "Figma → code", level: 76 },
    ],
  },
];

/** Toolbox marquee entries — `icon` maps to a simple-icons slug when available. */
export const toolbox: { name: string; icon?: string }[] = [
  { name: "Python", icon: "python" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "scikit-learn", icon: "scikitlearn" },
  { name: "LangChain" },
  { name: "Burp Suite", icon: "burpsuite" },
  { name: "Nmap", icon: "nmap" },
  { name: "Wireshark", icon: "wireshark" },
  { name: "Metasploit", icon: "metasploit" },
  { name: "Kali Linux", icon: "kalilinux" },
  { name: "React", icon: "react" },
  { name: "Next.js", icon: "nextdotjs" },
  { name: "TypeScript", icon: "typescript" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "Docker", icon: "docker" },
  { name: "Git", icon: "git" },
  { name: "AWS", icon: "amazonaws" },
  { name: "Vercel", icon: "vercel" },
  { name: "Figma", icon: "figma" },
];

/** OWASP Top 10 (2021) chip cloud used in the Bug Bounty section. */
export const owaspTop10 = [
  { id: "A01", name: "Broken Access Control", note: "IDOR, missing function-level auth, forced browsing." },
  { id: "A02", name: "Cryptographic Failures", note: "Cleartext transport, weak hashing, leaked keys." },
  { id: "A03", name: "Injection", note: "SQLi, NoSQLi, command injection, SSTI." },
  { id: "A04", name: "Insecure Design", note: "Missing threat modelling, business-logic flaws." },
  { id: "A05", name: "Security Misconfiguration", note: "Default creds, verbose errors, open buckets." },
  { id: "A06", name: "Vulnerable Components", note: "Outdated libs, known-CVE dependencies." },
  { id: "A07", name: "Auth Failures", note: "Session fixation, credential stuffing, no MFA." },
  { id: "A08", name: "Software & Data Integrity", note: "Unsafe deserialization, unsigned updates." },
  { id: "A09", name: "Logging & Monitoring Gaps", note: "Blind SOC pipelines, no alert on brute force." },
  { id: "A10", name: "SSRF", note: "Cloud metadata pivots, protocol smuggling." },
] as const;
