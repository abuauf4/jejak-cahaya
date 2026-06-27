import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { characters, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import CharacterDetailPage from './CharacterDetailPage';

const BASE_URL = 'https://jejakcahaya.my.id';

interface TokohDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: TokohDetailProps): Promise<Metadata> {
  const { id } = await params;
  const character = characters.find((c) => c.id === id);

  if (!character) {
    return {
      title: 'Tokoh tidak ditemukan — Jejak Cahaya',
      robots: { index: false, follow: false },
    };
  }

  const ogImage = `/api/og/tokoh/${id}`;
  const canonicalUrl = `${BASE_URL}/tokoh/${id}`;
  const description = `${character.shortBio} ${character.role}. Kisah tokoh dalam sirah nabawiyah di Jejak Cahaya.`;

  return {
    title: character.name,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${character.name} — Jejak Cahaya`,
      description,
      type: 'profile',
      url: canonicalUrl,
      siteName: 'Jejak Cahaya',
      locale: 'id_ID',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${character.name} — ${character.title}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${character.name} — Jejak Cahaya`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
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

  const canonicalUrl = `${BASE_URL}/tokoh/${id}`;

  // ── JSON-LD: Person schema ──
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': canonicalUrl,
    name: character.name,
    description: character.shortBio,
    jobTitle: character.role,
    hasOccupation: {
      '@type': 'Occupation',
      name: character.role,
    },
    knowsAbout: 'Sirah Nabawiyah, Sejarah Islam',
    url: canonicalUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': canonicalUrl,
    },
    subjectOf: relatedEvents.map((event) => ({
      '@type': 'Article',
      headline: event.title,
      url: `${BASE_URL}/bab/${event.id.replace('bab-', '')}`,
    })),
  };

  // ── JSON-LD: BreadcrumbList ──
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Beranda',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tokoh',
        item: `${BASE_URL}/tokoh`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: character.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <CharacterDetailPage
        character={character}
        relatedEvents={relatedEvents}
      />
    </>
  );
}
