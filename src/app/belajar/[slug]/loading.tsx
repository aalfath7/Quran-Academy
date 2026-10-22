import { LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Memuat materi…">
      <div className="mx-auto max-w-3xl">
        <Skeleton className="h-12 w-4/5" />
        <Skeleton className="mt-6 h-4 w-full" />
        <Skeleton className="mt-3 h-4 w-2/3" />
        <Skeleton className="mt-12 h-48 w-full rounded-[2rem]" />
        <div className="mt-12 space-y-3">
          {Array.from({ length: 6 }, (_, i) => (
            <Skeleton key={i} className={`h-4 ${i % 3 === 2 ? "w-3/5" : "w-full"}`} />
          ))}
        </div>
      </div>
    </LoadingShell>
  );
}
