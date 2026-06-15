// Life phases of Prophet Muhammad ﷺ
export interface Phase {
  id: string;
  name: string;
  period: string;
  yearStart: number;
  yearEnd: number;
  description: string;
  color: string;
}

export const phases: Phase[] = [
  {
    id: "kelahiran",
    name: "Kelahiran & Masa Kecil",
    period: "570–576 M",
    yearStart: 570,
    yearEnd: 576,
    description: "Kelahiran Nabi Muhammad ﷺ di Makkah, masa penyusuan di Bani Sa'ad, dan kehilangan kedua orang tua.",
    color: "#8B6914",
  },
  {
    id: "pemuda",
    name: "Masa Pemuda",
    period: "576–609 M",
    yearStart: 576,
    yearEnd: 609,
    description: "Bertumbuh di Makkah, dikenal sebagai Al-Amin, berdagang, dan menikah dengan Khadijah.",
    color: "#D4A843",
  },
  {
    id: "kenabian",
    name: "Masa Kenabian Awal",
    period: "610–613 M",
    yearStart: 610,
    yearEnd: 613,
    description: "Menerima wahyu pertama di Gua Hira, dakwah secara sembunyi-sembunyi, dan pengikut awal.",
    color: "#F5D78E",
  },
  {
    id: "dakwah-terang",
    name: "Dakwah Terang-terangan",
    period: "613–620 M",
    yearStart: 613,
    yearEnd: 620,
    description: "Dakwah secara terbuka, perlawanan Quraisy, boikot Bani Hasyim, dan Tahun Kesedihan.",
    color: "#C4B59A",
  },
  {
    id: "hijrah",
    name: "Hijrah & Pembangunan Madinah",
    period: "620–624 M",
    yearStart: 620,
    yearEnd: 624,
    description: "Perjalanan dari Makkah ke Madinah, membangun masyarakat baru, dan Piagam Madinah.",
    color: "#D4A843",
  },
  {
    id: "pertahanan",
    name: "Masa Pertahanan",
    period: "624–628 M",
    yearStart: 624,
    yearEnd: 628,
    description: "Perang Badar, Uhud, Khandaq, dan tantangan mempertahankan komunitas Muslim.",
    color: "#8B6914",
  },
  {
    id: "perdamaian",
    name: "Perdamaian & Kemenangan",
    period: "628–632 M",
    yearStart: 628,
    yearEnd: 632,
    description: "Perjanjian Hudaibiyah, Fathu Makkah, Haji Wada', dan wafatnya Rasulullah ﷺ.",
    color: "#F5D78E",
  },
];
