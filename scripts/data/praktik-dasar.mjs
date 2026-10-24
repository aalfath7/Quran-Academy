// Jilid 1 "Praktik Dasar Bacaan": latihan huruf hijaiyah berharakat dan bertanwin, dari hamzah sampai ya.
// Baris latihan dibangkitkan dengan pola yang sama untuk setiap huruf: baris pertama a-a-a-a / i-i-i-i / u-u-u-u,
// baris kedua a-a-i-i / u-u-a-a / i-i-u-u, ditambah satu kelompok acak. Setiap dua huruf diikuti latihan campuran dari semua huruf yang sudah dipelajari.
//
// Format isi untuk halaman praktik (/praktik/[slug]), yang menampilkannya sebagai satu lembar latihan:
// • paragraf teks sebelum blok latihan pertama menjadi "Petunjuk" yang dilipat;
// • paragraf teks berikutnya menjadi label di atas blok latihan; label berbentuk kunci bunyi
//   ("ba = بَ · bi = بِ · bu = بُ") tampil sebagai baris kunci, dari kanan ke kiri;
// • paragraf berisi teks Arab saja adalah blok latihan, satu baris per baris latihan,
//   dengan kelompok dalam satu baris dipisah dua spasi atau lebih.

const FATHAH = "\u064E";
const KASRAH = "\u0650";
const DHAMMAH = "\u064F";
const FATHATAIN = "\u064B";
const KASRATAIN = "\u064D";
const DHAMMATAIN = "\u064C";

// heavy: dibaca tebal, sehingga fathahnya terdengar "o" (kho, sho, ro, ...).
const letters = [
  { ar: "ء", name: "Hamzah", sound: "" },
  { ar: "ب", name: "Ba", sound: "b" },
  { ar: "ت", name: "Ta", sound: "t" },
  { ar: "ث", name: "Tsa", sound: "ts" },
  { ar: "ج", name: "Jim", sound: "j" },
  { ar: "ح", name: "Ḥa", sound: "ḥ" },
  { ar: "خ", name: "Kho", sound: "kh", heavy: true },
  { ar: "د", name: "Dal", sound: "d" },
  { ar: "ذ", name: "Dzal", sound: "dz" },
  { ar: "ر", name: "Ro", sound: "r", heavy: true },
  { ar: "ز", name: "Zai", sound: "z" },
  { ar: "س", name: "Sin", sound: "s" },
  { ar: "ش", name: "Syin", sound: "sy" },
  { ar: "ص", name: "Shod", sound: "sh", heavy: true },
  { ar: "ض", name: "Dhod", sound: "dh", heavy: true },
  { ar: "ط", name: "Tho", sound: "th", heavy: true },
  { ar: "ظ", name: "Zho", sound: "zh", heavy: true },
  { ar: "ع", name: "'Ain", sound: "'" },
  { ar: "غ", name: "Ghoin", sound: "gh", heavy: true },
  { ar: "ف", name: "Fa", sound: "f" },
  { ar: "ق", name: "Qof", sound: "q", heavy: true },
  { ar: "ك", name: "Kaf", sound: "k" },
  { ar: "ل", name: "Lam", sound: "l" },
  { ar: "م", name: "Mim", sound: "m" },
  { ar: "ن", name: "Nun", sound: "n" },
  { ar: "و", name: "Wawu", sound: "w" },
  { ar: "ه", name: "Ha", sound: "h" },
  { ar: "ي", name: "Ya", sound: "y" }
];

const byChar = new Map(letters.map((letter) => [letter.ar, letter]));
const groups = [
  ["ء", "ب", "ت", "ث"],
  ["ج", "ح", "خ", "د", "ذ"],
  ["ر", "ز", "س", "ش"],
  ["ص", "ض", "ط", "ظ", "ع", "غ"],
  ["ف", "ق", "ك", "ل", "م", "ن", "و", "ه", "ي"]
].map((group) => group.map((char) => byChar.get(char)));

/** Written forms and readings of one letter, keyed a / i / u. */
function harakat(letter) {
  const a = letter.heavy ? "o" : "a";
  const readings = { a: letter.sound + a, i: letter.sound + "i", u: letter.sound + "u" };

  // Hamzah at the start of a word sits on alif; on its own it is written ء. Both are drilled, as in the book.
  if (letter.ar === "ء") {
    return { forms: { a: "أَ", i: "إِ", u: "أُ" }, alt: { a: "ءَ", i: "ءِ", u: "ءُ" }, readings };
  }

  return { forms: { a: letter.ar + FATHAH, i: letter.ar + KASRAH, u: letter.ar + DHAMMAH }, readings };
}

function tanwin(letter) {
  const forms = { a: letter.ar + FATHATAIN, i: letter.ar + KASRATAIN, u: letter.ar + DHAMMATAIN };
  const a = letter.heavy ? "on" : "an";

  return { forms, readings: { a: letter.sound + a, i: letter.sound + "in", u: letter.sound + "un" } };
}

// Deterministic, so re-running the seed produces the same rows.
function random(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const pick = (rand, items) => items[Math.floor(rand() * items.length)];

function shuffle(rand, items) {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

const row = (groupsOfSyllables) => groupsOfSyllables.map((syllables) => syllables.join(" ")).join("   ");

/** Two drill rows for one letter, as in the source book. */
function letterDrill(rand, { forms: { a, i, u }, alt }) {
  if (alt) {
    return [
      row([[a, a, a, a], [i, i, i, i], [u, u, u, u], [alt.a, alt.a, alt.a, alt.a]]),
      row([[a, a, i, i], [u, u, alt.a, alt.a], [i, a, a, i], [u, alt.a, alt.i, alt.u]])
    ].join("\n");
  }
  const mixed = () => shuffle(rand, [a, i, u, pick(rand, [a, i, u])]);

  return [row([[a, a, a, a], [i, i, i, i], [u, u, u, u], mixed()]), row([[a, a, i, i], [u, u, a, a], [i, i, u, u], mixed()])].join("\n");
}

/** Two rows of three-syllable groups; every group contains one of the letters just learned. */
function mixedDrill(rand, current, pool, vocalize) {
  const syllable = (letter) => pick(rand, Object.values(vocalize(letter).forms));
  const rows = [];
  for (let r = 0; r < 2; r++) {
    const rowGroups = [];
    for (let g = 0; g < 5; g++) {
      rowGroups.push(shuffle(rand, [syllable(pick(rand, current)), syllable(pick(rand, pool)), syllable(pick(rand, pool))]));
    }
    rows.push(row(rowGroups));
  }
  return rows.join("\n");
}

/** All letters with one vowel mark, seven to a row. */
function summaryBlock(key, vocalize) {
  const syllables = letters.map((letter) => vocalize(letter).forms[key]);
  const rows = [];
  for (let start = 0; start < syllables.length; start += 7) rows.push(syllables.slice(start, start + 7).join("   "));
  return rows.join("\n");
}

const names = (group) => group.map(({ name }) => name).join(", ").replace(/, ([^,]*)$/, " dan $1");

/** Sound key ("ba = بَ · bi = بِ · bu = بُ") followed by the letter's drill rows. */
function letterSection(rand, letter, vocalize) {
  const vocalized = vocalize(letter);
  const { forms, readings, alt } = vocalized;
  const key = ["a", "i", "u"].map((k) => [readings[k], forms[k], ...(alt ? [alt[k]] : [])].join(" = ")).join(" · ");

  return `${key}\n\n${letterDrill(rand, vocalized)}`;
}

/** Letters drilled two at a time, each pair followed by a mixed review of everything learned so far. */
function drillContent({ intro, group, groupIndex, vocalize, seed, closing = [] }) {
  const rand = random(seed);
  const learned = groups.slice(0, groupIndex).flat();
  const parts = [intro];

  for (let start = 0; start < group.length; start += 2) {
    const pair = group.slice(start, start + 2);
    learned.push(...pair);
    parts.push(...pair.map((letter) => letterSection(rand, letter, vocalize)), mixedDrill(rand, pair, learned, vocalize));
  }

  return [...parts, ...closing].join("\n\n");
}

const howToRead =
  "Baca dari kanan ke kiri, satu kelompok dalam satu tarikan napas. Harakat dibaca pendek, satu ketukan. Ulangi sampai lancar, lalu lanjut ke huruf berikutnya.";

const range = (group) => `${group[0].name} sampai ${group[group.length - 1].name}`;

const harakatLessons = groups.map((group, groupIndex) => ({
  slug: `praktik-dasar-harakat-${groupIndex + 1}`,
  title: `Harakat: ${range(group)}`,
  category: "praktik",
  position: 20 + groupIndex * 10,
  summary: `Latihan membaca huruf ${names(group)} dengan harakat fathah (a), kasrah (i), dan dhammah (u).`,
  arabicText: group.map((letter) => harakat(letter).forms.a).join("  "),
  content: drillContent({
    group,
    groupIndex,
    vocalize: harakat,
    seed: 100 + groupIndex,
    intro:
      groupIndex === 0
        ? `Fathah ( ـَ ) dibaca "a", kasrah ( ـِ ) dibaca "i", dhammah ( ـُ ) dibaca "u". Pada huruf tebal (kho, ro, shod, dhod, tho, zho, ghoin, qof), fathah terdengar "o".

${howToRead}`
        : howToRead,
    closing:
      groupIndex === groups.length - 1
        ? ["Rangkuman: fathah", summaryBlock("a", harakat), "Rangkuman: kasrah", summaryBlock("i", harakat), "Rangkuman: dhammah", summaryBlock("u", harakat)]
        : []
  })
}));

const tanwinLessons = groups.map((group, groupIndex) => ({
  slug: `praktik-dasar-tanwin-${groupIndex + 1}`,
  title: `Tanwin: ${range(group)}`,
  category: "praktik",
  position: 70 + groupIndex * 10,
  summary: `Latihan membaca huruf ${names(group)} dengan tanwin fathatain (an), kasratain (in), dan dhammatain (un).`,
  arabicText: group.map((letter) => tanwin(letter).forms.u).join("  "),
  content: drillContent({
    group,
    groupIndex,
    vocalize: tanwin,
    seed: 200 + groupIndex,
    intro:
      groupIndex === 0
        ? `Fathatain ( ـً ) dibaca "an", kasratain ( ـٍ ) dibaca "in", dhammatain ( ـٌ ) dibaca "un". Di mushaf, fathatain biasanya diikuti alif yang tidak dibaca panjang (بًا tetap "ban"); di latihan ini alifnya tidak ditulis.

${howToRead}`
        : howToRead,
    closing:
      groupIndex === groups.length - 1
        ? [
            "Rangkuman: fathatain",
            summaryBlock("a", tanwin),
            "Rangkuman: kasratain",
            summaryBlock("i", tanwin),
            "Rangkuman: dhammatain",
            summaryBlock("u", tanwin)
          ]
        : []
  })
}));

const spaced = (rows) => rows.map((line) => line.split(" ").join("   ")).join("\n");

export const lessons = [
  {
    slug: "praktik-dasar-huruf-hijaiyah",
    title: "Mengenal Huruf Hijaiyah",
    category: "praktik",
    position: 10,
    summary: "Langkah pertama membaca Al-Qur'an: mengenal 29 huruf hijaiyah dan nama-namanya, dibaca dari kanan ke kiri.",
    arabicText: "ا ب ت ث",
    content: `Huruf hijaiyah ada 29 dan dibaca dari kanan ke kiri. Urutan namanya: Alif, Ba, Ta, Tsa, Jim, Ḥa, Kho, Dal, Dzal, Ro, Zai, Sin, Syin, Shod, Dhod, Tho, Zho, 'Ain, Ghoin, Fa, Qof, Kaf, Lam, Mim, Nun, Wawu, Ha, Hamzah, Ya.

Alif (ا) tidak pernah berharakat; bunyi a, i, u di awal kata ditulis dengan hamzah (أَ إِ أُ). Ḥa (ح) diucapkan dari tengah tenggorokan dan berdesah, Ha (ه) dari pangkal tenggorokan dan ringan.

Sebutkan nama setiap huruf, mulai dari kanan atas

${spaced(["ا ب ت ث ج ح خ", "د ذ ر ز س ش ص", "ض ط ظ ع غ ف ق", "ك ل م ن و ه ء ي"])}

Huruf yang mirip: bedakan dari titiknya

ب ت ث   ج ح خ   د ذ   ر ز
س ش   ص ض   ط ظ   ع غ

Huruf yang dibaca tebal

${spaced(["خ ص ض غ ط ق ظ"])}

Sebutkan acak, tanpa melihat urutan

${spaced(["ق ج ذ ه ص ب ع", "ث ظ ي ل خ ش ر", "ف د ط م ء ز ح", "ك س ن غ و ت ض"])}`
  },
  ...harakatLessons,
  ...tanwinLessons
];
