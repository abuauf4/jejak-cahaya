'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useNavigation, useReadingProgress } from '@/lib/store';
import {
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';

/**
 * JourneyProgressBar — Ringkasan visual perjalanan musafir.
 * Dipakai di home page untuk nunjukin "seberapa jauh perjalananmu".
 *
 * Konsep: pembaca = musafir. Ini bukan "reading progress",
 * ini seberapa jauh musafir sudah menempuh jejak.
 */
export default function JourneyProgressBar() {
  const { theme } = useNavigation();
  const { readEvents, getProgress, getJourneyProgress } = useReadingProgress();
  const isLight = theme === 'light';

  const progress = getProgress();
  const collection = getActiveCollection();
  if (!collection) return null;

  const journeys = getJourneysByCollection(collection.id);

  // Jangan tampil kalau belum mulai baca
  if (progress.read === 0) return null;

  return (
    <section className={`py-8 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Top separator */}
          <div className={`h-px w-full ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />

          <div className="py-6 sm:py-8">
            {/* Label */}
            <span className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
              isLight ? 'text-gold' : 'text-lantern-mid'
            }`}>
              Perjalananmu
            </span>

            {/* Overall progress bar */}
            <div className="mt-3 mb-4">
              <div className="flex items-baseline justify-between mb-2">
                <h3 className={`font-serif-display text-xl font-bold ${
                  isLight ? 'text-ink' : 'text-cream'
                }`}>
                  {progress.read} dari {progress.total} bab
                </h3>
                <span className={`text-sm font-medium ${
                  isLight ? 'text-gold' : 'text-lantern-mid'
                }`}>
                  {progress.percentage}%
                </span>
              </div>

              {/* Progress bar */}
              <div className={`h-2 rounded-full overflow-hidden ${
                isLight ? 'bg-ink/[0.06]' : 'bg-sand/[0.08]'
              }`}>
                <motion.div
                  className={`h-full rounded-full ${
                    isLight ? 'bg-gold' : 'bg-lantern-mid'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress.percentage}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            {/* Per-fase mini progress */}
            <div className="space-y-2 mt-5">
              {journeys.map((journey) => {
                const events = getEventsByJourney(journey.id);
                if (events.length === 0) return null;
                const jp = getJourneyProgress(events.map(e => e.id));
                const isComplete = jp.percentage === 100;
                const isActive = jp.read > 0 && jp.percentage < 100;

                return (
                  <Link
                    key={journey.id}
                    href={`/fase/${journey.id.replace('fase-', '')}`}
                    className={`flex items-center gap-3 p-2.5 rounded-lg transition-colors group ${
                      isLight ? 'hover:bg-ink/[0.03]' : 'hover:bg-sand/[0.04]'
                    }`}
                  >
                    {/* Fase indicator */}
                    <span className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      isComplete
                        ? isLight ? 'bg-gold text-white' : 'bg-lantern-mid text-navy-deep'
                        : isActive
                          ? isLight ? 'border-2 border-gold text-gold' : 'border-2 border-lantern-mid text-lantern-mid'
                          : isLight ? 'border border-ink/20 text-transparent' : 'border border-sand/20 text-transparent'
                    }`}>
                      {isComplete ? '✓' : ''}
                    </span>

                    {/* Fase info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className={`text-sm font-medium transition-colors ${
                          isActive
                            ? isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                            : isLight ? 'text-ink-soft' : 'text-sand'
                        }`}>
                          {journey.title}
                        </span>
                        <span className={`text-[11px] flex-shrink-0 ${
                          isLight ? 'text-ink-light' : 'text-warm-muted'
                        }`}>
                          {jp.read}/{jp.total}
                        </span>
                      </div>
                      {/* Mini bar */}
                      <div className={`h-1 rounded-full mt-1 overflow-hidden ${
                        isLight ? 'bg-ink/[0.04]' : 'bg-sand/[0.06]'
                      }`}>
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isComplete
                              ? isLight ? 'bg-gold' : 'bg-lantern-mid'
                              : isLight ? 'bg-gold/50' : 'bg-lantern-mid/50'
                          }`}
                          style={{ width: `${jp.percentage}%` }}
                        />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Bottom separator */}
          <div className={`h-px w-full ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
        </motion.div>
      </div>
    </section>
  );
}
