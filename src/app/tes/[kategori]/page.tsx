import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FullscreenToggle } from "@/components/fullscreen-frame";
import { QuizRunner } from "@/components/quiz/quiz-ui";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { categoryInfo, isMateriCategory, materiCategories } from "@/lib/categories";
import { quizBanks } from "@/lib/quiz-data";

type Props = { params: Promise<{ kategori: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return materiCategories.map((kategori) => ({ kategori }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kategori } = await params;

  return isMateriCategory(kategori) ? { title: `Uji Kemampuan ${categoryInfo[kategori].label} · Fathway Quran` } : {};
}

export default async function QuizPage({ params }: Props) {
  const { kategori } = await params;
  if (!isMateriCategory(kategori)) notFound();
  const { label, arabic } = categoryInfo[kategori];

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <section className="relative mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-14 fullview:pt-8">
        <div className="flex items-center justify-between gap-4">
          <Link href="/tes" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest">
            <ArrowLeft aria-hidden="true" size={16} />
            Semua tes
          </Link>
          <FullscreenToggle />
        </div>
        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-gold">Tes pemahaman</p>
        <h1 className="mt-4 font-display text-4xl font-light leading-[1.1] tracking-tight text-forest-deep md:text-5xl">
          Uji Kemampuan {label}{" "}
          <span className="font-arabic text-3xl text-gold md:text-4xl" lang="ar" dir="rtl">
            {arabic}
          </span>
        </h1>

        <QuizRunner category={kategori} bank={quizBanks[kategori]} />
      </section>

      <SiteFooter />
    </main>
  );
}
