import { PracticeFrame } from "@/components/practice/practice-frame";

export default function PracticeLayout({ children }: { children: React.ReactNode }) {
  return <PracticeFrame>{children}</PracticeFrame>;
}
