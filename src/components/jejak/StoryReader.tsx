'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Calendar } from 'lucide-react';
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
  const { selectedEventId, navigateTo, theme } = useNavigation();
  const { markEventRead, readEvents } = useReadingProgress();
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const event = selectedEventId ? getEventById(selectedEventId) : null;
  const characters = event ? getCharactersByEvent(event.id) : [];
  const location = event ? getLocationById(event.locationId) : undefined;

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === selectedEventId);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent = currentIndex >= 0 && currentIndex < allEvents.length - 1 ? allEvents[currentIndex + 1] : null;

  const isLight = theme === 'light';

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F1]">
        <p className="text-[#9C8E7C] text-sm">Kisah tidak ditemukan</p>
      </div>
    );
  }

  const bg = isLight ? '#FBF8F1' : '#080B16';
  const textPrimary = isLight ? '#2C2418' : '#F0EBE0';
  const textMuted = isLight ? '#6B5E4F' : '#8B8070';
  const textSecondary = isLight ? '#9C8E7C' : '#8B8070';
  const separator = isLight ? 'rgba(44, 36, 24, 0.06)' : 'rgba(139, 128, 112, 0.06)';

  const paragraphs = event.story.split('\n').filter((p) => p.trim());

  return (
    <div className="min-h-screen reader-transition" style={{ backgroundColor: bg }}>
      {/* Progress bar */}
      <div
        className="fixed top-12 sm:top-14 left-0 right-0 z-40 h-[2px]"
        style={{ backgroundColor: isLight ? 'rgba(44, 36, 24, 0.03)' : 'rgba(139, 128, 112, 0.03)' }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: isLight ? 'rgba(212, 168, 67, 0.3)' : 'rgba(212, 168, 67, 0.25)' }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Reading content */}
      <div className="pt-20 sm:pt-24 pb-20 px-4 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-8 flex items-center gap-3 text-xs"
            style={{ color: textSecondary }}
          >
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {event.year}
            </span>
            {location && (
              <>
                <span style={{ color: separator }}>·</span>
                <button
                  onClick={() => navigateTo('location', event.locationId)}
                  className="flex items-center gap-1 hover:underline"
                  style={{ color: textSecondary }}
                >
                  <MapPin className="w-3 h-3" />
                  {location.name}
                </button>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 }}
            className="font-serif-display text-3xl sm:text-4xl font-bold leading-tight mb-3"
            style={{ color: textPrimary }}
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="font-serif-display text-lg italic mb-12"
            style={{ color: textMuted }}
          >
            {event.subtitle}
          </motion.p>

          {/* Story body */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="reader-content"
            style={{ color: textPrimary }}
          >
            {paragraphs.map((paragraph, i) => (
              <p
                key={i}
                ref={i === paragraphs.length - 1 ? storyEndRef : undefined}
              >
                {paragraph.trim()}
              </p>
            ))}
          </motion.article>

          {/* After story — minimal info */}
          <div className="mt-16 space-y-6">
            {/* Characters */}
            {characters.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separator}` }}>
                <span className="text-xs" style={{ color: textSecondary }}>Tokoh</span>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                  {characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => navigateTo('character', char.id)}
                      className="text-sm hover:underline"
                      style={{ color: textMuted }}
                    >
                      {char.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {event.references.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separator}` }}>
                <span className="text-xs" style={{ color: textSecondary }}>Referensi</span>
                <div className="mt-2 space-y-1">
                  {event.references.map((ref, i) => (
                    <p key={i} className="text-xs" style={{ color: textSecondary }}>{ref}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Prev/Next */}
            <div className="pt-8" style={{ borderTop: `1px solid ${separator}` }}>
              {nextEvent ? (
                <button
                  onClick={() => navigateTo('reader', nextEvent.id)}
                  className="group text-left block"
                >
                  <span className="text-xs" style={{ color: textSecondary }}>Selanjutnya</span>
                  <h4 className="font-serif-display text-lg sm:text-xl font-bold mt-1 group-hover:underline" style={{ color: textPrimary }}>
                    {nextEvent.title}
                  </h4>
                  <span className="text-xs mt-1 inline-flex items-center gap-1" style={{ color: textSecondary }}>
                    {nextEvent.year}
                    <ChevronRight className="w-3 h-3" />
                  </span>
                </button>
              ) : prevEvent ? (
                <button
                  onClick={() => navigateTo('reader', prevEvent.id)}
                  className="group text-left block"
                >
                  <span className="text-xs" style={{ color: textSecondary }}>Sebelumnya</span>
                  <h4 className="font-serif-display text-lg sm:text-xl font-bold mt-1 group-hover:underline" style={{ color: textPrimary }}>
                    {prevEvent.title}
                  </h4>
                  <span className="text-xs mt-1 inline-flex items-center gap-1" style={{ color: textSecondary }}>
                    <ChevronLeft className="w-3 h-3" />
                    {prevEvent.year}
                  </span>
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
