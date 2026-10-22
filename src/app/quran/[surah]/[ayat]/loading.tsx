import { LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Memuat tafsir…">
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="mt-5 h-12 w-2/3" />
        <Skeleton className="mt-10 h-56 w-full rounded-[2rem]" />
        <Skeleton className="mt-10 h-5 w-full" />
        <Skeleton className="mt-3 h-5 w-4/5" />
        <div className="mt-12 space-y-3">
          {Array.from({ length: 8 }, (_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 4 === 3 ? "w-2/3" : "w-full"}`} />
          ))}
        </div>
      </div>
    </LoadingShell>
  );
}
