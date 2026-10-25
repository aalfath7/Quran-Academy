// Dependency-free: the practice curriculum, 39 practices in 4 parts, from single letters to reading the mushaf.
// Published practices are numbered in order, so practice N belongs to the part whose range holds N.

export const PRACTICE_TOTAL = 39;

const parts = [
  {
    title: "Pengenalan huruf",
    target: "Membaca semua huruf tunggal berharakat dan bertanwin dengan lancar, serta membedakan huruf yang mirip bunyi dan bentuk.",
    count: 7
  },
  {
    title: "Huruf sambung, kata, dan mad",
    target: "Membaca kata 2–4 huruf tanpa mengeja, serta membedakan bacaan pendek (1 ketukan) dan panjang (2 ketukan).",
    count: 11
  },
  {
    title: "Sukun, tasydid, dan lam ta'rif",
    target: "Membaca huruf mati dan bertasydid dengan tepat, serta tahu huruf mana yang ditulis tetapi tidak dibaca.",
    count: 11
  },
  {
    title: "Menuju mushaf",
    target: "Menerapkan hukum nun sukun, mim sukun, mad far'i, ra, dan waqaf, lalu membaca surah pendek langsung dari mushaf.",
    count: 10
  }
];

export type PracticePart = { number: number; title: string; target: string; from: number; to: number };

export const practiceParts: PracticePart[] = parts.map(({ title, target, count }, i) => {
  const from = parts.slice(0, i).reduce((sum, part) => sum + part.count, 0) + 1;
  return { number: i + 1, title, target, from, to: from + count - 1 };
});

/** The part practice `number` (1-based) belongs to; numbers past the plan count toward the last part. */
export function practicePart(number: number) {
  return practiceParts.find(({ to }) => number <= to) ?? practiceParts[practiceParts.length - 1];
}

/** Ordered practices split into the parts, each item keeping its practice number. */
export function groupByPart<T>(practices: T[]) {
  return practiceParts.map((part, i) => ({
    ...part,
    items: practices
      .map((practice, index) => ({ practice, number: index + 1 }))
      .slice(part.from - 1, i === practiceParts.length - 1 ? undefined : part.to)
  }));
}
