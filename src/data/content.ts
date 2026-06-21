// ═══════════════════════════════════════════════════════
// JEJAK CAHAYA™ — Narrative Structure
// Collection → Fase → Bab → Story → Character → Location → Reference
//
// Struktur naratif dikunci berdasarkan alur:
//   Sejarah asli + rasa petualangan + rasa penasaran
//   Tanpa dialog fiktif. Tanpa mengubah peristiwa. Tanpa mengarang.
//
// 8 Fase + Penutup | 47 Bab
// ═══════════════════════════════════════════════════════

// ── Core Types ──────────────────────────────────────

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  coverTheme: string;
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
  story: string; // konten menunggu penulisan
  image?: string; // hero illustration path (1 per bab — captures emotion, not content)
  featured: boolean;
  characterIds: string[];
  locationId: string;
  references: string[];
  editorNotes?: string[]; // catatan editor: riwayat berbeda, diskusi, dst. (optional)
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
    id: 'perjalanan-rasulullah',
    slug: 'perjalanan-rasulullah',
    title: 'Perjalanan Rasulullah ﷺ',
    subtitle: 'Dari dunia sebelum Islam sampai cahaya yang tidak pernah padam',
    description: 'Mengikuti perjalanan kehidupan Rasulullah ﷺ — bukan sebagai buku pelajaran, tapi sebagai kisah yang membuat kita penasaran bab berikutnya.',
    coverTheme: '#D4A843',
    journeyIds: [
      'fase-0',
      'fase-1',
      'fase-2',
      'fase-3',
      'fase-4',
      'fase-5',
      'fase-6',
      'fase-7',
      'fase-8',
      'penutup',
    ],
    status: 'active',
    order: 1,
  },
  {
    id: 'kisah-sahabat',
    slug: 'kisah-sahabat',
    title: 'Kisah Para Sahabat',
    subtitle: 'Para Pembawa Cahaya',
    description: 'Kisah-kisah sahabat Rasulullah ﷺ yang mengorbankan segalanya.',
    coverTheme: '#8B6914',
    journeyIds: [],
    status: 'coming_soon',
    order: 2,
  },
  {
    id: 'kisah-nabi',
    slug: 'kisah-nabi',
    title: 'Kisah Para Nabi',
    subtitle: 'Jejak Para Utusan Allah',
    description: 'Perjalanan para nabi dan rasul dari Nabi Adam a.s. hingga Nabi Muhammad ﷺ.',
    coverTheme: '#5A4D3E',
    journeyIds: [],
    status: 'coming_soon',
    order: 3,
  },
  {
    id: 'kisah-peradaban',
    slug: 'kisah-peradaban',
    title: 'Kisah Peradaban Islam',
    subtitle: 'Cahaya yang Menyebar ke Seluruh Dunia',
    description: 'Dari padang pasir Arab ke Andalusia, dari Baghdad ke Nusantara.',
    coverTheme: '#756553',
    journeyIds: [],
    status: 'coming_soon',
    order: 4,
  },
];

// ── Fase (Journeys) ─────────────────────────────────

export const journeys: Journey[] = [
  // ── FASE 0 ──────────────────────────────────────
  {
    id: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: 'Dunia Sebelum Islam',
    subtitle: 'Memahami dunia sebelum Rasulullah ﷺ lahir',
    period: 'Sebelum 570 M',
    yearStart: -3000,
    yearEnd: 570,
    description: 'Membuat pembaca memahami dunia sebelum Rasulullah ﷺ lahir.',
    color: '#756553',
    eventIds: ['bab-1', 'bab-2', 'bab-3', 'bab-4', 'bab-5'],
    order: 0,
  },
  // ── FASE 1 ──────────────────────────────────────
  {
    id: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Kelahiran Sang Cahaya',
    subtitle: 'Dari rahim Aminah ke pangkuan dunia',
    period: '570–578 M',
    yearStart: 570,
    yearEnd: 578,
    description: 'Kelahiran Muhammad ﷺ dan tahun-tahun pertama kehidupannya.',
    color: '#D4A843',
    eventIds: ['bab-6', 'bab-7', 'bab-8', 'bab-9', 'bab-10', 'bab-11'],
    order: 1,
  },
  // ── FASE 2 ──────────────────────────────────────
  {
    id: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Masa Pemuda',
    subtitle: 'Gembala, pedagang, dan orang yang dipercaya',
    period: '583–605 M',
    yearStart: 583,
    yearEnd: 605,
    description: 'Tahun-tahun kejujuran dan kepercayaan sebelum kenabian.',
    color: '#96751A',
    eventIds: ['bab-12', 'bab-13', 'bab-14', 'bab-15', 'bab-16'],
    order: 2,
  },
  // ── FASE 3 ──────────────────────────────────────
  {
    id: 'fase-3',
    collectionId: 'perjalanan-rasulullah',
    title: 'Mencari Kebenaran',
    subtitle: 'Kesunyian Gua Hira dan malam yang mengubah segalanya',
    period: '610 M',
    yearStart: 610,
    yearEnd: 610,
    description: 'Pencarian spiritual yang berujung pada wahyu pertama.',
    color: '#5A4D3E',
    eventIds: ['bab-17', 'bab-18', 'bab-19', 'bab-20'],
    order: 3,
  },
  // ── FASE 4 ──────────────────────────────────────
  {
    id: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Dakwah di Makkah',
    subtitle: 'Cahaya yang dijawab dengan tentangan',
    period: '610–621 M',
    yearStart: 610,
    yearEnd: 621,
    description: 'Tiga belas tahun menyebarkan Islam di tengah penentangan Quraisy.',
    color: '#8B6914',
    eventIds: ['bab-21', 'bab-22', 'bab-23', 'bab-24', 'bab-25', 'bab-26', 'bab-27', 'bab-28'],
    order: 4,
  },
  // ── FASE 5 ──────────────────────────────────────
  {
    id: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Menuju Madinah',
    subtitle: 'Meninggalkan Makkah menuju tempat yang baru',
    period: '621–622 M',
    yearStart: 621,
    yearEnd: 622,
    description: 'Dari baiat hingga hijrah — perjalanan yang mengubah sejarah.',
    color: '#D4A843',
    eventIds: ['bab-29', 'bab-30', 'bab-31', 'bab-32', 'bab-33'],
    order: 5,
  },
  // ── FASE 6 ──────────────────────────────────────
  {
    id: 'fase-6',
    collectionId: 'perjalanan-rasulullah',
    title: 'Membangun Peradaban',
    subtitle: 'Masjid, persaudaraan, dan piagam',
    period: '622–624 M',
    yearStart: 622,
    yearEnd: 624,
    description: 'Menata fondasi peradaban baru di Madinah.',
    color: '#96751A',
    eventIds: ['bab-34', 'bab-35', 'bab-36'],
    order: 6,
  },
  // ── FASE 7 ──────────────────────────────────────
  {
    id: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Ujian dan Kemenangan',
    subtitle: 'Dari Badar hingga Fathu Makkah',
    period: '624–630 M',
    yearStart: 624,
    yearEnd: 630,
    description: 'Pertempuran, perjanjian, dan kemenangan yang tak terduga.',
    color: '#756553',
    eventIds: ['bab-37', 'bab-38', 'bab-39', 'bab-40', 'bab-41', 'bab-42', 'bab-43'],
    order: 7,
  },
  // ── FASE 8 ──────────────────────────────────────
  {
    id: 'fase-8',
    collectionId: 'perjalanan-rasulullah',
    title: 'Perpisahan',
    subtitle: 'Haji terakhir dan hari yang membuat Madinah menangis',
    period: '630–632 M',
    yearStart: 630,
    yearEnd: 632,
    description: 'Wasiat terakhir dan kepergian yang memilu hati seluruh kaum muslimin.',
    color: '#5A4D3E',
    eventIds: ['bab-44', 'bab-45', 'bab-46'],
    order: 8,
  },
  // ── PENUTUP ─────────────────────────────────────
  {
    id: 'penutup',
    collectionId: 'perjalanan-rasulullah',
    title: 'Jejak yang Tidak Pernah Padam',
    subtitle: 'Warisan Islam dan sahabat yang melanjutkan perjuangan',
    period: '632 M+',
    yearStart: 632,
    yearEnd: 700,
    description: 'Warisan Islam, para sahabat melanjutkan perjuangan, Islam menyebar ke dunia.',
    color: '#D4A843',
    eventIds: ['bab-47'],
    order: 9,
  },
];

// ── 47 Bab (Events) ─────────────────────────────────
// Konten menunggu penulisan. Struktur naratif sudah dikunci.

export const events: StoryEvent[] = [
  // ═══════════════════════════════════════════════════
  // FASE 0 — DUNIA SEBELUM ISLAM
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-1',
    journeyId: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: 'Jazirah Arab Sebelum Islam',
    subtitle: 'Sebelum Cahaya Menyinari Dunia',
    year: 'Sebelum 570 M',
    yearNum: -570,
    description: 'Geografi, gurun, kafilah, dan kehidupan Arab sebelum Islam.',
    image: '/images/bab/bab-1-hero.png',
    story: `Matahari belum lama terbit.

Namun panasnya sudah terasa membakar kulit.

Seorang pengelana berjalan sendirian di tengah gurun.

Langkahnya pelan.

Air yang dibawanya tidak banyak.

Ia tidak tahu berapa lama lagi perjalanan ini akan berlangsung.

Yang ia tahu hanya satu.

Ia harus terus berjalan.

Di hadapannya terbentang hamparan pasir yang seolah tidak memiliki ujung.

Tidak ada pohon yang bisa dijadikan tempat berteduh.

Tidak ada sungai yang bisa menghilangkan dahaga.

Tidak ada rumah yang dapat diketuk ketika malam tiba.

Hanya gurun.

Dan gurun tidak pernah peduli siapa yang melintasinya.

Angin berembus membawa pasir.

Matahari terus naik.

Sementara kantung airnya semakin ringan.

Di tanah seperti ini, satu kesalahan kecil dapat mengakhiri sebuah perjalanan.

Karena itulah orang-orang Arab belajar memahami gurun sejak kecil.

Mereka mengenal arah angin.

Mereka membaca bintang-bintang.

Mereka menghafal letak sumur dan oase.

Mereka tahu kapan harus berjalan.

Dan kapan harus berhenti.

Hidup di [[Jazirah Arab|location:jazirah-arab]] bukan sekadar bertahan hidup.

Hidup di Jazirah Arab adalah ujian yang harus dihadapi setiap hari.

◆

Namun tanah yang keras tidak selalu menjadi tanah yang mati.

Dari kejauhan tampak titik-titik kecil bergerak di atas gurun.

Sedikit demi sedikit bentuknya menjadi jelas.

Unta.

Puluhan ekor.

Berjalan dalam satu barisan panjang.

Di punggung mereka tergantung berbagai barang dagangan.

Kemenyan.

Rempah-rempah.

Kulit.

Kain.

Dan berbagai barang berharga lainnya.

Mereka adalah kafilah dagang.¹²

Urat nadi yang menghidupkan Jazirah Arab.

Setiap tahun, jalur-jalur gurun dilalui oleh para pedagang yang datang dari berbagai arah.

Dari Yaman di selatan.³

Menuju [[Syam|location:syam]] di utara.

Perjalanan itu tidak mudah.

Panas membakar di siang hari.

Dingin menusuk di malam hari.

Badai pasir dapat datang tanpa peringatan.

Dan perampok selalu mengintai kesempatan.

Tetapi mereka tetap berjalan.

Karena jalur perdagangan inilah yang menghubungkan berbagai negeri.

Dan Jazirah Arab berada tepat di tengah jalur itu.³

◆

Meski menjadi persimpangan perdagangan yang penting, Jazirah Arab tidak dipimpin oleh satu raja yang menguasai seluruh wilayahnya.

Yang ada adalah suku-suku.

Dan bagi orang Arab saat itu, suku adalah segalanya.¹²

Suku adalah keluarga.

Suku adalah perlindungan.

Suku adalah kehormatan.

Jika seseorang kehilangan sukunya, ia kehilangan hampir seluruh tempat berpijaknya di dunia.

Karena itu kesetiaan kepada suku dijaga dengan sangat kuat.

Terkadang lebih kuat daripada rasa keadilan itu sendiri.

Seorang Arab tidak berdiri sendirian.

Ia berdiri bersama kaumnya.

Dan kaumnya berdiri bersamanya.

Begitulah dunia mereka berjalan.

◆

Sebagian orang Arab hidup berpindah-pindah mengikuti air dan padang rumput.

Mereka dikenal sebagai kaum Badui.

Hari ini mereka mendirikan kemah.

Beberapa waktu kemudian mereka membongkarnya kembali.

Lalu berjalan ke tempat lain.

Mencari kehidupan.

Mencari air.

Mencari tempat bagi ternak mereka untuk bertahan hidup.

Gurun mengajarkan banyak hal kepada mereka.

Kesabaran.

Keberanian.

Ketangguhan.

Tetapi gurun juga mengajarkan bahwa kehidupan tidak selalu berpihak kepada yang lemah.

◆

Di banyak tempat di Jazirah Arab, tidak ada hukum yang berlaku untuk semua orang.

Tidak ada pengadilan yang melindungi setiap manusia.

Kekuatan sering kali menjadi penentu.

Siapa yang kuat akan dihormati.

Siapa yang lemah sering kali harus menerima nasibnya.

Tawanan perang dapat dijadikan budak.

Orang miskin tidak selalu memiliki seseorang yang membela mereka.

Dan pertikaian antarsuku dapat berlangsung sangat lama.

Kadang karena persoalan besar.

Kadang karena sesuatu yang tampak kecil.

Perang Al-Basus adalah salah satunya.¹⁴

Konflik itu bermula dari sebuah perselisihan yang melibatkan seekor unta.

Namun yang terjadi setelahnya jauh lebih besar.

Balas dendam dibalas balas dendam.

Generasi berganti.

Tetapi permusuhan tetap hidup.

Perang itu berlangsung selama puluhan tahun.

Hampir empat puluh tahun.

◆

Namun dunia ini tidak hanya berisi kegelapan.

Orang-orang Arab dikenal karena keberanian mereka menjaga kehormatan.

Mereka menghormati tamu.

Menepati janji.

Menghafal silsilah keluarga mereka hingga beberapa generasi ke atas.

Mereka juga mencintai syair.¹⁴

Di pasar-pasar besar, para penyair berdiri membacakan bait-bait terbaik mereka.

Orang-orang berkumpul.

Mendengarkan.

Menghafal.

Lalu menceritakannya kembali kepada yang lain.

Bagi mereka, kata-kata memiliki nilai yang sangat tinggi.

Kadang lebih berharga daripada pedang.

◆

Tetapi di balik semua itu, ada sesuatu yang perlahan berubah.

Generasi demi generasi.

Warisan para nabi mulai dilupakan.

Sebagian besar manusia tidak lagi menyembah Allah ﷻ semata.

Berhala-berhala mulai memenuhi kehidupan mereka.¹²

Patung-patung diagungkan.

Doa dipanjatkan kepada selain Allah.

Dan kebiasaan yang dahulu dianggap asing mulai menjadi sesuatu yang biasa.

Dunia terus berjalan.

Namun arah yang dahulu dikenal perlahan menghilang.

◆

Di antara kota-kota yang tersebar di Jazirah Arab, ada satu kota yang berbeda.

Kota itu tidak memiliki sungai besar.

Tidak memiliki tanah yang subur.

Tidak pula memiliki kerajaan yang menguasai wilayah-wilayah di sekitarnya.

Namun manusia terus berdatangan ke sana.

Dari utara.

Dari selatan.

Dari timur.

Dari barat.

Tahun demi tahun.

Generasi demi generasi.

Mereka datang membawa barang dagangan.

Mereka datang untuk bertemu kabilah-kabilah lain.

Dan mereka datang untuk mengunjungi sebuah bangunan yang telah dikenal jauh sebelum mereka dilahirkan.

◆

Bangunan itu tidak menjulang tinggi.

Tidak dibangun dari emas.

Tidak pula dikelilingi istana-istana megah.

Namun kedudukannya begitu istimewa di hati masyarakat Arab.

Bangunan itu adalah [[Ka'bah|location:kabah]].

Menurut riwayat yang diwariskan turun-temurun, Ka'bah dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.⁴⁵

Bukan untuk berhala.

Bukan untuk patung.

Tetapi sebagai tempat beribadah kepada Allah ﷻ.

Waktu berlalu.

Generasi berganti.

Berabad-abad pun terlewati.

Namun manusia tidak selalu menjaga apa yang diwariskan kepada mereka.

Dan sedikit demi sedikit, berhala mulai mengambil tempat yang seharusnya tidak mereka miliki.

◆

Orang-orang datang membawa harapan.

Membawa doa.

Membawa persembahan.

Sebagian memang datang untuk mengagungkan Allah.

Tetapi sebagian yang lain datang untuk sesuatu yang berbeda.

Mereka meletakkan doa mereka di hadapan patung-patung batu.

Mereka meminta kepada sesuatu yang tidak bisa mendengar.

Mereka berharap kepada sesuatu yang tidak bisa menjawab.

Ka'bah masih berdiri di tengah semua itu.

Seperti aslinya.

Seperti tujuan awalnya.

Tapi yang mengelilinginya sudah bukan lagi yang seharusnya ada di sana.

◆

Meski demikian, tidak semua orang melupakan kebenaran.

Di tengah masyarakat yang dipenuhi berhala, masih ada segelintir orang yang menolak menyembah selain Allah ﷻ.

Mereka dikenal sebagai kaum Hanif.¹²

Jumlah mereka tidak banyak.

Mereka tidak memiliki kekuasaan.

Mereka juga tidak memiliki pengaruh yang besar.

Tetapi mereka tetap mencari agama Nabi Ibrahim عليه السلام.¹

Mereka percaya bahwa kebenaran masih ada.

Meski saat itu terasa begitu jauh.

Seperti cahaya kecil yang hampir tidak terlihat di tengah malam yang gelap.

◆

Begitulah Jazirah Arab sebelum Islam.

Tanah yang keras.

Manusia-manusia yang tangguh.

Jalur perdagangan yang ramai.

Suku-suku yang menjaga kehormatan mereka dengan sepenuh hati.

Namun di balik semua itu, ada sesuatu yang hilang.

Manusia masih mencari arah.

Mereka mengenal keberanian.

Tetapi belum mengenal belas kasih sebagaimana mestinya.

Mereka mengenal kesetiaan.

Tetapi sering kali melupakan keadilan.

Mereka mengenal kemuliaan.

Tetapi juga membiarkan berbagai bentuk kezaliman tumbuh di tengah kehidupan mereka.

Dunia terus berjalan.

Hari berganti hari.

Tahun berganti tahun.

Tidak ada yang tampak berbeda.

Tidak ada yang tampak luar biasa.

Namun sering kali, perubahan terbesar datang ketika tidak ada seorang pun yang menduganya.

⟩ Di balik setiap kegelapan, selalu ada sesuatu yang menunggu untuk menyala.

Jazirah Arab bukan sekadar hamparan gurun.

Bukan sekadar jalur perdagangan.

Bukan sekadar tempat berbagai suku mempertahankan kehormatan mereka.

Tanah ini sedang Allah ﷻ siapkan.

Seperti sebuah panggung yang menunggu tirainya dibuka.

Dan di atas panggung itu, sebentar lagi, sebuah peristiwa akan terjadi.

Peristiwa yang tidak mengubah bentuk gurunnya.

Tidak mengubah gunung-gunungnya.

Tidak mengubah langit yang menaunginya.

Tetapi akan mengubah manusia yang hidup di bawahnya.

Karena seseorang akan datang.

Membawa petunjuk setelah kebingungan.

Membawa cahaya setelah kegelapan.

Membawa rahmat setelah begitu banyak luka yang diwariskan dari generasi ke generasi.

Dan semuanya akan bermula dari sebuah kota kecil di tengah gurun.

Kota itu bernama [[Makkah|location:makkah]].`,
    featured: false,
    characterIds: [],
    locationId: 'jazirah-arab',
    references: [
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Dhikr asl al-\'Arab wa amr \'Amr ibn \'Amir wa Amr al-Fil, Hal. 1–70, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.',
      'Ibnu Ishaq, Sirah Rasulullah, riwayat Ibnu Hisyam, dalam: As-Sirah An-Nabawiyah, Jilid 1, Hal. 1–70, Dar al-Ma\'rifah, Beirut',
      'Al-Baladzuri, Futuh al-Buldan, Hal. 67 (perdagangan pra-Islam), Dar al-Kutub al-\'Ilmiyyah, Beirut, 1419 H, tahqiq Radwan Muhammad Radwan',
      'Al-Mas\'udi, Muruj adz-Dzahab wa Ma\'adin al-Jawahir, Jilid 2, Bab: Dhikr Makkah wa akhbariha wa bina\' al-Bayt, Hal. 275–310, Dar al-Hijrah, Qom, 1409 H, tahqiq As\'ad Daghir',
      'Yaqut al-Hamawi, Mu\'jam al-Buldan, Jilid 5, Entri: Makkah, Hal. 286–297, Dar Shadir, Beirut, 1397 H / 1977 M',
    ],
    order: 1,
  },
  {
    id: 'bab-2',
    journeyId: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: 'Makkah: Kota di Lembah Gersang',
    subtitle: 'Lembah Gersang yang Menyimpan Sejarah Besar',
    year: 'Sebelum 570 M',
    yearNum: -570,
    description: 'Lokasi Makkah, posisi strategis, jalur perdagangan.',
    image: '/images/bab/bab-2-hero.png',
    story: `Gunung-gunung batu membentang di kedua sisi.

Seolah menutup jalan.

Seolah tidak mengizinkan siapa pun masuk.

Namun di antara celah-celah batu itu, ada lorong.

Sempit.

Tersembunyi.

Sulit ditemukan jika tidak tahu keberadaannya.

Di balik lorong itu, terbentang sebuah lembah.

Lembah itu bernama [[Makkah|location:makkah]].⁴⁶

✦ ✦ ✦

Dari atas, Makkah tampak seperti cekungan di antara gunung-gunung kelabu.

Tidak ada sungai yang membelahnya.

Tidak ada danau yang memantulkan cahaya.

Tanahnya kering.

Berbatu.

Gersang.

Angin yang masuk ke lembah ini membawa debu, bukan kesegaran.

Matahari menyengat lebih keras di sini karena pantulannya mengenai dinding-dinding batu yang mengelilingi kota.

Sebuah lembah yang seharusnya tidak ada alasan untuk ditinggali.⁶

Namun manusia tetap datang.

Mereka mendirikan kemah di celah-celah batu.

Mereka membangun rumah-rumah sederhana dari batu dan tanah.

Mereka hidup di sini.

Meskipun tanahnya keras.

Meskipun udaranya kering.

Meskipun tidak ada alasan logis untuk memilih lembah ini daripada lembah-lembah lain yang lebih hijau dan lebih ramah.

Kenapa orang mau tinggal di sini?

✦ ✦ ✦

Jawabannya ada di bawah tanah.

Di suatu titik di lembah ini, air memancar dari dalam bumi.

Sebuah sumur.

Sumur yang disebut Zamzam.³⁵

Di tanah yang hampir tidak mengenal hujan, satu sumber air adalah segalanya.

Zamzam bukan sekadar sumur.

Zamzam adalah alasan Makkah ada.³⁵

Tanpa air ini, lembah ini tidak lebih dari celah antara gunung yang tidak bernilai.

Dengan air ini, lembah ini menjadi titik hidup di tengah kegersangan.

✦ ✦ ✦

Menurut riwayat, sumur ini bermula dari doa seorang ibu.

Hajar رضي الله عنها.³

Ibu dari Nabi Ismail عليه السلام.

Ketika putranya kehausan dan tidak ada air di mana pun, ia berlari.

Dari bukit Shafa ke bukit Marwah.

Dari bukit Marwah kembali ke Shafa.

Bolak-balik.

Tujuh kali.

Mencari air.

Mencari harapan.

Dan air itu datang.

Bukan dari arah yang ia cari.

Tapi dari bawah tanah, tepat di bawah kaki putranya.

Atas izin Allah ﷻ.³⁵

Air yang tidak habis.

Air yang terus mengalir.

Hingga berabad-abad kemudian.

✦ ✦ ✦

Setiap kafilah yang melintas di jalur perdagangan utara-selatan harus berhenti di sini.¹⁶

Bukan karena Makkah indah.

Tapi karena Makkah adalah satu-satunya tempat di sepanjang rute ini yang memiliki air cukup untuk puluhan unta dan ratusan orang.

Dari Yaman ke [[Syam|location:syam]], jaraknya berminggu-minggu.

Makkah adalah titik di tengah jalan.²⁶

Tempat muatan diturunkan.

Unta diberi minum.

Dan pedagang bertemu pedagang lain.

Barang-barang dari berbagai penjuru dunia bertemu di pasar-pasar Makkah.

Kemenyan dari selatan.

Kain dari utara.

Rempah dari timur.

Pengaruh peradaban dari seberang Laut Merah.

Semua bertemu di satu lembah.

Siapa pun yang berjalan dari selatan ke utara hampir pasti mengenal kota ini.

Posisi ini bukan kebetulan.

✦ ✦ ✦

Namun Makkah bukan kota terbesar di [[Jazirah Arab|location:jazirah-arab]].

Thaif lebih hijau.

Yatsrib lebih subur.

Tapi Makkah memiliki sesuatu yang tidak dimiliki kota-kota lain.

[[Ka'bah|location:kabah]].

Sebuah bangunan kubus berdiri di tengah lembah ini.

Bangunan tua yang usianya sudah tidak bisa diingat oleh siapa pun yang hidup saat itu.

Menurut riwayat yang diwariskan turun-temurun, bangunan ini dibangun oleh Nabi Ibrahim عليه السلام dan putranya, Nabi Ismail عليه السلام.²

Bukan untuk berhala.

Bukan untuk patung.

Tetapi sebagai tempat beribadah kepada Allah ﷻ.

Dan bangunan ini menjadi alasan yang lebih besar daripada perdagangan.

Alasan mengapa orang-orang terus datang ke Makkah.

Setiap tahun, suku-suku dari seluruh Jazirah Arab berdatangan untuk berziarah ke Ka'bah.

Di musim haji, perdagangan dan ibadah berjalan bersamaan.

Ka'bah menjadikan Makkah bukan sekadar kota pasar.

Tapi kota suci.

✦ ✦ ✦

Kota seperti ini butuh penjaga.

Suku Quraisy yang memegang amanah itu.²

Mereka adalah penghuni Makkah yang paling berkuasa.

Mereka menguasai sumur Zamzam.

Mereka mengelola pasar-pasar.

Mereka menjadi penjaga Ka'bah.

Kedudukan ini bukan hanya soal kekayaan.

Ini soal kehormatan.

Menjaga Ka'bah berarti memikul amanah yang dihormati oleh seluruh suku.²⁴

Menyediakan air bagi kafilah berarti menjadi tuan rumah bagi seluruh Jazirah Arab.

Dan Quraisy memanfaatkan posisi ini dengan cerdik.

Mereka mengadakan perjanjian dengan suku-suku lain.

Perjanjian yang menjamin keamanan kafilah di jalur perdagangan.

Perjanjian yang menjamin bahwa bulan-bulan suci tidak akan dilanggar oleh peperangan.

Dalam bulan-bulan suci itu, semua suku boleh datang ke Makkah tanpa takut diserang.

Dan saat mereka datang, mereka berdagang.

Agama dan perdagangan.

Berjalan berdampingan.

✦ ✦ ✦

Sebuah lembah gersang yang seharusnya tidak punya alasan untuk ada.

Tapi hidup karena air dari bumi.

Hidup karena emas dari kafilah.

Hidup karena doa dari ribuan orang yang datang menuju bangunan kubus di tengahnya.

Sebuah kota yang seharusnya kosong.

Namun selalu penuh.

Sebuah lembah yang seharusnya mati.

Namun selalu ramai.

⟩ Air terus mengalir dari Zamzam.

Kafilah terus berdatangan.

Ka'bah tetap berdiri di tengah lembah itu.

Dan Makkah terus menjalani hari-harinya seperti biasa.

Belum ada yang mengetahui apa yang sedang dipersiapkan Allah ﷻ dari kota kecil ini.

✦ ✦ ✦`,
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: [
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Dhikr asl al-\'Arab wa amr \'Amr ibn \'Amir, Hal. 1–70, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.',
      'Al-Azraqi, Akhbar Makkah wa-ma Ja\'a fiha min al-Athar, Juz\' 1, Bab: Dhikr Bina\' Quraisy al-Ka\'bah fi al-Jahiliyyah, Hal. 157–174, Dar al-Andalus, Beirut, 1403 H / 1983 M, tahqiq Rushdi as-Salih Malhas',
      'Al-Azraqi, Akhbar Makkah wa-ma Ja\'a fiha min al-Athar, Juz\' 2, Bab: Ma Ja\'a fi Ikhraj Jibril Zamzam li-Umm Isma\'il, Hal. 39–61, Dar al-Andalus, Beirut, 1403 H / 1983 M, tahqiq Rushdi as-Salih Malhas',
      'Al-Fasi, Shifa\' al-Gharam bi-Akhbar al-Balad al-Haram, Jilid 1, al-Bab al-Awwal: fi Dhikr Asma\' al-Madinah wa-Awwal Man Sakaniha, Dar al-Kitab al-\'Arabi, Beirut, 1405 H / 1985 M, tahqiq Umar Abd as-Salam Tadmuri',
      'Al-Fasi, Shifa\' al-Gharam bi-Akhbar al-Balad al-Haram, Jilid 2, al-Bab al-\'Ishrun: fi Dhikr Hafr Bi\'r Zamzam wa-\'Ilajiha, Dar al-Kitab al-\'Arabi, Beirut, 1405 H / 1985 M, tahqiq Umar Abd as-Salam Tadmuri',
      'Yaqut al-Hamawi, Mu\'jam al-Buldan, Jilid 5, Entri: Makkah, Hal. 286–297, Dar Shadir, Beirut, 1397 H / 1977 M',
    ],
    order: 2,
  },
  {
    id: 'bab-3',
    journeyId: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: "Ka'bah: Bangunan Tua yang Dimuliakan",
    subtitle: 'Dari tangan Nabi Ibrahim عليه السلام ke tangan Quraisy',
    year: 'Zaman Dahulu',
    yearNum: -2000,
    description: 'Nabi Ibrahim عليه السلام, Nabi Ismail عليه السلام, dan Ka\'bah.',
    image: '/images/bab/bab-3-hero.png',
    story: `Di tengah lembah itu, pandangan manusia selalu kembali ke tempat yang sama.

Tidak peduli dari arah mana mereka datang.

Tidak peduli seberapa jauh mereka berjalan.

Mata mereka selalu mencari bangunan itu.

Bangunan yang tidak tinggi.

Tidak megah.

Tidak dihiasi emas atau perak.

Hanya batu-batu yang disusun membentuk kubus.

Tidak ada atap yang menutupinya.

Tidak ada pintu yang menjaganya.

Tapi bangunan ini lebih tua dari siapa pun yang hidup saat itu.

Lebih tua dari suku Quraisy.

Lebih tua dari tradisi-tradisi yang mereka pegang.

Lebih tua dari ingatan manusia.

Bangunan itu bernama [[Ka'bah|location:kabah]].⁵⁶

✦ ✦ ✦

Dari mana bangunan ini berasal?

Riwayat yang diwariskan turun-temurun menyebutkan bahwa bangunan ini pertama kali dibangun oleh Nabi Ibrahim عليه السلام.⁴⁵⁶

Ibrahim.

Lelaki yang meninggalkan kaumnya karena mereka menyembah berhala.

Lelaki yang dilempar ke dalam api tapi tidak terbakar.

Lelaki yang berjalan meninggalkan segalanya karena Allah ﷻ memintanya pergi.

Ibrahim tidak membangun Ka'bah untuk dirinya sendiri.²

Ia membangunnya karena diperintahkan.

Allah ﷻ berfirman agar ia mendirikan rumah peribadatan di lembah itu.

Rumah untuk manusia datang menghadap Tuhan mereka.

Bukan rumah untuk patung.

Bukan rumah untuk berhala.

Tapi rumah untuk mengesakan Allah ﷻ.

✦ ✦ ✦

Ibrahim tidak sendirian.

Putranya menemani pembangunan itu.⁴⁵

Ismail.

Anak yang ia tinggalkan bersama ibunya, Hajar رضي الله عنها, di lembah yang gersang bertahun-tahun yang lalu.

Anak yang tumbuh di tanah kering.

Yang matanya melihat gurun lebih sering daripada pepohonan.

Yang hidupnya dimulai dari doa ibunya dan air dari bumi.

Sekarang Ismail sudah dewasa.

Dan ayahnya kembali.

Bukan untuk membawanya pergi.

Tapi untuk membangun sesuatu bersamanya.

Ayah dan putra.

Menyusun batu demi batu.

Di lembah yang sama tempat Ismail dulu menangis kehausan.

Di tempat yang sama di mana air Zamzam memancar.

Di tanah yang sama di mana Hajar رضي الله عنها berlari mencari harapan.

Mereka membangun rumah Allah ﷻ di atas tanah yang sudah disaksikan oleh doa.²³

✦ ✦ ✦

Ketika bangunan itu selesai, Ibrahim عليه السلام berdoa.

Bukan doa kecil.

Bukan ucapan syukur biasa.

Ini doa seorang ayah yang telah melewati banyak ujian.

Yang meninggalkan keluarganya di tanah kosong karena diperintahkan.

Yang diperintahkan menyembelih putranya karena diperintahkan.

Yang sekarang berdiri di samping putra itu, di depan bangunan yang mereka bangun bersama.

Ibrahim mengangkat tangannya.

Dan memohon.

Allah ﷻ mengabadikan sebagian doanya dalam Al-Qur'an:¹

» "Ya Tuhanku, jadikanlah negeri ini negeri yang aman dan jauhkanlah aku beserta anak cucuku daripada menyembah berhala."
— QS Ibrahim: 35

Doa itu terdengar.

Dan Allah ﷻ mengabulkannya.¹

Berabad-abad kemudian.

✦ ✦ ✦

Namun waktu tidak berhenti.

Ibrahim wafat.

Ismail wafat.

Generasi berganti generasi.

Dan di setiap pergantian itu, Ka'bah tetap berdiri.

Tapi manusia berubah.

Awalnya, Ka'bah dikunjungi oleh orang-orang yang mengesakan Allah ﷻ.

Mereka datang untuk beribadah.

Mereka datang karena doa Ibrahim masih hidup di ingatan mereka.

Namun pelan-pelan, sesuatu masuk ke dalam rumah yang seharusnya hanya untuk Allah ﷻ.

Berhala.

Patung-patung kecil yang disembah.

Satu.

Dua.

Puluhan.

Hingga ratusan.⁴⁵⁶

Ka'bah yang dibangun untuk mengesakan Allah ﷻ, kini dipenuhi oleh benda-benda yang manusia buat sendiri.

Rumah Allah ﷻ dijadikan gudang berhala.

✦ ✦ ✦

Mereka tidak pernah sengaja meninggalkan kebenaran.

Mereka hanya menambahkan sesuatu.

Satu tradisi tambahan.

Satu patung tambahan.

Satu kebiasaan tambahan.

Hingga yang asli tidak lagi terlihat.

✦ ✦ ✦

Bangunan fisiknya tetap utuh.

Tapi maknanya sudah berubah.

Ka'bah tetap menjadi alasan orang datang ke [[Makkah|location:makkah]].

Tapi mereka datang bukan lagi untuk mengesakan Allah ﷻ.

Mereka datang untuk menyentuh patung-patung di dalamnya.

Mereka datang untuk menjalankan ritual yang sudah tidak ada lagi yang tahu dari mana asalnya.

Mereka datang untuk berdagang.

Dan di antara semua itu, ada yang masih ingat.

Masih ada yang menceritakan kisah Ibrahim.⁴⁶

Masih ada yang tahu bahwa Ka'bah dibangun bukan untuk berhala.

Tapi suara mereka semakin kecil.

Semakin tenggelam di antara kebisingan pasar dan nyanyian ritual.

✦ ✦ ✦

Bangunan itu tetap berdiri.

Batu-batu yang disusun Ibrahim dan Ismail masih ada.

Doa yang dipanjatkan Ibrahim masih tercatat.

Hanya manusia yang lupa.

Lupa bahwa rumah ini dibangun untuk Allah ﷻ.

Lupa bahwa leluhur mereka berdoa bukan kepada patung.

Lupa bahwa di balik setiap batu Ka'bah, ada sejarah yang lebih tua daripada semua berhala yang mereka letakkan di dalamnya.

⟩ Ka'bah menunggu.

Tidak dengan suara.

Tidak dengan gerakan.

Tapi dengan kehadirannya yang tidak pernah hilang.

Bangunan tua itu terus berdiri di tengah lembah.

Seperti kata-kata yang belum diucapkan.

Seperti janji yang belum ditepati.

Menunggu seseorang yang akan mengembalikan rumah ini kepada Allah ﷻ yang memintanya dibangun.¹²³`,
    featured: false,
    characterIds: ['ibrahim-as', 'ismail-as'],
    locationId: 'kabah',
    references: [
      'QS Ibrahim: 35-41',
      'QS Al-Baqarah: 125-127',
      'QS Al-Hajj: 26-30',
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Dhikr Bina\' Ibrahim al-Bayt, Hal. 42-55, Dar al-Ma\'rifah, Beirut',
      'Al-Azraqi, Akhbar Makkah, Juz\' 1, Bab: Dhikr Bina\' Ibrahim al-Ka\'bah, Hal. 30-45, Dar al-Andalus, Beirut',
      'Ath-Thabari, Tarikh ar-Rusul wa al-Muluk, Jilid 1, Hal. 267-276, Dar al-Kutub al-\'Ilmiyyah, Beirut',
    ],
    order: 3,
  },
  {
    id: 'bab-4',
    journeyId: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: 'Suku Quraisy',
    subtitle: 'Penjaga Ka\'bah dan penguasa Makkah',
    year: 'Sebelum 570 M',
    yearNum: -570,
    description: 'Struktur suku, kehormatan Quraisy, pengelola Ka\'bah.',
    image: '/images/bab/bab-4-hero.png',
    story: `Mereka bukan suku terbesar di [[Jazirah Arab|location:jazirah-arab]].

Bukan yang paling tua.

Bukan yang paling banyak.

Tapi mereka yang paling dihormati.

✦ ✦ ✦

Quraisy.

Nama itu mempunyai berat sendiri di setiap sudut semenanjung.

Ketika suku lain mendengar kata itu, mereka tidak memikirkan pedang atau pasukan.

Mereka memikirkan [[Ka'bah|location:kabah]].

Mereka memikirkan [[Makkah|location:makkah]].

Mereka memikirkan orang-orang yang dipercaya menjaga rumah yang paling tua di tanah Arab.

Itulah sumber segala kehormatan Quraisy.²⁴

Bukan kekuatan militer.

Bukan kekayaan dagang.

Tapi kunci Ka'bah.

✦ ✦ ✦

Bagaimana sebuah suku biasa bisa menjadi penguasa kota paling disegani di seluruh Jazirah?

Jawabannya dimulai dari satu orang.

Qusay bin Kilab.²³⁵

Lelaki yang menyatukan Quraisy dan membawa mereka ke dalam lembah Makkah.

Sebelum Qusay, Ka'bah dijaga oleh suku lain.

Khuza'ah.²⁴

Mereka masuk ketika keturunan Ismail عليه السلام mulai tersebar dan melemah.

Perlahan.

Tanpa terasa.

Hingga suatu hari, rumah itu sudah bukan milik mereka lagi.

Tapi Qusay tidak menerima keadaan itu.

Ia tidak melihat alasan mengapa rumah leluhurnya dijaga oleh suku lain.

Ia tidak melihat alasan mengapa keturunan Ibrahim dan Ismail tidak memiliki hak atas kota yang dibangun oleh nenek moyang mereka sendiri.

Maka Qusay bergerak.

Dengan kecerdikan dan keberanian, ia mengambil kembali Makkah.²³

Bukan dengan peperangan besar.

Bukan dengan pertumpahan darah.

Tapi dengan cara yang lebih halus — dan lebih permanen.

Ia menikahi putri kepala suku Khuza'ah.

Ia mengumpulkan dukungan.

Ia menunggu saat yang tepat.

Dan ketika waktunya tiba, ia mengambil alih.

✦ ✦ ✦

Setelah Qusay menguasai Makkah, ia tidak membagi-bagi kekuasaan seperti kebanyakan pemimpin suku.

Ia membangun struktur.

Untuk pertama kalinya, Quraisy memiliki pembagian peran yang jelas.²⁴

Ada yang menjaga kunci Ka'bah — Hijabah.

Ada yang memberi minum jamaah haji — Siqayah.

Ada yang memberi makan tamu — Rifadah.

Ada yang memimpin pasukan — Liwa'.

Ada yang mengatur musyawarah — Dar an-Nadwah.

Setiap faksi memiliki tugas.

Setiap tugas memiliki kehormatan.

Dan semua kehormatan itu berpusat pada satu nama: Quraisy.

✦ ✦ ✦

Qusay membangun Dar an-Nadwah — rumah musyawarah.⁴

Bangunan itu menjadi pusat segala keputusan.

Pernikahan tidak sah tanpa persetujuan Dar an-Nadwah.

Perang tidak dimulai tanpa persetujuan Dar an-Nadwah.

Bendera pasukan tidak dikibarkan tanpa persetujuan Dar an-Nadwah.

Setiap urusan besar Makkah melewati satu pintu itu.

Dan hanya Quraisy yang boleh duduk di dalamnya.

✦ ✦ ✦

Setelah Qusay wafat, kekuasaan tidak runtuh.

Justru semakin kuat.

Anak cucunya mewarisi bukan hanya nama, tapi sistem.

Abdu Manaf mengambil alih kehormatan memberi makan dan minum.

Abdud-Dar mewarisi kunci Ka'bah dan bendera perang.

Hingga datang satu nama yang mengubah segalanya.

Hashim.²³

Kakek Nabi [[Muhammad ﷺ|character:muhammad-saw]].

Ia tidak puas dengan kehormatan warisan.

Ia ingin lebih.

Hashim melihat bahwa Makkah punya sesuatu yang tidak dimiliki kota mana pun di Jazirah: Ka'bah.

Setiap tahun, ribuan orang datang berziarah.

Mereka butuh makanan.

Mereka butuh tempat tinggal.

Mereka butuh perlindungan.

Dan mereka membawa barang dagangan.

Hashim menyadari bahwa kehormatan tanpa kekayaan adalah pohon tanpa akar.

Maka ia memulai perjalanan dagang ke [[Syam|location:syam]] di musim panas.²³

Dan ke Yaman di musim dingin.

Ia menandatangani perjanjian dengan kaisar Byzantium.

Ia membuat kesepakatan dengan suku-suku di sepanjang jalur.

Ia menjamin keamanan kafilah Quraisy melewati tanah-tanah yang selama ini berbahaya.

Perjalanan yang dulunya penuh risiko kini menjadi aman.

Kafilah yang dulunya kecil kini menjadi besar.

Keuntungan yang dulunya tipis kini menjadi berlimpah.

✦ ✦ ✦

Al-Qur'an sendiri menyebut nikmat ini:¹

» "Karena persaudaraan Quraisy. Persaudaraan mereka dalam perjalanan musim dingin dan musim panas. Maka hendaklah mereka menyembah Tuhan rumah ini."
— QS Quraisy: 1-3

Allah ﷻ menyebut dua perjalanan itu bukan tanpa alasan.

Karena dari dua perjalanan itulah seluruh kekuasaan Quraisy bertumpu.

Tanpa perdagangan, mereka hanya penjaga bangunan.

Dengan perdagangan, mereka menjadi salah satu kekuatan paling berpengaruh di Jazirah Arab.

✦ ✦ ✦

Nama Quraisy pun menjadi sinonim dari dua hal: kehormatan dan kekayaan.

Dua hal yang jarang berada di tangan yang sama di tanah Arab.

Biasanya suku yang kuat secara militer miskin secara harta.

Atau suku yang kaya secara harta lemah secara kehormatan.

Quraisy memiliki keduanya.

Dan itu membuat mereka tidak tergoyahkan.

✦ ✦ ✦

Tapi kekuasaan tidak datang tanpa bayaran.

Di balik kesatuan yang mereka tunjukkan ke luar, ada retakan yang tumbuh di dalam.

Bani Abdu Manaf dan Bani Abdud-Dar.

Dua cabang keluarga yang sama-sama merasa berhak atas kehormatan tertinggi.

Abdu Manaf — keturunan Hashim — merasa bahwa merekalah yang membawa kemakmuran.

Merekalah yang menghidupi Makkah.

Merekalah yang menjaga hubungan dengan dunia luar.

Abdud-Dar — keturunan yang mewarisi kunci Ka'bah — merasa bahwa merekalah pemilik sah segala kehormatan.

Ayah mereka yang mewariskan hak-hak itu.

Tetaplah milik mereka.

Perselisihan ini tidak meledak menjadi perang.

Tapi tidak juga reda.

Ia mengendap seperti bara di bawah abu.

Menunggu angin yang akan meniupnya.

✦ ✦ ✦

Di antara semua faksi Quraisy, ada satu rumah yang kelak akan menjadi penting.

Rumah [[Abdul Muthalib|character:abdul-muthalib]].

Cucu Hashim.

Lelaki yang menemukan kembali sumur Zamzam setelah bertahun-tahun terkubur.²⁴⁵

Lelaki yang pernah bernazar akan menyembelih putranya jika diberi sepuluh anak — dan nazar itu hampir terlaksana, sebelum ditebus dengan seratus unta.

Abdul Muthalib bukan raja.²⁵

Tapi pengaruhnya lebih besar dari raja.

Ia bukan pemimpin militer.

Tapi perkataannya lebih berat dari pedang.

Ia duduk di Dar an-Nadwah.

Ia memberi makan jamaah haji.

Ia menjadi suara yang paling didengar di Makkah.

Dan di dalam rumahnya, sejarah sedang menunggu.

✦ ✦ ✦

⟩ Kekuasaan Quraisy seperti malam yang sunyi.

Dari luar, semuanya tenang.

Semuanya teratur.

Semuanya kokoh.

Tapi di bawah ketenangan itu, ada sesuatu yang sedang bergerak.

Sesuatu yang tidak terlihat oleh mata.

Sesuatu yang tidak terdeteksi oleh telinga.

Perlahan.

Tanpa terasa.

Tidak ada yang menyangka bahwa perubahan itu justru akan lahir dari salah satu rumah mereka sendiri.`,
    featured: false,
    characterIds: ['abdul-muthalib'],
    locationId: 'makkah',
    references: [
      'QS Quraisy: 1-4',
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Dhikr Qusay bin Kilab wa Fadl Quraysy, Hal. 55-70, Dar al-Ma\'rifah, Beirut',
      'Ath-Thabari, Tarikh ar-Rusul wa al-Muluk, Jilid 2, Hal. 210-230, Dar al-Kutub al-\'Ilmiyyah, Beirut',
      'Al-Azraqi, Akhbar Makkah, Juz\' 1, Bab: Dhikr Qusay wa Bina\'ih Dar an-Nadwah, Hal. 68-85, Dar al-Andalus, Beirut',
      'Ibnu Sa\'d, Ath-Thabaqat al-Kubra, Jilid 1, Hal. 40-52, Dar Shadir, Beirut',
    ],
    order: 4,
  },
  {
    id: 'bab-5',
    journeyId: 'fase-0',
    collectionId: 'perjalanan-rasulullah',
    title: 'Tahun Gajah',
    subtitle: 'Pasukan yang Dihancurkan dari Langit',
    year: '570 M',
    yearNum: 570,
    description: 'Abrahah, pasukan gajah, QS Al-Fil.',
    image: '/images/bab/bab-5-hero.png',
    story: `Jauh di selatan, seorang raja sedang merencanakan sesuatu.

Bukan perang biasa.

Bukan perebutan wilayah.

Bukan pula penaklukan untuk kekuasaan.

Raja ini ingin menghancurkan sebuah bangunan.

Bangunan yang tidak memiliki pasukan penjaga.

Bangunan yang tidak memiliki tembok pelindung.

Bangunan yang tidak pernah menyerang siapa pun.

Namun bangunan itu membuatnya tidak bisa tidur.

✦ ✦ ✦

Namanya [[Abrahah|character:abrahah]].

Penguasa Yaman atas nama Kerajaan Aksum.²

Ia bukan orang Arab.

Ia datang dari seberang Laut Merah, membawa kekuasaan negara asing ke tanah yang selama ini dikenal karena kemerdekaannya.

Abrahah membangun sebuah gereja besar di Shan'ā.²

Al-Qullays.

Ia membangunnya dengan megah.

Tinggi.

Besar.

Dihiasi emas dan perak.

Tujuannya satu.

Ia ingin agar orang-orang Arab berhenti berziarah ke [[Ka'bah|location:kabah]].²

Ia ingin agar mereka datang ke gerejanya.

Ia ingin mengalihkan pemujaan dari bangunan tua di [[Makkah|location:makkah]] ke bangunan barunya di Yaman.

✦ ✦ ✦

Tapi orang-orang Arab tidak datang.

Mereka tetap pergi ke Makkah.

Mereka tetap mengelilingi Ka'bah.

Mereka tetap mengunjungi bangunan yang dibangun oleh Ibrahim عليه السلام ribuan tahun lalu.

Bukan karena Ka'bah lebih indah.

Bukan karena Ka'bah lebih besar.

Tapi karena Ka'bah memiliki sesuatu yang tidak bisa dibangun oleh tangan manusia.

Ka'bah memiliki jejak yang diwariskan dari generasi ke generasi.

Ka'bah memiliki doa Ibrahim yang masih hidup di ingatan mereka.

Ka'bah memiliki tempat yang sudah tertanam di hati setiap suku Arab sejak mereka lahir.

Al-Qullays tidak memiliki semua itu.

Tidak peduli seberapa indah bangunannya.

Tidak peduli seberapa tinggi menaranya.

Hati manusia tidak bisa dipaksa berpaling dari sesuatu yang sudah mereka cintai selama berabad-abad.

✦ ✦ ✦

Kegagalan itu membuat Abrahah marah.

Bukan marah biasa.

Marah yang menggerakkan pasukan.

Ia mengumpulkan tentara.²

Pasukan besar.

Pasukan infanteri.

Pasukan berkuda.

Dan seekor gajah.

Bukan gajah biasa.

Mahmud.²

Gajah perang raksasa yang tidak pernah dilihat orang-orang Arab sebelumnya.

Hewan sebesar itu tidak hidup di tanah Arab.

Orang-orang Makkah tidak pernah melihat gajah dari dekat.

Mereka hanya mendengar cerita tentang hewan raksasa dari seberang lautan.

Sekarang hewan itu berjalan menuju mereka.

✦ ✦ ✦

Tujuan Abrahah jelas.

Ia akan menghancurkan Ka'bah.

Bukan karena Ka'bah menyerangnya.

Bukan karena Ka'bah mengancamnya.

Tapi karena Ka'bah membuat gerejanya tidak terlihat.

Karena Ka'bah membuatnya merasa kecil.

Karena egonya tidak menerima bahwa bangunan tua di lembah gersang lebih dihormati daripada gereja megah yang ia bangun dengan segala kekayaannya.

Maka berangkatlah pasukan itu.

Dari Shan'ā ke utara.

Menuju Makkah.

✦ ✦ ✦

Perjalanan itu tidak singkat.

Berminggu-minggu melintasi gurun dan pegunungan.

Namun Abrahah tidak terburu-buru.

Ia yakin.

Pasukannya besar.

Gajahnya tak tertandingi.

Tidak ada kekuatan di [[Jazirah Arab|location:jazirah-arab]] yang bisa menghentikannya.

Quraisy bukan tentara.

Mereka pedagang.

Mereka tidak memiliki pasukan perang yang bisa menghadapi kerajaan.

Sepanjang jalan, suku-suku Arab yang mencoba menghalangi langsung dikalahkan.²

Tidak ada yang bisa berbuat banyak.

✦ ✦ ✦

Kabar itu sampai ke Makkah.

Seorang utusan dari Abrahah mendahului pasukan.

Ia menyampaikan pesan.

Abrahah tidak datang untuk memerangi penduduk.²

Ia hanya datang untuk menghancurkan Ka'bah.

Jika mereka tidak melawan, mereka aman.

Jika mereka melawan, mereka akan dihancurkan.

✦ ✦ ✦

Utusan itu diterima oleh [[Abdul Muthalib|character:abdul-muthalib]].²

Sang kepala suku Quraisy.

Lelaki yang paling dihormati di Makkah.

Lelaki yang keturunannya menemukan kembali sumur Zamzam.

Lelaki yang perkataannya lebih berat dari pedang.

Abrahah mengira Abdul Muthalib akan takut.

Mengira ia akan menyerah.

Mengira ia akan memohon belas kasihan.

Tapi yang terjadi berbeda.

Abdul Muthalib berdiri tegak.

Dan mengatakan sesuatu yang akan terus diingat oleh banyak orang setelahnya.

Ia berkata bahwa Ka'bah memiliki Pemilik.²

Dan Pemiliknya akan melindunginya.

✦ ✦ ✦

Abdul Muthalib tidak mengatakan bahwa Quraisy akan berperang.

Ia tidak mengumpulkan pasukan.

Ia tidak membuat benteng.

Ia mengajak penduduk Makkah meninggalkan kota.²

Mereka mengungsi ke pegunungan di sekeliling lembah.

Meninggalkan Ka'bah sendirian di tengah lembah yang kosong.

Bukan karena mereka tidak peduli.

Tapi karena mereka tahu.

Ka'bah bukan milik mereka.

Ka'bah milik Allah ﷻ.

Dan jika Allah ﷻ ingin melindungi rumah-Nya, tidak ada pasukan di dunia yang bisa menyentuhnya.

Jika Allah ﷻ mengizinkan rumah-Nya dihancurkan, maka itu adalah kehendak-Nya.

Dan tidak ada yang bisa menghalangi kehendak-Nya.

✦ ✦ ✦

Pasukan Abrahah tiba di luar Makkah.

Begitu banyak tentara.

Begitu besar pasukan.

Gajah Mahmud berdiri di barisan depan.

Siap untuk maju.

Siap untuk menghancurkan.

Abrahah memerintahkan gajah itu berjalan menuju Ka'bah.

Tapi Mahmud tidak bergerak.

Gajah itu menolak maju.

Tidak peduli seberapa keras dipukul.

Tidak peduli seberapa banyak ditusuk.

Mahmud menolak berjalan menuju Ka'bah.²

Namun ketika mereka mengarahkannya ke utara, ke selatan, ke timur — gajah itu berjalan.

Hanya ketika diarahkan ke Ka'bah, ia menolak.

Seolah ada sesuatu yang menghalanginya.

Sesuatu yang tidak terlihat oleh mata.

Sesuatu yang lebih kuat dari kekuatan manusia.

✦ ✦ ✦

Lalu datanglah sesuatu dari langit.

Bukan awan biasa.

Bukan burung biasa.

Sekawanan burung.¹

Terbang berkelompok.

Setiap burung membawa tiga batu.

Satu di paruhnya.

Dua di cakarnya.

Batu-batu kecil.

Tidak lebih besar dari biji lentil.

Tapi setiap batu membawa sesuatu yang tidak dimiliki oleh senjata mana pun.

Setiap batu membawa perintah Allah ﷻ.¹

✦ ✦ ✦

Al-Qur'an mengabadikan peristiwa itu:

» "Apakah kamu tidak memperhatikan bagaimana Tuhanmu telah bertindak terhadap pasukan bergajah? Bukankah Dia telah menjadikan tipu daya mereka itu sia-sia? Dan Dia mengirimkan terhadap mereka burung yang berbondong-bondong, yang melempari mereka dengan batu dari tanah yang terbakar, lalu Dia menjadikan mereka seperti daun-daun yang dimakan ulat."
— QS Al-Fil: 1-5

✦ ✦ ✦

Pasukan itu hancur.¹

Bukan karena pedang.

Bukan karena panah.

Bukan karena kekuatan manusia.

Mereka hancur karena sesuatu yang datang dari arah yang tidak mereka sangka.

Dari atas.

Dari langit.

Dari Dzat yang mereka lupakan ketika merasa paling kuat.

Batu-batu kecil itu menjadi sebab kehancuran mereka.

Pasukan yang datang dengan kesombongan pulang dalam keadaan hancur.

Pasukan yang begitu besar pada pagi hari.

Menjadi mayat yang bertebaran di sore hari.

Seperti daun-daun yang dimakan ulat.

Seperti sesuatu yang tidak pernah ada.

✦ ✦ ✦

Abrahah selamat dari serangan itu.

Tapi tidak selamat dari luka-lukanya.

Ia melarikan diri kembali ke Yaman.

Dalam keadaan hancur.

Tubuhnya berdarah.

Kulitnya terkelupas seperti yang dialami pasukannya.

Ia meninggal dalam perjalanan.²

Seorang raja yang berangkat dengan pasukan terbesar.

Pulang sebagai mayat yang hampir tidak dikenali.

Gajahnya mati.

Pasukannya musnah.

Dan gereja Al-Qullays yang ia bangun dengan segala kemegahannya — tidak pernah menggantikan kedudukan Ka'bah.

Seolah bangunan itu tidak pernah ada.

✦ ✦ ✦

Ka'bah tetap berdiri.

Tidak satu batu pun yang bergeser.

Tidak satu sentuhan pun yang mengenainya.

Rumah Allah ﷻ dilindungi oleh Allah ﷻ.

Bukan oleh manusia.

Bukan oleh pedang.

Bukan oleh benteng.

Tapi oleh kekuasaan yang tidak terlihat.

✦ ✦ ✦

Orang-orang Arab di seluruh Jazirah menyaksikan peristiwa itu.

Mereka menyebut tahun itu dengan nama baru.

Tahun Gajah.²

Tahun ketika pasukan terbesar yang pernah mereka lihat hancur dalam satu hari.

Tahun ketika bangunan tua di Makkah dilindungi dari langit.

Tahun yang tidak akan pernah dilupakan oleh siapa pun yang hidup di tanah Arab.

✦ ✦ ✦

Dan di tahun yang sama.

Tepat di tahun itu.

Di kota yang dilindungi itu.

Di lembah yang disaksikan oleh pasukan yang hancur itu.

Seorang bayi akan lahir.

Bukan di istana.

Bukan di tengah pasukan.

Bukan dengan gemerlap harta.

Tapi di rumah sederhana.

Di tengah keluarga yang menjaga Ka'bah.

Di bawah langit yang baru saja menyaksikan kekuasaan Allah ﷻ.

⟩ Tahun Gajah bukan sekadar tahun peperangan.

Tahun itu adalah tanda.

Bahwa rumah Allah ﷻ tidak butuh pelindung dari manusia.

Bahwa kekuasaan sejati bukan di tangan raja.

Dan bahwa di balik peristiwa yang menakjubkan itu, sesuatu yang lebih besar sedang dipersiapkan.

Sesuatu yang akan dimulai dari kelahiran seorang bayi.`,
    featured: true,
    characterIds: ['abrahah', 'abdul-muthalib'],
    locationId: 'makkah',
    references: [
      'QS Al-Fil: 1-5',
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Dhikr Amr al-Fil, Hal. 22-42, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.',
    ],
    editorNotes: [
      'Tahun peristiwa Gajah umumnya disebut Tahun Gajah (±570 M). Sebagian ahli sejarah memberi rentang 555–571 M karena perbedaan metode perhitungan kalender.',
      'Jumlah pasukan Abrahah disebut berbeda-beda dalam riwayat. Narasi ini menggunakan deskripsi umum "pasukan besar" untuk menghindari angka yang tidak pasti.',
      'Ibnu Hisyam meriwayatkan Abdul Muthalib sempat diundang ke kemah Abrahah. Sebagian riwayat lain menyebut pertemuan ini lebih singkat. Narasi mempertahankan inti yang disepakati.',
    ],
    order: 5,
  },

  // ═══════════════════════════════════════════════════
  // FASE 1 — KELAHIRAN SANG CAHAYA
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-6',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Kelahiran yang Dinantikan',
    subtitle: 'Fajar di Lembah yang Dilindungi',
    year: '570 M',
    yearNum: 570,
    description: 'Kelahiran Muhammad ﷺ di Makkah.',
    story: `Di antara rumah-rumah batu Bani Hasyim, ada sebuah pintu yang tertutup.

✦ ✦ ✦

Namanya [[Aminah|character:aminah]] binti Wahb.¹

Putri pemimpin Bani Zuhrah.

Istri Abdullah bin Abdul Muthalib.

Perempuan yang sejak berbulan-bulan lalu membawa sesuatu di dalam dirinya.

Tapi Abdullah tidak ada di sisinya.

Abdullah wafat dalam perjalanan dagang ke Yatsrib.¹²

Sebelum sempat kembali ke [[Makkah|location:makkah]].

Sebelum sempat melihat apa yang ia tinggalkan.

✦ ✦ ✦

Sebagian riwayat menyebutkan bahwa selama kehamilan itu, Aminah tidak merasakan beban yang biasanya menyertai para ibu.¹

Tidak ada keluhan yang berat.

Tidak ada kelelahan yang berlebihan.

Dan di suatu malam, ia mendengar sesuatu dalam tidurnya.

Sebuah suara.

Suara yang menyuruhnya memberi nama bayi yang akan lahir itu: Muhammad.¹

✦ ✦ ✦

Waktu terus berjalan.

Hingga suatu pagi di bulan Rabi'ul Awwal.¹²

Matahari belum tinggi.

Di dalam rumah itu, suara tangis bayi pertama terdengar.

Bayi itu lahir.

Seorang laki-laki.

Aminah menatap wajahnya.

Shafiyah binti Abdul Muthalib — bibi dari bayi itu — ada di sisinya.²

Ia yang menerima bayi itu pertama kali.

Ia yang kemudian membawanya kepada [[Abdul Muthalib|character:abdul-muthalib]].

✦ ✦ ✦

Abdul Muthalib adalah lelaki yang sudah tua.

Pemimpin Bani Hasyim.

Pemimpin yang tidak mundur ketika Abrahah datang dengan gajahnya.

Sekarang lelaki itu berdiri memegang cucunya.

Ia membawa bayi itu ke [[Ka'bah|location:kabah]].²

Ia berdoa di sana.

Lalu ia memberi nama bayi itu: Muhammad.²

Seseorang bertanya: mengapa nama itu? Nama itu tidak biasa.

Abdul Muthalib menjawab: aku ingin ia dipuji di langit dan di bumi.²

✦ ✦ ✦

Kabar itu menyebar di Makkah seperti cara kabar selalu menyebar.

Dari mulut ke mulut.

Dari satu rumah ke rumah berikutnya.

Bayi itu lahir.

Cucu Abdul Muthalib.

Putra Abdullah yang telah wafat.

Orang-orang Quraisy mendengarnya.

Mereka menerimanya seperti mereka menerima kabar kelahiran lain dari keluarga terpandang.

Dengan hormat.

Dengan perhatian.

Namun tanpa memahami apa yang baru saja tiba di tengah-tengah mereka.

✦ ✦ ✦

Makkah terus berjalan seperti biasa.

Ka'bah masih berdiri di tempat yang sama.

Pasar masih ramai di pagi hari.

Kafilah masih keluar masuk lembah.

Tidak ada yang berubah di permukaan.

Tidak ada tanda yang bisa dibaca oleh siapa pun yang lewat di jalan itu.

Hanya sebuah rumah di kawasan Bani Hasyim.

Hanya seorang ibu.

Hanya seorang bayi.

Hanya sebuah nama yang baru saja disebut untuk pertama kalinya di lembah ini.

Muhammad.

⟩ Ia lahir tanpa ayah.

Tumbuh di pangkuan seorang ibu yang berduka.

Di kota yang tidak tahu apa yang baru saja datang.

Allah ﷻ sedang menyiapkan sesuatu.

Perlahan.

Tanpa gemuruh.

Tanpa pengumuman.

Seperti fajar yang tidak pernah meminta izin sebelum menerangi.`,
    featured: true,
    characterIds: ['aminah', 'abdul-muthalib'],
    locationId: 'makkah',
    references: [
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Maulid an-Nabi wa Radha\'uhu, Hal. 158–168, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.',
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Tasmiyat an-Nabi wa Haml Abdil Muthalib lahu ila al-Ka\'bah, Hal. 166–168, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk.',
    ],
    editorNotes: [
      'Tanggal kelahiran Rasulullah ﷺ masih diperdebatkan di kalangan ulama sirah. Pendapat paling masyhur adalah 12 Rabi\'ul Awwal, sebagaimana dinukil Ibnu Hisyam. Sebagian ulama menyebut tanggal 9 berdasarkan analisis astronomi. Narasi ini mengikuti yang paling masyhur tanpa menutup adanya khilaf.',
      'Abdullah bin Abdul Muthalib wafat sebelum kelahiran Nabi ﷺ menurut pendapat mayoritas ulama sirah. Sebagian kecil ulama berpendapat ia wafat setelah kelahiran. Narasi mengikuti pendapat mayoritas.',
      'Ucapan Abdul Muthalib tentang nama Muhammad diriwayatkan oleh Ibnu Hisyam dari Ibnu Ishaq. Narasi mengikuti inti riwayat tanpa penambahan.',
    ],
    order: 6,
  },
  {
    id: 'bab-7',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Yang tersisa untuk Halimah',
    subtitle: 'Keberkahan Allah datang saat tak ada pilihan',
    year: '570–572 M',
    yearNum: 570,
    description: 'Muhammad ﷺ di asuh Halimah as-Sa\'diyah di padang pasir.',
    story: `Setiap tahun, rombongan itu datang ke [[Makkah|location:makkah]].

Perempuan-perempuan dari pedalaman.

Mencari bayi-bayi untuk mereka susui.

Membawa pulang sedikit rezeki dari kota yang lebih ramai dari kampung mereka.

Tapi tahun itu berbeda.

✦ ✦ ✦

Kabilah Hawazin sedang dilanda paceklik panjang.¹

Hujan tidak turun.

Padang rumput mengering.

Hewan ternak kurus, dan susu mereka ikut hilang bersama musim kemarau.

Di antara rombongan yang berangkat ke Makkah tahun itu, ada [[Halimah|character:halimah]] binti Abi Dzu\'aib.¹

Bersama suaminya, Harits bin Abdul Uzza.

Dan bayinya sendiri yang masih kecil, yang terus menangis sepanjang malam.

✦ ✦ ✦

Keadaan mereka paling berat di antara semua rombongan.

Halimah menunggangi keledai putih, membawa unta tua yang mereka bawa serta.¹

Unta itu sudah tidak bisa lagi meneteskan susu.

Tidak setetes pun.

Air susu Halimah sendiri tidak cukup untuk anaknya.

Setiap malam dalam perjalanan, ia tidak bisa tidur.

Bayinya menangis karena lapar, dan ia tidak punya apa pun untuk menenangkannya.¹

Mereka berjalan dengan harapan yang nyaris habis.

Hanya berharap ada jalan keluar di Makkah.

✦ ✦ ✦

Sesampainya di Makkah, satu per satu perempuan dalam rombongan mendapat bayi susuan.

Keluarga-keluarga Quraisy menyerahkan anak mereka kepada perempuan yang dianggap layak.

Bayi yang ayahnya mampu membayar lebih, lebih dulu mendapat ibu susu.

Tersisa satu bayi.

Seorang anak yatim.

Ayahnya, Abdullah bin Abdul Muthalib, sudah wafat sebelum anak itu lahir.

Setiap perempuan yang ditawari menolak.¹

Mereka berpikir: anak yatim, apa yang bisa diharapkan dari ibunya yang tidak punya suami?

Halimah pun menolak.

Ia juga berharap mendapat bayi dari keluarga yang mampu membalas kebaikannya.

✦ ✦ ✦

Dua hari berlalu.

Setiap perempuan dari rombongan Halimah sudah membawa bayi masing-masing.

Hanya Halimah yang belum.

Ia tidak ingin pulang dengan tangan kosong.

Ia berkata kepada suaminya: aku tidak suka kembali bersama teman-temanku tanpa membawa bayi susuan.¹

Demi Allah, aku akan pergi dan mengambil anak yatim itu.

Ia mengambil bayi itu.

Muhammad.

✦ ✦ ✦

Begitu Halimah menggendongnya dan mendekapkannya ke dada, sesuatu terjadi.

Air susunya — yang sudah hampir kering sepanjang perjalanan — mengalir.

Penuh.

Muhammad menyusu sampai kenyang.

Lalu anaknya sendiri.

Sampai kedua bayi itu tertidur pulas, untuk pertama kalinya sejak mereka berangkat dari kampung.

Harits memerah susu unta tua mereka, sekadar mencoba.

Susu itu keluar.

Deras.

Mereka berdua minum sampai puas.

Harits menatap istrinya.

Demi Allah, Halimah, engkau telah mengambil satu jiwa yang penuh berkah.¹

✦ ✦ ✦

Esok paginya, rombongan berangkat pulang.

Unta Halimah — yang berangkat sebagai unta paling lemah dan paling lambat di antara semuanya — berjalan paling depan.

Perempuan-perempuan lain memacu tunggangan mereka, tapi tidak ada yang bisa menyamai langkahnya.

Mereka berseru kepadanya: tunggu kami, wahai putri Abu Dzu\'aib! Bukankah itu unta yang sama yang kau bawa kemarin?¹

Halimah menjawab: benar, demi Allah, ini unta yang sama.

Mereka saling berpandangan.

Pasti ada sesuatu pada unta itu.

✦ ✦ ✦

Sesampainya di kampung Bani Sa\'d, paceklik masih berlangsung.

Tanah masih kering.

Ternak tetangga masih kurus, tidak menghasilkan apa-apa.

Tapi kambing-kambing Halimah pulang setiap sore dengan perut penuh.²

Susu mereka bisa diperah berkali-kali, diminum sepuasnya oleh seisi rumah.

Padahal kambing-kambing lain di kampung itu tidak meneteskan susu setetes pun.

Tetangga-tetangganya memperhatikan.

Lalu mulai menggiring ternak mereka ke padang yang sama dengan kambing Halimah.

Berharap ikut mendapat berkah yang sama.

✦ ✦ ✦

Muhammad ﷺ tumbuh di padang Bani Sa\'d.

Jauh dari sesak Makkah.

Jauh dari riuh pasar dan kafilah.

Ia belajar berjalan di atas tanah yang keras dan kering.

Ia belajar bicara dengan kata-kata padang pasir.³

Kata-kata yang belum tercampur logat pedagang dari negeri jauh.

Kata-kata yang lahir dari angin, dari unta, dari langit terbuka.

✦ ✦ ✦

Dua tahun berlalu.

Sudah menjadi kebiasaan bahwa anak yang disusui dikembalikan kepada keluarganya setelah disapih.

Halimah membawa Muhammad kembali ke Makkah.

Ia menyerahkannya kepada [[Aminah|character:aminah]].

Tapi kemudian Halimah memohon sesuatu.

Ia memohon agar diizinkan membawa Muhammad kembali ke pedalaman, untuk sementara waktu lagi.

Aminah mengizinkan.

Muhammad kembali ke tanah Bani Sa\'d.

Ke padang yang sama.

Ke langit yang sama.

⟩ Semua menolaknya karena ia yatim.

Bahkan Halimah, perempuan yang paling membutuhkan, pada awalnya juga menolak.

Ia baru mengambilnya ketika tidak ada pilihan lain — bukan karena yakin akan mendapat berkah, tapi karena tidak tega pulang dengan tangan hampa.

Dan dari keputusasaan itulah keberkahan yang paling besar justru datang.

Saat semua orang mencari bayi yang menjanjikan keuntungan.

Tidak seorang pun memilih anak yatim itu.

Namun Allah ﷻ meletakkan keberkahan-Nya justru pada yang paling sedikit diharapkan manusia.

Karena manusia sering menilai dengan apa yang terlihat.

Sedangkan Allah ﷻ memberi dengan apa yang tidak terlihat.`,
    featured: false,
    characterIds: ['halimah', 'aminah'],
    locationId: 'padang-bani-saad',
    references: [
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Bab: Istirdha\' an-Nabi fi Bani Sa\'d, Hal. 162–166, Dar al-Ma\'rifah, Beirut, tahqiq Musthafa as-Saqqa dkk. (riwayat penuturan Halimah, dinukil dari Ibnu Ishaq)',
      'Ibnu Hisyam, As-Sirah An-Nabawiyah, Jilid 1, Hal. 163–164 (riwayat keberkahan di kampung Bani Sa\'d), Dar al-Ma\'rifah, Beirut.',
      'Ibnu Katsir, Al-Bidayah wan Nihayah, Jilid 2, Bab: Radha\'uhu wa Nasy\'atuhu, tentang tradisi penyusuan anak Quraisy ke pedalaman untuk kefasihan bahasa.',
    ],
    editorNotes: [
      'Riwayat lengkap kisah ini bersumber dari penuturan Halimah sendiri sebagaimana dinukil Ibnu Hisyam dari Ibnu Ishaq. Detail-detail ini termasuk riwayat yang masyhur dalam sirah, meski sebagian ulama menilai sanadnya tidak sampai derajat paling kuat. Narasi mengikuti riwayat yang umum diterima di kalangan ahli sirah, termasuk detail bahwa Halimah sendiri awalnya menolak sebelum keadaan memaksanya mengambil Muhammad ﷺ.',
    ],
    order: 7,
  },
  {
    id: 'bab-8',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Pembelahan Dada',
    subtitle: 'Peristiwa yang membersihkan hati',
    year: '~572 M',
    yearNum: 572,
    description: 'Peristiwa pembelahan dada. Catatan riwayat dijelaskan.',
    story: '[Bab ini menunggu penulisan. Fokus: peristiwa pembelahan dada, catatan riwayat dijelaskan.]',
    featured: false,
    characterIds: ['halimah'],
    locationId: 'padang-bani-saad',
    references: [],
    order: 8,
  },
  {
    id: 'bab-9',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Perpisahan dengan Sang Ibu',
    subtitle: 'Abwa\' dan wafat Aminah — bab emosional',
    year: '576 M',
    yearNum: 576,
    description: 'Perjalanan ke Abwa\', wafat Aminah. Bab emosional.',
    story: '[Bab ini menunggu penulisan. Fokus: Abwa\', wafat Aminah. Ini bab emosional.]',
    featured: false,
    characterIds: ['aminah'],
    locationId: 'abwa',
    references: [],
    order: 9,
  },
  {
    id: 'bab-10',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Di Bawah Asuhan Abdul Muthalib',
    subtitle: 'Kakek yang menyayangi lebih dari anaknya sendiri',
    year: '576–578 M',
    yearNum: 576,
    description: 'Muhammad ﷺ di asuh kakeknya Abdul Muthalib.',
    story: '[Bab ini menunggu penulisan. Fokus: Abdul Muthalib, kasih sayang kakek, posisi di Makkah.]',
    featured: false,
    characterIds: ['abdul-muthalib'],
    locationId: 'makkah',
    references: [],
    order: 10,
  },
  {
    id: 'bab-11',
    journeyId: 'fase-1',
    collectionId: 'perjalanan-rasulullah',
    title: 'Rumah Abu Thalib',
    subtitle: 'Paman yang menjadi pelindung seumur hidup',
    year: '578–595 M',
    yearNum: 578,
    description: 'Muhammad ﷺ di bawah asuhan Abu Thalib.',
    story: '[Bab ini menunggu penulisan. Fokus: Abu Thalib, perlindungan, masa tinggal bersama paman.]',
    featured: false,
    characterIds: ['abu-thalib'],
    locationId: 'makkah',
    references: [],
    order: 11,
  },

  // ═══════════════════════════════════════════════════
  // FASE 2 — MASA PEMUDA
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-12',
    journeyId: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Menggembala di Gurun Makkah',
    subtitle: 'Matahari Makkah belum tinggi...',
    year: '583–595 M',
    yearNum: 583,
    description: 'Muhammad ﷺ menggembala kambing di gurun Makkah.',
    story: 'Matahari Makkah belum tinggi...\n\n[Bab ini menunggu penulisan. Fokus: menggembala, kesunyian gurun, kontemplasi.]',
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: [],
    order: 12,
  },
  {
    id: 'bab-13',
    journeyId: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Perjalanan Pertama ke Syam',
    subtitle: 'Kafilah, padang pasir, dan pendeta yang melihat tanda',
    year: '583 M',
    yearNum: 583,
    description: 'Muhammad ﷺ ikut kafilah Abu Thalib ke Syam, bertemu Bahira.',
    story: '[Bab ini menunggu penulisan. Fokus: kafilah, perjalanan, pertemuan dengan Bahira.]',
    featured: false,
    characterIds: ['abu-thalib', 'bahira'],
    locationId: 'syam',
    references: [],
    order: 13,
  },
  {
    id: 'bab-14',
    journeyId: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Al-Amin',
    subtitle: 'Orang yang dipercaya',
    year: '~590 M',
    yearNum: 590,
    description: 'Julukan Al-Amin — orang yang dipercaya.',
    story: '[Bab ini menunggu penulisan. Fokus: julukan Al-Amin, kejujuran, kepercayaan masyarakat Makkah.]',
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: [],
    order: 14,
  },
  {
    id: 'bab-15',
    journeyId: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Pernikahan dengan Khadijah',
    subtitle: 'Wanita pertama yang mencintai dan mempercayai',
    year: '595 M',
    yearNum: 595,
    description: 'Pernikahan Muhammad ﷺ dengan Khadijah binti Khuwailid.',
    story: '[Bab ini menunggu penulisan. Fokus: pernikahan, Khadijah, rumah tangga.]',
    featured: false,
    characterIds: ['khadijah'],
    locationId: 'makkah',
    references: [],
    order: 15,
  },
  {
    id: 'bab-16',
    journeyId: 'fase-2',
    collectionId: 'perjalanan-rasulullah',
    title: 'Hajar Aswad dan Perselisihan Quraisy',
    subtitle: 'Hampir saja perang meledak di Makkah',
    year: '605 M',
    yearNum: 605,
    description: 'Perselisihan Quraisy tentang Hajar Aswad. Ending kuat — semua suku hampir berperang.',
    story: '[Bab ini menunggu penulisan. Fokus: renovasi Ka\'bah, perselisihan, hikmah Muhammad ﷺ. Ending kuat karena semua suku hampir berperang.]',
    featured: true,
    characterIds: [],
    locationId: 'kabah',
    references: [],
    order: 16,
  },

  // ═══════════════════════════════════════════════════
  // FASE 3 — MENCARI KEBENARAN
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-17',
    journeyId: 'fase-3',
    collectionId: 'perjalanan-rasulullah',
    title: 'Menyepi di Gua Hira',
    subtitle: 'Kesunyian yang mencari jawaban',
    year: '610 M',
    yearNum: 610,
    description: 'Muhammad ﷺ menyepi di Gua Hira sebelum wahyu turun.',
    story: '[Bab ini menunggu penulisan. Fokus: Gua Hira, kontemplasi, mencari makna.]',
    featured: false,
    characterIds: [],
    locationId: 'gua-hira',
    references: [],
    order: 17,
  },
  {
    id: 'bab-18',
    journeyId: 'fase-3',
    collectionId: 'perjalanan-rasulullah',
    title: 'Malam yang Mengubah Dunia',
    subtitle: 'Wahyu pertama turun di malam yang sunyi',
    year: '610 M',
    yearNum: 610,
    description: 'Wahyu pertama turun. Malam yang mengubah segalanya.',
    story: '[Bab ini menunggu penulisan. Fokus: wahyu pertama, Jibril, malam 17 Ramadhan.]',
    featured: true,
    characterIds: ['jibril-as'],
    locationId: 'gua-hira',
    references: [],
    order: 18,
  },
  {
    id: 'bab-19',
    journeyId: 'fase-3',
    collectionId: 'perjalanan-rasulullah',
    title: "Iqra'",
    subtitle: 'Bacalah — dengan nama Tuhanmu',
    year: '610 M',
    yearNum: 610,
    description: 'Fokus QS Al-Alaq. Perintah pertama: bacalah.',
    story: '[Bab ini menunggu penulisan. Fokus: QS Al-Alaq 1-5, perintah membaca, makna Iqra\'.]',
    featured: false,
    characterIds: ['jibril-as'],
    locationId: 'gua-hira',
    references: ['QS Al-Alaq: 1-5'],
    order: 19,
  },
  {
    id: 'bab-20',
    journeyId: 'fase-3',
    collectionId: 'perjalanan-rasulullah',
    title: 'Kembali kepada Khadijah',
    subtitle: 'Bab emosional — orang pertama yang beriman',
    year: '610 M',
    yearNum: 610,
    description: 'Muhammad ﷺ pulang kepada Khadijah setelah wahyu. Bab emosional.',
    story: '[Bab ini menunggu penulisan. Fokus: Khadijah, orang pertama beriman, kasih sayang dan dukungan. Bab emosional.]',
    featured: false,
    characterIds: ['khadijah', 'waraqah'],
    locationId: 'makkah',
    references: [],
    order: 20,
  },

  // ═══════════════════════════════════════════════════
  // FASE 4 — DAKWAH DI MAKKAH
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-21',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Dakwah Rahasia',
    subtitle: 'Cahaya yang bersemi dalam diam',
    year: '610–613 M',
    yearNum: 610,
    description: 'Dakwah rahasia di tahun-tahun pertama kenabian.',
    story: '[Bab ini menunggu penulisan. Fokus: dakwah rahasia, kelompok pertama, sembunyi-sembunyi.]',
    featured: false,
    characterIds: [],
    locationId: 'makkah',
    references: [],
    order: 21,
  },
  {
    id: 'bab-22',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Orang-Orang Pertama yang Beriman',
    subtitle: 'Hati-hati yang pertama merespon cahaya',
    year: '610–613 M',
    yearNum: 610,
    description: 'Orang-orang pertama yang beriman: Khadijah, Abu Bakar, Ali, Zaid.',
    story: '[Bab ini menunggu penulisan. Fokus: Khadijah, Abu Bakar, Ali bin Abi Thalib, Zaid bin Haritsah.]',
    featured: false,
    characterIds: ['khadijah', 'abu-bakar', 'ali'],
    locationId: 'makkah',
    references: [],
    order: 22,
  },
  {
    id: 'bab-23',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Bukit Shafa',
    subtitle: 'Hari dakwah menjadi terang-terangan',
    year: '613 M',
    yearNum: 613,
    description: 'Dakwah terang-terangan di Bukit Shafa.',
    story: '[Bab ini menunggu penulisan. Fokus: dakwah terang-terangan, reaksi Quraisy, Bukit Shafa.]',
    featured: false,
    characterIds: [],
    locationId: 'bukit-shafa',
    references: [],
    order: 23,
  },
  {
    id: 'bab-24',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Bilal dan Panasnya Padang Pasir',
    subtitle: 'Siksaan yang tidak memadamkan iman',
    year: '614–615 M',
    yearNum: 614,
    description: 'Bilal bin Rabah dan penyiksaan sahabat di Makkah.',
    story: '[Bab ini menunggu penulisan. Fokus: Bilal, penyiksaan, keteguhan iman.]',
    featured: false,
    characterIds: ['bilal'],
    locationId: 'makkah',
    references: [],
    order: 24,
  },
  {
    id: 'bab-25',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Hijrah ke Habasyah',
    subtitle: 'Meninggalkan tanah air demi kebebasan beriman',
    year: '615 M',
    yearNum: 615,
    description: 'Hijrah pertama ke Habasyah (Ethiopia).',
    story: '[Bab ini menunggu penulisan. Fokus: hijrah ke Habasyah, Raja Najasyi, perlindungan.]',
    featured: false,
    characterIds: [],
    locationId: 'habasyah',
    references: [],
    order: 25,
  },
  {
    id: 'bab-26',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Boikot Quraisy',
    subtitle: 'Tiga tahun di lembah yang sepi',
    year: '616–619 M',
    yearNum: 616,
    description: 'Boikot Quraisy terhadap Bani Hasyim di Shi\'b Abi Thalib.',
    story: '[Bab ini menunggu penulisan. Fokus: boikot, Shi\'b Abi Thalib, kelaparan, kesabaran.]',
    featured: false,
    characterIds: ['abu-thalib'],
    locationId: 'makkah',
    references: [],
    order: 26,
  },
  {
    id: 'bab-27',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: 'Tahun Kesedihan',
    subtitle: 'Kehilangan dua pelindung',
    year: '619–620 M',
    yearNum: 619,
    description: 'Wafat Abu Thalib dan Khadijah. Tahun Kesedihan.',
    story: '[Bab ini menunggu penulisan. Fokus: wafat Abu Thalib, wafat Khadijah, Tahun Kesedihan.]',
    featured: false,
    characterIds: ['abu-thalib', 'khadijah'],
    locationId: 'makkah',
    references: [],
    order: 27,
  },
  {
    id: 'bab-28',
    journeyId: 'fase-4',
    collectionId: 'perjalanan-rasulullah',
    title: "Isra' Mi'raj",
    subtitle: 'Perjalanan yang melampaui akal manusia',
    year: '621 M',
    yearNum: 621,
    description: "Isra' Mi'raj — perjalanan malam dari Makkah ke Yerusalem ke Sidratul Muntaha.",
    story: '[Bab ini menunggu penulisan. Fokus: Isra\', Mi\'raj, Baitul Maqdis, Sidratul Muntaha, shalat lima waktu.]',
    featured: true,
    characterIds: ['jibril-as'],
    locationId: 'baitul-maqdis',
    references: ['QS Al-Isra\': 1', 'QS An-Najm: 1-18'],
    order: 28,
  },

  // ═══════════════════════════════════════════════════
  // FASE 5 — MENUJU MADINAH
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-29',
    journeyId: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Baiat Aqabah',
    subtitle: 'Janji di malam gelap yang mengubah arah sejarah',
    year: '621 M',
    yearNum: 621,
    description: 'Baiat Aqabah Pertama dan Kedua dengan penduduk Yatsrib.',
    story: '[Bab ini menunggu penulisan. Fokus: Baiat Aqabah, orang-orang Yatsrib, janji perlindungan.]',
    featured: false,
    characterIds: [],
    locationId: 'aqabah',
    references: [],
    order: 29,
  },
  {
    id: 'bab-30',
    journeyId: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Malam Hijrah',
    subtitle: 'Malam ketika Makkah kehilangan penghuninya',
    year: '622 M',
    yearNum: 622,
    description: 'Malam hijrah — meninggalkan Makkah.',
    story: '[Bab ini menunggu penulisan. Fokus: malam hijrah, Ali di tempat tidur, rencana Quraisy.]',
    featured: true,
    characterIds: ['abu-bakar', 'ali'],
    locationId: 'makkah',
    references: [],
    order: 30,
  },
  {
    id: 'bab-31',
    journeyId: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Gua Tsur',
    subtitle: 'Tiga hari bersembunyi sambil mempercayai Allah',
    year: '622 M',
    yearNum: 622,
    description: 'Gua Tsur — bersembunyi dari kejaran Quraisy.',
    story: '[Bab ini menunggu penulisan. Fokus: Gua Tsur, Abu Bakar, laba-laba dan merpati, tawakkal.]',
    featured: false,
    characterIds: ['abu-bakar'],
    locationId: 'gua-tsur',
    references: ['QS At-Taubah: 40'],
    order: 31,
  },
  {
    id: 'bab-32',
    journeyId: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Perjalanan ke Madinah',
    subtitle: 'Dari Makkah ke Yatsrib — kafilah yang dinantikan',
    year: '622 M',
    yearNum: 622,
    description: 'Perjalanan dari Gua Tsur menuju Madinah.',
    story: '[Bab ini menunggu penulisan. Fokus: perjalanan, Suraqah, Quba.]',
    featured: false,
    characterIds: ['abu-bakar'],
    locationId: 'quba',
    references: [],
    order: 32,
  },
  {
    id: 'bab-33',
    journeyId: 'fase-5',
    collectionId: 'perjalanan-rasulullah',
    title: 'Sambutan Penduduk Madinah',
    subtitle: 'Nyanyian anak-anak yang menyambut cahaya',
    year: '622 M',
    yearNum: 622,
    description: 'Sambutan penduduk Madinah terhadap Rasulullah ﷺ.',
    story: '[Bab ini menunggu penulisan. Fokus: sambutan, Tala\'a al-Badru \'Alaina, Yatsrib menjadi Madinah.]',
    featured: false,
    characterIds: [],
    locationId: 'madinah',
    references: [],
    order: 33,
  },

  // ═══════════════════════════════════════════════════
  // FASE 6 — MEMBANGUN PERADABAN
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-34',
    journeyId: 'fase-6',
    collectionId: 'perjalanan-rasulullah',
    title: 'Masjid Nabawi',
    subtitle: 'Rumah Allah yang menjadi pusat segalanya',
    year: '622 M',
    yearNum: 622,
    description: 'Pembangunan Masjid Nabawi — masjid pertama dalam Islam.',
    story: '[Bab ini menunggu penulisan. Fokus: pembangunan masjid, gotong royong, masjid sebagai pusat kehidupan.]',
    featured: false,
    characterIds: [],
    locationId: 'masjid-nabawi',
    references: [],
    order: 34,
  },
  {
    id: 'bab-35',
    journeyId: 'fase-6',
    collectionId: 'perjalanan-rasulullah',
    title: 'Persaudaraan Muhajirin dan Anshar',
    subtitle: 'Saudara bukan karena darah, tapi karena iman',
    year: '622 M',
    yearNum: 622,
    description: 'Persaudaraan antara Muhajirin dan Anshar.',
    story: '[Bab ini menunggu penulisan. Fokus: persaudaraan, Muhajirin, Anshar, berbagi harta dan rumah.]',
    featured: false,
    characterIds: [],
    locationId: 'madinah',
    references: [],
    order: 35,
  },
  {
    id: 'bab-36',
    journeyId: 'fase-6',
    collectionId: 'perjalanan-rasulullah',
    title: 'Piagam Madinah',
    subtitle: 'Konstitusi pertama yang menyatukan semua golongan',
    year: '622–624 M',
    yearNum: 622,
    description: 'Piagam Madinah — konstitusi yang menyatukan Muslim, Yahudi, dan suku-suku lain.',
    story: '[Bab ini menunggu penulisan. Fokus: Piagam Madinah, konstitusi, toleransi, hak dan kewajiban.]',
    featured: false,
    characterIds: [],
    locationId: 'madinah',
    references: [],
    order: 36,
  },

  // ═══════════════════════════════════════════════════
  // FASE 7 — UJIAN DAN KEMENANGAN
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-37',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Badar',
    subtitle: '313 melawan 1000 — pertolongan yang datang dari langit',
    year: '624 M',
    yearNum: 624,
    description: 'Perang Badar — pertempuran pertama umat Islam.',
    story: '[Bab ini menunggu penulisan. Fokus: Badar, 313 vs 1000, pertolongan Allah, QS Al-Anfal.]',
    featured: true,
    characterIds: ['abu-bakar', 'umar', 'ali'],
    locationId: 'badar',
    references: ['QS Al-Anfal: 9-12', 'QS Ali Imran: 123-126'],
    order: 37,
  },
  {
    id: 'bab-38',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Uhud',
    subtitle: 'Ketika kemenangan berbalik karena satu kesalahan',
    year: '625 M',
    yearNum: 625,
    description: 'Perang Uhud — ujian dan pelajaran.',
    story: '[Bab ini menunggu penulisan. Fokus: Uhud, pemanah yang meninggati posisi, gugurnya Hamzah, QS Ali Imran.]',
    featured: false,
    characterIds: ['hamzah'],
    locationId: 'uhud',
    references: ['QS Ali Imran: 152'],
    order: 38,
  },
  {
    id: 'bab-39',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Khandaq',
    subtitle: 'Parit yang memisahkan Makkah dan Madinah',
    year: '627 M',
    yearNum: 627,
    description: 'Perang Khandaq (Ahzab) — parit pertahanan Salman al-Farisi.',
    story: '[Bab ini menunggu penulisan. Fokus: Khandaq, parit, Salman al-Farisi, pengepungan, QS Al-Ahzab.]',
    featured: false,
    characterIds: [],
    locationId: 'madinah',
    references: ['QS Al-Ahzab: 9-20'],
    order: 39,
  },
  {
    id: 'bab-40',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Hudaibiyah',
    subtitle: 'Kekalahan yang ternyata kemenangan terbesar',
    year: '628 M',
    yearNum: 628,
    description: 'Perjanjian Hudaibiyah — kekalahan yang ternyata kemenangan.',
    story: '[Bab ini menunggu penulisan. Fokus: Hudaibiyah, perjanjian, QS Al-Fath: kemenangan yang nyata.]',
    featured: true,
    characterIds: ['abu-bakar', 'umar'],
    locationId: 'hudaibiyah',
    references: ['QS Al-Fath: 1-6'],
    order: 40,
  },
  {
    id: 'bab-41',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Khaibar',
    subtitle: 'Benteng yang runtuh satu per satu',
    year: '628 M',
    yearNum: 628,
    description: 'Penaklukan Khaibar.',
    story: '[Bab ini menunggu penulisan. Fokus: Khaibar, benteng-benteng, Ali dan gerbang Khaibar.]',
    featured: false,
    characterIds: ['ali'],
    locationId: 'khaibar',
    references: [],
    order: 41,
  },
  {
    id: 'bab-42',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Hunain',
    subtitle: 'Ketika jumlah besar tidak menjamin kemenangan',
    year: '630 M',
    yearNum: 630,
    description: 'Perang Hunain — ujian setelah Fathu Makkah.',
    story: '[Bab ini menunggu penulisan. Fokus: Hunain, pasukan besar, serangan mendadak, keteguhan Rasulullah ﷺ.]',
    featured: false,
    characterIds: [],
    locationId: 'hunain',
    references: ['QS At-Taubah: 25-26'],
    order: 42,
  },
  {
    id: 'bab-43',
    journeyId: 'fase-7',
    collectionId: 'perjalanan-rasulullah',
    title: 'Fathu Makkah',
    subtitle: 'Kembali ke kota kelahiran — bukan sebagai musuh, tapi sebagai pembebas',
    year: '630 M',
    yearNum: 630,
    description: 'Fathu Makkah — pembebasan Makkah.',
    story: '[Bab ini menunggu penulisan. Fokus: Fathu Makkah, 10.000 pasukan, pengampunan, Ka\'bah dibersihkan.]',
    featured: true,
    characterIds: ['abu-bakar', 'umar', 'ali', 'bilal'],
    locationId: 'makkah',
    references: [],
    order: 43,
  },

  // ═══════════════════════════════════════════════════
  // FASE 8 — PERPISAHAN
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-44',
    journeyId: 'fase-8',
    collectionId: 'perjalanan-rasulullah',
    title: "Haji Wada'",
    subtitle: 'Haji terakhir — wasiat untuk seluruh umat',
    year: '632 M',
    yearNum: 632,
    description: "Haji Wada' — haji perpisahan Rasulullah ﷺ.",
    story: '[Bab ini menunggu penulisan. Fokus: Haji Wada\', khutbah terakhir, wasiat untuk umat.]',
    featured: true,
    characterIds: [],
    locationId: 'makkah',
    references: [],
    order: 44,
  },
  {
    id: 'bab-45',
    journeyId: 'fase-8',
    collectionId: 'perjalanan-rasulullah',
    title: 'Wasiat Terakhir',
    subtitle: 'Pesanan yang tidak boleh dilupakan',
    year: '632 M',
    yearNum: 632,
    description: 'Wasiat terakhir Rasulullah ﷺ.',
    story: '[Bab ini menunggu penulisan. Fokus: wasiat terakhir, sakit, pesan-pesan penting.]',
    featured: false,
    characterIds: [],
    locationId: 'madinah',
    references: [],
    order: 45,
  },
  {
    id: 'bab-46',
    journeyId: 'fase-8',
    collectionId: 'perjalanan-rasulullah',
    title: 'Hari yang Membuat Madinah Menangis',
    subtitle: 'Wafat Rasulullah ﷺ',
    year: '632 M',
    yearNum: 632,
    description: 'Wafat Rasulullah ﷺ.',
    story: '[Bab ini menunggu penulisan. Fokus: wafat, suasana Madinah, Umar tidak percaya, Abu Bakar: "Barangsiapa menyembah Muhammad, maka Muhammad telah wafat..."]',
    featured: true,
    characterIds: ['abu-bakar', 'umar'],
    locationId: 'madinah',
    references: ['QS Ali Imran: 144'],
    order: 46,
  },

  // ═══════════════════════════════════════════════════
  // PENUTUP
  // ═══════════════════════════════════════════════════
  {
    id: 'bab-47',
    journeyId: 'penutup',
    collectionId: 'perjalanan-rasulullah',
    title: 'Jejak yang Tidak Pernah Padam',
    subtitle: 'Warisan Islam dan cahaya yang terus menyala',
    year: '632 M+',
    yearNum: 632,
    description: 'Warisan Islam, para sahabat melanjutkan perjuangan, Islam menyebar ke dunia.',
    story: '[Bab ini menunggu penulisan. Fokus: warisan Islam, para sahabat melanjutkan perjuangan, Islam menyebar ke dunia.]',
    featured: true,
    characterIds: ['abu-bakar', 'umar'],
    locationId: 'madinah',
    references: [],
    order: 47,
  },
];

// ── Characters ──────────────────────────────────────

export const characters: Character[] = [
  {
    id: 'muhammad-saw',
    name: 'Muhammad ﷺ',
    title: 'Nabi dan Rasul Terakhir',
    shortBio: 'Nabi Muhammad ﷺ — rasul terakhir yang diutus kepada seluruh umat manusia.',
    fullBio: 'Nabi Muhammad ﷺ lahir di Makkah tahun 570 M, diangkat menjadi rasul pada usia 40 tahun, hijrah ke Madinah tahun 622 M, dan wafat tahun 632 M. Beliau adalah penutup para nabi dan rasul.',
    role: 'Nabi & Rasul',
    period: '570–632 M',
    eventIds: ['bab-6', 'bab-7', 'bab-12', 'bab-13', 'bab-14', 'bab-15', 'bab-17', 'bab-18', 'bab-21', 'bab-23', 'bab-28', 'bab-29', 'bab-30', 'bab-32', 'bab-33', 'bab-34', 'bab-35', 'bab-37', 'bab-38', 'bab-39', 'bab-40', 'bab-41', 'bab-42', 'bab-43', 'bab-44', 'bab-45', 'bab-46'],
    references: [],
  },
  {
    id: 'khadijah',
    name: 'Khadijah binti Khuwailid',
    title: 'Istri pertama Rasulullah ﷺ',
    shortBio: 'Orang pertama yang beriman. Istri yang mendukung saat semua meninggalkan.',
    fullBio: 'Khadijah binti Khuwailid r.a. adalah istri pertama Rasulullah ﷺ dan orang pertama yang beriman kepada risalah Islam. Beliau mendukung Rasulullah ﷺ dengan seluruh jiwa dan hartanya.',
    role: 'Istri Rasulullah ﷺ',
    period: '555–619 M',
    eventIds: ['bab-15', 'bab-20', 'bab-22', 'bab-27'],
    references: [],
  },
  {
    id: 'abu-bakar',
    name: 'Abu Bakar as-Siddiq',
    title: 'Khalifah pertama',
    shortBio: 'Sahabat terdekat. Orang pertama di luar keluarga yang beriman.',
    fullBio: 'Abu Bakar as-Siddiq r.a. adalah sahabat terdekat Rasulullah ﷺ, orang pertama di luar keluarga yang beriman, dan khalifah pertama setelah wafatnya Rasulullah ﷺ.',
    role: 'Sahabat Terdekat',
    period: '573–634 M',
    eventIds: ['bab-22', 'bab-30', 'bab-31', 'bab-32', 'bab-37', 'bab-40', 'bab-43', 'bab-46', 'bab-47'],
    references: [],
  },
  {
    id: 'umar',
    name: 'Umar bin Khattab',
    title: 'Khalifah kedua',
    shortBio: 'Dari penganiaya Islam menjadi pembela terkuatnya.',
    fullBio: 'Umar bin Khattab r.a. adalah khalifah kedua yang dikenal dengan keadilannya. Masuk Islam setelah sebelumnya menjadi musuh, dan menjadi salah satu pilar terkuat umat Islam.',
    role: 'Khalifah',
    period: '584–644 M',
    eventIds: ['bab-37', 'bab-40', 'bab-46', 'bab-47'],
    references: [],
  },
  {
    id: 'ali',
    name: 'Ali bin Abi Thalib',
    title: 'Khalifah keempat',
    shortBio: 'Sepupu dan menantu Rasulullah ﷺ. Pahlawan Khaibar.',
    fullBio: 'Ali bin Abi Thalib r.a. adalah sepupu dan menantu Rasulullah ﷺ. Beliau tinggal di rumah Rasulullah ﷺ sejak kecil dan termasuk orang-orang pertama yang beriman.',
    role: 'Sahabat',
    period: '600–661 M',
    eventIds: ['bab-11', 'bab-22', 'bab-30', 'bab-37', 'bab-41', 'bab-43'],
    references: [],
  },
  {
    id: 'abu-thalib',
    name: 'Abu Thalib',
    title: 'Paman Rasulullah ﷺ',
    shortBio: 'Pelindung yang tidak pernah berhenti membela meski tidak beriman.',
    fullBio: 'Abu Thalib adalah paman Rasulullah ﷺ yang mengasuh dan melindungi beliau sejak kecil hingga akhir hayatnya.',
    role: 'Paman',
    period: '~540–619 M',
    eventIds: ['bab-11', 'bab-13', 'bab-26', 'bab-27'],
    references: [],
  },
  {
    id: 'abdul-muthalib',
    name: 'Abdul Muthalib',
    title: 'Kakek Rasulullah ﷺ',
    shortBio: 'Pemimpin Quraisy yang menyayangi cucunya lebih dari anaknya sendiri.',
    fullBio: 'Abdul Muthalib adalah kakek Rasulullah ﷺ dan pemimpin Quraisy. Beliau mengasuh Muhammad ﷺ setelah wafatnya Aminah.',
    role: 'Kakek',
    period: '~497–578 M',
    eventIds: ['bab-6', 'bab-10'],
    references: [],
  },
  {
    id: 'aminah',
    name: 'Aminah binti Wahb',
    title: 'Ibu Rasulullah ﷺ',
    shortBio: 'Ibu yang wafat saat anaknya masih kecil, meninggalkan jejak cinta yang abadi.',
    fullBio: 'Aminah binti Wahb adalah ibu Rasulullah ﷺ. Beliau wafat saat Muhammad ﷺ berusia sekitar 6 tahun dalam perjalanan dari Madinah ke Makkah.',
    role: 'Ibu',
    period: '~540–576 M',
    eventIds: ['bab-6', 'bab-9'],
    references: [],
  },
  {
    id: 'halimah',
    name: 'Halimah as-Sa\'diyah',
    title: 'Ibu angkat Rasulullah ﷺ',
    shortBio: 'Wanita dari padang pasir yang menyusui dan membesarkan Muhammad ﷺ.',
    fullBio: 'Halimah as-Sa\'diyah adalah ibu angkat yang menyusui dan membesarkan Muhammad ﷺ di padang Bani Sa\'ad.',
    role: 'Ibu Angkat',
    period: '~540–? M',
    eventIds: ['bab-7', 'bab-8'],
    references: [],
  },
  {
    id: 'bilal',
    name: 'Bilal bin Rabah',
    title: 'Muadzin Rasulullah ﷺ',
    shortBio: 'Budak yang disiksa karena imannya, lalu menjadi suara pertama adzan.',
    fullBio: 'Bilal bin Rabah r.a. adalah budak yang disiksa oleh majikannya karena memeluk Islam. Abu Bakar membebaskannya, dan ia menjadi muadzin pertama dalam Islam.',
    role: 'Muadzin',
    period: '~580–640 M',
    eventIds: ['bab-24', 'bab-43'],
    references: [],
  },
  {
    id: 'hamzah',
    name: 'Hamzah bin Abdul Muthalib',
    title: 'Paman dan Syahid Utama',
    shortBio: 'Singa Allah dan Rasul-Nya. Paman yang dibunuh di Uhud.',
    fullBio: 'Hamzah bin Abdul Muthalib r.a. adalah paman Rasulullah ﷺ yang gugur sebagai syahid dalam Perang Uhud.',
    role: 'Paman',
    period: '~568–625 M',
    eventIds: ['bab-38'],
    references: [],
  },
  {
    id: 'abrahah',
    name: 'Abrahah',
    title: 'Penguasa Yaman',
    shortBio: 'Raja yang memimpin pasukan gajah untuk menghancurkan Ka\'bah.',
    fullBio: 'Abrahah al-Asyram adalah penguasa Yaman yang memimpin pasukan gajah untuk menghancurkan Ka\'bah pada Tahun Gajah (570 M).',
    role: 'Tokoh Sejarah',
    period: '~wafat 570 M',
    eventIds: ['bab-5'],
    references: [],
  },
  {
    id: 'ibrahim-as',
    name: 'Nabi Ibrahim a.s.',
    title: 'Khalilullah — Kekasih Allah',
    shortBio: 'Bapak para nabi yang membangun Ka\'bah bersama Nabi Ismail a.s.',
    fullBio: 'Nabi Ibrahim a.s. adalah bapak para nabi yang membangun Ka\'bah bersama putranya Nabi Ismail a.s.',
    role: 'Nabi',
    period: '~2000 SM',
    eventIds: ['bab-3'],
    references: [],
  },
  {
    id: 'ismail-as',
    name: 'Nabi Ismail a.s.',
    title: 'Putra Ibrahim yang ditebus',
    shortBio: 'Nabi yang bersama ayahnya membangun Ka\'bah di Makkah.',
    fullBio: 'Nabi Ismail a.s. adalah putra Nabi Ibrahim a.s. yang bersama ayahnya membangun Ka\'bah di Makkah.',
    role: 'Nabi',
    period: '~2000 SM',
    eventIds: ['bab-3'],
    references: [],
  },
  {
    id: 'jibril-as',
    name: 'Malaikat Jibril a.s.',
    title: 'Pembawa Wahyu',
    shortBio: 'Malaikat yang menyampaikan wahyu Allah kepada para nabi dan rasul.',
    fullBio: 'Malaikat Jibril a.s. adalah malaikat yang ditugasi menyampaikan wahyu Allah kepada para nabi dan rasul, termasuk Nabi Muhammad ﷺ.',
    role: 'Malaikat',
    period: 'Seluruh zaman',
    eventIds: ['bab-18', 'bab-19', 'bab-28'],
    references: [],
  },
  {
    id: 'bahira',
    name: 'Bahira',
    title: 'Pendeta Kristen',
    shortBio: 'Pendeta di Busra, Syam yang mengenali tanda kenabian pada Muhammad ﷺ.',
    fullBio: 'Bahira adalah pendeta Kristen di Busra, Syam yang mengenali tanda-tanda kenabian pada Muhammad ﷺ ketika beliau masih kecil dalam kafilah Abu Thalib.',
    role: 'Tokoh Sejarah',
    period: '~583 M',
    eventIds: ['bab-13'],
    references: [],
  },
  {
    id: 'waraqah',
    name: 'Waraqah bin Naufal',
    title: 'Sepupu Khadijah',
    shortBio: 'Orang yang mengenali wahyu pertama sebagai Namus yang sama dengan Musa a.s.',
    fullBio: 'Waraqah bin Naufal adalah sepupu Khadijah yang mengenali wahyu pertama yang diterima Rasulullah ﷺ.',
    role: 'Tokoh Sejarah',
    period: '~wafat 610 M',
    eventIds: ['bab-20'],
    references: [],
  },
];

// ── Locations ───────────────────────────────────────

export const locations: StoryLocation[] = [
  {
    id: 'jazirah-arab',
    name: 'Jazirah Arab',
    description: 'Hamparan gurun luas di mana Islam lahir dan berkembang.',
    fullDescription: 'Jazirah Arab adalah semenanjung di Asia Barat Daya yang menjadi tempat lahirnya Islam. Terdiri dari gurun pasir yang luas, pegunungan, dan oasis.',
    coordinates: '23.5°N 45.0°E',
    eventIds: ['bab-1'],
    significance: 'Tempat lahirnya Islam',
  },
  {
    id: 'makkah',
    name: 'Makkah',
    description: 'Kota suci tempat Ka\'bah berdiri dan Rasulullah ﷺ lahir.',
    fullDescription: 'Makkah adalah kota suci umat Islam, tempat Ka\'bah berdiri, dan tempat kelahiran Rasulullah ﷺ. Terletak di lembah gersang yang menjadi pusat spiritual dan perdagangan Jazirah Arab.',
    coordinates: '21.4225°N 39.8262°E',
    eventIds: ['bab-2', 'bab-4', 'bab-6', 'bab-10', 'bab-11', 'bab-12', 'bab-14', 'bab-15', 'bab-20', 'bab-21', 'bab-22', 'bab-24', 'bab-26', 'bab-27', 'bab-30', 'bab-43', 'bab-44'],
    significance: 'Kota Suci Islam',
  },
  {
    id: 'kabah',
    name: 'Ka\'bah',
    description: 'Rumah Allah yang pertama kali dibangun di muka bumi.',
    fullDescription: 'Ka\'bah adalah bangunan kubus di tengah Masjidil Haram di Makkah. Menurut tradisi Islam, Ka\'bah pertama kali dibangun oleh Nabi Ibrahim a.s. dan Nabi Ismail a.s.',
    coordinates: '21.4225°N 39.8262°E',
    eventIds: ['bab-3', 'bab-16'],
    significance: 'Kiblat umat Islam',
  },
  {
    id: 'padang-bani-saad',
    name: 'Padang Bani Sa\'ad',
    description: 'Dataran di luar Makkah tempat Halimah membesarkan Muhammad ﷺ.',
    fullDescription: 'Padang Bani Sa\'ad adalah dataran di luar Makkah di mana Muhammad ﷺ disusukan dan dibesarkan oleh Halimah as-Sa\'diyah.',
    coordinates: '~Makkah',
    eventIds: ['bab-7', 'bab-8'],
    significance: 'Tempat masa balita Rasulullah ﷺ',
  },
  {
    id: 'abwa',
    name: 'Abwa\'',
    description: 'Desa di jalur Makkah-Madinah tempat Aminah wafat.',
    fullDescription: 'Abwa\' adalah desa di antara Makkah dan Madinah tempat Aminah binti Wahb, ibu Rasulullah ﷺ, wafat saat Muhammad ﷺ masih kecil.',
    coordinates: '~23.5°N 39.5°E',
    eventIds: ['bab-9'],
    significance: 'Tempat wafat Aminah',
  },
  {
    id: 'syam',
    name: 'Syam',
    description: 'Wilayah utara Jazirah Arab (kini Suriah, Yordania, Palestina, Lebanon).',
    fullDescription: 'Syam adalah wilayah di utara Jazirah Arab yang mencakup Suriah, Yordania, Palestina, dan Lebanon modern. Jalur perdagangan penting dan tempat pertemuan Muhammad ﷺ dengan Bahira.',
    coordinates: '33.5°N 36.3°E',
    eventIds: ['bab-13'],
    significance: 'Jalur perdagangan kuno',
  },
  {
    id: 'gua-hira',
    name: 'Gua Hira',
    description: 'Gua di Jabal Nur tempat wahyu pertama turun.',
    fullDescription: 'Gua Hira adalah gua di Jabal Nur (Bukit Cahaya) di dekat Makkah tempat Rasulullah ﷺ menyepi dan menerima wahyu pertama.',
    coordinates: '21.4575°N 39.8583°E',
    eventIds: ['bab-17', 'bab-18', 'bab-19'],
    significance: 'Tempat wahyu pertama',
  },
  {
    id: 'bukit-shafa',
    name: 'Bukit Shafa',
    description: 'Bukit di Makkah tempat dakwah terang-terangan pertama.',
    fullDescription: 'Bukit Shafa adalah bukit kecil di Makkah tempat Rasulullah ﷺ menyampaikan dakwah terang-terangan kepada penduduk Makkah.',
    coordinates: '21.4225°N 39.8262°E',
    eventIds: ['bab-23'],
    significance: 'Tempat dakwah terang-terangan',
  },
  {
    id: 'habasyah',
    name: 'Habasyah',
    description: 'Kerajaan di Afrika Timur (kini Ethiopia) yang memberikan suaka kepada Muslim.',
    fullDescription: 'Habasyah (Ethiopia) adalah kerajaan Kristen di Afrika Timur yang memberikan perlindungan kepada kaum Muslimin yang hijrah dari penyiksaan Quraisy.',
    coordinates: '9.0°N 38.7°E',
    eventIds: ['bab-25'],
    significance: 'Tempat suaka pertama umat Islam',
  },
  {
    id: 'baitul-maqdis',
    name: 'Baitul Maqdis',
    description: 'Al-Aqsa — tujuan Isra\' dan titik awal Mi\'raj.',
    fullDescription: 'Baitul Maqdis (Yerusalem) adalah tempat tujuan perjalanan Isra\' dan titik awal Mi\'raj Rasulullah ﷺ.',
    coordinates: '31.7780°N 35.2354°E',
    eventIds: ['bab-28'],
    significance: 'Tujuan Isra\' dan awal Mi\'raj',
  },
  {
    id: 'aqabah',
    name: 'Aqabah',
    description: 'Tempat baiat antara Rasulullah ﷺ dan penduduk Yatsrib.',
    fullDescription: 'Aqabah adalah tempat di luar Makkah di mana penduduk Yatsrib (Madinah) berbaiat kepada Rasulullah ﷺ.',
    coordinates: '~Mina',
    eventIds: ['bab-29'],
    significance: 'Tempat Baiat Aqabah',
  },
  {
    id: 'gua-tsur',
    name: 'Gua Tsur',
    description: 'Gua tempat Rasulullah ﷺ dan Abu Bakar bersembunyi saat hijrah.',
    fullDescription: 'Gua Tsur adalah gua di selatan Makkah tempat Rasulullah ﷺ dan Abu Bakar as-Siddiq bersembunyi selama tiga hari dari kejaran Quraisy saat hijrah.',
    coordinates: '21.35°N 39.85°E',
    eventIds: ['bab-31'],
    significance: 'Tempat persembunyian saat hijrah',
  },
  {
    id: 'quba',
    name: 'Quba',
    description: 'Masjid pertama dalam Islam, tempat singgah sebelum Madinah.',
    fullDescription: 'Quba adalah desa di pinggiran Madinah tempat Rasulullah ﷺ singgah dan membangun masjid pertama dalam Islam.',
    coordinates: '24.4367°N 39.6175°E',
    eventIds: ['bab-32'],
    significance: 'Masjid pertama dalam Islam',
  },
  {
    id: 'madinah',
    name: 'Madinah',
    description: 'Kota suci kedua Islam, tempat hijrah dan peradaban Islam dibangun.',
    fullDescription: 'Madinah (dahulu Yatsrib) adalah kota tempat Rasulullah ﷺ berhijrah dan membangun peradaban Islam. Di sinilah Masjid Nabawi dibangun dan Piagam Madinah disusun.',
    coordinates: '24.4672°N 39.6024°E',
    eventIds: ['bab-33', 'bab-34', 'bab-35', 'bab-36', 'bab-39', 'bab-45', 'bab-46', 'bab-47'],
    significance: 'Kota suci kedua Islam',
  },
  {
    id: 'masjid-nabawi',
    name: 'Masjid Nabawi',
    description: 'Masjid Rasulullah ﷺ — pusat kehidupan Madinah.',
    fullDescription: 'Masjid Nabawi adalah masjid yang dibangun oleh Rasulullah ﷺ setelah hijrah ke Madinah. Menjadi pusat ibadah, pendidikan, dan pemerintahan.',
    coordinates: '24.4672°N 39.6141°E',
    eventIds: ['bab-34'],
    significance: 'Masjid Rasulullah ﷺ',
  },
  {
    id: 'badar',
    name: 'Badar',
    description: 'Tempat pertempuran pertama umat Islam — 313 melawan 1000.',
    fullDescription: 'Badar adalah lokasi pertempuran pertama umat Islam pada 17 Ramadhan 2 H / 624 M, di mana 313 Muslim mengalahkan 1000 pasukan Quraisy.',
    coordinates: '23.78°N 38.79°E',
    eventIds: ['bab-37'],
    significance: 'Pertempuran pertama umat Islam',
  },
  {
    id: 'uhud',
    name: 'Uhud',
    description: 'Gunung di Madinah tempat pertempuran kedua umat Islam.',
    fullDescription: 'Uhud adalah gunung di sebelah utara Madinah tempat terjadinya Perang Uhud pada 3 H / 625 M.',
    coordinates: '24.52°N 39.61°E',
    eventIds: ['bab-38'],
    significance: 'Tempat Perang Uhud',
  },
  {
    id: 'hudaibiyah',
    name: 'Hudaibiyah',
    description: 'Tempat perjanjian damai yang menjadi kemenangan terbesar.',
    fullDescription: 'Hudaibiyah adalah tempat di luar Makkah di mana Perjanjian Hudaibiyah ditandatangani antara Muslim dan Quraisy pada 6 H / 628 M.',
    coordinates: '~21.4°N 39.7°E',
    eventIds: ['bab-40'],
    significance: 'Tempat Perjanjian Hudaibiyah',
  },
  {
    id: 'khaibar',
    name: 'Khaibar',
    description: 'Oasis di utara Madinah dengan benteng-benteng yang tak tertembus.',
    fullDescription: 'Khaibar adalah oasis di utara Madinah yang memiliki benteng-benteng pertahanan. Ditaklukkan oleh Muslim pada 7 H / 628 M.',
    coordinates: '25.87°N 39.22°E',
    eventIds: ['bab-41'],
    significance: 'Tempat penaklukan Khaibar',
  },
  {
    id: 'hunain',
    name: 'Hunain',
    description: 'Lembah di jalur Makkah-Thaif tempat pertempuran setelah Fathu Makkah.',
    fullDescription: 'Hunain adalah lembah di jalur antara Makkah dan Thaif tempat terjadinya Perang Hunain pada 8 H / 630 M.',
    coordinates: '~21.3°N 40.2°E',
    eventIds: ['bab-42'],
    significance: 'Tempat Perang Hunain',
  },
];

// ── Helper Functions ────────────────────────────────

export function getActiveCollection(): Collection | undefined {
  return collections.find((c) => c.status === 'active');
}

export function getJourneysByCollection(collectionId: string): Journey[] {
  return journeys
    .filter((j) => j.collectionId === collectionId)
    .sort((a, b) => a.order - b.order);
}

export function getEventsByJourney(journeyId: string): StoryEvent[] {
  return events
    .filter((e) => e.journeyId === journeyId)
    .sort((a, b) => a.order - b.order);
}

export function getEventById(eventId: string): StoryEvent | undefined {
  return events.find((e) => e.id === eventId);
}

export function getCharactersByEvent(eventId: string): Character[] {
  const event = events.find((e) => e.id === eventId);
  if (!event) return [];
  return characters.filter((c) => event.characterIds.includes(c.id));
}

export function getLocationById(locationId: string): StoryLocation | undefined {
  return locations.find((l) => l.id === locationId);
}
