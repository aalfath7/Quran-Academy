"use client";

import { ChartNoAxesColumn, X } from "lucide-react";
import { useEffect, useState } from "react";
import { overallProgress } from "@/lib/practice-progress";
import type { CurrentPart } from "./practice-progress-ui";
import { usePracticeProgress } from "./use-practice-progress";

/**
 * The part picker and progress. From md up it sits inline in the page; on phones it would take half the
 * screen, so it becomes a drawer opened from a tab on the right edge.
 */
export function PracticeNavDrawer({
  totals,
  part,
  children
}: {
  totals: Record<string, number>;
  part: CurrentPart;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [progress] = usePracticeProgress();
  const { percent } = overallProgress(progress, Object.fromEntries(part.slugs.map((slug) => [slug, totals[slug] ?? 0])));

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-expanded={open}
        aria-controls="practice-nav-drawer"
        className="fixed right-0 top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-1 rounded-l-2xl border border-r-0 border-gold/40 bg-surface/95 px-2 py-3 text-forest-deep shadow-lg shadow-brand/10 backdrop-blur md:hidden fullview:hidden"
      >
        <ChartNoAxesColumn aria-hidden="true" size={18} className="text-gold" />
        <span className="font-display text-xs font-semibold">{percent}%</span>
        <span className="sr-only">Buka progres dan daftar latihan</span>
      </button>

      {open && <div className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm md:hidden" onClick={() => setOpen(false)} />}

      <div
        id="practice-nav-drawer"
        // Following a link inside the drawer goes to another practice, so close it.
        onClick={(event) => (event.target as HTMLElement).closest("a") && setOpen(false)}
        className={`max-md:fixed max-md:inset-y-0 max-md:right-0 max-md:z-50 max-md:w-[min(22rem,88vw)] max-md:overflow-y-auto max-md:border-l max-md:border-gold/30 max-md:bg-paper max-md:p-5 max-md:shadow-2xl max-md:transition-[transform,visibility] max-md:duration-300 ${
          open ? "" : "max-md:invisible max-md:translate-x-full"
        }`}
      >
        <div className="mb-2 flex items-center justify-between md:hidden">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Progres Ibtida</p>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="flex size-9 items-center justify-center rounded-full text-ink-soft transition hover:bg-surface hover:text-forest"
          >
            <X aria-hidden="true" size={18} />
            <span className="sr-only">Tutup</span>
          </button>
        </div>
        {children}
      </div>
    </>
  );
}
