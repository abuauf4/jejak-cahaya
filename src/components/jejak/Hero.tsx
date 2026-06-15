'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getEventsByJourney, getJourneysByCollection } from '@/data/content';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  return (
    <section
      className={`relative flex items-center justify-center h-[50vh] sm:h-[55vh] ${
        isLight ? 'bg-paper' : 'bg-navy-deep'
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto px-5 sm:px-6 text-center"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-8">
          <span
            className={`font-serif-display text-sm tracking-[0.3em] ${
              isLight ? 'text-gold' : 'text-lantern-mid'
            }`}
          >
            JEJAK CAHAYA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className={`font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.25] mb-4 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}
        >
          Menelusuri Jejak Kehidupan
          <br />
          Rasulullah ﷺ
        </motion.h1>

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
            className={`group inline-flex items-center gap-2 text-sm font-medium transition-all duration-300 ${
              isLight
                ? 'text-gold hover:text-gold-soft hover:gap-3'
                : 'text-lantern-mid hover:text-lantern hover:gap-3'
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
