import type { QuizQuestion } from "../quiz";

// Disusun dari materi Al-Muqaddimah Al-Jazariyah (scripts/data/jazariyah.mjs). Opsi pertama selalu jawaban yang benar.
export const jazariyahQuiz: QuizQuestion[] = [
  {
    question: "Siapa penyusun nazham Al-Muqaddimah Al-Jazariyah?",
    options: ["Imam Ibnul Jazari", "Imam Asy-Syathibi", "Imam Hafsh", "Imam An-Nawawi"],
    explanation: "Penyusunnya Imam Syamsuddin Muhammad bin Muhammad Al-Jazari Ad-Dimasyqi (751–833 H).",
    lesson: "jazariyah-muqaddimah"
  },
  {
    question: "Dalam bait pembuka, penulis menyebut dirinya pengikut mazhab…",
    options: ["Syafi'i", "Hanafi", "Maliki", "Hanbali"],
    explanation: "مُحَمَّدُ بْنُ الْجَزَرِيِّ الشَّافِعِي: penulis bermazhab Syafi'i.",
    lesson: "jazariyah-muqaddimah"
  },
  {
    question: "Memulai bacaan dari kata اُنْظُرْ, hamzah washalnya dibaca…",
    options: ["Dhammah", "Kasrah", "Fathah", "Sukun"],
    explanation: "Pada fi'il, jika huruf ketiganya berharakat dhammah asli, hamzah washal dibaca dhammah.",
    lesson: "jazariyah-hamzah-washal"
  },
  {
    question: "Menurut muqaddimah, apa yang wajib dipelajari sebelum mulai membaca Al-Qur'an?",
    options: ["Makharijul huruf dan sifat huruf", "Ilmu nahwu dan sharaf", "Qira'at sepuluh", "Tafsir ayat"],
    explanation: "مَخَارِجَ الْحُرُوفِ وَالصِّفَاتِ: agar dapat melafalkan Al-Qur'an dengan bahasa paling fasih.",
    lesson: "jazariyah-muqaddimah"
  },
  {
    question: "Istilah mawaqif dalam muqaddimah berarti…",
    options: [
      "Tempat-tempat berhenti dan memulai bacaan",
      "Cara penulisan kata dalam mushaf",
      "Sifat-sifat huruf",
      "Panjang-pendek mad"
    ],
    explanation: "Mawaqif adalah tempat waqaf dan ibtida'. Penulisan mushaf disebut rasm 'Utsmani.",
    lesson: "jazariyah-muqaddimah"
  },
  {
    question: "Berapa jumlah makhraj huruf menurut pendapat yang dipilih Imam Ibnul Jazari?",
    options: ["17", "5", "14", "29"],
    explanation: "مَخَارِجُ الْحُرُوفِ سَبْعَةَ عَشَرْ: 17 makhraj untuk 29 huruf hijaiyyah.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Alif dan dua \"saudarinya\" (huruf mad) keluar dari…",
    options: ["Al-jauf", "Pangkal tenggorokan", "Pangkal lidah", "Al-khaisyum"],
    explanation: "فَأَلِفُ الْجَوْفِ وَأُخْتَاهَا: huruf mad keluar dari al-jauf dan berakhir bersama habisnya udara.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Huruf apa yang keluar dari ujung tenggorokan, bagian yang paling dekat ke mulut?",
    options: ["Ghain (غ) dan kha (خ)", "Hamzah (ء) dan ha (هـ)", "'Ain (ع) dan ha (ح)", "Qaf (ق) dan kaf (ك)"],
    explanation: "أَدْنَاهُ غَيْنٌ خَاؤُهَا: bagian terdekat ke mulut untuk ghain dan kha.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Menurut bait \"أَبْيَاتُهَا قَافٌ وَزَايٌ\", berapa jumlah bait nazham ini?",
    options: ["107", "17", "29", "77"],
    explanation: "Dalam hitungan abjad qaf bernilai 100 dan zay 7, sehingga totalnya 107 bait.",
    lesson: "jazariyah-khatimah"
  },
  {
    question: "Huruf apa saja yang keluar dari tengah lidah?",
    options: ["Jim, syin, dan ya bukan mad", "Qaf dan kaf", "Tha, dal, dan ta", "Zha, dzal, dan tsa"],
    explanation: "وَالْوَسْطُ فَجِيمُ الشِّينُ يَا: jim, syin, dan ya yang bukan huruf mad.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Huruf tha (ط), dal (د), dan ta (ت) keluar dari…",
    options: [
      "Ujung lidah bertemu pangkal gigi seri atas",
      "Ujung lidah bertemu ujung gigi seri atas",
      "Sisi lidah dan gigi geraham",
      "Tengah lidah dan langit-langit"
    ],
    explanation: "Tha, dal, dan ta dari ujung lidah dengan pangkal gigi seri atas; zha, dzal, tsa dari ujung gigi seri atas.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Bagaimana cara praktis menemukan makhraj sebuah huruf?",
    options: [
      "Mensukunkan huruf itu dan mendahuluinya dengan hamzah berharakat, seperti أَبْ",
      "Membacanya dengan tasydid",
      "Memanjangkannya dua harakat",
      "Mewaqafkannya dengan raum"
    ],
    explanation: "Titik tempat suara terhenti saat mengucapkan أَبْ، أَتْ، أَقْ itulah makhrajnya.",
    lesson: "jazariyah-makharijul-huruf"
  },
  {
    question: "Lima sifat yang disebut pertama dalam bait صِفَاتُهَا جَهْرٌ وَرِخْوٌ… adalah…",
    options: [
      "Jahr, rakhawah, istifal, infitah, ishmat",
      "Hams, syiddah, isti'la, ithbaq, idzlaq",
      "Shafir, qalqalah, lin, inhiraf, takrir",
      "Tafkhim, tarqiq, ghunnah, mad, qashr"
    ],
    explanation: "Bait itu menyebut jahr, rakhawah, istifal, infitah, dan ishmat; lawannya disebut kemudian.",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Huruf-huruf syiddah terkumpul dalam…",
    options: ["أَجِدْ قَطٍ بَكَتْ", "فَحَثَّهُ شَخْصٌ سَكَتْ", "لِنْ عُمَرْ", "قُطْبُ جَدٍ"],
    explanation: "شَدِيدُهَا لَفْظُ أَجِدْ قَطٍ بَكَتْ.",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Berapa jumlah huruf isti'la?",
    options: ["7", "4", "5", "10"],
    explanation: "وَسَبْعُ عُلْوٍ خُصَّ ضَغْطٍ قِظْ: tujuh huruf isti'la.",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Sifat lin dimiliki oleh…",
    options: [
      "Wawu dan ya sukun yang didahului fathah",
      "Alif setelah fathah",
      "Wawu sukun setelah dhammah",
      "Ya berharakat kasrah"
    ],
    explanation: "وَاوٌ وَيَاءٌ سُكِّنَا وَانْفَتَحَا قَبْلَهُمَا, seperti خَوْفٌ dan بَيْتٌ.",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Sifat inhiraf ada pada huruf…",
    options: ["Lam dan ra", "Syin", "Dhad", "Shad, zay, dan sin"],
    explanation: "فِي اللَّامِ وَالرَّا: inhiraf ada pada lam dan ra.",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Jika huruf ta kehilangan sifat syiddah, bunyinya akan terdengar seperti…",
    options: ["\"ts\"", "\"k\"", "\"d\"", "\"th\" tebal"],
    explanation: "Ta yang tidak tertahan suaranya akan berdesis seperti \"ts\".",
    lesson: "jazariyah-shifatul-huruf"
  },
  {
    question: "Bagaimana hukum mengamalkan tajwid menurut bait وَالْأَخْذُ بِالتَّجْوِيدِ حَتْمٌ لَازِمُ?",
    options: [
      "Wajib; yang mampu belajar tetapi sengaja meninggalkannya berdosa",
      "Sunnah, berpahala jika dilakukan",
      "Mubah",
      "Wajib hanya bagi imam shalat"
    ],
    explanation: "مَنْ لَمْ يُجَوِّدِ الْقُرَانَ آثِمُ: siapa yang tidak membaca dengan tajwid berdosa.",
    lesson: "jazariyah-tajwidul-quran"
  },
  {
    question: "Apa alasan tajwid wajib diamalkan menurut nazham?",
    options: [
      "Allah menurunkan Al-Qur'an dengan tajwid, dan begitulah ia sampai kepada kita",
      "Agar suara pembaca terdengar merdu",
      "Karena kebiasaan orang Arab",
      "Agar bacaan lebih cepat selesai"
    ],
    explanation: "لِأَنَّهُ بِهِ الْإِلَهُ أَنْزَلَا وَهَكَذَا مِنْهُ إِلَيْنَا وَصَلَا.",
    lesson: "jazariyah-tajwidul-quran"
  },
  {
    question: "Apa maksud \"wal-lafzhu fi nazhirihi kamitslihi\"?",
    options: [
      "Lafazh yang serupa dibaca dengan cara yang sama secara konsisten",
      "Setiap ayat dibaca dua kali",
      "Bacaan harus pelan",
      "Suara harus diperindah"
    ],
    explanation: "Misalnya, jika mad wajib dibaca lima harakat di satu tempat, di tempat lain juga lima harakat.",
    lesson: "jazariyah-tajwidul-quran"
  },
  {
    question: "Menurut Imam Ibnul Jazari, apa yang membedakan orang yang bertajwid dengan yang tidak?",
    options: [
      "Latihan lisan (riyadhah) yang terus-menerus",
      "Kecerdasan",
      "Suara yang bagus",
      "Usia ketika mulai belajar"
    ],
    explanation: "وَلَيْسَ بَيْنَهُ وَبَيْنَ تَرْكِهِ إِلَّا رِيَاضَةُ امْرِئٍ بِفَكِّهِ.",
    lesson: "jazariyah-tajwidul-quran"
  },
  {
    question: "Manakah contoh bacaan yang dibuat-buat (takalluf)?",
    options: [
      "Menekan hamzah sampai seperti orang tersedak",
      "Mengucapkan huruf dari makhrajnya",
      "Membaca mad thabi'i dua harakat",
      "Menahan ghunnah pada nun bertasydid"
    ],
    explanation: "Bacaan harus sempurna tanpa berlebihan; menekan hamzah seperti tersedak termasuk takalluf.",
    lesson: "jazariyah-tajwidul-quran"
  },
  {
    question: "Bagaimana mim pada مَخْمَصَةٍ dan مَرَضٌ dibaca?",
    options: ["Tipis", "Tebal karena diikuti huruf tebal", "Dengan qalqalah", "Disamarkan (ikhfa)"],
    explanation: "Mim tetap tipis walaupun diikuti kha atau ra yang tebal.",
    lesson: "jazariyah-tanbihat"
  },
  {
    question: "Kapan pantulan qalqalah terdengar paling jelas?",
    options: [
      "Ketika sukunnya karena waqaf",
      "Ketika hurufnya berharakat fathah",
      "Ketika hurufnya bertasydid di tengah kata",
      "Ketika didahului huruf mad"
    ],
    explanation: "وَإِنْ يَكُنْ فِي الْوَقْفِ كَانَ أَبْيَنَا: qalqalah karena waqaf lebih jelas.",
    lesson: "jazariyah-tanbihat"
  },
  {
    question: "Jika sin pada مُسْتَقِيمٍ ditebalkan, ia akan terdengar seperti huruf…",
    options: ["Shad (ص)", "Syin (ش)", "Tsa (ث)", "Zay (ز)"],
    explanation: "Sin tetap tipis walaupun berdekatan dengan huruf isti'la; jika ditebalkan terdengar seperti shad.",
    lesson: "jazariyah-tanbihat"
  },
  {
    question: "Pada kata manakah ra dibaca tipis?",
    options: ["رِجَالٌ", "قِرْطَاسٍ", "ارْجِعُوا", "الْقُرْآنُ"],
    explanation: "وَرَقِّقِ الرَّاءَ إِذَا مَا كُسِرَتْ: ra berkasrah dibaca tipis.",
    lesson: "jazariyah-hukum-ra"
  },
  {
    question: "Bagaimana ra pada kata فِرْقٍ (Asy-Syu'ara: 63) ketika washal?",
    options: ["Boleh tebal maupun tipis", "Wajib tipis", "Wajib tebal", "Dibaca dengan ghunnah"],
    explanation: "وَالْخُلْفُ فِي فِرْقٍ: qaf sesudahnya berkasrah sehingga ketebalannya melemah.",
    lesson: "jazariyah-hukum-ra"
  },
  {
    question: "Bagaimana membaca ra yang bertasydid, seperti pada الرَّحْمَنِ?",
    options: [
      "Getarannya disembunyikan, lidah cukup bergetar sekali",
      "Getarannya diperbanyak seperti \"rrr\"",
      "Dibaca disamarkan",
      "Dibaca dengan ghunnah"
    ],
    explanation: "وَأَخْفِ تَكْرِيرًا إِذَا تُشَدَّدُ: sifat takrir harus disembunyikan.",
    lesson: "jazariyah-hukum-ra"
  },
  {
    question: "Lam pada lafazh Allah dibaca tebal jika huruf sebelumnya berharakat…",
    options: ["Fathah atau dhammah", "Kasrah", "Kasrah atau sukun", "Tanwin kasrah"],
    explanation: "وَفَخِّمِ اللَّامَ مِنِ اسْمِ اللَّهِ عَنْ فَتْحٍ اوْ ضَمٍّ, seperti عَبْدُ اللَّهِ.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Di antara huruf isti'la, manakah yang paling tebal?",
    options: ["Huruf ithbaq: ص ض ط ظ", "Qaf (ق)", "Ghain (غ) dan kha (خ)", "Semuanya sama tebal"],
    explanation: "وَاخْصُصَا الِاطْبَاقَ أَقْوَى: qaf pada قَالَ tidak setebal shad pada الْعَصَا.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Bagaimana membaca tha pada أَحَطتُ?",
    options: [
      "Dilebur ke ta, tetapi sifat ithbaq-nya tetap terdengar",
      "Berubah sepenuhnya menjadi ta",
      "Dibaca jelas tanpa idgham",
      "Ta sesudahnya ikut ditebalkan"
    ],
    explanation: "Ini idgham naqish: tha tidak boleh berubah sepenuhnya menjadi ta.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Pada نَخْلُقكُّمْ (Al-Mursalat: 20), cara baca yang lebih masyhur adalah…",
    options: ["Idgham kamil", "Idgham naqish", "Izhhar", "Ikhfa"],
    explanation: "Ada dua cara, tetapi yang lebih masyhur adalah qaf dilebur sempurna ke kaf.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Jika dzal pada مَحْذُورًا ditebalkan, kata itu akan terdengar seperti…",
    options: ["مَحْظُورًا", "مَحْضُورًا", "مَحْزُورًا", "مَحْدُورًا"],
    explanation: "Sifat infitah pada dzal harus dijaga agar tidak tertukar dengan مَحْظُورًا dan maknanya berubah.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Isymam ketika waqaf hanya boleh pada huruf yang berharakat…",
    options: ["Dhammah", "Kasrah", "Fathah", "Fathah atau kasrah"],
    explanation: "Isymam adalah isyarat bibir seperti dhammah tanpa suara, khusus untuk dhammah atau rafa'.",
    lesson: "jazariyah-waqaf-akhir-kata"
  },
  {
    question: "Mengapa فِي يَوْمٍ dan قَالُوا وَهُمْ tidak dibaca idgham?",
    options: [
      "Huruf pertamanya adalah huruf mad",
      "Huruf keduanya berharakat",
      "Keduanya berada di akhir ayat",
      "Makhraj kedua hurufnya berjauhan"
    ],
    explanation: "Dua huruf sama yang bertemu tetap dibaca jelas jika huruf pertamanya huruf mad.",
    lesson: "jazariyah-lam-dan-hukum-lainnya"
  },
  {
    question: "Dhad dibedakan dari zha melalui…",
    options: ["Makhraj dan sifat istithalah", "Panjang mad", "Sifat qalqalah", "Ghunnah"],
    explanation: "وَالضَّادَ بِاسْتِطَالَةٍ وَمَخْرَجِ مَيِّزْ مِنَ الظَّاءِ.",
    lesson: "jazariyah-dhad-dan-zha"
  },
  {
    question: "Kata عِضِينَ (Al-Hijr: 91) ditulis dengan huruf…",
    options: ["Dhad", "Zha", "Dal", "Zay"],
    explanation: "عِضِينَ dikecualikan dari kata الوَعْظ, karena ditulis dengan dhad.",
    lesson: "jazariyah-dhad-dan-zha"
  },
  {
    question: "Pada وُجُوهٌ يَوْمَئِذٍ نَاضِرَةٌ (Al-Qiyamah: 22), kata نَاضِرَةٌ ditulis dengan…",
    options: ["Dhad", "Zha", "Dal", "Shad"],
    explanation: "Kata pertama (berseri) dengan dhad; kata kedua إِلَى رَبِّهَا نَاظِرَةٌ (melihat) dengan zha.",
    lesson: "jazariyah-dhad-dan-zha"
  },
  {
    question: "Kata \"mendorong\" pada ayat tentang memberi makan orang miskin (Al-Ma'un: 3) ditulis dengan…",
    options: ["Dhad (الحَضّ)", "Zha (الحَظّ)", "Shad", "Dal"],
    explanation: "وَالْحَظُّ لَا الْحَضُّ عَلَى الطَّعَامِ: الحَظّ (bagian) dengan zha, الحَضّ (mendorong) dengan dhad.",
    lesson: "jazariyah-dhad-dan-zha"
  },
  {
    question: "Bagaimana membaca dhad dan zha yang bertemu, seperti أَنْقَضَ ظَهْرَكَ?",
    options: ["Keduanya wajib dibaca jelas", "Dhad dilebur ke zha", "Dibaca ikhfa", "Salah satunya boleh dihilangkan"],
    explanation: "وَإِنْ تَلَاقَيَا الْبَيَانُ لَازِمُ: ketika keduanya bertemu, wajib dijelaskan.",
    lesson: "jazariyah-dhad-dan-zha"
  },
  {
    question: "Manakah contoh nun sukun yang dibaca jelas (izhhar muthlaq) walaupun bertemu huruf يُومِنُ?",
    options: ["الدُّنْيَا", "مَنْ يَقُولُ", "مِنْ وَالٍ", "مِنْ مَالٍ"],
    explanation: "إِلَّا بِكِلْمَةٍ كَدُنْيَا: dalam satu kata nun dibaca jelas, seperti الدُّنْيَا، صِنْوَانٌ، قِنْوَانٌ، بُنْيَانٌ.",
    lesson: "jazariyah-mim-dan-nun"
  },
  {
    question: "Raum ketika waqaf tidak boleh dilakukan pada huruf yang berharakat…",
    options: ["Fathah", "Dhammah", "Kasrah", "Tanwin dhammah"],
    explanation: "إِلَّا بِفَتْحٍ أَوْ بِنَصْبٍ: fathah terlalu ringan untuk dibagi, jadi hanya sukun murni.",
    lesson: "jazariyah-waqaf-akhir-kata"
  },
  {
    question: "Berapa panjang mad lazim menurut Al-Jazariyah?",
    options: ["Enam harakat (thul)", "Dua harakat", "Empat atau lima harakat", "Dua, empat, atau enam harakat"],
    explanation: "وَبِالطُّولِ يُمَدّْ: mad lazim dibaca panjang, enam harakat.",
    lesson: "jazariyah-mad-dan-qashr"
  },
  {
    question: "Mad 'aridh lissukun termasuk hukum mad…",
    options: ["Jaiz", "Lazim", "Wajib", "Thabi'i"],
    explanation: "أَوْ عَرَضَ السُّكُونُ وَقْفًا: mad jaiz mencakup mad munfashil dan mad 'aridh lissukun.",
    lesson: "jazariyah-mad-dan-qashr"
  },
  {
    question: "Kesempurnaan bacaan terletak pada dua hal, yaitu…",
    options: [
      "Membaguskan huruf dan mengetahui tempat waqaf",
      "Suara yang indah dan langgam",
      "Kecepatan dan kelancaran",
      "Banyaknya hafalan dan qira'at"
    ],
    explanation: "Tajwidul huruf wa ma'rifatul wuquf: membaguskan huruf dan mengetahui tempat berhenti.",
    lesson: "jazariyah-waqaf-dan-ibtida"
  },
  {
    question: "Waqaf kafi adalah berhenti pada kalimat yang…",
    options: [
      "Masih berhubungan makna, tetapi tidak berhubungan lafazh",
      "Tidak berhubungan lafazh maupun makna",
      "Masih berhubungan lafazh dan makna",
      "Belum sempurna maknanya"
    ],
    explanation: "Tam tidak berhubungan sama sekali; kafi hanya berhubungan makna; hasan berhubungan lafazh dan makna.",
    lesson: "jazariyah-waqaf-dan-ibtida"
  },
  {
    question: "Menurut bait وَلَيْسَ فِي الْقُرْآنِ مِنْ وَقْفٍ وَجَبْ, bagaimana hukum waqaf dalam Al-Qur'an?",
    options: [
      "Pada dasarnya tidak ada yang wajib atau haram, kecuali ada sebab",
      "Wajib berhenti di setiap akhir ayat",
      "Haram berhenti di tengah ayat",
      "Wajib berhenti di setiap akhir surat"
    ],
    explanation: "Hukumnya baru berubah jika ada sebab, misalnya sengaja berhenti agar makna ayat berubah.",
    lesson: "jazariyah-waqaf-dan-ibtida"
  },
  {
    question: "Di berapa tempat أَنْ لَا ditulis terpisah (أن لا) dalam mushaf?",
    options: ["10 tempat", "7 tempat", "11 tempat", "4 tempat"],
    explanation: "فَاقْطَعْ بِعَشْرِ كَلِمَاتٍ أَنْ لَا: di luar sepuluh tempat itu ditulis bersambung أَلَّا.",
    lesson: "jazariyah-maqthu-dan-maushul"
  },
  {
    question: "Di berapa tempat kata رَحْمَت ditulis dengan ta' terbuka?",
    options: ["7 tempat", "11 tempat", "10 tempat", "2 tempat"],
    explanation: "رَحْمَت terbuka di tujuh tempat, sedangkan نِعْمَت di sebelas tempat.",
    lesson: "jazariyah-taat"
  }
];
