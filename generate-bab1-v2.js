const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber,
  AlignmentType, HeadingLevel, BorderStyle, PageBreak, Table, TableRow, TableCell,
  WidthType, ShadingType
} = require("docx");
const fs = require("fs");

// ── Palette: warm literary tone for Islamic storytelling ──
const P = {
  primary: "#2C2418",
  body: "#2C2418",
  secondary: "#5A4D3E",
  accent: "#96751A",
  surface: "#FBF8F1",
  catatanBg: "F5F0E6",
  catatanBorder: "C9B67A",
};

const c = (hex) => hex.replace("#", "");

// ══════════════════════════════════════════════════
// BAB 1 — V2 REVISION
// Changes from V1:
//   1. Kurangi 25% bahasa akademis (hapus hamada, sayl, Ghassanid, Lakhmid, Zoroastrianisme dari narasi)
//   2. Tambah 25% storytelling scene (kafilah scene, desert scene, tribal scene)
//   3. Hapus semua "Bayangkan..." → ganti dengan natural phrasing
//   4. Pecah paragraf panjang untuk mobile reading
//   5. Tambah sub-ritme (variasi panjang paragraf, kalimat pendek di antara panjang)
//   6. Fakta dipindah ke Catatan section
// ══════════════════════════════════════════════════

const openingScene = [
  `Angin gurun berhembus pelan dari arah selatan, membawa debu merah yang menempel di setiap permukaan. Matahari menggantung tepat di atas kepala\u2014tanpa ampun, membakar tanah yang retak-retak sejauh mata memandang. Tidak ada satu titik pun bayangan di hamparan ini.`,
  `Hanya pasir, batu, dan keheningan yang terasa hidup. Keheningan yang dipenuhi suara-suara kecil yang tidak terdengar oleh telinga yang tidak terbiasa. Desiran angin di sela batu. Gesekan pasir di atas pasir. Sesuatu yang bergerak jauh di cakrawala\u2014mungkin seekor ular, mungkin bayangan.`,
  `Seorang pengelana akan membutuhkan berhari-hari menyeberangi hamparan ini sebelum menemukan setetes air. Dan bila ia menemukannya, air itu bukan milik siapa-siapa. Ia menjadi milik siapa yang paling kuat mempertahankannya.`,
  `Di tanah ini, kekuatan adalah segalanya. Tanpa kekuatan, tidak ada tempat berlindung. Tidak ada air. Tidak ada kehidupan.`,
  `Ini bukan tanah yang memberi. Ini tanah yang menguji. Dan dari tanah yang menguji inilah, sebuah cahaya akan segera lahir\u2014cahaya yang akan mengubah segalanya. Tetapi sebelum cahaya itu datang, ada sebuah dunia yang harus dipahami terlebih dahulu.`,
  `Dunia tanpa cahaya.`,
];

const narasiSejarah = [
  `Dari atas langit, Jazirah Arab tampak seperti lautan tanah berwarna cokelat yang sangat luas. Gurun membentang ke segala arah. Gunung-gunung batu berdiri di barat, membentuk garis panjang yang memisahkan dataran tinggi dari laut. Oase-oase kecil muncul seperti pulau di tengah lautan pasir\u2014hijau, hidup, tapi sangat jauh satu sama lain.`,
  `Sebagian besar gurun ini bukan pasir halus yang bergelombang seperti di Sahara. Ini adalah hamparan batu dan kerikil, tanah keras yang menolak hampir semua bentuk kehidupan kecuali yang paling tangguh. Ada padang pasir pasir yang membentang di selatan\u2014Rub' al-Khali, namanya\u2014tapi ia bukan wajah dominan Jazirah. Wajah dominanya adalah tanah gersang yang menantang siapa pun yang berani melangkah.`,
  `Iklimnya adalah musuh terbesar. Siang, matahari membakar tanah hingga hampir 50 derajat. Malam, suhu bisa turun mendekati titik beku. Hujan hampir tidak pernah datang. Beberapa wilayah tidak menerima setetes pun selama bertahun-tahun.`,
  `Dan bila hujan akhirnya turun, ia bukan berkah. Ia bencana. Air mengalir deras di tanah yang keras dan kering, membentuk banjir bandang yang menyapu segala sesuatu di lintasannya. Tanah ini tidak menyerap air. Ia menolak air, lalu memuntahkannya kembali dalam bentuk kehancuran.`,
  `Kadang angin dari utara membawa badai debu. Debu kuning menutupi segalanya\u2014langit, matahari, jalan. Jarak pandang menyusut hingga tidak lebih dari beberapa meter. Seekor unta yang berjalan dua meter di depanmu pun tak terlihat. Kafilah-kafilah terpaksa berhenti, menunggu berhari-hari hingga badai mereda.`,
  `Tapi di antara hamparan yang tampak tanpa harapan ini, ada celah-celah kehidupan. Lembah-lembah sungai kering yang hanya berair saat musim hujan menjadi urat nadi yang diperebutkan. Di beberapa tempat, air tanah cukup dekat dengan permukaan sehingga sumur bisa digali. Di situlah pemukiman kecil tumbuh.`,
  `Oase-oase seperti Yatsrib\u2014yang kelak bernama Madinah\u2014Khaybar, dan Fadak menjadi pulau-pulau hijau di lautan kegersangan. Tempat-tempat di mana pohon kurma tumbuh, air mengalir, dan manusia bisa bernapas sedikit lebih lega.`,
  `Tetapi oase ini langka. Jarak antar satu oase dan oase berikutnya bisa mencapai ratusan kilometer. Ratusan kilometer melewati tanah yang tidak bersahabat. Di selatan, Yaman lebih subur berkat hujan yang lebih rajin turun. Kerajaan Saba' di sana, dengan bendungan Ma'rib yang legendaris, pernah menjadi salah satu peradaban terkaya di dunia kuno. Tetapi itu selatan\u2014jauh dari pusat cerita kita.`,
];

const konteks = [
  `Kondisi geografis yang keras ini membentuk masyarakat yang keras pula. Bangsa Arab sebelum Islam bukanlah satu bangsa dalam pengertian modern. Mereka adalah kumpulan suku-suku yang masing-masing punya identitas, tradisi, dan kepentingan sendiri.`,
  `Suku Quraisy di Makkah punya kehidupan yang sangat berbeda dari suku-suku Badui yang mengembara di gurun. Suku-suku di Yaman, yang hidup di tanah lebih subur, punya peradaban yang lebih mapan. Ada suku-suku yang sudah menetap dan membangun kerajaan kecil di perbatasan. Ada pula yang hidup berpindah-pindah, yang bagi mereka garis hidup-mati ditentukan oleh hujan dan padang rumput.`,
  `Kesatuan mereka bukan negara. Bukan kerajaan. Kesatuan mereka adalah 'ashabiyyah\u2014kesetiaan kepada suku yang mengikat seseorang pada kelompoknya secara mutlak. Kau lahir dari suku ini, kau hidup untuk suku ini, dan bila suku ini berperang, kau berperang. Tidak ada pilihan.`,
  `Seorang Badui bangun sebelum fajar. Ia keluar dari tendanya yang terbuat dari bulu kambing berwarna gelap, menginjak tanah yang masih dingin. Di kejauhan, kambing-kambingnya mulai bergerak. Unta-unta berdiri dengan sabar menunggu.`,
  `Hari ini ia harus memutuskan: pindah atau tetap? Padang rumput di sini mulai habis. Air di sumur semakin asin. Tapi pindah ke mana? Suku di sebelah utara tidak menyambut tamu. Suku di sebelah timur baru saja kehilangan kambing\u2014mereka curiga pada semua orang.`,
  `Ini kehidupan sehari-hari. Penuh ketidakpastian. Bergantung pada kambing, unta, dan sedikit kurma yang tumbuh di dekat sumur musiman. Seekor unta bisa menjadi perbedaan antara hidup dan mati. Ia membawa air, memberi susu, mengangkut barang, dan bila perlu, disembelih untuk dagingnya. Karena itu, unta menjadi ukuran kekayaan. Suku yang punya kawanan unta besar adalah suku yang kuat.`,
  `Dan suku yang kuat adalah suku yang dihormati\u2014atau setidaknya, ditakuti.`,
  `Hukum di gurun bukan hukum negara, karena tidak ada negara. Hukumnya adalah hukum balas dendam. Darah dibayar darah. Nyawa dibayar nyawa. Bila seseorang dari suku A dibunuh oleh orang dari suku B, maka seluruh suku A berkewajiban membalas kematian itu kepada siapa pun dari suku B\u2014tidak peduli apakah orang yang dibunuh itu pelakunya atau tidak.`,
  `Lingkaran balas dendam ini bisa berlangsung puluhan tahun. Menghabiskan generasi demi generasi. Tidak ada hakim, tidak ada polisi, tidak ada otoritas yang berwenang menghentikannya. Hanya kekuatan yang bisa menghentikan kekuatan. Hanya kesetiaan suku yang bisa melindungi seseorang dari pembalasan di luar sana.`,
];

const peristiwaUtama = [
  `Dari kejauhan, terlihat titik-titik hitam bergerak perlahan di bawah matahari. Semakin dekat, titik-titik itu berubah menjadi unta-unta yang berjalan beriringan. Di atas punggung mereka terikat barang-barang dari selatan: kemenyan, rempah-rempah, dan kain yang berwarna-warni. Ini kafilah\u2014rombongan dagang yang menjadi nadi ekonomi seluruh Jazirah.`,
  `Kafilah-kafilah ini berjalan dari selatan ke utara dan sebaliknya. Membawa barang berharga dari satu ujung Jazirah ke ujung lainnya. Dari Yaman datang kemenyan dan rempah. Dari Afrika datang emas dan gading. Dari Timur Jauh datang kain sutra. Dari Syam datang minyak zaitun dan anggur. Jalur perdagangan ini bukan sekadar jalan setapak\u2014ia adalah urat nadi yang membuat suku-suku Arab terhubung dengan dunia di luar mereka.`,
  `Dan kafilah membawa lebih dari sekadar barang dagangan. Mereka membawa berita. Cerita. Ide.`,
  `Di setiap perhentian\u2014di setiap oase dan pasar\u2014para pedagang bertukar tidak hanya komoditas tetapi juga pemikiran. Orang yang berdagang ke Syam mendengar tentang agama Kristen yang dipeluk kekaisaran besar di sana. Yang berdagang ke Iraq mendengar tentang agama api yang dipeluk kekaisaran di timur. Yang tinggal di Yaman mendengar tentang orang-orang Yahudi yang telah bermukim di sana selama berabad-abad. Jazirah Arab bukan tanah yang kosong dari ide. Ia adalah tanah yang menunggu ide mana yang akan mengakar.`,
  `Perdagangan inilah yang mengangkat Makkah dari sekadar lembah gersang menjadi pusat ekonomi dan spiritual. Makkah terletak di persimpangan dua jalur perdagangan utama: jalur utara-selatan dari Yaman ke Syam, dan jalur timur-barat dari pantai Laut Merah ke Iraq.`,
  `Suku Quraisy, yang menguasai Makkah, mengerti betul nilai posisi ini. Mereka mengorganisir kafilah musiman\u2014kafilah musim dingin ke Yaman dan kafilah musim panas ke Syam. Kedua perjalanan ini bukan sekadar ekspedisi dagang. Ia adalah institusi yang menghidupkan seluruh ekonomi Makkah dan memberi mereka kekayaan, pengaruh, dan kedudukan yang tidak dimiliki suku Arab lainnya.`,
  `Tetapi di balik kemakmuran kafilah dan keagungan Ka'bah, ada retakan-retakan besar yang tidak bisa disembunyikan oleh kekayaan.`,
  `Sistem sosial Arab sebelum Islam sangat tidak setara. Laki-laki memiliki kekuasaan hampir mutlak atas perempuan. Seorang ayah bisa membenamkan bayi perempuannya hidup-hidup ke dalam pasir\u2014tanpa ada yang berani menghentikannya. Perempuan tidak punya hak waris. Tidak punya hak atas harta sendiri. Bisa diwariskan seperti barang ketika suaminya meninggal.`,
  `Perbudakan dipraktikkan secara luas. Para budak\u2014yang kebanyakan berasal dari Afrika, wilayah perbatasan, atau tawanan perang antarsuku\u2014tidak punya hak apa pun. Mereka adalah harta yang bisa diperjualbelikan.`,
  `Dan yang paling mendasar: tidak ada satu pun kerangka moral yang diterima secara universal oleh seluruh suku Arab. Setiap suku punya dewa-dewi dan tradisi keagamaan sendiri. Ka'bah di Makkah, meskipun menjadi pusat ziarah, berisi tidak kurang dari 360 berhala\u2014satu untuk hampir setiap hari dalam setahun.`,
  `Orang menyembah berhala karena tradisi nenek moyang, bukan karena pemahaman mendalam tentang tuhan-tuhan itu. Di antara mereka ada yang masih memegang sisa-sisa ajaran Ibrahim dan Ismail\u2014keyakinan bahwa hanya ada satu Tuhan\u2014tapi ajaran itu sudah terdistorsi oleh berabad-abad penyimpangan. Ada pula yang sama sekali tidak peduli dengan urusan agama. Bagi mereka, kematian adalah akhir dari segalanya.`,
];

const renungan = [
  `Di dunia seperti itu, seorang anak perempuan bisa kehilangan hak hidupnya bahkan sebelum sempat mengenal dunia. Perang bisa diwariskan dari ayah kepada anak. Kebenaran bukan milik semua orang\u2014ia milik siapa yang paling kuat memaksakannya.`,
  `Ini dunia tanpa cahaya. Bukan dunia tanpa orang baik. Ada orang-orang yang jujur, dermawan, dan berhati mulia di kalangan orang Arab pra-Islam. Tetapi kebaikan mereka bersifat personal, tidak sistemik.`,
  `Seorang individu bisa menolak membenamkan bayinya. Tetapi ia tidak bisa menghentikan seluruh masyarakat melakukannya. Seorang pemimpin suku bisa menghentikan satu perang. Tetapi ia tidak bisa menghentikan perang antarsuku itu sendiri.`,
  `Kebaikan bergantung pada individu, bukan pada sistem. Dan ketika individu itu tiada, kebaikan pun ikut lenyap.`,
  `Di dunia seperti inilah, dalam dua puluh satu tahun setelah seekor gajah besar bernama Abrahah mencoba menghancurkan Ka'bah dan gagal\u2014sebuah peristiwa yang masih segar dalam ingatan setiap penduduk Makkah\u2014seorang anak akan lahir. Anak yang akan membawa cahaya ke tanah yang telah lama gelap.`,
  `Tetapi sebelum kita sampai ke sana, kita harus memahami kota tempat ia akan lahir. Kota di lembah yang gersang. Kota yang bernama Makkah.`,
];

const lanjutkanPerjalanan = [
  `Langkah kaki pertama perjalanan ini telah dimulai. Kita telah berdiri di hamparan Jazirah Arab dan merasakan angin gurun di kulit kita. Kita telah melihat bagaimana tanah yang keras ini membentuk masyarakat yang keras, bagaimana jalur perdagangan menghubungkan dunia yang terpencil, dan bagaimana kegelapan meresap ke setiap celah kehidupan.`,
  `Tetapi Jazirah Arab adalah panggung yang luas, dan cerita kita tidak berlangsung di mana-mana. Cerita ini berpusat di satu titik\u2014sebuah lembah di antara bukit-bukit batu yang gundul, di mana sebuah bangunan kubus berdiri sudah sejak ribuan tahun sebelumnya, dikelilingi oleh berhala-berhala yang tidak bisa berbicara dan tidak bisa menolong.`,
  `Bab selanjutnya: Makkah\u2014Kota di Lembah Gersang.`,
];

const catatan = [
  { label: "Luas Jazirah Arab", value: "Sekitar 3,2 juta km\u00B2, terletak di persimpangan Asia, Afrika, dan Eropa" },
  { label: "Hamada", value: "Istilah geografi untuk gurun batu dan kerikil, berbeda dari gurun pasir (erg)" },
  { label: "Rub' al-Khali", value: "Gurun pasir terluas di Jazirah Arab, terletak di selatan. Nama lain: Empty Quarter" },
  { label: "Sayl", value: "Istilah Arab untuk banjir bandang di wadi, terjadi saat hujan deras di tanah kering" },
  { label: "Angin Shamal", value: "Angin utara yang membawa badai debu, umum terjadi di Jazirah Arab" },
  { label: "Wadi", value: "Lembah sungai kering yang hanya berair saat musim hujan" },
  { label: "'Ashabiyyah", value: "Kesetiaan kesukuan\u2014ikatan sosial terkuat dalam masyarakat Arab pra-Islam" },
  { label: "Wa'd al-banat", value: "Praktik pembenaman bayi perempuan hidup-hidup yang dilakukan sebagian suku Arab pra-Islam" },
  { label: "Kerajaan di perbatasan", value: "Ghassanid (sekutu Byzantium, Kristen) di barat laut; Lakhmid (sekutu Sassanid, di Hirah) di timur laut" },
  { label: "Kafilah Quraisy", value: "Disebut dalam Al-Qur'an Surat Quraisy (106): rihlat al-syita' wa al-saif (perjalanan musim dingin dan musim panas)" },
];

const referensi = [
  `1. Al-Qur'an, Surat Quraisy (106): 1-4 \u2014 Referensi kafilah musim dingin dan musim panas.`,
  `2. Al-Qur'an, Surat Al-Fil (105): 1-5 \u2014 Peristiwa tentara gajah Abrahah.`,
  `3. Ibn Hisham, Al-Sirah al-Nabawiyyah \u2014 Deskripsi kondisi Arab pra-Islam dan kehidupan suku-suku.`,
  `4. Al-Tabari, Tarikh al-Rusul wa al-Muluk \u2014 Catatan sejarah tentang jalur perdagangan dan struktur sosial Arab.`,
  `5. Philip K. Hitti, History of the Arabs \u2014 Analisis geografi, perdagangan, dan masyarakat Arab pra-Islam.`,
  `6. Watt, W.M., Muhammad at Mecca \u2014 Kajian konteks sosial dan ekonomi Makkah sebelum Islam.`,
  `7. Al-Bukhari, Sahih \u2014 Hadits tentang praktik wa'd al-banat (pembenaman bayi perempuan) dan kondisi sosial pra-Islam.`,
];

// ── Helper: body paragraph ──
function bodyPara(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    indent: { firstLine: 480 },
    spacing: { line: 360, after: 160 },
    children: [
      new TextRun({
        text,
        font: { ascii: "Georgia", eastAsia: "SimSun" },
        size: 24,
        color: c(P.body),
      }),
    ],
  });
}

// ── Helper: short body paragraph (sub-ritme, no indent) ──
function shortPara(text) {
  return new Paragraph({
    alignment: AlignmentType.JUSTIFIED,
    spacing: { line: 360, after: 160 },
    children: [
      new TextRun({
        text,
        font: { ascii: "Georgia", eastAsia: "SimSun" },
        size: 24,
        color: c(P.body),
      }),
    ],
  });
}

// ── Helper: section heading ──
function sectionHeading(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 480 },
    children: [
      new TextRun({
        text,
        font: { ascii: "Georgia", eastAsia: "SimHei" },
        size: 28,
        bold: true,
        color: c(P.accent),
      }),
    ],
  });
}

// ── Build Document ──

const doc = new Document({
  styles: {
    default: {
      document: {
        run: {
          font: { ascii: "Georgia", eastAsia: "SimSun" },
          size: 24,
          color: c(P.body),
        },
        paragraph: {
          spacing: { line: 360 },
        },
      },
      heading1: {
        run: {
          font: { ascii: "Georgia", eastAsia: "SimHei" },
          size: 36,
          bold: true,
          color: c(P.primary),
        },
        paragraph: {
          spacing: { before: 0, after: 200, line: 360 },
        },
      },
      heading2: {
        run: {
          font: { ascii: "Georgia", eastAsia: "SimHei" },
          size: 28,
          bold: true,
          color: c(P.accent),
        },
        paragraph: {
          spacing: { before: 360, after: 160, line: 312 },
        },
      },
    },
  },
  sections: [
    // ── Cover Section ──
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 0, bottom: 0, left: 0, right: 0 },
        },
      },
      children: [
        new Paragraph({ spacing: { before: 5000 } }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 100 },
          children: [
            new TextRun({
              text: "JEJAK CAHAYA",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 56,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 100, after: 600 },
          children: [
            new TextRun({
              text: "Perpustakaan Digital Kisah Islam",
              font: { ascii: "Georgia", eastAsia: "SimSun" },
              size: 22,
              color: c(P.secondary),
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
              color: c(P.accent),
              size: 20,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 80 },
          children: [
            new TextRun({
              text: "BAB 1",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              color: c(P.secondary),
              characterSpacing: 200,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 200 },
          children: [
            new TextRun({
              text: "Jazirah Arab Sebelum Islam",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 44,
              bold: true,
              color: c(P.primary),
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 600, after: 80 },
          children: [
            new TextRun({
              text: "Fase 0: Dunia Sebelum Islam",
              font: { ascii: "Georgia", eastAsia: "SimSun" },
              size: 20,
              color: c(P.secondary),
              italics: true,
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 1600 },
          children: [
            new TextRun({
              text: "DRAFT V2 REVIEW",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 18,
              color: c(P.accent),
              characterSpacing: 120,
            }),
          ],
        }),
      ],
    },

    // ── Body Section ──
    {
      properties: {
        page: {
          size: { width: 11906, height: 16838 },
          margin: { top: 1440, bottom: 1440, left: 1701, right: 1417 },
          pageNumbers: { start: 1 },
        },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              alignment: AlignmentType.RIGHT,
              children: [
                new TextRun({
                  text: "Jejak Cahaya \u2014 Bab 1: Jazirah Arab Sebelum Islam (V2)",
                  size: 16,
                  color: c(P.secondary),
                  italics: true,
                  font: { ascii: "Georgia", eastAsia: "SimSun" },
                }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              children: [
                new TextRun({
                  children: [PageNumber.CURRENT],
                  size: 18,
                  color: c(P.secondary),
                }),
              ],
            }),
          ],
        }),
      },
      children: [
        // ── Opening Scene ──
        sectionHeading("Opening Scene"),
        ...openingScene.map(t => bodyPara(t)),

        // ── Narasi Sejarah ──
        sectionHeading("Narasi Sejarah"),
        ...narasiSejarah.map(t => bodyPara(t)),

        // ── Konteks ──
        sectionHeading("Konteks"),
        ...konteks.map(t => bodyPara(t)),

        // ── Peristiwa Utama ──
        sectionHeading("Peristiwa Utama"),
        ...peristiwaUtama.map(t => bodyPara(t)),

        // ── Renungan ──
        sectionHeading("Renungan"),
        ...renungan.map(t => bodyPara(t)),

        // ── Lanjutkan Perjalanan ──
        sectionHeading("Lanjutkan Perjalanan"),
        ...lanjutkanPerjalanan.map(t => bodyPara(t)),

        // ── Separator ──
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [
            new TextRun({
              text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
              color: c(P.accent),
              size: 20,
            }),
          ],
        }),

        // ── Catatan (Fakta & Istilah) ──
        sectionHeading("Catatan: Fakta & Istilah"),
        new Paragraph({
          spacing: { line: 312, after: 160 },
          children: [
            new TextRun({
              text: "Fakta dan istilah yang disingkirkan dari narasi agar ritme cerita tetap mengalir. Pembaca bisa merujuk ke bagian ini kapan saja.",
              font: { ascii: "Georgia", eastAsia: "SimSun" },
              size: 20,
              color: c(P.secondary),
              italics: true,
            }),
          ],
        }),
        // Catatan table
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          borders: {
            top: { style: BorderStyle.SINGLE, size: 1, color: c(P.catatanBorder) },
            bottom: { style: BorderStyle.SINGLE, size: 1, color: c(P.catatanBorder) },
            left: { style: BorderStyle.NONE },
            right: { style: BorderStyle.NONE },
            insideHorizontal: { style: BorderStyle.SINGLE, size: 1, color: "E0D8C8" },
            insideVertical: { style: BorderStyle.NONE },
          },
          rows: catatan.map((item) =>
            new TableRow({
              cantSplit: true,
              children: [
                new TableCell({
                  width: { size: 30, type: WidthType.PERCENTAGE },
                  shading: { type: ShadingType.CLEAR, fill: c(P.catatanBg) },
                  margins: { top: 60, bottom: 60, left: 120, right: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: item.label,
                          font: { ascii: "Georgia", eastAsia: "SimSun" },
                          size: 20,
                          bold: true,
                          color: c(P.accent),
                        }),
                      ],
                    }),
                  ],
                }),
                new TableCell({
                  width: { size: 70, type: WidthType.PERCENTAGE },
                  margins: { top: 60, bottom: 60, left: 120, right: 80 },
                  children: [
                    new Paragraph({
                      children: [
                        new TextRun({
                          text: item.value,
                          font: { ascii: "Georgia", eastAsia: "SimSun" },
                          size: 20,
                          color: c(P.body),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            })
          ),
        }),

        // ── Separator ──
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 400 },
          children: [
            new TextRun({
              text: "\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500",
              color: c(P.accent),
              size: 20,
            }),
          ],
        }),

        // ── Referensi ──
        sectionHeading("Referensi"),
        ...referensi.map(text =>
          new Paragraph({
            spacing: { line: 312, after: 80 },
            children: [
              new TextRun({
                text,
                font: { ascii: "Georgia", eastAsia: "SimSun" },
                size: 20,
                color: c(P.secondary),
              }),
            ],
          })
        ),
      ],
    },
  ],
});

// ── Export ──
const OUTPUT = "/home/z/my-project/download/Bab-1-Jazirah-Arab-Sebelum-Islam-V2-REVIEW.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Generated:", OUTPUT);

  // Word count estimate (narrative only, not catatan/referensi)
  const allText = [
    ...openingScene, ...narasiSejarah, ...konteks,
    ...peristiwaUtama, ...renungan, ...lanjutkanPerjalanan
  ].join(" ");
  const wordCount = allText.split(/\s+/).length;
  console.log("Narrative word count:", wordCount);

  const allCatatan = catatan.map(c => c.label + " " + c.value).join(" ");
  const catatanCount = allCatatan.split(/\s+/).length;
  console.log("Catatan word count:", catatanCount);
  console.log("Total word count:", wordCount + catatanCount);
});
