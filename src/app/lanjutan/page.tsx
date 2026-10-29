import type { Metadata } from "next";
import Link from "next/link";
import { ContinueLesson, LessonCardStatus } from "@/components/learning-progress-ui";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { categoryInfo } from "@/lib/categories";
import { listLessons } from "@/lib/lessons";
import { pageMetadata } from "@/lib/seo";
import { groupByStage, tajwidStages } from "@/lib/tajwid-curriculum";

export const metadata: Metadata = pageMetadata({
  title: "Lanjutan: Lancar Membaca Al-Qur'an dan Paham Tajwid",
  description: `${categoryInfo.tajwid.audience} ${categoryInfo.tajwid.description}`,
  path: "/lanjutan"
});

export default function LearnPage() {
  const lessons = listLessons("tajwid");

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-12 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Lanjutan · lancar & bertajwid</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Lanjutan{" "}
          <span className="font-arabic text-4xl text-gold md:text-5xl" lang="ar" dir="rtl">
            {categoryInfo.tajwid.arabic}
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-lg font-medium leading-8 text-forest">{categoryInfo.tajwid.audience}</p>
        <p className="mt-2 max-w-xl text-lg leading-8 text-ink-soft">
          {categoryInfo.tajwid.description} {tajwidStages.length} tahap; setiap materi berisi penjelasan, latihan ayat, praktik mushaf, dan
          tugas mandiri.
        </p>
        <ContinueLesson lessons={lessons.map(({ slug, title }) => ({ slug, title }))} />
      </section>

      <section className="relative mx-auto max-w-6xl px-6 pb-24">
        <div className="space-y-14">
          {groupByStage(lessons).map(({ number, title, opening, openingSource, tip, items }) => (
            <section key={number} aria-labelledby={`tahap-${number}`}>
              <div className="border-b border-gold/25 pb-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  Tahap {number}
                </p>
                <h2 id={`tahap-${number}`} className="mt-2 font-display text-3xl font-light text-forest-deep">
                  {title}
                </h2>
                <p className="mt-2 max-w-2xl text-ink-soft">
                  &ldquo;{opening}&rdquo; <span className="text-sm text-ink-soft/80">({openingSource})</span>
                </p>
                {tip && <p className="mt-2 max-w-2xl text-sm text-ink-soft">{tip}</p>}
              </div>

              {items.length > 0 ? (
                <ol className="mt-6 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ meeting, number: meetingNumber }) => (
                    <li key={meeting.slug}>
                      <Link
                        href={`/lanjutan/${meeting.slug}`}
                        className="group flex h-full items-start gap-5 rounded-3xl border border-forest/10 bg-surface/60 p-5 backdrop-blur transition duration-500 hover:-translate-y-0.5 hover:border-gold/40 hover:bg-surface hover:shadow-xl hover:shadow-brand/10"
                      >
                        <span className="relative flex size-12 shrink-0 items-center justify-center text-gold">
                          <Star className="absolute inset-0 size-12 transition-transform duration-700 group-hover:rotate-45" />
                          <span className="relative font-display text-sm font-semibold">{meetingNumber}</span>
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-lg font-medium leading-snug text-forest-deep">{meeting.title}</span>
                          <span className="mt-1 line-clamp-2 block text-sm leading-6 text-ink-soft">{meeting.summary}</span>
                          <LessonCardStatus slug={meeting.slug} />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-6 flex items-center gap-4 rounded-3xl border border-dashed border-gold/40 bg-paper-deep/40 px-6 py-8">
                  <Star className="size-10 shrink-0 text-gold/50" />
                  <p className="text-ink-soft">Materi tahap ini sedang disiapkan. Silakan kembali lagi nanti.</p>
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
