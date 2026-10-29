"use client";

import { useRef, useState, type ReactNode } from "react";
import { FullscreenToggle, useFullscreen } from "@/components/fullscreen-frame";

export type MeetingTab = { id: string; label: string; icon?: ReactNode; content: ReactNode };

/** The steps of a meeting as tabs, so one step at a time has the reader's full attention. */
export function MeetingTabs({ tabs, footer, className = "" }: { tabs: MeetingTab[]; footer?: ReactNode; className?: string }) {
  const [active, setActive] = useState(tabs[0]?.id);
  const root = useRef<HTMLDivElement>(null);
  const fullscreen = useFullscreen();

  const open = (id: string) => {
    setActive(id);
    // A new step starts at its top: bring the tabs back into view when the reader has scrolled past them.
    if (root.current && root.current.getBoundingClientRect().top < 0) root.current.scrollIntoView({ block: "start" });
  };

  return (
    <div ref={root} className={`scroll-mt-4 ${className}`}>
      <div
        role="tablist"
        aria-label="Langkah belajar"
        className="sticky top-0 z-10 flex flex-wrap items-center gap-1.5 rounded-t-[2rem] border-b border-gold/30 bg-surface/95 px-4 py-3 backdrop-blur md:px-8 md:py-4"
      >
        {tabs.map(({ id, label, icon }) => (
          <button
            key={id}
            type="button"
            role="tab"
            id={`${id}-tab`}
            aria-selected={id === active}
            aria-controls={id}
            onClick={() => open(id)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              id === active ? "bg-brand text-cream" : "bg-forest/5 text-forest-deep hover:bg-forest/10"
            }`}
          >
            {icon}
            {label}
          </button>
        ))}
        {/* In fullscreen the page header is hidden, so the way out sits beside the tabs. */}
        {fullscreen.active && <FullscreenToggle className="ml-auto" />}
      </div>
      {tabs.map(({ id, content }) => (
        <div key={id} id={id} role="tabpanel" aria-labelledby={`${id}-tab`} hidden={id !== active} className="space-y-4 p-6 md:p-10">
          {content}
        </div>
      ))}
      {footer}
    </div>
  );
}
