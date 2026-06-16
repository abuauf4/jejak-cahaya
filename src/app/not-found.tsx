import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan — Jejak Cahaya',
};

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FBF8F1] dark:bg-[#080B16]">
      <div className="text-center px-5">
        <h1 className="font-serif text-3xl font-bold text-[#2C2418] dark:text-[#F0EBE0] mb-3">
          Halaman tidak ditemukan
        </h1>
        <p className="text-[#5A4D3E] dark:text-[#C4B59A] mb-8">
          Halaman yang kamu cari tidak ada dalam perjalanan ini.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#96751A] text-white font-medium hover:bg-[#8B6914] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
