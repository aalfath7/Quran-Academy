import { ArrowLeft, ArrowRight, Rows3 } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullscreenToggle } from "@/components/fullscreen-frame";
import { MushafJump } from "@/components/mushaf/mushaf-jump";
import { MushafPageView, surahNames } from "@/components/mushaf/mushaf-page-view";
import { MushafReader, MushafSizeControl } from "@/components/mushaf/mushaf-reader";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getDb } from "@/db";
import { PAGE_COUNT } from "@/lib/mushaf";
import { listJuzPages, listPageAyahs, listSurahPages, parsePositiveInt } from "@/lib/quran";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ halaman: string }> };

async function loadPage(params: Props["params"]) {
  const page = parsePositiveInt((await params).halaman);
  if (!page || page > PAGE_COUNT) return null;

  const db = await getDb();
  const ayahs = await listPageAyahs(db, page);

  return ayahs.length > 0 ? { db, page, ayahs } : null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const loaded = await loadPage(params);
  if (!loaded) return {};

  return pageMetadata({
    title: `Mushaf Al-Qur'an Halaman ${loaded.page} · Juz ${loaded.ayahs[0].juz}`,
    description: `Baca mushaf Al-Qur'an online halaman ${loaded.page} dari ${PAGE_COUNT}: ${surahNames(loaded.ayahs).join(", ")}, juz ${loaded.ayahs[0].juz}.`,
    path: `/quran/halaman/${loaded.page}`
  });
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
  const first = ayahs[0];
  const juz = [...new Set(ayahs.map((ayah) => ayah.juz))];

  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="fullview:hidden">
        <BackgroundGlow />
        <SiteHeader />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:pb-12">
        {/* The page frame already shows this visually; the heading gives readers of the outline and search engines a title. */}
        <h1 className="sr-only">
          Mushaf Al-Qur&apos;an halaman {page}: {surahNames(ayahs).join(", ")}, juz {juz.join("–")}
        </h1>
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
          <MushafPageView page={page} ayahs={ayahs} className="mt-6" />
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
