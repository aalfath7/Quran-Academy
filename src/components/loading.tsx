import { BackgroundGlow, SiteHeader } from "./site-chrome";
import { Star } from "./star";

/** Announced to screen readers; the rotating star is the visual cue. */
export function LoadingIndicator({ label = "Memuat…" }: { label?: string }) {
  return (
    <div role="status" aria-live="polite" className="flex items-center gap-3 text-sm font-medium text-ink-soft">
      <Star className="size-6 animate-spin text-gold [animation-duration:2.4s] motion-reduce:animate-none" />
      {label}
    </div>
  );
}

export function Skeleton({ className = "" }: { className?: string }) {
  return <div aria-hidden="true" className={`animate-pulse rounded-full bg-forest/10 motion-reduce:animate-none ${className}`} />;
}

/** Public page frame shown while a route loads, so the header stays in place. */
export function LoadingShell({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <main className="grain relative min-h-screen overflow-hidden">
      <BackgroundGlow />
      <SiteHeader />
      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-10 md:pt-16">
        <LoadingIndicator label={label} />
        <div className="mt-8">{children}</div>
      </div>
    </main>
  );
}

export function CardGridSkeleton({ count, className = "" }: { count: number; className?: string }) {
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }, (_, i) => (
        <div key={i} className={`rounded-3xl border border-forest/10 bg-white/50 p-6 ${className}`}>
          <Skeleton className="h-5 w-2/3" />
          <Skeleton className="mt-4 h-3.5 w-full" />
          <Skeleton className="mt-2.5 h-3.5 w-4/5" />
        </div>
      ))}
    </div>
  );
}
