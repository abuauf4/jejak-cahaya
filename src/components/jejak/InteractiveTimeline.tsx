'use client';

import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney, getLocationById } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function TimelineEvent({ event, isLast, isLight, index }: { event: StoryEvent; isLast: boolean; isLight: boolean; index: number }) {
  const { navigateTo } = useNavigation();
  const { readEvents } = useReadingProgress();
  const isRead = readEvents.includes(event.id);
  const location = getLocationById(event.locationId);

  return (
    <motion.button
      onClick={() => navigateTo('reader', event.id)}
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      className="w-full text-left group block py-4"
    >
      <div className="flex items-baseline gap-4 sm:gap-8">
        <span className={`text-sm font-mono tabular-nums w-24 sm:w-28 flex-shrink-0 text-right transition-colors duration-300 ${
          isLight ? 'text-ink-light group-hover:text-gold' : 'text-warm-muted group-hover:text-lantern-mid'
        }`}>
          {event.year}
        </span>

        <div className="flex-1 min-w-0">
          <span className={`text-lg sm:text-xl font-serif-display transition-colors duration-300 ${
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

          <div className="flex items-center gap-3 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {location && (
              <span className={`text-xs ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>{location.name}</span>
            )}
            {isRead && (
              <span className={`text-xs font-medium ${isLight ? 'text-gold' : 'text-lantern-dim'}`}>Sudah dibaca</span>
            )}
          </div>
        </div>
      </div>

      {!isLast && (
        <div className="ml-28 sm:ml-36 mt-4">
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
    <div className={isFirst ? '' : 'mt-16'}>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-6 pl-32 sm:pl-40"
      >
        <h3 className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>
          {journey.title}
        </h3>
        <p className={`text-[11px] mt-1 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>{journey.period}</p>
      </motion.div>

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

export default function InteractiveTimeline() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  if (!activeCollection) return null;

  let runningIndex = 0;

  return (
    <div className={`min-h-screen pt-20 sm:pt-24 pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 sm:mb-16"
        >
          <h1 className={`font-serif-display text-2xl sm:text-3xl font-bold mb-2 ${isLight ? 'text-ink' : 'text-cream'}`}>
            Sirah Nabawiyah
          </h1>
          <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            Dari dunia sebelum Islam hingga cahaya yang menyeluruh
          </p>
        </motion.div>

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
    </div>
  );
}
