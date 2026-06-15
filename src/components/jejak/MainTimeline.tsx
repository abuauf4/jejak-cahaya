'use client';

import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function TimelineEvent({ event, isLast, isLight, index }: { event: StoryEvent; isLast: boolean; isLight: boolean; index: number }) {
  const { navigateTo } = useNavigation();
  const { readEvents } = useReadingProgress();
  const isRead = readEvents.includes(event.id);

  return (
    <motion.button
      onClick={() => navigateTo('reader', event.id)}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="w-full text-left group block py-3.5"
    >
      <div className="flex items-baseline gap-4 sm:gap-6">
        {/* Year */}
        <span className={`text-xs sm:text-sm font-mono tabular-nums w-20 sm:w-24 flex-shrink-0 text-right transition-colors duration-300 ${
          isLight ? 'text-ink-light group-hover:text-gold' : 'text-warm-muted group-hover:text-lantern-mid'
        }`}>
          {event.year}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <span className={`text-[15px] sm:text-base font-medium transition-colors duration-300 ${
            isRead
              ? isLight
                ? 'text-ink-light group-hover:text-ink'
                : 'text-sand group-hover:text-cream'
              : isLight
                ? 'text-ink group-hover:text-gold'
                : 'text-cream group-hover:text-lantern'
          }`}>
            {event.title}
          </span>
          {isRead && (
            <span className={`ml-2 text-[10px] font-medium ${isLight ? 'text-gold' : 'text-lantern-dim'}`}>dibaca</span>
          )}
        </div>
      </div>

      {/* Separator */}
      {!isLast && (
        <div className="ml-24 sm:ml-30 mt-3.5">
          <div className={`h-[1px] transition-colors duration-300 ${
            isLight ? 'bg-ink/[0.06] group-hover:bg-gold/20' : 'bg-sand/[0.06] group-hover:bg-lantern-mid/15'
          }`} />
        </div>
      )}
    </motion.button>
  );
}

function TimelineJourney({ journey, isFirst, isLight, startIndex }: { journey: Journey; isFirst: boolean; isLight: boolean; startIndex: number }) {
  const events = getEventsByJourney(journey.id);

  return (
    <div className={isFirst ? '' : 'mt-12'}>
      {/* Journey heading */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-5"
      >
        <span className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>
          {journey.title}
        </span>
      </motion.div>

      {/* Events */}
      <div>
        {events.map((event, i) => (
          <TimelineEvent
            key={event.id}
            event={event}
            isLast={i === events.length - 1}
            isLight={isLight}
            index={startIndex + i}
          />
        ))}
      </div>
    </div>
  );
}

export default function MainTimeline() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  if (!activeCollection) return null;

  // Calculate running index for stagger
  let runningIndex = 0;

  return (
    <section className={`py-16 sm:py-24 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {journeys.map((journey, i) => {
          const eventCount = getEventsByJourney(journey.id).length;
          const currentIndex = runningIndex;
          runningIndex += eventCount;

          return (
            <TimelineJourney
              key={journey.id}
              journey={journey}
              isFirst={i === 0}
              isLight={isLight}
              startIndex={currentIndex}
            />
          );
        })}
      </div>
    </section>
  );
}
