import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  events,
  getCharactersByEvent,
  getLocationById,
  getActiveCollection,
  getJourneysByCollection,
  getEventsByJourney,
} from '@/data/content';
import StoryContent from '@/components/jejak/StoryContent';
import BabPageShell from './BabPageShell';

interface BabPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: BabPageProps): Promise<Metadata> {
  const { id } = await params;
  const event = events.find((e) => e.id === `bab-${id}`);

  if (!event) {
    return { title: 'Bab tidak ditemukan — Jejak Cahaya' };
  }

  return {
    title: `${event.title} — Jejak Cahaya`,
    description: event.subtitle
      ? `${event.subtitle}. ${event.description}`
      : event.description,
    openGraph: {
      title: `${event.title} — Jejak Cahaya`,
      description: event.subtitle || event.description,
      type: 'article',
      siteName: 'Jejak Cahaya',
    },
  };
}

export async function generateStaticParams() {
  return events.map((event) => ({
    id: event.id.replace('bab-', ''),
  }));
}

export default async function BabPage({ params }: BabPageProps) {
  const { id } = await params;

  const event = events.find((e) => e.id === `bab-${id}`);
  if (!event) notFound();

  // Pre-compute ALL data on the server — no client-side fetching needed
  const characters = getCharactersByEvent(event.id);
  const location = getLocationById(event.locationId);

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const currentIndex = allEvents.findIndex((e) => e.id === event.id);
  const prevEvent = currentIndex > 0 ? allEvents[currentIndex - 1] : null;
  const nextEvent =
    currentIndex >= 0 && currentIndex < allEvents.length - 1
      ? allEvents[currentIndex + 1]
      : null;

  return (
    <BabPageShell eventId={event.id}>
      <StoryContent
        event={event}
        characters={characters}
        location={location}
        prevEvent={prevEvent}
        nextEvent={nextEvent}
      />
    </BabPageShell>
  );
}
