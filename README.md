# ASHIQUR RAHMAN BHUIYAN — Portfolio (@ashiq0x)

Anime-cyberpunk / neon-sakura single-page portfolio built with:

- **Next.js 16** (App Router, `src/` directory) + **TypeScript (strict)**
- **Tailwind CSS v4** (`@theme` tokens in `src/app/globals.css`)
- **motion** (`motion/react`) for animation, **GSAP ScrollTrigger** for the pinned Journey timeline
- **three.js** via `@react-three/fiber` + `drei` + `postprocessing` (sakura particles, hero sphere)
- **Zod** contact-form validation + **Resend** email route (`/api/contact`, mailto fallback)

---

## Requirements

- **Node.js 20.9+** (Node 20 LTS or Node 22 recommended — Next.js 16 does not run on Node 18)
- npm 10+ (bundled with Node). Yarn/pnpm/bun also work.

## Run locally (development)

```bash
# 1. install dependencies
npm install

# 2. (optional) configure the contact form — without these the form
#    falls back to a mailto link, everything else still works
cp .env.example .env.local   # then fill in values (or just skip)

# 3. start the dev server
npm run dev
```

Open **http://localhost:3000**.

> Note: the first page load compiles the app (can take ~10-20 s on cold start);
> subsequent loads are fast. If the port is busy: `npm run dev -- -p 3001`.

If it fails to start, do a clean restart:

```bash
rm -rf .next node_modules && npm install && npm run dev
```

## Production build & preview

```bash
npm run build     # type-checks + builds optimized output
npm start         # serves http://localhost:3000 from .next
```

## Environment variables (all optional)

| Variable            | Purpose                                                        |
| ------------------- | -------------------------------------------------------------- |
| `RESEND_API_KEY`    | Enables real email sending from `/api/contact` (resend.com)    |
| `CONTACT_TO_EMAIL`  | Inbox that receives contact-form messages                      |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL used for SEO metadata / OG tags               |

Without `RESEND_API_KEY` the contact form gracefully falls back to a `mailto:` link.

## Quality checks

```bash
npm run lint
npx tsc --noEmit
```

## Deploy to Vercel

1. Push this repo to GitHub.
2. At [vercel.com/new](https://vercel.com/new) import the repo.
3. Framework preset **Next.js** (auto-detected). Root dir `./`.
4. Add env vars (`RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_SITE_URL`) under *Settings -> Environment Variables*.
5. Deploy. Update `NEXT_PUBLIC_SITE_URL` + profile links afterwards to your final domain.

## Where to edit content

All copy/data lives in typed files — single source of truth:

- `src/data/profile.ts`      — name, roles, links, stats, socials
- `src/data/projects.ts`     — project cards (marked `TODO:` placeholders)
- `src/data/skills.ts`       — radar chart values + skill groups + toolbox
- `src/data/timeline.ts`     — Journey entries (2022 → today + TODO slots)
- `src/data/achievements.ts` — trophy case + certifications + testimonials

Search the repo for `TODO:` to find every placeholder you must fill
(real repos, bounty stats, CTF ranks, cert IDs, CV file in `public/cv.pdf`).

## Easter eggs

- `Ctrl/Cmd + K` — command palette
- Konami code (up up down down left right left right B A) — GOD MODE
- Type `flag` in the About terminal — CTF flag

© Ashiqur Rahman Bhuiyan · Built with Next.js, Motion & Three.js · Designed in the dark
