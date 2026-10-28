import { LoadingIndicator, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <main className="grain relative min-h-screen overflow-hidden fullview:min-h-full fullview:overflow-visible">
      <div className="relative mx-auto max-w-3xl px-4 pb-24 pt-10 sm:px-6">
        <LoadingIndicator label="Membuka halaman…" />
        <div className="mt-8 rounded-[2rem] border-2 border-gold/30 bg-surface/60 p-6 sm:p-10">
          {Array.from({ length: 12 }, (_, i) => (
            <Skeleton key={i} className={`mt-6 h-6 first:mt-0 ${i % 4 === 3 ? "ml-auto w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </main>
  );
}
