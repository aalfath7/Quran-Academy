import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { OverallProgress, PracticePills } from "@/components/practice/practice-progress-ui";
import { PracticeSheet } from "@/components/practice/practice-sheet";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getDb } from "@/db";
import { lessonHref } from "@/lib/categories";
import { PRACTICE_TOTAL } from "@/lib/practice-curriculum";
import { getPublishedLesson, listPublishedLessons, practiceDrillCount, practiceSections, soundKey } from "@/lib/lessons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const practice = await getPublishedLesson(await getDb(), (await params).slug);

  return practice ? { title: `${practice.title} · Praktik · Quran Academy`, description: practice.summary } : {};
}

export default async function PracticePage({ params }: Props) {
  const { slug } = await params;
  const db = await getDb();
  const practice = await getPublishedLesson(db, slug);
  if (!practice) notFound();
  if (practice.category !== "praktik") redirect(lessonHref(practice));

  const practices = await listPublishedLessons(db, "praktik");
  const index = practices.findIndex(({ id }) => id === practice.id);
  const neighbour = (i: number) => practices[i] && { slug: practices[i].slug, title: practices[i].title, number: i + 1 };
  const previous = neighbour(index - 1);
  const next = neighbour(index + 1);
  const { guide, sections } = practiceSections(practice.content);
  const totals = Object.fromEntries(practices.map(({ slug, content }) => [slug, practiceDrillCount(content)]));

  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="fullview:hidden">
        <SiteHeader />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:max-w-none fullview:pb-12 fullview:pt-0">
        {/* Jump to any practice, not only the neighbours */}
        <nav aria-label="Pilih praktik" className="rounded-3xl border border-forest/10 bg-surface/60 p-4 backdrop-blur md:p-5 fullview:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/praktik"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
            >
              <LayoutGrid aria-hidden="true" size={16} />
              Semua praktik
            </Link>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Praktik {index + 1} / {PRACTICE_TOTAL}
            </span>
          </div>
          <PracticePills practices={practices.map(({ slug, title }) => ({ slug, title }))} current={practice.slug} />
          <div className="mt-4 border-t border-forest/10 pt-4">
            <OverallProgress totals={totals} compact />
          </div>
        </nav>

        <PracticeSheet
          slug={practice.slug}
          number={index + 1}
          title={practice.title}
          guide={guide}
          sections={sections.map(({ label, rows }) => ({ label, key: label ? soundKey(label) : null, rows }))}
          previous={previous}
          next={next}
          totals={totals}
        />

        <nav className="mt-14 grid gap-4 sm:grid-cols-2 fullview:mx-auto fullview:max-w-[110rem]" aria-label="Praktik sebelumnya dan berikutnya">
          {previous ? (
            <Link
              href={`/praktik/${previous.slug}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <ArrowLeft aria-hidden="true" size={14} /> Praktik {previous.number}
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/praktik/${next.slug}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 text-right transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Praktik {next.number} <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{next.title}</span>
            </Link>
          )}
        </nav>
      </div>

      <div className="fullview:hidden">
        <SiteFooter />
      </div>
    </main>
  );
}
