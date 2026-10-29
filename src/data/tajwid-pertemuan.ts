// Kelas Tajwid: 26 pertemuan dalam 5 tahap, dari "Modul Kelas Tajwid — Fathway Quran".
// Untuk murid yang sudah bisa membaca. Setiap pertemuan berisi empat langkah yang dipakai berurutan:
// materi, latihan ayat, praktik mushaf, dan tugas mandiri (lihat src/lib/meeting-plan.ts untuk formatnya).
//
// Latihan ayat: satu baris per ayat, "surah:ayat | kata yang diperhatikan | catatan".
// Praktik mushaf: nomor halaman mushaf Madinah 15 baris (604 halaman; Juz 30 = halaman 582–604).
// Isi halamannya (surah dan ayat) dibaca dari src/data/quran.json; jalankan `npm run quran:build` setelah
// mengubah latihan ayat atau halaman mushaf.

import type { Lesson } from "@/lib/lessons";

const source = 'Rujukan: Modul Kelas Tajwid — Fathway Quran.';

const meetings: Omit<Lesson, "category" | "position">[] = [
  // Tahap 1 — Makhraj & sifat lewat ayat
  {
    slug: "tes-awal-dan-peta-makhraj",
    title: "Tes Awal & Peta Makhraj",
    arabicText: "مَخَارِجُ الْحُرُوفِ",
    summary: "Mengetahui kesalahan awal bacaan dan mengenal lima tempat keluar huruf.",
    content: `Materi
Makhraj adalah tempat keluarnya huruf. Ada 5 makhraj umum yang terbagi menjadi 17 makhraj khusus.

Lima makhraj umum
• Al-jauf (rongga): 1 makhraj, untuk 3 huruf mad.
• Al-halq (tenggorokan): 3 makhraj, untuk 6 huruf.
• Al-lisan (lidah): 10 makhraj, untuk 18 huruf.
• Asy-syafatain (dua bibir): 2 makhraj, untuk 4 huruf.
• Al-khaisyum (rongga hidung): 1 makhraj, tempat keluarnya ghunnah.

Organ yang perlu dikenal
Dua gigi seri atas dan bawah, gusi atas, langit-langit atas, serta lidah yang dibagi menjadi pangkal, tengah, ujung, dan sisi.

Al-jauf
Al-jauf adalah ruang kosong di mulut dan tenggorokan. Huruf mad keluar dari sini dengan syarat:
• Alif sukun didahului fathah: قَالَ
• Wawu sukun didahului dhammah: يَقُولُ
• Ya sukun didahului kasrah: قِيلَ

Al-khaisyum
Al-khaisyum adalah rongga yang menghubungkan hidung dengan tenggorokan. Ghunnah selalu menyertai nun dan mim dalam semua keadaan.
Cara mudah: tutup hidung saat membaca نّ. Jika suara terhenti, berarti dengung sudah keluar dari hidung.

Latihan ayat
1:2 | الْحَمْدُ | ح tidak dibaca seperti ه
1:4 | مَالِكِ | mad dari al-jauf, 2 harakat
112:1 | قُلْ هُوَ | ق dari pangkal lidah, tidak seperti ك
114:1 | النَّاسِ | dengung dari hidung
114:4 | الْخَنَّاسِ | خ jelas, dengung penuh pada نّ

Praktik mushaf: 604
Baca seluruh halaman ini. Catat kata yang terasa sulit; catatan ini menjadi tes awal yang dibandingkan di akhir tahap.

Tugas mandiri: Baca Al-Fatihah lengkap setiap hari dan catat huruf yang masih sering tertukar.`
  },
  {
    slug: "huruf-tenggorokan",
    title: "Huruf Tenggorokan",
    arabicText: "حُرُوفُ الْحَلْقِ\nء ه ع ح غ خ",
    summary: "Membedakan enam huruf tenggorokan ء ه ع ح غ خ di dalam bacaan.",
    content: `Materi
Tenggorokan terletak antara pita suara dan pangkal lidah, berisi 3 makhraj untuk 6 huruf.

Tiga makhraj tenggorokan
• Pangkal tenggorokan (aqshal halq): daerah pita suara, untuk ء dan ه. Contoh: يَأْكُلُ، مُؤْمِنٍ، أَهْوَاءَهُمْ، أَهْلِهَا
• Tengah tenggorokan (wasthul halq): daerah epiglotis, untuk ع dan ح. Contoh: أَعْبُدُ، أَعْلَمُ، إِحْسَانًا
• Ujung tenggorokan (adnal halq): dekat pangkal lidah, untuk غ dan خ. Contoh: أَغْنِيَاءَ، أَغْرَقْنَا، أَخْرَجَتْ

Kesalahan yang sering terjadi
• ع dibaca seperti hamzah.
• ح dibaca seperti ه: الْحَمْدُ menjadi "alhamdu" dengan ha ringan.
• خ dibaca seperti ك.
Penting: semua ini termasuk lahn jali, karena hurufnya berganti.

Latihan ayat
100:1 | وَالْعَادِيَاتِ ضَبْحًا | ع dan ح dari tengah tenggorokan
100:3 | فَالْمُغِيرَاتِ | غ dari ujung tenggorokan
100:11 | لَخَبِيرٌ | خ tidak dibaca seperti ك
101:9 | هَاوِيَةٌ | ه ringan, tidak dibaca seperti ح
113:3 | غَاسِقٍ | غ dan ق tebal

Praktik mushaf: 600
Baca halaman ini sambil memperhatikan setiap huruf tenggorokan. Ulangi baris yang masih tertukar antara ع dan ء, atau ح dan ه.

Tugas mandiri: Baca Al-'Adiyat 3 kali sehari sampai ayat 1–5 lancar tanpa huruf yang tertukar.`
  },
  {
    slug: "pangkal-dan-tengah-lidah-huruf-dhad",
    title: "Pangkal & Tengah Lidah, Huruf ض",
    arabicText: "أَقْصَى اللِّسَانِ وَوَسَطُهُ\nق ك ج ش ي ض",
    summary: "Membaca ق tanpa tertukar dengan ك, dan mengeluarkan ض dari sisi lidah.",
    content: `Materi
Pangkal lidah
• ق: pangkal lidah bertemu langit-langit lunak (bagian berdaging). Contoh: أَقْرَبُ، أَقْرَرْتُمْ، أُقْسِمُ
• ك: pangkal lidah sedikit lebih ke depan dari ق, bertemu langit-langit lunak dan keras. Contoh: أَكْثَرُهُمْ، أَكْبَرُ

Tengah dan sisi lidah
• ج ش ي: bukan huruf mad; tengah lidah bertemu langit-langit atas di depannya. Contoh: أَجْرُهُمْ، أَشْهُرٍ، أَيْدِيهِمْ
• ض: satu sisi lidah (kanan, kiri, atau keduanya) menempel ke geraham atas. Contoh: اضْرِبْ، أَضْحَكَ، أَضْعَافًا

Sifat yang melekat pada huruf-huruf ini
• Tafasysyi pada ش: udara menyebar di dalam mulut sampai mengenai bagian dalam gigi seri atas.
• Istithalah pada ض: suaranya memanjang di sepanjang sisi lidah sampai mendekati makhraj ل.
• Isti'la pada ق dan ض: pangkal lidah terangkat sehingga hurufnya tebal.

Latihan ayat
93:1 | وَالضُّحَىٰ | ض dari sisi lidah, tebal
93:3 | مَا وَدَّعَكَ رَبُّكَ وَمَا قَلَىٰ | ك tipis, ق tebal
93:7 | وَوَجَدَكَ ضَالًّا | ج tidak dibaca seperti "dj" yang lembek
106:2 | الشِّتَاءِ وَالصَّيْفِ | ش menyebar, ص tebal
106:4 | جُوعٍ | ج dari tengah lidah

Praktik mushaf: 596
Baca halaman ini dan beri perhatian khusus pada setiap ق, ك, dan ض.

Tugas mandiri: Baca Ad-Dhuha lengkap setiap hari dengan perhatian khusus pada huruf ض.`
  },
  {
    slug: "ujung-lidah-dan-bibir",
    title: "Ujung Lidah & Bibir",
    arabicText: "طَرَفُ اللِّسَانِ وَالشَّفَتَانِ",
    summary: "Membedakan pasangan huruf yang mirip: ت–ط, س–ص, ز–ذ–ظ, dan س–ث di dalam ayat.",
    content: `Materi
Ujung lidah
• ل: kedua sisi lidah bagian depan sampai ujungnya bertemu gusi atas. Contoh: قُلْنَا، يُلْقُونَ
• ن: ujung lidah bertemu gusi atas, sedikit di atas makhraj ل, disertai ghunnah. Contoh: أَنْعَمْتَ، إِنْ
• ر: punggung ujung lidah bertemu gusi atas, dekat makhraj ن. Contoh: أَرْبَعَةً، أَرْبَابًا
• ط د ت: ujung lidah bertemu pangkal dua gigi seri atas. Contoh: أَطْعَمَهُمْ، أَدْرَاكَ، أَتْقَاكُمْ
• ص س ز: ujung lidah mendekati dinding dalam gigi seri bawah; suara mengalir di antara gigi seri atas dan bawah. Contoh: أَصْحَابُ، أَسْفَلَ، أَزْوَاجٌ
• ظ ذ ث: ujung lidah bertemu ujung dua gigi seri atas, lidah sedikit keluar. Contoh: أَظْلَمَ، اذْكُرُوا، إِثْمٌ

Bibir
• ف: bagian dalam bibir bawah bertemu ujung gigi seri atas. Contoh: أَفْوَاجًا، أَفْلَحَ
• ب م و: dari dua bibir. Bibir dibulatkan untuk و (bukan mad), dirapatkan untuk ب dan م; م disertai ghunnah.

Sifat shafir
Sifat shafir pada ز س ص adalah bunyi desis yang menyertai hurufnya. Desis inilah yang membedakan ص dari ث, dan ز dari ذ.

Latihan ayat
99:2 | أَثْقَالَهَا | ث lidah keluar, tidak dibaca seperti س
99:7 | مِثْقَالَ ذَرَّةٍ | ذ tidak dibaca seperti ز
103:3 | الصَّالِحَاتِ | ص tebal dengan desis
105:3 | طَيْرًا أَبَابِيلَ | ط tebal, ب dengan dua bibir rapat
105:5 | كَعَصْفٍ مَأْكُولٍ | ف dari bibir bawah

Praktik mushaf: 601
Baca halaman ini dan perhatikan setiap pasangan huruf yang mirip: ت–ط, س–ص, ذ–ز–ظ, dan ث–س.

Tugas mandiri: Baca Az-Zalzalah lengkap setiap hari sampai pasangan huruf yang mirip tidak lagi tertukar.`
  },
  {
    slug: "sifat-huruf-hukum-tajwid-dan-lahn",
    title: "Sifat Huruf, Hukum Tajwid, dan Lahn",
    arabicText: "اللَّحْنُ الْجَلِيُّ وَالْخَفِيُّ",
    summary: "Memahami mengapa kesalahan makhraj dan sifat itu penting, lalu mengevaluasi bacaan di akhir tahap 1.",
    content: `Materi
Pengertian tajwid
Tajwid secara bahasa berarti memperindah. Secara istilah, tajwid adalah ilmu untuk memberikan setiap huruf hak dan mustahaknya, dari sisi makhraj, sifat, waqaf, dan ibtida.
• Hak huruf: sifat yang tetap dan tidak pernah lepas, misalnya jahr dan syiddah.
• Mustahak huruf: sifat yang muncul karena bertemu huruf lain, misalnya izhar, idgham, dan ikhfa.
Hukum: mempelajari teorinya fardhu kifayah, sedangkan membaca Al-Qur'an dengan tajwid fardhu 'ain bagi setiap muslim. Tujuannya menjaga lisan dari kesalahan (lahn) dan meraih ridha Allah.

Lahn jali (kesalahan jelas)
Lahn jali mengubah susunan kata, baik maknanya berubah maupun tidak, dan bisa diketahui orang awam sekalipun. Hukumnya haram jika disengaja atau karena enggan belajar. Bentuknya:
1. Mengganti huruf, misalnya ح dibaca ه pada الْحَمْدُ.
2. Mengganti harakat, misalnya أَنْعَمْتَ dibaca أَنْعَمْتِ.
3. Mematikan huruf yang berharakat.
4. Memberi harakat pada huruf sukun, misalnya mim pada أَنْعَمْتَ diberi fathah.
5. Menambah atau mengurangi huruf atau kata.

Lahn khafi (kesalahan samar)
Lahn khafi berkaitan dengan kesempurnaan bacaan, bukan kebenaran hurufnya. Misalnya mad tidak dipanjangkan, ghunnah tidak sesuai ukuran, atau lam dan ra tidak ditebalkan atau ditipiskan pada tempatnya. Kesalahan ini hanya diketahui orang yang belajar tajwid.

Sifat huruf yang berpasangan
• Hams (napas mengalir): sandaran huruf pada makhraj lemah. Hurufnya 10, terhimpun dalam فَحَثَّهُ شَخْصٌ سَكَتَ. Lawannya jahr (napas tertahan), yaitu huruf sisanya.
• Syiddah (suara tertahan): tekanan pada makhraj kuat. Hurufnya 8, terhimpun dalam أَجِدْ قَطٍ بَكَتْ. Lawannya rakhawah (suara mengalir), yaitu huruf sisanya.
• Tawassuth: di antara syiddah dan rakhawah. Hurufnya 5, terhimpun dalam لِنْ عُمَرْ.
• Idzlaq (ringan diucapkan): keluar dari ujung lidah atau bibir. Hurufnya 6, terhimpun dalam فِرَّ مِنْ لُبٍّ. Lawannya ishmat, yaitu huruf sisanya.
Catatan: isti'la–istifal dan ithbaq–infitah dibahas di materi Huruf Tebal & Alif.

Latihan ayat
102:1 | التَّكَاثُرُ | ت dan ك berdesah (hams), ث keluar
102:8 | ثُمَّ لَتُسْأَلُنَّ | ث bukan س; dengung pada نّ
97:1 | إِنَّا أَنْزَلْنَاهُ | ز tidak dibaca seperti ذ
97:4 | تَنَزَّلُ الْمَلَائِكَةُ | ز bertasydid jelas
97:5 | مَطْلَعِ الْفَجْرِ | ط tebal, ع jelas

Praktik mushaf: 595
Halaman ini belum pernah dilatih. Baca, lalu bandingkan dengan catatan kata sulit dari tes awal (materi Tes Awal & Peta Makhraj).

Tugas mandiri: Kelompokkan kesalahan dari catatan tes awal menjadi lahn jali atau lahn khafi.`
  },

  // Tahap 2 — Nun sukun, tanwin, mim sukun
  {
    slug: "izhar-halqi-dan-nun-mim-bertasydid",
    title: "Izhar Halqi & Nun-Mim Bertasydid",
    arabicText: "الْإِظْهَارُ الْحَلْقِيُّ",
    summary: "Membaca nun sukun dan tanwin dengan jelas sebelum huruf tenggorokan, serta dengung penuh pada نّ dan مّ.",
    content: `Materi
Nun sukun dan tanwin
• Tiga keadaan nun: bertasydid (الْجَنَّةَ), berharakat (نَعْبُدُ), dan sukun (أَنْعَمْتَ). Hukum nun sukun membahas keadaan ketiga.
• Nun sukun: nun tanpa harakat yang tetap ada saat sambung maupun berhenti, tertulis dan terbaca, bisa di tengah atau akhir kata. Contoh: يَنْظُرُونَ، مَنْ
• Tanwin: nun sukun tambahan di akhir isim. Terbaca tetapi tidak tertulis sebagai huruf, tandanya harakat ganda, dan hilang saat berhenti. Contoh: قَوْمٍ هَادٍ، غَفُورٌ حَلِيمٌ
• Empat hukum: izhar, idgham, iqlab, dan ikhfa.

Izhar halqi
Izhar secara bahasa berarti jelas. Secara istilah, izhar adalah mengeluarkan huruf dari makhrajnya tanpa ghunnah tambahan.
• Hurufnya: 6 huruf tenggorokan ء ه ع ح غ خ, terhimpun pada huruf awal kalimat أَخِي هَاكَ عِلْمًا حَازَهُ غَيْرُ خَاسِرٍ
• Disebut halqi karena hurufnya dari tenggorokan. Sebabnya, makhraj nun jauh dari makhraj tenggorokan.
• Cara membaca: nun jelas, tidak didengungkan, dan tidak diputus atau didiamkan.
• Nun sukun bisa dalam satu kata (يَنْهَوْنَ) atau dua kata (مَنْ آمَنَ). Pada tanwin selalu dua kata.
• Penanda di mushaf: nun diberi sukun; tanwin ditulis bertumpuk sejajar.

Nun dan mim bertasydid
Nun dan mim bertasydid wajib didengungkan dengan sempurna, sekitar 2 harakat, baik saat sambung maupun berhenti.
Contoh: النَّاسِ، ثُمَّ، إِنَّ اللَّهَ

Latihan ayat
112:4 | كُفُوًا أَحَدٌ | izhar (tanwin + ء)
101:11 | نَارٌ حَامِيَةٌ | izhar (tanwin + ح)
88:2 | يَوْمَئِذٍ خَاشِعَةٌ | izhar (tanwin + خ)
106:4 | مِنْ خَوْفٍ | izhar (nun sukun + خ)
102:4 | ثُمَّ كَلَّا | ghunnah pada مّ

Praktik mushaf: 592
Baca halaman ini dan sebutkan setiap izhar serta nun-mim bertasydid yang kamu temui.

Tugas mandiri: Tandai semua izhar di halaman 592, lalu baca ayat 1–7 sampai lancar.`
  },
  {
    slug: "idgham-bighunnah-dan-bilaghunnah",
    title: "Idgham Bighunnah & Bilaghunnah",
    arabicText: "الْإِدْغَامُ\nيَرْمَلُونَ",
    summary: "Meleburkan nun sukun dan tanwin ke huruf berikutnya, dengan atau tanpa dengung.",
    content: `Materi
Pengertian idgham
Idgham secara bahasa berarti memasukkan. Secara istilah, idgham adalah memasukkan huruf sukun ke huruf berharakat sesudahnya sehingga menjadi satu huruf bertasydid.
• Hurufnya: 6 huruf ي ر م ل و ن, terhimpun dalam kata يَرْمَلُونَ
• Idgham nun sukun dan tanwin hanya terjadi antara dua kata. Jika dalam satu kata, nun dibaca jelas (izhar mutlaq). Ini hanya ada di 4 kata: دُنْيَا، بُنْيَانٌ، صِنْوَانٌ، قِنْوَانٌ

Dua jenis idgham
• Idgham bighunnah: dilebur dengan dengung. Hurufnya 4: ي ن م و, terhimpun dalam يَنْمُو. Contoh: مَن يَقُولُ، مِن نِّعْمَةٍ، مِن مَّالٍ، مِن وَالٍ
• Idgham bilaghunnah: dilebur tanpa dengung. Hurufnya ل dan ر. Contoh: مِن لَّدُنْهُ، مِن رَّبِّهِمْ

Penanda di mushaf
• Idgham kamil (sempurna) pada ن م ل ر: nun tanpa sukun, huruf sesudahnya bertasydid. Nun hilang seluruhnya.
• Idgham naqish (tidak sempurna) pada ي و: nun tanpa sukun, huruf sesudahnya tanpa tasydid. Dengung nun masih tersisa.

Latihan ayat
98:2 | رَسُولٌ مِنَ | bighunnah (tanwin + م)
99:7 | فَمَنْ يَعْمَلْ | bighunnah (nun sukun + ي)
88:8 | يَوْمَئِذٍ نَاعِمَةٌ | bighunnah (tanwin + ن)
104:1 | وَيْلٌ لِكُلِّ | bilaghunnah (tanwin + ل)
101:7 | عِيشَةٍ رَاضِيَةٍ | bilaghunnah (tanwin + ر)

Praktik mushaf: 598
Baca halaman ini dan bedakan idgham yang berdengung dari yang tidak.

Tugas mandiri: Tandai idgham di halaman 598 dengan dua warna, satu untuk bighunnah dan satu untuk bilaghunnah.`
  },
  {
    slug: "iqlab-dan-ikhfa-haqiqi",
    title: "Iqlab & Ikhfa Haqiqi",
    arabicText: "الْإِقْلَابُ وَالْإِخْفَاءُ",
    summary: "Mengubah nun menjadi mim sebelum ب, dan menyamarkan nun sebelum 15 huruf ikhfa.",
    content: `Materi
Iqlab
Iqlab secara bahasa berarti mengubah. Secara istilah, iqlab adalah mengubah nun sukun atau tanwin menjadi mim samar disertai ghunnah, ketika bertemu ب.
• Hurufnya: hanya ب, bisa dalam satu kata (أَنۢبِئُونِي، لَيُنۢبَذَنَّ) atau dua kata (مِنۢ بَعْدِ).
• Penanda di mushaf: mim kecil di atas nun sebagai ganti sukun; pada tanwin, mim kecil menggantikan harakat kedua.
• Cara membaca: bibir dirapatkan ringan, tidak ditekan, sambil berdengung 2 harakat.

Ikhfa haqiqi
Ikhfa secara bahasa berarti menutup. Secara istilah, ikhfa adalah membaca nun di antara izhar dan idgham, tanpa tasydid, disertai ghunnah.
• Hurufnya: 15 huruf, yaitu sisa huruf setelah huruf izhar, idgham, dan iqlab: ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ
• Terhimpun pada huruf awal bait: صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا ۞ دُمْ طَيِّبًا زِدْ فِي تُقًى ضَعْ ظَالِمَا
• Cara membaca: lidah mendekat ke makhraj huruf ikhfa sambil berdengung, tanpa menyentuh makhraj nun.
• Ghunnah tebal: jika huruf sesudahnya tebal. Contoh: مِنْ قَبْلُ، يَنْطِقُونَ
• Ghunnah tipis: jika huruf sesudahnya tipis. Contoh: إِنْ كُنْتُمْ
• Penanda di mushaf: nun tanpa sukun dan huruf sesudahnya tanpa tasydid; tanwin ditulis bertumpuk miring.

Latihan ayat
96:15 | لَنَسْفَعًا بِالنَّاصِيَةِ | iqlab (tanwin + ب)
98:4 | مِنْ بَعْدِ | iqlab (nun sukun + ب)
97:4 | مِنْ كُلِّ | ikhfa, dengung tipis
86:4 | إِنْ كُلُّ نَفْسٍ | ikhfa, dengung tipis
88:6 | مِنْ ضَرِيعٍ | ikhfa, dengung tebal

Praktik mushaf: 591
Baca halaman ini dan perhatikan khusus مِنْ بَيْنِ dan مِنْ قُوَّةٍ.

Tugas mandiri: Baca Ath-Thariq lengkap setiap hari sambil menyebutkan setiap iqlab dan ikhfa.`
  },
  {
    slug: "hukum-mim-sukun",
    title: "Hukum Mim Sukun",
    arabicText: "أَحْكَامُ الْمِيمِ السَّاكِنَةِ",
    summary: "Membedakan idgham mimi, ikhfa syafawi, dan izhar syafawi.",
    content: `Materi
Tiga hukum mim sukun
• Idgham syafawi (idgham mimi): mim sukun bertemu م, dilebur dengan dengung penuh. Tanda mushaf: mim pertama tanpa sukun, mim kedua bertasydid. Contoh: أَطْعَمَهُم مِّن جُوعٍ، آمَنَهُم مِّنْ خَوْفٍ
• Ikhfa syafawi: mim sukun bertemu ب, mim disamarkan dengan dengung. Hanya terjadi antara dua kata. Tanda mushaf: mim tanpa sukun, ب tanpa tasydid. Contoh: أَم بِظَاهِرٍ، وَمَن يَعْتَصِم بِاللَّهِ
• Izhar syafawi: mim sukun bertemu selain م dan ب, dibaca jelas. Tanda mushaf: mim diberi sukun. Contoh: وَأَمْدَدْنَاهُمْ، هُمْ فِيهَا خَالِدُونَ

Peringatan
Pembaca sering tanpa sadar mendengungkan mim sebelum و dan ف karena mudah. Sebabnya, makhraj م sama dengan و (dua bibir) dan dekat dengan ف (bibir dan gigi). Mim pada contoh berikut harus dibaca jelas.
Contoh: وَهُمْ فِيهَا، هُمْ وَأَزْوَاجُهُمْ، أَيْدِيهِمْ وَمَا خَلْفَهُمْ

Latihan ayat
106:4 | أَطْعَمَهُمْ مِنْ | idgham mimi
105:4 | تَرْمِيهِمْ بِحِجَارَةٍ | ikhfa syafawi
109:6 | لَكُمْ دِينُكُمْ | izhar syafawi
2:7 | قُلُوبِهِمْ وَعَلَىٰ | izhar syafawi sebelum و
2:25 | وَهُمْ فِيهَا | izhar syafawi sebelum ف

Praktik mushaf: 602
Baca halaman ini dan sebutkan hukum setiap mim sukun yang kamu temui.

Tugas mandiri: Cari 3 izhar syafawi sebelum و atau ف di Juz 30, lalu latih ketiganya sampai mim terbaca jelas.`
  },
  {
    slug: "review-nun-sukun-tanwin-dan-mim-sukun",
    title: "Review Tahap 2",
    arabicText: "النُّونُ السَّاكِنَةُ وَالتَّنْوِينُ وَالْمِيمُ السَّاكِنَةُ",
    summary: "Menerapkan semua hukum nun sukun, tanwin, dan mim sukun dalam satu bacaan.",
    content: `Materi
Tidak ada materi baru. Ulangi bagan hukum nun sukun, tanwin, dan mim sukun berikut sebelum berlatih.

Bagan hukum
• Izhar: nun sukun atau tanwin bertemu ء ه ع ح غ خ, dibaca jelas.
• Idgham bighunnah: bertemu ي ن م و, dilebur dengan dengung.
• Idgham bilaghunnah: bertemu ل ر, dilebur tanpa dengung.
• Iqlab: bertemu ب, berubah menjadi mim samar dengan dengung.
• Ikhfa: bertemu 15 huruf sisanya, disamarkan dengan dengung.
• Mim sukun: idgham mimi sebelum م, ikhfa syafawi sebelum ب, dan izhar syafawi sebelum huruf lainnya.

Latihan ayat
78:14 | مَاءً ثَجَّاجًا | ikhfa (tanwin + ث)
78:15 | حَبًّا وَنَبَاتًا | idgham bighunnah
78:16 | وَجَنَّاتٍ أَلْفَافًا | izhar
78:21 | إِنَّ جَهَنَّمَ | ghunnah tasydid
78:26 | جَزَاءً وِفَاقًا | idgham bighunnah

Praktik mushaf: 582
Baca halaman ini baris demi baris. Setelah setiap baris, sebutkan hukum nun dan mim yang muncul.

Tugas mandiri: Baca satu halaman penuh (halaman 582) tanpa terputus sebagai evaluasi tahap 2.`
  },

  // Tahap 3 — Mad
  {
    slug: "mad-thabii-iwadh-dan-badal",
    title: "Mad Thabi'i, 'Iwadh, dan Badal",
    arabicText: "الْمَدُّ الطَّبِيعِيُّ",
    summary: "Membaca panjang 2 harakat dengan konsisten di seluruh bacaan.",
    content: `Materi
Pengertian mad
Mad secara bahasa berarti tambahan atau memanjangkan. Secara istilah, mad adalah memanjangkan suara pada huruf mad atau lin melebihi mad asli karena ada sebab, yaitu hamzah atau sukun.

Huruf mad
Huruf mad ada 3, dengan syarat didahului harakat yang sejenis:
• Alif setelah fathah: قَالَ
• Wawu sukun setelah dhammah: يَقُولُ
• Ya sukun setelah kasrah: قِيلَ

Mad thabi'i
Mad thabi'i (mad asli) adalah mad yang tanpanya huruf tidak sempurna, dan tidak bergantung pada sebab hamzah atau sukun. Disebut thabi'i karena orang dengan naluri normal tidak akan mengurangi atau menambahnya dari 2 harakat.
Panjangnya: tepat 2 harakat untuk semua qari.

Mad 'iwadh
Tanwin fathah di akhir kata saat berhenti diganti alif, dibaca 2 harakat.
Contoh: عَلِيمًا ← عَلِيمَا · سَوَاءً ← سَوَاءَا
Catatan: tidak berlaku pada ta marbuthah, misalnya رَحْمَةً dibaca رَحْمَهْ.

Mad badal
Hamzah mendahului huruf mad dalam satu kata. Panjangnya 2 harakat dan termasuk thabi'i.
Contoh: آمَنُوا، أُوتُوا، إِيمَانًا، آدَمَ
Cara mudah: ketuk jari sekali untuk setiap harakat sampai panjangnya stabil, lalu lepaskan ketukan.

Latihan ayat
1:4 | مَالِكِ | thabi'i
106:1 | لِإِيلَافِ | thabi'i
103:3 | آمَنُوا | badal
110:2 | أَفْوَاجًا | 'iwadh saat berhenti
110:3 | تَوَّابًا | 'iwadh saat berhenti

Praktik mushaf: 603
Baca halaman ini sambil mengetuk jari, dan jaga agar setiap mad 2 harakat sama panjang.

Tugas mandiri: Baca Al-Fatihah sambil mengetuk jari, lalu ulangi tanpa ketukan dengan panjang yang sama.`
  },
  {
    slug: "mad-wajib-muttashil-dan-jaiz-munfashil",
    title: "Mad Wajib Muttashil & Jaiz Munfashil",
    arabicText: "الْمَدُّ الْمُتَّصِلُ وَالْمُنْفَصِلُ",
    summary: "Memanjangkan 4–5 harakat dengan ukuran yang sama dari awal sampai akhir bacaan.",
    content: `Materi
Dua mad karena hamzah
• Mad wajib muttashil: huruf mad diikuti hamzah dalam satu kata. Panjangnya 4 atau 5 harakat. Contoh: وَجَاءَ، سُوءَ الْعَذَابِ، هَنِيئًا، السَّمَاءِ
• Mad jaiz munfashil: huruf mad di akhir kata, hamzah di awal kata berikutnya. Panjangnya 4 atau 5 harakat. Contoh: إِنَّا أَعْطَيْنَاكَ، وَتُوبُوا إِلَى اللَّهِ، فِي أَنْفُسِكُمْ

Mengapa wajib dan jaiz
• Wajib: para qari sepakat memanjangkannya lebih dari 2 harakat.
• Jaiz: sebagian qari (di luar riwayat Hafs jalur Syathibiyyah) boleh membacanya pendek.
Penting: dalam satu bacaan, panjang muttashil dan munfashil disamakan. Kalau memilih 4, gunakan 4 untuk semuanya.

Tanda mad
Penanda di mushaf: tanda mad (~) di atas huruf mad diletakkan pada mad lazim, wajib muttashil, jaiz munfashil, dan shilah kubra, sebagai penanda bahwa mad ini lebih panjang dari thabi'i.

Latihan ayat
110:1 | إِذَا جَاءَ | muttashil
106:2 | الشِّتَاءِ | muttashil
108:1 | إِنَّا أَعْطَيْنَاكَ | munfashil
97:2 | وَمَا أَدْرَاكَ | munfashil
109:4 | وَلَا أَنَا | munfashil

Praktik mushaf: 587
Baca halaman ini dan jaga agar semua mad bertanda (~) sama panjang.

Tugas mandiri: Baca Al-Infithar dan jaga agar semua mad bertanda (~) sama panjang.`
  },
  {
    slug: "mad-aridh-lissukun-dan-mad-lin",
    title: "Mad 'Aridh Lissukun & Mad Lin",
    arabicText: "الْمَدُّ الْعَارِضُ لِلسُّكُونِ وَمَدُّ اللِّينِ",
    summary: "Memilih satu panjang untuk mad saat berhenti, lalu memakainya dengan konsisten.",
    content: `Materi
Mad 'aridh lissukun
Huruf mad diikuti huruf yang disukunkan karena berhenti.
Panjangnya: boleh 2, 4, atau 6 harakat.
Contoh: بِالْعِبَادِ، الْفَائِزُونَ، الْعَالَمِينَ
• Panjang ini hanya berlaku saat berhenti. Saat disambung, kembali menjadi mad thabi'i.
• Dianjurkan menyamakan panjangnya dalam satu bacaan. Jika memilih 4 harakat, pakai 4 sampai selesai.

Mad lin
• Sifat lin: huruf keluar dengan mudah tanpa beban di lidah. Hurufnya wawu dan ya sukun yang didahului fathah. Contoh: خَوْفٍ، يَوْمِ، الْبَيْتِ
• Mad lin: huruf lin diikuti huruf yang disukunkan karena berhenti. Panjangnya 2, 4, atau 6 harakat. Contoh: خَوْفْ، قُرَيْشْ، الْبَيْتْ
Penting: panjang mad lin dianjurkan sama dengan, atau tidak melebihi, mad 'aridh lissukun dalam bacaan yang sama.

Latihan ayat
1:2 | الْعَالَمِينَ | 'aridh lissukun
1:4 | الدِّينِ | 'aridh lissukun
106:1 | قُرَيْشٍ | lin
106:3 | الْبَيْتِ | lin
106:4 | خَوْفٍ | lin

Praktik mushaf: 2
Baca halaman ini dan perhatikan akhir ayat يُنْفِقُونَ، يُوقِنُونَ، الْمُفْلِحُونَ.

Tugas mandiri: Baca halaman 2 dua kali: sekali dengan mad 'aridh 2 harakat, sekali dengan 4 harakat.`
  },
  {
    slug: "mad-lazim",
    title: "Mad Lazim",
    arabicText: "الْمَدُّ اللَّازِمُ",
    summary: "Memanjangkan 6 harakat pada semua jenis mad lazim.",
    content: `Materi
Mad lazim adalah huruf mad yang diikuti huruf bersukun asli, yang tetap ada saat sambung maupun berhenti.
Panjangnya: 6 harakat untuk semua jenis dan semua qari.

Mad lazim kalimi (dalam kata)
• Mutsaqqal: setelah huruf mad ada huruf bertasydid. Tidak ada contohnya dengan huruf ya dalam Al-Qur'an. Contoh: الضَّالِّينَ، أَتُحَاجُّونِّي، آللَّهُ، آلذَّكَرَيْنِ
• Mukhaffaf: setelah huruf mad ada sukun tanpa tasydid. Hanya ada di آلْآنَ, di 2 tempat (Yunus 51 dan 91).

Mad lazim harfi (huruf pembuka surat)
Terjadi pada huruf muqaththa'ah yang ejaannya 3 huruf dengan huruf tengahnya huruf mad. Hurufnya 7, terhimpun dalam سَنَقُصُّ لَكُمْ.
• Mutsaqqal: huruf ketiganya dilebur ke huruf sesudahnya. Misalnya لام pada الم dibaca "alif laam-miim", dan سين pada طسم dibaca "thaa siin-miim".
• Mukhaffaf: huruf ketiganya sukun tanpa dilebur. Misalnya ص dibaca "shaad", dan ن dibaca "nuun".
• Ejaan 2 huruf: huruf pembuka ح ي ط ه ر (terhimpun dalam حَيٌّ طَهُرَ) dibaca 2 harakat, misalnya ط pada طه.
Catatan: huruf alif pada الم tidak dipanjangkan sama sekali.

Latihan ayat
1:7 | الضَّالِّينَ | kalimi mutsaqqal
69:1 | الْحَاقَّةُ | kalimi mutsaqqal
10:51 | آلْآنَ | kalimi mukhaffaf
2:1 | الم | harfi mutsaqqal dan mukhaffaf
68:1 | ن | harfi mukhaffaf

Praktik mushaf: 566
Baca halaman ini dan jaga setiap mad lazim tetap 6 harakat.

Tugas mandiri: Latih pembukaan Al-Baqarah (الم), Maryam (كهيعص), dan Asy-Syu'ara (طسم).`
  },
  {
    slug: "mad-shilah-dan-ujian-tahap-3",
    title: "Mad Shilah & Ujian Tahap 3",
    arabicText: "مَدُّ الصِّلَةِ",
    summary: "Menerapkan mad shilah dan semua jenis mad dalam satu bacaan panjang.",
    content: `Materi
Ha' dhamir
• Ha' dhamir (ha' kinayah): huruf ha' tambahan yang berarti "dia" untuk laki-laki tunggal, seperti pada رَبَّهُۥ dan بِهِۦ.
• Mad shilah terjadi jika ha' dhamir berada di antara dua huruf berharakat.

Shilah sughra
Setelah ha' bukan hamzah. Panjangnya 2 harakat, termasuk mad thabi'i.
Contoh: بَلَىٰ إِنَّ رَبَّهُۥ كَانَ بِهِۦ بَصِيرًا
Penanda di mushaf: wawu kecil setelah dhammah, atau ya kecil setelah kasrah.

Shilah kubra
Setelah ha' ada hamzah. Panjangnya 4–5 harakat, sama dengan munfashil.
Contoh: يَحْسَبُ أَنَّ مَالَهُۥٓ أَخْلَدَهُۥ · وَمَا يُكَذِّبُ بِهِۦٓ إِلَّا
Penanda di mushaf: wawu atau ya kecil dengan tanda mad.

Saat berhenti dan pengecualian
• Mad shilah hanya berlaku saat sambung. Saat berhenti di ha' dhamir, shilah hilang dan ha' dibaca sukun.
• Jika sebelum ha' ada huruf sukun, ha' dibaca pendek. Contoh: عَلَيْهِ، مِنْهُ
• Pengecualian dalam riwayat Hafs: فِيهِۦ مُهَانًا (Al-Furqan 69) tetap dipanjangkan.

Latihan ayat
86:8 | إِنَّهُ عَلَىٰ | shilah sughra
84:15 | رَبَّهُ كَانَ بِهِ بَصِيرًا | shilah sughra
104:3 | مَالَهُ أَخْلَدَهُ | shilah kubra
90:5 | عَلَيْهِ أَحَدٌ | bukan shilah (ha' setelah ya sukun)
90:7 | يَرَهُ أَحَدٌ | shilah kubra

Praktik mushaf: 562
Ini ujian tahap 3. Baca halaman ini dengan semua jenis mad yang sudah dipelajari.

Tugas mandiri: Baca Al-Mulk 1–12, lalu nilai sendiri bagian mad-nya.`
  },

  // Tahap 4 — Tebal-tipis, qalqalah, ra & lam
  {
    slug: "qalqalah",
    title: "Qalqalah",
    arabicText: "الْقَلْقَلَةُ\nقُطْبُ جَدٍّ",
    summary: "Memantulkan ق ط ب ج د yang bersukun dengan jelas, tanpa berubah menjadi vokal.",
    content: `Materi
Pengertian qalqalah
• Qalqalah: getaran pada makhraj saat huruf diucapkan dalam keadaan sukun, sehingga terdengar pantulan yang kuat.
• Hurufnya: 5 huruf ق ط ب ج د, terhimpun dalam قُطْبُ جَدٍّ
• Kelima huruf ini bersifat syiddah dan jahr, sehingga suara dan napasnya tertahan. Pantulan inilah yang membuat hurufnya tetap terdengar.

Tingkatan qalqalah
• Qalqalah sughra: sukunnya asli, di tengah kata atau di akhir kata saat sambung. Contoh: يَطْبَعُ، لَمْ يَلِدْ وَلَمْ
• Qalqalah kubra: sukunnya karena berhenti di akhir kata. Pantulannya lebih jelas. Contoh: الْفَلَقْ، الْحَقّْ
• Pantulan paling kuat: huruf qalqalah bertasydid di akhir kata saat berhenti. Contoh: وَتَبّْ
Penting: pantulan jangan diberi vokal (أَحَدْ menjadi "ahadu" atau "ahade"), dan huruf qalqalah jangan dibaca mati tanpa pantulan sama sekali.

Latihan ayat
113:1 | الْفَلَقِ | kubra saat berhenti
113:3 | إِذَا وَقَبَ | kubra saat berhenti
111:1 | تَبَّتْ … وَتَبَّ | ب bertasydid saat berhenti, pantulan paling kuat
112:3 | لَمْ يَلِدْ وَلَمْ يُولَدْ | sughra lalu kubra
85:1 | الْبُرُوجِ | kubra saat berhenti

Praktik mushaf: 590
Hampir semua akhir ayat di halaman ini berakhir dengan huruf qalqalah. Jaga pantulannya jelas tanpa menambah vokal.

Tugas mandiri: Baca Al-Buruj ayat 1–10 dan jaga pantulan setiap qalqalah.`
  },
  {
    slug: "huruf-tebal-dan-alif",
    title: "Huruf Tebal & Alif",
    arabicText: "التَّفْخِيمُ وَالتَّرْقِيقُ\nخُصَّ ضَغْطٍ قِظْ",
    summary: "Membaca huruf isti'la selalu tebal, dan menjaga huruf lain tetap tipis meski berdekatan.",
    content: `Materi
Tebal dan tipis
• Tafkhim (tebal): penebalan pada huruf sehingga mulut terasa penuh dengan gema hurufnya.
• Tarqiq (tipis): kebalikannya, mulut tidak dipenuhi gema huruf.

Dua pasang sifat dasar
• Isti'la: pangkal lidah terangkat ke langit-langit, suara ikut terangkat. Hurufnya 7, terhimpun dalam خُصَّ ضَغْطٍ قِظْ
• Istifal: pangkal lidah turun ke dasar mulut, yaitu 22 huruf lainnya.
• Ithbaq: sebagian lidah menempel ke langit-langit sehingga suara terkurung di antaranya. Hurufnya 4: ص ض ط ظ
• Infitah: ada celah antara lidah dan langit-langit, yaitu huruf lainnya.

Pembagian huruf
• Selalu tebal: 7 huruf isti'la, tanpa kecuali, baik berharakat maupun sukun, berdekatan dengan huruf tipis atau tidak. Huruf ithbaq paling tebal.
• Kadang tebal, kadang tipis: alif, lam pada lafzh Allah, dan ra. Ghunnah juga bisa tebal pada ikhfa sebelum huruf tebal.
• Selalu tipis: huruf istifal lainnya.

Alif mengikuti huruf sebelumnya
• Tebal setelah huruf tebal: قَالُوا، الضَّالِّينَ، الْعِظَامِ
• Tipis setelah huruf tipis: إِيَّاكَ، النَّاسِ، شَاءَ

Latihan ayat
1:6 | الصِّرَاطَ الْمُسْتَقِيمَ | ص ط ق tebal, س ت tipis
1:7 | غَيْرِ الْمَغْضُوبِ | غ ض tebal
105:3 | طَيْرًا | ط tebal, huruf sesudahnya tidak ikut tebal
86:4 | حَافِظٌ | ح tipis dan alif setelahnya tipis, ظ tebal
88:17 | يَنْظُرُونَ … خُلِقَتْ | ظ dan خ tebal, ل tetap tipis

Praktik mushaf: 593
Baca halaman ini dengan fokus hanya pada tebal-tipis huruf.

Tugas mandiri: Baca Al-Fatihah dengan fokus hanya pada tebal-tipis.`
  },
  {
    slug: "hukum-ra-tebal-dan-tipis",
    title: "Hukum Ra",
    arabicText: "أَحْكَامُ الرَّاءِ",
    summary: "Menentukan ra tebal atau tipis dari harakatnya dan huruf di sekitarnya.",
    content: `Materi
Sifat ra
• Takrir: ujung lidah cenderung bergetar. Yang diajarkan adalah menahan getaran itu, bukan membuatnya.
• Inhiraf: suara berbelok karena terhalang lidah. Sifat ini juga dimiliki ل.

Ra tebal dalam 8 keadaan
1. Berharakat fathah: رَمَضَانَ
2. Sukun setelah fathah: مَرْيَمَ
3. Sukun, sebelumnya sukun (bukan ya), lalu fathah: وَالْفَجْرْ saat waqaf.
4. Berharakat dhammah: رُزِقُوا
5. Sukun setelah dhammah: الْقُرْآنُ
6. Sukun, sebelumnya sukun, lalu dhammah: خُسْرْ saat waqaf.
7. Sukun setelah kasrah, diikuti huruf isti'la yang tidak berkasrah dalam satu kata. Hanya di 5 kata: قِرْطَاسٍ، إِرْصَادًا، مِرْصَادًا، لَبِالْمِرْصَادِ، فِرْقَةٍ
8. Sukun setelah kasrah yang tidak asli, yaitu setelah hamzah washal: ارْجِعُوا، أَمِ ارْتَابُوا

Ra tipis dalam 4 keadaan
1. Berharakat kasrah: رِجَالٌ
2. Sukun setelah kasrah asli, tanpa huruf isti'la sesudahnya: فِرْعَوْنَ
3. Sukun, sebelumnya sukun, lalu kasrah: حِجْرْ saat waqaf.
4. Sukun setelah ya sukun: خَيْرْ، بَصِيرْ saat waqaf.

Boleh tebal atau tipis
• فِرْقٍ (Asy-Syu'ara 63): boleh keduanya saat sambung, karena huruf isti'la sesudahnya berkasrah. Saat berhenti, dibaca tebal.
• مِصْرَ dan الْقِطْرِ (Saba 12): boleh keduanya saat berhenti. Imam Ibnul Jazari memilih tebal pada مِصْرْ dan tipis pada الْقِطْرْ, mengikuti keadaannya saat disambung.

Latihan ayat
89:1 | وَالْفَجْرِ | tebal saat berhenti (sukun, sebelumnya sukun lalu fathah)
89:14 | لَبِالْمِرْصَادِ | tebal (setelahnya ص)
89:28 | ارْجِعِي | tebal (setelah hamzah washal)
85:18 | فِرْعَوْنَ | tipis (sukun setelah kasrah)
26:63 | كُلُّ فِرْقٍ كَالطَّوْدِ | boleh tebal atau tipis

Praktik mushaf: 594
Baca halaman ini dan tentukan tebal atau tipis setiap ra yang kamu temui.

Tugas mandiri: Tandai setiap ra di halaman 594 dengan T (tebal) atau t (tipis) beserta alasannya.`
  },
  {
    slug: "lam-tarif-dan-lafzh-jalalah",
    title: "Lam Ta'rif & Lam Lafzh Jalalah",
    arabicText: "لَامُ التَّعْرِيفِ وَلَفْظُ الْجَلَالَةِ",
    summary: "Membedakan alif lam yang dibaca jelas dan yang dilebur, serta tebal-tipis lam pada lafzh Allah.",
    content: `Materi
Lam ta'rif
Lam ta'rif adalah lam sukun tambahan (bukan bagian asli kata), didahului hamzah washal yang dibaca fathah saat memulai, dan diikuti isim.
• Lam qamariyah: dibaca jelas (izhar). Hurufnya 14, terhimpun dalam ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ. Tanda mushaf: lam diberi sukun. Contoh: الْأَمَلُ، الْجَنَّةِ، الْكَهْفِ، الْقَمَرُ، الْهُدَىٰ
• Lam syamsiyah: dilebur ke huruf sesudahnya (idgham). Hurufnya 14, terhimpun pada huruf awal bait طِبْ ثُمَّ صِلْ رَحِمًا تَفُزْ ضِفْ ذَا نِعَمْ ۞ دَعْ سُوءَ ظَنٍّ زُرْ شَرِيفًا لِلْكَرَمْ. Tanda mushaf: lam tanpa sukun, huruf sesudahnya bertasydid. Contoh: الطَّيِّبَاتُ، الصَّالِحِينَ، النَّعِيمِ، الشَّكُورُ

Lam lafzh jalalah tebal dalam 5 keadaan
1. Di awal bacaan: اللَّهُ لَا إِلَٰهَ
2. Setelah fathah: عِبَادَ اللَّهِ
3. Setelah sukun yang didahului fathah: وَإِلَى اللَّهِ
4. Setelah dhammah: عَبْدُ اللَّهِ
5. Setelah sukun yang didahului dhammah: قَالُوا اللَّهُمَّ

Lam lafzh jalalah tipis dalam 3 keadaan
1. Setelah kasrah: بِسْمِ اللَّهِ
2. Setelah sukun yang didahului kasrah: وَيُنَجِّي اللَّهُ
3. Setelah tanwin: قَوْمًا اللَّهُ
Catatan: lam pada kata selain lafzh Allah selalu tipis, seperti فَلْيَعْبُدُوا، لِرَبِّكَ، أَنْزَلْنَاهُ.

Latihan ayat
1:1 | بِسْمِ اللَّهِ | tipis (setelah kasrah)
112:1 | قُلْ هُوَ اللَّهُ | tebal (setelah fathah)
112:2 | اللَّهُ الصَّمَدُ | tebal jika memulai; tipis jika disambung dari أَحَدٌ (tanwin)
104:6 | نَارُ اللَّهِ | tebal (setelah dhammah)
110:2 | دِينِ اللَّهِ | tipis (setelah kasrah)

Praktik mushaf: 589
Baca halaman ini dan tandai setiap alif lam qamariyah dan syamsiyah.

Tugas mandiri: Baca Al-Ikhlas dua kali: sekali berhenti di akhir ayat 1, sekali disambung.`
  },
  {
    slug: "idgham-dua-huruf-dan-ujian-tahap-4",
    title: "Idgham Dua Huruf & Ujian Tahap 4",
    arabicText: "الْمِثْلَانِ وَالْمُتَجَانِسَانِ وَالْمُتَقَارِبَانِ",
    summary: "Mengenali huruf sukun yang dilebur ke huruf sesudahnya, lalu ujian tahap 4.",
    content: `Materi
Tiga jenis idgham dua huruf
• Mutamatsilain: dua huruf yang sama. Contoh: رَبِحَت تِّجَارَتُهُمْ
• Mutajanisain: makhraj sama, sifat berbeda. Contoh: قَد تَّبَيَّنَ، ارْكَب مَّعَنَا
• Mutaqaribain: makhraj dan sifat berdekatan. Contoh: أَلَمْ نَخْلُقكُّمْ

Latihan ayat
2:16 | رَبِحَتْ تِجَارَتُهُمْ | mutamatsilain
2:60 | اضْرِبْ بِعَصَاكَ | mutamatsilain
2:256 | قَدْ تَبَيَّنَ | mutajanisain
11:42 | ارْكَبْ مَعَنَا | mutajanisain
77:20 | أَلَمْ نَخْلُقْكُمْ | mutaqaribain

Praktik mushaf: 584
Ini ujian tahap 4. Baca satu halaman penuh dengan semua hukum yang sudah dipelajari.

Tugas mandiri: Baca halaman 584, lalu nilai sendiri dengan bagan hukum tahap 1–4.`
  },

  // Tahap 5 — Waqaf, ibtida, isti'adzah, gharib & ujian
  {
    slug: "jenis-jenis-waqaf",
    title: "Jenis-Jenis Waqaf",
    arabicText: "الْوَقْفُ",
    summary: "Berhenti di tempat yang menjaga makna ayat.",
    content: `Materi
Waqaf adalah memutus suara di akhir kata sejenak untuk mengambil napas, dengan niat melanjutkan bacaan.

Jenis waqaf dilihat dari sebabnya
1. Idhthirari (darurat): berhenti karena habis napas, batuk, bersin, atau halangan lain. Boleh di kata mana saja, lalu ulangi dari tempat yang tepat.
2. Ikhtibari (ujian): guru meminta murid berhenti di kata tertentu untuk menguji bacaannya. Boleh untuk pengajaran.
3. Intizhari (menunggu): dilakukan orang yang menggabungkan beberapa qira'at di hadapan guru. Boleh selama tidak merusak makna.
4. Ikhtiyari (pilihan): berhenti atas pilihan sendiri tanpa keadaan mendesak. Jenis ini terbagi empat menurut maknanya.

Waqaf ikhtiyari menurut maknanya
• Waqaf tam: makna sudah sempurna dan tidak berkaitan dengan sesudahnya, baik lafaz maupun makna. Biasanya di akhir ayat atau akhir kisah. Dianjurkan berhenti dan memulai dari sesudahnya, misalnya di akhir Al-Fatihah 4 dan Al-Baqarah 5.
• Waqaf kafi: makna sudah benar dan cukup, berkaitan dengan sesudahnya hanya dari sisi makna. Dianjurkan berhenti dan baik memulai dari sesudahnya, misalnya di akhir Al-Baqarah 4 dan pada إِبْرَاهِيمَ di Maryam 41.
• Waqaf hasan: makna sudah dipahami, tetapi berkaitan dengan sesudahnya secara lafaz dan makna. Boleh berhenti, tetapi tidak dianjurkan memulai dari kata sesudahnya, kecuali di akhir ayat karena berhenti di akhir ayat adalah sunnah. Contoh: الْحَمْدُ لِلَّهِ
• Waqaf qabih: makna belum selesai, kurang, atau rusak. Tidak boleh disengaja; jika terpaksa, ulangi dari kata sebelumnya.

Bentuk waqaf qabih
• Makna tidak dipahami: berhenti di الْحَمْدُ
• Makna tidak sesuai maksud ayat: berhenti di لَا تَقْرَبُوا الصَّلَاةَ
• Makna tidak layak bagi Allah: berhenti di فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ

Latihan ayat
1:2 | الْعَالَمِينَ | hasan: akhir ayat, boleh memulai lagi dari ayat 3
2:4 | يُوقِنُونَ | kafi
2:5 | الْمُفْلِحُونَ | tam
4:43 | لَا تَقْرَبُوا الصَّلَاةَ | qabih: maknanya berubah jika berhenti di sini
47:19 | فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ | qabih: maknanya berubah jika berhenti di sini

Praktik mushaf: 2
Baca halaman ini dan berhenti di kata yang kamu pilih, lalu tentukan dari mana bacaan harus dimulai lagi.

Tugas mandiri: Baca halaman 2 dan tandai 3 tempat berhenti yang baik di tengah ayat.`
  },
  {
    slug: "tanda-waqaf-dan-ibtida",
    title: "Tanda Waqaf & Ibtida",
    arabicText: "عَلَامَاتُ الْوَقْفِ وَالِابْتِدَاءُ",
    summary: "Membaca tanda waqaf di mushaf dan memulai bacaan lagi dengan benar.",
    content: `Materi
Tanda waqaf di mushaf
مـ (lazim): wajib berhenti, karena menyambung bisa mengubah makna.
لا (jangan berhenti): maknanya belum sempurna.
ج (boleh keduanya): boleh berhenti, boleh sambung.
قلى (berhenti lebih utama): boleh sambung, tetapi berhenti lebih utama.
صلى (sambung lebih utama): boleh berhenti, tetapi sambung lebih utama.
∴ (mu'anaqah): dua tanda saling terkait. Jika berhenti di salah satunya, jangan berhenti di yang lain. Boleh juga tidak berhenti di keduanya.

Ibtida (memulai)
• Ibtida setelah berhenti harus dari kata yang maknanya utuh, bukan dari tengah frasa.
• Memulai dari hamzah washal: hamzah dibaca berharakat. Pada alif lam dibaca fathah, misalnya الْحَمْدُ dimulai dengan "al-".
• Memulai dari kata bertasydid karena idgham: tasydid dilepas dan dibaca tanpa ghunnah tambahan, karena idgham hanya terjadi saat disambung. Misalnya مَالٍ pada مِن مَّالٍ, dan نُعَمِّرْهُ pada وَمَن نُّعَمِّرْهُ.

Latihan ayat
6:36 | يَسْمَعُونَ ۘ | مـ: wajib berhenti
39:33 | وَصَدَّقَ بِهِ ۙ | لا: sambung
10:65 | قَوْلُهُمْ | ج: boleh berhenti atau sambung
2:191 | فَاقْتُلُوهُمْ ۗ | قلى: berhenti lebih utama
2:2 | لَا رَيْبَ ۛ فِيهِ ۛ | ∴: berhenti di salah satunya saja

Praktik mushaf: 3
Baca halaman ini dan ikuti setiap tanda waqaf yang ada.

Tugas mandiri: Baca Al-Baqarah ayat 2 dengan dua cara berhenti yang boleh.`
  },
  {
    slug: "istiadzah-dan-basmalah",
    title: "Isti'adzah & Basmalah",
    arabicText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ\nبِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    summary: "Memulai bacaan dan menyambung dua surat dengan cara yang benar.",
    content: `Materi
Isti'adzah
Isti'adzah secara bahasa berarti memohon perlindungan, berpegang teguh, dan membentengi diri. Secara istilah, isti'adzah adalah lafaz untuk memohon perlindungan kepada Allah dari setan yang terkutuk sebelum membaca Al-Qur'an, berdasarkan An-Nahl 98.
Lafal yang umum dipakai: أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ
Hukumnya mustahab (dianjurkan) menurut mayoritas ulama qira'at dan fiqih, baik memulai dari awal maupun tengah surat.

Isti'adzah dan awal surat
Ada 4 cara yang boleh (kecuali At-Taubah):
① Putus semua: isti'adzah – berhenti – basmalah – berhenti – awal surat.
② Isti'adzah sambung basmalah: isti'adzah – basmalah – berhenti – awal surat.
③ Basmalah sambung surat: isti'adzah – berhenti – basmalah – awal surat.
④ Sambung semua: isti'adzah – basmalah – awal surat.

Hukum basmalah
• Di awal surat: wajib dibaca, kecuali At-Taubah.
• Di tengah surat: boleh dibaca atau tidak, dan membacanya lebih utama. Sebagian ulama melarang membacanya di tengah At-Taubah, disamakan dengan awalnya.

Basmalah di antara dua surat
Ada 3 cara yang boleh:
① Putus semua: akhir surat – berhenti – basmalah – berhenti – awal surat.
② Sambung semua: akhir surat – basmalah – awal surat.
③ Basmalah sambung surat: akhir surat – berhenti – basmalah – awal surat.
Cara yang tidak boleh:
① Basmalah ikut akhir surat: akhir surat – basmalah – berhenti – awal surat.
Penting: dengan cara terlarang ini pendengar bisa mengira basmalah adalah ayat terakhir surat sebelumnya, padahal basmalah adalah pembuka surat.

Latihan ayat
16:98 | فَاسْتَعِذْ بِاللَّهِ | dalil isti'adzah
94:1 | أَلَمْ نَشْرَحْ | latihan 4 cara memulai surat
111:5 | مِنْ مَسَدٍ ← قُلْ هُوَ | Al-Lahab 5 ke Al-Ikhlas 1: latihan 3 cara yang boleh
9:1 | بَرَاءَةٌ | dimulai tanpa basmalah
114:1 | قُلْ أَعُوذُ | isti'adzah lalu basmalah

Praktik mushaf: 603–604
Baca dari Al-Lahab sampai An-Nas. Pakai cara yang berbeda di setiap pergantian surat.

Tugas mandiri: Baca Al-Ikhlas sampai An-Nas dengan basmalah di antara surat, memakai cara yang berbeda di setiap pergantian.`
  },
  {
    slug: "bacaan-gharib-riwayat-hafs",
    title: "Bacaan Gharib Riwayat Hafs",
    arabicText: "الْغَرِيبُ فِي رِوَايَةِ حَفْصٍ",
    summary: "Membaca tempat-tempat khusus yang tidak mengikuti kaidah umum.",
    content: `Materi
Bacaan gharib adalah tempat-tempat khusus dalam riwayat Hafs yang tidak mengikuti kaidah umum.

Empat bacaan khusus
• Imalah: fathah dimiringkan ke kasrah. Hanya di مَجْر۪اهَا (Hud 41).
• Isymam: bibir dimonyongkan saat dengung, di لَا تَأْمَ۫نَّا (Yusuf 11).
• Tashil: hamzah kedua dibaca ringan, di ءَا۬عْجَمِيٌّ (Fussilat 44).
• Saktah: berhenti sejenak tanpa mengambil napas, di 4 tempat: Al-Kahf 1, Yasin 52, Al-Qiyamah 27, dan Al-Muthaffifin 14.

Latihan ayat
11:41 | مَجْر۪اهَا | imalah
12:11 | لَا تَأْمَ۫نَّا | isymam
41:44 | ءَا۬عْجَمِيٌّ | tashil
18:1 | عِوَجَا ۜ | saktah
83:14 | بَلْ ۜ رَانَ | saktah (lam tidak dilebur ke ra)

Praktik mushaf: 588
Baca halaman ini dan jaga saktah pada بَلْ ۜ رَانَ.

Tugas mandiri: Latih kelima ayat latihan sampai lancar, terutama saktah, isymam, dan imalah.`
  },
  {
    slug: "praktik-mengajar",
    title: "Praktik Mengajar",
    arabicText: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ",
    summary: "Menjelaskan satu hukum tajwid kepada orang lain seperti seorang pengajar.",
    content: `Materi
Tidak ada materi baru. Pilih satu hukum tajwid yang sudah dipelajari, seminggu sebelumnya.

Latihan ayat
Siapkan 5 ayat contoh sendiri untuk hukum yang akan kamu ajarkan. Pastikan setiap contoh benar-benar memuat hukum itu.

Praktik mushaf: 583
Ajarkan hukum pilihanmu memakai halaman ini: tunjukkan contohnya, bacakan, lalu jelaskan alasannya.

Tugas mandiri: Latihan bebas untuk persiapan ujian akhir.`
  },
  {
    slug: "ujian-akhir",
    title: "Ujian Akhir",
    arabicText: "الِاخْتِبَارُ النِّهَائِيُّ",
    summary: "Memastikan bacaan sudah benar dan hukum-hukumnya dipahami.",
    content: `Bentuk ujian
① Undi 1 halaman dari Juz 30 (halaman 582–604).
② Baca halaman itu dengan isti'adzah dan basmalah.
③ Jawab 5 pertanyaan hukum dari ayat yang baru dibaca.

Kriteria lulus
• Tidak ada kesalahan jali sama sekali.
• Paling banyak 3 kesalahan khafi per halaman.
• Mampu menjelaskan hukum dari bacaan sendiri.

Catatan: yang belum lulus mengulang tahap yang masih lemah di gelombang berikutnya.

Praktik mushaf: 582–604
Pilih satu halaman secara acak dari Juz 30 untuk latihan ujian.

Tugas mandiri: Latih satu halaman acak dari Juz 30 setiap hari sampai hari ujian.`
  }
];

export const lessons: Lesson[] = meetings.map((meeting, i) => ({
  ...meeting,
  category: "tajwid",
  position: (i + 1) * 10,
  content: `${meeting.content}

${source}`
}));
