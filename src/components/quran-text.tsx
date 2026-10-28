import { pauseSegments } from "@/lib/mushaf";

/**
 * Ayah text with its pause signs drawn small above the gap after their word. The sign hangs from the space itself,
 * so a gap with a sign is exactly as wide as any other, even when a justified line stretches its spaces.
 * The extra word spacing keeps final letters with long tails (عُ، مُ) from reaching the next word.
 */
export function QuranText({ text }: { text: string }) {
  return (
    <span className="[word-spacing:0.12em]">
      {pauseSegments(text).map(({ lead, word, pause }, i) => (
        <span key={i}>
          {lead}
          {word}
          {pause && (
            <span className="relative">
              {" "}
              <span className="absolute top-[0.4em] left-1/2 -translate-x-1/2 text-[0.7em] leading-none">{` ${pause}`}</span>
            </span>
          )}
        </span>
      ))}
    </span>
  );
}
