'use client';

import AppShell from '@/components/jejak/AppShell';
import JourneyFeed from '@/components/jejak/JourneyFeed';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function FasePageClient({ journeyId }: { journeyId: string }) {
  const { navigateTo } = useNavigation();

  // Sync URL → store (for Navigation active state, etc.)
  useEffect(() => {
    navigateTo('timeline');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AppShell>
      <JourneyFeed standalone highlightJourneyId={journeyId} />
    </AppShell>
  );
}
