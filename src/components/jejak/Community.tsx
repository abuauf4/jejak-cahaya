'use client';

import { motion } from 'framer-motion';
import { BookOpen, Scale, PenLine, FlaskConical } from 'lucide-react';
import { useNavigation } from '@/lib/store';

const contributions = [
  {
    icon: BookOpen,
    title: 'Referensi dan sumber terpercaya',
  },
  {
    icon: Scale,
    title: 'Koreksi ilmiah',
  },
  {
    icon: PenLine,
    title: 'Kontribusi penulisan',
  },
  {
    icon: FlaskConical,
    title: 'Review keilmuan',
  },
];

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
    <section className={`relative py-20 sm:py-28 ${isLight ? 'bg-paper' : 'bg-[#080B16]'}`}>
      <div className="max-w-2xl mx-auto px-5 sm:px-6">
        {/* ── Title ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h2 className={`font-serif-display text-3xl sm:text-4xl font-bold leading-tight mb-5 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}>
            Jejak Cahaya
          </h2>
          <p className={`text-base sm:text-lg leading-relaxed max-w-lg mx-auto ${
            isLight ? 'text-ink-soft' : 'text-[#8B8070]'
          }`}>
            Perpustakaan digital terbuka untuk siapa saja yang ingin mengenal perjalanan Rasulullah dan sejarah Islam.
          </p>
        </motion.div>

        {/* ── "Terbuka" lines ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="text-center mb-14 space-y-2"
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

        {/* ── Divider ── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={`h-px w-16 mx-auto mb-14 origin-center ${
            isLight ? 'bg-gold/30' : 'bg-[#D4A843]/20'
          }`}
        />

        {/* ── Contributions ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="mb-14"
        >
          <p className={`text-center text-sm font-medium uppercase tracking-[0.12em] mb-8 ${
            isLight ? 'text-ink-soft' : 'text-[#8B8070]'
          }`}>
            Kami menerima dukungan dalam bentuk
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg mx-auto">
            {contributions.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                  className={`flex items-center gap-3 p-4 rounded-xl transition-colors ${
                    isLight
                      ? 'bg-ink/[0.02] border border-ink/[0.05] hover:border-gold/20'
                      : 'bg-[#0F1629] border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                    isLight ? 'bg-gold/10' : 'bg-[#D4A843]/10'
                  }`}>
                    <Icon className={`w-4 h-4 ${isLight ? 'text-gold' : 'text-[#D4A843]'}`} />
                  </div>
                  <span className={`text-sm ${isLight ? 'text-ink' : 'text-[#F0EBE0]'}`}>
                    {item.title}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* ── Closing ── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className={`text-center text-sm leading-relaxed max-w-md mx-auto ${
            isLight ? 'text-ink-soft/70' : 'text-[#8B8070]/70'
          }`}
        >
          Setiap masukan yang baik adalah bagian dari ikhtiar menjaga warisan ilmu ini bersama.
        </motion.p>
      </div>
    </section>
  );
}
