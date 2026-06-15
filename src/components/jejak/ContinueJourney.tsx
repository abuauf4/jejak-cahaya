'use client';

import { motion } from 'framer-motion';
import { ArrowRight, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation, useReadingProgress } from '@/lib/store';
import { events } from '@/data/events';

export default function ContinueJourney() {
  const { navigateTo } = useNavigation();
  const { readEvents, currentEventId, getProgress } = useReadingProgress();
  const progress = getProgress();

  // Don't render if no progress
  if (readEvents.length === 0) return null;

  // Find the last read event or current event
  const lastReadId = currentEventId || readEvents[readEvents.length - 1];
  const lastEvent = events.find((e) => e.id === lastReadId);

  // If event not found, don't render
  if (!lastEvent) return null;

  // Find next event
  const nextEvent = events.find((e) => e.order === lastEvent.order + 1);
  const continueId = nextEvent?.id || lastEvent.id;

  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif-display text-2xl sm:text-3xl text-gradient-gold mb-6 text-center">
            Lanjutkan Perjalananmu
          </h2>

          <div className="bg-[#0F1629] border border-[rgba(245,215,142,0.1)] rounded-xl p-6 sm:p-8 glow-gold">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[rgba(245,215,142,0.08)] flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-[#F5D78E]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[#8B8070] mb-1">
                  Terakhir dibaca
                </p>
                <h3 className="font-serif-display text-lg text-[#F0EBE0] mb-1">
                  {lastEvent.title}
                </h3>
                <p className="text-sm text-[#C4B59A] mb-4">
                  {lastEvent.year} — {lastEvent.subtitle}
                </p>

                {/* Progress bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="text-[#8B8070]">Kemajuan</span>
                    <span className="text-[#F5D78E]">{progress.percentage}%</span>
                  </div>
                  <div className="w-full h-2 bg-[#1A2038] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E] rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${progress.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </div>
                  <p className="text-xs text-[#8B8070] mt-1">
                    {progress.read} dari {progress.total} peristiwa telah dibaca
                  </p>
                </div>

                <Button
                  onClick={() => navigateTo('reader', continueId)}
                  className="bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold hover:from-[#F5D78E] hover:to-[#D4A843] transition-all duration-300 rounded-lg"
                >
                  {nextEvent ? 'Lanjutkan' : 'Baca Lagi'}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
