import { ArrowLeft, ArrowRight, LayoutGrid } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { PracticeNavDrawer } from "@/components/practice/practice-nav-drawer";
import { OverallProgress, PracticePills } from "@/components/practice/practice-progress-ui";
import { PracticeSheet } from "@/components/practice/practice-sheet";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { getDb } from "@/db";
import { lessonHref } from "@/lib/categories";
import { groupByPart, PRACTICE_TOTAL } from "@/lib/practice-curriculum";
import { getPublishedLesson, listPublishedLessons, practiceDrillCount, practiceSections, soundKey } from "@/lib/lessons";
import { pageMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const practice = await getPublishedLesson(await getDb(), (await params).slug);

  return practice ? pageMetadata({ title: `${practice.title} · Ibtida`, description: practice.summary, path: `/ibtida/${practice.slug}` }) : {};
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
  // Only the current part is listed while studying; the other parts are one tap away.
  const parts = groupByPart(practices).filter(({ items }) => items.length > 0);
  const currentPart = parts.find(({ items }) => items.some(({ practice: { id } }) => id === practice.id)) ?? parts[0];
  const part = { number: currentPart.number, slugs: currentPart.items.map(({ practice: { slug } }) => slug) };

  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="fullview:hidden">
        <SiteHeader />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:max-w-none fullview:pb-12 fullview:pt-0">
        {/* Jump to any practice, not only the neighbours */}
        <nav aria-label="Pilih latihan" className="rounded-3xl border border-forest/10 bg-surface/60 p-4 md:p-5 md:backdrop-blur fullview:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/ibtida"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
            >
              <LayoutGrid aria-hidden="true" size={16} />
              Semua latihan
            </Link>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Ibtida {index + 1} / {PRACTICE_TOTAL}
            </span>
          </div>
          {/* Blur stays off below md: backdrop-filter would trap the fixed drawer inside this panel. */}
          <PracticeNavDrawer totals={totals} part={part}>
            {parts.length > 1 && (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Pilih bagian">
                {parts.map(({ number, title, items }) => (
                  <li key={number}>
                    <Link
                      href={`/ibtida/${items[0].practice.slug}`}
                      title={title}
                      aria-current={number === currentPart.number ? "true" : undefined}
                      className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        number === currentPart.number
                          ? "bg-brand text-cream"
                          : "bg-forest/5 text-forest-deep hover:bg-forest/10"
                      }`}
                    >
                      Bagian {number}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-sm font-medium text-forest-deep">
              {currentPart.title}{" "}
              <span className="text-ink-soft">
                · Ibtida {currentPart.from}–{currentPart.to}
              </span>
            </p>
            <PracticePills
              practices={currentPart.items.map(({ practice: { slug, title }, number }) => ({ slug, title, number }))}
              current={practice.slug}
            />
            <div className="mt-4 border-t border-forest/10 pt-4">
              <OverallProgress totals={totals} part={part} />
            </div>
          </PracticeNavDrawer>
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
          part={part}
        />

        <nav className="mt-14 grid gap-4 sm:grid-cols-2 fullview:mx-auto fullview:max-w-[110rem]" aria-label="Latihan sebelumnya dan berikutnya">
          {previous ? (
            <Link
              href={`/ibtida/${previous.slug}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <ArrowLeft aria-hidden="true" size={14} /> Ibtida {previous.number}
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/ibtida/${next.slug}`}
              className="rounded-2xl border border-forest/10 bg-surface/60 p-5 text-right transition hover:border-gold/40 hover:bg-surface"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Ibtida {next.number} <ArrowRight aria-hidden="true" size={14} />
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
