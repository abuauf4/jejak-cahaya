'use client';

import { motion } from 'framer-motion';
import { Moon, ArrowRight, BookOpen } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getEventsByJourney, getJourneysByCollection } from '@/data/content';

export default function Hero() {
  const { navigateTo } = useNavigation();
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const totalEvents = journeys.reduce((acc, j) => acc + getEventsByJourney(j.id).length, 0);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#080B16]">
      {/* Background decorations */}
      <div className="absolute inset-0">
        {/* Stars */}
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#F5D78E] rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Central glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4A843]/[0.04] rounded-full blur-[120px]" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-[#F5D78E]/[0.03] rounded-full blur-[80px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Crescent moon decoration */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <Moon className="w-16 h-16 sm:w-20 sm:h-20 text-[#F5D78E] fill-[#F5D78E]/20" />
            <div className="absolute inset-0 w-16 h-16 sm:w-20 sm:h-20 bg-[#F5D78E]/20 rounded-full blur-xl" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-gradient-gold"
        >
          Menelusuri Jejak Kehidupan Rasulullah ﷺ
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-[#C4B59A] text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Perpustakaan digital kisah Islam yang menghadirkan Sirah Nabawiyah melalui timeline interaktif,
          ensiklopedia tokoh, dan peta lokasi bersejarah.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
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
            className="group flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold rounded-xl hover:shadow-lg hover:shadow-[#D4A843]/20 transition-all active:scale-[0.98]"
          >
            Mulai Perjalanan
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          <button
            onClick={() => navigateTo('timeline')}
            className="flex items-center gap-2 px-8 py-3.5 border border-[rgba(245,215,142,0.2)] text-[#F5D78E] rounded-xl hover:bg-[rgba(245,215,142,0.05)] hover:border-[rgba(245,215,142,0.3)] transition-all active:scale-[0.98]"
          >
            <BookOpen className="w-4 h-4" />
            Jelajahi Timeline
          </button>
        </motion.div>

        {/* Collection info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="flex items-center gap-2 text-sm text-[#8B8070]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#D4A843]" />
            Koleksi pertama: Sirah Nabawiyah
          </div>
          <div className="flex items-center gap-4 text-xs text-[#8B8070]/60">
            <span>{journeys.length} perjalanan</span>
            <span className="w-1 h-1 rounded-full bg-[#8B8070]/40" />
            <span>{totalEvents} kisah</span>
            <span className="w-1 h-1 rounded-full bg-[#8B8070]/40" />
            <span>Gratis & terbuka</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#080B16] to-transparent" />
    </section>
  );
}
