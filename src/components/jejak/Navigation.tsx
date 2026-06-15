'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Menu, X, ArrowLeft, Clock, Users, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetClose, SheetDescription } from '@/components/ui/sheet';
import { useNavigation, useReadingProgress } from '@/lib/store';

const navItems = [
  { label: 'Timeline', view: 'timeline' as const, icon: Clock },
  { label: 'Tokoh', view: 'character' as const, icon: Users },
  { label: 'Lokasi', view: 'location' as const, icon: MapPin },
];

export default function Navigation() {
  const { currentView, navigateTo, goHome } = useNavigation();
  const { getProgress } = useReadingProgress();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = getProgress();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = currentView === 'home';

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          scrolled || !isHome
            ? 'bg-[#080B16]/90 backdrop-blur-md border-b border-[rgba(245,215,142,0.08)]'
            : 'bg-transparent'
        }`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back + Logo */}
            <div className="flex items-center gap-3">
              <AnimatePresence>
                {!isHome && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={goHome}
                      className="text-[#8B8070] hover:text-[#F5D78E] hover:bg-transparent"
                    >
                      <ArrowLeft className="h-5 w-5" />
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                onClick={goHome}
                className="flex items-center gap-2 group"
              >
                <Moon className="h-5 w-5 text-[#F5D78E] lantern-pulse" />
                <span className="font-serif-display text-lg sm:text-xl text-gradient-gold">
                  Jejak Cahaya
                </span>
              </button>
            </div>

            {/* Center/Right: Nav Items (Desktop) */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.view}
                  variant="ghost"
                  onClick={() => navigateTo(item.view)}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    currentView === item.view
                      ? 'text-[#F5D78E] bg-[rgba(245,215,142,0.08)]'
                      : 'text-[#8B8070] hover:text-[#F5D78E] hover:bg-transparent'
                  }`}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                onClick={() => navigateTo('search')}
                className={`text-sm font-medium transition-colors duration-200 ${
                  currentView === 'search'
                    ? 'text-[#F5D78E] bg-[rgba(245,215,142,0.08)]'
                    : 'text-[#8B8070] hover:text-[#F5D78E] hover:bg-transparent'
                }`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Cari
              </Button>
            </nav>

            {/* Mobile: Hamburger */}
            <div className="md:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-[#8B8070] hover:text-[#F5D78E]">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="bg-[#0F1629] border-l border-[rgba(245,215,142,0.1)] w-72"
                >
                  <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
                  <SheetDescription className="sr-only">Navigasi ke berbagai bagian Jejak Cahaya</SheetDescription>
                  <div className="flex items-center justify-between mb-8 mt-2">
                    <span className="font-serif-display text-lg text-gradient-gold">
                      Jejak Cahaya
                    </span>
                    <SheetClose asChild>
                      <Button variant="ghost" size="icon" className="text-[#8B8070] hover:text-[#F5D78E]">
                        <X className="h-5 w-5" />
                      </Button>
                    </SheetClose>
                  </div>

                  <nav className="flex flex-col gap-2">
                    {navItems.map((item) => (
                      <button
                        key={item.view}
                        onClick={() => {
                          navigateTo(item.view);
                          setMobileOpen(false);
                        }}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                          currentView === item.view
                            ? 'text-[#F5D78E] bg-[rgba(245,215,142,0.08)]'
                            : 'text-[#C4B59A] hover:text-[#F5D78E] hover:bg-[rgba(245,215,142,0.05)]'
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    ))}
                    <button
                      onClick={() => {
                        navigateTo('search');
                        setMobileOpen(false);
                      }}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        currentView === 'search'
                          ? 'text-[#F5D78E] bg-[rgba(245,215,142,0.08)]'
                          : 'text-[#C4B59A] hover:text-[#F5D78E] hover:bg-[rgba(245,215,142,0.05)]'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="font-medium">Cari</span>
                    </button>
                  </nav>

                  {/* Reading progress in mobile menu */}
                  {progress.read > 0 && (
                    <div className="mt-8 px-4">
                      <p className="text-xs text-[#8B8070] mb-2">
                        Kemajuan Membaca
                      </p>
                      <div className="w-full h-1.5 bg-[#1A2038] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E] rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress.percentage}%` }}
                          transition={{ duration: 0.8, ease: 'easeOut' }}
                        />
                      </div>
                      <p className="text-xs text-[#8B8070] mt-1">
                        {progress.read}/{progress.total} peristiwa
                      </p>
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        {/* Progress bar at bottom of nav */}
        {progress.read > 0 && (
          <div className="h-0.5 bg-[#1A2038]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E]"
              initial={{ width: 0 }}
              animate={{ width: `${progress.percentage}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        )}
      </motion.header>
    </>
  );
}
