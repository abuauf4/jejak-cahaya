import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Jejak Cahaya — Menelusuri Jejak Kehidupan Rasulullah ﷺ",
  description:
    "Perpustakaan digital kisah Islam. Ikuti perjalanan hidup Rasulullah ﷺ melalui kisah, timeline, lokasi, dan referensi terpercaya.",
  keywords: [
    "Sirah Nabawiyah",
    "Rasulullah",
    "Nabi Muhammad",
    "Timeline Sirah",
    "Jejak Cahaya",
    "Kisah Islam",
    "Sejarah Islam",
  ],
  authors: [{ name: "Jejak Cahaya" }],
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "Jejak Cahaya — Menelusuri Jejak Kehidupan Rasulullah ﷺ",
    description:
      "Perpustakaan digital kisah Islam — ikuti perjalanan hidup Rasulullah ﷺ melalui kisah, timeline, lokasi, dan referensi terpercaya.",
    type: "website",
    siteName: "Jejak Cahaya",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
