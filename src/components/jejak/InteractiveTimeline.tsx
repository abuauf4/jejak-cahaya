'use client';

import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney, getLocationById } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function TimelineEvent({ event, isLast }: { event: StoryEvent; isLast: boolean }) {
  const { navigateTo } = useNavigation();
  const { readEvents } = useReadingProgress();
  const isRead = readEvents.includes(event.id);
  const location = getLocationById(event.locationId);

  return (
    <button
      onClick={() => navigateTo('reader', event.id)}
      className="w-full text-left group block py-4"
    >
      <div className="flex items-baseline gap-4 sm:gap-8">
        {/* Year */}
        <span className="text-sm text-[#8B8070]/60 font-mono tabular-nums w-24 sm:w-28 flex-shrink-0 text-right">
          {event.year}
        </span>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <span className={`text-lg sm:text-xl font-serif-display transition-colors ${
            isRead
              ? 'text-[#C4B59A] group-hover:text-[#F5D78E]'
              : 'text-[#F0EBE0] group-hover:text-[#F5D78E]'
          }`}>
            {event.title}
          </span>

          {/* Subtle meta — only on hover */}
          <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {location && (
              <span className="text-xs text-[#8B8070]/50">{location.name}</span>
            )}
            {isRead && (
              <span className="text-xs text-[#8B8070]/40">Sudah dibaca</span>
            )}
          </div>
        </div>
      </div>

      {/* Separator */}
      {!isLast && (
        <div className="ml-28 sm:ml-36 mt-4">
          <div className="h-px bg-[#8B8070]/6" />
        </div>
      )}
    </button>
  );
}

function TimelineJourney({ journey, isFirst }: { journey: Journey; isFirst: boolean }) {
  const events = getEventsByJourney(journey.id);

  return (
    <div className={isFirst ? '' : 'mt-14'}>
      {/* Journey heading */}
      <div className="mb-6 pl-32 sm:pl-40">
        <h3 className="text-[11px] sm:text-xs text-[#D4A843]/40 uppercase tracking-[0.2em] font-medium">
          {journey.title}
        </h3>
        <p className="text-[11px] text-[#8B8070]/30 mt-1">{journey.period}</p>
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

export default function InteractiveTimeline() {
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  if (!activeCollection) return null;

  return (
    <div className="min-h-screen bg-[#080B16] pt-20 sm:pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Quiet header */}
        <div className="mb-12 sm:mb-16">
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0] mb-2">
            Sirah Nabawiyah
          </h1>
          <p className="text-sm text-[#8B8070]/50">
            Dari dunia sebelum Islam hingga cahaya yang menyeluruh
          </p>
        </div>

        {/* Timeline */}
        {journeys.map((journey, i) => (
          <TimelineJourney
            key={journey.id}
            journey={journey}
            isFirst={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
