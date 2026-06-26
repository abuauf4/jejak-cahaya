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
  title: "Jejak Cahaya — Platform Pengetahuan Islam",
  description:
    "Platform pengetahuan Islam. Menelusuri jejak kehidupan Rasulullah SAW melalui perjalanan yang mengalir — dari dunia sebelum Islam hingga cahaya yang menyeluruh.",
  keywords: [
    "Sirah Nabawiyah",
    "Rasulullah",
    "Nabi Muhammad",
    "Timeline Sirah",
    "Jejak Cahaya",
    "Kisah Islam",
    "Sejarah Islam",
    "Pengetahuan Islam",
  ],
  authors: [{ name: "Jejak Cahaya" }],
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
    title: "Jejak Cahaya — Platform Pengetahuan Islam",
    description:
      "Platform pengetahuan Islam — menelusuri jejak kehidupan Rasulullah SAW melalui perjalanan yang mengalir.",
    type: "website",
    siteName: "Jejak Cahaya",
    images: [
      {
        url: "/images/og-home.png",
        width: 1200,
        height: 630,
        alt: "Jejak Cahaya — Platform Pengetahuan Islam",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jejak Cahaya — Platform Pengetahuan Islam",
    description:
      "Platform pengetahuan Islam — menelusuri jejak kehidupan Rasulullah SAW melalui perjalanan yang mengalir.",
    images: ["/images/og-home.png"],
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
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${lora.variable} antialiased`}
      >
        {children}
        <PWARegister />
      </body>
    </html>
  );
}
