'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getEventsByJourney, getJourneysByCollection } from '@/data/content';

export default function Hero() {
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  return (
    <section className={`relative flex items-center justify-center min-h-screen ${isLight ? 'bg-[#FBF8F1]' : 'bg-[#080B16]'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <span className={`font-serif-display text-lg tracking-wide ${isLight ? 'text-[#9C8E7C]' : 'text-[#8B8070]'}`}>
            Jejak Cahaya
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={`font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight mb-6 ${isLight ? 'text-[#2C2418]' : 'text-[#F0EBE0]'}`}
        >
          Menelusuri Jejak Kehidupan Rasulullah ﷺ
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`text-base sm:text-lg max-w-lg mx-auto mb-12 leading-relaxed ${isLight ? 'text-[#9C8E7C]' : 'text-[#8B8070]'}`}
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
            className={`group inline-flex items-center gap-2 transition-colors text-base ${
              isLight
                ? 'text-[#8B6914] hover:text-[#D4A843]'
                : 'text-[#D4A843] hover:text-[#F5D78E]'
            }`}
          >
            Mulai Perjalanan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
