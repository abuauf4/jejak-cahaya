'use client';

import { Moon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-[#080B16] pt-8 pb-6">
      {/* Gold line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Moon className="w-4 h-4 text-[#D4A843]" />
          <span className="font-serif-display text-sm font-bold text-gradient-gold">
            Jejak Cahaya™
          </span>
        </div>
        <p className="text-xs text-[#8B8070]/60 mb-4">
          Platform Pengetahuan Islam
        </p>
        <p className="text-[10px] text-[#8B8070]/30">
          Konten bersifat demo dan sedang menunggu proses review ilmiah
        </p>
      </div>
    </footer>
  );
}
