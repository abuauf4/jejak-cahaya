'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ChevronDown, BookOpen, Navigation } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useNavigation } from '@/lib/store';
import { locations } from '@/data/locations';
import { events } from '@/data/events';

export default function LocationExplorer() {
  const { navigateTo } = useNavigation();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const locationsWithEvents = useMemo(() => {
    return locations.map((loc) => ({
      ...loc,
      relatedEvents: events.filter((e) => loc.eventIds.includes(e.id)),
    }));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-serif-display text-3xl sm:text-4xl text-gradient-gold mb-3">
            Jelajahi Lokasi
          </h1>
          <p className="text-[#8B8070] max-w-lg mx-auto">
            Tempat-tempat bersejarah dalam perjalanan Sirah Nabawiyah
          </p>
        </motion.div>

        {/* Location Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {locationsWithEvents.map((location, idx) => {
            const isExpanded = expandedId === location.id;

            return (
              <motion.div
                key={location.id}
                className={`bg-[#0F1629] border rounded-xl overflow-hidden transition-all duration-300 ${
                  isExpanded
                    ? 'border-[rgba(245,215,142,0.25)] glow-gold sm:col-span-2 lg:col-span-3'
                    : 'border-[rgba(245,215,142,0.08)] hover:border-[rgba(245,215,142,0.18)]'
                }`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: Math.min(idx * 0.06, 0.5) }}
              >
                {/* Card Header - always visible */}
                <button
                  onClick={() =>
                    setExpandedId(isExpanded ? null : location.id)
                  }
                  className="w-full text-left p-5 sm:p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[rgba(245,215,142,0.08)] flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-[#D4A843]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-serif-display text-lg text-[#F0EBE0] group-hover:text-[#F5D78E]">
                          {location.name}
                        </h3>
                      </div>
                      <Badge
                        variant="outline"
                        className="border-[rgba(245,215,142,0.15)] text-[#C4B59A] text-[10px] mb-2"
                      >
                        {location.significance}
                      </Badge>
                      <p className="text-sm text-[#8B8070] line-clamp-2 leading-relaxed">
                        {location.description}
                      </p>
                    </div>
                    <motion.div
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="h-5 w-5 text-[#8B8070]" />
                    </motion.div>
                  </div>
                </button>

                {/* Expanded content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 sm:px-6 pb-6 border-t border-[rgba(245,215,142,0.08)] pt-5">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          {/* Full description */}
                          <div>
                            <h4 className="text-sm font-medium text-[#C4B59A] mb-3">
                              Deskripsi Lengkap
                            </h4>
                            <div className="max-h-64 overflow-y-auto pr-1">
                              {location.fullDescription
                                .split('\n')
                                .filter((p) => p.trim())
                                .map((paragraph, pIdx) => (
                                  <p
                                    key={pIdx}
                                    className="text-sm text-[#8B8070] leading-relaxed mb-3"
                                  >
                                    {paragraph}
                                  </p>
                                ))}
                            </div>
                          </div>

                          {/* Right side: Coordinates + Events */}
                          <div className="space-y-5">
                            {/* Coordinates */}
                            <div>
                              <h4 className="text-sm font-medium text-[#C4B59A] mb-2 flex items-center gap-2">
                                <Navigation className="h-3.5 w-3.5 text-[#D4A843]" />
                                Koordinat
                              </h4>
                              <p className="text-sm text-[#8B8070] font-mono">
                                {location.coordinates}
                              </p>
                            </div>

                            {/* Related events */}
                            {location.relatedEvents.length > 0 && (
                              <div>
                                <h4 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-2">
                                  <BookOpen className="h-3.5 w-3.5 text-[#D4A843]" />
                                  Peristiwa di Lokasi Ini
                                </h4>
                                <div className="space-y-2">
                                  {location.relatedEvents.map((event) => (
                                    <button
                                      key={event.id}
                                      onClick={() =>
                                        navigateTo('reader', event.id)
                                      }
                                      className="flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-lg bg-[rgba(245,215,142,0.04)] hover:bg-[rgba(245,215,142,0.08)] transition-colors duration-200"
                                    >
                                      <span className="text-xs text-[#8B8070] flex-shrink-0">
                                        {event.year}
                                      </span>
                                      <span className="text-sm text-[#F0EBE0] truncate">
                                        {event.title}
                                      </span>
                                    </button>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
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
  );
}
