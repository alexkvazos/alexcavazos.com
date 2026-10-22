import { lander } from "@/content/lander";
import { buildLlmsTxt } from "@/components/lander/llms";

export const dynamic = "force-static";

export function GET() {
  return new Response(buildLlmsTxt(lander.en), {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
