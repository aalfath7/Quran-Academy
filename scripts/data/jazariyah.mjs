// Matan Al-Muqaddimah Al-Jazariyah karya Imam Ibnul Jazari (w. 833 H) beserta penjelasannya, bab demi bab.
// Isi materi berselang-seling: paragraf berisi bait (hanya teks Arab, shadr dan 'ajuz di dua baris)
// lalu paragraf penjelasannya. Halaman materi menampilkan paragraf Arab sebagai kutipan bait.
// Penjelasan disusun ulang dengan merujuk modul "Terjemah Tafsiriyyah Matan Manzhumah Muqaddimah Jazariyyah"
// (Abu Ezra Al-Fadhli, LTI Bandung & Online Tajwid, 2016) dan syarah-syarah Al-Jazariyah.

export const lessons = [
  {
    slug: "jazariyah-muqaddimah",
    title: "Muqaddimah",
    category: "jazariyah",
    position: 10,
    summary: "Pembuka nazham Al-Jazariyah: siapa penyusunnya, dan empat hal yang wajib dipahami pembaca Al-Qur'an sebelum mulai membaca.",
    arabicText: "الْمُقَدِّمَةُ",
    content: `Al-Muqaddimah Al-Jazariyah adalah nazham (syair ilmiah) tentang tajwid karya Imam Syamsuddin Abul Khair Muhammad bin Muhammad Al-Jazari Ad-Dimasyqi Asy-Syafi'i (751–833 H), seorang imam besar ilmu qira'at. Nazham ini berjumlah 107 bait dan dihafal oleh para penuntut ilmu Al-Qur'an dari generasi ke generasi. Pada seri ini, setiap bait langsung diikuti penjelasannya.

يَقُولُ رَاجِي عَفْوِ رَبٍّ سَامِعِ
مُحَمَّدُ بْنُ الْجَزَرِيِّ الشَّافِعِي

Penulis memperkenalkan dirinya sebagai hamba yang mengharap ampunan dari Rabb Yang Maha Mendengar, yaitu Muhammad bin Al-Jazari, pengikut mazhab Syafi'i.

الْحَمْدُ لِلَّهِ وَصَلَّى اللَّهُ
عَلَى نَبِيِّهِ وَمُصْطَفَاهُ

مُحَمَّدٍ وَآلِهِ وَصَحْبِهِ
وَمُقْرِئِ الْقُرْآنِ مَعْ مُحِبِّهِ

Penulis memuji Allah, lalu bershalawat atas Nabi pilihan-Nya, Muhammad ﷺ, beserta keluarga dan para sahabat beliau. Doa ini juga ditujukan kepada para pengajar Al-Qur'an (muqri') dan orang-orang yang mencintai Al-Qur'an.

وَبَعْدُ إِنَّ هَذِهِ مُقَدِّمَهْ
فِيمَا عَلَى قَارِئِهِ أَنْ يَعْلَمَهْ

Nazham ini disebut "muqaddimah", yaitu pengantar yang berisi hal-hal yang semestinya diketahui oleh setiap pembaca Al-Qur'an.

إِذْ وَاجِبٌ عَلَيْهِمُ مُحَتَّمُ
قَبْلَ الشُّرُوعِ أَوَّلًا أَنْ يَعْلَمُوا

مَخَارِجَ الْحُرُوفِ وَالصِّفَاتِ
لِيَلْفِظُوا بِأَفْصَحِ اللُّغَاتِ

Sebelum mulai membaca Al-Qur'an, para pembaca wajib terlebih dahulu mempelajari makharijul huruf dan sifat-sifat huruf, agar dapat melafalkan Al-Qur'an dengan bahasa Arab yang paling fasih.

مُحَرِّرِي التَّجْوِيدِ وَالْمَوَاقِفِ
وَمَا الَّذِي رُسِّمَ فِي الْمَصَاحِفِ

مِنْ كُلِّ مَقْطُوعٍ وَمَوْصُولٍ بِهَا
وَتَاءِ أُنْثَى لَمْ تَكُنْ تُكْتَبْ بِهَا

Selain itu, mereka juga perlu menguasai:
• Kaidah tajwid, yaitu cara membaca huruf dengan benar.
• Mawaqif, yaitu tempat-tempat berhenti (waqaf) dan memulai (ibtida').
• Rasm 'Utsmani, yaitu cara penulisan kata dalam mushaf: kata yang ditulis terpisah (maqthu') dan bersambung (maushul), serta ta' ta'nits yang ditulis dengan ta' terbuka (ت), bukan ta' marbuthah (ة).

Urutan bab dalam nazham ini mengikuti daftar tersebut: makhraj, sifat, kaidah tajwid, waqaf dan ibtida', lalu rasm mushaf.

Rujukan: Modul Daurah Tajwidul Quran "Terjemah Tafsiriyyah Matan Manzhumah Muqaddimah Jazariyyah", Abu Ezra Al-Fadhli (LTI Bandung & Online Tajwid, 2016), serta syarah-syarah Al-Muqaddimah Al-Jazariyah.`
  },
  {
    slug: "jazariyah-makharijul-huruf",
    title: "Makharijul Huruf",
    category: "jazariyah",
    position: 20,
    summary: "Tujuh belas tempat keluarnya huruf menurut Imam Ibnul Jazari, dari rongga mulut, tenggorokan, lidah, bibir, hingga rongga hidung.",
    arabicText: "مَخَارِجُ الْحُرُوفِ",
    content: `Bab ini membahas tempat keluarnya huruf-huruf hijaiyyah.

مَخَارِجُ الْحُرُوفِ سَبْعَةَ عَشَرْ
عَلَى الَّذِي يَخْتَارُهُ مَنِ اخْتَبَرْ

Menurut pendapat yang dipilih oleh para ulama ahli qira'at yang meneliti masalah ini, termasuk Imam Ibnul Jazari, makhraj huruf ada 17 tempat untuk 29 huruf hijaiyyah.

فَأَلِفُ الْجَوْفِ وَأُخْتَاهَا وَهِي
حُرُوفُ مَدٍّ لِلْهَوَاءِ تَنْتَهِي

Al-Jauf (rongga mulut dan tenggorokan) adalah tempat keluarnya alif beserta dua "saudarinya", yaitu wawu sukun setelah dhammah dan ya sukun setelah kasrah. Ketiganya adalah huruf mad yang tidak bertumpu pada satu titik, tetapi berakhir bersama habisnya udara.

ثُمَّ لِأَقْصَى الْحَلْقِ هَمْزٌ هَاءُ
ثُمَّ لِوَسْطِهِ فَعَيْنٌ حَاءُ

Al-Halq (tenggorokan) memiliki tiga makhraj. Dua yang pertama:
• Pangkal tenggorokan, bagian yang paling jauh dari mulut: hamzah (ء) dan ha (هـ).
• Tengah tenggorokan: 'ain (ع) dan ha (ح).

أَدْنَاهُ غَيْنٌ خَاؤُهَا وَالْقَافُ
أَقْصَى اللِّسَانِ فَوْقُ ثُمَّ الْكَافُ

• Ujung tenggorokan, bagian yang paling dekat ke mulut: ghain (غ) dan kha (خ).
• Qaf (ق): pangkal lidah yang paling dalam bertemu langit-langit lunak di atasnya.
• Kaf (ك): sedikit di bawah dan lebih ke depan dari makhraj qaf.

أَسْفَلُ وَالْوَسْطُ فَجِيمُ الشِّينُ يَا
وَالضَّادُ مِنْ حَافَتِهِ إِذْ وَلِيَا

الَاضْرَاسَ مِنْ أَيْسَرَ أَوْ يُمْنَاهَا
وَاللَّامُ أَدْنَاهَا لِمُنْتَهَاهَا

• Tengah lidah: jim (ج), syin (ش), dan ya (ي) yang bukan huruf mad, keluar dari tengah lidah yang naik ke arah langit-langit.
• Dhad (ض): sisi lidah yang menempel pada gigi geraham atas, bisa sisi kiri, kanan, atau keduanya sekaligus.
• Lam (ل): bagian sisi lidah yang paling depan sampai ujungnya, menyentuh gusi gigi depan atas.

وَالنُّونُ مِنْ طَرَفِهِ تَحْتُ اجْعَلُوا
وَالرَّا يُدَانِيهِ لِظَهْرٍ أَدْخَلُ

• Nun (ن): ujung lidah, sedikit di bawah makhraj lam.
• Ra (ر): dekat dengan makhraj nun, tetapi sedikit masuk ke punggung lidah.

وَالطَّاءُ وَالدَّالُ وَتَا مِنْهُ وَمِنْ
عُلْيَا الثَّنَايَا وَالصَّفِيرُ مُسْتَكِنْ

مِنْهُ وَمِنْ فَوْقِ الثَّنَايَا السُّفْلَى
وَالظَّاءُ وَالذَّالُ وَثَا لِلْعُلْيَا

• Tha (ط), dal (د), dan ta (ت): ujung lidah bertemu pangkal gigi seri atas.
• Huruf shafir, yaitu shad (ص), zay (ز), dan sin (س): ujung lidah berada dekat gigi seri bawah, dengan sedikit celah tempat udara mendesis.
• Zha (ظ), dzal (ذ), dan tsa (ث): ujung lidah bertemu ujung gigi seri atas.

مِنْ طَرَفَيْهِمَا وَمِنْ بَطْنِ الشَّفَهْ
فَالْفَا مَعَ اطْرَافِ الثَّنَايَا الْمُشْرِفَهْ

Fa (ف) keluar dari bagian dalam bibir bawah yang bertemu ujung gigi seri atas.

لِلشَّفَتَيْنِ الْوَاوُ بَاءٌ مِيمُ
وَغُنَّةٌ مَخْرَجُهَا الْخَيْشُومُ

• Wawu (و), ba (ب), dan mim (م) keluar dari kedua bibir. Pada ba dan mim bibir merapat, sedangkan pada wawu bibir membulat dan tidak merapat.
• Al-Khaisyum (rongga hidung) adalah tempat keluarnya ghunnah, yaitu dengung yang menyertai nun dan mim.

Cara praktis menemukan makhraj sebuah huruf adalah dengan mensukunkannya dan mendahuluinya dengan hamzah berharakat, misalnya: أَبْ، أَتْ، أَقْ. Titik tempat suara terhenti itulah makhrajnya.`
  },
  {
    slug: "jazariyah-shifatul-huruf",
    title: "Shifatul Huruf",
    category: "jazariyah",
    position: 30,
    summary: "Sifat-sifat huruf menurut Al-Jazariyah: lima pasang sifat yang berlawanan dan tujuh sifat yang tidak memiliki lawan.",
    arabicText: "صِفَاتُ الْحُرُوفِ",
    content: `Makhraj menentukan dari mana huruf keluar, sedangkan sifat menentukan bagaimana huruf itu dibunyikan. Dua huruf yang makhrajnya sama, seperti ta dan tha, dibedakan oleh sifatnya.

صِفَاتُهَا جَهْرٌ وَرِخْوٌ مُسْتَفِلْ
مُنْفَتِحٌ مُصْمَتَةٌ وَالضِّدَّ قُلْ

Imam Ibnul Jazari menyebut lima sifat terlebih dahulu: jahr, rakhawah, istifal, infitah, dan ishmat. Kelima sifat ini masing-masing punya lawan. Huruf yang tidak disebutkan pada lawannya otomatis memiliki sifat ini.

مَهْمُوسُهَا فَحَثَّهُ شَخْصٌ سَكَتْ
شَدِيدُهَا لَفْظُ أَجِدْ قَطٍ بَكَتْ

• Hams (mengalirnya napas karena lemahnya tekanan pada makhraj), lawan dari jahr. Hurufnya terkumpul dalam: فَحَثَّهُ شَخْصٌ سَكَتْ (ف ح ث ه ش خ ص س ك ت). Selainnya bersifat jahr.
• Syiddah (tertahannya suara), lawan dari rakhawah. Hurufnya: أَجِدْ قَطٍ بَكَتْ (ء ج د ق ط ب ك ت).

وَبَيْنَ رِخْوٍ وَالشَّدِيدِ لِنْ عُمَرْ
وَسَبْعُ عُلْوٍ خُصَّ ضَغْطٍ قِظْ حَصَرْ

• Tawassuth: di antara syiddah dan rakhawah ada sifat pertengahan, yaitu suara tidak tertahan penuh dan tidak pula mengalir penuh. Hurufnya: لِنْ عُمَرْ (ل ن ع م ر). Selain huruf syiddah dan tawassuth bersifat rakhawah.
• Isti'la (pangkal lidah terangkat ke langit-langit), lawan dari istifal. Hurufnya ada tujuh: خُصَّ ضَغْطٍ قِظْ (خ ص ض غ ط ق ظ). Selainnya bersifat istifal.

وَصَادُ ضَادٌ طَاءُ ظَاءٌ مُطْبَقَهْ
وَفِرَّ مِنْ لُبِّ الْحُرُوفِ الْمُذْلَقَهْ

• Ithbaq (lidah melekat dan seakan menutup langit-langit), lawan dari infitah. Hurufnya: shad, dhad, tha, dan zha (ص ض ط ظ). Selainnya bersifat infitah.
• Idzlaq (huruf yang ringan dan cepat diucapkan karena keluar dari ujung lidah atau bibir), lawan dari ishmat. Hurufnya: فِرَّ مِنْ لُبِّ (ف ر م ن ل ب). Selainnya bersifat ishmat.

صَفِيرُهَا صَادٌ وَزَايٌ سِينُ
قَلْقَلَةٌ قُطْبُ جَدٍ وَاللِّينُ

Berikutnya adalah sifat-sifat yang tidak memiliki lawan:
• Shafir (suara desis seperti siulan): shad, zay, sin.
• Qalqalah (pantulan suara saat huruf sukun): قُطْبُ جَدٍ (ق ط ب ج د).

وَاوٌ وَيَاءٌ سُكِّنَا وَانْفَتَحَا
قَبْلَهُمَا وَالِانْحِرَافُ صُحِّحَا

• Lin (lunak): wawu dan ya yang sukun dengan huruf sebelumnya berharakat fathah, seperti خَوْفٌ dan بَيْتٌ.
• Inhiraf (condong dari makhrajnya ke makhraj lain), yang dijelaskan pada bait berikutnya.

فِي اللَّامِ وَالرَّا وَبِتَكْرِيرٍ جُعِلْ
وَلِلتَّفَشِّي الشِّينُ ضَادًا اسْتَطِلْ

• Inhiraf ada pada lam dan ra.
• Takrir (getaran berulang) ada pada ra. Sifat ini harus diketahui untuk dihindari, bukan diperbanyak.
• Tafasysyi (menyebarnya udara di dalam mulut) ada pada syin.
• Istithalah (memanjangnya makhraj dari pangkal hingga ujung sisi lidah) ada pada dhad.

Mengenal sifat huruf membantu kita mengucapkan huruf secara utuh. Misalnya, ta yang kehilangan sifat syiddah akan terdengar seperti "ts", dan qaf yang kehilangan sifat isti'la akan terdengar seperti kaf.`
  },
  {
    slug: "jazariyah-tajwidul-quran",
    title: "Hukum dan Hakikat Tajwid",
    category: "jazariyah",
    position: 40,
    summary: "Mengapa tajwid wajib diamalkan, apa hakikatnya menurut Imam Ibnul Jazari, dan kunci menguasainya: latihan lisan yang terus-menerus.",
    arabicText: "التَّجْوِيدُ",
    content: `Bab ini menjelaskan hukum tajwid, alasan kewajibannya, dan hakikatnya.

وَالْأَخْذُ بِالتَّجْوِيدِ حَتْمٌ لَازِمُ
مَنْ لَمْ يُجَوِّدِ الْقُرَانَ آثِمُ

Mengamalkan tajwid ketika membaca Al-Qur'an hukumnya wajib. Orang yang mampu belajar tetapi sengaja membaca Al-Qur'an tanpa tajwid berdosa.

لِأَنَّهُ بِهِ الْإِلَهُ أَنْزَلَا
وَهَكَذَا مِنْهُ إِلَيْنَا وَصَلَا

Alasannya, Allah menurunkan Al-Qur'an dengan bacaan yang bertajwid, dan bacaan itulah yang sampai kepada kita secara bersambung dari Rasulullah ﷺ melalui para sahabat dan para guru dari generasi ke generasi.

وَهُوَ أَيْضًا حِلْيَةُ التِّلَاوَةِ
وَزِينَةُ الْأَدَاءِ وَالْقِرَاءَةِ

Tajwid adalah perhiasan tilawah dan keindahan bacaan, baik ketika membaca sendiri (tilawah), ketika menyetorkan bacaan kepada guru (ada'), maupun dalam qira'ah secara umum. Keindahan bacaan Al-Qur'an pertama-tama lahir dari tajwid, bukan dari suara atau langgam.

وَهُوَ إِعْطَاءُ الْحُرُوفِ حَقَّهَا
مِنْ صِفَةٍ لَهَا وَمُسْتَحَقَّهَا

Hakikat tajwid adalah memberikan setiap huruf:
• Haknya, yaitu sifat-sifat yang selalu melekat padanya seperti jahr, hams, syiddah, dan qalqalah.
• Mustahaknya, yaitu hukum yang muncul pada keadaan tertentu seperti tafkhim, tarqiq, idgham, dan ikhfa.

وَرَدُّ كُلِّ وَاحِدٍ لِأَصْلِهِ
وَاللَّفْظُ فِي نَظِيرِهِ كَمِثْلِهِ

Tajwid juga berarti:
• Mengembalikan setiap huruf ke makhraj aslinya.
• Membaca lafazh yang serupa dengan cara yang sama. Misalnya, jika mad wajib dibaca lima harakat di satu tempat, maka di tempat lain dalam bacaan yang sama juga dibaca lima harakat.

مُكَمَّلًا مِنْ غَيْرِ مَا تَكَلُّفِ
بِاللُّطْفِ فِي النُّطْقِ بِلَا تَعَسُّفِ

Bacaan harus sempurna tetapi tidak dibuat-buat (takalluf). Ucapan dibuat lembut, tidak kasar, tidak berlebihan, dan tidak pula asal-asalan. Contoh berlebihan: menekan hamzah sampai seperti orang tersedak, atau memanjangkan mad yang seharusnya dua harakat.

وَلَيْسَ بَيْنَهُ وَبَيْنَ تَرْكِهِ
إِلَّا رِيَاضَةُ امْرِئٍ بِفَكِّهِ

Jarak antara orang yang bacaannya bertajwid dan yang tidak hanyalah latihan lisan (riyadhah) yang terus-menerus. Ilmu tajwid saja tidak cukup. Ia harus dilatihkan berulang kali, sebaiknya di hadapan guru (talaqqi), sampai lisan terbiasa.`
  },
  {
    slug: "jazariyah-tanbihat",
    title: "Beberapa Peringatan Penting",
    category: "jazariyah",
    position: 50,
    summary: "Kesalahan-kesalahan yang sering terjadi pada huruf-huruf tipis, huruf syiddah dan jahr, qalqalah, ha, dan sin, beserta contoh lafazhnya.",
    arabicText: "تَنْبِيهَاتٌ",
    content: `Setelah membahas makhraj dan sifat, Imam Ibnul Jazari memberi peringatan tentang kesalahan yang sering terjadi. Umumnya kesalahan itu muncul karena huruf terpengaruh oleh huruf tebal di dekatnya.

فَرَقِّقَنْ مُسْتَفِلًا مِنْ أَحْرُفِ
وَحَاذِرَنْ تَفْخِيمَ لَفْظِ الْأَلِفِ

Huruf-huruf istifal pada dasarnya dibaca tipis (tarqiq). Hati-hati agar alif tidak ikut ditebalkan ketika huruf sebelumnya tipis. Alif mengikuti huruf sebelumnya: tebal setelah huruf tebal, tipis setelah huruf tipis.

كَهَمْزِ الْحَمْدُ أَعُوذُ اهْدِنَا
اللَّهِ ثُمَّ لَامِ لِلَّهِ لَنَا

• Jangan menebalkan hamzah pada: الْحَمْدُ، أَعُوذُ، اهْدِنَا، اللَّهِ. Hamzah sering ikut tebal karena berdekatan dengan huruf ha atau lam lafzhul jalalah.
• Jangan menebalkan lam pada: لِلَّهِ، لَنَا.

وَلْيَتَلَطَّفْ وَعَلَى اللَّهِ وَلَا الضْ
وَالْمِيمِ مِنْ مَخْمَصَةٍ وَمِنْ مَرَضْ

• Lam juga tetap tipis pada: وَلْيَتَلَطَّفْ، عَلَى اللَّهِ، وَلَا الضَّالِّينَ, meskipun berdekatan dengan huruf tebal atau lafzhul jalalah.
• Mim tetap tipis pada: مَخْمَصَةٍ، مَرَضٌ, walaupun diikuti kha atau ra yang tebal.

وَبَاءِ بَرْقٍ بَاطِلٍ بِهِمْ بِذِي
وَاحْرِصْ عَلَى الشِّدَّةِ وَالْجَهْرِ الَّذِي

فِيهَا وَفِي الْجِيمِ كَحُبِّ الصَّبْرِ
رَبْوَةٍ اجْتُثَّتْ وَحَجِّ الْفَجْرِ

• Ba tetap tipis pada: بَرْقٌ، بَاطِلٌ، بِهِمْ، بِذِي.
• Jagalah sifat syiddah dan jahr pada ba dan jim agar tidak berubah menjadi lemah atau berdesis, seperti pada: حُبَّ، الصَّبْرِ، رَبْوَةٍ، اجْتُثَّتْ، حَجُّ، الْفَجْرِ. Jim jangan sampai terdengar seperti "c" atau "sy".

وَبَيِّنَنْ مُقَلْقَلًا إِنْ سَكَنَا
وَإِنْ يَكُنْ فِي الْوَقْفِ كَانَ أَبْيَنَا

Jelaskan pantulan qalqalah ketika hurufnya sukun. Jika sukunnya karena waqaf, pantulannya lebih jelas lagi.

وَحَاءَ حَصْحَصَ أَحَطْتُ الْحَقُّ
وَسِينَ مُسْتَقِيمِ يَسْطُو يَسْقُو

• Ha (ح) harus jelas dan tipis, apalagi ketika berulang atau bertemu huruf yang mirip: حَصْحَصَ، أَحَطتُ، الْحَقُّ.
• Sin tetap tipis walaupun berdekatan dengan huruf isti'la: مُسْتَقِيمٍ، يَسْطُونَ، يَسْقُونَ. Sin yang ditebalkan akan terdengar seperti shad, sehingga maknanya bisa berubah.`
  },
  {
    slug: "jazariyah-hukum-ra",
    title: "Hukum Huruf Ra",
    category: "jazariyah",
    position: 60,
    summary: "Kapan ra dibaca tipis, kapan tebal, perbedaan pendapat pada kata firqin, dan cara menyembunyikan getaran ra yang bertasydid.",
    arabicText: "الرَّاءَاتُ",
    content: `Bab ini menjelaskan kapan huruf ra dibaca tipis dan kapan dibaca tebal.

وَرَقِّقِ الرَّاءَ إِذَا مَا كُسِرَتْ
كَذَاكَ بَعْدَ الْكَسْرِ حَيْثُ سَكَنَتْ

Ra dibaca tipis (tarqiq) dalam dua keadaan:
• Ra berharakat kasrah, contohnya: رِجَالٌ، الْغَارِمِينَ.
• Ra sukun yang didahului kasrah, contohnya: فِرْعَوْنَ، مِرْيَةٍ.

إِنْ لَمْ تَكُنْ مِنْ قَبْلِ حَرْفِ اسْتِعْلَا
أَوْ كَانَتِ الْكَسْرَةُ لَيْسَتْ أَصْلَا

Ra sukun setelah kasrah tetap dibaca tebal dalam dua keadaan:
• Setelah ra ada huruf isti'la dalam satu kata, contohnya: قِرْطَاسٍ، فِرْقَةٍ، لَبِالْمِرْصَادِ.
• Kasrah sebelumnya bukan kasrah asli, misalnya hamzah washal atau kasrah yang muncul karena bertemunya dua sukun, contohnya: ارْجِعُوا، إِنِ ارْتَبْتُمْ.

وَالْخُلْفُ فِي فِرْقٍ لِكَسْرٍ يُوجَدُ
وَأَخْفِ تَكْرِيرًا إِذَا تُشَدَّدُ

• Para ulama berbeda pendapat tentang ra pada kata فِرْقٍ (Asy-Syu'ara: 63) ketika dibaca washal. Huruf isti'la setelahnya, yaitu qaf, berharakat kasrah, sehingga ketebalannya melemah. Karena itu ra di sini boleh dibaca tebal maupun tipis.
• Ra bertasydid jangan dibaca dengan getaran berulang. Sifat takrir pada ra harus disembunyikan, yaitu lidah cukup bergetar sekali, bukan seperti "rrr". Contoh: الرَّحْمَنِ، مُحَرَّرًا.

Selain keadaan di atas, misalnya ra berharakat fathah atau dhammah, atau ra sukun setelah fathah atau dhammah, ra pada dasarnya dibaca tebal. Rinciannya bisa dilihat pada materi tajwid "Hukum Ra Tebal dan Tipis".`
  },
  {
    slug: "jazariyah-lam-dan-hukum-lainnya",
    title: "Lam Lafzhul Jalalah dan Hukum-Hukum Lainnya",
    category: "jazariyah",
    position: 70,
    summary: "Lam pada lafazh Allah, tingkatan tebal huruf isti'la, menjaga huruf sukun, membedakan huruf yang mirip, serta kaidah idgham mitslain dan mutajanisain.",
    arabicText: "اللَّامَاتُ وَأَحْكَامٌ مُتَفَرِّقَةٌ",
    content: `Bab ini dimulai dengan hukum lam pada lafazh "Allah", lalu dilanjutkan dengan beberapa hukum yang beragam.

وَفَخِّمِ اللَّامَ مِنِ اسْمِ اللَّهِ
عَنْ فَتْحٍ اوْ ضَمٍّ كَعَبْدُ اللَّهِ

Lam pada lafazh "Allah" dibaca tebal jika huruf sebelumnya berharakat fathah atau dhammah, seperti: قَالَ اللَّهُ، عَبْدُ اللَّهِ. Jika huruf sebelumnya berharakat kasrah, lam dibaca tipis, seperti: بِسْمِ اللَّهِ، لِلَّهِ.

وَحَرْفَ الِاسْتِعْلَاءِ فَخِّمْ وَاخْصُصَا
الِاطْبَاقَ أَقْوَى نَحْوُ قَالَ وَالْعَصَا

Huruf-huruf isti'la selalu dibaca tebal. Di antara huruf isti'la, huruf ithbaq (ص ض ط ظ) lebih tebal daripada yang lain. Contoh: ketebalan qaf pada قَالَ tidak setebal shad pada الْعَصَا.

وَبَيِّنِ الْإِطْبَاقَ مِنْ أَحَطتُ مَعْ
بَسَطتَ وَالْخُلْفُ بِنَخْلُقْكُمْ وَقَعْ

• Ketika huruf ithbaq bertemu huruf yang sejenis makhrajnya, sifat ithbaq-nya tetap harus terdengar walaupun hurufnya dilebur (idgham naqish), seperti: أَحَطتُ، بَسَطتَ. Tha tidak boleh berubah sepenuhnya menjadi ta.
• Pada نَخْلُقكُّمْ (Al-Mursalat: 20) ada dua cara baca: qaf dilebur sempurna ke kaf (idgham kamil), atau sifat isti'la qaf masih terdengar (idgham naqish). Yang lebih masyhur adalah idgham kamil.

وَاحْرِصْ عَلَى السُّكُونِ فِي جَعَلْنَا
أَنْعَمْتَ وَالْمَغْضُوبِ مَعْ ضَلَلْنَا

Jagalah huruf yang sukun agar diucapkan jelas dan tidak goyah, terutama ketika bertemu huruf yang mirip, seperti: جَعَلْنَا، أَنْعَمْتَ، الْمَغْضُوبِ، ضَلَلْنَا.

وَخَلِّصِ انْفِتَاحَ مَحْذُورًا عَسَى
خَوْفَ اشْتِبَاهِهِ بِمَحْظُورًا عَصَى

Jelaskan sifat infitah pada dzal dan sin di kata مَحْذُورًا (Al-Isra': 57) dan عَسَى. Jika ditebalkan, keduanya akan terdengar seperti مَحْظُورًا (Al-Isra': 20) dan عَصَى, sehingga maknanya berubah.

وَرَاعِ شِدَّةً بِكَافٍ وَبِتَا
كَشِرْكِكُمْ وَتَتَوَفَّى فِتْنَتَا

Jagalah sifat syiddah pada kaf dan ta, terutama ketika keduanya berulang, agar tidak terdengar berdesis seperti "kh" atau "ts". Contoh: بِشِرْكِكُمْ، تَتَوَفَّاهُمُ، فِتْنَتَنَا.

وَأَوَّلَيْ مِثْلٍ وَجِنْسٍ إِنْ سَكَنْ
أَدْغِمْ كَقُلْ رَبِّ وَبَلْ لَا وَأَبِنْ

Jika dua huruf yang sama (mitslain) atau dua huruf yang sama makhrajnya tetapi berbeda sifat (mutajanisain) bertemu, dan huruf pertama sukun, maka huruf pertama dileburkan (idgham), seperti: قُل رَّبِّ، بَل لَّا. Namun ada keadaan yang tetap dibaca jelas (izhhar), sebagaimana disebutkan pada bait berikutnya.

فِي يَوْمِ مَعْ قَالُوا وَهُمْ وَقُلْ نَعَمْ
سَبِّحْهُ لَا تُزِغْ قُلُوبَ فَالْتَقَمْ

Keadaan yang tetap dibaca jelas:
• Huruf pertama adalah huruf mad: فِي يَوْمٍ، قَالُوا وَهُمْ.
• Lam fi'il bertemu huruf yang berdekatan makhrajnya: قُلْ نَعَمْ.
• Dua huruf yang berdekatan makhrajnya: فَسَبِّحْهُ (ha bertemu ha), لَا تُزِغْ قُلُوبَنَا (ghain bertemu qaf), فَالْتَقَمَهُ (lam bertemu ta).`
  },
  {
    slug: "jazariyah-dhad-dan-zha",
    title: "Huruf Dhad dan Zha",
    category: "jazariyah",
    position: 80,
    summary: "Membedakan dhad dan zha dalam pengucapan, daftar kata-kata yang menggunakan zha dalam Al-Qur'an, dan cara membaca ketika keduanya bertemu.",
    arabicText: "الضَّادُ وَالظَّاءُ",
    content: `Dhad dan zha adalah dua huruf yang paling sering tertukar. Bab ini menjelaskan cara membedakan keduanya dan mendaftar kata-kata dalam Al-Qur'an yang ditulis dengan zha.

وَالضَّادَ بِاسْتِطَالَةٍ وَمَخْرَجِ
مَيِّزْ مِنَ الظَّاءِ وَكُلُّهَا تَجِي

Dhad harus dibedakan dari zha melalui dua hal: makhraj dan sifat istithalah. Dhad keluar dari sisi lidah dan makhrajnya memanjang, sedangkan zha keluar dari ujung lidah bersama ujung gigi seri atas. Kesalahan yang sering terjadi adalah mengganti dhad dengan zha, dal, zay, atau lam yang ditebalkan. Bait-bait berikutnya menyebut kata-kata dengan zha. Selain kata-kata ini, yang ada adalah dhad.

فِي الظَّعْنِ ظِلِّ الظُّهْرِ عُظْمِ الْحِفْظِ
أَيْقِظْ وَأَنْظِرْ عَظْمِ ظَهْرِ اللَّفْظِ

الظَّعْن (bepergian), ظِلّ (naungan), الظُّهْر (waktu zhuhur), العَظَمَة (keagungan, seperti عَظِيمٌ), الحِفْظ (menjaga), أَيْقَاظ (terjaga), الإِنْظَار (penangguhan), العَظْم (tulang), الظَّهْر (punggung), dan اللَّفْظ (ucapan).

ظَاهِرْ لَظَى شُوَاظُ كَظْمٍ ظَلَمَا
اغْلُظْ ظَلَامِ ظُفُرٍ انْتَظِرْ ظَمَا

ظَاهِر (yang tampak), لَظَى (api yang bergejolak), شُوَاظ (nyala api), الكَظْم (menahan amarah), الظُّلْم (kezaliman), الغِلْظَة (keras), الظَّلَام / الظُّلُمَات (kegelapan), ظُفُر (kuku), الانْتِظَار (menunggu), dan الظَّمَأ (haus).

أَظْفَرَ ظَنًّا كَيْفَ جَا وَعْظٍ سِوَى
عِضِينَ ظَلَّ النَّحْلِ زُخْرُفٍ سَوَا

أَظْفَرَ (memberi kemenangan), الظَّنّ dalam segala bentuknya, dan الوَعْظ (nasihat). Kata عِضِينَ (Al-Hijr: 91) dikecualikan karena ditulis dengan dhad. Lalu ظَلَّ (menjadi) pada An-Nahl: 58 dan Az-Zukhruf: 17.

وَظَلْتَ ظَلْتُمْ وَبِرُومٍ ظَلُّوا
كَالْحِجْرِ ظَلَّتْ شُعَرَا نَظَلُّ

Bentuk-bentuk lain dari ظَلَّ: ظَلْتَ (Thaha: 97), فَظَلْتُمْ (Al-Waqi'ah: 65), لَظَلُّوا (Ar-Rum: 51), فَظَلُّوا (Al-Hijr: 14), فَظَلَّتْ (Asy-Syu'ara: 4), dan فَنَظَلُّ (Asy-Syu'ara: 71).

يَظْلَلْنَ مَحْظُورًا مَعَ الْمُحْتَظِرِ
وَكُنْتَ فَظًّا وَجَمِيعِ النَّظَرِ

فَيَظْلَلْنَ (Asy-Syura: 33), مَحْظُورًا (terhalang), المُحْتَظِر (pembuat kandang), فَظًّا (keras hati), dan semua kata النَّظَر (melihat).

إِلَّا بِوَيْلٌ هَلْ وَأُولَى نَاضِرَهْ
وَالْغَيْظِ لَا الرَّعْدِ وَهُودٍ قَاصِرَهْ

• Kata نَضْرَة (berseri) ditulis dengan dhad: نَضْرَةَ النَّعِيمِ (Al-Muthaffifin: 24), نَضْرَةً وَسُرُورًا (Al-Insan: 11), dan kata pertama pada وُجُوهٌ يَوْمَئِذٍ نَاضِرَةٌ (Al-Qiyamah: 22). Kata kedua, إِلَى رَبِّهَا نَاظِرَةٌ, tetap dengan zha.
• الغَيْظ (marah) ditulis dengan zha, kecuali وَمَا تَغِيضُ الْأَرْحَامُ (Ar-Ra'd: 8) dan وَغِيضَ الْمَاءُ (Hud: 44) yang berarti berkurang atau surut.

وَالْحَظُّ لَا الْحَضُّ عَلَى الطَّعَامِ
وَفِي ضَنِينٍ الْخِلَافُ سَامِي

• الحَظّ (bagian) ditulis dengan zha, sedangkan الحَضّ (mendorong) dalam ayat tentang memberi makan orang miskin ditulis dengan dhad (Al-Haqqah: 34, Al-Fajr: 18, Al-Ma'un: 3).
• Pada بِضَنِينٍ (At-Takwir: 24) ada perbedaan qira'at. Riwayat Hafsh membacanya dengan dhad.

وَإِنْ تَلَاقَيَا الْبَيَانُ لَازِمُ
أَنْقَضَ ظَهْرَكَ يَعَضُّ الظَّالِمُ

Ketika dhad dan zha bertemu, keduanya wajib dibaca jelas (izhhar): أَنقَضَ ظَهْرَكَ، يَعَضُّ الظَّالِمُ.

وَاضْطُرَّ مَعْ وَعَظْتَ مَعْ أَفَضْتُمُ
وَصَفِّ هَا جِبَاهُهُمْ عَلَيْهِمُ

Demikian pula huruf-huruf yang berdekatan:
• Dhad bertemu tha: فَمَنِ اضْطُرَّ
• Zha bertemu ta: أَوَعَظْتَ
• Dhad bertemu ta: أَفَضْتُمْ
• Ha juga harus jelas ketika berulang: جِبَاهُهُمْ، عَلَيْهِمْ`
  },
  {
    slug: "jazariyah-mim-dan-nun",
    title: "Hukum Mim dan Nun",
    category: "jazariyah",
    position: 90,
    summary: "Ghunnah pada nun dan mim bertasydid, hukum mim sukun, serta empat hukum nun sukun dan tanwin menurut Al-Jazariyah.",
    arabicText: "الْمِيمُ وَالنُّونُ",
    content: `Bab ini membahas ghunnah, hukum mim sukun, serta hukum nun sukun dan tanwin.

وَأَظْهِرِ الْغُنَّةَ مِنْ نُونٍ وَمِنْ
مِيمٍ إِذَا مَا شُدِّدَا وَأَخْفِيَنْ

Ghunnah pada nun dan mim yang bertasydid harus ditampakkan dengan sempurna, karena di situlah ghunnah berada pada tingkatan terkuat. Contoh: إِنَّ، ثُمَّ، مِنَ الْجِنَّةِ وَالنَّاسِ.

الْمِيمَ إِنْ تَسْكُنْ بِغُنَّةٍ لَدَى
بَاءٍ عَلَى الْمُخْتَارِ مِنْ أَهْلِ الْأَدَا

Ikhfa syafawi: mim sukun yang bertemu ba disamarkan dengan ghunnah. Contoh: تَرْمِيهِمْ بِحِجَارَةٍ. Inilah pendapat yang dipilih oleh para ahli qira'at.

وَأَظْهِرَنْهَا عِنْدَ بَاقِي الْأَحْرُفِ
وَاحْذَرْ لَدَى وَاوٍ وَفَا أَنْ تَخْتَفِي

Izhhar syafawi: mim sukun yang bertemu huruf selain ba dan mim dibaca jelas. Contoh: أَنْعَمْتَ، لَهُمْ فِيهَا. Berhati-hatilah pada mim sukun sebelum wawu dan fa, karena makhrajnya berdekatan sehingga mim mudah ikut tersamarkan. Contoh: عَلَيْهِمْ وَلَا، هُمْ فِيهَا.

وَحُكْمُ تَنْوِينٍ وَنُونٍ يُلْفَى
إِظْهَارٌ ادْغَامٌ وَقَلْبٌ إِخْفَا

Nun sukun dan tanwin memiliki empat hukum: izhhar, idgham, iqlab (qalb), dan ikhfa.

فَعِنْدَ حَرْفِ الْحَلْقِ أَظْهِرْ وَادَّغِمْ
فِي اللَّامِ وَالرَّا لَا بِغُنَّةٍ لَزِمْ

• Izhhar halqi: nun sukun atau tanwin bertemu enam huruf tenggorokan (ء هـ ع ح غ خ), nun dibaca jelas tanpa dengung tambahan. Contoh: مَنْ آمَنَ، عَلِيمٌ حَكِيمٌ.
• Idgham bila ghunnah: nun sukun atau tanwin bertemu lam atau ra, nun dilebur sempurna tanpa ghunnah. Contoh: مِنْ لَدُنْهُ، غَفُورٌ رَحِيمٌ. Inilah bacaan riwayat Hafsh dari jalur Asy-Syathibiyyah.

وَأَدْغِمَنْ بِغُنَّةٍ فِي يُومِنُ
إِلَّا بِكِلْمَةٍ كَدُنْيَا عَنْوَنُوا

Idgham bighunnah: nun sukun atau tanwin bertemu huruf يُومِنُ (ي و م ن), nun dilebur dengan ghunnah. Contoh: مَنْ يَقُولُ، مِنْ وَالٍ. Pengecualiannya, jika nun dan huruf tersebut berada dalam satu kata, nun dibaca jelas (izhhar muthlaq). Hanya ada empat kata seperti ini: الدُّنْيَا، صِنْوَانٌ، قِنْوَانٌ، بُنْيَانٌ.

وَالْقَلْبُ عِنْدَ الْبَا بِغُنَّةٍ كَذَا
الِاخْفَا لَدَى بَاقِي الْحُرُوفِ أُخِذَا

• Iqlab: nun sukun atau tanwin bertemu ba, nun berubah menjadi mim yang disamarkan dengan ghunnah. Contoh: مِنْ بَعْدِ، سَمِيعٌ بَصِيرٌ.
• Ikhfa haqiqi: nun sukun atau tanwin bertemu lima belas huruf sisanya, nun disamarkan dengan ghunnah dan lidah bersiap menuju makhraj huruf berikutnya. Contoh: مِنْ قَبْلِ، أَنْتُمْ، رِيحًا صَرْصَرًا.`
  },
  {
    slug: "jazariyah-mad-dan-qashr",
    title: "Mad dan Qashr",
    category: "jazariyah",
    position: 100,
    summary: "Tiga hukum mad menurut Al-Jazariyah: lazim, wajib, dan jaiz, beserta sebab dan panjang bacaannya.",
    arabicText: "الْمَدُّ وَالْقَصْرُ",
    content: `Mad artinya memanjangkan suara pada huruf mad lebih dari panjang aslinya. Qashr artinya membacanya sesuai panjang asli, yaitu dua harakat. Huruf mad ada tiga: alif setelah fathah, wawu sukun setelah dhammah, dan ya sukun setelah kasrah.

وَالْمَدُّ لَازِمٌ وَوَاجِبٌ أَتَى
وَجَائِزٌ وَهْوَ وَقَصْرٌ ثَبَتَا

Hukum mad far'i ada tiga: lazim, wajib, dan jaiz. Pada sebagian keadaan, mad dan qashr sama-sama diriwayatkan.

فَلَازِمٌ إِنْ جَاءَ بَعْدَ حَرْفِ مَدّْ
سَاكِنُ حَالَيْنِ وَبِالطُّولِ يُمَدّْ

Mad lazim: setelah huruf mad ada huruf sukun asli yang tetap sukun ketika washal maupun waqaf. Dibaca panjang (thul), yaitu enam harakat. Contoh: الضَّالِّينَ، الْحَاقَّةُ، آلْآنَ, dan huruf-huruf pembuka surat seperti الٓمٓ.

وَوَاجِبٌ إِنْ جَاءَ قَبْلَ هَمْزَةِ
مُتَّصِلًا إِنْ جُمِعَا بِكِلْمَةِ

Mad wajib (muttashil): huruf mad bertemu hamzah dalam satu kata. Wajib dipanjangkan lebih dari dua harakat. Dalam riwayat Hafsh jalur Asy-Syathibiyyah dibaca empat atau lima harakat. Contoh: جَاءَ، سُوءَ، سِيئَتْ.

وَجَائِزٌ إِذَا أَتَى مُنْفَصِلَا
أَوْ عَرَضَ السُّكُونُ وَقْفًا مُسْجَلَا

Mad jaiz ada dua bentuk:
• Mad munfashil: huruf mad di akhir kata dan hamzah di awal kata berikutnya. Boleh dipanjangkan atau dibaca qashr sesuai riwayat dan jalurnya. Dalam riwayat Hafsh jalur Asy-Syathibiyyah dibaca empat atau lima harakat. Contoh: بِمَا أُنْزِلَ، قُوا أَنْفُسَكُمْ.
• Mad 'aridh lissukun: setelah huruf mad ada huruf berharakat yang disukunkan karena waqaf. Boleh dibaca dua, empat, atau enam harakat. Contoh ketika waqaf: الْعَالَمِينْ، نَسْتَعِينْ، يَعْلَمُونْ.

Panjang bacaan sebaiknya konsisten. Jika mad munfashil dibaca empat harakat, bacalah empat harakat di semua tempat dalam satu bacaan, sesuai pesan bait "wal-lafzhu fi nazhirihi kamitslihi" pada bab Hukum dan Hakikat Tajwid.`
  },
  {
    slug: "jazariyah-waqaf-dan-ibtida",
    title: "Waqaf dan Ibtida'",
    category: "jazariyah",
    position: 110,
    summary: "Pentingnya mengetahui tempat berhenti dan memulai bacaan, pembagian waqaf menjadi tam, kafi, hasan, dan qabih, serta hukum waqaf dalam Al-Qur'an.",
    arabicText: "الْوَقْفُ وَالِابْتِدَاءُ",
    content: `Bab ini membahas tempat berhenti (waqaf) dan tempat memulai (ibtida') ketika membaca Al-Qur'an.

وَبَعْدَ تَجْوِيدِكَ لِلْحُرُوفِ
لَا بُدَّ مِنْ مَعْرِفَةِ الْوُقُوفِ

وَالِابْتِدَاءِ وَهْيَ تُقْسَمُ إِذَنْ
ثَلَاثَةٌ تَامٌّ وَكَافٍ وَحَسَنْ

Setelah membaguskan pengucapan huruf, seorang pembaca juga harus mengetahui tempat berhenti dan tempat memulai. Kesempurnaan bacaan terletak pada dua hal ini: tajwidul huruf wa ma'rifatul wuquf. Waqaf yang dibolehkan terbagi menjadi tiga: tam, kafi, dan hasan.

وَهْيَ لِمَا تَمَّ فَإِنْ لَمْ يُوجَدِ
تَعَلُّقٌ أَوْ كَانَ مَعْنًى فَابْتَدِي

Ketiga waqaf tersebut terjadi pada kalimat yang maknanya sudah sempurna. Jika kalimat itu tidak lagi berhubungan dengan kalimat sesudahnya, atau hanya berhubungan dari sisi makna, bacaan dimulai dari kata sesudahnya.

فَالتَّامُّ فَالْكَافِي وَلَفْظًا فَامْنَعَنْ
إِلَّا رُؤُوسَ الْآيِ جَوِّزْ فَالْحَسَنْ

• Waqaf tam (sempurna): tidak ada hubungan lafazh maupun makna dengan kalimat sesudahnya. Biasanya terjadi di akhir kisah atau akhir surat.
• Waqaf kafi (cukup): masih ada hubungan makna, tetapi tidak ada hubungan lafazh (i'rab).
• Waqaf hasan (baik): masih ada hubungan lafazh dan makna. Boleh berhenti, tetapi jangan memulai dari kata sesudahnya. Kembalilah ke kata sebelumnya yang pantas, kecuali jika berhenti di akhir ayat (ra'sul ayah). Berhenti di akhir ayat dibolehkan dan bacaan boleh dilanjutkan dari ayat berikutnya, karena berhenti di setiap akhir ayat termasuk sunnah.

وَغَيْرُ مَا تَمَّ قَبِيحٌ وَلَهُ
يُوقَفُ مُضْطَرًّا وَيُبْدَا قَبْلَهُ

Waqaf qabih (buruk) adalah berhenti pada kalimat yang belum sempurna, misalnya berhenti di antara mudhaf dan mudhaf ilaih, atau pada kata yang membuat makna menjadi rusak. Waqaf seperti ini tidak boleh disengaja. Jika terpaksa berhenti, misalnya karena kehabisan napas atau bersin, ulangilah dari kata sebelumnya yang pantas agar maknanya tetap utuh.

وَلَيْسَ فِي الْقُرْآنِ مِنْ وَقْفٍ وَجَبْ
وَلَا حَرَامٍ غَيْرَ مَا لَهُ سَبَبْ

Pada dasarnya tidak ada waqaf yang wajib dan tidak ada yang haram secara syar'i dalam Al-Qur'an. Hukumnya baru berubah jika ada sebab. Contohnya, orang yang sengaja berhenti agar makna ayat berubah, seperti berhenti pada إِنَّ اللَّهَ لَا يَسْتَحْيِي, dapat terjatuh pada yang haram, bahkan kekufuran jika ia meyakini makna yang rusak itu.`
  },
  {
    slug: "jazariyah-maqthu-dan-maushul",
    title: "Maqthu' dan Maushul",
    category: "jazariyah",
    position: 120,
    summary: "Kata-kata dalam mushaf Utsmani yang ditulis terpisah (maqthu') atau bersambung (maushul), dan kaitannya dengan waqaf.",
    arabicText: "الْمَقْطُوعُ وَالْمَوْصُولُ",
    content: `Bab ini membahas kata-kata yang dalam mushaf ditulis terpisah atau bersambung.

وَاعْرِفْ لِمَقْطُوعٍ وَمَوْصُولٍ وَتَا
فِي مُصْحَفِ الْإِمَامِ فِيمَا قَدْ أَتَى

Pembaca Al-Qur'an perlu mengetahui kata-kata yang dalam Mushaf Imam (mushaf 'Utsmani) ditulis terpisah (maqthu') dan bersambung (maushul), serta ta' ta'nits yang ditulis terbuka. Pengetahuan ini penting untuk waqaf: kata yang ditulis terpisah boleh dihentikan pada kata pertamanya, sedangkan kata yang ditulis bersambung hanya boleh dihentikan di akhir gabungannya. Hal ini terutama berlaku ketika terpaksa berhenti (idhthirari) atau ketika diuji oleh guru (ikhtibari).

فَاقْطَعْ بِعَشْرِ كَلِمَاتٍ أَنْ لَا
مَعْ مَلْجَأٍ وَلَا إِلَهَ إِلَّا

أَنْ لَا ditulis terpisah (أن لا) di sepuluh tempat, dua di antaranya: أَن لَّا مَلْجَأَ (At-Taubah: 118) dan أَن لَّا إِلَهَ إِلَّا هُوَ (Hud: 14).

وَتَعْبُدُوا يَاسِينَ ثَانِي هُودَ لَا
يُشْرِكْنَ تُشْرِكْ يَدْخُلَنْ تَعْلُوا عَلَى

Lanjutannya: أَن لَّا تَعْبُدُوا الشَّيْطَانَ (Yasin: 60), أَن لَّا تَعْبُدُوا إِلَّا اللَّهَ (Hud: 26, yang kedua dalam surat itu), أَن لَّا يُشْرِكْنَ (Al-Mumtahanah: 12), أَن لَّا تُشْرِكْ (Al-Hajj: 26), أَن لَّا يَدْخُلَنَّهَا (Al-Qalam: 24), dan وَأَن لَّا تَعْلُوا (Ad-Dukhan: 19).

أَنْ لَا يَقُولُوا لَا أَقُولَ إِنَّ مَا
بِالرَّعْدِ وَالْمَفْتُوحَ صِلْ وَعَنْ مَا

• Dua tempat terakhir untuk أَن لَّا adalah أَن لَّا يَقُولُوا (Al-A'raf: 169) dan أَن لَّا أَقُولَ (Al-A'raf: 105). Di luar sepuluh tempat ini ditulis bersambung: أَلَّا.
• إِن مَّا terpisah pada Ar-Ra'd: 40. Bentuk berhamzah fathah, أَمَّا, selalu bersambung.

نُهُوا اقْطَعُوا مِنْ مَا بِرُومٍ وَالنِّسَا
خُلْفُ الْمُنَافِقِينَ أَمْ مَنْ أَسَّسَا

• عَن مَّا terpisah pada عَن مَّا نُهُوا عَنْهُ (Al-A'raf: 166).
• مِن مَّا terpisah pada Ar-Rum: 28 dan An-Nisa': 25, sedangkan pada Al-Munafiqun: 10 diperselisihkan.
• أَم مَّنْ terpisah pada أَم مَّنْ أَسَّسَ (At-Taubah: 109).

فُصِّلَتِ النِّسَا وَذِبْحٍ حَيْثُ مَا
وَأَنْ لَمِ الْمَفْتُوحَ كَسْرُ إِنَّ مَا

• أَم مَّنْ juga terpisah pada Fushshilat: 40, An-Nisa': 109, dan Ash-Shaffat: 11.
• حَيْثُ مَا selalu terpisah.
• أَن لَّمْ dengan hamzah fathah selalu terpisah.

الْأَنْعَامَ وَالْمَفْتُوحَ يَدْعُونَ مَعَا
وَخُلْفُ الْأَنْفَالِ وَنَحْلٍ وَقَعَا

• إِنَّ مَا terpisah pada إِنَّ مَا تُوعَدُونَ لَآتٍ (Al-An'am: 134), dan diperselisihkan pada An-Nahl: 95.
• أَنَّ مَا terpisah pada وَأَنَّ مَا يَدْعُونَ (Al-Hajj: 62 dan Luqman: 30), dan diperselisihkan pada Al-Anfal: 41.

وَكُلِّ مَا سَأَلْتُمُوهُ وَاخْتُلِفْ
رُدُّوا كَذَا قُلْ بِئْسَمَا وَالْوَصْلَ صِفْ

• كُلِّ مَا terpisah pada مِن كُلِّ مَا سَأَلْتُمُوهُ (Ibrahim: 34). Pada كُلَّ مَا رُدُّوا (An-Nisa': 91) diperselisihkan, dan dalam riwayat Hafsh ditulis terpisah.
• بِئْسَ مَا pada قُلْ بِئْسَمَا (Al-Baqarah: 93) juga diperselisihkan. Tempat yang bersambung disebutkan pada bait berikutnya.

خَلَفْتُمُونِي وَاشْتَرَوْا فِي مَا اقْطَعَا
أُوحِي أَفَضْتُمُ اشْتَهَتْ يَبْلُو مَعَا

• بِئْسَمَا bersambung pada بِئْسَمَا خَلَفْتُمُونِي (Al-A'raf: 150) dan بِئْسَمَا اشْتَرَوْا (Al-Baqarah: 90). Selain itu terpisah.
• فِي مَا terpisah pada: Al-An'am: 145 (أُوحِيَ), An-Nur: 14 (أَفَضْتُمْ), Al-Anbiya': 102 (اشْتَهَتْ), serta Al-Ma'idah: 48 dan Al-An'am: 165 (لِيَبْلُوَكُمْ).

ثَانِي فَعَلْنَ وَقَعَتْ رُومٌ كِلَا
تَنْزِيلُ شُعَرَا وَغَيْرَ ذِي صِلَا

Lanjutan tempat فِي مَا yang terpisah: Al-Baqarah: 240 (فَعَلْنَ yang kedua), Al-Waqi'ah: 61, Ar-Rum: 28, Az-Zumar: 3 dan 46, serta Asy-Syu'ara': 146. Selain sebelas tempat ini ditulis bersambung: فِيمَا.

فَأَيْنَمَا كَالنَّحْلِ صِلْ وَمُخْتَلِفْ
فِي الشُّعَرَا الْأَحْزَابِ وَالنِّسَا وُصِفْ

أَيْنَمَا bersambung pada Al-Baqarah: 115 dan An-Nahl: 76, diperselisihkan pada Asy-Syu'ara': 92, Al-Ahzab: 61, dan An-Nisa': 78, dan terpisah di tempat lainnya.

وَصِلْ فَإِلَّمْ هُودَ أَلَّنْ نَجْعَلَا
نَجْمَعَ كَيْلَا تَحْزَنُوا تَأْسَوْا عَلَى

• فَإِلَّمْ bersambung pada Hud: 14.
• أَلَّن bersambung pada أَلَّن نَّجْعَلَ (Al-Kahf: 48) dan أَلَّن نَّجْمَعَ (Al-Qiyamah: 3).
• لِكَيْلَا bersambung pada لِكَيْلَا تَحْزَنُوا (Ali 'Imran: 153) dan لِكَيْلَا تَأْسَوْا (Al-Hadid: 23).

حَجٌّ عَلَيْكَ حَرَجٌ وَقَطْعُهُمْ
عَنْ مَنْ يَشَاءُ مَنْ تَوَلَّى يَوْمَ هُمْ

• لِكَيْلَا juga bersambung pada Al-Hajj: 5 dan لِكَيْلَا يَكُونَ عَلَيْكَ حَرَجٌ (Al-Ahzab: 50).
• عَن مَّن terpisah pada عَن مَّن يَشَاءُ (An-Nur: 43) dan عَن مَّن تَوَلَّى (An-Najm: 29).
• يَوْمَ هُم terpisah pada Ghafir: 16 dan Adz-Dzariyat: 13.

وَمَالِ هَذَا وَالَّذِينَ هَؤُلَا
تَحِينَ فِي الْإِمَامِ صِلْ وَوُهِّلَا

• Lam jarr pada مَالِ terpisah dari kata sesudahnya pada مَالِ هَذَا (Al-Kahf: 49, Al-Furqan: 7), فَمَالِ الَّذِينَ (Al-Ma'arij: 36), dan فَمَالِ هَؤُلَاءِ (An-Nisa': 78).
• وَلَاتَ حِينَ (Shad: 3) diperselisihkan dalam Mushaf Imam. Pendapat yang dipilih dalam riwayat Hafsh adalah terpisah.

وَوَزَنُوهُمْ وَكَالُوهُمْ صِلِ
كَذَا مِنَ الْ وَيَا وَهَا لَا تَفْصِلِ

كَالُوهُمْ dan وَزَنُوهُمْ (Al-Muthaffifin: 3) ditulis bersambung tanpa alif setelah wawu. Demikian pula al ta'rif, ya nida', dan ha tanbih selalu bersambung dengan kata sesudahnya.

Daftar ini cukup panjang, jadi cara terbaik untuk menguasainya adalah menghafal baitnya lalu mencocokkannya langsung dengan mushaf rasm 'Utsmani.`
  },
  {
    slug: "jazariyah-taat",
    title: "Ta' Ta'nits yang Ditulis Terbuka",
    category: "jazariyah",
    position: 130,
    summary: "Kata-kata dalam mushaf yang ta' ta'nits-nya ditulis dengan ta' terbuka (ت), bukan ta' marbuthah (ة), beserta cara mewaqafkannya.",
    arabicText: "التَّاءَاتُ",
    content: `Ta' ta'nits (penanda feminin) pada kata benda tunggal biasanya ditulis dengan ta' marbuthah (ة) dan dibaca "ha" ketika waqaf. Namun di beberapa tempat, mushaf 'Utsmani menulisnya dengan ta' terbuka (ت). Dalam riwayat Hafsh, kata-kata ini diwaqafkan dengan bunyi "t" sesuai tulisannya.

وَرَحْمَتُ الزُّخْرُفِ بِالتَّا زَبَرَهْ
الْأَعْرَافِ رُومٍ هُودَ كَافِ الْبَقَرَهْ

رَحْمَت ditulis dengan ta' terbuka di tujuh tempat: Az-Zukhruf: 32 (dua kali), Al-A'raf: 56, Ar-Rum: 50, Hud: 73, Maryam: 2 (surat yang dibuka dengan كٓهيعٓصٓ), dan Al-Baqarah: 218.

نِعْمَتُهَا ثَلَاثُ نَحْلٍ إِبْرَهَمْ
مَعًا أَخِيرَاتٌ عُقُودُ الثَّانِ هَمّْ

نِعْمَت ditulis dengan ta' terbuka di sebelas tempat. Tujuh di antaranya: Al-Baqarah: 231, An-Nahl: 72, 83, dan 114, Ibrahim: 28 dan 34, serta Al-Ma'idah: 11 (yang sebelum هَمَّ kedua).

لُقْمَانُ ثُمَّ فَاطِرٌ كَالطُّورِ
عِمْرَانَ لَعْنَتَ بِهَا وَالنُّورِ

• Empat tempat sisanya untuk نِعْمَت: Luqman: 31, Fathir: 3, Ath-Thur: 29, dan Ali 'Imran: 103.
• لَعْنَت: Ali 'Imran: 61 dan An-Nur: 7.

وَامْرَأَتٌ يُوسُفَ عِمْرَانَ الْقَصَصْ
تَحْرِيمَ مَعْصِيَتْ بِقَدْ سَمِعْ يُخَصّْ

• امْرَأَت, ketika disandarkan kepada suaminya: Yusuf: 30 dan 51, Ali 'Imran: 35, Al-Qashash: 9, serta At-Tahrim: 10 (dua kali) dan 11.
• مَعْصِيَت: Al-Mujadilah: 8 dan 9 (surat yang dibuka dengan قَدْ سَمِعَ).

شَجَرَتَ الدُّخَانِ سُنَّتْ فَاطِرِ
كُلًّا وَالَانْفَالِ وَحَرْفَ غَافِرِ

• شَجَرَت: Ad-Dukhan: 43.
• سُنَّت: Fathir: 43 (tiga kali), Al-Anfal: 38, dan Ghafir: 85.

قُرَّتُ عَيْنٍ جَنَّتٌ فِي وَقَعَتْ
فِطْرَتْ بَقِيَّتْ وَابْنَتْ وَكَلِمَتْ

قُرَّتُ عَيْنٍ (Al-Qashash: 9), جَنَّتُ نَعِيمٍ (Al-Waqi'ah: 89), فِطْرَتَ (Ar-Rum: 30), بَقِيَّتُ (Hud: 86), ابْنَتَ (At-Tahrim: 12), dan كَلِمَتُ yang disebutkan pada bait berikutnya.

أَوْسَطَ الَاعْرَافِ وَكُلُّ مَا اخْتُلِفْ
جَمْعًا وَفَرْدًا فِيهِ بِالتَّاءِ عُرِفْ

• كَلِمَتُ pada pertengahan surat Al-A'raf (ayat 137).
• Setiap kata yang dibaca tunggal oleh sebagian qurra' dan jamak oleh sebagian lainnya ditulis dengan ta' terbuka, agar tulisannya dapat menampung kedua bacaan. Contoh: كَلِمَتُ رَبِّكَ (Al-An'am: 115), آيَاتٌ لِلسَّائِلِينَ (Yusuf: 7), dan غَيَابَتِ الْجُبِّ (Yusuf: 10).`
  },
  {
    slug: "jazariyah-hamzah-washal",
    title: "Hamzah Washal",
    category: "jazariyah",
    position: 140,
    summary: "Cara memulai bacaan dari hamzah washal: kapan dibaca dhammah, kasrah, atau fathah, pada kata kerja maupun kata benda.",
    arabicText: "هَمْزَةُ الْوَصْلِ",
    content: `Hamzah washal adalah hamzah yang dibaca ketika memulai bacaan, tetapi gugur ketika disambung dengan kata sebelumnya. Dalam mushaf biasanya ditandai dengan alif yang di atasnya ada tanda shad kecil (ٱ).

وَابْدَأْ بِهَمْزِ الْوَصْلِ مِنْ فِعْلٍ بِضَمّْ
إِنْ كَانَ ثَالِثٌ مِنَ الْفِعْلِ يُضَمّْ

Pada kata kerja (fi'il), lihatlah huruf ketiganya. Jika huruf ketiga berharakat dhammah asli, hamzah washal dibaca dhammah. Contoh: اُدْعُ، اُنْظُرْ، اُخْرُجْ.

وَاكْسِرْهُ حَالَ الْكَسْرِ وَالْفَتْحِ وَفِي
الَاسْمَاءِ غَيْرَ اللَّامِ كَسْرُهَا وَفِي

• Jika huruf ketiganya berharakat kasrah atau fathah, hamzah washal dibaca kasrah. Contoh: اِضْرِبْ، اِرْجِعُوا، اِذْهَبْ، اِعْلَمُوا.
• Pada kata benda (isim) yang tidak diawali al ta'rif, hamzah washal dibaca kasrah.
• Pada al ta'rif, hamzah washal dibaca fathah. Contoh: اَلْحَمْدُ، اَلْكِتَابُ.

ابْنٍ مَعَ ابْنَةِ امْرِئٍ وَاثْنَيْنِ
وَامْرَأَةٍ وَاسْمٍ مَعَ اثْنَتَيْنِ

Kata benda dengan hamzah washal di dalam Al-Qur'an, yang semuanya dibaca kasrah ketika memulai: اِبْنٌ (anak laki-laki), اِبْنَةٌ (anak perempuan), اِمْرُؤٌ (seorang laki-laki), اِثْنَانِ / اِثْنَيْنِ (dua), اِمْرَأَةٌ (seorang perempuan), اِسْمٌ (nama), dan اِثْنَتَانِ / اِثْنَتَيْنِ (dua, untuk perempuan). Hal yang sama berlaku pada mashdar dari fi'il khumasi dan sudasi, seperti: اِنْتِقَامٌ، اِسْتِغْفَارٌ.

Catatan: kata kerja yang huruf ketiganya berharakat dhammah 'aridh (bukan asli) tetap dibaca kasrah ketika memulai. Contohnya اِمْشُوا، اِقْضُوا، dan ائْتُوا, karena asal huruf ketiganya adalah kasrah.`
  },
  {
    slug: "jazariyah-waqaf-akhir-kata",
    title: "Waqaf di Akhir Kata: Raum dan Isymam",
    category: "jazariyah",
    position: 150,
    summary: "Cara berhenti di akhir kata: sukun murni, raum (sebagian harakat), dan isymam (isyarat bibir), serta harakat mana saja yang boleh memakainya.",
    arabicText: "الْوَقْفُ عَلَى أَوَاخِرِ الْكَلِمِ",
    content: `Bab ini menjelaskan cara berhenti di akhir kata. Asal waqaf adalah mensukunkan huruf terakhir (sukun mahdh). Ada dua cara lain yang juga diriwayatkan, yaitu raum dan isymam.

وَحَاذِرِ الْوَقْفَ بِكُلِّ الْحَرَكَهْ
إِلَّا إِذَا رُمْتَ فَبَعْضُ حَرَكَهْ

Ketika berhenti di akhir kata, hindari membaca huruf terakhir dengan harakat yang utuh. Pengecualiannya adalah raum, yaitu membaca huruf terakhir dengan sebagian harakatnya, kira-kira sepertiga harakat, dengan suara lirih yang hanya terdengar oleh orang di dekat pembaca.

إِلَّا بِفَتْحٍ أَوْ بِنَصْبٍ وَأَشِمّْ
إِشَارَةً بِالضَّمِّ فِي رَفْعٍ وَضَمّْ

• Raum hanya boleh pada huruf yang berharakat dhammah atau kasrah. Raum tidak boleh pada harakat fathah atau nashab, karena fathah terlalu ringan untuk dibagi.
• Isymam: setelah huruf terakhir disukunkan, kedua bibir dimonyongkan seperti mengucapkan dhammah, tanpa suara. Isymam hanya boleh pada huruf berharakat dhammah atau rafa', sehingga hanya dapat dilihat dan tidak terdengar.

Ringkasan:
• Huruf berharakat dhammah: boleh sukun murni, raum, atau isymam. Contoh: نَسْتَعِينُ.
• Huruf berharakat kasrah: boleh sukun murni atau raum. Contoh: الرَّحِيمِ.
• Huruf berharakat fathah: hanya sukun murni. Contoh: الْعَالَمِينَ.

Raum dan isymam tidak berlaku pada ta' marbuthah yang diwaqafkan menjadi ha, pada mim jamak, dan pada harakat 'aridh. Cara melakukan raum dan isymam sebaiknya dipelajari langsung dari guru, karena keduanya sulit dipahami hanya dari tulisan.`
  },
  {
    slug: "jazariyah-khatimah",
    title: "Khatimah",
    category: "jazariyah",
    position: 160,
    summary: "Penutup nazham Al-Jazariyah: jumlah baitnya, keutamaan membaguskan bacaan, serta pujian dan shalawat penutup.",
    arabicText: "الْخَاتِمَةُ",
    content: `Imam Ibnul Jazari menutup nazhamnya dengan beberapa bait berikut.

وَقَدْ تَقَضَّى نَظْمِيَ الْمُقَدِّمَهْ
مِنِّي لِقَارِئِ الْقُرْآنِ تَقْدِمَهْ

Nazham "Al-Muqaddimah" telah selesai, sebagai persembahan dari penulis untuk para pembaca Al-Qur'an.

أَبْيَاتُهَا قَافٌ وَزَايٌ فِي الْعَدَدْ
مَنْ يُحْسِنِ التَّجْوِيدَ يَظْفَرْ بِالرَّشَدْ

Jumlah baitnya adalah "qaf" dan "zay". Dalam hitungan abjad, qaf bernilai 100 dan zay bernilai 7, sehingga totalnya 107 bait. Siapa yang membaguskan tajwidnya akan memperoleh petunjuk dan kebaikan.

وَالْحَمْدُ لِلَّهِ لَهَا خِتَامُ
ثُمَّ الصَّلَاةُ بَعْدُ وَالسَّلَامُ

عَلَى النَّبِيِّ الْمُصْطَفَى وَآلِهِ
وَصَحْبِهِ وَتَابِعِي مِنْوَالِهِ

Nazham ditutup dengan pujian kepada Allah, lalu shalawat dan salam kepada Nabi pilihan, Muhammad ﷺ, beserta keluarga, para sahabat, dan orang-orang yang mengikuti jalan beliau.

Catatan: menurut banyak syarah, bait "أَبْيَاتُهَا قَافٌ وَزَايٌ..." dan bait terakhir "عَلَى النَّبِيِّ الْمُصْطَفَى..." merupakan tambahan dari ulama sesudah Imam Ibnul Jazari. Karena itu, sebagian cetakan menghitung 107 bait dan sebagian lagi 109 bait.

Setelah menyelesaikan seri ini, langkah terbaik adalah menghafal matannya secara bertahap dan menyetorkannya kepada guru (talaqqi), sebagaimana pesan bait "wa laisa bainahu wa baina tarkihi illa riyadhatumri'in bifakkihi": kemahiran tajwid hanya bisa diraih melalui latihan lisan yang terus-menerus.

Wallahu a'lam.`
  }
];
