'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getEventsByJourney, getJourneysByCollection } from '@/data/content';

export default function Hero() {
  const { navigateTo } = useNavigation();
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  return (
    <section className="relative flex items-center justify-center min-h-screen bg-[#080B16]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className="font-serif-display text-lg text-[#8B8070] tracking-wide">
            Jejak Cahaya
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F0EBE0] mb-6"
        >
          Menelusuri Jejak Kehidupan Rasulullah ﷺ
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[#8B8070] text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed"
        >
          Perpustakaan digital kisah Islam yang disusun berdasarkan sumber terpercaya.
        </motion.p>

        {/* Single CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
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
            className="group inline-flex items-center gap-2 text-[#D4A843] hover:text-[#F5D78E] transition-colors text-base"
          >
            Mulai Perjalanan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
