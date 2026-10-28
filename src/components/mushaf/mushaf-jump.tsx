"use client";

import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { PAGE_COUNT } from "@/lib/mushaf";

type SurahPage = { number: number; nameLatin: string; page: number };
type JuzPage = { juz: number; page: number };

const selectClass =
  "w-full cursor-pointer appearance-none rounded-full border border-forest/15 bg-surface/70 py-2.5 pl-4 pr-9 text-sm text-ink outline-none transition focus:border-gold/60";

/** Jump to the page a surah or juz starts on, or to a page number (the last works without JavaScript too). */
export function MushafJump({ page, surahs, juzPages }: { page: number; surahs: SurahPage[]; juzPages: JuzPage[] }) {
  const router = useRouter();
  const open = (target: number) => router.push(`/quran/halaman/${target}`);

  const surah = surahs.findLast((entry) => entry.page <= page);
  const juz = juzPages.findLast((entry) => entry.page <= page);

  return (
    <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-[1fr_8rem_8rem]">
      <label className="relative col-span-2 flex items-center sm:col-span-1">
        <span className="sr-only">Buka surah</span>
        <select value={surah?.number ?? ""} onChange={(event) => {
            const target = surahs.find((entry) => entry.number === Number(event.target.value));
            if (target) open(target.page);
          }} className={selectClass}>
          {surahs.map((entry) => (
            <option key={entry.number} value={entry.number}>
              {entry.number}. {entry.nameLatin}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" size={15} className="pointer-events-none absolute right-3.5 text-ink-soft/70" />
      </label>

      <label className="relative flex items-center">
        <span className="sr-only">Buka juz</span>
        <select
          value={juz?.juz ?? ""}
          onChange={(event) => {
            const target = juzPages.find((entry) => entry.juz === Number(event.target.value));
            if (target) open(target.page);
          }}
          className={selectClass}
        >
          {juzPages.map((entry) => (
            <option key={entry.juz} value={entry.juz}>
              Juz {entry.juz}
            </option>
          ))}
        </select>
        <ChevronDown aria-hidden="true" size={15} className="pointer-events-none absolute right-3.5 text-ink-soft/70" />
      </label>

      <form action="/quran/halaman" className="flex items-center" key={page}>
        <label className="flex w-full items-center rounded-full border border-forest/15 bg-surface/70 pl-4 text-sm text-ink-soft transition focus-within:border-gold/60">
          Hal.
          <input
            type="number"
            name="ke"
            min={1}
            max={PAGE_COUNT}
            defaultValue={page}
            required
            aria-label={`Ke halaman (1–${PAGE_COUNT})`}
            className="w-full min-w-0 bg-transparent py-2.5 pl-1.5 pr-3 text-ink outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
          />
        </label>
      </form>
    </div>
  );
}
