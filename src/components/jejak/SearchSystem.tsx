'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Users, MapPin, ChevronRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { events, characters, locations } from '@/data/content';

interface SearchResult {
  type: 'event' | 'character' | 'location';
  id: string;
  title: string;
  subtitle: string;
  extra: string;
}

export default function SearchSystem() {
  const { navigateTo } = useNavigation();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return { events: [], characters: [], locations: [], total: 0 };

    const q = query.toLowerCase();

    const matchedEvents = events.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.subtitle.toLowerCase().includes(q) ||
        e.description.toLowerCase().includes(q) ||
        e.year.toLowerCase().includes(q)
    );

    const matchedCharacters = characters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.shortBio.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q)
    );

    const matchedLocations = locations.filter(
      (l) =>
        l.name.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q) ||
        l.significance.toLowerCase().includes(q)
    );

    return {
      events: matchedEvents,
      characters: matchedCharacters,
      locations: matchedLocations,
      total: matchedEvents.length + matchedCharacters.length + matchedLocations.length,
    };
  }, [query]);

  const hasResults = results.total > 0;
  const hasQuery = query.trim().length >= 2;

  return (
    <section className="min-h-screen pt-20 pb-24 bg-[#080B16]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0] mb-2">
            Pencarian
          </h1>
          <p className="text-sm text-[#8B8070]">
            Cari kisah, tokoh, atau lokasi
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8B8070]" />
          <input
            type="text"
            placeholder="Ketik untuk mencari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full pl-12 pr-12 py-4 bg-[#0F1629] border border-[rgba(245,215,142,0.1)] rounded-xl text-base text-[#F0EBE0] placeholder-[#8B8070]/50 focus:outline-none focus:border-[rgba(245,215,142,0.25)] transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8070] hover:text-[#C4B59A] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Results */}
        <AnimatePresence mode="wait">
          {hasQuery ? (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {!hasResults ? (
                <div className="text-center py-16">
                  <Search className="w-10 h-10 text-[#8B8070]/30 mx-auto mb-3" />
                  <p className="text-[#8B8070] text-sm">
                    Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Count */}
                  <p className="text-xs text-[#8B8070]">
                    {results.total} hasil ditemukan
                  </p>

                  {/* Events */}
                  {results.events.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-2">
                        <BookOpen className="w-4 h-4" />
                        Kisah ({results.events.length})
                      </h3>
                      <div className="space-y-2">
                        {results.events.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => navigateTo('reader', event.id)}
                            className="w-full text-left p-4 rounded-xl bg-[#0F1629] border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)] transition-colors group"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A843]/10 text-[#D4A843] font-medium">
                                    {event.year}
                                  </span>
                                </div>
                                <h4 className="text-sm font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors">
                                  {event.title}
                                </h4>
                                <p className="text-xs text-[#8B8070] mt-1 line-clamp-1">{event.description}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] flex-shrink-0" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Characters */}
                  {results.characters.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        Tokoh ({results.characters.length})
                      </h3>
                      <div className="space-y-2">
                        {results.characters.map((char) => (
                          <button
                            key={char.id}
                            onClick={() => navigateTo('character', char.id)}
                            className="w-full text-left p-4 rounded-xl bg-[#0F1629] border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)] transition-colors group"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors">
                                  {char.name}
                                </h4>
                                <p className="text-xs text-[#D4A843]">{char.title}</p>
                                <p className="text-xs text-[#8B8070] mt-1 line-clamp-1">{char.shortBio}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] flex-shrink-0" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Locations */}
                  {results.locations.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Lokasi ({results.locations.length})
                      </h3>
                      <div className="space-y-2">
                        {results.locations.map((loc) => (
                          <button
                            key={loc.id}
                            onClick={() => navigateTo('location', loc.id)}
                            className="w-full text-left p-4 rounded-xl bg-[#0F1629] border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)] transition-colors group"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className="text-sm font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors">
                                  {loc.name}
                                </h4>
                                <p className="text-xs text-[#8B8070] mt-1 line-clamp-1">{loc.description}</p>
                              </div>
                              <ChevronRight className="w-4 h-4 text-[#8B8070] group-hover:text-[#F5D78E] flex-shrink-0" />
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <Search className="w-10 h-10 text-[#8B8070]/20 mx-auto mb-3" />
              <p className="text-[#8B8070]/60 text-sm">
                Ketik minimal 2 karakter untuk mulai mencari
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
