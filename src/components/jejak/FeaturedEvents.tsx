'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { events } from '@/data/events';
import { getLocationById } from '@/data/locations';

export default function FeaturedEvents() {
  const { navigateTo } = useNavigation();
  const featured = events.filter((e) => e.featured).slice(0, 6);

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-gradient-gold mb-3">
            Peristiwa Utama
          </h2>
          <p className="text-[#8B8070] max-w-lg mx-auto">
            Kisah-kisah yang membentuk titik balik dalam sejarah
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {featured.map((event, idx) => {
            const location = getLocationById(event.locationId);

            return (
              <motion.button
                key={event.id}
                className="group relative w-full text-left bg-[#0F1629] border border-[rgba(245,215,142,0.08)] rounded-xl p-5 sm:p-6 transition-all duration-300 hover:border-l-[#F5D78E] hover:border-l-2"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                onClick={() => navigateTo('reader', event.id)}
              >
                {/* Hover glow on left border */}
                <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-1 rounded-l-xl transition-all duration-300"
                  style={{
                    background: 'linear-gradient(to bottom, #F5D78E, #8B6914)',
                  }}
                />

                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Year badge */}
                  <div className="flex-shrink-0 w-16 sm:w-20 text-center">
                    <div className="bg-[rgba(245,215,142,0.08)] rounded-lg py-2 px-2 group-hover:bg-[rgba(245,215,142,0.15)] transition-colors duration-300">
                      <span className="text-sm sm:text-base font-semibold text-[#F5D78E]">
                        {event.year}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif-display text-base sm:text-lg text-[#F0EBE0] mb-1 group-hover:text-[#F5D78E] transition-colors duration-200">
                      {event.title}
                    </h3>
                    <p className="text-sm text-[#C4B59A] mb-2">
                      {event.subtitle}
                      {location && (
                        <span className="text-[#8B8070]"> · {location.name}</span>
                      )}
                    </p>
                    <p className="text-sm text-[#8B8070] line-clamp-2 leading-relaxed">
                      {event.description}
                    </p>
                  </div>

                  {/* Arrow */}
                  <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="h-5 w-5 text-[#F5D78E]" />
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
