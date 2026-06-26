import type { Metadata, Viewport } from "next";
import { Inter, Playfair_Display, Lora } from "next/font/google";
import "./globals.css";
import PWARegister from "@/components/PWARegister";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

// Body reader font — Lora (warm modern serif, low stroke contrast untuk
// long-form reading). Playfair Display tetap dipakai untuk headlines
// dan closing punchline via .font-serif-display / .reader-closing.
const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jejakcahaya.my.id"),
  title: {
    default: "Jejak Cahaya — Platform Pengetahuan Islam",
    template: "%s — Jejak Cahaya",
  },
  description:
    "Jejak Cahaya — perpustakaan digital kisah Islam. Menelusuri kehidupan Rasulullah ﷺ dari dunia sebelum Islam hingga cahaya yang menyeluruh. Sirah nabawiyah lengkap dengan referensi.",
  applicationName: "Jejak Cahaya",
  authors: [{ name: "Jejak Cahaya", url: "https://jejakcahaya.my.id" }],
  creator: "Jejak Cahaya",
  publisher: "Jejak Cahaya",
  keywords: [
    "Sirah Nabawiyah",
    "Rasulullah",
    "Nabi Muhammad ﷺ",
    "Sejarah Islam",
    "Kisah Nabi Muhammad",
    "Timeline Sirah",
    "Jejak Cahaya",
    "Biografi Rasulullah",
    "Perjalanan Hijrah",
    "Pengetahuan Islam",
  ],
  category: "education",
  alternates: {
    canonical: "https://jejakcahaya.my.id",
  },
  icons: {
    icon: [
      { url: "/favicon.webp", type: "image/webp" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Jejak Cahaya",
    statusBarStyle: "default",
  },
  openGraph: {
    title: "Jejak Cahaya — Perpustakaan Digital Kisah Islam",
    description:
      "Menelusuri kehidupan Rasulullah ﷺ dari dunia sebelum Islam hingga cahaya yang menyeluruh. Sirah nabawiyah lengkap dengan referensi.",
    type: "website",
    url: "https://jejakcahaya.my.id",
    siteName: "Jejak Cahaya",
    locale: "id_ID",
    images: [
      {
        url: "/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Jejak Cahaya — Perpustakaan Digital Kisah Islam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jejak Cahaya — Perpustakaan Digital Kisah Islam",
    description:
      "Menelusuri kehidupan Rasulullah ﷺ dari dunia sebelum Islam hingga cahaya yang menyeluruh.",
    images: [
      {
        url: "/images/og-home.png",
        alt: "Jejak Cahaya — Perpustakaan Digital Kisah Islam",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF8F1" },
    { media: "(prefers-color-scheme: dark)", color: "#080B16" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // ── JSON-LD: WebSite + Organization (root schema for sitelinks search box) ──
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://jejakcahaya.my.id/#website",
    url: "https://jejakcahaya.my.id",
    name: "Jejak Cahaya",
    description: "Perpustakaan Digital Kisah Islam — menelusuri kehidupan Rasulullah ﷺ",
    inLanguage: "id-ID",
    publisher: {
      "@id": "https://jejakcahaya.my.id/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://jejakcahaya.my.id/cari?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://jejakcahaya.my.id/#organization",
    name: "Jejak Cahaya",
    url: "https://jejakcahaya.my.id",
    logo: {
      "@type": "ImageObject",
      url: "https://jejakcahaya.my.id/icon-512.png",
      width: 512,
      height: 512,
    },
    description: "Perpustakaan Digital Kisah Islam — sirah nabawiyah lengkap dengan referensi.",
    sameAs: [],
  };

  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
