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

  // Update body background and color-scheme for reader mode
  useEffect(() => {
    if (isLightReader) {
      document.body.style.backgroundColor = '#FAF9F6';
      document.body.style.color = '#1a1a1a';
      document.documentElement.style.colorScheme = 'light';
    } else if (isDarkReader) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#e0e0e0';
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.body.style.backgroundColor = '#080B16';
      document.body.style.color = '#F0EBE0';
      document.documentElement.style.colorScheme = 'dark';
    }
  }, [isLightReader, isDarkReader]);

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isLightReader ? 'bg-[#FAF9F6]' : isDarkReader ? 'bg-[#1a1a1a]' : 'bg-[#080B16]'}`}>
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
