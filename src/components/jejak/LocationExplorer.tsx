'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, X, BookOpen, ChevronRight, Navigation } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { useJejakNav } from '@/lib/useJejakNav';
import { locations, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import type { StoryLocation } from '@/data/content';

function LocationCard({ location, onSelect, isSelected, isLight }: { location: StoryLocation; onSelect: () => void; isSelected: boolean; isLight: boolean }) {
  return (
    <motion.button
      onClick={onSelect}
      className={`w-full text-left p-4 sm:p-5 rounded-xl border transition-all duration-200 ${
        isSelected
          ? isLight
            ? 'bg-ink/[0.04] border-gold/30'
            : 'bg-navy-light border-lantern-mid/30'
          : isLight
            ? 'bg-transparent border-ink/10 hover:border-ink/20'
            : 'bg-navy border-sand/10 hover:border-sand/20'
      }`}
      whileHover={{ y: -1 }}
      transition={{ duration: 0.15 }}
    >
      <div className="flex items-start gap-3">
        <div className={`flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
          isSelected
            ? isLight ? 'bg-gold/15' : 'bg-lantern-mid/20'
            : isLight ? 'bg-gold/10' : 'bg-lantern-mid/10'
        }`}>
          <MapPin className={`w-4 h-4 ${isSelected ? (isLight ? 'text-gold' : 'text-lantern') : (isLight ? 'text-gold-soft' : 'text-lantern-mid')}`} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className={`font-serif-display font-bold mb-0.5 ${
            isSelected ? (isLight ? 'text-gold' : 'text-lantern') : (isLight ? 'text-ink' : 'text-cream')
          }`}>
            {location.name}
          </h3>
          <p className={`text-xs line-clamp-2 leading-relaxed mb-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>{location.description}</p>
          <div className={`flex items-center gap-2 text-[10px] ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
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

function LocationDetail({ location, onClose, isLight }: { location: StoryLocation; onClose: () => void; isLight: boolean }) {
  const { navigateTo } = useNavigation();
  const { goToBab } = useJejakNav();
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
      className={`p-5 sm:p-6 rounded-2xl border ${
        isLight
          ? 'bg-white/50 border-ink/10'
          : 'bg-navy border-lantern-mid/15'
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MapPin className={`w-5 h-5 ${isLight ? 'text-gold-soft' : 'text-lantern-mid'}`} />
            <h2 className={`font-serif-display text-xl font-bold ${isLight ? 'text-gold' : 'text-lantern'}`}>{location.name}</h2>
          </div>
          <p className={`text-xs flex items-center gap-1 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            <Navigation className="w-3 h-3" />
            {location.coordinates}
          </p>
        </div>
        <button
          onClick={onClose}
          className={`p-1.5 rounded-lg transition-colors ${
            isLight ? 'hover:bg-ink/[0.06] text-ink-light' : 'hover:bg-sand/[0.08] text-warm-muted'
          }`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-5">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          isLight ? 'bg-gold/10 text-gold' : 'bg-lantern-mid/15 text-lantern-mid'
        }`}>
          {location.significance}
        </span>
      </div>

      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>Deskripsi</h3>
        <p className={`text-sm leading-relaxed ${isLight ? 'text-ink-soft' : 'text-warm-muted'}`}>{location.fullDescription}</p>
      </div>

      {relatedEvents.length > 0 && (
        <div>
          <h3 className={`text-sm font-medium mb-3 flex items-center gap-1.5 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            <BookOpen className="w-3.5 h-3.5" />
            Kisah di Lokasi Ini
          </h3>
          <div className="space-y-2">
            {relatedEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => goToBab(evt.id)}
                className={`w-full text-left p-3 rounded-lg border transition-colors duration-200 group ${
                  isLight
                    ? 'bg-transparent border-ink/[0.06] hover:border-gold/30'
                    : 'bg-navy-light/60 border-sand/[0.06] hover:border-lantern-mid/20'
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className={`text-[10px] ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>{evt.year}</span>
                    <h4 className={`text-sm transition-colors duration-200 ${
                      isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                    }`}>{evt.title}</h4>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors duration-200 ${
                    isLight ? 'text-ink-light group-hover:text-gold' : 'text-warm-muted group-hover:text-lantern-mid'
                  }`} />
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
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  const selectedLocation = selectedId ? locations.find((l) => l.id === selectedId) || null : null;

  return (
    <section className={`min-h-screen pt-20 pb-24 md:pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`font-serif-display text-2xl sm:text-3xl font-bold mb-2 ${isLight ? 'text-ink' : 'text-cream'}`}>
            Peta Lokasi Bersejarah
          </h1>
          <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
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
                  isLight={isLight}
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
                    isLight={isLight}
                  />
                ) : (
                  <div className={`p-6 rounded-2xl text-center text-sm ${
                    isLight
                      ? 'bg-ink/[0.02] border border-ink/[0.06] text-ink-light'
                      : 'bg-navy/50 border border-sand/[0.06] text-warm-muted'
                  }`}>
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
