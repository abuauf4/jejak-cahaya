'use client';

import { useNavigation } from '@/lib/store';

export default function Footer() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <footer className={`py-10 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        <p className={`text-[11px] font-medium ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
          Jejak Cahaya — Konten bersifat demo dan menunggu proses review ilmiah
        </p>
      </div>
    </footer>
  );
}
