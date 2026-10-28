import { FullscreenFrame } from "@/components/fullscreen-frame";

export default function MushafLayout({ children }: { children: React.ReactNode }) {
  return <FullscreenFrame>{children}</FullscreenFrame>;
}
