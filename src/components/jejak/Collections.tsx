'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';
import { collections } from '@/data/content';

export default function Collections() {
  const { navigateTo, theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <section className={`pb-0 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        {/* Top separator */}
        <div className={`h-px w-full ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />

        <div className="py-8 sm:py-10">
          <span
            className={`text-[11px] uppercase tracking-[0.2em] font-semibold ${
              isLight ? 'text-ink-light' : 'text-warm-muted'
            }`}
          >
            Koleksi
          </span>

          <div className="mt-5 space-y-3">
            {collections.map((collection, i) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {collection.status === 'active' ? (
                  <button
                    onClick={() => navigateTo('timeline')}
                    className="group text-left block w-full"
                  >
                    <div className="flex items-baseline justify-between gap-3">
                      <h3
                        className={`font-serif-display text-lg sm:text-xl font-bold transition-colors duration-300 ${
                          isLight
                            ? 'text-ink group-hover:text-gold'
                            : 'text-cream group-hover:text-lantern'
                        }`}
                      >
                        {collection.title}
                      </h3>
                      <span
                        className={`text-xs font-medium flex-shrink-0 ${
                          isLight ? 'text-gold' : 'text-lantern-mid'
                        }`}
                      >
                        {collection.journeyIds.length} Fase
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-0.5 ${
                        isLight ? 'text-ink-soft' : 'text-sand'
                      }`}
                    >
                      {collection.subtitle}
                    </p>
                  </button>
                ) : (
                  <div>
                    <div className="flex items-baseline justify-between gap-3">
                      <h3
                        className={`font-serif-display text-lg sm:text-xl font-bold ${
                          isLight ? 'text-ink-light' : 'text-warm-muted'
                        }`}
                      >
                        {collection.title}
                      </h3>
                      <span
                        className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded ${
                          isLight
                            ? 'bg-ink/[0.04] text-ink-light'
                            : 'bg-sand/[0.06] text-warm-muted'
                        }`}
                      >
                        Segera Hadir
                      </span>
                    </div>
                    <p
                      className={`text-sm mt-0.5 ${
                        isLight ? 'text-ink-light' : 'text-warm-muted'
                      }`}
                    >
                      {collection.subtitle}
                    </p>
                  </div>
                )}

                {/* Separator between items */}
                {i < collections.length - 1 && (
                  <div className={`h-px mt-3 ${isLight ? 'bg-ink/[0.06]' : 'bg-sand/[0.06]'}`} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
