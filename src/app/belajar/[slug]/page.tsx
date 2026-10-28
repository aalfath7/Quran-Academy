import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { LessonDoneToggle, RecordLessonVisit } from "@/components/learning-progress-ui";
import { TajwidLesson } from "@/components/lesson/tajwid-lesson";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { getDb } from "@/db";
import { categoryInfo } from "@/lib/categories";
import { lessonLayout, readingMinutes } from "@/lib/lesson-layout";
import { contentBlocks, drillRows, getPublishedLesson, listPublishedLessons } from "@/lib/lessons";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = await getPublishedLesson(await getDb(), (await params).slug);

  return lesson ? pageMetadata({ title: `${lesson.title} · Belajar Tajwid`, description: lesson.summary, path: `/belajar/${lesson.slug}` }) : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const db = await getDb();
  const lesson = await getPublishedLesson(db, slug);
  if (!lesson) notFound();
  if (lesson.category === "praktik") redirect(`/praktik/${lesson.slug}`);

  const category = categoryInfo[lesson.category];
  const siblings = await listPublishedLessons(db, lesson.category);
  const index = siblings.findIndex(({ id }) => id === lesson.id);
  const previous = siblings[index - 1];
  const next = siblings[index + 1];
  const blocks = contentBlocks(lesson.content);
  const isMatan = lesson.category === "jazariyah";

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lesson.title,
            description: lesson.summary,
            url: absoluteUrl(`/belajar/${lesson.slug}`),
            inLanguage: "id-ID",
            learningResourceType: "Materi",
            educationalLevel: "Pemula",
            teaches: category.label,
            isAccessibleForFree: true,
            datePublished: lesson.createdAt.toISOString(),
            dateModified: lesson.updatedAt.toISOString(),
            provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL }
          },
          breadcrumbJsonLd([["Beranda", "/"], [category.label, "/belajar"], [lesson.title, `/belajar/${lesson.slug}`]])
        ]} />
      <BackgroundGlow />
      <SiteHeader />

      <RecordLessonVisit slug={lesson.slug} title={lesson.title} />
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
          <div className="pattern-girih relative mt-12 overflow-hidden rounded-[2rem] bg-brand-deep px-8 py-12 text-center">
            <div className="absolute inset-0 bg-radial from-brand/50 to-brand-deep" />
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

        {lesson.category === "tajwid" ? (
          <TajwidLesson layout={lessonLayout(lesson.content)} minutes={readingMinutes(lesson.content)} />
        ) : (
          <div className="mt-12 space-y-6 text-[1.075rem] leading-8 text-ink">
            {blocks.map(({ text, arabic }, i) => {
              if (!arabic) {
                return (
                  <p key={i} className="whitespace-pre-line first-of-type:first-letter:float-left first-of-type:first-letter:mr-3 first-of-type:first-letter:font-display first-of-type:first-letter:text-6xl first-of-type:first-letter:leading-[0.9] first-of-type:first-letter:text-gold">
                    {text}
                  </p>
                );
              }

              const lines = text.split("\n").map((line) => line.trim()).filter(Boolean);

              // A bait of a matan is two hemistichs on consecutive lines: side by side on wide screens, the first on the right.
              if (isMatan) {
                return (
                  <blockquote
                    key={i}
                    className={`mt-10! grid gap-x-10 gap-y-1 rounded-2xl border border-gold/25 bg-paper-deep/50 px-6 py-6 text-center font-arabic text-2xl leading-[2.1] text-forest-deep md:text-[1.7rem] ${lines.length % 2 === 0 ? "md:grid-cols-2" : ""}`}
                    lang="ar"
                    dir="rtl"
                  >
                    {lines.map((line, j) => (
                      <span key={j}>{line}</span>
                    ))}
                  </blockquote>
                );
              }

              // Otherwise each line is a row of reading drill; two or more spaces separate groups that never break apart.
              return (
                <div
                  key={i}
                  className="mt-8! space-y-3 rounded-2xl border border-gold/25 bg-paper-deep/50 px-4 py-6 text-center font-arabic text-[1.9rem] leading-[1.9] text-forest-deep md:px-6 md:text-4xl"
                  lang="ar"
                  dir="rtl"
                >
                  {drillRows(text).map((groups, j) => (
                    <p key={j} className="flex flex-wrap justify-center gap-x-8 gap-y-2 md:gap-x-10">
                      {groups.map((group, k) => (
                        <span key={k} className="whitespace-nowrap [word-spacing:0.25em]">
                          {group}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              );
            })}
          </div>
        )}

        <div className="my-14 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gold/30" />
          <Star className="size-6" />
          <span className="h-px w-16 bg-gold/30" />
        </div>

        <LessonDoneToggle slug={lesson.slug} />

        <nav className="mt-8 grid gap-4 sm:grid-cols-2" aria-label="Materi lain">
          {previous ? (
            <Link
              href={`/belajar/${previous.slug}`}
              className="group rounded-2xl border border-forest/10 bg-surface/60 p-5 transition hover:border-gold/40 hover:bg-surface"
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
              className="group rounded-2xl border border-forest/10 bg-surface/60 p-5 text-right transition hover:border-gold/40 hover:bg-surface"
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
