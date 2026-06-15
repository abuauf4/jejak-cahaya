'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';

export default function StartFromBeginning() {
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';

  const activeCollection = getActiveCollection();
  if (!activeCollection) return null;

  const journeys = getJourneysByCollection(activeCollection.id);
  // Get the very first event (Bab 1: Jazirah Arab Sebelum Islam)
  if (journeys.length === 0) return null;
  const firstEvents = getEventsByJourney(journeys[0].id);
  if (firstEvents.length === 0) return null;
  const firstEvent = firstEvents[0];

  return (
    <section className={`py-0 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="py-8 sm:py-10">
            <button
              onClick={() => navigateTo('reader', firstEvent.id)}
              className="group text-left block"
            >
              <span
                className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                  isLight ? 'text-ink-light' : 'text-warm-muted'
                }`}
              >
                Mulai Dari Awal
              </span>

              <h3
                className={`font-serif-display text-xl sm:text-2xl font-bold transition-colors duration-300 mt-2 mb-1.5 ${
                  isLight
                    ? 'text-ink group-hover:text-gold'
                    : 'text-cream group-hover:text-lantern'
                }`}
              >
                {firstEvent.title}
              </h3>

              <span
                className={`inline-flex items-center gap-1.5 text-sm font-medium transition-all duration-300 ${
                  isLight
                    ? 'text-gold group-hover:text-gold-soft group-hover:gap-2.5'
                    : 'text-lantern-mid group-hover:text-lantern group-hover:gap-2.5'
                }`}
              >
                Mulai Perjalanan
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
