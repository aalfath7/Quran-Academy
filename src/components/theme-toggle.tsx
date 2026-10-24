"use client";

import { Moon, Sun } from "lucide-react";

export const THEME_STORAGE_KEY = "theme";

/**
 * Runs before first paint (see the root layout) so a saved dark theme never flashes light.
 * The original light look is the default; only an explicit choice switches it.
 */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export function ThemeToggle({ className = "" }: { className?: string }) {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";

    if (next === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;

    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Storage can be blocked; the theme still applies for this page view.
    }
  }

  // The icon follows the data-theme attribute through CSS, so server and client render the same markup.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Ganti tema terang/gelap"
      title="Ganti tema"
      className={`inline-flex size-10 shrink-0 items-center justify-center rounded-full border border-forest/15 text-forest-deep transition hover:border-forest/40 hover:bg-surface/70 ${className}`}
    >
      <Moon aria-hidden="true" size={17} className="dark:hidden" />
      <Sun aria-hidden="true" size={17} className="hidden dark:block" />
    </button>
  );
}
