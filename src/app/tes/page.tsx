import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { QuizScoreBadge } from "@/components/quiz/quiz-ui";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { categoryInfo, materiCategories } from "@/lib/categories";
import { QUIZ_LENGTH } from "@/lib/quiz";
import { quizBanks } from "@/lib/quiz-data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Tes Pemahaman Tajwid",
  description: "Uji pemahaman materi tajwid dengan soal pilihan ganda acak.",
  path: "/tes"
});

export default function QuizListPage() {
  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-16">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Tes pemahaman</p>
        <h1 className="mt-4 max-w-3xl font-display text-5xl font-light leading-[1.08] tracking-tight text-forest-deep md:text-6xl">
          Seberapa paham <em className="italic text-gold">kamu?</em>
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">
          Pilih salah satu tes. Setiap kali mulai, {QUIZ_LENGTH} soal pilihan ganda diambil acak, jadi soalnya selalu
          berbeda.
        </p>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {materiCategories.map((category) => {
            const { label, arabic, description } = categoryInfo[category];

            return (
              <Link
                key={category}
                href={`/tes/${category}`}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest/10 bg-surface/60 p-8 backdrop-blur transition duration-500 hover:-translate-y-1 hover:border-gold/40 hover:bg-surface hover:shadow-2xl hover:shadow-brand/10"
              >
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-forest/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-forest">
                    {quizBanks[category].length} soal
                  </span>
                  <span className="font-arabic text-3xl text-gold/50 transition group-hover:text-gold" lang="ar" dir="rtl">
                    {arabic}
                  </span>
                </div>
                <h2 className="mt-6 font-display text-2xl font-medium text-forest-deep">Uji Kemampuan {label}</h2>
                <p className="mt-3 flex-1 leading-7 text-ink-soft">{description}</p>
                <QuizScoreBadge category={category} />
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest">
                  Mulai tes
                  <ArrowUpRight
                    aria-hidden="true"
                    size={16}
                    className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
