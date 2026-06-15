'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';
import type { Journey } from '@/data/content';

const expandVariants = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: 'auto',
    opacity: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
};

function PhaseItem({
  journey,
  isExpanded,
  onToggle,
  isLight,
  isLast,
}: {
  journey: Journey;
  isExpanded: boolean;
  onToggle: () => void;
  isLight: boolean;
  isLast: boolean;
}) {
  const events = getEventsByJourney(journey.id);
  const { readEvents } = useReadingProgress();
  const { navigateTo } = useNavigation();

  const readCount = events.filter((e) => readEvents.includes(e.id)).length;
  const isComplete = readCount === events.length && events.length > 0;
  const hasProgress = readCount > 0 && !isComplete;

  return (
    <div className="relative flex items-stretch">
      {/* Timeline track */}
      <div className="flex flex-col items-center w-6 flex-shrink-0">
        {/* Circle indicator */}
        <button
          onClick={onToggle}
          className="relative z-10 mt-[7px]"
          aria-label={isExpanded ? `Tutup ${journey.title}` : `Buka ${journey.title}`}
        >
          <div
            className={`w-3.5 h-3.5 rounded-full border-2 transition-all duration-400 ${
              isExpanded
                ? isLight
                  ? 'bg-gold border-gold scale-110'
                  : 'bg-lantern-mid border-lantern-mid scale-110'
                : isComplete
                  ? isLight
                    ? 'bg-gold-soft border-gold-soft'
                    : 'bg-lantern-dim border-lantern-dim'
                  : hasProgress
                    ? isLight
                      ? 'bg-gold/40 border-gold'
                      : 'bg-lantern-mid/40 border-lantern-mid'
                    : isLight
                      ? 'border-ink-light bg-transparent'
                      : 'border-warm-muted bg-transparent'
            }`}
          />
        </button>

        {/* Vertical connector line */}
        {!isLast && (
          <div
            className={`w-px flex-1 min-h-[20px] transition-colors duration-300 ${
              isLight ? 'bg-ink/12' : 'bg-sand/12'
            }`}
          />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 pb-5 pl-3">
        {/* Phase header */}
        <button
          onClick={onToggle}
          className="flex items-center gap-2 group w-full text-left"
        >
          <span
            className={`font-medium text-[15px] sm:text-base transition-colors duration-300 ${
              isExpanded
                ? isLight
                  ? 'text-ink'
                  : 'text-cream'
                : isLight
                  ? 'text-ink-soft group-hover:text-ink'
                  : 'text-sand group-hover:text-cream'
            }`}
          >
            {journey.title}
          </span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-300 ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            } ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}
          />
        </button>

        {/* Expanded events */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              variants={expandVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-0.5">
                {events.map((event, i) => {
                  const isRead = readEvents.includes(event.id);
                  return (
                    <motion.button
                      key={event.id}
                      onClick={() => navigateTo('reader', event.id)}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        delay: i * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="w-full text-left group flex items-baseline gap-3 py-2.5"
                    >
                      {/* Year */}
                      <span
                        className={`text-xs sm:text-sm font-mono tabular-nums w-16 sm:w-20 flex-shrink-0 transition-colors duration-200 ${
                          isLight
                            ? 'text-ink-light group-hover:text-gold'
                            : 'text-warm-muted group-hover:text-lantern-mid'
                        }`}
                      >
                        {event.year}
                      </span>

                      {/* Title + read badge */}
                      <span
                        className={`text-[15px] sm:text-base transition-colors duration-200 ${
                          isRead
                            ? isLight
                              ? 'text-ink-soft group-hover:text-ink'
                              : 'text-sand group-hover:text-cream'
                            : isLight
                              ? 'text-ink group-hover:text-gold'
                              : 'text-cream group-hover:text-lantern-mid'
                        }`}
                      >
                        {event.title}
                      </span>

                      {isRead && (
                        <span
                          className={`text-[10px] sm:text-[11px] font-medium ${
                            isLight ? 'text-gold' : 'text-lantern-dim'
                          }`}
                        >
                          Dibaca
                        </span>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function JourneyFeed({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const { theme } = useNavigation();
  const { readEvents } = useReadingProgress();
  const isLight = theme === 'light';

  const activeCollection = getActiveCollection();
  const journeys = activeCollection
    ? getJourneysByCollection(activeCollection.id)
    : [];

  // Auto-expand the journey containing the last read event,
  // or the first journey if no progress yet
  const initialExpandedId = useMemo(() => {
    if (readEvents.length > 0) {
      const lastReadId = readEvents[readEvents.length - 1];
      const journey = journeys.find((j) => {
        const events = getEventsByJourney(j.id);
        return events.some((e) => e.id === lastReadId);
      });
      if (journey) return journey.id;
    }
    return journeys.length > 0 ? journeys[0].id : null;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [expandedId, setExpandedId] = useState<string | null>(initialExpandedId);

  const handleToggle = (journeyId: string) => {
    setExpandedId((prev) => (prev === journeyId ? null : journeyId));
  };

  if (!activeCollection) return null;

  return (
    <section className={`py-10 sm:py-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        {/* Standalone header for Timeline page */}
        {standalone && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mb-10"
          >
            <h1
              className={`font-serif-display text-2xl sm:text-3xl font-bold mb-2 ${
                isLight ? 'text-ink' : 'text-cream'
              }`}
            >
              Sirah Nabawiyah
            </h1>
            <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
              7 fase perjalanan kehidupan Rasulullah ﷺ
            </p>
          </motion.div>
        )}

        {/* Phase list */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {journeys.map((journey, i) => (
            <PhaseItem
              key={journey.id}
              journey={journey}
              isExpanded={expandedId === journey.id}
              onToggle={() => handleToggle(journey.id)}
              isLight={isLight}
              isLast={i === journeys.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
