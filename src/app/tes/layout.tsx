import { FullscreenFrame } from "@/components/fullscreen-frame";

export default function QuizLayout({ children }: { children: React.ReactNode }) {
  return <FullscreenFrame>{children}</FullscreenFrame>;
}
