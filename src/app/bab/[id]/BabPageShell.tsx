'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigation, useReadingProgress } from '@/lib/store';
import AppShell from '@/components/jejak/AppShell';

/**
 * Client shell for the bab reader page.
 * Wraps server-rendered story content with AppShell (nav + footer),
 * adds reading progress bar, and handles mark-as-read + store sync.
 */
export default function BabPageShell({
  eventId,
  children,
}: {
  eventId: string;
  children: React.ReactNode;
}) {
  const { navigateTo, theme } = useNavigation();
  const { markEventRead } = useReadingProgress();
  const [scrollProgress, setScrollProgress] = useState(0);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isLight = theme === 'light';

  // Sync URL → store (for Navigation active state, reading progress, etc.)
  useEffect(() => {
    navigateTo('reader', eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver to mark event as read when user scrolls to end
  const storyEndRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observerRef.current) observerRef.current.disconnect();
      if (!node) return;
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              markEventRead(eventId);
            }
          });
        },
        { threshold: 0.3 }
      );
      observerRef.current.observe(node);
    },
    [eventId, markEventRead]
  );

  return (
    <AppShell>
      {/* Reading progress bar */}
      <div className={`fixed top-12 sm:top-14 left-0 right-0 z-40 h-[2px] ${isLight ? 'bg-ink/8' : 'bg-sand/8'}`}>
        <motion.div
          className={`h-full ${isLight ? 'bg-gold-soft' : 'bg-lantern-mid'}`}
          initial={{ width: 0 }}
          animate={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.15, ease: 'linear' }}
        />
      </div>

      {/* Server-rendered story content */}
      {children}

      {/* Mark-as-read sentinel */}
      <div ref={storyEndRef} className="h-1" aria-hidden="true" />
    </AppShell>
  );
}
