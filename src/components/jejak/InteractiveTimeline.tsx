'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronRight, BookOpen, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { phases } from '@/data/phases';
import { events } from '@/data/events';
import { getCharacterById } from '@/data/characters';
import { getLocationById } from '@/data/locations';

export default function InteractiveTimeline() {
  const { navigateTo } = useNavigation();
  const { readEvents, currentEventId } = useReadingProgress();
  const [expandedPhase, setExpandedPhase] = useState<string | null>(null);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedEvent = selectedEventId
    ? events.find((e) => e.id === selectedEventId)
    : null;
  const selectedLocation = selectedEvent
    ? getLocationById(selectedEvent.locationId)
    : null;
  const selectedCharacters = selectedEvent
    ? selectedEvent.characterIds
        .map((id) => getCharacterById(id))
        .filter(Boolean)
    : [];

  const togglePhase = (phaseId: string) => {
    setExpandedPhase(expandedPhase === phaseId ? null : phaseId);
    setSelectedEventId(null);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif-display text-3xl sm:text-4xl text-gradient-gold mb-3">
            Timeline Sirah Nabawiyah
          </h1>
          <p className="text-[#8B8070] max-w-lg mx-auto">
            Ikuti setiap fase kehidupan Rasulullah ﷺ secara kronologis
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left: Timeline */}
          <div className="flex-1 lg:max-w-xl">
            <div className="relative">
              {/* Vertical gold line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-[#F5D78E]/20 via-[#D4A843]/30 to-[#8B6914]/10" />
              {/* Glow on the line */}
              <div className="absolute left-6 top-0 bottom-0 w-3 -translate-x-1 bg-gradient-to-b from-[#F5D78E]/5 via-[#D4A843]/8 to-transparent blur-sm" />

              <div className="space-y-2">
                {phases.map((phase, phaseIdx) => {
                  const phaseEvents = events
                    .filter((e) => e.phaseId === phase.id)
                    .sort((a, b) => a.order - b.order);
                  const isExpanded = expandedPhase === phase.id;
                  const hasCurrentEvent = phaseEvents.some(
                    (e) => e.id === currentEventId
                  );

                  return (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: phaseIdx * 0.08,
                      }}
                    >
                      {/* Phase marker */}
                      <button
                        onClick={() => togglePhase(phase.id)}
                        className={`relative flex items-center gap-4 w-full text-left py-4 px-2 rounded-lg transition-colors duration-200 group ${
                          isExpanded
                            ? 'bg-[rgba(245,215,142,0.04)]'
                            : 'hover:bg-[rgba(245,215,142,0.02)]'
                        }`}
                      >
                        {/* Phase dot */}
                        <div className="relative z-10 flex-shrink-0 ml-3">
                          <div
                            className={`w-5 h-5 rounded-full border-2 transition-all duration-300 ${
                              hasCurrentEvent ? 'scale-125' : ''
                            } ${
                              isExpanded
                                ? 'ring-2 ring-offset-2 ring-offset-[#080B16]'
                                : ''
                            }`}
                            style={{
                              borderColor: phase.color,
                              backgroundColor: isExpanded
                                ? phase.color
                                : `${phase.color}33`,
                              ...(isExpanded
                                ? { ringColor: phase.color }
                                : {}),
                            }}
                          />
                          {hasCurrentEvent && (
                            <div
                              className="absolute -inset-1 rounded-full opacity-40 blur-sm"
                              style={{ backgroundColor: phase.color }}
                            />
                          )}
                        </div>

                        {/* Phase info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span
                              className="text-xs font-medium"
                              style={{ color: phase.color }}
                            >
                              {phase.period}
                            </span>
                          </div>
                          <h3
                            className={`font-serif-display text-base sm:text-lg transition-colors duration-200 ${
                              isExpanded
                                ? 'text-[#F5D78E]'
                                : 'text-[#F0EBE0] group-hover:text-[#C4B59A]'
                            }`}
                          >
                            {phase.name}
                          </h3>
                        </div>

                        {/* Expand icon */}
                        <div className="flex-shrink-0 mr-2">
                          <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronDown
                              className="h-4 w-4 text-[#8B8070]"
                            />
                          </motion.div>
                        </div>
                      </button>

                      {/* Events within phase */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                            className="overflow-hidden"
                          >
                            <div className="ml-12 pl-6 border-l border-[rgba(245,215,142,0.08)] space-y-1 pb-2">
                              {phaseEvents.map((event, eventIdx) => {
                                const isRead = readEvents.includes(event.id);
                                const isCurrent = event.id === currentEventId;
                                const isSelected =
                                  event.id === selectedEventId;

                                return (
                                  <motion.button
                                    key={event.id}
                                    className={`relative w-full text-left py-3 px-4 rounded-lg transition-all duration-200 ${
                                      isSelected
                                        ? 'bg-[rgba(245,215,142,0.08)] border border-[rgba(245,215,142,0.15)]'
                                        : 'hover:bg-[rgba(245,215,142,0.03)] border border-transparent'
                                    }`}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                      duration: 0.3,
                                      delay: eventIdx * 0.06,
                                    }}
                                    onClick={() =>
                                      setSelectedEventId(event.id)
                                    }
                                  >
                                    <div className="flex items-center gap-3">
                                      {/* Event dot */}
                                      <div
                                        className={`flex-shrink-0 w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                                          isCurrent
                                            ? 'ring-2 ring-[#F5D78E] ring-offset-1 ring-offset-[#080B16]'
                                            : ''
                                        } ${
                                          isRead
                                            ? 'bg-[#D4A843]'
                                            : 'bg-[rgba(245,215,142,0.25)]'
                                        }`}
                                      />

                                      {/* Event info */}
                                      <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs text-[#8B8070]">
                                            {event.year}
                                          </span>
                                          {isRead && (
                                            <span className="text-[10px] text-[#D4A843] bg-[rgba(212,168,67,0.1)] px-1.5 py-0.5 rounded">
                                              dibaca
                                            </span>
                                          )}
                                        </div>
                                        <p
                                          className={`text-sm font-medium truncate ${
                                            isSelected
                                              ? 'text-[#F5D78E]'
                                              : 'text-[#F0EBE0]'
                                          }`}
                                        >
                                          {event.title}
                                        </p>
                                        <p className="text-xs text-[#8B8070] truncate">
                                          {event.subtitle}
                                        </p>
                                      </div>

                                      <ChevronRight className="h-4 w-4 text-[#8B8070] flex-shrink-0" />
                                    </div>
                                  </motion.button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right: Preview Panel */}
          <div className="flex-1 lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {selectedEvent ? (
                <motion.div
                  key={selectedEvent.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0F1629] border border-[rgba(245,215,142,0.1)] rounded-xl overflow-hidden"
                >
                  {/* Preview header with gradient */}
                  <div
                    className="p-6 sm:p-8"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(245,215,142,0.05) 0%, transparent 60%)',
                    }}
                  >
                    <Badge
                      variant="outline"
                      className="border-[rgba(245,215,142,0.2)] text-[#F5D78E] mb-3"
                    >
                      {selectedEvent.year}
                    </Badge>
                    <h2 className="font-serif-display text-xl sm:text-2xl text-[#F0EBE0] mb-2">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-[#C4B59A] text-sm mb-4">
                      {selectedEvent.subtitle}
                    </p>
                    <p className="text-[#8B8070] text-sm leading-relaxed">
                      {selectedEvent.description}
                    </p>
                  </div>

                  {/* Related info */}
                  <div className="px-6 sm:px-8 pb-6 sm:pb-8 space-y-4">
                    {/* Location */}
                    {selectedLocation && (
                      <div className="flex items-start gap-3">
                        <MapPin className="h-4 w-4 text-[#D4A843] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-[#8B8070]">Lokasi</p>
                          <button
                            onClick={() =>
                              navigateTo('location', selectedLocation.id)
                            }
                            className="text-sm text-[#C4B59A] hover:text-[#F5D78E] transition-colors duration-200"
                          >
                            {selectedLocation.name}
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Characters */}
                    {selectedCharacters.length > 0 && (
                      <div className="flex items-start gap-3">
                        <Users className="h-4 w-4 text-[#D4A843] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs text-[#8B8070] mb-1">Tokoh</p>
                          <div className="flex flex-wrap gap-1.5">
                            {selectedCharacters.map(
                              (char) =>
                                char && (
                                  <button
                                    key={char.id}
                                    onClick={() =>
                                      navigateTo('character', char.id)
                                    }
                                    className="text-xs text-[#C4B59A] bg-[rgba(245,215,142,0.06)] px-2 py-1 rounded hover:text-[#F5D78E] hover:bg-[rgba(245,215,142,0.1)] transition-colors duration-200"
                                  >
                                    {char.name}
                                  </button>
                                )
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* CTA */}
                    <Button
                      onClick={() =>
                        navigateTo('reader', selectedEvent.id)
                      }
                      className="w-full bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold hover:from-[#F5D78E] hover:to-[#D4A843] transition-all duration-300 rounded-lg mt-4"
                    >
                      <BookOpen className="h-4 w-4 mr-2" />
                      Baca Kisah
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0F1629]/50 border border-[rgba(245,215,142,0.06)] rounded-xl p-8 sm:p-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[rgba(245,215,142,0.06)] flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="h-8 w-8 text-[#8B6914]" />
                  </div>
                  <h3 className="font-serif-display text-lg text-[#8B8070] mb-2">
                    Pilih Peristiwa
                  </h3>
                  <p className="text-sm text-[#8B8070]/70">
                    Klik pada fase untuk melihat peristiwa, lalu pilih
                    peristiwa untuk melihat pratinjau
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
