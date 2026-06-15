'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';
import AppShell from '@/components/jejak/AppShell';
import Hero from '@/components/jejak/Hero';
import ContinueJourney from '@/components/jejak/ContinueJourney';
import StartFromBeginning from '@/components/jejak/StartFromBeginning';
import Collections from '@/components/jejak/Collections';

export default function Home() {
  // Ensure store is synced to 'home' view
  const { navigateTo } = useNavigation();

  // Sync on mount — URL '/' always = home
  // Using useEffect would cause a flash, so we just render home directly.
  // The store sync happens implicitly through the Navigation component detecting pathname.

  return (
    <AppShell>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <Hero />
        <ContinueJourney />
        <StartFromBeginning />
        <Collections />
      </motion.div>
    </AppShell>
  );
}
