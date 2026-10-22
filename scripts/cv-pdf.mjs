#!/usr/bin/env node
/**
 * Renders the CV page to a static PDF in public/.
 *
 *   npm run build && npm start -- -p 3102   (or any running server)
 *   npm run cv:pdf [-- http://localhost:3102]
 *
 * Base URL: argv[2] || CV_BASE_URL || http://localhost:3102
 * Browser:  CHROMIUM_PATH || /usr/bin/chromium
 * Exits non-zero if a PDF has more than 2 pages (the target is exactly 1).
 */
import { readFile, writeFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const baseUrl = (process.argv[2] || process.env.CV_BASE_URL || "http://localhost:3102").replace(/\/+$/, "");
const executablePath = process.env.CHROMIUM_PATH || "/usr/bin/chromium";
const MAX_PAGES = 2;

const targets = [{ path: "/cv", out: "public/alejandro-cavazos-cv.pdf", title: "Alejandro Cavazos — CV" }];

/** Page count from the PDF itself: the page tree root's /Count, else count /Type /Page objects. */
function countPages(buf) {
  const text = buf.toString("latin1");
  const counts = [...text.matchAll(/\/Type\s*\/Pages\b[^>]*?\/Count\s+(\d+)/g)].map((m) => Number(m[1]));
  const counts2 = [...text.matchAll(/\/Count\s+(\d+)[^>]*?\/Type\s*\/Pages\b/g)].map((m) => Number(m[1]));
  const all = [...counts, ...counts2];
  if (all.length) return Math.max(...all);
  return (text.match(/\/Type\s*\/Page(?![s\w])/g) || []).length;
}

const browser = await chromium.launch({ executablePath, headless: true });
let failed = false;

try {
  const context = await browser.newContext({ colorScheme: "light", locale: "en-US" });
  for (const t of targets) {
    const page = await context.newPage();
    const url = `${baseUrl}${t.path}`;
    const res = await page.goto(url, { waitUntil: "networkidle" });
    if (!res || !res.ok()) throw new Error(`${url} -> HTTP ${res ? res.status() : "no response"}`);

    await page.emulateMedia({ media: "print", colorScheme: "light" });
    await page.evaluate(async (title) => {
      await document.fonts.ready;
      document.title = title; // becomes the PDF /Title
    }, t.title);

    const pdf = await page.pdf({
      printBackground: true,
      preferCSSPageSize: true,
      format: "Letter",
      tagged: true,
      outline: false,
    });
    const outPath = join(root, t.out);
    await writeFile(outPath, pdf);

    const pages = countPages(await readFile(outPath));
    const ok = pages >= 1 && pages <= MAX_PAGES;
    if (!ok) failed = true;
    console.log(
      `${ok ? "ok  " : "FAIL"}  ${url} -> ${relative(root, outPath)}  ${pages} page${pages === 1 ? "" : "s"}  ${(pdf.length / 1024).toFixed(0)} KB`,
    );
    await page.close();
  }
} finally {
  await browser.close();
}

if (failed) {
  console.error(`One or more PDFs exceed ${MAX_PAGES} pages.`);
  process.exit(1);
}
