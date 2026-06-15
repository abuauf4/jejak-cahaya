'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { characters, getCharactersByEvent, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import type { Character } from '@/data/content';

function CharacterCard({ character, onSelect, isSelected, isLight }: { character: Character; onSelect: () => void; isSelected: boolean; isLight: boolean }) {
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={`font-serif-display font-bold mb-0.5 ${
            isSelected
              ? isLight ? 'text-gold' : 'text-lantern'
              : isLight ? 'text-ink' : 'text-cream'
          }`}>
            {character.name}
          </h3>
          <p className={`text-xs mb-2 ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>{character.title}</p>
          <p className={`text-xs line-clamp-2 leading-relaxed ${isLight ? 'text-ink-soft' : 'text-sand'}`}>{character.shortBio}</p>
          <div className={`flex items-center gap-3 mt-2 text-[10px] ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
            <span className="flex items-center gap-1">
              <Clock className="w-2.5 h-2.5" />
              {character.period}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-2.5 h-2.5" />
              {character.eventIds.length} kisah
            </span>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 ${
          isSelected
            ? isLight ? 'text-gold' : 'text-lantern-mid'
            : isLight ? 'text-ink-light' : 'text-warm-muted'
        }`} />
      </div>
    </motion.button>
  );
}

function CharacterDetail({ character, onClose, isLight }: { character: Character; onClose: () => void; isLight: boolean }) {
  const { navigateTo } = useNavigation();
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const relatedEvents = allEvents.filter((e) => character.eventIds.includes(e.id));

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
          <h2 className={`font-serif-display text-xl font-bold mb-1 ${isLight ? 'text-gold' : 'text-lantern'}`}>
            {character.name}
          </h2>
          <p className={`text-sm ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>{character.title}</p>
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

      <div className={`flex items-center gap-3 text-xs mb-5 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {character.period}
        </span>
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${
          isLight ? 'bg-gold/10 text-gold' : 'bg-navy-light text-sand'
        }`}>
          {character.role}
        </span>
      </div>

      <div className="mb-6">
        <h3 className={`text-sm font-medium mb-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>Biografi</h3>
        <p className={`text-sm leading-relaxed ${isLight ? 'text-ink-soft' : 'text-warm-muted'}`}>{character.fullBio}</p>
      </div>

      {relatedEvents.length > 0 && (
        <div className="mb-6">
          <h3 className={`text-sm font-medium mb-3 flex items-center gap-1.5 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            <BookOpen className="w-3.5 h-3.5" />
            Kisah Terkait
          </h3>
          <div className="space-y-2">
            {relatedEvents.map((evt) => (
              <button
                key={evt.id}
                onClick={() => navigateTo('reader', evt.id)}
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

      {character.references.length > 0 && (
        <div>
          <h3 className={`text-sm font-medium mb-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>Referensi</h3>
          <div className="flex flex-wrap gap-2">
            {character.references.map((ref, i) => (
              <span key={i} className={`text-[10px] px-2 py-1 rounded ${
                isLight ? 'bg-ink/[0.04] text-ink-soft' : 'bg-navy-light text-warm-muted'
              }`}>
                {ref}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function CharacterEncyclopedia() {
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  const filteredCharacters = useMemo(() => {
    if (!search.trim()) return characters;
    const q = search.toLowerCase();
    return characters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.shortBio.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedCharacter = selectedId ? characters.find((c) => c.id === selectedId) || null : null;

  return (
    <section className={`min-h-screen pt-20 pb-24 md:pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`font-serif-display text-2xl sm:text-3xl font-bold mb-2 ${isLight ? 'text-ink' : 'text-cream'}`}>
            Ensiklopedia Tokoh
          </h1>
          <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            Tokoh-tokoh penting dalam Sirah Nabawiyah
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`} />
          <input
            type="text"
            placeholder="Cari tokoh..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full pl-10 pr-10 py-2.5 rounded-lg text-sm transition-colors border ${
              isLight
                ? 'bg-white/50 border-ink/10 text-ink placeholder:text-ink-light focus:border-gold/40'
                : 'bg-navy border-sand/10 text-cream placeholder:text-warm-muted focus:border-lantern-mid/40'
            } focus:outline-none`}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 transition-colors ${
                isLight ? 'text-ink-light hover:text-ink' : 'text-warm-muted hover:text-sand'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grid */}
          <div className="flex-1 min-w-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {filteredCharacters.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  onSelect={() => setSelectedId(char.id === selectedId ? null : char.id)}
                  isSelected={char.id === selectedId}
                  isLight={isLight}
                />
              ))}
            </div>
            {filteredCharacters.length === 0 && (
              <div className={`text-center py-16 text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                Tidak ada tokoh yang ditemukan
              </div>
            )}
          </div>

          {/* Detail panel */}
          <div className="lg:w-[380px] flex-shrink-0">
            <div className="lg:sticky lg:top-20">
              <AnimatePresence mode="wait">
                {selectedCharacter ? (
                  <CharacterDetail
                    character={selectedCharacter}
                    onClose={() => setSelectedId(null)}
                    isLight={isLight}
                  />
                ) : (
                  <div className={`p-6 rounded-2xl text-center text-sm ${
                    isLight
                      ? 'bg-ink/[0.02] border border-ink/[0.06] text-ink-light'
                      : 'bg-navy/50 border border-sand/[0.06] text-warm-muted'
                  }`}>
                    Pilih tokoh untuk melihat detail
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
