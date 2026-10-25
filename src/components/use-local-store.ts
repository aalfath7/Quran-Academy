"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * A value saved in this browser's localStorage, shared by every component on the page.
 * It renders `empty` on the server and fills in after hydration; storage is only the persistence behind it.
 */
export function createLocalStore<T>(key: string, parse: (raw: string | null) => T, empty: T) {
  let current: T | null = null;
  const listeners = new Set<() => void>();

  function load() {
    try {
      return parse(localStorage.getItem(key));
    } catch {
      return empty;
    }
  }

  const getSnapshot = () => (current ??= load());
  const getServerSnapshot = () => empty;

  function subscribe(listener: () => void) {
    listeners.add(listener);
    // Another tab saved a new value.
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return;
      current = load();
      listener();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  }

  return function useLocalStore() {
    const value = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    const update = useCallback((change: (value: T) => T) => {
      current = change(getSnapshot());
      try {
        localStorage.setItem(key, JSON.stringify(current));
      } catch {
        // Storage can be full or blocked; the value still works until the page is closed.
      }
      listeners.forEach((listener) => listener());
    }, []);

    return [value, update] as const;
  };
}
