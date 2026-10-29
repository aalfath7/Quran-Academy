import { ArrowLeft, ArrowRight, LayoutGrid, Target } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { FullscreenToggle } from "@/components/fullscreen-frame";
import { JsonLd } from "@/components/json-ld";
import { LessonDoneToggle, LessonPills, RecordLessonVisit } from "@/components/learning-progress-ui";
import { MeetingLesson } from "@/components/lesson/meeting-lesson";
import { TajwidLesson } from "@/components/lesson/tajwid-lesson";
import { BackgroundGlow, SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Star } from "@/components/star";
import { categoryInfo } from "@/lib/categories";
import { lessonLayout, readingMinutes } from "@/lib/lesson-layout";
import { getLesson, listLessons } from "@/lib/lessons";
import { meetingDrills, meetingPages, meetingPlan } from "@/lib/meeting-plan";
import { listAyahsByRef, listPagesAyahs } from "@/lib/quran";
import { groupByStage, tajwidStage } from "@/lib/tajwid-curriculum";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata, SITE_NAME, SITE_URL } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return listLessons("tajwid").map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lesson = getLesson((await params).slug);

  return lesson ? pageMetadata({ title: `${lesson.title} · Lanjutan`, description: lesson.summary, path: `/lanjutan/${lesson.slug}` }) : {};
}

export default async function LessonPage({ params }: Props) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  if (lesson.category === "praktik") redirect(`/pemula/${lesson.slug}`);

  const category = categoryInfo[lesson.category];
  const siblings = listLessons(lesson.category);
  const index = siblings.findIndex(({ slug }) => slug === lesson.slug);
  const previous = siblings[index - 1];
  const next = siblings[index + 1];

  // Lessons written as class meetings get their drilled ayahs and mushaf pages from the Qur'an data.
  const plan = meetingPlan(lesson.content);
  const drilledAyahs = plan ? listAyahsByRef(meetingDrills(plan)) : [];
  const pageAyahs = plan ? listPagesAyahs(meetingPages(plan)) : [];
  const stage = plan ? tajwidStage(index + 1) : null;

  const jsonLd = (
      <JsonLd data={[
          {
            "@context": "https://schema.org",
            "@type": "LearningResource",
            name: lesson.title,
            description: lesson.summary,
            url: absoluteUrl(`/lanjutan/${lesson.slug}`),
            inLanguage: "id-ID",
            learningResourceType: "Materi",
            educationalLevel: "Pemula",
            teaches: category.label,
            isAccessibleForFree: true,
            provider: { "@type": "EducationalOrganization", name: SITE_NAME, url: SITE_URL }
          },
          breadcrumbJsonLd([["Beranda", "/"], [category.label, "/lanjutan"], [lesson.title, `/lanjutan/${lesson.slug}`]])
        ]} />
  );

  const neighbours = (
    <nav className="mx-auto mt-8 grid max-w-3xl gap-4 sm:grid-cols-2" aria-label="Materi lain">
      {previous ? (
        <Link
          href={`/lanjutan/${previous.slug}`}
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
          href={`/lanjutan/${next.slug}`}
          className="group rounded-2xl border border-forest/10 bg-surface/60 p-5 text-right transition hover:border-gold/40 hover:bg-surface"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-gold">
            Berikutnya <ArrowRight aria-hidden="true" size={14} />
          </span>
          <span className="mt-2 block font-display text-lg text-forest-deep">{next.title}</span>
        </Link>
      )}
    </nav>
  );

  // A class meeting is studied like a Pemula practice: pick a stage and meeting above, then read the materi beside the practice.
  if (plan && stage) {
    const stages = groupByStage(siblings).filter(({ items }) => items.length > 0);
    const currentStage = stages.find(({ number }) => number === stage.number) ?? stages[0];

    return (
      <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
        {jsonLd}
        <div className="fullview:hidden">
          <BackgroundGlow />
          <SiteHeader />
        </div>
        <RecordLessonVisit slug={lesson.slug} title={lesson.title} />

        <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:py-4">
          <nav aria-label="Pilih materi" className="rounded-3xl border border-forest/10 bg-surface/60 p-4 md:p-5 md:backdrop-blur fullview:hidden">
            <div className="flex items-center justify-between gap-4">
              <Link href="/lanjutan" className="inline-flex items-center gap-2 text-sm font-medium text-ink-soft transition hover:text-forest">
                <LayoutGrid aria-hidden="true" size={16} />
                Semua materi
              </Link>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Lanjutan · Tahap {stage.number}</span>
            </div>
            {stages.length > 1 && (
              <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Pilih tahap">
                {stages.map(({ number, title, items }) => (
                  <li key={number}>
                    <Link
                      href={`/lanjutan/${items[0].meeting.slug}`}
                      title={title}
                      aria-current={number === stage.number ? "true" : undefined}
                      className={`inline-block rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
                        number === stage.number ? "bg-brand text-cream" : "bg-forest/5 text-forest-deep hover:bg-forest/10"
                      }`}
                    >
                      Tahap {number}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-sm font-medium text-forest-deep">{currentStage.title}</p>
            <LessonPills
              lessons={currentStage.items.map(({ meeting: { slug, title }, number }) => ({ slug, title, number }))}
              current={lesson.slug}
            />
          </nav>

          <header className="mt-4 flex flex-col gap-4 rounded-3xl border border-forest/10 bg-surface/60 p-5 md:p-6 lg:flex-row lg:items-center lg:justify-between fullview:hidden">
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Tahap {stage.number} · {stage.title}
              </p>
              <h1 className="mt-1 font-display text-3xl font-light leading-tight tracking-tight text-forest-deep md:text-4xl">{lesson.title}</h1>
              <p className="mt-3 flex gap-2 leading-7 text-ink">
                <Target aria-hidden="true" size={18} className="mt-1 shrink-0 text-gold" />
                <span>
                  <span className="font-semibold text-forest-deep">Tujuan: </span>
                  {lesson.summary}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between gap-6 lg:shrink-0">
              {lesson.arabicText && (
                <p className="whitespace-pre-line font-arabic text-2xl leading-[1.9] text-gold lg:text-right" lang="ar" dir="rtl">
                  {lesson.arabicText}
                </p>
              )}
              <FullscreenToggle />
            </div>
          </header>

          <MeetingLesson plan={plan} ayahs={drilledAyahs} pages={pageAyahs} />

          {/* Fullscreen is for the materi and the practice only. */}
          <div className="fullview:hidden">
            <div className="mx-auto mt-10 max-w-3xl">
              <LessonDoneToggle slug={lesson.slug} />
            </div>
            {neighbours}
          </div>
        </div>

        <div className="fullview:hidden">
          <SiteFooter />
        </div>
      </main>
    );
  }

  return (
    <main className="grain relative min-h-screen overflow-hidden">
      {jsonLd}
      <BackgroundGlow />
      <SiteHeader />

      <RecordLessonVisit slug={lesson.slug} title={lesson.title} />
      <article className="relative mx-auto max-w-3xl px-6 pb-24 pt-8 md:pt-14">
        <Link
          href="/lanjutan"
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

        <TajwidLesson layout={lessonLayout(lesson.content)} minutes={readingMinutes(lesson.content)} />

        <div className="my-14 flex items-center justify-center gap-3 text-gold/60">
          <span className="h-px w-16 bg-gold/30" />
          <Star className="size-6" />
          <span className="h-px w-16 bg-gold/30" />
        </div>

        <LessonDoneToggle slug={lesson.slug} />

        {neighbours}
      </article>

      <SiteFooter />
    </main>
  );
}
