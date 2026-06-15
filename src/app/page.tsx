'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';
import Navigation from '@/components/jejak/Navigation';
import Hero from '@/components/jejak/Hero';
import ContinueJourney from '@/components/jejak/ContinueJourney';
import TimelinePreview from '@/components/jejak/TimelinePreview';
import ChooseJourney from '@/components/jejak/ChooseJourney';
import FeaturedEvents from '@/components/jejak/FeaturedEvents';
import Contribute from '@/components/jejak/Contribute';
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
  const { currentView } = useNavigation();

  return (
    <div className="min-h-screen flex flex-col bg-[#080B16]">
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
              <TimelinePreview />
              <ChooseJourney />
              <FeaturedEvents />
              <Contribute />
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
