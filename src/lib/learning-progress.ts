// Dependency-free: like practice progress, materi progress lives in the viewer's own browser (localStorage).

export const LESSON_PROGRESS_KEY = "materi-progress";
export const LAST_LEARNED_KEY = "terakhir-belajar";

/** Materi lessons the viewer marked as finished, by slug, and the one opened last. */
export type LessonProgress = { last: string | null; done: string[] };
/** The page opened last across practice and materi, for "Mulai belajar". */
export type LastLearned = { href: string; title: string } | null;

export const emptyLessonProgress: LessonProgress = { last: null, done: [] };

const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === "object" && value !== null;

function parseJson(raw: string | null): unknown {
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

/** Saved materi progress, tolerating missing, corrupt, or hand-edited values. */
export function parseLessonProgress(raw: string | null): LessonProgress {
  const value = parseJson(raw);
  if (!isRecord(value)) return emptyLessonProgress;

  return {
    last: typeof value.last === "string" ? value.last : null,
    done: Array.isArray(value.done) ? [...new Set(value.done.filter((slug): slug is string => typeof slug === "string"))] : []
  };
}

export function parseLastLearned(raw: string | null): LastLearned {
  const value = parseJson(raw);
  // Only same-site paths, so a hand-edited value can never send the button elsewhere.
  if (!isRecord(value) || typeof value.href !== "string" || !/^\/(?!\/)/.test(value.href)) return null;

  return { href: value.href, title: typeof value.title === "string" ? value.title : "" };
}

export function visitLesson(progress: LessonProgress, slug: string): LessonProgress {
  return progress.last === slug ? progress : { ...progress, last: slug };
}

export function toggleLessonDone(progress: LessonProgress, slug: string): LessonProgress {
  const done = progress.done.includes(slug) ? progress.done.filter((s) => s !== slug) : [...progress.done, slug];

  return { last: slug, done };
}
