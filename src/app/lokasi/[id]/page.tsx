import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations, getEventsByJourney, getJourneysByCollection, getActiveCollection } from '@/data/content';
import LocationDetailPage from './LocationDetailPage';

const BASE_URL = 'https://jejakcahaya.my.id';

interface LokasiDetailProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: LokasiDetailProps): Promise<Metadata> {
  const { id } = await params;
  const location = locations.find((l) => l.id === id);

  if (!location) {
    return {
      title: 'Lokasi tidak ditemukan — Jejak Cahaya',
      robots: { index: false, follow: false },
    };
  }

  const ogImage = `/api/og/lokasi/${id}`;
  const canonicalUrl = `${BASE_URL}/lokasi/${id}`;
  const description = `${location.description} ${location.significance}. Lokasi dalam sirah nabawiyah di Jejak Cahaya.`;

  return {
    title: location.name,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${location.name} — Jejak Cahaya`,
      description,
      type: 'article',
      url: canonicalUrl,
      siteName: 'Jejak Cahaya',
      locale: 'id_ID',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `Lokasi: ${location.name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${location.name} — Jejak Cahaya`,
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

  const canonicalUrl = `${BASE_URL}/lokasi/${id}`;

  // ── JSON-LD: Place schema ──
  const placeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Place',
    '@id': canonicalUrl,
    name: location.name,
    description: location.description,
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'SA', // most locations di Arab Saudi
    },
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
        name: 'Lokasi',
        item: `${BASE_URL}/lokasi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: location.name,
        item: canonicalUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(placeSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <LocationDetailPage
        location={location}
        relatedEvents={relatedEvents}
      />
    </>
  );
}
