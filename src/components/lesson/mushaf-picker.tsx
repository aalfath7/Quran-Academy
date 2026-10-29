"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

/** The mushaf pages of a practice shown in place, one at a time; a row of page numbers switches between them. */
export function MushafPicker({ pages }: { pages: { page: number; view: ReactNode }[] }) {
  const [current, setCurrent] = useState(pages[0]?.page);
  const shown = pages.find(({ page }) => page === current) ?? pages[0];
  if (!shown) return null;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        {pages.length > 1 ? (
          <ul className="flex flex-wrap gap-1.5" aria-label="Pilih halaman">
            {pages.map(({ page }) => (
              <li key={page}>
                <button
                  type="button"
                  onClick={() => setCurrent(page)}
                  aria-pressed={page === shown.page}
                  className={`h-9 min-w-11 rounded-full px-3 font-display text-sm font-semibold transition ${
                    page === shown.page ? "bg-brand text-cream" : "border border-forest/15 bg-surface text-forest-deep hover:border-gold/60"
                  }`}
                >
                  {page}
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Halaman {shown.page}</p>
        )}
        <Link
          href={`/quran/halaman/${shown.page}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-ink-soft transition hover:text-forest"
        >
          Buka di pembaca mushaf
          <ArrowUpRight aria-hidden="true" size={15} />
        </Link>
      </div>
      {shown.view}
    </div>
  );
}
