import { LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Mencari ayat…">
      <Skeleton className="h-12 w-full max-w-xl" />
      <Skeleton className="mt-8 h-12 w-full max-w-2xl" />
      <div className="mt-12 space-y-10">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i}>
            <Skeleton className="h-3.5 w-40" />
            <Skeleton className="ml-auto mt-5 h-6 w-4/5" />
            <Skeleton className="mt-4 h-4 w-full" />
            <Skeleton className="mt-2.5 h-4 w-3/4" />
          </div>
        ))}
      </div>
    </LoadingShell>
  );
}
