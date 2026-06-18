import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { characters, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import CharacterDetailPage from './CharacterDetailPage';

interface TokohDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TokohDetailProps): Promise<Metadata> {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return { title: 'Tokoh tidak ditemukan — Jejak Cahaya' };
  }

  return {
    title: `${character.name} — Jejak Cahaya`,
    description: character.shortBio,
    openGraph: {
      title: `${character.name} — Jejak Cahaya`,
      description: character.shortBio,
      type: 'profile',
      siteName: 'Jejak Cahaya',
    },
    twitter: {
      card: 'summary',
      title: `${character.name} — Jejak Cahaya`,
      description: character.shortBio,
    },
  };
}

export async function generateStaticParams() {
  return characters.map((c) => ({ id: c.id }));
}

export default async function TokohDetailRoute({ params }: TokohDetailProps) {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);
  if (!character) notFound();

  const activeCollection = getActiveCollection();
  const journeys = activeCollection ? getJourneysByCollection(activeCollection.id) : [];
  const allEvents = journeys.flatMap((j) => getEventsByJourney(j.id));
  const relatedEvents = allEvents.filter((e) => character.eventIds.includes(e.id));

  return (
    <CharacterDetailPage
      character={character}
      relatedEvents={relatedEvents}
    />
  );
}
