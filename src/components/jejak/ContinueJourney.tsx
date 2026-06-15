'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getEventById, getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';

export default function ContinueJourney() {
  const { readEvents, getJourneyProgress } = useReadingProgress();
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';

  if (readEvents.length === 0) return null;

  const activeCollection = getActiveCollection();
  if (!activeCollection) return null;

  const journeys = getJourneysByCollection(activeCollection.id);
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const lastReadEventId = readEvents[readEvents.length - 1];
  const currentIndex = allEvents.findIndex((e) => e.id === lastReadEventId);
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1
    ? allEvents[currentIndex + 1]
    : null;

  const displayEvent = nextEvent || (lastReadEventId ? getEventById(lastReadEventId) : null);
  if (!displayEvent) return null;

  return (
    <section className={`py-14 sm:py-20 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-5">
            <span className={`text-[11px] uppercase tracking-[0.2em] font-medium ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>
              Perjalanan Terakhir
            </span>
          </div>

          <button
            onClick={() => navigateTo('reader', displayEvent.id)}
            className="group text-left block"
          >
            <h3 className={`font-serif-display text-xl sm:text-2xl font-bold transition-colors duration-300 mb-1.5 ${
              isLight
                ? 'text-ink group-hover:text-gold'
                : 'text-cream group-hover:text-lantern'
            }`}>
              {displayEvent.title}
            </h3>
            <div className={`flex items-center gap-2.5 text-sm ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
              <span>{displayEvent.year}</span>
              <span className="opacity-30">·</span>
              <span className={`inline-flex items-center gap-1.5 transition-colors duration-300 ${
                isLight ? 'group-hover:text-gold' : 'group-hover:text-lantern-mid'
              }`}>
                {nextEvent ? 'Lanjutkan Perjalanan' : 'Baca Lagi'}
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </div>
          </button>

          {/* Journey progress */}
          <div className="mt-10 space-y-3">
            {journeys.map((journey, i) => {
              const journeyEvents = getEventsByJourney(journey.id);
              const jp = getJourneyProgress(journeyEvents.map(e => e.id));
              if (jp.read === 0) return null;

              return (
                <motion.div
                  key={journey.id}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-center gap-3"
                >
                  <span className={`text-[11px] w-32 sm:w-40 truncate flex-shrink-0 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    {journey.title}
                  </span>
                  <div className={`flex-1 h-[3px] rounded-full ${isLight ? 'bg-ink/[0.06]' : 'bg-sand/[0.08]'}`}>
                    <motion.div
                      className={`h-full rounded-full ${isLight ? 'bg-gold-soft' : 'bg-lantern-mid'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${jp.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    />
                  </div>
                  <span className={`text-[11px] tabular-nums font-medium ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    {jp.percentage}%
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
