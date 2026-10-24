"use client";

import { useCallback, useSyncExternalStore } from "react";
import { emptyProgress, parseProgress, PRACTICE_PROGRESS_KEY, type PracticeProgress } from "@/lib/practice-progress";

// One shared copy for every component on the page; storage is only the persistence behind it.
let current: PracticeProgress | null = null;
const listeners = new Set<() => void>();

function load() {
  try {
    return parseProgress(localStorage.getItem(PRACTICE_PROGRESS_KEY));
  } catch {
    return emptyProgress;
  }
}

const getSnapshot = () => (current ??= load());
const getServerSnapshot = () => emptyProgress;

function subscribe(listener: () => void) {
  listeners.add(listener);
  // Another tab saved progress.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== PRACTICE_PROGRESS_KEY) return;
    current = load();
    listener();
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Practice progress saved automatically in this browser; it renders empty on the server and fills in after hydration. */
export function usePracticeProgress() {
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const update = useCallback((change: (progress: PracticeProgress) => PracticeProgress) => {
    current = change(getSnapshot());
    try {
      localStorage.setItem(PRACTICE_PROGRESS_KEY, JSON.stringify(current));
    } catch {
      // Storage can be full or blocked; progress still works until the page is closed.
    }
    listeners.forEach((listener) => listener());
  }, []);

  return [progress, update] as const;
}
