import type { Metadata } from "next";
import Cv, { cvMetadata } from "@/components/cv/Cv";

export const metadata: Metadata = cvMetadata("es");

export default function Page() {
  return <Cv locale="es" />;
}
