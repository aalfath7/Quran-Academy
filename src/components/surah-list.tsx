"use client";

import { ArrowRight, ChevronDown, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { juzEntryInSurah, surahHref, type JuzStart } from "@/lib/juz";
import type { SurahSummary } from "@/lib/quran";
import { normalize } from "@/lib/quran-search";
import { AyahSearchForm } from "./ayah-search-form";
import { SurahCard } from "./surah-card";

const fieldClass =
  "w-full rounded-full border border-forest/15 bg-surface/70 py-3.5 text-sm text-ink outline-none backdrop-blur transition focus:border-gold/60 focus:bg-surface";

const ayahSearchHref = (query: string) => `/quran/cari?${new URLSearchParams({ q: query })}`;

export function SurahList({
  surahs,
  juzStarts,
  children
}: {
  surahs: SurahSummary[];
  juzStarts: JuzStart[];
  /** Rendered beside the search toggle, always visible. */
  children?: ReactNode;
}) {
  const router = useRouter();
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [juz, setJuz] = useState<number | null>(null);

  // Closing the panel also clears its filters so the list never stays filtered by hidden controls.
  const toggleSearch = () => {
    if (searchOpen) {
      setQuery("");
      setJuz(null);
    }
    setSearchOpen(!searchOpen);
  };

  const searchable = useMemo(
    () =>
      surahs.map((surah) => ({
        surah,
        text: normalize(`${surah.nameLatin} ${surah.transliteration} ${surah.translation}`)
      })),
    [surahs]
  );

  // Surahs with at least one ayah in the chosen juz, mapped to the ayah where that juz begins in them.
  const entries = useMemo(() => {
    if (!juz) return null;

    return new Map(
      surahs.flatMap((surah) => {
        const ayah = juzEntryInSurah(juzStarts, juz, surah);
        return ayah ? [[surah.number, ayah] as const] : [];
      })
    );
  }, [surahs, juzStarts, juz]);

  const inJuz = entries ? searchable.filter(({ surah }) => entries.has(surah.number)) : searchable;
  const href = (surah: SurahSummary) => surahHref(surah.number, entries?.get(surah.number));

  const needle = normalize(query);
  const results = (needle ? inJuz.filter(({ surah, text }) => String(surah.number) === needle || text.includes(needle)) : inJuz).map(
    ({ surah }) => surah
  );

  const juzStart = juzStarts.find((start) => start.juz === juz);
  const juzStartSurah = juzStart && surahs.find(({ number }) => number === juzStart.surahNumber);

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={toggleSearch}
          aria-expanded={searchOpen}
          className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold text-forest-deep backdrop-blur transition ${
            searchOpen ? "border-gold/60 bg-surface" : "border-forest/15 bg-surface/70 hover:border-gold/50"
          }`}
        >
          {searchOpen ? <X aria-hidden="true" size={16} className="text-gold" /> : <Search aria-hidden="true" size={16} className="text-gold" />}
          {searchOpen ? "Tutup pencarian" : "Cari"}
        </button>
        {children}
      </div>

      {searchOpen && (
        <div className="mt-3 flex flex-col gap-3">
          <div className="flex flex-col gap-3 md:flex-row">
            <label className="relative flex items-center md:flex-1">
              <span className="sr-only">Cari surah</span>
              <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-5 text-ink-soft/70" />
              <input
                type="search"
                value={query}
                autoFocus
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Cari nama, arti, atau nomor surah"
                className={`${fieldClass} pl-12 pr-5 placeholder:text-ink-soft/60`}
              />
            </label>

            <label className="relative flex items-center md:w-40">
              <span className="sr-only">Pilih juz</span>
              <select
                value={juz ?? ""}
                onChange={(event) => setJuz(event.target.value ? Number(event.target.value) : null)}
                className={`${fieldClass} cursor-pointer appearance-none pl-5 pr-11`}
              >
                <option value="">Semua juz</option>
                {juzStarts.map((start) => (
                  <option key={start.juz} value={start.juz}>
                    Juz {start.juz}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute right-5 text-ink-soft/70" />
            </label>

            <label className="relative flex items-center md:w-56">
              <span className="sr-only">Buka surah</span>
              <select
                value=""
                onChange={(event) => {
                  const surah = surahs.find(({ number }) => number === Number(event.target.value));
                  if (surah) router.push(href(surah));
                }}
                className={`${fieldClass} cursor-pointer appearance-none pl-5 pr-11`}
              >
                <option value="">{juz ? `Buka surah di Juz ${juz}` : "Buka surah"}</option>
                {inJuz.map(({ surah }) => (
                  <option key={surah.number} value={surah.number}>
                    {surah.number}. {surah.nameLatin}
                  </option>
                ))}
              </select>
              <ChevronDown aria-hidden="true" size={16} className="pointer-events-none absolute right-5 text-ink-soft/70" />
            </label>
          </div>

          <AyahSearchForm />
        </div>
      )}

      {juzStart && juzStartSurah && (
        <Link
          href={surahHref(juzStart.surahNumber, juzStart.ayah)}
          className="group mt-5 inline-flex items-center gap-2 text-sm text-ink-soft transition hover:text-forest"
        >
          Juz {juzStart.juz} dimulai dari {juzStartSurah.nameLatin} ayat {juzStart.ayah}.
          <span className="inline-flex items-center gap-1 font-medium text-gold group-hover:text-forest">
            Mulai baca <ArrowRight aria-hidden="true" size={14} />
          </span>
        </Link>
      )}

      {results.length > 0 ? (
        <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {results.map((surah) => (
            <li key={surah.number}>
              <SurahCard surah={surah} href={href(surah)} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-10 rounded-3xl border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-14 text-center text-ink-soft">
          Tidak ada surah yang cocok{query && <> dengan &ldquo;{query}&rdquo;</>}
          {juz && ` di Juz ${juz}`}.
          {query.trim() && (
            <Link
              href={ayahSearchHref(query.trim())}
              className="mt-3 flex items-center justify-center gap-1 font-medium text-gold transition hover:text-forest"
            >
              Cari &ldquo;{query.trim()}&rdquo; di terjemahan ayat <ArrowRight aria-hidden="true" size={14} />
            </Link>
          )}
        </p>
      )}
    </>
  );
}
