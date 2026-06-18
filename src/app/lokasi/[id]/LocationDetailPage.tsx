'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, MapPin, Navigation, BookOpen } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import type { StoryLocation, StoryEvent } from '@/data/content';

interface LocationDetailPageProps {
  location: StoryLocation;
  relatedEvents: StoryEvent[];
}

export default function LocationDetailPage({ location, relatedEvents }: LocationDetailPageProps) {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <section className={`min-h-screen pt-20 pb-24 md:pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/lokasi"
            className={`inline-flex items-center gap-1.5 text-sm mb-8 transition-colors ${
              isLight ? 'text-ink-light hover:text-gold' : 'text-warm-muted hover:text-lantern-mid'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Semua Lokasi
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
              isLight ? 'bg-gold/10' : 'bg-lantern-mid/15'
            }`}>
              <MapPin className={`w-5 h-5 ${isLight ? 'text-gold' : 'text-lantern-mid'}`} />
            </div>
            <div>
              <h1 className={`font-serif-display text-3xl sm:text-4xl font-bold ${
                isLight ? 'text-ink' : 'text-cream'
              }`}>
                {location.name}
              </h1>
            </div>
          </div>

          <div className={`flex items-center gap-4 text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            <span className="flex items-center gap-1.5">
              <Navigation className="w-3.5 h-3.5" />
              {location.coordinates}
            </span>
          </div>

          <div className="mt-3">
            <span className={`text-sm px-3 py-1 rounded-full font-medium ${
              isLight ? 'bg-gold/10 text-gold' : 'bg-lantern-mid/15 text-lantern-mid'
            }`}>
              {location.significance}
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`h-px my-8 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />

        {/* Full Description */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className={`font-serif-display text-lg font-bold mb-4 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}>
            Tentang Lokasi Ini
          </h2>
          <div className={`reader-content ${isLight ? 'reader-light' : ''}`}>
            {location.fullDescription.split('\n').filter(p => p.trim()).map((paragraph, i) => (
              <p key={i} className={`text-base leading-relaxed ${
                isLight ? 'text-ink-soft' : 'text-warm-muted'
              }`}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <div className={`h-px my-8 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h2 className={`font-serif-display text-lg font-bold mb-4 flex items-center gap-2 ${
                isLight ? 'text-ink' : 'text-cream'
              }`}>
                <BookOpen className="w-4 h-4" />
                Kisah di Lokasi Ini
              </h2>
              <div className="space-y-3">
                {relatedEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    href={`/bab/${evt.id.replace('bab-', '')}`}
                    className={`block p-4 rounded-xl border transition-all duration-200 group ${
                      isLight
                        ? 'bg-white/40 border-ink/[0.08] hover:border-gold/30 hover:bg-white/60'
                        : 'bg-navy/40 border-sand/[0.08] hover:border-lantern-mid/20 hover:bg-navy/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className={`text-xs ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                          {evt.year}
                        </span>
                        <h3 className={`text-base font-medium transition-colors ${
                          isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                        }`}>
                          {evt.title}
                        </h3>
                        {evt.subtitle && (
                          <p className={`text-sm mt-0.5 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                            {evt.subtitle}
                          </p>
                        )}
                      </div>
                      <span className={`text-lg ${isLight ? 'text-ink-light group-hover:text-gold' : 'text-warm-muted group-hover:text-lantern-mid'}`}>
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
