'use client';

import { useEffect } from 'react';
import { useNavigation } from '@/lib/store';
import AppShell from '@/components/jejak/AppShell';

/**
 * Client shell for the fase (timeline) page.
 * Wraps server-rendered content with AppShell (nav + footer)
 * and syncs URL → Zustand store.
 */
export default function FasePageShell({
  journeyId,
  children,
}: {
  journeyId: string;
  children: React.ReactNode;
}) {
  const { navigateTo } = useNavigation();

  // Sync URL → store (for Navigation active state, etc.)
  useEffect(() => {
    navigateTo('timeline');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AppShell>{children}</AppShell>;
}
