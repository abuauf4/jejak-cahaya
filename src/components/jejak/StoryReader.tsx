'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Users, BookOpen, Calendar, Clock } from 'lucide-react';
import { useNavigation, useReadingProgress } from '@/lib/store';
import {
  getEventById,
  getCharactersByEvent,
  getLocationById,
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';

export default function StoryReader() {
  const { selectedEventId, navigateTo, readerTheme } = useNavigation();
  const { markEventRead, readEvents } = useReadingProgress();
  const [scrollProgress, setScrollProgress] = useState(0);
  const storyRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const event = selectedEventId ? getEventById(selectedEventId) : null;
  const characters = event ? getCharactersByEvent(event.id) : [];
  const location = event ? getLocationById(event.locationId) : undefined;

  // Get all events for prev/next navigation
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === selectedEventId);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  // Scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-mark as read via IntersectionObserver
  const storyEndRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node || !selectedEventId) return;

      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && selectedEventId) {
              markEventRead(selectedEventId);
            }
          });
        },
        { threshold: 0.3 }
      );
      observerRef.current.observe(node);
    },
    [selectedEventId, markEventRead]
  );

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAF9F6]">
        <p className="text-[#4a4a4a]">Kisah tidak ditemukan</p>
      </div>
    );
  }

  const isLight = readerTheme === 'light';
  const bgClass = isLight ? 'bg-[#FAF9F6]' : 'bg-[#1a1a1a]';
  const textClass = isLight ? 'text-[#1a1a1a]' : 'text-[#e0e0e0]';
  const textMutedClass = isLight ? 'text-[#4a4a4a]' : 'text-[#b0b0b0]';
  const textSecondaryClass = isLight ? 'text-[#6a6a6a]' : 'text-[#909090]';
  const borderClass = isLight ? 'border-black/[0.06]' : 'border-white/[0.06]';
  const cardBgClass = isLight ? 'bg-white/80' : 'bg-[#252525]';
  const hoverBgClass = isLight ? 'hover:bg-black/[0.03]' : 'hover:bg-white/[0.05]';

  // Parse story into paragraphs
  const paragraphs = event.story.split('\n').filter((p) => p.trim());

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-300`}>
      {/* Thin progress bar */}
      <div className={`fixed top-14 sm:top-16 left-0 right-0 z-40 h-[2px] ${isLight ? 'bg-black/[0.04]' : 'bg-white/[0.04]'}`}>
        <motion.div
          className={`h-full ${isLight ? 'bg-[#D4A843]/50' : 'bg-[#F5D78E]/40'}`}
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Content */}
      <div className="pt-24 sm:pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* Hero */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 sm:mb-14"
          >
            {/* Year badge */}
            <div className="flex items-center gap-2 mb-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full ${isLight ? 'bg-[#D4A843]/10 text-[#8B6914]' : 'bg-[#F5D78E]/10 text-[#F5D78E]'}`}>
                <Calendar className="w-3 h-3" />
                {event.year}
              </span>
              {location && (
                <button
                  onClick={() => navigateTo('location', event.locationId)}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full transition-colors ${isLight ? 'bg-black/[0.04] text-[#4a4a4a] hover:bg-black/[0.08]' : 'bg-white/[0.06] text-[#b0b0b0] hover:bg-white/[0.1]'}`}
                >
                  <MapPin className="w-3 h-3" />
                  {location.name}
                </button>
              )}
            </div>

            {/* Title */}
            <h1 className={`font-serif-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight mb-3 ${textClass}`}>
              {event.title}
            </h1>
            <p className={`font-serif-display text-lg ${textMutedClass} italic`}>
              {event.subtitle}
            </p>
          </motion.header>

          {/* Story */}
          <motion.article
            ref={storyRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`font-serif-display text-[17px] sm:text-[18px] leading-[1.9] sm:leading-[2] ${textClass}`}
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                className="mb-8"
                ref={i === paragraphs.length - 1 ? storyEndRef : undefined}
              >
                {paragraph.trim()}
              </p>
            ))}
          </motion.article>

          {/* Read indicator */}
          {readEvents.includes(event.id) && (
            <div className={`mt-8 pt-6 border-t ${borderClass} flex items-center gap-2 text-xs ${textSecondaryClass}`}>
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sudah dibaca</span>
            </div>
          )}

          {/* Related Characters */}
          {characters.length > 0 && (
            <div className={`mt-10 pt-8 border-t ${borderClass}`}>
              <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textMutedClass}`}>
                <Users className="w-4 h-4" />
                Tokoh dalam Kisah Ini
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => navigateTo('character', char.id)}
                    className={`text-left p-4 rounded-xl ${cardBgClass} border ${borderClass} ${hoverBgClass} transition-colors`}
                  >
                    <h4 className={`font-serif-display font-bold text-sm mb-1 ${textClass}`}>
                      {char.name}
                    </h4>
                    <p className={`text-xs ${textSecondaryClass}`}>{char.title}</p>
                    <p className={`text-xs mt-2 line-clamp-2 ${textSecondaryClass}`}>{char.shortBio}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          {location && (
            <div className={`mt-8 pt-8 border-t ${borderClass}`}>
              <h3 className={`text-sm font-semibold mb-4 flex items-center gap-2 ${textMutedClass}`}>
                <MapPin className="w-4 h-4" />
                Lokasi
              </h3>
              <button
                onClick={() => navigateTo('location', location.id)}
                className={`text-left p-4 rounded-xl ${cardBgClass} border ${borderClass} ${hoverBgClass} transition-colors w-full`}
              >
                <h4 className={`font-serif-display font-bold text-sm mb-1 ${textClass}`}>
                  {location.name}
                </h4>
                <p className={`text-xs ${textSecondaryClass}`}>{location.description}</p>
                <p className={`text-[10px] mt-2 ${textSecondaryClass}`}>{location.coordinates}</p>
              </button>
            </div>
          )}

          {/* References */}
          {event.references.length > 0 && (
            <div className={`mt-8 pt-8 border-t ${borderClass}`}>
              <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${textMutedClass}`}>
                <BookOpen className="w-4 h-4" />
                Referensi
              </h3>
              <ul className="space-y-1.5">
                {event.references.map((ref, i) => (
                  <li key={i} className={`text-xs ${textSecondaryClass} flex items-start gap-2`}>
                    <span className="mt-1.5 w-1 h-1 rounded-full bg-current opacity-30 flex-shrink-0" />
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev/Next Navigation */}
          <div className={`mt-12 pt-8 border-t ${borderClass} grid grid-cols-2 gap-4`}>
            {prevEvent ? (
              <button
                onClick={() => navigateTo('reader', prevEvent.id)}
                className={`text-left p-4 rounded-xl ${cardBgClass} border ${borderClass} ${hoverBgClass} transition-colors group`}
              >
                <div className={`flex items-center gap-1 text-xs mb-1 ${textSecondaryClass}`}>
                  <ChevronLeft className="w-3 h-3" />
                  Sebelumnya
                </div>
                <h4 className={`text-sm font-medium ${textClass} group-hover:text-[#D4A843] transition-colors line-clamp-2`}>
                  {prevEvent.title}
                </h4>
              </button>
            ) : (
              <div />
            )}
            {nextEvent ? (
              <button
                onClick={() => navigateTo('reader', nextEvent.id)}
                className={`text-right p-4 rounded-xl ${cardBgClass} border ${borderClass} ${hoverBgClass} transition-colors group`}
              >
                <div className={`flex items-center justify-end gap-1 text-xs mb-1 ${textSecondaryClass}`}>
                  Selanjutnya
                  <ChevronRight className="w-3 h-3" />
                </div>
                <h4 className={`text-sm font-medium ${textClass} group-hover:text-[#D4A843] transition-colors line-clamp-2`}>
                  {nextEvent.title}
                </h4>
              </button>
            ) : (
              <div />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
