export interface Achievement {
  title: string;
  detail: string;
  icon: "crown" | "shield" | "users" | "flag" | "bug" | "mic" | "badge";
  verified: boolean;
}

/** Trophy case — only verifiable facts are marked verified:true. TODOs stay explicit. */
export const achievements: Achievement[] = [
  {
    title: "Vice President — Cyber Security Club",
    detail:
      "Elected VP of the Uttara University Cyber Security Club for the 2024–25 and 2025–26 sessions. Set the technical direction: hands-on offensive training, CTF culture and AI×security research.",
    icon: "crown",
    verified: true,
  },
  {
    title: "Executive Member — Cyber Security Club",
    detail:
      "Served as Executive Member in the 2023–24 session, running weekly training and event logistics before being elected VP.",
    icon: "shield",
    verified: true,
  },
  {
    title: "Workshops & Seminars Led",
    detail:
      "Led/organised club workshops, seminars and hands-on training sessions. TODO: add event names, dates and attendee counts once confirmed.",
    icon: "users",
    verified: true,
  },
  {
    title: "CTF Participation & Ranks",
    detail:
      "Active CTF player (web / pwn / forensics). TODO: list specific events, platforms (CTFtime profile) and placements — do not invent ranks.",
    icon: "flag",
    verified: false,
  },
  {
    title: "Bug Bounty Acknowledgements",
    detail:
      "Responsible disclosure work in progress. TODO: add Hall-of-Fame entries and program names only where publicly acknowledged by the vendor.",
    icon: "bug",
    verified: false,
  },
  {
    title: "Talks & Mentoring",
    detail:
      "Delivered sessions and mentoring to juniors on security fundamentals. TODO: add talk titles, venues and dates.",
    icon: "mic",
    verified: false,
  },
  {
    title: "Certifications",
    detail:
      "TODO: list certifications with issuing body + credential ID (see Certifications section). None are claimed here until verifiable.",
    icon: "badge",
    verified: false,
  },
];

/** Testimonials — placeholders only; do NOT publish fake quotes. */
export interface Testimonial {
  quote: string;
  name: string;
  role: string;
}

export const testimonials: Testimonial[] = [
  {
    quote:
      "TODO: replace with a real quote. Suggested source: faculty advisor or club president on leadership during the 2024–25 season.",
    name: "TODO — Name",
    role: "TODO — Role, Organisation",
  },
  {
    quote:
      "TODO: replace with a real quote. Suggested source: project collaborator on a shipped full-stack build.",
    name: "TODO — Name",
    role: "TODO — Role, Organisation",
  },
  {
    quote:
      "TODO: replace with a real quote. Suggested source: CTF team lead or workshop attendee.",
    name: "TODO — Name",
    role: "TODO — Role, Organisation",
  },
];

/** Certifications marquee — all placeholders. TODO: verify each before launch. */
export const certifications: { name: string; issuer: string; id: string }[] = [
  { name: "CompTIA Security+", issuer: "CompTIA", id: "TODO: credential ID" },
  { name: "CEH", issuer: "EC-Council", id: "TODO: credential ID" },
  { name: "eJPT", issuer: "INE / eLearnSecurity", id: "TODO: credential ID" },
  { name: "TryHackMe Top-% Rank", issuer: "TryHackMe", id: "TODO: profile link" },
  { name: "HTB Sherpa/Top-%", issuer: "Hack The Box", id: "TODO: profile link" },
  { name: "Google Cybersecurity Certificate", issuer: "Coursera", id: "TODO: credential ID" },
  { name: "AI / ML Specialisation", issuer: "Coursera", id: "TODO: credential ID" },
];
