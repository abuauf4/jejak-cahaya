'use client';

import { useState, useEffect } from 'react';
import { Moon, Menu, ArrowLeft, Sun, Clock, MapPin, Users, Search, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection } from '@/data/content';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

// Navigation items — only for the active collection experience
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
  const activeCollection = getActiveCollection();

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
            : `bg-[#080B16]/95 border-b border-[rgba(245,215,142,0.08)] ${scrolled ? 'backdrop-blur-xl' : 'backdrop-blur-md'}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            {/* Left: Back or Logo */}
            <div className="flex items-center gap-3">
              {!isHome && (
                <button
                  onClick={goHome}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isReader
                      ? readerTheme === 'light'
                        ? 'hover:bg-black/5 text-[#6B5E4F]'
                        : 'hover:bg-white/10 text-[#b0b0b0]'
                      : 'hover:bg-white/5 text-[#C4B59A]'
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}

              <button
                onClick={goHome}
                className="flex items-center gap-2 group"
              >
                <div className="relative">
                  <Moon className="w-5 h-5 text-[#F5D78E]" />
                  <div className="absolute inset-0 w-5 h-5 bg-[#F5D78E]/20 rounded-full blur-md group-hover:bg-[#F5D78E]/30 transition-all" />
                </div>
                <span
                  className={`font-serif-display text-base font-bold tracking-wide ${
                    isReader
                      ? readerTheme === 'light'
                        ? 'text-[#2C2418]'
                        : 'text-[#e0e0e0]'
                      : 'text-gradient-gold'
                  }`}
                >
                  Jejak Cahaya
                </span>
              </button>

              {/* Active collection badge — shown only on homepage/timeline */}
              {activeCollection && !isReader && (
                <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs bg-[#1A2038] text-[#C4B59A] border border-[rgba(245,215,142,0.1)]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                  {activeCollection.title}
                </span>
              )}
            </div>

            {/* Center: Nav items (desktop only) */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => navigateTo(item.view)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'text-[#F5D78E] bg-[rgba(245,215,142,0.1)]'
                        : 'text-[#8B8070] hover:text-[#C4B59A] hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right: Theme toggle (reader) + Mobile menu */}
            <div className="flex items-center gap-2">
              {/* Reader theme toggle */}
              {isReader && (
                <button
                  onClick={toggleReaderTheme}
                  className={`p-2 rounded-lg transition-colors ${
                    readerTheme === 'light'
                      ? 'hover:bg-black/5 text-[#6B5E4F]'
                      : 'hover:bg-white/10 text-[#b0b0b0]'
                  }`}
                  title={readerTheme === 'light' ? 'Mode gelap' : 'Mode terang'}
                >
                  {readerTheme === 'light' ? (
                    <Moon className="w-4 h-4" />
                  ) : (
                    <Sun className="w-4 h-4" />
                  )}
                </button>
              )}

              {/* Mobile menu */}
              <div className="md:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <button
                      className={`p-1.5 rounded-lg ${
                        isReader
                          ? readerTheme === 'light'
                            ? 'hover:bg-black/5 text-[#6B5E4F]'
                            : 'hover:bg-white/10 text-[#b0b0b0]'
                          : 'hover:bg-white/5 text-[#C4B59A]'
                      }`}
                    >
                      <Menu className="w-5 h-5" />
                    </button>
                  </SheetTrigger>
                  <SheetContent side="right" className="bg-[#0F1629] border-[rgba(245,215,142,0.1)] w-72">
                    <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                    <SheetDescription className="sr-only">Navigasi halaman Jejak Cahaya</SheetDescription>
                    <div className="flex flex-col gap-2 mt-8">
                      <button
                        onClick={() => { goHome(); setMobileOpen(false); }}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C4B59A] hover:bg-white/5 transition-colors"
                      >
                        <Home className="w-5 h-5" />
                        <span className="text-sm">Beranda</span>
                      </button>
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.view}
                            onClick={() => { navigateTo(item.view); setMobileOpen(false); }}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#C4B59A] hover:bg-white/5 transition-colors"
                          >
                            <Icon className="w-5 h-5" />
                            <span className="text-sm">{item.label}</span>
                          </button>
                        );
                      })}

                      {/* Active collection info */}
                      {activeCollection && (
                        <div className="mt-4 pt-4 border-t border-[rgba(245,215,142,0.1)] px-4">
                          <p className="text-[10px] text-[#8B8070]/50 uppercase tracking-wider mb-1">Koleksi</p>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
                            <p className="text-sm text-[#F5D78E] font-medium">{activeCollection.title}</p>
                          </div>
                          <p className="text-xs text-[#8B8070] mt-1">{activeCollection.subtitle}</p>
                        </div>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Progress bar at bottom — shown when user has read events */}
      {progress.read > 0 && !isReader && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-1 bg-[#0F1629]">
          <motion.div
            className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E]"
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
      )}
    </>
  );
}
