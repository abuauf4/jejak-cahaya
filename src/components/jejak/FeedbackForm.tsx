'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle } from 'lucide-react';
import { useNavigation } from '@/lib/store';

const categories = [
  { value: 'umum', label: 'Masukan Umum' },
  { value: 'koreksi', label: 'Koreksi Ilmiah' },
  { value: 'referensi', label: 'Masukan Referensi' },
  { value: 'penulisan', label: 'Kontribusi Penulisan' },
  { value: 'review', label: 'Review Keilmuan' },
];

export default function FeedbackForm() {
  const { theme } = useNavigation();
  const isLight = theme === 'light';

  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [category, setCategory] = useState('umum');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Listen for open-feedback event from bottom bar
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener('open-feedback', handler);
    return () => window.removeEventListener('open-feedback', handler);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setSubmitting(true);
    setError('');

    try {
      const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || null,
          category,
          message: message.trim(),
          page: window.location.pathname,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Gagal mengirim');
      }

      setSubmitted(true);
      setName('');
      setMessage('');
      setCategory('umum');

      setTimeout(() => {
        setSubmitted(false);
        setOpen(false);
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Terjadi kesalahan');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Modal overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className={`fixed inset-x-4 bottom-4 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:w-full sm:max-w-md z-50 rounded-2xl shadow-2xl overflow-hidden ${
                isLight ? 'bg-paper border border-ink/10' : 'bg-[#0F1629] border border-[rgba(245,215,142,0.08)]'
              }`}
            >
              {/* Header */}
              <div className={`flex items-center justify-between px-6 py-4 border-b ${
                isLight ? 'border-ink/8' : 'border-[rgba(245,215,142,0.06)]'
              }`}>
                <h3 className={`font-serif-display text-lg font-bold ${
                  isLight ? 'text-ink' : 'text-cream'
                }`}>
                  Beri Masukan
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLight ? 'hover:bg-ink/5 text-ink-soft' : 'hover:bg-white/5 text-sand'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Body */}
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 px-6"
                >
                  <CheckCircle className={`w-12 h-12 mb-4 ${isLight ? 'text-gold' : 'text-[#D4A843]'}`} />
                  <p className={`font-serif-display text-lg font-medium mb-1 ${
                    isLight ? 'text-ink' : 'text-cream'
                  }`}>
                    Terima kasih!
                  </p>
                  <p className={`text-sm ${isLight ? 'text-ink-soft' : 'text-sand'}`}>
                    Masukan Anda sangat berarti bagi kami.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
                  {/* Name */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}>
                      Nama <span className="opacity-40">(opsional)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Nama Anda"
                      maxLength={100}
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors ${
                        isLight
                          ? 'bg-ink/[0.03] border border-ink/8 focus:border-gold/40 text-ink placeholder:text-ink/30'
                          : 'bg-white/[0.04] border border-[rgba(245,215,142,0.06)] focus:border-[#D4A843]/40 text-cream placeholder:text-sand/30'
                      }`}
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}>
                      Jenis Masukan
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat.value}
                          type="button"
                          onClick={() => setCategory(cat.value)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                            category === cat.value
                              ? isLight
                                ? 'bg-gold/15 text-gold border border-gold/30'
                                : 'bg-[#D4A843]/15 text-[#D4A843] border border-[#D4A843]/30'
                              : isLight
                                ? 'bg-ink/[0.03] text-ink-soft border border-ink/8 hover:border-ink/15'
                                : 'bg-white/[0.04] text-sand border border-[rgba(245,215,142,0.06)] hover:border-[rgba(245,215,142,0.12)]'
                          }`}
                        >
                          {cat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className={`block text-xs font-medium mb-1.5 ${
                      isLight ? 'text-ink-soft' : 'text-sand'
                    }`}>
                      Pesan <span className={`${
                        isLight ? 'text-gold' : 'text-[#D4A843]'
                      }`}>*</span>
                    </label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Tulis masukan Anda di sini..."
                      rows={4}
                      maxLength={5000}
                      required
                      className={`w-full px-3.5 py-2.5 rounded-xl text-sm outline-none transition-colors resize-none ${
                        isLight
                          ? 'bg-ink/[0.03] border border-ink/8 focus:border-gold/40 text-ink placeholder:text-ink/30'
                          : 'bg-white/[0.04] border border-[rgba(245,215,142,0.06)] focus:border-[#D4A843]/40 text-cream placeholder:text-sand/30'
                      }`}
                    />
                    <p className={`text-[10px] mt-1 text-right ${
                      isLight ? 'text-ink/25' : 'text-sand/25'
                    }`}>
                      {message.length}/5000
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={submitting || !message.trim()}
                    className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                      submitting || !message.trim()
                        ? 'opacity-40 cursor-not-allowed'
                        : 'hover:opacity-90 active:scale-[0.98]'
                    } ${
                      isLight
                        ? 'bg-gold text-white'
                        : 'bg-[#D4A843] text-[#080B16]'
                    }`}
                  >
                    {submitting ? (
                      <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Kirim Masukan
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
