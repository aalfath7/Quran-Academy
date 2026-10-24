import { describe, expect, it } from "vitest";
import { emptyProgress, overallProgress, parseProgress, practiceStatus, resetPractice, toggleSection, visitPractice } from "../src/lib/practice-progress";

describe("practice progress", () => {
  it("falls back to empty progress for missing or corrupt storage", () => {
    expect(parseProgress(null)).toEqual(emptyProgress);
    expect(parseProgress("{not json")).toEqual(emptyProgress);
    expect(parseProgress("[1,2]")).toEqual({ last: null, practices: {} });
  });

  it("keeps only valid marks when reading saved progress", () => {
    const raw = JSON.stringify({
      last: "a",
      practices: { a: { done: [2, 0, 0, 9, -1, "x"], total: 3 }, b: { done: "no", total: 2 }, c: null }
    });

    expect(parseProgress(raw)).toEqual({ last: "a", practices: { a: { done: [0, 2], total: 3 } } });
  });

  it("toggles sections and remembers the last practice", () => {
    let progress = visitPractice(emptyProgress, "a", 2);
    expect(progress).toEqual({ last: "a", practices: { a: { done: [], total: 2 } } });

    progress = toggleSection(progress, "a", 1, 2);
    progress = toggleSection(progress, "a", 0, 2);
    expect(progress.practices.a.done).toEqual([0, 1]);
    expect(practiceStatus(progress.practices.a)).toBe("done");

    progress = toggleSection(progress, "a", 1, 2);
    expect(progress.practices.a.done).toEqual([0]);
    expect(practiceStatus(progress.practices.a)).toBe("started");
  });

  it("drops marks beyond a practice that now has fewer drills", () => {
    const progress = { last: "a", practices: { a: { done: [0, 4], total: 5 } } };

    expect(visitPractice(progress, "a", 3).practices.a).toEqual({ done: [0], total: 3 });
  });

  it("resets one practice and reports status", () => {
    const progress = { last: "a", practices: { a: { done: [0], total: 2 } } };

    expect(resetPractice(progress, "a").practices.a).toEqual({ done: [], total: 2 });
    expect(resetPractice(progress, "z")).toBe(progress);
    expect(practiceStatus(undefined)).toBe("new");
  });

  it("adds up progress across the series, counting practices never opened", () => {
    const progress = {
      last: "b",
      practices: { a: { done: [0, 1], total: 2 }, b: { done: [0, 7], total: 8 }, gone: { done: [0], total: 1 } }
    };

    expect(overallProgress(progress, { a: 2, b: 4, c: 4 })).toEqual({
      doneSections: 3,
      totalSections: 10,
      donePractices: 1,
      totalPractices: 3,
      percent: 30
    });
    expect(overallProgress(emptyProgress, {}).percent).toBe(0);
  });
});
