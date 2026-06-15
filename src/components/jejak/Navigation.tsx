'use client';

import { useState, useEffect } from 'react';
import { Moon, Menu, ArrowLeft, Sun, Clock, MapPin, Users, Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet';

const navItems = [
  { view: 'timeline' as const, label: 'Timeline', icon: Clock },
  { view: 'character' as const, label: 'Tokoh', icon: Users },
  { view: 'location' as const, label: 'Lokasi', icon: MapPin },
  { view: 'search' as const, label: 'Cari', icon: Search },
];

export default function Navigation() {
  const { currentView, navigateTo, goHome, theme, toggleTheme } = useNavigation();
  const { getProgress } = useReadingProgress();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const progress = getProgress();
  const isLight = theme === 'light';
  const isHome = currentView === 'home';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? `bg-paper/95 ${scrolled ? 'border-b border-ink/[0.06]' : ''}`
            : `bg-navy-deep/95 ${scrolled ? 'border-b border-sand/[0.06]' : ''}`
        }`}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left */}
            <div className="flex items-center gap-3">
              {!isHome && (
                <button
                  onClick={goHome}
                  className={`p-1 rounded-md transition-colors duration-200 ${
                    isLight ? 'hover:bg-ink/[0.04] text-ink-light' : 'hover:bg-sand/[0.06] text-warm-muted'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}

              <button onClick={goHome} className="flex items-center gap-2">
                <Moon className={`w-4 h-4 ${isLight ? 'text-gold' : 'text-lantern-mid'}`} />
                <span className={`font-serif-display text-sm font-medium ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                  Jejak Cahaya
                </span>
              </button>
            </div>

            {/* Center — nav items */}
            <div className="hidden md:flex items-center gap-0.5">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.view;
                return (
                  <button
                    key={item.view}
                    onClick={() => navigateTo(item.view)}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? isLight
                          ? 'text-ink bg-ink/[0.06]'
                          : 'text-cream bg-sand/[0.08]'
                        : isLight
                          ? 'text-ink-light hover:text-ink hover:bg-ink/[0.03]'
                          : 'text-warm-muted hover:text-sand hover:bg-sand/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  isLight
                    ? 'hover:bg-ink/[0.04] text-ink-light hover:text-ink'
                    : 'hover:bg-sand/[0.06] text-warm-muted hover:text-sand'
                }`}
                title={isLight ? 'Mode gelap' : 'Mode terang'}
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>

              <div className="md:hidden">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                  <SheetTrigger asChild>
                    <button className={`p-1.5 rounded-md ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                      <Menu className="w-4 h-4" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className={isLight
                      ? 'bg-paper border-ink/[0.06] w-64'
                      : 'bg-navy-deep border-sand/[0.06] w-64'
                    }
                  >
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetDescription className="sr-only">Navigasi Jejak Cahaya</SheetDescription>
                    <div className="flex flex-col gap-1 mt-8">
                      {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.view}
                            onClick={() => { navigateTo(item.view); setMobileOpen(false); }}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors duration-200 ${
                              isLight
                                ? 'text-ink-soft hover:text-ink hover:bg-ink/[0.04]'
                                : 'text-sand hover:text-cream hover:bg-sand/[0.06]'
                            }`}
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

      {/* Bottom progress */}
      {progress.read > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-[2px]">
          <motion.div
            className={`h-full ${isLight ? 'bg-gold-soft/40' : 'bg-lantern-mid/30'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </>
  );
}
