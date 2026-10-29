import type { QuizQuestion } from "../quiz";

// Disusun dari materi kelas Lanjutan (src/data/tajwid-pertemuan.ts); tiap soal menautkan pertemuan yang membahasnya.
// Opsi pertama selalu jawaban yang benar.
export const tajwidQuiz: QuizQuestion[] = [
  // Tahap 1 — Makhraj & sifat lewat ayat
  {
    question: "Berapa jumlah makhraj umum dan makhraj khusus?",
    options: ["5 makhraj umum, 17 makhraj khusus", "3 makhraj umum, 17 makhraj khusus", "5 makhraj umum, 29 makhraj khusus", "4 makhraj umum, 10 makhraj khusus"],
    explanation: "Ada 5 makhraj umum (al-jauf, al-halq, al-lisan, asy-syafatain, al-khaisyum) yang terbagi menjadi 17 makhraj khusus.",
    lesson: "tes-awal-dan-peta-makhraj"
  },
  {
    question: "Dari makhraj manakah huruf mad keluar?",
    options: ["Al-jauf (rongga mulut dan tenggorokan)", "Al-halq (tenggorokan)", "Al-khaisyum (rongga hidung)", "Asy-syafatain (dua bibir)"],
    explanation: "Al-jauf adalah ruang kosong di mulut dan tenggorokan; satu makhraj ini untuk 3 huruf mad.",
    lesson: "tes-awal-dan-peta-makhraj"
  },
  {
    question: "Al-khaisyum (rongga hidung) adalah tempat keluarnya…",
    options: ["Ghunnah (dengung)", "Huruf mad", "Huruf qalqalah", "Huruf ق dan ك"],
    explanation: "Al-khaisyum menghubungkan hidung dengan tenggorokan; ghunnah yang menyertai nun dan mim keluar dari sini.",
    lesson: "tes-awal-dan-peta-makhraj"
  },
  {
    question: "Apa cara mudah memeriksa dengung pada نّ?",
    options: [
      "Tutup hidung; jika suara terhenti, dengung sudah keluar dari hidung",
      "Tutup mulut; jika suara tetap keluar, dengungnya salah",
      "Baca sekeras mungkin sampai terdengar bergetar",
      "Tahan napas sebelum mulai membaca"
    ],
    explanation: "Ghunnah keluar dari rongga hidung, jadi suaranya terhenti ketika hidung ditutup.",
    lesson: "tes-awal-dan-peta-makhraj"
  },
  {
    question: "Huruf apa yang keluar dari pangkal tenggorokan (aqshal halq)?",
    options: ["ء dan ه", "ع dan ح", "غ dan خ", "ق dan ك"],
    explanation: "Pangkal tenggorokan (daerah pita suara) untuk ء dan ه; tengah untuk ع dan ح; ujung untuk غ dan خ.",
    lesson: "huruf-tenggorokan"
  },
  {
    question: "Huruf ع dan ح keluar dari…",
    options: ["Tengah tenggorokan", "Pangkal tenggorokan", "Ujung tenggorokan", "Pangkal lidah"],
    explanation: "Tengah tenggorokan (wasthul halq), daerah epiglotis, adalah makhraj ع dan ح.",
    lesson: "huruf-tenggorokan"
  },
  {
    question: "Membaca ح pada الْحَمْدُ seperti ه termasuk kesalahan…",
    options: ["Lahn jali, karena hurufnya berganti", "Lahn khafi, karena hanya kurang sempurna", "Bukan kesalahan", "Kesalahan panjang mad"],
    explanation: "Tertukarnya ح dengan ه, ع dengan hamzah, atau خ dengan ك mengganti huruf, sehingga termasuk lahn jali.",
    lesson: "huruf-tenggorokan"
  },
  {
    question: "Apa beda makhraj ق dan ك?",
    options: [
      "ق dari pangkal lidah dan langit-langit lunak; ك sedikit lebih ke depan",
      "ق dari tenggorokan; ك dari pangkal lidah",
      "Keduanya keluar dari tempat yang sama persis",
      "ق dari ujung lidah; ك dari tengah lidah"
    ],
    explanation: "ق: pangkal lidah bertemu langit-langit lunak. ك: sedikit lebih ke depan, bertemu langit-langit lunak dan keras.",
    lesson: "pangkal-dan-tengah-lidah-huruf-dhad"
  },
  {
    question: "Huruf ض keluar dari…",
    options: [
      "Sisi lidah yang menempel ke geraham atas",
      "Ujung lidah dan pangkal gigi seri atas",
      "Tengah lidah dan langit-langit atas",
      "Pangkal lidah dan langit-langit lunak"
    ],
    explanation: "ض keluar dari satu sisi lidah (kanan, kiri, atau keduanya) yang menempel ke geraham atas.",
    lesson: "pangkal-dan-tengah-lidah-huruf-dhad"
  },
  {
    question: "Sifat istithalah (suara memanjang di sepanjang sisi lidah) dimiliki huruf…",
    options: ["ض", "ش", "ق", "ج"],
    explanation: "Istithalah pada ض: suaranya memanjang di sepanjang sisi lidah sampai mendekati makhraj ل.",
    lesson: "pangkal-dan-tengah-lidah-huruf-dhad"
  },
  {
    question: "Sifat tafasysyi (udara menyebar di dalam mulut) dimiliki huruf…",
    options: ["ش", "ض", "س", "ص"],
    explanation: "Tafasysyi pada ش: udara menyebar di dalam mulut sampai mengenai bagian dalam gigi seri atas.",
    lesson: "pangkal-dan-tengah-lidah-huruf-dhad"
  },
  {
    question: "Huruf ظ ذ ث keluar dari…",
    options: [
      "Ujung lidah bertemu ujung dua gigi seri atas",
      "Ujung lidah bertemu pangkal dua gigi seri atas",
      "Ujung lidah mendekati dinding dalam gigi seri bawah",
      "Bibir bawah bertemu ujung gigi seri atas"
    ],
    explanation: "Untuk ظ ذ ث, ujung lidah bertemu ujung dua gigi seri atas dengan lidah sedikit keluar.",
    lesson: "ujung-lidah-dan-bibir"
  },
  {
    question: "Huruf ف keluar dari…",
    options: [
      "Bagian dalam bibir bawah bertemu ujung gigi seri atas",
      "Dua bibir yang dirapatkan",
      "Ujung lidah dan gusi atas",
      "Dua bibir yang dibulatkan"
    ],
    explanation: "ف keluar dari bagian dalam bibir bawah dengan ujung gigi seri atas; ب م و dari dua bibir.",
    lesson: "ujung-lidah-dan-bibir"
  },
  {
    question: "Sifat shafir (bunyi desis) dimiliki huruf…",
    options: ["ز س ص", "ظ ذ ث", "ط د ت", "ب م و"],
    explanation: "Desis pada ز س ص inilah yang membedakan ص dari ث, dan ز dari ذ.",
    lesson: "ujung-lidah-dan-bibir"
  },
  {
    question: "Tajwid secara bahasa berarti…",
    options: ["Memperindah", "Menghafal", "Memanjangkan", "Memperlambat"],
    explanation: "Secara istilah, tajwid adalah ilmu untuk memberikan setiap huruf hak dan mustahaknya.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },
  {
    question: "Apa hukum membaca Al-Qur'an dengan tajwid bagi setiap muslim?",
    options: ["Fardhu 'ain", "Fardhu kifayah", "Sunnah", "Mubah"],
    explanation: "Membaca dengan tajwid fardhu 'ain; mempelajari teorinya fardhu kifayah.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },
  {
    question: "Sifat yang muncul karena bertemu huruf lain, seperti izhar, idgham, dan ikhfa, disebut…",
    options: ["Mustahak huruf", "Hak huruf", "Lahn khafi", "Makhraj khusus"],
    explanation: "Hak huruf adalah sifat tetap seperti jahr dan syiddah; mustahak huruf muncul karena bertemu huruf lain.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },
  {
    question: "Manakah contoh lahn khafi (kesalahan samar)?",
    options: ["Mad tidak dipanjangkan sesuai ukurannya", "ح pada الْحَمْدُ dibaca ه", "أَنْعَمْتَ dibaca أَنْعَمْتِ", "Menambah satu huruf pada kata"],
    explanation: "Lahn khafi berkaitan dengan kesempurnaan bacaan, seperti ukuran mad dan ghunnah. Tiga lainnya lahn jali.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },
  {
    question: "Huruf hams (napas mengalir) terhimpun dalam…",
    options: ["فَحَثَّهُ شَخْصٌ سَكَتَ", "أَجِدْ قَطٍ بَكَتْ", "لِنْ عُمَرْ", "فِرَّ مِنْ لُبٍّ"],
    explanation: "10 huruf hams terhimpun dalam فَحَثَّهُ شَخْصٌ سَكَتَ; lawannya jahr.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },
  {
    question: "Huruf syiddah (suara tertahan) terhimpun dalam…",
    options: ["أَجِدْ قَطٍ بَكَتْ", "فَحَثَّهُ شَخْصٌ سَكَتَ", "لِنْ عُمَرْ", "يَنْمُو"],
    explanation: "8 huruf syiddah terhimpun dalam أَجِدْ قَطٍ بَكَتْ; huruf tawassuth dalam لِنْ عُمَرْ.",
    lesson: "sifat-huruf-hukum-tajwid-dan-lahn"
  },

  // Tahap 2 — Nun sukun, tanwin, mim sukun
  {
    question: "Huruf izhar halqi adalah…",
    options: ["6 huruf tenggorokan: ء ه ع ح غ خ", "4 huruf: ي ن م و", "15 huruf sisanya", "2 huruf: ل ر"],
    explanation: "Disebut halqi karena hurufnya dari tenggorokan (halq).",
    lesson: "izhar-halqi-dan-nun-mim-bertasydid"
  },
  {
    question: "Mengapa nun sukun dibaca jelas sebelum huruf tenggorokan?",
    options: [
      "Karena makhraj nun jauh dari makhraj tenggorokan",
      "Karena huruf tenggorokan selalu bertasydid",
      "Karena nun selalu dibaca jelas di mana pun",
      "Karena tanwin tidak tertulis sebagai huruf"
    ],
    explanation: "Jauhnya makhraj membuat nun tidak bisa dilebur atau disamarkan, sehingga dibaca jelas tanpa dengung.",
    lesson: "izhar-halqi-dan-nun-mim-bertasydid"
  },
  {
    question: "Nun dan mim bertasydid dibaca…",
    options: ["Didengungkan sempurna sekitar 2 harakat", "Jelas tanpa dengung", "Didengungkan 6 harakat", "Didengungkan hanya saat berhenti"],
    explanation: "Nun dan mim bertasydid wajib didengungkan sempurna, baik saat sambung maupun berhenti. Contoh: النَّاسِ، ثُمَّ.",
    lesson: "izhar-halqi-dan-nun-mim-bertasydid"
  },
  {
    question: "Apa beda tanwin dengan nun sukun?",
    options: [
      "Tanwin terbaca tetapi tidak tertulis sebagai huruf, dan hilang saat berhenti",
      "Tanwin tertulis sebagai huruf nun",
      "Tanwin hanya ada di tengah kata",
      "Tanwin tetap dibaca nun saat berhenti"
    ],
    explanation: "Tanwin adalah nun sukun tambahan di akhir isim; tandanya harakat ganda dan ia hilang saat berhenti.",
    lesson: "izhar-halqi-dan-nun-mim-bertasydid"
  },
  {
    question: "Huruf idgham terhimpun dalam kata…",
    options: ["يَرْمَلُونَ", "يَنْمُو", "قُطْبُ جَدٍّ", "سَنَقُصُّ لَكُمْ"],
    explanation: "Huruf idgham ada 6: ي ر م ل و ن. Yang berdengung (bighunnah) terhimpun dalam يَنْمُو.",
    lesson: "idgham-bighunnah-dan-bilaghunnah"
  },
  {
    question: "Idgham bilaghunnah (tanpa dengung) terjadi ketika nun sukun atau tanwin bertemu…",
    options: ["ل dan ر", "ي dan و", "م dan ن", "ب"],
    explanation: "Contoh: مِن لَّدُنْهُ، مِن رَّبِّهِمْ. Huruf ي ن م و dilebur dengan dengung.",
    lesson: "idgham-bighunnah-dan-bilaghunnah"
  },
  {
    question: "Mengapa nun pada دُنْيَا dibaca jelas padahal diikuti ي?",
    options: [
      "Nun dan ي berada dalam satu kata (izhar mutlaq)",
      "Karena ي termasuk huruf tenggorokan",
      "Karena kata itu dibaca saat berhenti",
      "Karena ada tanda mad di atasnya"
    ],
    explanation: "Idgham nun sukun hanya terjadi antara dua kata. Dalam satu kata (دُنْيَا، بُنْيَانٌ، صِنْوَانٌ، قِنْوَانٌ) nun dibaca jelas.",
    lesson: "idgham-bighunnah-dan-bilaghunnah"
  },
  {
    question: "Idgham naqish, yang dengung nunnya masih tersisa, terjadi pada huruf…",
    options: ["ي dan و", "ن dan م", "ل dan ر", "ب dan م"],
    explanation: "Pada ي و huruf sesudahnya tanpa tasydid dan dengung nun masih tersisa; pada ن م ل ر idghamnya kamil.",
    lesson: "idgham-bighunnah-dan-bilaghunnah"
  },
  {
    question: "Iqlab terjadi jika nun sukun atau tanwin bertemu huruf…",
    options: ["ب", "م", "ف", "و"],
    explanation: "Nun sukun atau tanwin diubah menjadi mim samar dengan dengung 2 harakat ketika bertemu ب.",
    lesson: "iqlab-dan-ikhfa-haqiqi"
  },
  {
    question: "Apa penanda iqlab di mushaf?",
    options: [
      "Mim kecil di atas nun, atau menggantikan harakat kedua tanwin",
      "Tasydid pada huruf sesudahnya",
      "Sukun di atas nun",
      "Tanwin yang ditulis bertumpuk sejajar"
    ],
    explanation: "Mim kecil menggantikan sukun pada nun; pada tanwin, mim kecil menggantikan harakat kedua.",
    lesson: "iqlab-dan-ikhfa-haqiqi"
  },
  {
    question: "Berapa jumlah huruf ikhfa haqiqi?",
    options: ["15", "6", "4", "14"],
    explanation: "15 huruf, yaitu sisa huruf setelah huruf izhar, idgham, dan iqlab.",
    lesson: "iqlab-dan-ikhfa-haqiqi"
  },
  {
    question: "Kapan ghunnah ikhfa dibaca tebal?",
    options: [
      "Jika huruf sesudahnya huruf tebal, seperti مِنْ قَبْلُ",
      "Selalu tebal pada setiap ikhfa",
      "Jika huruf sesudahnya huruf tipis",
      "Hanya saat berhenti"
    ],
    explanation: "Ghunnah ikhfa mengikuti huruf sesudahnya: tebal sebelum huruf tebal, tipis sebelum huruf tipis (إِنْ كُنْتُمْ).",
    lesson: "iqlab-dan-ikhfa-haqiqi"
  },
  {
    question: "Mim sukun bertemu ب hukumnya…",
    options: ["Ikhfa syafawi", "Idgham mimi", "Izhar syafawi", "Iqlab"],
    explanation: "Mim disamarkan dengan dengung, misalnya تَرْمِيهِمْ بِحِجَارَةٍ. Hanya terjadi antara dua kata.",
    lesson: "hukum-mim-sukun"
  },
  {
    question: "Mim sukun bertemu م hukumnya…",
    options: ["Idgham syafawi (idgham mimi)", "Ikhfa syafawi", "Izhar syafawi", "Idgham bilaghunnah"],
    explanation: "Dilebur dengan dengung penuh, misalnya أَطْعَمَهُم مِّن جُوعٍ.",
    lesson: "hukum-mim-sukun"
  },
  {
    question: "Mengapa mim sukun sebelum و dan ف perlu diperhatikan?",
    options: [
      "Mudah tanpa sadar didengungkan, padahal harus dibaca jelas",
      "Karena di sana mim wajib didengungkan",
      "Karena mim harus dibaca panjang",
      "Karena mim berubah menjadi nun"
    ],
    explanation: "Makhraj م sama dengan و dan dekat dengan ف, sehingga mudah didengungkan. Hukumnya izhar syafawi.",
    lesson: "hukum-mim-sukun"
  },
  {
    question: "Pada مَاءً ثَجَّاجًا, tanwin bertemu ث. Apa hukumnya?",
    options: ["Ikhfa", "Izhar", "Idgham bighunnah", "Iqlab"],
    explanation: "ث termasuk 15 huruf ikhfa, jadi tanwin disamarkan dengan dengung.",
    lesson: "review-nun-sukun-tanwin-dan-mim-sukun"
  },
  {
    question: "Pada حَبًّا وَنَبَاتًا, tanwin bertemu و. Apa hukumnya?",
    options: ["Idgham bighunnah", "Idgham bilaghunnah", "Izhar", "Ikhfa"],
    explanation: "و termasuk huruf يَنْمُو, jadi tanwin dilebur dengan dengung.",
    lesson: "review-nun-sukun-tanwin-dan-mim-sukun"
  },

  // Tahap 3 — Mad
  {
    question: "Berapa panjang mad thabi'i?",
    options: ["Tepat 2 harakat", "4–5 harakat", "6 harakat", "Boleh 2, 4, atau 6 harakat"],
    explanation: "Mad thabi'i tepat 2 harakat untuk semua qari, tidak dikurangi dan tidak ditambah.",
    lesson: "mad-thabii-iwadh-dan-badal"
  },
  {
    question: "Bagaimana عَلِيمًا dibaca saat berhenti?",
    options: ["عَلِيمَا, 2 harakat (mad 'iwadh)", "عَلِيمْ, tanpa mad", "Tetap dengan tanwin", "Dipanjangkan 6 harakat"],
    explanation: "Tanwin fathah di akhir kata saat berhenti diganti alif dan dibaca 2 harakat.",
    lesson: "mad-thabii-iwadh-dan-badal"
  },
  {
    question: "Mad 'iwadh tidak berlaku pada…",
    options: ["Ta marbuthah, seperti رَحْمَةً yang dibaca رَحْمَهْ", "Tanwin fathah di akhir ayat", "Kata أَفْوَاجًا", "Kata تَوَّابًا"],
    explanation: "Ta marbuthah bertanwin fathah dibaca ha sukun saat berhenti, bukan alif.",
    lesson: "mad-thabii-iwadh-dan-badal"
  },
  {
    question: "Manakah contoh mad badal?",
    options: ["آمَنُوا", "جَاءَ", "الضَّالِّينَ", "خَوْفٍ"],
    explanation: "Mad badal: hamzah mendahului huruf mad dalam satu kata, panjangnya 2 harakat.",
    lesson: "mad-thabii-iwadh-dan-badal"
  },
  {
    question: "Huruf mad yang diikuti hamzah dalam satu kata disebut…",
    options: ["Mad wajib muttashil", "Mad jaiz munfashil", "Mad badal", "Mad lazim"],
    explanation: "Contoh: وَجَاءَ، السَّمَاءِ. Panjangnya 4 atau 5 harakat.",
    lesson: "mad-wajib-muttashil-dan-jaiz-munfashil"
  },
  {
    question: "إِنَّا أَعْطَيْنَاكَ adalah contoh…",
    options: ["Mad jaiz munfashil", "Mad wajib muttashil", "Mad 'aridh lissukun", "Mad shilah sughra"],
    explanation: "Huruf mad di akhir kata, hamzah di awal kata berikutnya.",
    lesson: "mad-wajib-muttashil-dan-jaiz-munfashil"
  },
  {
    question: "Jika muttashil dibaca 4 harakat, munfashil dalam bacaan yang sama dibaca…",
    options: ["4 harakat juga", "2 harakat", "6 harakat", "Bebas berbeda-beda"],
    explanation: "Dalam satu bacaan, panjang muttashil dan munfashil disamakan.",
    lesson: "mad-wajib-muttashil-dan-jaiz-munfashil"
  },
  {
    question: "Berapa panjang mad 'aridh lissukun?",
    options: ["Boleh 2, 4, atau 6 harakat", "Tepat 2 harakat", "Wajib 6 harakat", "4–5 harakat"],
    explanation: "Boleh dipilih, tetapi dianjurkan sama panjang dalam satu bacaan.",
    lesson: "mad-aridh-lissukun-dan-mad-lin"
  },
  {
    question: "Jika disambung (tidak berhenti), mad 'aridh lissukun menjadi…",
    options: ["Mad thabi'i, 2 harakat", "Mad lazim, 6 harakat", "Mad lin", "Tetap 4 harakat"],
    explanation: "Sukunnya hanya muncul karena berhenti, jadi saat disambung kembali menjadi mad thabi'i.",
    lesson: "mad-aridh-lissukun-dan-mad-lin"
  },
  {
    question: "Huruf lin adalah…",
    options: ["Wawu dan ya sukun yang didahului fathah", "Alif setelah fathah", "Wawu sukun setelah dhammah", "Ya sukun setelah kasrah"],
    explanation: "Contoh: خَوْفٍ، يَوْمِ، الْبَيْتِ. Saat berhenti menjadi mad lin.",
    lesson: "mad-aridh-lissukun-dan-mad-lin"
  },
  {
    question: "Berapa panjang mad lazim?",
    options: ["6 harakat", "4–5 harakat", "2 harakat", "Boleh 2, 4, atau 6 harakat"],
    explanation: "6 harakat untuk semua jenis mad lazim dan semua qari.",
    lesson: "mad-lazim"
  },
  {
    question: "آلْآنَ (Yunus 51 dan 91) adalah satu-satunya contoh…",
    options: ["Mad lazim kalimi mukhaffaf", "Mad lazim harfi mutsaqqal", "Mad wajib muttashil", "Mad badal"],
    explanation: "Setelah huruf mad ada sukun asli tanpa tasydid, dan hanya ada di dua tempat itu.",
    lesson: "mad-lazim"
  },
  {
    question: "Huruf mad lazim harfi (6 harakat) terhimpun dalam…",
    options: ["سَنَقُصُّ لَكُمْ", "حَيٌّ طَهُرَ", "يَرْمَلُونَ", "خُصَّ ضَغْطٍ قِظْ"],
    explanation: "Huruf pembuka surat yang ejaannya 3 huruf dengan huruf tengah berupa huruf mad. حَيٌّ طَهُرَ dibaca 2 harakat.",
    lesson: "mad-lazim"
  },
  {
    question: "Huruf ط pada طه dibaca…",
    options: ["2 harakat, karena ejaannya hanya 2 huruf", "6 harakat", "4 harakat", "Tidak dipanjangkan sama sekali"],
    explanation: "Huruf pembuka ح ي ط ه ر (حَيٌّ طَهُرَ) ejaannya 2 huruf, jadi dibaca 2 harakat.",
    lesson: "mad-lazim"
  },
  {
    question: "Shilah kubra terjadi bila setelah ha' dhamir ada…",
    options: ["Hamzah", "Huruf sukun", "Huruf tebal", "Akhir ayat"],
    explanation: "Contoh: مَالَهُۥٓ أَخْلَدَهُۥ. Panjangnya 4–5 harakat, sama dengan munfashil.",
    lesson: "mad-shilah-dan-ujian-tahap-3"
  },
  {
    question: "Mengapa ha' pada عَلَيْهِ أَحَدٌ tidak dipanjangkan?",
    options: [
      "Sebelum ha' ada huruf sukun (ya sukun)",
      "Karena setelahnya ada hamzah",
      "Karena dibaca saat berhenti",
      "Karena ha' itu bukan ha' dhamir"
    ],
    explanation: "Mad shilah hanya terjadi jika ha' dhamir berada di antara dua huruf berharakat.",
    lesson: "mad-shilah-dan-ujian-tahap-3"
  },
  {
    question: "Manakah pengecualian riwayat Hafs yang tetap dipanjangkan meski sebelum ha' ada sukun?",
    options: ["فِيهِۦ مُهَانًا (Al-Furqan 69)", "عَلَيْهِ (Al-Balad 5)", "مِنْهُ", "رَبَّهُۥ (Al-Insyiqaq 15)"],
    explanation: "Dalam riwayat Hafs, فِيهِۦ مُهَانًا tetap dibaca panjang.",
    lesson: "mad-shilah-dan-ujian-tahap-3"
  },

  // Tahap 4 — Tebal-tipis, qalqalah, ra & lam
  {
    question: "Huruf qalqalah terhimpun dalam…",
    options: ["قُطْبُ جَدٍّ", "خُصَّ ضَغْطٍ قِظْ", "أَجِدْ قَطٍ بَكَتْ", "يَنْمُو"],
    explanation: "Lima huruf ق ط ب ج د bersifat syiddah dan jahr, sehingga butuh pantulan saat sukun.",
    lesson: "qalqalah"
  },
  {
    question: "Pantulan qalqalah paling kuat terjadi pada…",
    options: [
      "Huruf qalqalah bertasydid di akhir kata saat berhenti, seperti وَتَبّْ",
      "Huruf qalqalah sukun di tengah kata",
      "Huruf qalqalah berharakat fathah",
      "Huruf qalqalah saat disambung"
    ],
    explanation: "Urutannya: sughra (sukun asli), kubra (sukun karena berhenti), lalu bertasydid saat berhenti yang paling kuat.",
    lesson: "qalqalah"
  },
  {
    question: "Kesalahan apa yang harus dihindari saat qalqalah?",
    options: [
      "Memberi vokal pada pantulan, misalnya أَحَدْ menjadi \"ahadu\"",
      "Memantulkan huruf qalqalah saat berhenti",
      "Membaca huruf qalqalah dengan jelas",
      "Membaca qalqalah sughra di tengah kata"
    ],
    explanation: "Pantulan tidak boleh diberi vokal, tetapi huruf qalqalah juga jangan dibaca mati tanpa pantulan.",
    lesson: "qalqalah"
  },
  {
    question: "Huruf isti'la (selalu tebal) terhimpun dalam…",
    options: ["خُصَّ ضَغْطٍ قِظْ", "قُطْبُ جَدٍّ", "فِرَّ مِنْ لُبٍّ", "لِنْ عُمَرْ"],
    explanation: "Tujuh huruf isti'la selalu tebal tanpa kecuali, baik berharakat maupun sukun.",
    lesson: "huruf-tebal-dan-alif"
  },
  {
    question: "Huruf ithbaq, yang paling tebal, adalah…",
    options: ["ص ض ط ظ", "ق غ خ", "ر ل ا", "ب ج د"],
    explanation: "Pada ithbaq, sebagian lidah menempel ke langit-langit sehingga suara terkurung.",
    lesson: "huruf-tebal-dan-alif"
  },
  {
    question: "Alif dibaca tebal atau tipis tergantung pada…",
    options: ["Huruf sebelumnya", "Huruf sesudahnya", "Panjang madnya", "Letaknya di akhir ayat"],
    explanation: "Alif tebal setelah huruf tebal (قَالُوا) dan tipis setelah huruf tipis (النَّاسِ).",
    lesson: "huruf-tebal-dan-alif"
  },
  {
    question: "Ra berharakat fathah, seperti pada رَمَضَانَ, dibaca…",
    options: ["Tebal", "Tipis", "Boleh tebal atau tipis", "Tebal hanya saat berhenti"],
    explanation: "Ra berharakat fathah atau dhammah selalu tebal; ra berharakat kasrah tipis.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Mengapa ra pada فِرْعَوْنَ dibaca tipis?",
    options: [
      "Ra sukun setelah kasrah asli, tanpa huruf isti'la sesudahnya",
      "Karena ra berharakat kasrah",
      "Karena ra terletak setelah ya sukun",
      "Karena ra terletak setelah hamzah washal"
    ],
    explanation: "Ra sukun setelah kasrah asli tipis, kecuali diikuti huruf isti'la dalam satu kata seperti قِرْطَاسٍ.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Mengapa ra pada ارْجِعِي dibaca tebal?",
    options: [
      "Kasrah sebelumnya tidak asli, karena berasal dari hamzah washal",
      "Karena ra berharakat fathah",
      "Karena diikuti huruf isti'la",
      "Karena ra terletak setelah dhammah"
    ],
    explanation: "Ra sukun setelah kasrah yang tidak asli (hamzah washal) dibaca tebal, seperti ارْجِعُوا dan أَمِ ارْتَابُوا.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Sifat takrir pada ra berarti…",
    options: [
      "Ujung lidah cenderung bergetar, dan getaran itu harus ditahan",
      "Ra harus dibaca bergetar berkali-kali",
      "Suara ra berbelok karena terhalang lidah",
      "Ra selalu dibaca tebal"
    ],
    explanation: "Yang diajarkan adalah menahan getaran, bukan membuatnya. Suara berbelok adalah sifat inhiraf.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Bagaimana lam syamsiyah dibaca?",
    options: ["Dilebur ke huruf sesudahnya (idgham)", "Dibaca jelas (izhar)", "Dipantulkan", "Didengungkan"],
    explanation: "Tanda mushafnya: lam tanpa sukun, huruf sesudahnya bertasydid. Contoh: الشَّكُورُ.",
    lesson: "lam-tarif-dan-lafzh-jalalah"
  },
  {
    question: "Huruf lam qamariyah terhimpun dalam…",
    options: ["ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ", "طِبْ ثُمَّ صِلْ رَحِمًا", "قُطْبُ جَدٍّ", "سَنَقُصُّ لَكُمْ"],
    explanation: "14 huruf qamariyah, lamnya dibaca jelas dan diberi sukun di mushaf.",
    lesson: "lam-tarif-dan-lafzh-jalalah"
  },
  {
    question: "Lam lafzh Allah pada بِسْمِ اللَّهِ dibaca…",
    options: ["Tipis, karena setelah kasrah", "Tebal, karena di awal bacaan", "Tebal, karena setelah sukun", "Boleh tebal atau tipis"],
    explanation: "Lam lafzh Allah tipis setelah kasrah, setelah sukun yang didahului kasrah, dan setelah tanwin.",
    lesson: "lam-tarif-dan-lafzh-jalalah"
  },
  {
    question: "Lam lafzh Allah pada عَبْدُ اللَّهِ dibaca…",
    options: ["Tebal, karena setelah dhammah", "Tipis, karena setelah dhammah", "Tipis, karena setelah sukun", "Boleh tebal atau tipis"],
    explanation: "Lam lafzh Allah tebal di awal bacaan, setelah fathah, dan setelah dhammah.",
    lesson: "lam-tarif-dan-lafzh-jalalah"
  },
  {
    question: "قَدْ تَبَيَّنَ (د bertemu ت) termasuk idgham…",
    options: ["Mutajanisain", "Mutamatsilain", "Mutaqaribain", "Bighunnah"],
    explanation: "Mutajanisain: makhraj sama, sifat berbeda.",
    lesson: "idgham-dua-huruf-dan-ujian-tahap-4"
  },
  {
    question: "رَبِحَتْ تِجَارَتُهُمْ (ت bertemu ت) termasuk idgham…",
    options: ["Mutamatsilain", "Mutajanisain", "Mutaqaribain", "Bilaghunnah"],
    explanation: "Mutamatsilain: dua huruf yang sama.",
    lesson: "idgham-dua-huruf-dan-ujian-tahap-4"
  },

  // Tahap 5 — Waqaf, ibtida, isti'adzah, gharib & ujian
  {
    question: "Berhenti karena kehabisan napas atau batuk disebut waqaf…",
    options: ["Idhthirari", "Ikhtibari", "Intizhari", "Ikhtiyari"],
    explanation: "Waqaf idhthirari (darurat) boleh di kata mana saja, lalu bacaan diulang dari tempat yang tepat.",
    lesson: "jenis-jenis-waqaf"
  },
  {
    question: "Waqaf yang maknanya sempurna dan tidak berkaitan dengan sesudahnya, baik lafaz maupun makna, disebut…",
    options: ["Tam", "Kafi", "Hasan", "Qabih"],
    explanation: "Waqaf tam biasanya di akhir ayat atau akhir kisah; dianjurkan berhenti dan memulai dari sesudahnya.",
    lesson: "jenis-jenis-waqaf"
  },
  {
    question: "Berhenti pada لَا تَقْرَبُوا الصَّلَاةَ termasuk waqaf…",
    options: ["Qabih, karena maknanya berubah", "Tam", "Kafi", "Hasan"],
    explanation: "Waqaf qabih membuat makna belum selesai, kurang, atau rusak, sehingga tidak boleh disengaja.",
    lesson: "jenis-jenis-waqaf"
  },
  {
    question: "Jika terpaksa berhenti di tempat waqaf qabih, apa yang sebaiknya dilakukan?",
    options: ["Mengulang dari kata sebelumnya", "Melanjutkan dari kata sesudahnya", "Mengulang dari awal surat", "Langsung pindah ke ayat berikutnya"],
    explanation: "Ulangi dari kata sebelumnya agar maknanya kembali utuh.",
    lesson: "jenis-jenis-waqaf"
  },
  {
    question: "Tanda مـ di mushaf berarti…",
    options: ["Wajib berhenti (lazim)", "Jangan berhenti", "Boleh berhenti atau sambung", "Sambung lebih utama"],
    explanation: "Menyambung pada tanda مـ bisa mengubah makna.",
    lesson: "tanda-waqaf-dan-ibtida"
  },
  {
    question: "Tanda قلى di mushaf berarti…",
    options: ["Boleh sambung, tetapi berhenti lebih utama", "Boleh berhenti, tetapi sambung lebih utama", "Wajib berhenti", "Jangan berhenti"],
    explanation: "قلى: berhenti lebih utama. Kebalikannya صلى: sambung lebih utama.",
    lesson: "tanda-waqaf-dan-ibtida"
  },
  {
    question: "Apa maksud tanda ∴ (mu'anaqah) pada لَا رَيْبَ ۛ فِيهِ ۛ?",
    options: [
      "Berhenti di salah satunya saja, atau tidak berhenti sama sekali",
      "Wajib berhenti di keduanya",
      "Sama sekali tidak boleh berhenti di sana",
      "Berhenti di keduanya lebih utama"
    ],
    explanation: "Dua tanda mu'anaqah saling terkait: jika berhenti di salah satunya, jangan berhenti di yang lain.",
    lesson: "tanda-waqaf-dan-ibtida"
  },
  {
    question: "Setelah berhenti pada مِن, bagaimana memulai lagi dari مَالٍ pada مِن مَّالٍ?",
    options: [
      "Tasydid dilepas dan dibaca مَالٍ tanpa ghunnah tambahan",
      "Tetap dengan tasydid dan dengung",
      "Diawali dengan hamzah washal",
      "Dipanjangkan 2 harakat"
    ],
    explanation: "Idgham hanya terjadi saat disambung, jadi saat memulai dari kata itu tasydidnya dilepas.",
    lesson: "tanda-waqaf-dan-ibtida"
  },
  {
    question: "Apa hukum isti'adzah sebelum membaca Al-Qur'an menurut mayoritas ulama?",
    options: ["Mustahab (dianjurkan)", "Wajib", "Makruh", "Fardhu kifayah"],
    explanation: "Mustahab menurut mayoritas ulama qira'at dan fiqih, baik memulai dari awal maupun tengah surat.",
    lesson: "istiadzah-dan-basmalah"
  },
  {
    question: "Ada berapa cara yang boleh untuk membaca isti'adzah, basmalah, dan awal surat?",
    options: ["4 cara", "3 cara", "2 cara", "1 cara"],
    explanation: "Putus semua, isti'adzah sambung basmalah, basmalah sambung surat, atau sambung semua.",
    lesson: "istiadzah-dan-basmalah"
  },
  {
    question: "Cara mana yang tidak boleh saat membaca basmalah di antara dua surat?",
    options: [
      "Akhir surat disambung basmalah, lalu berhenti sebelum awal surat berikutnya",
      "Memutus semuanya",
      "Menyambung semuanya",
      "Berhenti di akhir surat, lalu basmalah disambung dengan awal surat"
    ],
    explanation: "Cara itu membuat pendengar mengira basmalah adalah ayat terakhir surat sebelumnya.",
    lesson: "istiadzah-dan-basmalah"
  },
  {
    question: "Surat apa yang tidak diawali basmalah?",
    options: ["At-Taubah", "Al-Fatihah", "Al-Ikhlas", "An-Nas"],
    explanation: "Basmalah wajib dibaca di awal setiap surat, kecuali At-Taubah.",
    lesson: "istiadzah-dan-basmalah"
  },
  {
    question: "Dalam riwayat Hafs, imalah hanya terdapat pada…",
    options: ["مَجْر۪اهَا (Hud 41)", "لَا تَأْمَ۫نَّا (Yusuf 11)", "ءَا۬عْجَمِيٌّ (Fussilat 44)", "بَلْ ۜ رَانَ (Al-Muthaffifin 14)"],
    explanation: "Imalah: fathah dimiringkan ke kasrah. Tiga lainnya adalah isymam, tashil, dan saktah.",
    lesson: "bacaan-gharib-riwayat-hafs"
  },
  {
    question: "Apa yang dimaksud saktah?",
    options: ["Berhenti sejenak tanpa mengambil napas", "Berhenti sambil mengambil napas", "Memiringkan fathah ke kasrah", "Membaca hamzah kedua dengan ringan"],
    explanation: "Saktah ada di 4 tempat: Al-Kahf 1, Yasin 52, Al-Qiyamah 27, dan Al-Muthaffifin 14.",
    lesson: "bacaan-gharib-riwayat-hafs"
  },
  {
    question: "Pada بَلْ ۜ رَانَ, mengapa lam tidak dilebur ke ra?",
    options: ["Karena ada saktah di antara keduanya", "Karena lamnya lam qamariyah", "Karena ra dibaca tipis", "Karena berhenti di akhir ayat"],
    explanation: "Saktah memisahkan lam dari ra, sehingga idgham tidak terjadi.",
    lesson: "bacaan-gharib-riwayat-hafs"
  },
  {
    question: "Isymam pada لَا تَأْمَ۫نَّا dilakukan dengan cara…",
    options: ["Memonyongkan bibir saat dengung", "Memiringkan fathah ke kasrah", "Membaca hamzah dengan ringan", "Berhenti tanpa mengambil napas"],
    explanation: "Isymam: bibir dimonyongkan saat dengung pada لَا تَأْمَ۫نَّا (Yusuf 11).",
    lesson: "bacaan-gharib-riwayat-hafs"
  },
  {
    question: "Apa kriteria lulus ujian akhir kelas Lanjutan?",
    options: [
      "Tanpa kesalahan jali, paling banyak 3 kesalahan khafi per halaman",
      "Paling banyak 3 kesalahan jali per halaman",
      "Tanpa kesalahan khafi sama sekali",
      "Cukup menyelesaikan satu halaman"
    ],
    explanation: "Selain itu, murid harus mampu menjelaskan hukum dari bacaannya sendiri.",
    lesson: "ujian-akhir"
  }
];
