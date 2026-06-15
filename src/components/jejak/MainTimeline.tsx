'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen, MapPin, Clock } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney, getCharactersByEvent, getLocationById } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function JourneySection({ journey, index }: { journey: Journey; index: number }) {
  const [expanded, setExpanded] = useState(index === 0);
  const { navigateTo } = useNavigation();
  const journeyEvents = getEventsByJourney(journey.id);

  return (
    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4A843]/40 via-[#D4A843]/20 to-transparent" />

      {/* Journey marker */}
      <div className="relative flex items-start gap-4 sm:gap-6">
        {/* Dot on timeline */}
        <div className="relative z-10 flex-shrink-0 mt-1">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center border-2"
            style={{
              borderColor: journey.color,
              backgroundColor: `${journey.color}15`,
            }}
          >
            <span className="text-xs font-bold" style={{ color: journey.color }}>
              {journey.order}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 pb-8 min-w-0">
          <button
            onClick={() => setExpanded(!expanded)}
            className="w-full text-left group"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-serif-display text-lg sm:text-xl font-bold text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors truncate">
                  {journey.title}
                </h3>
                <div className="flex items-center gap-3 mt-1 text-xs text-[#8B8070]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {journey.period}
                  </span>
                  <span>{journeyEvents.length} kisah</span>
                </div>
              </div>
              <motion.div
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0 text-[#8B8070]"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </div>
          </button>

          {/* Expanded events */}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-[#8B8070] mt-2 mb-4 leading-relaxed">
                  {journey.description}
                </p>

                <div className="space-y-2">
                  {journeyEvents.map((event) => (
                    <EventCard key={event.id} event={event} journeyColor={journey.color} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function EventCard({ event, journeyColor }: { event: StoryEvent; journeyColor: string }) {
  const { navigateTo } = useNavigation();
  const characters = getCharactersByEvent(event.id);
  const location = getLocationById(event.locationId);

  return (
    <motion.button
      onClick={() => navigateTo('reader', event.id)}
      className="w-full text-left p-4 rounded-xl bg-[#0F1629]/60 border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.15)] hover:bg-[#0F1629] transition-all group"
      whileHover={{ x: 4 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="text-[10px] px-2 py-0.5 rounded-full font-medium"
              style={{
                backgroundColor: `${journeyColor}15`,
                color: journeyColor,
              }}
            >
              {event.year}
            </span>
            {event.featured && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#F5D78E]/10 text-[#F5D78E] font-medium">
                Unggulan
              </span>
            )}
          </div>
          <h4 className="font-medium text-[#F0EBE0] text-sm group-hover:text-[#F5D78E] transition-colors">
            {event.title}
          </h4>
          <p className="text-xs text-[#8B8070] mt-1 line-clamp-2">{event.description}</p>

          {/* Meta */}
          <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8B8070]/70">
            {location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {location.name}
              </span>
            )}
            {characters.length > 0 && (
              <span className="flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                {characters.slice(0, 2).map((c) => c.name.split(' ')[0]).join(', ')}
                {characters.length > 2 && ` +${characters.length - 2}`}
              </span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] transition-colors flex-shrink-0 mt-1" />
      </div>
    </motion.button>
  );
}

export default function MainTimeline() {
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];

  return (
    <section className="relative py-16 sm:py-24 bg-[#080B16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-[2px] bg-gradient-to-r from-[#D4A843] to-transparent" />
            <span className="text-xs text-[#D4A843] font-medium uppercase tracking-wider">Timeline</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#F0EBE0] mb-3">
            Sirah Nabawiyah: Dari Kegelapan ke Cahaya
          </h2>
          <p className="text-[#8B8070] text-sm sm:text-base max-w-xl leading-relaxed">
            Setiap perjalanan adalah babak. Dari konteks dunia pra-Islam hingga cahaya yang menyeluruh — ikuti alurnya.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {journeys.map((journey, index) => (
            <JourneySection key={journey.id} journey={journey} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
