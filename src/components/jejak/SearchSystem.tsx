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
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';
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
    <section className={`min-h-screen pt-20 pb-24 md:pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`font-serif-display text-2xl sm:text-3xl font-bold mb-2 ${isLight ? 'text-ink' : 'text-cream'}`}>
            Pencarian
          </h1>
          <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            Cari kisah, tokoh, atau lokasi
          </p>
        </div>

        {/* Search input */}
        <div className="relative mb-8">
          <Search className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`} />
          <input
            type="text"
            placeholder="Ketik untuk mencari..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className={`w-full pl-12 pr-12 py-4 rounded-xl text-base transition-colors border ${
              isLight
                ? 'bg-white/50 border-ink/10 text-ink placeholder:text-ink-light focus:border-gold/40'
                : 'bg-navy border-sand/10 text-cream placeholder:text-warm-muted focus:border-lantern-mid/40'
            } focus:outline-none`}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${
                isLight ? 'text-ink-light hover:text-ink' : 'text-warm-muted hover:text-sand'
              }`}
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
                  <Search className={`w-10 h-10 mx-auto mb-3 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`} />
                  <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                    Tidak ditemukan hasil untuk &ldquo;{query}&rdquo;
                  </p>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Count */}
                  <p className={`text-xs ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    {results.total} hasil ditemukan
                  </p>

                  {/* Events */}
                  {results.events.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                        <BookOpen className="w-4 h-4" />
                        Kisah ({results.events.length})
                      </h3>
                      <div className="space-y-2">
                        {results.events.map((event) => (
                          <button
                            key={event.id}
                            onClick={() => navigateTo('reader', event.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 group ${
                              isLight
                                ? 'bg-transparent border-ink/[0.06] hover:border-gold/30'
                                : 'bg-navy border-sand/[0.06] hover:border-lantern-mid/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                                    isLight ? 'bg-gold/10 text-gold' : 'bg-lantern-mid/15 text-lantern-mid'
                                  }`}>
                                    {event.year}
                                  </span>
                                </div>
                                <h4 className={`text-sm font-medium transition-colors duration-200 ${
                                  isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                                }`}>
                                  {event.title}
                                </h4>
                                <p className={`text-xs mt-1 line-clamp-1 ${isLight ? 'text-ink-soft' : 'text-warm-muted'}`}>{event.description}</p>
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

                  {/* Characters */}
                  {results.characters.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                        <Users className="w-4 h-4" />
                        Tokoh ({results.characters.length})
                      </h3>
                      <div className="space-y-2">
                        {results.characters.map((char) => (
                          <button
                            key={char.id}
                            onClick={() => navigateTo('character', char.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 group ${
                              isLight
                                ? 'bg-transparent border-ink/[0.06] hover:border-gold/30'
                                : 'bg-navy border-sand/[0.06] hover:border-lantern-mid/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className={`text-sm font-medium transition-colors duration-200 ${
                                  isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                                }`}>
                                  {char.name}
                                </h4>
                                <p className={`text-xs ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>{char.title}</p>
                                <p className={`text-xs mt-1 line-clamp-1 ${isLight ? 'text-ink-soft' : 'text-warm-muted'}`}>{char.shortBio}</p>
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

                  {/* Locations */}
                  {results.locations.length > 0 && (
                    <div>
                      <h3 className={`text-sm font-medium mb-3 flex items-center gap-2 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                        <MapPin className="w-4 h-4" />
                        Lokasi ({results.locations.length})
                      </h3>
                      <div className="space-y-2">
                        {results.locations.map((loc) => (
                          <button
                            key={loc.id}
                            onClick={() => navigateTo('location', loc.id)}
                            className={`w-full text-left p-4 rounded-xl border transition-colors duration-200 group ${
                              isLight
                                ? 'bg-transparent border-ink/[0.06] hover:border-gold/30'
                                : 'bg-navy border-sand/[0.06] hover:border-lantern-mid/20'
                            }`}
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                <h4 className={`text-sm font-medium transition-colors duration-200 ${
                                  isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                                }`}>
                                  {loc.name}
                                </h4>
                                <p className={`text-xs mt-1 line-clamp-1 ${isLight ? 'text-ink-soft' : 'text-warm-muted'}`}>{loc.description}</p>
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
              <Search className={`w-10 h-10 mx-auto mb-3 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`} />
              <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                Ketik minimal 2 karakter untuk mulai mencari
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
