'use client';

import { motion } from 'framer-motion';
import { BookOpen, ScrollText } from 'lucide-react';
import { collections, getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';
import { useNavigation } from '@/lib/store';

const emptyStateMessages: Record<string, { message: string; detail: string }> = {
  'kisah-sahabat': {
    message: 'Kisah Para Sahabat sedang dalam proses kajian dan penyusunan.',
    detail: 'Kami memilih menghadirkan materi secara bertahap agar setiap kisah dapat ditinjau dengan lebih baik sebelum dipublikasikan.',
  },
  'kisah-nabi': {
    message: 'Kisah Para Nabi sedang dalam proses kajian dan penyusunan.',
    detail: 'Setiap kisah nabi memerlukan penelitian mendalam untuk memastikan narasi yang akurat dan penuh hikmah.',
  },
  'peradaban-islam': {
    message: 'Peradaban Islam sedang dalam proses kajian dan penyusunan.',
    detail: 'Jejak peradaban Islam yang luas memerlukan kurasi cermat agar dapat dihadirkan dengan utuh dan bermakna.',
  },
};

export default function FeaturedJourney() {
  const activeCollection = getActiveCollection();
  const { navigateTo } = useNavigation();

  if (!activeCollection) return null;

  const journeys = getJourneysByCollection(activeCollection.id);
  const totalEvents = journeys.reduce((acc, j) => acc + getEventsByJourney(j.id).length, 0);
  const comingSoonCollections = collections.filter((c) => c.status === 'coming_soon');

  return (
    <section className="relative py-16 sm:py-24 bg-[#080B16]">
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#D4A843]/[0.02] to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs text-[#D4A843] font-medium uppercase tracking-wider">Koleksi</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0]">
            Perpustakaan Jejak Cahaya
          </h2>
        </motion.div>

        {/* Active collection — prominent card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative p-6 sm:p-8 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.15)] overflow-hidden mb-8"
        >
          {/* Top gold line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E]" />

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center">
              <ScrollText className="w-6 h-6 text-[#D4A843]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif-display text-xl font-bold text-[#F5D78E]">
                  {activeCollection.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A843]/20 text-[#D4A843] font-medium">
                  Tersedia
                </span>
              </div>
              <p className="text-sm text-[#C4B59A] mb-2">{activeCollection.subtitle}</p>
              <p className="text-sm text-[#8B8070] leading-relaxed mb-4">
                {activeCollection.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[#8B8070]">
                <span>{journeys.length} perjalanan</span>
                <span className="w-1 h-1 rounded-full bg-[#8B8070]/40" />
                <span>{totalEvents} kisah</span>
              </div>
              <button
                onClick={() => navigateTo('timeline')}
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D4A843] hover:text-[#F5D78E] transition-colors font-medium group"
              >
                Jelajahi koleksi
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coming soon collections — professional empty states */}
        <div className="space-y-3">
          {comingSoonCollections.map((col, i) => {
            const emptyMsg = emptyStateMessages[col.id] || {
              message: 'Koleksi ini sedang dalam proses kajian dan penyusunan.',
              detail: 'Kami memilih menghadirkan materi secara bertahap agar setiap kisah dapat ditinjau dengan lebih baik sebelum dipublikasikan.',
            };

            return (
              <motion.div
                key={col.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
                className="relative p-5 sm:p-6 rounded-xl bg-[#0F1629]/40 border border-[rgba(245,215,142,0.04)]"
              >
                <div className="flex items-start gap-3">
                  {/* Subtle collection icon */}
                  <div
                    className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${col.coverTheme}10` }}
                  >
                    <BookOpen className="w-4 h-4" style={{ color: `${col.coverTheme}80` }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-[#C4B59A]/80 text-sm mb-0.5">{col.title}</h4>
                    <p className="text-xs text-[#8B8070]/50 mb-3">{col.subtitle}</p>
                    <p className="text-xs text-[#8B8070]/70 leading-relaxed">
                      {emptyMsg.message}
                    </p>
                    <p className="text-xs text-[#8B8070]/40 leading-relaxed mt-1">
                      {emptyMsg.detail}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
