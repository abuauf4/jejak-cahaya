'use client';

import { motion } from 'framer-motion';
import { Clock, Users, MapPin, BookOpen, ScrollText } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import type { ViewType } from '@/lib/store';

interface JourneyCard {
  title: string;
  description: string;
  icon: React.ElementType;
  view: ViewType;
  id?: string;
}

const journeys: JourneyCard[] = [
  {
    title: 'Timeline',
    description: 'Ikuti perjalanan kronologis kehidupan Rasulullah ﷺ',
    icon: Clock,
    view: 'timeline',
  },
  {
    title: 'Tokoh',
    description: 'Kenali para sahabat, keluarga, dan tokoh dalam Sirah',
    icon: Users,
    view: 'character',
  },
  {
    title: 'Lokasi',
    description: 'Jelajahi tempat-tempat bersejarah dalam perjalanan Sirah',
    icon: MapPin,
    view: 'location',
  },
  {
    title: 'Peristiwa',
    description: 'Baca kisah-kisah penting dalam kehidupan Rasulullah ﷺ',
    icon: BookOpen,
    view: 'timeline',
  },
  {
    title: 'Sirah Lengkap',
    description: 'Mulai dari awal dan ikuti seluruh perjalanan Sirah',
    icon: ScrollText,
    view: 'reader',
    id: 'kelahiran',
  },
];

export default function ChooseJourney() {
  const { navigateTo } = useNavigation();

  return (
    <section className="py-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-gradient-gold mb-3">
            Pilih Perjalananmu
          </h2>
          <p className="text-[#8B8070] max-w-md mx-auto">
            Beragam cara untuk menelusuri jejak kehidupan Rasulullah ﷺ
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {journeys.map((journey, idx) => (
            <motion.button
              key={journey.title}
              className="group relative bg-[#0F1629] border border-[rgba(245,215,142,0.08)] rounded-xl p-6 text-left transition-all duration-300 hover:border-[rgba(245,215,142,0.25)] hover:glow-gold"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigateTo(journey.view, journey.id)}
            >
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(245,215,142,0.06) 0%, transparent 70%)',
                }}
              />

              <div className="relative z-10">
                <div className="w-10 h-10 rounded-lg bg-[rgba(245,215,142,0.08)] flex items-center justify-center mb-4 group-hover:bg-[rgba(245,215,142,0.15)] transition-colors duration-300">
                  <journey.icon className="h-5 w-5 text-[#F5D78E]" />
                </div>
                <h3 className="font-serif-display text-lg text-[#F0EBE0] mb-2 group-hover:text-[#F5D78E] transition-colors duration-200">
                  {journey.title}
                </h3>
                <p className="text-sm text-[#8B8070] leading-relaxed">
                  {journey.description}
                </p>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
