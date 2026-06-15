'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Clock, ChevronRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { characters, getCharactersByEvent, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import type { Character } from '@/data/content';

function CharacterCard({ character, onSelect, isSelected }: { character: Character; onSelect: () => void; isSelected: boolean }) {
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
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className={`font-serif-display font-bold text-[#F0EBE0] mb-0.5 ${isSelected ? 'text-[#F5D78E]' : ''}`}>
            {character.name}
          </h3>
          <p className="text-xs text-[#D4A843] mb-2">{character.title}</p>
          <p className="text-xs text-[#8B8070] line-clamp-2 leading-relaxed">{character.shortBio}</p>
          <div className="flex items-center gap-3 mt-2 text-[10px] text-[#8B8070]/60">
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
        <ChevronRight className={`w-4 h-4 flex-shrink-0 mt-1 ${isSelected ? 'text-[#F5D78E]' : 'text-[#8B8070]'}`} />
      </div>
    </motion.button>
  );
}

function CharacterDetail({ character, onClose }: { character: Character; onClose: () => void }) {
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
      className="p-6 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.1)]"
    >
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h2 className="font-serif-display text-xl font-bold text-[#F5D78E] mb-1">
            {character.name}
          </h2>
          <p className="text-sm text-[#D4A843]">{character.title}</p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-white/5 text-[#8B8070] transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 text-xs text-[#8B8070] mb-5">
        <span className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {character.period}
        </span>
        <span className="px-2 py-0.5 rounded-full bg-[#1A2038] text-[#C4B59A]">
          {character.role}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-medium text-[#C4B59A] mb-2">Biografi</h3>
        <p className="text-sm text-[#8B8070] leading-relaxed">{character.fullBio}</p>
      </div>

      {relatedEvents.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Kisah Terkait
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

      {character.references.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-[#C4B59A] mb-2">Referensi</h3>
          <div className="flex flex-wrap gap-2">
            {character.references.map((ref, i) => (
              <span key={i} className="text-[10px] px-2 py-1 rounded bg-[#1A2038] text-[#8B8070]">
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
    <section className="min-h-screen pt-20 pb-24 bg-[#080B16]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0] mb-2">
            Ensiklopedia Tokoh
          </h1>
          <p className="text-sm text-[#8B8070]">
            Tokoh-tokoh penting dalam Sirah Nabawiyah
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-8 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B8070]" />
          <input
            type="text"
            placeholder="Cari tokoh..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 bg-[#0F1629] border border-[rgba(245,215,142,0.1)] rounded-lg text-sm text-[#F0EBE0] placeholder-[#8B8070]/50 focus:outline-none focus:border-[rgba(245,215,142,0.25)] transition-colors"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8070] hover:text-[#C4B59A]"
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
                />
              ))}
            </div>
            {filteredCharacters.length === 0 && (
              <div className="text-center py-16 text-[#8B8070] text-sm">
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
                  />
                ) : (
                  <div className="p-6 rounded-2xl bg-[#0F1629]/50 border border-[rgba(245,215,142,0.04)] text-center text-sm text-[#8B8070]/60">
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
