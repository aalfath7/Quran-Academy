import { FullscreenFrame } from "@/components/fullscreen-frame";

export default function LessonLayout({ children }: { children: React.ReactNode }) {
  return <FullscreenFrame>{children}</FullscreenFrame>;
}
