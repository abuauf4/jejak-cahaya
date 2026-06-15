'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Users, ChevronRight, X, BookOpen } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/lib/store';
import { characters } from '@/data/characters';
import { events } from '@/data/events';

export default function CharacterEncyclopedia() {
  const { navigateTo } = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    if (!searchQuery.trim()) return characters;
    const q = searchQuery.toLowerCase();
    return characters.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q) ||
        c.shortBio.toLowerCase().includes(q) ||
        c.role.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const expanded = expandedId
    ? characters.find((c) => c.id === expandedId)
    : null;

  // Get related events for the expanded character
  const relatedEvents = expanded
    ? events.filter((e) => expanded.eventIds.includes(e.id))
    : [];

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
            Ensiklopedia Tokoh
          </h1>
          <p className="text-[#8B8070] max-w-lg mx-auto">
            Kenali para tokoh yang membentuk sejarah Sirah Nabawiyah
          </p>
        </motion.div>

        {/* Search */}
        <motion.div
          className="max-w-md mx-auto mb-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B8070]" />
            <Input
              placeholder="Cari tokoh..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#0F1629] border-[rgba(245,215,142,0.12)] text-[#F0EBE0] placeholder:text-[#8B8070] focus:border-[#D4A843] rounded-lg"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8070] hover:text-[#F5D78E]"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </motion.div>

        {/* Character Grid + Detail */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((char, idx) => (
                <motion.button
                  key={char.id}
                  className={`group relative w-full text-left bg-[#0F1629] border rounded-xl p-5 transition-all duration-300 ${
                    expandedId === char.id
                      ? 'border-[rgba(245,215,142,0.3)] glow-gold'
                      : 'border-[rgba(245,215,142,0.08)] hover:border-[rgba(245,215,142,0.2)]'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() =>
                    setExpandedId(
                      expandedId === char.id ? null : char.id
                    )
                  }
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(245,215,142,0.08)] flex items-center justify-center flex-shrink-0">
                      <Users className="h-5 w-5 text-[#D4A843]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif-display text-base text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors duration-200 truncate">
                        {char.name}
                      </h3>
                      <p className="text-xs text-[#D4A843] mb-2 truncate">
                        {char.title}
                      </p>
                      <p className="text-sm text-[#8B8070] line-clamp-2 leading-relaxed">
                        {char.shortBio}
                      </p>
                    </div>
                  </div>
                  <ChevronRight
                    className={`absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-[#8B8070] transition-transform duration-200 ${
                      expandedId === char.id ? 'rotate-90' : ''
                    }`}
                  />
                </motion.button>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <Users className="h-10 w-10 text-[#8B6914] mx-auto mb-3" />
                <p className="text-[#8B8070]">
                  Tidak ada tokoh yang ditemukan
                </p>
              </div>
            )}
          </div>

          {/* Detail Panel */}
          <div className="lg:w-96 lg:sticky lg:top-24 lg:self-start">
            <AnimatePresence mode="wait">
              {expanded ? (
                <motion.div
                  key={expanded.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                  className="bg-[#0F1629] border border-[rgba(245,215,142,0.1)] rounded-xl overflow-hidden"
                >
                  {/* Header */}
                  <div
                    className="p-6"
                    style={{
                      background:
                        'linear-gradient(135deg, rgba(245,215,142,0.05) 0%, transparent 60%)',
                    }}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-full bg-[rgba(245,215,142,0.1)] flex items-center justify-center">
                        <Users className="h-6 w-6 text-[#F5D78E]" />
                      </div>
                      <div>
                        <h2 className="font-serif-display text-xl text-[#F0EBE0]">
                          {expanded.name}
                        </h2>
                        <p className="text-sm text-[#D4A843]">
                          {expanded.title}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-4">
                      <Badge
                        variant="outline"
                        className="border-[rgba(245,215,142,0.2)] text-[#C4B59A]"
                      >
                        {expanded.period}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="border-[rgba(245,215,142,0.2)] text-[#C4B59A]"
                      >
                        {expanded.role}
                      </Badge>
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="px-6 pb-4">
                    <div className="max-h-[32rem] overflow-y-auto pr-1 custom-scrollbar">
                      {expanded.fullBio.split('\n').filter(p => p.trim()).map((paragraph, idx) => (
                        <p
                          key={idx}
                          className="text-sm text-[#8B8070] leading-relaxed mb-3"
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>

                  {/* Related Events */}
                  {relatedEvents.length > 0 && (
                    <div className="px-6 pb-4">
                      <h4 className="text-sm font-medium text-[#C4B59A] mb-3 flex items-center gap-2">
                        <BookOpen className="h-3.5 w-3.5 text-[#D4A843]" />
                        Peristiwa Terkait
                      </h4>
                      <div className="space-y-2">
                        {relatedEvents.map((event) => (
                          <button
                            key={event.id}
                            onClick={() =>
                              navigateTo('reader', event.id)
                            }
                            className="flex items-center gap-2 w-full text-left px-3 py-2 rounded-lg bg-[rgba(245,215,142,0.04)] hover:bg-[rgba(245,215,142,0.08)] transition-colors duration-200"
                          >
                            <span className="text-xs text-[#8B8070]">
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

                  {/* References */}
                  {expanded.references.length > 0 && (
                    <div className="px-6 pb-6">
                      <h4 className="text-sm font-medium text-[#C4B59A] mb-2">
                        Referensi
                      </h4>
                      <ul className="space-y-1">
                        {expanded.references.map((ref, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-[#8B8070] pl-3 border-l border-[rgba(245,215,142,0.12)]"
                          >
                            {ref}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-[#0F1629]/50 border border-[rgba(245,215,142,0.06)] rounded-xl p-8 text-center hidden lg:block"
                >
                  <Users className="h-8 w-8 text-[#8B6914] mx-auto mb-3" />
                  <p className="text-sm text-[#8B8070]">
                    Klik tokoh untuk melihat detail
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
