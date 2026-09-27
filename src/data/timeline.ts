export interface TimelineEntry {
  date: string;
  title: string;
  org: string;
  icon: "graduation" | "shield" | "flag" | "briefcase" | "bug" | "trophy";
  bullets: string[];
  /** TODO slots are marked in the bullets themselves. */
}

/** Journey timeline — verifiable items first, TODOs clearly marked. */
export const timeline: TimelineEntry[] = [
  {
    date: "JAN 2022",
    title: "Started B.Sc. in CSE",
    org: "Uttara University, Dhaka",
    icon: "graduation",
    bullets: [
      "Enrolled in Computer Science & Engineering.",
      "Fell down the security rabbit hole via club CTFs.",
    ],
  },
  {
    date: "2023 – 24",
    title: "Executive Member",
    org: "Cyber Security Club — Uttara University",
    icon: "shield",
    bullets: [
      "Ran weekly hands-on training sessions for members.",
      "Helped organise intra-university CTF events.",
    ],
  },
  {
    date: "2024 – 25",
    title: "Vice President",
    org: "Cyber Security Club — Uttara University",
    icon: "flag",
    bullets: [
      "Led workshops on OWASP, recon automation and secure coding.",
      "Grew active participation and mentored junior hunters.",
    ],
  },
  {
    date: "2025 – 26",
    title: "Vice President (continuing)",
    org: "Cyber Security Club — Uttara University",
    icon: "trophy",
    bullets: [
      "Driving AI × security research direction for the club.",
      "Building LLM-assisted tooling for vuln triage.",
    ],
  },
  {
    date: "TODO",
    title: "First bounty accepted",
    org: "TODO: program name (keep anonymous until public disclosure)",
    icon: "bug",
    bullets: [
      "TODO: fill with real event once a report is resolved publicly.",
      "TODO: class of vulnerability + lessons learned.",
    ],
  },
  {
    date: "TODO",
    title: "Internship / industry role",
    org: "TODO: company, role, dates",
    icon: "briefcase",
    bullets: [
      "TODO: add when it happens — do not fabricate.",
      "TODO: two concrete outcomes.",
    ],
  },
];
