'use client';

import AppShell from '@/components/jejak/AppShell';
import StoryReader from '@/components/jejak/StoryReader';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function BabPageClient({ eventId }: { eventId: string }) {
  const { navigateTo } = useNavigation();

  // Sync URL → store (for Navigation active state, reading progress, etc.)
  useEffect(() => {
    navigateTo('reader', eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  return (
    <AppShell>
      <StoryReader eventId={eventId} />
    </AppShell>
  );
}
