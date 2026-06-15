'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/lib/store';
import { phases } from '@/data/phases';
import { events } from '@/data/events';

export default function TimelinePreview() {
  const { navigateTo } = useNavigation();
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = 300;
    scrollRef.current.scrollBy({
      left: direction === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-gradient-gold mb-3">
            Perjalanan Hidup Rasulullah ﷺ
          </h2>
          <p className="text-[#8B8070] max-w-lg mx-auto">
            Dari kelahiran hingga wafat, setiap fase penuh hikmah dan pelajaran
          </p>
        </motion.div>

        {/* Scroll controls */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#0F1629]/80 backdrop-blur-sm border border-[rgba(245,215,142,0.1)] text-[#F5D78E] hover:bg-[#1A2038] hidden sm:flex h-10 w-10 rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#0F1629]/80 backdrop-blur-sm border border-[rgba(245,215,142,0.1)] text-[#F5D78E] hover:bg-[#1A2038] hidden sm:flex h-10 w-10 rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Timeline track */}
          <div
            ref={scrollRef}
            className="overflow-x-auto scrollbar-none pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="relative flex items-start min-w-max py-8">
              {/* The gold line */}
              <div className="absolute top-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4A843]/50 to-transparent" />

              {phases.map((phase, idx) => {
                const phaseEvents = events.filter(
                  (e) => e.phaseId === phase.id
                );
                const firstEvent = phaseEvents[0];

                return (
                  <motion.div
                    key={phase.id}
                    className="flex flex-col items-center px-4 sm:px-6 md:px-8 cursor-pointer group"
                    style={{ minWidth: '160px' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    onClick={() => {
                      if (firstEvent) navigateTo('reader', firstEvent.id);
                      else navigateTo('timeline');
                    }}
                  >
                    {/* Dot on the line */}
                    <div className="relative z-10">
                      <div
                        className="w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-150"
                        style={{
                          borderColor: phase.color,
                          backgroundColor: `${phase.color}33`,
                        }}
                      />
                      <div
                        className="absolute inset-0 w-4 h-4 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 blur-md"
                        style={{ backgroundColor: phase.color }}
                      />
                    </div>

                    {/* Phase info */}
                    <div className="mt-4 text-center max-w-[160px]">
                      <p
                        className="text-xs font-medium mb-1 transition-colors duration-200"
                        style={{ color: phase.color }}
                      >
                        {phase.period}
                      </p>
                      <p className="text-sm text-[#F0EBE0] font-medium leading-tight group-hover:text-[#F5D78E] transition-colors duration-200">
                        {phase.name}
                      </p>
                      <p className="text-xs text-[#8B8070] mt-1 line-clamp-2">
                        {phase.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigateTo('timeline')}
            className="text-[#C4B59A] hover:text-[#F5D78E] text-sm"
          >
            Lihat Timeline Lengkap →
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
