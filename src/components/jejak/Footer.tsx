'use client';

import { useNavigation } from '@/lib/store';

export default function Footer() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <footer className={isLight ? 'bg-[#FBF8F1] py-8' : 'bg-[#080B16] py-8'}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className={`text-[11px] ${isLight ? 'text-[#9C8E7C]/25' : 'text-[#8B8070]/30'}`}>
          Jejak Cahaya — Konten bersifat demo dan menunggu proses review ilmiah
        </p>
      </div>
    </footer>
  );
}
