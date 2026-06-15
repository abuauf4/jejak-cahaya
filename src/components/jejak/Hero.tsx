'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getEventsByJourney, getJourneysByCollection } from '@/data/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  return (
    <section className={`relative flex items-center justify-center min-h-screen ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-14">
          <span className={`font-serif-display text-base tracking-widest ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>
            JEJAK CAHAYA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className={`font-serif-display text-3xl sm:text-4xl md:text-[3.25rem] font-bold leading-[1.2] mb-6 ${isLight ? 'text-ink' : 'text-cream'}`}
        >
          Menelusuri Jejak Kehidupan Rasulullah ﷺ
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          variants={item}
          className={`text-base sm:text-lg max-w-md mx-auto mb-14 leading-relaxed ${isLight ? 'text-ink-soft' : 'text-sand'}`}
        >
          Perpustakaan digital kisah Islam yang disusun berdasarkan sumber terpercaya.
        </motion.p>

        {/* CTA */}
        <motion.div variants={item}>
          <button
            onClick={() => {
              if (journeys.length > 0) {
                const firstJourney = journeys[0];
                const firstEvents = getEventsByJourney(firstJourney.id);
                if (firstEvents.length > 0) {
                  navigateTo('reader', firstEvents[0].id);
                }
              }
            }}
            className={`group inline-flex items-center gap-2.5 text-base font-medium transition-all duration-300 ${
              isLight
                ? 'text-gold hover:text-gold-soft hover:gap-3.5'
                : 'text-lantern-mid hover:text-lantern hover:gap-3.5'
            }`}
          >
            Mulai Perjalanan
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
