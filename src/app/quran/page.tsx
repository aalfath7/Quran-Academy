import type { Metadata } from "next";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { SurahList } from "@/components/surah-list";
import { getDb } from "@/db";
import { listJuzStarts, listSurahs } from "@/lib/quran";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Al-Qur'an · Quran Academy",
  description: "Baca 114 surah Al-Qur'an lengkap dengan latin, terjemahan, dan tafsir."
};

export default async function QuranPage() {
  const db = await getDb();
  const [surahs, juzStarts] = await Promise.all([listSurahs(db), listJuzStarts(db)]);

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Al-Qur&apos;an</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Baca, pahami,{" "}
          <span className="font-arabic text-4xl text-gold md:text-5xl" lang="ar" dir="rtl">
            الْقُرْآن
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          114 surah dengan teks Arab, transliterasi latin, terjemahan, dan tafsir Kementerian Agama RI.
        </p>

        {surahs.length > 0 ? (
          <SurahList surahs={surahs} juzStarts={juzStarts} />
        ) : (
          <div className="mt-12 flex flex-col items-center rounded-[2.5rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-20 text-center">
            <Star className="size-14 text-gold/60" />
            <h2 className="mt-6 font-display text-2xl font-light text-forest-deep">Mushaf sedang disiapkan.</h2>
            <p className="mt-3 max-w-md text-ink-soft">Data Al-Qur&apos;an belum diimpor. Silakan kembali lagi nanti.</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
