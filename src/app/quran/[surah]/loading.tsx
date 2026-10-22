import { LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Memuat ayat…">
      <div className="mx-auto max-w-4xl">
        <Skeleton className="h-72 w-full rounded-[2rem]" />
        <div className="mt-10 divide-y divide-gold/20">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="py-10">
              <div className="flex items-start gap-6">
                <Skeleton className="size-11 shrink-0" />
                <div className="flex flex-1 flex-col items-end gap-4">
                  <Skeleton className="h-8 w-full" />
                  <Skeleton className="h-8 w-2/3" />
                </div>
              </div>
              <Skeleton className="mt-8 h-4 w-3/4" />
              <Skeleton className="mt-4 h-4 w-full" />
              <Skeleton className="mt-2.5 h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    </LoadingShell>
  );
}
