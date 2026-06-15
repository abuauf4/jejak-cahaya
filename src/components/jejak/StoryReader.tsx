'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';
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
  const [showReferences, setShowReferences] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  const event = selectedEventId ? getEventById(selectedEventId) : null;
  const characters = event ? getCharactersByEvent(event.id) : [];
  const location = event ? getLocationById(event.locationId) : undefined;

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === selectedEventId);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : null;

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

  // Reset references toggle on event change
  useEffect(() => {
    setShowReferences(false);
  }, [selectedEventId]);

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
      <div className={`min-h-screen flex items-center justify-center ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
        <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>Kisah tidak ditemukan</p>
      </div>
    );
  }

  const separatorColor = isLight ? 'rgba(44, 36, 24, 0.10)' : 'rgba(196, 181, 154, 0.10)';
  const paragraphs = event.story.split('\n').filter((p) => p.trim());

  return (
    <div className={`min-h-screen reader-transition ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      {/* Reading progress bar */}
      <div className={`fixed top-12 sm:top-14 left-0 right-0 z-40 h-[2px] ${isLight ? 'bg-ink/8' : 'bg-sand/8'}`}>
        <motion.div
          className={`h-full ${isLight ? 'bg-gold-soft' : 'bg-lantern-mid'}`}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
      </div>

      {/* Content */}
      <div className="pt-20 sm:pt-24 pb-24 px-5 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* Minimal header */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="mb-2 flex items-center gap-2 text-sm font-medium"
          >
            <span className={isLight ? 'text-ink-soft' : 'text-sand'}>{event.year}</span>
            {location && (
              <>
                <span className={isLight ? 'text-ink/20' : 'text-sand/20'}>·</span>
                <button
                  onClick={() => navigateTo('location', event.locationId)}
                  className={`transition-colors duration-200 hover:underline ${
                    isLight ? 'text-ink-soft hover:text-ink' : 'text-sand hover:text-cream'
                  }`}
                >
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
            className={`font-serif-display text-3xl sm:text-4xl font-bold leading-[1.15] mb-2 ${
              isLight ? 'text-ink' : 'text-cream'
            }`}
          >
            {event.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className={`font-serif-display text-lg italic mb-12 sm:mb-16 ${
              isLight ? 'text-ink-soft' : 'text-sand'
            }`}
          >
            {event.subtitle}
          </motion.p>

          {/* ─── STORY CONTENT ─── */}
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

          {/* ─── AFTER STORY: Metadata ─── */}
          <div className="mt-20 space-y-6">
            {/* Characters */}
            {characters.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <span
                  className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${
                    isLight ? 'text-ink-soft' : 'text-sand'
                  }`}
                >
                  Tokoh Terkait
                </span>
                <div className="mt-3 space-y-2">
                  {characters.map((char) => (
                    <button
                      key={char.id}
                      onClick={() => navigateTo('character', char.id)}
                      className={`group flex items-center gap-1.5 text-[15px] transition-colors duration-200 ${
                        isLight
                          ? 'text-ink-soft hover:text-gold'
                          : 'text-sand hover:text-lantern-mid'
                      }`}
                    >
                      {char.name}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Location */}
            {location && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <span
                  className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${
                    isLight ? 'text-ink-soft' : 'text-sand'
                  }`}
                >
                  Lokasi
                </span>
                <div className="mt-3">
                  <button
                    onClick={() => navigateTo('location', event.locationId)}
                    className={`group flex items-center gap-1.5 text-[15px] transition-colors duration-200 ${
                      isLight
                        ? 'text-ink-soft hover:text-gold'
                        : 'text-sand hover:text-lantern-mid'
                    }`}
                  >
                    {location.name}
                    <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </button>
                </div>
              </div>
            )}

            {/* References (expandable) */}
            {event.references.length > 0 && (
              <div className="pt-6" style={{ borderTop: `1px solid ${separatorColor}` }}>
                <button
                  onClick={() => setShowReferences(!showReferences)}
                  className={`group flex items-center gap-1.5 text-[11px] uppercase tracking-[0.15em] font-semibold transition-colors duration-200 ${
                    isLight ? 'text-ink-soft hover:text-ink' : 'text-sand hover:text-cream'
                  }`}
                >
                  Referensi
                  <ChevronRight
                    className={`w-3 h-3 transition-transform duration-200 ${
                      showReferences ? 'rotate-90' : ''
                    }`}
                  />
                </button>
                {showReferences && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-3 space-y-1.5 overflow-hidden"
                  >
                    {event.references.map((ref, i) => (
                      <p
                        key={i}
                        className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}
                      >
                        {ref}
                      </p>
                    ))}
                  </motion.div>
                )}
              </div>
            )}

            {/* Next / Previous event */}
            <div className="pt-8" style={{ borderTop: `1px solid ${separatorColor}` }}>
              {nextEvent ? (
                <motion.button
                  onClick={() => navigateTo('reader', nextEvent.id)}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="group text-left block"
                >
                  <span
                    className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}
                  >
                    Selanjutnya
                  </span>
                  <h4
                    className={`font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline ${
                      isLight
                        ? 'text-ink group-hover:text-gold'
                        : 'text-cream group-hover:text-lantern'
                    }`}
                  >
                    {nextEvent.title}
                  </h4>
                  <span
                    className={`text-sm mt-1 inline-flex items-center gap-1.5 font-medium ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}
                  >
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
                  <span
                    className={`text-[11px] uppercase tracking-[0.15em] font-semibold ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}
                  >
                    Sebelumnya
                  </span>
                  <h4
                    className={`font-serif-display text-xl sm:text-2xl font-bold mt-2 transition-colors duration-200 group-hover:underline ${
                      isLight
                        ? 'text-ink group-hover:text-gold'
                        : 'text-cream group-hover:text-lantern'
                    }`}
                  >
                    {prevEvent.title}
                  </h4>
                  <span
                    className={`text-sm mt-1 inline-flex items-center gap-1.5 font-medium ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}
                  >
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
