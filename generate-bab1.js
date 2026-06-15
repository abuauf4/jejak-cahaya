const {
  Document, Packer, Paragraph, TextRun, Header, Footer, PageNumber,
  AlignmentType, HeadingLevel, BorderStyle, PageBreak
} = require("docx");
const fs = require("fs");

// ── Palette: warm literary tone for Islamic storytelling ──
const P = {
  primary: "#2C2418",
  body: "#2C2418",
  secondary: "#5A4D3E",
  accent: "#96751A",
  surface: "#FBF8F1",
};

const c = (hex) => hex.replace("#", "");

// ── Section content ──

const openingScene = [
  `Angin gurun berhembus pelan dari arah selatan, membawa debu merah yang menempel di setiap permukaan. Matahari menggantung tepat di atas kepala, tanpa ampun, membakar tanah yang retak-retak sejauh mata memandang. Tidak ada satu titik pun bayangan di hamparan ini. Hanya pasir, batu, dan keheningan yang terasa hidup\u2014keheningan yang dipenuhi oleh suara-suara kecil yang tidak terdengar oleh telinga yang tidak terbiasa.`,
  `Seorang pengelana akan membutuhkan berhari-hari menyeberangi hamparan ini sebelum menemukan setetes air. Dan bila ia menemukannya, air itu bukan milik siapa-siapa\u2014ia menjadi milik siapa yang paling kuat mempertahankannya. Di tanah ini, kekuatan adalah segalanya. Tanpa kekuatan, tidak ada tempat berlindung, tidak ada air, tidak ada kehidupan.`,
  `Ini bukan tanah yang memberi. Ini tanah yang menguji. Dan dari tanah yang menguji inilah, sebuah cahaya akan segera lahir\u2014cahaya yang akan mengubah segalanya. Tetapi sebelum cahaya itu datang, ada sebuah dunia yang harus dipahami terlebih dahulu. Dunia tanpa cahaya.`
];

const historicalNarrative = [
  `Jazirah Arab\u2014sebentang tanah seluas sekitar 3,2 juta kilometer persegi yang terletak di persimpangan tiga benua: Asia, Afrika, dan Eropa\u2014adalah wilayah yang hampir seluruhnya ditutupi gurun. Bukan gurun dalam bayangan film tentang oase dan pohon kurma yang rindang. Sebagian besar Jazirah Arab adalah hamparan batu dan kerikil yang disebut hamada, bukan pasir halus yang bergelombang seperti di Sahara. Padang pasir pasir yang membentang\u2014seperti Rub' al-Khali, Gua Kosong di selatan\u2014memang ada, tetapi ia bukan wajah dominan Jazirah. Wajah dominanya adalah tanah keras, gersang, yang menolak hampir semua bentuk kehidupan kecuali yang paling tangguh. Gunung-gunung berbatu menjulang di sepanjang sisi barat Jazirah, membentuk jalur pegunungan Hijaz yang memisahkan dataran tinggi dari pantai Laut Merah. Di sisi timur, tanah menurun perlahan menuju Teluk Persia, tetapi kesuburan tidak mengikuti kemiringan itu\u2014tanah tetap gersang hingga ke pantai.`,
  `Iklim Jazirah Arab adalah musuh terbesar penghuninya. Suhu di siang hari bisa mendekati 50 derajat Celcius, sementara malamnya bisa turun mendekati titik beku. Hujan hampir tidak pernah datang\u2014beberapa wilayah tidak menerima setetes pun selama bertahun-tahun. Bila hujan turun, ia bukan berkah tetapi bencana: air mengalir deras di tanah yang keras dan kering, membentuk banjir bandang yang disebut sayl, yang menyapu segala sesuatu di lintasannya. Tanah ini tidak menyerap air; ia menolak air, lalu memuntahkannya kembali dalam bentuk kehancuran. Angin shamal yang bertiup dari utara bisa menghembuskan badai pasir yang mengurangi jarak pandang menjadi tidak lebih dari beberapa meter, menenggelamkan seluruh kafilah dalam lautan debu kuning selama berhari-hari.`,
  `Di antara hamparan gurun yang tampak tanpa harapan ini, ada celah-celah kehidupan. Wadi-wadi\u2014lembah sungai kering yang hanya berair saat musim hujan\u2014menjadi urat nadi kehidupan yang sangat diperebutkan. Di beberapa wadi, air tanah cukup dekat dengan permukaan sehingga sumur bisa digali, dan di situlah pemukiman kecil tumbuh. Oase-oase seperti Yatsrib (yang kelak bernama Madinah), Khaybar, dan Fadak menjadi pulau-pulau hijau di lautan kegersangan. Tetapi oase ini langka, dan jarak antar satu oase dengan oase berikutnya bisa mencapai ratusan kilometer melewati tanah yang tidak bersahabat. Di selatan, Yaman memiliki kondisi berbeda: curah hujan yang lebih tinggi berkat angin musim dari Samudera Hindia membuat wilayah ini lebih subur, memungkinkan pertanian dan peradaban yang lebih mapan. Kerajaan Saba' di Yaman, dengan bendungan Ma'rib yang legendaris, pernah menjadi salah satu peradaban terkaya di dunia kuno. Tetapi itu selatan\u2014jauh dari pusat cerita kita.`
];

const context = [
  `Kondisi geografis yang keras ini membentuk masyarakat yang keras pula. Bangsa Arab sebelum Islam bukanlah satu bangsa dalam pengertian modern\u2014mereka adalah kumpulan suku-suku yang masing-masing memiliki identitas, tradisi, dan kepentingan sendiri. Suku Quraisy di Makkah memiliki kehidupan yang sangat berbeda dari suku-suku Badui yang mengembara di gurun. Suku-suku di Yaman di selatan, yang hidup di tanah lebih subur berkat curah hujan lebih tinggi, memiliki peradaban yang lebih mapan dibandingkan saudara-saudara mereka di utara. Di satu sisi ada suku-suku perkotaan yang telah menetap dan membangun kehidupan bernegara kecil\u2014seperti kerajaan-kerajaan di Yaman dan kerajaan Ghassanid serta Lakhmid di perbatasan. Di sisi lain ada suku-suku Badui yang hidup berpindah-pindah, yang bagi mereka garis hidup-mati ditentukan oleh hujan dan padang rumput. Kesatuan mereka bukan negara, bukan kerajaan\u2014kesatuan mereka adalah 'ashabiyyah, kesetiaan kedaerahan dan kesukuan yang mengikat seseorang pada kelompoknya secara mutlak.`,
  `Kehidupan suku Badui\u2014suku-suku pengembara yang hidup di tenda-tenda dari bulu kambing dan berpindah-pindah mengikuti padang rumput dan sumber air\u2014adalah kehidupan yang penuh ketidakpastian. Mereka bergantung pada kambing, unta, dan sedikit kurma yang tumbuh di dekat sumur-sumur musiman. Seekor unta bisa menjadi perbedaan antara hidup dan mati: ia membawa air, memberikan susu, mengangkut barang, dan bila perlu, disembelih untuk dagingnya. Karena itu, unta menjadi ukuran kekayaan dan status sosial. Suku yang memiliki kawanan unta besar adalah suku yang kuat, dan suku yang kuat adalah suku yang dihormati\u2014atau setidaknya, ditakuti.`,
  `Hukum di gurun bukan hukum negara, karena tidak ada negara. Hukumnya adalah hukum balas dendam: darah dibayar darah, nyawa dibayar nyawa. Bila seseorang dari suku A dibunuh oleh orang dari suku B, maka seluruh suku A berkewajiban membalas kematian itu kepada siapa pun dari suku B\u2014tidak peduli apakah orang yang dibunuh itu pelakunya atau tidak. Lingkaran balas dendam ini bisa berlangsung puluhan tahun, menghabiskan generasi demi generasi, dan tidak ada otoritas yang berwenang menghentikannya. Hanya kekuatanlah yang bisa menghentikan kekuatan, dan hanya kesetiaan sukulah yang bisa melindungi seseorang dari pembalasan di luar sana.`
];

const mainEvent = [
  `Namun Jazirah Arab bukanlah dunia yang sepenuhnya terisolasi. Posisinya yang strategis di persimpangan benua menjadikannya jalur perdagangan yang vital antara dunia Timur dan Barat. Kafilah-kafilah dagang\u2014rombongan unta yang bisa mencapai ratusan ekor\u2014berjalan dari selatan ke utara dan sebaliknya, membawa barang-barang berharga: kemenyan dan rempah-rempah dari Yaman, emas dan gading dari Afrika, kain sutra dan rempah dari Timur Jauh, serta minyak zaitun dan anggur dari Syam (Suriah). Jalur perdagangan ini bukan sekadar jalan setapak\u2014ia adalah nadi ekonomi yang membuat suku-suku Arab terhubung dengan peradaban-peradaban besar di sekitarnya: Byzantium di barat laut, Sassanid Persia di timur laut, dan Kerajaan Aksum di seberang Laut Merah.`,
  `Kafilah-kafilah ini juga membawa lebih dari sekadar barang dagangan. Mereka membawa berita, cerita, ide, dan pengaruh budaya dari satu peradaban ke peradaban lain. Di setiap perhentian\u2014di setiap oase dan pasar\u2014para pedagang bertukar tidak hanya komoditas tetapi juga pemikiran. Orang-orang Arab yang berdagang ke Syam mendengar tentang Kekaisaran Byzantium yang menganut Kekristenan. Yang berdagang ke Hirah dan Iraq mendengar tentang Kekaisaran Sassanid yang menganut Zoroastrianisme. Yang tinggal di Yaman mendengar tentang orang-orang Yahudi yang telah bermukim di sana selama berabad-abad. Jazirah Arab bukanlah tanah yang kosong dari ide\u2014ia adalah tanah yang menunggu ide mana yang akan mengakar.`,
  `Perdagangan inilah yang mengangkat Makkah dari sekadar lembah gersang menjadi pusat ekonomi dan spiritual. Makkah terletak di persimpangan dua jalur perdagangan utama: jalur utara-selatan dari Yaman ke Syam, dan jalur timur-barat dari pantai Laut Merah ke Iraq. Suku Quraisy, yang menguasai Makkah, mengerti betul nilai strategis posisi ini. Mereka mengorganisir kafilah musiman\u2014kafilah musim dingin ke Yaman dan kafilah musim panas ke Syam\u2014sebagaimana disebutkan dalam Al-Qur'an surat Quraisy. Kedua perjalanan ini bukan sekadar ekspedisi dagang; ia adalah institusi yang menghidupkan seluruh ekonomi Makkah dan memberi mereka kekayaan, pengaruh, dan kedudukan yang tidak dimiliki suku Arab lainnya.`,
  `Tetapi di balik kemakmuran kafilah dan keagungan Ka'bah, ada retakan-retakan besar dalam masyarakat Arab yang tidak bisa disembunyikan oleh kekayaan. Sistem sosial Arab sebelum Islam adalah sistem yang sangat tidak setara. Laki-laki memiliki kekuasaan hampir mutlak atas perempuan. Seorang ayah bisa membenamkan bayi perempuannya hidup-hidup ke dalam pasir\u2014praktik yang dikenal sebagai wa'd al-banat\u2014tanpa ada yang berani menghentikannya. Perempuan tidak memiliki hak waris, tidak memiliki hak atas harta sendiri, dan bisa diwariskan seperti barang ketika suaminya meninggal. Perbudakan dipraktikkan secara luas, dan para budak\u2014yang kebanyakan berasal dari Afrika, wilayah perbatasan, atau tawanan perang antarsuku\u2014tidak memiliki hak apa pun.`,
  `Yang lebih mendasar lagi, tidak ada satu pun kerangka moral yang diterima secara universal oleh seluruh suku Arab. Setiap suku memiliki dewa-dewi dan tradisi keagamaan sendiri. Ka'bah di Makkah, meskipun menjadi pusat ziarah, berisi tidak kurang dari 360 berhala\u2014satu untuk hampir setiap hari dalam setahun. Agama Arab pra-Islam adalah agama yang sangat lokal dan pragmatis: orang menyembah berhala karena tradisi nenek moyang, bukan karena pemahaman mendalam tentang tuhan-tuhan itu. Di antara mereka ada yang masih memegang sisa-sisa ajaran Ibrahim dan Ismail\u2014monoteisme yang telah terdistorsi oleh berabad-abad penyimpangan\u2014dan ada pula yang sama sekali tidak peduli dengan urusan agama, menganggap kematian adalah akhir dari segalanya.`
];

const reflection = [
  `Bayangkan sebuah dunia di mana kekuasaan berada di tangan yang paling kuat, bukan yang paling adil. Di mana hak hidup seseorang ditentukan oleh suku tempat ia lahir, bukan oleh kemanusiaannya. Di mana seorang bayi bisa dibunuh hanya karena ia lahir perempuan, dan tidak ada hukum yang melindunginya. Di mana perang bisa meledak karena satu insiden dan berlangsung selama puluhan tahun karena tidak ada mekanisme perdamaian. Di mana kebenaran bukan milik semua orang tetapi milik siapa yang paling kuat memaksakannya.`,
  `Itulah dunia tanpa cahaya. Bukan dunia tanpa orang baik\u2014ada orang-orang yang jujur, dermawan, dan berhati mulia di kalangan orang Arab pra-Islam. Tetapi kebaikan mereka bersifat personal, tidak sistemik. Seorang individu bisa menolak membenamkan bayinya, tetapi ia tidak bisa menghentikan seluruh masyarakat melakukannya. Seorang pemimpin suku bisa menghentikan satu perang, tetapi ia tidak bisa menghentikan perang antarsuku itu sendiri. Kebaikan bergantung pada individu, bukan pada sistem, dan ketika individu itu tiada, kebaikan pun ikut lenyap.`,
  `Di dunia seperti inilah, dalam dua puluh satu tahun setelah seekor gajah besar bernama Abrahah mencoba menghancurkan Ka'bah dan gagal\u2014sebuah peristiwa yang masih segar dalam ingatan setiap penduduk Makkah\u2014seorang anak akan lahir. Anak yang akan membawa cahaya ke tanah yang telah lama gelap. Tetapi sebelum kita sampai ke sana, kita harus memahami kota tempat ia akan lahir. Kota di lembah yang gersang. Kota yang bernama Makkah.`
];

const continueJourney = [
  `Langkah kaki pertama perjalanan ini telah dimulai. Kita telah berdiri di hamparan Jazirah Arab dan merasakan angin gurun di kulit kita. Kita telah melihat bagaimana tanah yang keras ini membentuk masyarakat yang keras, bagaimana jalur perdagangan menghubungkan dunia yang terpencil, dan bagaimana kegelapan meresap ke setiap celah kehidupan.`,
  `Tetapi Jazirah Arab adalah panggung yang luas, dan cerita kita tidak berlangsung di mana-mana. Cerita ini berpusat di satu titik\u2014sebuah lembah di antara bukit-bukit batu yang gundul, di mana sebuah bangunan kubus berdiri sudah sejak ribuan tahun sebelumnya, dikelilingi oleh berhala-berhala yang tidak bisa berbicara dan tidak bisa menolong.`,
  `Bab selanjutnya: Makkah\u2014Kota di Lembah Gersang.`
];

const references = [
  `1. Al-Qur'an, Surat Quraisy (106): 1-4 \u2014 Referensi kafilah musim dingin dan musim panas.`,
  `2. Al-Qur'an, Surat Al-Fil (105): 1-5 \u2014 Peristiwa tentara gajah Abrahah.`,
  `3. Ibn Hisham, Al-Sirah al-Nabawiyyah \u2014 Deskripsi kondisi Arab pra-Islam dan kehidupan suku-suku.`,
  `4. Al-Tabari, Tarikh al-Rusul wa al-Muluk \u2014 Catatan sejarah tentang jalur perdagangan dan struktur sosial Arab.`,
  `5. Philip K. Hitti, History of the Arabs \u2014 Analisis geografi, perdagangan, dan masyarakat Arab pra-Islam.`,
  `6. Watt, W.M., Muhammad at Mecca \u2014 Kajian konteks sosial dan ekonomi Makkah sebelum Islam.`,
  `7. Al-Bukhari, Sahih \u2014 Hadits tentang praktik wa'd al-banat (pembenaman bayi perempuan) dan kondisi sosial pra-Islam.`
];

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
          spacing: { line: 360 }, // 1.5x for readability in literary content
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
              text: "DRAFT REVIEW",
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
                  text: "Jejak Cahaya \u2014 Bab 1: Jazirah Arab Sebelum Islam",
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
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: "Opening Scene",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...openingScene.map((text) =>
          new Paragraph({
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
          })
        ),

        // ── Historical Narrative ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [
            new TextRun({
              text: "Narasi Sejarah",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...historicalNarrative.map((text) =>
          new Paragraph({
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
          })
        ),

        // ── Context ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [
            new TextRun({
              text: "Konteks",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...context.map((text) =>
          new Paragraph({
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
          })
        ),

        // ── Main Event ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [
            new TextRun({
              text: "Peristiwa Utama",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...mainEvent.map((text) =>
          new Paragraph({
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
          })
        ),

        // ── Reflection ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [
            new TextRun({
              text: "Renungan",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...reflection.map((text) =>
          new Paragraph({
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
          })
        ),

        // ── Continue Journey ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 480 },
          children: [
            new TextRun({
              text: "Lanjutkan Perjalanan",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...continueJourney.map((text) =>
          new Paragraph({
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
          })
        ),

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

        // ── References ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [
            new TextRun({
              text: "Referensi",
              font: { ascii: "Georgia", eastAsia: "SimHei" },
              size: 28,
              bold: true,
              color: c(P.accent),
            }),
          ],
        }),
        ...references.map((text) =>
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
const OUTPUT = "/home/z/my-project/download/Bab-1-Jazirah-Arab-Sebelum-Islam-REVIEW.docx";
Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync(OUTPUT, buffer);
  console.log("Generated:", OUTPUT);

  // Word count estimate
  const allText = [
    ...openingScene, ...historicalNarrative, ...context,
    ...mainEvent, ...reflection, ...continueJourney
  ].join(" ");
  const wordCount = allText.split(/\s+/).length;
  console.log("Estimated word count:", wordCount);
});
