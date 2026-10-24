// Dependency-free: practice progress lives in the viewer's own browser (localStorage), so it needs no account.

export const PRACTICE_PROGRESS_KEY = "praktik-progress";

/** Drill sections marked fluent in one practice, by their position among the practice's drills. */
export type PracticeEntry = { done: number[]; total: number };
export type PracticeProgress = { last: string | null; practices: Record<string, PracticeEntry> };
export type PracticeStatus = "new" | "started" | "done";

export const emptyProgress: PracticeProgress = { last: null, practices: {} };

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

/** Saved progress, tolerating missing, corrupt, or hand-edited values. */
export function parseProgress(raw: string | null): PracticeProgress {
  if (!raw) return emptyProgress;

  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return emptyProgress;
  }
  if (!isRecord(value)) return emptyProgress;

  const practices = isRecord(value.practices) ? value.practices : {};
  return {
    last: typeof value.last === "string" ? value.last : null,
    practices: Object.fromEntries(
      Object.entries(practices).flatMap(([slug, entry]) => {
        if (!isRecord(entry) || !Array.isArray(entry.done) || !Number.isInteger(entry.total)) return [];
        const total = entry.total as number;
        const done = [...new Set(entry.done.filter((i): i is number => Number.isInteger(i) && i >= 0 && i < total))].sort((a, b) => a - b);
        return [[slug, { done, total }]];
      })
    )
  };
}

/** Remembers the practice as the one to continue, keeping its marks if the drill count still matches. */
export function visitPractice(progress: PracticeProgress, slug: string, total: number): PracticeProgress {
  const done = (progress.practices[slug]?.done ?? []).filter((i) => i < total);

  return { last: slug, practices: { ...progress.practices, [slug]: { done, total } } };
}

export function toggleSection(progress: PracticeProgress, slug: string, index: number, total: number): PracticeProgress {
  const done = new Set(progress.practices[slug]?.done ?? []);
  if (done.has(index)) done.delete(index);
  else done.add(index);

  return { last: slug, practices: { ...progress.practices, [slug]: { done: [...done].sort((a, b) => a - b), total } } };
}

export function resetPractice(progress: PracticeProgress, slug: string): PracticeProgress {
  const entry = progress.practices[slug];

  return entry ? { ...progress, practices: { ...progress.practices, [slug]: { done: [], total: entry.total } } } : progress;
}

export function practiceStatus(entry: PracticeEntry | undefined): PracticeStatus {
  if (!entry) return "new";
  return entry.total > 0 && entry.done.length >= entry.total ? "done" : "started";
}

/**
 * Progress across the whole series. `totals` holds every published practice's drill count, so practices
 * never opened still count; marks beyond a practice's current drill count are ignored.
 */
export function overallProgress(progress: PracticeProgress, totals: Record<string, number>) {
  let doneSections = 0;
  let totalSections = 0;
  let donePractices = 0;
  const slugs = Object.keys(totals);

  for (const slug of slugs) {
    const total = totals[slug];
    const done = (progress.practices[slug]?.done ?? []).filter((i) => i < total).length;
    totalSections += total;
    doneSections += done;
    if (total > 0 && done >= total) donePractices++;
  }

  return {
    doneSections,
    totalSections,
    donePractices,
    totalPractices: slugs.length,
    percent: totalSections ? Math.round((doneSections / totalSections) * 100) : 0
  };
}
