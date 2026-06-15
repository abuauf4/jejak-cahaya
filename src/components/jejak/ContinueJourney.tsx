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

  // Find next event to continue to
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const lastReadEventId = readEvents[readEvents.length - 1];
  const currentIndex = allEvents.findIndex((e) => e.id === lastReadEventId);
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1
    ? allEvents[currentIndex + 1]
    : null;

  const displayEvent = nextEvent || (lastReadEventId ? getEventById(lastReadEventId) : null);
  if (!displayEvent) return null;

  return (
    <section className={`py-12 sm:py-16 ${isLight ? 'bg-[#FBF8F1]' : 'bg-[#080B16]'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-6">
            <span className={`text-[10px] uppercase tracking-[0.2em] font-medium ${isLight ? 'text-[#D4A843]/40' : 'text-[#D4A843]/50'}`}>
              Perjalanan Terakhir
            </span>
          </div>

          <button
            onClick={() => navigateTo('reader', displayEvent.id)}
            className="group text-left block"
          >
            <h3 className={`font-serif-display text-xl sm:text-2xl font-bold transition-colors mb-1 ${
              isLight
                ? 'text-[#2C2418] group-hover:text-[#8B6914]'
                : 'text-[#F0EBE0] group-hover:text-[#F5D78E]'
            }`}>
              {displayEvent.title}
            </h3>
            <div className={`flex items-center gap-2 text-sm ${isLight ? 'text-[#9C8E7C]' : 'text-[#8B8070]'}`}>
              <span>{displayEvent.year}</span>
              <span className={isLight ? 'text-[#9C8E7C]/30' : 'text-[#8B8070]/30'}>·</span>
              <span className={`group-hover:transition-colors inline-flex items-center gap-1 ${
                isLight ? 'group-hover:text-[#8B6914]' : 'group-hover:text-[#D4A843]'
              }`}>
                {nextEvent ? 'Lanjutkan Perjalanan' : 'Baca Lagi'}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </span>
            </div>
          </button>

          {/* Journey progress — minimal */}
          <div className="mt-8 space-y-2">
            {journeys.map((journey) => {
              const journeyEvents = getEventsByJourney(journey.id);
              const jp = getJourneyProgress(journeyEvents.map(e => e.id));
              if (jp.read === 0) return null;

              return (
                <div key={journey.id} className="flex items-center gap-3">
                  <span className={`text-[11px] w-32 sm:w-40 truncate flex-shrink-0 ${
                    isLight ? 'text-[#9C8E7C]/40' : 'text-[#8B8070]/40'
                  }`}>
                    {journey.title}
                  </span>
                  <div className={`flex-1 h-px relative ${isLight ? 'bg-[#2C2418]/[0.04]' : 'bg-[#8B8070]/8'}`}>
                    <motion.div
                      className={`absolute left-0 top-0 h-full ${isLight ? 'bg-[#D4A843]/25' : 'bg-[#D4A843]/30'}`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${jp.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                    />
                  </div>
                  <span className={`text-[10px] tabular-nums ${isLight ? 'text-[#9C8E7C]/25' : 'text-[#8B8070]/30'}`}>
                    {jp.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
