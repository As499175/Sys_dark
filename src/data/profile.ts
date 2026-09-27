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
  email: "ashiq0x@example.com", // TODO: replace with real public email
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
