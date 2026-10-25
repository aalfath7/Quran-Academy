"use client";

import { Maximize2, Minimize2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";

type Fullscreen = { active: boolean; toggle: () => void; scrollToTop: () => void };

const FullscreenContext = createContext<Fullscreen>({ active: false, toggle: () => {}, scrollToTop: () => {} });

export const useFullscreen = () => useContext(FullscreenContext);

/**
 * Wraps a section's pages (practice, tests) in one element that can go fullscreen. It lives in the
 * section's layout, so moving to another page of the section keeps fullscreen on. Browsers without element fullscreen (iPhone Safari) get a fixed
 * overlay instead. Inside, `fullview:` classes hide the site chrome.
 */
export function FullscreenFrame({ children }: { children: React.ReactNode }) {
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

  // Next.js scrolls the window on navigation, but in fullscreen the frame is what scrolls.
  const pathname = usePathname();
  const activeRef = useRef(active);
  useEffect(() => {
    activeRef.current = active;
  }, [active]);
  useEffect(() => {
    if (activeRef.current) scrollToTop();
  }, [pathname, scrollToTop]);
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

/** "Layar penuh" / "Keluar" button for the surrounding FullscreenFrame. */
export function FullscreenToggle({ className = "" }: { className?: string }) {
  const { active, toggle } = useFullscreen();

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-forest/15 px-4 text-sm font-medium text-forest-deep transition hover:border-forest/40 ${className}`}
    >
      {active ? <Minimize2 aria-hidden="true" size={15} /> : <Maximize2 aria-hidden="true" size={15} />}
      {active ? "Keluar" : "Layar penuh"}
    </button>
  );
}
