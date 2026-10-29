"use client";

import { ArrowRight, Check, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import {
  emptyLessonProgress,
  LAST_LEARNED_KEY,
  LESSON_PROGRESS_KEY,
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

/** Numbered links to the given lessons (usually one tajwid stage), marked by the lessons finished in this browser. */
export function LessonPills({ lessons, current }: { lessons: (LessonLink & { number: number })[]; current: string }) {
  const [progress] = useLessonProgress();

  return (
    <ol className="mt-4 flex flex-wrap gap-2">
      {lessons.map(({ slug, title, number }) => {
        const isCurrent = slug === current;
        const done = progress.done.includes(slug);
        return (
          <li key={slug}>
            <Link
              href={`/belajar/${slug}`}
              title={done ? `${title} (sudah selesai)` : title}
              aria-current={isCurrent ? "page" : undefined}
              className={`relative flex size-10 items-center justify-center rounded-full border font-display text-sm font-semibold transition ${
                isCurrent
                  ? "border-brand bg-brand text-cream"
                  : done
                    ? "border-gold/60 bg-gold/15 text-forest-deep hover:bg-gold/25"
                    : "border-forest/15 text-forest-deep hover:border-gold/60 hover:bg-surface"
              }`}
            >
              {number}
              {done && (
                <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-gold text-cream">
                  <Check aria-hidden="true" size={10} strokeWidth={3} />
                </span>
              )}
            </Link>
          </li>
        );
      })}
    </ol>
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
