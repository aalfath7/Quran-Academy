// Bagian 2 "Huruf sambung, kata, dan mad" (Praktik 8–18), sama dengan "Buku Latihan Quran Academy Bagian 2".
// Formatnya sama dengan Bagian 1: setiap praktik berisi latihan A, B, C, dan latihan terakhir disetor ke guru.
// Sengaja belum memakai sukun dan tasydid. Sebagian baris (terutama Praktik 8 dan 9) berupa suku kata tanpa arti;
// itu disengaja untuk latihan membaca, bukan kosakata.

import type { Lesson } from "@/lib/lessons";
import { practice } from "./praktik-dasar";

export const lessons: Lesson[] = [
  practice({
    slug: "praktik-huruf-sambung",
    title: "Bentuk Huruf Sambung",
    position: 80,
    summary: "Mengenal bentuk huruf di awal, tengah, dan akhir kata, serta enam huruf yang tidak menyambung ke huruf sesudahnya.",
    arabicText: "بَـ  ـبَـ  ـبَ",
    guide: [
      "Dalam kata, huruf berubah bentuk sesuai posisinya: awal, tengah, atau akhir. Bunyinya tidak berubah. Enam huruf (ا د ذ ر ز و) tidak pernah menyambung ke huruf sesudahnya (di kirinya)."
    ],
    exercises: [
      {
        label: "Latihan A — Bentuk awal, tengah, akhir",
        rows: ["بَـ ـبَـ ـبَ · تَـ ـتَـ ـتَ · جَـ ـجَـ ـجَ", "عَـ ـعَـ ـعَ · هَـ ـهَـ ـهَ · كَـ ـكَـ ـكَ"]
      },
      {
        label: "Latihan B — Huruf yang tidak menyambung ke kiri",
        rows: ["دَرَزَ · وَدَ · ذَرَ · أَوَ · زَرَ", "رَدَ · دَوَ · ذَوَ · وَزَ · أَدَ"]
      },
      {
        label: "Latihan C — Baca bersambung (setor ke guru)",
        rows: ["بَتَ · جَعَ · سَلَ · كَتَ · هَبَ", "فَعَ · نَصَ · لَمَ · غَفَ · قَتَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-kata-dua-huruf",
    title: "Kata Dua Huruf",
    position: 90,
    summary: "Membaca dua huruf yang tersambung sebagai satu kata, tanpa jeda dan tanpa dieja.",
    arabicText: "لَكَ  مَعَ  هُوَ",
    guide: ["Baca dua huruf yang tersambung sebagai satu kata, tanpa jeda di antaranya. Jangan dieja per huruf."],
    exercises: [
      {
        label: "Latihan A — Kata dua huruf",
        rows: ["لَكَ · بِكَ · مَعَ · لَهُ", "هُوَ · هِيَ · مِنَ · عَنِ"]
      },
      {
        label: "Latihan B — Campuran harakat",
        rows: ["يَدُ · دَمُ · أَخُ · أَبُ", "غَضِ · طَبُ · ظَلَ · خُذَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["فَمُ · لَكِ · بِهِ · سَبَ · قِفَ", "ثَمَ · كُنَ · عَدَ · نَحُ · صِلَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-kata-tiga-huruf-fathah",
    title: "Kata Tiga Huruf Berfathah",
    position: 100,
    summary: "Membaca kata tiga huruf yang semuanya berfathah, rata satu ketukan per huruf.",
    arabicText: "كَتَبَ  جَلَسَ  ذَهَبَ",
    guide: [
      "Semua huruf di praktik ini berfathah. Baca rata, satu ketukan per huruf, tanpa memanjangkan huruf terakhir."
    ],
    exercises: [
      {
        label: "Latihan A — Kata tiga huruf (1)",
        rows: ["كَتَبَ · جَلَسَ · ذَهَبَ · خَرَجَ", "دَخَلَ · نَصَرَ · خَلَقَ · صَدَقَ"]
      },
      {
        label: "Latihan B — Kata tiga huruf (2)",
        rows: ["فَتَحَ · جَعَلَ · قَتَلَ · أَكَلَ", "ظَلَمَ · طَلَبَ · غَفَرَ · ضَرَبَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["سَأَلَ · رَجَعَ · وَجَدَ · حَمَلَ", "بَلَغَ · ثَبَتَ · شَكَرَ · هَرَبَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-kata-tiga-huruf-campuran",
    title: "Kata Tiga Huruf Campuran Harakat",
    position: 110,
    summary: "Membaca kata tiga huruf dengan harakat yang berbeda-beda, termasuk kata bertanwin.",
    arabicText: "عَلِمَ  كُتِبَ  رَجُلٌ",
    guide: [
      "Sekarang harakat dalam satu kata berbeda-beda. Perhatikan harakat setiap huruf, jangan menebak dari bentuk kata."
    ],
    exercises: [
      {
        label: "Latihan A — Kasrah di tengah",
        rows: ["شَرِبَ · عَلِمَ · عَمِلَ · سَمِعَ", "حَزِنَ · رَضِيَ · فَرِحَ · نَسِيَ"]
      },
      {
        label: "Latihan B — Dhammah",
        rows: ["كَبُرَ · حَسُنَ · قَرُبَ · بَعُدَ", "خُلِقَ · كُتِبَ · جُعِلَ · ذُكِرَ"]
      },
      {
        label: "Latihan C — Acak dengan tanwin (setor ke guru)",
        rows: ["رُسُلٌ · كُتُبٌ · سُبُلٌ · عُنُقٌ", "إِبِلٌ · أُذُنٌ · رَجُلٌ · مَلِكٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-ta-marbuthah-dan-hamzah",
    title: "Ta Marbuthah dan Hamzah",
    position: 120,
    summary: "Membaca ta marbuthah (ة) di akhir kata dan hamzah dalam berbagai bentuk tulisannya.",
    arabicText: "شَجَرَةٌ  سَأَلَ  قَرَأَ",
    guide: [
      `Ta marbuthah (ة) hanya ada di akhir kata dan dibaca "t" selama bacaan disambung; cara membacanya saat berhenti dipelajari di Bagian 4. Fathatain pada ة ditulis tanpa alif. Hamzah bisa ditulis di atas alif (أ), di atas wawu (ؤ), di atas ya tanpa titik (ئ), atau berdiri sendiri (ء); bunyinya sama.`
    ],
    exercises: [
      {
        label: "Latihan A — Ta marbuthah",
        rows: ["شَجَرَةٌ · سَنَةٌ · ثَمَرَةٌ · بَقَرَةٌ", "شَجَرَةً · ثَمَرَةً · بَقَرَةٍ · سَنَةٍ"]
      },
      {
        label: "Latihan B — Hamzah",
        rows: ["أَخَذَ · سَأَلَ · بَدَأَ · قَرَأَ", "سُئِلَ · يَئِسَ · بَطُؤَ · مَلَأَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["بَقَرَةٌ · سَأَلَ · شَجَرَةٍ · بَدَأَ", "سَنَةً · قَرَأَ · ثَمَرَةٌ · يَئِسَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-kata-empat-huruf",
    title: "Kata Empat Huruf dan Tanwin",
    position: 130,
    summary: "Membaca kata empat huruf dan kata bertanwin dengan rata, tanpa jeda dan tanpa dieja.",
    arabicText: "خَلَقَكَ  شَجَرَةٌ  بَرَكَةٌ",
    guide: [
      "Kata makin panjang, tetapi caranya sama: baca rata tanpa jeda dan tanpa dieja. Tanwin di akhir kata dibaca jelas."
    ],
    exercises: [
      {
        label: "Latihan A — Kata empat huruf",
        rows: ["خَلَقَكَ · رَزَقَكَ · نَصَرَكَ · وَجَدَكَ", "ثَمَرَةٌ · مَلَكَةٌ · شَجَرَةٌ · دَرَجَةٌ"]
      },
      {
        label: "Latihan B — Bertanwin",
        rows: ["حَسَنَةٌ · بَرَكَةٌ · رَقَبَةٍ · عَجَلَةً", "سَمَكَةٌ · خَشَبَةٍ · وَرَقَةً · حَجَرٌ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["دَرَجَةٌ · خَلَقَكَ · بَرَكَةً · وَجَدَكَ", "رَقَبَةٍ · نَصَرَكَ · عَجَلَةٌ · رَزَقَكَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-mad-alif",
    title: "Mad Alif",
    position: 140,
    summary: "Huruf berfathah yang diikuti alif dibaca panjang dua ketukan.",
    arabicText: "بَا  قَالَ  كِتَابٌ",
    guide: [
      "Huruf berfathah yang diikuti alif dibaca panjang dua ketukan (بَا = baa). Alif sendiri tidak berharakat; tugasnya hanya memanjangkan. Hitung dengan jari: satu ketukan untuk pendek, dua untuk panjang."
    ],
    exercises: [
      {
        label: "Latihan A — Mad alif pada huruf",
        rows: ["بَا · تَا · ثَا · جَا · حَا", "خَا · دَا · رَا · سَا · قَا"]
      },
      {
        label: "Latihan B — Dalam kata",
        rows: ["قَالَ · كَانَ · نَامَ · صَامَ", "بَابٌ · نَارٌ · مَالٌ · دَارٌ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["كِتَابٌ · سَلَامٌ · طَعَامٌ · عَذَابٌ", "قَالَا · ظَالِمٌ · عَالِمٌ · خَالِقٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-mad-ya",
    title: "Mad Ya",
    position: 150,
    summary: "Huruf berkasrah yang diikuti ya tanpa harakat dibaca panjang dua ketukan.",
    arabicText: "بِي  قِيلَ  رَحِيمٌ",
    guide: [
      "Huruf berkasrah yang diikuti ya tanpa harakat dibaca panjang dua ketukan (بِي = bii). Jangan berhenti atau menekan di huruf ya."
    ],
    exercises: [
      {
        label: "Latihan A — Mad ya pada huruf",
        rows: ["بِي · تِي · جِي · حِي · دِي", "رِي · سِي · فِي · قِي · نِي"]
      },
      {
        label: "Latihan B — Dalam kata",
        rows: ["قِيلَ · فِيهِ · دِينٌ · كَبِيرٌ", "رَحِيمٌ · عَظِيمٌ · قَرِيبٌ · سَمِيعٌ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["عَلِيمٌ · حَكِيمٌ · بَصِيرٌ · قَدِيرٌ", "نَذِيرٌ · بَشِيرٌ · كَرِيمٌ · مَجِيدٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-mad-wawu",
    title: "Mad Wawu",
    position: 160,
    summary: "Huruf berdhammah yang diikuti wawu tanpa harakat dibaca panjang dua ketukan.",
    arabicText: "بُو  يَقُولُ  نُورٌ",
    guide: [
      "Huruf berdhammah yang diikuti wawu tanpa harakat dibaca panjang dua ketukan (بُو = buu). Bibir tetap bulat sampai bunyi panjangnya selesai."
    ],
    exercises: [
      {
        label: "Latihan A — Mad wawu pada huruf",
        rows: ["بُو · تُو · جُو · دُو · رُو", "سُو · قُو · كُو · نُو · هُو"]
      },
      {
        label: "Latihan B — Dalam kata",
        rows: ["يَقُولُ · نُوحٌ · نُورٌ · سُورَةٌ", "يَكُونُ · يَعُودُ · غَفُورٌ · شَكُورٌ"]
      },
      {
        label: "Latihan C — Tiga mad campuran (setor ke guru)",
        rows: ["يَقُولُونَ · كِتَابٌ · قِيلَ · رَسُولٌ", "صَابِرُونَ · قَادِرِينَ · عَابِدُونَ · خَالِدِينَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-harakat-berdiri",
    title: "Harakat Berdiri dan Alif Maqshurah",
    position: 170,
    summary: "Fathah berdiri, kasrah berdiri, dhammah terbalik, dan alif maqshurah (ى) dibaca panjang dua ketukan.",
    arabicText: "هٰذَا  لَهٗ  عَلٰى",
    guide: [
      `Fathah berdiri ( ـٰ ), kasrah berdiri ( ـٖ ), dan dhammah terbalik ( ـٗ ) dibaca panjang dua ketukan, sama seperti mad. Ya tanpa titik (ى) di akhir kata sesudah fathah juga dibaca panjang "a" (عَلٰى = 'alaa).`
    ],
    exercises: [
      {
        label: "Latihan A — Harakat berdiri",
        rows: ["هٰذَا · ذٰلِكَ · مٰلِكِ · سَمٰوَاتِ", "بِهٖ · لَهٗ · مَالَهٗ · كِتَابَهٗ · كِتَابِهٖ"]
      },
      {
        label: "Latihan B — Alif maqshurah",
        rows: ["عَلٰى · مُوسٰى · عِيسٰى · مَتٰى", "رَمٰى · سَعٰى · قَضٰى · بَنٰى"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["ذٰلِكَ · مُوسٰى · بِهٖ · سَعٰى", "هٰذَا · لَهٗ · عِيسٰى · كِتَابِهٖ"]
      }
    ]
  }),
  practice({
    slug: "praktik-pendek-atau-panjang",
    title: "Pendek atau Panjang",
    position: 180,
    summary: "Ujian Bagian 2: membedakan bacaan pendek dan panjang, serta berhenti di kata berfathatain.",
    arabicText: "مَلِكِ / مَالِكِ",
    guide: [
      `Salah panjang-pendek bisa mengubah arti (مَلِكِ = raja, مَالِكِ = pemilik). Bandingkan setiap pasangan dengan teliti. Saat berhenti di kata berfathatain, tanwinnya dibaca "a" panjang dua ketukan (عَلِيمًا → 'aliimaa).`
    ],
    exercises: [
      {
        label: "Latihan A — Pasangan pendek dan panjang",
        rows: ["قَلَ / قَالَ · كَتَبَ / كَاتَبَ · عَلِمَ / عَالِمٌ", "فِهِ / فِيهِ · يَقُلُ / يَقُولُ · مَلِكِ / مَالِكِ"]
      },
      {
        label: "Latihan B — Berhenti di fathatain",
        rows: ["عَلِيمًا · حَكِيمًا · بَصِيرًا · سَمِيعًا", "كَبِيرًا · قَرِيبًا · عَظِيمًا · رَحِيمًا"]
      },
      {
        label: `Latihan C — Ujian Bagian 2 (setor ke guru)
Kata terakhir (سَمِيعًا) dibaca berhenti.`,
        rows: ["مَالِكِ · يَقُولُ · قِيلَ · هٰذَا · شَجَرَةٌ", "مُوسٰى · كِتَابِهٖ · خَلَقَكَ · ذٰلِكَ · سَمِيعًا"]
      }
    ]
  })
];
