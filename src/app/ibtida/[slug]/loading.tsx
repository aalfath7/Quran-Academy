import { LoadingIndicator, Skeleton } from "@/components/loading";
import { SiteHeader } from "@/components/site-chrome";

/** Mirrors the practice page, so moving between practices in fullscreen never flashes the site header. */
export default function Loading() {
  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="fullview:hidden">
        <SiteHeader />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 pb-24 pt-4 sm:px-6 md:pt-8 fullview:max-w-none fullview:pt-0">
        <div className="rounded-3xl border border-forest/10 bg-surface/60 p-4 md:p-5 fullview:hidden">
          <Skeleton className="h-4 w-32" />
          <div className="mt-4 flex flex-wrap gap-2">
            {Array.from({ length: 11 }, (_, i) => (
              <Skeleton key={i} className="size-10" />
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-[2rem] border border-gold/30 bg-surface/80 px-4 sm:px-8 md:px-12 fullview:mx-auto fullview:mt-0 fullview:max-w-[110rem] fullview:border-0 fullview:bg-transparent">
          <div className="border-b border-gold/30 py-6">
            <LoadingIndicator label="Memuat latihan…" />
            <Skeleton className="mt-4 h-8 w-72 max-w-full" />
          </div>
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="space-y-5 border-t-2 border-dashed border-gold/30 py-9 first:border-t-0">
              <Skeleton className="mx-auto h-8 w-3/4" />
              <Skeleton className="mx-auto h-10 w-full" />
              <Skeleton className="mx-auto h-10 w-full" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
