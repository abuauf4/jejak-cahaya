export interface Character {
  id: string;
  name: string;
  title: string;
  shortBio: string;
  fullBio: string;
  role: string;
  period: string;
  eventIds: string[];
  references: string[];
}

export const characters: Character[] = [
  {
    id: "muhammad",
    name: "Nabi Muhammad ﷺ",
    title: "Rasulullah — Penutup Para Nabi",
    shortBio: "Nabi terakhir yang diutus untuk seluruh umat manusia, membawa risalah Islam dan menjadi teladan terbaik.",
    fullBio: `Muhammad bin Abdullah bin Abdul Muthalib lahir di Makkah pada tahun 570 Masehi, dikenal dengan tahun Gajah. Ia lahir sebagai yatim — ayahnya Abdullah wafat sebelum ia lahir — dan ibunya Aminah wafat saat ia berusia enam tahun. Dibesarkan oleh kakeknya Abdul Muthalib lalu pamannya Abu Thalib, Muhammad tumbuh sebagai pemuda yang paling jujur dan terpercaya di Makkah, digelari Al-Amin.

Pada usia 25 tahun, ia menikah dengan Khadijah binti Khuwailid, wanita terhormat yang mengagumi kejujurannya. Pada usia 40 tahun, ia menerima wahyu pertama di Gua Hira, menandai dimulainya misi kenabian. Selama 23 tahun berikutnya, beliau menyampaikan risalah Islam, menghadapi perlawanan keras dari kaum Quraisy, berhijrah ke Madinah, membangun masyarakat Islam, dan pada akhirnya kembali menaklukkan Makkah tanpa pertumpahan darah.

Beliau wafat pada tahun 632 M di Madinah, meninggalkan warisan yang mengubah seluruh peradaban manusia. Bukan kerajaan yang ia wariskan, tetapi risalah yang terus hidup — cahaya yang tak pernah padam.`,
    role: "Rasulullah — Utusan Allah",
    period: "570–632 M",
    eventIds: ["kelahiran", "penyusuan-bani-saad", "kematian-aminah", "perniagaan-khadijah", "pernikahan-khadijah", "wahyu-pertama", "dakwah-terang", "isra-miraj", "hijrah", "perang-badar", "hudaibiyah", "fathu-makkah"],
    references: ["Shahih Bukhari", "Shahih Muslim", "Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
  {
    id: "khadijah",
    name: "Khadijah binti Khuwailid",
    title: "Istri Pertama — Pendukung Utama",
    shortBio: "Wanita terhormat Makkah yang menjadi istri pertama Rasulullah ﷺ dan pendukung terbesar di masa-masa tersulit.",
    fullBio: `Khadijah binti Khuwailid adalah wanita dari klan Quraisy yang paling terhormat dan berhasil di bidang perdagangan. Ia dikenal dengan gelar At-Thahirah — Yang Suci — bahkan sebelum Islam datang. Setelah suaminya wafat, ia menjalankan sendiri perniagaannya yang luas, mengirim kafilah ke Syam dan Yaman.

Ketika ia mendengar tentang Muhammad bin Abdullah yang digelari Al-Amin, ia mempekerjakannya untuk memimpin kafilah dagangnya ke Syam. Kejujuran, kecakapan, dan akhlak Muhammad membuatnya terpukau. Melalui perantaraan Nufaisah, ia meminang Muhammad — keputusan yang mengubah sejarah.

Selama 25 tahun pernikahan, Khadijah adalah satu-satunya istri Muhammad. Ia bukan sekadar istri — ia adalah sahabat, penasihat, dan pelindung. Ketika Muhammad menerima wahyu pertama dan ketakutan, Khadijah-lah yang memeluknya dan meyakinkannya. Ia adalah orang pertama yang beriman kepada risalah Muhammad.

Khadijah wafat pada tahun ke-10 kenabian (619 M), dalam usia 65 tahun. Kematian itu menjadi pukulan terbesar bagi Rasulullah ﷺ, sehingga tahun itu disebut 'Am al-Huzn — Tahun Kesedihan. Bertahun-tahun setelah wafatnya, beliau selalu mengenang Khadijah dan berkata, "Aku dicintai olehnya, dan aku mencintainya."`,
    role: "Istri Pertama Rasulullah ﷺ, Mu'min Pertama",
    period: "555–619 M",
    eventIds: ["perniagaan-khadijah", "pernikahan-khadijah", "wahyu-pertama"],
    references: ["Shahih Bukhari 3820", "Shahih Muslim 2435", "Sirah Ibnu Hisyam"],
  },
  {
    id: "abu-bakar",
    name: "Abu Bakar as-Siddiq",
    title: "Sahabat Terdekat — Khalifah Pertama",
    shortBio: "Sahabat terdekat Rasulullah ﷺ, mu'min pertama dari kalangan dewasa, dan khalifah pertama umat Islam.",
    fullBio: `Abdullah bin Abu Quhafah, lebih dikenal sebagai Abu Bakar, adalah sahabat terdekat Rasulullah ﷺ sejak sebelum Islam. Ia adalah orang pertama dari kalangan dewasa yang memeluk Islam tanpa ragu — ketika Muhammad menceritakan wahyu yang diterimanya, Abu Bakar langsung beriman.

Ia digelari as-Siddiq — Yang Membenarkan — setelah membenarkan peristiwa Isra' Mi'raj ketika banyak yang meragukannya. Abu Bakar selalu berada di sisi Rasulullah dalam setiap peristiwa penting: di Gua Tsur saat hijrah, di Badar, di Uhud, di Hudaibiyah, dan di haji perpisahan.

Abu Bakar adalah ayah dari Aisyah, istri Rasulullah ﷺ. Ia dikenal sebagai orang yang paling dermawan — memerdekakan budak Muslim yang disiksa, membeli sumur untuk kaum Muslimin, dan menyedekahkan seluruh hartanya. Setelah wafatnya Rasulullah ﷺ, Abu Bakar menjadi khalifah pertama dan berhasil mempertahankan kesatuan umat Islam di masa transisi yang paling kritis.`,
    role: "Sahabat Terdekat, Khalifah Pertama",
    period: "573–634 M",
    eventIds: ["isra-miraj", "hijrah", "hudaibiyah"],
    references: ["Shahih Bukhari", "Shahih Muslim", "Sirah Ibnu Hisyam"],
  },
  {
    id: "umar",
    name: "Umar bin Khattab",
    title: "Al-Faruq — Pemisah Kebenaran",
    shortBio: "Khalifah kedua yang dikenal tegas dalam kebenaran, keadilan, dan kebijaksanaan dalam memimpin umat Islam.",
    fullBio: `Umar bin Khattab adalah salah satu tokoh paling berpengaruh dalam sejarah Islam. Sebelum memeluk Islam, ia dikenal sebagai pemuda Quraisy yang paling tegas dan ditakuti. Ia bahkan berniat membunuh Muhammad karena menganggap Islam mengancam tradisi kaumnya.

Namun perjalanan menuju rumah saudarinya untuk membunuhnya justru mengubah segalanya. Ia mendengar ayat-ayat Al-Qur'an yang dibaca oleh Fatimah dan suaminya, dan hatinya terguncang. Keketuhan itu hancur, digantikan oleh keyakinan yang membakar. Saat ia mengucapkan syahadat, Rasulullah ﷺ bersabda bahwa malam itu Islam menjadi kuat.

Umar digelari Al-Faruq — Yang Memisahkan Kebenaran dari Kebatalan — karena keputusannya yang tegas dan adil. Ia menjadi khalifah kedua setelah Abu Bakar, dan di masa kepemimpinannya, kekaisaran Islam meluas dari Persia hingga Mesir. Ia dikenal karena keadilannya, kepeduliannya terhadap rakyat, dan kezuhudannya meski memimpin kekaisaran terbesar di zamannya.`,
    role: "Khalifah Kedua, Al-Faruq",
    period: "584–644 M",
    eventIds: ["perang-badar", "hudaibiyah", "fathu-makkah"],
    references: ["Shahih Bukhari", "Shahih Muslim", "Sirah Ibnu Hisyam"],
  },
  {
    id: "ali",
    name: "Ali bin Abi Thalib",
    title: "Sang Pemberani — Khalifah Keempat",
    shortBio: "Sepupu dan menantu Rasulullah ﷺ, dikenal sebagai pejuang yang pemberani dan ahli ilmu yang mendalam.",
    fullBio: `Ali bin Abi Thalib adalah sepupu Rasulullah ﷺ yang tinggal di rumahnya sejak kecil. Ia adalah anak pertama yang memeluk Islam, pada usia sekitar 10 tahun. Ali tumbuh di bawah asuhan langsung Rasulullah ﷺ, menyerap ilmu dan akhlaknya.

Dalam Perang Badar, Ali menunjukkan keberanian luar biasa, mengalahkan champion Quraisy dalam duel. Dalam Perang Khandaq, ia mengalahkan Amr bin Abdi Wudd, pejuang terkuat Quraisy, dalam duel yang menjadi legendaris. Rasulullah ﷺ bersabda tentang Ali: "Aku adalah kota ilmu dan Ali adalah pintunya."

Ali menikah dengan Fatimah az-Zahra, putri Rasulullah ﷺ, dan menjadi khalifah keempat setelah Utsman. Ia dikenal sebagai ahli ilmu, ahli pidato, dan pejuang yang tak tertandingi. Kebijaksanaannya dalam menyelesaikan sengketa dan kedalaman ilmunya menjadi rujukan hingga kini.`,
    role: "Khalifah Keempat, Sepupu Rasulullah ﷺ",
    period: "600–661 M",
    eventIds: ["hijrah", "perang-badar", "hudaibiyah", "fathu-makkah"],
    references: ["Shahih Bukhari", "Shahih Muslim", "Sirah Ibnu Hisyam"],
  },
  {
    id: "hamzah",
    name: "Hamzah bin Abdul Muthalib",
    title: "Singa Allah — Sayyidus Syuhada",
    shortBio: "Paman Rasulullah ﷺ yang menjadi pelindung utama, gugur sebagai syuhada Uhud dengan wajah yang tetap gagah.",
    fullBio: `Hamzah bin Abdul Muthalib adalah paman Rasulullah ﷺ yang hampir seusia dengannya. Sebelum Islam, ia adalah pemburu yang tangguh dan pejuang yang ditakuti di seluruh jazirah Arab. Ia memeluk Islam setelah mengetahui Abu Jahal menghina keponakannya — kemarahannya kepada Abu Jahal berubah menjadi kekuatan yang ia dedikasikan untuk Islam.

Di Perang Badar, Hamzah memimpin sayap pasukan dan mengalahkan Syaibah bin Rabi'ah dalam duel. Keberaniannya membuat seluruh pasukan Muslim bersemangat. Ia digelari Asadullah — Singa Allah — oleh Rasulullah ﷺ.

Hamzah gugur sebagai syahid di Perang Uhud, dikepung oleh pasukan yang disewa oleh Hindun binti Utbah. Meski jasadnya dimutilasi, wajahnya tetap tenang — seolah ia masih tersenyum. Rasulullah ﷺ menangis di sisi jasadnya dan bersabda, "Aku tidak akan pernah melupakan penderitaan yang kau alami, wahai Hamzah."`,
    role: "Paman Rasulullah ﷺ, Singa Allah",
    period: "568–625 M",
    eventIds: ["perang-badar"],
    references: ["Shahih Bukhari", "Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
  {
    id: "bilal",
    name: "Bilal bin Rabah",
    title: "Mu'adzin Pertama — Suara Kebebasan",
    shortBio: "Budak yang dimerdekakan karena imannya, menjadi mu'adzin pertama Islam dengan suara yang menggetarkan langit.",
    fullBio: `Bilal bin Rabah adalah seorang budak keturunan Habsyi (Ethiopia) yang dimiliki oleh Umayyah bin Khalaf. Ia memeluk Islam dan menghadapi penyiksaan yang paling kejam dari majikannya. Di bawah terik matahari Makkah, ia dibaringkan di atas pasir membara, batu besar diletakkan di dadanya, dan Umayyah berteriak, "Kamu akan tetap seperti ini sampai kamu mati atau mencela Muhammad!"

Tapi dari dada yang terbakar itu, hanya keluar satu kata: "Ahad... Ahad... Ahad..." — Esa... Esa... Esa...

Abu Bakar membeli dan memerdekakan Bilal. Ia menjadi salah satu dari orang-orang pertama yang bebas di bawah Islam — bukan karena kekuatan senjata, tetapi karena kekuatan iman.

Ketika Islam berdiri di Madinah dan Rasulullah ﷺ membutuhkan suara untuk mengajak orang shalat, Bilal-lah yang dipilih. Suaranya yang merdu dan kuat bergema dari atas rumah tertinggi di Madinah: "Allahu Akbar... Allahu Akbar..." — suara yang menggantikan derit penyiksaan dengan panggilan sujud.

Ketika Fathu Makkah, Bilal naik ke atas Ka'bah dan mengumandangkan adzan. Bagi Umayyah dan Quraisy yang pernah menyiksanya, itu adalah pengingat bahwa keadilan itu nyata — bahwa budak yang mereka injak kini berdiri di tempat yang paling suci, dan suaranya yang paling keras.`,
    role: "Mu'adzin Pertama Islam",
    period: "?–640 M",
    eventIds: ["fathu-makkah"],
    references: ["Shahih Bukhari", "Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
  {
    id: "aminah",
    name: "Aminah binti Wahb",
    title: "Ibunda Rasulullah ﷺ",
    shortBio: "Ibu dari Nabi Muhammad ﷺ yang wafat saat putranya berusia enam tahun, meninggalkan kenangan cinta yang tak terlupakan.",
    fullBio: `Aminah binti Wahb adalah ibunda Rasulullah ﷺ, dari klan Bani Zuhrah. Ia menikah dengan Abdullah bin Abdul Muthalib, dan kehamilannya disertai dengan tanda-tanda istimewa — cahaya yang memancar dari perutnya yang dikatakan menerangi istana-istana Syam.

Abdullah wafat dalam perjalanan dagang ke Madinah sebelum anaknya lahir, meninggalkan Aminah sendirian mengandung dan melahirkan. Ia memberikan nama Muhammad — nama yang belum dikenal di kalangan Quraisy — dengan harapan putranya akan dipuji oleh seluruh penghuni langit dan bumi.

Aminah merawat Muhammad hingga usia penyusuan selesai, lalu membawanya ke Madinah untuk mengenalkannya pada kerabat Bani Najjar dan makam ayahnya. Namun di perjalanan pulang, ia jatuh sakit di Abwa' dan wafat. Muhammad yang berusia enam tahun kehilangan satu-satunya orang tua yang ia kenal.

Wafatnya Aminah menjadi duka pertama dalam perjalanan panjang Muhammad ﷺ — duka yang akan berulang kali datang, namun juga yang membentuk kelembutan dan kekuatan hatinya.`,
    role: "Ibunda Rasulullah ﷺ",
    period: "?–576 M",
    eventIds: ["kelahiran", "kematian-aminah"],
    references: ["Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
  {
    id: "abdul-muthalib",
    name: "Abdul Muthalib",
    title: "Kakek Rasulullah ﷺ",
    shortBio: "Kakek Nabi Muhammad ﷺ yang merawatnya setelah kematian ibunya, pemimpin Bani Hasyim yang dihormati.",
    fullBio: `Abdul Muthalib bin Hasyim adalah kakek Nabi Muhammad ﷺ dari pihak ayah. Ia adalah pemimpin Bani Hasyim dan penjaga sumur Zamzam, salah satu posisi paling terhormat di Makkah. Setelah wafatnya Aminah, ia mengambil alih perawatan Muhammad kecil dan memberikan kasih sayang yang luar biasa.

Abdul Muthalib selalu mengutamakan Muhammad di atas anak-anaknya yang lain. Ia menyediakan tempat tidur khusus di dekatnya, membawanya ke majelis-majelis terhormat, dan melindunginya dari segala hal yang bisa menyakitinya. Ia adalah orang yang memberi nama Muhammad — nama yang ia impikan akan mendatangkan pujian.

Ia wafat saat Muhammad berusia delapan tahun, meninggalkan wasiat kepada Abu Thalib untuk merawat cucunya. Kematian Abdul Muthalib menandai berakhirnya masa perlindungan pertama dalam hidup Muhammad kecil.`,
    role: "Kakek Rasulullah ﷺ, Pemimpin Bani Hasyim",
    period: "?–578 M",
    eventIds: ["kelahiran", "kematian-aminah"],
    references: ["Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
  {
    id: "jibril",
    name: "Malaikat Jibril",
    title: "Pembawa Wahyu — Ar-Ruh Al-Amin",
    shortBio: "Malaikat yang ditugasi menyampaikan wahyu Allah kepada para nabi dan rasul, termasuk Rasulullah ﷺ.",
    fullBio: `Jibril — dalam Al-Qur'an disebut juga Ar-Ruh Al-Amin (Roh yang Terpercaya) dan Ruhul Qudus — adalah malaikat yang ditugasi menyampaikan wahyu Allah kepada para nabi dan rasul. Dalam sejarah Sirah, Jibril memainkan peran sentral sebagai perantara antara Allah dan Rasulullah ﷺ.

Jibril pertama kali muncul di Gua Hira, menyampaikan lima ayat pertama surah Al-'Alaq dengan perintah "Iqra' — Bacalah!" Momen itu menandai dimulainya wahyu dan misi kenabian Muhammad ﷺ. Selama 23 tahun, Jibril menyampaikan ayat-ayat Al-Qur'an secara bertahap, sesuai dengan kebutuhan dan situasi yang dihadapi umat Islam.

Dalam peristiwa Isra' Mi'raj, Jibril menemani Rasulullah ﷺ dalam perjalanan malam dari Masjidil Haram ke Masjidil Aqsa dan naik melalui tujuh langit. Ia juga mendampingi Rasulullah ﷺ dalam berbagai momen penting, termasuk saat permusuhan meningkat dan saat kemenangan diraih. Jibril mengajarkan cara shalat, menjelaskan ayat-ayat yang sulit, dan memberikan kabar gembira maupun peringatan dari Allah.`,
    role: "Pembawa Wahyu, Ar-Ruh Al-Amin",
    period: "Sejak penciptaan",
    eventIds: ["wahyu-pertama", "isra-miraj"],
    references: ["QS. Al-Baqarah 97-98", "QS. An-Najm 5-10", "Shahih Bukhari"],
  },
  {
    id: "halimah",
    name: "Halimah as-Sa'diyah",
    title: "Ibu Susu — Wanita yang Diberkahi",
    shortBio: "Wanita dari Bani Sa'ad yang menjadi ibu susu Rasulullah ﷺ, membawa keberkahan luar biasa bagi keluarganya.",
    fullBio: `Halimah binti Abi Dzu'aib adalah wanita dari suku Bani Sa'ad bin Bakr yang datang ke Makkah untuk mencari bayi yang akan disusuinya. Tahun itu tahun kemarau, keadaannya sulit, dan ia berharap menemukan bayi dari keluarga kaya yang bisa memberinya imbalan.

Namun setiap bayi yang ia tawari menolak karena ia miskin. Hanya tersisa Muhammad, bayi yatim dari Bani Hasyim tanpa ayah yang bisa membayar mahal. Dengan berat hati, Halimah menerima bayi itu — keputusan yang ternyata membawa keberkahan luar biasa.

Sejak Muhammad berada dalam asuhannya, susu Halimah yang hampir habis mengalir deras, untanya yang kurus mulai gemuk, dan kebunnya yang gersang menjadi subur. Keberkahan itu begitu nyata sehingga suaminya berkata, "Wahai Halimah, anak ini benar-benar diberkahi."

Selama empat tahun, Halimah merawat Muhammad di padang pasir Bani Sa'ad. Ia menyaksikan tumbuh kembang anak yang luar biasa itu — tenang, jujur, dan berbeda dari anak-anak lainnya. Bahkan setelah Muhammad dikembalikan ke ibunya, ikatan antara keduanya tetap kuat hingga kelak Rasulullah ﷺ selalu memuliakan Halimah setiap kali mereka bertemu.`,
    role: "Ibu Susu Rasulullah ﷺ",
    period: "Aktif sekitar 570–574 M",
    eventIds: ["penyusuan-bani-saad"],
    references: ["Shahih Muslim 2639", "Sirah Ibnu Hisyam"],
  },
  {
    id: "abu-lahab",
    name: "Abu Lahab",
    title: "Musuh Terdekat dari Keluarga",
    shortBio: "Paman Rasulullah ﷺ yang menjadi musuh terbesar Islam dari kalangan keluarga sendiri, dikutuk dalam surah Al-Masad.",
    fullBio: `Abdul Uzza bin Abdul Muthalib, yang dikenal sebagai Abu Lahab (Bapak Api), adalah paman Rasulullah ﷺ dari pihak ayah. Meski berasal dari keluarga yang sama, Abu Lahab menjadi salah satu musuh paling vokal dan kejam terhadap Islam.

Ketika Rasulullah ﷺ berdiri di Bukit Shafa untuk mengajak kaum Quraisy secara terbuka, Abu Lahab adalah orang pertama yang menolak dan mencelanya. Ia berteriak, "Celakah engkau! Untuk inikah engkau kumpulkan kami?" Sebagai tanggapan, turunlah surah Al-Masad yang menyatakan kebinasaannya.

Abu Lahab dan istrinya Ummu Jamil melakukan segala cara untuk menghalangi dakwah Islam. Ia menghasut masyarakat untuk menolak pesan Muhammad, menyebarkan kebohongan, dan menghasut penyiksaan terhadap kaum lemah yang beriman. Ironisnya, ia adalah saudara kandung dari Abu Thalib yang justru melindungi Rasulullah ﷺ.

Abu Lahab wafat beberapa hari setelah Perang Badar, meninggal dalam keadaan yang memalukan — tak mau disentuh oleh keluarganya karena penyakit yang menular, dan dimakamkan tanpa penghormatan. Surah Al-Masad menjadi monumen abadi bagi siapa pun yang memusuhi kebenaran dari dalam rumahnya sendiri.`,
    role: "Musuh Islam dari Keluarga Rasulullah ﷺ",
    period: "?–624 M",
    eventIds: ["dakwah-terang"],
    references: ["QS. Al-Masad", "Shahih Bukhari 4770", "Sirah Ibnu Hisyam"],
  },
  {
    id: "abu-sufyan",
    name: "Abu Sufyan bin Harb",
    title: "Dari Musuh ke Saudara",
    shortBio: "Pemimpin Quraisy yang memusuhi Islam selama bertahun-tahun sebelum akhirnya memeluk Islam menjelang Fathu Makkah.",
    fullBio: `Abu Sufyan bin Harb adalah salah satu pemimpin paling berpengaruh di Makkah dan menjadi musuh utama Islam selama bertahun-tahun. Ia memimpin perlawanan Quraisy terhadap Muslim dalam beberapa pertempuran besar, termasuk Perang Uhud dan Perang Khandaq.

Sebagai pemimpin kafilah dagang Qurayah yang nyaris dicegat oleh Muslim — yang kemudian memicu Perang Badar — Abu Sufyan memainkan peran sentral dalam konflik awal antara Makkah dan Madinah. Kepandaiannya dalam strategi dan pengaruhnya di kalangan Quraisy membuatnya menjadi lawan yang tangguh.

Namun menjelang Fathu Makkah, ketika sepuluh ribu pasukan Muslim mendekati kota, Abu Sufyan menyadari bahwa perlawanan adalah sia-sia. Ia bertemu Rasulullah ﷺ dan menyatakan keislamanannya. Rasulullah ﷺ memaafkannya dan bahkan memberikan jaminan keamanan: "Barangsiapa memasuki rumah Abu Sufyan, ia aman."

Setelah memeluk Islam, Abu Sufyan menjadi sahabat yang setia. Ia ikut berperang di pihak Muslim dalam Pertempuran Hunain dan Yarmuk. Perubahannya dari musuh menjadi saudara menjadi salah satu bukti terbesar bahwa Islam mampu mengubah hati yang paling memusuhi pun — bukan dengan pedang, tetapi dengan kebaikan dan ampunan.`,
    role: "Mantan Musuh, Kemudian Sahabat",
    period: "560–650 M",
    eventIds: ["fathu-makkah"],
    references: ["Shahih Bukhari", "Sirah Ibnu Hisyam", "Ar-Rahiq Al-Makhtum"],
  },
];

export function getCharacterById(id: string): Character | undefined {
  return characters.find((c) => c.id === id);
}

export function getCharactersByEvent(eventId: string): Character[] {
  return characters.filter((c) => c.eventIds.includes(eventId));
}
