import type { Metadata } from "next";
import Link from "next/link";
import { ContinuePractice, OverallProgress, PracticeCardStatus } from "@/components/practice/practice-progress-ui";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { categoryInfo } from "@/lib/categories";
import { listPublishedLessons, practiceDrillCount } from "@/lib/lessons";
import { groupByPart, PRACTICE_TOTAL, practiceParts } from "@/lib/practice-curriculum";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = pageMetadata({
  title: "Latihan Membaca Huruf Hijaiyah dari Nol",
  description: `${categoryInfo.praktik.description} Latihan membaca Al-Qur'an untuk pemula, bertahap dengan penanda kemajuan.`,
  path: "/praktik"
});

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
          {PRACTICE_TOTAL} praktik dalam {practiceParts.length} bagian, dari huruf tunggal sampai siap membaca mushaf. Pilih
          nomor praktik dan langsung berlatih.
        </p>
        <OverallProgress totals={totals} />
        <ContinuePractice practices={practices.map(({ slug, title }) => ({ slug, title }))} />

        <div className="mt-14 space-y-14">
          {groupByPart(practices).map(({ number, title, target, from, to, items }) => (
            <section key={number} aria-labelledby={`bagian-${number}`}>
              <div className="border-b border-gold/25 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Bagian {number} · Praktik {from}–{to}
                </p>
                <h2 id={`bagian-${number}`} className="mt-2 font-display text-3xl font-light text-forest-deep">
                  {title}
                </h2>
                <p className="mt-2 max-w-2xl text-ink-soft">{target}</p>
              </div>

              {/* Equal rows, so a wrapped title or a progress line never makes one card taller than the rest. */}
              {items.length > 0 ? (
                <ol className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ practice, number: practiceNumber }) => (
                    <li key={practice.id}>
                      <Link
                        href={`/praktik/${practice.slug}`}
                        className="group flex h-full items-center gap-5 rounded-3xl border border-forest/10 bg-surface/60 p-5 backdrop-blur transition duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-surface hover:shadow-xl hover:shadow-brand/10"
                      >
                        <span className="relative flex size-12 shrink-0 items-center justify-center text-gold">
                          <Star className="absolute inset-0 size-12 transition-transform duration-700 group-hover:rotate-45" />
                          <span className="relative font-display text-sm font-semibold">{practiceNumber}</span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-lg font-medium leading-snug text-forest-deep">
                            {practice.title}
                          </span>
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
                <div className="mt-6 flex items-center gap-4 rounded-3xl border border-dashed border-gold/40 bg-paper-deep/40 px-6 py-8">
                  <Star className="size-10 shrink-0 text-gold/50" />
                  <p className="text-ink-soft">Praktik bagian ini sedang disiapkan. Silakan kembali lagi nanti.</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
