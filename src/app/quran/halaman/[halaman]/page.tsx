import { ArrowLeft, ArrowRight, Rows3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullscreenToggle } from "@/components/fullscreen-frame";
import { MushafJump } from "@/components/mushaf/mushaf-jump";
import { MushafReader, MushafSizeControl } from "@/components/mushaf/mushaf-reader";
import { QuranText } from "@/components/quran-text";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { groupBySurah, PAGE_COUNT, toArabicDigits } from "@/lib/mushaf";
import { listJuzPages, listPageAyahs, listSurahPages, parsePositiveInt, showsBismillah, type PageAyah } from "@/lib/quran";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ halaman: string }> };

async function loadPage(params: Props["params"]) {
  const page = parsePositiveInt((await params).halaman);
  if (!page || page > PAGE_COUNT) return null;

  const db = await getDb();
  const ayahs = await listPageAyahs(db, page);

  return ayahs.length > 0 ? { db, page, ayahs } : null;
}

/** Latin names of the surahs on a page, in order: "Al-Fātiḥah", "An-Nās · Al-Falaq". */
const surahNames = (ayahs: PageAyah[]) => groupBySurah(ayahs).map(({ ayahs: [first] }) => first.nameLatin);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loaded = await loadPage(params);
  if (!loaded) return {};

  return {
    title: `Halaman ${loaded.page} · Mushaf · Fathway Quran`,
    description: `Mushaf Al-Qur'an halaman ${loaded.page}: ${surahNames(loaded.ayahs).join(", ")}, juz ${loaded.ayahs[0].juz}.`
  };
}

function AyahMarker({ ayah }: { ayah: PageAyah }) {
  return (
    <Link
      href={`/quran/${ayah.surahNumber}/${ayah.number}`}
      title={`${ayah.nameLatin} ${ayah.surahNumber}:${ayah.number} · buka tafsir`}
      aria-label={`Ayat ${ayah.number}, buka tafsir`}
      className="relative mx-[0.15em] inline-flex size-[1.3em] items-center justify-center align-middle text-gold transition hover:text-forest"
    >
      <Star className="absolute inset-0 size-full" />
      <span className="relative font-sans text-[0.4em] font-bold leading-none">{toArabicDigits(ayah.number)}</span>
    </Link>
  );
}

function SurahOpening({ ayah }: { ayah: PageAyah }) {
  return (
    <header className="my-2 text-center">
      <div className="pattern-girih relative overflow-hidden rounded-2xl border border-gold/50 bg-brand-deep px-4 py-3">
        <div className="absolute inset-0 bg-radial from-brand/40 to-brand-deep" />
        <p className="relative font-arabic text-[length:calc(var(--mushaf-size,2rem)*0.8)] leading-[1.7] text-gold-soft" lang="ar" dir="rtl">
          سُورَةُ {ayah.nameArabic}
        </p>
        <p className="relative text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-soft/70">
          {ayah.nameLatin} · {ayah.ayahCount} ayat · {ayah.location}
        </p>
      </div>
      {showsBismillah(ayah.surahNumber) && (
        <p className="mt-3 font-arabic text-[length:calc(var(--mushaf-size,2rem)*0.9)] leading-[2] text-forest-deep" lang="ar" dir="rtl">
          بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ
        </p>
      )}
    </header>
  );
}

function PageLink({ page, direction }: { page: number; direction: "next" | "previous" }) {
  const next = direction === "next";

  return (
    <Link
      href={`/quran/halaman/${page}`}
      className={`flex items-center gap-3 rounded-2xl border border-forest/10 bg-surface/60 px-4 py-4 sm:px-5 transition hover:border-gold/40 hover:bg-surface ${next ? "" : "flex-row-reverse text-right"}`}
    >
      {next ? <ArrowLeft aria-hidden="true" size={18} className="text-gold" /> : <ArrowRight aria-hidden="true" size={18} className="text-gold" />}
      <span>
        <span className="block text-xs font-semibold uppercase tracking-[0.16em] text-gold">{next ? "Berikutnya" : "Sebelumnya"}</span>
        <span className="block whitespace-nowrap font-display text-base text-forest-deep sm:text-lg">Halaman {page}</span>
      </span>
    </Link>
  );
}

export default async function MushafPage({ params }: Props) {
  const loaded = await loadPage(params);
  if (!loaded) notFound();

  const { db, page, ayahs } = loaded;
  const [surahs, juzPages] = await Promise.all([listSurahPages(db), listJuzPages(db)]);
  const groups = groupBySurah(ayahs);
  const first = ayahs[0];
  const juz = [...new Set(ayahs.map((ayah) => ayah.juz))];

  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="fullview:hidden">
        <BackgroundGlow />
        <SiteHeader />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:pb-12">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/quran/${first.surahNumber}${first.number > 1 ? `#ayat-${first.number}` : ""}`}
            className="inline-flex items-center gap-2 rounded-full border border-forest/15 px-4 py-2.5 text-sm font-medium text-forest-deep transition hover:border-forest/40"
          >
            <Rows3 aria-hidden="true" size={15} />
            Mode per ayat
          </Link>
          <div className="flex items-center gap-2">
            <MushafSizeControl />
            <FullscreenToggle />
          </div>
        </div>

        <div className="mt-4">
          <MushafJump page={page} surahs={surahs} juzPages={juzPages} />
        </div>

        <MushafReader page={page}>
          <article
            aria-label={`Halaman ${page}`}
            className="mt-6 rounded-[2rem] border-2 border-gold/40 bg-surface/80 p-1.5 shadow-xl shadow-brand/5 backdrop-blur"
          >
            <div className="rounded-[1.6rem] border border-gold/25 px-4 py-4 sm:px-8 sm:py-6">
              <div className="flex items-center justify-between gap-4 border-b border-gold/25 pb-2 text-xs font-semibold text-gold">
                <span>Juz {juz.join("–")}</span>
                <span className="truncate text-right">{surahNames(ayahs).join(" · ")}</span>
              </div>

              <div className="mt-4 text-[length:calc(var(--mushaf-size,2rem)*0.8)] sm:text-[length:var(--mushaf-size,2rem)]">
                {groups.map(({ surahNumber, ayahs: run }) => (
                  <section key={surahNumber}>
                    {run[0].number === 1 && <SurahOpening ayah={run[0]} />}
                    {/* A rule under every line: the background repeats once per line, so it follows the reading size. */}
                    <p
                      className="bg-[linear-gradient(to_bottom,transparent_calc(100%-1px),color-mix(in_srgb,var(--color-gold)_35%,transparent)_calc(100%-1px))] bg-[length:100%_2.25em] text-justify font-arabic leading-[2.25] text-forest-deep [text-align-last:center]"
                      lang="ar"
                      dir="rtl"
                    >
                      {run.map((ayah) => (
                        <span key={ayah.id} id={`ayat-${ayah.surahNumber}-${ayah.number}`} className="rounded-lg transition-colors hover:bg-gold/10">
                          <QuranText text={ayah.arabic} />
                          <AyahMarker ayah={ayah} />{" "}
                        </span>
                      ))}
                    </p>
                  </section>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-center gap-3 text-gold">
                <span className="h-px w-10 bg-gold/30" />
                <span className="font-arabic text-lg" lang="ar">
                  {toArabicDigits(page)}
                </span>
                <span className="h-px w-10 bg-gold/30" />
              </div>
            </div>
          </article>
        </MushafReader>

        {/* A mushaf turns right to left: the next page sits on the left. */}
        <nav className="mt-6 grid grid-cols-2 gap-3" aria-label="Halaman lain">
          {page < PAGE_COUNT ? <PageLink page={page + 1} direction="next" /> : <span />}
          {page > 1 ? <PageLink page={page - 1} direction="previous" /> : <span />}
        </nav>
        <p className="mt-4 text-center text-xs text-ink-soft/80">
          Geser halaman ke kanan/kiri, atau tekan tombol ← →. Ketuk nomor ayat untuk membuka tafsirnya.
        </p>
      </div>

      <div className="fullview:hidden">
        <SiteFooter />
      </div>
    </main>
  );
}
