"use client";

import { ArrowRight, BookOpen, PenLine, X } from "lucide-react";
import Link from "next/link";
import { useId, useRef } from "react";
import { categoryInfo } from "@/lib/categories";
import { useLastLearned, useLessonProgress } from "./learning-progress-ui";
import { usePracticeProgress } from "./practice/use-practice-progress";

const choices = [
  { href: "/praktik", label: "Praktik", description: categoryInfo.praktik.description, icon: PenLine },
  { href: "/belajar", label: "Materi", description: "Tajwid dan matan Al-Jazariyah.", icon: BookOpen }
];

/**
 * "Lanjut belajar" goes straight back to the page studied last in this browser; a first-time visitor
 * sees "Mulai belajar", which opens a modal to pick between practice drills and reading material.
 */
export function StartLearningMenu({
  className = "",
  buttonClassName = ""
}: {
  className?: string;
  buttonClassName?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const [lastLearned] = useLastLearned();
  const [practiceProgress] = usePracticeProgress();
  const [lessonProgress] = useLessonProgress();
  // Progress saved before the last page was recorded still points somewhere: practice first, then materi.
  const resume =
    lastLearned ??
    (practiceProgress.last ? { href: `/praktik/${practiceProgress.last}`, title: "" } : null) ??
    (lessonProgress.last ? { href: `/belajar/${lessonProgress.last}`, title: "" } : null);

  if (resume) {
    return (
      <div className={className}>
        <Link
          href={resume.href}
          title={resume.title ? `Lanjutkan: ${resume.title}` : undefined}
          className={`group inline-flex items-center gap-2 ${buttonClassName}`}
        >
          Lanjut belajar
          <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
        </Link>
      </div>
    );
  }

  const close = () => dialogRef.current?.close();

  return (
    <div className={className}>
      <button
        type="button"
        aria-haspopup="dialog"
        onClick={() => dialogRef.current?.showModal()}
        className={`group inline-flex items-center gap-2 ${buttonClassName}`}
      >
        Mulai belajar
        <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
      </button>

      {/* Native <dialog> sits in the top layer, so it escapes the header blur and clipped sections. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClick={(event) => {
          if (event.target === event.currentTarget) close();
        }}
        className="m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-forest/10 bg-surface p-0 text-left shadow-2xl shadow-brand-deep/20 backdrop:bg-brand-deep/50 backdrop:backdrop-blur-sm"
      >
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 id={titleId} className="font-display text-2xl font-medium text-forest-deep">
                Mulai dari mana?
              </h2>
              <p className="mt-1 text-sm text-ink-soft">Pilih latihan praktik atau baca materi lebih dulu.</p>
            </div>
            <button
              type="button"
              onClick={close}
              aria-label="Tutup"
              className="rounded-full p-1.5 text-ink-soft transition hover:bg-paper-deep/70 hover:text-forest-deep"
            >
              <X aria-hidden="true" size={18} />
            </button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            {choices.map(({ href, label, description, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                onClick={close}
                className="flex flex-col gap-3 rounded-2xl border border-forest/10 p-4 transition hover:border-forest/30 hover:bg-paper-deep/70"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-brand text-gold-soft">
                  <Icon aria-hidden="true" size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-display text-lg font-medium text-forest-deep">{label}</span>
                  <span className="block text-sm leading-5 text-ink-soft">{description}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </dialog>
    </div>
  );
}
