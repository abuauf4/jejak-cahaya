'use client';

import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/store';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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
      className={`relative flex items-center justify-center min-h-[60vh] sm:min-h-[65vh] ${
        isLight ? 'parchment-light' : 'parchment-dark'
      }`}
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 text-center"
      >
        {/* Brand */}
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
          className={`font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.2] mb-5 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}
        >
          Jejak Cahaya
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={item}
          className={`font-serif-display text-base sm:text-lg md:text-xl leading-relaxed max-w-lg mx-auto ${
            isLight ? 'text-ink-soft' : 'text-[#8B8070]'
          }`}
        >
          Media digital yang menghadirkan perjalanan Rasulullah ﷺ, para nabi, dan para sahabat dalam bentuk yang mudah dibaca dan dipelajari.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          variants={item}
          className={`mt-8 mx-auto h-px w-16 ${
            isLight ? 'bg-gold/30' : 'bg-[#D4A843]/20'
          }`}
        />
      </motion.div>
    </section>
  );
}
