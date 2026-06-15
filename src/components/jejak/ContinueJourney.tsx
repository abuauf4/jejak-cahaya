'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getEventById, getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';

export default function ContinueJourney() {
  const { readEvents, currentEventId, getProgress } = useReadingProgress();
  const { navigateTo } = useNavigation();
  const progress = getProgress();

  // Only show if user has read at least 1 event
  if (readEvents.length === 0) return null;

  // Find the last read event or current event
  const lastEventId = currentEventId || readEvents[readEvents.length - 1];
  const lastEvent = lastEventId ? getEventById(lastEventId) : null;

  if (!lastEvent) return null;

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === lastEvent.id);
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
          className="relative p-6 sm:p-8 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.1)] overflow-hidden"
        >
          {/* Background glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4A843]/[0.04] rounded-full blur-[80px]" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-[#D4A843]" />
              <span className="text-sm text-[#C4B59A] font-medium">
                {isContinue ? 'Lanjutkan Perjalanan' : 'Perjalanan Terakhir'}
              </span>
            </div>

            <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#F0EBE0] mb-2">
              {displayEvent.title}
            </h3>
            <p className="text-[#8B8070] text-sm mb-4">{displayEvent.subtitle}</p>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-xs text-[#8B8070] mb-2">
                <span>{progress.read} dari {progress.total} kisah dibaca</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="h-1.5 bg-[#1A2038] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E] rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${progress.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                />
              </div>
            </div>

            <button
              onClick={() => navigateTo('reader', displayEvent.id)}
              className="group flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold rounded-lg hover:shadow-lg hover:shadow-[#D4A843]/20 transition-all text-sm active:scale-[0.98]"
            >
              {isContinue ? 'Lanjutkan' : 'Baca Lagi'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
