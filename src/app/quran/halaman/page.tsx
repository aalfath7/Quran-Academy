import { redirect } from "next/navigation";
import { PAGE_COUNT } from "@/lib/mushaf";
import { parsePositiveInt } from "@/lib/quran";

type Props = { searchParams: Promise<{ ke?: string | string[] }> };

/** "Ke halaman" form target: /quran/halaman?ke=255 opens that page; anything else opens the first. */
export default async function MushafIndex({ searchParams }: Props) {
  const raw = (await searchParams).ke;
  const page = parsePositiveInt((Array.isArray(raw) ? raw[0] : raw)?.trim() ?? "");

  redirect(`/quran/halaman/${page && page <= PAGE_COUNT ? page : 1}`);
}
