import { Search } from "lucide-react";

/** Plain GET form so searching works without client JavaScript. */
export function AyahSearchForm({ defaultValue = "", autoFocus = false }: { defaultValue?: string; autoFocus?: boolean }) {
  return (
    <form action="/quran/cari" role="search" className="flex w-full max-w-2xl gap-2">
      <label className="relative flex flex-1 items-center">
        <span className="sr-only">Cari ayat</span>
        <Search aria-hidden="true" size={18} className="pointer-events-none absolute left-5 text-ink-soft/70" />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          required
          placeholder="Cari kata di terjemahan, atau 2:255"
          className="w-full rounded-full border border-forest/15 bg-surface/70 py-3.5 pl-12 pr-5 text-sm text-ink outline-none backdrop-blur transition placeholder:text-ink-soft/60 focus:border-gold/60 focus:bg-surface"
        />
      </label>
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-cream transition hover:bg-brand-deep"
      >
        Cari
      </button>
    </form>
  );
}
