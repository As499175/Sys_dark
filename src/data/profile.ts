/**
 * Single source of truth for identity/contact info.
 * Anything marked TODO must be filled with real data before launch.
 */
export const profile = {
  name: "Ashiqur Rahman Bhuiyan",
  fullName: "Md. Ashiqur Rahman Bhuiyan",
  handle: "@ashiq0x",
  initials: "AR",
  roles: [
    "AI Engineer",
    "Bug Bounty Hunter",
    "Full-Stack Developer",
    "Cyber Security Researcher",
    "Vice President @ CSC Uttara University",
  ] as const,
  tagline: {
    en: "I break systems to make them unbreakable — and build fast, beautiful interfaces that don't need breaking.",
    // EN ⇄ বাং toggle for the hero tagline (Bangla translation).
    bn: "আমি সিস্টেম ভাঙি অভঙ্গ করার জন্য — এবং এমন দ্রুত, সুন্দর ইন্টারফেস বানাই যেগুলোর ভাঙার প্রয়োজনই নেই।",
  },
  study: {
    degree: "B.Sc. in Computer Science & Engineering",
    university: "Uttara University",
    location: "Dhaka, Bangladesh",
  },
  expertise: ["Artificial Intelligence", "Cyber Security"] as const,
  leadership: [
    {
      role: "Vice President",
      org: "Cyber Security Club — Uttara University",
      session: "2024–25",
    },
    {
      role: "Vice President",
      org: "Cyber Security Club — Uttara University",
      session: "2025–26",
    },
    {
      role: "Executive Member",
      org: "Cyber Security Club — Uttara University",
      session: "2023–24",
    },
  ],
  /*
   * EDIT ME — put your REAL public email here (used by the contact page,
   * mailto fallback, JSON-LD and the console banner). Everything on the
   * site reads from this one file, so you never touch components.
   */
  email: "ashiq0x@example.com", // TODO: replace with your real email
  phone: "", // TODO: optional
  resumeUrl: "/cv.pdf", // TODO: drop a real CV PDF into /public as cv.pdf
  links: {
    github: "https://github.com/ashiq0x", // TODO: confirm GitHub username
    linkedin: "https://www.linkedin.com/in/md-ashiqur-rahman-a97638331/",
    hackerone: "https://hackerone.com/ashiq0x", // TODO: confirm HackerOne handle
    bugcrowd: "https://bugcrowd.com/ashiq0x", // TODO: confirm Bugcrowd handle
    x: "https://x.com/ashiq0x", // TODO: confirm X/Twitter handle
    club: "https://cybersecurity.club.uttara.ac.bd/about.html",
  },
  status: "AVAILABLE FOR WORK",
  availability: "Open to internships, freelance work & bug-bounty collabs.",
  responseTime: "Usually replies within 24 hours.",
  timezone: "Asia/Dhaka",
  stats: [
    { label: "Bugs Reported", value: 40, suffix: "+" }, // TODO: real count
    { label: "CTFs Played", value: 25, suffix: "+" }, // TODO: real count
    { label: "Projects Shipped", value: 18, suffix: "+" }, // TODO: real count
    { label: "Years in Security", value: 3, suffix: "+" },
  ],
} as const;

export type Profile = typeof profile;

/* ------------------------------------------------------------------ */
/*  DEPLOYMENT NOTES (GitHub Pages / Vercel / Netlify)                 */
/* ------------------------------------------------------------------ */
/* This site is designed to deploy FREE in two ways:
 *
 * 1) VERCEL (recommended — full features incl. /api/contact form):
 *    - Push this repo to GitHub, import it at vercel.com → done.
 *    - Set NEXT_PUBLIC_SITE_URL to your final URL for perfect SEO.
 *
 * 2) GITHUB PAGES (static only — no server, so the contact form
 *    automatically falls back to a mailto: link; nothing breaks):
 *    - In next.config.ts set:  basePath: "/<your-repo-name>", assetPrefix: "/<your-repo-name>"
 *      and output: "export". Then run `npm run build` and publish the
 *      `out/` folder via gh-pages (or Actions). Note: /api routes are
 *      not available on Pages; the UI already handles that gracefully.
 *
 * Everything else (name, links, stats, projects, timeline) lives in
 * src/data/*.ts — edit those files only. No component changes needed.
 */
