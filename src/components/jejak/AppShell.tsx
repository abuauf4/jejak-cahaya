'use client';

import { useEffect } from 'react';
import { useNavigation } from '@/lib/store';
import Navigation from '@/components/jejak/Navigation';
import Footer from '@/components/jejak/Footer';

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  useEffect(() => {
    if (isLight) {
      document.body.style.backgroundColor = '#FBF8F1';
      document.body.style.color = '#2C2418';
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.classList.add('reader-light');
      document.documentElement.classList.remove('dark');
    } else {
      document.body.style.backgroundColor = '#080B16';
      document.body.style.color = '#F0EBE0';
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.classList.remove('reader-light');
      document.documentElement.classList.add('dark');
    }
  }, [isLight]);

  return (
    <div
      className={`min-h-screen flex flex-col reader-transition ${
        isLight ? 'bg-[#FBF8F1]' : 'bg-[#080B16]'
      }`}
    >
      <Navigation />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
