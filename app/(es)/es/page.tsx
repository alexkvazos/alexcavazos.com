import type { Metadata } from "next";
import Lander from "@/components/lander/Lander";
import { landerMetadata } from "@/components/lander/metadata";

export const metadata: Metadata = landerMetadata("es");

export default function Page() {
  return <Lander locale="es" />;
}
