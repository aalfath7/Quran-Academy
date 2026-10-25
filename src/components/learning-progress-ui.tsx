"use client";

import { ArrowRight, Check, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  emptyLessonProgress,
  LAST_LEARNED_KEY,
  LESSON_PROGRESS_KEY,
  lessonOverallProgress,
  parseLastLearned,
  parseLessonProgress,
  toggleLessonDone,
  visitLesson,
  type LastLearned
} from "@/lib/learning-progress";
import { createLocalStore } from "./use-local-store";

export const useLessonProgress = createLocalStore(LESSON_PROGRESS_KEY, parseLessonProgress, emptyLessonProgress);
export const useLastLearned = createLocalStore<LastLearned>(LAST_LEARNED_KEY, parseLastLearned, null);

type LessonLink = { slug: string; title: string };

/** Saved automatically: opening a lesson makes it the one to continue, here and on "Mulai belajar". */
export function RecordLessonVisit({ slug, title }: LessonLink) {
  const [, update] = useLessonProgress();
  const [, setLastLearned] = useLastLearned();

  useEffect(() => {
    update((saved) => visitLesson(saved, slug));
    setLastLearned(() => ({ href: `/belajar/${slug}`, title }));
  }, [slug, title, update, setLastLearned]);

  return null;
}

/** Marks the lesson finished, or undoes it. */
export function LessonDoneToggle({ slug }: { slug: string }) {
  const [progress, update] = useLessonProgress();
  const done = progress.done.includes(slug);

  return (
    <div className="flex flex-col items-center gap-3 rounded-3xl border border-gold/30 bg-surface/60 p-6 text-center backdrop-blur">
      {done ? (
        <>
          <p className="inline-flex items-center gap-2 font-display text-lg text-forest-deep">
            <span className="flex size-6 items-center justify-center rounded-full bg-gold text-cream">
              <Check aria-hidden="true" size={14} strokeWidth={3} />
            </span>
            Materi ini sudah selesai
          </p>
          <button
            type="button"
            onClick={() => update((saved) => toggleLessonDone(saved, slug))}
            className="inline-flex items-center gap-1.5 text-sm text-ink-soft transition hover:text-forest"
          >
            <RotateCcw aria-hidden="true" size={14} /> Tandai belum selesai
          </button>
        </>
      ) : (
        <>
          <p className="text-ink-soft">Sudah memahami materi ini?</p>
          <button
            type="button"
            onClick={() => update((saved) => toggleLessonDone(saved, slug))}
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
          >
            <Check aria-hidden="true" size={16} strokeWidth={2.5} /> Tandai selesai
          </button>
        </>
      )}
    </div>
  );
}

/** Small status line on a lesson card. */
export function LessonCardStatus({ slug }: { slug: string }) {
  const [progress] = useLessonProgress();
  if (!progress.done.includes(slug)) return null;

  return (
    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-gold">
      <Check aria-hidden="true" size={13} strokeWidth={3} /> Sudah selesai
    </span>
  );
}

/** "Continue" link to the lesson among `lessons` opened last in this browser. */
export function ContinueLesson({ lessons }: { lessons: LessonLink[] }) {
  const [progress] = useLessonProgress();
  const lesson = lessons.find(({ slug }) => slug === progress.last);
  if (!lesson) return null;

  return (
    <Link
      href={`/belajar/${lesson.slug}`}
      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
    >
      Lanjutkan: {lesson.title}
      <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
    </Link>
  );
}

/** Progress across the published lessons in view. */
export function LessonProgress({ slugs }: { slugs: string[] }) {
  const [progress] = useLessonProgress();
  const { doneLessons, totalLessons, percent } = lessonOverallProgress(progress, slugs);
  if (totalLessons === 0) return null;

  return (
    <div className="mt-10 max-w-xl rounded-3xl border border-gold/30 bg-surface/60 p-5 backdrop-blur">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Progres materi</p>
        <p className="font-display text-3xl font-light text-forest-deep">{percent}%</p>
      </div>
      <span
        role="progressbar"
        aria-label="Progres materi"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        className="mt-3 block h-2.5 overflow-hidden rounded-full bg-forest/10"
      >
        <span className="block h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${percent}%` }} />
      </span>
      <p className="mt-3 text-sm text-ink-soft">
        {doneLessons} dari {totalLessons} materi selesai
      </p>
    </div>
  );
}
