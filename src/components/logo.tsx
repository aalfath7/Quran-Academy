/** Fathway mark: an arch with a dot above a rising path. The arch and path follow currentColor; the dot takes dotClassName. */
export function Logo({ className = "", dotClassName = "fill-gold" }: { className?: string; dotClassName?: string }) {
  return (
    <svg viewBox="0 0 512 512" aria-hidden="true" className={className}>
      <path d="M112 480V224a144 144 0 0 1 288 0v256" fill="none" stroke="currentColor" strokeWidth="64" />
      <path d="M248 272h16l40 208h-96z" fill="currentColor" />
      <circle cx="256" cy="191" r="20" className={dotClassName} />
    </svg>
  );
}
