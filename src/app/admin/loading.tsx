import { LoadingIndicator } from "@/components/loading";

// Rendered inside the admin layout, so the admin header stays visible.
export default function Loading() {
  return (
    <div className="flex justify-center py-24">
      <LoadingIndicator />
    </div>
  );
}
