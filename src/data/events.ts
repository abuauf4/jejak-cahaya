export interface SirahEvent {
  id: string;
  title: string;
  subtitle: string;
  year: string;
  yearNum: number;
  phaseId: string;
  description: string;
  story: string;
  featured: boolean;
  characterIds: string[];
  locationId: string;
  references: string[];
  order: number;
}

export const events: SirahEvent[] = [
  {
    id: "kelahiran",
    title: "Kelahiran Sang Cahaya",
    subtitle: "Tiba di Tengah Kegelapan",
    year: "570 M",
    yearNum: 570,
    phaseId: "kelahiran",
    description: "Muhammad bin Abdullah ﷺ lahir di Makkah pada Tahun Gajah, membawa cahaya bagi seluruh alam.",
    story: `Makkah pada tahun 570 Masehi bukanlah kota yang tenang. Aburahah, raja Yaman, baru saja menyerang Ka'bah dengan pasukan gajah yang luar biasa. Langit masih menyimpan cerita tentang burung-burung ababil yang menjatuhkan batu panas menghancurkan pasukan itu. Di tengah suasana itu, sebuah rumah kecil di suku Bani Hasyim menyimpan momen yang akan mengubah sejarah selamanya.

Aminah binti Wahb, seorang ibu yang baru kehilangan suaminya Abdullah, melihat bayinya yang baru lahir. Cahaya yang memancar dari wajah bayi itu membuatnya tersenyum meski duka masih membalut hatinya. Abdullah, sang suami, telah wafat sebelum anak ini lahir — pergi meninggalkan dunia saat berdagang ke Madinah, tak pernah menyaksikan wajah putranya.

Bayi itu diberi nama Muhammad — nama yang belum pernah digunakan di kalangan kaum Quraisy. Ketika ditanya mengapa memberi nama demikian, Abdul Muthalib, sang kakek, menjawab, "Aku berharap ia dipuji oleh seluruh penghuni langit dan bumi."

Hari kelahiran itu menjadi awal dari sebuah perjalanan panjang. Perjalanan yang akan membawa cahaya dari sebuah rumah kecil di Makkah, merambah seluruh penjuru dunia, dan terus bersinar hingga akhir zaman.`,
    featured: true,
    characterIds: ["muhammad", "aminah", "abdul-muthalib"],
    locationId: "makkah",
    references: ["Shahih Bukhari 3851", "Sirah Ibnu Hisyam 1/166", "Ar-Rahiq Al-Makhtum hal. 63"],
    order: 1,
  },
  {
    id: "penyusuan-bani-saad",
    title: "Di Padang Pasir Bani Sa'ad",
    subtitle: "Bayi di Tengah Gurun",
    year: "570–574 M",
    yearNum: 570,
    phaseId: "kelahiran",
    description: "Muhammad kecil disusukan kepada Halimah as-Sa'diyah di padang pasir Bani Sa'ad, tumbuh dalam kemurnian bahasa dan alam terbuka.",
    story: `Di antara tradasi bangsa Arab, menyusukan bayi kepada wanita pedalaman adalah kebiasaan yang dianggap mulia. Keluarga kota menginginkan anak-anak mereka tumbuh dengan bahasa Arab yang murni, napas gunung yang bersih, dan jiwa padang pasir yang tangguh.

Halimah binti Abi Dzu'aib dari Bani Sa'ad datang ke Makkah mencari bayi yang mau disusuinya. Tahun itu tahun kemarau. Unta-untanya kurus, air susunya menyusut, dan bekalnya tipis. Ia berharap menemukan bayi dari keluarga kaya yang bisa memberinya imbalan memadai.

Namun setiap bayi yang ia tawari menolak — mereka tidak mau disusui oleh wanita dari suku pedalaman yang miskin. Hanya tersisa satu bayi: Muhammad, anak yatim dari Bani Hasyim. Bayi yang tak memiliki ayah untuk membayar mahal.

"Suamiku, ambillah bayi itu," kata Halimah. "Mungkin ia membawa keberkahan."

Keputusan itu mengubah segalanya. Susu Halimah yang hampir habis tiba-tiba mengalir deras. Unta yang kurus berjalan gagah. Padang pasir yang gersang seolah bersemi. Keberkahan itu nyata.

Selama empat tahun, Muhammad kecil tumbuh di padang Bani Sa'ad. Ia belajar bahasa Arab yang paling murni, berlari di atas pasir, menghirup udara gurun yang jernih. Di sinilah, jauh dari hiruk-pikuk kota, fondasi kekuatan dan kelembutan jiwa diletakkan.`,
    featured: false,
    characterIds: ["muhammad", "halimah"],
    locationId: "makkah",
    references: ["Shahih Muslim 2639", "Sirah Ibnu Hisyam 1/170", "Ar-Rahiq Al-Makhtum hal. 69"],
    order: 2,
  },
  {
    id: "kematian-aminah",
    title: "Kehilangan Ibu",
    subtitle: "Yatim Piatu di Usia Enam",
    year: "576 M",
    yearNum: 576,
    phaseId: "kelahiran",
    description: "Aminah, ibunda Rasulullah ﷺ, wafat di Abwa' saat dalam perjalanan kembali dari Madinah, meninggalkan Muhammad kecil sebagai yatim piatu.",
    story: `Muhammad berusia enam tahun saat ibunya memutuskan untuk membawanya ke Madinah. Aminah ingin mengenalkan putranya pada kerabat Bani Najjar, dan mungkin, ingin menunjukkan makam Abdullah — suami yang tak pernah ditemui oleh anak itu setelah lahir.

Perjalanan dari Makkah ke Madinah panjang dan melelahkan. Di tengah jalan, mereka singgah di Abwa', sebuah desa kecil di antara dua kota. Di situlah, Aminah jatuh sakit.

Penyakit itu datang tiba-tiba dan tak memberi waktu. Aminah, yang telah menjadi satu-satunya dunia bagi putranya, menghembuskan napas terakhirnya di desa kecil itu. Muhammad kecil berdiri di sisi makam ibunya, mata menatap pasir yang menutupi sosok yang paling ia cintai.

Seorang anak yang belum mengenal ayahnya, kini kehilangan ibunya. Dunia seolah mengerut menjadi sangat kecil. Tidak ada pelukan yang menunggu di rumah. Tidak ada suara lembut yang memanggil namanya saat malam turun.

Kakeknya, Abdul Muthalib, merengkuh tangan kecil itu dan membawanya kembali ke Makkah. Tangan tua itu kokoh, tapi hatinya hancur. Anaknya Abdullah telah pergi, dan kini menantunya menyusul.

Malam-malam berikutnya, Muhammad kecil tidur di pelukan kakeknya. Dan di keheningan malam Makkah, seorang yatim piatu belajar apa yang tak diajarkan oleh siapa pun: bahwa dunia ini tidak kekal, bahwa setiap cinta akan berujung pada perpisahan, dan bahwa hati yang paling hancur bisa menjadi yang paling kuat.`,
    featured: false,
    characterIds: ["muhammad", "aminah", "abdul-muthalib"],
    locationId: "abwa",
    references: ["Sirah Ibnu Hisyam 1/182", "Ar-Rahiq Al-Makhtum hal. 73"],
    order: 3,
  },
  {
    id: "perniagaan-khadijah",
    title: "Perjalanan Dagang ke Syam",
    subtitle: "Al-Amin yang Terpercaya",
    year: "583 M",
    yearNum: 583,
    phaseId: "pemuda",
    description: "Muhammad muda memimpin kafilah dagang Khadijah ke Syam, menunjukkan kejujuran dan kecakapan yang luar biasa.",
    story: `Khadijah binti Khuwailid adalah salah satu wanita paling berhasil di Makkah. Ia menjalankan perdagangan besar, mengirim kafilah ke Syam dan Yaman, dan kekayaannya melimpah. Namun ia butuh seseorang yang terpercaya — bukan sekadar pintar berdagang, tetapi jujur, amanah, dan tak pernah berkhianat.

Namanya telah bergema di seluruh Makkah: Muhammad bin Abdullah. Anak yatim dari Bani Hasyim yang kini tumbuh menjadi pemuda berusia 25 tahun. Semua orang memanggilnya Al-Amin — Yang Terpercaya. Bukan gelar yang diberikan oleh satu orang, tetapi pengakuan dari seluruh kota.

"Kata mereka, ia tidak pernah berdusta. Tidak pernah mengkhianati titipan. Tidak pernah menipu dalam timbangan," kata Maysarah, pelayan Khadijah yang akan menemani perjalanan itu.

Khadijah memutuskan: Muhammad akan memimpin kafilahnya ke Syam.

Perjalanan itu sukses melebihi ekspektasi. Keuntungan yang dibawa pulang dua kali lipat dari biasanya. Maysarah menceritakan bagaimana Muhammad berniaga — adil, tegas, namun lembut. Ia tidak pernah menaikkan harga di luar kewajaran. Ia tidak pernah menyembunyikan cacat barang. Para pedagang Syam mengagumi cara ia bernegosiasi.

Lebih dari keuntungan, Maysarah menceritakan hal-hal yang tak bisa diukur dengan dinar dan dirham: awan yang selalu memberi naung di atas kepala Muhammad saat berjalan di padang pasir yang terik, rahib di Busra yang mengenali tanda kenabian, dan ketenangan yang memancar dari wajah pemuda itu.

Ketika kafilah kembali ke Makkah, Khadijah mendengar semua cerita itu. Dan di matanya, Muhammad bukan lagi sekadar pegawai yang amanah. Ia adalah seseorang yang istimewa.`,
    featured: true,
    characterIds: ["muhammad", "khadijah"],
    locationId: "syam",
    references: ["Shahih Bukhari 3820", "Sirah Ibnu Hisyam 1/194", "Ar-Rahiq Al-Makhtum hal. 82"],
    order: 4,
  },
  {
    id: "pernikahan-khadijah",
    title: "Pernikahan dengan Khadijah",
    subtitle: "Dua Hati yang Saling Mengisi",
    year: "595 M",
    yearNum: 595,
    phaseId: "pemuda",
    description: "Muhammad menikah dengan Khadijah binti Khuwailid, wanita terhormat yang mencintainya karena kejujurannya dan mendukungnya selama 25 tahun.",
    story: `Khadijah berusia 40 tahun saat ia mengirim Nufaisah, sahabatnya, untuk menyampaikan pesan kepada Muhammad. Pesan yang sangat tidak biasa bagi seorang wanita terhormat Quraisy.

"Muhammad, apa yang menghalangimu untuk menikah?" tanya Nufaisah.

"Aku tidak memiliki harta untuk membeli mahar," jawab Muhammad jujur.

"Bagaimana jika ada wanita yang memiliki kecantikan, kekayaan, kemuliaan, dan ia sendiri yang menginginkanmu?" Nufaisish menyampaikan nama Khadijah.

Muhammad terdiam. Seorang yatim dari Bani Hasyim, tanpa kekayaan besar, dipinang oleh wanita paling terhormat di Makkah? Ini bukan sekadar tawaran pernikahan — ini adalah pengakuan atas nilai yang tak bisa dibeli dengan harta.

Pernikahan itu berlangsung sederhana namun penuh keberkahan. Mahar yang diberikan Muhammad adalah 20 ekor unga muda — jumlah yang sederhana dibanding kemewahan Khadijah, namun itulah yang ia mampu.

Selama 25 tahun, Khadijah menjadi rumah bagi Muhammad. Ia bukan sekadar istri — ia adalah sahabat, penasihat, pelindung. Ketika seluruh dunia memusuhi Muhammad kelak, Khadijah berdiri di sisinya. Ketika Muhammad ketakutan setelah menerima wahyu pertama, Khadijah yang memeluknya dan berkata, "Demi Allah, Allah tidak akan pernah merendahkanmu."

Cinta mereka bukan cinta yang membara lalu padam. Ia adalah cinta yang makin kuat saat badai datang, makin dalam saat ujian menimpa. Dan hingga akhir hayatnya, Muhammad tidak pernah lupa Khadijah. Bertahun-tahun setelah wafatnya, setiap ada daging yang dibagikan, beliau selalu mengirimkan ke sahabat-sahabat Khadijah seraya berkata, "Aku mencintai orang yang dicintai olehnya."`,
    featured: false,
    characterIds: ["muhammad", "khadijah"],
    locationId: "makkah",
    references: ["Shahih Bukhari 3820", "Sirah Ibnu Hisyam 1/199", "Ar-Rahiq Al-Makhtum hal. 87"],
    order: 5,
  },
  {
    id: "wahyu-pertama",
    title: "Wahyu Pertama di Gua Hira",
    subtitle: "Ketika Langit Berbicara",
    year: "610 M",
    yearNum: 610,
    phaseId: "kenabian",
    description: "Malaikat Jibril datang ke Gua Hira dan menyampaikan wahyu pertama: Iqra' — Bacalah! Dimulailah misi kenabian.",
    story: `Gua Hira bukan tempat yang nyaman. Terletak di puncak Jabal Nur, kurang lebih 3 kilometer dari Makkah, gua ini sempit, dingin, dan gelap. Tapi bagi Muhammad, gua ini adalah tempat di mana dunia bising kota tak lagi mampu menjangkau pikirannya.

Setiap bulan Ramadan, Muhammad menyendiri di gua ini. Ia bukan sedang lari dari dunia — ia sedang mencari jawaban. Pertanyaan-pertanyaan tentang tuhan, tentang kehidupan, tentang mengapa kaumnya menyembah berhala yang tak bisa mendengar, melihat, ataupun menolong. Pertanyaan-pertanyaan itu mengganggunya seperti debu yang tak bisa dibersihkan dari sanubari.

Malam tanggal 17 Ramadan, tahun ke-40 dari usianya, Muhammad tertidur di dalam gua. Tiba-tiba, sosok cahaya yang belum pernah dilihatnya muncul.

"Iqra'!" — Bacalah!

"Aku tidak bisa membaca," jawab Muhammad, gemetar.

Sosok itu memeluknya hingga sesak, lalu melepaskannya. Sekali lagi: "Iqra'!"

Tiga kali pelukan itu terjadi. Pada kali ketiga, sosok itu membacakan ayat-ayat yang terukir dalam cahaya:

"Bacalah dengan (menyebut) nama Tuhanmu yang menciptakan. Dia telah menciptakan manusia dari segumpal darah. Bacalah, dan Tuhanmulah Yang Maha Pemurah. Yang mengajar (manusia) dengan perantaraan kalam. Dia mengajarkan kepada manusia apa yang tidak diketahuinya."

Muhammad turun dari gunung dengan jantung berdebar keras. Ia berlari menuju Khadijah, wajah pucat, tubuh gemetar.

"Selimuti aku! Selimuti aku!" serunya.

Khadijah memeluk suaminya. Menunggu hingga ketakutan itu mereda. Lalu ia berkata dengan keyakinan yang tak tergoyahkan:

"Berikan kabar gembira, wahai putra paman. Demi Allah, Allah tidak akan pernah merendahkanmu. Kau menyambung silaturahmi, kau berkata jujur, kau memikul beban orang lain, kau menjamu tamu, dan kau menolong orang yang menderita."

Malam itu mengubah segalanya. Seorang penggembala yatim piatu yang mencari jawaban di sebuah gua kecil, kini menjadi Rasul — utusan Allah bagi seluruh alam.`,
    featured: true,
    characterIds: ["muhammad", "khadijah", "jibril"],
    locationId: "gua-hira",
    references: ["QS. Al-'Alaq 1-5", "Shahih Bukhari 3", "Shahih Muslim 160", "Ar-Rahiq Al-Makhtum hal. 95"],
    order: 6,
  },
  {
    id: "dakwah-terang",
    title: "Dakwah di Bukit Shafa",
    subtitle: "Seruan di Atas Bukit",
    year: "613 M",
    yearNum: 613,
    phaseId: "dakwah-terang",
    description: "Rasulullah ﷺ mengajak kaum Quraisy secara terbuka di Bukit Shafa, menandai dimulainya dakwah terang-terangan.",
    story: `Tiga tahun dakwah berjalan secara sembunyi-sembunyi. Tiga puluh orang lebih telah memeluk Islam, berkumpul di rumah Arqam bin Abi Arqam, saling mengajarkan ayat-ayat yang turun dari langit. Namun Allah memerintahkan agar risalah ini tidak lagi disembunyikan.

"Peringatkanlah kerabatmu yang terdekat." — QS. Asy-Syu'ara: 214

Muhammad naik ke puncak Bukit Shafa, tempat di mana orang-orang biasa mengumumkan hal-hal penting. Ia memanggil setiap klan Quraisy, satu per satu.

"Wahai Bani Fihr! Wahai Bani Adi! Wahai Bani Ka'ab!"

Suara itu bergema di lembah Makkah. Orang-orang berkerumun, penasaran. Apa yang ingin dikatakan Al-Amin ini?

"Jika aku memberitahu kalian bahwa di balik lembah ini ada pasukan berkuda yang akan menyerang kalian, apakah kalian akan percaya?"

"Ya! Kami tidak pernah mendengarmu berdusta," jawab mereka serempak.

"Maka ketahuilah, aku adalah pemberi peringatan bagi kalian dari siksa yang pedis."

Siletan suara memecah kerumunan. Abu Lahab, paman sendiri, berdiri dan berteriak, "Celakah engkau! Untuk inikah engkau kumpulkan kami?"

Ayat pun turun: "Binasalah kedua tangan Abu Lahab dan sesungguhnya ia akan binasa."

Malam itu, garis pertempuran ditarik. Dakwah tidak lagi diam-diam. Dan penolakan pun tidak lagi diam-diam. Dari bukit kecil itu, perjalanan yang lebih berat dimulai — perjalanan yang akan diuji dengan boikot, penyiksaan, dan pengusiran.`,
    featured: false,
    characterIds: ["muhammad", "abu-lahab"],
    locationId: "makkah",
    references: ["QS. Al-Masad 1", "Shahih Bukhari 4770", "Sirah Ibnu Hisyam 1/280", "Ar-Rahiq Al-Makhtum hal. 139"],
    order: 7,
  },
  {
    id: "isra-miraj",
    title: "Isra' Mi'raj",
    subtitle: "Perjalanan Melampaui Langit",
    year: "621 M",
    yearNum: 621,
    phaseId: "dakwah-terang",
    description: "Perjalanan malam dari Masjidil Haram ke Masjidil Aqsa dan naik ke langit tertinggi — momen yang menguji keimanan dan mengukuhkan shalat.",
    story: `Tahun Kesedihan baru saja berlalu. Khadijah wafat. Abu Thalib wafat. Dua pelindung terbesar pergi hampir bersamaan. Duka menumpuk di dada Muhammad seperti bebatu yang tak bisa digeser.

Maka di malam yang paling gelap itu, datanglah cahaya yang paling terang.

Jibril datang membawa Buraq — kendaraan cahaya yang mampu melangkah sejauh mata memandang. Dari Masjidil Haram, Muhammad melangkah ke Masjidil Aqsa. Di tempat yang suci itu, semua nabi berkumpul di belakangnya dalam shalat — pengakuan bahwa ia adalah penutup seluruh rangkaian risalah.

Lalu dimulailah perjalanan ke atas. Langit pertama, kedua, ketiga... hingga langit ketujuh. Di setiap pintu, para nabi menyambut. Adam, Isa dan Yahya, Yusuf, Idris, Harun, Musa, Ibrahim. Setiap pertemuan adalah penghormatan, setiap sapaan adalah doa.

Di Sidratul Muntaha, batas terjauh yang tak bisa dilalui siapa pun, Muhammad menerima perintah shalat. Lima puluh waktu, kemudian dikurangi, lagi dan lagi, hingga menjadi lima waktu — tapi pahalanya tetap lima puluh.

Ketika Muhammad kembali ke Makkah dan menceritakan perjalanan itu, kegemparan melanda. Abu Bakar berdiri dan berkata, "Jika ia yang mengatakannya, maka itu benar." Sejak saat itu ia digelari as-Siddiq — Yang Membenarkan.

Isra' Mi'raj bukan sekadar perjalanan ajaib. Ia adalah pengingat bahwa di balik malam tergelap, selalu ada tangga menuju cahaya.`,
    featured: true,
    characterIds: ["muhammad", "jibril", "abu-bakar"],
    locationId: "baitul-maqdis",
    references: ["QS. Al-Isra' 1", "QS. An-Najm 1-18", "Shahih Bukhari 3207", "Shahih Muslim 164"],
    order: 8,
  },
  {
    id: "hijrah",
    title: "Hijrah ke Madinah",
    subtitle: "Meninggalkan Segalanya",
    year: "622 M",
    yearNum: 622,
    phaseId: "hijrah",
    description: "Rasulullah ﷺ dan para sahabat meninggalkan Makkah menuju Madinah, memulai babak baru dalam sejarah Islam.",
    story: `Malam itu, Makkah tidur. Tapi Muhammad tidak. Ia berdiri di Ka'bah, menatap kota yang telah menjadi rumahnya selama 53 tahun. Setiap sudut menyimpan kenangan — kelahiran, masa kecil, pernikahan, wahyu pertama, dan juga boikot, penyiksaan, dan pengkhianatan.

"Engkau adalah tanah yang paling kucintai di sisi Allah. Andai kaummu tidak mengusirku, aku tidak akan meninggalkanmu," bisiknya.

Rencana pembunuhan sudah disusun. Pemuda dari setiap klan Quraisy berdiri di sekeliling rumahnya, pedang terhunus, menunggu fajar. Mereka ingin darahnya ditumpahkan oleh semua klan sekaligus, sehingga Bani Hasyim tak bisa membalas dendam pada satu klan tertentu.

Tapi Muhammad keluar di antara mereka, menebarkan debu ke atas kepala mereka, dan berjalan melewati barisan itu tanpa terlihat. Ayat yang turun menggambarkan momen itu: "Dan Kami jadikan di hadapan mereka dinding dan di belakang mereka dinding."

Di Gua Tsur, Muhammad dan Abu Bakar bersembunyi selama tiga hari. Quraisy memburu mereka dengan segala cara. Pencari hadiah meraup setiap gua, setiap celah. Suatu ketika, mereka berdiri tepat di depan gua tempat keduanya bersembunyi.

Abu Bakar berbisik cemas, "Wahai Rasulullah, jika salah seorang dari mereka melihat ke bawah kakinya, ia akan melihat kita."

Muhammad menjawab dengan ketenangan yang tak tergoyahkan: "Jangan takut. Allah bersama kita."

Labrakah merajut sarang di mulut gua. Burung bertelur di depannya. Pohon menutupi celah. Alam semesta bersekongkol melindungi dua manusia yang membawa risalah yang akan mengubah dunia.

Tiga hari kemudian, mereka melanjutkan perjalanan. Di Quba, dekat Madinah, Muhammad membangun masjid pertama dalam sejarah Islam. Kemudian ia memasuki kota Madinah — bukan sebagai pengungsi yang terpukul, tetapi sebagai pemimpin yang dinanti.

Anak-anak bernyanyi di sepanjang jalan: "Thala'a al-badru 'alaina — Telah muncul bulan purnama bagi kami."`,
    featured: true,
    characterIds: ["muhammad", "abu-bakar", "ali"],
    locationId: "gua-tsur",
    references: ["QS. At-Taubah 40", "Shahih Bukhari 3905", "Sirah Ibnu Hisyam 2/137", "Ar-Rahiq Al-Makhtum hal. 224"],
    order: 9,
  },
  {
    id: "perang-badar",
    title: "Perang Badar",
    subtitle: "Ketika Sedikit Mengalahkan Banyak",
    year: "624 M",
    yearNum: 624,
    phaseId: "pertahanan",
    description: "313 Muslim menghadapi 1000 pasukan Quraisy di Badar — kemenangan pertama yang mengubah keseimbangan kekuatan.",
    story: `Sumur-sumur Badar berdiri di tengah padang pasir yang sunyi. Tempat itu biasanya hanya disinggahi oleh kafilah dagang yang beristirahat sejenak sebelum melanjutkan perjalanan. Tapi pada tanggal 17 Ramadan tahun ke-2 Hijriah, padang itu menjadi saksi pertempuran yang akan diabadikan dalam sejarah.

Tiga ratus tiga belas Muslim berdiri di satu sisi. Sebagian hanya membawa pedang tanpa baju besi. Sebagian berbagi satu untuh untuk bergantian menunggangi. Mereka keluar dari Madinah awalnya hanya untuk menghadang kafilah dagang Quraisy — bukan untuk berperang.

Di sisi lain, seribu pasukan Qurayah berbaris dengan baju besi berkilauan, kuda-kuda perang yang gagah, dan kepercayaan diri yang melimpah. Mereka datang untuk menghancurkan Muhammad dan pengikutnya sekali-kali.

Malam sebelum pertempuran, hujan turun. Tanah yang semula berdebu menjadi padat dan kuat di bawah kaki kaum Muslimin. Sedangkan di sisi Quraisy, tanah menjadi licin dan sulit diinjak. Air itu adalah pertolongan pertama.

Muhammad mengangkat tangan berdoa sepanjang malam: "Ya Allah, jika Engkau menghancurkan kelompok ini, Engkau tidak akan lagi disembah di muka bumi."

Fajar menyingsing. Pertempuran dimulai. Tiga champion Quraisy maju — Utbah, Syaibah, dan Walid. Dari pihak Muslim, Hamzah, Ali, dan Ubaidah bin Harits maju menyambut. Satu per satu, champion Quraisy tumbang.

Kemudian badai pertempuran meledak. Pasukan kecil itu berjuang dengan keberanian yang tak masuk akal. Ayat turun: "Bukanlah kamu yang melempar, tetapi Allah-lah yang melempar." Malaikat turun membantu. Dan ketika debu akhirnya mengendap, Quraisy mundur dalam kekalahan yang memalukan.

Tujuh puluh tokoh Quraisy tewas. Tujuh puluh lainnya ditawan. Di antara yang tewas adalah Abu Jahl — musuh bebuyutan Islam. Umar bin Khattab, yang kelak menjadi khalifah, berdiri di tengah medan dan berkata, "Allah telah memisahkan kebenaran dari kebatatan."

Badar bukan sekadar kemenangan militer. Ia adalah bukti bahwa iman bisa mengalahkan angka, bahwa kebenaran tak perlu menunggu mayoritas, dan bahwa pertolongan Allah datang saat manusia sudah berusaha semaksimal kemampuannya.`,
    featured: true,
    characterIds: ["muhammad", "hamzah", "ali", "umar"],
    locationId: "badar",
    references: ["QS. Al-Anfal 9-11", "QS. Ali Imran 123-126", "Shahih Bukhari 3952", "Shahih Muslim 1763"],
    order: 10,
  },
  {
    id: "hudaibiyah",
    title: "Perjanjian Hudaibiyah",
    subtitle: "Kemenangan di Balik Persetujuan",
    year: "628 M",
    yearNum: 628,
    phaseId: "perdamaian",
    description: "Perjanjian yang tampak sebagai kekalahan diplomatik ternyata menjadi pintu kemenangan terbesar — Fathu Makkah.",
    story: `Mereka berangkat dengan niat beribadah, bukan berperang. Seribu empat ratus Muslim, mengenakan pakaian ihram, membawa hewan kurban, berjalan menuju Makkah untuk melaksanakan umrah. Tidak ada senjata, tidak ada niat permusuhan — hanya keinginan untuk menyembah Allah di Tanah Suci.

Tapi Quraisy tidak mempercayai itu. Mereka mengirim pasukan untuk menghalangi. Muhammad menghindari konfrontasi dan memilih jalur alternatif, hingga rombongan Muslim tiba di Hudaibiyah — perbatasan tanah suci Makkah.

Negosiasi dimulai. Utusan datang dan pergi. Ketegangan meningkat. Qurayah bersikeras: Muslim tidak boleh memasuki Makkah tahun ini.

Maka disusunlah perjanjian. Dan isi perjanjian itu tampak sangat merugikan pihak Muslim:

Barangsiapa dari Makkah yang pergi ke Madinah harus dikembalikan. Barangsiapa dari Madinah yang pergi ke Makkah tidak perlu dikembalikan. Umrah ditunda ke tahun depan. Gencatan senjata selama sepuluh tahun.

Umar bin Khattab hampir tidak bisa menahan amarahnya. Ia mendatangi Abu Bakar: "Bukankah kita di pihak yang benar? Mengapa kita memberikan ini?"

Abu Bakar menjawab tenang, "Dengarkan ia. Ia adalah Rasulullah."

Muhammad memanggil Ali untuk menulis perjanjian. "Tulis: Bismillahirrahmanirrahim."

Suhail bin Amr, perwakilan Quraisy, menolak: "Aku tidak tahu apa itu Ar-Rahman Ar-Rahim. Tulis: Bismikallahumma."

"Hapus dan tulis Bismikallahumma," perintah Muhammad.

"Tulis: Ini perjanjian dari Muhammad Rasulullah."

Suhail menolak lagi: "Jika aku mengakui engkau Rasulullah, aku tidak akan memerangimu. Tulis: Muhammad bin Abdullah."

"Hapus dan tulis Muhammad bin Abdullah."

Setiap kata yang ditolak, Muhammad menerimanya dengan tenang. Bagi para sahabat, ini terasa seperti kekalahan. Tapi Allah menyebutnya kemenangan: "Sesungguhnya Kami telah memberikan kepadamu kemenangan yang nyata." — QS. Al-Fath: 1

Dalam dua tahun setelah perjanjian itu, lebih banyak orang memeluk Islam daripada dalam dua puluh tahun sebelumnya. Perdamaian membuka pintu hati yang peperangan tidak bisa.

Hudaibiyah mengajarkan bahwa kemenangan sejati bukan diukur dari siapa yang mendikte syarat, tetapi dari siapa yang mendapatkan hasilnya. Dan kadang, kemenangan terbesar datang dari persetujuan yang terasa seperti kekalahan.`,
    featured: false,
    characterIds: ["muhammad", "abu-bakar", "umar", "ali"],
    locationId: "hudaibiyah",
    references: ["QS. Al-Fath 1-27", "Shahih Bukhari 2731", "Shahih Muslim 1784", "Ar-Rahiq Al-Makhtum hal. 346"],
    order: 11,
  },
  {
    id: "fathu-makkah",
    title: "Fathu Makkah",
    subtitle: "Kembali dengan Hati yang Luas",
    year: "630 M",
    yearNum: 630,
    phaseId: "perdamaian",
    description: "Rasulullah ﷺ memasuki Makkah tanpa pertumpahan darah — kemenangan yang paling agung dalam sejarah Islam.",
    story: `Delapan tahun lalu, ia keluar dari kota ini dalam kegelapan malam, dikejar oleh pembunuh yang mengintai. Kini ia kembali — bukan sebagai pengungsi, tetapi sebagai penakluk yang paling agung di jazirah Arab.

Sepuluh ribu pasukan Muslim memasuki Makkah dari empat penjuru. Kota yang selama ini menjadi pusat perlawanan terhadap Islam kini berdiri tanpa pertahanan. Abu Sufyan, pemimpin Quraisy yang selama ini menjadi musuh bebuyutan, telah menyatakan keislamanannya malam sebelumnya.

Muhammad menunggu. Ia tidak langsung memasuki kota. Ia membiarkan rasa takut mereda, membiarkan waktu memberikan kesempatan bagi mereka yang ingin menyelamatkan diri. Ia mengumumkan: "Barangsiapa memasuki Masjidil Haram, ia aman. Barangsiapa memasuki rumah Abu Sufyan, ia aman. Barangsiapa mengunci pintu rumahnya, ia aman."

Ketika ia akhirnya memasuki kota, ia melakukannya dengan rendah hati yang luar biasa. Kepalanya menunduk di atas untanya hingga hampir menyentuh pelana — seolah ia tidak berani menengadah ke langit karena rasa syukur yang meluap-luap.

Di Ka'bah, ia menghancurkan tiga ratus enam puluh berhala satu per satu, sambil mengucapkan: "Dan katakanlah, 'Kebenaran telah datang dan kebatilan telah musnah.' Sesungguhnya kebatilan itu pasti musnah."

Kemudian momen yang paling menentukan tiba. Para pemuka Quraisy berdiri di depannya, kepala tertunduk, menunggu hukuman yang mereka yakinkan akan datang. Selama bertahun-tahun mereka menyiksa, memboikot, memerangi, dan mengusir Muslim. Kini mereka ada di tangannya.

Muhammad mengangkat wajah dan bertanya dengan suara yang menggema di seluruh Ka'bah:

"Apa yang kalian kira akan kulakukan kepada kalian?"

"Engkau adalah saudara yang mulia, putra saudara yang mulia," jawab mereka gemetar.

Maka Muhammad mengucapkan kata-kata yang telah mengubah sejarah — kata-kata yang Nabi Yusuf ucapkan kepada saudara-saudaranya ribuan tahun sebelumnya:

"Pergilah kalian. Kalian semua bebas. Tidak ada cela untuk kalian hari ini."

Tidak ada pembalasan dendam. Tidak ada hukuman massal. Tidak ada pengadilan balas dendam. Hanya ampunan yang tak terbatas dari seorang yang telah menang atas seluruh musuhnya, namun memilih untuk menang atas dirinya sendiri.

Hari itu, Makkah bukan saja ditaklukkan secara fisik. Ia ditaklukkan oleh hati yang begitu besar, sehingga kebencian bertahun-tahun larut dalam satu kalimat ampunan.`,
    featured: true,
    characterIds: ["muhammad", "abu-bakar", "umar", "ali", "abu-sufyan"],
    locationId: "makkah",
    references: ["QS. An-Nasr 1-3", "Shahih Bukhari 4280", "Sirah Ibnu Hisyam 4/36", "Ar-Rahiq Al-Makhtum hal. 406"],
    order: 12,
  },
];

export function getEventById(id: string): SirahEvent | undefined {
  return events.find((e) => e.id === id);
}

export function getEventsByPhase(phaseId: string): SirahEvent[] {
  return events.filter((e) => e.phaseId === phaseId);
}

export function getFeaturedEvents(): SirahEvent[] {
  return events.filter((e) => e.featured);
}
