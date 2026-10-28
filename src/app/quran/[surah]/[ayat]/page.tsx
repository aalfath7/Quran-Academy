import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { QuranText } from "@/components/quran-text";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { getAyah, getNeighbourAyahs, getSurah, paragraphs, parsePositiveInt, SURAH_COUNT } from "@/lib/quran";
import { breadcrumbJsonLd, pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ surah: string; ayat: string }> };

async function loadAyah(params: Props["params"]) {
  const { surah: surahParam, ayat: ayatParam } = await params;
  const surahNumber = parsePositiveInt(surahParam);
  const ayahNumber = parsePositiveInt(ayatParam);
  if (!surahNumber || surahNumber > SURAH_COUNT || !ayahNumber) return null;

  const db = await getDb();
  const [surah, ayah] = await Promise.all([getSurah(db, surahNumber), getAyah(db, surahNumber, ayahNumber)]);

  return surah && ayah ? { db, surah, ayah } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loaded = await loadAyah(params);
  if (!loaded) return {};
  const { surah, ayah } = loaded;

  return pageMetadata({
    title: `Surah ${surah.nameLatin} Ayat ${ayah.number}: Arti & Tafsir`,
    description: `QS. ${surah.nameLatin} ${surah.number}:${ayah.number} — ${ayah.translation}`,
    path: `/quran/${surah.number}/${ayah.number}`
  });
}

export default async function AyahPage({ params }: Props) {
  const loaded = await loadAyah(params);
  if (!loaded) notFound();

  const { db, surah, ayah } = loaded;
  const { previous, next } = await getNeighbourAyahs(db, ayah.id);
  const tafsir = paragraphs(ayah.tafsirTahlili);

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <JsonLd data={breadcrumbJsonLd([
          ["Beranda", "/"],
          ["Al-Qur'an", "/quran"],
          [`Surah ${surah.nameLatin}`, `/quran/${surah.number}`],
          [`Ayat ${ayah.number}`, `/quran/${surah.number}/${ayah.number}`]
        ])} />
      <BackgroundGlow />
      <SiteHeader />

      <article className="relative mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-14">
        <Link
          href={`/quran/${surah.number}#ayat-${ayah.number}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          Surah {surah.nameLatin}
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <span>QS. {surah.nameLatin}</span>
            <span className="size-1 rotate-45 bg-gold" />
            <span>
              {surah.number}:{ayah.number}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.1] tracking-tight text-forest-deep md:text-5xl">
            Tafsir ayat {ayah.number}
          </h1>
        </header>

        <div className="pattern-girih relative mt-10 overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-12 text-center">
          <div className="absolute inset-0 bg-radial from-brand/50 to-brand-deep" />
          <div className="relative">
            <Star className="mx-auto size-8 text-gold-soft/70" />
            <p className="mt-6 font-arabic text-3xl leading-[2.2] text-gold-soft md:text-4xl" lang="ar" dir="rtl">
              <QuranText text={ayah.arabic} />
            </p>
            <p className="mt-6 italic leading-7 text-cream/70">{ayah.latin}</p>
          </div>
        </div>

        <p className="mt-10 font-display text-xl font-light leading-9 text-forest-deep">{ayah.translation}</p>
        {ayah.footnotes && (
          <p className="mt-4 whitespace-pre-line border-l-2 border-gold/30 pl-4 text-sm leading-6 text-ink-soft">
            {ayah.footnotes}
          </p>
        )}

        {tafsir.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Tafsir tahlili</h2>
            <div className="mt-5 space-y-5 text-[1.05rem] leading-8 text-ink">
              {tafsir.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-ink-soft/70">Sumber: Al-Qur&apos;an dan tafsir Kementerian Agama RI.</p>
          <Link
            href={`/quran/halaman/${ayah.page}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-forest transition hover:text-gold"
          >
            <BookOpen aria-hidden="true" size={15} />
            Lihat di mushaf · hal. {ayah.page}
          </Link>
        </div>

        <div className="my-14 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gold/30" />
          <Star className="size-6" />
          <span className="h-px w-16 bg-gold/30" />
        </div>

        <nav className="grid gap-4 sm:grid-cols-2" aria-label="Ayat lain">
          {previous ? (
            <Link
              href={`/quran/${previous.surahNumber}/${previous.number}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <ArrowLeft aria-hidden="true" size={14} /> Sebelumnya
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">
                {previous.nameLatin} {previous.surahNumber}:{previous.number}
              </span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/quran/${next.surahNumber}/${next.number}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 text-right transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Berikutnya <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">
                {next.nameLatin} {next.surahNumber}:{next.number}
              </span>
            </Link>
          )}
        </nav>
      </article>

      <SiteFooter />
    </main>
  );
}
