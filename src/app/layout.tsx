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
    icon: "/favicon.ico",
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
        width: 1536,
        height: 1024,
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
