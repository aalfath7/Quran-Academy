"use client";

import { AArrowDown, AArrowUp, BookOpen } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { createLocalStore } from "@/components/use-local-store";
import {
  MUSHAF_PAGE_KEY,
  MUSHAF_SIZE_KEY,
  mushafSizes,
  PAGE_COUNT,
  parseMushafPage,
  parseMushafSize,
  stepMushafSize,
  swipeDirection
} from "@/lib/mushaf";

const useLastPage = createLocalStore(MUSHAF_PAGE_KEY, (raw) => parseMushafPage(raw, PAGE_COUNT), null);
const useMushafSize = createLocalStore(MUSHAF_SIZE_KEY, parseMushafSize, parseMushafSize(null));

const pageHref = (page: number) => `/quran/halaman/${page}`;

/**
 * Client side of a mushaf page: remembers it as the last page read, sets the reading size,
 * and turns pages with the arrow keys or a horizontal swipe (right to left, like a printed mushaf).
 */
export function MushafReader({ page, children }: { page: number; children: React.ReactNode }) {
  const router = useRouter();
  const [, setLastPage] = useLastPage();
  const [size] = useMushafSize();
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    setLastPage(() => page);
  }, [page, setLastPage]);

  useEffect(() => {
    const turn = (direction: 1 | -1) => {
      const target = page + direction;
      if (target >= 1 && target <= PAGE_COUNT) router.push(pageHref(target));
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || (event.target as HTMLElement).closest("input, select, textarea")) return;
      if (event.key === "ArrowLeft") turn(1);
      if (event.key === "ArrowRight") turn(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [page, router]);

  return (
    <div
      style={{ "--mushaf-size": `${size}rem` } as React.CSSProperties}
      onTouchStart={(event) => {
        const point = event.touches[0];
        touch.current = event.touches.length === 1 ? { x: point.clientX, y: point.clientY } : null;
      }}
      onTouchEnd={(event) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const point = event.changedTouches[0];
        const direction = swipeDirection(point.clientX - start.x, point.clientY - start.y);
        const target = page + direction;
        if (direction && target >= 1 && target <= PAGE_COUNT) router.push(pageHref(target));
      }}
    >
      {children}
    </div>
  );
}

/** Smaller / larger mushaf text, remembered in this browser. */
export function MushafSizeControl() {
  const [size, setSize] = useMushafSize();
  const buttonClass =
    "flex size-10 items-center justify-center rounded-full text-forest-deep transition hover:bg-forest/10 disabled:opacity-35 disabled:hover:bg-transparent";

  return (
    <div className="inline-flex items-center rounded-full border border-forest/15" role="group" aria-label="Ukuran teks">
      <button type="button" onClick={() => setSize((value) => stepMushafSize(value, -1))} disabled={size === mushafSizes[0]} className={buttonClass}>
        <AArrowDown aria-hidden="true" size={18} />
        <span className="sr-only">Perkecil teks</span>
      </button>
      <button
        type="button"
        onClick={() => setSize((value) => stepMushafSize(value, 1))}
        disabled={size === mushafSizes[mushafSizes.length - 1]}
        className={buttonClass}
      >
        <AArrowUp aria-hidden="true" size={18} />
        <span className="sr-only">Perbesar teks</span>
      </button>
    </div>
  );
}

/** "Continue reading" link to the mushaf page read last in this browser. */
export function ContinueMushaf() {
  const [lastPage] = useLastPage();

  return (
    <Link
      href={pageHref(lastPage ?? 1)}
      className="inline-flex items-center gap-2 rounded-full border border-forest/15 bg-surface/70 px-5 py-3 text-sm font-semibold text-forest-deep backdrop-blur transition hover:border-gold/50"
    >
      <BookOpen aria-hidden="true" size={16} className="text-gold" />
      {lastPage ? `Lanjutkan mushaf · hal. ${lastPage}` : "Baca per halaman (mushaf)"}
    </Link>
  );
}
