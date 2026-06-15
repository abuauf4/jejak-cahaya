'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/jejak/AppShell';
import StoryReader from '@/components/jejak/StoryReader';
import { pathToId } from '@/lib/routes';
import { getEventById } from '@/data/content';
import { useNavigation } from '@/lib/store';
import { useEffect } from 'react';

export default function BabPage() {
  const params = useParams();
  const slug = params.id as string;
  const eventId = pathToId(slug, 'bab');
  const { navigateTo } = useNavigation();

  // Sync URL → store
  useEffect(() => {
    navigateTo('reader', eventId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId]);

  const event = getEventById(eventId);

  if (!event) {
    return (
      <AppShell>
        <div className="max-w-2xl mx-auto px-5 py-20 text-center">
          <h1 className="font-serif-display text-2xl font-bold text-ink dark:text-cream">
            Bab tidak ditemukan
          </h1>
          <p className="mt-2 text-ink-soft dark:text-sand">
            Bab &quot;{slug}&quot; tidak ada dalam perjalanan ini.
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <StoryReader />
    </AppShell>
  );
}
