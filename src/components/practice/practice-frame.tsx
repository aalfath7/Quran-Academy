"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type Fullscreen = { active: boolean; toggle: () => void; scrollToTop: () => void };

const FullscreenContext = createContext<Fullscreen>({ active: false, toggle: () => {}, scrollToTop: () => {} });

export const usePracticeFullscreen = () => useContext(FullscreenContext);

/**
 * Wraps every /praktik page in one element that can go fullscreen. It lives in the layout, so moving to
 * another practice keeps fullscreen on. Browsers without element fullscreen (iPhone Safari) get a fixed
 * overlay instead. Inside, `fullview:` classes hide the site chrome.
 */
export function PracticeFrame({ children }: { children: React.ReactNode }) {
  const frame = useRef<HTMLDivElement>(null);
  const [native, setNative] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const active = native || overlay;

  useEffect(() => {
    const sync = () => setNative(document.fullscreenElement === frame.current);
    document.addEventListener("fullscreenchange", sync);
    return () => document.removeEventListener("fullscreenchange", sync);
  }, []);

  // The overlay has no browser chrome to leave it, so Escape closes it and the page behind stops scrolling.
  useEffect(() => {
    if (!overlay) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOverlay(false);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [overlay]);

  const toggle = useCallback(async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen().catch(() => {});
      return;
    }
    if (overlay) {
      setOverlay(false);
      return;
    }
    const element = frame.current;
    if (element && document.fullscreenEnabled && element.requestFullscreen) {
      try {
        await element.requestFullscreen();
        return;
      } catch {
        // Fall through to the overlay.
      }
    }
    setOverlay(true);
  }, [overlay]);

  const scrollToTop = useCallback(() => frame.current?.scrollTo({ top: 0 }), []);
  const value = useMemo(() => ({ active, toggle, scrollToTop }), [active, toggle, scrollToTop]);

  return (
    <FullscreenContext.Provider value={value}>
      <div
        ref={frame}
        data-fullview={active ? "" : undefined}
        className={active ? `bg-paper ${overlay ? "fixed inset-0 z-[70] overflow-y-auto" : "h-full overflow-y-auto"}` : undefined}
      >
        {children}
      </div>
    </FullscreenContext.Provider>
  );
}
