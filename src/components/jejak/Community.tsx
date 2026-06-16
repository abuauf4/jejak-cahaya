'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';

const openness = [
  'Terbuka untuk dibaca.',
  'Terbuka untuk dipelajari.',
  'Terbuka untuk diberi masukan.',
  'Terbuka untuk dibangun bersama.',
];

export default function Community() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <section className={`relative py-20 sm:py-28 ${
      isLight ? 'parchment-light' : 'parchment-dark'
    }`}>
      <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6">
        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold leading-tight mb-3 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}>
            Jejak Cahaya
          </h2>
          <p className={`text-sm uppercase tracking-[0.15em] font-medium ${
            isLight ? 'text-gold' : 'text-lantern-mid'
          }`}>
            Media terbuka
          </p>
        </motion.div>

        {/* ── "Terbuka" lines ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center mb-10 space-y-3"
        >
          {openness.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className={`font-serif-display text-lg sm:text-xl italic ${
                i === openness.length - 1
                  ? isLight ? 'text-gold font-medium' : 'text-[#D4A843] font-medium'
                  : isLight ? 'text-ink-soft' : 'text-[#8B8070]'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </motion.div>

        {/* ── Decorative line ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`h-px w-16 mx-auto origin-center ${
            isLight ? 'bg-gold/25' : 'bg-[#D4A843]/15'
          }`}
        />

        {/* ── Closing ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-center text-sm leading-relaxed max-w-md mx-auto mt-10 ${
            isLight ? 'text-ink-soft/70' : 'text-[#8B8070]/70'
          }`}
        >
          Setiap masukan yang baik adalah bagian dari ikhtiar menjaga warisan ilmu ini bersama.
        </motion.p>
      </div>
    </section>
  );
}
