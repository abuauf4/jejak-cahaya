import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import LocationDetailPage from './LocationDetailPage';

interface LokasiDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LokasiDetailProps): Promise<Metadata> {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  if (!location) {
    return { title: 'Lokasi tidak ditemukan — Jejak Cahaya' };
  }

  const ogImage = `/api/og/lokasi/${id}`;

  return {
    title: `${location.name} — Jejak Cahaya`,
    description: location.description,
    openGraph: {
      title: `${location.name} — Jejak Cahaya`,
      description: location.description,
      type: 'article',
      siteName: 'Jejak Cahaya',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: location.name,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} — Jejak Cahaya`,
      description: location.description,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  return locations.map((l) => ({ id: l.id }));
}

export default async function LokasiDetailRoute({ params }: LokasiDetailProps) {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);
  if (!location) notFound();

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const relatedEvents = allEvents.filter((e) => location.eventIds.includes(e.id));

  return (
    <LocationDetailPage
      location={location}
      relatedEvents={relatedEvents}
    />
  );
}
