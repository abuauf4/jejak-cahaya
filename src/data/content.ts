// ═══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Scalable Content Architecture
// Collection → Journey → Event → Story → Character → Location → Reference
// ═══════════════════════════════════════════════════════

// ── Core Types ──────────────────────────────────────

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverTheme: string; // color theme for this collection
  journeyIds: string[];
  status: 'active' | 'coming_soon';
  order: number;
}

export interface Journey {
  id: string;
  collectionId: string;
  title: string;
  subtitle: string;
  period: string;
  yearStart: number;
  yearEnd: number;
  description: string;
  color: string;
  eventIds: string[];
  order: number;
}

export interface StoryEvent {
  id: string;
  journeyId: string;
  collectionId: string;
  title: string;
  subtitle: string;
  year: string;
  yearNum: number;
  description: string;
  story: string; // demo content — will be replaced after review
  featured: boolean;
  characterIds: string[];
  locationId: string;
  references: string[];
  order: number;
}

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

export interface StoryLocation {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  coordinates: string;
  eventIds: string[];
  significance: string;
}

// ── Collections ─────────────────────────────────────

export const collections: Collection[] = [
  {
    id: 'sirah-nabawiyah',
    slug: 'sirah-nabawiyah',
    title: 'Sirah Nabawiyah',
    subtitle: 'Perjalanan Hidup Rasulullah ﷺ',
    description: 'Menelusuri jejak kehidupan Rasulullah ﷺ dari konteks dunia pra-Islam hingga legacy yang abadi.',
    coverTheme: '#D4A843',
    journeyIds: [
      'dunia-pra-islam',
      'kelahiran-masa-kecil',
      'masa-pemuda',
      'masa-kenabian-awal',
      'dakwah-terang-terangan',
      'hijrah-pembangunan-madinah',
      'masa-pertahanan',
      'perdamaian-kemenangan',
    ],
    status: 'active',
    order: 1,
  },
  {
    id: 'kisah-sahabat',
    slug: 'kisah-sahabat',
    title: 'Kisah Para Sahabat',
    subtitle: 'Para Pembawa Cahaya',
    description: 'Kisah para sahabat Rasulullah ﷺ yang mengorbankan segalanya untuk membela risalah Islam.',
    coverTheme: '#2D6A4F',
    journeyIds: [],
    status: 'coming_soon',
    order: 2,
  },
  {
    id: 'kisah-nabi',
    slug: 'kisah-nabi',
    title: 'Kisah Para Nabi',
    subtitle: 'Rangkaian Risalah Ilahi',
    description: 'Perjalanan para nabi dan rasul dari Adam hingga Muhammad ﷺ.',
    coverTheme: '#6B4C8A',
    journeyIds: [],
    status: 'coming_soon',
    order: 3,
  },
  {
    id: 'peradaban-islam',
    slug: 'peradaban-islam',
    title: 'Peradaban Islam',
    subtitle: 'Cahaya yang Menerangi Dunia',
    description: 'Jejak peradaban Islam dari Andalusia hingga Nusantara.',
    coverTheme: '#8B4513',
    journeyIds: [],
    status: 'coming_soon',
    order: 4,
  },
];

// ── Journeys (Sirah Nabawiyah) ──────────────────────

export const journeys: Journey[] = [
  {
    id: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Dunia Sebelum Islam',
    subtitle: 'Kegelapan yang Menantikan Cahaya',
    period: 'Sebelum 570 M',
    yearStart: -3000,
    yearEnd: 569,
    description: 'Memahami konteks dunia dan Jazirah Arab sebelum kelahiran Rasulullah ﷺ — dari kondisi masyarakat, tradisi, hingga peristiwa Tahun Gajah.',
    color: '#6B5B3E',
    eventIds: ['jazirah-arab', 'makkah-kota', 'kabah-sejarah', 'suku-quraisy', 'tahun-gajah'],
    order: 1,
  },
  {
    id: 'kelahiran-masa-kecil',
    collectionId: 'sirah-nabawiyah',
    title: 'Kelahiran & Masa Kecil',
    subtitle: 'Cahaya yang Tiba',
    period: '570–576 M',
    yearStart: 570,
    yearEnd: 576,
    description: 'Kelahiran Nabi Muhammad ﷺ di Makkah, masa penyusuan di Bani Sa\'ad, dan kehilangan kedua orang tua.',
    color: '#8B6914',
    eventIds: ['kelahiran', 'penyusuan-bani-saad', 'kematian-aminah'],
    order: 2,
  },
  {
    id: 'masa-pemuda',
    collectionId: 'sirah-nabawiyah',
    title: 'Masa Pemuda',
    subtitle: 'Al-Amin yang Terpercaya',
    period: '576–609 M',
    yearStart: 576,
    yearEnd: 609,
    description: 'Bertumbuh di Makkah, dikenal sebagai Al-Amin, berdagang, dan menikah dengan Khadijah.',
    color: '#D4A843',
    eventIds: ['perniagaan-khadijah', 'pernikahan-khadijah'],
    order: 3,
  },
  {
    id: 'masa-kenabian-awal',
    collectionId: 'sirah-nabawiyah',
    title: 'Masa Kenabian Awal',
    subtitle: 'Ketika Langit Berbicara',
    period: '610–613 M',
    yearStart: 610,
    yearEnd: 613,
    description: 'Menerima wahyu pertama di Gua Hira, dakwah secara sembunyi-sembunyi, dan pengikut awal.',
    color: '#F5D78E',
    eventIds: ['wahyu-pertama'],
    order: 4,
  },
  {
    id: 'dakwah-terang-terangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Dakwah Terang-terangan',
    subtitle: 'Menyeru di Tengah Badai',
    period: '613–620 M',
    yearStart: 613,
    yearEnd: 620,
    description: 'Dakwah secara terbuka, perlawanan Quraisy, boikot, dan Tahun Kesedihan.',
    color: '#C4B59A',
    eventIds: ['dakwah-terang', 'isra-miraj'],
    order: 5,
  },
  {
    id: 'hijrah-pembangunan-madinah',
    collectionId: 'sirah-nabawiyah',
    title: 'Hijrah & Madinah',
    subtitle: 'Membangun Dunia Baru',
    period: '620–624 M',
    yearStart: 620,
    yearEnd: 624,
    description: 'Perjalanan dari Makkah ke Madinah, membangun masyarakat baru, dan Piagam Madinah.',
    color: '#D4A843',
    eventIds: ['hijrah'],
    order: 6,
  },
  {
    id: 'masa-pertahanan',
    collectionId: 'sirah-nabawiyah',
    title: 'Masa Pertahanan',
    subtitle: 'Mempertahankan Cahaya',
    period: '624–628 M',
    yearStart: 624,
    yearEnd: 628,
    description: 'Perang Badar, Uhud, Khandaq, dan tantangan mempertahankan komunitas Muslim.',
    color: '#8B6914',
    eventIds: ['perang-badar'],
    order: 7,
  },
  {
    id: 'perdamaian-kemenangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Perdamaian & Kemenangan',
    subtitle: 'Cahaya yang Menyeluruh',
    period: '628–632 M',
    yearStart: 628,
    yearEnd: 632,
    description: 'Perjanjian Hudaibiyah, Fathu Makkah, Haji Wada\', dan wafatnya Rasulullah ﷺ.',
    color: '#F5D78E',
    eventIds: ['hudaibiyah', 'fathu-makkah'],
    order: 8,
  },
];

// ── Events ──────────────────────────────────────────

export const events: StoryEvent[] = [
  // ── Dunia Sebelum Islam ──
  {
    id: 'jazirah-arab',
    journeyId: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Jazirah Arab Sebelum Islam',
    subtitle: 'Dunia yang Menantikan Cahaya',
    year: 'Sebelum 570 M',
    yearNum: -500,
    description: 'Kondisi Jazirah Arab dan dunia sebelum Islam — kegelapan sosial, tradisi jahiliah, dan kerinduan akan risalah baru.',
    story: `Dunia pada abad ke-6 Masehi berada dalam kegelapan yang panjang. Di barat, Kekaisaran Romawi dan Persia saling berperang tanpa henti, menguras sumber daya dan menumpuk darah. Di Jazirah Arab, kabilah-kabilah saling berperang karena perbedaan yang paling sepele — sebuah unta dicuri, sebuah kata yang menyinggung, dan peperangan bisa berlangsung puluhan tahun.

Masyarakat Arab pra-Islam memiliki kebaikan — kedermawanan, kesetiaan kabilah, keberanian — namun juga terjebak dalam tradisi yang kejam: mengubur bayi perempuan hidup-hidup, merampas hak waris wanita, dan menyembah berhala yang tidak bisa mendengar ataupun menolong.

Ka'bah yang dibangun oleh Ibrahim dan Ismail untuk menyembah Allah, kini dipenuhi 360 berhala. Zaman ini disebut Jahiliah — bukan berarti mereka bodoh, tetapi mereka hidup tanpa petunjuk. Dan di tengah kegelapan itu, dunia menantikan cahaya.`,
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: ['Sirah Ibnu Hisyam 1/33', 'Ar-Rahiq Al-Makhtum hal. 35'],
    order: 1,
  },
  {
    id: 'makkah-kota',
    journeyId: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Makkah: Kota di Lembah Gurun',
    subtitle: 'Sumur Zamzam dan Lembah Teringan',
    year: 'Sebelum 570 M',
    yearNum: -400,
    description: 'Kota Makkah — dari sumur Zamzam hingga menjadi pusat perdagangan dan spiritual Jazirah Arab.',
    story: `Makkah terletak di lembah gurun yang kering dan gersang, dikelilingi oleh pegunungan hitam yang membatasi langitnya. Kota ini tidak memiliki sungai, tidak memiliki tanah yang subur, dan tidak memiliki sumber daya alam yang menarik. Namun Makkah memiliki sesuatu yang lebih berharga dari semua itu: Sumur Zamzam dan Ka'bah.

Sumur Zamzam adalah sumber air yang tak pernah kering di tengah gurun. Ka'bah adalah bangunan suci yang menarik peziarah dari seluruh Jazirah Arab. Kedua hal ini menjadikan Makkah sebagai titik pertemuan — tempat di mana kabilah-kabilah yang saling bermusuhan berhenti berperang selama bulan-bulan suci.

Makkah juga menjadi pusat perdagangan. Kafilah-kafilah berdatangan dari Syam, Yaman, dan Mesir. Pasar-pasar terbentuk di sekitar Ka'bah. Kota kecil di lembah gurun ini menjadi jantung Jazirah Arab — tempat di mana agama, perdagangan, dan politik berpadu.

Dan di kota inilah, seorang bayi akan lahir dan mengubah segalanya.`,
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: ['Sirah Ibnu Hisyam 1/40', 'Ar-Rahiq Al-Makhtum hal. 42'],
    order: 2,
  },
  {
    id: 'kabah-sejarah',
    journeyId: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Ka\'bah: Rumah yang Dibangun Kembali',
    subtitle: 'Dari Ibrahim hingga Quraisy',
    year: 'Sebelum 570 M',
    yearNum: -300,
    description: 'Sejarah Ka\'bah — dari pembangunan oleh Nabi Ibrahim hingga peristiwa penempatan Hajar Aswad oleh Muhammad muda.',
    story: `Ka'bah adalah bangunan pertama yang dibangun untuk menyembah Allah. Al-Qur'an menyebutnya "Baitullah" — Rumah Allah. Menurut sejarah, Nabi Ibrahim dan putranya Ismail membangun Ka'bah di tempat yang ditunjukkan oleh Allah, dan sejak saat itu bangunan itu menjadi pusat ibadah.

Namun seiring berjalannya waktu, Ka'bah berubah. Berhala-berhala mulai mengisi interior dan eksteriornya. Tiga ratus enam puluh berhala mengelilingi Ka'bah saat Muhammad ﷺ lahir. Rumah yang dibangun untuk Tuhan Yang Esa kini menjadi rumah bagi ratusan tuhan palsu.

Sebuah peristiwa penting terjadi sebelum kenabian: banjir besar merusak dinding Ka'bah, dan Quraisy memutuskan untuk membangun kembali. Namun ketika tiba saatnya menempatkan kembali Hajar Aswad — batu hitam suci — setiap klan Quraisy bersaing untuk mendapatkan kehormatan itu. Perdebatan hampir berujung pertumpahan darah.

Mereka sepakat: siapa yang pertama kali memasuki gerbang Ka'bah esok pagi akan menjadi penengah. Dan orang yang pertama memasuki gerbang itu adalah Muhammad — pemuda yang dikenal sebagai Al-Amin. Ia meletakkan Hajar Aswad di atas kain, meminta setiap kepala klan memegang satu sisi kain, dan bersama-sama mereka mengangkat batu itu ke tempatnya. Konflik berakhir tanpa darah.

Peristiwa itu menunjukkan apa yang akan menjadi ciri Muhammad ﷺ sepanjang hidupnya: kebijaksanaan yang mencari solusi, bukan kemenangan.`,
    featured: true,
    characterIds: ['muhammad'],
    locationId: 'makkah',
    references: ['Shahih Bukhari 1584', 'Sirah Ibnu Hisyam 1/152', 'Ar-Rahiq Al-Makhtum hal. 58'],
    order: 3,
  },
  {
    id: 'suku-quraisy',
    journeyId: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Suku Quraisy',
    subtitle: 'Penjaga Ka\'bah, Penguasa Makkah',
    year: 'Sebelum 570 M',
    yearNum: -200,
    description: 'Suku Quraisy — klan yang menguasai Makkah, menjaga Ka\'bah, dan nantinya menjadi penentang terbesar Islam.',
    story: `Quraisy adalah suku paling berkuasa di Jazirah Arab. Mereka adalah keturunan Fihr bin Malik, dan nama mereka berasal dari kata "taqarrusy" yang berarti berkumpul dan berdagang. Quraisy menguasai Makkah, menjaga Ka'bah, dan mengelola urusan peziarah.

Di antara klan-klan Quraisy, Bani Hasyim adalah yang paling dihormati. Mereka bertanggung jawab memberi makan dan minum para peziarah (rifadah dan siqayah). Abdul Muthalib, kakek Nabi Muhammad ﷺ, adalah pemimpin Bani Hasyim yang sangat dihormati.

Namun kekuasaan Quraisy memiliki sisi gelap. Mereka memonopoli perdagangan, menindas kelas bawah, memperbudak yang lemah, dan menggunakan agama sebagai alat kekuasaan. Ketika Islam datang membawa pesan kesetaraan di hadapan Allah, Quraisy lah yang paling keras menolak — bukan karena mereka tidak mengerti, tetapi karena mereka mengerti terlalu baik: Islam mengancam kekuasaan mereka.

Dunia yang dibangun Quraisy adalah dunia di mana yang kuat menang dan yang lemah tersisih. Dan di dunia itu, seorang yatim piatu dari Bani Hasyim akan membuktikan bahwa kekuatan sejati bukan terletak pada kekuasaan, tetapi pada kebenaran.`,
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: ['QS. Quraisy 1-4', 'Sirah Ibnu Hisyam 1/50'],
    order: 4,
  },
  {
    id: 'tahun-gajah',
    journeyId: 'dunia-pra-islam',
    collectionId: 'sirah-nabawiyah',
    title: 'Tahun Gajah',
    subtitle: 'Pasukan yang Dihancurkan dari Langit',
    year: '570 M',
    yearNum: 570,
    description: 'Serangan Aburahah ke Ka\'bah dan kehancuran pasukan gajah — tahun di mana Muhammad ﷺ lahir.',
    story: `Tahun 570 Masehi dikenal sebagai Tahun Gajah — tahun di mana pasukan gajah yang luar biasa dihancurkan oleh kekuatan dari langit. Peristiwa ini dicatat dalam Al-Qur'an surah Al-Fil.

Aburahah, gubernur Kristen Yaman di bawah kekuasaan Kerajaan Habsyi, membangun sebuah gereja megah di Shan'a. Ia bertekad mengalihkan peziarah dari Ka'bah ke gerejanya. Namun orang-orang Arab tidak tertarik — Ka'bah tetap menjadi tujuan mereka.

Frustrasi, Aburahah berbaris menuju Makkah dengan pasukan besar yang dipimpin seekor gajah raksasa bernama Mahmud. Pasukan itu begitu kuat sehingga tidak ada kabilah yang berani melawan. Makkah tidak memiliki tentara. Quraisy tidak memiliki senjata.

Abdul Muthalib, pemimpin Makkah, berkata kepada kaumnya: "Pergilah ke pegunungan. Ka'bah memiliki Tuhan yang akan melindunginya."

Dan begitulah yang terjadi. Menurut Al-Qur'an, kawanan burung ababil datang membawa batu-batu dari neraka yang dilemparkan ke pasukan itu. Gajah Mahmud menolak maju menuju Ka'bah — ia hanya berjalan ke arah lain. Pasukan yang tak terkalahkan itu hancur dalam sekejap.

Tahun yang sama, di rumah kecil Bani Hasyim, seorang bayi laki-laki lahir. Ia akan menjadi cahaya yang tak bisa dihentikan oleh gajah mana pun.`,
    featured: true,
    characterIds: ['muhammad', 'abdul-muthalib'],
    locationId: 'makkah',
    references: ['QS. Al-Fil 1-5', 'Shahih Bukhari 3175', 'Sirah Ibnu Hisyam 1/44'],
    order: 5,
  },

  // ── Kelahiran & Masa Kecil ──
  {
    id: 'kelahiran',
    journeyId: 'kelahiran-masa-kecil',
    collectionId: 'sirah-nabawiyah',
    title: 'Kelahiran Sang Cahaya',
    subtitle: 'Tiba di Tengah Kegelapan',
    year: '570 M',
    yearNum: 570,
    description: 'Muhammad bin Abdullah ﷺ lahir di Makkah pada Tahun Gajah, membawa cahaya bagi seluruh alam.',
    story: `Aminah binti Wahb melihat bayinya yang baru lahir. Cahaya memancar dari wajah bayi itu. Abdullah, sang suami, telah wafat sebelum anak ini lahir — pergi meninggalkan dunia saat berdagang ke Madinah, tak pernah menyaksikan wajah putranya.

Bayi itu diberi nama Muhammad — nama yang belum pernah digunakan di kalangan kaum Quraisy. Ketika ditanya mengapa memberi nama demikian, Abdul Muthalib, sang kakek, menjawab, "Aku berharap ia dipuji oleh seluruh penghuni langit dan bumi."

Hari kelahiran itu menjadi awal dari sebuah perjalanan panjang. Perjalanan yang akan membawa cahaya dari sebuah rumah kecil di Makkah, merambah seluruh penjuru dunia, dan terus bersinar hingga akhir zaman.`,
    featured: true,
    characterIds: ['muhammad', 'aminah', 'abdul-muthalib'],
    locationId: 'makkah',
    references: ['Shahih Bukhari 3851', 'Sirah Ibnu Hisyam 1/166', 'Ar-Rahiq Al-Makhtum hal. 63'],
    order: 1,
  },
  {
    id: 'penyusuan-bani-saad',
    journeyId: 'kelahiran-masa-kecil',
    collectionId: 'sirah-nabawiyah',
    title: 'Di Padang Bani Sa\'ad',
    subtitle: 'Bayi di Tengah Gurun',
    year: '570–574 M',
    yearNum: 570,
    description: 'Muhammad kecil disusukan kepada Halimah as-Sa\'diyah di padang pasir Bani Sa\'ad.',
    story: `Halimah binti Abi Dzu'aib dari Bani Sa'ad datang ke Makkah mencari bayi yang mau disusuinya. Tahun itu tahun kemarau. Setiap bayi yang ia tawari menolak — mereka tidak mau disusui oleh wanita dari suku pedalaman yang miskin. Hanya tersisa satu bayi: Muhammad, anak yatim dari Bani Hasyim.

"Suamiku, ambillah bayi itu," kata Halimah. "Mungkin ia membawa keberkahan."

Sejak Muhammad berada dalam asuhannya, susu Halimah yang hampir habis mengalir deras. Unta yang kurus berjalan gagah. Padang pasir yang gersang seolah bersemi. Selama empat tahun, Muhammad kecil tumbuh di padang Bani Sa'ad, belajar bahasa Arab yang paling murni, menghirup udara gurun yang jernih.`,
    featured: false,
    characterIds: ['muhammad', 'halimah'],
    locationId: 'makkah',
    references: ['Shahih Muslim 2639', 'Sirah Ibnu Hisyam 1/170'],
    order: 2,
  },
  {
    id: 'kematian-aminah',
    journeyId: 'kelahiran-masa-kecil',
    collectionId: 'sirah-nabawiyah',
    title: 'Kehilangan Ibu',
    subtitle: 'Yatim Piatu di Usia Enam',
    year: '576 M',
    yearNum: 576,
    description: 'Aminah wafat di Abwa\', meninggalkan Muhammad kecil sebagai yatim piatu.',
    story: `Muhammad berusia enam tahun saat ibunya memutuskan untuk membawanya ke Madinah. Di tengah perjalanan, di desa Abwa', Aminah jatuh sakit dan menghembuskan napas terakhirnya.

Seorang anak yang belum mengenal ayahnya, kini kehilangan ibunya. Kakeknya, Abdul Muthalib, merengkuh tangan kecil itu dan membawanya kembali ke Makkah. Di keheningan malam Makkah, seorang yatim piatu belajar bahwa dunia ini tidak kekal, dan bahwa hati yang paling hancur bisa menjadi yang paling kuat.`,
    featured: false,
    characterIds: ['muhammad', 'aminah', 'abdul-muthalib'],
    locationId: 'abwa',
    references: ['Sirah Ibnu Hisyam 1/182', 'Ar-Rahiq Al-Makhtum hal. 73'],
    order: 3,
  },

  // ── Masa Pemuda ──
  {
    id: 'perniagaan-khadijah',
    journeyId: 'masa-pemuda',
    collectionId: 'sirah-nabawiyah',
    title: 'Perjalanan Dagang ke Syam',
    subtitle: 'Al-Amin yang Terpercaya',
    year: '583 M',
    yearNum: 583,
    description: 'Muhammad muda memimpin kafilah dagang Khadijah ke Syam, menunjukkan kejujuran luar biasa.',
    story: `Khadijah binti Khuwailid membutuhkan seseorang yang terpercaya untuk memimpin kafilahnya ke Syam. Namanya telah bergema: Muhammad bin Abdullah, Al-Amin — Yang Terpercaya.

Perjalanan itu sukses melebihi ekspektasi. Keuntungan dua kali lipat. Lebih dari keuntungan, Maysarah menceritakan hal-hal yang tak bisa diukur dengan dinar: awan yang selalu memberi naung, rahib di Busra yang mengenali tanda kenabian, dan ketenangan yang memancar dari wajah pemuda itu.

Ketika kafilah kembali, Khadijah mendengar semua cerita. Dan di matanya, Muhammad bukan lagi sekadar pegawai yang amanah — ia adalah seseorang yang istimewa.`,
    featured: true,
    characterIds: ['muhammad', 'khadijah'],
    locationId: 'syam',
    references: ['Shahih Bukhari 3820', 'Sirah Ibnu Hisyam 1/194'],
    order: 1,
  },
  {
    id: 'pernikahan-khadijah',
    journeyId: 'masa-pemuda',
    collectionId: 'sirah-nabawiyah',
    title: 'Pernikahan dengan Khadijah',
    subtitle: 'Dua Hati yang Saling Mengisi',
    year: '595 M',
    yearNum: 595,
    description: 'Muhammad menikah dengan Khadijah, wanita terhormat yang mencintainya karena kejujurannya.',
    story: `Khadijah mengirim Nufaisah, sahabatnya, untuk menyampaikan pesan kepada Muhammad: "Bagaimana jika ada wanita yang memiliki kecantikan, kekayaan, kemuliaan, dan ia sendiri yang menginginkanmu?"

Pernikahan itu berlangsung sederhana namun penuh keberkahan. Selama 25 tahun, Khadijah menjadi rumah bagi Muhammad — bukan sekadar istri, tetapi sahabat, penasihat, pelindung. Ketika seluruh dunia memusuhi, Khadijah berdiri di sisinya. "Demi Allah, Allah tidak akan pernah merendahkanmu."`,
    featured: false,
    characterIds: ['muhammad', 'khadijah'],
    locationId: 'makkah',
    references: ['Shahih Bukhari 3820', 'Sirah Ibnu Hisyam 1/199'],
    order: 2,
  },

  // ── Masa Kenabian Awal ──
  {
    id: 'wahyu-pertama',
    journeyId: 'masa-kenabian-awal',
    collectionId: 'sirah-nabawiyah',
    title: 'Wahyu Pertama di Gua Hira',
    subtitle: 'Ketika Langit Berbicara',
    year: '610 M',
    yearNum: 610,
    description: 'Malaikat Jibril datang ke Gua Hira dan menyampaikan wahyu pertama: Iqra\' — Bacalah!',
    story: `Malam tanggal 17 Ramadan, tahun ke-40 dari usianya, Muhammad tertidur di dalam Gua Hira. Sosok cahaya yang belum pernah dilihatnya muncul: "Iqra'!" — Bacalah!

Tiga kali pelukan itu terjadi. Pada kali ketiga, ayat-ayat itu terukir dalam cahaya: "Bacalah dengan nama Tuhanmu yang menciptakan. Dia telah menciptakan manusia dari segumpal darah."

Muhammad berlari menuju Khadijah, wajah pucat, tubuh gemetar: "Selimuti aku!" Khadijah memeluk suaminya dan berkata dengan keyakinan yang tak tergoyahkan: "Demi Allah, Allah tidak akan pernah merendahkanmu."

Malam itu mengubah segalanya. Seorang penggembala yatim piatu yang mencari jawaban di sebuah gua kecil, kini menjadi Rasul — utusan Allah bagi seluruh alam.`,
    featured: true,
    characterIds: ['muhammad', 'khadijah', 'jibril'],
    locationId: 'gua-hira',
    references: ['QS. Al-\'Alaq 1-5', 'Shahih Bukhari 3', 'Shahih Muslim 160'],
    order: 1,
  },

  // ── Dakwah Terang-terangan ──
  {
    id: 'dakwah-terang',
    journeyId: 'dakwah-terang-terangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Dakwah di Bukit Shafa',
    subtitle: 'Seruan di Atas Bukit',
    year: '613 M',
    yearNum: 613,
    description: 'Rasulullah ﷺ mengajak kaum Quraisy secara terbuka, menandai dimulainya dakwah terang-terangan.',
    story: `Muhammad naik ke puncak Bukit Shafa. Ia memanggil setiap klan Quraisy, satu per satu. "Jika aku memberitahu kalian bahwa di balik lembah ini ada pasukan berkuda yang akan menyerang kalian, apakah kalian akan percaya?"

"Ya! Kami tidak pernah mendengarmu berdusta," jawab mereka serempak.

"Maka ketahuilah, aku adalah pemberi peringatan bagi kalian dari siksa yang pedis."

Abu Lahab, paman sendiri, berteriak: "Celakah engkau!" Maka turunlah surah Al-Masad. Malam itu, garis pertempuran ditarik. Dakwah tidak lagi diam-diam.`,
    featured: false,
    characterIds: ['muhammad', 'abu-lahab'],
    locationId: 'makkah',
    references: ['QS. Al-Masad 1', 'Shahih Bukhari 4770', 'Sirah Ibnu Hisyam 1/280'],
    order: 1,
  },
  {
    id: 'isra-miraj',
    journeyId: 'dakwah-terang-terangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Isra\' Mi\'raj',
    subtitle: 'Perjalanan Melampaui Langit',
    year: '621 M',
    yearNum: 621,
    description: 'Perjalanan malam dari Masjidil Haram ke Masjidil Aqsa dan naik ke langit tertinggi.',
    story: `Tahun Kesedihan baru saja berlalu. Khadijah wafat. Abu Thalib wafat. Maka di malam yang paling gelap itu, datanglah cahaya yang paling terang.

Dari Masjidil Haram ke Masjidil Aqsa, lalu naik melalui tujuh langit. Di Sidratul Muntaha, Muhammad menerima perintah shalat — dari lima puluh waktu dikurangi hingga lima waktu, namun pahalanya tetap lima puluh.

Abu Bakar berdiri dan berkata, "Jika ia yang mengatakannya, maka itu benar." Sejak saat itu ia digelari as-Siddiq. Isra' Mi'raj adalah pengingat bahwa di balik malam tergelap, selalu ada tangga menuju cahaya.`,
    featured: true,
    characterIds: ['muhammad', 'jibril', 'abu-bakar'],
    locationId: 'baitul-maqdis',
    references: ['QS. Al-Isra\' 1', 'QS. An-Najm 1-18', 'Shahih Bukhari 3207'],
    order: 2,
  },

  // ── Hijrah ──
  {
    id: 'hijrah',
    journeyId: 'hijrah-pembangunan-madinah',
    collectionId: 'sirah-nabawiyah',
    title: 'Hijrah ke Madinah',
    subtitle: 'Meninggalkan Segalanya',
    year: '622 M',
    yearNum: 622,
    description: 'Rasulullah ﷺ meninggalkan Makkah menuju Madinah, memulai babak baru dalam sejarah Islam.',
    story: `"Engkau adalah tanah yang paling kucintai di sisi Allah. Andai kaummu tidak mengusirku, aku tidak akan meninggalkanmu," bisik Muhammad menatap Makkah.

Di Gua Tsur, Muhammad dan Abu Bakar bersembunyi selama tiga hari. Pencari hadiah berdiri tepat di depan gua. Abu Bakar berbisik cemas, Muhammad menjawab dengan tenang: "Jangan takut. Allah bersama kita."

Laba-laba merajut sarang. Burung bertelur di depan mulut gua. Alam semesta bersekongkol melindungi dua manusia yang membawa risalah. Di Madinah, anak-anak bernyanyi: "Thala'a al-badru 'alaina — Telah muncul bulan purnama bagi kami."`,
    featured: true,
    characterIds: ['muhammad', 'abu-bakar', 'ali'],
    locationId: 'gua-tsur',
    references: ['QS. At-Taubah 40', 'Shahih Bukhari 3905', 'Sirah Ibnu Hisyam 2/137'],
    order: 1,
  },

  // ── Masa Pertahanan ──
  {
    id: 'perang-badar',
    journeyId: 'masa-pertahanan',
    collectionId: 'sirah-nabawiyah',
    title: 'Perang Badar',
    subtitle: 'Ketika Sedikit Mengalahkan Banyak',
    year: '624 M',
    yearNum: 624,
    description: '313 Muslim menghadapi 1000 pasukan Quraisy — kemenangan pertama yang mengubah keseimbangan.',
    story: `313 Muslim berdiri di satu sisi. 1000 pasukan Quraisy di sisi lain. Malam sebelum pertempuran, hujan turun — menguatkan tanah di bawah kaki kaum Muslimin dan menyulitkan langkah Quraisy.

Muhammad mengangkat tangan berdoa sepanjang malam: "Ya Allah, jika Engkau menghancurkan kelompok ini, Engkau tidak akan lagi disembah di muka bumi."

Ketika debu mengendap, Quraisy mundur dalam kekalahan. Tujuh puluh tokoh tewas, termasuk Abu Jahl. Badar membuktikan bahwa iman bisa mengalahkan angka, dan bahwa kebenaran tak perlu menunggu mayoritas.`,
    featured: true,
    characterIds: ['muhammad', 'hamzah', 'ali', 'umar'],
    locationId: 'badar',
    references: ['QS. Al-Anfal 9-11', 'QS. Ali Imran 123-126', 'Shahih Bukhari 3952'],
    order: 1,
  },

  // ── Perdamaian & Kemenangan ──
  {
    id: 'hudaibiyah',
    journeyId: 'perdamaian-kemenangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Perjanjian Hudaibiyah',
    subtitle: 'Kemenangan di Balik Persetujuan',
    year: '628 M',
    yearNum: 628,
    description: 'Perjanjian yang tampak sebagai kekalahan diplomatik ternyata menjadi pintu kemenangan terbesar.',
    story: `Mereka berangkat untuk beribadah, bukan berperang. 1400 Muslim mengenakan ihram, membawa hewan kurban. Tapi Quraisy menghalangi.

Perjanjian itu tampak merugikan: umrah ditunda, gencatan senjata 10 tahun, barangsiapa dari Makkah yang pergi ke Madinah harus dikembalikan — tapi tidak sebaliknya.

Umar hampir tidak bisa menahan amarahnya. Namun Allah menyebutnya kemenangan: "Sesungguhnya Kami telah memberikan kepadamu kemenangan yang nyata." Dalam dua tahun setelah perjanjian itu, lebih banyak orang memeluk Islam daripada dalam dua puluh tahun sebelumnya.

Hudaibiyah mengajarkan bahwa kadang, kemenangan terbesar datang dari persetujuan yang terasa seperti kekalahan.`,
    featured: false,
    characterIds: ['muhammad', 'abu-bakar', 'umar', 'ali'],
    locationId: 'hudaibiyah',
    references: ['QS. Al-Fath 1-27', 'Shahih Bukhari 2731', 'Shahih Muslim 1784'],
    order: 1,
  },
  {
    id: 'fathu-makkah',
    journeyId: 'perdamaian-kemenangan',
    collectionId: 'sirah-nabawiyah',
    title: 'Fathu Makkah',
    subtitle: 'Kembali dengan Hati yang Luas',
    year: '630 M',
    yearNum: 630,
    description: 'Rasulullah ﷺ memasuki Makkah tanpa pertumpahan darah — kemenangan yang paling agung.',
    story: `Delapan tahun lalu, ia keluar dari kota ini dalam kegelapan malam. Kini ia kembali sebagai penakluk yang paling agung.

Para pemuka Quraisy berdiri di depannya, menunggu hukuman. Muhammad bertanya: "Apa yang kalian kira akan kulakukan kepada kalian?"

"Engkau adalah saudara yang mulia," jawab mereka gemetar.

"Pergilah kalian. Kalian semua bebas. Tidak ada cela untuk kalian hari ini."

Tidak ada pembalasan dendam. Tidak ada hukuman massal. Hanya ampunan dari seorang yang telah menang atas seluruh musuhnya, namun memilih untuk menang atas dirinya sendiri.`,
    featured: true,
    characterIds: ['muhammad', 'abu-bakar', 'umar', 'ali', 'abu-sufyan'],
    locationId: 'makkah',
    references: ['QS. An-Nasr 1-3', 'Shahih Bukhari 4280', 'Sirah Ibnu Hisyam 4/36'],
    order: 2,
  },
];

// ── Characters ──────────────────────────────────────

export const characters: Character[] = [
  {
    id: 'muhammad',
    name: 'Nabi Muhammad ﷺ',
    title: 'Rasulullah — Penutup Para Nabi',
    shortBio: 'Nabi terakhir yang diutus untuk seluruh umat manusia, membawa risalah Islam dan menjadi teladan terbaik.',
    fullBio: 'Muhammad bin Abdullah lahir di Makkah tahun 570 M, yatim sejak lahir, dibesarkan oleh kakek lalu pamannya. Dikenal sebagai Al-Amin — Yang Terpercaya. Menerima wahyu pertama di Gua Hira pada usia 40 tahun. Berhijrah ke Madinah, membangun masyarakat Islam, dan wafat tahun 632 M. Warisannya: risalah yang mengubah peradaban manusia.',
    role: 'Rasulullah — Utusan Allah',
    period: '570–632 M',
    eventIds: ['kelahiran', 'kabah-sejarah', 'tahun-gajah', 'penyusuan-bani-saad', 'kematian-aminah', 'perniagaan-khadijah', 'pernikahan-khadijah', 'wahyu-pertama', 'dakwah-terang', 'isra-miraj', 'hijrah', 'perang-badar', 'hudaibiyah', 'fathu-makkah'],
    references: ['Shahih Bukhari', 'Shahih Muslim', 'Sirah Ibnu Hisyam', 'Ar-Rahiq Al-Makhtum'],
  },
  {
    id: 'khadijah',
    name: 'Khadijah binti Khuwailid',
    title: 'Istri Pertama — Pendukung Utama',
    shortBio: 'Wanita terhormat Makkah yang menjadi istri pertama Rasulullah ﷺ dan mu\'min pertama.',
    fullBio: 'Khadijah adalah wanita Quraisy paling terhormat, digelari At-Thahirah. Ia mempekerjakan Muhammad untuk memimpin kafilahnya, lalu meminangnya. Selama 25 tahun pernikahan, ia adalah satu-satunya istri. Wafat tahun 619 M — Tahun Kesedihan.',
    role: 'Istri Pertama Rasulullah ﷺ, Mu\'min Pertama',
    period: '555–619 M',
    eventIds: ['perniagaan-khadijah', 'pernikahan-khadijah', 'wahyu-pertama'],
    references: ['Shahih Bukhari 3820', 'Shahih Muslim 2435'],
  },
  {
    id: 'abu-bakar',
    name: 'Abu Bakar as-Siddiq',
    title: 'Sahabat Terdekat — Khalifah Pertama',
    shortBio: 'Orang pertama dari kalangan dewasa yang memeluk Islam, sahabat terdekat Rasulullah ﷺ.',
    fullBio: 'Abu Bakar adalah sahabat terdekat sejak sebelum Islam. Orang pertama dewasa yang beriman tanpa ragu. Digelari as-Siddiq setelah membenarkan Isra\' Mi\'raj. Menemani di Gua Tsur saat hijrah. Khalifah pertama setelah wafatnya Rasulullah ﷺ.',
    role: 'Sahabat Terdekat, Khalifah Pertama',
    period: '573–634 M',
    eventIds: ['isra-miraj', 'hijrah', 'hudaibiyah'],
    references: ['Shahih Bukhari', 'Shahih Muslim'],
  },
  {
    id: 'umar',
    name: 'Umar bin Khattab',
    title: 'Al-Faruq — Pemisah Kebenaran',
    shortBio: 'Khalifah kedua yang tegas dalam kebenaran dan keadilan.',
    fullBio: 'Sebelum Islam, Umar dikenal tegas dan ditakuti. Berniat membunuh Muhammad, justru memeluk Islam setelah mendengar ayat Al-Qur\'an. Digelari Al-Faruq. Khalifah kedua, memimpin ekspansi ke Persia dan Mesir.',
    role: 'Khalifah Kedua, Al-Faruq',
    period: '584–644 M',
    eventIds: ['perang-badar', 'hudaibiyah', 'fathu-makkah'],
    references: ['Shahih Bukhari', 'Shahih Muslim'],
  },
  {
    id: 'ali',
    name: 'Ali bin Abi Thalib',
    title: 'Sang Pemberani — Khalifah Keempat',
    shortBio: 'Sepupu dan menantu Rasulullah ﷺ, pejuang pemberani dan ahli ilmu.',
    fullBio: 'Anak pertama yang memeluk Islam. Tumbuh di bawah asuhan langsung Rasulullah ﷺ. Menunjukkan keberanian luar biasa di Badar dan Khandaq. Menikah dengan Fatimah az-Zahra. Khalifah keempat.',
    role: 'Khalifah Keempat, Sepupu Rasulullah ﷺ',
    period: '600–661 M',
    eventIds: ['hijrah', 'perang-badar', 'hudaibiyah', 'fathu-makkah'],
    references: ['Shahih Bukhari', 'Shahih Muslim'],
  },
  {
    id: 'hamzah',
    name: 'Hamzah bin Abdul Muthalib',
    title: 'Singa Allah — Sayyidus Syuhada',
    shortBio: 'Paman Rasulullah ﷺ yang gugur sebagai syahid Uhud.',
    fullBio: 'Paman Rasulullah ﷺ, memeluk Islam setelah Abu Jahal menghina keponakannya. Singa Allah di medan Badar. Gugur sebagai syahid di Uhud.',
    role: 'Paman Rasulullah ﷺ, Singa Allah',
    period: '568–625 M',
    eventIds: ['perang-badar'],
    references: ['Shahih Bukhari', 'Ar-Rahiq Al-Makhtum'],
  },
  {
    id: 'aminah',
    name: 'Aminah binti Wahb',
    title: 'Ibunda Rasulullah ﷺ',
    shortBio: 'Ibu Nabi Muhammad ﷺ yang wafat saat putranya berusia enam tahun.',
    fullBio: 'Aminah dari Bani Zuhrah. Suaminya Abdullah wafat sebelum anaknya lahir. Wafat di Abwa\' saat Muhammad berusia enam tahun, meninggalkannya sebagai yatim piatu.',
    role: 'Ibunda Rasulullah ﷺ',
    period: '?–576 M',
    eventIds: ['kelahiran', 'kematian-aminah'],
    references: ['Sirah Ibnu Hisyam', 'Ar-Rahiq Al-Makhtum'],
  },
  {
    id: 'abdul-muthalib',
    name: 'Abdul Muthalib',
    title: 'Kakek Rasulullah ﷺ',
    shortBio: 'Kakek Nabi Muhammad ﷺ, pemimpin Bani Hasyim yang merawatnya setelah kematian ibunya.',
    fullBio: 'Pemimpin Bani Hasyim dan penjaga Zamzam. Memberi nama Muhammad. Merawat cucunya setelah wafatnya Aminah. Wafat saat Muhammad berusia delapan tahun.',
    role: 'Kakek Rasulullah ﷺ, Pemimpin Bani Hasyim',
    period: '?–578 M',
    eventIds: ['kelahiran', 'tahun-gajah', 'kematian-aminah'],
    references: ['Sirah Ibnu Hisyam', 'Ar-Rahiq Al-Makhtum'],
  },
  {
    id: 'jibril',
    name: 'Malaikat Jibril',
    title: 'Pembawa Wahyu — Ar-Ruh Al-Amin',
    shortBio: 'Malaikat pembawa wahyu Allah kepada para nabi dan rasul.',
    fullBio: 'Ar-Ruh Al-Amin, pembawa wahyu. Menyampaikan ayat pertama di Gua Hira. Mendampingi Isra\' Mi\'raj. Menyampaikan Al-Qur\'an selama 23 tahun.',
    role: 'Pembawa Wahyu',
    period: 'Sejak penciptaan',
    eventIds: ['wahyu-pertama', 'isra-miraj'],
    references: ['QS. Al-Baqarah 97-98', 'Shahih Bukhari'],
  },
  {
    id: 'halimah',
    name: 'Halimah as-Sa\'diyah',
    title: 'Ibu Susu — Wanita yang Diberkahi',
    shortBio: 'Wanita Bani Sa\'ad yang menjadi ibu susu Rasulullah ﷺ.',
    fullBio: 'Menerima Muhammad yatim saat bayi lain menolak. Sejak itu, keberkahan mengalir ke keluarganya.',
    role: 'Ibu Susu Rasulullah ﷺ',
    period: 'Aktif sekitar 570–574 M',
    eventIds: ['penyusuan-bani-saad'],
    references: ['Shahih Muslim 2639', 'Sirah Ibnu Hisyam'],
  },
  {
    id: 'abu-lahab',
    name: 'Abu Lahab',
    title: 'Musuh Terdekat dari Keluarga',
    shortBio: 'Paman Rasulullah ﷺ yang menjadi musuh terbesar dari keluarga sendiri.',
    fullBio: 'Abdul Uzza bin Abdul Muthalib. Paman yang paling vokal menentang Islam. Dikutuk dalam surah Al-Masad. Wafat beberapa hari setelah Badar.',
    role: 'Musuh Islam dari Keluarga',
    period: '?–624 M',
    eventIds: ['dakwah-terang'],
    references: ['QS. Al-Masad', 'Shahih Bukhari 4770'],
  },
  {
    id: 'abu-sufyan',
    name: 'Abu Sufyan bin Harb',
    title: 'Dari Musuh ke Saudara',
    shortBio: 'Pemimpin Quraisy yang memusuhi Islam sebelum memeluknya menjelang Fathu Makkah.',
    fullBio: 'Pemimpin Quraisy, musuh utama Islam selama bertahun-tahun. Memeluk Islam menjelang Fathu Makkah.',
    role: 'Mantan Musuh, Kemudian Sahabat',
    period: '560–650 M',
    eventIds: ['fathu-makkah'],
    references: ['Shahih Bukhari', 'Sirah Ibnu Hisyam'],
  },
];

// ── Locations ───────────────────────────────────────

export const locations: StoryLocation[] = [
  {
    id: 'makkah',
    name: 'Makkah',
    description: 'Kota kelahiran Rasulullah ﷺ dan pusat dakwah Islam pertama.',
    fullDescription: 'Kota paling suci dalam Islam, tempat Ka\'bah berdiri. Kelahiran Rasulullah ﷺ, tempat wahyu pertama, dan pusat dakwah awal. Fathu Makkah terjadi 630 M tanpa pertumpahan darah.',
    coordinates: '21.4225° N, 39.8262° E',
    eventIds: ['jazirah-arab', 'makkah-kota', 'kabah-sejarah', 'suku-quraisy', 'tahun-gajah', 'kelahiran', 'dakwah-terang', 'fathu-makkah'],
    significance: 'Kota Suci, Tempat Kelahiran Rasulullah ﷺ',
  },
  {
    id: 'madinah',
    name: 'Madinah',
    description: 'Kota suci kedua Islam, tempat hijrah dan pembangunan masyarakat Islam pertama.',
    fullDescription: 'Dahulu bernama Yatsrib. Menerima Rasulullah ﷺ dengan tangan terbuka. Tempat Masjid Nabawi dan Piagam Madinah.',
    coordinates: '24.4672° N, 39.6024° E',
    eventIds: ['hijrah'],
    significance: 'Kota Suci Kedua Islam, Tempat Hijrah',
  },
  {
    id: 'gua-hira',
    name: 'Gua Hira',
    description: 'Gua di puncak Jabal Nur tempat wahyu pertama.',
    fullDescription: 'Di puncak Jabal Nur, 3 km dari Makkah. Tempat Muhammad ﷺ menerima wahyu pertama pada 17 Ramadan.',
    coordinates: '21.4575° N, 39.8625° E',
    eventIds: ['wahyu-pertama'],
    significance: 'Tempat Wahyu Pertama',
  },
  {
    id: 'gua-tsur',
    name: 'Gua Tsur',
    description: 'Gua tempat persembunyian saat hijrah.',
    fullDescription: 'Di Jabal Tsur, selatan Makkah. Muhammad dan Abu Bakar bersembunyi 3 hari saat hijrah.',
    coordinates: '21.3667° N, 39.8167° E',
    eventIds: ['hijrah'],
    significance: 'Tempat Persembunyian Saat Hijrah',
  },
  {
    id: 'badar',
    name: 'Badar',
    description: 'Padang tempat pertempuran pertama dan kemenangan terbesar umat Islam.',
    fullDescription: '150 km barat daya Madinah. Pertempuran 17 Ramadan tahun ke-2 H. 313 Muslim mengalahkan 1000 Quraisy.',
    coordinates: '23.7778° N, 38.7833° E',
    eventIds: ['perang-badar'],
    significance: 'Kemenangan Pertama Umat Islam',
  },
  {
    id: 'hudaibiyah',
    name: 'Hudaibiyah',
    description: 'Tempat perjanjian damai yang menjadi pintu kemenangan.',
    fullDescription: '20 km dari Makkah. Perjanjian Hudaibiyah tahun 6 H — tampak merugikan tapi menjadi Fathun Mubin.',
    coordinates: '21.4167° N, 39.6833° E',
    eventIds: ['hudaibiyah'],
    significance: 'Tempat Perjanjian Hudaibiyah',
  },
  {
    id: 'syam',
    name: 'Syam',
    description: 'Wilayah utara Jazirah Arab, tujuan kafilah dagang.',
    fullDescription: 'Meliputi Suriah, Yordania, Lebanon, Palestina. Tempat Muhammad muda memimpin kafilah Khadijah.',
    coordinates: '33–37° N, 35–40° E',
    eventIds: ['perniagaan-khadijah', 'isra-miraj'],
    significance: 'Tujuan Kafilah Dagang',
  },
  {
    id: 'baitul-maqdis',
    name: 'Baitul Maqdis',
    description: 'Masjidil Aqsa — titik awal Mi\'raj dan kiblat pertama.',
    fullDescription: 'Tempat suci ketiga Islam. Titik awal perjalanan Mi\'raj. Kiblat pertama umat Islam.',
    coordinates: '31.7780° N, 35.2354° E',
    eventIds: ['isra-miraj'],
    significance: 'Kiblat Pertama, Titik Awal Mi\'raj',
  },
  {
    id: 'abwa',
    name: 'Abwa\'',
    description: 'Desa tempat Aminah, ibunda Rasulullah ﷺ, wafat.',
    fullDescription: 'Desa kecil antara Makkah dan Madinah. Aminah wafat di sini tahun 576 M.',
    coordinates: '22.4167° N, 39.0833° E',
    eventIds: ['kematian-aminah'],
    significance: 'Tempat Wafat Aminah',
  },
];

// ── Helper Functions ────────────────────────────────

export function getCollectionById(id: string) {
  return collections.find((c) => c.id === id);
}

export function getActiveCollection() {
  return collections.find((c) => c.status === 'active');
}

export function getJourneysByCollection(collectionId: string) {
  return journeys.filter((j) => j.collectionId === collectionId).sort((a, b) => a.order - b.order);
}

export function getEventsByJourney(journeyId: string) {
  return events.filter((e) => e.journeyId === journeyId).sort((a, b) => a.order - b.order);
}

export function getEventById(id: string) {
  return events.find((e) => e.id === id);
}

export function getFeaturedEvents() {
  return events.filter((e) => e.featured);
}

export function getCharacterById(id: string) {
  return characters.find((c) => c.id === id);
}

export function getCharactersByEvent(eventId: string) {
  return characters.filter((c) => c.eventIds.includes(eventId));
}

export function getLocationById(id: string) {
  return locations.find((l) => l.id === id);
}

export function getLocationsByEvent(eventId: string) {
  return locations.filter((l) => l.eventIds.includes(eventId));
}
