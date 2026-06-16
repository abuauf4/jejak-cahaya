'use client';

import Link from 'next/link';
import { useNavigation } from '@/lib/store';
import {
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';

interface JourneyProgressProps {
  currentEventId?: string;
  /** When true, renders as compact sidebar widget. Default: full panel. */
  compact?: boolean;
}

export default function JourneyProgress({ currentEventId, compact = false }: JourneyProgressProps) {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  const collection = getActiveCollection();
  if (!collection) return null;
  const journeys = getJourneysByCollection(collection.id);

  const mutedText = isLight ? 'text-ink-light' : 'text-warm-muted';
  const accentText = isLight ? 'text-gold' : 'text-lantern-mid';
  const titleText = isLight ? 'text-ink' : 'text-cream';
  const subText = isLight ? 'text-ink-soft' : 'text-sand';

  return (
    <section className={compact ? '' : 'py-8'}>
      {!compact && (
        <div className="mb-6">
          <h2 className={`font-serif-display text-xl sm:text-2xl font-bold mb-1 ${titleText}`}>
            Jejak Perjalanan
          </h2>
          <p className={`text-sm ${subText}`}>
            Setiap fase — setiap langkah — dalam satu peta.
          </p>
        </div>
      )}

      <div className="space-y-5">
        {journeys.map((journey) => {
          const events = getEventsByJourney(journey.id);
          if (events.length === 0) return null;

          // Determine completion: a bab is "read" if user has visited it (we use currentEventId as proxy for now)
          // For true progress tracking, would need persistence; here we mark "completed" as those before current bab
          let currentIndex = -1;
          if (currentEventId) {
            currentIndex = events.findIndex((e) => e.id === currentEventId);
          }

          return (
            <div
              key={journey.id}
              className={`rounded-xl p-4 sm:p-5 border ${
                isLight
                  ? 'bg-white/40 border-ink/[0.08]'
                  : 'bg-navy/40 border-sand/[0.08]'
              }`}
            >
              <div className="flex items-baseline justify-between gap-3 mb-3">
                <div className="min-w-0">
                  <span className={`text-[10px] uppercase tracking-[0.2em] font-semibold ${accentText}`}>
                    Fase {journey.order}
                  </span>
                  <h3 className={`font-serif-display text-base sm:text-lg font-bold mt-0.5 ${titleText}`}>
                    {journey.title}
                  </h3>
                </div>
                <span className={`text-[11px] flex-shrink-0 ${mutedText}`}>
                  {journey.subtitle}
                </span>
              </div>

              <ol className="space-y-1.5">
                {events.map((evt, i) => {
                  const isCurrent = evt.id === currentEventId;
                  const isRead = currentEventId && currentIndex >= 0 && i < currentIndex;
                  const isLocked = false; // no locking for now — all babs visible

                  return (
                    <li key={evt.id}>
                      <Link
                        href={`/bab/${evt.id.replace('bab-', '')}`}
                        className={`flex items-start gap-2.5 p-2 -mx-2 rounded-lg transition-colors duration-150 group ${
                          isCurrent
                            ? isLight ? 'bg-gold/[0.08]' : 'bg-lantern-mid/[0.08]'
                            : isLight ? 'hover:bg-ink/[0.03]' : 'hover:bg-sand/[0.04]'
                        }`}
                      >
                        {/* Status indicator */}
                        <span
                          className={`flex-shrink-0 mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center text-[9px] font-bold ${
                            isCurrent
                              ? isLight
                                ? 'border-gold bg-gold text-white'
                                : 'border-lantern-mid bg-lantern-mid text-navy-deep'
                              : isRead
                                ? isLight
                                  ? 'border-gold/60 bg-gold/15 text-gold'
                                  : 'border-lantern-mid/60 bg-lantern-mid/15 text-lantern-mid'
                                : isLight
                                  ? 'border-ink/20 text-transparent'
                                  : 'border-sand/20 text-transparent'
                          }`}
                          aria-hidden="true"
                        >
                          {isCurrent ? '◉' : isRead ? '✓' : ''}
                        </span>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-2">
                            <span className={`text-[10px] font-mono ${mutedText}`}>
                              {evt.year}
                            </span>
                            {isCurrent && (
                              <span className={`text-[9px] uppercase tracking-wider font-bold ${accentText}`}>
                                Sedang Dibaca
                              </span>
                            )}
                          </div>
                          <h4 className={`text-sm leading-snug transition-colors duration-150 ${
                            isCurrent
                              ? accentText
                              : isLight
                                ? `text-ink-soft group-hover:text-ink`
                                : `text-sand group-hover:text-cream`
                          }`}>
                            {evt.title}
                          </h4>
                        </div>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </div>
          );
        })}
      </div>
    </section>
  );
}
