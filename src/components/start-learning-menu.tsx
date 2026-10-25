"use client";

import { ArrowRight, BookOpen, ChevronDown, PenLine } from "lucide-react";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { categoryInfo } from "@/lib/categories";
import { useLastLearned, useLessonProgress } from "./learning-progress-ui";
import { usePracticeProgress } from "./practice/use-practice-progress";

const choices = [
  { href: "/praktik", label: "Praktik", description: categoryInfo.praktik.description, icon: PenLine },
  { href: "/belajar", label: "Materi", description: "Tajwid dan matan Al-Jazariyah.", icon: BookOpen }
];

const alignClasses = {
  left: "left-0",
  center: "left-1/2 -translate-x-1/2",
  right: "right-0"
};

/**
 * "Lanjut belajar" goes straight back to the page studied last in this browser; a first-time visitor
 * sees "Mulai belajar" and picks between practice drills and reading material instead.
 */
export function StartLearningMenu({
  className = "",
  buttonClassName = "",
  align = "left",
  side = "bottom"
}: {
  className?: string;
  buttonClassName?: string;
  align?: keyof typeof alignClasses;
  /** Open upward where the button sits at the bottom of a clipped container. */
  side?: "top" | "bottom";
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuId = useId();
  const [lastLearned] = useLastLearned();
  const [practiceProgress] = usePracticeProgress();
  const [lessonProgress] = useLessonProgress();
  // Progress saved before the last page was recorded still points somewhere: practice first, then materi.
  const resume =
    lastLearned ??
    (practiceProgress.last ? { href: `/praktik/${practiceProgress.last}`, title: "" } : null) ??
    (lessonProgress.last ? { href: `/belajar/${lessonProgress.last}`, title: "" } : null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

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

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => setOpen((value) => !value)}
        className={`group inline-flex items-center gap-2 ${buttonClassName}`}
      >
        Mulai belajar
        <ChevronDown aria-hidden="true" size={16} className={`transition ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div
          id={menuId}
          className={`absolute z-30 w-72 rounded-2xl border border-forest/10 bg-surface p-2 text-left shadow-2xl shadow-brand-deep/20 ${alignClasses[align]} ${side === "top" ? "bottom-full mb-3" : "top-full mt-3"}`}
        >
          {choices.map(({ href, label, description, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-start gap-3 rounded-xl px-3 py-3 transition hover:bg-paper-deep/70"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand text-gold-soft">
                <Icon aria-hidden="true" size={17} strokeWidth={1.8} />
              </span>
              <span>
                <span className="block font-display text-base font-medium text-forest-deep">{label}</span>
                <span className="block text-sm leading-5 text-ink-soft">{description}</span>
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
