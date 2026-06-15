'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  return (
    <section
      className={`relative flex items-center justify-center h-[50vh] sm:h-[55vh] ${
        isLight ? 'bg-paper' : 'bg-navy-deep'
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-2xl mx-auto px-5 sm:px-6 text-center"
      >
        {/* Logo */}
        <motion.div variants={item} className="mb-6">
          <span
            className={`font-serif-display text-sm tracking-[0.3em] ${
              isLight ? 'text-gold' : 'text-lantern-mid'
            }`}
          >
            JEJAK CAHAYA
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={item}
          className={`font-serif-display text-2xl sm:text-3xl md:text-4xl font-bold leading-[1.25] mb-3 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}
        >
          Perpustakaan Digital
          <br />
          Kisah Islam
        </motion.h1>
      </motion.div>
    </section>
  );
}
