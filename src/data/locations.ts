export interface Location {
  id: string;
  name: string;
  description: string;
  fullDescription: string;
  coordinates: string;
  eventIds: string[];
  significance: string;
}

export const locations: Location[] = [
  {
    id: "makkah",
    name: "Makkah",
    description: "Kota kelahiran Rasulullah ﷺ dan pusat dakwah Islam pertama.",
    fullDescription: `Makkah adalah kota paling suci dalam Islam, tempat Ka'bah berdiri sebagai kiblat seluruh Muslim. Kota ini terletak di lembah gurun yang dikelilingi oleh pegunungan hitam, dengan sumber air Zamzam yang telah mengalir sejak zaman Nabi Ibrahim.

Sebelum Islam, Makkah adalah pusat perdagangan dan keagamaan di Jazirah Arab. Ka'bah yang dibangun oleh Ibrahim dan Ismail telah menjadi tempat ziarah selama berabad-abad, meski saat itu dipenuhi oleh 360 berhala. Makkah juga menjadi tempat kelahiran Rasulullah ﷺ, tempat ia menerima wahyu pertama, dan tempat dakwah Islam dimulai.

Setelah hijrah ke Madinah, Makkah tetap menjadi fokus perjuangan Muslim. Perjanjian Hudaibiyah membuka jalan bagi Fathu Makkah pada tahun 630 M, ketika Rasulullah ﷺ memasuki kota ini tanpa pertumpahan darah dan membersihkan Ka'bah dari berhala. Kini Makkah menjadi tujuan jutaan Muslim setiap tahunnya untuk melaksanakan haji dan umrah.`,
    coordinates: "21.4225° N, 39.8262° E",
    eventIds: ["kelahiran", "penyusuan-bani-saad", "pernikahan-khadijah", "dakwah-terang", "fathu-makkah"],
    significance: "Kota Suci, Tempat Kelahiran Rasulullah ﷺ, Kiblat Umat Islam",
  },
  {
    id: "madinah",
    name: "Madinah",
    description: "Kota suci kedua Islam, tempat hijrah dan pembangunan masyarakat Islam pertama.",
    fullDescription: `Madinah, yang dahulu bernama Yatsrib, adalah kota yang menerima Rasulullah ﷺ dan para Muhajirin dengan tangan terbuka. Kota ini menjadi markas besar Islam selama sisa kehidupan Rasulullah ﷺ dan awal masa khilafah.

Sebelum Islam, Yatsrib adalah kota yang terpecah oleh perselisihan antara suku Aus dan Khazraj. Kedatangan Rasulullah ﷺ menyatukan kedua suku itu dan membangun masyarakat yang adil melalui Piagam Madinah — konstitusi tertulis pertama dalam sejarah yang mengatur hubungan antar komunitas berbeda agama dan suku.

Di Madinah, Masjid Nabawi dibangun — masjid pertama yang menjadi pusat ibadah, pendidikan, dan pemerintahan. Pasar Madinah berkembang, pertahanan kota diperkuat, dan hubungan diplomatif dengan kerajaan-kerajaan sekitar dijalin. Madinah menjadi bukti bahwa Islam mampu membangun peradaban yang adil dan sejahtera.`,
    coordinates: "24.4672° N, 39.6024° E",
    eventIds: ["hijrah"],
    significance: "Kota Suci Kedua Islam, Tempat Hijrah, Pusat Pemerintahan Islam Pertama",
  },
  {
    id: "gua-hira",
    name: "Gua Hira",
    description: "Gua di puncak Jabal Nur tempat Rasulullah ﷺ menerima wahyu pertama.",
    fullDescription: `Gua Hira terletak di puncak Jabal Nur (Gunung Cahaya), sekitar 3 kilometer dari Makkah. Gua ini sempit — hanya cukup untuk beberapa orang — dan menghadap ke arah Ka'bah. Di sinilah Muhammad ﷺ menyendiri untuk bertafakkur setiap bulan Ramadan sebelum menerima wahyu.

Pada tanggal 17 Ramadan tahun ke-40 dari usianya, Malaikat Jibril datang ke gua ini dan menyampaikan lima ayat pertama surah Al-'Alaq: "Iqra' bismi Rabbikalladzi khalaq..." — Bacalah dengan nama Tuhanmu yang menciptakan. Momen itu menandai dimulainya misi kenabian dan turunnya Al-Qur'an.

Gua Hira kini menjadi tempat ziarah yang banyak dikunjungi. Pendakian menuju gua memakan waktu sekitar 1-2 jam, dan dari puncaknya, pemandangan Makkah terbentang — pengingat bahwa dari tempat yang kecil dan tersembunyi ini, cahaya yang menerangi seluruh dunia bermula.`,
    coordinates: "21.4575° N, 39.8625° E",
    eventIds: ["wahyu-pertama"],
    significance: "Tempat Wahyu Pertama, Awal Kenabian",
  },
  {
    id: "gua-tsur",
    name: "Gua Tsur",
    description: "Gua tempat Rasulullah ﷺ dan Abu Bakar bersembunyi saat hijrah dari Makkah.",
    fullDescription: `Gua Tsur terletak di Jabal Tsur, sebelah selatan Makkah, berbeda dengan Gua Hira yang berada di sebelah utara. Gua ini menjadi tempat persembunyian Rasulullah ﷺ dan Abu Bakar as-Siddiq selama tiga hari saat berhijrah dari Makkah ke Madinah pada tahun 622 M.

Ketika Quraisy mengejar mereka, Muhammad dan Abu Bakar masuk ke gua ini. Abu Bakar masuk lebih dulu untuk memastikan tidak ada bahaya — ular, kalajengking, atau celah berbahaya. Ia menutupi celah-celah dengan potongan pakaiannya hingga hanya tersisa satu celah yang ia tutup dengan kakinya.

Ketika pencari hadiah berdiri tepat di depan gua, Abu Bakar merasa cemas. Namun Muhammad ﷺ berkata dengan tenang: "Jangan takut. Allah bersama kita." Laba-laba merajut sarang di mulut gua, burung bertelur di depannya, dan pencari itu melewatinya dengan kesimpulan bahwa tidak mungkin ada orang di dalam gua yang tertutup sarang laba-laba.

Ayat Al-Qur'an turun menggambarkan momen ini: "Jika kalian tidak menolongnya (Muhammad), maka ketahuilah bahwa Allah telah menolongnya, yaitu ketika orang-orang kafir mengusirnya, sedang dia salah seorang dari dua orang ketika keduanya berada dalam gua, di waktu ia berkata kepada sahabatnya, 'Janganlah kamu berduka cita, sesungguhnya Allah bersama kita.'" — QS. At-Taubah: 40`,
    coordinates: "21.3667° N, 39.8167° E",
    eventIds: ["hijrah"],
    significance: "Tempat Persembunyian Saat Hijrah, Bukti Pertolongan Allah",
  },
  {
    id: "badar",
    name: "Badar",
    description: "Padang tempat pertempuran pertama dan kemenangan terbesar umat Islam atas Quraisy.",
    fullDescription: `Badar adalah sebuah lembah yang terletak sekitar 150 kilometer barat daya Madinah, di jalur kafilah dagang dari Syam ke Makkah. Lembah ini memiliki sejumlah sumur yang menjadi titik strategis bagi kafilah yang melintas.

Pada tanggal 17 Ramadan tahun ke-2 Hijriah (624 M), padang Badar menjadi saksi pertempuran paling menentukan dalam sejarah awal Islam. Tiga ratus tiga belas Muslim menghadapi seribu pasukan Quraisy dan memenangkan pertempuran itu dengan pertolongan Allah — sebagaimana dijanjikan dalam Al-Qur'an.

Kemenangan Badar bukan sekadar kemenangan militer. Ia membuktikan bahwa kaum Muslimin yang sedikit dan minim persenjataan mampu mengalahkan pasukan yang jauh lebih besar, dengan syarat iman, persiapan, dan tawakkal kepada Allah. Badar menjadi simbol bahwa kebenaran tidak perlu menunggu mayoritas untuk menang.`,
    coordinates: "23.7778° N, 38.7833° E",
    eventIds: ["perang-badar"],
    significance: "Tempat Pertempuran Badar, Kemenangan Pertama Umat Islam",
  },
  {
    id: "uhud",
    name: "Uhud",
    description: "Gunung tempat pertempuran kedua antara Muslim dan Quraisy — ujian kepatuhan dan keimanan.",
    fullDescription: `Uhud adalah gunung yang terletak sekitar 5 kilometer di sebelah utara Madinah. Pada tahun ke-3 Hijriah (625 M), gunung ini menjadi latar belakang Pertempuran Uhud — pertempuran kedua antara Muslim dan Quraisy.

Setelah kekalahan di Badar, Quraisy mempersiapkan balas dendam dengan pasukan tiga ribu orang. Rasulullah ﷺ dan para sahabat bertahan di Madinah, namun akhirnya memutuskan untuk maju setelah banyak pemuda yang bersemangat meminta untuk berperang di luar kota.

Rasulullah ﷺ menempatkan 50 pemanah di bukit kecil di belakang pasukan, dengan perintah tegas: "Jangan meninggalkan posisi kalian, baik kami menang maupun kalah." Pertempuran berjalan menguntungkan Muslim hingga para pemanah melihat ghanimah (harta rampasan) dan meninggalkan posisi mereka. Khlid bin Walid — yang saat itu belum memeluk Islam — mengeksploitasi celah itu dan menyerang dari belakang.

Uhud adalah ujian kepatuhan. Kemenangan awal berubah menjadi kekalahan sementara, dan Hamzah bin Abdul Muthalib gugur sebagai syahid. Namun dari Uhud, Muslim belajar bahwa ketaatan kepada pemimpin dan disiplin dalam perintah adalah kunci kemenangan — dan bahwa kekalahan bisa datang dari keserakahan sekecil apapun.`,
    coordinates: "24.5133° N, 39.6167° E",
    eventIds: [],
    significance: "Tempat Pertempuran Uhud, Ujian Kepatuhan dan Keimanan",
  },
  {
    id: "hudaibiyah",
    name: "Hudaibiyah",
    description: "Tempat disepakatinya perjanjian damai yang menjadi pintu kemenangan terbesar.",
    fullDescription: `Hudaibiyah adalah sebuah padang di perbatasan tanah suci Makkah, sekitar 20 kilometer dari kota. Di sinilah pada tahun ke-6 Hijriah (628 M), Rasulullah ﷺ dan seribu empat ratus sahabat terhalang oleh Quraisy dari melaksanakan umrah, yang kemudian berujung pada perjanjian damai yang terkenal.

Perjanjian Hudaibiyah tampak merugikan pihak Muslim — mereka harus pulang tanpa melaksanakan umrah, barangsiapa dari Makkah yang berhijrah ke Madinah harus dikembalikan, dan gencatan senjata hanya berlaku 10 tahun. Namun Al-Qur'an menyebutnya "Fathun Mubin" — Kemenangan yang Nyata.

Dalam dua tahun setelah perjanjian itu, lebih banyak orang memeluk Islam daripada dalam 20 tahun sebelumnya. Perdamaian membuka ruang bagi dakwah tanpa gangguan, dan ketika Quraisy melanggar perjanjian itu, Fathu Makkah menjadi konsekuensi logis. Hudaibiyah mengajarkan bahwa kadang, kemenangan sejati terletak di balik kesabaran dan strategi, bukan di medan perang.`,
    coordinates: "21.4167° N, 39.6833° E",
    eventIds: ["hudaibiyah"],
    significance: "Tempat Perjanjian Hudaibiyah, Pintu Kemenangan",
  },
  {
    id: "syam",
    name: "Syam",
    description: "Wilayah utara Jazirah Arab tempat Muhammad muda memimpin kafilah dagang Khadijah.",
    fullDescription: `Syam (kini meliputi Suriah, Yordania, Lebanon, dan Palestina) adalah tujuan utama kafilah dagang dari Makkah. Wilayah ini merupakan penghubung perdagangan antara Jazirah Arab dan Kekaisaran Romawi, dengan kota-kota besar seperti Busra, Damaskus, dan Gaza.

Dalam sejarah Sirah, Syam dikenal sebagai tempat Muhammad muda memimpin kafilah dagang Khadijah pada usia 25 tahun. Di Busra, seorang rahib Kristen bernama Bahira mengenali tanda-tanda kenabian pada diri Muhammad, berdasarkan pengetahuan dari kitab-kitab terdahulu. Perjalanan ini juga menjadi awal dari hubungan antara Muhammad dan Khadijah yang kemudian berujung pada pernikahan mereka.

Syam juga menjadi saksi perjalanan Isra' — ketika Rasulullah ﷺ diberangkatkan dari Masjidil Haram ke Masjidil Aqsa di Baitul Maqdis (Yerusalem), yang termasuk dalam wilayah Syam, sebelum naik ke langit dalam peristiwa Mi'raj.`,
    coordinates: "Wilayah luas: 33–37° N, 35–40° E",
    eventIds: ["perniagaan-khadijah", "isra-miraj"],
    significance: "Tujuan Kafilah Dagang, Tempat Pengakuan Bahira",
  },
  {
    id: "baitul-maqdis",
    name: "Baitul Maqdis",
    description: "Masjidil Aqsa di Yerusalem — titik awal perjalanan Mi'raj dan kiblat pertama umat Islam.",
    fullDescription: `Baitul Maqdis, dengan Masjidil Aqsa sebagai landmark utamanya, adalah tempat tersuci ketiga dalam Islam. Terletak di Yerusalem, kompleks ini menjadi titik awal perjalanan Mi'raj — ketika Rasulullah ﷺ diberangkatkan dari sini menuju langit tertinggi.

Dalam peristiwa Isra' Mi'raj, Rasulullah ﷺ memimpin seluruh nabi dalam shalat di Masjidil Aqsa — simbol bahwa risalah Islam adalah kelanjutan dan penyempurnaan dari seluruh risalah sebelumnya. Peristiwa ini menegaskan hubungan spiritual antara Makkah dan Baitul Maqdis, serta mengukuhkan posisi Masjidil Aqsa sebagai tempat suci yang dihormati seluruh Muslim.

Baitul Maqdis juga merupakan kiblat pertama umat Islam sebelum dipindahkan ke Ka'bah — perubahan yang menjadi ujian keimanan dan ketaatan kaum Muslimin, sebagaimana dicatat dalam Al-Qur'an surah Al-Baqarah ayat 142-145.`,
    coordinates: "31.7780° N, 35.2354° E",
    eventIds: ["isra-miraj"],
    significance: "Kiblat Pertama, Titik Awal Mi'raj, Tempat Suci Ketiga Islam",
  },
  {
    id: "abwa",
    name: "Abwa'",
    description: "Desa kecil di jalur Makkah-Madinah tempat Aminah, ibunda Rasulullah ﷺ, wafat.",
    fullDescription: `Abwa' adalah sebuah desa kecil yang terletak di antara Makkah dan Madinah, sekitar 160 kilometer dari Makkah. Desa ini dikenal dalam sejarah Sirah sebagai tempat wafatnya Aminah binti Wahb, ibunda Rasulullah ﷺ, pada tahun 576 M.

Ketika Aminah membawa Muhammad kecil yang berusia enam tahun ke Madinah untuk mengenalkannya pada kerabat Bani Najjar dan makam ayahnya Abdullah, ia jatuh sakit di desa Abwa' dalam perjalanan kembali ke Makkah. Penyakit itu membawanya pada wafat, meninggalkan Muhammad kecil sebagai yatim piatu.

Makam Aminah di Abwa' menjadi tempat yang dikenang dalam sejarah Islam. Tahun-tahun kemudian, saat melewati Abwa' dalam salah satu ekspedisi, Rasulullah ﷺ mengunjungi makam ibunya dan menangis. Para sahabat yang menyaksikan tangis itu turut menangis, dan beliau bersabda, "Aku memohon izin kepada Tuhanku untuk memohon ampunan baginya, dan Dia tidak mengizinkan. Aku memohon izin untuk mengunjungi makamnya, dan Dia mengizinkan. Maka kunjungilah kubur, karena ia mengingatkan kalian pada kematian."`,
    coordinates: "22.4167° N, 39.0833° E",
    eventIds: ["kematian-aminah"],
    significance: "Tempat Wafat Aminah, Ibunda Rasulullah ﷺ",
  },
];

export function getLocationById(id: string): Location | undefined {
  return locations.find((l) => l.id === id);
}

export function getLocationsByEvent(eventId: string): Location[] {
  return locations.filter((l) => l.eventIds.includes(eventId));
}
