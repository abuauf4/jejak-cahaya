'use client';

import { motion } from 'framer-motion';
import { BookOpen, Lock, Sparkles } from 'lucide-react';
import { collections, getActiveCollection, getJourneysByCollection, getEventsByJourney } from '@/data/content';
import { useNavigation } from '@/lib/store';

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
            <Sparkles className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs text-[#D4A843] font-medium uppercase tracking-wider">Koleksi</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0]">
            Koleksi Jejak Cahaya
          </h2>
        </motion.div>

        {/* Active collection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative p-6 sm:p-8 rounded-2xl bg-[#0F1629] border border-[rgba(245,215,142,0.15)] overflow-hidden mb-6"
        >
          {/* Glow */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#8B6914] via-[#D4A843] to-[#F5D78E]" />

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#D4A843]/10 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-[#D4A843]" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-serif-display text-xl font-bold text-[#F5D78E]">
                  {activeCollection.title}
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D4A843]/20 text-[#D4A843] font-medium">
                  Aktif
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
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-[#D4A843] hover:text-[#F5D78E] transition-colors font-medium"
              >
                Jelajahi koleksi
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Coming soon collections */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {comingSoonCollections.map((col, i) => (
            <motion.div
              key={col.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 + i * 0.1 }}
              className="relative p-5 rounded-xl bg-[#0F1629]/50 border border-[rgba(245,215,142,0.06)] overflow-hidden group"
            >
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-3.5 h-3.5 text-[#8B8070]/50" />
                <span className="text-[10px] text-[#8B8070]/50 font-medium uppercase tracking-wider">Segera Hadir</span>
              </div>
              <h4 className="font-medium text-[#C4B59A]/70 text-sm mb-1">{col.title}</h4>
              <p className="text-xs text-[#8B8070]/50 line-clamp-2">{col.subtitle}</p>
              <div
                className="absolute top-0 right-0 w-16 h-16 rounded-full blur-[40px] opacity-20"
                style={{ backgroundColor: col.coverTheme }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
