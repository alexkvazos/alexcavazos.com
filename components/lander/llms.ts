import type { LanderContent } from "@/content/lander";
import { CV_PDF, LINKS, SITE_URL } from "@/lib/site";

/** /llms.txt — a plain markdown summary of Alex for AI agents, built from content/lander.ts. */
export function buildLlmsTxt(c: LanderContent): string {
  const out: string[] = [];

  out.push(`# ${c.intro.name} (Alejandro Cavazos)`, "");
  out.push(`> ${c.meta.description}`, "");
  for (const l of c.intro.lines) out.push(l);
  out.push("");

  out.push("## Work", "");
  for (const co of c.work.companies) {
    out.push(`### ${co.company}${co.href ? ` (${co.href})` : ""} — ${co.role} (${co.period})`);
    out.push(co.about);
    for (const it of co.items) {
      const name = it.name ? `${it.name}${it.href ? ` (${it.href})` : ""}: ` : "";
      out.push(`- ${name}${it.text.replace(/\*\*/g, "")}`);
    }
    out.push("");
  }
  out.push(`### ${c.work.earlierLabel}`);
  for (const r of c.work.earlier) out.push(`- ${r.title}${r.company ? `, ${r.company}` : ""} (${r.period})`);
  out.push("");

  out.push("## Notes");
  for (const l of c.notes.lines) out.push(`- ${l}`);
  out.push("");

  out.push("## Stack");
  for (const l of c.stack.lines) out.push(`- ${l}`);
  out.push("");

  out.push("## Links");
  out.push(`- CV: ${SITE_URL}/cv`);
  out.push(`- CV PDF: ${SITE_URL}${CV_PDF}`);
  out.push(`- Email: ${LINKS.email}`);
  out.push(`- GitHub: ${LINKS.github}`);
  out.push(`- LinkedIn: ${LINKS.linkedin}`);
  out.push(`- X: ${LINKS.x}`);
  out.push("");

  return out.join("\n");
}
