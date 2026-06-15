'use client';

import { Moon } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Decorative gold line at top */}
      <div className="line-gold w-full" />

      <div className="bg-[#080B16] py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Moon className="h-4 w-4 text-[#D4A843]" />
              <span className="font-serif-display text-base text-gradient-gold">
                Jejak Cahaya™
              </span>
            </div>

            {/* Description */}
            <p className="text-xs text-[#8B8070] text-center sm:text-right">
              Platform Storytelling Sirah Nabawiyah Interaktif
            </p>

            {/* Links */}
            <div className="flex items-center gap-4">
              <button className="text-xs text-[#8B8070] hover:text-[#F5D78E] transition-colors duration-200">
                Tentang
              </button>
              <span className="text-[#8B8070]/30">·</span>
              <button className="text-xs text-[#8B8070] hover:text-[#F5D78E] transition-colors duration-200">
                Kontribusi
              </button>
              <span className="text-[#8B8070]/30">·</span>
              <button className="text-xs text-[#8B8070] hover:text-[#F5D78E] transition-colors duration-200">
                Referensi
              </button>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-6 pt-4 border-t border-[rgba(245,215,142,0.05)] text-center">
            <p className="text-[10px] text-[#8B8070]/50">
              Konten berdasarkan referensi Sirah terpercaya. Jejak Cahaya tidak
              mengklaim otoritas keagamaan.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
