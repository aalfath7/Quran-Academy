"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { overallProgress, practiceStatus } from "@/lib/practice-progress";
import { usePracticeProgress } from "./use-practice-progress";

type PracticeLink = { slug: string; title: string };
type NumberedPracticeLink = PracticeLink & { number: number };
/** The curriculum part being studied: its number and the slugs of its published practices. */
export type CurrentPart = { number: number; slugs: string[] };

/** Numbered links to the given practices (usually one part), marked by the progress saved in this browser. */
export function PracticePills({ practices, current }: { practices: NumberedPracticeLink[]; current: string }) {
  const [progress] = usePracticeProgress();

  return (
    <ol className="mt-4 flex flex-wrap gap-2">
      {practices.map(({ slug, title, number }) => {
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
              {number}
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
      Lanjutkan Ibtida {index + 1}: {practices[index].title}
      <ArrowRight aria-hidden="true" size={16} className="transition group-hover:translate-x-1" />
    </Link>
  );
}

/**
 * Compact progress bar across every practice; `totals` maps each practice to its number of drill sections.
 * With `part`, the bar tracks that part and the whole series is shown as a figure beside it.
 */
export function OverallProgress({ totals, part }: { totals: Record<string, number>; part?: CurrentPart }) {
  const [progress] = usePracticeProgress();
  const { totalSections, donePractices, totalPractices, percent } = overallProgress(progress, totals);
  if (totalSections === 0) return null;

  if (part) {
    const partTotals = Object.fromEntries(part.slugs.map((slug) => [slug, totals[slug] ?? 0]));
    const inPart = overallProgress(progress, partTotals);

    return (
      <div className="flex items-center gap-3 text-xs text-ink-soft">
        <span className="shrink-0 font-semibold text-forest-deep">
          Bagian {part.number} · {inPart.percent}%
        </span>
        <span className="min-w-16 flex-1">
          <span
            role="progressbar"
            aria-label={`Progres bagian ${part.number}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={inPart.percent}
            className="block h-1.5 overflow-hidden rounded-full bg-forest/10"
          >
            <span className="block h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${inPart.percent}%` }} />
          </span>
        </span>
        <span className="hidden shrink-0 sm:inline">
          {inPart.donePractices}/{inPart.totalPractices} latihan
        </span>
        <span className="shrink-0 border-l border-forest/15 pl-3" title={`${donePractices}/${totalPractices} latihan selesai`}>
          Keseluruhan {percent}%
        </span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 text-xs text-ink-soft">
      <span className="shrink-0 font-semibold text-forest-deep">Keseluruhan {percent}%</span>
      <span className="min-w-16 flex-1">
        <span
          role="progressbar"
          aria-label="Progres keseluruhan Ibtida"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={percent}
          className="block h-1.5 overflow-hidden rounded-full bg-forest/10"
        >
          <span className="block h-full rounded-full bg-gold transition-all duration-500" style={{ width: `${percent}%` }} />
        </span>
      </span>
      <span className="hidden shrink-0 sm:inline">
        {donePractices}/{totalPractices} latihan selesai
      </span>
    </div>
  );
}
