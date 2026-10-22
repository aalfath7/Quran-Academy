import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { categoryInfo } from "@/lib/categories";
import { getPublishedLesson, listPublishedLessons } from "@/lib/lessons";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = await getPublishedLesson(await getDb(), (await params).slug);

  return lesson ? { title: `${lesson.title} · Quran Academy`, description: lesson.summary } : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const db = await getDb();
  const lesson = await getPublishedLesson(db, slug);
  if (!lesson) notFound();

  const category = categoryInfo[lesson.category];
  const siblings = await listPublishedLessons(db, lesson.category);
  const index = siblings.findIndex(({ id }) => id === lesson.id);
  const previous = siblings[index - 1];
  const next = siblings[index + 1];
  const paragraphs = lesson.content.split(/\n\s*\n/).filter((paragraph) => paragraph.trim());

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />

      <article className="relative mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-14">
        <Link
          href={`/belajar?kategori=${lesson.category}`}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest"
        >
          <ArrowLeft aria-hidden="true" size={16} />
          {category.label}
        </Link>

        <header className="mt-8">
          <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            <span>{category.label}</span>
            <span className="size-1 rotate-45 bg-gold" />
            <span>
              Materi {index + 1} dari {siblings.length}
            </span>
          </div>
          <h1 className="mt-5 font-display text-4xl font-light leading-[1.1] tracking-tight text-forest-deep md:text-6xl">
            {lesson.title}
          </h1>
          <p className="mt-6 text-lg leading-8 text-ink-soft">{lesson.summary}</p>
        </header>

        {lesson.arabicText && (
          <div className="pattern-girih relative mt-12 overflow-hidden rounded-[2rem] bg-forest-deep px-8 py-12 text-center">
            <div className="absolute inset-0 bg-radial from-forest/50 to-forest-deep" />
            <div className="relative">
              <Star className="mx-auto size-8 text-gold-soft/70" />
              <p
                className="mt-6 whitespace-pre-line font-arabic text-3xl leading-[2.1] text-gold-soft md:text-4xl"
                lang="ar"
                dir="rtl"
              >
                {lesson.arabicText}
              </p>
            </div>
          </div>
        )}

        <div className="mt-12 space-y-6 text-[1.075rem] leading-8 text-ink">
          {paragraphs.map((paragraph, i) => (
            <p key={i} className="whitespace-pre-line first-of-type:first-letter:float-left first-of-type:first-letter:mr-3 first-of-type:first-letter:font-display first-of-type:first-letter:text-6xl first-of-type:first-letter:leading-[0.9] first-of-type:first-letter:text-gold">
              {paragraph.trim()}
            </p>
          ))}
        </div>

        <div className="my-14 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gold/30" />
          <Star className="size-6" />
          <span className="h-px w-16 bg-gold/30" />
        </div>

        <nav className="grid gap-4 sm:grid-cols-2" aria-label="Materi lain">
          {previous ? (
            <Link
              href={`/belajar/${previous.slug}`}
              className="group rounded-2xl border border-forest/10 bg-white/60 p-5 transition hover:border-gold/40 hover:bg-white"
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                <ArrowLeft aria-hidden="true" size={14} /> Sebelumnya
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{previous.title}</span>
            </Link>
          ) : (
            <span />
          )}
          {next && (
            <Link
              href={`/belajar/${next.slug}`}
              className="group rounded-2xl border border-forest/10 bg-white/60 p-5 text-right transition hover:border-gold/40 hover:bg-white"
            >
              <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
                Berikutnya <ArrowRight aria-hidden="true" size={14} />
              </span>
              <span className="mt-2 block font-display text-lg text-forest-deep">{next.title}</span>
            </Link>
          )}
        </nav>
      </article>

      <SiteFooter />
    </main>
  );
}
