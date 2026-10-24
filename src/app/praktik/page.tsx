import type { Metadata } from "next";
import Link from "next/link";
import { ContinuePractice, OverallProgress, PracticeCardStatus } from "@/components/practice/practice-progress-ui";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { categoryInfo } from "@/lib/categories";
import { listPublishedLessons, practiceDrillCount } from "@/lib/lessons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Praktik · Quran Academy",
  description: categoryInfo.praktik.description
};

export default async function PracticeListPage() {
  const practices = await listPublishedLessons(await getDb(), "praktik");
  const totals = Object.fromEntries(practices.map(({ slug, content }) => [slug, practiceDrillCount(content)]));

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Praktik dasar bacaan</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Latihan,{" "}
          <span className="font-arabic text-4xl text-gold md:text-5xl" lang="ar" dir="rtl">
            {categoryInfo.praktik.arabic}
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          Mulai dari mengenal huruf, lalu harakat dan tanwin. Pilih nomor praktik dan langsung berlatih.
        </p>
        <OverallProgress totals={totals} />
        <ContinuePractice practices={practices.map(({ slug, title }) => ({ slug, title }))} />

        {practices.length > 0 ? (
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {practices.map((practice, index) => (
              <li key={practice.id}>
                <Link
                  href={`/praktik/${practice.slug}`}
                  className="group flex items-center gap-5 rounded-3xl border border-forest/10 bg-surface/60 p-5 backdrop-blur transition duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-surface hover:shadow-xl hover:shadow-brand/10"
                >
                  <span className="relative flex size-12 shrink-0 items-center justify-center text-gold">
                    <Star className="absolute inset-0 size-12 transition-transform duration-700 group-hover:rotate-45" />
                    <span className="relative font-display text-sm font-semibold">{index + 1}</span>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-lg font-medium leading-snug text-forest-deep">{practice.title}</span>
                    {practice.arabicText && (
                      <span className="mt-1 block truncate font-arabic text-xl text-gold/80" lang="ar" dir="rtl">
                        {practice.arabicText}
                      </span>
                    )}
                    <PracticeCardStatus slug={practice.slug} />
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <div className="mt-12 flex flex-col items-center rounded-[2.5rem] border border-dashed border-gold/40 bg-paper-deep/40 px-8 py-20 text-center">
            <Star className="size-14 text-gold/60" />
            <h2 className="mt-6 font-display text-2xl font-light text-forest-deep">Praktik sedang disiapkan.</h2>
            <p className="mt-3 max-w-md text-ink-soft">Belum ada latihan yang diterbitkan. Silakan kembali lagi nanti.</p>
          </div>
        )}
      </section>

      <SiteFooter />
    </main>
  );
}
