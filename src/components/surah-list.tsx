"use client";

import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { SurahSummary } from "@/lib/quran";
import { SurahCard } from "./surah-card";

/** Lowercase, diacritic-free and without punctuation, so "al fatihah" matches "Al-Fātiḥah". */
function normalize(value: string) {
  return value
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

export function SurahList({ surahs }: { surahs: SurahSummary[] }) {
  const [query, setQuery] = useState("");

  const searchable = useMemo(
    () =>
      surahs.map((surah) => ({
        surah,
        text: normalize(`${surah.nameLatin} ${surah.transliteration} ${surah.translation}`)
      })),
    [surahs]
  );

  const needle = normalize(query);
  const results = needle
    ? searchable.filter(({ surah, text }) => String(surah.number) === needle || text.includes(needle)).map(({ surah }) => surah)
    : surahs;

  return (
    <>
      <label className="relative mt-10 flex max-w-md items-center">
        <span className="sr-only">Cari surah</span>
        <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-5 text-ink-soft/70" />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari nama, arti, atau nomor surah"
          className="w-full rounded-full border border-forest/15 bg-white/70 py-3.5 pl-12 pr-5 text-sm text-ink outline-none backdrop-blur transition placeholder:text-ink-soft/60 focus:border-gold/60 focus:bg-white"
        />
      </label>

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((surah) => (
            <li key={surah.number}>
              <SurahCard surah={surah} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-14 text-center text-ink-soft">
          Tidak ada surah yang cocok dengan &ldquo;{query}&rdquo;.
        </p>
      )}
    </>
  );
}
