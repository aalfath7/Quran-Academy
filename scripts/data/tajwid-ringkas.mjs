// Materi dasar tajwid (level satu), disarikan dari kitab "Tajwid Ringkas Disertai Warna, Gambar, dan Bagan"
// Level Satu karya Husein Karim Muhammad (edisi bahasa Indonesia, terjemahan Ustadzah Ana Fi Naimatin).
// Paragraf dipisah baris kosong; halaman materi merender baris baru apa adanya.
// Baris rujukan ditambahkan di akhir setiap materi, seperti pada seri Al-Jazariyah.

const source =
  'Rujukan: Kitab "Tajwid Ringkas Disertai Warna, Gambar, dan Bagan" Level Satu, Husein Karim Muhammad (edisi bahasa Indonesia, terjemahan Ustadzah Ana Fi Naimatin).';

const materi = [
  {
    slug: "keutamaan-membaca-al-quran",
    title: "Keutamaan Membaca Al-Qur'an",
    category: "tajwid",
    position: 5,
    summary: "Tilawah Al-Qur'an termasuk ibadah yang paling utama. Berikut dalil-dalil dari Al-Qur'an dan hadits yang menunjukkan besarnya pahala membaca dan mempelajarinya.",
    arabicText: "فَضْلُ تِلَاوَةِ الْقُرْآنِ الْكَرِيمِ\nوَاتْلُ مَا أُوحِيَ إِلَيْكَ مِنْ كِتَابِ رَبِّكَ",
    content: `Membaca Al-Qur'an bukan sekadar aktivitas membaca. Ia adalah ibadah yang mendekatkan seorang hamba kepada Allah. Karena itu, Allah memerintahkannya di banyak tempat dalam Al-Qur'an, misalnya:
• "Bacakanlah apa yang telah diwahyukan kepadamu dari Kitab Tuhanmu." (Al-Kahf: 27)
• "Bacalah bagian Al-Qur'an yang mudah bagimu." (Al-Muzzammil: 20)
• Perintah kepada Nabi ﷺ untuk menyembah Allah, termasuk golongan muslim, dan membacakan Al-Qur'an. (An-Naml: 91–92)

Hadits-hadits Nabi ﷺ juga menegaskan keutamaannya:

1. Setiap huruf bernilai pahala. Siapa yang membaca satu huruf dari Al-Qur'an mendapat satu kebaikan, dan setiap kebaikan dilipatgandakan sepuluh kali. Nabi ﷺ menjelaskan bahwa "alif lam mim" bukan satu huruf, melainkan alif satu huruf, lam satu huruf, dan mim satu huruf. (HR. At-Tirmidzi)

2. Orang terbaik adalah yang mempelajari Al-Qur'an lalu mengajarkannya. (HR. Al-Bukhari, dari Utsman bin Affan radhiyallahu 'anhu)

3. Pembaca yang sudah mahir akan bersama para malaikat yang mulia. Pembaca yang masih terbata-bata dan merasa berat tetap mendapat dua pahala, yaitu pahala membaca dan pahala kesungguhannya. (Muttafaqun 'alaih, dari Aisyah radhiyallahu 'anha)

4. Nabi ﷺ pernah bertanya kepada para sahabat di shuffah, siapa yang mau setiap pagi pergi ke Buthan atau 'Aqiq dan pulang membawa dua unta gemuk tanpa berbuat dosa. Ketika mereka semua menginginkannya, beliau menjelaskan bahwa belajar atau membaca dua ayat Al-Qur'an di masjid lebih baik daripada dua unta, tiga ayat lebih baik daripada tiga unta, dan begitu seterusnya. (HR. Muslim, dari Uqbah bin Amir)`
  },
  {
    slug: "definisi-ilmu-tajwid",
    title: "Definisi Ilmu Tajwid",
    category: "tajwid",
    position: 10,
    summary: "Apa itu tajwid, apa hukum mempelajari dan mempraktikkannya, dan apa manfaatnya bagi seorang pembaca Al-Qur'an.",
    arabicText: "تَعْرِيفُ عِلْمِ التَّجْوِيدِ",
    content: `Kata tajwid secara bahasa bermakna memperbagus atau memperindah.

Dalam istilah ulama qira'at, tajwid adalah ilmu yang mengajarkan cara mengucapkan setiap huruf dengan benar: dari makhraj yang tepat, dengan sifat-sifatnya, serta mengetahui di mana boleh berhenti (waqaf) dan dari mana memulai (ibtida'). Semua itu dilakukan secara wajar, tidak dilebih-lebihkan dan tidak pula disepelekan.

Pembahasan tajwid mencakup dua hal:
• Hak huruf: sifat bawaan yang selalu melekat pada huruf dan tidak pernah lepas darinya, contohnya jahr dan syiddah.
• Mustahak huruf: sifat yang muncul hanya pada keadaan tertentu sebagai akibat dari sifat bawaan, contohnya idgham, ikhfa, dan izhhar.

Hukum tajwid dibedakan menjadi dua sisi:
• Teori (an-nazhari), yaitu mempelajari kaidah-kaidahnya secara ilmiah. Hukumnya fardhu kifayah, cukup jika sebagian umat menguasainya.
• Praktik (al-'amali), yaitu menerapkan kaidah tersebut setiap kali membaca Al-Qur'an. Hukumnya fardhu 'ain, wajib bagi setiap muslim.

Faedah mempelajari tajwid:
• Lisan terjaga dari kesalahan (lahn) saat membaca Kalamullah.
• Menjadi jalan untuk meraih ridha Allah.`
  },
  {
    slug: "lahn-kesalahan-membaca-al-quran",
    title: "Lahn: Kesalahan dalam Membaca Al-Qur'an",
    category: "tajwid",
    position: 20,
    summary: "Kesalahan bacaan (lahn) ada dua tingkat: lahn jaly yang tampak jelas dan lahn khafy yang tersembunyi. Pelajari bentuk dan hukum masing-masing.",
    arabicText: "اللَّحْنُ فِي تِلَاوَةِ الْقُرْآنِ الْكَرِيمِ",
    content: `Lahn secara bahasa bermakna melenceng dari yang benar. Dalam konteks tilawah, lahn adalah kekeliruan saat membaca Al-Qur'an sehingga bacaannya tidak lagi sesuai dengan yang seharusnya.

Para ulama membagi lahn menjadi dua tingkatan: lahn jaly dan lahn khafy.

1. Lahn Jaly (Kesalahan yang Jelas)
Kesalahan ini mengenai bentuk kata itu sendiri, entah sampai mengubah arti atau tidak. Dinamakan jaly karena siapa pun bisa menyadarinya, baik ahli Al-Qur'an maupun orang awam.

Hukumnya haram. Pembaca berdosa jika melakukannya dengan sengaja, atau jika ia membiarkan dirinya tidak belajar padahal mampu.

Beberapa bentuk lahn jaly:
① Huruf tertukar dengan huruf lain, misalnya ح pada الْحَمْدُ لِلَّهِ dibaca seperti هـ.
② Harakat tertukar, misalnya ta pada أَنْعَمْتَ dibaca kasrah padahal fathah.
③ Huruf berharakat dibaca mati, misalnya ra berdhammah pada قَالَ سَنَنْظُرُ dibaca sukun ketika bacaan disambung.
④ Huruf mati diberi harakat, misalnya mim sukun pada أَنْعَمْتَ dibaca fathah.
⑤ Menambahkan huruf atau kata yang tidak ada.

2. Lahn Khafy (Kesalahan yang Tersembunyi)
Kesalahan ini tidak merusak bentuk kata, tetapi mengurangi kesempurnaan bacaan. Contohnya panjang mad yang tidak pas, ghunnah yang kurang atau berlebih, atau lam dan ra yang tidak ditebalkan atau ditipiskan sebagaimana mestinya. Dinamakan khafy karena umumnya hanya disadari oleh orang yang mempelajari ilmu tajwid.

Sebagian ulama menghukuminya makruh. Sebagian lain menganggapnya haram karena tetap menyimpang dari kaidah bacaan yang benar.`
  },
  {
    slug: "istiadzah",
    title: "Isti'adzah (Memohon Perlindungan)",
    category: "tajwid",
    position: 30,
    summary: "Isti'adzah dibaca sebelum tilawah untuk berlindung kepada Allah dari setan. Kenali hukumnya dan empat cara menyambungkannya dengan basmalah dan awal surat.",
    arabicText: "أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ",
    content: `Sebelum mulai membaca Al-Qur'an, baik dari awal surat maupun dari tengahnya, seorang qari' membuka bacaannya dengan isti'adzah. Dasarnya adalah firman Allah dalam surat An-Nahl ayat 98, yang memerintahkan agar setiap kali hendak membaca Al-Qur'an kita berlindung kepada Allah dari setan yang terkutuk.

Kata isti'adzah berarti meminta perlindungan, berpegang, dan membentengi diri. Dalam ilmu tajwid, isti'adzah adalah lafal yang diucapkan qari' untuk berlindung kepada Allah dari gangguan setan sebelum membaca Al-Qur'an.

Lafal yang umum dipakai: أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ

Hukumnya mustahab (sunnah). Inilah pendapat kebanyakan ulama qira'at dan fikih, dan pendapat inilah yang dipilih.

Ketika memulai dari awal surat (selain At-Taubah), ada empat cara yang sah untuk merangkai isti'adzah, basmalah, dan awal surat:
① Dipisah semuanya: isti'adzah – berhenti – basmalah – berhenti – awal surat.
② Isti'adzah disambung dengan basmalah, lalu berhenti, kemudian awal surat.
③ Isti'adzah, lalu berhenti, kemudian basmalah disambung dengan awal surat.
④ Disambung semuanya dalam satu napas.`
  },
  {
    slug: "basmalah",
    title: "Basmalah",
    category: "tajwid",
    position: 40,
    summary: "Kapan basmalah wajib dibaca, kapan boleh dipilih, dan bagaimana membacanya ketika berpindah dari satu surat ke surat berikutnya.",
    arabicText: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
    content: `Memulai dari awal surat
Basmalah harus dibaca setiap kali bacaan dimulai dari awal surat. Satu-satunya pengecualian adalah surat At-Taubah.

Memulai dari tengah surat
Jika bacaan dimulai dari selain awal surat, meskipun hanya bergeser satu kata, qari' boleh membaca basmalah dan boleh juga tidak. Membacanya lebih utama. Dalam hal ini tidak ada beda antara At-Taubah dan surat lainnya, walaupun ada sebagian ulama yang tidak membolehkan basmalah di tengah At-Taubah karena menyamakannya dengan hukum di awal surat tersebut.

Berpindah dari satu surat ke surat berikutnya
Ada tiga cara yang dibolehkan:
① Semua dipisah: akhir surat – berhenti – basmalah – berhenti – awal surat berikutnya.
② Semua disambung: akhir surat, basmalah, dan awal surat berikutnya dibaca tanpa jeda.
③ Berhenti setelah akhir surat, lalu basmalah dibaca bersambung dengan awal surat berikutnya.

Dan ada satu cara yang tidak boleh:
④ Akhir surat disambung dengan basmalah, lalu berhenti, baru membaca awal surat berikutnya.

Cara keempat dilarang karena bisa membuat pendengar mengira basmalah adalah penutup surat sebelumnya, padahal basmalah selalu menjadi pembuka surat.`
  },
  {
    slug: "makharijul-huruf-jauf-dan-halq",
    title: "Makharijul Huruf: Al-Jauf dan Tenggorokan",
    category: "tajwid",
    position: 50,
    summary: "Mengenal lima area makhraj, lalu mempelajari dua yang pertama: rongga mulut (al-jauf) untuk huruf mad dan tenggorokan (al-halq) untuk enam huruf.",
    arabicText: "الْجَوْفُ · الْحَلْقُ",
    content: `Makharijul huruf adalah titik-titik di organ bicara tempat setiap huruf hijaiyyah dibunyikan. Secara garis besar ada lima area: rongga mulut (al-jauf), tenggorokan (al-halq), lidah (al-lisan), dua bibir (asy-syafatain), dan rongga hidung (al-khaisyum).

1. Al-Jauf (Rongga Mulut)
Al-jauf artinya rongga, yaitu ruang kosong di dalam mulut dan tenggorokan. Huruf yang keluar dari sini tidak bertumpu pada satu titik, melainkan berakhir bersama habisnya udara. Hurufnya adalah tiga huruf mad:
• Alif sukun setelah fathah: قَالَ، وَحَالَ
• Wawu sukun setelah dhammah: يَقُولُ، تَتَّقُونَ
• Ya sukun setelah kasrah: قِيلَ، وَحِيلَ

2. Al-Halq (Tenggorokan)
Tenggorokan membentang dari pangkal laring hingga pangkal lidah. Di dalamnya ada tiga titik makhraj yang menjadi tempat keluarnya enam huruf.

• Bagian terdalam (aqshal halq), di sekitar pita suara: hamzah (ء) dan ha (هـ).
Contoh: يَأْكُلُ، مُؤْمِنٌ، أَهْوَاءَهُمْ، أَهْلَهَا

• Bagian tengah (wasthul halq), di sekitar epiglotis: 'ain (ع) dan ha (ح).
Contoh: أَعْبُدُ، أَعْلَمُ، إِحْسَانًا، أَحْرَصَ

• Bagian terdekat ke mulut (adnal halq), berbatasan dengan pangkal lidah: ghain (غ) dan kha (خ).
Contoh: أَغْنِيَاءَ، وَأَغْرَقْنَا، وَأَخْرَجَتِ، أَخْبَارَهَا`
  },
  {
    slug: "makharijul-huruf-lidah",
    title: "Makharijul Huruf: Lidah",
    category: "tajwid",
    position: 60,
    summary: "Lidah adalah area makhraj terbanyak: 10 titik untuk 18 huruf, tersebar di pangkal, tengah, sisi, dan ujung lidah.",
    arabicText: "اللِّسَانُ",
    content: `Lidah (al-lisan) memiliki makhraj paling banyak, yaitu 10 titik yang menjadi tempat keluarnya 18 huruf. Kita bahas dari bagian paling dalam ke paling depan.

Pangkal lidah (aqshal lisan)
• Qaf (ق): pangkal lidah terangkat menyentuh langit-langit lunak di bagian belakang mulut. Contoh: أَقْرَرْتُمْ، أَقْرَبُ، أُقْسِمُ
• Kaf (ك): posisinya sedikit lebih ke depan daripada qaf, yaitu pangkal lidah menyentuh perbatasan langit-langit lunak dan keras. Contoh: أَكْثَرُهُمْ، أَكْبَرُ، اكْتَسَبُوا

Tengah lidah (wasthul lisan)
• Jim (ج), syin (ش), dan ya yang bukan mad (ي): bagian tengah lidah bertemu langit-langit tepat di atasnya. Contoh: أَجْرُهُمْ، أَشْهُرٌ، أَشْتَاتًا، أَيْمَانِكُمْ، أَيْدِيهِمْ

Sisi lidah (hafatul lisan)
• Dhad (ض): tepi lidah menempel pada gigi geraham atas, bisa sisi kanan, sisi kiri, atau keduanya sekaligus. Contoh: اضْرِبْ، أَضْحَكَ، أَضْعَافًا
• Lam (ل): tepi lidah bagian depan hingga ujungnya menempel pada gusi gigi atas. Contoh: قُلْنَا، يُلْقُونَ، خَلْفَهَا

Ujung lidah (tharaful lisan)
• Nun (ن): ujung lidah menyentuh gusi gigi atas, sedikit di atas posisi lam, dan suaranya selalu disertai dengung dari hidung. Contoh: أَنْعَمْتَ، وَتَنْحِتُونَ، إِنْ
• Ra (ر): ujung lidah bagian punggungnya menyentuh gusi gigi atas, berdekatan dengan posisi nun. Contoh: أَرْبَعَةَ، أَرْبَابًا، أَرْبَعِينَ
• Tha (ط), dal (د), dan ta (ت): ujung lidah menekan pangkal dua gigi seri atas. Contoh: أَطْعَمَهُمْ، أَطْوَارًا، أَدْرَاكَ، أَتْقَاكُمْ، أَتْرَابًا
• Shad (ص), sin (س), dan za (ز): ujung lidah berada di dekat dinding dalam gigi seri bawah, sementara suara mengalir lewat celah di antara gigi seri atas dan bawah. Contoh: أَصْحَابُ، أَسْفَلَ، وَأَسْقَيْنَاكُمْ، أَزْوَاجٌ، أَزْكَىٰ
• Dza (ظ), dzal (ذ), dan tsa (ث): ujung lidah menyentuh ujung dua gigi seri atas. Contoh: أَظْلَمُ، وَأَظْهَرَهُ، اذْكُرُوا، إِذْ، إِثْمٌ، اثْنَتَيْنِ`
  },
  {
    slug: "makharijul-huruf-bibir-dan-rongga-hidung",
    title: "Makharijul Huruf: Dua Bibir dan Rongga Hidung",
    category: "tajwid",
    position: 70,
    summary: "Dua area makhraj terakhir: dua bibir untuk fa, wawu bukan mad, ba, dan mim, serta rongga hidung sebagai sumber ghunnah.",
    arabicText: "الشَّفَتَانِ · الْخَيْشُومُ",
    content: `4. Dua Bibir (asy-Syafatain)
Area bibir terbagi menjadi dua titik makhraj untuk empat huruf.

• Bagian dalam bibir (bathinusy syafah): huruf fa (ف). Bagian dalam bibir bawah disentuhkan ke ujung gigi seri atas. Contoh: أَفْوَاجًا، أَفْلَحَ، أَفْنَانٍ

• Pertemuan dua bibir: wawu yang bukan mad (و), ba (ب), dan mim (م). Wawu diucapkan dengan bibir membulat tanpa tertutup rapat. Ba dan mim diucapkan dengan merapatkan kedua bibir, dan mim diiringi dengung dari hidung. Contoh: الْمَوْعُودِ، إِبْرَاهِيمَ، أَبْوَابُهَا، أَمْرُنَا، وَأَمِنَّا

5. Rongga Hidung (al-Khaisyum)
Al-khaisyum adalah ruang di bagian atas hidung yang tersambung ke tenggorokan. Rongga ini bukan tempat keluarnya huruf tertentu, melainkan tempat keluarnya ghunnah.

Ghunnah adalah suara dengung dari rongga hidung. Ghunnah selalu ada pada huruf nun dan mim, apa pun harakat dan keadaannya.`
  },
  {
    slug: "sifat-huruf-yang-berlawanan",
    title: "Sifat Huruf yang Memiliki Lawan",
    category: "tajwid",
    position: 80,
    summary: "Lima pasang sifat yang saling berlawanan: hams–jahr, syiddah–rakhawah (plus tawassuth), isti'la–istifal, ithbaq–infitah, dan idzlaq–ishmat.",
    arabicText: "صِفَاتُ الْحُرُوفِ",
    content: `Makhraj menentukan di mana huruf diucapkan, sedangkan sifat menentukan bagaimana huruf itu terdengar. Sebagian sifat datang berpasangan, sehingga setiap huruf pasti memiliki salah satu dari tiap pasangan.

1. Hams dan Jahr
• Hams (الهَمْس): napas ikut keluar ketika huruf diucapkan karena tumpuan pada makhrajnya ringan, sehingga suaranya terdengar berdesah. Hurufnya ada sepuluh: فَحَثَّهُ شَخْصٌ سَكَتَ. Contoh: أَفْوَاجًا، الرَّحْمَٰنُ، مِثْقَالَ، اشْتَرَوْا، أَكْبَرُ
• Jahr (الجَهْر): kebalikan hams. Napas tertahan karena tumpuan pada makhrajnya kuat, sehingga suaranya terdengar lantang. Hurufnya adalah sembilan belas huruf selain huruf hams. Contoh: الْعِجْلَ، اذْكُرُوا، عَدْلٌ

2. Syiddah, Rakhawah, dan Tawassuth
• Syiddah (الشِّدَّة): suara tertahan sepenuhnya karena makhraj tertutup rapat. Hurufnya: أَجِدْ قَطٍ بَكَتْ. Contoh: تَأْمُرُونِّي، تَجْرِي، عَدْلٍ، يَقْبَلُ، يَطْبَعُ، يَكْتُبُونَ
• Rakhawah (الرَّخَاوَة): suara mengalir bebas karena makhraj tidak tertutup rapat. Hurufnya adalah enam belas huruf selain huruf syiddah dan tawassuth. Contoh: أَشْتَاتًا، تَحْمِلُ، فَيَذْهَبُ
• Tawassuth (التَّوَسُّط): berada di tengah-tengah, karena suara tidak tertahan penuh seperti syiddah dan tidak mengalir penuh seperti rakhawah. Hurufnya ada lima: لِنْ عُمَرَ. Contoh: عِلْمٍ، وَانْحَرْ، تَعْلَمُونَ، الْحَمْدُ، وَارْكَعُوا

3. Isti'la dan Istifal
• Isti'la (الاسْتِعْلَاء): pangkal lidah naik ke arah langit-langit ketika huruf diucapkan, sehingga suaranya terdengar tebal. Hurufnya: خُصَّ ضَغْطٍ قِظْ. Contoh: نَنْسَخْ، يَضْرِبَ، نَغْفِرْ، شَطْرَ، وَارْزُقْ، أَظْلَمُ
• Istifal (الاسْتِفَال): pangkal lidah tetap turun ke dasar mulut. Hurufnya adalah 22 huruf selain huruf isti'la. Contoh: تَكْسِبُونَ، تُتْلَىٰ

4. Ithbaq dan Infitah
• Ithbaq (الإطْبَاق): sebagian besar lidah menempel ke langit-langit sehingga suara terkunci di antara keduanya. Hurufnya ada empat: ص، ض، ط، ظ. Contoh: أَصْحَابُ، فَضْلٍ، شَطْرَ، أَظْلَمَ
• Infitah (الانْفِتَاح): ada celah antara lidah dan langit-langit sehingga suara tidak terkunci. Hurufnya adalah semua huruf selain huruf ithbaq. Contoh: أَشْتَاتًا، الْأَسْوَدِ، بَعَثْنَا

5. Idzlaq dan Ishmat
• Idzlaq (الإذْلَاق): huruf terasa ringan dan cepat diucapkan karena keluar dari ujung lidah atau bibir. Hurufnya ada enam: فِرَّ مِنْ لُبٍّ. Contoh: تَفْعَلُوا، أَبْصَارِهِمْ
• Ishmat (الإصْمَات): huruf terasa lebih berat diucapkan karena makhrajnya jauh dari ujung lidah dan bibir. Hurufnya adalah semua huruf selain huruf idzlaq.`
  },
  {
    slug: "sifat-huruf-tanpa-lawan",
    title: "Sifat Huruf yang Tidak Memiliki Lawan",
    category: "tajwid",
    position: 90,
    summary: "Tujuh sifat yang hanya dimiliki huruf-huruf tertentu: shafir, qalqalah, lin, inhiraf, takrir, tafasysyi, dan istithalah.",
    arabicText: "الصَّفِيرُ · الْقَلْقَلَةُ · اللِّينُ · الِانْحِرَافُ · التَّكْرِيرُ · التَّفَشِّي · الِاسْتِطَالَةُ",
    content: `Berbeda dengan sifat berpasangan, sifat-sifat berikut tidak punya lawan. Sifat ini hanya ada pada huruf tertentu dan membuat huruf tersebut terdengar khas.

1. Shafir (الصَّفِير)
Bunyi desis tajam seperti siulan halus yang menyertai huruf, membuatnya terdengar kuat. Hurufnya: shad (ص), za (ز), dan sin (س).
Contoh: الْفَصْلِ، وَاصْفَحُوا، رِزْقَهُ، بِالْهَزْلِ، يَسْمَعُونَ

2. Qalqalah (القَلْقَلَة)
Bunyi memantul pada makhraj ketika huruf dalam keadaan sukun, sehingga terdengar seperti hentakan. Hurufnya ada lima: قُطْبُ جَدٍّ.
Contoh: الْحَقُّ، أَطْعَمَهُمْ، وَتَبَّ، يَجْعَلْ، لَمْ يَلِدْ

3. Lin (اللِّين)
Huruf diucapkan dengan lembut dan mudah tanpa beban pada lidah. Hurufnya: wawu sukun dan ya sukun yang didahului fathah.
Contoh: خَوْفٍ، يَوْمِ، الْبَيْتِ، عَيْنٍ

4. Inhiraf (الانْحِرَاف)
Suara huruf berbelok dari jalurnya karena alirannya terhalang lidah. Hurufnya: lam dan ra.
Contoh: فَلْيَعْبُدُوا، فَلْيَدْعُ، ارْجِعِي، يَرْضَىٰ

5. Takrir (التَّكْرِير)
Kecenderungan ujung lidah bergetar ketika mengucapkan ra. Sifat ini perlu diketahui justru agar getarannya ditahan dan tidak berlebihan.
Contoh: الْقُرْآنَ، وَمَرْيَمَ، قَرْضًا

6. Tafasysyi (التَّفَشِّي)
Udara menyebar luas di dalam mulut ketika mengucapkan huruf syin.
Contoh: نَشْهَدُ، وَأَشْهِدُوا، تَشْكُرُونَ

7. Istithalah (الاسْتِطَالَة)
Suara huruf dhad memanjang di sepanjang sisi lidah hingga mendekati makhraj lam.
Contoh: الضَّالِّينَ، أَضْعَفُ، الْأَرْضِ`
  },
  {
    slug: "nun-sukun-dan-tanwin-izhhar",
    title: "Nun Sukun dan Tanwin: Pengantar dan Izhhar",
    category: "tajwid",
    position: 100,
    summary: "Apa beda nun sukun dan tanwin, apa saja empat hukumnya, dan bagaimana membaca hukum pertama, yaitu izhhar halqi.",
    arabicText: "أَحْكَامُ النُّونِ السَّاكِنَةِ وَالتَّنْوِينِ\nأَخِي هَاكَ عِلْمًا حَازَهُ غَيْرُ خَاسِرِ",
    content: `Nun sukun dan tanwin muncul di hampir setiap halaman mushaf, jadi hukumnya termasuk yang paling penting untuk dikuasai. Di dalam Al-Qur'an, huruf nun bisa muncul dalam tiga keadaan:
1. Bertasydid (musyaddadah): الْجَنَّةَ، أَنَّ
2. Berharakat (mutaharrikah): نَعْبُدُ، تَعْلَمُونَ، دِينِ
3. Sukun: أَنْعَمْتَ، مَنْ خَشِيَ، مِنْ بَعْدِ، يَنْظُرُونَ. Keadaan inilah yang menjadi pokok pembahasan.

Nun sukun adalah nun yang tidak berharakat. Nun ini tertulis dan terbaca, baik ketika bacaan disambung maupun dihentikan, bisa berupa huruf asli atau tambahan, dan bisa berada di tengah atau akhir kata. Contoh: يَنْظُرُونَ، انْكَدَرَتْ، سُنْدُسٍ، أَنْعَمَ، مَنْ

Tanwin juga berupa bunyi nun sukun, tetapi khusus berada di akhir isim (kata benda), tidak ditulis sebagai huruf, dan hanya terbaca ketika bacaan disambung. Di mushaf, tanwin ditandai dengan harakat ganda. Contoh: سِرَاجًا وَهَّاجًا، قَوْمٍ هَادٍ، غَفُورٌ حَلِيمٌ

Hukum nun sukun dan tanwin ditentukan oleh huruf yang datang sesudahnya:
① Izhhar, jika bertemu ء هـ ع ح غ خ
② Idgham, jika bertemu huruf يَرْمُلُونَ. Dengan ghunnah untuk ي ن م و (يَنْمُو), tanpa ghunnah untuk ل ر
③ Iqlab, jika bertemu ب
④ Ikhfa, jika bertemu 15 huruf sisanya

Hukum 1: Izhhar (الإظْهَار)
Izhhar artinya menampakkan atau menjelaskan. Dalam tajwid, izhhar berarti nun sukun atau tanwin dibunyikan jelas dari makhrajnya tanpa tambahan dengung.

Hukum ini berlaku jika sesudah nun sukun atau tanwin ada salah satu dari enam huruf tenggorokan: hamzah, ha (هـ), 'ain, ha (ح), ghain, dan kha. Untuk memudahkan hafalan, keenam huruf ini dirangkai menjadi huruf awal kalimat: أَخِي هَاكَ عِلْمًا حَازَهُ غَيْرُ خَاسِرِ ("Saudaraku, ambillah ilmu ini; yang memilikinya tidak akan rugi").

• Hukum ini dinamakan izhhar halqi karena semua hurufnya berasal dari tenggorokan (halq).
• Alasannya, makhraj nun di ujung lidah berjauhan dengan makhraj huruf-huruf tenggorokan, sehingga nun tetap dibaca jelas.
• Cara membacanya: nun dibunyikan jelas tanpa dengung tambahan. Jangan dihentak atau dijeda (sakt). Cukup dengan tempo sedang (tawassuth).

Contoh (nun sukun dalam satu kata · nun sukun di antara dua kata · tanwin):
• Hamzah: وَيَنْأَوْنَ · مَنْ أَعْطَىٰ · وَجَنَّاتٍ أَلْفَافًا
• Ha (هـ): وَيَنْهَوْنَ · مَنْ هَاجَرَ · وَلِكُلِّ قَوْمٍ هَادٍ
• 'Ain: أَنْعَمْتَ · إِنْ عَلَيْكَ · حَكِيمٌ عَلِيمٌ
• Ha (ح): وَتَنْحِتُونَ · وَمَنْ حَوْلَهُ · قَرْضًا حَسَنًا
• Ghain: فَسَيُنْغِضُونَ · مِنْ غَيْرِ · لَعَفُوٌّ غَفُورٌ
• Kha: وَالْمُنْخَنِقَةُ · مِنْ خَوْفٍ · عَلِيمٌ خَبِيرٌ

Penanda di mushaf: nun sukun diberi tanda sukun, dan tanwinnya ditulis dengan dua harakat yang sejajar.`
  },
  {
    slug: "nun-sukun-dan-tanwin-idgham",
    title: "Nun Sukun dan Tanwin: Idgham",
    category: "tajwid",
    position: 110,
    summary: "Idgham meleburkan nun sukun atau tanwin ke huruf sesudahnya. Ada dua jenis: bighunnah untuk ي ن م و dan bilaa ghunnah untuk ل ر.",
    arabicText: "الْإِدْغَامُ\nيَرْمُلُونَ",
    content: `Idgham artinya memasukkan satu hal ke dalam hal lain. Dalam tajwid, idgham berarti huruf mati dilebur ke huruf hidup sesudahnya sehingga keduanya terdengar seperti satu huruf bertasydid.

Nun sukun atau tanwin dibaca idgham jika sesudahnya ada salah satu dari enam huruf dalam kata يَرْمُلُونَ: ya, ra, mim, lam, wawu, dan nun.

Penting: idgham nun sukun dan tanwin hanya terjadi jika keduanya berada di kata yang berbeda. Jika masih dalam satu kata, tidak dibaca idgham.

1. Idgham Bighunnah (dengan dengung)
Peleburan yang disertai dengung. Hurufnya empat, dirangkum dalam kata يَنْمُو: ya, nun, mim, dan wawu.
Contoh (nun sukun · tanwin):
• Ya: وَمَنْ يَعْمَلْ، مَنْ يَخْشَىٰ · لِقَوْمٍ يَتَفَكَّرُونَ، وُجُوهٌ يَوْمَئِذٍ
• Nun: لَنْ نَدْخُلَهَا، إِنْ نَفَعَتِ · شَيْءٍ نُكُرٍ، عِظَامًا نَخِرَةً
• Mim: مِنْ مَالٍ، مِنْ مَسَدٍ · صُحُفًا مُطَهَّرَةً، نَفْسٍ مَا
• Wawu: مِنْ وَالٍ، مِنْ وَرَائِهِمْ · وَوَالِدٍ وَمَا وَلَدَ، سِرَاجًا وَهَّاجًا

2. Idgham Bilaa Ghunnah (tanpa dengung)
Peleburan total tanpa dengung sedikit pun. Hurufnya dua: lam dan ra.
Contoh (nun sukun · tanwin):
• Lam: مِنْ لَدُنْهُ، يَكُنْ لَهُ · هُدًى لِلْمُتَّقِينَ، مَالًا لُبَدًا
• Ra: مِنْ رَبِّهِمْ، مِنْ رَحِيقٍ · عِيشَةٍ رَاضِيَةٍ، غَفُورٌ رَحِيمٌ

Penanda di mushaf
• Idgham kamil (sempurna), pada ن، م، ل، ر: nun dibiarkan tanpa sukun, dan huruf sesudahnya diberi tasydid. Contoh: مِنْ مَسَدٍ، يَكُنْ لَهُ، عِيشَةٍ رَاضِيَةٍ
• Idgham naqish (tidak sempurna), pada و dan ي: nun dibiarkan tanpa sukun, dan huruf sesudahnya tidak diberi tasydid. Contoh: مِنْ وَرَائِهِمْ، وُجُوهٌ يَوْمَئِذٍ`
  },
  {
    slug: "nun-sukun-dan-tanwin-iqlab",
    title: "Nun Sukun dan Tanwin: Iqlab",
    category: "tajwid",
    position: 120,
    summary: "Ketika nun sukun atau tanwin bertemu ba, bunyinya berubah menjadi mim yang samar disertai dengung. Itulah iqlab.",
    arabicText: "الْإِقْلَابُ\nمِنْ بَعْدِ · سَمِيعٌ بَصِيرٌ",
    content: `Iqlab artinya membalik atau mengubah sesuatu menjadi bentuk lain. Dalam tajwid, iqlab berarti bunyi nun sukun atau tanwin diganti menjadi bunyi mim yang disamarkan dengan dengung, karena bertemu huruf ba (ب).

Huruf iqlab hanya satu, yaitu ba (ب).

Cara membacanya: bibir dirapatkan dengan ringan seperti hendak mengucapkan mim, lalu dengung ditahan sejenak sebelum masuk ke huruf ba.

Contoh:
• Nun sukun dalam satu kata: أَنْبِئُونِي، الْأَنْبَاءُ، لَيُنْبَذَنَّ، فَأَنْبَتْنَا
• Nun sukun di antara dua kata: مِنْ بَيْتِكَ، مِنْ بَعْضٍ، مِنْ بَقْلِهَا، مِنْ بَعْدِ
• Tanwin: سَمِيعٌ بَصِيرٌ، نَفْسٍ بِمَا، عُتُلٍّ بَعْدَ، سَمِيعًا بَصِيرًا

Penanda di mushaf
• Pada nun sukun: tanda sukun diganti dengan mim kecil di atas nun.
• Pada tanwin: salah satu harakat tanwin diganti dengan mim kecil.`
  },
  {
    slug: "nun-sukun-dan-tanwin-ikhfa",
    title: "Nun Sukun dan Tanwin: Ikhfa",
    category: "tajwid",
    position: 130,
    summary: "Ikhfa menyamarkan nun sukun dan tanwin dengan dengung ketika bertemu salah satu dari 15 huruf. Tebal-tipis dengungnya mengikuti huruf sesudahnya.",
    arabicText: "الْإِخْفَاءُ\nصِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا\nدُمْ طَيِّبًا زِدْ فِي تُقًى ضَعْ ظَالِمَا",
    content: `Ikhfa artinya menyembunyikan. Dalam tajwid, ikhfa adalah cara membaca nun sukun atau tanwin di antara izhhar dan idgham: nun tidak dibaca jelas, tetapi juga tidak dilebur menjadi tasydid. Bunyinya disamarkan sambil mempertahankan dengung (ghunnah).

Hukum ini berlaku jika sesudah nun sukun atau tanwin ada salah satu dari 15 huruf yang tersisa setelah huruf izhhar, idgham, dan iqlab. Agar mudah diingat, hurufnya dirangkum dalam huruf awal tiap kata pada bait berikut:
صِفْ ذَا ثَنَا كَمْ جَادَ شَخْصٌ قَدْ سَمَا ۝ دُمْ طَيِّبًا زِدْ فِي تُقًى ضَعْ ظَالِمَا
Hurufnya: ص ذ ث ك ج ش ق س د ط ز ف ت ض ظ

Cara membacanya: ketika dengung berlangsung, lidah sudah bersiap mendekati makhraj huruf sesudahnya, tetapi belum menyentuhnya secara penuh.

Tebal-tipisnya dengung ikhfa mengikuti huruf sesudahnya. Jika huruf itu tebal (huruf isti'la), dengungnya ikut tebal. Jika huruf itu tipis, dengungnya juga tipis. Contoh dengung tipis: إِنْ كُنْتُمْ.

Contoh (nun sukun dalam satu kata · nun sukun di antara dua kata · tanwin):
• ص: فَانْصَبْ · عَنْ صَلَاتِهِمْ · رِيحًا صَرْصَرًا
• ذ: مُنْذِرٌ · مِنْ ذَكَرٍ · وَطَعَامًا ذَا
• ث: مَنْثُورًا · فَمَنْ ثَقُلَتْ · أَزْوَاجًا ثَلَاثَةً
• ك: عَنْكَ · إِنْ كَانَ · وَرِزْقٌ كَرِيمٌ
• ج: وَأَنْجَيْنَا · مِنْ جُوعٍ · قَوْمًا جَبَّارِينَ
• ش: أَنْشَرَهُ · فَمَنْ شَاءَ · شَيْءٍ شَهِيدٌ
• ق: أَنْقَضَ · مِنْ قَبْلُ · شَيْءٍ قَدِيرٌ
• س: تُنْسَىٰ · مِنْ سِجِّيلٍ · وَرَجُلًا سَلَمًا
• د: عِنْدَ · مِنْ دَابَّةٍ · قِنْوَانٌ دَانِيَةٌ
• ط: يَنْطِقُونَ · مَنْ طَغَىٰ · صَعِيدًا طَيِّبًا
• ز: أَنْزَلْنَاهُ · مِنْ زَكَاةٍ · صَعِيدًا زَلَقًا
• ف: انْفَطَرَتْ · مِنْ فَضْلِ · سَفَرٍ فَعِدَّةٌ
• ت: أَفَأَنْتَ · مَنْ تَزَكَّىٰ · عَمَدٍ تَرَوْنَهَا
• ض: مَنْضُودٍ · مِنْ ضَرِيعٍ · مُسْفِرَةٌ ضَاحِكَةٌ`
  },
  {
    slug: "hukum-mim-sukun",
    title: "Hukum Mim Sukun",
    category: "tajwid",
    position: 140,
    summary: "Mim sukun punya tiga hukum yang bergantung pada huruf sesudahnya: idgham syafawi, ikhfa syafawi, dan izhhar syafawi.",
    arabicText: "أَحْكَامُ الْمِيمِ السَّاكِنَةِ",
    content: `Sama seperti nun sukun, cara membaca mim sukun bergantung pada huruf yang datang sesudahnya. Semua hukumnya disebut syafawi karena mim keluar dari kedua bibir (syafatain).

1. Idgham Syafawi
Berlaku jika mim sukun bertemu mim. Mim pertama dilebur ke mim kedua, lalu dengungnya ditahan dengan sempurna.
Contoh: الَّذِي أَطْعَمَهُمْ مِنْ جُوعٍ وَآمَنَهُمْ مِنْ خَوْفٍ
Penanda di mushaf: mim pertama tanpa tanda sukun, dan mim kedua bertasydid.

2. Ikhfa Syafawi
Berlaku jika mim sukun bertemu ba. Mim disamarkan sambil berdengung. Hukum ini hanya terjadi di antara dua kata.
Contoh: أَمْ بِظَاهِرٍ، وَمَنْ يَعْتَصِمْ بِاللَّهِ
Penanda di mushaf: mim tanpa tanda sukun, dan ba sesudahnya tanpa tasydid.

3. Izhhar Syafawi
Berlaku jika mim sukun bertemu huruf selain mim dan ba. Mim dibaca jelas tanpa dengung tambahan.
Contoh: وَأَمْدَدْنَاهُمْ، فَيَمْكُثُ، هُمْ فِيهَا خَالِدُونَ، وَهُمْ فَرِحُونَ
Penanda di mushaf: mim diberi tanda sukun.

Hati-hati dengan wawu dan fa
Kesalahan yang sering terjadi adalah menyamarkan mim sukun ketika bertemu wawu atau fa. Penyebabnya, mim dan wawu sama-sama keluar dari kedua bibir, sedangkan makhraj fa sangat dekat dengan mim, sehingga lidah cenderung mengambil jalan pintas. Padahal hukumnya tetap izhhar, jadi mim harus dibaca jelas. Contoh: هُمْ فِيهَا خَالِدُونَ، هُمْ وَأَزْوَاجُهُمْ، أَيْدِيهِمْ وَمَا خَلْفَهُمْ`
  },
  {
    slug: "nun-dan-mim-bertasydid",
    title: "Nun dan Mim Bertasydid",
    category: "tajwid",
    position: 150,
    summary: "Setiap nun dan mim bertasydid wajib dibaca dengan dengung yang sempurna, baik ketika bacaan disambung maupun dihentikan.",
    arabicText: "النُّونُ وَالْمِيمُ الْمُشَدَّدَتَانِ",
    content: `Ghunnah (الغُنَّة) adalah dengung yang bersumber dari rongga hidung (khaisyum). Dengung ini selalu ada pada nun dan mim, apa pun keadaannya.

Ketika nun atau mim bertasydid, dengungnya mencapai kadar paling sempurna. Qari' wajib menahan dengung tersebut dengan utuh, baik ketika melanjutkan bacaan (washal) maupun ketika berhenti (waqaf) pada kata itu.

Contoh:
• مِنَ الْجِنَّةِ وَالنَّاسِ
• وَلَٰكِنَّ اللَّهَ سَلَّمَ
• وَمَنْ نُعَمِّرْهُ
• حَمَّالَةَ الْحَطَبِ
• ثُمَّ كَلَّا سَيَعْلَمُونَ
• مِنْ مَالٍ وَبَنِينَ
• فَأَتَمَّهُنَّ
• إِنَّ اللَّهَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ

Catatan: tasydid pada نُعَمِّرْهُ dan مَالٍ dalam contoh di atas muncul karena nun sukun sebelumnya dilebur (idgham). Jadi, jika bacaan dimulai langsung dari kata tersebut, tasydidnya hilang dan huruf pertamanya dibaca tanpa dengung tambahan, karena tidak ada lagi huruf yang dileburkan.`
  },
  {
    slug: "lam-tarif",
    title: "Lam Ta'rif: Qamariyah dan Syamsiyah",
    category: "tajwid",
    position: 160,
    summary: "Lam pada awalan ال dibaca jelas sebelum huruf qamariyah dan dileburkan sebelum huruf syamsiyah.",
    arabicText: "لَامُ التَّعْرِيفِ\nابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ",
    content: `Lam ta'rif adalah lam sukun pada awalan ال yang menempel di depan kata benda (isim). Lam ini bukan bagian asli kata. Sebelumnya ada hamzah washal yang dibaca fathah jika bacaan dimulai dari kata tersebut.

Ada dua cara membacanya, tergantung huruf sesudahnya.

Lam Qamariyah (اللَّامُ الْقَمَرِيَّة)
Lam dibaca jelas (izhhar) jika sesudahnya ada salah satu dari 14 huruf dalam kalimat: ابْغِ حَجَّكَ وَخَفْ عَقِيمَهُ
• Penanda di mushaf: lam diberi tanda sukun.
Contoh: الْأَمَلُ، الْبَارِئُ، الْغَنِيُّ، الْحَجِّ، الْجَنَّةِ، الْكَهْفِ، الْوَدُودُ، الْخَلْقِ، الْفَتَّاحُ، الْعَلِيمُ، الْقَمَرُ، الْيَوْمِ، الْمُلْكُ، الْهُدَىٰ

Lam Syamsiyah (اللَّامُ الشَّمْسِيَّة)
Lam tidak dibaca, tetapi dilebur (idgham) ke huruf sesudahnya, jika sesudahnya ada salah satu dari 14 huruf yang menjadi huruf awal tiap kata pada bait:
طِبْ ثُمَّ صِلْ رُحْمًا تَفُزْ ضِفْ ذَا نِعَمْ ۝ دَعْ سُوءَ ظَنٍّ زُرْ شَرِيفًا لِلْكَرَمْ
• Penanda di mushaf: lam ditulis tanpa harakat, dan huruf sesudahnya bertasydid.
Contoh: الطَّيِّبَاتُ، الثَّوَابِ، وَالصَّالِحِينَ، الرَّزَّاقُ، التَّائِبُونَ، الضَّالِّينَ، الذَّكَرُ، النَّعِيمِ، الدَّاعِ، السَّمِيعُ، الظَّالِمِينَ، الزَّبُورِ، الشَّكُورُ، وَاللَّيْلِ`
  },
  {
    slug: "tebal-dan-tipis",
    title: "Tebal dan Tipis (Tafkhim dan Tarqiq)",
    category: "tajwid",
    position: 170,
    summary: "Huruf hijaiyyah ada yang selalu tebal, selalu tipis, dan berubah-ubah. Termasuk di sini aturan alif dan lam pada lafzhul jalalah.",
    arabicText: "التَّفْخِيمُ وَالتَّرْقِيقُ\nخُصَّ ضَغْطٍ قِظْ",
    content: `Bab ini merupakan kelanjutan dari pembahasan makhraj dan sifat huruf. Setelah tahu dari mana huruf keluar, kita perlu tahu apakah huruf itu dibaca tebal (mufakhkham) atau tipis (muraqqaq).

• Tafkhim (tebal): suara huruf dibuat berat sehingga gaungnya memenuhi rongga mulut. Contoh: الْغَيْبِ، خَالِصَةً، بَقْلِهَا
• Tarqiq (tipis): suara huruf dibuat ringan sehingga gaungnya tidak memenuhi rongga mulut. Contoh: أَكْثَرُهُمْ، أَتْرَابًا، أَشْتَاتًا

Dari segi tebal dan tipis, huruf terbagi menjadi tiga kelompok:
1. Selalu tebal: huruf isti'la, yaitu خُصَّ ضَغْطٍ قِظْ. Ulama sepakat huruf-huruf ini selalu tebal dalam keadaan apa pun, baik berharakat maupun sukun, dan baik bersebelahan dengan huruf tipis maupun tidak. Contoh: طَالُوتَ، رَمَضَانَ، أَبْصَارِهِمْ، ظَالِمُونَ، الْفُرْقَانَ، بِغَافِلٍ، خَالِصَةً
2. Kadang tebal, kadang tipis: alif, lam pada lafzhul jalalah (اللَّه), dan ra. Ghunnah juga termasuk kelompok ini karena tebal-tipisnya mengikuti huruf sesudahnya.
3. Selalu tipis: semua huruf istifal selain tiga huruf di kelompok kedua.

Alif
Alif tidak punya sifat tebal atau tipis sendiri. Ia mengikuti huruf yang ada di depannya.
• Tebal jika huruf sebelumnya tebal: لِلطَّائِفِينَ، الضَّالِّينَ، فَأَصَابَهُ، الْعِظَامِ، قَالُوا، ابْتِغَاءَ
• Tipis jika huruf sebelumnya tipis: إِيَّاكَ، النَّاسِ، شَاءَ، يُحَاسِبْكُمْ، الدُّنْيَا

Lam pada Lafzhul Jalalah (اللَّه)
Kuncinya ada pada harakat sebelum lafzhul jalalah.

Dibaca tebal jika:
① Lafzhul jalalah berada di awal bacaan: اللَّهُ لَا إِلَٰهَ إِلَّا هُوَ
② Didahului fathah: عِبَادَ اللَّهِ
③ Didahului huruf sukun yang sebelumnya berfathah: وَإِلَى اللَّهِ
④ Didahului dhammah: عَبْدُ اللَّهِ
⑤ Didahului huruf sukun yang sebelumnya berdhammah: قَالُوا اللَّهُمَّ

Dibaca tipis jika:
① Didahului kasrah: بِسْمِ اللَّهِ
② Didahului huruf sukun yang sebelumnya berkasrah: وَيُنَجِّي اللَّهُ
③ Didahului tanwin: قَوْمًا اللَّهُ

Catatan: aturan ini khusus untuk lafzhul jalalah. Lam pada kata lain tetap dibaca tipis sesuai asalnya. Contoh: فَلْيَعْبُدُوا، تَعْلَمُونَ، لِرَبِّكَ، زُلْزِلَتِ، أَنْزَلْنَاهُ`
  },
  {
    slug: "hukum-ra-tebal-dan-tipis",
    title: "Hukum Ra: Tebal dan Tipis",
    category: "tajwid",
    position: 180,
    summary: "Ra dibaca tebal dalam delapan keadaan, tipis dalam empat keadaan, dan boleh keduanya pada dua kasus khusus.",
    arabicText: "الرَّاءُ",
    content: `Ra adalah huruf yang hukum tebal-tipisnya paling beragam. Patokannya adalah harakat ra itu sendiri. Jika ra sukun, yang dilihat adalah harakat huruf sebelumnya.

Ra dibaca tebal pada delapan keadaan:
① Ra berfathah: رَمَضَانَ، الْقُرَىٰ
② Ra sukun, huruf sebelumnya berfathah: مَرْيَمَ، نَرْتَعْ
③ Ra sukun, huruf sebelumnya juga sukun (selain ya), dan sebelum itu ada fathah: وَالْفَجْرِ، وَالْوَتْرِ
④ Ra berdhammah: رُزِقُوا، تَعْبُرُونَ
⑤ Ra sukun, huruf sebelumnya berdhammah: الْقُرْآنُ
⑥ Ra sukun, huruf sebelumnya juga sukun, dan sebelum itu ada dhammah: الْغَفُورُ، خُضْرٍ
⑦ Ra sukun setelah kasrah, tetapi dalam kata yang sama sesudahnya ada huruf isti'la yang tidak berkasrah. Kasus ini hanya ada pada lima kata: قِرْطَاسٍ، وَإِرْصَادًا، مِرْصَادًا، لَبِالْمِرْصَادِ، فِرْقَةٍ
⑧ Ra sukun setelah kasrah yang bersifat sementara ('aridh), baik terucap maupun tidak: ارْجِعُوا، ارْتَبْتُمْ، أَمِ ارْتَابُوا، رَبِّ ارْحَمْهُمَا
Cara mudah mengenali keadaan kedelapan: ra sukun yang didahului hamzah washal.

Ra dibaca tipis pada empat keadaan:
① Ra berkasrah: رِجَالٌ، يَعْرِفُونَهَا
② Ra sukun setelah kasrah asli, dan sesudahnya tidak ada huruf isti'la: فِرْعَوْنَ، يَغْفِرْ
③ Ra sukun karena waqaf, huruf sebelumnya sukun, dan sebelum itu ada kasrah: حِجْرٍ، السِّحْرَ
④ Ra sukun karena waqaf yang didahului ya sukun, baik ya mad maupun ya lin: بَصِيرٌ، خَيْرٌ

Ra yang boleh dibaca tebal atau tipis:
1. Kata فِرْقٍ ketika bacaan disambung, pada ayat فَكَانَ كُلُّ فِرْقٍ كَالطَّوْدِ الْعَظِيمِ (Asy-Syu'ara: 63). Di sini ada dua hal yang saling tarik: ra sukun setelah kasrah (alasan tipis) dan ra diikuti huruf isti'la qaf (alasan tebal), tetapi qafnya berkasrah. Kata ini hanya ada di satu tempat.
• Jika berhenti dengan sukun pada kata ini, ra dibaca tebal, karena kasrah pada qaf ikut hilang.
• Jika berhenti dengan raum, kedua cara tetap boleh.

2. Kata مِصْرَ dan الْقِطْرِ ketika berhenti. Ra sukun didahului huruf isti'la yang sukun, dan sebelum huruf isti'la itu ada kasrah.
• مِصْرَ muncul di empat tempat: Yunus 87, Yusuf 21 dan 99, serta Az-Zukhruf 51. Contoh: وَقَالَ ادْخُلُوا مِصْرَ إِنْ شَاءَ اللَّهُ آمِنِينَ (Yusuf: 99)
• الْقِطْرِ muncul di satu tempat: وَأَسَلْنَا لَهُ عَيْنَ الْقِطْرِ (Saba': 12)
• Ketika bacaan disambung, ra pada مِصْرَ tebal karena berfathah, sedangkan ra pada الْقِطْرِ tipis karena berkasrah.
• Imam Ibnul Jazari memilih untuk mengikuti keadaan washal: ketika berhenti, ra pada مِصْرَ ditebalkan dan ra pada الْقِطْرِ ditipiskan.`
  },
  {
    slug: "mad-thabii-dan-turunannya",
    title: "Mad: Definisi, Mad Thabi'i, Badal, 'Iwadh, dan Shilah",
    category: "tajwid",
    position: 190,
    summary: "Dasar-dasar mad: pengertian, tiga huruf mad, dan jenis-jenis mad yang panjangnya dua harakat (thabi'i, badal, 'iwadh, shilah sughra) serta shilah kubra.",
    arabicText: "الْمَدُّ\nوَيُمْدِدْكُمْ بِأَمْوَالٍ وَبَنِينَ",
    content: `Mad secara bahasa berarti menambah atau memanjangkan. Makna ini terlihat dalam firman Allah وَيُمْدِدْكُمْ بِأَمْوَالٍ وَبَنِينَ, "dan Dia menambahkan kepadamu harta dan anak-anak" (Nuh: 12).

Dalam tajwid, mad adalah memanjangkan suara huruf mad atau huruf lin melebihi panjang mad thabi'i karena ada sebab tambahan, yaitu hamzah atau sukun.

Huruf mad ada tiga. Ketiganya sukun dan didahului harakat yang sesuai:
• Alif, didahului fathah: قَالَ، وَحَالَ، أَنْدَادًا
• Wawu, didahului dhammah: يَقُولُ، تَحُولُ، تَتَّقُونَ
• Ya, didahului kasrah: قِيلَ، وَحِيلَ، صَادِقِينَ

1. Mad Thabi'i (الْمَدُّ الطَّبِيعِيُّ)
Ini adalah mad paling dasar. Tanpa mad ini, huruf mad tidak terucap utuh, dan panjangnya tidak dipengaruhi hamzah maupun sukun. Contoh: قَالَ، يَقُولُ، تَحُولُ، قِيلَ، وَحِيلَ
Disebut thabi'i (alami) karena orang yang lisannya normal secara alami akan membacanya dua harakat, tidak lebih dan tidak kurang.
Panjangnya: tepat dua harakat, sama untuk semua qari'.

2. Mad Badal (الْمَدُّ الْبَدَل)
Terjadi ketika hamzah berada sebelum huruf mad dalam satu kata. Contoh: آمَنُوا، أُوتُوا، إِيمَانًا، آدَمَ، مَسْئُولًا، آمِّينَ
Panjangnya dua harakat, sama seperti mad thabi'i.

3. Mad 'Iwadh (الْمَدُّ الْعِوَض)
Terjadi ketika berhenti pada kata bertanwin fathah. Tanwinnya diganti dengan bunyi alif. Contoh: عَلِيمًا، حَكِيمًا، سَوَاءً، إِنْشَاءً، شَيْئًا
Panjangnya dua harakat, sama seperti mad thabi'i.

4. Mad Shilah (الْمَدُّ الصِّلَة)
Mad ini terjadi pada ha' dhamir (disebut juga ha' kinayah), yaitu ha' tambahan yang bermakna "dia (laki-laki)" atau "-nya". Ha' ini dibaca panjang jika berada di antara dua huruf berharakat.
• Mad shilah sughra: sesudah ha' dhamir tidak ada hamzah. Panjangnya dua harakat. Contoh: بَلَىٰ إِنَّ رَبَّهُ كَانَ بِهِ بَصِيرًا. Di mushaf ditandai dengan wawu kecil atau ya kecil setelah ha', seperti pada إِنَّهُ عَلَىٰ رَجْعِهِ لَقَادِرٌ
• Mad shilah kubra: sesudah ha' dhamir ada hamzah. Panjangnya 4 atau 5 harakat, mengikuti hukum mad munfashil. Contoh: يَحْسَبُ أَنَّ مَالَهُ أَخْلَدَهُ، وَمَا يُكَذِّبُ بِهِ إِلَّا. Di mushaf, wawu atau ya kecilnya diberi tanda mad (~).

Catatan: mad shilah hanya ada ketika bacaan disambung. Jika berhenti pada ha' tersebut, madnya hilang dan ha' dibaca sukun.`
  },
  {
    slug: "mad-muttashil-munfashil-lazim-aridh-lin",
    title: "Mad: Muttashil, Munfashil, Lazim, 'Aridh Lissukun, dan Lin",
    category: "tajwid",
    position: 200,
    summary: "Mad yang lebih panjang dari dua harakat karena bertemu hamzah (muttashil, munfashil) atau sukun (lazim, 'aridh lissukun, lin).",
    arabicText: "الْمَدُّ الْوَاجِبُ الْمُتَّصِلُ · الْمَدُّ الْجَائِزُ الْمُنْفَصِلُ · الْمَدُّ اللَّازِمُ",
    content: `Mad-mad berikut dibaca lebih panjang daripada mad thabi'i karena ada sebab berupa hamzah atau sukun sesudah huruf mad.

Sebab hamzah

5. Mad Wajib Muttashil (الْمَدُّ الْوَاجِبُ الْمُتَّصِلُ)
Huruf mad dan hamzah berada dalam satu kata. Dinamakan muttashil (bersambung) karena keduanya menyatu, dan wajib karena semua qari' sepakat memanjangkannya.
Contoh: وَجَاءُوكُمْ، سُوءَ الْعَذَابِ، هَنِيئًا، هَاؤُمُ، السَّمَاءِ
Panjangnya 4 atau 5 harakat.

6. Mad Jaiz Munfashil (الْمَدُّ الْجَائِزُ الْمُنْفَصِلُ)
Huruf mad berada di akhir satu kata, dan hamzah berada di awal kata sesudahnya. Dinamakan munfashil (terpisah) karena keduanya berada di kata yang berbeda.
Contoh: إِنَّا أَعْطَيْنَاكَ، وَتُوبُوا إِلَى اللَّهِ، فِي أَنْفُسِكُمْ
Panjangnya 4 atau 5 harakat.

Sebab sukun

7. Mad Lazim (الْمَدُّ اللَّازِمُ)
Huruf mad diikuti sukun asli yang tetap ada, baik ketika bacaan disambung maupun dihentikan. Panjangnya selalu 6 harakat, untuk semua jenisnya dan bagi semua qari'.

Mad lazim terbagi menjadi dua kelompok:

A. Mad Lazim Kalimi, terjadi di dalam sebuah kata.
• Mutsaqqal (berat): huruf sukunnya dilebur sehingga bertasydid. Contoh: الضَّالِّينَ، أَتُحَاجُّونِّي، آمِّينَ، آللَّهُ، آلذَّكَرَيْنِ. Tidak ada contoh dengan huruf mad ya dalam Al-Qur'an.
• Mukhaffaf (ringan): huruf sukunnya tidak dilebur. Satu-satunya contoh adalah آلْآنَ, yang muncul dua kali dalam surat Yunus (ayat 51 dan 91).

B. Mad Lazim Harfi, terjadi pada huruf muqaththa'ah di pembuka surat. Huruf yang dibaca mad lazim ada tujuh, dirangkum dalam: سَنَقُصُّ لَكُمْ
• Mutsaqqal: ejaan hurufnya terdiri dari tiga huruf dengan huruf mad di tengah, dan huruf terakhirnya dilebur ke huruf berikutnya. Contoh: lam pada الم dibaca أَلِفْ لَامْ مِّيمْ, dan sin pada طسم dibaca طَا سِينْ مِّيمْ.
• Mukhaffaf: ejaan hurufnya sama-sama tiga huruf dengan huruf mad di tengah, tetapi huruf terakhirnya sukun tanpa dilebur. Contoh: ص dibaca صَادْ, dan ن dibaca نُونْ.

8. Mad 'Aridh Lissukun (الْمَدُّ الْعَارِضُ لِلسُّكُونِ)
Huruf mad diikuti huruf yang menjadi sukun karena kita berhenti di situ. Sukunnya bersifat sementara ('aridh).
Contoh: بِالْعِبَادِ، الْفَائِزُونَ، الْعَالَمِينَ
Ketika berhenti, panjangnya boleh 2, 4, atau 6 harakat. Ketika disambung, ia kembali menjadi mad thabi'i.
Saran: pilih satu ukuran panjang dan pakai secara konsisten sepanjang bacaan. Misalnya, jika memilih 4 harakat, gunakan 4 harakat untuk semua mad 'aridh hingga selesai membaca.

9. Mad Lin (الْمَدُّ اللِّينُ)
Mirip dengan mad 'aridh lissukun, tetapi yang dipanjangkan adalah huruf lin, yaitu wawu atau ya sukun setelah fathah, ketika berhenti pada kata tersebut.
Contoh: خَوْفٍ، قُرَيْشٍ، الْبَيْتِ
Panjangnya 2, 4, atau 6 harakat. Sebaiknya disamakan dengan panjang yang dipilih untuk mad 'aridh lissukun.

Tanda mad di mushaf
Tanda bergelombang (~) di atas huruf menunjukkan bahwa mad tersebut lebih panjang daripada mad thabi'i. Tanda ini dipakai untuk mad lazim, mad wajib muttashil, mad jaiz munfashil, dan mad shilah kubra.`
  },
  {
    slug: "waqaf-pengertian-dan-jenis",
    title: "Waqaf (Berhenti): Pengertian dan Jenisnya",
    category: "tajwid",
    position: 210,
    summary: "Waqaf adalah berhenti sejenak untuk mengambil napas. Berdasarkan sebabnya, waqaf terbagi menjadi idhthirari, ikhtibari, intizhari, dan ikhtiyari.",
    arabicText: "الْوَقْفُ",
    content: `Waqaf adalah menghentikan suara di akhir sebuah kata sejenak untuk mengambil napas, dengan niat melanjutkan bacaan, bukan untuk mengakhirinya.

Berdasarkan alasannya, waqaf terbagi menjadi empat jenis.

① Waqaf Idhthirari (الْوَقْفُ الِاضْطِرَارِيُّ), karena terpaksa
Qari' berhenti karena keadaan yang tidak bisa dihindari, misalnya napas habis, batuk, bersin, atau gangguan lain.
Hukum: boleh berhenti di kata mana saja. Setelah halangannya selesai, bacaan dilanjutkan dari tempat yang tepat.

② Waqaf Ikhtibari (الْوَقْفُ الِاخْتِبَارِيُّ), untuk menguji
Guru meminta murid berhenti pada kata tertentu untuk menguji pemahamannya, misalnya tentang cara waqaf pada kata itu.
Hukum: boleh, karena tujuannya pengajaran.

③ Waqaf Intizhari (الْوَقْفُ الِانْتِظَارِيُّ), untuk menunggu
Dilakukan oleh orang yang membaca beberapa qira'at sekaligus di hadapan gurunya. Ia berhenti pada suatu kata, lalu mengulang dengan qira'at lain sampai semua versi bacaannya selesai.
Hukum: boleh, selama tidak merusak makna.

④ Waqaf Ikhtiyari (الْوَقْفُ الِاخْتِيَارِيُّ), atas pilihan sendiri
Qari' memilih tempat berhenti atas kehendaknya, tanpa terpaksa. Jenis inilah yang dibahas lebih rinci di materi berikutnya, dan terbagi menjadi:
• Boleh: waqaf tam, waqaf kafy, dan waqaf hasan.
• Tidak boleh: waqaf qabih.`
  },
  {
    slug: "waqaf-tam-kafy-hasan-qabih",
    title: "Waqaf Tam, Kafy, Hasan, dan Qabih",
    category: "tajwid",
    position: 220,
    summary: "Waqaf ikhtiyari dinilai dari hubungan kalimat dengan kalimat sesudahnya: tam, kafy, dan hasan dibolehkan, sedangkan qabih tidak.",
    arabicText: "الْوَقْفُ التَّامُّ · الْوَقْفُ الْكَافِي · الْوَقْفُ الْحَسَنُ · الْوَقْفُ الْقَبِيحُ",
    content: `Baik-buruknya tempat berhenti diukur dari seberapa erat kalimat yang dihentikan berkaitan dengan kalimat sesudahnya, baik dari segi lafaz (susunan kalimat) maupun makna.

Waqaf Tam (التَّامّ)
Kalimatnya sudah utuh, dan tidak ada kaitan sama sekali dengan kalimat sesudahnya, baik lafaz maupun makna. Karena itu ia disebut tam (sempurna).
Hukum: sangat baik untuk berhenti, dan baik pula untuk memulai dari kalimat sesudahnya.
Biasanya ada di akhir ayat atau di akhir sebuah kisah. Contoh:
• مَالِكِ يَوْمِ الدِّينِ | إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ (Al-Fatihah: 4–5)
• وَأُولَٰئِكَ هُمُ الْمُفْلِحُونَ | إِنَّ الَّذِينَ كَفَرُوا (Al-Baqarah: 5–6)
• لَقَدْ أَضَلَّنِي عَنِ الذِّكْرِ بَعْدَ إِذْ جَاءَنِي | وَكَانَ الشَّيْطَانُ لِلْإِنْسَانِ خَذُولًا (Al-Furqan: 29)

Waqaf Kafy (الْكَافِي)
Kalimatnya sudah bermakna lengkap dan benar. Secara lafaz ia tidak bergantung pada kalimat sesudahnya, tetapi maknanya masih bersambung. Disebut kafy (cukup) karena kalimat itu sudah cukup berdiri sendiri.
Hukum: sama seperti waqaf tam, yaitu baik untuk berhenti dan baik untuk memulai dari sesudahnya.
Bisa ada di akhir ayat maupun di tengah ayat. Contoh:
• وَبِالْآخِرَةِ هُمْ يُوقِنُونَ | أُولَٰئِكَ عَلَىٰ هُدًى مِنْ رَبِّهِمْ (Al-Baqarah: 4–5)
• وَاذْكُرْ فِي الْكِتَابِ إِبْرَاهِيمَ | إِنَّهُ كَانَ صِدِّيقًا نَبِيًّا (Maryam: 41)

Waqaf Hasan (الْحَسَن)
Kalimatnya sudah bisa dipahami, tetapi masih terikat dengan kalimat sesudahnya, baik lafaz maupun makna. Disebut hasan (baik) karena berhenti di situ tetap menghasilkan makna yang dapat dimengerti.
Hukum: boleh berhenti, tetapi sebaiknya tidak langsung memulai dari kata sesudahnya. Kembalilah sedikit ke belakang. Pengecualiannya, jika berhentinya di akhir ayat, boleh langsung melanjutkan, karena berhenti di ujung ayat adalah sunnah. Contoh:
• Di akhir ayat (boleh langsung melanjutkan): الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ | الرَّحْمَٰنِ الرَّحِيمِ (Al-Fatihah: 2–3)
• Di tengah ayat (sebaiknya mengulang): الْحَمْدُ لِلَّهِ | رَبِّ الْعَالَمِينَ (Al-Fatihah: 2)

Waqaf Qabih (الْقَبِيح)
Berhenti pada kalimat yang belum tuntas, sehingga makna yang terdengar menjadi kurang, keliru, atau bahkan rusak. Disebut qabih (buruk) karena akibatnya bisa sangat fatal bagi makna.
Hukum: tidak boleh disengaja. Jika terpaksa berhenti di situ, bacaan harus diulang dari tempat yang tepat. Contoh:
• Maknanya menggantung, misalnya berhenti pada الْحَمْدُ (Al-Fatihah: 2).
• Maknanya bertentangan dengan maksud ayat, misalnya berhenti pada لَا تَقْرَبُوا الصَّلَاةَ (An-Nisa: 43).
• Maknanya tidak pantas bagi Allah, misalnya berhenti pada فَاعْلَمْ أَنَّهُ لَا إِلَٰهَ (Muhammad: 19).`
  },
  {
    slug: "tanda-tanda-waqaf-dalam-mushaf",
    title: "Tanda-Tanda Waqaf dalam Mushaf",
    category: "tajwid",
    position: 230,
    summary: "Panduan membaca simbol waqaf di mushaf: mim, lam alif, jim, qila, shala, dan titik tiga (mu'anaqah).",
    arabicText: "عَلَامَاتُ الْوَقْفِ فِي الْمُصْحَفِ\nمـ · لا · ج · قلى · صلى · ∴ ∴",
    content: `Mushaf memuat simbol-simbol kecil di atas teks untuk menunjukkan apakah sebaiknya berhenti atau melanjutkan bacaan. Berikut arti masing-masing simbol.

مـ (mim), waqaf lazim: harus berhenti, karena jika disambung maknanya bisa berubah.
Contoh: إِنَّمَا يَسْتَجِيبُ الَّذِينَ يَسْمَعُونَ ۘ وَالْمَوْتَىٰ يَبْعَثُهُمُ اللَّهُ (Al-An'am: 36)

لا (lam alif): jangan berhenti di sini, karena maknanya belum selesai.
Contoh: وَالَّذِي جَاءَ بِالصِّدْقِ وَصَدَّقَ بِهِ ۙ أُولَٰئِكَ هُمُ الْمُتَّقُونَ (Az-Zumar: 33)

ج (jim): boleh berhenti dan boleh melanjutkan, keduanya sama baiknya.
Contoh: وَلَا يَحْزُنْكَ قَوْلُهُمْ ۘ إِنَّ الْعِزَّةَ لِلَّهِ جَمِيعًا ۚ هُوَ السَّمِيعُ الْعَلِيمُ (Yunus: 65)

قلى (qila): boleh melanjutkan, tetapi berhenti lebih utama.
Contoh: فَإِنْ قَاتَلُوكُمْ فَاقْتُلُوهُمْ ۗ كَذَٰلِكَ جَزَاءُ الْكَافِرِينَ (Al-Baqarah: 191)

صلى (shala): boleh berhenti, tetapi melanjutkan lebih utama.
Contoh: مَا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِنْ تَفَاوُتٍ ۖ فَارْجِعِ الْبَصَرَ هَلْ تَرَىٰ مِنْ فُطُورٍ (Al-Mulk: 3)

∴ ∴ (titik tiga berpasangan, waqaf mu'anaqah): tanda ini selalu muncul berdua. Berhentilah di salah satunya saja, jangan di keduanya. Membaca terus tanpa berhenti di keduanya juga boleh.
Contoh: ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِلْمُتَّقِينَ (Al-Baqarah: 2)`
  }
];

export const lessons = materi.map((lesson) => ({ ...lesson, content: `${lesson.content}

${source}` }));
