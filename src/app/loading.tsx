import { LoadingIndicator } from "@/components/loading";

// Fallback for any route without its own loading state.
export default function Loading() {
  return (
    <div className="grain flex min-h-screen items-center justify-center">
      <LoadingIndicator />
    </div>
  );
}
