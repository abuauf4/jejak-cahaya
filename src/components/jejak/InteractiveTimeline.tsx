'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen, MapPin, Clock, Users, ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { getActiveCollection, getJourneysByCollection, getEventsByJourney, getCharactersByEvent, getLocationById } from '@/data/content';
import type { Journey, StoryEvent } from '@/data/content';

function JourneyNode({ journey, isSelected, onSelect }: { journey: Journey; isSelected: boolean; onSelect: () => void }) {
  const journeyEvents = getEventsByJourney(journey.id);

  return (
    <div className="relative">
      {/* Timeline connector */}
      <div className="absolute left-[23px] top-12 bottom-0 w-[2px] bg-gradient-to-b from-[#D4A843]/30 to-[#D4A843]/5" />

      {/* Journey item */}
      <button
        onClick={onSelect}
        className={`relative flex items-start gap-4 p-4 rounded-xl w-full text-left transition-all ${
          isSelected
            ? 'bg-[#1A2038] border border-[rgba(245,215,142,0.15)]'
            : 'hover:bg-[#0F1629]/60 border border-transparent'
        }`}
      >
        {/* Dot */}
        <div
          className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 mt-0.5"
          style={{
            borderColor: journey.color,
            backgroundColor: isSelected ? `${journey.color}25` : `${journey.color}10`,
          }}
        >
          <span className="text-sm font-bold" style={{ color: journey.color }}>
            {journey.order}
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className={`font-serif-display text-lg font-bold truncate ${isSelected ? 'text-[#F5D78E]' : 'text-[#F0EBE0]'}`}>
              {journey.title}
            </h3>
            <motion.div
              animate={{ rotate: isSelected ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronDown className="w-4 h-4 text-[#8B8070]" />
            </motion.div>
          </div>
          <div className="flex items-center gap-3 mt-1 text-xs text-[#8B8070]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {journey.period}
            </span>
            <span>{journeyEvents.length} kisah</span>
          </div>
        </div>
      </button>

      {/* Expanded events */}
      <AnimatePresence>
        {isSelected && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden ml-16 mb-2"
          >
            <p className="text-sm text-[#8B8070] mb-3 leading-relaxed">{journey.description}</p>
            <div className="space-y-2">
              {journeyEvents.map((event) => (
                <EventListItem key={event.id} event={event} journeyColor={journey.color} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function EventListItem({ event, journeyColor }: { event: StoryEvent; journeyColor: string }) {
  const { navigateTo } = useNavigation();
  const characters = getCharactersByEvent(event.id);
  const location = getLocationById(event.locationId);

  return (
    <button
      onClick={() => navigateTo('reader', event.id)}
      className="w-full text-left p-3 rounded-lg bg-[#0F1629]/40 border border-[rgba(245,215,142,0.04)] hover:border-[rgba(245,215,142,0.12)] hover:bg-[#0F1629] transition-all group"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-0.5">
            <span
              className="text-[10px] px-1.5 py-0.5 rounded font-medium"
              style={{ backgroundColor: `${journeyColor}15`, color: journeyColor }}
            >
              {event.year}
            </span>
            {event.featured && (
              <span className="text-[10px] text-[#F5D78E]">★</span>
            )}
          </div>
          <h4 className="text-sm font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors truncate">
            {event.title}
          </h4>
          <div className="flex items-center gap-2 mt-1 text-[10px] text-[#8B8070]/70">
            {location && (
              <span className="flex items-center gap-0.5">
                <MapPin className="w-2.5 h-2.5" />
                {location.name}
              </span>
            )}
            {characters.length > 0 && (
              <span>{characters.slice(0, 2).map((c) => c.name.split(' ')[0]).join(', ')}</span>
            )}
          </div>
        </div>
        <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] transition-colors flex-shrink-0" />
      </div>
    </button>
  );
}

function EventPreview({ event }: { event: StoryEvent }) {
  const { navigateTo } = useNavigation();
  const characters = getCharactersByEvent(event.id);
  const location = getLocationById(event.locationId);

  return (
    <motion.div
      key={event.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.1)]"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4A843]/10 text-[#D4A843] font-medium">
          {event.year}
        </span>
        {event.featured && (
          <span className="text-xs px-2.5 py-1 rounded-full bg-[#F5D78E]/10 text-[#F5D78E] font-medium">
            Unggulan
          </span>
        )}
      </div>

      <h3 className="font-serif-display text-xl font-bold text-[#F0EBE0] mb-1">
        {event.title}
      </h3>
      <p className="text-sm text-[#C4B59A] mb-4">{event.subtitle}</p>
      <p className="text-sm text-[#8B8070] leading-relaxed mb-6">{event.description}</p>

      {/* Characters */}
      {characters.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center gap-1.5 mb-2 text-xs text-[#8B8070]">
            <Users className="w-3 h-3" />
            Tokoh terkait
          </div>
          <div className="flex flex-wrap gap-2">
            {characters.map((c) => (
              <button
                key={c.id}
                onClick={() => navigateTo('character', c.id)}
                className="text-xs px-2.5 py-1 rounded-full bg-[#1A2038] text-[#C4B59A] border border-[rgba(245,215,142,0.08)] hover:border-[rgba(245,215,142,0.2)] transition-colors"
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Location */}
      {location && (
        <div className="mb-6">
          <div className="flex items-center gap-1.5 mb-2 text-xs text-[#8B8070]">
            <MapPin className="w-3 h-3" />
            Lokasi
          </div>
          <button
            onClick={() => navigateTo('location', location.id)}
            className="text-xs px-2.5 py-1 rounded-full bg-[#1A2038] text-[#C4B59A] border border-[rgba(245,215,142,0.08)] hover:border-[rgba(245,215,142,0.2)] transition-colors"
          >
            {location.name}
          </button>
        </div>
      )}

      <button
        onClick={() => navigateTo('reader', event.id)}
        className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold rounded-lg text-sm hover:shadow-lg hover:shadow-[#D4A843]/20 transition-all active:scale-[0.98]"
      >
        Baca Kisah
        <ArrowRight className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export default function InteractiveTimeline() {
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const [selectedJourneyId, setSelectedJourneyId] = useState<string>(journeys[0]?.id || '');
  const [selectedEvent, setSelectedEvent] = useState<StoryEvent | null>(null);

  const selectedJourney = journeys.find((j) => j.id === selectedJourneyId);
  const journeyEvents = selectedJourney ? getEventsByJourney(selectedJourney.id) : [];

  return (
    <section className="min-h-screen pt-20 pb-24 bg-[#080B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs text-[#D4A843] font-medium uppercase tracking-wider">Timeline</span>
          </div>
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0]">
            {activeCollection?.title || 'Timeline'}
          </h1>
          <p className="text-sm text-[#8B8070] mt-1">{activeCollection?.subtitle}</p>
        </div>

        {/* Desktop layout: sidebar + content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left: Journey list */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-20 space-y-1">
              {journeys.map((journey) => (
                <JourneyNode
                  key={journey.id}
                  journey={journey}
                  isSelected={selectedJourneyId === journey.id}
                  onSelect={() => {
                    setSelectedJourneyId(journey.id);
                    const events = getEventsByJourney(journey.id);
                    setSelectedEvent(events[0] || null);
                  }}
                />
              ))}
            </div>
          </div>

          {/* Right: Preview */}
          <div className="flex-1 min-w-0">
            {selectedEvent ? (
              <div className="lg:sticky lg:top-20">
                <EventPreview event={selectedEvent} />

                {/* All events in journey */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-[#8B8070] mb-3">
                    Semua kisah dalam perjalanan ini
                  </h4>
                  <div className="space-y-2">
                    {journeyEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setSelectedEvent(event)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${
                          selectedEvent.id === event.id
                            ? 'bg-[#1A2038] border-[rgba(245,215,142,0.15)]'
                            : 'bg-[#0F1629]/40 border-[rgba(245,215,142,0.04)] hover:border-[rgba(245,215,142,0.1)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-[#8B8070]">{event.year}</span>
                            <h5 className="text-sm text-[#F0EBE0]">{event.title}</h5>
                          </div>
                          {selectedEvent.id === event.id && (
                            <div className="w-2 h-2 rounded-full bg-[#F5D78E]" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-64 text-[#8B8070] text-sm">
                Pilih perjalanan untuk melihat kisah
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
