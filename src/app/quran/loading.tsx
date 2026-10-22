import { CardGridSkeleton, LoadingShell, Skeleton } from "@/components/loading";

export default function Loading() {
  return (
    <LoadingShell label="Memuat daftar surah…">
      <Skeleton className="h-12 w-full max-w-xl" />
      <Skeleton className="mt-5 h-4 w-full max-w-md" />
      <Skeleton className="mt-10 h-12 w-full max-w-md" />
      <div className="mt-10">
        <CardGridSkeleton count={9} className="h-24" />
      </div>
    </LoadingShell>
  );
}
