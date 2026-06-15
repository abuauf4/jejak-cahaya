'use client';

import { motion } from 'framer-motion';
import { BookOpen, PenLine, GraduationCap, Heart } from 'lucide-react';

const contributions = [
  {
    icon: BookOpen,
    title: 'Tinjauan Ilmiah',
    description: 'Bantu tinjau keakuratan referensi dan sumber Sirah',
  },
  {
    icon: PenLine,
    title: 'Penulisan',
    description: 'Kontribusi dalam penulisan dan pengembangan konten',
  },
  {
    icon: GraduationCap,
    title: 'Pendidikan',
    description: 'Kolaborasi untuk penggunaan platform di dunia pendidikan',
  },
  {
    icon: Heart,
    title: 'Dukungan',
    description: 'Dukung pengembangan dan keberlanjutan platform ini',
  },
];

export default function Contribute() {
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
            BerKontribusi
          </h2>
          <p className="text-[#8B8070] max-w-lg mx-auto leading-relaxed">
            Jejak Cahaya adalah proyek terbuka. Kami mengundang para ulama,
            penulis, ilustrator, dan pecinta Sirah untuk bersama menyebarkan
            cahaya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contributions.map((item, idx) => (
            <motion.div
              key={item.title}
              className="flex items-start gap-4 bg-[#0F1629]/50 border border-[rgba(245,215,142,0.06)] rounded-xl p-5 sm:p-6"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[rgba(245,215,142,0.06)] flex items-center justify-center">
                <item.icon className="h-5 w-5 text-[#D4A843]" />
              </div>
              <div>
                <h3 className="font-serif-display text-base text-[#F0EBE0] mb-1">
                  {item.title}
                </h3>
                <p className="text-sm text-[#8B8070] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
