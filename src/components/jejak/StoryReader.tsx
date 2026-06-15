'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  MapPin,
  Users,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { events } from '@/data/events';
import { getCharacterById } from '@/data/characters';
import { getLocationById } from '@/data/locations';

export default function StoryReader() {
  const { selectedEventId, navigateTo, goHome } = useNavigation();
  const { markEventRead, readEvents } = useReadingProgress();
  const [readProgress, setReadProgress] = useState(0);
  const storyEndRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const event = events.find((e) => e.id === selectedEventId);
  const location = event ? getLocationById(event.locationId) : undefined;
  const characters = event
    ? event.characterIds.map((id) => getCharacterById(id)).filter(Boolean)
    : [];

  // Find previous and next events
  const eventIndex = event
    ? events.findIndex((e) => e.id === event.id)
    : -1;
  const prevEvent = eventIndex > 0 ? events[eventIndex - 1] : null;
  const nextEvent =
    eventIndex >= 0 && eventIndex < events.length - 1
      ? events[eventIndex + 1]
      : null;

  // Reading progress based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        setReadProgress(Math.min((scrollTop / docHeight) * 100, 100));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mark as read when user scrolls to bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && event) {
          markEventRead(event.id);
        }
      },
      { threshold: 0.5 }
    );

    if (storyEndRef.current) {
      observer.observe(storyEndRef.current);
    }

    return () => observer.disconnect();
  }, [event, markEventRead]);

  if (!event) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-4 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="h-12 w-12 text-[#8B6914] mx-auto mb-4" />
          <p className="text-[#8B8070]">
            Pilih peristiwa untuk mulai membaca
          </p>
          <Button
            variant="ghost"
            onClick={() => navigateTo('timeline')}
            className="mt-4 text-[#F5D78E]"
          >
            Kembali ke Timeline
          </Button>
        </div>
      </div>
    );
  }

  // Split story into paragraphs
  const paragraphs = event.story
    .split('\n')
    .filter((p) => p.trim().length > 0);

  const isRead = readEvents.includes(event.id);

  return (
    <div className="min-h-screen pt-16 pb-16">
      {/* Reading progress bar */}
      <div className="fixed top-16 left-0 right-0 z-40 h-0.5 bg-[#1A2038]">
        <motion.div
          className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E]"
          style={{ width: `${readProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Hero Section */}
      <div
        className="relative pt-12 pb-16 px-4 sm:px-6"
        style={{
          background:
            'linear-gradient(180deg, rgba(245,215,142,0.04) 0%, transparent 100%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <Badge
                variant="outline"
                className="border-[rgba(245,215,142,0.2)] text-[#F5D78E] gap-1"
              >
                <Calendar className="h-3 w-3" />
                {event.year}
              </Badge>
              {location && (
                <Badge
                  variant="outline"
                  className="border-[rgba(245,215,142,0.2)] text-[#C4B59A] gap-1 cursor-pointer hover:text-[#F5D78E] transition-colors"
                  onClick={() => navigateTo('location', location.id)}
                >
                  <MapPin className="h-3 w-3" />
                  {location.name}
                </Badge>
              )}
              {isRead && (
                <Badge className="bg-[rgba(212,168,67,0.15)] text-[#D4A843] border-0">
                  Sudah dibaca
                </Badge>
              )}
            </div>

            {/* Title */}
            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl text-[#F0EBE0] mb-3 leading-tight">
              {event.title}
            </h1>
            <p className="font-serif-display text-lg sm:text-xl text-[#C4B59A] mb-6">
              {event.subtitle}
            </p>

            {/* Gold divider */}
            <div className="w-24 line-gold" />
          </motion.div>
        </div>
      </div>

      {/* Story Content */}
      <div ref={contentRef} className="px-4 sm:px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            {paragraphs.map((paragraph, idx) => (
              <div key={idx}>
                <p className="text-[#C4B59A] text-base sm:text-lg leading-relaxed sm:leading-loose mb-6">
                  {paragraph}
                </p>
                {/* Subtle gold line divider between some paragraphs */}
                {idx < paragraphs.length - 1 &&
                  idx % 3 === 2 && (
                    <div className="flex items-center justify-center my-8">
                      <div className="w-8 line-gold opacity-30" />
                      <div className="w-1 h-1 rounded-full bg-[#D4A843] opacity-40 mx-3" />
                      <div className="w-8 line-gold opacity-30" />
                    </div>
                  )}
              </div>
            ))}

            {/* End marker for IntersectionObserver */}
            <div ref={storyEndRef} className="h-1" />

            {/* End ornament */}
            <div className="flex items-center justify-center my-12">
              <div className="w-16 line-gold opacity-40" />
              <div className="w-2 h-2 rounded-full bg-[#D4A843] opacity-50 mx-4" />
              <div className="w-16 line-gold opacity-40" />
            </div>
          </motion.div>

          {/* Related Characters */}
          {characters.length > 0 && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-[#D4A843]" />
                <h3 className="font-serif-display text-lg text-[#F0EBE0]">
                  Tokoh Terkait
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {characters.map(
                  (char) =>
                    char && (
                      <button
                        key={char.id}
                        onClick={() =>
                          navigateTo('character', char.id)
                        }
                        className="flex items-center gap-3 p-4 bg-[#0F1629] border border-[rgba(245,215,142,0.08)] rounded-lg text-left hover:border-[rgba(245,215,142,0.2)] transition-colors duration-200 group"
                      >
                        <div className="w-10 h-10 rounded-full bg-[rgba(245,215,142,0.08)] flex items-center justify-center flex-shrink-0">
                          <Users className="h-4 w-4 text-[#D4A843]" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors truncate">
                            {char.name}
                          </p>
                          <p className="text-xs text-[#8B8070] truncate">
                            {char.title}
                          </p>
                        </div>
                        <ChevronRight className="h-4 w-4 text-[#8B8070] flex-shrink-0 ml-auto" />
                      </button>
                    )
                )}
              </div>
            </motion.div>
          )}

          {/* Related Location */}
          {location && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="h-4 w-4 text-[#D4A843]" />
                <h3 className="font-serif-display text-lg text-[#F0EBE0]">
                  Lokasi
                </h3>
              </div>
              <button
                onClick={() => navigateTo('location', location.id)}
                className="flex items-center gap-4 p-5 bg-[#0F1629] border border-[rgba(245,215,142,0.08)] rounded-lg text-left hover:border-[rgba(245,215,142,0.2)] transition-colors duration-200 group w-full"
              >
                <div className="w-12 h-12 rounded-lg bg-[rgba(245,215,142,0.08)] flex items-center justify-center flex-shrink-0">
                  <MapPin className="h-5 w-5 text-[#D4A843]" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-base font-medium text-[#F0EBE0] group-hover:text-[#F5D78E] transition-colors">
                    {location.name}
                  </p>
                  <p className="text-sm text-[#8B8070] line-clamp-2">
                    {location.description}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 text-[#8B8070] flex-shrink-0" />
              </button>
            </motion.div>
          )}

          {/* References */}
          {event.references.length > 0 && (
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="h-4 w-4 text-[#D4A843]" />
                <h3 className="font-serif-display text-lg text-[#F0EBE0]">
                  Referensi
                </h3>
              </div>
              <ul className="space-y-2">
                {event.references.map((ref, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-[#8B8070] pl-4 border-l-2 border-[rgba(245,215,142,0.15)]"
                  >
                    {ref}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}

          <Separator className="bg-[rgba(245,215,142,0.08)] mb-8" />

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-8">
            <Button
              variant="outline"
              onClick={() => navigateTo('timeline')}
              className="border-[rgba(245,215,142,0.2)] text-[#C4B59A] hover:text-[#F5D78E] hover:bg-[rgba(245,215,142,0.05)] flex-1 sm:flex-none rounded-lg"
            >
              Kembali ke Timeline
            </Button>
            <div className="flex gap-3 flex-1">
              {prevEvent && (
                <Button
                  variant="ghost"
                  onClick={() => navigateTo('reader', prevEvent.id)}
                  className="text-[#8B8070] hover:text-[#F5D78E] flex-1 rounded-lg"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  <span className="truncate">{prevEvent.title}</span>
                </Button>
              )}
              {nextEvent && (
                <Button
                  onClick={() => navigateTo('reader', nextEvent.id)}
                  className="bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold hover:from-[#F5D78E] hover:to-[#D4A843] transition-all duration-300 flex-1 rounded-lg"
                >
                  <span className="truncate">Lanjutkan Perjalanan</span>
                  <ArrowRight className="h-4 w-4 ml-2 flex-shrink-0" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
