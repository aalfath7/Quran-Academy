// Turns the plain-text content of a tajwid lesson into structured parts the page can lay out visually.
// The content keeps its writing conventions (see scripts/data/tajwid-ringkas.mjs), so lessons written in
// the admin form render the same way: a short first line of a paragraph is a heading, "•" starts a point,
// "①" a step, "Contoh:" a set of examples, "Hukum:" a key fact and "Penting:" a note.

const ARABIC = /[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]/;
const LATIN = /[A-Za-z]/;

/** Written only in Arabic script, with no Latin words around it. */
export const isArabicOnly = (text: string) => ARABIC.test(text) && !LATIN.test(text);

/** Arabic example words: "·" separates groups (columns), "،" separates words within a group. */
export function exampleGroups(text: string) {
  return text
    .replace(/[.\s]+$/, "")
    .split(/\s*·\s*/)
    .map((group) => group.split(/\s*،\s*/).filter(Boolean))
    .filter((group) => group.length > 0);
}

/** An Arabic passage with its trailing reference: "… (Al-Baqarah: 2)" → { arabic, reference }. */
export function verseParts(text: string) {
  const match = text.match(/^(.*?)\s*\(([^()]+)\)$/);
  if (match && isArabicOnly(match[1])) return { arabic: match[1], reference: match[2] };

  return isArabicOnly(text) ? { arabic: text, reference: null } : null;
}

export type Item = { number?: string; term?: string; text: string; examples?: string[][]; exampleText?: string; points?: Item[] };

export type NoteTone = "important" | "note" | "tip" | "howto";

export type Part =
  | { kind: "paragraph"; text: string }
  | { kind: "lead"; text: string }
  | { kind: "subheading"; text: string }
  | { kind: "list"; items: Item[]; columns?: string[] }
  | { kind: "steps"; items: Item[]; forbidden: boolean }
  | { kind: "numbered"; items: Item[] }
  | { kind: "symbols"; items: Item[] }
  | { kind: "examples"; label?: string; groups: string[][] }
  | { kind: "verse"; text: string }
  | { kind: "fact"; label: string; text: string }
  | { kind: "note"; tone: NoteTone; label: string; text: string }
  | { kind: "arabic"; text: string };

export type Section = { id: string; number?: string; title?: string; group?: string; parts: Part[] };

export type LessonLayout = { sections: Section[]; source: string | null };

const BULLET = /^•\s*/;
const STEP = /^([①-⑳])\s*/;
const NUMBERED = /^(\d{1,2})\.\s+(.+)$/;
const EXAMPLE = /^Contoh(?:\s*\(([^)]+)\))?:\s*(.*)$/;
const FACT = /^(Hukumnya|Hukum|Panjangnya|Penanda di mushaf|Hurufnya|Lafal yang umum dipakai):\s*(.+)$|^(Hukumnya|Panjangnya)\s+(.+)$/;
const NOTE = /^(Penting|Catatan|Saran|Ingat|Cara membacanya|Cara mudah[^:]*):\s*(.+)$/;
const TERM = /^([^:]{1,48}):\s+(.+)$/;

const factLabels: Record<string, string> = {
  Hukumnya: "Hukum",
  Hukum: "Hukum",
  Panjangnya: "Panjang",
  "Penanda di mushaf": "Penanda di mushaf",
  Hurufnya: "Huruf",
  "Lafal yang umum dipakai": "Lafal"
};

function noteTone(label: string): NoteTone {
  if (label === "Penting" || label === "Ingat") return "important";
  if (label === "Catatan") return "note";
  if (label.startsWith("Cara membaca")) return "howto";
  return "tip";
}

type Heading = { number?: string; title: string; sub?: boolean };

/** A heading: number (1., A., Hukum 1:) and title, or null for an ordinary line. */
function heading(line: string): Heading | null {
  if (BULLET.test(line) || STEP.test(line) || line.length > 80 || !LATIN.test(line)) return null;

  const law = line.match(/^Hukum (\d+):\s*(.+)$/);
  if (law) return { number: law[1], title: law[2] };

  // "A. Mad Lazim Kalimi, terjadi di dalam sebuah kata." splits a section, so its full stop is allowed.
  const lettered = line.match(/^([A-Z])\.\s+(.+?)\.?$/);
  if (lettered) return { number: lettered[1], title: lettered[2], sub: true };

  if (/[.:!?,;]$/.test(line) || line.includes(":") || ARABIC.test(line[0])) return null;

  const numbered = line.match(NUMBERED);
  return numbered ? { number: numbered[1], title: numbered[2] } : { title: line };
}

/** Splits a point into a term ("Qaf (ق): …"), its explanation and trailing Arabic examples ("… Contoh: أَقْرَبُ، أُقْسِمُ"). */
function item(text: string, number?: string): Item {
  let body = text;
  let examples: string[][] | undefined;

  const inlineExample = body.match(/^(.*?)\s*Contoh:\s*(.+)$/);
  if (inlineExample && isArabicOnly(inlineExample[2])) {
    body = inlineExample[1];
    examples = exampleGroups(inlineExample[2]);
  }

  // "… sebelum itu ada fathah: وَالْفَجْرِ، وَالْوَتْرِ" ends with its examples, however long the point is.
  const trailing = body.match(/^(.+):\s+([^:]+)$/);
  if (!examples && trailing && isArabicOnly(trailing[2])) {
    const [, rest, words] = trailing;
    examples = exampleGroups(words);
    return rest.length <= 48 && !/[.!?]/.test(rest) ? { number, term: rest, text: "", examples } : { number, text: rest, examples };
  }

  const term = body.match(TERM);
  if (term && !/[.!?]/.test(term[1])) return { number, term: term[1], text: term[2], examples };

  return { number, text: body, examples };
}

function slug(value: string, taken: Set<string>) {
  const base =
    value
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "bagian";
  let id = base;
  for (let n = 2; taken.has(id); n++) id = `${base}-${n}`;
  taken.add(id);

  return id;
}

export function lessonLayout(content: string): LessonLayout {
  const blocks = content
    .split(/\n\s*\n/)
    .map((block) => block.trim())
    .filter(Boolean);

  let source: string | null = null;
  if (blocks.length > 0 && /^Rujukan:/.test(blocks[blocks.length - 1])) source = blocks.pop()!.replace(/^Rujukan:\s*/, "");

  const ids = new Set<string>();
  const sections: Section[] = [{ id: "pengantar", parts: [] }];
  ids.add("pengantar");
  const current = () => sections[sections.length - 1];
  const push = (part: Part) => current().parts.push(part);
  const last = () => current().parts.at(-1);

  // A "Contoh (nun sukun · tanwin):" lead names the columns of the example list that follows it.
  let columns: string[] | undefined;
  // A lead such as "Dan ada satu cara yang tidak boleh:" marks the steps after it as forbidden.
  let forbidden = false;

  blocks.forEach((block, blockIndex) => {
    if (isArabicOnly(block)) {
      push({ kind: "arabic", text: block });
      return;
    }

    const lines = block
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    // "① Waqaf Idhthirari …, karena terpaksa" followed by its explanation opens a numbered section.
    const stepTitle = lines.length > 1 && STEP.test(lines[0]) && !lines.slice(1).some((line) => STEP.test(line));
    const title: Heading | null = stepTitle
      ? { number: String(lines[0].codePointAt(0)! - 0x245f), title: lines[0].replace(STEP, "") }
      : heading(lines[0]);
    if (title && (lines.length > 1 || blockIndex < blocks.length - 1)) {
      lines.shift();
      if (title.sub) {
        push({ kind: "subheading", text: `${title.number}. ${title.title}` });
      } else if (lines.length === 0 && !title.number && blocks[blockIndex + 1] && heading(blocks[blockIndex + 1].split("\n")[0])) {
        // A heading-only paragraph followed by another heading groups the sections after it ("Sebab hamzah").
        sections.push({ id: slug(title.title, ids), group: title.title, parts: [] });
      } else {
        sections.push({ id: slug(title.title, ids), number: title.number, title: title.title, parts: [] });
      }
    }

    let attachTo: Item | null = null;

    for (const [lineIndex, line] of lines.entries()) {
      const previous = last();

      if (BULLET.test(line)) {
        const text = line.replace(BULLET, "");
        const fact = text.match(FACT);
        if (fact) {
          push({ kind: "fact", label: factLabels[fact[1] ?? fact[3]], text: fact[2] ?? fact[4] });
          attachTo = null;
          continue;
        }

        const point = item(text);
        // Points right under a numbered item in the same paragraph belong to that item.
        const owner = previous?.kind === "numbered" && lineIndex > 0 ? previous.items.at(-1)! : null;
        if (owner) (owner.points ??= []).push(point);
        else if (previous?.kind === "list") previous.items.push(point);
        else push({ kind: "list", items: [point], columns });
        columns = undefined;
        attachTo = point;
        continue;
      }

      const step = line.match(STEP);
      if (step) {
        const point = item(line.replace(STEP, ""));
        if (previous?.kind === "steps" && previous.forbidden === forbidden) previous.items.push(point);
        else push({ kind: "steps", items: [point], forbidden });
        attachTo = null;
        continue;
      }

      const example = line.match(EXAMPLE);
      if (example) {
        const [, label, text] = example;
        if (!text) {
          if (label) columns = label.split(/\s*·\s*/);
          push({ kind: "lead", text: label ? "Contoh" : "Contoh:" });
          continue;
        }
        if (isArabicOnly(text)) {
          if (attachTo && !attachTo.examples) attachTo.examples = exampleGroups(text);
          else push({ kind: "examples", label, groups: exampleGroups(text) });
        } else if (attachTo && !attachTo.examples) {
          attachTo.exampleText = text;
        } else {
          push({ kind: "verse", text });
        }
        continue;
      }

      const numbered = line.match(NUMBERED);
      if (numbered) {
        const point = item(numbered[2], numbered[1]);
        if (previous?.kind === "numbered") previous.items.push(point);
        else push({ kind: "numbered", items: [point] });
        attachTo = point;
        continue;
      }

      forbidden = false;
      attachTo = null;

      if (isArabicOnly(line)) {
        push({ kind: "arabic", text: line });
        continue;
      }

      const note = line.match(NOTE);
      if (note) {
        push({ kind: "note", tone: noteTone(note[1]), label: note[1], text: note[2] });
        continue;
      }

      const fact = line.match(FACT);
      if (fact) {
        push({ kind: "fact", label: factLabels[fact[1] ?? fact[3]], text: fact[2] ?? fact[4] });
        continue;
      }

      // A line that opens with an Arabic sign and explains it, like the waqaf signs: "مـ (mim), waqaf lazim: …".
      const symbol = line.match(TERM);
      if (symbol && (ARABIC.test(line[0]) || line.startsWith("∴"))) {
        const point: Item = { term: symbol[1], text: symbol[2] };
        if (previous?.kind === "symbols") previous.items.push(point);
        else push({ kind: "symbols", items: [point] });
        attachTo = point;
        continue;
      }

      if (line.endsWith(":")) {
        forbidden = /tidak boleh|dilarang|jangan/i.test(line);
        push({ kind: "lead", text: line });
        continue;
      }

      if (previous?.kind === "paragraph" && lineIndex > 0) previous.text += `\n${line}`;
      else push({ kind: "paragraph", text: line });
    }
  });

  // A list of bare Arabic phrases is a set of examples, and one of quoted ayahs a run of verses.
  for (const section of sections) {
    section.parts = section.parts.flatMap((part): Part[] => {
      if (part.kind !== "list" || part.items.some(({ term, examples }) => term || examples)) return [part];
      if (part.items.every(({ text }) => isArabicOnly(text))) return [{ kind: "examples", groups: part.items.map(({ text }) => [text]) }];
      if (part.items.every(({ text }) => verseParts(text))) return part.items.map(({ text }) => ({ kind: "verse", text }));
      return [part];
    });
  }

  return { sections: sections.filter((section) => section.parts.length > 0 || section.title || section.group), source };
}

/** Parts of text, with every run of Arabic script flagged so it can be set in the Arabic typeface. */
export function arabicRuns(text: string) {
  const pattern = /([\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]+(?:[\s،]+[\u0600-\u06ff\u0750-\u077f\u08a0-\u08ff\ufb50-\ufdff\ufe70-\ufeff]+)*)/;

  return text
    .split(pattern)
    .filter(Boolean)
    .map((part) => ({ text: part, arabic: ARABIC.test(part) }));
}

/** Rough reading time in minutes at 180 words a minute, at least one. */
export function readingMinutes(content: string) {
  return Math.max(1, Math.round(content.split(/\s+/).filter(Boolean).length / 180));
}
