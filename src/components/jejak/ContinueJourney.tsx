'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import {
  getEventById,
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';

export default function ContinueJourney() {
  const { readEvents } = useReadingProgress();
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';

  if (readEvents.length === 0) return null;

  const activeCollection = getActiveCollection();
  if (!activeCollection) return null;

  const journeys = getJourneysByCollection(activeCollection.id);
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const lastReadEventId = readEvents[readEvents.length - 1];
  const currentIndex = allEvents.findIndex((e) => e.id === lastReadEventId);
  const nextEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : null;

  const displayEvent = nextEvent || (lastReadEventId ? getEventById(lastReadEventId) : null);
  if (!displayEvent) return null;

  return (
    <section className={`py-0 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top separator */}
          <div className={`h-px w-full ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />

          <div className="py-8 sm:py-10">
            {/* Label */}
            <span
              className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
                isLight ? 'text-gold' : 'text-lantern-mid'
              }`}
            >
              Lanjutkan Perjalanan
            </span>

            {/* Event info + CTA */}
            <button
              onClick={() => navigateTo('reader', displayEvent.id)}
              className="group text-left block mt-3"
            >
              <h3
                className={`font-serif-display text-xl sm:text-2xl font-bold transition-colors duration-300 mb-1.5 ${
                  isLight
                    ? 'text-ink group-hover:text-gold'
                    : 'text-cream group-hover:text-lantern'
                }`}
              >
                {displayEvent.title}
              </h3>

              <div
                className={`flex items-center gap-2.5 text-sm font-medium ${
                  isLight ? 'text-ink-soft' : 'text-sand'
                }`}
              >
                <span>{displayEvent.year}</span>
                <span className={isLight ? 'text-ink/20' : 'text-sand/20'}>·</span>
                <span
                  className={`inline-flex items-center gap-1.5 transition-colors duration-300 ${
                    isLight
                      ? 'text-gold group-hover:text-gold-soft'
                      : 'text-lantern-mid group-hover:text-lantern'
                  }`}
                >
                  <Play className="w-3 h-3" />
                  {nextEvent ? 'Lanjutkan Membaca' : 'Baca Lagi'}
                </span>
              </div>
            </button>
          </div>

          {/* Bottom separator */}
          <div className={`h-px w-full ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
        </motion.div>
      </div>
    </section>
  );
}
