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
      <div className="min-h-screen flex items-center justify-center bg-paper">
        <p className="text-ink-light text-sm">Kisah tidak ditemukan</p>
      </div>
    );
  }

  const separator = isLight ? 'rgba(44, 36, 24, 0.08)' : 'rgba(196, 181, 154, 0.08)';

  const paragraphs = event.story.split('\n').filter((p) => p.trim());

  return (
    <div className={`min-h-screen reader-transition ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      {/* Progress bar */}
      <div className={`fixed top-12 sm:top-14 left-0 right-0 z-40 h-[2px] ${isLight ? 'bg-ink/[0.03]' : 'bg-sand/[0.03]'}`}>
        <motion.div
          className={`h-full ${isLight ? 'bg-gold-soft/50' : 'bg-lantern-mid/40'}`}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="pt-20 sm:pt-24 pb-24 px-4 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 flex items-center gap-3 text-xs font-medium"
          >
            <span className={`flex items-center gap-1.5 ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
              <Calendar className="w-3 h-3" />
              {event.year}
            </span>
            {location && (
              <>
                <span className="opacity-20">·</span>
                <button
                  onClick={() => navigateTo('location', event.locationId)}
                  className={`flex items-center gap-1.5 transition-colors duration-200 hover:underline ${
                    isLight ? 'text-ink-light hover:text-ink' : 'text-warm-muted hover:text-sand'
                  }`}
                >
                  <MapPin className="w-3 h-3" />
                  {location.name}
                </button>
              </>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            className={`font-serif-display text-3xl sm:text-4xl font-bold leading-[1.15] mb-3 ${isLight ? 'text-ink' : 'text-cream'}`}
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`font-serif-display text-lg italic mb-14 ${isLight ? 'text-ink-soft' : 'text-sand'}`}
          >
            {event.subtitle}
          </motion.p>

          {/* Story */}
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className={`reader-content ${isLight ? 'text-ink' : 'text-cream'}`}
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

          {/* After story */}
          <div className="mt-20 space-y-8">
            {/* Characters */}
            {characters.length > 0 && (
              <div className="pt-8" style={{ borderTop: `1px solid ${separator}` }}>
                <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                  Tokoh
                </span>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => navigateTo('character', char.id)}
                      className={`text-sm transition-colors duration-200 hover:underline ${isLight ? 'text-ink-soft hover:text-gold' : 'text-sand hover:text-lantern'}`}
                    >
                      {char.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* References */}
            {event.references.length > 0 && (
              <div className="pt-8" style={{ borderTop: `1px solid ${separator}` }}>
                <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                  Referensi
                </span>
                <div className="mt-3 space-y-1.5">
                  {event.references.map((ref, i) => (
                    <p key={i} className={`text-sm ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>{ref}</p>
                  ))}
                </div>
              </div>
            )}

            {/* Next */}
            <div className="pt-10" style={{ borderTop: `1px solid ${separator}` }}>
              {nextEvent ? (
                <motion.button
                  onClick={() => navigateTo('reader', nextEvent.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-left block"
                >
                  <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    Selanjutnya
                  </span>
                  <h4 className={`font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline ${
                    isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern'
                  }`}>
                    {nextEvent.title}
                  </h4>
                  <span className={`text-sm mt-1.5 inline-flex items-center gap-1.5 font-medium ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    {nextEvent.year}
                    <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                </motion.button>
              ) : prevEvent ? (
                <motion.button
                  onClick={() => navigateTo('reader', prevEvent.id)}
                  whileHover={{ x: -4 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-left block"
                >
                  <span className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    Sebelumnya
                  </span>
                  <h4 className={`font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline ${
                    isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern'
                  }`}>
                    {prevEvent.title}
                  </h4>
                  <span className={`text-sm mt-1.5 inline-flex items-center gap-1.5 font-medium ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                    <ChevronLeft className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
                    {prevEvent.year}
                  </span>
                </motion.button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
