"use client";

import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import { PRACTICE_TOTAL, practicePart } from "@/lib/practice-curriculum";
import {
  practiceStatus,
  resetPractice,
  toggleSection,
  visitPractice,
} from "@/lib/practice-progress";
import { useLastLearned } from "../learning-progress-ui";
import { useFullscreen } from "../fullscreen-frame";
import { type CurrentPart, OverallProgress } from "./practice-progress-ui";
import { usePracticeProgress } from "./use-practice-progress";

export type SheetSection = {
  label?: string;
  /** Set when the label is a sound key ("ba = بَ · ..."), shown as one entry per vowel. */
  key: { reading: string; forms: string[] }[] | null;
  rows: string[][];
};

type Neighbour = { slug: string; title: string; number: number };

// Same spacing between groups and between pairs, so a row that fits on one line looks evenly spaced.
const GROUP_GAP =
  "gap-x-10 md:gap-x-14 fullview:md:gap-x-[clamp(3rem,4.5vw,5.5rem)]";

/**
 * Drill groups in twos. Each pair wraps as a unit, so a four-group row breaks 2 + 2 instead of 3 + 1,
 * and wide letters (ص ش ض) never run into the next group the way fixed columns let them.
 */
function pairs(groups: string[]) {
  const result: string[][] = [];
  for (let i = 0; i < groups.length; i += 2)
    result.push(groups.slice(i, i + 2));
  return result;
}

/** A label's note, where "[text](/path)" becomes a link within the site (e.g. a surah page). */
function Note({ text }: { text: string }) {
  const parts = text.split(/\[([^\]]+)\]\((\/[^)\s]*)\)/);

  return parts.map((part, i) =>
    i % 3 === 1 ? (
      <Link
        key={i}
        href={parts[i + 1]}
        className="font-medium text-forest underline decoration-gold/50 decoration-2 underline-offset-4 transition hover:decoration-gold"
      >
        {part}
      </Link>
    ) : i % 3 === 2 ? null : (
      part
    ),
  );
}

type Props = {
  slug: string;
  number: number;
  title: string;
  guide: string[];
  sections: SheetSection[];
  previous?: Neighbour;
  next?: Neighbour;
  /** Drill count of every practice, for the overall progress shown in fullscreen. */
  totals: Record<string, number>;
  part: CurrentPart;
};

export function PracticeSheet({
  slug,
  number,
  title,
  guide,
  sections,
  previous,
  next,
  totals,
  part: currentPart,
}: Props) {
  const fullscreen = useFullscreen();
  const part = practicePart(number);
  const [progress, update] = usePracticeProgress();
  const [, setLastLearned] = useLastLearned();

  // Only drill sections can be marked; number them in order so marks survive label edits.
  const drillIndex = new Map<number, number>();
  sections.forEach(({ rows }, i) => {
    if (rows.length > 0) drillIndex.set(i, drillIndex.size);
  });
  const total = drillIndex.size;
  const entry = progress.practices[slug];
  const done = new Set(entry?.done ?? []);
  const finished = practiceStatus(entry) === "done";

  // Saved automatically: opening a practice makes it the one to continue.
  useEffect(() => {
    update((saved) => visitPractice(saved, slug, total));
    setLastLearned(() => ({ href: `/praktik/${slug}`, title: `Praktik ${number}: ${title}` }));
  }, [slug, total, update, number, title, setLastLearned]);

  return (
    <article className="mt-8 rounded-[2rem] border border-gold/30 bg-surface/80 px-4 shadow-sm backdrop-blur sm:px-8 md:px-12 fullview:mx-auto fullview:mt-0 fullview:max-w-[110rem] fullview:border-0 fullview:bg-transparent fullview:shadow-none">
      <header className="sticky top-0 z-10 -mx-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-gold/30 bg-surface/95 px-4 py-5 backdrop-blur sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 rounded-t-[2rem] fullview:rounded-none fullview:bg-paper fullview:backdrop-blur-none">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Praktik {number} / {PRACTICE_TOTAL} · Bagian {part.number}: {part.title}
          </p>
          <h1 className="mt-1 font-display text-2xl font-light leading-tight tracking-tight text-forest-deep md:text-3xl">
            {title}
          </h1>
          {total > 0 && (
            <div className="mt-2 flex items-center gap-3 text-xs text-ink-soft">
              <span className="h-1.5 w-28 overflow-hidden rounded-full bg-forest/10">
                <span
                  className="block h-full rounded-full bg-gold transition-all"
                  style={{ width: `${(done.size / total) * 100}%` }}
                />
              </span>
              <span>
                {done.size}/{total} bagian lancar
              </span>
            </div>
          )}
          {/* Outside fullscreen the menu panel above already shows this. */}
          {fullscreen.active && (
            <div className="mt-2 w-96 max-w-full">
              <OverallProgress totals={totals} compact part={currentPart} />
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Previous and next stay reachable when the page navigation is hidden in fullscreen. */}
          {fullscreen.active && previous && (
            <Link
              href={`/praktik/${previous.slug}`}
              title={previous.title}
              className="flex size-10 items-center justify-center rounded-full border border-forest/15 text-forest-deep transition hover:border-forest/40"
            >
              <ArrowLeft aria-hidden="true" size={16} />
              <span className="sr-only">Praktik {previous.number}</span>
            </Link>
          )}
          {fullscreen.active && next && (
            <Link
              href={`/praktik/${next.slug}`}
              title={next.title}
              className="flex size-10 items-center justify-center rounded-full border border-forest/15 text-forest-deep transition hover:border-forest/40"
            >
              <ArrowRight aria-hidden="true" size={16} />
              <span className="sr-only">Praktik {next.number}</span>
            </Link>
          )}
          <button
            type="button"
            onClick={fullscreen.toggle}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-forest/15 px-4 text-sm font-medium text-forest-deep transition hover:border-forest/40"
          >
            {fullscreen.active ? (
              <Minimize2 aria-hidden="true" size={15} />
            ) : (
              <Maximize2 aria-hidden="true" size={15} />
            )}
            {fullscreen.active ? "Keluar" : "Layar penuh"}
          </button>
        </div>

        {guide.length > 0 && (
          <details className="group w-full text-ink-soft">
            <summary className="flex w-fit cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-forest marker:hidden">
              Petunjuk
              <ChevronDown
                aria-hidden="true"
                size={15}
                className="transition group-open:rotate-180"
              />
            </summary>
            <div className="mt-2 max-w-2xl space-y-2 text-sm leading-6">
              {guide.map((paragraph, i) => (
                <p key={i} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>
          </details>
        )}
      </header>

      {sections.map(({ label, key, rows }, i) => {
        const drill = drillIndex.get(i);
        const isDone = drill !== undefined && done.has(drill);

        return (
          <section
            key={i}
            className="border-t-2 border-dashed border-gold/30 py-7 first-of-type:border-t-0 md:py-9"
          >
            {/* Shrinks to the drill rows, so the sound key spans exactly the drills below it. */}
            <div className="mx-auto w-fit max-w-full">
              {key ? (
                // Read right to left like the drills: the fathah entry sits over the right edge, dhammah over the left.
                <div
                  className="mb-6 flex flex-wrap items-baseline justify-center gap-x-6 gap-y-1 border-b sm:justify-between border-gold/25 px-2 pb-4 md:mb-8"
                  dir="rtl"
                >
                  {key.map(({ reading, forms }) => (
                    <p
                      key={reading}
                      className="flex items-baseline gap-2 text-ink-soft"
                      dir="ltr"
                    >
                      <span className="font-display text-lg italic md:text-xl">
                        {reading}
                      </span>
                      {[...forms].reverse().map((form) => (
                        <span key={form} className="flex items-baseline gap-2">
                          <span className="text-gold">=</span>
                          <span
                            className="font-arabic text-3xl text-gold md:text-4xl fullview:md:text-5xl"
                            lang="ar"
                          >
                            {form}
                          </span>
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              ) : (
                label && (
                  // The first line names the exercise; any further lines are a note under it.
                  <div className="mb-4 text-center">
                    <h2 className="text-sm font-semibold text-forest">
                      {label.split("\n")[0]}
                    </h2>
                    {label.includes("\n") && (
                      <p className="mx-auto mt-1 max-w-xl whitespace-pre-line text-sm leading-6 text-ink-soft">
                        <Note text={label.split("\n").slice(1).join("\n")} />
                      </p>
                    )}
                  </div>
                )
              )}

              {rows.length > 0 && (
                <div
                  className={`space-y-3 font-arabic text-[1.75rem] leading-[1.9] transition-colors sm:text-3xl md:text-[2.15rem] fullview:md:text-[clamp(2.15rem,2.6vw,3rem)] fullview:md:leading-[1.8] ${
                    isDone ? "text-forest-deep/45" : "text-forest-deep"
                  }`}
                  lang="ar"
                  dir="rtl"
                >
                  {rows.map((groups, j) => (
                    <p
                      key={j}
                      className={`flex flex-wrap justify-center gap-y-2 ${GROUP_GAP}`}
                    >
                      {pairs(groups).map((pair, k) => (
                        <span key={k} className={`flex ${GROUP_GAP}`}>
                          {pair.map((group, l) => (
                            <span
                              key={l}
                              className="whitespace-nowrap [word-spacing:0.12em]"
                            >
                              {group}
                            </span>
                          ))}
                        </span>
                      ))}
                    </p>
                  ))}
                </div>
              )}
            </div>

            {drill !== undefined && (
              <div className="mt-5 flex justify-center">
                <button
                  type="button"
                  aria-pressed={isDone}
                  onClick={() =>
                    update((saved) => toggleSection(saved, slug, drill, total))
                  }
                  className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-1.5 text-xs font-semibold transition ${
                    isDone
                      ? "border-brand bg-brand text-cream"
                      : "border-forest/15 text-ink-soft hover:border-gold/60 hover:text-forest-deep"
                  }`}
                >
                  <Check aria-hidden="true" size={14} />
                  {isDone ? "Sudah lancar" : "Tandai lancar"}
                </button>
              </div>
            )}
          </section>
        );
      })}

      {total > 0 && (
        <footer className="flex flex-col items-center gap-3 border-t border-gold/30 py-7 text-center text-sm text-ink-soft">
          {finished ? (
            <>
              <p className="font-display text-xl text-forest-deep">
                Alhamdulillah, praktik ini sudah lancar.
              </p>
              {next && (
                <Link
                  href={`/praktik/${next.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 font-semibold text-cream transition hover:bg-brand-deep"
                >
                  Lanjut ke Praktik {next.number}{" "}
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              )}
            </>
          ) : (
            <p>
              Tandai setiap bagian yang sudah lancar. Progres tersimpan otomatis
              di perangkat ini.
            </p>
          )}
          {done.size > 0 && (
            <button
              type="button"
              onClick={() => update((saved) => resetPractice(saved, slug))}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-soft transition hover:text-forest"
            >
              <RotateCcw aria-hidden="true" size={13} /> Ulangi dari awal
            </button>
          )}
        </footer>
      )}
    </article>
  );
}
