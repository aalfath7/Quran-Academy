import { ArrowRight, Ban, BookMarked, Clock, Eye, Info, Lightbulb, ListTree, Mic, Quote, Ruler, Scale, TriangleAlert, Type } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Star } from "@/components/star";
import { QuranText } from "@/components/quran-text";
import { arabicRuns, verseParts, type Item, type LessonLayout, type NoteTone, type Part, type Section } from "@/lib/lesson-layout";

/** Text with every Arabic run set in the Arabic typeface; "|" in a quoted passage marks where to stop. */
export function Inline({ text }: { text: string }) {
  return arabicRuns(text).map((part, i) =>
    part.arabic ? (
      <span key={i} lang="ar" dir="rtl" className="font-arabic text-[1.25em] leading-[1.6] text-forest-deep">
        {part.text}
      </span>
    ) : (
      part.text.split("|").map((piece, j) => (
        <span key={`${i}-${j}`}>
          {j > 0 && <StopMark />}
          {piece}
        </span>
      ))
    )
  );
}

function StopMark() {
  return (
    <span className="mx-2 inline-flex items-center rounded-full bg-gold/15 px-2 py-0.5 align-middle font-sans text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-gold">
      berhenti
    </span>
  );
}

function Examples({ groups, className = "" }: { groups: string[][]; className?: string }) {
  return (
    <div className={`flex flex-wrap justify-end gap-2 ${className}`} lang="ar" dir="rtl">
      {groups.map((group, i) => (
        <span key={i} className="contents">
          {i > 0 && <span aria-hidden="true" className="mx-1 self-center text-gold/50">◆</span>}
          {group.map((word, j) => (
            <span
              key={j}
              className="rounded-xl border border-gold/25 bg-surface/80 px-3 py-1 font-arabic text-2xl leading-[1.9] text-forest-deep"
            >
              {word}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}

/** A quoted passage: the Arabic large and right-aligned, its reference beneath. */
function Verse({ text }: { text: string }) {
  const verse = verseParts(text);
  if (!verse) return <p className="leading-8 text-ink"><Inline text={text} /></p>;

  const halves = verse.arabic.split("|").map((half) => half.trim());
  return (
    <figure className="rounded-2xl border border-gold/25 bg-paper-deep/50 px-5 py-4">
      <p className="text-right font-arabic text-2xl leading-[2.1] text-forest-deep md:text-[1.7rem]" lang="ar" dir="rtl">
        {halves.map((half, i) => (
          <span key={i}>
            {i > 0 && <StopMark />}
            <QuranText text={half} />
          </span>
        ))}
      </p>
      {verse.reference && <figcaption className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-gold">{verse.reference}</figcaption>}
    </figure>
  );
}

/** The explanation of a point; a sequence written with "–" (isti'adzah – berhenti – basmalah) becomes a flow of steps. */
function ItemText({ text }: { text: string }) {
  const steps = text.replace(/\.$/, "").split(/\s+–\s+/);
  if (steps.length < 3) return <Inline text={text} />;

  return (
    <span className="mt-1 flex flex-wrap items-center gap-1.5">
      {steps.map((step, i) => (
        <span key={i} className="contents">
          {i > 0 && <ArrowRight aria-hidden="true" size={14} className="text-gold" />}
          <span
            className={
              /^berhenti$/i.test(step)
                ? "rounded-full border border-dashed border-gold/60 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-gold"
                : "rounded-full bg-forest/10 px-3 py-1 text-sm font-medium text-forest-deep"
            }
          >
            {step}
          </span>
        </span>
      ))}
    </span>
  );
}

function ItemBody({ item }: { item: Item }) {
  return (
    <>
      {item.term && (
        <span className="block font-semibold text-forest-deep">
          <Inline text={item.term} />
        </span>
      )}
      {item.text && (
        <span className={`block leading-7 text-ink ${item.term ? "mt-1 text-ink-soft" : ""}`}>
          <ItemText text={item.text} />
        </span>
      )}
      {item.examples && <Examples groups={item.examples} className="mt-3" />}
      {item.exampleText && (
        <div className="mt-3">
          <Verse text={item.exampleText} />
        </div>
      )}
      {item.points && (
        <ul className="mt-3 space-y-2">
          {item.points.map((point, i) => (
            <li key={i} className="flex gap-3 text-[0.95rem] leading-7 text-ink-soft">
              <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rotate-45 bg-gold" />
              <span className="min-w-0">
                <ItemBody item={point} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function ExampleTable({ items, columns }: { items: Item[]; columns: string[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-gold/25">
      <div className="hidden bg-brand-deep text-xs font-semibold uppercase tracking-[0.12em] text-gold-soft md:grid" style={{ gridTemplateColumns: `8rem repeat(${columns.length}, minmax(0, 1fr))` }}>
        <span className="px-4 py-3">Huruf</span>
        {columns.map((column) => (
          <span key={column} className="px-4 py-3 text-right">
            {column}
          </span>
        ))}
      </div>
      <ul className="divide-y divide-gold/20">
        {items.map((item, i) => (
          <li
            key={i}
            className="grid gap-2 bg-surface/50 px-4 py-3 even:bg-paper-deep/40 md:items-center md:gap-0 md:px-0 md:py-0 md:[grid-template-columns:var(--cols)]"
            style={{ "--cols": `8rem repeat(${columns.length}, minmax(0, 1fr))` } as React.CSSProperties}
          >
            <span className="font-semibold text-forest-deep md:px-4 md:py-3">
              <Inline text={item.term ?? item.text} />
            </span>
            {columns.map((column, j) => (
              <span key={column} className="flex items-center justify-between gap-3 md:block md:px-4 md:py-3 md:text-right">
                <span className="text-xs text-ink-soft md:hidden">{column}</span>
                <span className="font-arabic text-2xl leading-[1.9] text-forest-deep" lang="ar" dir="rtl">
                  {item.examples?.[j]?.join("، ")}
                </span>
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}

const factIcons: Record<string, LucideIcon> = { Hukum: Scale, Panjang: Ruler, "Penanda di mushaf": Eye, Huruf: Type, Lafal: Quote };

const noteStyles: Record<NoteTone, { icon: LucideIcon; className: string }> = {
  important: { icon: TriangleAlert, className: "border-gold/50 bg-gold/10 [&_svg]:text-gold" },
  note: { icon: Info, className: "border-forest/15 bg-forest/5 [&_svg]:text-forest" },
  tip: { icon: Lightbulb, className: "border-gold/30 bg-paper-deep/60 [&_svg]:text-gold" },
  howto: { icon: Mic, className: "border-forest/20 bg-forest/5 [&_svg]:text-forest" }
};

export function PartView({ part }: { part: Part }) {
  switch (part.kind) {
    case "paragraph":
      return (
        <p className="whitespace-pre-line leading-8 text-ink">
          <Inline text={part.text} />
        </p>
      );

    case "lead":
      return part.text.length > 60 ? (
        <p className="leading-8 text-ink">
          <Inline text={part.text} />
        </p>
      ) : (
        <p className="flex items-center gap-2 pt-2 text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          <ListTree aria-hidden="true" size={14} />
          {part.text.replace(/:$/, "")}
        </p>
      );

    case "subheading":
      return <h3 className="pt-4 font-display text-xl text-forest-deep">{part.text}</h3>;

    case "list": {
      if (part.columns && part.items.every((item) => item.examples?.length === part.columns!.length)) {
        return <ExampleTable items={part.items} columns={part.columns} />;
      }
      if (part.items.some((item) => item.term)) {
        const compact = part.items.length > 1 && part.items.every((item) => item.text.length < 220 && !item.points);
        return (
          <ul className={`grid gap-3 ${compact ? "sm:grid-cols-2" : ""}`}>
            {part.items.map((item, i) => (
              <li key={i} className="rounded-2xl border border-gold/20 bg-paper-deep/50 p-5">
                <ItemBody item={item} />
              </li>
            ))}
          </ul>
        );
      }
      return (
        <ul className="space-y-3">
          {part.items.map((item, i) => (
            <li key={i} className="flex gap-3 leading-8 text-ink">
              <span aria-hidden="true" className="mt-3.5 size-1.5 shrink-0 rotate-45 bg-gold" />
              <span className="min-w-0">
                <ItemBody item={item} />
              </span>
            </li>
          ))}
        </ul>
      );
    }

    case "steps":
      return (
        <ol className={`relative space-y-3 ${part.forbidden ? "" : "before:absolute before:bottom-6 before:left-[1.875rem] before:top-6 before:w-px before:bg-gold/30"}`}>
          {part.items.map((item, i) => (
            <li
              key={i}
              className={`relative flex gap-4 rounded-2xl p-3 ${part.forbidden ? "border border-red-800/20 bg-red-50/60 dark:border-red-400/20 dark:bg-red-950/30" : ""}`}
            >
              <span
                className={`relative flex size-9 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
                  part.forbidden ? "bg-red-800/10 text-red-800 dark:text-red-300" : "border border-gold/40 bg-surface text-gold"
                }`}
              >
                {part.forbidden ? <Ban aria-label="Tidak boleh" size={16} /> : i + 1}
              </span>
              <span className="min-w-0 flex-1 pt-1.5">
                <ItemBody item={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "numbered":
      return (
        <ol className="space-y-3">
          {part.items.map((item, i) => (
            <li key={i} className="flex gap-4 rounded-2xl border border-forest/10 bg-surface/70 p-5">
              <span className="font-display text-3xl font-light leading-none text-gold">{item.number}</span>
              <span className="min-w-0 flex-1">
                <ItemBody item={item} />
              </span>
            </li>
          ))}
        </ol>
      );

    case "symbols":
      return (
        <ul className="space-y-4">
          {part.items.map((item, i) => {
            const [sign, ...rest] = (item.term ?? "").split(" (");
            const name = rest.join(" (").replace(/\)(?=,|$)/, "");
            return (
              <li key={i} className="flex gap-4 rounded-2xl border border-gold/20 bg-paper-deep/50 p-5">
                <span
                  className="flex size-16 shrink-0 items-center justify-center rounded-2xl bg-brand-deep font-arabic text-3xl text-gold-soft"
                  lang="ar"
                  dir="rtl"
                >
                  {sign}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold capitalize text-forest-deep">{name}</span>
                  <span className="mt-1 block leading-7 text-ink">
                    <Inline text={item.text} />
                  </span>
                  {item.exampleText && (
                    <span className="mt-3 block">
                      <Verse text={item.exampleText} />
                    </span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      );

    case "examples":
      return (
        <div className="rounded-2xl border border-gold/25 bg-paper-deep/50 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">Contoh{part.label && ` (${part.label})`}</p>
          <Examples groups={part.groups} className="mt-3" />
        </div>
      );

    case "verse":
      return <Verse text={part.text} />;

    case "fact": {
      const Icon = factIcons[part.label] ?? Info;
      return (
        <div className="flex flex-col gap-2 rounded-2xl border border-forest/10 bg-forest/5 p-4 sm:flex-row sm:items-start sm:gap-4">
          <span className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full bg-brand px-3 py-1 text-xs font-semibold text-cream">
            <Icon aria-hidden="true" size={13} />
            {part.label}
          </span>
          <p className="leading-7 text-ink">
            <Inline text={part.text} />
          </p>
        </div>
      );
    }

    case "note": {
      const { icon: Icon, className } = noteStyles[part.tone];
      return (
        <aside className={`flex gap-3 rounded-2xl border p-4 ${className}`}>
          <Icon aria-hidden="true" size={20} className="mt-1 shrink-0" />
          <p className="leading-7 text-ink">
            <span className="font-semibold text-forest-deep">{part.label}: </span>
            <Inline text={part.text} />
          </p>
        </aside>
      );
    }

    case "arabic":
      return (
        <div className="rounded-2xl bg-brand-deep px-6 py-6 text-center">
          <p className="font-arabic text-2xl leading-[2.1] text-gold-soft md:text-3xl" lang="ar" dir="rtl">
            {part.text.split(/\s*۝\s*/).map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
      );
  }
}

function SectionBadge({ number }: { number?: string }) {
  return (
    <span className="relative flex size-12 shrink-0 items-center justify-center text-gold">
      <Star className="absolute inset-0 size-12" />
      {number && <span className="relative font-display text-sm font-semibold">{number}</span>}
    </span>
  );
}

/** Section titles without their Arabic name, which is shown in full on the section itself. */
const shortTitle = (title: string) => title.replace(/\s*\([^)]*[\u0600-\u06ff][^)]*\)/, "");

function Contents({ sections, minutes }: { sections: Section[]; minutes: number }) {
  const titled = sections.filter((section) => section.title);

  return (
    <nav aria-label="Isi materi" className="rounded-[2rem] border border-gold/25 bg-paper-deep/50 p-6 md:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">Di materi ini</p>
        <p className="inline-flex items-center gap-1.5 text-xs text-ink-soft">
          <Clock aria-hidden="true" size={13} />± {minutes} menit baca · {titled.length} bagian
        </p>
      </div>
      <ol className="mt-4 grid gap-2 sm:grid-cols-2">
        {titled.map((section, i) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className="group flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-ink transition hover:bg-surface/80"
            >
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full border border-gold/40 font-display text-xs font-semibold text-gold">
                {section.number ?? i + 1}
              </span>
              <span className="min-w-0 flex-1 truncate group-hover:text-forest">{shortTitle(section.title!)}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function TajwidLesson({ layout, minutes }: { layout: LessonLayout; minutes: number }) {
  const { sections, source } = layout;
  const titledCount = sections.filter((section) => section.title).length;

  return (
    <div className="mt-12 space-y-8 text-[1.05rem]">
      {titledCount >= 2 && <Contents sections={sections} minutes={minutes} />}

      {sections.map((section) =>
        section.group ? (
          <div key={section.id} id={section.id} className="flex scroll-mt-24 items-center gap-4 pt-4">
            <span className="h-px flex-1 bg-gold/30" />
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">{section.group}</span>
            <span className="h-px flex-1 bg-gold/30" />
          </div>
        ) : section.title ? (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-judul`}
            className="scroll-mt-24 rounded-[2rem] border border-forest/10 bg-surface/60 p-6 backdrop-blur md:p-8"
          >
            <header className="flex items-center gap-4">
              <SectionBadge number={section.number} />
              <h2 id={`${section.id}-judul`} className="font-display text-2xl font-light leading-tight text-forest-deep md:text-[1.7rem]">
                <Inline text={section.title} />
              </h2>
            </header>
            <div className="mt-6 space-y-4">
              {section.parts.map((part, i) => (
                <PartView key={i} part={part} />
              ))}
            </div>
          </section>
        ) : (
          <div key={section.id} className="space-y-4 text-[1.1rem]">
            {section.parts.map((part, i) => (
              <PartView key={i} part={part} />
            ))}
          </div>
        )
      )}

      {source && (
        <p className="flex gap-2 border-t border-gold/20 pt-6 text-xs leading-6 text-ink-soft/80">
          <BookMarked aria-hidden="true" size={14} className="mt-1 shrink-0 text-gold" />
          {source}
        </p>
      )}
    </div>
  );
}
