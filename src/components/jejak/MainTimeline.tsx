'use client';

import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function TimelineEvent({ event, isLast }: { event: StoryEvent; isLast: boolean }) {
  const { navigateTo } = useNavigation();
  const { readEvents } = useReadingProgress();
  const isRead = readEvents.includes(event.id);

  return (
    <button
      onClick={() => navigateTo('reader', event.id)}
      className="w-full text-left group block py-3"
    >
      <div className="flex items-baseline gap-4 sm:gap-6">
        {/* Year */}
        <span className="text-xs sm:text-sm text-[#8B8070]/60 font-mono tabular-nums w-20 sm:w-24 flex-shrink-0 text-right">
          {event.year}
        </span>

        {/* Title */}
        <div className="flex-1 min-w-0">
          <span className={`text-base sm:text-lg transition-colors ${
            isRead
              ? 'text-[#C4B59A] group-hover:text-[#F5D78E]'
              : 'text-[#F0EBE0] group-hover:text-[#F5D78E]'
          }`}>
            {event.title}
          </span>
          {isRead && (
            <span className="ml-2 text-[10px] text-[#8B8070]/40">dibaca</span>
          )}
        </div>
      </div>

      {/* Separator line */}
      {!isLast && (
        <div className="ml-24 sm:ml-30 mt-3">
          <div className="h-px bg-[#8B8070]/8" />
        </div>
      )}
    </button>
  );
}

function TimelineJourney({ journey, isFirst, isLast }: { journey: Journey; isFirst: boolean; isLast: boolean }) {
  const events = getEventsByJourney(journey.id);

  return (
    <div className={isFirst ? '' : 'mt-10'}>
      {/* Journey heading — quiet, uppercase, small */}
      <div className="mb-4 ml-0">
        <span className="text-[10px] sm:text-xs text-[#D4A843]/50 uppercase tracking-[0.2em] font-medium">
          {journey.title}
        </span>
      </div>

      {/* Events */}
      <div>
        {events.map((event, i) => (
          <TimelineEvent
            key={event.id}
            event={event}
            isLast={i === events.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

export default function MainTimeline() {
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  if (!activeCollection) return null;

  return (
    <section className="py-16 sm:py-24 bg-[#080B16]">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        {journeys.map((journey, i) => (
          <TimelineJourney
            key={journey.id}
            journey={journey}
            isFirst={i === 0}
            isLast={i === journeys.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
