'use client';

import { useState, useEffect } from 'react';
import { Moon, Menu, ArrowLeft, Sun, Clock, MapPin, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection } from '@/data/content';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navItems = [
  { view: 'timeline' as const, label: 'Timeline', icon: Clock },
  { view: 'character' as const, label: 'Tokoh', icon: Users },
  { view: 'location' as const, label: 'Lokasi', icon: MapPin },
  { view: 'search' as const, label: 'Cari', icon: Search },
];

export default function Navigation() {
  const { currentView, navigateTo, goHome, readerTheme, toggleReaderTheme } = useNavigation();
  const { getProgress } = useReadingProgress();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = getProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isReader = currentView === 'reader';
  const isHome = currentView === 'home';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isReader
            ? readerTheme === 'light'
              ? 'bg-[#FBF8F1]/95 border-b border-[rgba(44,36,24,0.06)]'
              : 'bg-[#1a1a1a]/95 border-b border-white/[0.06]'
            : `bg-[#080B16] ${scrolled ? 'border-b border-[#8B8070]/6' : ''}`
        }`}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left */}
            <div className="flex items-center gap-3">
              {!isHome && (
                <button
                  onClick={goHome}
                  className={`p-1 rounded transition-colors ${
                    isReader
                      ? readerTheme === 'light'
                        ? 'hover:bg-black/5 text-[#9C8E7C]'
                        : 'hover:bg-white/10 text-[#b0b0b0]'
                      : 'hover:bg-white/5 text-[#8B8070]'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <button onClick={goHome} className="flex items-center gap-2">
                <Moon className="w-4 h-4 text-[#F5D78E]/60" />
                <span
                  className={`font-serif-display text-sm font-medium ${
                    isReader
                      ? readerTheme === 'light'
                        ? 'text-[#2C2418]/70'
                        : 'text-[#e0e0e0]/70'
                      : 'text-[#8B8070]'
                  }`}
                >
                  Jejak Cahaya
                </span>
              </button>
            </div>

            {/* Center — nav items (desktop) */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => navigateTo(item.view)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs transition-colors ${
                      isActive
                        ? isReader
                          ? readerTheme === 'light'
                            ? 'text-[#2C2418] bg-[#2C2418]/5'
                            : 'text-white bg-white/10'
                          : 'text-[#F0EBE0] bg-white/5'
                        : isReader
                          ? readerTheme === 'light'
                            ? 'text-[#9C8E7C] hover:text-[#6B5E4F]'
                            : 'text-[#909090] hover:text-[#e0e0e0]'
                          : 'text-[#8B8070]/60 hover:text-[#8B8070]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right */}
            <div className="flex items-center gap-2">
              {isReader && (
                <button
                  onClick={toggleReaderTheme}
                  className={`p-1.5 rounded transition-colors ${
                    readerTheme === 'light'
                      ? 'hover:bg-black/5 text-[#9C8E7C]'
                      : 'hover:bg-white/10 text-[#909090]'
                  }`}
                  title={readerTheme === 'light' ? 'Mode gelap' : 'Mode terang'}
                >
                  {readerTheme === 'light' ? (
                    <Moon className="w-3.5 h-3.5" />
                  ) : (
                    <Sun className="w-3.5 h-3.5" />
                  )}
                </button>
              )}

              {/* Mobile menu */}
              <div className="md:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <button
                      className={`p-1 rounded ${
                        isReader
                          ? readerTheme === 'light'
                            ? 'text-[#9C8E7C]'
                            : 'text-[#909090]'
                          : 'text-[#8B8070]/60'
                      }`}
                    >
                      <Menu className="w-4 h-4" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-[#080B16] border-[#8B8070]/6 w-64">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">Navigasi Jejak Cahaya</SheetDescription>
                    <div className="flex flex-col gap-1 mt-8">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.view}
                            onClick={() => { navigateTo(item.view); setMobileOpen(false); }}
                            className="flex items-center gap-3 px-3 py-2.5 rounded text-sm text-[#8B8070] hover:text-[#F0EBE0] hover:bg-white/5 transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            {item.label}
                          </button>
                        );
                      })}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom progress — ultra minimal */}
      {progress.read > 0 && !isReader && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-[2px] bg-transparent">
          <motion.div
            className="h-full bg-[#D4A843]/20"
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}
    </>
  );
}
