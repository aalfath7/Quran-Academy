// Bagian 1 "Pengenalan huruf" dari kurikulum praktik (39 praktik dalam 4 bagian), sama dengan
// "Buku Latihan Quran Academy Bagian 1": 7 praktik pendek (sekitar 10–15 menit), masing-masing berisi latihan A, B, C;
// latihan terakhir adalah campuran yang disetor ke guru. Baris latihan disalin dari buku tersebut.
//
// Format isi untuk halaman praktik (/praktik/[slug]), yang menampilkannya sebagai satu lembar latihan:
// • paragraf teks sebelum blok latihan pertama menjadi "Petunjuk" yang dilipat;
// • paragraf teks berikutnya menjadi label di atas blok latihan; baris kedua dan seterusnya dari label tampil
//   sebagai catatan di bawahnya; label berbentuk kunci bunyi ("ba = بَ · bi = بِ · bu = بُ") tampil sebagai baris kunci;
// • paragraf berisi teks Arab saja adalah blok latihan, satu baris per baris latihan,
//   dengan kelompok dalam satu baris dipisah dua spasi atau lebih.

/**
 * A drill block from rows written as in the book: groups separated by " · ", or, in a row without " · ",
 * every syllable on its own. A row given as an array lists its groups as they are (an ayah read in one breath).
 */
const drill = (...rows) =>
  rows
    .map((row) => (Array.isArray(row) ? row : row.includes(" · ") ? row.split(" · ") : row.split(" ")).join("   "))
    .join("\n");

export const practice = ({ slug, title, position, summary, arabicText, guide, exercises }) => ({
  slug,
  title,
  category: "praktik",
  position,
  summary,
  arabicText,
  // An exercise without rows (reading from the mushaf, handing in to the teacher) is shown as its label alone.
  content: [...guide, ...exercises.flatMap(({ label, rows = [] }) => (rows.length ? [label, drill(...rows)] : [label]))].join(
    "\n\n"
  )
});

export const lessons = [
  practice({
    slug: "praktik-dasar-huruf-hijaiyah",
    title: "Mengenal Huruf Hijaiyah",
    position: 10,
    summary: "Langkah pertama membaca Al-Qur'an: mengenal 29 huruf hijaiyah dan nama-namanya, dibaca dari kanan ke kiri.",
    arabicText: "ا ب ت ث ج",
    guide: [
      "Huruf hijaiyah ada 29 dan dibaca dari kanan ke kiri. Urutan namanya: Alif, Ba, Ta, Tsa, Jim, Ḥa, Kho, Dal, Dzal, Ro, Zai, Sin, Syin, Shod, Dhod, Tho, Zho, 'Ain, Ghoin, Fa, Qof, Kaf, Lam, Mim, Nun, Wawu, Ha, Hamzah, Ya. Alif (ا) tidak pernah berharakat; bunyi a, i, u di awal kata ditulis dengan hamzah (أَ إِ أُ). Tujuh huruf selalu dibaca tebal: خ ص ض غ ط ق ظ."
    ],
    exercises: [
      {
        label: "Latihan A — Sebutkan nama setiap huruf, mulai dari kanan atas",
        rows: ["ا ب ت ث ج ح خ", "د ذ ر ز س ش ص", "ض ط ظ ع غ ف ق", "ك ل م ن و ه ء ي"]
      },
      {
        label: "Latihan B — Huruf yang mirip: bedakan dari titiknya",
        rows: ["ب ت ث · ج ح خ · د ذ · ر ز", "س ش · ص ض · ط ظ · ع غ"]
      },
      {
        label: "Latihan C — Sebutkan acak, tanpa melihat urutan (setor ke guru)",
        rows: ["ق ج ذ ه ص ب ع", "ث ظ ي ل خ ش ر", "ف د ط م ء ز ح", "ك س ن غ و ت ض"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-harakat-1",
    title: "Harakat Alif sampai Kho",
    position: 20,
    summary: "Latihan membaca huruf Alif (hamzah), Ba, Ta, Tsa, Jim, Ḥa, dan Kho dengan harakat fathah (a), kasrah (i), dan dhammah (u).",
    arabicText: "أَ  بَ  تَ  ثَ  جَ  حَ  خَ",
    guide: [
      `Fathah ( ـَ ) dibaca "a", kasrah ( ـِ ) dibaca "i", dhammah ( ـُ ) dibaca "u", pendek satu ketukan. Ḥa (ح) dari tengah tenggorokan dan berdesah; Kho (خ) dari ujung tenggorokan dan dibaca tebal ("a" tebal, bukan "o").`
    ],
    exercises: [
      {
        label: "Latihan A — Fathah, kasrah, dhammah",
        rows: ["أَ بَ تَ ثَ جَ حَ خَ", "إِ بِ تِ ثِ جِ حِ خِ", "أُ بُ تُ ثُ جُ حُ خُ"]
      },
      {
        label: "Latihan B — Per huruf",
        rows: ["بَ بِ بُ · تَ تِ تُ · ثَ ثِ ثُ · جَ جِ جُ", "حَ حِ حُ · خَ خِ خُ · أَ إِ أُ · ثُ ثِ ثَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["جِ بَ خُ · ثَ حِ أُ · تُ جَ بِ · خِ ثُ حَ", "إِ تَ حُ · بُ خَ ثِ · جُ أَ تِ · حَ بِ خَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-harakat-2",
    title: "Harakat Dal sampai Shod",
    position: 30,
    summary: "Latihan membaca huruf Dal, Dzal, Ro, Zai, Sin, Syin, dan Shod dengan harakat fathah (a), kasrah (i), dan dhammah (u).",
    arabicText: "دَ  ذَ  رَ  زَ  سَ  شَ  صَ",
    guide: [
      "Ra berfathah dan berdhammah dibaca tebal, ra berkasrah tipis. Sin (س) berdesis tipis, Syin (ش) berdesis menyebar, Shod (ص) berdesis tebal. Dzal (ذ) diucapkan dengan ujung lidah di antara gigi."
    ],
    exercises: [
      {
        label: "Latihan A — Fathah, kasrah, dhammah",
        rows: ["دَ ذَ رَ زَ سَ شَ صَ", "دِ ذِ رِ زِ سِ شِ صِ", "دُ ذُ رُ زُ سُ شُ صُ"]
      },
      {
        label: "Latihan B — Per huruf",
        rows: ["دَ دِ دُ · ذَ ذِ ذُ · رَ رِ رُ · زَ زِ زُ", "سَ سِ سُ · شَ شِ شُ · صَ صِ صُ · زُ ذِ دَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["رِ صَ ذُ · زَ شِ دُ · سُ رَ صِ · ذَ زُ شَ", "دِ سَ رُ · صُ ذِ زَ · شُ دَ سِ · رَ صِ ذَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-harakat-3",
    title: "Harakat Dhod sampai Qof",
    position: 40,
    summary: "Latihan membaca huruf Dhod, Tho, Zho, 'Ain, Ghoin, Fa, dan Qof dengan harakat fathah (a), kasrah (i), dan dhammah (u).",
    arabicText: "ضَ  طَ  ظَ  عَ  غَ  فَ  قَ",
    guide: [
      `Dhod, Tho, Zho, Ghoin, dan Qof selalu dibaca tebal; fathahnya "a" tebal, bukan "o". 'Ain (ع) keluar dari tengah tenggorokan, jangan dibaca seperti hamzah.`
    ],
    exercises: [
      {
        label: "Latihan A — Fathah, kasrah, dhammah",
        rows: ["ضَ طَ ظَ عَ غَ فَ قَ", "ضِ طِ ظِ عِ غِ فِ قِ", "ضُ طُ ظُ عُ غُ فُ قُ"]
      },
      {
        label: "Latihan B — Per huruf",
        rows: ["ضَ ضِ ضُ · طَ طِ طُ · ظَ ظِ ظُ · عَ عِ عُ", "غَ غِ غُ · فَ فِ فُ · قَ قِ قُ · عُ ظِ ضَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["طِ عَ قُ · ظَ فِ ضُ · غُ طَ عِ · قَ ضُ ظِ", "فُ غَ طِ · عُ قِ ظَ · ضَ فُ غِ · طُ عِ قَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-harakat-4",
    title: "Harakat Kaf sampai Ya",
    position: 50,
    summary: "Latihan membaca huruf Kaf, Lam, Mim, Nun, Wawu, Ha, dan Ya dengan harakat fathah (a), kasrah (i), dan dhammah (u).",
    arabicText: "كَ  لَ  مَ  نَ  وَ  هَ  يَ",
    guide: [
      "Kaf (ك) dibaca tipis, berbeda dengan Qof (ق) yang tebal. Ha (ه) ringan dari pangkal tenggorokan, berbeda dengan Ḥa (ح). Setelah praktik ini, semua huruf berharakat sudah dikenal."
    ],
    exercises: [
      {
        label: "Latihan A — Fathah, kasrah, dhammah",
        rows: ["كَ لَ مَ نَ وَ هَ يَ", "كِ لِ مِ نِ وِ هِ يِ", "كُ لُ مُ نُ وُ هُ يُ"]
      },
      {
        label: "Latihan B — Per huruf",
        rows: ["كَ كِ كُ · لَ لِ لُ · مَ مِ مُ · نَ نِ نُ", "وَ وِ وُ · هَ هِ هُ · يَ يِ يُ · نُ مِ لَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["مِ كَ هُ · يَ نِ وُ · لُ مَ كِ · هَ يُ نِ", "وِ لَ مُ · كُ هِ يَ · نَ وُ لِ · مَ كُ هِ"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-tanwin",
    title: "Tanwin",
    position: 60,
    summary: "Latihan membaca huruf bertanwin, fathatain (an), kasratain (in), dan dhammatain (un), termasuk bentuk بًا di mushaf.",
    arabicText: "بً  بٍ  بٌ  بًا",
    guide: [
      `Tanwin adalah harakat dobel yang dibaca dengan tambahan bunyi "n": fathatain ( ـً ) "an", kasratain ( ـٍ ) "in", dhammatain ( ـٌ ) "un". Bunyi "n" dibaca jelas dan pendek.`,
      "Kunci: ban = بً · bin = بٍ · bun = بٌ"
    ],
    exercises: [
      {
        label: "Latihan A — Fathatain, kasratain, dhammatain",
        rows: ["بً تً ثً جً حً خً دً", "ذٍ رٍ زٍ سٍ شٍ صٍ ضٍ", "طٌ ظٌ عٌ غٌ فٌ قٌ كٌ", "لً مٍ نٌ وً هٍ يٌ ءً"]
      },
      {
        label: `Latihan B — Bentuk di mushaf
Di mushaf, fathatain hampir selalu ditulis dengan alif sesudahnya. Alif itu tidak dibaca panjang; بًا tetap dibaca "ban".`,
        rows: ["بًا · تًا · جًا · رًا · سًا · عًا · مًا · نًا"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["قٍ لٌ دًا · حٌ سٍ مًا · ظٍ نٌ كًا · عٌ ثٍ يًا", "خٍ رٌ فًا · صٌ ذٍ هًا · غٌ تٍ وًا · ضٌ زٍ جًا"]
      }
    ]
  }),
  practice({
    slug: "praktik-dasar-ujian-bagian-1",
    title: "Harakat, Tanwin, dan Huruf Mirip",
    position: 70,
    summary: "Ujian Bagian 1: membedakan harakat dan tanwin, lalu huruf yang mirip bunyi, dan setor campuran ke guru.",
    arabicText: "بَ بً  أَ عَ  هَ حَ",
    guide: [
      "Praktik ini mengulang seluruh Bagian 1. Bedakan harakat dan tanwin, lalu huruf yang mirip bunyi. Baca pelan dulu, baru dipercepat."
    ],
    exercises: [
      {
        label: "Latihan A — Harakat atau tanwin",
        rows: ["بَ بً · بِ بٍ · بُ بٌ · عَ عً · حِ حٍ", "قُ قٌ · صَ صً · ظِ ظٍ · ذُ ذٌ · ثَ ثً"]
      },
      {
        label: "Latihan B — Huruf mirip bunyi",
        rows: ["أَ عَ · هَ حَ · سَ ثَ صَ · زَ ذَ ظَ", "كَ قَ · تَ طَ · دَ ضَ · إِ عِ · هُ حُ"]
      },
      {
        label: "Latihan C — Ujian Bagian 1 (setor ke guru)",
        rows: ["ثَ سً صُ · عِ ءٌ حَ · هُ ظٍ زَ · ذِ قً كُ · طَ تٍ ضُ", "ضً دِ عُ · أَ حٌ هِ · صٍ ثُ سَ · ظُ ذً زِ · كَ قٌ طِ"]
      }
    ]
  })
];

/** Slugs from the earlier 11-practice version of Bagian 1, removed by the seed. */
export const obsoleteSlugs = [
  "praktik-dasar-harakat-5",
  "praktik-dasar-tanwin-1",
  "praktik-dasar-tanwin-2",
  "praktik-dasar-tanwin-3",
  "praktik-dasar-tanwin-4",
  "praktik-dasar-tanwin-5"
];
