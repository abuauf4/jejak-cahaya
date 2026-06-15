'use client';

import { motion } from 'framer-motion';
import { Heart, BookOpen, Scale, PenLine, Globe, FlaskConical } from 'lucide-react';

const contributions = [
  {
    icon: Scale,
    title: 'Koreksi Ilmiah',
    description: 'Memastikan setiap kisah sesuai dengan sumber-sumber sirah yang terpercaya.',
  },
  {
    icon: BookOpen,
    title: 'Masukan Referensi',
    description: 'Menambahkan rujukan dan sumber yang memperkuat akurasi setiap peristiwa.',
  },
  {
    icon: PenLine,
    title: 'Kontribusi Penulisan',
    description: 'Menulis dan menyempurnakan narasi kisah dengan bahasa yang indah dan akurat.',
  },
  {
    icon: FlaskConical,
    title: 'Dukungan Keilmuan',
    description: 'Review oleh ulama dan ahli sirah untuk menjaga orisinalitas dan ketepatan.',
  },
  {
    icon: Globe,
    title: 'Dukungan Operasional',
    description: 'Membantu platform tetap berjalan dan dapat diakses secara gratis oleh semua orang.',
  },
];

export default function Community() {
  return (
    <section className="relative py-16 sm:py-24 bg-[#080B16]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-4 h-4 text-[#D4A843]" />
            <span className="text-xs text-[#D4A843] font-medium uppercase tracking-wider">Komunitas</span>
          </div>
          <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#F0EBE0] mb-4 max-w-lg mx-auto leading-tight">
            Perpustakaan Digital Kisah Islam yang Dapat Diakses Secara Gratis
          </h2>
          <p className="text-[#8B8070] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Jejak Cahaya adalah proyek terbuka yang berkomitmen menyajikan kisah-kisah Islam dengan akurat,
            indah, dan dapat diakses oleh siapa saja tanpa biaya.
          </p>
        </motion.div>

        {/* Contribution cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {contributions.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="p-5 rounded-xl bg-[#0F1629] border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)] transition-colors"
              >
                <div className="w-9 h-9 rounded-lg bg-[#D4A843]/10 flex items-center justify-center mb-3">
                  <Icon className="w-4 h-4 text-[#D4A843]" />
                </div>
                <h3 className="font-medium text-[#F0EBE0] text-sm mb-1.5">{item.title}</h3>
                <p className="text-xs text-[#8B8070] leading-relaxed">{item.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Review note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <p className="text-xs text-[#8B8070]/60 max-w-md mx-auto leading-relaxed">
            Setiap konten melewati proses kajian dan review untuk memastikan keakuratan ilmiah
            sebelum dipublikasikan. Konten demo saat ini sedang menunggu proses review.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
