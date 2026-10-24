"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { overallProgress, practiceStatus } from "@/lib/practice-progress";
import { usePracticeProgress } from "./use-practice-progress";

type PracticeLink = { slug: string; title: string };

/** Numbered links to every practice, marked by the progress saved in this browser. */
export function PracticePills({ practices, current }: { practices: PracticeLink[]; current: string }) {
  const [progress] = usePracticeProgress();

  return (
    <ol className="mt-4 flex flex-wrap gap-2">
      {practices.map(({ slug, title }, i) => {
        const isCurrent = slug === current;
        const status = practiceStatus(progress.practices[slug]);
        return (
          <li key={slug}>
            <Link
              href={`/praktik/${slug}`}
              title={status === "done" ? `${title} (sudah lancar)` : title}
              aria-current={isCurrent ? "page" : undefined}
              className={`relative flex size-10 items-center justify-center rounded-full border font-display text-sm font-semibold transition ${
                isCurrent
                  ? "border-brand bg-brand text-cream"
                  : status === "done"
                    ? "border-gold/60 bg-gold/15 text-forest-deep hover:bg-gold/25"
                    : status === "started"
                      ? "border-gold/60 text-forest-deep hover:bg-surface"
                      : "border-forest/15 text-forest-deep hover:border-gold/60 hover:bg-surface"
              }`}
            >
              {i + 1}
              {status === "done" && (
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

/** Small status line on a practice card. */
export function PracticeCardStatus({ slug }: { slug: string }) {
  const [progress] = usePracticeProgress();
  const entry = progress.practices[slug];
  const status = practiceStatus(entry);
  if (!entry || status === "new") return null;

  return status === "done" ? (
    <span className="mt-1.5 inline-flex items-center gap-1 text-xs font-semibold text-gold">
      <Check aria-hidden="true" size={13} strokeWidth={3} /> Sudah lancar
    </span>
  ) : (
    <span className="mt-1.5 block text-xs text-ink-soft">
      {entry.done.length}/{entry.total} bagian lancar
    </span>
  );
}

/** "Continue" link to the practice opened last in this browser. */
export function ContinuePractice({ practices }: { practices: PracticeLink[] }) {
  const [progress] = usePracticeProgress();
  const index = practices.findIndex(({ slug }) => slug === progress.last);
  if (index === -1) return null;

  return (
    <Link
      href={`/praktik/${practices[index].slug}`}
      className="group mt-8 inline-flex items-center gap-3 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-cream shadow-xl shadow-brand/20 transition hover:-translate-y-0.5 hover:bg-brand-deep"
    >
      Lanjutkan Praktik {index + 1}: {practices[index].title}
      <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
    </Link>
  );
}

/** Progress across every practice; `totals` maps each practice to its number of drill sections. */
export function OverallProgress({ totals, compact = false }: { totals: Record<string, number>; compact?: boolean }) {
  const [progress] = usePracticeProgress();
  const { doneSections, totalSections, donePractices, totalPractices, percent } = overallProgress(progress, totals);
  if (totalSections === 0) return null;

  const bar = (
    <span
      role="progressbar"
      aria-label="Progres keseluruhan praktik"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className={`block overflow-hidden rounded-full bg-forest/10 ${compact ? "h-1.5" : "h-2.5"}`}
    >
      <span className="block h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${percent}%` }} />
    </span>
  );

  if (compact) {
    return (
      <div className="flex items-center gap-3 text-xs text-ink-soft">
        <span className="shrink-0 font-semibold text-forest-deep">Keseluruhan {percent}%</span>
        <span className="min-w-16 flex-1">{bar}</span>
        <span className="hidden shrink-0 sm:inline">
          {donePractices}/{totalPractices} praktik selesai
        </span>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-xl rounded-3xl border border-gold/30 bg-surface/60 p-5 backdrop-blur">
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Progres keseluruhan</p>
        <p className="font-display text-3xl font-light text-forest-deep">{percent}%</p>
      </div>
      <div className="mt-3">{bar}</div>
      <p className="mt-3 text-sm text-ink-soft">
        {doneSections} dari {totalSections} bagian lancar · {donePractices} dari {totalPractices} praktik selesai
      </p>
    </div>
  );
}
