'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, BookOpen, Users, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useNavigation } from '@/lib/store';
import { events } from '@/data/events';
import { characters } from '@/data/characters';
import { locations } from '@/data/locations';

interface SearchResult {
  type: 'event' | 'character' | 'location';
  id: string;
  title: string;
  subtitle: string;
  icon: React.ElementType;
}

export default function SearchSystem() {
  const { navigateTo } = useNavigation();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Debounce effect
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return [];

    const found: SearchResult[] = [];

    // Search events
    events.forEach((event) => {
      if (
        event.title.toLowerCase().includes(q) ||
        event.subtitle.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.year.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'event',
          id: event.id,
          title: event.title,
          subtitle: `${event.year} — ${event.subtitle}`,
          icon: BookOpen,
        });
      }
    });

    // Search characters
    characters.forEach((char) => {
      if (
        char.name.toLowerCase().includes(q) ||
        char.title.toLowerCase().includes(q) ||
        char.shortBio.toLowerCase().includes(q) ||
        char.role.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'character',
          id: char.id,
          title: char.name,
          subtitle: char.title,
          icon: Users,
        });
      }
    });

    // Search locations
    locations.forEach((loc) => {
      if (
        loc.name.toLowerCase().includes(q) ||
        loc.description.toLowerCase().includes(q) ||
        loc.significance.toLowerCase().includes(q)
      ) {
        found.push({
          type: 'location',
          id: loc.id,
          title: loc.name,
          subtitle: loc.significance,
          icon: MapPin,
        });
      }
    });

    return found;
  }, [debouncedQuery]);

  const eventResults = results.filter((r) => r.type === 'event');
  const characterResults = results.filter((r) => r.type === 'character');
  const locationResults = results.filter((r) => r.type === 'location');

  const handleResultClick = (result: SearchResult) => {
    switch (result.type) {
      case 'event':
        navigateTo('reader', result.id);
        break;
      case 'character':
        navigateTo('character', result.id);
        break;
      case 'location':
        navigateTo('location', result.id);
        break;
    }
  };

  const typeLabels: Record<string, string> = {
    event: 'Peristiwa',
    character: 'Tokoh',
    location: 'Lokasi',
  };

  const renderGroup = (
    label: string,
    items: SearchResult[],
    type: 'event' | 'character' | 'location'
  ) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-[#8B8070] uppercase tracking-wider mb-3 px-1">
          {label}
        </h3>
        <div className="space-y-1">
          {items.map((item) => (
            <motion.button
              key={`${item.type}-${item.id}`}
              className="flex items-center gap-3 w-full text-left px-4 py-3 rounded-lg hover:bg-[rgba(245,215,142,0.05)] transition-colors duration-200 group"
              onClick={() => handleResultClick(item)}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div className="w-8 h-8 rounded-lg bg-[rgba(245,215,142,0.06)] flex items-center justify-center flex-shrink-0">
                <item.icon className="h-4 w-4 text-[#D4A843]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors truncate">
                  {item.title}
                </p>
                <p className="text-xs text-[#8B8070] truncate">
                  {item.subtitle}
                </p>
              </div>
              <span className="text-[10px] text-[#8B8070] bg-[rgba(245,215,142,0.05)] px-2 py-0.5 rounded flex-shrink-0">
                {typeLabels[type]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    );
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Search input */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[#8B8070]" />
            <Input
              placeholder="Cari berdasarkan tokoh, lokasi, peristiwa, atau fase perjalanan..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-12 pr-10 py-6 text-base bg-[#0F1629] border-[rgba(245,215,142,0.12)] text-[#F0EBE0] placeholder:text-[#8B8070] focus:border-[#D4A843] rounded-xl"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8070] hover:text-[#F5D78E] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Results or empty state */}
        <AnimatePresence mode="wait">
          {hasQuery ? (
            results.length > 0 ? (
              <motion.div
                key="results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Result count */}
                <p className="text-xs text-[#8B8070] mb-6 px-1">
                  {results.length} hasil ditemukan
                </p>

                {renderGroup('Peristiwa', eventResults, 'event')}
                {renderGroup('Tokoh', characterResults, 'character')}
                {renderGroup('Lokasi', locationResults, 'location')}
              </motion.div>
            ) : (
              <motion.div
                key="no-results"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <Search className="h-10 w-10 text-[#8B6914] mx-auto mb-3" />
                <p className="text-[#8B8070] mb-1">
                  Tidak ditemukan hasil untuk &quot;{query}&quot;
                </p>
                <p className="text-sm text-[#8B8070]/60">
                  Coba kata kunci lain
                </p>
              </motion.div>
            )
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-16"
            >
              <div className="w-20 h-20 rounded-full bg-[rgba(245,215,142,0.05)] flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-[#8B6914]" />
              </div>
              <h2 className="font-serif-display text-xl text-[#C4B59A] mb-2">
                Cari di Jejak Cahaya
              </h2>
              <p className="text-[#8B8070] max-w-sm mx-auto">
                Cari berdasarkan tokoh, lokasi, peristiwa, atau fase perjalanan
              </p>

              {/* Quick suggestions */}
              <div className="flex flex-wrap justify-center gap-2 mt-6">
                {['Muhammad', 'Makkah', 'Hijrah', 'Khadijah', 'Badar'].map(
                  (suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="text-xs text-[#C4B59A] bg-[rgba(245,215,142,0.05)] border border-[rgba(245,215,142,0.1)] px-3 py-1.5 rounded-full hover:bg-[rgba(245,215,142,0.1)] hover:text-[#F5D78E] transition-colors duration-200"
                    >
                      {suggestion}
                    </button>
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
