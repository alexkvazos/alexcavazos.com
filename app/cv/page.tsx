import type { Metadata } from "next";
import Cv, { cvMetadata } from "@/components/cv/Cv";

export const metadata: Metadata = cvMetadata;

export default function Page() {
  return <Cv />;
}
