'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Compass } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getEventById, getActiveCollection, getJourneysByCollection, getEventsByJourney, getLocationById } from '@/data/content';

export default function ContinueJourney() {
  const { readEvents, getProgress, getJourneyProgress } = useReadingProgress();
  const { navigateTo } = useNavigation();
  const progress = getProgress();

  // Only show if user has started reading
  if (readEvents.length === 0) return null;

  const activeCollection = getActiveCollection();
  if (!activeCollection) return null;

  const journeys = getJourneysByCollection(activeCollection.id);

  // Find the last read event
  const lastReadEventId = readEvents[readEvents.length - 1];
  const lastEvent = lastReadEventId ? getEventById(lastReadEventId) : null;
  if (!lastEvent) return null;

  const lastLocation = getLocationById(lastEvent.locationId);

  // Find next event to continue to
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === lastReadEventId);
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1
    ? allEvents[currentIndex + 1]
    : null;

  const displayEvent = nextEvent || lastEvent;
  const isContinue = !!nextEvent;

  return (
    <section className="relative py-16 sm:py-20 bg-[#080B16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.1)] overflow-hidden"
        >
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843] to-transparent" />

          <div className="p-6 sm:p-8">
            {/* Section label */}
            <div className="flex items-center gap-2 mb-6">
              <Compass className="w-4 h-4 text-[#D4A843]" />
              <span className="text-sm text-[#D4A843] font-medium">Perjalanan Kamu</span>
            </div>

            {/* Journey progress list */}
            <div className="space-y-3 mb-8">
              {journeys.map((journey) => {
                const journeyEvents = getEventsByJourney(journey.id);
                const jp = getJourneyProgress(journeyEvents.map(e => e.id));
                const isStarted = jp.read > 0;
                const isComplete = jp.read === jp.total && jp.total > 0;

                return (
                  <div key={journey.id} className="flex items-center gap-3 sm:gap-4">
                    {/* Journey indicator */}
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        isComplete
                          ? 'bg-[#F5D78E]'
                          : isStarted
                            ? 'bg-[#D4A843] animate-pulse'
                            : 'bg-[#1A2038] border border-[#8B8070]/30'
                      }`}
                    />
                    {/* Journey name */}
                    <span className={`text-sm flex-shrink-0 min-w-0 ${
                      isComplete
                        ? 'text-[#F5D78E] font-medium'
                        : isStarted
                          ? 'text-[#C4B59A] font-medium'
                          : 'text-[#8B8070]/50'
                    }`}>
                      {journey.title}
                    </span>
                    {/* Progress bar */}
                    <div className="flex-1 h-1.5 bg-[#1A2038] rounded-full overflow-hidden min-w-[60px]">
                      <motion.div
                        className={`h-full rounded-full ${
                          isComplete
                            ? 'bg-gradient-to-r from-[#D4A843] to-[#F5D78E]'
                            : 'bg-[#D4A843]/60'
                        }`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${jp.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
                      />
                    </div>
                    {/* Percentage */}
                    <span className={`text-xs tabular-nums flex-shrink-0 ${
                      isStarted ? 'text-[#C4B59A]' : 'text-[#8B8070]/30'
                    }`}>
                      {isStarted ? `${jp.percentage}%` : '—'}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Continue reading CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="relative p-5 sm:p-6 rounded-xl bg-[#080B16]/60 border border-[rgba(245,215,142,0.08)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#8B8070]" />
                    <span className="text-xs text-[#8B8070]">
                      {lastLocation?.name || lastEvent.year}
                    </span>
                  </div>
                  <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#F0EBE0] mb-1">
                    {displayEvent.title}
                  </h3>
                  <p className="text-[#8B8070] text-sm line-clamp-2">{displayEvent.subtitle}</p>
                </div>

                <button
                  onClick={() => navigateTo('reader', displayEvent.id)}
                  className="flex-shrink-0 group flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4A843]/20 transition-all text-sm active:scale-[0.98]"
                >
                  {isContinue ? 'Lanjutkan Perjalanan' : 'Baca Lagi'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>

            {/* Overall progress */}
            <div className="mt-5 flex items-center justify-between text-xs text-[#8B8070]/60">
              <span>{progress.read} dari {progress.total} kisah telah dibaca</span>
              <span>{progress.percentage}% selesai</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
