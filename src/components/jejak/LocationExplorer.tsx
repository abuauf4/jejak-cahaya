'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, BookOpen, ChevronRight, Navigation } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { locations, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import type { StoryLocation } from '@/data/content';

function LocationCard({ location, onSelect, isSelected }: { location: StoryLocation; onSelect: () => void; isSelected: boolean }) {
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left p-5 rounded-xl border transition-all ${
        isSelected
          ? 'bg-[#1A2038] border-[rgba(245,215,142,0.2)]'
          : 'bg-[#0F1629] border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)]'
      }`}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${isSelected ? 'bg-[#D4A843]/20' : 'bg-[#D4A843]/10'}`}>
          <MapPin className={`w-5 h-5 ${isSelected ? 'text-[#F5D78E]' : 'text-[#D4A843]'}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-serif-display font-bold mb-0.5 ${isSelected ? 'text-[#F5D78E]' : 'text-[#F0EBE0]'}`}>
            {location.name}
          </h3>
          <p className="text-xs text-[#8B8070] line-clamp-2 leading-relaxed mb-2">{location.description}</p>
          <div className="flex items-center gap-2 text-[10px] text-[#8B8070]/60">
            <span className="flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5" />
              {location.eventIds.length} kisah
            </span>
            <span className="flex items-center gap-1">
              <Navigation className="w-2.5 h-2.5" />
              {location.coordinates}
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  );
}

function LocationDetail({ location, onClose }: { location: StoryLocation; onClose: () => void }) {
  const { navigateTo } = useNavigation();
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const relatedEvents = allEvents.filter((e) => location.eventIds.includes(e.id));

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.1)]"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-5 h-5 text-[#D4A843]" />
            <h2 className="font-serif-display text-xl font-bold text-[#F5D78E]">{location.name}</h2>
          </div>
          <p className="text-xs text-[#8B8070] flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            {location.coordinates}
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-[#8B8070] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-5">
        <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4A843]/10 text-[#D4A843] font-medium">
          {location.significance}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#C4B59A] mb-2">Deskripsi</h3>
        <p className="text-sm text-[#8B8070] leading-relaxed">{location.fullDescription}</p>
      </div>

      {relatedEvents.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Kisah di Lokasi Ini
          </h3>
          <div className="space-y-2">
            {relatedEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => navigateTo('reader', evt.id)}
                className="w-full text-left p-3 rounded-lg bg-[#1A2038]/60 border border-[rgba(245,215,142,0.04)] hover:border-[rgba(245,215,142,0.1)] transition-colors group"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#8B8070]">{evt.year}</span>
                    <h4 className="text-sm text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors">{evt.title}</h4>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] flex-shrink-0" />
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function LocationExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const selectedLocation = selectedId ? locations.find((l) => l.id === selectedId) || null : null;

  return (
    <section className="min-h-screen pt-20 pb-24 bg-[#080B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0] mb-2">
            Peta Lokasi Bersejarah
          </h1>
          <p className="text-sm text-[#8B8070]">
            Lokasi-lokasi penting dalam perjalanan Sirah Nabawiyah
          </p>
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {locations.map((loc) => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  onSelect={() => setSelectedId(loc.id === selectedId ? null : loc.id)}
                  isSelected={loc.id === selectedId}
                />
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <AnimatePresence mode="wait">
                {selectedLocation ? (
                  <LocationDetail
                    location={selectedLocation}
                    onClose={() => setSelectedId(null)}
                  />
                ) : (
                  <div className="p-6 rounded-2xl bg-[#0F1629]/50 border border-[rgba(245,215,142,0.04)] text-center text-sm text-[#8B8070]/60">
                    Pilih lokasi untuk melihat detail
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
