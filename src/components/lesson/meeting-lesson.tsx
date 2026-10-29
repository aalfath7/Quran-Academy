import { ArrowUpRight, BookMarked, BookOpen, ClipboardCheck, Ear, GraduationCap, ListChecks, Mic } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { QuranText } from "@/components/quran-text";
import { surahHref } from "@/lib/juz";
import { arabicRuns, isArabicOnly, type Item, type Part, type Section } from "@/lib/lesson-layout";
import { mushafRange, type MeetingPlan, type MeetingStep } from "@/lib/meeting-plan";
import type { AyahByRef, PageAyah } from "@/lib/quran";
import { MushafPageView } from "@/components/mushaf/mushaf-page-view";
import { MeetingTabs, type MeetingTab } from "./meeting-tabs";
import { MushafPicker } from "./mushaf-picker";
import { Inline, PartView } from "./tajwid-lesson";

type StepInfo = { id: string; label: string; icon: LucideIcon };

const stepInfo: Record<Exclude<MeetingStep["kind"], "other">, StepInfo> = {
  materi: { id: "materi", label: "Materi", icon: BookOpen },
  drills: { id: "latihan-ayat", label: "Latihan ayat", icon: Mic },
  mushaf: { id: "praktik-mushaf", label: "Praktik mushaf", icon: GraduationCap },
  task: { id: "tugas-mandiri", label: "Tugas mandiri", icon: ClipboardCheck }
};

function infoOf(step: MeetingStep, index: number): StepInfo {
  if (step.kind !== "other") return stepInfo[step.kind];
  return { id: `langkah-${index + 1}`, label: step.title ?? "Catatan", icon: ListChecks };
}

type Piece = { kind: "text"; text: string } | { kind: "arabic"; runs: { text: string; joiner?: string }[] };

/** Short Latin words that join two Arabic runs into one display line: "ء dan ه", "ي ، و". */
const CONNECTOR = /^[\s,;،]*(dan|atau|serta)?[\s,;،]*$/;
const DIACRITICS = /[ـً-ٰٟۖ-ۭ]/g;

/**
 * A materi point split into Latin text and the Arabic it mentions, so every letter or word can stand large on a line
 * of its own: "bertemu ء ه ع ح غ خ, dibaca jelas" → "bertemu" / ء ه ع ح غ خ / "dibaca jelas".
 */
function flow(text: string): Piece[] {
  const pieces: Piece[] = [];
  for (const run of arabicRuns(text)) {
    const last = pieces.at(-1);
    const beforeLast = pieces.at(-2);
    if (!run.arabic) pieces.push({ kind: "text", text: run.text });
    else if (last?.kind === "arabic") last.runs.push({ text: run.text });
    else if (last?.kind === "text" && beforeLast?.kind === "arabic" && CONNECTOR.test(last.text)) {
      pieces.pop();
      beforeLast.runs.push({ text: run.text, joiner: last.text.replace(/[\s,;،]+/g, " ").trim() || undefined });
    } else pieces.push({ kind: "arabic", runs: [{ text: run.text }] });
  }

  return pieces.flatMap((piece): Piece[] => {
    if (piece.kind === "arabic") return [piece];
    const text = piece.text.replace(/^[\s).,;:،]+/, "").replace(/[\s(:،,]+$/, "");
    return /[A-Za-z0-9]/.test(text) ? [{ kind: "text", text }] : [];
  });
}

/** Letters (ء ه ع) become tiles; words and phrases are set large on a soft panel. */
function ArabicLine({ runs }: { runs: { text: string; joiner?: string }[] }) {
  const tokens = runs.flatMap(({ text, joiner }) => [
    ...(joiner ? [{ joiner }] : []),
    ...(text.split(/\s+/).every((token) => token.replace(DIACRITICS, "").length <= 3) ? text.split(/\s+/).map((letter) => ({ letter })) : [{ word: text }])
  ]);

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-2xl bg-surface/80 px-4 py-4" lang="ar" dir="rtl">
      {tokens.map((token, i) =>
        "joiner" in token ? (
          <span key={i} lang="id" dir="ltr" className="px-1 text-sm text-ink-soft">
            {token.joiner}
          </span>
        ) : "letter" in token ? (
          <span
            key={i}
            className="flex size-14 items-center justify-center rounded-xl border border-gold/40 bg-paper-deep/60 font-arabic text-3xl leading-none text-forest-deep"
          >
            {token.letter}
          </span>
        ) : (
          <span key={i} className="px-2 font-arabic text-3xl leading-[1.9] text-forest-deep md:text-4xl">
            {token.word}
          </span>
        )
      )}
    </div>
  );
}

/** Text with every Arabic letter or word it mentions on a large line of its own. */
function Flow({ text }: { text: string }) {
  return flow(text).map((piece, i) =>
    piece.kind === "text" ? (
      <p key={i} className="leading-7 text-ink">
        {piece.text}
      </p>
    ) : (
      <ArabicLine key={i} runs={piece.runs} />
    )
  );
}

function MateriPoints({ items }: { items: Item[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="rounded-2xl border border-gold/20 bg-paper-deep/50 p-5">
          {item.term && isArabicOnly(item.term) ? (
            <ArabicLine runs={[{ text: item.term }]} />
          ) : (
            (item.term || item.number) && (
              <p className="flex items-center gap-2 font-semibold text-forest-deep">
                {item.number ? (
                  <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/15 font-display text-xs text-gold">{item.number}</span>
                ) : (
                  <span aria-hidden="true" className="size-1.5 shrink-0 rotate-45 bg-gold" />
                )}
                {item.term && <Inline text={item.term} />}
              </p>
            )
          )}
          <div className={`space-y-3 ${item.term || item.number ? "mt-2" : ""}`}>
            {item.text && <Flow text={item.text} />}
            {item.examples && <ArabicLine runs={item.examples.flat().map((text) => ({ text }))} />}
          </div>
        </li>
      ))}
    </ol>
  );
}

/** One part of the materi; points, facts and examples get their Arabic set large, the rest uses the lesson layout. */
function MateriPart({ part }: { part: Part }) {
  switch (part.kind) {
    case "list":
    case "numbered":
      return <MateriPoints items={part.items} />;
    case "fact":
      return (
        <div className="space-y-3 rounded-2xl border border-forest/10 bg-forest/5 p-4">
          <span className="inline-flex rounded-full bg-brand px-3 py-1 text-xs font-semibold text-cream">{part.label}</span>
          <Flow text={part.text} />
        </div>
      );
    case "examples":
      return (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contoh</p>
          <ArabicLine runs={part.groups.map((group) => ({ text: group.join("، ") }))} />
        </div>
      );
    default:
      return <PartView part={part} />;
  }
}

function Materi({ sections }: { sections: Section[] }) {
  return sections.map((section) => (
    <div key={section.id} className="space-y-4">
      {(section.title || section.group) && (
        <h3 className="flex items-center gap-2 pt-2 font-display text-xl text-forest-deep">
          <span aria-hidden="true" className="h-px w-5 bg-gold" />
          {section.title ?? section.group}
        </h3>
      )}
      {section.parts.map((part, i) => (
        <MateriPart key={i} part={part} />
      ))}
    </div>
  ));
}

function Drills({ step, ayahs }: { step: Extract<MeetingStep, { kind: "drills" }>; ayahs: AyahByRef[] }) {
  return (
    <>
      {step.drills.length > 0 && (
        <p className="flex items-start gap-2 leading-7 text-ink-soft">
          <Ear aria-hidden="true" size={18} className="mt-1 shrink-0 text-gold" />
          Dengarkan contoh bacaan, tirukan, lalu baca sendiri. Fokuskan telinga pada bagian yang perlu diperhatikan.
        </p>
      )}
      {step.intro.map((part, i) => (
        <PartView key={i} part={part} />
      ))}
      {step.drills.length > 0 && (
        <ol className="space-y-3">
          {step.drills.map((drill, i) => {
            const ayah = ayahs.find(({ surahNumber, number }) => surahNumber === drill.surah && number === drill.ayah);
            return (
              <li key={i} className="rounded-2xl border border-gold/25 bg-paper-deep/50 p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-xs font-semibold text-gold">
                    {i + 1}
                  </span>
                  <Link
                    href={surahHref(drill.surah, drill.ayah)}
                    className="group inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold transition hover:text-forest"
                  >
                    {ayah?.nameLatin ?? `Surah ${drill.surah}`} · {drill.ayah}
                    <ArrowUpRight aria-hidden="true" size={14} className="transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </Link>
                </div>
                <p className="mt-4 text-right font-arabic text-3xl leading-[2.2] text-forest-deep md:text-[2rem]" lang="ar" dir="rtl">
                  {ayah ? <QuranText text={ayah.arabic} /> : drill.words}
                </p>
                <div className="mt-4 flex flex-col gap-3 border-t border-gold/20 pt-4 sm:flex-row sm:items-center">
                  <span className="flex shrink-0 items-center gap-2 self-end sm:self-auto">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-soft">Perhatikan</span>
                    <span className="rounded-xl bg-gold/15 px-3 py-1 font-arabic text-2xl leading-[1.8] text-forest-deep" lang="ar" dir="rtl">
                      {drill.words}
                    </span>
                  </span>
                  <p className="leading-7 text-ink">
                    <Inline text={drill.note} />
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}

/** The mushaf practice: its instructions, then the pages themselves, read in place. */
function MushafPractice({ step, pages }: { step: Extract<MeetingStep, { kind: "mushaf" }>; pages: PageAyah[] }) {
  return (
    <>
      {step.parts.map((part, i) => (
        <PartView key={i} part={part} />
      ))}
      {/* A smaller reading size than the mushaf reader, to fit beside the materi. */}
      <div style={{ "--mushaf-size": "1.75rem" } as React.CSSProperties}>
        <MushafPicker
          pages={mushafRange(step).flatMap((page) => {
            const onPage = pages.filter((ayah) => ayah.page === page);
            return onPage.length > 0 ? [{ page, view: <MushafPageView page={page} ayahs={onPage} /> }] : [];
          })}
        />
      </div>
    </>
  );
}

function StepBody({ step, ayahs, pages }: { step: MeetingStep; ayahs: AyahByRef[]; pages: PageAyah[] }) {
  switch (step.kind) {
    case "materi":
      return <Materi sections={step.sections} />;
    case "drills":
      return <Drills step={step} ayahs={ayahs} />;
    case "mushaf":
      return <MushafPractice step={step} pages={pages} />;
    case "task":
      return (
        <>
          <p className="leading-8 text-ink">
            <Inline text={step.text} />
          </p>
          <p className="rounded-2xl border border-forest/10 bg-forest/5 px-4 py-3 text-sm leading-6 text-ink-soft">
            Latihan rutin setiap hari, dan simpan satu rekaman setiap pekan untuk melihat kemajuanmu.
          </p>
        </>
      );
    default:
      return step.parts.map((part, i) => <PartView key={i} part={part} />);
  }
}

/**
 * A tajwid class meeting as tabs, one step in view at a time: materi, ayat drills, mushaf practice and homework.
 * Notes outside those steps (such as the final exam's form and pass mark) share one tab, under their own titles.
 */
export function MeetingLesson({ plan, ayahs, pages }: { plan: MeetingPlan; ayahs: AyahByRef[]; pages: PageAyah[] }) {
  const tabs: MeetingTab[] = [];
  let lastWasOther = false;

  plan.steps.forEach((step, i) => {
    const info = infoOf(step, i);
    const Icon = info.icon;
    const last = tabs.at(-1);

    if (step.kind === "other" && last && lastWasOther) {
      last.content = (
        <>
          {last.content}
          {step.title && <h3 className="pt-4 font-display text-xl text-forest-deep">{step.title}</h3>}
          <StepBody step={step} ayahs={ayahs} pages={pages} />
        </>
      );
      return;
    }

    tabs.push({
      id: info.id,
      label: info.label,
      icon: <Icon aria-hidden="true" size={16} />,
      content: <StepBody step={step} ayahs={ayahs} pages={pages} />
    });
    lastWasOther = step.kind === "other";
  });

  return (
    <MeetingTabs
      className="mt-4 rounded-[2rem] border border-forest/10 bg-surface/60 text-[1.05rem] backdrop-blur fullview:mt-0"
      tabs={tabs}
      footer={
        plan.source && (
          <p className="flex gap-2 border-t border-gold/20 px-6 py-5 text-xs leading-6 text-ink-soft/80 md:px-10">
            <BookMarked aria-hidden="true" size={14} className="mt-1 shrink-0 text-gold" />
            {plan.source}
          </p>
        )
      }
    />
  );
}
