import type { Metadata, Viewport } from "next";
import { Orbitron, Space_Grotesk, JetBrains_Mono, Noto_Sans_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { profile } from "@/data/profile";

/* Fonts: next/font (self-hosted at build time), display swap by default. */
const orbitron = Orbitron({ subsets: ["latin"], weight: ["700", "900"], variable: "--font-orbitron", display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-space-grotesk", display: "swap" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-jetbrains-mono", display: "swap" });
const notoSansJp = Noto_Sans_JP({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-noto-sans-jp", display: "swap" });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ashiq0x.vercel.app"; // TODO: set real URL

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} (@${profile.handle.replace("@", "")}) — AI · Cyber Security · Bug Bounty`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Bug bounty hunter, full-stack developer and AI/security researcher. B.Sc. CSE student at Uttara University, Dhaka. Vice President of the Cyber Security Club.",
  keywords: [
    "Ashiqur Rahman Bhuiyan",
    "ashiq0x",
    "bug bounty hunter",
    "cyber security",
    "artificial intelligence",
    "full stack developer",
    "Next.js",
    "Uttara University",
    "Dhaka",
    "OWASP",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${profile.name} — Portfolio`,
    title: `${profile.name} — AI & Cyber Security`,
    description: "I break systems to make them unbreakable — and build fast, beautiful interfaces that don't need breaking.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Neon cyberpunk portfolio cover for Ashiqur Rahman Bhuiyan" }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI & Cyber Security`,
    description: "Bug bounty hunter · Full-stack developer · VP, Cyber Security Club, Uttara University.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#05060A",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  alternateName: profile.handle,
  url: SITE_URL,
  email: `mailto:${profile.email}`,
  jobTitle: ["Bug Bounty Hunter", "Full-Stack Web Developer", "AI Engineer"],
  knowsAbout: [...profile.expertise, "Bug Bounty", "OWASP Top 10", "Next.js", "Python"],
  alumniOf: { "@type": "CollegeOrUniversity", name: "Uttara University", address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" } },
  sameAs: [profile.links.linkedin, profile.links.github, profile.links.hackerone, profile.links.x, profile.links.club],
  worksFor: { "@type": "Organization", name: "Cyber Security Club, Uttara University" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${orbitron.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansJp.variable}`}>
      <body className="min-h-screen bg-void font-sans text-text antialiased">
        {/* skip-to-content */}
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded focus:border focus:border-cyan focus:bg-ink focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-cyan"
        >
          Skip to content
        </a>

        {/* JSON-LD Person schema (SEO) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {children}

        {/* Console ASCII banner easter egg */}
        <Script id="console-banner" strategy="afterInteractive">
          {`console.log("%c  ▄▄▄ ASHIQUR RAHMAN BHUIYAN @ashiq0x\\n  AI × Cyber Security × Full-Stack\\n  Reading the console? You're my kind of person.\\n  Hiring / collaborating → ${profile.email}", "color:#00F0FF;font-family:monospace;font-size:12px;");`}
        </Script>
      </body>
    </html>
  );
}
