'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Clock, BookOpen, MapPin } from 'lucide-react';
import { useNavigation } from '@/lib/store';
import { useJejakNav } from '@/lib/useJejakNav';
import type { Character, StoryEvent } from '@/data/content';

interface CharacterDetailPageProps {
  character: Character;
  relatedEvents: StoryEvent[];
}

export default function CharacterDetailPage({ character, relatedEvents }: CharacterDetailPageProps) {
  const { theme } = useNavigation();
  const { goToBab } = useJejakNav();
  const isLight = theme === 'light';

  return (
    <section className={`min-h-screen pt-20 pb-24 md:pb-16 ${isLight ? 'bg-paper' : 'bg-navy-deep'}`}>
      <div className="max-w-3xl mx-auto px-5 sm:px-6">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link
            href="/tokoh"
            className={`inline-flex items-center gap-1.5 text-sm mb-8 transition-colors ${
              isLight ? 'text-ink-light hover:text-gold' : 'text-warm-muted hover:text-lantern-mid'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Semua Tokoh
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.05 }}
        >
          <h1 className={`font-serif-display text-3xl sm:text-4xl font-bold mb-2 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}>
            {character.name}
          </h1>
          <p className={`text-base mb-4 ${isLight ? 'text-gold' : 'text-lantern-mid'}`}>
            {character.title}
          </p>

          <div className={`flex items-center gap-4 text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {character.period}
            </span>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isLight ? 'bg-gold/10 text-gold' : 'bg-lantern-mid/15 text-lantern-mid'
            }`}>
              {character.role}
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={`h-px my-8 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />

        {/* Full Bio */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h2 className={`font-serif-display text-lg font-bold mb-4 ${
            isLight ? 'text-ink' : 'text-cream'
          }`}>
            Biografi
          </h2>
          <div className={`reader-content ${isLight ? 'reader-light' : ''}`}>
            {character.fullBio.split('\n').filter(p => p.trim()).map((paragraph, i) => (
              <p key={i} className={`text-base leading-relaxed ${
                isLight ? 'text-ink-soft' : 'text-warm-muted'
              }`}>
                {paragraph}
              </p>
            ))}
          </div>
        </motion.div>

        {/* Related Events */}
        {relatedEvents.length > 0 && (
          <>
            <div className={`h-px my-8 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              <h2 className={`font-serif-display text-lg font-bold mb-4 flex items-center gap-2 ${
                isLight ? 'text-ink' : 'text-cream'
              }`}>
                <BookOpen className="w-4 h-4" />
                Kisah Terkait
              </h2>
              <div className="space-y-3">
                {relatedEvents.map((evt) => (
                  <Link
                    key={evt.id}
                    href={`/bab/${evt.id.replace('bab-', '')}`}
                    className={`block p-4 rounded-xl border transition-all duration-200 group ${
                      isLight
                        ? 'bg-white/40 border-ink/[0.08] hover:border-gold/30 hover:bg-white/60'
                        : 'bg-navy/40 border-sand/[0.08] hover:border-lantern-mid/20 hover:bg-navy/60'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <span className={`text-xs ${isLight ? 'text-ink-light' : 'text-warm-muted'}`}>
                          {evt.year}
                        </span>
                        <h3 className={`text-base font-medium transition-colors ${
                          isLight ? 'text-ink group-hover:text-gold' : 'text-cream group-hover:text-lantern-mid'
                        }`}>
                          {evt.title}
                        </h3>
                        {evt.subtitle && (
                          <p className={`text-sm mt-0.5 ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                            {evt.subtitle}
                          </p>
                        )}
                      </div>
                      <span className={`text-lg ${isLight ? 'text-ink-light group-hover:text-gold' : 'text-warm-muted group-hover:text-lantern-mid'}`}>
                        →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}

        {/* References */}
        {character.references.length > 0 && (
          <>
            <div className={`h-px my-8 ${isLight ? 'bg-ink/10' : 'bg-sand/10'}`} />
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h2 className={`font-serif-display text-lg font-bold mb-4 ${
                isLight ? 'text-ink' : 'text-cream'
              }`}>
                Referensi
              </h2>
              <div className="flex flex-wrap gap-2">
                {character.references.map((ref, i) => (
                  <span key={i} className={`text-xs px-3 py-1.5 rounded-lg ${
                    isLight ? 'bg-ink/[0.04] text-ink-soft' : 'bg-navy-light text-warm-muted'
                  }`}>
                    {ref}
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
