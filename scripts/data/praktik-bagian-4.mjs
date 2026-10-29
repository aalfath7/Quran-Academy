// Bagian 4 "Menuju mushaf" (Praktik 30–39), sama dengan "Buku Latihan Quran Academy Bagian 4": hukum nun sukun dan
// tanwin, mim sukun, mad far'i, hukum ra, dan waqaf, ditutup dengan ujian membaca mushaf. Contoh latihan diambil dari
// lafaz Al-Qur'an, sebagian dipotong dari ayatnya agar fokus pada satu hukum. Ayat yang panjang dipecah per baris
// karena satu kelompok bacaan tidak dipatahkan di layar sempit.

import { practice } from "./praktik-dasar.mjs";

export const lessons = [
  practice({
    slug: "praktik-izhhar-halqi",
    title: "Izhhar Halqi",
    position: 300,
    summary: "Nun sukun atau tanwin yang bertemu enam huruf tenggorokan dibaca jelas, tanpa dengung.",
    arabicText: "مِنْ هَادٍ  أَنْعَمْتَ",
    guide: [
      `Nun sukun (نْ) atau tanwin yang bertemu salah satu dari enam huruf tenggorokan (ء ه ع ح غ خ) dibaca jelas, tanpa dengung. Jangan ada jeda atau dengung di antara bunyi "n" dan huruf sesudahnya.`
    ],
    exercises: [
      {
        label: "Latihan A — Nun sukun",
        rows: ["مِنْ هَادٍ · مَنْ أَعْطٰى · يَنْأَوْنَ · أَنْعَمْتَ", "مِنْ عِلْمٍ · مِنْ خَيْرٍ · يَنْحِتُونَ · مِنْ غِلٍّ"]
      },
      {
        label: "Latihan B — Tanwin",
        rows: ["عَذَابٌ أَلِيمٌ · عَلِيمٌ حَكِيمٌ · نَارٌ حَامِيَةٌ", "كُفُوًا أَحَدٌ · لَطِيفٌ خَبِيرٌ · جُرُفٍ هَارٍ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["أَنْعَمْتَ · عَلِيمٌ حَكِيمٌ · مِنْ خَيْرٍ · كُفُوًا أَحَدٌ", "يَنْحِتُونَ · نَارٌ حَامِيَةٌ · مِنْ عِلْمٍ · لَطِيفٌ خَبِيرٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-idgham",
    title: "Idgham",
    position: 310,
    summary: "Nun sukun atau tanwin yang bertemu ي ن م و dilebur dengan dengung, dan yang bertemu ل ر dilebur tanpa dengung.",
    arabicText: "مَنْ يَقُولُ  مِنْ رَبِّهِمْ",
    guide: [
      "Nun sukun atau tanwin yang bertemu huruf ي ن م و di kata berikutnya dileburkan dengan dengung dua ketukan (idgham bighunnah). Bertemu ل atau ر dileburkan tanpa dengung (idgham bilaa ghunnah). Jika bertemu dalam satu kata (دُنْيَا، صِنْوَانٌ), dibaca jelas."
    ],
    exercises: [
      {
        label: "Latihan A — Idgham bighunnah (dengan dengung)",
        rows: ["مَنْ يَقُولُ · مِنْ وَالٍ · مِنْ نِعْمَةٍ · مِنْ مَالٍ", "خَيْرًا يَرَهٗ · يَوْمَئِذٍ وَاجِفَةٌ · وُجُوهٌ يَوْمَئِذٍ"]
      },
      {
        label: "Latihan B — Idgham bilaa ghunnah (tanpa dengung)",
        rows: ["مِنْ رَبِّهِمْ · مِنْ لَدُنْهُ", "هُدًى لِلْمُتَّقِينَ · غَفُورٌ رَحِيمٌ"]
      },
      {
        label: "Latihan C — Dengan atau tanpa dengung (setor ke guru)",
        rows: [
          "مَنْ يَقُولُ · مِنْ رَبِّهِمْ · خَيْرًا يَرَهٗ · غَفُورٌ رَحِيمٌ",
          "مِنْ مَالٍ · هُدًى لِلْمُتَّقِينَ · مِنْ وَالٍ · مِنْ لَدُنْهُ"
        ]
      }
    ]
  }),
  practice({
    slug: "praktik-iqlab",
    title: "Iqlab",
    position: 320,
    summary: "Nun sukun atau tanwin yang bertemu ب berubah menjadi bunyi mim yang samar dengan dengung.",
    arabicText: "مِنْ بَعْدِ  سَمِيعٌ بَصِيرٌ",
    guide: [
      "Nun sukun atau tanwin yang bertemu ب berubah bunyi menjadi mim yang samar, disertai dengung dua ketukan; bibir dirapatkan ringan. Di mushaf Indonesia biasanya ditandai dengan mim kecil di atas nun atau tanwin."
    ],
    exercises: [
      {
        label: "Latihan A — Nun sukun bertemu ب",
        rows: ["مِنْ بَعْدِ · أَنْبِئْهُمْ · لَيُنْبَذَنَّ · مُنْبَثًّا"]
      },
      {
        label: "Latihan B — Tanwin bertemu ب",
        rows: ["سَمِيعٌ بَصِيرٌ · عَلِيمٌ بِذَاتِ الصُّدُورِ"]
      },
      {
        label: "Latihan C — Iqlab atau izhhar (setor ke guru)",
        rows: ["مِنْ بَعْدِ · مِنْ خَيْرٍ · سَمِيعٌ بَصِيرٌ · عَلِيمٌ حَكِيمٌ", "أَنْبِئْهُمْ · أَنْعَمْتَ · لَيُنْبَذَنَّ · مِنْ عِلْمٍ"]
      }
    ]
  }),
  practice({
    slug: "praktik-ikhfa",
    title: "Ikhfa",
    position: 330,
    summary: "Nun sukun atau tanwin yang bertemu 15 huruf ikhfa dibaca samar dengan dengung dua ketukan.",
    arabicText: "أَنْتُمْ  مِنْ قَبْلِ",
    guide: [
      "Nun sukun atau tanwin yang bertemu salah satu dari 15 huruf (ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك) dibaca samar, antara jelas dan lebur, dengan dengung dua ketukan. Ujung lidah tidak menempel ke langit-langit. Dengungnya tebal jika huruf sesudahnya tebal (مِنْ قَبْلِ), tipis jika huruf sesudahnya tipis (كُنْتُمْ)."
    ],
    exercises: [
      {
        label: "Latihan A — Nun sukun",
        rows: ["أَنْتُمْ · مِنْ قَبْلِ · كُنْتُمْ · يُنْفِقُونَ", "مَنْ ذَا · أَنْزَلْنَا · مِنْ شَرِّ · فَانْصَبْ"]
      },
      {
        label: "Latihan B — Tanwin",
        rows: ["نَارًا ذَاتَ لَهَبٍ · عَمَلًا صَالِحًا · جَنَّاتٍ تَجْرِي", "شَيْءٍ قَدِيرٌ · رِيحًا صَرْصَرًا"]
      },
      {
        label: "Latihan C — Ikhfa, idgham, atau iqlab (setor ke guru)",
        rows: ["أَنْتُمْ · مَنْ يَقُولُ · مِنْ بَعْدِ · مِنْ قَبْلِ", "عَمَلًا صَالِحًا · غَفُورٌ رَحِيمٌ · سَمِيعٌ بَصِيرٌ · فَانْصَبْ"]
      }
    ]
  }),
  practice({
    slug: "praktik-hukum-mim-sukun",
    title: "Hukum Mim Sukun",
    position: 340,
    summary: "Tiga hukum mim sukun: idgham mimi, ikhfa syafawi, dan izhhar syafawi.",
    arabicText: "لَهُمْ مَا  لَهُمْ فِيهَا",
    guide: [
      "Mim sukun (مْ) punya tiga hukum. Bertemu م: dileburkan dengan dengung (idgham mimi). Bertemu ب: disamarkan dengan dengung, bibir dirapatkan ringan (ikhfa syafawi). Bertemu huruf lain: dibaca jelas tanpa dengung (izhhar syafawi), terutama sebelum و dan ف."
    ],
    exercises: [
      {
        label: "Latihan A — Idgham mimi dan ikhfa syafawi",
        rows: ["لَهُمْ مَا · كَمْ مِنْ · أَمْ مَنْ", "تَرْمِيهِمْ بِحِجَارَةٍ · وَهُمْ بِالْآخِرَةِ · يَعْتَصِمْ بِاللّٰهِ"]
      },
      {
        label: "Latihan B — Izhhar syafawi",
        rows: ["لَهُمْ فِيهَا · أَمْ لَمْ · عَلَيْهِمْ وَلَا", "أَنْعَمْتَ عَلَيْهِمْ · لَكُمْ دِينُكُمْ"]
      },
      {
        label: "Latihan C — Tiga hukum mim sukun (setor ke guru)",
        rows: [
          "لَهُمْ مَا · لَهُمْ فِيهَا · تَرْمِيهِمْ بِحِجَارَةٍ · كَمْ مِنْ",
          "عَلَيْهِمْ وَلَا · وَهُمْ بِالْآخِرَةِ · أَمْ لَمْ · لَكُمْ دِينُكُمْ"
        ]
      }
    ]
  }),
  practice({
    slug: "praktik-mad-muttashil-munfashil",
    title: "Mad Muttashil dan Munfashil",
    position: 350,
    summary: "Mad yang bertemu hamzah dalam satu kata (muttashil) atau di awal kata berikutnya (munfashil) dibaca lebih panjang.",
    arabicText: "جَاءَ  إِنَّا أَعْطَيْنَاكَ",
    guide: [
      "Mad yang bertemu hamzah dibaca lebih panjang dari mad biasa. Jika mad dan hamzah ada dalam satu kata, disebut mad muttashil (wajib, 4–5 harakat). Jika hamzah ada di awal kata berikutnya, disebut mad munfashil (boleh 2–5 harakat; yang umum dipakai 4). Di mushaf Indonesia, keduanya biasanya ditandai garis bergelombang (~) di atas huruf mad. Pilih satu panjang dan pakai secara konsisten."
    ],
    exercises: [
      {
        label: "Latihan A — Mad muttashil (satu kata)",
        rows: ["جَاءَ · اَلسَّمَاءِ · سُوءٍ · جِيءَ"]
      },
      {
        label: "Latihan B — Mad munfashil (dua kata)",
        rows: ["إِنَّا أَعْطَيْنَاكَ · بِمَا أُنْزِلَ", "قُوا أَنْفُسَكُمْ · فِي أَنْفُسِكُمْ"]
      },
      {
        label: "Latihan C — Mad biasa atau mad panjang (setor ke guru)",
        rows: ["قَالَ · جَاءَ · فِيهِ · فِي أَنْفُسِكُمْ", "يَقُولُ · سُوءٍ · كِتَابٌ · إِنَّا أَعْطَيْنَاكَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-mad-lazim-aridh",
    title: "Mad Lazim dan 'Aridh Lissukun",
    position: 360,
    summary: "Mad yang bertemu sukun asli atau tasydid dibaca 6 harakat; yang bertemu sukun karena berhenti dibaca 2, 4, atau 6 harakat.",
    arabicText: "اَلضَّالِّينَ  الٓمٓ",
    guide: [
      "Mad yang bertemu sukun asli atau tasydid dibaca 6 harakat (mad lazim), termasuk pada sebagian huruf pembuka surah (الٓمٓ = alif laaam miiim). Mad yang bertemu sukun karena berhenti dibaca 2, 4, atau 6 harakat (mad 'aridh lissukun); saat disambung, kembali dibaca 2 harakat."
    ],
    exercises: [
      {
        label: "Latihan A — Mad lazim",
        rows: ["اَلضَّالِّينَ · اَلطَّامَّةُ · اَلصَّاخَّةُ · دَابَّةٍ", "الٓمٓ · كٓهٰيٰعٓصٓ · نٓ"]
      },
      {
        label: "Latihan B — Mad 'aridh lissukun (saat berhenti)",
        rows: ["نَسْتَعِينْ · اَلرَّحِيمْ · يَعْلَمُونْ · اَلْعَالَمِينْ"]
      },
      {
        label: `Latihan C — Acak (setor ke guru)
اَلضَّالِّينَ dan اَلطَّامَّةُ dibaca berhenti.`,
        rows: ["دَابَّةٍ · اَلضَّالِّينَ · الٓمٓ · نَسْتَعِينْ", "نٓ · اَلطَّامَّةُ · يَعْلَمُونْ · اَلرَّحِيمْ"]
      }
    ]
  }),
  practice({
    slug: "praktik-hukum-ra",
    title: "Hukum Ra",
    position: 370,
    summary: "Kapan ra dibaca tebal dan kapan tipis, termasuk pengecualian ra sukun yang diikuti huruf tebal.",
    arabicText: "رَبِّ  رِزْقًا  مَرْيَمَ",
    guide: [
      "Ra dibaca tebal jika berfathah atau berdhammah, atau bersukun sesudah fathah dan dhammah, atau bersukun sesudah hamzah washal. Ra dibaca tipis jika berkasrah, atau bersukun sesudah kasrah asli. Pengecualian: ra sukun sesudah kasrah tetap tebal jika diikuti huruf tebal dalam kata yang sama (قِرْطَاسٍ)."
    ],
    exercises: [
      {
        label: "Latihan A — Ra tebal",
        rows: ["رَبِّ · رُسُلٌ · مَرْيَمَ · يَرْجِعُونَ", "اِرْجِعِي · بَرْقٌ · خَرَجَ · اَلرَّحْمٰنُ"]
      },
      {
        label: `Latihan B — Ra tipis dan pengecualiannya
مِرْصَادًا dan قِرْطَاسٍ tetap dibaca tebal.`,
        rows: ["رِزْقًا · فِرْعَوْنَ · شِرْعَةً · رِجَالٌ", "مِرْصَادًا · قِرْطَاسٍ"]
      },
      {
        label: "Latihan C — Tebal atau tipis (setor ke guru)",
        rows: ["رَبِّ · رِزْقًا · اِرْجِعِي · فِرْعَوْنَ", "مَرْيَمَ · قِرْطَاسٍ · رِجَالٌ · يَرْجِعُونَ"]
      }
    ]
  }),
  practice({
    slug: "praktik-waqaf-akhir-ayat",
    title: "Waqaf di Akhir Ayat",
    position: 380,
    summary: "Cara berhenti di akhir ayat, tanda-tanda waqaf di mushaf, dan membaca QS. Al-'Ashr.",
    arabicText: "رَحْمَةٌ ← رَحْمَهْ",
    guide: [
      `Saat berhenti, huruf terakhir dibaca sukun. Ta marbuthah (ة) berubah menjadi "h". Fathatain berubah menjadi "a" panjang. Kasratain dan dhammatain hilang tanwinnya dan dibaca sukun.`
    ],
    exercises: [
      {
        label: "Latihan A — Cara berhenti",
        rows: [
          "نَسْتَعِينُ ← نَسْتَعِينْ · اَلصَّمَدُ ← اَلصَّمَدْ · رَحْمَةٌ ← رَحْمَهْ",
          "عَلِيمًا ← عَلِيمَا · اَلْفَلَقِ ← اَلْفَلَقْ · حَكِيمٌ ← حَكِيمْ"
        ]
      },
      {
        label: `Latihan B — Tanda waqaf di mushaf
مـ : harus berhenti
لا : jangan berhenti, kecuali di akhir ayat
ج : boleh berhenti atau lanjut
صلى : lebih baik lanjut
قلى : lebih baik berhenti
∴ ∴ (titik tiga yang berpasangan): berhenti di salah satunya saja`,
        rows: ["مـ · لا · ج · صلى · قلى · ∴ ∴"]
      },
      {
        label: `Latihan C — QS. Al-'Ashr, berhenti di setiap akhir ayat (setor ke guru)
Catatan: آ pada آمَنُوا dibaca panjang dua ketukan. Ayat ketiga dipecah menjadi beberapa baris; baca bersambung sampai akhir ayat.`,
        rows: [
          ["وَالْعَصْرِ"],
          ["إِنَّ الْإِنْسَانَ لَفِي خُسْرٍ"],
          ["إِلَّا الَّذِينَ آمَنُوا"],
          ["وَعَمِلُوا الصَّالِحَاتِ"],
          ["وَتَوَاصَوْا بِالْحَقِّ"],
          ["وَتَوَاصَوْا بِالصَّبْرِ"]
        ]
      }
    ]
  }),
  practice({
    slug: "praktik-ujian-membaca-mushaf",
    title: "Ujian Membaca Mushaf",
    position: 390,
    summary: "Ujian akhir: membaca Al-Fatihah dan lima surah pendek langsung dari mushaf, lalu setor ke guru.",
    arabicText: "بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ",
    guide: [
      "Ini ujian akhir. Baca langsung dari mushaf, berhenti di setiap akhir ayat, dan terapkan semua kaidah dari Bagian 1–4. Murid dinyatakan lulus jika guru menilai bacaannya lancar dan tidak ada kesalahan yang mengubah arti."
    ],
    exercises: [
      {
        label: `Latihan A — QS. Al-Fatihah
Ayat ketujuh dipecah menjadi tiga baris; baca bersambung sampai akhir ayat.`,
        rows: [
          ["بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيمِ"],
          ["اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ"],
          ["اَلرَّحْمٰنِ الرَّحِيمِ"],
          ["مَالِكِ يَوْمِ الدِّينِ"],
          ["إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ"],
          ["اِهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ"],
          ["صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ"],
          ["غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ"],
          ["وَلَا الضَّالِّينَ"]
        ]
      },
      {
        label: `Latihan B — Lima surah pendek, dibaca dari mushaf
QS. An-Nas · QS. Al-Falaq · QS. Al-Ikhlas · QS. Al-Kautsar · QS. Al-'Ashr`
      },
      {
        label: `Latihan C — Setor ujian ke guru
Setorkan Al-Fatihah ditambah satu surah dari Latihan B yang dipilih guru.`
      }
    ]
  })
];
