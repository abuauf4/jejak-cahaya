'use client';

import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import Navigation from '@/components/jejak/Navigation';
import Hero from '@/components/jejak/Hero';
import ContinueJourney from '@/components/jejak/ContinueJourney';
import MainTimeline from '@/components/jejak/MainTimeline';
import FeaturedJourney from '@/components/jejak/FeaturedJourney';
import Community from '@/components/jejak/Community';
import InteractiveTimeline from '@/components/jejak/InteractiveTimeline';
import StoryReader from '@/components/jejak/StoryReader';
import CharacterEncyclopedia from '@/components/jejak/CharacterEncyclopedia';
import LocationExplorer from '@/components/jejak/LocationExplorer';
import SearchSystem from '@/components/jejak/SearchSystem';
import Footer from '@/components/jejak/Footer';

const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export default function Home() {
  const { currentView, readerTheme } = useNavigation();
  const isReader = currentView === 'reader';
  const isLightReader = isReader && readerTheme === 'light';
  const isDarkReader = isReader && readerTheme === 'dark';

  // Update body background and reading mode class
  useEffect(() => {
    if (isLightReader) {
      document.body.style.backgroundColor = '#FBF8F1';
      document.body.style.color = '#2C2418';
      document.documentElement.style.colorScheme = 'light';
      document.documentElement.classList.add('reader-light');
      document.documentElement.classList.remove('dark');
    } else if (isDarkReader) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#e0e0e0';
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.classList.remove('reader-light');
      document.documentElement.classList.add('dark');
    } else {
      document.body.style.backgroundColor = '#080B16';
      document.body.style.color = '#F0EBE0';
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.classList.remove('reader-light');
      document.documentElement.classList.add('dark');
    }
  }, [isLightReader, isDarkReader]);

  return (
    <div className={`min-h-screen flex flex-col reader-transition ${
      isLightReader
        ? 'bg-[#FBF8F1]'
        : isDarkReader
          ? 'bg-[#1a1a1a]'
          : 'bg-[#080B16]'
    }`}>
      <Navigation />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="home"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <Hero />
              <ContinueJourney />
              <MainTimeline />
              <FeaturedJourney />
              <Community />
            </motion.div>
          )}

          {currentView === 'timeline' && (
            <motion.div
              key="timeline"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <InteractiveTimeline />
            </motion.div>
          )}

          {currentView === 'reader' && (
            <motion.div
              key="reader"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <StoryReader />
            </motion.div>
          )}

          {currentView === 'character' && (
            <motion.div
              key="character"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <CharacterEncyclopedia />
            </motion.div>
          )}

          {currentView === 'location' && (
            <motion.div
              key="location"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <LocationExplorer />
            </motion.div>
          )}

          {currentView === 'search' && (
            <motion.div
              key="search"
              variants={pageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.4, ease: 'easeOut' }}
            >
              <SearchSystem />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
