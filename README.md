# alexcavazos.com

Personal site of Alejandro "Alex" Cavazos — a terminal-style lander and a CV (English only).

| Route | What |
|---|---|
| `/` | Lander (with a one-time intro; `/es` redirects here) |
| `/cv` | CV (`/es/cv` redirects here) |
| `/alejandro-cavazos-cv.pdf` | CV as static PDF |
| `/llms.txt` | Plain-text summary for AI agents |

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4.

## Scripts

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run cv:pdf     # regenerate the CV PDF in public/
```

Set `NEXT_DIST_DIR` (e.g. `NEXT_DIST_DIR=.next-cv npm run dev -- -p 3001`) to run several
servers side by side without sharing `.next/`.

## CV PDF

`scripts/cv-pdf.mjs` renders `/cv` with `playwright-core` driving the system Chromium
(`/usr/bin/chromium`, no browser download) and writes `public/alejandro-cavazos-cv.pdf`.
It is a committed static file — rerun `npm run cv:pdf` whenever the CV content changes.

## Icons and social cards

- `app/icon.svg` is the source icon; `app/favicon.ico` (16/32/48), `app/apple-icon.png` (180) and
  `public/icon-512.png` are rendered from it with ImageMagick.
- `app/opengraph-image.tsx` / `app/twitter-image.tsx` (and the `/cv` variants) render the 1200×630
  card with `next/og`, using the JetBrains Mono files in `components/lander/og/`.

## Where things live

- **`content/facts.md` — source of truth (local only, gitignored).** Every claim on the site and in the CV must come from it,
  including its "NEVER publish" rules.
- `content/lander.ts`, `content/cv.ts` — the copy, typed (`LanderContent`, `CvContent`).
- `components/lander/`, `components/cv/` — the two page UIs; `app/**/page.tsx` are thin wrappers.
- `app/layout.tsx` + `lib/layout.tsx` — root document and site-wide metadata.
- `app/globals.css` — design tokens (dark terminal default, light theme).
- `lib/site.ts` — `SITE_URL`, links, CV path; `lib/theme.ts` — theme bootstrap.

Theme: follows the OS by default; a saved choice in `localStorage["theme"]` (`"dark"`/`"light"`) is
applied as `<html data-theme>` before first paint.
