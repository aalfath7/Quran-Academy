import type { QuizQuestion } from "../quiz";

// Disusun dari materi tajwid (scripts/data/tajwid-ringkas.mjs). Opsi pertama selalu jawaban yang benar.
export const tajwidQuiz: QuizQuestion[] = [
  {
    question: "Apa makna kata tajwid secara bahasa?",
    options: ["Memperbagus atau memperindah", "Menghafal dengan cepat", "Memanjangkan suara", "Membaca dengan pelan"],
    explanation: "Tajwid secara bahasa bermakna memperbagus atau memperindah.",
    lesson: "definisi-ilmu-tajwid"
  },
  {
    question: "Apa hukum mempraktikkan tajwid setiap kali membaca Al-Qur'an?",
    options: ["Fardhu 'ain", "Fardhu kifayah", "Sunnah", "Mubah"],
    explanation: "Sisi praktik (al-'amali) hukumnya fardhu 'ain, wajib bagi setiap muslim yang membaca Al-Qur'an.",
    lesson: "definisi-ilmu-tajwid"
  },
  {
    question: "Apa hukum mempelajari teori (kaidah) ilmu tajwid?",
    options: ["Fardhu kifayah", "Fardhu 'ain", "Makruh", "Sunnah muakkadah"],
    explanation: "Sisi teori (an-nazhari) hukumnya fardhu kifayah: cukup jika sebagian umat menguasainya.",
    lesson: "definisi-ilmu-tajwid"
  },
  {
    question: "Sifat bawaan yang selalu melekat pada huruf, seperti jahr dan syiddah, disebut…",
    options: ["Hak huruf", "Mustahak huruf", "Lahn", "Makhraj"],
    explanation: "Hak huruf adalah sifat yang selalu melekat; mustahak huruf muncul pada keadaan tertentu seperti idgham dan ikhfa.",
    lesson: "definisi-ilmu-tajwid"
  },
  {
    question: "Manakah yang termasuk lahn jaly (kesalahan yang jelas)?",
    options: [
      "Huruf ح pada الْحَمْدُ dibaca seperti هـ",
      "Panjang mad kurang pas",
      "Ghunnah sedikit kurang",
      "Ra kurang ditebalkan"
    ],
    explanation: "Lahn jaly mengenai bentuk kata, misalnya huruf tertukar. Tiga lainnya adalah contoh lahn khafy.",
    lesson: "lahn-kesalahan-membaca-al-quran"
  },
  {
    question: "Menurut hadits, siapa yang membaca satu huruf dari Al-Qur'an mendapat…",
    options: [
      "Satu kebaikan yang dilipatgandakan sepuluh kali",
      "Satu kebaikan saja",
      "Pahala yang sama dengan satu ayat",
      "Pahala hanya jika membaca satu surat penuh"
    ],
    explanation: "Satu huruf bernilai satu kebaikan dan setiap kebaikan dilipatgandakan sepuluh kali (HR. At-Tirmidzi).",
    lesson: "keutamaan-membaca-al-quran"
  },
  {
    question: "Apa hukum membaca isti'adzah sebelum tilawah menurut pendapat yang dipilih?",
    options: ["Mustahab (sunnah)", "Wajib", "Makruh", "Mubah tanpa keutamaan"],
    explanation: "Pendapat kebanyakan ulama qira'at dan fikih, dan inilah yang dipilih: isti'adzah hukumnya mustahab.",
    lesson: "istiadzah"
  },
  {
    question: "Surat manakah yang tidak diawali basmalah ketika dibaca dari awal suratnya?",
    options: ["At-Taubah", "Al-Fatihah", "Al-Ikhlas", "Yasin"],
    explanation: "Basmalah dibaca setiap memulai dari awal surat, kecuali surat At-Taubah.",
    lesson: "basmalah"
  },
  {
    question: "Saat berpindah dari satu surat ke surat berikutnya, cara manakah yang tidak boleh?",
    options: [
      "Akhir surat disambung basmalah, lalu berhenti, baru awal surat berikutnya",
      "Semua dipisah dengan berhenti",
      "Semua disambung tanpa jeda",
      "Berhenti setelah akhir surat, lalu basmalah disambung awal surat berikutnya"
    ],
    explanation: "Cara itu dilarang karena basmalah bisa dikira penutup surat sebelumnya, padahal ia pembuka surat.",
    lesson: "basmalah"
  },
  {
    question: "Area makhraj manakah yang bukan tempat keluarnya huruf tertentu, melainkan tempat keluarnya ghunnah?",
    options: ["Al-khaisyum (rongga hidung)", "Al-jauf (rongga mulut)", "Al-halq (tenggorokan)", "Asy-syafatain (dua bibir)"],
    explanation: "Al-khaisyum adalah tempat keluarnya ghunnah, dengung yang selalu ada pada nun dan mim.",
    lesson: "makharijul-huruf-bibir-dan-rongga-hidung"
  },
  {
    question: "Huruf apa saja yang keluar dari al-jauf (rongga mulut)?",
    options: ["Tiga huruf mad", "Lima huruf qalqalah", "Hamzah dan ha (هـ)", "Ba, mim, dan wawu"],
    explanation: "Al-jauf adalah makhraj tiga huruf mad: alif setelah fathah, wawu sukun setelah dhammah, ya sukun setelah kasrah.",
    lesson: "makharijul-huruf-jauf-dan-halq"
  },
  {
    question: "Huruf apa yang keluar dari bagian terdalam tenggorokan (aqshal halq)?",
    options: ["Hamzah (ء) dan ha (هـ)", "'Ain (ع) dan ha (ح)", "Ghain (غ) dan kha (خ)", "Qaf (ق) dan kaf (ك)"],
    explanation: "Aqshal halq untuk ء dan هـ; tengah tenggorokan untuk ع dan ح; yang terdekat ke mulut untuk غ dan خ.",
    lesson: "makharijul-huruf-jauf-dan-halq"
  },
  {
    question: "Apa arti tanda waqaf قلى dalam mushaf?",
    options: [
      "Boleh melanjutkan, tetapi berhenti lebih utama",
      "Boleh berhenti, tetapi melanjutkan lebih utama",
      "Harus berhenti",
      "Jangan berhenti"
    ],
    explanation: "قلى: berhenti lebih utama. Kebalikannya صلى: melanjutkan lebih utama.",
    lesson: "tanda-tanda-waqaf-dalam-mushaf"
  },
  {
    question: "Lidah memiliki berapa titik makhraj, untuk berapa huruf?",
    options: ["10 titik untuk 18 huruf", "5 titik untuk 10 huruf", "17 titik untuk 29 huruf", "3 titik untuk 6 huruf"],
    explanation: "Lidah adalah area makhraj terbanyak: 10 titik untuk 18 huruf.",
    lesson: "makharijul-huruf-lidah"
  },
  {
    question: "Dari mana huruf dhad (ض) keluar?",
    options: [
      "Tepi lidah yang menempel pada gigi geraham atas",
      "Ujung lidah dan ujung gigi seri atas",
      "Pangkal lidah dan langit-langit lunak",
      "Tengah lidah dan langit-langit di atasnya"
    ],
    explanation: "Dhad keluar dari tepi lidah yang menempel pada gigi geraham atas, sisi kanan, kiri, atau keduanya.",
    lesson: "makharijul-huruf-lidah"
  },
  {
    question: "Dari mana huruf fa (ف) keluar?",
    options: [
      "Bagian dalam bibir bawah dengan ujung gigi seri atas",
      "Pertemuan dua bibir yang dirapatkan",
      "Ujung lidah dan gusi atas",
      "Rongga hidung"
    ],
    explanation: "Fa keluar dari bagian dalam bibir bawah yang disentuhkan ke ujung gigi seri atas.",
    lesson: "makharijul-huruf-bibir-dan-rongga-hidung"
  },
  {
    question: "Huruf-huruf hams terkumpul dalam kalimat…",
    options: ["فَحَثَّهُ شَخْصٌ سَكَتَ", "أَجِدْ قَطٍ بَكَتْ", "لِنْ عُمَرَ", "خُصَّ ضَغْطٍ قِظْ"],
    explanation: "Sepuluh huruf hams: فَحَثَّهُ شَخْصٌ سَكَتَ. أَجِدْ قَطٍ بَكَتْ adalah huruf syiddah.",
    lesson: "sifat-huruf-yang-berlawanan"
  },
  {
    question: "Huruf-huruf tawassuth (di antara syiddah dan rakhawah) adalah…",
    options: ["لِنْ عُمَرَ", "قُطْبُ جَدٍّ", "فِرَّ مِنْ لُبٍّ", "يَرْمُلُونَ"],
    explanation: "Tawassuth ada pada lima huruf: لِنْ عُمَرَ.",
    lesson: "sifat-huruf-yang-berlawanan"
  },
  {
    question: "Manakah huruf-huruf ithbaq?",
    options: ["ص ض ط ظ", "خ ص ض غ ط ق ظ", "ق ط ب ج د", "ص ز س"],
    explanation: "Ithbaq hanya empat huruf: ص ض ط ظ. Tujuh huruf خص ضغط قظ adalah huruf isti'la.",
    lesson: "sifat-huruf-yang-berlawanan"
  },
  {
    question: "Huruf-huruf idzlaq, yang ringan diucapkan, terkumpul dalam…",
    options: ["فِرَّ مِنْ لُبٍّ", "لِنْ عُمَرَ", "يَنْمُو", "سَنَقُصُّ لَكُمْ"],
    explanation: "Enam huruf idzlaq: فِرَّ مِنْ لُبٍّ, keluar dari ujung lidah atau bibir.",
    lesson: "sifat-huruf-yang-berlawanan"
  },
  {
    question: "Manakah huruf-huruf qalqalah?",
    options: ["قُطْبُ جَدٍّ", "خُصَّ ضَغْطٍ قِظْ", "ص ز س", "ل dan ر"],
    explanation: "Qalqalah ada pada lima huruf: قُطْبُ جَدٍّ, terutama ketika sukun.",
    lesson: "sifat-huruf-tanpa-lawan"
  },
  {
    question: "Sifat tafasysyi (udara menyebar di dalam mulut) dimiliki oleh huruf…",
    options: ["Syin (ش)", "Dhad (ض)", "Ra (ر)", "Sin (س)"],
    explanation: "Tafasysyi khusus pada huruf syin.",
    lesson: "sifat-huruf-tanpa-lawan"
  },
  {
    question: "Sifat istithalah (suara memanjang di sepanjang sisi lidah) dimiliki oleh huruf…",
    options: ["Dhad (ض)", "Zha (ظ)", "Syin (ش)", "Lam (ل)"],
    explanation: "Istithalah khusus pada dhad, yang suaranya memanjang hingga mendekati makhraj lam.",
    lesson: "sifat-huruf-tanpa-lawan"
  },
  {
    question: "Sifat takrir pada huruf ra perlu diketahui agar…",
    options: [
      "Getarannya ditahan dan tidak berlebihan",
      "Getarannya diperbanyak",
      "Ra selalu dibaca tebal",
      "Ra dibaca dengan dengung"
    ],
    explanation: "Takrir dipelajari justru agar getaran ra ditahan, bukan diperbanyak.",
    lesson: "sifat-huruf-tanpa-lawan"
  },
  {
    question: "Huruf-huruf izhhar halqi adalah…",
    options: ["ء هـ ع ح غ خ", "ي ر م ل و ن", "ب saja", "ص ذ ث ك ج ش"],
    explanation: "Izhhar halqi berlaku jika nun sukun atau tanwin bertemu enam huruf tenggorokan: ء هـ ع ح غ خ.",
    lesson: "nun-sukun-dan-tanwin-izhhar"
  },
  {
    question: "Idgham bilaa ghunnah (tanpa dengung) terjadi jika nun sukun atau tanwin bertemu…",
    options: ["Lam (ل) dan ra (ر)", "Ya (ي) dan wawu (و)", "Mim (م) dan nun (ن)", "Ba (ب)"],
    explanation: "Idgham tanpa dengung hanya untuk ل dan ر. Huruf يَنْمُو dibaca idgham bighunnah.",
    lesson: "nun-sukun-dan-tanwin-idgham"
  },
  {
    question: "Idgham nun sukun dan tanwin hanya terjadi jika…",
    options: [
      "Nun dan huruf sesudahnya berada di dua kata yang berbeda",
      "Nun dan huruf sesudahnya berada dalam satu kata",
      "Bacaan dihentikan di akhir ayat",
      "Huruf sesudahnya bersukun"
    ],
    explanation: "Jika masih dalam satu kata, tidak dibaca idgham.",
    lesson: "nun-sukun-dan-tanwin-idgham"
  },
  {
    question: "Nun sukun atau tanwin dibaca iqlab ketika bertemu huruf…",
    options: ["Ba (ب)", "Mim (م)", "Lam (ل)", "Kaf (ك)"],
    explanation: "Huruf iqlab hanya satu, yaitu ba: bunyi nun berubah menjadi mim yang samar dengan dengung.",
    lesson: "nun-sukun-dan-tanwin-iqlab"
  },
  {
    question: "Berapa jumlah huruf ikhfa haqiqi?",
    options: ["15 huruf", "6 huruf", "14 huruf", "7 huruf"],
    explanation: "Ikhfa berlaku pada 15 huruf yang tersisa setelah huruf izhhar, idgham, dan iqlab.",
    lesson: "nun-sukun-dan-tanwin-ikhfa"
  },
  {
    question: "Tebal-tipisnya dengung ikhfa ditentukan oleh…",
    options: ["Huruf sesudahnya", "Huruf sebelumnya", "Harakat sebelum nun", "Panjang mad di dekatnya"],
    explanation: "Jika huruf sesudahnya huruf isti'la, dengungnya tebal; jika tipis, dengungnya tipis.",
    lesson: "nun-sukun-dan-tanwin-ikhfa"
  },
  {
    question: "Mim sukun yang bertemu ba, seperti pada أَمْ بِظَاهِرٍ, dibaca…",
    options: ["Ikhfa syafawi", "Idgham syafawi", "Izhhar syafawi", "Iqlab"],
    explanation: "Mim sukun bertemu ba disamarkan sambil berdengung: ikhfa syafawi.",
    lesson: "hukum-mim-sukun"
  },
  {
    question: "Bagaimana membaca mim sukun yang bertemu wawu atau fa, seperti هُمْ فِيهَا?",
    options: ["Izhhar syafawi, mim dibaca jelas", "Ikhfa syafawi", "Idgham syafawi", "Iqlab"],
    explanation: "Hukumnya izhhar syafawi. Kesalahan yang sering terjadi justru menyamarkannya karena makhrajnya berdekatan.",
    lesson: "hukum-mim-sukun"
  },
  {
    question: "Bagaimana ghunnah pada nun dan mim bertasydid dibaca?",
    options: [
      "Dengung sempurna, baik saat washal maupun waqaf",
      "Tanpa dengung sama sekali",
      "Dengung hanya ketika waqaf",
      "Dibaca ikhfa"
    ],
    explanation: "Pada nun dan mim bertasydid, dengung mencapai kadar paling sempurna dan wajib ditahan utuh.",
    lesson: "nun-dan-mim-bertasydid"
  },
  {
    question: "Bagaimana lam ta'rif dibaca jika sesudahnya huruf qamariyah?",
    options: ["Dibaca jelas (izhhar)", "Dilebur ke huruf sesudahnya", "Disamarkan (ikhfa)", "Ditebalkan"],
    explanation: "Sebelum 14 huruf ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ, lam dibaca jelas dan diberi tanda sukun.",
    lesson: "lam-tarif"
  },
  {
    question: "Manakah contoh lam syamsiyah?",
    options: ["الرَّزَّاقُ", "الْقَمَرُ", "الْكَهْفِ", "الْحَجِّ"],
    explanation: "Pada الرَّزَّاقُ lam dilebur ke ra yang bertasydid. Tiga lainnya lam qamariyah.",
    lesson: "lam-tarif"
  },
  {
    question: "Kelompok huruf manakah yang selalu dibaca tebal dalam keadaan apa pun?",
    options: ["Huruf isti'la (خُصَّ ضَغْطٍ قِظْ)", "Huruf hams", "Huruf idzlaq", "Huruf syamsiyah"],
    explanation: "Ulama sepakat huruf isti'la selalu tebal, baik berharakat maupun sukun.",
    lesson: "tebal-dan-tipis"
  },
  {
    question: "Tebal atau tipisnya alif ditentukan oleh…",
    options: ["Huruf sebelumnya", "Huruf sesudahnya", "Harakat alif itu sendiri", "Selalu tebal"],
    explanation: "Alif tidak punya sifat tebal atau tipis sendiri; ia mengikuti huruf di depannya.",
    lesson: "tebal-dan-tipis"
  },
  {
    question: "Pada lafazh manakah lam lafzhul jalalah dibaca tipis?",
    options: ["بِسْمِ اللَّهِ", "عَبْدُ اللَّهِ", "عِبَادَ اللَّهِ", "قَالُوا اللَّهُمَّ"],
    explanation: "Lam lafzhul jalalah tipis jika didahului kasrah, seperti بِسْمِ اللَّهِ.",
    lesson: "tebal-dan-tipis"
  },
  {
    question: "Bagaimana ra pada kata فِرْعَوْنَ dibaca?",
    options: ["Tipis", "Tebal", "Boleh tebal atau tipis", "Dengan dengung"],
    explanation: "Ra sukun setelah kasrah asli dan sesudahnya tidak ada huruf isti'la dibaca tipis.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Mengapa ra pada ارْجِعُوا dibaca tebal padahal didahului kasrah?",
    options: [
      "Kasrahnya bersifat sementara ('aridh), dari hamzah washal",
      "Ra-nya berharakat kasrah",
      "Sesudahnya ada huruf isti'la",
      "Ra-nya bertasydid"
    ],
    explanation: "Ra sukun setelah kasrah 'aridh dibaca tebal. Tanda mudahnya: ra sukun yang didahului hamzah washal.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Mengapa ra pada قِرْطَاسٍ dibaca tebal?",
    options: [
      "Sesudahnya ada huruf isti'la yang tidak berkasrah dalam kata yang sama",
      "Ra-nya berharakat fathah",
      "Kasrah sebelumnya bersifat sementara",
      "Didahului ya sukun"
    ],
    explanation: "Ra sukun setelah kasrah tetap tebal jika diikuti huruf isti'la dalam satu kata, seperti قِرْطَاسٍ dan فِرْقَةٍ.",
    lesson: "hukum-ra-tebal-dan-tipis"
  },
  {
    question: "Berapa panjang mad thabi'i?",
    options: ["Dua harakat", "Empat harakat", "Enam harakat", "Boleh 2, 4, atau 6 harakat"],
    explanation: "Mad thabi'i tepat dua harakat, sama untuk semua qari'.",
    lesson: "mad-thabii-dan-turunannya"
  },
  {
    question: "Mad 'iwadh terjadi ketika…",
    options: [
      "Berhenti pada kata bertanwin fathah",
      "Hamzah berada sebelum huruf mad dalam satu kata",
      "Huruf mad bertemu hamzah dalam satu kata",
      "Ha' dhamir berada di antara dua huruf berharakat"
    ],
    explanation: "Ketika waqaf pada tanwin fathah, tanwin diganti bunyi alif dua harakat, seperti عَلِيمًا.",
    lesson: "mad-thabii-dan-turunannya"
  },
  {
    question: "Kata آمَنُوا adalah contoh mad…",
    options: ["Badal", "'Iwadh", "Wajib muttashil", "Lazim"],
    explanation: "Mad badal: hamzah berada sebelum huruf mad dalam satu kata.",
    lesson: "mad-thabii-dan-turunannya"
  },
  {
    question: "Berapa panjang mad shilah kubra?",
    options: ["4 atau 5 harakat", "2 harakat", "6 harakat", "1 harakat"],
    explanation: "Shilah kubra (ha' dhamir diikuti hamzah) mengikuti mad munfashil: 4 atau 5 harakat.",
    lesson: "mad-thabii-dan-turunannya"
  },
  {
    question: "Mad wajib muttashil terjadi ketika…",
    options: [
      "Huruf mad dan hamzah berada dalam satu kata",
      "Huruf mad di akhir kata dan hamzah di awal kata berikutnya",
      "Huruf mad diikuti sukun asli",
      "Huruf mad diikuti sukun karena waqaf"
    ],
    explanation: "Muttashil berarti bersambung: huruf mad dan hamzah menyatu dalam satu kata, seperti السَّمَاءِ.",
    lesson: "mad-muttashil-munfashil-lazim-aridh-lin"
  },
  {
    question: "Berapa panjang mad lazim?",
    options: ["Selalu 6 harakat", "2, 4, atau 6 harakat", "4 atau 5 harakat", "2 harakat"],
    explanation: "Mad lazim selalu 6 harakat untuk semua jenisnya dan bagi semua qari'.",
    lesson: "mad-muttashil-munfashil-lazim-aridh-lin"
  },
  {
    question: "Huruf muqaththa'ah yang dibaca mad lazim dirangkum dalam…",
    options: ["سَنَقُصُّ لَكُمْ", "يَرْمُلُونَ", "لِنْ عُمَرَ", "فِرَّ مِنْ لُبٍّ"],
    explanation: "Tujuh huruf pembuka surat yang dibaca mad lazim harfi: سَنَقُصُّ لَكُمْ.",
    lesson: "mad-muttashil-munfashil-lazim-aridh-lin"
  },
  {
    question: "Berhenti karena napas habis, batuk, atau bersin disebut waqaf…",
    options: ["Idhthirari", "Ikhtibari", "Intizhari", "Ikhtiyari"],
    explanation: "Waqaf idhthirari karena terpaksa; boleh di kata mana saja, lalu dilanjutkan dari tempat yang tepat.",
    lesson: "waqaf-pengertian-dan-jenis"
  },
  {
    question: "Waqaf manakah yang tidak boleh dilakukan dengan sengaja?",
    options: ["Waqaf qabih", "Waqaf tam", "Waqaf kafy", "Waqaf hasan"],
    explanation: "Waqaf qabih berhenti pada kalimat yang belum tuntas sehingga makna bisa kurang, keliru, atau rusak.",
    lesson: "waqaf-tam-kafy-hasan-qabih"
  }
];
