'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/jejak/AppShell';
import JourneyFeed from '@/components/jejak/JourneyFeed';
import { pathToId } from '@/lib/routes';
import { getActiveCollection, getJourneysByCollection } from '@/data/content';

export default function FasePage() {
  const params = useParams();
  const slug = params.id as string;
  const journeyId = pathToId(slug, 'fase');

  // Validate the fase exists
  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const exists = journeys.some((j) => j.id === journeyId);

  if (!exists) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif-display text-2xl font-bold text-ink dark:text-cream">
            Fase tidak ditemukan
          </h1>
          <p className="mt-2 text-ink-soft dark:text-sand">
            Fase &quot;{slug}&quot; tidak ada dalam koleksi ini.
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <JourneyFeed standalone highlightJourneyId={journeyId} />
    </AppShell>
  );
}
