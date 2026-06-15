'use client';

import { useState, useEffect } from 'react';
import { Moon, Sun, Clock, MapPin, Users, Search, Home } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';

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
      {/* ── Top bar (all screens) ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isLight
            ? `bg-paper/95 ${scrolled ? 'border-b border-ink/10' : ''}`
            : `bg-navy-deep/95 ${scrolled ? 'border-b border-sand/10' : ''}`
        }`}
        style={{ backdropFilter: scrolled ? 'blur(12px)' : 'none' }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-12 sm:h-14">
            {/* Left: back + logo */}
            <div className="flex items-center gap-3">
              {!isHome && (
                <button
                  onClick={goHome}
                  className={`p-1 rounded-md transition-colors duration-200 ${
                    isLight
                      ? 'hover:bg-ink/[0.06] text-ink-soft'
                      : 'hover:bg-sand/[0.08] text-sand'
                  }`}
                >
                  <Home className="w-4 h-4" />
                </button>
              )}
              <button onClick={goHome} className="flex items-center gap-2">
                <Moon className={`w-4 h-4 ${isLight ? 'text-gold' : 'text-lantern-mid'}`} />
                <span
                  className={`font-serif-display text-sm font-medium ${
                    isLight ? 'text-ink-soft' : 'text-sand'
                  }`}
                >
                  Jejak Cahaya
                </span>
              </button>
            </div>

            {/* Center — desktop nav */}
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
                          ? 'text-ink-soft hover:text-ink hover:bg-ink/[0.04]'
                          : 'text-sand hover:text-cream hover:bg-sand/[0.06]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Right — theme toggle */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={toggleTheme}
                className={`p-1.5 rounded-md transition-all duration-200 ${
                  isLight
                    ? 'hover:bg-ink/[0.06] text-ink-soft hover:text-ink'
                    : 'hover:bg-sand/[0.08] text-sand hover:text-cream'
                }`}
                title={isLight ? 'Mode gelap' : 'Mode terang'}
              >
                {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ── Bottom tab bar (mobile only) ── */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 md:hidden border-t ${
          isLight
            ? 'bg-paper/95 border-ink/10'
            : 'bg-navy-deep/95 border-sand/10'
        }`}
        style={{ backdropFilter: 'blur(12px)' }}
      >
        <div className="flex items-center justify-around h-14">
          {[
            { view: 'home' as const, label: 'Beranda', icon: Home },
            ...navItems,
          ].map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => {
                  if (item.view === 'home') goHome();
                  else navigateTo(item.view);
                }}
                className={`flex flex-col items-center justify-center gap-0.5 flex-1 h-full transition-colors duration-200 ${
                  isActive
                    ? isLight
                      ? 'text-gold'
                      : 'text-lantern-mid'
                    : isLight
                      ? 'text-ink-light'
                      : 'text-warm-muted'
                }`}
              >
                <Icon className="w-[18px] h-[18px]" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Global reading progress (top of page, below nav) ── */}
      {progress.read > 0 && currentView === 'home' && (
        <div className={`fixed bottom-14 md:bottom-0 left-0 right-0 z-40 h-[2px]`}>
          <motion.div
            className={`h-full ${isLight ? 'bg-gold-soft' : 'bg-lantern-mid'}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress.percentage}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}
    </>
  );
}
