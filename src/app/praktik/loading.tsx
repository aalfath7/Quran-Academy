import { CardGridSkeleton, LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Memuat praktik…">
      <Skeleton className="h-12 w-full max-w-xl" />
      <Skeleton className="mt-5 h-4 w-full max-w-md" />
      <div className="mt-14">
        <CardGridSkeleton count={6} className="h-24" />
      </div>
    </LoadingShell>
  );
}
