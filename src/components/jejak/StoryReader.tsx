'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Users, BookOpen, Calendar } from 'lucide-react';
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
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F1]">
        <p className="text-[#6B5E4F]">Kisah tidak ditemukan</p>
      </div>
    );
  }

  const isLight = readerTheme === 'light';

  // Light reading mode — warm paper (primary/default)
  // Dark reading mode — for preference
  const bg = isLight ? '#FBF8F1' : '#1a1a1a';
  const textPrimary = isLight ? '#2C2418' : '#e0e0e0';
  const textMuted = isLight ? '#6B5E4F' : '#b0b0b0';
  const textSecondary = isLight ? '#9C8E7C' : '#909090';
  const borderColor = isLight ? 'rgba(44, 36, 24, 0.08)' : 'rgba(255, 255, 255, 0.06)';
  const cardBg = isLight ? 'rgba(255, 255, 255, 0.85)' : '#252525';
  const hoverBg = isLight ? 'rgba(44, 36, 24, 0.03)' : 'rgba(255, 255, 255, 0.05)';

  // Parse story into paragraphs
  const paragraphs = event.story.split('\n').filter((p) => p.trim());

  return (
    <div
      className="min-h-screen reader-transition"
      style={{ backgroundColor: bg }}
    >
      {/* Reading progress bar — thin & subtle */}
      <div
        className="fixed top-14 sm:top-16 left-0 right-0 z-40 h-[2px]"
        style={{ backgroundColor: isLight ? 'rgba(44, 36, 24, 0.04)' : 'rgba(255, 255, 255, 0.04)' }}
      >
        <motion.div
          className="h-full"
          style={{ backgroundColor: isLight ? 'rgba(212, 168, 67, 0.4)' : 'rgba(245, 215, 142, 0.35)' }}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Reading content */}
      <div className="pt-24 sm:pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-[65ch] mx-auto">
          {/* Header — title & metadata */}
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12 sm:mb-16"
          >
            {/* Year & location badges */}
            <div className="flex items-center gap-2 mb-5">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full"
                style={{
                  backgroundColor: isLight ? 'rgba(212, 168, 67, 0.1)' : 'rgba(245, 215, 142, 0.1)',
                  color: isLight ? '#8B6914' : '#F5D78E',
                }}
              >
                <Calendar className="w-3 h-3" />
                {event.year}
              </span>
              {location && (
                <button
                  onClick={() => navigateTo('location', event.locationId)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1 rounded-full transition-colors"
                  style={{
                    backgroundColor: isLight ? 'rgba(44, 36, 24, 0.04)' : 'rgba(255, 255, 255, 0.06)',
                    color: textMuted,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = isLight ? 'rgba(44, 36, 24, 0.08)' : 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = isLight ? 'rgba(44, 36, 24, 0.04)' : 'rgba(255, 255, 255, 0.06)';
                  }}
                >
                  <MapPin className="w-3 h-3" />
                  {location.name}
                </button>
              )}
            </div>

            {/* Title — comfortable serif */}
            <h1
              className="font-serif-display text-3xl sm:text-4xl md:text-[2.75rem] font-bold leading-tight mb-3"
              style={{ color: textPrimary }}
            >
              {event.title}
            </h1>
            <p
              className="font-serif-display text-lg italic"
              style={{ color: textMuted }}
            >
              {event.subtitle}
            </p>
          </motion.header>

          {/* Story body — Kindle/Apple Books comfort */}
          <motion.article
            ref={storyRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.15 }}
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

          {/* Read indicator */}
          {readEvents.includes(event.id) && (
            <div
              className="mt-10 pt-6 flex items-center gap-2 text-xs"
              style={{ borderTop: `1px solid ${borderColor}`, color: textSecondary }}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Sudah dibaca</span>
            </div>
          )}

          {/* Related Characters */}
          {characters.length > 0 && (
            <div
              className="mt-12 pt-8"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: textMuted }}>
                <Users className="w-4 h-4" />
                Tokoh dalam Kisah Ini
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {characters.map((char) => (
                  <button
                    key={char.id}
                    onClick={() => navigateTo('character', char.id)}
                    className="text-left p-4 rounded-xl border transition-colors"
                    style={{
                      backgroundColor: cardBg,
                      borderColor: borderColor,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = hoverBg;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = cardBg;
                    }}
                  >
                    <h4 className="font-serif-display font-bold text-sm mb-1" style={{ color: textPrimary }}>
                      {char.name}
                    </h4>
                    <p className="text-xs" style={{ color: textSecondary }}>{char.title}</p>
                    <p className="text-xs mt-2 line-clamp-2" style={{ color: textSecondary }}>{char.shortBio}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Location */}
          {location && (
            <div
              className="mt-8 pt-8"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              <h3 className="text-sm font-semibold mb-4 flex items-center gap-2" style={{ color: textMuted }}>
                <MapPin className="w-4 h-4" />
                Lokasi
              </h3>
              <button
                onClick={() => navigateTo('location', location.id)}
                className="text-left p-4 rounded-xl border w-full transition-colors"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = cardBg;
                }}
              >
                <h4 className="font-serif-display font-bold text-sm mb-1" style={{ color: textPrimary }}>
                  {location.name}
                </h4>
                <p className="text-xs" style={{ color: textSecondary }}>{location.description}</p>
                <p className="text-[10px] mt-2" style={{ color: textSecondary }}>{location.coordinates}</p>
              </button>
            </div>
          )}

          {/* References */}
          {event.references.length > 0 && (
            <div
              className="mt-8 pt-8"
              style={{ borderTop: `1px solid ${borderColor}` }}
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: textMuted }}>
                <BookOpen className="w-4 h-4" />
                Referensi
              </h3>
              <ul className="space-y-1.5">
                {event.references.map((ref, i) => (
                  <li key={i} className="text-xs flex items-start gap-2" style={{ color: textSecondary }}>
                    <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0 opacity-30" style={{ backgroundColor: textSecondary }} />
                    {ref}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Prev/Next Navigation — emotional journey feel */}
          <div
            className="mt-16 pt-8 grid grid-cols-2 gap-4"
            style={{ borderTop: `1px solid ${borderColor}` }}
          >
            {prevEvent ? (
              <button
                onClick={() => navigateTo('reader', prevEvent.id)}
                className="text-left p-4 rounded-xl border transition-colors group"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = cardBg;
                }}
              >
                <div className="flex items-center gap-1 text-xs mb-1.5" style={{ color: textSecondary }}>
                  <ChevronLeft className="w-3 h-3" />
                  Sebelumnya
                </div>
                <h4
                  className="text-sm font-medium line-clamp-2 transition-colors"
                  style={{ color: textPrimary }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A843'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = textPrimary; }}
                >
                  {prevEvent.title}
                </h4>
              </button>
            ) : (
              <div />
            )}
            {nextEvent ? (
              <button
                onClick={() => navigateTo('reader', nextEvent.id)}
                className="text-right p-4 rounded-xl border transition-colors group"
                style={{
                  backgroundColor: cardBg,
                  borderColor: borderColor,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = hoverBg;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = cardBg;
                }}
              >
                <div className="flex items-center justify-end gap-1 text-xs mb-1.5" style={{ color: textSecondary }}>
                  Lanjutkan Perjalanan
                  <ChevronRight className="w-3 h-3" />
                </div>
                <h4
                  className="text-sm font-medium line-clamp-2 transition-colors"
                  style={{ color: textPrimary }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = '#D4A843'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = textPrimary; }}
                >
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
