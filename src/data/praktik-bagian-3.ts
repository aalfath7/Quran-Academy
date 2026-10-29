// Bagian 3 "Sukun, tasydid, dan lam ta'rif" (Praktik 19–29), sama dengan "Buku Latihan Quran Academy Bagian 3":
// sukun, qalqalah, huruf lin, tasydid, lam ta'rif, lafzhul jalalah, hamzah washal, dan huruf yang ditulis tetapi
// tidak dibaca. Contoh dipilih agar nun sukun, tanwin, dan mim sukun tidak bertemu huruf yang memicu idgham, iqlab,
// atau ikhfa; hukum-hukum itu baru diajarkan di Bagian 4.

import type { Lesson } from "@/lib/lessons";
import { practice } from "./praktik-dasar";

export const lessons: Lesson[] = [
  practice({
    slug: "praktik-sukun",
    title: "Sukun",
    position: 190,
    summary: "Membaca huruf mati (bersukun) yang menempel pada huruf sebelumnya, tanpa tambahan bunyi.",
    arabicText: "قُلْ  لَمْ  يَعْلَمُ",
    guide: [
      `Sukun ( ـْ ) menandai huruf mati: huruf itu tidak berharakat dan dibaca menempel pada huruf sebelumnya (قُلْ = qul). Jangan menambahkan bunyi "e" di belakangnya (bukan "qule").`
    ],
    exercises: [
      {
        label: "Latihan A — Kata pendek bersukun",
        rows: ["قُلْ · لَمْ · هَلْ · بَلْ · مِنْ", "عَنْ · كَمْ · لَنْ · أَمْ · إِنْ"]
      },
      {
        label: "Latihan B — Sukun di tengah kata",
        rows: ["يَعْلَمُ · يَفْعَلُ · يَسْمَعُ · يَشْكُرُ", "مَسْجِدٌ · أَرْسَلَ · سَهْلٌ · شَمْسٌ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["يَحْمِلُ · مَعْرُوفٌ · نَفْسٌ · أَهْلٌ", "يَرْحَمُ · عِلْمٌ · فَصْلٌ · يَغْفِرُ"]
      }
    ]
  }),
  practice({
    slug: "praktik-qalqalah",
    title: "Qalqalah",
    position: 200,
    summary: "Lima huruf qalqalah (ق ط ب ج د) dibaca memantul ringan ketika bersukun.",
    arabicText: "أَقْ  أَطْ  أَبْ  أَجْ  أَدْ",
    guide: [
      `Lima huruf qalqalah (ق ط ب ج د, mudah diingat dengan "baju di toko") dibaca memantul ketika bersukun. Pantulannya ringan, bukan menjadi harakat baru (أَبْ bukan "abe").`
    ],
    exercises: [
      {
        label: "Latihan A — Huruf qalqalah bersukun",
        rows: ["أَقْ · أَطْ · أَبْ · أَجْ · أَدْ", "يَقْطَعُ · يَطْلُبُ · يَبْعَثُ · يَجْعَلُ · يَدْخُلُ"]
      },
      {
        label: `Latihan B — Di tengah dan akhir kata
أَحَدْ dan خَلَقْ dibaca berhenti.`,
        rows: ["قَدْ · لَقَدْ · أَحَدْ · خَلَقْ", "يَدْعُو · أَبْصَرَ · مَطْلَعِ · أَجْرٌ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["قَدْ · يَجْعَلُ · أَطْعَمَ · يَبْسُطُ", "مَقْبُولٌ · حَبْلٌ · أَدْخَلَ · وَجْهٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-huruf-lin",
    title: "Huruf Lin",
    position: 210,
    summary: "Wawu atau ya bersukun sesudah fathah dibaca pendek dan lembut, berbeda dengan mad.",
    arabicText: "خَوْفٌ  بَيْتٌ  يَوْمٌ",
    guide: [
      `Huruf lin adalah wawu atau ya bersukun sesudah fathah: ـَوْ dibaca "au", ـَيْ dibaca "ai". Dibaca pendek dan lembut, berbeda dengan mad yang panjang dua ketukan.`
    ],
    exercises: [
      {
        label: "Latihan A — Lin pada huruf dan kata",
        rows: ["أَوْ · أَيْ · لَوْ · بَيْ", "خَوْفٌ · بَيْتٌ · يَوْمٌ · لَيْلٌ"]
      },
      {
        label: "Latihan B — Dalam kata",
        rows: ["قُرَيْشٍ · عَلَيْكَ · إِلَيْكَ · لَدَيْهِ", "قَوْلٌ · غَيْرُ · عَيْنٌ · صَيْفٌ"]
      },
      {
        label: "Latihan C — Mad atau lin (setor ke guru)",
        rows: ["قَالَ / قَوْلٌ · فِيهِ / عَلَيْهِ · يَقُولُ / يَوْمَ", "خَيْرٌ · مَوْتٌ · كَيْفَ · زَوْجٌ"]
      }
    ]
  }),
  practice({
    slug: "praktik-tasydid",
    title: "Tasydid",
    position: 220,
    summary: "Huruf bertasydid dibaca dua kali: mati menempel ke huruf sebelumnya, lalu berharakat.",
    arabicText: "رَبَّ  مَدَّ  عَلَّمَ",
    guide: [
      "Tasydid ( ـّ ) berarti huruf itu dibaca dua kali: yang pertama mati menempel ke huruf sebelumnya, yang kedua berharakat (رَبَّ = rab-ba). Tekan sedikit, tanpa jeda."
    ],
    exercises: [
      {
        label: "Latihan A — Tasydid di akhir kata",
        rows: ["رَبَّ · مَدَّ · شَدَّ · رَدَّ", "رَبُّ · كُلٌّ · حَقٌّ · سِرٌّ"]
      },
      {
        label: "Latihan B — Tasydid di tengah kata",
        rows: ["عَلَّمَ · قَدَّمَ · كَذَّبَ · صَدَّقَ", "يُعَلِّمُ · يُكَذِّبُ · مُصَدِّقٌ · قَرَّبَ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["كَلَّا · بَدَّلَ · ضَلَّ · يُحِبُّ", "أَشَدُّ · رَبِّ · قَطَّعَ · عَدَّ"]
      }
    ]
  }),
  practice({
    slug: "praktik-nun-mim-bertasydid",
    title: "Nun dan Mim Bertasydid",
    position: 230,
    summary: "Nun dan mim bertasydid dibaca dengan dengung (ghunnah) sempurna, kira-kira dua ketukan.",
    arabicText: "إِنَّ  ثُمَّ  جَنَّةٌ",
    guide: [
      "Nun dan mim bertasydid wajib dibaca dengan dengung (ghunnah) sempurna, kira-kira dua ketukan, dari rongga hidung (إِنَّ = in-nnna). Jangan terlalu pendek, jangan terlalu panjang."
    ],
    exercises: [
      {
        label: "Latihan A — Dengung pada kata pendek",
        rows: ["إِنَّ · أَنَّ · ثُمَّ · أُمَّ", "جَنَّةٌ · عَمَّ · هَمَّ · ظَنَّ"]
      },
      {
        label: "Latihan B — Dalam kata",
        rows: ["مُحَمَّدٌ · إِنَّكَ · كُنَّا · أُمَّةٌ", "مِنِّي · لَمَّا · عَنَّا · يَمُنُّ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["إِنَّ · جَنَّةٌ · مُحَمَّدٌ · أُمَّةٌ", "كُنَّا · لَمَّا · إِنَّكَ · ظَنَّ"]
      }
    ]
  }),
  practice({
    slug: "praktik-lam-qamariyah",
    title: "Lam Qamariyah",
    position: 240,
    summary: "Lam pada awalan اَلْ dibaca jelas jika huruf sesudahnya salah satu dari 14 huruf qamariyah.",
    arabicText: "اَلْحَمْدُ  اَلْقَمَرُ",
    guide: [
      "Pada awalan اَلْ, lam dibaca jelas (bersukun) jika huruf sesudahnya salah satu dari 14 huruf qamariyah: ا ب غ ح ج ك و خ ف ع ق ي م ه. Ciri di mushaf: lam diberi sukun, huruf sesudahnya tanpa tasydid."
    ],
    exercises: [
      {
        label: "Latihan A — Lam qamariyah (1)",
        rows: ["اَلْحَمْدُ · اَلْقَمَرُ · اَلْكِتَابُ · اَلْبَيْتُ", "اَلْغَفُورُ · اَلْعَلِيمُ · اَلْمُلْكُ · اَلْيَوْمُ"]
      },
      {
        label: "Latihan B — Lam qamariyah (2)",
        rows: ["اَلْأَرْضُ · اَلْوَلَدُ · اَلْفَجْرُ · اَلْخَيْرُ", "اَلْهُدٰى · اَلْجَبَلُ · اَلْإِسْلَامُ · اَلْحَقُّ"]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["اَلْيَوْمُ · اَلْفَجْرُ · اَلْعَلِيمُ · اَلْقَمَرُ", "اَلْبَيْتُ · اَلْهُدٰى · اَلْكِتَابُ · اَلْغَفُورُ"]
      }
    ]
  }),
  practice({
    slug: "praktik-lam-syamsiyah",
    title: "Lam Syamsiyah",
    position: 250,
    summary: "Lam pada awalan اَلْ tidak dibaca dan melebur jika huruf sesudahnya salah satu dari 14 huruf syamsiyah.",
    arabicText: "اَلشَّمْسُ  اَلنَّاسُ",
    guide: [
      "Jika huruf sesudah اَلْ adalah salah satu dari 14 huruf syamsiyah (ت ث د ذ ر ز س ش ص ض ط ظ ل ن), lam tidak dibaca dan melebur ke huruf itu. Ciri di mushaf: lam tanpa sukun, huruf sesudahnya bertasydid (اَلشَّمْسُ = asy-syamsu)."
    ],
    exercises: [
      {
        label: "Latihan A — Lam syamsiyah (1)",
        rows: ["اَلشَّمْسُ · اَلنَّاسُ · اَلرَّحْمٰنُ · اَلتِّينُ", "اَلدِّينُ · اَلسَّلَامُ · اَلزَّيْتُونُ · اَلذِّكْرُ"]
      },
      {
        label: "Latihan B — Lam syamsiyah (2)",
        rows: ["اَلظَّالِمُ · اَلضُّحٰى · اَللَّيْلُ · اَلثَّمَرُ", "اَلنُّورُ · اَلتَّوَّابُ · اَلصَّبْرُ · اَلشُّكْرُ"]
      },
      {
        label: "Latihan C — Qamariyah atau syamsiyah (setor ke guru)",
        rows: ["اَلْقَمَرُ / اَلشَّمْسُ · اَلْكِتَابُ / اَلنَّاسُ", "اَلْحَمْدُ · اَلرَّحِيمُ · اَلْيَوْمُ · اَلدِّينُ"]
      }
    ]
  }),
  practice({
    slug: "praktik-lafzhul-jalalah",
    title: "Lafzhul Jalalah",
    position: 260,
    summary: "Lam pada lafaz Allah dibaca tebal sesudah fathah atau dhammah, dan tipis sesudah kasrah.",
    arabicText: "اَللّٰهُ  بِاللّٰهِ",
    guide: [
      "Lam pada lafaz Allah (اللّٰه) dibaca tebal jika huruf sebelumnya berfathah atau berdhammah, juga saat memulai bacaan. Dibaca tipis jika huruf sebelumnya berkasrah. Alif di awal lafaz ini tidak dibaca saat disambung; kaidahnya dibahas di Praktik 27."
    ],
    exercises: [
      {
        label: "Latihan A — Dibaca tebal",
        rows: ["اَللّٰهُ · قَالَ اللّٰهُ · رَسُولُ اللّٰهِ", "نَصْرُ اللّٰهِ · عَبْدُ اللّٰهِ · هُوَ اللّٰهُ"]
      },
      {
        label: "Latihan B — Dibaca tipis",
        rows: ["لِلّٰهِ · بِاللّٰهِ · بِسْمِ اللّٰهِ", "ذِكْرِ اللّٰهِ · نِعْمَةِ اللّٰهِ · فَضْلِ اللّٰهِ"]
      },
      {
        label: "Latihan C — Tebal atau tipis (setor ke guru)",
        rows: ["قَالَ اللّٰهُ · بِاللّٰهِ · رَسُولُ اللّٰهِ · ذِكْرِ اللّٰهِ", "اَللّٰهُ · لِلّٰهِ · عَبْدُ اللّٰهِ · فَضْلِ اللّٰهِ"]
      }
    ]
  }),
  practice({
    slug: "praktik-hamzah-washal",
    title: "Hamzah Washal",
    position: 270,
    summary: "Alif di awal kata yang dibaca saat memulai bacaan dan gugur saat disambung.",
    arabicText: "اِقْرَأْ  وَاقْرَأْ",
    guide: [
      "Hamzah washal adalah alif di awal kata yang dibaca hanya saat memulai bacaan, dan gugur saat disambung dengan kata sebelumnya. Saat memulai: pada اَلْ dibaca fathah; pada kata kerja dibaca dhammah jika huruf ketiganya berdhammah (اُكْتُبْ), selain itu kasrah (اِقْرَأْ)."
    ],
    exercises: [
      {
        label: "Latihan A — Memulai dengan hamzah washal",
        rows: ["اِقْرَأْ · اِجْلِسْ · اِسْمَعْ · اُكْتُبْ", "اُدْخُلْ · اُسْجُدْ · اِعْلَمْ · اِذْهَبْ"]
      },
      {
        label: "Latihan B — Disambung, alif gugur",
        rows: ["وَاسْمَعْ · فَاعْلَمْ · وَاذْكُرْ · وَالْقَمَرِ", "وَالشَّمْسِ · بِالْحَقِّ · فَاسْجُدْ · وَارْكَعْ"]
      },
      {
        label: "Latihan C — Memulai atau menyambung (setor ke guru)",
        rows: ["اِذْهَبْ / فَاذْهَبْ · اِقْرَأْ / وَاقْرَأْ · اَلْحَمْدُ / وَالْحَمْدُ", "اُكْتُبْ / وَاكْتُبْ · اَلنَّاسُ / بِالنَّاسِ"]
      }
    ]
  }),
  practice({
    slug: "praktik-huruf-tidak-dibaca",
    title: "Huruf yang Tidak Dibaca",
    position: 280,
    summary: "Huruf yang ditulis di mushaf tetapi tidak dibaca, terutama alif sesudah wawu jama'.",
    arabicText: "قَالُوا  مِائَةٌ",
    guide: [
      "Beberapa huruf ditulis di mushaf tetapi tidak dibaca. Yang paling sering adalah alif sesudah wawu jama' (قَالُوا = qaaluu, alifnya diam). Contoh lain: alif pada مِائَةٌ (mi'atun), dan alif di akhir أَنَا yang dibaca pendek saat disambung."
    ],
    exercises: [
      {
        label: "Latihan A — Alif sesudah wawu jama'",
        rows: ["قَالُوا · كَفَرُوا · ذَهَبُوا · جَلَسُوا", "يَدْعُوا · كَانُوا · قُولُوا · سَمِعُوا"]
      },
      {
        label: `Latihan B — Alif lain yang tidak dibaca
أَنَا خَيْرٌ dibaca "ana khairun".`,
        rows: ["مِائَةٌ · مِائَتَيْنِ", ["أَنَا خَيْرٌ"]]
      },
      {
        label: "Latihan C — Acak (setor ke guru)",
        rows: ["قَالُوا · مِائَةٌ · كَانُوا · سَمِعُوا", "ذَهَبُوا · جَلَسُوا · مِائَتَيْنِ · قُولُوا"]
      }
    ]
  }),
  practice({
    slug: "praktik-ulangan-bagian-3",
    title: "Ulangan Bagian 3",
    position: 290,
    summary: "Ujian Bagian 3: kata campuran sukun, tasydid, dan lam ta'rif, lalu ayat Al-Qur'an pertama yang dibaca langsung.",
    arabicText: "اَلْحَمْدُ لِلّٰهِ",
    guide: [
      "Praktik ini menggabungkan semua kaidah Bagian 3. Latihan B adalah ayat Al-Qur'an pertama yang dibaca langsung; saat berhenti di akhir ayat, huruf terakhir dibaca sukun."
    ],
    exercises: [
      {
        label: "Latihan A — Kata campuran",
        rows: ["ثُمَّ قَالُوا · اَلْحَقُّ · قُلْ هُوَ · لِلّٰهِ", "وَالشَّمْسِ · يَجْعَلُ · إِنَّكَ · خَوْفٌ"]
      },
      {
        label: `Latihan B — Ayat pertama
QS. Al-Fatihah ayat 2 dan QS. Al-Ikhlas ayat 1–2.`,
        rows: [["اَلْحَمْدُ لِلّٰهِ رَبِّ الْعَالَمِينَ"], "قُلْ هُوَ اللّٰهُ أَحَدٌ · اَللّٰهُ الصَّمَدُ"]
      },
      {
        label: "Latihan C — Ujian Bagian 3 (setor ke guru)",
        rows: ["يَقْطَعُ · اَلشَّمْسُ · بِاللّٰهِ · قَالُوا · كَلَّا", "وَاذْكُرْ · خَيْرٌ · مُحَمَّدٌ · اَلْقَمَرُ · ثُمَّ"]
      }
    ]
  })
];
