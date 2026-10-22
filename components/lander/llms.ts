import type { LanderContent } from "@/content/lander";
import { CV_PDF, LINKS, SITE_URL, absoluteUrl } from "@/lib/site";

const STATUS: Record<string, string> = { live: "live", launching: "launching", internal: "internal" };

/** /llms.txt — a plain markdown summary of Alex for AI agents, built from content/lander.ts (EN). */
export function buildLlmsTxt(c: LanderContent): string {
  const s = c.sections;
  const out: string[] = [];
  const say = c.hero.session.filter((x) => x.kind === "say").map((x) => (x.kind === "say" ? x.text : ""));

  out.push("# Alex Cavazos (Alejandro Cavazos)");
  out.push("");
  out.push(`> ${c.meta.description}`);
  out.push("");
  out.push(c.hero.subhead);
  out.push("");
  for (const line of say) out.push(line, "");

  out.push("## Links");
  out.push(`- CV (web, English): ${absoluteUrl("en", "/cv")}`);
  out.push(`- CV (web, Spanish): ${absoluteUrl("es", "/cv")}`);
  out.push(`- CV PDF (English): ${SITE_URL}${CV_PDF.en}`);
  out.push(`- CV PDF (Spanish): ${SITE_URL}${CV_PDF.es}`);
  out.push(`- Site (Spanish): ${absoluteUrl("es", "/")}`);
  out.push(`- Email: ${LINKS.email}`);
  out.push(`- GitHub: ${LINKS.github}`);
  out.push(`- LinkedIn: ${LINKS.linkedin}`);
  out.push(`- X: ${LINKS.x}`);
  out.push("");

  out.push("## Numbers");
  for (const m of c.metrics) out.push(`- ${m.value} ${m.label}${m.sub ? ` (${m.sub})` : ""}`);
  out.push("");

  out.push("## Roles");
  for (const r of s.history.roles) out.push(`- ${r.title}, ${r.company} (${r.period}): ${r.line}`);
  out.push(`- ${s.history.footnote}`);
  out.push("");

  out.push(`## Products — ${s.ships.title}`);
  out.push(s.ships.intro);
  for (const p of s.ships.products) {
    out.push("");
    const status = p.status ? ` — ${STATUS[p.status] ?? p.status}` : "";
    out.push(`### ${p.name} (${p.company})${status}${p.url ? ` — ${p.url}` : ""}`);
    out.push(p.tagline);
    for (const pt of p.points) out.push(`- ${pt}`);
    out.push(`- Stack: ${p.stack.join(", ")}`);
  }
  out.push("");

  out.push(`## AI agents — ${s.agents.title}`);
  out.push(s.agents.intro);
  out.push("");
  out.push("Guardrails:");
  for (const g of s.agents.guardrails) out.push(`- ${g}`);
  out.push("");

  out.push(`## Infrastructure — ${s.infra.title}`);
  out.push(s.infra.intro);
  for (const it of s.infra.items) out.push(`- ${it.k}: ${it.v}`);
  out.push("");

  out.push("## Preferred stack");
  for (const g of s.stack.groups) out.push(`- ${g.name}: ${g.items.join(", ")}`);
  out.push("");

  out.push("## Contact");
  out.push(s.contact.text);
  out.push(`- ${LINKS.email}`);
  out.push("");

  return out.join("\n");
}
