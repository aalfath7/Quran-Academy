// Dependency-free: the tajwid class, 26 meetings in 5 stages, for learners who can already read.
// Published tajwid lessons are numbered in order, so meeting N belongs to the stage whose range holds N.

export const MEETING_TOTAL = 26;

const stages = [
  {
    title: "Makhraj & sifat lewat ayat",
    opening: "Satu huruf yang dibaca dari Al-Qur'an bernilai satu kebaikan, dan satu kebaikan dilipatgandakan sepuluh kali.",
    openingSource: "HR. At-Tirmidzi",
    count: 5
  },
  {
    title: "Nun sukun, tanwin, mim sukun",
    opening: "Sebaik-baik kalian adalah yang belajar Al-Qur'an dan mengajarkannya.",
    openingSource: "HR. Al-Bukhari",
    count: 5
  },
  {
    title: "Mad",
    opening: "Orang yang mahir membaca Al-Qur'an bersama para malaikat yang mulia, dan yang terbata-bata mendapat dua pahala.",
    openingSource: "Muttafaq 'alaih",
    tip: "Alat bantu tahap ini: ketukan jari. Satu harakat kira-kira satu ketukan sedang; lepaskan ketukan setelah panjang bacaan stabil.",
    count: 5
  },
  {
    title: "Tebal-tipis, qalqalah, ra & lam",
    opening: "Belajar dua ayat lebih baik daripada dua ekor unta, tiga ayat lebih baik daripada tiga ekor unta, dan seterusnya.",
    openingSource: "HR. Muslim",
    count: 5
  },
  {
    title: "Waqaf, ibtida, isti'adzah, gharib & ujian",
    opening: "Bacalah apa yang mudah bagimu dari Al-Qur'an.",
    openingSource: "Al-Muzzammil: 20",
    count: 6
  }
];

export type TajwidStage = {
  number: number;
  title: string;
  opening: string;
  openingSource: string;
  tip?: string;
  from: number;
  to: number;
};

export const tajwidStages: TajwidStage[] = stages.map(({ count, ...stage }, i) => {
  const from = stages.slice(0, i).reduce((sum, { count }) => sum + count, 0) + 1;
  return { number: i + 1, ...stage, from, to: from + count - 1 };
});

/** The stage meeting `number` (1-based) belongs to; numbers past the plan count toward the last stage. */
export function tajwidStage(number: number) {
  return tajwidStages.find(({ to }) => number <= to) ?? tajwidStages[tajwidStages.length - 1];
}

/** Ordered meetings split into the stages, each item keeping its meeting number. */
export function groupByStage<T>(meetings: T[]) {
  return tajwidStages.map((stage, i) => ({
    ...stage,
    items: meetings
      .map((meeting, index) => ({ meeting, number: index + 1 }))
      .slice(stage.from - 1, i === tajwidStages.length - 1 ? undefined : stage.to)
  }));
}
