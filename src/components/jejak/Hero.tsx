'use client';

import { motion } from 'framer-motion';
import { Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigation } from '@/lib/store';

export default function Hero() {
  const { navigateTo } = useNavigation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: deep navy with radial gold glow */}
      <div className="absolute inset-0 bg-[#080B16]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(245,215,142,0.04) 0%, rgba(212,168,67,0.02) 30%, transparent 70%)',
        }}
      />
      {/* Subtle secondary glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 30% 60%, rgba(139,105,20,0.03) 0%, transparent 50%)',
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Moon className="h-24 w-24 text-[#F5D78E]" />
      </div>
      <div className="absolute bottom-32 right-16 opacity-5">
        <Moon className="h-40 w-40 text-[#D4A843]" />
      </div>

      {/* Decorative gold line ornament */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 line-gold opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="w-12 line-gold" />
          <Moon className="h-5 w-5 text-[#F5D78E] lantern-pulse" />
          <div className="w-12 line-gold" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
        >
          <span className="text-gradient-gold">
            Menelusuri Jejak
          </span>
          <br />
          <span className="text-[#F0EBE0]">
            Kehidupan Rasulullah{' '}
            <span className="text-gradient-gold">ﷺ</span>
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="text-[#8B8070] text-base sm:text-lg max-w-xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Ikuti perjalanan hidup Rasulullah ﷺ melalui kisah, timeline, lokasi,
          dan referensi terpercaya.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <Button
            onClick={() => navigateTo('timeline')}
            className="bg-gradient-to-r from-[#D4A843] to-[#F5D78E] text-[#080B16] font-semibold px-8 py-6 text-base hover:from-[#F5D78E] hover:to-[#D4A843] transition-all duration-300 glow-gold rounded-lg"
          >
            Mulai Perjalanan
          </Button>
          <Button
            onClick={() => navigateTo('timeline')}
            variant="outline"
            className="border-[rgba(245,215,142,0.3)] text-[#F5D78E] hover:bg-[rgba(245,215,142,0.08)] hover:border-[rgba(245,215,142,0.5)] font-semibold px-8 py-6 text-base transition-all duration-300 rounded-lg"
          >
            Jelajahi Timeline
          </Button>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-16 flex items-center justify-center gap-3"
        >
          <div className="w-16 line-gold opacity-40" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#D4A843] opacity-60" />
          <div className="w-16 line-gold opacity-40" />
        </motion.div>
      </div>
    </section>
  );
}
