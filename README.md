# alexcavazos.com

Personal site of Alejandro "Alex" Cavazos — a terminal-style lander and a CV, in English and Spanish.

| Route | What |
|---|---|
| `/` · `/es` | Lander (EN / ES) |
| `/cv` · `/es/cv` | CV (EN / ES) |
| `/alejandro-cavazos-cv-en.pdf` · `/alejandro-cavazos-cv-es.pdf` | CV as static PDF |

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4.

## Scripts

```bash
npm install
npm run dev        # dev server on :3000
npm run build      # production build
npm run start      # serve the build
npm run lint       # eslint .
npm run typecheck  # tsc --noEmit
npm run cv:pdf     # regenerate the CV PDFs in public/
```

Set `NEXT_DIST_DIR` (e.g. `NEXT_DIST_DIR=.next-cv npm run dev -- -p 3001`) to run several
servers side by side without sharing `.next/`.

## CV PDFs

`scripts/cv-pdf.mjs` renders `/cv` and `/es/cv` with `playwright-core` driving the system Chromium
(`/usr/bin/chromium`, no browser download) and writes `public/alejandro-cavazos-cv-{en,es}.pdf`.
They are committed static files — rerun `npm run cv:pdf` whenever the CV content changes.

## Where things live

- **`content/facts.md` — source of truth (local only, gitignored).** Every claim on the site and in the CV must come from it,
  including its "NEVER publish" rules.
- `content/lander.ts`, `content/cv.ts` — the EN/ES copy, typed (`LanderContent`, `CvContent`).
- `components/lander/`, `components/cv/` — the two page UIs; `app/**/page.tsx` are thin wrappers.
- `app/(en)/layout.tsx`, `app/(es)/layout.tsx` — one root layout per language (correct `<html lang>`).
- `app/globals.css` — design tokens (dark terminal default, warm-paper light theme).
- `lib/site.ts` — `SITE_URL`, locales, link/path helpers; `lib/theme.ts` — theme bootstrap.

Theme: follows the OS by default; a saved choice in `localStorage["theme"]` (`"dark"`/`"light"`) is
applied as `<html data-theme>` before first paint.
