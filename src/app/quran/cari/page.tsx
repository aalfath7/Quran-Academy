import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AyahSearchForm } from "@/components/ayah-search-form";
import { QuranText } from "@/components/quran-text";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { SurahCard } from "@/components/surah-card";
import { getDb } from "@/db";
import { listSurahs, parsePositiveInt, SEARCH_PAGE_SIZE, searchAyahs } from "@/lib/quran";
import { findSurah, highlight, MIN_TERM_LENGTH, parseAyahReference, searchTerms } from "@/lib/quran-search";

export const dynamic = "force-dynamic";

type Props = { searchParams: Promise<{ q?: string | string[]; hal?: string | string[] }> };

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) ?? "";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const query = first((await searchParams).q).trim();

  return {
    title: query ? `“${query}” · Cari ayat · Fathway Quran` : "Cari ayat · Fathway Quran",
    description: "Cari ayat Al-Qur'an berdasarkan kata dalam terjemahan Kemenag RI atau rujukan surah dan ayat.",
    robots: { index: false }
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const query = first(params.q).trim().slice(0, 100);
  const page = parsePositiveInt(first(params.hal)) ?? 1;

  const db = await getDb();
  const surahs = query ? await listSurahs(db) : [];

  // "2:255" or "al-baqarah 255" names one ayah, so go straight to it.
  const reference = parseAyahReference(query, surahs);
  if (reference) redirect(`/quran/${reference.surahNumber}/${reference.ayah}`);

  const surah = findSurah(query, surahs);
  const terms = searchTerms(query);
  const { results, total } = await searchAyahs(db, terms, page);
  const pageCount = Math.ceil(total / SEARCH_PAGE_SIZE);
  const pageHref = (target: number) => `/quran/cari?${new URLSearchParams({ q: query, hal: String(target) })}`;

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-4xl px-6 pb-24 pt-8 md:pt-14">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Daftar surah
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Cari ayat</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] tracking-tight text-forest-deep md:text-5xl">
          {query ? <>Hasil untuk &ldquo;{query}&rdquo;</> : "Temukan ayat"}
        </h1>

        <div className="mt-8">
          <AyahSearchForm defaultValue={query} autoFocus={!query} />
        </div>

        {!query && (
          <ul className="mt-8 space-y-2 text-sm leading-6 text-ink-soft">
            <li>
              Ketik kata dari terjemahan, misalnya <ExampleLink query="sabar" /> atau <ExampleLink query="orang yang bertakwa" />.
            </li>
            <li>
              Atau langsung ke ayat dengan rujukan, misalnya <ExampleLink query="2:255" /> atau <ExampleLink query="yasin 1" />.
            </li>
          </ul>
        )}

        {surah && page === 1 && (
          <div className="mt-10 max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft/70">Surah</p>
            <div className="mt-3">
              <SurahCard surah={surah} />
            </div>
          </div>
        )}

        {query && terms.length === 0 && !surah && (
          <p className="mt-10 text-ink-soft">Gunakan kata minimal {MIN_TERM_LENGTH} huruf.</p>
        )}

        {terms.length > 0 && (
          <>
            <p className="mt-10 text-sm text-ink-soft" aria-live="polite">
              {total > 0
                ? `${total.toLocaleString("id-ID")} ayat ditemukan${pageCount > 1 ? ` · halaman ${page} dari ${pageCount}` : ""}`
                : null}
            </p>

            {results.length > 0 ? (
              <ol className="mt-4 divide-y divide-gold/20">
                {results.map((ayah) => (
                  <li key={ayah.id}>
                    <Link
                      href={`/quran/${ayah.surahNumber}/${ayah.number}`}
                      className="group -mx-4 block rounded-3xl px-4 py-7 transition hover:bg-surface/60"
                    >
                      <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                        <span>QS. {ayah.nameLatin}</span>
                        <span className="size-1 rotate-45 bg-gold" />
                        <span>
                          {ayah.surahNumber}:{ayah.number}
                        </span>
                      </span>
                      <span
                        className="mt-4 line-clamp-2 block text-right font-arabic text-2xl leading-[2.1] text-forest-deep"
                        lang="ar"
                        dir="rtl"
                      >
                        <QuranText text={ayah.arabic} />
                      </span>
                      <span className="mt-3 block leading-7 text-ink">
                        {highlight(ayah.translation, terms).map((part, i) =>
                          part.match ? (
                            <mark key={i} className="rounded bg-gold/25 px-0.5 text-forest-deep">
                              {part.text}
                            </mark>
                          ) : (
                            part.text
                          )
                        )}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-forest transition group-hover:text-gold">
                        Buka ayat & tafsir <ArrowRight aria-hidden="true" size={14} />
                      </span>
                    </Link>
                  </li>
                ))}
              </ol>
            ) : (
              <div className="mt-4 flex flex-col items-center rounded-[2.5rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-16 text-center">
                <Star className="size-12 text-gold/60" />
                <p className="mt-5 max-w-md text-ink-soft">
                  {page > 1 && total > 0
                    ? "Halaman ini sudah melewati hasil terakhir."
                    : <>Tidak ada ayat yang terjemahannya memuat {terms.length > 1 ? "semua kata" : "kata"} &ldquo;{terms.join(" ")}&rdquo;. Coba kata lain atau lebih sedikit kata.</>}
                </p>
              </div>
            )}

            {pageCount > 1 && (
              <nav className="mt-10 flex items-center justify-between gap-4" aria-label="Halaman hasil">
                {page > 1 ? (
                  <Link
                    href={pageHref(Math.min(page - 1, pageCount))}
                    className="inline-flex items-center gap-2 rounded-full border border-forest/15 px-5 py-2.5 text-sm font-medium text-forest transition hover:border-gold/50"
                  >
                    <ArrowLeft aria-hidden="true" size={14} /> Sebelumnya
                  </Link>
                ) : (
                  <span />
                )}
                {page < pageCount && (
                  <Link
                    href={pageHref(page + 1)}
                    className="inline-flex items-center gap-2 rounded-full border border-forest/15 px-5 py-2.5 text-sm font-medium text-forest transition hover:border-gold/50"
                  >
                    Berikutnya <ArrowRight aria-hidden="true" size={14} />
                  </Link>
                )}
              </nav>
            )}
          </>
        )}

        <p className="mt-10 text-xs text-ink-soft/70">Pencarian pada terjemahan Kementerian Agama RI.</p>
      </section>

      <SiteFooter />
    </main>
  );
}

function ExampleLink({ query }: { query: string }) {
  return (
    <Link
      href={`/quran/cari?${new URLSearchParams({ q: query })}`}
      className="font-medium text-forest underline decoration-gold/40 underline-offset-4 transition hover:decoration-gold"
    >
      {query}
    </Link>
  );
}
