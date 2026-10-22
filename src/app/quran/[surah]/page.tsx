import { ArrowLeft, ArrowRight, BookOpenText } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { getSurah, listAyahs, paragraphs, parsePositiveInt, showsBismillah, SURAH_COUNT } from "@/lib/quran";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ surah: string }> };

async function loadSurah(params: Props["params"]) {
  const number = parsePositiveInt((await params).surah);
  if (!number || number > SURAH_COUNT) return null;

  return getSurah(await getDb(), number);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const surah = await loadSurah(params);

  return surah
    ? {
        title: `Surah ${surah.nameLatin} · Quran Academy`,
        description: `Surah ${surah.nameLatin} (${surah.translation}), ${surah.ayahCount} ayat, dengan latin, terjemahan, dan tafsir.`
      }
    : {};
}

export default async function SurahPage({ params }: Props) {
  const surah = await loadSurah(params);
  if (!surah) notFound();

  const db = await getDb();
  const [ayahs, previous, next] = await Promise.all([
    listAyahs(db, surah.number),
    surah.number > 1 ? getSurah(db, surah.number - 1) : null,
    surah.number < SURAH_COUNT ? getSurah(db, surah.number + 1) : null
  ]);
  const introduction = paragraphs(surah.introduction);

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <article className="relative mx-auto max-w-4xl px-6 pb-24 pt-8 md:pt-14">
        <Link
          href="/quran"
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Daftar surah
        </Link>

        <header className="pattern-girih relative mt-8 overflow-hidden rounded-[2rem] bg-forest-deep px-8 py-12 text-center">
          <div className="absolute inset-0 bg-radial from-forest/50 to-forest-deep" />
          <div className="relative">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold-soft/80">Surah ke-{surah.number}</p>
            <p className="mt-5 font-arabic text-5xl leading-[1.6] text-gold-soft" lang="ar" dir="rtl">
              {surah.nameArabic}
            </p>
            <h1 className="mt-2 font-display text-3xl font-light text-paper md:text-4xl">{surah.nameLatin}</h1>
            <p className="mt-2 font-display italic text-paper/75">&ldquo;{surah.translation}&rdquo;</p>
            <div className="mt-6 flex items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-gold-soft/80">
              <span>{surah.location}</span>
              <span className="size-1 rotate-45 bg-gold-soft/70" />
              <span>{surah.ayahCount} ayat</span>
            </div>
            {showsBismillah(surah.number) && (
              <p className="mt-10 font-arabic text-3xl leading-[2] text-gold-soft md:text-4xl" lang="ar" dir="rtl">
                بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
              </p>
            )}
          </div>
        </header>

        {introduction.length > 0 && (
          <details className="group mt-8 rounded-3xl border border-gold/25 bg-paper-deep/50 px-6 py-5 md:px-8">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-forest-deep marker:hidden">
              Pengantar surah
              <ArrowRight aria-hidden="true" size={18} className="text-gold transition group-open:rotate-90" />
            </summary>
            <div className="mt-5 space-y-4 leading-8 text-ink-soft">
              {introduction.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </details>
        )}

        <ol className="mt-10 divide-y divide-gold/20">
          {ayahs.map((ayah) => (
            <li key={ayah.id} id={`ayat-${ayah.number}`} className="scroll-mt-8 py-10">
              <div className="flex items-start gap-6">
                <span className="relative flex size-11 shrink-0 items-center justify-center text-gold">
                  <Star className="absolute inset-0 size-11" />
                  <span className="relative font-display text-xs font-semibold">{ayah.number}</span>
                </span>
                <p
                  className="flex-1 text-right font-arabic text-3xl leading-[2.3] text-forest-deep md:text-4xl md:leading-[2.3]"
                  lang="ar"
                  dir="rtl"
                >
                  {ayah.arabic}
                </p>
              </div>

              <p className="mt-6 italic leading-7 text-gold">{ayah.latin}</p>
              <p className="mt-3 text-[1.05rem] leading-8 text-ink">{ayah.translation}</p>
              {ayah.footnotes && (
                <p className="mt-3 whitespace-pre-line border-l-2 border-gold/30 pl-4 text-sm leading-6 text-ink-soft">
                  {ayah.footnotes}
                </p>
              )}

              <div className="mt-5 flex flex-wrap items-start gap-x-6 gap-y-3">
                {ayah.tafsirWajiz && (
                  <details className="group w-full">
                    <summary className="inline-flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-forest transition hover:text-gold marker:hidden">
                      <ArrowRight aria-hidden="true" size={14} className="transition group-open:rotate-90" />
                      Tafsir ringkas
                    </summary>
                    <div className="mt-3 space-y-3 rounded-2xl bg-white/60 p-5 leading-7 text-ink-soft">
                      {paragraphs(ayah.tafsirWajiz).map((paragraph, i) => (
                        <p key={i}>{paragraph}</p>
                      ))}
                    </div>
                  </details>
                )}
                <Link
                  href={`/quran/${surah.number}/${ayah.number}`}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-forest underline decoration-gold/40 underline-offset-4 transition hover:decoration-gold"
                >
                  <BookOpenText aria-hidden="true" size={14} />
                  Tafsir lengkap
                </Link>
                <span className="text-xs uppercase tracking-[0.16em] text-ink-soft/60">
                  Juz {ayah.juz} · Hal. {ayah.page}
                </span>
              </div>
            </li>
          ))}
        </ol>

        <div className="my-14 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gold/30" />
          <Star className="size-6" />
          <span className="h-px w-16 bg-gold/30" />
        </div>

        <nav className="grid gap-4 sm:grid-cols-2" aria-label="Surah lain">
          {previous ? (
            <Link
              href={`/quran/${previous.number}`}
              className="rounded-2xl border border-forest/10 bg-white/60 p-5 transition hover:border-gold/40 hover:bg-white"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <ArrowLeft aria-hidden="true" size={14} /> Sebelumnya
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{previous.nameLatin}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/quran/${next.number}`}
              className="rounded-2xl border border-forest/10 bg-white/60 p-5 text-right transition hover:border-gold/40 hover:bg-white"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Berikutnya <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{next.nameLatin}</span>
            </Link>
          )}
        </nav>
      </article>

      <SiteFooter />
    </main>
  );
}
