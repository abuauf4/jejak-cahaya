'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';
import AppShell from '@/components/jejak/AppShell';
import Hero from '@/components/jejak/Hero';
import ContinueJourney from '@/components/jejak/ContinueJourney';
import StartFromBeginning from '@/components/jejak/StartFromBeginning';
import Collections from '@/components/jejak/Collections';

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const };

export default function Home() {
  const { currentView } = useNavigation();

  return (
    <AppShell>
      <AnimatePresence mode="wait">
        {currentView === 'home' && (
          <motion.div
            key="home"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={pageTransition}
          >
            <Hero />
            <ContinueJourney />
            <StartFromBeginning />
            <Collections />
          </motion.div>
        )}
      </AnimatePresence>
    </AppShell>
  );
}
